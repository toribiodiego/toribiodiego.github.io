# Portfolio Tags Vocabulary

**Use this when:** You're choosing tags for a portfolio entry and need to know which tags are allowed, how many to use, or when to add a new tag.

This document defines the canonical `portfolio_tags` vocabulary and selection rules for portfolio projects.

## Tag Format

- **Case-sensitive**: Use the exact capitalization shown below (e.g., `Machine Learning`, not `machine learning`)
- **Quoted strings**: Tags are YAML strings in an array: `["Tag1", "Tag2"]`
- **Spaces allowed**: Multi-word tags use spaces, not hyphens or underscores

## Canonical Tag Vocabulary

Use these tags to categorize your portfolio projects:

### Primary ML/AI Categories

| Tag | When to use | Example projects |
|-----|-------------|------------------|
| `Machine Learning` | General ML projects using classical algorithms, supervised/unsupervised learning, or ML pipelines | Classification, regression, clustering, feature engineering |
| `Deep Learning` | Neural network-based work (CNNs, RNNs, transformers, etc.) | Image classification, sequence models, attention mechanisms |
| `Reinforcement Learning` | RL-specific projects (Q-learning, policy gradients, self-play, etc.) | Game agents, robotics, optimization via trial-and-error |
| `Generative AI` | Projects involving LLMs, diffusion models, GANs, or other generative systems | Text generation, image synthesis, conversational agents |
| `Natural Language Processing` | NLP/text analysis projects not primarily using deep learning or generative AI | Rule-based parsing, traditional NLP, linguistic analysis |

### Data Modality Categories

| Tag | When to use | Example projects |
|-----|-------------|------------------|
| `Audio` | Audio processing, speech recognition, audio analysis, or music generation | Speech classification, audio embeddings, voice agents |
| `Text` | Text processing, document analysis, or language understanding | Text classification, sentiment analysis, information extraction |
| `Video` | Video processing, computer vision, or video analysis | Video classification, object tracking, action recognition |
| `Images` | Image processing, computer vision (non-video), or image generation | Image classification, object detection, image synthesis |

## Selection Rules

### How many tags to use

- **Minimum**: 2 tags
- **Maximum**: 3 tags (occasionally 4 if truly necessary)
- **Typical**: 2-3 tags

### Ordering priority

List tags from **most relevant to least relevant**:

```yaml
# Good: Primary ML approach + data modalities
portfolio_tags: ["Machine Learning", "Audio", "Text"]

# Good: Specific ML subcategory + modality
portfolio_tags: ["Generative AI", "Audio", "Video"]

# Less ideal: Too many tags dilutes focus
portfolio_tags: ["Machine Learning", "Deep Learning", "Audio", "Text", "Video"]
```

### Combining ML and modality tags

Most projects should have:
1. One ML/AI category tag (what approach/technique)
2. One or two modality tags (what data type)

**Examples:**

```yaml
# Speech emotion classifier
portfolio_tags: ["Deep Learning", "Audio"]

# Multimodal diagnostic system
portfolio_tags: ["Machine Learning", "Audio", "Text"]

# Conversational video agent
portfolio_tags: ["Generative AI", "Audio", "Video"]
```

### Choosing between overlapping tags

Some projects could fit multiple ML categories. Use this hierarchy:

1. **Most specific wins**: `Reinforcement Learning` > `Deep Learning` > `Machine Learning`
2. **Generative AI is distinct**: If the primary focus is generation (text, images, audio), use `Generative AI` even if it uses deep learning
3. **Traditional NLP**: Use `Natural Language Processing` for classical NLP that doesn't rely on deep learning or generative models

**Decision examples:**

| Project | Tags | Reasoning |
|---------|------|-----------|
| Q-learning game agent | `["Reinforcement Learning", "Deep Learning"]` | RL is primary, deep learning is implementation detail |
| GPT-based chatbot | `["Generative AI", "Text"]` | Generation is the focus, not just ML |
| CNN image classifier | `["Deep Learning", "Images"]` | Deep learning is the defining approach |
| TF-IDF sentiment analysis | `["Natural Language Processing", "Text"]` | Classical NLP, no deep learning |

## When to Add New Tags

**Default: Don't add new tags.** The existing vocabulary should cover most projects.

**Add a new tag only if:**

1. **New domain**: You're working in a domain fundamentally different from existing tags (e.g., robotics, embedded systems, quantum computing)
2. **Multiple projects**: You have multiple projects that would use this tag (avoid one-off tags)
3. **Distinct from existing tags**: The new tag represents a clear category that doesn't overlap significantly with existing ones

**Before adding a new tag:**

1. Check if an existing tag combination works:
   - `["Machine Learning", "Audio"]` can cover speech-related ML projects
   - `["Deep Learning", "Images"]` can cover computer vision projects
2. Consider if it's a data modality (use singular/plural as appropriate: `Audio`, `Images`)
3. Use title case with spaces (not `snake_case` or `kebab-case`)

**Examples of good new tags:**
- `Robotics` - for physical robot control/planning projects
- `Time Series` - for forecasting/analysis projects focused on temporal data
- `Graphs` - for graph neural networks or network analysis

**Examples of bad new tags:**
- `Python` - too generic, not about the problem domain
- `Transformers` - too specific, use `Deep Learning` instead
- `AI` - too broad, use more specific ML/AI tags

## Troubleshooting

### Tag not appearing in filters

Portfolio tag filtering happens client-side. If a tag doesn't appear:

1. Check capitalization matches exactly (case-sensitive)
2. Verify at least one published (non-draft) entry uses the tag
3. Clear browser cache and rebuild (`hugo --cleanDestinationDir`)

### Too many tags to choose from

Follow this process:

1. Pick **one ML/AI category** that best describes your approach
2. Pick **1-2 modality tags** for your input data types
3. Stop there (2-3 tags total)

### Project fits multiple categories equally

Choose based on:
- What makes the project **unique or interesting**
- What **skills you want to highlight**
- What's most relevant to your **target audience**

## Related Documentation

- [portfolio-quickstart.md](portfolio-quickstart.md) - Fast-start guide with tag examples
- [portfolio-style-and-examples.md](portfolio-style-and-examples.md) - Complete project examples with tag choices explained
- [portfolio-formatting.md](portfolio-formatting.md) - Navigation hub for all portfolio guides
