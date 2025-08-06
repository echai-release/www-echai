#!/bin/bash

# EnterpriseChai Website Deployment Script
# This script helps deploy the new v25 website to GitHub Pages

echo "🚀 EnterpriseChai Website Deployment"
echo "=================================="

# Step 1: Clone your existing repo (if not already local)
git clone https://github.com/echai-release/echai-release.github.io.git
cd echai-release.github.io

# Step 2: Create backup branch
echo "📦 Creating backup of current site..."
git checkout -b backup-current-site-$(date +%Y%m%d)
git push origin backup-current-site-$(date +%Y%m%d)
echo "✅ Backup created successfully"

# Step 3: Create new feature branch
echo "🔄 Switching to main branch..."
git checkout main

echo "🧪 Creating staging branch..."
git checkout -b v25-staging

echo "📋 Next steps:"
echo "1. Copy the new HTML, CSS, and JS files to your repository"
echo "2. Keep your existing images/ folder"
echo "3. Test locally by opening index.html"
echo "4. Run: git add . && git commit -m 'Update to v25'"
echo "5. Run: git push origin v25-staging"
echo "6. Test the staging branch"
echo "7. When ready: git checkout main && git merge v25-staging"
echo "8. Run: git push origin main"

echo ""
echo "🔗 Your site will be live at: https://echai-release.github.io"
echo "📧 Need help? Check the deployment-checklist.md file"

# Step 4: Replace files with new version
# (You'll copy the files from our project here)

# Step 5: Commit changes
# git add .
# git commit -m "Update to v25: Standardized icons, improved ROI section, full HTML/CSS conversion"

# Step 6: Push and create PR
# git push origin v25-staging

# Step 7: After testing, merge to main
# git checkout main
# git merge v25-staging
# git push origin main

# Step 8: Clean up
# git branch -d v25-staging
# git push origin --delete v25-staging
