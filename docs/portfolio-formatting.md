# Portfolio Formatting Guide

This guide explains how to format portfolio entries for consistent presentation on the portfolio list page. It covers front matter structure, content length, highlights formatting, and tagging conventions based on existing portfolio examples.

## Overview

Portfolio entries appear on the `/portfolio/` list page with:
- **Title** (linked or unlinked based on publish status)
- **Summary** (1-2 sentence description)
- **Highlights** (up to 3 bullet points showing key achievements)
- **Tags** (portfolio_tags for categorization)

The list template (`layouts/portfolio/list.html`) controls how these elements render.

## Front Matter Structure

### Required Fields

```yaml
---
title: "Project Title"
date: YYYY-MM-DD
summary: "Brief one-sentence description of the project."
portfolio_tags: ["Tag1", "Tag2", "Tag3"]
draft: false
---
```

### Optional Fields

```yaml
highlights:
  - "First key achievement or technical detail"
  - "Second accomplishment or implementation highlight"
  - "Third result or learning outcome"

build:
  list: "local"     # Controls list visibility (default: always shown)
  render: "link"    # Controls page rendering (default: renders full page)
```

## Field Guidelines

### Title

**Format**: Clear, descriptive project name

**Length**: 3-6 words ideal

**Examples**:
- ✓ "Multimodal Alzheimer's Detection"
- ✓ "Board Game Agents"
- ✓ "Agnus The Troll"
- ✗ "Project" (too vague)
- ✗ "A Machine Learning System for Detecting Alzheimer's Disease Using Audio and Text Features" (too long)

**Rules**:
- Use title case
- Be specific but concise
- Avoid generic words like "System", "Application", "Project" unless necessary
- Technical terms are fine if they clarify the domain

### Summary

**Format**: Single sentence describing what the project does or achieves

**Length**: 10-20 words (aim for ~15)

**Character limit**: 100-150 characters recommended

**Examples**:

✓ **Good summaries** (concise, action-focused):
```yaml
summary: "Used spontaneous speech from clinician-patient conversations as a diagnostic signal for automated Alzheimer's detection."

summary: "An interactive audio-video agent designed to mock and provoke attendees."

summary: "Learned tic-tac-toe and checkers entirely through self-play."
```

✗ **Poor summaries** (too long, vague, or generic):
```yaml
summary: "This is a project I worked on during my time at Cooper Union where I explored various machine learning techniques."

summary: "ML project"

summary: "Implemented a system that uses cutting-edge deep learning architectures to process multimodal data streams in real-time for classification tasks."
```

**Rules**:
- Start with an action verb (e.g., "Built", "Designed", "Developed", "Used")
- Focus on WHAT, not WHY or HOW (save details for highlights)
- One sentence, no periods at the end in YAML
- Avoid filler words ("really", "very", "interesting")
- Be specific about the domain or technology

### Highlights

**Format**: Array of 3 bullet points (shown on list page)

**Length**: 15-25 words per bullet

**Purpose**: Show key technical achievements, results, or learnings

**Structure**: Each highlight should follow this pattern:
- Start with an action verb
- Include specific technical detail or metric
- Focus on one idea per bullet

**Examples**:

From "Multimodal Alzheimer's Detection":
```yaml
highlights:
  - "Designed a scalable ETL pipeline for recordings, handling audio processing, transcription, and feature extraction across multiple models to produce audio and text embeddings"
  - "Developed a training pipeline to evaluate multiple classifiers on audio, text, and combined embeddings."
  - "Found that text embeddings performed best (82% / 0.83 F1), while combining audio and text improved results over the audio-only baseline (70% / 0.74 F1)"
```

From "Agnus The Troll":
```yaml
highlights:
  - "Built a real-time audio-video loop connecting a dynamic microphone and webcam for live speech and visual input."
  - "Integrated the Gemini 2.5 Live API with WebSockets to stream and play spoken responses in continuous conversation."
  - "Configured session memory and a simple Gradio interface to let users start, stop and resume interaction seamlessly."
```

**Rules**:
- Exactly 3 highlights (template shows `first 3`, so additional ones are ignored)
- Mix technical details with results/outcomes
- Include metrics or numbers when relevant (accuracy, performance, scale)
- Use Markdown formatting if needed (e.g., `*italics*`, `**bold**`, inline code)
- Keep bullets balanced in length (avoid one very long and two very short)
- Focus on what YOU built or learned (not background/motivation)

**Template** for different highlight types:

1. **Technical implementation**: "Built/Designed/Developed [system component] using [technology] to [achieve goal]"
2. **Integration/tooling**: "Integrated [tool/API] with [technology] to [enable capability]"
3. **Results/findings**: "Found/Achieved [metric/outcome], [comparison or context]"

### Portfolio Tags

**Format**: Array of 1-5 tags from controlled vocabulary

**Purpose**: Categorize projects by domain, technology, or method

**Display**: Tags appear as clickable links to taxonomy pages

**Current tag vocabulary** (based on existing projects):
- **Machine Learning** - General ML projects
- **Deep Learning** - Neural network-based projects
- **Reinforcement Learning** - RL-specific work
- **Generative AI** - Generative models (LLMs, diffusion, GANs)
- **Audio** - Audio processing or analysis
- **Text** - NLP, text processing
- **Video** - Video processing or computer vision

**Examples**:
```yaml
# Multimodal project with audio and text
portfolio_tags: ["Machine Learning", "Audio", "Text"]

# Interactive generative agent
portfolio_tags: ["Generative AI", "Audio", "Video"]

# RL game agents
portfolio_tags: ["Reinforcement Learning", "Deep Learning"]
```

**Rules**:
- Use 2-3 tags per project (1 minimum, 5 maximum)
- Choose the most specific relevant tags
- Order from most to least relevant
- Use existing tags when possible (maintains consistency)
- New tags should be broad enough to apply to multiple projects

**Adding new tags**:
1. Check if existing tags fit first
2. If creating a new tag, use title case
3. Keep tags 1-2 words
4. Make them broadly applicable (not project-specific)

### Date

**Format**: `YYYY-MM-DD`

**Purpose**: Controls default sorting when no weight is specified

**Examples**:
```yaml
date: 2025-05-03
date: 2024-12-20
```

**Rules**:
- Use project completion date or publication date
- More recent dates appear higher in the list (when weight is equal)
- Required field

### Draft Status

**Format**: Boolean (`true` or `false`)

**Purpose**: Controls whether the entry appears on the list

**Examples**:
```yaml
draft: false  # Shows on portfolio list
draft: true   # Hidden from portfolio list
```

**Rules**:
- Set `draft: true` for incomplete projects
- Set `draft: false` when ready to publish
- Draft items are hidden even if other fields are complete

### Build Flags (Optional)

**Format**: YAML map with `list` and `render` keys

**Purpose**: Fine-grained control over list visibility and page rendering

**Options**:

```yaml
build:
  list: "local"     # or "always" (default), "never"
  render: "link"    # or "always" (default), "never"
```

**Behavior**:

| list | render | Result |
|------|--------|--------|
| (default) | (default) | Shows in list with clickable link to full page |
| `"local"` | `"link"` | Shows in list but page not built (title not clickable) |
| `"never"` | - | Hidden from list entirely |

**Use cases**:
- `build.list: "local"` + `build.render: "link"`: Show on list without building full page (useful for "coming soon" projects)
- `build.list: "never"`: Completely hide from portfolio list
- Default (no build flags): Normal published project with full page

**Example** (Agnus project):
```yaml
build:
  list: "local"     # Include in list
  render: "link"    # Don't build full page HTML
```

This shows "Agnus The Troll" on the list with title, summary, and highlights, but the title isn't clickable because there's no published page yet.

## Content Body

The content below the front matter becomes the full project write-up (if `build.render` allows it).

**Structure recommendations**:
1. Introduction (1-2 paragraphs: what, why, context)
2. Technical approach (2-3 paragraphs: how you built it)
3. Results or outcomes (1-2 paragraphs: what you found/achieved)
4. Figures/images with captions
5. Links to code, demos, papers, posters

**Example** (Multimodal Alzheimer's Detection):
- Intro paragraph: Context about Alzheimer's detection and project goals
- Technical paragraph: ETL pipeline, feature extraction, models tested
- Results paragraph: Findings about text vs. audio vs. multimodal
- Figures: Flowchart, results visualization
- Links: Poster, code repository

## Complete Examples

### Example 1: Published Project with Full Page

```yaml
---
title: "Multimodal Alzheimer's Detection"
summary: "Used spontaneous speech from clinician-patient conversations as a diagnostic signal for automated Alzheimer's detection."
highlights:
  - "Designed a scalable ETL pipeline for recordings, handling audio processing, transcription, and feature extraction across multiple models to produce audio and text embeddings"
  - "Developed a training pipeline to evaluate multiple classifiers on audio, text, and combined embeddings."
  - "Found that text embeddings performed best (82% / 0.83 F1), while combining audio and text improved results over the audio-only baseline (70% / 0.74 F1)"

date: 2025-05-03
portfolio_tags: ["Machine Learning", "Audio", "Text"]
draft: false
---

[Full project write-up content here...]
```

**Result**: Shows on list with clickable title leading to full page

### Example 2: List-Only Entry (No Full Page)

```yaml
---
title: "Agnus The Troll"
date: 2025-04-26
summary: "An interactive audio-video agent designed to mock and provoke attendees."
portfolio_tags: ["Generative AI", "Audio", "Video"]
highlights:
  - "Built a real-time audio-video loop connecting a dynamic microphone and webcam for live speech and visual input."
  - "Integrated the Gemini 2.5 Live API with WebSockets to stream and play spoken responses in continuous conversation."
  - "Configured session memory and a simple Gradio interface to let users start, stop and resume interaction seamlessly."

draft: false
build:
  list: "local"
  render: "link"
---

[Content exists but page isn't rendered to disk]
```

**Result**: Shows on list but title is not clickable (no full page built)

### Example 3: Draft Project

```yaml
---
title: "Board Game Agents"
date: 2024-12-20
portfolio_tags: ["Reinforcement Learning", "Deep Learning"]
summary: "Learned tic-tac-toe and checkers entirely through self-play."
highlights:
  - "Placeholder 1"
  - "Placeholder 2"
  - "Placeholder 3"

draft: true
---

[Work in progress content...]
```

**Result**: Hidden from portfolio list entirely

## Checklist for New Portfolio Entries

Before adding a new portfolio entry, ensure:

- [ ] Title is clear and 3-6 words
- [ ] Summary is 10-20 words, starts with action verb
- [ ] Exactly 3 highlights, each 15-25 words
- [ ] Highlights mix technical details with results
- [ ] 2-3 portfolio_tags from existing vocabulary
- [ ] Date is in YYYY-MM-DD format
- [ ] `draft: false` when ready to publish
- [ ] Build flags set if showing without full page
- [ ] Front matter uses proper YAML formatting (arrays with `-`, quotes for strings with special chars)

## Testing Your Entry

After creating a portfolio entry:

1. **Preview locally**:
   ```bash
   hugo server -D  # Include drafts
   ```
   Visit `http://localhost:1313/portfolio/` to see the list

2. **Check formatting**:
   - Title renders correctly
   - Summary fits on one line
   - All 3 highlights display
   - Tags appear and link to taxonomy pages

3. **Verify links**:
   - If `draft: false` and no build flags: Title should be clickable
   - If `build.render: "link"`: Title should NOT be clickable
   - Tag links should work

4. **Production build**:
   ```bash
   hugo --buildDrafts=false
   ```
   Check `public/portfolio/` to verify your project appears correctly

## Common Mistakes

**Summary too long**:
```yaml
# BAD (too long, multiple ideas)
summary: "This project involved building a machine learning pipeline that processes audio and text data using transformer models to detect Alzheimer's disease with high accuracy."

# GOOD (concise, single idea)
summary: "Used spontaneous speech as a diagnostic signal for automated Alzheimer's detection."
```

**Highlights too vague**:
```yaml
# BAD (generic, no details)
highlights:
  - "Built a system"
  - "Used machine learning"
  - "Got good results"

# GOOD (specific, technical, measurable)
highlights:
  - "Designed a scalable ETL pipeline handling audio processing, transcription, and feature extraction"
  - "Evaluated Random Forest, XGBoost, and MLP classifiers on multimodal embeddings"
  - "Achieved 82% accuracy with text embeddings, outperforming audio-only baseline by 12%"
```

**Too many tags**:
```yaml
# BAD (too many, too specific)
portfolio_tags: ["ML", "DL", "Audio Processing", "NLP", "Classification", "Python", "PyTorch"]

# GOOD (focused, broad categories)
portfolio_tags: ["Machine Learning", "Audio", "Text"]
```

## Related Documentation

- [Portfolio list template](../layouts/portfolio/list.html) - Shows how entries render
- [Portfolio single template](../layouts/portfolio/single.html) - Full page layout
- [Building and deployment](./building-and-deployment.md) - How to preview and build
