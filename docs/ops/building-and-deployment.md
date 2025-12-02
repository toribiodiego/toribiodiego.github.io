# Building and Deployment Guide

**Use this when:** You need to create a production-ready build, understand how drafts are handled in different environments, or perform a clean build to troubleshoot issues.

This guide covers building the site for production, handling drafts, and performing clean builds.

## Build Modes

### Development Mode (with Drafts)

For local development and testing, include draft and future-dated content:

```bash
hugo server --buildDrafts --buildFuture
```

Or use the shorthand:

```bash
hugo server -DF
```

This will:
- Include all portfolio items marked with `draft: true`
- Include posts with future dates
- Show ~43 total pages

### Production Mode (Without Drafts)

For production deployment, build without drafts:

```bash
hugo
```

This will:
- Exclude all content marked with `draft: true`
- Exclude future-dated posts
- Build only published content (~28 pages)
- Generate output in the `public/` directory

## Draft Content Management

### Hiding Portfolio Items

To hide a portfolio item (prevent it from appearing on the portfolio page and make it inaccessible via URL):

1. Open the portfolio item's `index.md` file (e.g., `content/portfolio/project-name/index.md`)
2. Add or verify `draft: true` in the front matter:

```yaml
---
title: "Project Name"
date: 2024-12-20
portfolio_tags: ["Tag1", "Tag2"]
summary: "Project summary"
draft: true
---
```

### Publishing Draft Items

To publish a previously hidden item:

1. Open the item's `index.md` file
2. Change `draft: true` to `draft: false` or remove the line entirely
3. Rebuild the site with `hugo`

### Currently Hidden Portfolio Items

The following items are currently set as drafts:
- Board Game Agents (`content/portfolio/checkers/`)
- Extraction (`content/portfolio/extraction/`)
- Multi-Label Emotion Classification (`content/portfolio/emotion_classification/`)

## Clean Builds

### Why Clean Builds Are Needed

Hugo builds are incremental by default. This means:
- Old files may persist in `public/` even after being marked as drafts
- Switching from development to production builds may leave draft content accessible
- Renamed or deleted content may still exist in the output

### Performing a Clean Build

To ensure a fresh, production-ready build:

```bash
# Remove the entire public directory
rm -rf public

# Rebuild for production
hugo
```

Or as a one-liner:

```bash
rm -rf public && hugo
```

### When to Use Clean Builds

Perform a clean build when:
- Switching from development (`hugo server -DF`) to production deployment
- After marking items as drafts or publishing previously hidden content
- Before deploying to production to ensure no leftover files
- Debugging unexpected content appearing on the site
- After significant structural changes to content organization

### Clean Build for Development

For a clean development build with drafts:

```bash
rm -rf public && hugo --buildDrafts --buildFuture
```

## Verifying Your Build

### Check Page Count

Production builds should have fewer pages than development:

```bash
hugo | grep "Pages"
```

Expected output: `Pages | 28` (without drafts)

Compare with:

```bash
hugo --buildDrafts --buildFuture | grep "Pages"
```

Expected output: `Pages | 43` (with drafts)

### Verify Draft Items Are Hidden

After a production build, check that draft directories don't exist:

```bash
ls public/portfolio/
```

Should **NOT** include:
- `checkers/`
- `extraction/`
- `emotion_classification/`

Should **ONLY** include published items:
- `agnus/`
- `alzheimers_detection/`

### Check Portfolio Page Content

Verify the portfolio index doesn't list draft items:

```bash
grep -E "Board Game|Extraction|Emotion" public/portfolio/index.html
```

This should return no results (or only matches in highlights/descriptions of other projects).

## Deployment Checklist

Before deploying to production:

1. **Clean build**: `rm -rf public && hugo`
2. **Verify page count**: Should match expected production count
3. **Spot check**: Open `public/portfolio/index.html` and verify only published items appear
4. **Check draft directories**: Ensure `public/portfolio/` doesn't contain draft item folders
5. **Verify CNAME**: Confirm `public/CNAME` exists with correct domain (`diegotoribio.com`)
6. **Test locally**: Serve the production build to verify: `hugo server -s public` (note: this won't work directly, use `python3 -m http.server -d public` instead)
7. **Deploy**: Upload contents of `public/` directory to your hosting provider

### CNAME Configuration

The `static/CNAME` file ensures GitHub Pages maintains the custom domain configuration across deployments:

- **Location**: `static/CNAME` (automatically copied to `public/CNAME` during build)
- **Content**: `diegotoribio.com`
- **Purpose**: Tells GitHub Pages to serve the site at the custom domain

If the CNAME file is missing from the build output, the custom domain will be removed on each deployment, requiring manual reconfiguration in GitHub Pages settings.

### Production Build Flags

The GitHub Actions workflow uses hardened build flags for reliability:

```bash
hugo --gc --enableGitInfo --panicOnWarning --cleanDestinationDir --minify \
     --buildDrafts=false --buildFuture=false --buildExpired=false
```

**Performance and reliability flags:**
- `--gc`: Run garbage collection after build
- `--enableGitInfo`: Enable Git info for last modified dates
- `--panicOnWarning`: Fail build on warnings to catch issues early
- `--cleanDestinationDir`: Clean destination directory before build
- `--minify`: Minify output (HTML, CSS, JS)

**Content safety flags (defense-in-depth):**
- `--buildDrafts=false`: Never build content marked with `draft: true`
- `--buildFuture=false`: Never build content with future dates
- `--buildExpired=false`: Never build content with expired dates

These explicit flags ensure accidental publication of unfinished content is
impossible, even if environment variables or configuration are misconfigured.

Environment variables set: `HUGO_ENV=production`, `HUGO_ENVIRONMENT=production`

### Pre-Deploy Validation

Before the production build runs, a validation step checks for potential issues:

```bash
hugo --printI18nWarnings --printUnusedTemplates --printPathWarnings \
     --buildDrafts=false --buildFuture=false --buildExpired=false
```

**Validation flags:**
- `--printI18nWarnings`: Report internationalization issues
- `--printUnusedTemplates`: Identify unused template files
- `--printPathWarnings`: Catch problematic file paths

**Purpose:**
This validation step provides early warning of potential issues without
failing the build. The subsequent build step with `--panicOnWarning` will
fail on critical issues, while validation warnings help identify cleanup
opportunities (like unused theme templates).

**Workflow:**
1. **Validate**: Check for warnings and issues (non-blocking)
2. **Build**: Create production site (fails on warnings)
3. **Deploy**: Publish to GitHub Pages

### Build Caching

The workflow caches Hugo resources to speed up builds:

**Cached directories:**
- `~/.cache/hugo` - Hugo's internal cache
- `resources/_gen` - Generated resources (processed SCSS, images)

**Cache invalidation:**
The cache is rebuilt when:
- Configuration files change (`config/**`)
- Asset files change (`assets/**` - SCSS, icons, etc.)
- Hugo modules change (`go.sum`)

**Benefits:**
- Faster CI builds (especially for SCSS compilation)
- Reduced build times on subsequent deployments
- Lower resource usage on GitHub Actions runners

**Cache behavior:**
- First build: Creates cache (normal build time)
- Subsequent builds: Restores cache (faster build time)
- Configuration/asset changes: Partial cache restore with rebuild

## Troubleshooting

### Draft Items Still Appearing

**Problem**: Draft portfolio items are showing up on the portfolio page or accessible via URL.

**Solution**:
1. Verify `draft: true` is set in the item's front matter
2. Perform a clean build: `rm -rf public && hugo`
3. Check that you're not using `--buildDrafts` flag

### Inconsistent Build Output

**Problem**: Different builds produce different results.

**Solution**:
1. Always use a clean build for production
2. Check for cached files in `public/` or `resources/`
3. Verify Hugo version: `hugo version`

### Old Content Still Visible After Deletion

**Problem**: Deleted or renamed content still appears in the built site.

**Solution**:
1. Perform a clean build: `rm -rf public && hugo`
2. Consider also cleaning resources: `rm -rf resources/_gen/`

## Build Scripts

You can create helper scripts for common build tasks:

### `scripts/build-production.sh`

```bash
#!/bin/bash
echo "Performing clean production build..."
rm -rf public
hugo
echo "Build complete. Output in public/"
```

### `scripts/build-dev.sh`

```bash
#!/bin/bash
echo "Performing clean development build..."
rm -rf public
hugo --buildDrafts --buildFuture
echo "Build complete with drafts. Output in public/"
```

Make them executable:

```bash
chmod +x scripts/build-production.sh scripts/build-dev.sh
```

## Additional Resources

- [GitHub Pages Deployment Workflow](./github-pages-deployment.md)
- [Hugo Build Options](https://gohugo.io/commands/hugo/)
- [Hugo Draft/Future/Expired Content](https://gohugo.io/getting-started/usage/#draft-future-and-expired-content)
- [Local Preview Workflow](./local-preview.md)
