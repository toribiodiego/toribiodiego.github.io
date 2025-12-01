# GitHub Pages Deployment Workflow

**Use this when:** You're debugging failed GitHub Actions builds, want to replicate the CI environment locally before pushing, or need to understand how the deployment pipeline works.

This guide describes the automated deployment pipeline for this Hugo site to GitHub Pages, including how to test the CI build locally before pushing changes.

## Workflow Overview

The site automatically deploys to GitHub Pages whenever changes are pushed to the `main` branch. The workflow is defined in `.github/workflows/deploy.yaml` and consists of two jobs:

1. **Build**: Validate and build the Hugo site with production settings
2. **Deploy**: Upload the built artifact and deploy to GitHub Pages

### Key Workflow Settings

**Trigger events:**
- Push to `main` branch
- Manual dispatch (via GitHub Actions tab)

**Concurrency control:**
- Only one deployment runs at a time
- In-progress deployments are cancelled if a new one starts

**Permissions:**
- `contents: read` - Read repository contents
- `pages: write` - Write to GitHub Pages
- `id-token: write` - Generate deployment token

## Build Job Steps

The CI build job performs the following steps:

1. **Checkout** - Clone repo with full Git history and submodules
2. **Setup Hugo** - Install Hugo Extended v0.148.2
3. **Cache** - Cache Hugo resources (`resources/_gen`, `~/.cache/hugo`)
4. **Validate** - Run Hugo with warning flags to catch issues
5. **Build** - Production build with minification and validation flags
6. **Upload** - Package `public/` as GitHub Pages artifact

### Environment Variables

The CI sets these environment variables for production behavior:

```bash
HUGO_ENV=production
HUGO_ENVIRONMENT=production
```

These enable production-only features (analytics, minification) and control template behavior via `hugo.IsProduction`.

### Build Commands

**Validation:**
```bash
hugo --printI18nWarnings --printUnusedTemplates --printPathWarnings \
     --buildDrafts=false --buildFuture=false --buildExpired=false
```

**Production build:**
```bash
hugo --gc --enableGitInfo --panicOnWarning --cleanDestinationDir --minify \
     --buildDrafts=false --buildFuture=false --buildExpired=false
```

For detailed flag explanations, see [building-and-deployment.md](building-and-deployment.md).

## Testing the CI Build Locally

To replicate the CI build process on your local machine before pushing changes:

### 1. Set Environment Variables

```bash
export HUGO_ENV=production
export HUGO_ENVIRONMENT=production
```

These must be set to match the CI environment and enable production behavior.

### 2. Run Validation

```bash
hugo --printI18nWarnings --printUnusedTemplates --printPathWarnings \
     --buildDrafts=false --buildFuture=false --buildExpired=false
```

Check output for warnings. Expected warnings:
- Unused theme templates (safe to ignore if using a third-party theme)

Unexpected warnings should be investigated before pushing.

### 3. Run Production Build

```bash
hugo --gc --enableGitInfo --panicOnWarning --cleanDestinationDir --minify \
     --buildDrafts=false --buildFuture=false --buildExpired=false
```

This command replicates the exact CI build. It will:
- Exit with error if warnings occur
- Clean and rebuild `public/` directory
- Generate minified output

### 4. Verify Build Output

Check the build completed successfully:

```bash
hugo --gc --enableGitInfo --panicOnWarning --cleanDestinationDir --minify \
     --buildDrafts=false --buildFuture=false --buildExpired=false | grep "Total"
```

Expected output shows page count (should match production count):
```
Total in 234 ms
```

**Verify CNAME:**
```bash
cat public/CNAME
```
Expected: `diegotoribio.com`

**Verify draft exclusion:**
```bash
ls public/portfolio/
```
Should NOT include draft directories.

### 5. Test Production Build Locally

Serve the built site to verify behavior:

```bash
python3 -m http.server -d public 8000
```

Visit `http://localhost:8000` and verify:
- All pages render correctly
- Navigation works as expected
- Analytics should load (unless using preview mode)

**Test preview mode** (analytics bypass):
```bash
open http://localhost:8000/?preview=true
```

You should see:
- Orange "Preview Mode" badge in bottom-right
- Console message: `[Analytics] Skipped - Preview mode active`

See [../analytics/analytics-and-referrals.md](../analytics/analytics-and-referrals.md) for preview mode details.

### 6. Test Social Media Previews

After deployment, verify that shared links render properly on social platforms:

**Facebook/LinkedIn (Open Graph):**
```
https://developers.facebook.com/tools/debug/
```

**Twitter (Twitter Cards):**
```
https://cards-dev.twitter.com/validator
```

**LinkedIn (Post Inspector):**
```
https://www.linkedin.com/post-inspector/
```

These validators also clear cached previews, useful if you updated metadata.

### 7. Clean Up Environment

Unset environment variables when done:

```bash
unset HUGO_ENV
unset HUGO_ENVIRONMENT
```

Or close your terminal session.

## Monitoring Deployments

### GitHub Actions Tab

View deployment status at:
```
https://github.com/<username>/<repo>/actions
```

Each workflow run shows:
1. Validation output and warnings
2. Build output and statistics
3. Deployment status and URL

### Deployment URL

After successful deployment, the site is available at:
- Custom domain: `https://diegotoribio.com`
- GitHub Pages URL: `https://<username>.github.io/<repo>/`

The custom domain is configured via `static/CNAME` (see [building-and-deployment.md](building-and-deployment.md)).

## Troubleshooting

### Build Fails with "panic: Template warnings"

**Cause**: The `--panicOnWarning` flag makes Hugo exit on any warning.

**Solution**:
1. Run validation locally to see warnings
2. Fix legitimate warnings (broken links, missing templates, etc.)
3. Unused theme templates are expected and safe to ignore

### CNAME Missing After Deployment

**Cause**: `static/CNAME` file is missing or not included in build.

**Solution**:
1. Verify `static/CNAME` exists and contains `diegotoribio.com`
2. Run a local build and check `public/CNAME` exists

### Draft Content Appearing in Production

**Cause**: Draft flags not set correctly.

**Solution**:
1. Verify workflow uses `--buildDrafts=false`
2. Check content front matter has `draft: true`
3. Workflow always runs clean build (`--cleanDestinationDir`)

### Cache Issues

**Cause**: Stale cache causing build problems.

**Solution**:
1. Go to GitHub Actions > Caches
2. Delete all caches for this repository
3. Next build will create fresh cache

## Related Documentation

- [building-and-deployment.md](building-and-deployment.md) - Build modes, flags, clean builds, caching
- [local-preview.md](local-preview.md) - Local development workflow
- [../analytics/analytics-and-referrals.md](../analytics/analytics-and-referrals.md) - Preview mode and analytics bypass
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Hugo Build Options](https://gohugo.io/commands/hugo/)
