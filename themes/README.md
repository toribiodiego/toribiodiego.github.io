# Themes Directory - DO NOT EDIT

This directory contains the **upstream hugo-bearblog theme** located at `themes/hugo-bearblog/`, managed as a Git submodule.

**IMPORTANT:** Do not edit files in the theme submodule directly. All customizations should be placed in the root-level `layouts/` and `assets/` directories where they will override the theme defaults.

## Theme Information

**Theme:** hugo-bearblog
**Repository:** https://github.com/janraasch/hugo-bearblog
**Type:** Git submodule
**Current commit:** `720f4c9` - Add Post Navigator setting for Blog Posts

## How Hugo Template Override Works

Hugo follows a lookup order when loading templates:

1. `layouts/<section>/<type>.html` (most specific - **we use this**)
2. `layouts/_default/<type>.html`
3. `themes/hugo-bearblog/layouts/<section>/<type>.html`
4. `themes/hugo-bearblog/layouts/_default/<type>.html` (theme default)

**Bottom line:** Files in your root `layouts/` directory automatically override files with the same path in `themes/hugo-bearblog/layouts/`.

## Making Customizations

### To override a theme template:

1. **Identify the theme file** you want to override (e.g., `themes/hugo-bearblog/layouts/partials/header.html`)
2. **Copy to root** with the same relative path (e.g., `layouts/partials/header.html`)
3. **Edit your copy** in the root `layouts/` directory
4. Hugo will automatically use your version instead of the theme's

### To add custom styles:

1. Edit `assets/scss/main.scss` or create new SCSS partials
2. Our custom `layouts/partials/style.html` overrides the theme's CSS loading
3. See `assets/README.md` for SCSS structure and guidelines

### To add custom JavaScript:

1. Add scripts to `static/js/`
2. Load them via `layouts/partials/custom_head.html` or `layouts/partials/custom_body.html`
3. These are theme "hook" partials provided for customization

## Current Overrides

We currently override the following theme files (see `layouts/README.md` for details):

**Partials:**
- `partials/header.html` - Custom header with theme toggle
- `partials/footer.html` - Custom footer with email copy functionality
- `partials/style.html` - Custom SCSS pipeline instead of theme CSS
- `partials/custom_head.html` - Theme hook: loads theme toggle, analytics
- `partials/custom_body.html` - Theme hook: currently minimal

**Section Templates:**
- `portfolio/list.html` - Custom portfolio listing with highlights
- `portfolio/single.html` - Custom portfolio project pages
- `writing/list.html` - Custom writing listing
- `writing/single.html` - Custom blog post pages

**Custom Components (not in theme):**
- `partials/theme-toggle.html` - Dark/light mode toggle button
- `partials/google_analytics_with_preview.html` - GA4 with preview mode
- `partials/tags-chips.html` - Tag chip rendering

## Local Patches

**Status:** No local patches applied.

This is a clean git submodule with no modifications to the theme code. All customizations are implemented via Hugo's override mechanism in `layouts/` and `assets/`.

If we ever need to patch the theme directly (not recommended), document it here:

```
# Example:
- File: layouts/partials/seo_tags.html
- Reason: Fix Open Graph image path bug
- Upstream PR: https://github.com/janraasch/hugo-bearblog/pull/XXX
- Applied: 2024-12-01
```

## Updating the Theme

The theme is managed as a git submodule. To update:

```bash
# Check current version
cd themes/hugo-bearblog
git log --oneline -1

# Update to latest
cd /Users/Work/Desktop/website
git submodule update --remote themes/hugo-bearblog

# Or update to specific commit
cd themes/hugo-bearblog
git checkout <commit-hash>
cd ../..
git add themes/hugo-bearblog
git commit -m "chore: update hugo-bearblog theme to <version>"
```

**Before updating:**
1. Review theme CHANGELOG for breaking changes
2. Test locally with `hugo server`
3. Check that all overrides still work correctly
4. Verify theme toggle, analytics, and custom features
5. Test production build: `hugo --panicOnWarning`

## Troubleshooting

### Changes to theme files not appearing

**Problem:** You edited a file in `themes/hugo-bearblog/` but changes aren't showing.

**Solution:** Don't edit theme files directly. Copy to `layouts/` and edit there:
```bash
# Wrong (will be lost on theme update)
vim themes/hugo-bearblog/layouts/partials/header.html

# Right (survives theme updates)
cp themes/hugo-bearblog/layouts/partials/header.html layouts/partials/header.html
vim layouts/partials/header.html
```

### Override not working

**Problem:** Created `layouts/partials/foo.html` but theme's version still loads.

**Possible causes:**
1. **Path mismatch** - Ensure exact same path as in theme
2. **Typo in filename** - Hugo is case-sensitive (`Foo.html` ≠ `foo.html`)
3. **Cache issue** - Clear and rebuild: `hugo --cleanDestinationDir`
4. **Wrong directory** - Must be in root `layouts/`, not `themes/hugo-bearblog/layouts/`

### Theme update broke site

**Problem:** After updating theme submodule, site doesn't work.

**Solution:** Rollback to previous version:
```bash
cd themes/hugo-bearblog
git log --oneline -10  # Find previous working commit
git checkout <previous-commit>
cd ../..
git add themes/hugo-bearblog
git commit -m "chore: rollback theme to working version"
```

Then investigate breaking changes and update overrides accordingly.

## Related Documentation

- **Layouts:** `layouts/README.md` - Detailed documentation of all template overrides
- **Assets:** `assets/README.md` - SCSS structure and customization guide
- **Config:** `config/README.md` - Configuration and menu setup
- **Theme repo:** https://github.com/janraasch/hugo-bearblog - Upstream theme source
- **Hugo docs:** https://gohugo.io/templates/lookup-order/ - Template lookup order

## Best Practices

1. **Never edit theme files directly** - Always use overrides in `layouts/`
2. **Document why** you're overriding something (add comments in override files)
3. **Keep overrides minimal** - Only override what you need to change
4. **Test after theme updates** - Ensure your overrides still work
5. **Consider contributing upstream** - If you fix a bug, submit a PR to the theme

## Questions?

- Unsure if you should edit a theme file? **You shouldn't.** Use an override instead.
- Need to customize a template? Check `layouts/README.md` for examples.
- Want to add custom styles? See `assets/README.md` for SCSS guidelines.
