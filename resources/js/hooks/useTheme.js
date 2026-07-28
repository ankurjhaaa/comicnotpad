import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'writeros-theme';

export function useTheme() {
    // Initialize state synchronously
    const [theme, setTheme] = useState(() => {
        if (typeof window !== 'undefined') {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) return stored;
            return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        }
        return 'light'; // fallback for pure SSR environment
    });
    
    const [mounted, setMounted] = useState(false);

    // Update DOM when theme changes
    useEffect(() => {
        setMounted(true);
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem(STORAGE_KEY, theme);
    }, [theme]);

    const toggleTheme = useCallback(() => {
        setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
    }, []);

    return { theme, setTheme, toggleTheme, mounted };
}
