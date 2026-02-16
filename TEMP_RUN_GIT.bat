@echo off
cd /d %~dp0

REM Configure git user for repo
git config user.email "devnull@example.com"
git config user.name "Automated Publisher"

REM Remove accidental files if present
git rm --ignore-unmatch .DS_Store || echo .DS_Store not tracked
git rm --ignore-unmatch scripts/__pycache__/publish_blogs.cpython-312.pyc || echo pyc not tracked

REM Stage new files
git add scripts/publish_blogs.py .github/workflows/publish_blogs.yml .gitignore scripts/README.md templates/blog.html templates/post.html content/blog/posts.json

REM Commit if there are staged changes
git diff --staged --quiet || (git commit -m "feat(blog): add automated/scheduled publishing (script + CI); ignore .DS_Store & pyc" && echo committed)

echo DONE
