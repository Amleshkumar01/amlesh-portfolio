import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { MessageCircle, X } from 'lucide-react';

export const FloatingHireMe = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 3000); // Show after 3 seconds

    return () => clearTimeout(timer);
  }, []);

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="glass rounded-2xl p-4 mb-4 max-w-xs"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="text-sm font-medium text-foreground">
                👋 Looking for a developer?
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-accent/20 rounded-full transition-colors"
              >
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>
            <p className="text-xs text-muted-foreground mb-3">
              I'm available for internships, projects, and freelance work. Let's build something amazing together!
            </p>
            <button
              onClick={scrollToContact}
              className="w-full btn-hero text-sm py-2"
            >
              Let's Talk
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="p-4 rounded-full bg-gradient-to-r from-accent to-accent-hover text-accent-foreground shadow-lg hover:shadow-xl transition-shadow"
      >
        <motion.div
          animate={{ rotate: isOpen ? 0 : 360 }}
          transition={{ duration: 0.3 }}
        >
          {isOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <MessageCircle className="w-6 h-6" />
          )}
        </motion.div>
      </motion.button>

      {/* Pulse Animation */}
      {!isOpen && (
        <motion.div
          className="absolute inset-0 rounded-full bg-accent/30"
          animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      )}
    </div>
  );
};