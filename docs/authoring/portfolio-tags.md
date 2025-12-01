# Portfolio Tags Vocabulary

**Use this when:** You're choosing tags for a portfolio entry and need to know which tags are allowed, how many to use, or when to add a new tag.

This document defines the canonical `portfolio_tags` vocabulary and selection rules for portfolio projects.

**Important:** Tags are for **categorization only** and do not control visibility. Whether a portfolio entry appears on the list is controlled by `draft`, `build.list`, and `build.render` flags (see [portfolio-visibility.md](portfolio-visibility.md)). Tags have no effect on publication or visibility.

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

## How Tags Work (Current Behavior)

### Tag display and navigation

Portfolio tags appear as clickable chips on:
- Portfolio list page (`/portfolio/`) - below each project's highlights
- Individual project pages - in the project header

**When you click a tag**, it navigates to a Hugo taxonomy page (`/portfolio_tags/<tag-name>/`) showing all projects with that tag. This is Hugo's default taxonomy behavior.

### What tags DON'T currently do

Tags do **not** provide in-page filtering on the portfolio list. Clicking "Machine Learning" navigates away from `/portfolio/` to a dedicated taxonomy page, rather than filtering the existing list.

### Tag URLs and taxonomy pages

Each tag automatically gets its own page:
- `/portfolio_tags/machine-learning/` - all ML projects
- `/portfolio_tags/audio/` - all audio projects
- `/portfolio_tags/generative-ai/` - all generative AI projects

These pages use Hugo's default taxonomy template (from the theme). They list matching projects but don't include the full highlights/summaries from the main portfolio list.

## Troubleshooting

### Tag not appearing on portfolio pages

If a tag doesn't appear on your portfolio entry:

1. Check capitalization matches exactly (case-sensitive: `Machine Learning`, not `machine learning`)
2. Verify the tag is in the front matter: `portfolio_tags: ["Machine Learning"]`
3. Rebuild the site: `hugo --cleanDestinationDir`
4. Check the taxonomy is configured in `config/_default/hugo.toml` (should already exist)

### Tag links returning 404

If clicking a tag returns a 404 error:

1. Rebuild with `hugo --cleanDestinationDir` to regenerate taxonomy pages
2. Verify at least one published (non-draft) entry uses the tag
3. Check the tag name doesn't have special characters that break URLs

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

## Future Enhancement Options

The current tag implementation (taxonomy pages) works but has limitations. Here are potential enhancements to consider:

### Option 1: Client-side filtering on portfolio list

**What it is:** Add JavaScript to filter the portfolio list in-place when clicking tags, instead of navigating away.

**Pros:**
- Faster UX (no page reload)
- Users stay on the portfolio page
- Can support multi-tag filtering (e.g., "Show projects with both ML AND Audio")
- Can add "clear filters" functionality

**Cons:**
- Requires JavaScript (breaks for JS-disabled users)
- Adds complexity to the portfolio list template
- Need to decide: keep taxonomy pages or replace them?

**Implementation approach:**
1. Add `data-tags` attributes to each portfolio item in `layouts/portfolio/list.html`
2. Add JavaScript to handle tag clicks and show/hide matching items
3. Add URL state management (e.g., `/portfolio/?tags=machine-learning,audio`)
4. Optionally keep taxonomy pages as fallback for JS-disabled users

### Option 2: Enhanced taxonomy pages

**What it is:** Create custom taxonomy templates that match the portfolio list format.

**Pros:**
- No JavaScript required
- Works with Hugo's native taxonomy system
- SEO-friendly (each tag gets a dedicated page)
- Progressive enhancement (could add client-side filtering later)

**Cons:**
- Creates many pages (one per tag)
- Users navigate away from main portfolio list
- Can't easily combine multiple tags

**Implementation approach:**
1. Create `layouts/portfolio_tags/term.html` template
2. Copy structure from `layouts/portfolio/list.html` to show full highlights/summaries
3. Add breadcrumb navigation (Portfolio > Machine Learning)
4. Optionally add "All Tags" index page

### Option 3: Curated tags index page

**What it is:** Create a dedicated `/portfolio/tags/` page listing all tags with project counts.

**Pros:**
- Provides tag overview and discovery
- No changes to existing behavior
- Easy to implement (static page or shortcode)

**Cons:**
- Doesn't improve filtering UX
- Adds another page to maintain

**Implementation approach:**
1. Create `content/portfolio/tags.md` with tag descriptions
2. Use Hugo's `.Site.Taxonomies` to list all tags and counts
3. Link from main portfolio page ("Browse by tag")

### Option 4: Hybrid approach

**What it is:** Enhanced taxonomy pages (Option 2) + client-side filtering (Option 1) as progressive enhancement.

**Pros:**
- Works without JavaScript (taxonomy pages)
- Enhanced with JavaScript (in-place filtering)
- Best of both worlds

**Cons:**
- Most complex to implement
- Need to maintain both behaviors

**Implementation approach:**
1. Start with Option 2 (enhanced taxonomy templates)
2. Add JavaScript layer that intercepts tag clicks and filters in-place
3. Falls back to taxonomy pages if JS disabled

### Recommendation

For this site, **Option 2** (enhanced taxonomy pages) is likely the best starting point:
- Aligns with Hugo's architecture
- No JavaScript dependency
- Improves UX over current default template
- Can add client-side filtering later if needed

The main implementation task would be creating `layouts/portfolio_tags/term.html` that mirrors the portfolio list format.

## Implementation Guide: Enhanced Taxonomy Pages

This section provides step-by-step guidance for **Option 2** (enhanced taxonomy pages) - the recommended approach for improving tag landing pages.

### Goal

Replace the bare default taxonomy template with a custom one that:
- Matches the portfolio list styling and structure
- Shows full project highlights and summaries
- Provides clear navigation back to the main portfolio
- Uses existing styles and partials for consistency

### Step 1: Create the taxonomy template

Create a new file: `layouts/portfolio_tags/term.html`

**Hugo's template lookup order:**
1. `layouts/portfolio_tags/term.html` (most specific - this is what we're creating)
2. `layouts/portfolio_tags/list.html` (fallback)
3. `layouts/_default/taxonomy.html` (default)
4. `layouts/_default/list.html` (theme default - currently used)

By creating `layouts/portfolio_tags/term.html`, we override the bare theme default.

### Step 2: Base template structure

```go-html-template
{{/* layouts/portfolio_tags/term.html */}}
{{ define "main" }}
<main>
    {{/* Page header with tag name */}}
    <header class="taxonomy-header">
        <h1>{{ .Title }}</h1>
        <p class="taxonomy-description">
            {{ .Params.description | default (printf "Portfolio projects tagged with %s" .Title) }}
        </p>

        {{/* Breadcrumb navigation */}}
        <nav class="breadcrumb" aria-label="breadcrumb">
            <a href="/">Home</a> &raquo;
            <a href="/portfolio/">Portfolio</a> &raquo;
            <span>{{ .Title }}</span>
        </nav>
    </header>

    {{/* Project count */}}
    <p class="project-count muted">
        {{ len .Pages }} {{ if eq (len .Pages) 1 }}project{{ else }}projects{{ end }}
    </p>

    {{/* Copy portfolio list structure */}}
    {{ $pages := sort .Pages "Weight" "asc" "Date" "desc" "Title" "asc" }}

    <ul class="portfolio-list">
        {{ range $pages }}
        {{/* Read build flags safely */}}
        {{ $render := "" }}
        {{ $list := "" }}
        {{ with .Params.build }}
        {{ $render = (index . "render" | default "") }}
        {{ $list = (index . "list" | default "") }}
        {{ end }}

        {{/* Skip entirely if list == "never" or if draft */}}
        {{ if and (ne $list "never") (not .Draft) }}
        {{/* Only link when a page will be written: render "" or "always" */}}
        {{ $linkable := or (eq $render "") (eq $render "always") }}

        <li class="portfolio-item">
            <!-- Title -->
            {{ if $linkable }}
            <a href="{{ .RelPermalink }}" class="portfolio-title">{{ .Title }}</a>
            {{ else }}
            <span class="portfolio-title" aria-disabled="true" title="Write-up coming soon">{{ .Title }}</span>
            {{ end }}

            {{/* Summary */}}
            {{ if or .Params.summary .Summary }}
            <p class="portfolio-summary">
                {{ with .Params.summary }}{{ . }}{{ else }}{{ .Summary }}{{ end }}
            </p>
            {{ end }}

            {{/* Highlights */}}
            {{ with .Params.highlights }}
            {{ if gt (len .) 0 }}
            <ul class="portfolio-highlights">
                {{ range first 3 . }}<li>{{ . | markdownify }}</li>{{ end }}
            </ul>
            {{ end }}
            {{ end }}

            <!-- Tags -->
            {{ with .GetTerms "portfolio_tags" }}
            <div class="tags-block">
                {{ range . }}
                <a class="tag" href="{{ .RelPermalink }}">{{ .LinkTitle }}</a>
                {{ end }}
            </div>
            {{ end }}
        </li>
        {{ end }}
        {{ end }}
    </ul>
</main>
{{ end }}
```

### Step 3: Add custom styling (optional)

Add taxonomy-specific styles to your CSS (e.g., `assets/scss/_portfolio.scss`):

```scss
/* Taxonomy page header */
.taxonomy-header {
    margin-bottom: 2rem;
}

.taxonomy-description {
    color: var(--muted-text);
    font-size: 1.1rem;
    margin-top: 0.5rem;
}

/* Breadcrumb navigation */
.breadcrumb {
    font-size: 0.9rem;
    color: var(--muted-text);
    margin-top: 1rem;
}

.breadcrumb a {
    color: var(--secondary-text-color);
    text-decoration: none;
}

.breadcrumb a:hover {
    text-decoration: underline;
}

/* Project count indicator */
.project-count {
    font-size: 0.9rem;
    margin-bottom: 1.5rem;
}
```

### Step 4: Add tag descriptions (optional)

Create a data file to provide custom descriptions for each tag: `data/portfolio_tag_descriptions.yaml`

```yaml
Machine Learning:
  description: "Projects using classical ML algorithms, supervised/unsupervised learning, and ML pipelines for classification, regression, and feature engineering."

Deep Learning:
  description: "Neural network-based projects including CNNs, RNNs, transformers, and attention mechanisms for complex pattern recognition."

Reinforcement Learning:
  description: "RL-specific projects using Q-learning, policy gradients, and self-play for game agents and optimization tasks."

Generative AI:
  description: "Projects involving LLMs, diffusion models, GANs, and conversational agents for text and image generation."

Audio:
  description: "Audio processing, speech recognition, and acoustic analysis projects."

Text:
  description: "Text processing, document analysis, and natural language understanding projects."

Video:
  description: "Video processing, computer vision, and action recognition projects."

Images:
  description: "Image processing, object detection, and computer vision projects."
```

Then update the template to use these descriptions:

```go-html-template
{{ $tagData := index .Site.Data.portfolio_tag_descriptions .Title }}
<p class="taxonomy-description">
    {{ if $tagData }}
        {{ $tagData.description }}
    {{ else }}
        {{ printf "Portfolio projects tagged with %s" .Title }}
    {{ end }}
</p>
```

### Step 5: Test the taxonomy pages

1. **Build the site:**
   ```bash
   hugo --cleanDestinationDir
   ```

2. **Start local server:**
   ```bash
   hugo server
   ```

3. **Navigate to taxonomy pages:**
   - Visit `/portfolio/` and click any tag
   - Or directly navigate to `/portfolio_tags/machine-learning/`
   - Verify the new template is being used

4. **Check for issues:**
   - Verify all projects appear with full highlights/summaries
   - Check breadcrumb links work correctly
   - Test tag chips still link to other taxonomy pages
   - Verify mobile responsiveness

### Alternative: Using partials for reusability

If you want to avoid duplicating the portfolio item structure, extract it into a partial:

**1. Create `layouts/partials/portfolio-item.html`:**

```go-html-template
{{/* layouts/partials/portfolio-item.html */}}
{{/* Expects . to be a page context */}}

{{/* Read build flags safely */}}
{{ $render := "" }}
{{ $list := "" }}
{{ with .Params.build }}
{{ $render = (index . "render" | default "") }}
{{ $list = (index . "list" | default "") }}
{{ end }}

{{/* Skip entirely if list == "never" or if draft */}}
{{ if and (ne $list "never") (not .Draft) }}
{{ $linkable := or (eq $render "") (eq $render "always") }}

<li class="portfolio-item">
    <!-- Title -->
    {{ if $linkable }}
    <a href="{{ .RelPermalink }}" class="portfolio-title">{{ .Title }}</a>
    {{ else }}
    <span class="portfolio-title" aria-disabled="true" title="Write-up coming soon">{{ .Title }}</span>
    {{ end }}

    {{/* Summary */}}
    {{ if or .Params.summary .Summary }}
    <p class="portfolio-summary">
        {{ with .Params.summary }}{{ . }}{{ else }}{{ .Summary }}{{ end }}
    </p>
    {{ end }}

    {{/* Highlights */}}
    {{ with .Params.highlights }}
    {{ if gt (len .) 0 }}
    <ul class="portfolio-highlights">
        {{ range first 3 . }}<li>{{ . | markdownify }}</li>{{ end }}
    </ul>
    {{ end }}
    {{ end }}

    <!-- Tags -->
    {{ with .GetTerms "portfolio_tags" }}
    <div class="tags-block">
        {{ range . }}
        <a class="tag" href="{{ .RelPermalink }}">{{ .LinkTitle }}</a>
        {{ end }}
    </div>
    {{ end }}
</li>
{{ end }}
```

**2. Update `layouts/portfolio/list.html` to use the partial:**

```go-html-template
<ul class="portfolio-list">
    {{ range $pages }}
    {{ partial "portfolio-item.html" . }}
    {{ end }}
</ul>
```

**3. Update `layouts/portfolio_tags/term.html` to use the same partial:**

```go-html-template
<ul class="portfolio-list">
    {{ range $pages }}
    {{ partial "portfolio-item.html" . }}
    {{ end }}
</ul>
```

**Benefits of using partials:**
- Single source of truth for portfolio item rendering
- Easier to maintain (change once, affects both list and taxonomy pages)
- Reduces code duplication
- Makes future changes simpler

### Troubleshooting

**Issue: Taxonomy page still shows theme default**

1. Verify file path is exactly `layouts/portfolio_tags/term.html`
2. Rebuild with `hugo --cleanDestinationDir` to clear cache
3. Check Hugo version supports taxonomy templates (`hugo version`)
4. Verify no typos in taxonomy name (`portfolio_tags` not `portfolio-tags`)

**Issue: Projects not appearing on taxonomy page**

1. Verify projects have the tag in front matter: `portfolio_tags: ["Tag Name"]`
2. Check tag capitalization matches exactly (case-sensitive)
3. Ensure projects aren't drafts or have `build.list: "never"`
4. Rebuild to regenerate taxonomy pages

**Issue: Styling looks wrong**

1. Check if portfolio list styles are in your CSS
2. Verify `_portfolio.scss` is imported in main stylesheet
3. Use browser dev tools to check which styles are applied
4. Clear browser cache and rebuild

**Issue: Breadcrumb links 404**

1. Verify `/portfolio/` page exists at `content/portfolio/_index.md`
2. Check `baseURL` in `config/_default/hugo.toml` is correct
3. Test with `hugo server` (should work locally)

## Related Documentation

- [portfolio-quickstart.md](portfolio-quickstart.md) - Fast-start guide with tag examples
- [portfolio-style-and-examples.md](portfolio-style-and-examples.md) - Complete project examples with tag choices explained
- [portfolio-formatting.md](portfolio-formatting.md) - Navigation hub for all portfolio guides
