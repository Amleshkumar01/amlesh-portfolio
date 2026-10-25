import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Check, Code2, Copy, Facebook, Github, Instagram, Linkedin, Mail, MessageCircle, Phone, Terminal } from 'lucide-react';
import { contactCategories, contactChannels } from '@/data/contact-channels';
import type { ContactCategory } from '@/data/contact-channels';
import { useToast } from '@/hooks/use-toast';

const icons = { email: Mail, phone: Phone, whatsapp: MessageCircle, github: Github, linkedin: Linkedin, leetcode: Code2, hackerrank: Terminal, instagram: Instagram, facebook: Facebook };

export const ContactChannels = () => {
  const [activeCategory, setActiveCategory] = useState<ContactCategory | 'All'>('All');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const { toast } = useToast();
  const visibleChannels = contactChannels.filter((channel) => activeCategory === 'All' || channel.category === activeCategory);

  useEffect(() => {
    if (!copiedId) return;
    const timeout = setTimeout(() => setCopiedId(null), 2000);
    return () => clearTimeout(timeout);
  }, [copiedId]);

  const copyContact = async (id: string, value: string, name: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedId(id);
      toast({ title: `${name} copied`, description: 'Ready to paste from your clipboard.' });
    } catch {
      toast({
        title: 'Could not copy automatically',
        description: `Please select and copy this value: ${value}`,
        variant: 'destructive',
      });
    }
  };

  return (
    <div>
      <div role="group" aria-label="Filter contact channels" className="mb-6 flex flex-wrap justify-center gap-2">
        {(['All', ...contactCategories] as const).map((category) => {
          const count = category === 'All' ? contactChannels.length : contactChannels.filter((channel) => channel.category === category).length;
          return (
            <button
              key={category}
              type="button"
              aria-pressed={activeCategory === category}
              aria-controls="contact-channels"
              onClick={() => setActiveCategory(category)}
              className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background ${activeCategory === category
                ? 'border-accent/50 bg-accent/10 text-accent'
                : 'border-border bg-background/50 text-muted-foreground hover:border-accent/30 hover:text-foreground'}`}
            >
              {category}<span className="text-xs opacity-75">({count})</span>
            </button>
          );
        })}
      </div>

      <p role="status" aria-live="polite" aria-atomic="true" className="sr-only">
        Showing {visibleChannels.length} contact {visibleChannels.length === 1 ? 'channel' : 'channels'}
      </p>

      <div id="contact-channels" className={`grid gap-4 sm:grid-cols-2 ${contactChannels.length >= 6 ? 'xl:grid-cols-3' : ''}`}>
        {visibleChannels.map((channel, index) => {
          const Icon = icons[channel.icon];
          const external = channel.href.startsWith('https://');
          return (
            <motion.article
              key={channel.id}
              initial={false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.35, delay: (index % 3) * 0.05 }}
              className="group relative min-w-0 rounded-2xl border border-border bg-background/50 shadow-sm transition-colors hover:border-accent/40 hover:bg-accent/5"
            >
              <a
                href={channel.href}
                target={external ? '_blank' : undefined}
                rel={external ? 'noopener noreferrer' : undefined}
                aria-label={`${channel.name}: ${channel.handle}${external ? ' (opens in a new tab)' : ''}`}
                className="flex h-full min-h-[150px] items-center gap-4 rounded-2xl p-5 pr-14 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:p-6 sm:pr-14"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-accent/20 bg-accent/10 text-accent">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="mb-1.5 flex flex-wrap items-center gap-2">
                    <h3 className="text-base font-bold text-foreground">{channel.name}</h3>
                    <span className="rounded-md border border-accent/20 bg-accent/5 px-1.5 py-0.5 text-[10px] font-medium lowercase tracking-wide text-accent">{channel.category}</span>
                  </div>
                  <p title={channel.handle} className="truncate text-sm font-medium text-accent">{channel.handle}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{channel.description}</p>
                </div>
                <ArrowUpRight className="absolute right-5 top-6 h-4 w-4 text-muted-foreground transition-colors group-hover:text-accent" aria-hidden="true" />
              </a>
              {channel.copyValue && (
                <button
                  type="button"
                  onClick={() => copyContact(channel.id, channel.copyValue!, channel.name)}
                  aria-label={channel.id === 'phone' ? 'Copy phone number' : 'Copy email address'}
                  title={copiedId === channel.id ? 'Copied' : channel.id === 'phone' ? 'Copy phone number' : 'Copy email address'}
                  className="absolute bottom-5 right-4 flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground transition-colors hover:border-accent/40 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {copiedId === channel.id ? <Check className="h-4 w-4 text-accent" aria-hidden="true" /> : <Copy className="h-4 w-4" aria-hidden="true" />}
                </button>
              )}
            </motion.article>
          );
        })}
      </div>
    </div>
  );
};
