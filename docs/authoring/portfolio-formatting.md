# Portfolio Documentation

**Use this when:** You need guidance on creating or formatting portfolio entries.

This page directs you to the focused portfolio guides based on what you're trying to accomplish.

## Quick Navigation

### Just Getting Started?

**[portfolio-quickstart.md](portfolio-quickstart.md)** - Start here for fast results

- Copy-paste front matter template
- Authoring checklist
- Common tags list
- Three complete examples
- Quick tips for each field

**Best for:** Creating your first portfolio entry or quickly adding a new project.

---

### Writing the Full Project Post?

**[portfolio-style-and-examples.md](portfolio-style-and-examples.md)** - Deep dive on content writing

- Recommended post structure
- Content length guidelines (300-800 words)
- Writing style tips (technical but accessible)
- Detailed annotated example (Multimodal Alzheimer's Detection)
- Figure/image usage and organization

**Best for:** Writing the detailed project write-up with proper structure and style.

---

### Controlling Visibility?

**[portfolio-visibility.md](portfolio-visibility.md)** - Master draft and build flags

- Visibility matrix (4 common configurations)
- Decision tree for choosing settings
- `draft`, `build.list`, `build.render` explained
- Common scenarios with workflows
- Troubleshooting guide

**Best for:** Deciding when/how a portfolio entry appears on the list or controlling publish status.

---

## Still Here? Here's What You Need

If you're looking for specific information that's not in the guides above, here are the most common needs:

### Front Matter Template

```yaml
---
title: "Your Project Name"
date: 2025-01-15
summary: "One-sentence description of what the project does."
highlights:
  - "First key achievement with technical detail"
  - "Second accomplishment or implementation work"
  - "Third result or learning outcome"
portfolio_tags: ["Machine Learning", "Audio", "Text"]
draft: false
---
```

### Common Tags

- `Machine Learning` - General ML projects
- `Deep Learning` - Neural network-based work
- `Reinforcement Learning` - RL-specific projects
- `Generative AI` - LLMs, diffusion models, GANs
- `Audio` - Audio processing or analysis
- `Text` - NLP, text processing
- `Video` - Video processing or computer vision

### Quick Rules

**Title**: 3-6 words, title case, specific and descriptive

**Summary**: 10-20 words, starts with action verb, one sentence

**Highlights**: Exactly 3 bullets, 15-25 words each, mix technical details + results

**Tags**: 2-3 tags from existing vocabulary, most to least relevant

**Date**: YYYY-MM-DD format

### Most Common Visibility Settings

```yaml
# Standard published project (default)
draft: false

# Coming soon mode (show on list, no detail page)
draft: false
build:
  list: "local"
  render: "link"

# Hidden from list (direct link only)
draft: false
build:
  list: "never"

# Work in progress (completely hidden)
draft: true
```

## Related Documentation

- [authoring/index.md](index.md) - Authoring section overview
- [../ops/local-preview.md](../ops/local-preview.md) - How to preview locally
- [../ops/building-and-deployment.md](../ops/building-and-deployment.md) - Production builds
