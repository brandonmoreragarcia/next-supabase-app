'use client';

import { useCallback, useSyncExternalStore } from 'react';

function subscribe(callback: () => void) {
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  return () => observer.disconnect();
}

function getTheme() {
  return document.documentElement.dataset.theme ?? 'dark';
}

export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getTheme, () => 'dark');

  const toggle = useCallback(() => {
    document.documentElement.dataset.theme = getTheme() === 'dark' ? 'light' : 'dark';
  }, []);

  return (
    <button
      type="button"
      onClick={toggle}
      className="rounded-md border border-line-strong bg-raised px-3 py-1.5 text-sm text-secondary hover:bg-hover hover:text-primary"
    >
      Tema: {theme === 'dark' ? 'oscuro' : 'claro'}
    </button>
  );
}
