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


def extract_body_from_preview(slug: str) -> Optional[str]:
    preview_path = PREVIEWS / f"{slug}.html"
    if not preview_path.exists():
        return None
    html = read_text(preview_path)
    # Look for the article-content block used in templates/previews
    m = re.search(
        r"<div[^>]+class=\"article-content\"[^>]*>(.*?)<\\/div>\\s*<\\/div>", html, re.S
    )
    if m:
        return m.group(1).strip()
    # fallback: try to extract main <article> or body content
    m = re.search(r"<main[^>]*>(.*?)<\\/main>", html, re.S)
    if m:
        return m.group(1).strip()
    return html


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


def build_post_html(post: Dict) -> str:
    tpl = read_text(TEMPLATES / "post.html")

    # Prepare metadata
    title = post.get("title") or ""
    description = post.get("description") or ""
    author = post.get("author") or "EnterpriseChai"
    slug = post["slug"]
    filename = safe_slug_filename(post)
    canonical = f"https://enterprisechai.com/{post.get('source_path') or filename}"
    published_at = post.get("published_at") or post.get("publish_at") or iso_today()

    # BODY_HTML: prefer preview if source_type == 'rtf', else if full_html try to copy the source
    body_html = ""
    if post.get("source_type") == "full_html":
        src = Path(post.get("source_path"))
        # Try repo-root path first, then templates / previews
        root_src = ROOT / (post.get("source_path") or "")
        if root_src.exists():
            # Extract inner article content if possible
            html = read_text(root_src)
            m = re.search(
                r"<div[^>]+class=\"article-content\"[^>]*>(.*?)<\\/div>\\s*<\\/div>",
                html,
                re.S,
            )
            if m:
                body_html = m.group(1).strip()
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


def main():
    posts = load_posts()

    # 1) Mark due posts as published
    posts = ensure_published(posts)

    # 2) Build outputs for all published posts
    published = published_posts(posts)

    # Generate post pages for 'rtf' / non-full_html posts
    generated_files: List[str] = []
    for p in published:
        if p.get("source_type") == "full_html":
            # skip generating if the source_path file exists in repo root
            src = ROOT / (p.get("source_path") or "")
            if src.exists():
                # ensure it's available (no-op)
                continue
        # create slug-based HTML page
        out_path = ROOT / safe_slug_filename(p)
        content = build_post_html(p)
        existing = out_path.exists() and out_path.read_text(encoding="utf-8") == content
        if not existing:
            out_path.write_text(content, encoding="utf-8")
            generated_files.append(str(out_path.relative_to(ROOT)))

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
        committed = git_commit(files_to_commit, msg)
        if not committed:
            print("No commit was made (maybe no changes or git not configured).")
        else:
            print(f"Committed: {files_to_commit}")
    else:
        print("Nothing to publish or update.")


if __name__ == "__main__":
    main()
