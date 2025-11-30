# Docs Overview

One-stop table of contents for the internal docs plus the core commands we keep reaching for.

## [Operations & Build Pipeline](ops/)
Guides for local development, testing production builds, and understanding the CI/CD workflow.

**Start here:** [ops/index.md](ops/index.md)

- [ops/local-preview.md](ops/local-preview.md) — run Hugo locally, include drafts/future posts, avoid analytics
- [ops/building-and-deployment.md](ops/building-and-deployment.md) — production vs dev builds, drafts handling, clean builds
- [ops/github-pages-deployment.md](ops/github-pages-deployment.md) — CI/CD workflow, caching, validation, how to mirror CI locally

## [Content Authoring](authoring/)
Writing and formatting guides for portfolio projects and posts.

**Start here:** [authoring/index.md](authoring/index.md)

- [authoring/portfolio-formatting.md](authoring/portfolio-formatting.md) — portfolio entry structure, formatting rules, tag conventions, examples, publish controls

## [Analytics & Customization](analytics/)
Configuration, testing, and customization of analytics and site appearance.

**Start here:** [analytics/index.md](analytics/index.md)

- [analytics/analytics-and-referrals.md](analytics/analytics-and-referrals.md) — preview mode toggle, self-traffic filtering, UTM patterns
- [analytics/theming-and-dark-mode.md](analytics/theming-and-dark-mode.md) — toggle implementation, CSS variables, customization notes

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
