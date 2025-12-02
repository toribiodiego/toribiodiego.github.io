# Static Directory

This directory contains static assets that Hugo copies verbatim to the `public/` directory during builds. Unlike assets in `assets/`, these files are **not processed** - they're served exactly as they appear here.

## How Static Files Work

**Hugo's behavior:**
- Files in `static/` are copied to `public/` root
- Directory structure is preserved
- No compilation, minification, or fingerprinting
- Accessible at `/path/to/file` URLs

**Example:**
```
static/js/preview-flag.js  →  public/js/preview-flag.js
                           →  https://yoursite.com/js/preview-flag.js
```

**Key difference from `assets/`:**
- `assets/` - Processed by Hugo Pipes (SCSS compilation, minification, fingerprinting)
- `static/` - Copied verbatim, no processing

## Directory Structure

```
static/
├── README.md                      # This file
├── CNAME                          # GitHub Pages custom domain
├── site.webmanifest               # PWA manifest for installable web app
├── Toribio_Diego_Resume.pdf      # Resume file (public download)
├── pfp.jpg                        # Profile picture original (4.2 MB)
├── pfp-optimized.webp             # Optimized profile picture WebP (18 KB)
├── pfp-optimized.jpg              # Optimized profile picture JPEG (31 KB)
├── dragon-icon.jpg                # Source dragon icon image
├── favicon-light.ico              # Light mode favicon (black dragon)
├── favicon-dark.ico               # Dark mode favicon (white dragon)
├── favicon-light.png              # Light mode 32x32 PNG
├── favicon-dark.png               # Dark mode 32x32 PNG
├── apple-touch-icon-light.png    # Light mode iOS icon (180x180)
├── apple-touch-icon-dark.png     # Dark mode iOS icon (180x180)
├── favicon.ico                    # Default fallback (light mode copy)
├── favicon.png                    # Default fallback (light mode copy)
├── apple-touch-icon.png           # Default fallback (light mode copy)
├── css/                           # (empty) Reserved for future static CSS
└── js/                            # JavaScript files
    ├── preview-flag.js            # Preview mode detection and management
    └── theme-toggle.js            # Dark/light theme toggle functionality
```

## Files

### `site.webmanifest`

**Purpose:** Progressive Web App (PWA) manifest for installable web app support.

**Access:** `https://diegotoribio.com/site.webmanifest`

**Size:** ~725 bytes

**Format:** JSON

**Contents:**
- `name`: Full site name ("Diego Toribio")
- `short_name`: Abbreviated name for home screen ("Diego T")
- `description`: Site description for app stores
- `start_url`: URL to load when app launches ("/")
- `display`: Display mode ("standalone" - fullscreen app-like)
- `theme_color`: Browser UI color (`#ffffff` - white for light mode)
- `background_color`: Splash screen background (`#ffffff`)
- `icons`: Array of app icons (favicon variants)

**Loaded via:** `layouts/partials/custom_head.html`:
```html
<link rel="manifest" href="/site.webmanifest">
```

**How it works:**
1. Browser detects manifest and offers "Install" or "Add to Home Screen"
2. When installed, site launches as standalone app
3. Custom icons appear on home screen/app drawer
4. Theme color customizes browser UI elements

**Benefits:**
- **Installable:** Users can install site as app on desktop/mobile
- **Offline capability:** Foundation for service worker/offline support
- **Better UX:** Standalone mode hides browser UI for app-like feel
- **Discoverability:** Better app store and search engine visibility

**Updating:**

Edit `static/site.webmanifest` to change:
- App name or description
- Theme colors
- Available icons
- Display mode or start URL

**Testing:**

1. Chrome DevTools → Application tab → Manifest section
2. Check for warnings about icons or configuration
3. Test "Install" prompt on desktop Chrome
4. Test "Add to Home Screen" on mobile devices

**Note:** PWA features like offline support require a service worker (not yet implemented). This manifest provides the foundation for future PWA enhancements.

### `CNAME`

**Purpose:** GitHub Pages custom domain configuration.

**Content:**
```
diegotoribio.com
```

**How it works:**
1. GitHub Pages reads this file during deployment
2. Configures DNS to serve site at `diegotoribio.com`
3. Without this file, site only accessible at `username.github.io/repo`

**IMPORTANT:** Do not delete or modify unless changing domain.

**See:** [docs/ops/building-and-deployment.md](../docs/ops/building-and-deployment.md) for deployment details.

### `Toribio_Diego_Resume.pdf`

**Purpose:** Public resume file linked from about page.

**Access:** `https://diegotoribio.com/Toribio_Diego_Resume.pdf`

**Size:** ~97 KB

**Usage:**
```html
<a href="/Toribio_Diego_Resume.pdf" download>Download Resume</a>
```

**Updating:**
1. Export updated resume as PDF
2. Replace file in `static/`
3. Keep filename consistent (or update links)
4. Commit and deploy

### `pfp.jpg`

**Purpose:** Original high-resolution profile picture (source image).

**Access:** `https://diegotoribio.com/pfp.jpg`

**Size:** ~4.2 MB

**Dimensions:** 3648×3648 pixels

**Note:** This is the original source image. For web usage, use the optimized versions below.

### `pfp-optimized.webp` / `pfp-optimized.jpg`

**Purpose:** Optimized profile pictures for web usage with responsive image support.

**Access:**
- `https://diegotoribio.com/pfp-optimized.webp` (WebP format)
- `https://diegotoribio.com/pfp-optimized.jpg` (JPEG fallback)

**Size:**
- WebP: ~18 KB (99.6% reduction from original)
- JPEG: ~31 KB (99.3% reduction from original)

**Dimensions:** 500×500 pixels

**Usage in content:**
```html
<picture>
  <source srcset="/pfp-optimized.webp" type="image/webp">
  <img src="/pfp-optimized.jpg" alt="Profile picture" width="250" height="250" loading="lazy" style="border-radius: 12px;">
</picture>
```

**How it works:**
1. Modern browsers load WebP format (smallest file size, best quality)
2. Older browsers fall back to JPEG format
3. Lazy loading defers load until image is near viewport
4. Explicit dimensions prevent layout shift

**Regenerating:**
```bash
cd static
# Generate WebP (modern browsers)
magick pfp.jpg -resize 500x500 -quality 85 -define webp:method=6 pfp-optimized.webp

# Generate JPEG fallback (older browsers)
magick pfp.jpg -resize 500x500 -quality 85 pfp-optimized.jpg
```

**Benefits:**
- 99%+ file size reduction improves page load time
- WebP format provides better compression than JPEG
- Responsive images serve optimal format per browser
- Lazy loading reduces initial page weight

**Authoring limits:**
- Maximum width: 1200px
- Maximum file size: 500KB per image
- Required formats: WebP + JPEG fallback
- Recommended quality: 85

See [docs/authoring/images.md](../docs/authoring/images.md) for complete optimization workflow.

### Theme-Aware Favicons

**Overview:** The site uses dynamic favicons that automatically switch between light and dark versions based on the user's theme preference.

**Source:** `dragon-icon.jpg` - Aztec/Mayan-style dragon sticker (1200×915)

**How it works:**
1. JavaScript in `layouts/partials/favicon.html` detects current theme
2. When theme changes (via theme-toggle.js), favicons update automatically
3. Black dragon shown in light mode, white dragon in dark mode
4. Integrates with existing theme toggle system

### `favicon-light.ico` / `favicon-dark.ico`

**Purpose:** Multi-resolution ICO files for light and dark modes.

**Access:**
- `https://diegotoribio.com/favicon-light.ico` (black dragon)
- `https://diegotoribio.com/favicon-dark.ico` (white dragon)

**Size:** ~12 KB each

**Resolutions:** Contains 16×16, 32×32, and 48×48 pixel variants

**Usage:** Dynamically loaded via JavaScript in `layouts/partials/favicon.html`:
```javascript
document.getElementById('favicon-ico').href = `/favicon-${theme}.ico`;
```

**Regenerating:**
```bash
# Light mode (black dragon)
cd static
magick dragon-icon.jpg -fuzz 10% -transparent white dragon-black.png
magick dragon-black.png -resize 16x16 temp-16.png
magick dragon-black.png -resize 32x32 temp-32.png
magick dragon-black.png -resize 48x48 temp-48.png
magick temp-*.png favicon-light.ico
rm temp-*.png

# Dark mode (white dragon)
magick dragon-black.png -channel RGB -negate dragon-white.png
magick dragon-white.png -resize 16x16 temp-16.png
magick dragon-white.png -resize 32x32 temp-32.png
magick dragon-white.png -resize 48x48 temp-48.png
magick temp-*.png favicon-dark.ico
rm temp-*.png dragon-black.png dragon-white.png
```

### `favicon-light.png` / `favicon-dark.png`

**Purpose:** 32×32 PNG favicons for modern browsers.

**Access:**
- `https://diegotoribio.com/favicon-light.png` (black dragon)
- `https://diegotoribio.com/favicon-dark.png` (white dragon)

**Size:** ~2.3 KB each

**Resolution:** 32×32 pixels with transparent background

**Usage:** Dynamically loaded via JavaScript
```javascript
document.getElementById('favicon-png').href = `/favicon-${theme}.png`;
```

**Regenerating:**
```bash
magick dragon-icon.jpg -fuzz 10% -transparent white dragon-black.png
magick dragon-black.png -resize 32x32 favicon-light.png
magick dragon-black.png -channel RGB -negate -resize 32x32 favicon-dark.png
rm dragon-black.png
```

### `apple-touch-icon-light.png` / `apple-touch-icon-dark.png`

**Purpose:** iOS/iPadOS home screen icons for light and dark modes.

**Access:**
- `https://diegotoribio.com/apple-touch-icon-light.png` (black dragon)
- `https://diegotoribio.com/apple-touch-icon-dark.png` (white dragon)

**Size:** ~29-30 KB each

**Resolution:** 180×180 pixels (Apple's recommended size)

**Usage:** Dynamically loaded via JavaScript
```javascript
document.getElementById('apple-touch-icon').href = `/apple-touch-icon-${theme}.png`;
```

**How it works:**
1. User taps "Add to Home Screen" on iOS Safari
2. iOS requests the currently active apple-touch-icon
3. Icon appears on home screen matching user's theme
4. iOS applies rounded corners automatically

**Regenerating:**
```bash
magick dragon-icon.jpg -fuzz 10% -transparent white dragon-black.png
magick dragon-black.png -resize 180x180 apple-touch-icon-light.png
magick dragon-black.png -channel RGB -negate -resize 180x180 apple-touch-icon-dark.png
rm dragon-black.png
```

### `favicon.ico` / `favicon.png` / `apple-touch-icon.png` (Fallback)

**Purpose:** Default fallback favicons for browsers without JavaScript or theme detection.

**Details:** These are copies of the light mode versions, ensuring the site always has a visible favicon even without JavaScript support.

**Regenerating:**
```bash
cp favicon-light.ico favicon.ico
cp favicon-light.png favicon.png
cp apple-touch-icon-light.png apple-touch-icon.png
```

### `css/` (empty directory)

**Purpose:** Reserved for future static CSS files.

**When to use:**
- Third-party CSS libraries (that don't need processing)
- Vendor CSS that must be served verbatim
- Quick CSS additions without SCSS compilation

**For custom CSS:** Use `assets/scss/` instead (processed by Hugo Pipes).

## JavaScript Files

### `js/preview-flag.js`

**Purpose:** Manages preview mode for bypassing analytics during testing.

**How it works:**
1. Detects `?preview=true` query parameter in URL
2. Sets `localStorage.setItem('preview_mode', 'true')`
3. Displays orange "Preview Mode" badge (bottom-right)
4. Analytics partial checks `window.isPreviewMode()` before loading GA4

**API:**
```javascript
// Check if in preview mode
window.isPreviewMode()  // returns true/false

// Enable preview mode
window.setPreviewMode(true)

// Disable preview mode
window.setPreviewMode(false)
```

**Usage:**
```
Visit: https://yoursite.com/?preview=true
Result: Preview mode enabled, analytics skipped
Console: [Preview Mode] Enabled - Analytics disabled
```

**Loaded in:** `layouts/partials/custom_head.html` (before analytics)

**See:** [docs/analytics/analytics-and-referrals.md](../docs/analytics/analytics-and-referrals.md) for full documentation.

### `js/theme-toggle.js`

**Purpose:** Manages dark/light theme switching with localStorage persistence.

**How it works:**
1. Loads in `<head>` before body renders (prevents flash)
2. Checks `localStorage.getItem('theme-preference')`
3. Falls back to system preference if no saved preference
4. Applies theme immediately (adds/removes `.dark-mode` class)

**API:**
```javascript
// Get current theme
window.themeToggle.getCurrent()     // 'light' or 'dark'

// Get effective theme (saved or system)
window.themeToggle.getEffective()   // 'light' or 'dark'

// Toggle theme
window.themeToggle.toggle()

// Reset to auto (follow system)
window.themeToggle.reset()
```

**Behavior:**
- **Default:** Follows system preference (no localStorage value)
- **Single click:** Toggles between light/dark (saves preference)
- **Double-click:** Resets to auto (clears preference, follows system)

**Loaded in:** `layouts/partials/custom_head.html` (critical, early load)

**See:** [docs/analytics/theming-and-dark-mode.md](../docs/analytics/theming-and-dark-mode.md) for full documentation.

## When to Add Files to `static/`

### Add to `static/` when:
1. **No processing needed** - File should be served exactly as-is
2. **Third-party assets** - Vendor JS/CSS that must remain unchanged
3. **Binary files** - PDFs, images, fonts, videos
4. **Root-level files** - `robots.txt`, `CNAME`, `favicon.ico`
5. **Direct URL access** - File needs predictable URL (e.g., `/resume.pdf`)

### Examples:
```
static/robots.txt          → /robots.txt
static/resume.pdf          → /resume.pdf
static/fonts/custom.woff2  → /fonts/custom.woff2
static/js/vendor.min.js    → /js/vendor.min.js
```

### DON'T add to `static/` when:
1. **Needs compilation** - SCSS, TypeScript, ES6+ requiring transpilation → use `assets/`
2. **Needs minification** - CSS/JS that should be minified → use `assets/` with Hugo Pipes
3. **Needs fingerprinting** - CSS/JS that needs cache-busting → use `assets/`
4. **Template integration** - Files referenced in layouts → use `assets/` for better Hugo integration

### Examples of what goes in `assets/`:
```
assets/scss/main.scss       → Compiled to CSS with Hugo Pipes
assets/icons/logo.svg       → Inlined in templates
assets/images/hero.jpg      → Processed by Hugo image pipeline
```

## Adding New Static Files

### 1. Choose the right location

**For JavaScript:**
```bash
static/js/your-script.js
```

**For CSS (if not using SCSS):**
```bash
static/css/your-styles.css
```

**For documents:**
```bash
static/documents/whitepaper.pdf
static/documents/report.xlsx
```

**For images:**
```bash
static/images/photo.jpg
static/images/diagrams/architecture.svg
```

### 2. Add the file

```bash
cp your-file.ext static/appropriate-directory/
```

### 3. Reference in templates

```html
<!-- HTML -->
<script src="/js/your-script.js"></script>
<link rel="stylesheet" href="/css/your-styles.css">
<img src="/images/photo.jpg" alt="Description">

<!-- Markdown -->
[Download PDF](/documents/whitepaper.pdf)
![Diagram](/images/diagrams/architecture.svg)
```

### 4. Test locally

```bash
hugo server
```

Visit `http://localhost:1313/path/to/file` to verify it's accessible.

### 5. Build and deploy

```bash
hugo --cleanDestinationDir
```

Check `public/path/to/file` exists.

## File Organization Best Practices

### Use subdirectories

**Good:**
```
static/js/analytics.js
static/js/theme-toggle.js
static/css/vendor.css
static/documents/resume.pdf
static/images/profile.jpg
```

**Bad (cluttered root):**
```
static/analytics.js
static/theme-toggle.js
static/vendor.css
static/resume.pdf
static/profile.jpg
```

### Use descriptive names

**Good:**
```
static/js/preview-flag.js
static/Toribio_Diego_Resume.pdf
static/images/project-screenshot-1.png
```

**Bad:**
```
static/js/pf.js
static/resume.pdf
static/img1.png
```

### Keep URLs stable

Once a file is public, changing its path breaks external links:
```
✓ Keep: /Toribio_Diego_Resume.pdf
✗ Change to: /documents/resume-2024.pdf  (breaks existing links)
```

If you must change, use Hugo aliases:
```yaml
# In content front matter
aliases:
  - /old-path.pdf
```

Or configure server redirects.

## File Size Considerations

**Current sizes:**
- `CNAME`: 16 bytes
- `site.webmanifest`: ~725 bytes
- `Toribio_Diego_Resume.pdf`: ~97 KB
- `pfp.jpg`: ~4.2 MB (original source image)
- `pfp-optimized.webp`: ~18 KB (optimized for web)
- `pfp-optimized.jpg`: ~31 KB (optimized fallback)
- `dragon-icon.jpg`: ~100 KB
- `favicon-light.ico`: ~12 KB
- `favicon-dark.ico`: ~12 KB
- `favicon-light.png`: ~2.3 KB
- `favicon-dark.png`: ~2.3 KB
- `apple-touch-icon-light.png`: ~29 KB
- `apple-touch-icon-dark.png`: ~30 KB
- `favicon.ico` (fallback): ~12 KB
- `favicon.png` (fallback): ~2.3 KB
- `apple-touch-icon.png` (fallback): ~29 KB
- `preview-flag.js`: ~2.2 KB
- `theme-toggle.js`: ~6.4 KB

**Optimization guidelines:**
- **Images:** < 500 KB for hero images, < 100 KB for thumbnails
- **PDFs:** < 1 MB for resumes/documents
- **JavaScript:** < 50 KB for custom scripts
- **CSS:** < 100 KB for stylesheets

**Large files slow page load.** Consider:
1. Compression (use tools like ImageOptim, TinyPNG)
2. Responsive images (serve different sizes)
3. Lazy loading (defer offscreen images)
4. CDN hosting for very large assets

## Deployment

### Local development

```bash
hugo server
```

Static files available at `http://localhost:1313/path/to/file`

### Production build

```bash
hugo --cleanDestinationDir
```

Static files copied to `public/` for deployment.

### GitHub Pages

Files in `static/` are committed and deployed automatically:
1. Push to `main` branch
2. GitHub Actions runs `hugo` build
3. Static files copied to `public/`
4. GitHub Pages serves from `public/`

**Custom domain:** Requires `static/CNAME` file (already configured).

## Troubleshooting

### File not accessible after build

**Cause:** File not in `static/` or Hugo not copying it.

**Fix:**
1. Verify file exists: `ls static/path/to/file`
2. Rebuild: `hugo --cleanDestinationDir`
3. Check `public/`: `ls public/path/to/file`
4. If still missing, check `.gitignore` or Hugo config

### Wrong file being served

**Cause:** Browser cache or old `public/` directory.

**Fix:**
1. Hard refresh: `Cmd+Shift+R` (macOS) or `Ctrl+Shift+R` (Windows/Linux)
2. Clear `public/`: `rm -rf public && hugo`
3. Clear browser cache completely

### File too large to load

**Cause:** File size exceeds browser/server limits.

**Fix:**
1. Compress file (images, PDFs)
2. Use external hosting (Dropbox, Google Drive) for very large files
3. Link to external URL instead of hosting locally

### CNAME conflicts

**Cause:** Multiple `CNAME` files or wrong content.

**Fix:**
1. Ensure only one `CNAME` file exists: `find . -name CNAME`
2. Content should be single line: `diegotoribio.com`
3. No `http://` or `https://` prefix
4. No trailing slash or whitespace

### JavaScript not loading

**Cause:** Path incorrect or file missing.

**Fix:**
1. Check path in template: `/js/file.js` not `js/file.js`
2. Verify file exists: `ls static/js/file.js`
3. Check browser console for 404 errors
4. Use browser dev tools → Network tab to debug

## Related Documentation

- [assets/README.md](../assets/README.md) - Processed assets (SCSS, icons)
- [layouts/README.md](../layouts/README.md) - How JavaScript is loaded in templates
- [docs/analytics/analytics-and-referrals.md](../docs/analytics/analytics-and-referrals.md) - Preview mode usage
- [docs/analytics/theming-and-dark-mode.md](../docs/analytics/theming-and-dark-mode.md) - Theme toggle implementation
- [docs/ops/building-and-deployment.md](../docs/ops/building-and-deployment.md) - Build and deployment process

## Common Tasks

### Add a new JavaScript file

1. Create file: `static/js/your-script.js`
2. Reference in template:
   ```go-html-template
   <script src="/js/your-script.js"></script>
   ```
3. Test: `hugo server` and visit site

### Update resume

1. Export new PDF
2. Replace: `static/Toribio_Diego_Resume.pdf`
3. Keep same filename (links won't break)
4. Commit and push

### Add a downloadable document

1. Place file: `static/documents/whitepaper.pdf`
2. Link in content:
   ```markdown
   [Download Whitepaper](/documents/whitepaper.pdf)
   ```
3. Build and deploy

### Optimize large image

1. Use ImageOptim, Squoosh, or similar tool
2. Target size: < 500 KB
3. Replace original in `static/images/`
4. Rebuild to regenerate `public/`
