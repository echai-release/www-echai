## Scripts

### Publish scheduled blog posts

`publish_blogs.py` reads `content/blog/posts.json` and:

- Publishes posts whose `publish_at` is today or earlier (and `approved: true`).
- Generates individual post pages (uses `previews/<slug>.html` fallback for RTF drafts).
- Rebuilds `blog.html` from `templates/blog.html` (fills `{{BLOG_JSONLD}}` and `{{BLOG_CARDS}}`).
- Updates `sitemap.xml` to include published post URLs (idempotent: avoids duplicates).
- Updates `content/blog/posts.json` (`published` + `published_at`) and commits generated files.

Run locally:

```bash
python3 scripts/publish_blogs.py
```

CI: the repository includes `.github/workflows/publish_blogs.yml` to run the script on a daily schedule or on demand via `workflow_dispatch`.

