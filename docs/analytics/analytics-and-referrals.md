# Analytics and Referral Tracking

**Use this when:** You're testing the live site and don't want to pollute analytics, creating UTM-tagged links to share on social media, or debugging why analytics aren't loading.

This guide explains how to filter self-traffic from analytics and how to create trackable referral URLs for sharing the site.

## Self-Traffic Filtering

### Development Mode (Current)

The site automatically excludes analytics in development mode:

```bash
hugo server
```

When running locally with `hugo server`, Google Analytics scripts are not loaded, so no data is sent. See [local-preview.md](../ops/local-preview.md) for details.

### Preview Mode (Production)

The site supports a preview mode flag that suppresses analytics tracking on the production site:

**Enable preview mode:**
```
https://diegotoribio.com/?preview=true
```

**Disable preview mode:**
```
https://diegotoribio.com/?preview=false
```

#### How It Works

1. **URL Detection**: The `?preview=true` query parameter is detected by JavaScript on page load
2. **Persistent Storage**: Preview mode state is saved in `localStorage`, persisting across sessions
3. **Analytics Bypass**: When preview mode is active, Google Analytics scripts are not loaded
4. **Visual Indicator**: A small "Preview Mode" badge appears in the bottom-right corner

#### Using Preview Mode

1. Visit any page with `?preview=true` appended to the URL
2. The preview mode badge will appear in the bottom-right
3. Browse the site normally - analytics will not track your visits
4. Preview mode persists until you:
   - Visit a page with `?preview=false`, or
   - Clear your browser's localStorage

#### Console Messages

When preview mode is active, check the browser console (F12) to see:
- `[Preview Mode] Enabled - Analytics disabled`
- `[Analytics] Skipped - Preview mode active`

When analytics loads normally:
- `[Analytics] Google Analytics loaded`

## Referral Tracking with UTM Parameters

UTM (Urchin Tracking Module) parameters let you track traffic sources in Google Analytics without manual review of referrer headers.

### UTM Parameter Conventions

Use these conventions for consistency:

| Parameter | Description | Example Values |
|-----------|-------------|----------------|
| `utm_source` | Traffic source platform | `github`, `linkedin`, `email` |
| `utm_medium` | Marketing medium | `profile`, `bio`, `signature`, `social` |
| `utm_campaign` | Campaign identifier (optional) | `portfolio-launch`, `writing-promo` |

### Standard Referral URLs

#### GitHub Profile

**Bio Link:**
```
https://diegotoribio.com/?utm_source=github&utm_medium=profile&utm_campaign=bio
```

**README Links:**
```
https://diegotoribio.com/portfolio/?utm_source=github&utm_medium=readme&utm_campaign=portfolio
```

#### LinkedIn Profile

**Profile URL:**
```
https://diegotoribio.com/?utm_source=linkedin&utm_medium=profile&utm_campaign=bio
```

**Post Links:**
```
https://diegotoribio.com/writing/?utm_source=linkedin&utm_medium=social&utm_campaign=article-promo
```

#### Email Signature

**Primary Link:**
```
https://diegotoribio.com/?utm_source=email&utm_medium=signature
```

**Project Links:**
```
https://diegotoribio.com/portfolio/project-name/?utm_source=email&utm_medium=signature
```

### Creating Custom Referral URLs

#### Manual Construction

Add UTM parameters to any URL:

```
https://diegotoribio.com/[page-path]/?utm_source=[source]&utm_medium=[medium]&utm_campaign=[campaign]
```

**Example:**
```
https://diegotoribio.com/writing/rl-notes/?utm_source=twitter&utm_medium=social&utm_campaign=rl-launch
```

#### URL Builder Tools

Use Google's Campaign URL Builder for complex URLs:
- [Google Analytics Campaign URL Builder](https://ga-dev-tools.google/campaign-url-builder/)

#### Best Practices

1. **Keep it simple**: Only add parameters that provide meaningful insights
2. **Be consistent**: Use the same `utm_source` and `utm_medium` values for similar links
3. **Document custom campaigns**: Add new campaign names to this guide when creating them
4. **Avoid over-tagging**: Don't add UTM parameters to internal links (same-domain navigation)
5. **Test before sharing**: Click your UTM link and verify it loads correctly

### Viewing UTM Data in Analytics

In Google Analytics 4:
1. Go to **Reports** > **Acquisition** > **Traffic acquisition**
2. Use the dimension dropdown to select:
   - **Session source** (maps to `utm_source`)
   - **Session medium** (maps to `utm_medium`)
   - **Session campaign** (maps to `utm_campaign`)

## Self-Traffic vs. Referral Traffic

### Self-Traffic (Exclude from Metrics)

- Development testing (`hugo server`)
- QA sessions on production (future `?preview=true` flag)
- Personal browsing without special parameters

### Referral Traffic (Track in Metrics)

- Links shared on GitHub, LinkedIn, email with UTM parameters
- Traffic from external sites (automatic referrer tracking)
- Social media shares with campaign tags

## Common Scenarios

### Scenario 1: Sharing a Portfolio Item on LinkedIn

**Goal**: Track clicks from LinkedIn post about your Alzheimer's Detection project.

**URL to share:**
```
https://diegotoribio.com/portfolio/alzheimers_detection/?utm_source=linkedin&utm_medium=social&utm_campaign=alzheimers-launch
```

### Scenario 2: Adding Website to GitHub Profile

**Goal**: Track visitors from your GitHub bio.

**URL to add:**
```
https://diegotoribio.com/?utm_source=github&utm_medium=profile&utm_campaign=bio
```

### Scenario 3: Email Signature Link

**Goal**: Track clicks from your email signature.

**URL to use:**
```
https://diegotoribio.com/?utm_source=email&utm_medium=signature
```

### Scenario 4: Testing Production Site

**Goal**: Browse the live site without counting your own visits.

**Approach**: Enable preview mode by visiting:
```
https://diegotoribio.com/?preview=true
```

You'll see a "Preview Mode" badge in the bottom-right corner, and analytics will not track your visits. This setting persists across pages until you explicitly disable it with `?preview=false`.

## Troubleshooting

### UTM Parameters Not Appearing in Analytics

1. **Wait 24-48 hours**: Analytics data can be delayed
2. **Check URL encoding**: Ensure special characters are properly encoded
3. **Verify Analytics is active**: Check that GA4 is properly configured
4. **Test with a different browser**: Rule out browser extensions blocking analytics

### Self-Traffic Still Appearing in Analytics

1. **Enable preview mode**: Visit `https://diegotoribio.com/?preview=true` on the production site
2. **Use development mode**: Run `hugo server` for local testing (see [local-preview.md](../ops/local-preview.md))
3. **Check preview mode status**: Look for the "Preview Mode" badge in the bottom-right corner
4. **Clear localStorage if needed**: If preview mode isn't working, try clearing browser data and re-enabling with `?preview=true`
5. **Filter IP in GA4**: As a fallback, set up IP exclusion filters in Google Analytics admin

### Accidentally Tagged Internal Links

If you added UTM parameters to internal links (e.g., navigation menu):
1. Remove the parameters - they inflate session counts
2. Only use UTM parameters for external referrals (links coming FROM other sites)

## Quick Reference

### Development Testing (No Analytics)
```bash
hugo server
```

### Production Preview Mode
```
Enable:  https://diegotoribio.com/?preview=true
Disable: https://diegotoribio.com/?preview=false
```

### Standard Referral URLs
```
GitHub bio:       ?utm_source=github&utm_medium=profile&utm_campaign=bio
LinkedIn profile: ?utm_source=linkedin&utm_medium=profile&utm_campaign=bio
Email signature:  ?utm_source=email&utm_medium=signature
```

### URL Template
```
https://diegotoribio.com/[path]/?utm_source=[source]&utm_medium=[medium]&utm_campaign=[campaign]
```

## Additional Resources

- [GitHub Pages Deployment Workflow](../ops/github-pages-deployment.md)
- [Local Preview Workflow](../ops/local-preview.md)
- [Building and Deployment Guide](../ops/building-and-deployment.md)
