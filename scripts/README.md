## Scripts

### Publish scheduled blog posts

`publish_blogs.py` reads `content/blog/posts.json` and:

- Publishes posts whose `publish_at` is today or earlier.
- Rebuilds `blog.html` from `templates/blog.html`.
- Updates `sitemap.xml` to include published post URLs.

Run locally:

```bash
python3 scripts/publish_blogs.py
```

