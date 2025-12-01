# Assets Directory

This directory contains SCSS stylesheets, SVG icons, and citation style files used by the site. This README explains the SCSS structure, how icons are used, and build requirements.

## Directory Structure

```
assets/
├── README.md           # This file
├── csl/               # Citation Style Language files
│   └── ieee.csl       # IEEE citation format
├── icons/             # SVG icons for social links
│   ├── email.svg      # Email icon
│   ├── github.svg     # GitHub icon
│   └── linkedin.svg   # LinkedIn icon
└── scss/              # SCSS stylesheets (compiled by Hugo Pipes)
    ├── main.scss      # Entry point - imports all other SCSS files
    ├── _variables.scss      # CSS variables for colors, spacing, etc.
    ├── _helpers.scss        # Helper classes and mixins
    ├── _tags.scss           # Tag chip styles
    ├── _lists.scss          # List styles
    ├── _posts.scss          # Post/article styles
    ├── _writing.scss        # Writing section specific styles
    ├── _portfolio.scss      # Portfolio section specific styles
    ├── _utilities.scss      # Utility classes (muted, nowrap, etc.)
    ├── _responsive.scss     # Responsive design rules
    ├── _references.scss     # Bibliography and citation styles
    ├── _footer.scss         # Footer specific styles
    ├── _figures.scss        # Figure and image styles
    ├── _theme-toggle.scss   # Dark/light mode toggle button
    ├── _overrides.scss      # Theme override styles
    ├── _breadcrumbs.scss    # Breadcrumb navigation styles
    └── _dark-mode.scss      # Dark mode color variables and rules
```

## SCSS Structure

### Entry Point: `main.scss`

The main entry point defines CSS cascade layers and imports all partials in the correct order:

```scss
/* Define cascade layer order once */
@layer base, components, utilities, overrides;

/* Critical body layout rules (unlayered for maximum priority) */
html, body { height: 100%; }
body {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    max-width: 650px;
    margin: 0 auto;
    padding: 0 1rem;
}

/* Base */
@import "variables";
@import "helpers";
@import "tags";

/* Components */
@layer components {
    @import "lists";
    @import "posts";
    @import "writing";
    @import "portfolio";
    @import "utilities";
    @import "responsive";
    @import "references";
    @import "footer";
    @import "figures";
    @import "theme-toggle";
}

/* Overrides */
@layer overrides {
    @import "overrides";
    @import "breadcrumbs";
    @import "dark-mode";
}
```

**Why this structure:**
- **Unlayered critical layout rules** take highest priority (ensure body layout always works)
- **Base layer** provides foundation (variables, helpers, tags)
- **Components layer** contains feature-specific styles
- **Overrides layer** applies last (theme overrides, dark mode)

### Cascade Layers Explained

CSS Cascade Layers (`@layer`) control specificity order:
1. **Unlayered styles** (body layout) - Highest priority
2. **Base layer** - Foundation styles
3. **Components layer** - Feature styles
4. **Overrides layer** - Final overrides

**Benefits:**
- No specificity wars (layer order determines priority, not selectors)
- Safe to override theme defaults
- Dark mode can override component colors without `!important`

### SCSS Partials

#### Base Layer Partials

**`_variables.scss`**
- CSS custom properties (variables) for theming
- Colors: `--muted-text`, `--heading-color`, `--secondary-text-color`
- Spacing: `--post-title-bottom`, `--post-meta-bottom`
- Sizes: `--chip-radius`, `--chip-font-size`
- Dark mode overrides in `.dark-mode` selector

**`_helpers.scss`**
- Helper classes and mixins
- Utility functions for common patterns

**`_tags.scss`**
- Tag chip styles (`.tag`, `.tags`)
- Used by portfolio and writing sections
- Hover effects and borders

#### Components Layer Partials

**Section-Specific Styles:**
- `_writing.scss` - Writing section (blog posts)
- `_portfolio.scss` - Portfolio section (project cards, highlights)
- `_lists.scss` - List layouts
- `_posts.scss` - Post layouts

**Feature Styles:**
- `_theme-toggle.scss` - Dark/light mode toggle button (fixed position, animations)
- `_footer.scss` - Footer layout and email copy functionality
- `_figures.scss` - Image figures and captions
- `_references.scss` - Bibliography and citations
- `_utilities.scss` - Utility classes (`.muted`, `.nowrap`, site header spacing)
- `_responsive.scss` - Responsive design breakpoints

#### Overrides Layer Partials

**`_overrides.scss`**
- Theme-specific overrides
- Fixes for theme defaults we want to change

**`_breadcrumbs.scss`**
- Breadcrumb navigation styles (for taxonomy pages)

**`_dark-mode.scss`**
- Dark mode color variables
- Overrides for dark theme
- Applied when `.dark-mode` class is on `<html>` element

### Adding New Styles

**When to create a new partial:**
1. **Feature-specific styles** (e.g., new component like a modal)
2. **Substantial styles** (more than ~50 lines)
3. **Reusable across sections** (not specific to one page)

**When to add to existing partial:**
1. **Small additions** (a few classes)
2. **Related to existing functionality**
3. **Quick tweaks** (adjusting spacing, colors)

**Process:**
1. Create new file: `assets/scss/_feature-name.scss`
2. Add `@import "feature-name";` to `main.scss` in appropriate layer
3. Rebuild: Hugo will detect changes and recompile
4. Test in both light and dark modes

**Example - Adding a new component:**
```scss
/* assets/scss/_modal.scss */
.modal {
    /* Modal styles here */
}

.modal-overlay {
    /* Overlay styles */
}
```

Then in `main.scss`:
```scss
@layer components {
    @import "modal";  // Add after other imports
}
```

## Hugo Pipes Compilation

### How SCSS is Compiled

The SCSS is compiled via Hugo Pipes in `layouts/partials/style.html`:

```go-html-template
{{ $scss := resources.Get "scss/main.scss" }}
{{ $css := $scss | resources.ToCSS }}
{{ if hugo.IsProduction }}
  {{ $css = $css | minify | fingerprint }}
{{ end }}
<link rel="stylesheet" href="{{ $css.RelPermalink }}">
```

**Process:**
1. Hugo loads `assets/scss/main.scss`
2. Compiles SCSS to CSS (processes `@import` statements)
3. In production: minifies and adds fingerprint hash
4. Generates final CSS file in `public/`

**Output:**
- Development: `public/scss/main.css` (readable, with source maps)
- Production: `public/scss/main.min.abc123.css` (minified, fingerprinted)

### Hugo Extended Requirement

**IMPORTANT:** This site requires **Hugo Extended** to compile SCSS.

**Why Hugo Extended:**
- Standard Hugo lacks SCSS/SASS compiler
- Hugo Extended includes LibSass for SCSS compilation
- Without Extended: build fails with error about missing SCSS support

**Check your Hugo version:**
```bash
hugo version
```

Expected output:
```
hugo v0.148.2+extended+withdeploy darwin/arm64
               ^^^^^^^^
```

The `+extended` indicates Hugo Extended is installed.

**Installation:**

**macOS (Homebrew):**
```bash
brew install hugo
```
Homebrew installs Extended version by default.

**Linux:**
```bash
# Download extended version from GitHub releases
wget https://github.com/gohugoio/hugo/releases/download/v0.148.2/hugo_extended_0.148.2_Linux-64bit.tar.gz
tar -xzf hugo_extended_0.148.2_Linux-64bit.tar.gz
sudo mv hugo /usr/local/bin/
```

**Windows:**
```powershell
# Using Chocolatey
choco install hugo-extended

# Or Scoop
scoop install hugo-extended
```

**Verify Extended version:**
```bash
hugo version | grep extended
```

If `extended` is not in the output, you have the standard version and builds will fail.

## Icons

### SVG Icon Files

Located in `assets/icons/`, these are inline SVG social media icons:

| Icon | Usage | Viewbox | Fill |
|------|-------|---------|------|
| `email.svg` | Footer email link | `0 0 24 24` | `currentColor` |
| `github.svg` | Footer GitHub link | `0 0 24 24` | `currentColor` |
| `linkedin.svg` | Footer LinkedIn link | `0 0 24 24` | `currentColor` |

### Icon Design

**Key features:**
- **`fill="currentColor"`** - Icons inherit CSS `color` property
- **`viewBox="0 0 24 24"`** - Standard 24x24 grid for consistency
- **`<title>` element** - Accessibility text for screen readers

**Why `currentColor`:**
```css
.footer-link {
    color: #555;  /* Icon fills with this color */
}

.footer-link:hover {
    color: #000;  /* Icon color changes on hover */
}
```

No need for separate icon fill rules - icons adapt to text color automatically.

### Using Icons in Templates

Icons are inlined directly in HTML templates:

```go-html-template
<a href="mailto:your@email.com" class="footer-link">
    {{ readFile "assets/icons/email.svg" | safeHTML }}
</a>
```

**Hugo's `readFile`:**
- Reads SVG file at build time
- Inlines SVG directly into HTML
- `safeHTML` tells Hugo it's trusted content

**Benefits:**
- No HTTP requests for icons (faster page load)
- Icons scale perfectly (SVG is vector)
- CSS can style icons (via `currentColor`)

### Adding New Icons

1. **Create SVG file** in `assets/icons/`:
   ```svg
   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
     <title>Icon Name</title>
     <path fill="currentColor" d="...path data..."></path>
   </svg>
   ```

2. **Ensure `currentColor`** for CSS control
3. **Add `<title>`** for accessibility
4. **Use in template:**
   ```go-html-template
   {{ readFile "assets/icons/your-icon.svg" | safeHTML }}
   ```

**Icon sources:**
- [Heroicons](https://heroicons.com/) - Simple, clean icons
- [Feather Icons](https://feathericons.com/) - Minimal line icons
- [Material Icons](https://fonts.google.com/icons) - Google's icon set

**Optimization:**
- Remove unnecessary attributes (`id`, `class`, `style`)
- Simplify paths (use SVGO or similar tools)
- Keep viewBox at `0 0 24 24` for consistency

## Citation Styles (CSL)

The `assets/csl/` directory contains Citation Style Language files for bibliography formatting.

**`ieee.csl`**
- IEEE citation format
- Used by Hugo's citation rendering
- Controls bibliography formatting in posts with references

**Usage:**
Configure in `config/_default/hugo.toml`:
```toml
[params]
  cslFile = "assets/csl/ieee.csl"
```

Posts can include citations that render using this style.

## Development Workflow

### 1. Local Development
```bash
hugo server -DF
```
Hugo watches `assets/` and recompiles SCSS on changes.

### 2. Test Changes
- Edit SCSS files in `assets/scss/`
- Browser auto-refreshes with new styles
- Check both light and dark modes

### 3. Validate CSS
```bash
hugo --panicOnWarning --cleanDestinationDir
```
Catches SCSS syntax errors and compilation issues.

### 4. Production Build Test
```bash
HUGO_ENV=production hugo --cleanDestinationDir
```
Verifies minification and fingerprinting work correctly.

## Troubleshooting

### SCSS compilation fails

**Error:** `Error: Unable to locate SCSS compiler`

**Cause:** Using standard Hugo instead of Hugo Extended.

**Fix:**
1. Check version: `hugo version`
2. Look for `+extended` in output
3. If missing, install Hugo Extended (see installation above)
4. Restart Hugo server

### Styles not updating

**Cause:** Browser cache or Hugo cache.

**Fix:**
1. Hard refresh: `Cmd+Shift+R` (macOS) or `Ctrl+Shift+R` (Windows/Linux)
2. Clear Hugo cache: `hugo --cleanDestinationDir`
3. Restart Hugo server

### Dark mode colors wrong

**Cause:** CSS cascade layer order or missing dark mode variables.

**Fix:**
1. Check `_dark-mode.scss` has proper selectors: `.dark-mode .selector`
2. Verify `_dark-mode.scss` is in `overrides` layer
3. Check CSS variables are defined in both light and dark modes
4. Use browser dev tools to inspect computed styles

### Icons not appearing

**Cause:** SVG path incorrect or `safeHTML` missing.

**Fix:**
1. Verify icon file exists: `ls assets/icons/`
2. Check template uses `safeHTML`: `{{ readFile "..." | safeHTML }}`
3. Inspect HTML source - SVG should be inline
4. Check browser console for errors

### CSS fingerprint not changing

**Cause:** Hugo not detecting SCSS changes or cache issue.

**Fix:**
1. Stop Hugo server
2. Delete `public/` directory: `rm -rf public`
3. Delete Hugo cache: `rm -rf resources/_gen`
4. Restart: `hugo server`

## Related Documentation

- [layouts/README.md](../layouts/README.md) - How SCSS is loaded via `style.html` partial
- [docs/analytics/theming-and-dark-mode.md](../docs/analytics/theming-and-dark-mode.md) - Dark mode implementation
- [Hugo Pipes Documentation](https://gohugo.io/hugo-pipes/) - Official Hugo asset pipeline docs
- [CSS Cascade Layers](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Cascade_layers) - MDN guide

## Common Tasks

### Change a color
1. Edit `assets/scss/_variables.scss`
2. Find CSS variable: `--variable-name: #color;`
3. Change color value
4. Hugo auto-recompiles

### Add dark mode color
1. Edit `assets/scss/_dark-mode.scss`
2. Add override in `.dark-mode` selector:
   ```scss
   .dark-mode {
       --variable-name: #new-color;
   }
   ```

### Add responsive breakpoint
1. Edit `assets/scss/_responsive.scss`
2. Add media query:
   ```scss
   @media (max-width: 768px) {
       .selector { /* mobile styles */ }
   }
   ```

### Debug compiled CSS
1. Build site: `hugo`
2. Check `public/scss/main.css` (or `main.min.*.css` in production)
3. Search for your class names
4. Verify styles compiled correctly
