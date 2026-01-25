import { motion } from 'framer-motion';
import { Heart, ArrowUp } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const quickLinks = [
    { href: '#home', label: 'Home' },
    { href: '#skills', label: 'Skills' },
    { href: '#education', label: 'Education' },
    { href: '#projects', label: 'Projects' },
    { href: '#contact', label: 'Contact' }
  ];

  return (
    <footer className="bg-foreground text-background relative">
      {/* Scroll to Top Button */}
      <motion.button
        onClick={scrollToTop}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="absolute -top-6 left-1/2 transform -translate-x-1/2 p-3 rounded-full bg-accent text-accent-foreground shadow-lg hover:bg-accent-hover transition-colors"
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-5 h-5" />
      </motion.button>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-4">Amlesh Kumar</h3>
            <p className="text-background/80 mb-4">
              B.Tech CSE Student passionate about creating innovative solutions 
              in software development and cybersecurity.
            </p>
            <div className="flex items-center gap-2">
              <span className="text-sm text-background/70">Theme:</span>
              <ThemeToggle />
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <nav className="space-y-2">
              {quickLinks.map((link) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  whileHover={{ x: 4 }}
                  className="block text-background/80 hover:text-accent transition-colors"
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold mb-4">Get In Touch</h4>
            <div className="space-y-2 text-background/80">
              <p>📧 amleshkumar647544@gmail.com</p>
              <p>📍 Bhopal, Madhya Pradesh</p>
              <p>🎓 LNCT University</p>
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="border-t border-background/20 my-8" />

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row justify-between items-center gap-4"
        >
          <div className="flex items-center gap-1 text-background/80 text-sm">
            <span>Made with</span>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <Heart className="w-4 h-4 text-red-400 fill-current" />
            </motion.div>
            <span>using React & Framer Motion</span>
          </div>
          
          <div className="text-background/80 text-sm">
            © {new Date().getFullYear()} Amlesh Kumar. All rights reserved.
          </div>
        </motion.div>
      </div>
    </footer>
  );
};
