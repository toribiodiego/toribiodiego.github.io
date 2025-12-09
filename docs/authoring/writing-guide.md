# Writing Content Authoring Guide

**Location:** This file is in `content/writing/` and serves as a quick reference for creating writing posts.

**Purpose:** Writing posts are for detailed explorations, tutorials, notes, and reflections on projects and concepts.

---

## Quick Start

### File Structure

Each writing post is a directory with an `index.md`:

```
content/writing/
├── _index.md                    # Writing section landing page
├── your-post-title/
│   ├── index.md                 # Post content with front matter
│   ├── your-post.bib           # Bibliography (optional)
│   └── resources/              # Images, PDFs, etc. (optional)
│       └── diagram.png
└── another-post/
    └── index.md
```

### Front Matter Template

Copy this template to `content/writing/your-post/index.md`:

```yaml
---
title: Your Post Title
date: 2025-01-15
writing_tags: ["write-ups"]
summary: Brief description of what this post covers

draft: false

# Optional: Show "last updated" date if content was revised
# lastmod: 2025-02-10

# Optional: For citations
bibliography: content/writing/your-post/your-post.bib
csl: assets/csl/ieee.csl
link-citations: true
---

Your content starts here...
```

---

## Required Front Matter Fields

### `title` (required)
**Format:** String, natural title case
**Purpose:** Display name on list and page header

**Rules:**
- Use natural, readable titles (not strict title case)
- Can be longer than portfolio titles (no strict word limit)
- Should clearly describe the post topic

**Examples:**
- ✓ `"hi"` (casual introduction post)
- ✓ `"Extraction"` (project writeup)
- ✓ `"Understanding Transformer Attention Mechanisms"`
- ✓ `"How to Set Up Docker for ML Development"`

### `date` (required)
**Format:** `YYYY-MM-DD`
**Purpose:** Sorting on writing list (newest first)

**Rules:**
- Must be past or current date (future dates hide post in production)
- Use publication date
- Posts sorted by date descending (newest at top)

**Examples:**
- ✓ `date: 2025-01-15`
- ✓ `date: 2025-08-19`
- ✗ `date: 2026-01-15` (future date - will be hidden in production)

### `writing_tags` (required)
**Format:** Array of strings from tag vocabulary
**Purpose:** Categorize post type

**Tag vocabulary:**
- `"write-ups"` - Detailed explanations of projects
- `"notes"` - Concise explanations of concepts (ML, algorithms, math)
- `"guides"` - Practical, step-by-step tutorials on tools and frameworks
- `"reading-list"` - Collections of papers, articles, or chapters
- `"other"` - Miscellaneous posts (introductions, meta posts, etc.)

**Rules:**
- Use one tag (primary category)
- Choose from vocabulary above
- Use `"other"` for posts that don't fit categories

**Examples:**
```yaml
writing_tags: ["write-ups"]    # Project deep-dive
writing_tags: ["notes"]        # Concept explanation
writing_tags: ["guides"]       # Tutorial
writing_tags: ["other"]        # Introduction post
```

### `summary` (required)
**Format:** String, brief description
**Purpose:** Short description shown on list page

**Rules:**
- One sentence describing what the post covers
- Can be casual/conversational (unlike portfolio summaries)
- Lowercase is acceptable
- No strict word count

**Examples:**
- ✓ `"an introduction to the site and writing posts"`
- ✓ `"creating a real life black mirror episode"`
- ✓ `"exploring attention mechanisms in transformer models"`
- ✓ `"setting up a reproducible ML development environment"`

### `draft` (optional, default: false)
**Format:** Boolean (`true` or `false`)
**Purpose:** Hide work-in-progress posts from list

**Rules:**
- `draft: true` - Post completely hidden
- `draft: false` or omitted - Post visible
- Use for work-in-progress

**Example:**
```yaml
draft: true  # Hide until ready to publish
```

---

## Optional Front Matter Fields

### `lastmod` (optional)
**Format:** Date (`YYYY-MM-DD`)
**Purpose:** Show "last updated" date when content has been revised

**Rules:**
- Only shown if different from publication date
- Useful for living documents, guides, and tutorials that get updated
- Displayed inline after publication date with bullet separator
- Omit for posts that don't require updates

**Example:**
```yaml
date: 2025-01-15
lastmod: 2025-02-10  # Shows "Last updated: Feb 10, 2025"
```

**When to use:**
- ✓ Tutorials that you update for new tool versions
- ✓ Guides that accumulate improvements over time
- ✓ Notes that you expand or correct
- ✗ One-time posts or project write-ups (use publication date only)

### Bibliography Fields (for citations)

If your post includes citations, add these fields:

```yaml
bibliography: content/writing/your-post/your-post.bib
csl: assets/csl/ieee.csl
link-citations: true
```

**Fields explained:**
- `bibliography` - Path to `.bib` file with references
- `csl` - Citation style (IEEE format available at `assets/csl/ieee.csl`)
- `link-citations` - Make citations clickable (boolean)

**BibTeX file structure:**
Create `your-post.bib` in same directory as `index.md`:

```bibtex
@article{author2024,
  title={Paper Title},
  author={Author, First and Author, Second},
  journal={Journal Name},
  year={2024},
  volume={1},
  pages={1--10}
}
```

**Using citations in content:**
```markdown
This approach was proposed by [@author2024].

Multiple citations [@author2024; @another2023].
```

### `date_display` (optional)
**Format:** String
**Purpose:** Override date display format

**Example:**
```yaml
date: 2025-01-15
date_display: "January 2025"  # Shows this instead of "Jan 15, 2025"
```

---

## Content Guidelines

### Length and Tone

**Write-ups:**
- **Length:** 800-2000+ words
- **Tone:** Technical but accessible, explain decisions and learnings
- **Structure:** Problem → Approach → Results → Reflections
- **Include:** Code snippets, diagrams, metrics, lessons learned

**Notes:**
- **Length:** 300-800 words
- **Tone:** Concise and clear, focus on explanation
- **Structure:** Definition → Explanation → Example → Key Takeaways
- **Include:** Equations, diagrams, simple examples

**Guides:**
- **Length:** 500-1500 words
- **Tone:** Step-by-step, practical, beginner-friendly
- **Structure:** Overview → Prerequisites → Steps → Troubleshooting
- **Include:** Code blocks, commands, screenshots

**Reading Lists:**
- **Length:** 200-600 words
- **Tone:** Casual, can be brief annotations
- **Structure:** Theme → Papers/Articles → Why they're interesting
- **Include:** Citations, links, brief summaries

### Writing Style

**General principles:**
- Write like you're explaining to a colleague
- Use first person ("I found...", "This helped me...")
- Be honest about struggles and mistakes
- Focus on "why" not just "what"

**Formatting:**
- Use headings to structure content
- Include code blocks with syntax highlighting
- Add images/diagrams to illustrate concepts
- Use tables for comparisons or data
- Add citations for claims and references

---

## Asset Placement

### Directory Structure

Assets go in a subdirectory next to `index.md`:

```
content/writing/your-post/
├── index.md
├── your-post.bib           # Bibliography (optional)
└── resources/              # Images, files (optional)
    ├── architecture.png
    ├── results.png
    └── data.csv
```

**Note:** Unlike portfolio (which uses `resources/`), writing posts can use any subdirectory name, but `resources/` is recommended for consistency.

### Referencing Images

Use relative paths from `index.md`:

```markdown
![System architecture](resources/architecture.png)

<figure class="post-figure">
  <img src="resources/diagram.png" alt="Attention mechanism" style="width:100%; height:auto; display:block; margin:auto;">
  <figcaption>Visualization of multi-head attention.</figcaption>
</figure>
```

### Bibliography Files

Place `.bib` file in the post directory:

```
content/writing/your-post/
├── index.md
└── your-post.bib
```

Reference in front matter:
```yaml
bibliography: content/writing/your-post/your-post.bib
```

**Note:** Path is from repo root, not relative to `index.md`.

---

## Complete Examples

### Example 1: Introduction Post

```yaml
---
title: hi
date: 2025-08-19
writing_tags: ["other"]
summary: an introduction to the site and writing posts
draft: false
---

Recently, I've felt dissatisfied with my explanations of my work.
This site lets me share both the process and results in one place.

The site has two sections: Portfolio and Writing.

Writing goes into detail on projects and concepts, grouped by:
- **write-ups**: Detailed project explanations
- **notes**: Concept explanations
- **guides**: Step-by-step tutorials
- **reading-list**: Paper collections

Through writing, I hope to better understand my work and share
resources with others working on similar problems.
```

### Example 2: Project Write-up with Citations

```yaml
---
title: "Multimodal Learning for Alzheimer's Detection"
date: 2025-05-15
writing_tags: ["write-ups"]
summary: "deep dive into combining audio and text features for dementia detection"
draft: false

bibliography: content/writing/alzheimers-writeup/references.bib
csl: assets/csl/ieee.csl
link-citations: true
---

## Introduction

Alzheimer's detection using speech has been explored extensively [@smith2023].
This post details my approach combining audio and text modalities.

## Approach

<figure class="post-figure">
  <img src="resources/pipeline.png" alt="Processing pipeline">
  <figcaption>Overview of the multimodal processing pipeline.</figcaption>
</figure>

## Results

The text-based model achieved 82% accuracy...

## References
```

### Example 3: Tutorial/Guide

```yaml
---
title: "Setting Up Jupyter with GPU Support"
date: 2025-03-10
writing_tags: ["guides"]
summary: "step-by-step guide to configuring Jupyter with CUDA for ML development"
draft: false
---

## Prerequisites

- CUDA-capable GPU
- Ubuntu 22.04 or later
- Python 3.10+

## Installation Steps

### 1. Install NVIDIA Drivers

\`\`\`bash
sudo apt update
sudo apt install nvidia-driver-535
\`\`\`

### 2. Install CUDA Toolkit

...
```

---

## Common Issues

### Post not appearing on writing page

**Check:**
1. Is `draft: true`? Change to `draft: false`
2. Is date in the future? Use past/current date
3. Is file named `index.md`? (not `README.md` or other name)
4. Is file in a subdirectory under `content/writing/`?

### Citations not working

**Check:**
1. Is `bibliography` path correct? (from repo root: `content/writing/post/file.bib`)
2. Does `.bib` file exist at that path?
3. Is `link-citations: true` set?
4. Are citation keys in content matching `.bib` entries? (`[@key]`)

### Images not loading

**Check:**
1. Is path relative from `index.md`? (`resources/image.png`, not `/resources/`)
2. Does image file exist?
3. Is filename case-sensitive match?
4. Is image in same directory tree as `index.md`?

### Wrong tag showing

**Check:**
1. Is field named `writing_tags` (not `tags` or `portfolio_tags`)?
2. Is tag from vocabulary? (`write-ups`, `notes`, `guides`, `reading-list`, `other`)
3. Is tag in array format: `["write-ups"]`?

---

## Authoring Checklist

Before setting `draft: false`, verify:

- [ ] **Title**: Clear and descriptive
- [ ] **Date**: YYYY-MM-DD, past or current date
- [ ] **Summary**: Brief description of post
- [ ] **Tag**: One tag from vocabulary (`write-ups`, `notes`, `guides`, `reading-list`, `other`)
- [ ] **Content**: Complete and proofread
- [ ] **Images**: Working paths, descriptive alt text
- [ ] **Citations**: `.bib` file exists, citations render correctly
- [ ] **Links**: All external links working
- [ ] **Code**: Syntax highlighting working, examples tested

---

## Tips for Good Writing Posts

### Structure

**Start strong:**
- Hook the reader in first paragraph
- Clearly state what the post covers
- Explain why the topic matters

**Middle:**
- Use headings to organize sections
- Include visuals to break up text
- Add code examples with explanation
- Use lists for readability

**End:**
- Summarize key takeaways
- Share learnings or reflections
- Link to related resources

### Technical Clarity

- **Explain acronyms** on first use
- **Show, don't just tell** - include examples
- **Add context** for metrics and results
- **Acknowledge limitations** and trade-offs
- **Link to sources** for claims and techniques

### Code Blocks

Use fenced code blocks with language for syntax highlighting:

```markdown
\`\`\`python
def process_data(input_file):
    with open(input_file, 'r') as f:
        return f.read()
\`\`\`
```

### Visual Elements

- **Diagrams**: Show architecture, flow, relationships
- **Screenshots**: Demonstrate UIs, results, outputs
- **Tables**: Compare options, show metrics, organize data
- **Equations**: Use LaTeX for math (Hugo supports it)

---

## Writing Post Types Compared

| Type | Purpose | Length | Tone | Structure |
|------|---------|--------|------|-----------|
| **write-ups** | Explain project in depth | 800-2000+ words | Technical but accessible | Problem → Approach → Results → Reflections |
| **notes** | Explain concept | 300-800 words | Concise, clear | Definition → Explanation → Example |
| **guides** | Teach how to do something | 500-1500 words | Step-by-step, practical | Overview → Prerequisites → Steps → Troubleshooting |
| **reading-list** | Share interesting papers | 200-600 words | Casual, annotated | Theme → Papers → Why interesting |
| **other** | Misc posts | Variable | Flexible | Context-dependent |

---

## Related Files

- **Writing list template**: `layouts/writing/list.html`
- **Writing single template**: `layouts/writing/single.html`
- **Writing list styles**: `assets/scss/_lists.scss`, `assets/scss/_writing.scss`
- **Citation style**: `assets/csl/ieee.csl`
- **Section landing**: `content/writing/_index.md`
