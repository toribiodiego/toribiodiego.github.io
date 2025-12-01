# Portfolio Visibility Controls

**Use this when:** You need to control whether a portfolio entry appears on the list, whether it's clickable, or how it behaves in development vs. production builds.

This guide explains how `draft`, `build.list`, and `build.render` flags control portfolio entry visibility and when to use each configuration.

For basic portfolio authoring, see [portfolio-quickstart.md](portfolio-quickstart.md). For comprehensive formatting rules, see [portfolio-formatting.md](portfolio-formatting.md).

## Control Mechanisms

There are three primary controls for portfolio entry visibility:

1. **`draft`** - Boolean flag that completely hides entries from the list
2. **`build.list`** - Controls whether entry appears on `/portfolio/` list page
3. **`build.render`** - Controls whether full HTML page is generated

**Important:** Portfolio tags (`portfolio_tags`) do **not** control visibility. Tags are for categorization only and have no effect on whether an entry appears. Visibility is controlled exclusively by `draft`, `build.list`, and `build.render` flags.

## Visibility Matrix

| draft | build.list | build.render | List Visibility | Title Link | Page Built | Use Case |
|-------|-----------|--------------|----------------|------------|------------|----------|
| `false` | (default) | (default) | ✓ Shown | ✓ Clickable | ✓ Yes | **Standard published project** |
| `false` | `"local"` | `"link"` | ✓ Shown | ✗ Not clickable | ✗ No | **Preview/coming soon** |
| `false` | `"never"` | - | ✗ Hidden | - | - | **Unlisted but not draft** |
| `true` | - | - | ✗ Hidden | - | ✗ No | **Work in progress** |

## Decision Tree

**When to use each configuration:**

```
Are you ready to show the project on your portfolio list?
│
├─ NO → Set draft: true
│       (Project completely hidden, work on it privately)
│
└─ YES → Is the full write-up complete?
         │
         ├─ YES → Use defaults (draft: false, no build flags)
         │        (Standard published project with clickable link)
         │
         └─ NO → Want to show summary/highlights but no full page yet?
                 │
                 ├─ YES → Set draft: false + build.list: "local" + build.render: "link"
                 │        (Shows on list, title not clickable, "coming soon" status)
                 │
                 └─ NO → Set draft: true
                          (Keep hidden until write-up is ready)
```

## Detailed Behavior

### Configuration 1: Standard Published Project (Default)

**Front matter:**
```yaml
draft: false
# No build flags needed
```

**Behavior:**
- ✓ Appears on portfolio list
- ✓ Title is clickable link
- ✓ Full page is built and accessible
- Summary, highlights, and tags shown on list
- Full write-up shown on individual page

**When to use:**
- Project is complete with full write-up
- Ready for visitors to read the full details
- This is the standard configuration for finished projects

**Example:** Multimodal Alzheimer's Detection

### Configuration 2: List Preview (Coming Soon)

**Front matter:**
```yaml
draft: false
build:
  list: "local"
  render: "link"
```

**Behavior:**
- ✓ Appears on portfolio list
- ✗ Title is NOT clickable (shows as plain text)
- ✗ No full page is built
- Summary, highlights, and tags shown on list
- Title may show "Write-up coming soon" on hover

**When to use:**
- Want to showcase project on portfolio list
- Full write-up not complete yet
- Give visitors a preview of your work without committing to full documentation
- Planning to add full write-up later

**Example:** Agnus The Troll (as of current state)

**Visual indicator:** The template shows non-clickable titles with `aria-disabled="true"` and `title="Write-up coming soon"`

### Configuration 3: Hidden from List

**Front matter:**
```yaml
draft: false
build:
  list: "never"
```

**Behavior:**
- ✗ Does NOT appear on portfolio list
- Page may or may not be built (depends on `build.render`)
- Can still be accessed via direct URL if page is built

**When to use:**
- Unlisted project that you want to share via direct link only
- Removed from portfolio list but keeping the page live
- Rarely used; usually `draft: true` is better for hiding projects

### Configuration 4: Draft (Hidden Entirely)

**Front matter:**
```yaml
draft: true
```

**Behavior:**
- ✗ Completely hidden from portfolio list
- ✗ Page not built in production (only with `hugo server -D`)
- Not visible to visitors at all

**When to use:**
- Project is work-in-progress
- Content not ready for public viewing
- Placeholder entry for future project
- Testing/development only

**Example:** Board Game Agents (current state)

**Important:** Draft items are excluded from production builds (`--buildDrafts=false`), so they never appear on the deployed site.

## Required Front Matter for Visibility

For an entry to appear on the portfolio list, you MUST have:

**Minimum required fields:**
```yaml
---
title: "Your Project Title"
draft: false
---
```

**Recommended minimum for good presentation:**
```yaml
---
title: "Your Project Title"
date: YYYY-MM-DD
summary: "Brief project description"
portfolio_tags: ["Tag1", "Tag2"]
highlights:
  - "First key point"
  - "Second key point"
  - "Third key point"
draft: false
---
```

**Without these:**
- Missing `title`: Entry won't render properly
- Missing `draft` or `draft: true`: Entry is hidden
- Missing `summary`: List page shows empty summary area
- Missing `highlights`: No bullet points shown
- Missing `tags`: No tags displayed
- Missing `date`: Sorting falls back to file modification time

## Date Handling and Future-Dated Content

### How Hugo handles dates

Hugo's build behavior with dates:
- **Production builds** (`hugo`): Exclude content with `date` in the future (relative to build time)
- **Local development** (`hugo server -DF`): Include future-dated content when `-F` flag is used
- **Undated content**: Falls back to file modification time for sorting

### Recommended date practices

**Use past or current dates for published work:**
```yaml
# Good: Project completed last month
date: 2024-11-15
draft: false

# Good: Published today
date: 2024-12-01
draft: false
```

**Avoid future dates unless intentional:**
```yaml
# Risky: Will be hidden until Dec 15, 2025
date: 2025-12-15
draft: false
```

If you accidentally use a future date:
- The entry will be **hidden in production** builds
- The entry will **appear locally** when using `hugo server -DF`
- This can cause confusion ("It works locally but not in prod")

### When to use future dates (advanced)

Future dates are useful for **scheduled publishing**:
```yaml
# Will appear on production site on Jan 1, 2026
date: 2026-01-01
draft: false
```

**Use cases:**
- Embargo dates for coordinated releases
- Scheduled announcements
- Conference presentations (publish on talk date)

**Important:** GitHub Actions deploys run with `--buildFuture=false`, so future-dated content will not appear on the live site until the date arrives and a new build is triggered (by pushing another commit).

### Troubleshooting date-related visibility

**Issue: Entry appears locally but not in production**

1. Check the `date` field - is it in the future?
2. Compare to today's date: `date: 2025-12-01` vs. today's actual date
3. Options to fix:
   - **Change date to past/present**: `date: 2024-12-01`
   - **Use draft flag instead**: Keep future date, add `draft: true`
   - **Wait**: If intentional, wait until the date arrives

**Issue: Entry order seems wrong**

1. Check if all entries have explicit `date` fields
2. Entries without dates use file modification time
3. Add explicit dates for consistent sorting:
   ```yaml
   date: 2024-11-15  # Project completion date
   ```

### Summary: Date best practices

1. **Always include a `date` field** for consistent sorting
2. **Use past or current dates** for immediate publication
3. **Avoid accidental future dates** - check carefully before committing
4. **Future dates are for scheduled publishing** - understand they'll be hidden until the date arrives
5. **Test production builds locally** to catch future-date issues:
   ```bash
   hugo --buildFuture=false
   ```

## Common Scenarios

### Scenario 1: Adding a New Project (Not Ready Yet)

**Goal:** Reserve a spot in your portfolio but keep it hidden while working on it

**Configuration:**
```yaml
draft: true
```

**Workflow:**
1. Create `content/portfolio/project-name/index.md`
2. Add front matter with `draft: true`
3. Work on content locally
4. Preview with `hugo server -D` (includes drafts)
5. When ready, change to `draft: false`

### Scenario 2: Quick Portfolio Update (Show Project, Write-up Later)

**Goal:** Add project to portfolio list immediately, complete full write-up later

**Configuration:**
```yaml
draft: false
build:
  list: "local"
  render: "link"
```

**Workflow:**
1. Write strong summary and highlights
2. Set `draft: false` + build flags
3. Project appears on list but title not clickable
4. Later: Add full write-up content
5. Remove build flags (or change to defaults)
6. Now full page is accessible

### Scenario 3: Removing a Project from Portfolio

**Goal:** Take project off portfolio list but keep page accessible via direct link

**Option A: Hide from list but keep page:**
```yaml
draft: false
build:
  list: "never"
  render: "always"
```

**Option B: Complete removal:**
```yaml
draft: true
```
Or delete the file entirely.

## Template Behavior Details

The portfolio list template (`layouts/portfolio/list.html`) implements these rules:

```go
{{/* Skip entirely if list == "never" or if draft */}}
{{ if and (ne $list "never") (not .Draft) }}
  {{/* Only link when a page will be written: render "" or "always" */}}
  {{ $linkable := or (eq $render "") (eq $render "always") }}

  {{ if $linkable }}
    <a href="{{ .RelPermalink }}">{{ .Title }}</a>
  {{ else }}
    <span aria-disabled="true" title="Write-up coming soon">{{ .Title }}</span>
  {{ end }}
{{ end }}
```

**Key logic:**
- Entry is skipped if `draft: true` OR `build.list: "never"`
- Title is clickable only if `build.render` is empty (default) or `"always"`
- Title is plain text if `build.render: "link"` or `"never"`

## Troubleshooting Visibility Issues

### Problem: Entry doesn't appear on list

Check:
1. Is `draft: true`? → Change to `draft: false`
2. Is `build.list: "never"`? → Remove or change to `"always"`
3. Does front matter have syntax errors? → Validate YAML
4. Is the file in `content/portfolio/`? → Check directory
5. Did you run production build? → Drafts require `hugo server -D`

### Problem: Title is not clickable

Check:
1. Is `build.render: "link"`? → This is intentional (remove flag to make clickable)
2. Is `build.render: "never"`? → Change to `"always"` or remove
3. Is there content below front matter? → Add write-up content

### Problem: Page shows 404 when clicking title

Check:
1. Did you run `hugo` build recently? → Rebuild the site
2. Is `build.render: "link"` or `"never"`? → Page isn't built
3. Is content below front matter empty? → Hugo may skip empty pages

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

## Related Documentation

- [portfolio-quickstart.md](portfolio-quickstart.md) - Fast-start template and checklist
- [portfolio-formatting.md](portfolio-formatting.md) - Comprehensive formatting rules and tag conventions
- [Building and deployment](../ops/building-and-deployment.md) - How to preview and build
