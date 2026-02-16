# Content Authoring

Writing and formatting guides for portfolio projects and posts.

## Who this is for

- Content authors writing new portfolio projects or blog posts
- Anyone updating existing portfolio entries
- Contributors needing formatting guidelines

## What's covered

### Portfolio Projects (Detailed Guides)
- [portfolio-formatting.md](portfolio-formatting.md) — navigation hub directing you to the right guide
- [portfolio-quickstart.md](portfolio-quickstart.md) — fast-start template, checklist, and minimal examples
- [portfolio-style-and-examples.md](portfolio-style-and-examples.md) — writing style, content structure, annotated examples
- [portfolio-visibility.md](portfolio-visibility.md) — visibility controls (draft, build flags), decision tree, troubleshooting
- [portfolio-tags.md](portfolio-tags.md) — canonical tag vocabulary, selection rules, when to add new tags
- [images.md](images.md) — responsive image shortcode, optimization workflow, accessibility guidelines

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
