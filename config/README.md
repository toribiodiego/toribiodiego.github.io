# Config Directory

This directory contains Hugo site configuration files. This README explains the configuration structure, key settings, and how to safely modify them.

## Directory Structure

```
config/
├── README.md           # This file
├── _default/           # Base configuration (used for all environments)
│   ├── hugo.toml      # Core Hugo settings
│   ├── menus.en.toml  # Site navigation menu
│   └── params.toml    # Custom parameters (metadata, author, etc.)
├── production/         # Production environment overrides (empty)
└── staging/            # Staging environment overrides (empty)
```

## How Hugo Config Works

### Configuration Hierarchy

Hugo loads configuration in this order (later files override earlier):

1. **`config/_default/`** - Base configuration (always loaded)
2. **`config/<environment>/`** - Environment-specific overrides
   - `production/` when `HUGO_ENV=production`
   - `staging/` when `HUGO_ENV=staging`
   - `development/` when `HUGO_ENV=development` (default)

**Example:**
```bash
# Uses _default/ only
hugo server

# Uses _default/ + production/ overrides
HUGO_ENV=production hugo
```

### File Types

Hugo supports multiple configuration formats:
- **TOML** (`.toml`) - Used in this project
- **YAML** (`.yaml`)
- **JSON** (`.json`)

**Stick with TOML** for consistency - all our config files use `.toml`.

## Configuration Files

### `_default/hugo.toml` - Core Hugo Settings

**Purpose:** Core Hugo configuration including site metadata, theme, and feature settings.

**Current settings:**

```toml
baseURL = "https://diegotoribio.com/"
enableRobotsTXT = true
title = "Diego Toribio"
theme = "hugo-bearblog"
languageCode = "en-us"
mainSections = ["Writing"]

[pagination]
  pagerSize = 10

[markup.goldmark.renderer]
  unsafe = true

[markup.goldmark.extensions]
  footnote = true

[taxonomies]
  portfolio_tag = "portfolio_tags"
  writing_tag = "writing_tags"

[services]
  [services.googleAnalytics]
    ID = "G-SVZT3TC8TJ"
```

**Key settings explained:**

| Setting | Purpose | Safe to Change? |
|---------|---------|-----------------|
| `baseURL` | Site's production URL | ⚠️ Only if domain changes |
| `title` | Site title (appears in header, metadata) | ✓ Yes |
| `theme` | Hugo theme name | ⚠️ Only if switching themes |
| `languageCode` | Content language | ✓ Yes (if site language changes) |
| `mainSections` | Sections shown on homepage | ✓ Yes |
| `enableRobotsTXT` | Generate robots.txt | ⚠️ Leave true for SEO |
| `pagination.pagerSize` | Items per page | ✓ Yes |
| `markup.goldmark.renderer.unsafe` | Allow raw HTML in Markdown | ⚠️ Required for our templates |
| `markup.goldmark.extensions.footnote` | Enable footnotes | ✓ Yes |
| `taxonomies` | Custom taxonomy definitions | ⚠️ Changes affect URLs |
| `services.googleAnalytics.ID` | GA4 tracking ID | ✓ Yes (if changing GA account) |

### `_default/menus.en.toml` - Site Navigation

**Purpose:** Defines the main navigation menu in the header.

**Current menu:**

```toml
[[main]]
  name = "Writing"
  pageRef = "/writing"
  weight = 10

[[main]]
  name = "Portfolio"
  url = "/portfolio/"
  weight = 20

[[main]]
  name = "About"
  url = "/"
  weight = 30
```

**Menu entry fields:**

| Field | Purpose | Example |
|-------|---------|---------|
| `name` | Display text | `"Writing"` |
| `pageRef` | Hugo page reference (preferred) | `"/writing"` |
| `url` | Direct URL path (alternative) | `"/portfolio/"` |
| `weight` | Sort order (lower = left) | `10`, `20`, `30` |

**pageRef vs. url:**
- **`pageRef`** - Hugo validates page exists, handles locale/translation
- **`url`** - Direct URL, no validation, more flexible

**Safe to change:**
- ✓ `name` - Menu display text
- ✓ `weight` - Menu item order
- ⚠️ `pageRef`/`url` - Must match existing pages

### `_default/params.toml` - Custom Parameters

**Purpose:** Site metadata, author info, and custom parameters accessible in templates via `.Site.Params`.

**Current parameters:**

```toml
title = "Diego Toribio"
author = "Diego Toribio"
description = "Master's student in Electrical Engineering..."
copyright = "Copyright © 2025, Diego Toribio"
dateFormat = "2006-01-02"
images = ["/pfp.jpg"]
```

**Parameter usage:**

| Parameter | Used In | Purpose |
|-----------|---------|---------|
| `title` | Meta tags, SEO | Site title |
| `author` | Meta tags | Author name |
| `description` | Meta description, Open Graph | Site description |
| `copyright` | Footer | Copyright notice |
| `dateFormat` | Templates | Date display format (Go layout) |
| `images` | Open Graph, Twitter Cards | Social preview image |

**Safe to change:**
- ✓ `title` - Site title
- ✓ `author` - Author name
- ✓ `description` - Site description
- ✓ `copyright` - Copyright text
- ⚠️ `dateFormat` - Must use Go date layout format
- ⚠️ `images` - Must be valid path in `static/`

**Accessing in templates:**
```go-html-template
{{ .Site.Params.author }}
{{ .Site.Params.description }}
{{ .Site.Copyright }}
```

## Environment Overrides

### Why Use Environment Overrides?

**Use cases:**
- Different `baseURL` for staging vs. production
- Enable/disable features per environment
- Different analytics IDs for testing
- Environment-specific build settings

### Currently Configured

**`config/production/`** - Empty (no production-specific overrides)

**`config/staging/`** - Empty (no staging-specific overrides)

**Why empty:** Our site uses the same configuration across environments. GitHub Pages deployment uses `HUGO_ENV=production` to enable analytics (via template conditionals), not config overrides.

### Adding Environment Overrides

**Example 1: Different baseURL for staging**

Create `config/staging/hugo.toml`:
```toml
baseURL = "https://staging.diegotoribio.com/"
```

**Example 2: Disable analytics in staging**

Create `config/staging/hugo.toml`:
```toml
[services]
  [services.googleAnalytics]
    ID = ""  # Empty ID disables analytics
```

**Example 3: Different menu for development**

Create `config/development/menus.en.toml`:
```toml
[[main]]
  name = "Writing"
  url = "/writing"
  weight = 10

[[main]]
  name = "Portfolio (Dev)"
  url = "/portfolio/"
  weight = 20
```

## Safe Configuration Changes

### Low Risk (Safe to Change)

**Site metadata:**
- `title`, `author`, `description`, `copyright` in `params.toml`
- Menu `name` (display text) in `menus.en.toml`
- Menu `weight` (ordering) in `menus.en.toml`
- `pagination.pagerSize` in `hugo.toml`

**Process:**
1. Edit file in `config/_default/`
2. Test locally: `hugo server`
3. Verify changes appear correctly
4. Commit and push

### Medium Risk (Test Thoroughly)

**Navigation structure:**
- Menu `pageRef` or `url` in `menus.en.toml`
- Adding/removing menu items

**Process:**
1. Edit `menus.en.toml`
2. Test locally: `hugo server`
3. Verify all menu links work
4. Check mobile layout
5. Test with `hugo --panicOnWarning` for broken links
6. Commit and push

**Date formatting:**
- `dateFormat` in `params.toml`

**Process:**
1. Edit `dateFormat` (must use Go layout: `2006-01-02`)
2. Test locally and check date displays
3. Verify across all pages (writing list, portfolio)
4. Commit if correct

### High Risk (Requires Caution)

**Core settings:**
- `baseURL` in `hugo.toml`
- `theme` in `hugo.toml`
- `taxonomies` in `hugo.toml`
- `markup.goldmark.renderer.unsafe` in `hugo.toml`

**Why risky:**
- **baseURL**: Changes affect absolute URLs, sitemaps, Open Graph
- **theme**: Complete design change, requires testing all pages
- **taxonomies**: Changes affect URLs (`/portfolio_tags/` → `/tags/`)
- **unsafe**: Disabling breaks templates that use raw HTML

**Process:**
1. **Backup:** Commit current working state first
2. **Research:** Understand implications (read Hugo docs)
3. **Test locally:** `hugo server` and verify extensively
4. **Test production build:** `hugo --panicOnWarning`
5. **Check all pages:** Home, writing list, portfolio list, individual posts
6. **Verify URLs:** Check taxonomy pages, menu links, internal links
7. **Commit with detailed message** explaining why change is needed

### Never Change (Without Expert Review)

**Analytics integration:**
- `services.googleAnalytics.ID` - Only change if switching GA accounts

**Required settings:**
- `markup.goldmark.renderer.unsafe = true` - Our templates require this
- `enableRobotsTXT = true` - Required for SEO

**If you must change these:**
1. Create GitHub issue explaining why
2. Test exhaustively in local environment
3. Review with another developer
4. Document the change and rationale

## Troubleshooting

### Changes not appearing

**Cause:** Hugo cache or browser cache.

**Fix:**
1. Stop Hugo server
2. Clear Hugo cache: `hugo --cleanDestinationDir`
3. Restart: `hugo server`
4. Hard refresh browser: `Cmd+Shift+R` (macOS) or `Ctrl+Shift+R` (Windows/Linux)

### Menu links broken

**Cause:** Invalid `pageRef` or `url`.

**Fix:**
1. Check page exists: `ls content/writing/` or `content/portfolio/`
2. Verify path is correct (case-sensitive)
3. For `pageRef`, use `/section` not `/section/`
4. For `url`, include trailing slash: `/portfolio/`

### Date format showing wrong

**Cause:** Invalid Go date layout.

**Fix:**
Go date layouts use reference date `Mon Jan 2 15:04:05 MST 2006`:
```toml
dateFormat = "2006-01-02"      # 2024-12-01
dateFormat = "Jan 02, 2006"    # Dec 01, 2024
dateFormat = "January 2, 2006" # December 1, 2024
```

**Not allowed:**
```toml
dateFormat = "YYYY-MM-DD"  # Wrong - not Go layout
dateFormat = "dd/mm/yyyy"  # Wrong - not Go layout
```

### Environment override not working

**Cause:** `HUGO_ENV` not set or wrong environment name.

**Fix:**
1. Check environment: `echo $HUGO_ENV`
2. Set explicitly: `HUGO_ENV=production hugo`
3. Verify override file exists: `ls config/production/hugo.toml`
4. Check file syntax (valid TOML)

### Build fails after config change

**Cause:** Syntax error in TOML file.

**Fix:**
1. Run Hugo with errors: `hugo 2>&1 | grep -i error`
2. Check TOML syntax (commas, quotes, brackets)
3. Use TOML validator: https://www.toml-lint.com/
4. Revert to last working version: `git checkout config/`

## Common Tasks

### Change site title

1. Edit `config/_default/params.toml`:
   ```toml
   title = "New Title"
   ```
2. Edit `config/_default/hugo.toml`:
   ```toml
   title = "New Title"
   ```
3. Test: `hugo server`
4. Commit both files

### Update site description

1. Edit `config/_default/params.toml`:
   ```toml
   description = "New description text"
   ```
2. Test social preview at https://www.opengraph.xyz/
3. Commit if correct

### Add new menu item

1. Edit `config/_default/menus.en.toml`:
   ```toml
   [[main]]
     name = "Projects"
     url = "/projects/"
     weight = 25  # Between Portfolio (20) and About (30)
   ```
2. Ensure page exists: `content/projects/_index.md`
3. Test menu: `hugo server`
4. Commit

### Change menu order

1. Edit `config/_default/menus.en.toml`
2. Adjust `weight` values (lower = left, higher = right)
3. Test: `hugo server`
4. Commit

### Update copyright year

1. Edit `config/_default/params.toml`:
   ```toml
   copyright = "Copyright © 2026, Diego Toribio"
   ```
2. Test footer: `hugo server`
3. Commit

### Change Google Analytics ID

1. Edit `config/_default/hugo.toml`:
   ```toml
   [services]
     [services.googleAnalytics]
       ID = "G-NEWID123"
   ```
2. Test (requires production mode):
   ```bash
   HUGO_ENV=production hugo server
   ```
3. Check browser console: `[Analytics] Google Analytics loaded`
4. Verify in GA Real-Time dashboard
5. Commit

## Testing Configuration Changes

### 1. Local development test
```bash
hugo server
```
Verify changes in browser at `http://localhost:1313`

### 2. Production mode test
```bash
HUGO_ENV=production hugo server
```
Tests with production environment settings (analytics enabled, etc.)

### 3. Build validation
```bash
hugo --panicOnWarning --cleanDestinationDir
```
Catches configuration errors, broken links, template warnings.

### 4. Check output
```bash
hugo --cleanDestinationDir
ls -la public/
```
Verify expected files generated correctly.

### 5. Validate menu links
```bash
hugo server
```
Click every menu item, verify no 404s.

## Related Documentation

- [docs/ops/building-and-deployment.md](../docs/ops/building-and-deployment.md) - Build process and environment variables
- [docs/ops/github-pages-deployment.md](../docs/ops/github-pages-deployment.md) - CI/CD deployment with production environment
- [Hugo Configuration Documentation](https://gohugo.io/getting-started/configuration/) - Official Hugo config docs
- [TOML Syntax](https://toml.io/en/) - TOML format specification

## Best Practices

### Version control

- **Always commit working config before changes**
- Use descriptive commit messages: `config: update site description for SEO`
- Test locally before committing

### Documentation

- **Document why, not just what** - If changing baseURL, explain why
- Update this README if adding complex overrides
- Comment non-obvious settings in config files

### Testing

- **Test in multiple browsers** - Menu layout, links
- **Test mobile** - Navigation works on small screens
- **Test production build** - Not just dev server
- **Check analytics** - Verify GA still loads after changes

### Rollback plan

If a config change breaks the site:
1. **Revert config:** `git checkout HEAD~1 config/`
2. **Test locally:** `hugo server`
3. **Redeploy:** `git commit -m "Revert config changes" && git push`

### Backup critical settings

Before major config changes:
```bash
# Backup current config
cp -r config/ config.backup/

# Make changes...

# If problems, restore:
rm -rf config/
mv config.backup/ config/
```
