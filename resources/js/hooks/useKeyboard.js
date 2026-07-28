import { useEffect } from 'react';

/**
 * Register global keyboard shortcuts.
 *
 * @param {Record<string, (e: KeyboardEvent) => void>} shortcuts
 *   Keys are shortcut descriptors like 'mod+k', 'mod+b', 'mod+shift+f'.
 *   'mod' maps to Meta on Mac, Ctrl elsewhere.
 */
export function useKeyboard(shortcuts) {
    useEffect(() => {
        function handler(e) {
            const isMac = navigator.platform.toUpperCase().includes('MAC');
            const mod = isMac ? e.metaKey : e.ctrlKey;

            for (const [combo, callback] of Object.entries(shortcuts)) {
                const parts = combo.toLowerCase().split('+');
                const key = parts.pop();
                const needsMod = parts.includes('mod');
                const needsShift = parts.includes('shift');
                const needsAlt = parts.includes('alt');

                if (needsMod && !mod) {
                    continue;
                }

                if (needsShift && !e.shiftKey) {
                    continue;
                }

                if (needsAlt && !e.altKey) {
                    continue;
                }

                if (e.key.toLowerCase() === key) {
                    e.preventDefault();
                    callback(e);

                    return;
                }
            }
        }

        window.addEventListener('keydown', handler);

        return () => window.removeEventListener('keydown', handler);
    }, [shortcuts]);
}
