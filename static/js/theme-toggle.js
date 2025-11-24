/**
 * Theme Toggle
 *
 * Manages light/dark theme switching with localStorage persistence.
 * Respects system preference as default, allows manual override.
 */

(function() {
    'use strict';

    const THEME_KEY = 'theme-preference';
    const THEME_LIGHT = 'light';
    const THEME_DARK = 'dark';
    const THEME_AUTO = 'auto';

    /**
     * Get system color scheme preference
     */
    function getSystemTheme() {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return THEME_DARK;
        }
        return THEME_LIGHT;
    }

    /**
     * Get stored theme preference or default to auto
     */
    function getStoredTheme() {
        return localStorage.getItem(THEME_KEY) || THEME_AUTO;
    }

    /**
     * Get effective theme (resolving auto to actual theme)
     */
    function getEffectiveTheme() {
        const stored = getStoredTheme();
        if (stored === THEME_AUTO) {
            return getSystemTheme();
        }
        return stored;
    }

    /**
     * Apply theme to document
     */
    function applyTheme(theme) {
        const effectiveTheme = theme === THEME_AUTO ? getSystemTheme() : theme;

        if (effectiveTheme === THEME_DARK) {
            document.documentElement.classList.add('dark-theme');
            document.documentElement.classList.remove('light-theme');
        } else {
            document.documentElement.classList.add('light-theme');
            document.documentElement.classList.remove('dark-theme');
        }

        // Update toggle button state if it exists
        updateToggleButton(getStoredTheme());
    }

    /**
     * Set and persist theme preference
     */
    function setTheme(theme) {
        localStorage.setItem(THEME_KEY, theme);
        applyTheme(theme);
        console.log(`[Theme] Set to ${theme} (effective: ${getEffectiveTheme()})`);
    }

    /**
     * Cycle through themes: auto → light → dark → auto
     */
    function cycleTheme() {
        const current = getStoredTheme();
        let next;

        if (current === THEME_AUTO) {
            next = THEME_LIGHT;
        } else if (current === THEME_LIGHT) {
            next = THEME_DARK;
        } else {
            next = THEME_AUTO;
        }

        setTheme(next);
    }

    /**
     * Update toggle button appearance
     */
    function updateToggleButton(currentTheme) {
        const button = document.getElementById('theme-toggle');
        if (!button) return;

        const icon = button.querySelector('.theme-icon');
        const label = button.querySelector('.theme-label');

        if (!icon || !label) return;

        // Update icon and label based on current preference
        if (currentTheme === THEME_AUTO) {
            icon.textContent = '◐';
            label.textContent = 'Auto';
            button.title = 'Theme: Auto (following system)';
        } else if (currentTheme === THEME_LIGHT) {
            icon.textContent = '☀';
            label.textContent = 'Light';
            button.title = 'Theme: Light';
        } else {
            icon.textContent = '☾';
            label.textContent = 'Dark';
            button.title = 'Theme: Dark';
        }
    }

    /**
     * Initialize theme toggle
     */
    function init() {
        // Apply stored theme immediately (before page renders)
        applyTheme(getStoredTheme());

        // Listen for system theme changes (only affects auto mode)
        if (window.matchMedia) {
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

            // Modern API
            if (mediaQuery.addEventListener) {
                mediaQuery.addEventListener('change', function(e) {
                    if (getStoredTheme() === THEME_AUTO) {
                        console.log(`[Theme] System theme changed to ${e.matches ? 'dark' : 'light'}`);
                        applyTheme(THEME_AUTO);
                    }
                });
            }
            // Legacy API fallback
            else if (mediaQuery.addListener) {
                mediaQuery.addListener(function(e) {
                    if (getStoredTheme() === THEME_AUTO) {
                        console.log(`[Theme] System theme changed to ${e.matches ? 'dark' : 'light'}`);
                        applyTheme(THEME_AUTO);
                    }
                });
            }
        }

        // Set up toggle button when DOM is ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', setupToggleButton);
        } else {
            setupToggleButton();
        }
    }

    /**
     * Set up toggle button event listener
     */
    function setupToggleButton() {
        const button = document.getElementById('theme-toggle');
        if (button) {
            button.addEventListener('click', cycleTheme);
            updateToggleButton(getStoredTheme());
        }
    }

    // Export functions for external use
    window.themeToggle = {
        get: getStoredTheme,
        set: setTheme,
        cycle: cycleTheme,
        getEffective: getEffectiveTheme
    };

    // Initialize immediately
    init();
})();
