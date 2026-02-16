## Blog content

`posts.json` is the source of truth for the blog index and scheduled publishing.

Each post has:
- `slug`: becomes `<slug>.html`
- `publish_at`: `YYYY-MM-DD` (post is published when `publish_at <= today`)
- `approved`: `true|false` (must be `true` to publish)
- `published`: `true|false` (set to `true` by the script when a post is published)
- `published_at`: `YYYY-MM-DD` (set by the script when publishing)
- `source_type`:
  - `full_html`: the source file is already a complete HTML page (we will not re-template it)
  - `body_text`: the source file is plain text; we wrap it using `templates/post.html`
  - `rtf`: the source file is RTF; we extract text and wrap it using `templates/post.html`

