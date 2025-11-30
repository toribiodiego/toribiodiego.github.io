# Operations & Build Pipeline

Guides for local development, testing production builds, and understanding the CI/CD workflow.

## Who this is for

- Developers testing changes locally before pushing
- Anyone debugging build or deployment issues
- Contributors wanting to replicate the CI environment

## What's covered

### Local Development
- [local-preview.md](local-preview.md) — run Hugo locally, include drafts/future posts, avoid analytics

### Production Builds
- [building-and-deployment.md](building-and-deployment.md) — production vs dev builds, drafts handling, clean builds

### CI/CD Pipeline
- [github-pages-deployment.md](github-pages-deployment.md) — CI/CD workflow, caching, validation, how to mirror CI locally

## Quick reference

See **[local-preview.md](local-preview.md)** for all local development commands.

See **[github-pages-deployment.md](github-pages-deployment.md)** for production build and CI commands.

## When to read these

- Before pushing changes to ensure they'll pass CI
- When build errors occur in GitHub Actions
- When setting up a new development environment
- To understand how drafts and future-dated content are handled
