import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';

export const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check for saved theme preference or default to light mode
    let savedTheme: string | null = null;
    try { savedTheme = localStorage.getItem('theme'); } catch { /* Storage may be unavailable. */ }
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    const dark = savedTheme === 'dark' || (!savedTheme && prefersDark);
    setIsDark(dark);
    document.documentElement.classList.toggle('dark', dark);
    const syncTheme = (event: Event) => setIsDark((event as CustomEvent<boolean>).detail);
    window.addEventListener('portfolio-theme-change', syncTheme);
    return () => window.removeEventListener('portfolio-theme-change', syncTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    
    if (newTheme) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    try { localStorage.setItem('theme', newTheme ? 'dark' : 'light'); } catch { /* The theme still works without persistence. */ }
    window.dispatchEvent(new CustomEvent('portfolio-theme-change', { detail: newTheme }));
  };

  return (
    <motion.button
      type="button"
      onClick={toggleTheme}
      className="relative p-3 rounded-full glass hover:bg-accent/20 transition-all duration-300"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      aria-pressed={isDark}
    >
      <motion.div
        initial={false}
        animate={{ rotate: isDark ? 180 : 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="relative w-5 h-5"
      >
        <motion.div
          animate={{ opacity: isDark ? 0 : 1, scale: isDark ? 0.5 : 1 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0"
        >
          <Sun className="w-5 h-5 text-accent" />
        </motion.div>
        <motion.div
          animate={{ opacity: isDark ? 1 : 0, scale: isDark ? 1 : 0.5 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0"
        >
          <Moon className="w-5 h-5 text-accent" />
        </motion.div>
      </motion.div>
    </motion.button>
  );
};
