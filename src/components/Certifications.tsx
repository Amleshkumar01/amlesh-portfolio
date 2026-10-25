import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Award,
  BrainCircuit,
  CalendarDays,
  Code2,
  ExternalLink,
  LockKeyhole,
  Network,
} from 'lucide-react';
import { certifications, certificationCategories } from '@/data/certifications';
import type { CertificationCategory } from '@/data/certifications';

const categoryIcons: Record<CertificationCategory, typeof Award> = {
  Networking: Network,
  Cybersecurity: LockKeyhole,
  Development: Code2,
  'AI & IT': BrainCircuit,
};

export const Certifications = () => {
  const [activeCategory, setActiveCategory] = useState<CertificationCategory | 'All'>('All');
  const visibleCertifications = certifications.filter(
    (certification) => activeCategory === 'All' || certification.category === activeCategory,
  );

  return (
    <section id="certifications" aria-labelledby="certifications-heading" className="section-padding bg-muted/20 scroll-mt-20">
      <div className="container mx-auto">
        <motion.div
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-4 py-2 text-sm font-medium text-accent mb-5">
            <Award className="w-4 h-4" aria-hidden="true" />
            Learning into practice
          </div>
          <h2 id="certifications-heading" className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
            Professional <span className="text-accent">Certifications</span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            My learning journey across networking, cybersecurity, development, AI, and IT.
            Explore the certificates behind the skills.
          </p>
        </motion.div>

        <div role="group" aria-label="Filter certifications by category" className="flex flex-wrap justify-center gap-2 mb-6">
          {(['All', ...certificationCategories] as const).map((category) => {
            const count = category === 'All'
              ? certifications.length
              : certifications.filter((certification) => certification.category === category).length;

            return (
              <button
                key={category}
                type="button"
                aria-pressed={activeCategory === category}
                aria-controls="certification-grid"
                onClick={() => setActiveCategory(category)}
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                  activeCategory === category
                    ? 'border-accent bg-accent text-accent-foreground'
                    : 'border-border bg-background/60 text-muted-foreground hover:border-accent/50 hover:text-foreground'
                }`}
              >
                {category}
                <span className={`rounded-full px-1.5 py-0.5 text-xs ${activeCategory === category ? 'bg-accent-foreground/15' : 'bg-muted'}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        <p role="status" aria-live="polite" aria-atomic="true" className="text-center text-sm text-muted-foreground mb-8">
          Showing {visibleCertifications.length} of {certifications.length} credentials
        </p>

        <div id="certification-grid" className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {visibleCertifications.map((certification, index) => {
            const Icon = categoryIcons[certification.category];

            return (
              <motion.article
                key={certification.id}
                initial={false}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: (index % 3) * 0.06 }}
                viewport={{ once: true, amount: 0.1 }}
                className="group glass rounded-2xl overflow-hidden card-hover flex flex-col min-w-0"
              >
                <div className="relative border-b border-border bg-muted/40 p-4">
                  <img
                    src={certification.previewUrl}
                    alt={`${certification.title} certificate preview`}
                    width={800}
                    height={566}
                    loading="lazy"
                    decoding="async"
                    className="w-full aspect-[1.414/1] rounded-lg bg-white object-contain shadow-sm"
                  />
                  <span className="absolute left-6 bottom-6 rounded-full border border-border bg-background/95 px-3 py-1 text-xs font-semibold text-foreground shadow-sm">
                    {certification.kind}
                  </span>
                </div>

                <div className="flex flex-col flex-1 p-6">
                  <div className="flex items-center gap-2 text-xs font-semibold text-accent mb-3">
                    <Icon className="w-4 h-4 shrink-0" aria-hidden="true" />
                    {certification.category}
                  </div>
                  <h3 className="text-xl font-bold text-foreground leading-snug mb-3">
                    {certification.title}
                  </h3>
                  <p className="text-sm text-muted-foreground font-medium">{certification.issuer}</p>
                  <div className="flex items-center gap-1.5 text-sm text-muted-foreground mt-2">
                    <CalendarDays className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                    <span>{certification.date}</span>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-5 mb-6">
                    {certification.skills.map((skill) => (
                      <span key={skill} className="skill-chip text-xs px-2.5 py-1">
                        {skill}
                      </span>
                    ))}
                  </div>

                  <a
                    href={certification.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`View ${certification.title} certificate PDF (opens in a new tab)`}
                    className="mt-auto inline-flex items-center justify-between gap-3 rounded-xl border border-accent/25 bg-accent/5 px-4 py-3 text-sm font-semibold text-accent transition-colors hover:bg-accent/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  >
                    View certificate
                    <ExternalLink className="w-4 h-4 shrink-0" aria-hidden="true" />
                  </a>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
