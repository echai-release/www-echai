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
python3 scripts/publish_blogs.py                       # run publish (commits allowed locally)
python3 scripts/publish_blogs.py --no-commit           # run publish but do not create git commits
python3 scripts/publish_blogs.py --preview             # generate preview HTML files for RTF drafts (writes to previews/)
```

Notes:
- `--preview` writes `previews/<slug>.html` for `source_type: rtf` posts (overwrites existing previews). Previews are written to disk only and are not automatically committed.
- When running inside GitHub Actions the script will *not* create git commits (the workflow performs commit/push). Use `--no-commit` to force the same behavior locally.
- The CI workflow `/.github/workflows/publish_blogs.yml` runs the script on a schedule and is responsible for staging/committing/pushing generated files.

