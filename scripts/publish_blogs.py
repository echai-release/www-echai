#!/usr/bin/env python3
"""
publish_blogs.py

- Reads `content/blog/posts.json` (source of truth)
- Publishes posts whose `publish_at` is today or earlier (and `approved`)
- Copies preview HTML from `previews/<slug>.html` to root when publishing
- Rebuilds `blog.html` from `templates/blog.html` (fills `{{BLOG_JSONLD}}` and `{{BLOG_CARDS}}`)
- Ensures `sitemap.xml` contains published post URLs
- Updates `content/blog/posts.json` (`published` + `published_at`)

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


def extract_first_paragraph_text(html_content: str) -> Optional[str]:
    """Extract text from first <p> tag for excerpt generation."""
    if not html_content:
        return None
    # Remove script and style tags
    text = re.sub(r'<script[^>]*>.*?</script>', '', html_content, flags=re.S | re.I)
    text = re.sub(r'<style[^>]*>.*?</style>', '', text, flags=re.S | re.I)
    # Find first paragraph
    m = re.search(r'<p[^>]*>(.*?)</p>', text, re.I | re.S)
    if m:
        # Remove HTML tags
        para = re.sub(r'<[^>]+>', '', m.group(1))
        para = html.unescape(para)
        para = re.sub(r'\s+', ' ', para).strip()
        return para[:200] + ('...' if len(para) > 200 else '')
    return None


def build_blog_cards(published: List[Dict]) -> str:
    cards: List[str] = []
    for p in sorted(published, key=lambda x: x.get("publish_at", ""), reverse=True):
        date_val = p.get("published_at") or p.get("publish_at")
        if date_val:
            date_human = datetime.strptime(date_val, DATE_FMT).strftime("%B %d, %Y")
        else:
            date_human = ""
        title = p.get("title") or ""
        desc = p.get("description") or ""
        author = p.get("author") or "EnterpriseChai"
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
        path = safe_slug_filename(p)
        loc = f"https://enterprisechai.com/{path}"
        if loc in xml:
            continue
        lastmod = p.get("published_at") or p.get("publish_at") or iso_today()
        entry = f"    <url>\n        <loc>{loc}</loc>\n        <lastmod>{lastmod}</lastmod>\n    </url>\n"
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
    """Return True when script is allowed to perform git commits."""
    in_ci = os.getenv("GITHUB_ACTIONS", "false").lower() == "true"
    return (not in_ci) and (not no_commit_flag)


def main(preview: bool = False, no_commit: bool = False):
    posts = load_posts()

    # --preview: check that all posts have preview files
    if preview:
        missing = []
        for p in posts:
            slug = p["slug"]
            preview_path = PREVIEWS / f"{slug}.html"
            if not preview_path.exists():
                missing.append(slug)
        if missing:
            print(f"Warning: Missing preview files for: {', '.join(missing)}")
        else:
            print("All posts have preview files.")

    # 1) Mark due posts as published
    posts = ensure_published(posts)

    # 2) Build outputs for all published posts
    published = published_posts(posts)

    # Copy preview HTML to root for published posts
    generated_files: List[str] = []
    posts_meta_changed = False
    
    for p in published:
        orig_desc = p.get("description") or ""
        slug = p["slug"]
        preview_path = PREVIEWS / f"{slug}.html"
        out_path = ROOT / f"{slug}.html"
        
        if not preview_path.exists():
            print(f"Warning: Preview not found for {slug}, skipping")
            continue
            
        # Read preview content
        content = read_text(preview_path)
        
        # Auto-fill description from first paragraph if missing
        if not p.get("description"):
            excerpt = extract_first_paragraph_text(content)
            if excerpt:
                p["description"] = excerpt
                posts_meta_changed = True
        
        # Copy to root if changed or doesn't exist
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

    # 5) Commit changed files
    files_to_commit = []
    if generated_files:
        files_to_commit += generated_files
    if blog_changed:
        files_to_commit.append(str(BLOG_HTML_OUT.relative_to(ROOT)))
    if sitemap_changed:
        files_to_commit.append(str(SITEMAP.relative_to(ROOT)))
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
        description="Publish blog posts from preview HTML files."
    )
    parser.add_argument(
        "--preview",
        action="store_true",
        help="Check that all posts have preview files in previews/ folder.",
    )
    parser.add_argument(
        "--no-commit",
        action="store_true",
        help="Do not create git commits (CI/workflow will handle commits).",
    )
    args = parser.parse_args()
    main(preview=args.preview, no_commit=args.no_commit)
