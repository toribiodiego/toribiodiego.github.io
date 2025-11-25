/**
 * Theme Toggle
 *
 * Manages light/dark theme switching with localStorage persistence.
 * Respects system preference by default, allows manual override.
 *
 * Behavior:
 * - Default: Follows system preference (no localStorage value)
 * - Single click: Toggles between light and dark (saves preference)
 * - Double-click: Resets to auto (clears preference, follows system)
 */

(function() {
    'use strict';

    const THEME_KEY = 'theme-preference';
    const THEME_LIGHT = 'light';
    const THEME_DARK = 'dark';
    const DOUBLE_CLICK_DELAY = 300; // ms

    let lastClickTime = 0;

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
     * Get stored theme preference (null if not set, meaning auto)
     */
    function getStoredTheme() {
        return localStorage.getItem(THEME_KEY);
    }

    /**
     * Get effective theme (what's actually displayed)
     */
    function getEffectiveTheme() {
        const stored = getStoredTheme();
        if (stored === null) {
            // No preference set, follow system
            return getSystemTheme();
        }
        return stored;
    }

    /**
     * Check if following system preference (no manual override)
     */
    function isAuto() {
        return getStoredTheme() === null;
    }

    /**
     * Apply theme to document
     */
    function applyTheme() {
        const effectiveTheme = getEffectiveTheme();

        if (effectiveTheme === THEME_DARK) {
            document.documentElement.classList.add('dark-theme');
            document.documentElement.classList.remove('light-theme');
        } else {
            document.documentElement.classList.add('light-theme');
            document.documentElement.classList.remove('dark-theme');
        }

        // Update toggle button state if it exists
        updateToggleButton();
    }

    /**
     * Set and persist theme preference
     */
    function setTheme(theme) {
        if (theme === null) {
            localStorage.removeItem(THEME_KEY);
            console.log('[Theme] Reset to auto (following system)');
        } else {
            localStorage.setItem(THEME_KEY, theme);
            console.log(`[Theme] Set to ${theme}`);
        }
        applyTheme();
    }

    /**
     * Toggle between light and dark (does not include auto)
     */
    function toggleTheme() {
        const current = getEffectiveTheme();
        const next = current === THEME_LIGHT ? THEME_DARK : THEME_LIGHT;
        setTheme(next);
    }

    /**
     * Reset to auto mode (follow system preference)
     */
    function resetToAuto() {
        setTheme(null);
    }

    /**
     * Handle button click (single or double)
     */
    function handleClick() {
        const now = Date.now();
        const timeSinceLastClick = now - lastClickTime;

        if (timeSinceLastClick < DOUBLE_CLICK_DELAY) {
            // Double-click detected - reset to auto
            resetToAuto();
            lastClickTime = 0; // Reset to prevent triple-click
        } else {
            // Single click - toggle between light and dark
            toggleTheme();
            lastClickTime = now;
        }
    }

    /**
     * Update toggle button appearance
     */
    function updateToggleButton() {
        const button = document.getElementById('theme-toggle');
        if (!button) return;

        const icon = button.querySelector('.theme-icon');
        const label = button.querySelector('.theme-label');

        if (!icon || !label) return;

        const effectiveTheme = getEffectiveTheme();
        const auto = isAuto();

        // Show current theme with auto indicator
        if (effectiveTheme === THEME_LIGHT) {
            icon.textContent = '☀';
            label.textContent = auto ? 'Light (auto)' : 'Light';
            button.title = auto ? 'Light mode (following system)\nClick: Switch to dark\nDouble-click: Keep auto mode' : 'Light mode\nClick: Switch to dark\nDouble-click: Reset to auto';
        } else {
            icon.textContent = '☾';
            label.textContent = auto ? 'Dark (auto)' : 'Dark';
            button.title = auto ? 'Dark mode (following system)\nClick: Switch to light\nDouble-click: Keep auto mode' : 'Dark mode\nClick: Switch to light\nDouble-click: Reset to auto';
        }
    }

    /**
     * Initialize theme toggle
     */
    function init() {
        // Apply theme immediately (before page renders)
        applyTheme();

        // Listen for system theme changes (only matters in auto mode)
        if (window.matchMedia) {
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

            // Modern API
            if (mediaQuery.addEventListener) {
                mediaQuery.addEventListener('change', function(e) {
                    if (isAuto()) {
                        console.log(`[Theme] System changed to ${e.matches ? 'dark' : 'light'}, updating (auto mode)`);
                        applyTheme();
                    }
                });
            }
            // Legacy API fallback
            else if (mediaQuery.addListener) {
                mediaQuery.addListener(function(e) {
                    if (isAuto()) {
                        console.log(`[Theme] System changed to ${e.matches ? 'dark' : 'light'}, updating (auto mode)`);
                        applyTheme();
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
            button.addEventListener('click', handleClick);
            updateToggleButton();
        }
    }

    // Export functions for external use
    window.themeToggle = {
        get: getStoredTheme,
        set: setTheme,
        toggle: toggleTheme,
        reset: resetToAuto,
        getEffective: getEffectiveTheme,
        isAuto: isAuto
    };

    // Initialize immediately
    init();
})();
