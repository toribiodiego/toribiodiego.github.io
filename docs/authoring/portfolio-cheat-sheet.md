---
title: "Portfolio Authoring Guide"
draft: true
---

# Portfolio Entry Cheat Sheet

**Use this when:** You are adding a new `content/portfolio/<slug>/index.md` and need the essentials in one place.

## Minimal Template
```yaml
---
title: "Project Name"
date: 2025-01-15
summary: "Built <tech/approach> to <do what> for <who/why>."
highlights:
  - "Built <system/pipeline> using <tools> to <capability/result>"
  - "Integrated <APIs/models/hardware> for <interaction/performance detail>"
  - "Achieved <metric/outcome/learning> showing <impact>"
portfolio_tags: ["Tag1", "Tag2"]
draft: false
---
```

## Quick Checklist
- Title 3–6 words, title case
- Summary 12–20 words (1–2 lines, no trailing period)
- Exactly 3 highlights, 15–22 words, past tense, no trailing periods
- 2–3 `portfolio_tags` from the canonical list
- Date is not in the future; `draft` set appropriately

## Fast Pointers
- Length guardrail: keep summaries at or below the Multimodal Alzheimer's Detection summary length (~20 words).
- List cards render only the first three highlights; keep them skimmable with concrete tools/APIs and one result.
- Images go in `resources/` next to `index.md` with descriptive names.

## Full Guides (readable from here)
- `docs/authoring/portfolio-list-entry-guide.md` — titles, summaries, highlights for list cards
- `docs/authoring/portfolio-quickstart.md` — full template and checklist
- `docs/authoring/portfolio-formatting.md` — complete field rules and tags
- `docs/authoring/portfolio-style-and-examples.md` — writing the full post
- `docs/authoring/portfolio-visibility.md` — draft and build flags
