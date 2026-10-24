'use client';

import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    const stored = window.localStorage.getItem('theme') as Theme | null;
    setTheme(stored ?? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));
  }, []);

  const toggle = () => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    window.localStorage.setItem('theme', next);
    document.documentElement.setAttribute('data-theme', next);
  };

  if (theme === null) {
    return <span className="font-mono text-meta uppercase tracking-[0.12em] text-graphite">Light / Dark</span>;
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className="font-mono text-meta uppercase tracking-[0.12em] text-graphite hover:text-ink transition-colors"
      aria-label="Toggle color theme"
    >
      <span className={theme === 'light' ? 'text-ink' : ''}>Light</span>
      {' / '}
      <span className={theme === 'dark' ? 'text-ink' : ''}>Dark</span>
    </button>
  );
}
