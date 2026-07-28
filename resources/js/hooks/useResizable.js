import { useState, useCallback, useRef, useEffect } from 'react';

const STORAGE_KEY = 'writeros-explorer-width';
const DEFAULT_WIDTH = 260;

/**
 * Hook for resizable panels via drag.
 *
 * @param {{ min?: number, max?: number, initial?: number }} options
 */
export function useResizable({ min = 180, max = 480, initial = DEFAULT_WIDTH } = {}) {
    const [width, setWidth] = useState(initial);
    const isDragging = useRef(false);
    const startX = useRef(0);
    const startWidth = useRef(initial);

    // Sync from localStorage after hydration
    useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEY);

        if (stored) {
            const parsed = parseInt(stored, 10);

            if (!isNaN(parsed) && parsed !== width) {
                setWidth(parsed);
            }
        }
    }, []);

    const onMouseDown = useCallback(
        (e) => {
            isDragging.current = true;
            startX.current = e.clientX;
            startWidth.current = width;
            document.body.style.cursor = 'col-resize';
            document.body.style.userSelect = 'none';
        },
        [width],
    );

    useEffect(() => {
        function onMouseMove(e) {
            if (!isDragging.current) {
                return;
            }

            const delta = e.clientX - startX.current;
            const newWidth = Math.max(min, Math.min(max, startWidth.current + delta));
            setWidth(newWidth);
        }

        function onMouseUp() {
            if (!isDragging.current) {
                return;
            }

            isDragging.current = false;
            document.body.style.cursor = '';
            document.body.style.userSelect = '';
            localStorage.setItem(STORAGE_KEY, String(width));
        }

        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseup', onMouseUp);

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseup', onMouseUp);
        };
    }, [min, max, width]);

    return { width, onMouseDown };
}
