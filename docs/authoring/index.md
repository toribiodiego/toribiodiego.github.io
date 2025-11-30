# Content Authoring

Writing and formatting guides for portfolio projects and posts.

## Who this is for

- Content authors writing new portfolio projects or blog posts
- Anyone updating existing portfolio entries
- Contributors needing formatting guidelines

## What's covered

### Portfolio Projects
- [portfolio-formatting.md](portfolio-formatting.md) — portfolio entry structure, formatting rules, tag conventions, examples, publish controls

## Quick reference

**Portfolio entry front matter (minimal):**
```yaml
---
title: "Project Title"
date: 2025-01-15
summary: "One-sentence description for list view."
highlights:
  - "Key achievement or technical highlight"
  - "Another important detail"
portfolio_tags: ["Machine Learning", "Python"]
---
```

**Publishing controls:**
- `draft: true` — exclude from all builds (dev and prod)
- `build.list: "local"` — show in list locally only (coming soon mode)
- `build.list: "never"` — hide from list view (direct link only)

## When to read these

- Before creating a new portfolio project
- When updating project descriptions or highlights
- To understand how draft and publish flags work
- When choosing appropriate tags for projects
- If a portfolio entry isn't appearing as expected
