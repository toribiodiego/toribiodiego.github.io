# Portfolio Quickstart

**Use this when:** You want to quickly create a new portfolio entry without reading the full formatting guide.

This is a fast-reference guide with templates and checklists. For detailed rules and examples, see [portfolio-formatting.md](portfolio-formatting.md).

## Quick Template

Copy this template to start a new portfolio entry:

```yaml
---
title: "Your Project Name"
date: 2025-01-15
summary: "One-sentence description of what the project does or achieves."
highlights:
  - "First key achievement with specific technical detail or metric"
  - "Second accomplishment showing implementation or integration work"
  - "Third result, finding, or learning outcome with context"
portfolio_tags: ["Machine Learning", "Audio", "Text"]
draft: false
---
```

## Authoring Checklist

Before publishing, verify:

- [ ] **Title**: 3-6 words, title case, specific and descriptive
- [ ] **Summary**: 10-20 words, starts with action verb, one sentence
- [ ] **Highlights**: Exactly 3 bullets, 15-25 words each, mix technical + results
- [ ] **Tags**: 2-3 tags from existing vocabulary (see below)
- [ ] **Date**: YYYY-MM-DD format, accurate project completion date
- [ ] **Draft**: Set to `false` when ready to publish

## Common Tags

Use 2-3 tags from the canonical vocabulary (most to least relevant). For the complete tag list, selection rules, and when to add new tags, see **[portfolio-tags.md](portfolio-tags.md)**.

**Most common tags:**
- `Machine Learning`, `Deep Learning`, `Reinforcement Learning`, `Generative AI`
- `Audio`, `Text`, `Video`, `Images`

**Quick selection guide:**
1. Choose one ML/AI category tag (what approach you used)
2. Choose 1-2 modality tags (what data types you worked with)
3. Stop at 2-3 tags total

## Quick Examples

### Example 1: ML Research Project

```yaml
---
title: "Multimodal Alzheimer's Detection"
date: 2025-05-03
summary: "Used spontaneous speech from clinician-patient conversations as a diagnostic signal for automated Alzheimer's detection."
highlights:
  - "Designed a scalable ETL pipeline for recordings, handling audio processing, transcription, and feature extraction across multiple models"
  - "Developed a training pipeline to evaluate multiple classifiers on audio, text, and combined embeddings"
  - "Found that text embeddings performed best (82% / 0.83 F1), while combining audio and text improved results over audio-only baseline"
portfolio_tags: ["Machine Learning", "Audio", "Text"]
draft: false
---
```

### Example 2: Interactive AI Agent

```yaml
---
title: "Agnus The Troll"
date: 2024-12-20
summary: "An interactive audio-video agent designed to mock and provoke attendees."
highlights:
  - "Built a real-time audio-video loop connecting a dynamic microphone and webcam for live speech and visual input"
  - "Integrated the Gemini 2.5 Live API with WebSockets to stream and play spoken responses in continuous conversation"
  - "Configured session memory and a simple Gradio interface to let users start, stop and resume interaction seamlessly"
portfolio_tags: ["Generative AI", "Audio", "Video"]
draft: false
---
```

### Example 3: RL Game Agents

```yaml
---
title: "Board Game Agents"
date: 2024-09-15
summary: "Learned tic-tac-toe and checkers entirely through self-play."
highlights:
  - "Implemented Q-learning and Deep Q-Network agents with epsilon-greedy exploration"
  - "Trained agents through 100k+ self-play games with reward shaping for valid moves"
  - "Achieved 95%+ win rate against random baseline in both games"
portfolio_tags: ["Reinforcement Learning", "Deep Learning"]
draft: false
---
```

## Writing Tips

### Title
- Use title case (capitalize major words)
- Be specific but concise
- Avoid generic words like "System" or "Project"

### Summary
- Start with action verb: "Built", "Designed", "Developed", "Used", "Created"
- Focus on WHAT (not WHY or HOW)
- No period at end in YAML
- Aim for ~15 words

### Highlights
- Start each with action verb
- Include specific technical details or metrics
- Mix implementation (what you built) with results (what you found)
- Balance length across all 3 bullets

### Tags
- Choose 2-3 most relevant tags
- Order from most to least relevant
- Stick to existing tags when possible

## Publishing Controls

Control visibility with optional build flags. For comprehensive details, see [portfolio-visibility.md](portfolio-visibility.md).

**Quick reference:**

```yaml
# Coming soon mode (show in list locally only, no detail page)
build:
  list: "local"
  render: "link"

# Hidden from list (accessible via direct link only)
build:
  list: "never"

# Full draft (exclude from all builds)
draft: true
```

## Next Steps

- Save your file as `content/portfolio/project-name/index.md`
- Preview locally: `hugo server -DF` (see [local preview guide](../ops/local-preview.md) for details)
- Check the portfolio list at `http://localhost:1313/portfolio/`
- Remove `draft: false` or set `draft: false` when ready to publish
- See [portfolio-formatting.md](portfolio-formatting.md) for navigation to detailed guides
