import { useEffect, useState } from 'react';

export type Theme = 'dark' | 'light';

const STORAGE_KEY = 'weather-theme';

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return (saved as Theme) ?? 'dark';
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggle = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'));

  return { theme, toggle };
}
