# Docs Overview

One-stop table of contents for the internal docs plus the core commands we keep reaching for.

## What's here
- [local-preview.md](local-preview.md) — run Hugo locally, include drafts/future posts, avoid analytics
- [building-and-deployment.md](building-and-deployment.md) — production vs dev builds, drafts handling, clean builds
- [github-pages-deployment.md](github-pages-deployment.md) — CI/CD workflow, caching, validation, how to mirror CI locally
- [analytics-and-referrals.md](analytics-and-referrals.md) — preview mode toggle, self-traffic filtering, UTM patterns
- [theming-and-dark-mode.md](theming-and-dark-mode.md) — toggle implementation, CSS variables, customization notes

## Handy commands (copy/paste)
- Local preview (no analytics):
  ```bash
  hugo server
  ```
- Local preview with drafts/future:
  ```bash
  hugo server -DF
  ```
- Preview mode on production (analytics off):
  ```
  Enable:  https://diegotoribio.com/?preview=true
  Disable: https://diegotoribio.com/?preview=false
  ```
- Clean production build (CI-equivalent):
  ```bash
  rm -rf public && hugo --gc --enableGitInfo --panicOnWarning --cleanDestinationDir --minify --buildDrafts=false --buildFuture=false --buildExpired=false
  ```
- Set CI-like env before running production commands locally:
  ```bash
  export HUGO_ENV=production
  export HUGO_ENVIRONMENT=production
  ```
