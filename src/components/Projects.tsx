import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Cloud, ExternalLink, Github, Globe, Shield } from 'lucide-react';
import { projects } from '@/data/projects';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';

const hasLink = (value: string) => /^https?:\/\//.test(value);
const statusStyle = (status: string) => status === 'Completed'
  ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300'
  : 'bg-amber-500/10 text-amber-800 dark:text-amber-300';

export const Projects = () => {
  const [selected, setSelected] = useState<(typeof projects)[number] | null>(null);
  const trigger = useRef<HTMLButtonElement | null>(null);
  return (
    <Dialog open={!!selected} onOpenChange={(open) => { if (!open) setSelected(null); }}>
      <section id="projects" aria-labelledby="projects-heading" className="section-padding bg-background">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 id="projects-heading" className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
              Featured <span className="text-accent">Projects</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">My work in software development, Salesforce, and cybersecurity.</p>
          </div>
          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
            {projects.map((project) => {
              const Icon = project.category === 'Cybersecurity' ? Shield : project.category === 'Salesforce Development' ? Cloud : Globe;
              return (
                <motion.article key={project.id} initial={false} className="glass rounded-2xl overflow-hidden card-hover flex flex-col min-w-0">
                  <div className="relative h-40 bg-gradient-to-br from-accent/15 to-primary/10 flex items-center justify-center">
                    <Icon className="w-14 h-14 text-accent/70" aria-hidden="true" />
                    <span className={'absolute top-4 right-4 rounded-full px-3 py-1 text-xs font-medium ' + statusStyle(project.status)}>{project.status}</span>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <span className="mb-3 self-start rounded bg-accent/10 px-2 py-1 text-xs font-medium text-accent">{project.category}</span>
                    <h3 className="mb-3 text-xl font-semibold text-foreground">
                      <button type="button" aria-haspopup="dialog" onClick={(event) => { trigger.current = event.currentTarget; setSelected(project); }}
                        className="rounded text-left hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                        {project.title}
                      </button>
                    </h3>
                    <p className="mb-4 text-sm leading-relaxed text-muted-foreground line-clamp-4">{project.description}</p>
                    <div className="mb-5 flex flex-wrap gap-2">
                      {project.technologies.slice(0, 3).map((technology) => <span key={technology} className="rounded bg-secondary px-2 py-1 text-xs text-secondary-foreground">{technology}</span>)}
                      {project.technologies.length > 3 && <span className="rounded bg-muted px-2 py-1 text-xs text-muted-foreground">+{project.technologies.length - 3}</span>}
                    </div>
                    <div className="mt-auto flex flex-wrap items-center gap-3 text-sm font-semibold">
                      <button type="button" aria-haspopup="dialog" onClick={(event) => { trigger.current = event.currentTarget; setSelected(project); }} className="rounded text-accent underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">Details<span className="sr-only"> about {project.title}</span></button>
                      {hasLink(project.liveUrl) && <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 rounded text-accent hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" aria-label={'Live demo of ' + project.title + ' (opens in a new tab)'}><ExternalLink className="h-4 w-4" aria-hidden="true" />Demo</a>}
                      {hasLink(project.githubUrl) && <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 rounded text-accent hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" aria-label={'Source code for ' + project.title + ' (opens in a new tab)'}><Github className="h-4 w-4" aria-hidden="true" />Code</a>}
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>
      {selected && <DialogContent className="max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-3xl overflow-y-auto rounded-2xl bg-background p-6 sm:p-8"
        onCloseAutoFocus={(event) => { event.preventDefault(); trigger.current?.focus({ preventScroll: true }); }}>
        <DialogHeader className="pr-6 text-left">
          <DialogTitle className="text-2xl font-bold">{selected.title}</DialogTitle>
          <DialogDescription className="pt-2 text-base leading-relaxed">{selected.description}</DialogDescription>
        </DialogHeader>
        <span className={'justify-self-start rounded-full px-3 py-1 text-xs font-medium ' + statusStyle(selected.status)}>{selected.status}</span>
        <div>
          <h3 className="mb-3 text-lg font-semibold">Key Features</h3>
          <ul className="grid gap-3 sm:grid-cols-2">
            {selected.features.map((feature) => <li key={feature} className="flex items-start gap-2 text-sm text-muted-foreground"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />{feature}</li>)}
          </ul>
        </div>
        <div>
          <h3 className="mb-3 text-lg font-semibold">Technologies Used</h3>
          <div className="flex flex-wrap gap-2">{selected.technologies.map((technology) => <span key={technology} className="skill-chip">{technology}</span>)}</div>
        </div>
        <div className="flex flex-wrap gap-3">
          {hasLink(selected.liveUrl) && <a href={selected.liveUrl} target="_blank" rel="noopener noreferrer" className="btn-hero inline-flex items-center gap-2">View live demo<ExternalLink className="h-4 w-4" aria-hidden="true" /><span className="sr-only">(opens in a new tab)</span></a>}
          {hasLink(selected.githubUrl) && <a href={selected.githubUrl} target="_blank" rel="noopener noreferrer" className="btn-outline inline-flex items-center gap-2">View source code<Github className="h-4 w-4" aria-hidden="true" /><span className="sr-only">(opens in a new tab)</span></a>}
        </div>
      </DialogContent>}
    </Dialog>
  );
};
