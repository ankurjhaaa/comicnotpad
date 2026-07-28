import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'writeros-theme';

export function useTheme() {
    const [theme, setTheme] = useState('light');

    // Sync from localStorage after hydration
    useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEY);

        if (stored && stored !== theme) {
            setTheme(stored);
        }
    }, []);

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem(STORAGE_KEY, theme);
    }, [theme]);

    const toggleTheme = useCallback(() => {
        setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
    }, []);

    return { theme, setTheme, toggleTheme };
}
