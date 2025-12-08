# Portfolio Visibility Controls

**Use this when:** You need to control whether a portfolio entry appears on the list, whether it's clickable, or how it behaves in development vs. production builds.

This guide explains how `draft` and `_build` flags control portfolio entry visibility and when to use each configuration.

For basic portfolio authoring, see [portfolio-quickstart.md](portfolio-quickstart.md). For comprehensive formatting rules, see [portfolio-formatting.md](portfolio-formatting.md).

## Control Mechanisms

There are three primary controls for portfolio entry visibility:

1. **`draft`** - Boolean flag that hides entries in production (but shows in `hugo server -DF`)
2. **`_build.list`** - Controls whether entry appears on `/portfolio/` list page
3. **`_build.render`** - Controls whether full HTML page is generated

**Important:**
- Portfolio tags (`portfolio_tags`) do **not** control visibility. Tags are for categorization only.
- Use `_build` (Hugo native) not `build` (custom parameter)
- Development mode (`hugo server -DF`) overrides these restrictions

## Development vs Production Behavior

**In Development (`hugo server -DF`):**
- All entries show in list (including `draft: true`)
- All entries are clickable (including `_build.render: never`)
- Allows you to preview and work on incomplete posts

**In Production (`hugo` or `hugo --environment production`):**
- `draft: true` entries completely hidden
- `_build.list: never` entries hidden from list
- `_build.render: never` entries show in list but not clickable (no page generated)

**Important:** Portfolio tags (`portfolio_tags`) do **not** control visibility. Tags are for categorization only and have no effect on whether an entry appears. Visibility is controlled exclusively by `draft` and `_build` flags.

## Visibility Matrix (Production Builds)

| draft | _build.list | _build.render | List Visibility | Title Link | Page Built | Use Case |
|-------|-------------|---------------|----------------|------------|------------|----------|
| `false` | (default) | (default) | ✓ Shown | ✓ Clickable | ✓ Yes | **Standard published project** |
| `false` | - | `never` | ✓ Shown | ✗ Not clickable | ✗ No | **Preview/coming soon** |
| `false` | `never` | - | ✗ Hidden | - | - | **Unlisted but not draft** |
| `true` | - | - | ✗ Hidden | - | ✗ No | **Work in progress** |

**Note:** In development mode (`hugo server -DF`), all entries show and are clickable regardless of these settings.

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
_build:
  render: never    # Don't build single page
  list: local      # Show in lists
```

**Behavior (Production):**
- ✓ Appears on portfolio list
- ✗ Title is NOT clickable (shows as plain text)
- ✗ No full page is built
- Summary, highlights, and tags shown on list
- Title may show "Write-up coming soon" on hover

**Behavior (Development with `hugo server -DF`):**
- ✓ Appears on portfolio list
- ✓ Title IS clickable (development mode override)
- ✗ No full page is built (Hugo doesn't generate it)
- Click leads to 404 but allows testing the list appearance

**When to use:**
- Want to showcase project on portfolio list in production
- Full write-up not complete yet
- Give visitors a preview of your work without committing to full documentation
- Planning to add full write-up later

**Note:** For development, prefer `draft: true` instead if you want to click through to the page, as it allows Hugo to build the page with `-D` flag.

**Visual indicator:** The template shows non-clickable titles with `aria-disabled="true"` and `title="Write-up coming soon"`

### Configuration 3: Hidden from List

**Front matter:**
```yaml
draft: false
_build:
  list: never
```

**Behavior (Production):**
- ✗ Does NOT appear on portfolio list
- Page may or may not be built (depends on `_build.render`)
- Can still be accessed via direct URL if page is built

**Behavior (Development):**
- ✓ Shows in list (development mode override)
- ✓ Clickable if page is built

**When to use:**
- Unlisted project that you want to share via direct link only
- Removed from portfolio list but keeping the page live
- Rarely used; usually `draft: true` is better for hiding projects

### Configuration 4: Draft (Work in Progress)

**Front matter:**
```yaml
draft: true
```

**Behavior (Production):**
- ✗ Completely hidden from portfolio list
- ✗ Page not built in production
- Not visible to visitors at all

**Behavior (Development with `hugo server -DF`):**
- ✓ Shows in portfolio list (template override)
- ✓ Title is clickable (template override)
- ✓ Page is built (because of `-D` flag)
- Allows you to preview and work on incomplete posts

**When to use:**
- Project is work-in-progress
- Content not ready for public viewing
- Placeholder entry for future project
- **Recommended for development:** Easier than `_build.render: never` because the page actually builds with `-D` flag

**Example:** Board Game Agents, Emotion Classification, Extraction (in development)

**Important:** This is the preferred method for work-in-progress posts because it allows full testing in development while keeping posts completely hidden in production.

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

### Scenario 2: Quick Portfolio Update (Show Project, Write-up Later) - DEPRECATED

**Note:** This scenario is deprecated. Use Scenario 1 with `draft: true` instead.

**Old approach (not recommended):**
```yaml
draft: false
_build:
  render: never
  list: local
```

**Better approach:**
1. Use `draft: true` while working
2. Preview with `hugo server -DF` (fully functional)
3. When ready, change to `draft: false`
4. Publish immediately with full page

### Scenario 3: Removing a Project from Portfolio

**Goal:** Take project off portfolio list but keep page accessible via direct link

**Option A: Hide from list but keep page:**
```yaml
draft: false
_build:
  list: never
  render: always
```

**Option B: Complete removal:**
```yaml
draft: true
```
Or delete the file entirely.

## Template Behavior Details

The portfolio list template (`layouts/portfolio/list.html`) implements environment-aware visibility:

```go
{{/* In development, show everything and make everything clickable */}}
{{ $isDev := hugo.IsDevelopment }}

{{/* Skip entirely if list == "never" (unless dev mode) or if draft (unless dev mode) */}}
{{ $shouldShow := or $isDev (and (ne $list "never") (not .Draft)) }}
{{ if $shouldShow }}
  {{/* In dev mode, always linkable. Otherwise only if render "" or "always" */}}
  {{ $linkable := or $isDev (or (eq $render "") (eq $render "always")) }}

  {{ if $linkable }}
    <a href="{{ .RelPermalink }}">{{ .Title }}</a>
  {{ else }}
    <span aria-disabled="true" title="Write-up coming soon">{{ .Title }}</span>
  {{ end }}
{{ end }}
```

**Key logic:**
- **Development mode** (`hugo.IsDevelopment` = true with `hugo server`):
  - All entries show in list (drafts, `_build.list: never`, everything)
  - All entries have clickable links (including `_build.render: never`)
- **Production mode** (`hugo` builds):
  - Entry is skipped if `draft: true` OR `_build.list: never`
  - Title is clickable only if `_build.render` is empty (default) or `always`
  - Title is plain text if `_build.render: never`

## Troubleshooting Visibility Issues

### Problem: Entry doesn't appear on list (Production)

Check:
1. Is `draft: true`? → Change to `draft: false` to publish
2. Is `_build.list: never`? → Remove or change to `always`
3. Does front matter have syntax errors? → Validate YAML
4. Is the file in `content/portfolio/`? → Check directory structure
5. Is date in the future? → Future-dated posts are hidden in production

### Problem: Entry doesn't appear with `hugo server -DF` (Development)

This should NOT happen with current template. If it does:
1. Verify you're using `-D` and `-F` flags: `hugo server -DF`
2. Check for template errors in `layouts/portfolio/list.html`
3. Ensure `hugo.IsDevelopment` logic is present in template
4. Restart Hugo server

### Problem: Title is not clickable (Production)

Check:
1. Is `_build.render: never`? → This is intentional (page not built)
2. Want it clickable? → Remove `_build.render` or change to `always`, or use `draft: true` instead

### Problem: Title is not clickable with `hugo server -DF` (Development)

**Common cause:** Using `_build.render: never`
- Template makes link clickable in dev, BUT Hugo doesn't actually build the page file
- Clicking leads to 404 even though link appears

**Solution:** For work-in-progress posts, use `draft: true` instead of `_build.render: never`
- With `-D` flag, Hugo builds the page file
- Link is clickable AND works correctly
- Hidden in production automatically

### Problem: Page shows 404 when clicking title

**In Production:**
1. Is `_build.render: never`? → Page isn't built (expected)
2. Did you build recently? → Run `hugo` to rebuild

**In Development with `hugo server -DF`:**
1. Is `_build.render: never`? → Hugo doesn't build page even with `-D` flag
   - Solution: Use `draft: true` instead for work-in-progress posts
2. Did you restart server after changes? → Restart `hugo server -DF`

### Problem: README.md or authoring guides showing in list

**Cause:** Documentation files in `content/` directories are treated as content pages

**Solution:** Move to `docs/authoring/` directory
```bash
git mv content/portfolio/README.md docs/authoring/portfolio-cheat-sheet.md
git mv content/writing/README.md docs/authoring/writing-guide.md
```

Remove Hugo frontmatter from moved files (no longer needed in `docs/`)

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

### Example 2: List-Only Entry (No Full Page) - DEPRECATED

**Note:** This pattern is deprecated. Use `draft: true` for work-in-progress instead.

```yaml
---
title: "Project Name"
date: 2025-04-26
summary: "Project summary"
portfolio_tags: ["Tag1", "Tag2"]
highlights:
  - "Highlight 1"
  - "Highlight 2"
  - "Highlight 3"

draft: false
_build:
  render: never    # Don't build single page
  list: local      # Show in lists
---

[Content exists but page isn't rendered to disk]
```

**Result (Production)**: Shows on list but title is not clickable (no full page built)
**Result (Development)**: Shows on list, title IS clickable but leads to 404 (page file not generated)

**Better approach:** Use `draft: true` instead for work-in-progress posts

### Example 3: Draft Project (Recommended for Work-in-Progress)

```yaml
---
title: "Board Game Agents"
date: 2024-12-20
portfolio_tags: ["Reinforcement Learning", "Deep Learning"]
summary: "Learned tic-tac-toe and checkers entirely through self-play."
highlights:
  - "Implemented enhanced PPO with orthogonal initialization"
  - "Tracked policy loss, value loss, entropy using W&B"
  - "Achieved 56.5% win rate on Checkers against random baseline"

draft: true
---

[Work in progress content...]
```

**Result (Production)**: Completely hidden from portfolio list

**Result (Development with `hugo server -DF`):**
- ✓ Shows in portfolio list
- ✓ Title is clickable
- ✓ Page is built and accessible
- Allows full preview and testing

**Why this is the recommended approach:**
- Clean separation: hidden in production, visible in development
- Fully functional in development (can click and view page)
- Easy to publish: just change `draft: false` when ready
- No confusing 404 errors in development

## Related Documentation

- [portfolio-quickstart.md](portfolio-quickstart.md) - Fast-start template and checklist
- [portfolio-formatting.md](portfolio-formatting.md) - Comprehensive formatting rules and tag conventions
- [Building and deployment](../ops/building-and-deployment.md) - How to preview and build
