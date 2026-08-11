import type { Theme } from '../../hooks/useTheme';
import './ThemeToggle.css';

interface Props {
  theme: Theme;
  onToggle: () => void;
}

export function ThemeToggle({ theme, onToggle }: Props) {
  return (
    <button
      type="button"
      className="theme-btn"
      onClick={onToggle}
      aria-label="Alternar tema"
      title="Alternar tema"
    >
      {theme === 'dark' ? '☀️' : '🌙'}
    </button>
  );
}
