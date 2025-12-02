# Layouts Directory

This directory contains Hugo template overrides and custom partials for the site. This README explains which templates we override, when to add new ones, and how key features are wired together.

## Directory Structure

```
layouts/
├── README.md                    # This file
├── _default/                    # Default template overrides (currently empty)
├── partials/                    # Reusable template components
│   ├── custom_body.html        # Theme hook: body content injection
│   ├── custom_head.html        # Theme hook: head content injection (theme toggle, SCSS)
│   ├── favicon.html            # Theme-aware favicon switcher
│   ├── footer.html             # Override: custom footer with email copy
│   ├── google_analytics_with_preview.html  # Custom: GA4 with preview mode support
│   ├── header.html             # Override: custom header with theme toggle
│   ├── style.html              # Override: loads custom SCSS instead of theme CSS
│   ├── tags-chips.html         # Custom: renders tag chips for portfolio/writing
│   └── theme-toggle.html       # Custom: dark/light mode toggle button
├── portfolio/                   # Portfolio section templates
│   ├── list.html               # Override: custom portfolio list with highlights
│   └── single.html             # Override: custom portfolio single page
├── shortcodes/                  # Custom Hugo shortcodes
│   └── img.html                # Responsive image with WebP/JPEG fallback
└── writing/                     # Writing section templates
    ├── list.html               # Override: custom writing list
    └── single.html             # Override: custom writing single page
```

## Template Override Priority

Hugo's template lookup order (most specific to least):
1. `layouts/<section>/<type>.html` (e.g., `layouts/portfolio/list.html`)
2. `layouts/<section>/list.html` or `layouts/<section>/single.html`
3. `layouts/_default/<type>.html`
4. `themes/hugo-bearblog/layouts/<section>/<type>.html`
5. `themes/hugo-bearblog/layouts/_default/<type>.html`

**Our strategy:** Override at the most specific level needed. We use section-specific templates (`portfolio/`, `writing/`) rather than `_default/` overrides to keep changes targeted.

## Partials Overview

### Theme Hook Partials (Provided by hugo-bearblog)

These are empty "hook" partials in the theme that we populate with custom content:

| Partial | Purpose | Our Usage |
|---------|---------|-----------|
| `custom_head.html` | Inject content into `<head>` | Theme toggle script, SCSS pipeline, debug logging |
| `custom_body.html` | Inject content at end of `<body>` | Currently minimal (placeholder comment) |

**How they work:** The theme's `baseof.html` calls these partials if they exist in our `layouts/partials/` directory.

### Theme Override Partials

These replace theme defaults with custom implementations:

| Partial | What We Override | Why |
|---------|------------------|-----|
| `header.html` | Theme header | Add theme toggle button, custom navigation structure |
| `footer.html` | Theme footer | Custom footer with copy-to-clipboard email functionality |
| `style.html` | Theme CSS loading | Load custom SCSS via Hugo Pipes instead of theme's built-in CSS |

### Custom Partials

These are entirely our own (not in the theme):

| Partial | Purpose | Used By |
|---------|---------|---------|
| `google_analytics_with_preview.html` | GA4 with preview mode support | `custom_head.html` |
| `theme-toggle.html` | Dark/light mode toggle button | `header.html` |
| `tags-chips.html` | Renders taxonomy tag chips | `portfolio/list.html`, `portfolio/single.html`, `writing/single.html` |

## Section Template Overrides

### Portfolio Section (`layouts/portfolio/`)

**Why override:** Need custom list format with highlights, summaries, and visibility controls.

**Templates:**
- `list.html` - Portfolio index page at `/portfolio/`
  - Shows project cards with title, summary, highlights (3 bullets), and tags
  - Respects `build.list` and `build.render` flags for visibility control
  - Sorts by weight, date, title
- `single.html` - Individual portfolio project pages
  - Shows full project content with tags and metadata
  - Includes project highlights in header

**Key features:**
- Visibility flags: `draft`, `build.list: "never"`, `build.render: "link"`
- Tag chips via `tags-chips.html` partial
- Portfolio-specific styling (`.portfolio-list`, `.portfolio-item`, etc.)

### Writing Section (`layouts/writing/`)

**Why override:** Need custom list format for blog posts.

**Templates:**
- `list.html` - Writing index page at `/writing/`
  - Simplified list compared to theme default
- `single.html` - Individual blog post pages
  - Custom structure with date, tags, content

## Feature Wiring

### Theme Toggle (Dark/Light Mode)

**Components:**
1. **JavaScript:** `static/js/theme-toggle.js`
   - Manages theme state (localStorage + system preference)
   - Exposes `window.themeToggle` API
   - Auto-applies theme on page load (prevents flash)

2. **Partial:** `layouts/partials/theme-toggle.html`
   - Renders the toggle button (fixed position, top-right)
   - SVG icons for sun/moon
   - Accessible (ARIA labels, keyboard support)

3. **Loading:** `layouts/partials/custom_head.html`
   - Loads `theme-toggle.js` in `<head>` (before body)
   - Ensures theme applies before first paint

4. **Styling:** `assets/scss/_theme-toggle.scss`
   - Fixed positioning at `top: 1rem, right: 1rem`
   - CSS animations for icon transitions
   - Responsive size adjustments

**How it works:**
1. Script loads in `<head>` and immediately applies theme (no flash)
2. Button renders in header via `header.html` > `theme-toggle.html`
3. User clicks → JS updates `localStorage` + toggles `.dark-mode` class
4. CSS cascade layers handle theme-specific colors via CSS variables

**See:** `docs/analytics/theming-and-dark-mode.md` for detailed documentation.

### Analytics with Preview Mode

**Components:**
1. **Partial:** `layouts/partials/google_analytics_with_preview.html`
   - Loads GA4 script conditionally
   - Checks `window.isPreviewMode()` before loading

2. **JavaScript:** `static/js/preview-mode.js`
   - Detects `?preview=true` query parameter
   - Sets preview flag in localStorage + session flag
   - Exposes `window.isPreviewMode()` API

3. **Loading:** `layouts/partials/custom_head.html`
   - Loads preview mode script first
   - Then loads analytics partial (which checks preview mode)

**How it works:**
1. Visit `/?preview=true` → preview mode activates
2. Orange badge appears (bottom-right corner)
3. Analytics partial checks `isPreviewMode()` → skips GA4 load
4. Console logs: `[Analytics] Skipped - Preview mode active`

**Production behavior:**
- `HUGO_ENV=production` enables analytics loading
- Without preview flag: analytics load normally
- With preview flag: analytics skipped (for personal testing)

**See:** `docs/analytics/analytics-and-referrals.md` for detailed documentation.

### Custom SCSS Pipeline

**Components:**
1. **Partial:** `layouts/partials/style.html` (overrides theme)
   - Loads `assets/scss/site.scss` via Hugo Pipes
   - Compiles, fingerprints, minifies for production

2. **Head injection:** `layouts/partials/custom_head.html`
   - Theme's `baseof.html` calls `custom_head.html`
   - Our `custom_head.html` loads compiled CSS via Hugo's resource pipeline

**How it works:**
1. Hugo Pipes processes `assets/scss/site.scss`
2. Compiles to CSS, adds fingerprint hash
3. Production: minified and optimized
4. Development: source maps for debugging

**SCSS structure:**
```scss
// site.scss (main entry point)
@import "variables";          // CSS variables for theming
@import "theme-toggle";        // Theme toggle button styles
@import "utilities";           // Utility classes
@import "portfolio";           // Portfolio-specific styles
@import "writing";             // Writing-specific styles
@import "preview-mode-badge";  // Preview mode indicator
```

## When to Add New Templates

### Add a new partial when:
- **Reusable component** needed across multiple templates
- **Complex logic** that clutters the main template
- **Feature isolation** (e.g., analytics, theme toggle)
- **Testing/debugging** requires independent component

**Example:** Created `tags-chips.html` to render tags consistently across portfolio and writing sections.

### Add a new section template when:
- **New content section** (like `portfolio/`, `writing/`)
- **Custom layout needs** that differ from theme default
- **Visibility controls** or special sorting logic required

**Example:** Created `layouts/portfolio/list.html` to show highlights and respect visibility flags.

### Override a theme partial when:
- **Core functionality change** needed (e.g., footer, header)
- **Theme default insufficient** for your requirements
- **Add custom wiring** (e.g., theme toggle in header)

**Example:** Overrode `header.html` to add theme toggle button and custom navigation.

### DON'T add templates when:
- Theme default works fine (leave it alone)
- Change can be done with CSS only
- Hugo config/params can achieve the same result

## Template Development Workflow

### 1. Test locally with hot reload
```bash
hugo server -DF
```
Changes to templates reload automatically in browser.

### 2. Check template lookup
Add debug logging in template:
```go-html-template
{{ printf "Template: %s" .Page.Path }}
{{ printf "Layout: %s" .Layout }}
```

### 3. Validate production build
```bash
hugo --panicOnWarning --cleanDestinationDir
```
Catches template errors, missing variables, etc.

### 4. Test both themes
Toggle between light/dark modes to verify CSS variables work correctly.

### 5. Test preview mode
Visit `/?preview=true` to verify analytics bypass works.

## Troubleshooting

### Template not being used

1. Check file path matches Hugo's lookup rules
2. Verify no typos in template name (`list.html` not `List.html`)
3. Clear `public/` and rebuild: `hugo --cleanDestinationDir`
4. Check Hugo version: `hugo version` (we require 0.148+)

### Partial not rendering

1. Verify partial called with correct path: `{{ partial "folder/name.html" . }}`
2. Check context passed correctly (`.` or specific variable)
3. Look for errors in `hugo server` output
4. Ensure partial has access to needed variables

### Theme toggle not working

1. Check `theme-toggle.js` loads in `<head>`
2. Verify `window.themeToggle` exists (browser console)
3. Check localStorage: `localStorage.getItem('theme')`
4. Verify CSS cascade layers load correctly
5. See `docs/analytics/theming-and-dark-mode.md` for debugging

### Analytics not loading

1. Check `HUGO_ENV=production` is set (analytics only load in production)
2. Verify not in preview mode: `window.isPreviewMode()`
3. Check GA ID in `config/_default/hugo.toml`: `services.googleAnalytics.ID`
4. Look for console logs: `[Analytics] Google Analytics loaded`
5. See `docs/analytics/analytics-and-referrals.md` for debugging

### Styles not applying

1. Verify SCSS compiles: check `hugo server` output for errors
2. Check cascade layer order in `site.scss`
3. Use browser dev tools to inspect applied styles
4. Verify CSS fingerprint hash changes after SCSS edits
5. Clear browser cache and rebuild

## Related Documentation

- [docs/analytics/theming-and-dark-mode.md](../docs/analytics/theming-and-dark-mode.md) - Theme toggle implementation details
- [docs/analytics/analytics-and-referrals.md](../docs/analytics/analytics-and-referrals.md) - Preview mode and analytics setup
- [docs/authoring/portfolio-formatting.md](../docs/authoring/portfolio-formatting.md) - Portfolio template usage
- [Hugo Template Documentation](https://gohugo.io/templates/) - Official Hugo template docs
- [hugo-bearblog Theme](https://github.com/janraasch/hugo-bearblog) - Base theme we override

## Common Tasks

### Add a new partial

1. Create file in `layouts/partials/your-partial.html`
2. Add documentation comment at top
3. Include it in a template: `{{ partial "your-partial.html" . }}`
4. Test with `hugo server -DF`

### Override a theme partial

1. Check theme's `themes/hugo-bearblog/layouts/partials/`
2. Copy to `layouts/partials/` with same name
3. Modify as needed
4. Hugo automatically uses your version instead of theme's

### Add a new section

1. Create directory: `layouts/your-section/`
2. Add `list.html` (section index page)
3. Add `single.html` (individual item page)
4. Test at `/your-section/`

## Shortcodes

### `img.html` - Responsive Image with WebP Fallback

**Purpose:** Generates responsive images with WebP format for modern browsers and JPEG fallback for older browsers.

**Usage:**
```markdown
{{ "{{" }}< img src="/pfp-optimized" alt="Profile picture" width="250" height="250" >}}
{{ "{{" }}< img src="/image" alt="Description" width="800" height="600" sizes="(max-width: 768px) 100vw, 800px" >}}
```

**Parameters:**
- `src` (required) - Base path without extension (e.g., `/pfp-optimized`)
- `alt` (required) - Alt text for accessibility
- `width`, `height` (optional) - Dimensions for layout stability
- `sizes` (optional) - Responsive sizes attribute (auto-generated if not provided)
- `class`, `style` (optional) - CSS customization
- `loading` (optional) - `lazy` (default) or `eager`

**Output:**
```html
<picture>
  <source srcset="/pfp-optimized.webp" type="image/webp" sizes="...">
  <img src="/pfp-optimized.jpg" alt="Profile picture" width="250" height="250" loading="lazy">
</picture>
```

**See:** `docs/authoring/images.md` for detailed usage guide and optimization workflow.

### Debug template rendering

Add debug output:
```go-html-template
{{ printf "Context: %#v" . }}
{{ printf "Page: %s" .Page.Path }}
{{ printf "Params: %#v" .Params }}
```

Check Hugo's template hints:
```bash
hugo --templateMetrics --templateMetricsHints
```
