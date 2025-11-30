# Portfolio Writing Style and Examples

**Use this when:** You're writing the full project write-up for a portfolio entry and need guidance on structure, content depth, writing style, and how to incorporate figures.

This guide shows how to structure complete portfolio posts with annotated examples. For front matter and list formatting, see [portfolio-formatting.md](portfolio-formatting.md). For quick templates, see [portfolio-quickstart.md](portfolio-quickstart.md).

## Recommended Structure

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

## Content Length Guidelines

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

## Writing Style

### Technical but accessible

- Use domain terminology correctly (e.g., "embeddings", "feature extraction")
- Briefly explain concepts if they're uncommon (e.g., "eGeMAPS feature set")
- Write for someone in adjacent fields, not just experts

### Active and specific

- ✓ "Built an ETL pipeline using parallelized processing"
- ✗ "A pipeline was created for the data"

### Focus on your contribution

- ✓ "I designed...", "We evaluated...", "The system processed..."
- Avoid passive constructions that hide your role

### Include insights

- Don't just describe WHAT you built
- Explain what you LEARNED or discovered
- Share surprising findings or challenges overcome

## Detailed Example: Multimodal Alzheimer's Detection

This project demonstrates a complete portfolio post structure. Let's break it down section by section.

### Front Matter

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

### Section 1: Introduction

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

### Section 2: Visual Overview

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

### Section 3: Technical Implementation

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

### Section 4: Additional Visuals (Optional)

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

### Section 5: Resources and Links

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

## Figures and Images

### File Organization

```
content/portfolio/your-project/
├── index.md
└── resources/
    ├── 01_architecture.png
    ├── 02_results.png
    └── 03_demo.jpg
```

### Markdown Syntax

```markdown
<figure class="post-figure">
  <img src="resources/01_architecture.png"
       alt="System architecture diagram"
       style="width:100%; height:auto; display:block; margin:auto;">
  <figcaption>Pipeline architecture showing data flow from audio input
  through feature extraction to classification.</figcaption>
</figure>
```

### Image Guidelines

- **PNG** for diagrams, charts, screenshots
- **JPEG** for photos
- Optimize images (keep under 500KB when possible)
- Use descriptive `alt` text for accessibility
- Number files to control display order
- Always include captions that add information (not just labels)

## Related Documentation

- [portfolio-quickstart.md](portfolio-quickstart.md) - Fast-start template and checklist
- [portfolio-formatting.md](portfolio-formatting.md) - Front matter fields and tag conventions
- [portfolio-visibility.md](portfolio-visibility.md) - Visibility controls and publish flags
