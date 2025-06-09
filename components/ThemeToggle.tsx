import React, { useEffect, useState } from 'react';

const ThemeToggle: React.FC = () => {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    localStorage.setItem('juno-theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  useEffect(() => {
    const stored = localStorage.getItem('juno-theme');
    setDarkMode(stored !== 'light'); // default to dark
  }, []);

  return (
    <button
      className="ml-auto text-xs text-glow bg-glass px-2 py-1 rounded"
      onClick={() => setDarkMode(prev => !prev)}
    >
      {darkMode ? '🌙 Dark' : '☀️ Light'}
    </button>
  );
};

export default ThemeToggle;