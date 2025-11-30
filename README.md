
> This repository contains the code for a Hugo/Bearblog-based site hosting Diego Toribio’s portfolio and writing at https://diegotoribio.com, including source, content, and GitHub Pages deployment.

## Quick commands
Fast copy/paste for local preview, drafts, production builds, and disabling analytics on prod.
- Preview mode on prod (turn off analytics while browsing live):
  ```
  Enable:  https://diegotoribio.com/?preview=true
  Disable: https://diegotoribio.com/?preview=false
  ```
- Local preview (published content only, analytics off by default):
  ```bash
  hugo server
  ```
  → open http://localhost:1313
- Local preview with drafts and future-dated posts:
  ```bash
  hugo server -DF
  ```
  → open http://localhost:1313
- Clean production build (same flags as CI):
  ```bash
  rm -rf public && hugo --gc --enableGitInfo --panicOnWarning --cleanDestinationDir --minify --buildDrafts=false --buildFuture=false --buildExpired=false
  ```
- Match CI environment (before running prod build locally):
  ```bash
  export HUGO_ENV=production
  export HUGO_ENVIRONMENT=production
  ```

## Repository Structure
Reference map of content, templates/Bearblog overrides, assets, config, and build artifacts in this Hugo site.
```
.
├── content
│   ├── _index.md
│   ├── portfolio/           # Project pages
│   └── writing/             # Posts/notes
├── layouts
│   ├── _default/
│   ├── partials/            # header/footer, analytics, theme toggle
│   ├── portfolio/
│   ├── shortcodes/
│   └── writing/
├── assets
│   ├── icons/               # SVG social icons
│   └── scss/                # main.scss + partials
├── static
│   ├── css/ js/             # Client-side files (copied as-is)
│   ├── CNAME                # Custom domain
│   └── Toribio_Diego_Resume.pdf
├── config
│   ├── _default/            # Base Hugo config/menus/params
│   ├── production/
│   └── staging/
├── docs                     # Internal guides (build/deploy/analytics/theme)
├── public                   # Built site output (clean before prod builds)
├── resources/_gen           # Hugo-generated assets cache
└── themes/hugo-bearblog     # Theme; overrides live in layouts/assets
```

- Documentation: `docs/`
  - Internal guides for local preview, build/deploy workflows, analytics/preview mode, and theming (see `docs/README.md` for TOC).
- Home/about content: `content/_index.md`
  - Landing page copy, bio, and “Currently Working On” list.
- Portfolio entries: `content/portfolio/*`
  - Project case studies with front matter, images, and resource links.
- Writing posts: `content/writing/*`
  - Notes and articles in Markdown with light front matter.
- Template overrides: `layouts/partials`, `layouts/portfolio`, `layouts/writing`, `layouts/shortcodes`
  - Custom Bearblog overrides for header/footer, analytics + preview badge, theme toggle, and page layouts.
- Styles & icons: `assets/scss/main.scss` (+ partials), `assets/icons/`
  - SCSS architecture for typography/layout/responsive pieces and social SVGs compiled by Hugo extended.
- Static assets: `static/js`, `static/css`, `static/CNAME`, `static/Toribio_Diego_Resume.pdf`
  - Files published verbatim; includes preview-mode badge JS, theme toggle JS, custom domain file, and resume PDF.
- Configuration: `config/_default`, `config/production`, `config/staging`
  - Base Hugo settings, menus, and params with environment-specific overrides.
- Build output: `public/`
  - Generated site artifact from Hugo; clean before production builds to avoid stale pages.
- Hugo cache: `resources/_gen/`
  - Generated assets cache (SCSS, images); safe to clear for clean rebuilds.
- Theme (upstream): `themes/hugo-bearblog`
  - Third-party theme source; our customizations live in `layouts` and `assets`.

## Docs & links
Fast navigation to the internal guides.

| Topic | Link | What it covers |
| --- | --- | --- |
| Docs overview | [docs/README.md](docs/README.md) | Table of contents for all internal guides. |
| Local preview | [docs/local-preview.md](docs/local-preview.md) | Running Hugo locally, drafts/future flags, and keeping analytics off. |
| Builds & drafts | [docs/building-and-deployment.md](docs/building-and-deployment.md) | Dev vs prod builds, clean builds, and draft handling. |
| CI/deploy (Pages) | [docs/github-pages-deployment.md](docs/github-pages-deployment.md) | GitHub Pages workflow, caching, validation flags, mirroring CI locally. |
| Analytics & UTM | [docs/analytics-and-referrals.md](docs/analytics-and-referrals.md) | Preview-mode toggle, self-traffic filtering, and UTM conventions. |
| Theming / dark mode | [docs/theming-and-dark-mode.md](docs/theming-and-dark-mode.md) | Theme toggle implementation, CSS variables, and customization hooks. |
| Portfolio formatting | [docs/portfolio-formatting.md](docs/portfolio-formatting.md) | Portfolio entry structure, title/summary/highlights rules, tagging, examples. |
