/**
 * Preview Flag Manager
 *
 * Detects ?preview=true or ?preview=false query parameters and manages
 * preview mode state in localStorage. When preview mode is enabled,
 * analytics should not be loaded.
 */

(function() {
    'use strict';

    const PREVIEW_KEY = 'preview_mode';
    const PREVIEW_PARAM = 'preview';

    /**
     * Check URL for preview parameter and update localStorage accordingly
     */
    function checkPreviewParam() {
        const urlParams = new URLSearchParams(window.location.search);
        const previewParam = urlParams.get(PREVIEW_PARAM);

        if (previewParam === 'true') {
            localStorage.setItem(PREVIEW_KEY, 'true');
            console.log('[Preview Mode] Enabled - Analytics disabled');
        } else if (previewParam === 'false') {
            localStorage.removeItem(PREVIEW_KEY);
            console.log('[Preview Mode] Disabled - Analytics enabled');
        }
    }

    /**
     * Check if preview mode is currently active
     * @returns {boolean}
     */
    function isPreviewMode() {
        return localStorage.getItem(PREVIEW_KEY) === 'true';
    }

    // Run on page load
    checkPreviewParam();

    // Expose isPreviewMode globally for analytics script
    window.isPreviewMode = isPreviewMode;

    // Add visual indicator if in preview mode
    if (isPreviewMode()) {
        // Add a small badge to indicate preview mode
        document.addEventListener('DOMContentLoaded', function() {
            const badge = document.createElement('div');
            badge.id = 'preview-badge';
            badge.textContent = 'Preview Mode';
            badge.style.cssText = [
                'position: fixed',
                'bottom: 10px',
                'right: 10px',
                'background: rgba(255, 165, 0, 0.9)',
                'color: white',
                'padding: 5px 10px',
                'border-radius: 4px',
                'font-size: 12px',
                'font-family: monospace',
                'z-index: 10000',
                'box-shadow: 0 2px 4px rgba(0,0,0,0.2)'
            ].join(';');

            document.body.appendChild(badge);
        });
    }
})();
