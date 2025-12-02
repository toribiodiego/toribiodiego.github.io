---
title: "Portfolio Authoring Guide"
draft: true
---

# Portfolio Content Authoring Guide

**Location:** This file is in `content/portfolio/` and serves as a quick reference for creating portfolio entries.

**For detailed guides, see:**
- `docs/authoring/portfolio-quickstart.md` - Quick template and checklist
- `docs/authoring/portfolio-formatting.md` - Comprehensive formatting rules
- `docs/authoring/portfolio-visibility.md` - Draft and visibility controls
- `docs/authoring/portfolio-tags.md` - Tag selection guide

---

## Quick Start

### File Structure

Each portfolio entry is a directory with an `index.md`:

```
content/portfolio/
├── _index.md                    # Portfolio section landing page
├── your-project-name/
│   ├── index.md                 # Project write-up with front matter
│   └── resources/               # Images, PDFs, etc.
│       ├── diagram.png
│       └── screenshot.jpg
└── another-project/
    └── index.md
```

### Front Matter Template

Copy this template to `content/portfolio/your-project/index.md`:

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

Your project write-up starts here...
```

---

## Required Front Matter Fields

### `title` (required)
**Format:** String, 3-6 words, title case
**Purpose:** Display name on list and page header

**Rules:**
- Keep concise and descriptive
- Use title case (capitalize major words)
- No quotes in the title itself (YAML handles quotes)

**Examples:**
- ✓ `"Multimodal Alzheimer's Detection"`
- ✓ `"Board Game Agents"`
- ✗ `"A Project About ML"` (too generic)

### `date` (required)
**Format:** `YYYY-MM-DD`
**Purpose:** Sorting on portfolio list

**Rules:**
- Must be past or current date (future dates hide entry in production)
- Use project completion date or publication date
- Entries sorted by weight first, then date (newest first)

**Examples:**
- ✓ `date: 2025-01-15`
- ✓ `date: 2024-12-20`
- ✗ `date: 2026-01-15` (future date - will be hidden in production)

### `summary` (required)
**Format:** String, 10-20 words, one sentence
**Purpose:** Short description shown on list page

**Rules:**
- Start with action verb (past tense)
- One sentence only, no period at end
- Focus on what the project does or achieves

**Examples:**
- ✓ `"Used spontaneous speech from clinician-patient conversations as a diagnostic signal for automated Alzheimer's detection"`
- ✓ `"Learned tic-tac-toe and checkers entirely through self-play"`
- ✗ `"This project is about machine learning"` (too vague)

### `highlights` (required)
**Format:** Array of 3 strings, 15-25 words each
**Purpose:** Key achievements shown as bullet points on list page

**Rules:**
- Exactly 3 bullets (no more, no fewer)
- Mix technical details with results/metrics
- Each bullet starts with capital letter, no period at end
- Use past tense verbs

**Example:**
```yaml
highlights:
  - "Designed a scalable ETL pipeline for recordings, handling audio processing, transcription, and feature extraction across multiple models"
  - "Developed a training pipeline to evaluate multiple classifiers on audio, text, and combined embeddings"
  - "Found that text embeddings performed best (82% / 0.83 F1), while combining audio and text improved results over audio-only baseline"
```

### `portfolio_tags` (required)
**Format:** Array of 2-3 strings from canonical vocabulary
**Purpose:** Categorization (tags do NOT control visibility)

**Rules:**
- Use 2-3 tags total (most to least relevant)
- Choose from existing vocabulary (see `docs/authoring/portfolio-tags.md`)
- One ML/AI approach tag + 1-2 modality tags is typical

**Most common tags:**
- ML/AI: `"Machine Learning"`, `"Deep Learning"`, `"Reinforcement Learning"`, `"Generative AI"`
- Modalities: `"Audio"`, `"Text"`, `"Video"`, `"Images"`
- Domains: `"Robotics"`, `"Computer Vision"`, `"NLP"`

**Example:**
```yaml
portfolio_tags: ["Machine Learning", "Audio", "Text"]
```

### `draft` (optional, default: false)
**Format:** Boolean (`true` or `false`)
**Purpose:** Hide work-in-progress entries from list

**Rules:**
- `draft: true` - Entry completely hidden (even in development)
- `draft: false` or omitted - Entry visible (if build flags allow)
- Use for work-in-progress that's not ready to show

**Example:**
```yaml
draft: true  # Hide this entry until ready
```

---

## Optional Visibility Controls

These control whether the entry appears on the list and whether the full page is built.

### `build.list` (optional)
**Format:** `"never"` or `"local"`
**Purpose:** Control list visibility

**Values:**
- Omitted (default) - Entry shown on list
- `"never"` - Entry hidden from list entirely
- `"local"` - Entry shown only in development builds

**Example:**
```yaml
build:
  list: "never"  # Hide from list but still build page
```

### `build.render` (optional)
**Format:** `"never"` or `"link"`
**Purpose:** Control page generation

**Values:**
- Omitted (default) - Full page built
- `"never"` - No HTML page generated
- `"link"` - Page built only for internal linking

**Common combination for "coming soon" preview:**
```yaml
draft: false
build:
  list: "local"   # Show on list
  render: "link"  # Don't build full page (title not clickable)
```

**See `docs/authoring/portfolio-visibility.md` for full visibility matrix and decision tree.**

---

## Image Placement

### Directory Structure

Images go in a `resources/` subdirectory next to `index.md`:

```
content/portfolio/your-project/
├── index.md
└── resources/
    ├── 01_diagram.png
    ├── 02_screenshot.jpg
    └── 03_graph.png
```

### Referencing Images

Use relative paths from `index.md`:

```markdown
<figure class="post-figure">
  <img src="resources/01_diagram.png" alt="System architecture diagram" style="width:100%; height:auto; display:block; margin:auto;">
  <figcaption>Overview of the multimodal pipeline showing data flow.</figcaption>
</figure>
```

**Image best practices:**
- Prefix with numbers for ordering: `01_`, `02_`, etc.
- Use descriptive names: `architecture.png`, not `img1.png`
- Include alt text for accessibility
- Add captions to explain what the image shows
- Use `style="width:100%"` for responsive images

---

## Complete Example

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

Your project write-up goes here. Use multiple paragraphs to explain:
- Problem/motivation
- Approach/methods
- Results/findings
- Learnings/reflections

<figure class="post-figure">
  <img src="resources/01_flowchart.png" alt="Project pipeline" style="width:100%; height:auto; display:block; margin:auto;">
  <figcaption>Overview of the system architecture.</figcaption>
</figure>

## Technical Details

More content here...

## Links

[[Poster]](https://github.com/user/repo/poster.jpg)
[[Code]](https://github.com/user/repo)
```

---

## Authoring Checklist

Before setting `draft: false`, verify:

- [ ] **Title**: 3-6 words, title case, descriptive
- [ ] **Date**: YYYY-MM-DD, past or current date
- [ ] **Summary**: 10-20 words, starts with action verb, one sentence
- [ ] **Highlights**: Exactly 3 bullets, 15-25 words each, mix technical + results
- [ ] **Tags**: 2-3 tags from canonical vocabulary
- [ ] **Images**: In `resources/` directory with descriptive names
- [ ] **Content**: Full write-up completed (or use `build.render: "link"` for preview)
- [ ] **Links**: Working links to code, demos, papers, etc.

---

## Common Issues

### Entry not appearing on portfolio page

**Check:**
1. Is `draft: true`? Change to `draft: false`
2. Is `build.list: "never"`? Remove or change to `"local"`
3. Is date in the future? Use past/current date
4. Is file named `index.md`? (not `README.md` or other name)

### Images not loading

**Check:**
1. Are images in `resources/` subdirectory?
2. Is path relative: `resources/image.png` (not `/resources/` or absolute path)
3. Does image file exist and have correct extension?
4. Is filename case-sensitive match?

### Entry appearing but not clickable

**This is expected if:**
- `build.render: "link"` is set (coming soon preview mode)
- Remove `build.render` or change to `"always"` to make clickable

### Tags not appearing

**Check:**
1. Is field named `portfolio_tags` (not `tags` or `categories`)?
2. Are tags in array format: `["Tag1", "Tag2"]`?
3. Are tags from canonical vocabulary? See `docs/authoring/portfolio-tags.md`

---

## Additional Resources

- **Quick Start**: `docs/authoring/portfolio-quickstart.md`
- **Formatting Guide**: `docs/authoring/portfolio-formatting.md`
- **Visibility Controls**: `docs/authoring/portfolio-visibility.md`
- **Tag Vocabulary**: `docs/authoring/portfolio-tags.md`
- **Style Examples**: `docs/authoring/portfolio-style-and-examples.md`
