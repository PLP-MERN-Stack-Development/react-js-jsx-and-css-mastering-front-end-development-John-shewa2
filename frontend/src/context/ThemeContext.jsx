import React, { createContext, useState, useEffect, useCallback } from 'react';

export const ThemeContext = createContext({
  theme: 'light',
  toggleTheme: () => {},
});

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    try {
      const saved = localStorage.getItem('theme');
      if (saved) return saved;
      // default to system preference
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    } catch {
      return 'light';
    }
  });

  // Apply/remove Tailwind 'dark' class on <html>
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') root.classList.add('dark');
    else root.classList.remove('dark');

    try {
      localStorage.setItem('theme', theme);
    } catch {}

    // debug log
    // eslint-disable-next-line no-console
    console.log('[ThemeContext] theme applied:', theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    // debug log when toggle called
    // eslint-disable-next-line no-console
    console.log('[ThemeContext] toggleTheme called, previous:', theme);
    setTheme((t) => (t === 'dark' ? 'light' : 'dark'));
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};