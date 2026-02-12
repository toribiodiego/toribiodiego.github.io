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

**Detailed guides:**
- [authoring/portfolio-formatting.md](authoring/portfolio-formatting.md) — navigation hub directing you to the right guide
- [authoring/portfolio-quickstart.md](authoring/portfolio-quickstart.md) — fast-start template, checklist, and minimal examples
- [authoring/portfolio-style-and-examples.md](authoring/portfolio-style-and-examples.md) — writing style, content structure, annotated examples
- [authoring/portfolio-visibility.md](authoring/portfolio-visibility.md) — visibility controls, decision tree, troubleshooting
- [authoring/portfolio-tags.md](authoring/portfolio-tags.md) — canonical tag vocabulary, selection rules, when to add new tags

## [Analytics & Customization](analytics/)
Configuration, testing, and customization of analytics and site appearance.

**Start here:** [analytics/index.md](analytics/index.md)

- [analytics/analytics-and-referrals.md](analytics/analytics-and-referrals.md) — **canonical analytics guide**: preview mode (`?preview=true`), self-traffic filtering (dev/prod), UTM patterns
- [analytics/theming-and-dark-mode.md](analytics/theming-and-dark-mode.md) — toggle implementation, CSS variables, customization notes

## Quick Commands

For detailed build instructions and all command options, see **[ops/local-preview.md](ops/local-preview.md)** (canonical reference).

**Most common commands:**

```bash
# Local preview (published content only, no analytics)
hugo server

# Local preview with drafts and future-dated posts
hugo server -DF
```

**Preview mode on production** (bypass analytics): See [analytics/analytics-and-referrals.md](analytics/analytics-and-referrals.md)

**Production builds and CI commands**: See [ops/github-pages-deployment.md](ops/github-pages-deployment.md)
