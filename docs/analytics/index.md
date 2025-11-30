# Analytics & Customization

Configuration, testing, and customization of analytics and site appearance.

## Who this is for

- Site administrators managing analytics
- Anyone testing changes without polluting analytics data
- Developers customizing the theme or dark mode

## What's covered

### Analytics & Traffic
- [analytics-and-referrals.md](analytics-and-referrals.md) — preview mode toggle, self-traffic filtering, UTM patterns

### Theme & Appearance
- [theming-and-dark-mode.md](theming-and-dark-mode.md) — toggle implementation, CSS variables, customization notes

## Quick reference

**Enable preview mode (bypass analytics on production):**
```
https://diegotoribio.com/?preview=true
```

**Disable preview mode:**
```
https://diegotoribio.com/?preview=false
```

**Check preview mode status:**
Look for the orange "Preview Mode" badge in bottom-right corner of the site.

## When to read these

- Before QA testing on the live site (to avoid skewing analytics)
- When setting up UTM tracking for shared links
- To understand how self-traffic is filtered
- When customizing dark mode styles or theme toggle behavior
- If analytics aren't loading as expected
