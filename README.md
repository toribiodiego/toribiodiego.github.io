# diegotoribio.com

Source code for [diegotoribio.com](https://diegotoribio.com) -- a personal
portfolio and writing site.

Built with [Hugo](https://gohugo.io/) using the
[Bear Blog](https://github.com/janraasch/hugo-bearblog) theme, deployed
to [GitHub Pages](https://pages.github.com/).

## Prerequisites

- [Hugo Extended](https://gohugo.io/installation/) v0.148.2 or later
  (the Extended edition is required for SCSS compilation)

## Local development

```bash
# Preview published content only
hugo server

# Include drafts and future-dated posts
hugo server -DF
```

Open http://localhost:1313 to view the site.

### Production build

Replicate the CI build locally:

```bash
export HUGO_ENV=production
export HUGO_ENVIRONMENT=production
hugo --gc --enableGitInfo --panicOnWarning --cleanDestinationDir --minify
```

## Repository structure

```
.
├── content
│   ├── _index.md
│   ├── portfolio/           # Project pages
│   └── writing/             # Posts and notes
├── layouts
│   ├── _default/
│   ├── partials/            # Header, footer, analytics, theme toggle
│   ├── portfolio/
│   ├── shortcodes/
│   └── writing/
├── assets
│   ├── icons/               # SVG social icons
│   └── scss/                # main.scss and partials
├── static
│   ├── css/ js/             # Client-side files (copied as-is)
│   └── CNAME               # Custom domain
├── config
│   ├── _default/            # Base Hugo config, menus, params
│   ├── production/
│   └── staging/
├── docs/                    # Internal guides (build, deploy, analytics, theming)
└── themes/hugo-bearblog     # Theme submodule; overrides live in layouts/assets
```

## Docs and links

| Topic | Link | Description |
| --- | --- | --- |
| Docs overview | [docs/README.md](docs/README.md) | Table of contents for all guides |
| Local preview | [docs/ops/local-preview.md](docs/ops/local-preview.md) | Running Hugo locally, draft and future flags |
| Builds and drafts | [docs/ops/building-and-deployment.md](docs/ops/building-and-deployment.md) | Dev vs prod builds, clean builds, draft handling |
| CI/deploy (Pages) | [docs/ops/github-pages-deployment.md](docs/ops/github-pages-deployment.md) | GitHub Pages workflow, caching, validation flags |
| Analytics | [docs/analytics/analytics-and-referrals.md](docs/analytics/analytics-and-referrals.md) | Self-traffic filtering and UTM conventions |
| Theming / dark mode | [docs/analytics/theming-and-dark-mode.md](docs/analytics/theming-and-dark-mode.md) | Theme toggle, CSS variables, customization |
| Portfolio formatting | [docs/authoring/portfolio-formatting.md](docs/authoring/portfolio-formatting.md) | Portfolio entry structure, tagging, examples |

## License

All rights reserved. See [LICENSE](LICENSE) for details.
