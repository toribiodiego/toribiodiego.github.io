# Theming and Dark Mode

This site includes a comprehensive dark mode implementation with automatic theme detection and manual toggle controls.

## Features

- **Automatic theme detection**: Follows system preference by default
- **Manual override**: Click the theme toggle button to switch between light and dark modes
- **Persistent preference**: Theme choice is saved in localStorage
- **Smooth transitions**: All color changes animate smoothly
- **Fully responsive**: Works across all screen sizes

## Theme Toggle Button

The theme toggle button appears in the top-right corner of all pages:

- **Sun icon**: Currently in light mode
- **Moon icon**: Currently in dark mode
- **Click once**: Toggle between light and dark mode
- **Double-click**: Reset to auto mode (follow system preference)

### Button States

- **Auto mode**: Theme follows system preference (default)
- **Manual mode**: Theme is locked to user's choice
- **Hover**: Border highlights in blue

## Color System

The site uses CSS custom properties (variables) to enable theme switching. All colors adapt automatically based on the active theme.

### Light Mode Colors

```css
--background-color: #fff
--heading-color: #222
--text-color: #444
--secondary-text-color: #666
--link-color: #3273dc
--code-background-color: #f2f2f2
```

### Dark Mode Colors

```css
--background-color: #000
--heading-color: #fff
--text-color: #e0e0e0
--secondary-text-color: #c9d1d9
--link-color: #58a6ff
--code-background-color: #0d1117
```

## Implementation Details

### File Structure

- `/static/js/theme-toggle.js` - Theme toggle logic and localStorage management
- `/layouts/partials/theme-toggle.html` - Toggle button HTML
- `/layouts/partials/style.html` - CSS variables and theme definitions
- `/assets/scss/_theme-toggle.scss` - Toggle button styling

### JavaScript API

The theme toggle exposes a global `window.themeToggle` object:

```javascript
// Get current stored preference (null if auto)
window.themeToggle.get()

// Set theme ('light', 'dark', or null for auto)
window.themeToggle.set('dark')

// Toggle between light and dark
window.themeToggle.toggle()

// Reset to auto mode
window.themeToggle.reset()

// Get effective theme (what's actually displayed)
window.themeToggle.getEffective()

// Check if in auto mode
window.themeToggle.isAuto()
```

### Adding Theme-Aware Colors

To add new theme-aware colors, define CSS variables in both light and dark mode sections of `layouts/partials/style.html`:

```css
:root {
  --your-color: #light-value;
}

@media (prefers-color-scheme: dark) {
  html:not(.light-theme) {
    --your-color: #dark-value;
  }
}

html.dark-theme {
  --your-color: #dark-value;
}
```

Then use the variable in your styles:

```css
.your-element {
  color: var(--your-color);
}
```

## Customization

### Changing Default Colors

Edit the CSS variable values in `/layouts/partials/style.html` under the `:root`, `@media (prefers-color-scheme: dark)`, and `html.dark-theme` sections.

### Disabling Auto Mode

To force a specific theme, modify `theme-toggle.js` to set a default theme instead of following system preference.

### Removing the Toggle Button

Remove the theme toggle partial from `/layouts/partials/header.html`:

```html
<!-- Remove this line -->
{{- partial "theme-toggle.html" . -}}
```

## Browser Support

- **Modern browsers**: Full support (Chrome, Firefox, Safari, Edge)
- **localStorage**: Required for persistent preferences
- **prefers-color-scheme**: Required for auto mode
- **CSS custom properties**: Required for theme switching

## Troubleshooting

### Theme not switching

1. Hard refresh the page (Cmd+Shift+R / Ctrl+Shift+R)
2. Check browser console for JavaScript errors
3. Verify localStorage is enabled
4. Check that `theme-toggle.js` is loaded

### Colors not changing

1. Ensure element uses CSS variables, not hardcoded colors
2. Check specificity - inline styles or `!important` may override
3. Verify CSS is compiled and loaded correctly

### Toggle button not visible

1. Check z-index conflicts
2. Verify button isn't hidden behind other elements
3. Ensure theme-toggle.scss is compiled and loaded

## Development

When adding new styled components:

1. Use CSS variables for all colors
2. Test in both light and dark modes
3. Ensure hover states work in both themes
4. Check contrast ratios for accessibility
5. Add smooth transitions for color changes

## Debug Mode

The theme toggle includes debug logging in development. Check the browser console for:

```
[Debug] Theme toggle script loaded: true
[Debug] HTML classes: dark-theme
[Debug] Effective theme: dark
[Theme] Set to dark
```

To remove debug logging for production, remove the debug script from `/layouts/partials/custom_head.html`.
