# Portfolio Formatting Guide

**Use this when:** You're creating a new portfolio project, updating an existing entry, choosing appropriate tags, or troubleshooting why a portfolio item isn't appearing as expected.

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

## Full Portfolio Post Structure

The content below the front matter becomes the full project write-up (if `build.render` allows it). This section details how to structure a complete portfolio post using the Multimodal Alzheimer's Detection project as a reference example.

### Recommended Structure

A well-structured portfolio post typically includes:

1. **Introduction** (1-2 paragraphs)
   - What the project is about
   - Why it's important or interesting
   - Context or background (e.g., challenge, course, research question)

2. **Technical Approach** (2-4 paragraphs)
   - System architecture or pipeline overview
   - Key technologies and methods used
   - Implementation details that showcase your skills

3. **Results and Findings** (1-2 paragraphs)
   - Outcomes, metrics, or performance
   - Key insights or learnings
   - What worked well or didn't work

4. **Visual Elements** (figures, diagrams, screenshots)
   - Architecture diagrams
   - Results visualizations
   - Demo screenshots or photos
   - Always include descriptive captions

5. **Resources** (links at the end)
   - Code repository
   - Live demo
   - Paper, poster, or presentation
   - Blog post or documentation

### Detailed Example: Multimodal Alzheimer's Detection

This project demonstrates a complete portfolio post structure. Let's break it down section by section.

#### Front Matter

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
```

**Note**: The summary and highlights appear on the list page. The summary is also used as the page meta description. The highlights give readers a quick preview before they read the full post.

#### Section 1: Introduction

**Purpose**: Set context and explain the problem

**Content** (from the actual post):
```markdown
Alzheimer's dementia is a neurodegenerative disease that impairs memory and
communication. Although there is no cure, early detection is important because
identifying the disease early can slow its progression and lessen its effects.
This work follows the ADReSSO challenge, exploring whether speech alone can serve
as a reliable diagnostic signal. Something that, if successful, could make early
screening both affordable and widely accessible. Using the ADReSSo-2021 corpus,
this three-semester research project examined whether combining audio and text
features could improve detection compared to a single-modality approach.
```

**Why this works**:
- Opens with domain background (Alzheimer's dementia definition)
- Explains practical importance (early detection value)
- States the research question (speech as diagnostic signal)
- Provides project scope (three semesters, ADReSSO challenge)
- Sets up the technical problem (single vs. multimodal approaches)

**Guidelines**:
- 1-2 paragraphs, 100-150 words total
- Start broad (domain context) then narrow to your specific contribution
- Explain WHY this matters before diving into HOW
- Mention any competition, challenge, or course context
- Avoid jargon in the opening sentence

#### Section 2: Visual Overview

**Purpose**: Give readers a mental model before technical details

**Content**:
```markdown
<figure class="post-figure">
  <img src="resources/01_flowchart.png" alt="Project capture"
       style="width:100%; height:auto; display:block; margin:auto;">
  <figcaption>Overview of the multimodal pipeline: audio and transcribed speech
  yield acoustic and linguistic features used for classification.</figcaption>
</figure>
```

**Why this works**:
- Provides system architecture overview early
- Caption summarizes the pipeline flow
- Uses descriptive file naming (`01_flowchart.png` indicates ordering)

**Guidelines**:
- Place architecture diagram or flowchart early (after intro, before technical details)
- Use `<figure>` with `<figcaption>` for proper semantic HTML
- Store images in `resources/` folder within the project directory
- Number images (`01_`, `02_`, `03_`) to control order
- Write captions that explain WHAT the image shows, not just labels
- Use relative paths: `resources/image.png` (not absolute paths)

#### Section 3: Technical Implementation

**Purpose**: Explain your approach and showcase technical depth

**Content** (from the actual post):
```markdown
The ETL pipeline was designed to efficiently process and organize the audio
dataset using parallelized processing and automatic logging to support large-scale
experimentation. Each recording was processed with librosa and cropped to
patient-only speech using the provided timestamps. Audio features were extracted
with openSMILE (using the eGeMAPS feature set), and embeddings were generated
with a pretrained wav2vec 2.0 model. DistilBERT produced linguistic embeddings
from the transcripts, and before training, the audio and text vectors were
concatenated into a single multimodal representation. We evaluated each
configuration using Random Forest, XGBoost, and a Multi-Layer Perceptron, finding
that text-based models consistently outperformed audio and multimodal ones—
suggesting that transformer-based embeddings like those from BERT capture richer
linguistic information than the speech representations from wav2vec 2.0. This
research experience demystified embeddings for me; after experimenting with PCA to
reduce noise in the high-dimensional vectors, I learned that while transformer
models generate rich representations, they're difficult to interpret and offer
little control once produced.
```

**Why this works**:
- Describes the pipeline flow sequentially (ETL → feature extraction → training)
- Names specific tools and technologies (librosa, openSMILE, wav2vec 2.0, DistilBERT)
- Includes technical details (eGeMAPS features, embedding concatenation)
- Mentions evaluation methods (Random Forest, XGBoost, MLP)
- Presents findings (text > multimodal > audio)
- Adds personal learning/insight at the end

**Guidelines**:
- 2-4 paragraphs, 200-400 words total
- Follow a logical flow (data → processing → model → evaluation)
- Name specific libraries, models, or frameworks used
- Include technical vocabulary appropriate to your domain
- Explain design choices when interesting (e.g., "parallelized processing for scale")
- Blend technical implementation with results/insights
- End with a personal reflection or learning when appropriate

#### Section 4: Additional Visuals (Optional)

**Purpose**: Show results, demos, or the project in action

**Example patterns**:

```markdown
<figure class="post-figure">
  <img src="resources/02_results.png" alt="Classification results">
  <figcaption>Comparison of classification accuracy across audio-only, text-only,
  and multimodal approaches. Text embeddings achieved the highest F1 score.</figcaption>
</figure>
```

Or for physical projects:

```markdown
<figure class="post-figure">
  <img src="resources/03_exhibition.jpeg" alt="Project at exhibition">
  <figcaption>Agnus displayed at the Generative Machine Learning Exhibition.</figcaption>
</figure>
```

**Guidelines**:
- Place results figures after technical explanation
- Include comparison charts, performance graphs, or demo screenshots
- For physical projects, show the project in use or on display
- Keep captions informative (explain what we're seeing)

#### Section 5: Resources and Links

**Purpose**: Provide access to code, demos, papers, and additional materials

**Content** (from the actual post):
```markdown
[[Poster]](https://github.com/Keene-AI-Lab/multimodal/blob/main/assets/Multimodal_Alzheimers_Detection.jpeg)
[[Code]](https://github.com/Keene-AI-Lab/multimodal)
```

**Why this works**:
- Links are clearly labeled (Poster, Code)
- Uses bracket notation for consistent styling
- Places links at the very end
- Links to permanent resources (GitHub, published papers)

**Guidelines**:
- Place at the bottom of the post (after all content)
- Use format: `[[Label]](URL)` for consistency
- Common labels: `Code`, `Demo`, `Paper`, `Poster`, `Slides`, `Blog`, `Video`
- Link to stable URLs (GitHub repos, DOIs, permanent hosting)
- Omit placeholder links (comment them out: `<!-- [[Demo]](#) -->`)
- Order: Demo → Blog → Paper/Poster → Code (most interactive to most technical)

### Content Length Guidelines

**Full post length**: 300-800 words (not including captions/links)

**Breakdown**:
- Introduction: 100-150 words
- Technical implementation: 200-400 words
- Results/learnings: 50-100 words (can be integrated into technical section)
- Visual elements: 2-4 figures with captions
- Resource links: 2-5 links

**Examples**:
- **Comprehensive post** (Multimodal Alzheimer's): ~250 words + 1 figure + 2 links
- **Detailed post** (could be): ~600 words + 4 figures + 5 links
- **Concise post**: ~300 words + 2 figures + 2 links

### Writing Style

**Technical but accessible**:
- Use domain terminology correctly (e.g., "embeddings", "feature extraction")
- Briefly explain concepts if they're uncommon (e.g., "eGeMAPS feature set")
- Write for someone in adjacent fields, not just experts

**Active and specific**:
- ✓ "Built an ETL pipeline using parallelized processing"
- ✗ "A pipeline was created for the data"

**Focus on your contribution**:
- ✓ "I designed...", "We evaluated...", "The system processed..."
- Avoid passive constructions that hide your role

**Include insights**:
- Don't just describe WHAT you built
- Explain what you LEARNED or discovered
- Share surprising findings or challenges overcome

### Figures and Images

**File organization**:
```
content/portfolio/your-project/
├── index.md
└── resources/
    ├── 01_architecture.png
    ├── 02_results.png
    └── 03_demo.jpg
```

**Markdown syntax**:
```markdown
<figure class="post-figure">
  <img src="resources/01_architecture.png"
       alt="System architecture diagram"
       style="width:100%; height:auto; display:block; margin:auto;">
  <figcaption>Pipeline architecture showing data flow from audio input
  through feature extraction to classification.</figcaption>
</figure>
```

**Image guidelines**:
- Use PNG for diagrams, charts, screenshots
- Use JPEG for photos
- Optimize images (keep under 500KB when possible)
- Use descriptive `alt` text for accessibility
- Number files to control display order
- Always include captions that add information (not just labels)

## Publishing and Visibility Controls

Portfolio entries have flexible visibility controls through `draft` status and `build` flags.

For comprehensive details on visibility controls, decision trees, configuration examples, and troubleshooting, see:

**[portfolio-visibility.md](portfolio-visibility.md)** - Complete guide to `draft`, `build.list`, and `build.render` flags

**Quick summary:**
- `draft: true` - Hide completely (work in progress)
- `draft: false` (default) - Show on list with clickable link
- `draft: false` + `build.list: "local"` + `build.render: "link"` - Show on list but no detail page (coming soon mode)
- `draft: false` + `build.list: "never"` - Hide from list (direct link only)

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
- [Building and deployment](../ops/building-and-deployment.md) - How to preview and build
