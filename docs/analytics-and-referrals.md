# Analytics and Referral Tracking

This guide explains how to filter self-traffic from analytics and how to create trackable referral URLs for sharing the site.

## Self-Traffic Filtering

### Development Mode (Current)

The site automatically excludes analytics in development mode:

```bash
hugo server
```

When running locally with `hugo server`, Google Analytics scripts are not loaded, so no data is sent. See [local-preview.md](./local-preview.md) for details.

### Preview Flag (Planned)

A future enhancement will add a query parameter flag (e.g., `?preview=true`) that:
1. Sets a cookie or localStorage value to suppress analytics
2. Allows testing the production site without counting self-visits
3. Persists across sessions until explicitly cleared

This will enable previewing the live site at `https://diegotoribio.com/?preview=true` without polluting analytics data.

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

**Current approach**: Use browser DevTools to disable JavaScript, or use an ad blocker to block Google Analytics.

**Future approach**: Visit `https://diegotoribio.com/?preview=true` (once preview flag is implemented).

## Troubleshooting

### UTM Parameters Not Appearing in Analytics

1. **Wait 24-48 hours**: Analytics data can be delayed
2. **Check URL encoding**: Ensure special characters are properly encoded
3. **Verify Analytics is active**: Check that GA4 is properly configured
4. **Test with a different browser**: Rule out browser extensions blocking analytics

### Self-Traffic Still Appearing in Analytics

1. **Use development mode**: Run `hugo server` for local testing (see [local-preview.md](./local-preview.md))
2. **Block analytics in browser**: Use browser extensions like uBlock Origin
3. **Filter IP in GA4**: Set up IP exclusion filters in Google Analytics admin
4. **Wait for preview flag**: The `?preview=true` feature is planned but not yet implemented

### Accidentally Tagged Internal Links

If you added UTM parameters to internal links (e.g., navigation menu):
1. Remove the parameters - they inflate session counts
2. Only use UTM parameters for external referrals (links coming FROM other sites)

## Quick Reference

### Development Testing (No Analytics)
```bash
hugo server
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
