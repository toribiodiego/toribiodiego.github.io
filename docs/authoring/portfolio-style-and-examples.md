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

### Avoiding Walls of Text

**Distribute visuals throughout the post** instead of clustering them together. Alternate between text and visual elements to create rhythm and maintain reader engagement.

**Good pattern (alternating)**:
```
Intro paragraph
├─ Figure 1 (context/stimulus)
Technical paragraph 1
├─ Figure 2 (architecture/pipeline)
Technical paragraph 2
├─ Table 1 (results)
Conclusion paragraph
```

**Avoid (clustering)**:
```
Intro paragraph
├─ Figure 1
├─ Figure 2
Long technical paragraph
Long results paragraph
├─ Table 1
```

**Guidelines**:
- Place figures near the content they illustrate
- Break long paragraphs (>150 words) into 2-3 shorter ones
- Use one visual element per major concept when possible
- Don't put multiple figures back-to-back without text between them

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

## Writing Summaries and Highlights

The summary and highlights appear on the portfolio list page and are the first thing readers see. They need to work together without being redundant.

### Summary Guidelines

**Purpose**: Explain what the project is about in plain, accessible language

**Characteristics**:
- Simple, conversational tone (not stiff or overly formal)
- Focuses on WHAT the project is, not specific results or metrics
- Accessible to readers outside your specific domain
- Can use technical terms, but overall meaning should be clear from context
- Typically one sentence, 10-20 words

**Good summaries** (from actual portfolio entries):
- ✓ "Applied transformer models to detect multiple emotions in Reddit comments." (emotion classification)
- ✓ "Used spontaneous speech from clinician-patient conversations as a diagnostic signal for automated Alzheimer's detection." (Alzheimer's)
- ✓ "An interactive audio-video agent designed to mock and provoke attendees." (Agnus)

**Avoid in summaries**:
- ✗ Specific metrics or results ("achieving 95.7% AUC")
- ✗ Specific model names ("with RoBERTa-Large")
- ✗ Technical implementation details ("using PyTorch and HuggingFace")
- ✗ Overly formal language ("evaluated architectures to ascertain optimal configuration")

### Highlights Guidelines

**Purpose**: Showcase specific achievements, skills, and results

**Requirement**: All portfolio entries must include exactly 3 highlights, even for draft entries

**Structure**: Organize highlights to tell a clear story:
1. **Scope/Implementation**: What you built and with what technologies
2. **Methodology**: How you approached the problem or experimented
3. **Results**: What you achieved or learned

**Characteristics**:
- Each highlight should add NEW information not in the summary
- Include specific numbers, metrics, technologies, and achievements
- Avoid repeating the same type of information across multiple highlights
- Focus each highlight on a different aspect of the project
- Start with action verbs: "Built", "Achieved", "Implemented", "Demonstrated", "Integrated"

**Examples from different project types**:

**ML/Research project** (emotion classification):
```yaml
highlights:
  - "Fine-tuned six transformer models on 58K samples from the GoEmotions dataset across 27 emotion labels"  # Scope
  - "Implemented automated hyperparameter sweeps with Weights & Biases, optimizing learning rates, dropout, and batch sizes across 50+ training experiments"  # Methodology
  - "Achieved 95.7% AUC with RoBERTa-Large while DistilBERT reached 94.8% AUC using 75% fewer parameters, enabling efficient deployment"  # Results
```

**Interactive/Creative project** (Agnus):
```yaml
highlights:
  - "Built a real-time audio-video loop connecting a dynamic microphone and webcam for live speech and visual input"  # Implementation
  - "Integrated the Gemini 2.5 Live API with WebSockets to stream and play spoken responses in continuous conversation"  # Technical integration
  - "Configured session memory and a simple Gradio interface to let users start, stop and resume interaction seamlessly"  # User experience
```

**Installation/Exhibition project** (Extraction):
```yaml
highlights:
  - "Built a real-time pipeline combining facial recognition, image generation, and face swapping to transform visitor images"  # Technical scope
  - "Integrated multiple AI models into a seamless workflow displayed on a large LED wall for public interaction"  # Integration & display
  - "Submitted to the NeurIPS Creative AI track as a collaborative research project from The Cooper Union"  # Context & impact
```

### Avoiding Redundancy

**Problem**: Summary and highlights that repeat the same information

**Bad example**:
```yaml
summary: "Compared six transformer architectures for emotion detection, achieving 95.7% AUC with RoBERTa-Large"
highlights:
  - "Fine-tuned six transformer models achieving 95.7% AUC with RoBERTa-Large"  # Repeats summary
  - "Tested models on emotion detection"  # Repeats summary
  - "Achieved 94.8% AUC with DistilBERT"  # Redundant with first highlight
```

**Good example**:
```yaml
summary: "Applied transformer models to detect multiple emotions in Reddit comments."  # High-level what
highlights:
  - "Fine-tuned six transformer models on 58K Reddit comments across 27 emotion labels"  # Adds scope details
  - "Implemented automated hyperparameter sweeps with Weights & Biases"  # Adds methodology
  - "Achieved 95.7% AUC with RoBERTa-Large while DistilBERT reached 94.8% AUC using 75% fewer parameters"  # Adds results
```

**Key principle**: Summary = WHAT (high-level), Highlights = HOW + RESULTS (specifics)

### Common Patterns

**For ML/research projects**:
- Summary: Describes the problem or application
- Highlight 1: Dataset, model architecture, training approach
- Highlight 2: Experimentation methodology or technical implementation
- Highlight 3: Results, comparisons, or key findings

**For engineering projects**:
- Summary: Describes what the system does
- Highlight 1: Core technical implementation and technologies
- Highlight 2: Key features or capabilities
- Highlight 3: Performance, deployment, or user impact

**For creative/interactive projects**:
- Summary: Describes the experience or interaction
- Highlight 1: Technical implementation (APIs, frameworks, hardware)
- Highlight 2: Integration or real-time capabilities
- Highlight 3: Exhibition context or user reactions

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

**Content structure**:
```html
<div class="post-resources">
  <a href="https://github.com/user/repo/poster.pdf">Poster</a>
  <a href="https://github.com/user/repo">Code</a>
</div>
```

**With all resource types**:
```html
<div class="post-resources">
  <a href="https://demo-url.com">Demo</a>
  <a href="https://blog-post-url.com">Blog</a>
  <a href="https://doi.org/paper">Paper</a>
  <a href="https://github.com/user/repo/poster.pdf">Poster</a>
  <a href="https://slides-url.com">Slides</a>
  <a href="https://github.com/user/repo">Code</a>
</div>
```

**Why this works**:
- Consistent styling across all portfolio posts
- Visual separation from main content (top border)
- Links styled as chips (similar to tags)
- Flexible: works with any number of resources
- Horizontal layout with automatic wrapping

**Guidelines**:
- Always wrap in `<div class="post-resources">`
- Place at the very bottom of the post (after all content)
- Include only resources that exist (no placeholders)
- Use clear labels: `Demo`, `Blog`, `Paper`, `Poster`, `Slides`, `Report`, `Code`, `Video`
- Link to stable URLs (GitHub repos, DOIs, permanent hosting)
- Recommended order: Demo → Blog → Paper/Poster → Slides → Report → Code
- One link per line for readability in source

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

## Tables

Tables are automatically numbered (Table 1, Table 2, etc.) when using the `post-table` class. Use tables to present structured data like performance metrics, comparisons, or experimental results.

### Basic Table Structure

```markdown
<figure class="post-table">
  <table>
    <thead>
      <tr>
        <th>Modality</th>
        <th>Random Forest</th>
        <th>XGBoost</th>
        <th>MLP</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Audio only</td>
        <td>61%</td>
        <td>71%</td>
        <td>61%</td>
      </tr>
      <tr>
        <td>Text only</td>
        <td>77%</td>
        <td>82%</td>
        <td>74%</td>
      </tr>
      <tr>
        <td>Audio + Text</td>
        <td>70%</td>
        <td>61%</td>
        <td>67%</td>
      </tr>
    </tbody>
  </table>
  <figcaption>Classification accuracy by modality and classifier. Text-only models achieved the highest performance across all three classifiers.</figcaption>
</figure>
```

**Result**: The caption will automatically display as "Table 1. Classification accuracy by modality and classifier..."

### Table Examples from Portfolio Entries

**Example 1: Model comparison** (Multimodal Alzheimer's Detection)
- Compares accuracy across different modalities (audio, text, multimodal)
- Shows results for multiple classifiers (Random Forest, XGBoost, MLP)
- Caption highlights the key finding (text-only models performed best)

**Example 2: Hyperparameter results** (Multi-Label Emotion Classification)
- Shows best configurations for each transformer model
- Includes hyperparameters (LR, batch size, dropout) and metrics (AUC, train/val loss)
- Caption identifies the top performer (RoBERTa-large at 0.957 AUC)

**Example 3: Training progression** (Board Game Agents)
- Tracks agent performance across training checkpoints
- Compares win rates and game length at different stages
- Caption emphasizes strategic development (extended gameplay, decision-making)

**Common patterns**:
- Use tables when you have 3+ rows/columns of numeric data
- Include a mix of categorical labels (first column) and numeric values
- Captions should interpret the data, not just describe the structure

### Table Guidelines

**When to use tables**:
- Presenting quantitative results (accuracy, precision, F1 scores)
- Comparing performance across methods or configurations
- Showing structured experimental parameters
- Displaying side-by-side comparisons

**Structure requirements**:
- Always wrap in `<figure class="post-table">` (not `post-figure`)
- Include `<thead>` for headers and `<tbody>` for data rows
- Use `<figcaption>` for the table caption (like figures)
- Do NOT include "Table 1:" in the caption text (added automatically)

**Formatting**:
- First column: Left-aligned (for row labels)
- Other columns: Center-aligned automatically (for numeric data)
- Headers: Bold with bottom border
- Rows: Light borders between rows

**Caption writing**:
- Start with what the table shows (e.g., "Classification accuracy...")
- Include units if relevant (e.g., "% accuracy", "milliseconds")
- Highlight key findings in the caption (e.g., "Text-only models achieved...")
- Keep captions concise but informative (1-2 sentences)

### Figures vs Tables

**Use figures for**:
- Architecture diagrams
- Flowcharts
- Screenshots
- Photos
- Visualizations and graphs

**Use tables for**:
- Numeric results
- Direct comparisons
- Structured data
- Performance metrics

**Numbering**: Figures and tables have separate counters. A post with 2 figures and 1 table will show: "Figure 1", "Figure 2", "Table 1".

## Related Documentation

- [portfolio-quickstart.md](portfolio-quickstart.md) - Fast-start template and checklist
- [portfolio-formatting.md](portfolio-formatting.md) - Front matter fields and tag conventions
- [portfolio-visibility.md](portfolio-visibility.md) - Visibility controls and publish flags
