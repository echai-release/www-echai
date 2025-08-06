# Deployment Checklist

## Pre-deployment
- [ ] Backup current site (backup-current-site branch)
- [ ] Test all pages locally
- [ ] Verify all links work
- [ ] Check mobile responsiveness
- [ ] Validate HTML/CSS

## Files to Replace
- [ ] `index.html` (main homepage)
- [ ] `css/styles.css` (updated styles)
- [ ] `js/main.js` (updated JavaScript)
- [ ] `loopx.html`, `whispr.html`, `concierge.html` (product pages)
- [ ] `blog.html` (blog listing)
- [ ] `about.html` (if updated)

## Files to Keep
- [ ] `images/` folder (your existing images)
- [ ] `CNAME` file (if you have custom domain)
- [ ] Any existing blog post HTML files
- [ ] `robots.txt`, `sitemap.xml` (update if needed)

## Post-deployment Testing
- [ ] Homepage loads correctly
- [ ] All navigation works
- [ ] Mobile menu functions
- [ ] Cookie preferences work
- [ ] External links (Calendly, LoopX) work
- [ ] SEO meta tags are correct
- [ ] Google Analytics (if configured)

## Rollback Plan
If issues occur:
\`\`\`bash
git checkout main
git reset --hard backup-current-site
git push origin main --force
\`\`\`

# EnterpriseChai Website Deployment Checklist

## Pre-Deployment Checklist

### 1. Backup Current Site ✅
- [ ] Create backup branch: `git checkout -b backup-current-site-$(date +%Y%m%d)`
- [ ] Push backup: `git push origin backup-current-site-$(date +%Y%m%d)`

### 2. File Preparation ✅
- [ ] Download all HTML files from v0 project
- [ ] Download CSS files (css/styles.css)
- [ ] Download JS files (js/main.js)
- [ ] Keep existing images/ folder from current repo
- [ ] Verify all file paths are correct

### 3. Local Testing ✅
- [ ] Open index.html in browser
- [ ] Test all navigation links
- [ ] Verify mobile responsiveness
- [ ] Check footer has "Resources" section (not "Info")
- [ ] Test cookie preferences modal
- [ ] Verify all product pages load correctly

### 4. Content Verification ✅
- [ ] Hero section shows correct LoopX messaging
- [ ] Solution section has 3 features with proper icons
- [ ] ROI section shows 3 metrics (50%, +30%, +22%)
- [ ] Platform section shows all 3 products
- [ ] Footer has correct sections: Company, Products, Resources

### 5. SEO & Performance ✅
- [ ] Meta tags are present and correct
- [ ] Structured data is implemented
- [ ] Images have alt text
- [ ] Links have proper attributes
- [ ] Page loads quickly

## Deployment Steps

### Option A: Direct Deployment (Fastest)
\`\`\`bash
git checkout main
# Replace files
git add .
git commit -m "Update to v25 - New EnterpriseChai website"
git push origin main
\`\`\`

### Option B: Staged Deployment (Recommended)
\`\`\`bash
git checkout -b v25-staging
# Add files
git add .
git commit -m "Update to v25 - New EnterpriseChai website"
git push origin v25-staging
# Test at staging URL, then merge to main
git checkout main
git merge v25-staging
git push origin main
\`\`\`

## Post-Deployment Verification

### 1. Live Site Check ✅
- [ ] Visit https://echai-release.github.io
- [ ] All pages load without errors
- [ ] Navigation works correctly
- [ ] Mobile version displays properly
- [ ] Forms and buttons function

### 2. SEO Verification ✅
- [ ] Google Search Console shows no errors
- [ ] Meta tags display correctly in social shares
- [ ] Structured data validates (use Google's Rich Results Test)

### 3. Performance Check ✅
- [ ] Run Lighthouse audit
- [ ] Page speed is acceptable
- [ ] Images load properly
- [ ] No console errors

## Rollback Procedure (If Needed)

If something goes wrong:

\`\`\`bash
# Quick rollback to previous version
git checkout main
git reset --hard backup-current-site-[DATE]
git push origin main --force
\`\`\`

## File Structure After Deployment

\`\`\`
echai-release.github.io/
├── index.html (NEW - v25 homepage)
├── about.html (NEW - about page)
├── loopx.html (NEW - LoopX product page)
├── whispr.html (NEW - Whispr product page)
├── concierge.html (NEW - Concierge product page)
├── blog.html (NEW - blog listing)
├── docs.html (NEW - documentation)
├── careers.html (NEW - careers page)
├── terms.html (NEW - terms of service)
├── privacy.html (NEW - privacy policy)
├── css/
│   └── styles.css (NEW - all styles)
├── js/
│   └── main.js (NEW - all JavaScript)
├── images/ (KEEP EXISTING)
│   ├── logo-black.png
│   ├── logo-white.png
│   └── [all other existing images]
├── sitemap.xml (NEW - SEO sitemap)
├── robots.txt (NEW - search engine instructions)
├── manifest.json (NEW - PWA manifest)
└── CNAME (KEEP IF EXISTS - custom domain)
\`\`\`

## Support

If you encounter issues:
1. Check the backup branch exists
2. Verify all files were copied correctly
3. Test locally before pushing to main
4. Use browser dev tools to debug any issues

## Success Metrics

After deployment, you should see:
- ✅ Clean, modern design
- ✅ Fast loading times
- ✅ Mobile-responsive layout
- ✅ Proper SEO implementation
- ✅ Working contact forms and CTAs
- ✅ Consistent branding across all pages
