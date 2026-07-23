    import { useState, useEffect } from 'react';

    export type Theme = 'dark' | 'light';

    export function useTheme() {
    const [theme, setTheme] = useState<Theme>(() => {
        const saved = localStorage.getItem('weather-theme');
        return (saved as Theme) ?? 'dark';
    });

    useEffect(() => {
        localStorage.setItem('weather-theme', theme);
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    const toggle = () => setTheme(t => (t === 'dark' ? 'light' : 'dark'));

    return { theme, toggle };
    }