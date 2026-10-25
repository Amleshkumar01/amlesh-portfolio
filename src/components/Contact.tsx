import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { contactInfo } from '@/data/profile';
import { ContactChannels } from '@/components/ContactChannels';

export const Contact = () => {
  return (
    <section id="contact" aria-labelledby="contact-heading" className="section-padding bg-muted/20 scroll-mt-24">
      <div className="container mx-auto">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={false}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-accent">Get in touch</p>
            <h2 id="contact-heading" className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
              Let's <span className="text-accent">Connect</span>
            </h2>
            <p className="mx-auto max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Have a project in mind, an opportunity to share, or a question?
              Pick a channel below to get in touch. I'd love to hear from you.
            </p>
            <div className="mt-5 inline-flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 text-accent" aria-hidden="true" />
              {contactInfo.location}
            </div>
          </motion.div>
          <ContactChannels />
        </div>
      </div>
    </section>
  );
};
