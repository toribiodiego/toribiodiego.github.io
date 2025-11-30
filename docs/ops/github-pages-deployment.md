# GitHub Pages Deployment Workflow

**Use this when:** You're debugging failed GitHub Actions builds, want to replicate the CI environment locally before pushing, or need to understand how the deployment pipeline works.

This guide describes the automated deployment pipeline for this Hugo site to GitHub Pages, including how to test the CI build locally before pushing changes.

## Overview

The site automatically deploys to GitHub Pages whenever changes are pushed to the `main` branch. The workflow is defined in `.github/workflows/deploy.yaml` and consists of two jobs:

1. **Build**: Validate and build the Hugo site with production settings
2. **Deploy**: Upload the built artifact and deploy to GitHub Pages

## Workflow Configuration

### Trigger Events

The workflow runs automatically on:
- **Push to main branch**: Any commit pushed to `main` triggers a deployment
- **Manual dispatch**: Can be triggered manually from the GitHub Actions tab

```yaml
on:
  push:
    branches: ["main"]
  workflow_dispatch: {}
```

### Permissions

The workflow requires specific GitHub permissions:

- `contents: read` - Read repository contents
- `pages: write` - Write to GitHub Pages
- `id-token: write` - Generate deployment token

### Concurrency Control

Only one deployment runs at a time. If a new deployment starts while one is running, the in-progress deployment is cancelled:

```yaml
concurrency:
  group: "pages"
  cancel-in-progress: true
```

## Build Job

The build job runs on `ubuntu-latest` and performs validation, building, and artifact preparation.

### Environment Variables

Two environment variables control Hugo's production behavior:

- `HUGO_ENV=production` - Enables production mode
- `HUGO_ENVIRONMENT=production` - Sets the Hugo environment

These variables:
- Enable production-only features (analytics, minification, etc.)
- Control template behavior via `hugo.IsProduction`
- Are checked by partials (e.g., analytics bypass, CSS source maps)

### Build Steps

#### 1. Checkout

```yaml
- uses: actions/checkout@v4
  with:
    submodules: true
    fetch-depth: 0
```

- Clones the repository with full Git history (`fetch-depth: 0`)
- Initializes Git submodules (for Hugo themes)
- Full history is needed for `--enableGitInfo` (last modified dates)

#### 2. Setup Hugo

```yaml
- uses: peaceiris/actions-hugo@v2
  with:
    hugo-version: "0.148.2"
    extended: true
```

- Installs Hugo Extended v0.148.2
- Extended version required for SCSS/SASS processing

#### 3. Cache Hugo Resources

```yaml
- name: Cache Hugo resources
  uses: actions/cache@v4
  with:
    path: |
      ~/.cache/hugo
      resources/_gen
    key: ${{ runner.os }}-hugo-${{ hashFiles('**/go.sum', 'config/**', 'assets/**') }}
    restore-keys: |
      ${{ runner.os }}-hugo-
```

Caches Hugo's internal cache and generated resources to speed up builds. The cache is invalidated when:
- Configuration files change (`config/**`)
- Assets change (`assets/**` - SCSS, icons, etc.)
- Hugo modules change (`go.sum`)

See [building-and-deployment.md](./building-and-deployment.md#build-caching) for details.

#### 4. Validate

```yaml
- name: Validate
  run: hugo --printI18nWarnings --printUnusedTemplates --printPathWarnings --buildDrafts=false --buildFuture=false --buildExpired=false
```

Validation step checks for potential issues without failing the build:
- **--printI18nWarnings**: Report internationalization issues
- **--printUnusedTemplates**: Identify unused template files
- **--printPathWarnings**: Catch problematic file paths

See [building-and-deployment.md](./building-and-deployment.md#pre-deploy-validation) for details.

#### 5. Build

```yaml
- name: Build
  run: hugo --gc --enableGitInfo --panicOnWarning --cleanDestinationDir --minify --buildDrafts=false --buildFuture=false --buildExpired=false
```

Production build with hardened flags:

**Performance and reliability:**
- `--gc`: Run garbage collection after build
- `--enableGitInfo`: Enable Git info for last modified dates
- `--panicOnWarning`: Fail build on warnings
- `--cleanDestinationDir`: Clean destination before build
- `--minify`: Minify HTML, CSS, JS

**Content safety (defense-in-depth):**
- `--buildDrafts=false`: Never build content marked `draft: true`
- `--buildFuture=false`: Never build future-dated content
- `--buildExpired=false`: Never build expired content

See [building-and-deployment.md](./building-and-deployment.md#production-build-flags) for details.

#### 6. Upload Artifact

```yaml
- name: Upload artifact
  uses: actions/upload-pages-artifact@v3
  with:
    path: ./public
```

Uploads the `public/` directory as a GitHub Pages artifact.

## Deploy Job

The deploy job runs after the build job completes successfully:

```yaml
deploy:
  needs: build
  runs-on: ubuntu-latest
  environment:
    name: github-pages
    url: ${{ steps.deployment.outputs.page_url }}
  steps:
    - id: deployment
      uses: actions/deploy-pages@v4
```

- Depends on `build` job completing
- Uses GitHub's `github-pages` environment
- Deploys the uploaded artifact to GitHub Pages

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

Verify CNAME is present:

```bash
cat public/CNAME
```

Expected: `diegotoribio.com`

Verify draft items are excluded:

```bash
ls public/portfolio/
```

Should NOT include draft directories (`checkers/`, `extraction/`, `emotion_classification/`).

### 5. Test Production Build Locally

Serve the built site to verify behavior:

```bash
python3 -m http.server -d public 8000
```

Visit `http://localhost:8000` and verify:
- All pages render correctly
- Navigation works as expected
- Analytics should load (unless using preview mode)
- Custom domain is set (check CNAME in build)

To test preview mode (analytics bypass):

```bash
open http://localhost:8000/?preview=true
```

You should see:
- Orange "Preview Mode" badge in bottom-right
- Console message: `[Analytics] Skipped - Preview mode active`

See [analytics-and-referrals.md](../analytics/analytics-and-referrals.md) for preview mode details.

### 6. Test Social Media Previews

After deployment, verify that shared links render properly on social platforms with correct images and descriptions:

**Facebook/LinkedIn (Open Graph):**
```
https://developers.facebook.com/tools/debug/
```

Paste your site URL (e.g., `https://diegotoribio.com`) and click "Debug" to see:
- Preview image (should show `/pfp.jpg`)
- Title and description
- Any Open Graph errors or warnings

**Twitter (Twitter Cards):**
```
https://cards-dev.twitter.com/validator
```

Enter your URL to preview how tweets with your link will appear:
- Card type (should be `summary_large_image`)
- Image, title, and description rendering

**LinkedIn (Post Inspector):**
```
https://www.linkedin.com/post-inspector/
```

Check how shared posts appear in LinkedIn feeds.

These validators also clear cached previews, which is useful if you updated metadata and need platforms to re-scrape your site.

### 7. Clean Up Environment

Unset environment variables when done:

```bash
unset HUGO_ENV
unset HUGO_ENVIRONMENT
```

Or close your terminal session.

## Build Script

You can create a script to automate local CI testing:

### `scripts/build-ci.sh`

```bash
#!/bin/bash
set -e  # Exit on any error

echo "Replicating CI build locally..."
echo

# Set production environment
export HUGO_ENV=production
export HUGO_ENVIRONMENT=production

echo "Step 1: Validation"
hugo --printI18nWarnings --printUnusedTemplates --printPathWarnings \
     --buildDrafts=false --buildFuture=false --buildExpired=false
echo

echo "Step 2: Production build"
hugo --gc --enableGitInfo --panicOnWarning --cleanDestinationDir --minify \
     --buildDrafts=false --buildFuture=false --buildExpired=false
echo

echo "Step 3: Verification"
echo "CNAME check:"
cat public/CNAME
echo
echo "Portfolio directories (should only show published items):"
ls public/portfolio/
echo

echo "Build complete! To test locally:"
echo "  python3 -m http.server -d public 8000"
echo
echo "Then visit:"
echo "  http://localhost:8000"
echo "  http://localhost:8000/?preview=true (analytics bypass)"
```

Make it executable:

```bash
chmod +x scripts/build-ci.sh
```

Run it before pushing:

```bash
./scripts/build-ci.sh
```

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

The custom domain is configured via `static/CNAME` (see [building-and-deployment.md](./building-and-deployment.md#cname-configuration)).

## Troubleshooting

### Build Fails with "panic: Template warnings"

**Cause**: The `--panicOnWarning` flag makes Hugo exit on any warning.

**Solution**:
1. Run validation locally to see warnings:
   ```bash
   export HUGO_ENV=production HUGO_ENVIRONMENT=production
   hugo --printI18nWarnings --printUnusedTemplates --printPathWarnings
   ```
2. Fix legitimate warnings (broken links, missing templates, etc.)
3. Unused theme templates are expected and safe to ignore

### CNAME Missing After Deployment

**Cause**: `static/CNAME` file is missing or not included in build.

**Solution**:
1. Verify `static/CNAME` exists and contains `diegotoribio.com`
2. Run a local build and check `public/CNAME` exists
3. If missing, the file was not copied during build

### Draft Content Appearing in Production

**Cause**: Draft flags not set correctly or old build artifacts.

**Solution**:
1. Verify workflow uses `--buildDrafts=false --buildFuture=false --buildExpired=false`
2. Check content front matter has `draft: true`
3. The workflow always runs a clean build (`--cleanDestinationDir`) so this should not happen

### Cache Issues

**Cause**: Stale cache causing build problems.

**Solution**:
1. Go to GitHub Actions > Caches
2. Delete all caches for this repository
3. Next build will create fresh cache

## Security Considerations

### Environment Variables

`HUGO_ENV` and `HUGO_ENVIRONMENT` are set in the workflow file, not as GitHub secrets, because:
- They are not sensitive (just control build mode)
- They need to be visible in build logs for debugging
- They are required for production features to enable correctly

### Permissions

The workflow uses minimal required permissions:
- `contents: read` - Only reads repository code
- `pages: write` - Only writes to GitHub Pages (not repository)
- `id-token: write` - Only generates deployment tokens

### Branch Protection

Consider enabling branch protection on `main` to:
- Require pull request reviews before merge
- Require status checks to pass (CI build must succeed)
- Prevent force pushes that could break deployment

## Additional Resources

- [building-and-deployment.md](./building-and-deployment.md) - Build modes, drafts, clean builds, verification
- [local-preview.md](./local-preview.md) - Local development workflow
- [analytics-and-referrals.md](../analytics/analytics-and-referrals.md) - Preview mode and analytics bypass
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Hugo Build Options](https://gohugo.io/commands/hugo/)
