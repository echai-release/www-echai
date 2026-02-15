#!/usr/bin/env bash
set -e

# configure git user for local commits (repo-local)
git config user.email "devnull@example.com"
git config user.name "Automated Publisher"

# remove accidental files (ignore if not present)
git rm --ignore-unmatch .DS_Store || true
git rm --ignore-unmatch scripts/__pycache__/publish_blogs.cpython-312.pyc || true

# add new automation files
git add scripts/publish_blogs.py .github/workflows/publish_blogs.yml .gitignore scripts/README.md templates/blog.html templates/post.html content/blog/posts.json

# commit
if git diff --staged --quiet; then
  echo "No staged changes to commit"
else
  git commit -m "feat(blog): add automated/scheduled publishing (script + CI); ignore .DS_Store & pyc"
fi

echo "done"
