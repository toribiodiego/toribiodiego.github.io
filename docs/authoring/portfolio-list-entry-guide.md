# Portfolio List Entry Guide

**Use this when:** You need a clear recipe for the three fields that show on the portfolio list cards: `title`, `summary`, and `highlights`.

## Purpose of Each Field
- **Title**: Fast label that names the project; should stand alone in a list.
- **Summary**: 1–2 lines that say what the project does and for whom/why; max the length of the Multimodal Alzheimer's Detection summary (~20 words).
- **Highlights**: Three skimmable bullets mixing what you built, how, and one result/learning; resume-style but readable.

## Field Rules
### Title
- 3–6 words; title case; specific noun/verb pair if possible.
- Avoid filler ("project", "system"), colons, and overly clever names without context.
- Example: `Multimodal Alzheimer's Detection`, `Agnus The Troll`, `Board Game Agents`.

### Summary
- 12–20 words (target 1–2 rendered lines); past tense; no period in YAML.
- Formula: `Built/Used <tech/approach> to <do what> for <audience/goal>`
- ✓ "Used spontaneous speech from clinician-patient conversations as a diagnostic signal for automated Alzheimer's detection"
- ✓ "Integrated multimodal agent that sees and responds live to mock exhibition attendees"
- ✗ "This project is about speech and dementia detection" (too vague)

### Highlights (3 bullets)
- Exactly 3 bullets; 15–22 words each; start with strong past-tense verbs.
- Mix implementation + integration + outcome/learning. Name concrete tools/APIs/models/hardware.
- Resume-like but readable; no trailing periods.
- Example pattern to reuse:
```yaml
highlights:
  - "Built <system/pipeline> using <tools> to <capability/result>"
  - "Integrated <APIs/models/hardware> for <interaction/performance detail>"
  - "Achieved <metric/outcome/learning> showing <impact>"
```
- ✓ "Built a real-time audio-video loop connecting a dynamic microphone and webcam for live speech and visual input"
- ✓ "Integrated the Gemini 2.5 Live API with WebSockets to stream and play spoken responses in continuous conversation"
- ✓ "Configured session memory and a simple Gradio interface to let users start, stop and resume interaction seamlessly"
- ✗ "Made a UI" (too short, no specifics)

## Ready-to-Copy Front Matter (list-focused)
```yaml
---
title: "Project Title"
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

## Quick Do/Don’t
- **Do** keep summaries inside two lines of the card layout; use the Multimodal entry as a length ceiling.
- **Do** balance tech and outcome in highlights; include at least one metric or tangible effect.
- **Do** order highlights from build → integration → result when it reads well.
- **Don’t** exceed three bullets; the list template only shows three.
- **Don’t** use future dates (hides entry) or placeholders like "TBD" in bullets.
- **Don’t** add trailing periods inside YAML strings.

## Where to Put Your Entry
Place each project in `content/portfolio/<slug>/index.md` with images under `resources/`. Rendered list cards pull from `title`, `summary`, and the first three `highlights` in that file.

## Related Guides
- `docs/authoring/portfolio-quickstart.md` — front matter template and checklist
- `docs/authoring/portfolio-formatting.md` — full field rules and tag conventions
- `docs/authoring/portfolio-style-and-examples.md` — writing the full post
- `docs/authoring/portfolio-visibility.md` — draft and build flags
