#!/usr/bin/env python3
"""
publish_blogs.py

- Reads `content/blog/posts.json` (source of truth)
- Publishes posts whose `publish_at` is today or earlier (and `approved`)
- Generates individual post pages (from `templates/post.html`) for drafts
  (RTF sources) using the preview HTML when available
- Rebuilds `blog.html` from `templates/blog.html` (fills `{{BLOG_JSONLD}}` and
  `{{BLOG_CARDS}}`)
- Ensures `sitemap.xml` contains published post URLs
- Updates `content/blog/posts.json` (`published` + `published_at`) and
  commits changes when files were created/updated

Designed to be idempotent and safe to run from CI (GitHub Actions).
"""

from __future__ import annotations

import json
import os
import re
import subprocess
import sys
import argparse
import html
from datetime import date, datetime
from pathlib import Path
from typing import Dict, List, Optional

ROOT = Path(__file__).resolve().parents[1]
CONTENT = ROOT / "content" / "blog"
TEMPLATES = ROOT / "templates"
PREVIEWS = ROOT / "previews"
SITEMAP = ROOT / "sitemap.xml"
BLOG_HTML_OUT = ROOT / "blog.html"
POSTS_JSON = CONTENT / "posts.json"

DATE_FMT = "%Y-%m-%d"


def load_posts() -> List[Dict]:
    with POSTS_JSON.open("r", encoding="utf-8") as f:
        return json.load(f)


def save_posts(posts: List[Dict]):
    with POSTS_JSON.open("w", encoding="utf-8") as f:
        json.dump(posts, f, indent=2, ensure_ascii=False)


def iso_today() -> str:
    return date.today().isoformat()


def read_text(path: Path) -> str:
    return path.read_text(encoding="utf-8")


def safe_slug_filename(post: Dict) -> str:
    return f"{post['slug']}.html"


def published_posts(posts: List[Dict]) -> List[Dict]:
    return [p for p in posts if p.get("published")]


def ensure_published(posts: List[Dict]) -> List[Dict]:
    """Mark posts as published if publish_at <= today and approved==True."""
    changed = False
    today = iso_today()
    for p in posts:
        if p.get("published"):
            continue
        if not p.get("approved"):
            continue
        pub_at = p.get("publish_at")
        if not pub_at:
            continue
        try:
            if pub_at <= today:
                p["published"] = True
                p["published_at"] = pub_at
                changed = True
        except Exception:
            continue
    if changed:
        save_posts(posts)
    return posts


def extract_article_content_from_html(html: str) -> Optional[str]:
    """Safely extract the inner HTML for the article body from a full or partial HTML page.

    Order of attempts:
    1) element with class `article-content` (div/article/main)
    2) <article> ... </article>
    3) <main> ... </main>
    4) <body> ... </body>

    Returns the inner HTML (without outer wrapper) or None if nothing matched.
    """
    # 1) element with class `article-content` (cover div/article/main)
    m_open = re.search(
        r"<(div|article|main)[^>]*class=[\"']?[^\"'>]*article-content[^\"'>]*[^>]*>",
        html,
        re.I,
    )
    if m_open:
        tag = m_open.group(1)
        start = m_open.start()
        # scan forward for matching closing tag of same name (handles nested same tags)
        token_re = re.compile(rf"</?{tag}[^>]*>", re.I)
        depth = 0
        for match in token_re.finditer(html, start):
            token = match.group(0)
            if token.startswith("</"):
                if depth == 0:
                    inner_start = m_open.end()
                    inner_end = match.start()
                    return html[inner_start:inner_end].strip()
                depth -= 1
            else:
                depth += 1
        # fallback simple non-greedy capture
        m_simple = re.search(rf"<{tag}[^>]*>(.*?)</{tag}>", html[start:], re.I | re.S)
        if m_simple:
            return m_simple.group(1).strip()

    # 2) <article> or <main>
    m = re.search(r"<(article|main)[^>]*>(.*?)</\1>", html, re.I | re.S)
    if m:
        return m.group(2).strip()

    # 3) <body>
    m = re.search(r"<body[^>]*>(.*?)</body>", html, re.I | re.S)
    if m:
        return m.group(1).strip()

    return None


def extract_body_from_preview(slug: str) -> Optional[str]:
    preview_path = PREVIEWS / f"{slug}.html"
    if not preview_path.exists():
        return None
    html = read_text(preview_path)
    # Prefer the article fragment; avoid returning a full HTML document which causes nesting
    extracted = extract_article_content_from_html(html)
    if extracted:
        return extracted
    # fallback to <body> content if available
    m = re.search(r"<body[^>]*>(.*?)</body>", html, re.I | re.S)
    if m:
        return m.group(1).strip()
    return None


def rtf_to_html_simple(rtf_text: str) -> str:
    """Very small/safe RTF -> HTML fallback: strip control words and keep plain paragraphs.
    This is intentionally conservative — prefer `previews/<slug>.html` when available.
    """
    # Remove RTF groups and control words (very naive)
    txt = re.sub(r"\\\\'[0-9a-fA-F]{2}", "", rtf_text)  # encoded chars
    txt = re.sub(r"\\\\[a-zA-Z]+-?\d*\s?", "", txt)
    txt = re.sub(r"[{}]", "", txt)
    # Collapse multiple newlines, wrap paragraphs
    lines = [l.strip() for l in txt.splitlines() if l.strip()]
    paragraphs = "\n\n".join(lines)
    # Escape simple HTML characters
    paragraphs = (
        paragraphs.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")
    )
    html = "\n".join(
        f'<p style="margin-bottom: 1.5rem;">{p}</p>' for p in paragraphs.split("\n\n")
    )
    return html


def normalize_body_html(html_fragment: str) -> str:
    """Normalize extracted body HTML:

    - Unwrap single top-level wrapper divs to avoid double-wrapping by template.
    - Remove embedded share / footer-like snippets that the template already renders
      ("Share this article", "Back to all posts", etc.).
    - Strip obvious trailing unmatched closing tags left by extraction.
    - Trim and return a safe HTML fragment.
    """
    if not html_fragment:
        return html_fragment
    frag = html_fragment.strip()

    # unwrap single top-level <div> wrapper
    m = re.match(r"^<div[^>]*>\s*(.*)\s*</div>$", frag, re.S)
    if m:
        frag = m.group(1).strip()

    # remove an embedded Share Section (several preview variants)
    # variant with explicit comment + border-top style
    frag = re.sub(
        r"<!--\s*Share Section\s*-->\s*<div[^>]*border-top[^>]*>.*?</div>",
        "",
        frag,
        flags=re.S | re.I,
    )
    # variant without comment but containing the 'Share this article' label
    frag = re.sub(
        r"<div[^>]*border-top[^>]*>\s*.*?Share this article:.*?</div>",
        "",
        frag,
        flags=re.S | re.I,
    )

    # remove stray 'Back to all posts' or 'Back to Blog' anchors that previews sometimes include
    frag = re.sub(
        r"<a[^>]+href=[\"']?blog\.html[\"']?[^>]*>\s*[←\-–]*\s*Back to (?:all posts|Blog)[^<]*</a>",
        "",
        frag,
        flags=re.I,
    )

    # remove excessive trailing closing tags that can unbalance the template
    frag = re.sub(r"^(?:\s*</div>)+", "", frag)
    frag = re.sub(r"(?:</div>\s*)+$", "", frag)

    return frag.strip()


def html_to_text(html_fragment: str) -> str:
    """Very small HTML -> plain text converter used for generating excerpts."""
    if not html_fragment:
        return ""
    # remove tags
    text = re.sub(r"<[^>]+>", "", html_fragment)
    # unescape HTML entities
    text = html.unescape(text)
    # collapse whitespace
    text = re.sub(r"\s+", " ", text).strip()
    return text


def extract_first_paragraph_text(html_fragment: str) -> Optional[str]:
    """Return the text of the first <p>...</p> or a short plain-text prefix as fallback."""
    if not html_fragment:
        return None
    m = re.search(r"<p[^>]*>(.*?)</p>", html_fragment, re.I | re.S)
    if m:
        return html_to_text(m.group(1))
    # fallback: use first 200 characters of the HTML->text conversion
    plain = html_to_text(html_fragment)
    if not plain:
        return None
    return plain[:200].rstrip() + ("..." if len(plain) > 200 else "")


def adjust_html_for_preview(html_content: str) -> str:
    """Adjust paths and a few tags so the generated preview renders correctly from `previews/`.

    - make relative asset paths point one level up (e.g. `css/` -> `../css/`)
    - preserve absolute/external URLs
    """
    if not html_content:
        return html_content

    # css, js, public, favicon (only for relative paths)
    html_content = re.sub(r"href=(\"|\')css/", r"href=\1../css/", html_content)
    html_content = re.sub(
        r"href=(\"|\')favicon\.ico", r"href=\1../favicon.ico", html_content
    )
    html_content = re.sub(r"src=(\"|\')js/", r"src=\1../js/", html_content)
    html_content = re.sub(r"src=(\"|\')public/", r"src=\1../public/", html_content)
    html_content = re.sub(r"href=(\"|\')public/", r"href=\1../public/", html_content)

    # ensure logo/public image paths are reachable from previews/
    html_content = re.sub(
        r"src=(\"|\')public/images/", r"src=\1../public/images/", html_content
    )

    # canonical should remain absolute (no-op)
    return html_content


def generate_preview_for_post(post: Dict, overwrite: bool = True) -> Path:
    """Render and write a preview HTML file for an RTF post to `previews/<slug>.html`.

    Returns the Path to the generated preview.
    """
    slug = post.get("slug")
    if not slug:
        raise ValueError("post missing slug")
    out_path = PREVIEWS / f"{slug}.html"
    PREVIEWS.mkdir(parents=True, exist_ok=True)

    # reuse the existing renderer (build_post_html) then adjust for preview context
    content = build_post_html(post)
    content = adjust_html_for_preview(content)

    # write (overwrite allowed)
    out_path.write_text(content, encoding="utf-8")
    return out_path


def build_post_html(post: Dict) -> str:
    tpl = read_text(TEMPLATES / "post.html")

    # Prepare metadata
    title = post.get("title") or ""
    description = post.get("description") or ""
    author = post.get("author") or "EnterpriseChai"
    slug = post["slug"]
    filename = safe_slug_filename(post)
    # For full_html posts use the source_path as canonical; for RTF/drafts use the generated slug filename
    if post.get("source_type") == "full_html" and post.get("source_path"):
        canonical_path = post.get("source_path")
    else:
        canonical_path = filename
    canonical = f"https://enterprisechai.com/{canonical_path}"
    published_at = post.get("published_at") or post.get("publish_at") or iso_today()

    # BODY_HTML: prefer preview if source_type == 'rtf', else if full_html try to copy the source
    body_html = ""
    if post.get("source_type") == "full_html":
        src = Path(post.get("source_path"))
        # Try repo-root path first, then templates / previews
        root_src = ROOT / (post.get("source_path") or "")
        if root_src.exists():
            html = read_text(root_src)
            extracted = extract_article_content_from_html(html)
            if extracted:
                body_html = extracted
            else:
                # try <body> inner content for full HTML pages
                m_body = re.search(r"<body[^>]*>(.*?)</body>", html, re.I | re.S)
                if m_body:
                    body_html = m_body.group(1).strip()
                else:
                    body_html = html
        else:
            # fallback to preview
            body_html = extract_body_from_preview(slug) or ""
    else:
        # source_type == rtf
        body_html = extract_body_from_preview(slug)
        if not body_html:
            # fallback: attempt to read the RTF source and convert minimally
            src_path = ROOT / (post.get("source_path") or "")
            if src_path.exists():
                raw = src_path.read_text(errors="ignore")
                body_html = rtf_to_html_simple(raw)
            else:
                body_html = "<p>(content not available)</p>"
    # normalize extracted body to avoid duplicated outer wrapper from previews
    body_html = normalize_body_html(body_html)

    # Fill fallback description (excerpt) from first paragraph when missing
    if not post.get("description"):
        excerpt = extract_first_paragraph_text(body_html) or ""
        excerpt = excerpt.strip()
        if excerpt:
            # limit to 200 chars
            if len(excerpt) > 200:
                excerpt = excerpt[:197].rstrip() + "..."
            post["description"] = excerpt

    # ensure the `description` local used in replacements reflects any fallback we just set
    description = post.get("description") or ""

    # HEADER_CTA_HTML (optional)
    header_cta = ""
    if post.get("access_url") and post.get("access_label"):
        header_cta = (
            f'<p style="margin-top: 0.5rem; margin-bottom: 1.25rem; text-decoration: underline; text-decoration-color: #8b5cf6;">'
            f'<a href="{post["access_url"]}" target="_blank" rel="noopener noreferrer" style="color: #8b5cf6; text-decoration: none; font-weight: 500;">{post["access_label"]}</a></p>'
        )

    # Simple replacements for the placeholders used in template/post.html
    replacements = {
        "{{PAGE_TITLE}}": f"{title}",
        "{{META_DESCRIPTION}}": description,
        "{{META_KEYWORDS}}": post.get("tags", ""),
        "{{META_AUTHOR}}": author,
        "{{CANONICAL_URL}}": canonical,
        "{{OG_TITLE}}": title,
        "{{OG_DESCRIPTION}}": description,
        "{{TWITTER_TITLE}}": title,
        "{{TWITTER_DESCRIPTION}}": description,
        "{{POST_TITLE}}": title,
        "{{POST_DESCRIPTION}}": description,
        "{{HEADER_CTA_HTML}}": header_cta,
        "{{POST_AUTHOR}}": author,
        "{{POST_DATE_HUMAN}}": published_at,
        "{{BODY_HTML}}": body_html,
    }

    for k, v in replacements.items():
        tpl = tpl.replace(k, v)

    return tpl


def build_blog_cards(published: List[Dict]) -> str:
    cards: List[str] = []
    for p in sorted(published, key=lambda x: x.get("publish_at", ""), reverse=True):
        date_human = datetime.strptime(
            p.get("published_at") or p.get("publish_at"), DATE_FMT
        ).strftime("%B %d, %Y")
        title = p.get("title") or ""
        desc = p.get("description") or ""
        author = p.get("author") or "EnterpriseChai"
        if p.get("source_type") == "full_html" and p.get("source_path"):
            url = p.get("source_path")
        else:
            url = safe_slug_filename(p)
        card = f"""<article class="blog-card" style="background-color: white; padding: 2rem; border-radius: 1rem; box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1); border: 1px solid #e5e7eb; transition: box-shadow 0.2s ease;">
  <div style="display: flex; align-items: center; margin-bottom: 1rem;">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color: #8b5cf6; margin-right: 0.5rem;">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
      <line x1="16" y1="2" x2="16" y2="6"></line>
      <line x1="8" y1="2" x2="8" y2="6"></line>
      <line x1="3" y1="10" x2="21" y2="10"></line>
    </svg>
    <time style="color: #8b5cf6; font-weight: 500; font-size: 0.875rem;">{date_human}</time>
  </div>
  <h2 style="font-size: 1.25rem; font-weight: 500; color: #111827; margin-bottom: 1rem; line-height: 1.4;">{title}</h2>
  <p style="color: #6b7280; font-weight: 300; line-height: 1.6; margin-bottom: 0.75rem;">{desc}</p>
  <div style="display: flex; align-items: center; justify-content: space-between;">
    <span style="font-size: 0.875rem; color: #6b7280; font-weight: 300;">By {author}</span>
    <a href="{url}" class="btn btn-outline" style="padding: 0.5rem 1rem; font-size: 0.875rem;">Read more
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-left: 0.5rem;">
        <line x1="5" y1="12" x2="19" y2="12"></line>
        <polyline points="12,5 19,12 12,19"></polyline>
      </svg>
    </a>
  </div>
</article>"""
        cards.append(card)
    return "\n".join(cards)


def build_blog_jsonld(published: List[Dict]) -> str:
    posts = []
    for p in sorted(published, key=lambda x: x.get("publish_at", ""), reverse=True):
        if p.get("source_type") == "full_html" and p.get("source_path"):
            url = f"https://enterprisechai.com/{p.get('source_path')}"
        else:
            url = f"https://enterprisechai.com/{safe_slug_filename(p)}"
        posts.append(
            {
                "@type": "BlogPosting",
                "headline": p.get("title"),
                "datePublished": p.get("published_at") or p.get("publish_at"),
                "author": {
                    "@type": "Person",
                    "name": p.get("author") or "EnterpriseChai",
                },
                "url": url,
            }
        )
    blob = {
        "@context": "https://schema.org",
        "@type": "Blog",
        "name": "EnterpriseChai Blog",
        "description": "Latest insights on AI copilots, sales automation, prompt engineering, and conversational AI.",
        "url": "https://enterprisechai.com/blog.html",
        "publisher": {
            "@type": "Organization",
            "name": "EnterpriseChai",
            "logo": {
                "@type": "ImageObject",
                "url": "https://enterprisechai.com/images/logo-black.png",
            },
        },
        "blogPost": posts,
    }
    return json.dumps(blob, indent=2, ensure_ascii=False)


def render_blog_html(published: List[Dict]):
    tpl = read_text(TEMPLATES / "blog.html")
    tpl = tpl.replace("{{BLOG_JSONLD}}", build_blog_jsonld(published))
    tpl = tpl.replace("{{BLOG_CARDS}}", build_blog_cards(published))
    return tpl


def ensure_sitemap_contains(published: List[Dict]):
    xml = read_text(SITEMAP)
    changed = False
    for p in published:
        if p.get("source_type") == "full_html" and p.get("source_path"):
            path = p.get("source_path")
        else:
            path = safe_slug_filename(p)
        loc = f"https://enterprisechai.com/{path}"
        if loc in xml:
            continue
        lastmod = p.get("published_at") or p.get("publish_at") or iso_today()
        entry = f"    <url>\n        <loc>{loc}</loc>\n        <lastmod>{lastmod}</lastmod>\n    </url>\n"
        # insert before the closing </urlset>
        xml = xml.replace("</urlset>", entry + "</urlset>")
        changed = True
    if changed:
        SITEMAP.write_text(xml, encoding="utf-8")
    return changed


def git_commit(files: List[str], message: str) -> bool:
    try:
        subprocess.check_call(["git", "add"] + files, cwd=str(ROOT))
        subprocess.check_call(["git", "commit", "-m", message], cwd=str(ROOT))
        return True
    except subprocess.CalledProcessError:
        return False


def is_commit_allowed(no_commit_flag: bool = False) -> bool:
    """Return True when script is allowed to perform git commits.

    Commits are disallowed inside GitHub Actions by default. The caller can
    override that with the `--no-commit` flag. This helper centralizes the
    logic and is easy to unit test.
    """
    in_ci = os.getenv("GITHUB_ACTIONS", "false").lower() == "true"
    return (not in_ci) and (not no_commit_flag)


def main(preview: bool = False, no_commit: bool = False):
    posts = load_posts()

    # --preview: generate preview HTML for RTF posts (writes to `previews/` only)
    if preview:
        created = []
        for p in posts:
            if p.get("source_type") == "rtf":
                try:
                    path = generate_preview_for_post(p, overwrite=True)
                    created.append(str(path.relative_to(ROOT)))
                except Exception as exc:
                    print(f"preview generation failed for {p.get('slug')}: {exc}")
        if created:
            print("Generated previews:", ", ".join(created))
        else:
            print("No RTF posts found for preview generation.")

    # 1) Mark due posts as published
    posts = ensure_published(posts)

    # 2) Build outputs for all published posts
    published = published_posts(posts)

    # Generate post pages for 'rtf' / non-full_html posts
    generated_files: List[str] = []
    posts_meta_changed = False
    for p in published:
        orig_desc = p.get("description") or ""
        if p.get("source_type") == "full_html":
            # skip generating if the source_path file exists in repo root
            src = ROOT / (p.get("source_path") or "")
            if src.exists():
                # ensure it's available (no-op)
                continue
        # create slug-based HTML page
        out_path = ROOT / safe_slug_filename(p)
        content = build_post_html(p)
        # if build_post_html filled a missing description, mark posts.json dirty
        if (p.get("description") or "") != orig_desc:
            posts_meta_changed = True
        existing = out_path.exists() and out_path.read_text(encoding="utf-8") == content
        if not existing:
            out_path.write_text(content, encoding="utf-8")
            generated_files.append(str(out_path.relative_to(ROOT)))

    # persist posts.json if we filled fallback descriptions
    if posts_meta_changed:
        save_posts(posts)

    # 3) Rebuild blog.html from template
    blog_html = render_blog_html(published)
    if (
        BLOG_HTML_OUT.exists()
        and BLOG_HTML_OUT.read_text(encoding="utf-8") == blog_html
    ):
        blog_changed = False
    else:
        BLOG_HTML_OUT.write_text(blog_html, encoding="utf-8")
        blog_changed = True

    # 4) Ensure sitemap.xml has entries
    sitemap_changed = ensure_sitemap_contains(published)

    # 5) Commit changed files (posts.json may have been updated by ensure_published)
    files_to_commit = []
    if generated_files:
        files_to_commit += generated_files
    if blog_changed:
        files_to_commit.append(str(BLOG_HTML_OUT.relative_to(ROOT)))
    if sitemap_changed:
        files_to_commit.append(str(SITEMAP.relative_to(ROOT)))
    # include posts.json if modified
    # simple heuristic: if any post has published==True and published_at exists where previously not
    files_to_commit.append(str(POSTS_JSON.relative_to(ROOT)))

    if files_to_commit:
        msg = f"chore(publish): auto-publish {len(published)} post(s) [{iso_today()}]"
        if is_commit_allowed(no_commit):
            committed = git_commit(files_to_commit, msg)
            if not committed:
                print("No commit was made (maybe no changes or git not configured).")
            else:
                print(f"Committed: {files_to_commit}")
        else:
            print(
                "Commit skipped (running in CI or --no-commit). The workflow should stage/commit/push these files."
            )
            print("Files that would be committed:", files_to_commit)
    else:
        print("Nothing to publish or update.")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Publish blog posts and optionally generate previews for RTF drafts."
    )
    parser.add_argument(
        "--preview",
        action="store_true",
        help="Generate preview HTML for RTF posts (writes to previews/). Overwrites existing previews.",
    )
    parser.add_argument(
        "--no-commit",
        action="store_true",
        help="Do not create git commits (CI/workflow will handle commits).",
    )
    args = parser.parse_args()
    main(preview=args.preview, no_commit=args.no_commit)
