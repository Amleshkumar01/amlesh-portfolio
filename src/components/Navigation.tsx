import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { navigationItems } from '@/data/navigation';

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const menuButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY + 110;
      for (const item of navigationItems) {
        const element = document.getElementById(item.href.slice(1));
        if (element && position >= element.offsetTop && position < element.offsetTop + element.offsetHeight) {
          setActiveSection(item.href.slice(1));
          break;
        }
      }
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setIsOpen(false); menuButton.current?.focus(); }
    };
    document.addEventListener('keydown', closeOnEscape);
    return () => document.removeEventListener('keydown', closeOnEscape);
  }, [isOpen]);

  return (
    <motion.nav initial={false} animate={{ y: 0 }} aria-label="Primary navigation"
      className="fixed top-0 left-0 right-0 z-50 glass border-b border-glass-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          <a href="#home" onClick={() => setIsOpen(false)} className="shrink-0 rounded font-bold text-xl text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            Amlesh Kumar
          </a>
          <div className="hidden lg:flex items-center gap-1 xl:gap-3">
            {navigationItems.map((item) => (
              <a key={item.href} href={item.href} aria-current={activeSection === item.href.slice(1) ? 'location' : undefined}
                className={'relative rounded px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ' + (activeSection === item.href.slice(1) ? 'text-accent' : 'text-foreground hover:text-accent')}>
                {item.label}
                {activeSection === item.href.slice(1) && <motion.span layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent" transition={{ duration: 0.3 }} />}
              </a>
            ))}
            <ThemeToggle />
          </div>
          <div className="lg:hidden flex items-center gap-2">
            <ThemeToggle />
            <button ref={menuButton} type="button" onClick={() => setIsOpen((open) => !open)}
              aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={isOpen} aria-controls="mobile-navigation"
              className="rounded-lg p-2.5 text-foreground hover:bg-accent/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
              {isOpen ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
            </button>
          </div>
        </div>
        <AnimatePresence>
          {isOpen && <motion.div id="mobile-navigation" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
            className="lg:hidden overflow-hidden border-t border-glass-border">
            <div className="space-y-1 py-3">
              {navigationItems.map((item) => <a key={item.href} href={item.href} onClick={() => setIsOpen(false)}
                aria-current={activeSection === item.href.slice(1) ? 'location' : undefined}
                className={'block rounded-lg px-4 py-3 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ' + (activeSection === item.href.slice(1) ? 'bg-accent/10 text-accent' : 'text-foreground hover:bg-accent/5')}>
                {item.label}
              </a>)}
            </div>
          </motion.div>}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};
