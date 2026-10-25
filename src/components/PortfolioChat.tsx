import { useEffect, useId, useRef, useState } from 'react';
import type { FormEvent, MouseEvent } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Bot, MessageCircle, RotateCcw, Send, X } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { chatSuggestions, getPortfolioReply, welcomeReply } from '@/lib/portfolio-chat';
import type { ChatLink, ChatReply } from '@/lib/portfolio-chat';

type Message = { id: number; role: 'user' | 'assistant'; text: string; reply?: ChatReply };
const firstMessage: Message = { id: 0, role: 'assistant', text: welcomeReply.text, reply: welcomeReply };

export const PortfolioChat = ({ initialOpen = false }: { initialOpen?: boolean }) => {
  const [isOpen, setIsOpen] = useState(initialOpen);
  const [draft, setDraft] = useState('');
  const [messages, setMessages] = useState<Message[]>([firstMessage]);
  const inputRef = useRef<HTMLInputElement>(null);
  const logRef = useRef<HTMLDivElement>(null);
  const nextId = useRef(1);
  const reduceMotion = useReducedMotion();
  const titleId = useId();
  const descriptionId = useId();
  const inputId = useId();

  useEffect(() => {
    if (isOpen && logRef.current) {
      logRef.current.scrollTo({ top: logRef.current.scrollHeight, behavior: reduceMotion ? 'instant' : 'smooth' });
    }
  }, [isOpen, messages, reduceMotion]);

  const ask = (question: string) => {
    const text = question.trim().slice(0, 500);
    if (!text) return;
    const lastReply = [...messages].reverse().find((message) => message.reply)?.reply;
    const reply = getPortfolioReply(text, lastReply?.topic);
    const userId = nextId.current++;
    const assistantId = nextId.current++;
    setMessages((current) => [...current, { id: userId, role: 'user', text }, { id: assistantId, role: 'assistant', text: reply.text, reply }]);
    setDraft('');
    inputRef.current?.focus({ preventScroll: true });
  };
  const submit = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); ask(draft); };
  const navigate = (event: MouseEvent<HTMLAnchorElement>, link: ChatLink) => {
    if (!link.href.startsWith('#')) return;
    const target = document.getElementById(link.href.slice(1));
    if (!target) return;
    event.preventDefault();
    setIsOpen(false);
    requestAnimationFrame(() => target.scrollIntoView({ behavior: reduceMotion ? 'instant' : 'smooth' }));
  };
  const reset = () => { setMessages([firstMessage]); setDraft(''); inputRef.current?.focus({ preventScroll: true }); };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <motion.button
            type="button"
            aria-label={isOpen ? "Close Amlesh's chatbot" : 'Chat about Amlesh'}
            title="Ask about Amlesh"
            initial={reduceMotion ? false : { scale: 0 }} animate={{ scale: 1 }}
            whileHover={reduceMotion ? undefined : { scale: 1.05 }} whileTap={reduceMotion ? undefined : { scale: 0.95 }}
            className="relative z-10 flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-xl transition-shadow hover:shadow-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
          >
            {isOpen ? <X className="h-6 w-6" aria-hidden="true" /> : <MessageCircle className="h-6 w-6" aria-hidden="true" />}
          </motion.button>
        </PopoverTrigger>
        <PopoverContent
          side="top" align="end" sideOffset={16} collisionPadding={16}
          aria-labelledby={titleId} aria-describedby={descriptionId}
          onOpenAutoFocus={(event) => { event.preventDefault(); inputRef.current?.focus({ preventScroll: true }); }}
          onInteractOutside={(event) => event.preventDefault()}
          className="flex h-[min(36rem,calc(100dvh-7rem))] max-h-[var(--radix-popover-content-available-height)] w-[min(24rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-3xl border-border bg-background p-0 text-foreground shadow-2xl motion-reduce:animate-none"
        >
          <header className="flex shrink-0 items-center gap-3 border-b border-border bg-accent/5 px-4 py-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-accent/10 text-accent"><Bot className="h-6 w-6" aria-hidden="true" /></div>
            <div className="min-w-0 flex-1">
              <h2 id={titleId} className="text-base font-bold">Amlesh's assistant</h2>
              <p id={descriptionId} className="mt-0.5 text-xs text-muted-foreground">Get to know the person behind the work</p>
            </div>
            <button type="button" onClick={reset} disabled={messages.length === 1 && !draft} aria-label="Start a new conversation" title="Start a new conversation" className="rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-40"><RotateCcw className="h-4 w-4" aria-hidden="true" /></button>
            <button type="button" onClick={() => setIsOpen(false)} aria-label="Close chat" className="rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"><X className="h-4 w-4" aria-hidden="true" /></button>
          </header>
          <div ref={logRef} role="log" aria-label="Conversation with Amlesh's portfolio assistant" aria-live="polite" aria-relevant="additions" tabIndex={0} className="min-h-0 flex-1 space-y-4 overflow-y-auto overscroll-contain px-4 py-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[94%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${message.role === 'user' ? 'rounded-br-sm bg-accent text-accent-foreground' : 'rounded-bl-sm border border-border/60 bg-muted/60 text-foreground'}`}>
                  <span className="sr-only">{message.role === 'user' ? 'You: ' : 'Assistant: '}</span>
                  <p className="whitespace-pre-wrap break-words [overflow-wrap:anywhere]">{message.text}</p>
                  {!!message.reply?.links.length && <div className="mt-3 flex flex-col items-start gap-2">
                    {message.reply.links.map((link) => <a key={`${link.href}-${link.label}`} href={link.href} target={link.external ? '_blank' : undefined} rel={link.external ? 'noopener noreferrer' : undefined} download={link.download} onClick={(event) => navigate(event, link)} className="inline-flex max-w-full items-center gap-1.5 rounded-md text-xs font-semibold text-accent underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                      <span className="break-words">{link.label}</span><ArrowUpRight className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />{link.external && <span className="sr-only">(opens in a new tab)</span>}
                    </a>)}
                  </div>}
                </div>
              </div>
            ))}
          </div>
          <div role="group" aria-label="Suggested questions" className="flex shrink-0 flex-wrap gap-1.5 border-t border-border px-4 pb-3 pt-3">
            {chatSuggestions.map((suggestion) => <button key={suggestion.label} type="button" onClick={() => ask(suggestion.question)} className="rounded-full border border-border bg-muted/40 px-3 py-2 text-xs font-medium text-muted-foreground transition-colors hover:border-accent/40 hover:bg-accent/10 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">{suggestion.label}</button>)}
          </div>
          <form onSubmit={submit} className="shrink-0 px-4 pb-4">
            <label htmlFor={inputId} className="sr-only">Your question about Amlesh</label>
            <div className="flex items-center gap-2 rounded-2xl border border-border bg-muted/30 p-1.5 focus-within:border-accent/50 focus-within:ring-2 focus-within:ring-accent/15">
              <input ref={inputRef} id={inputId} value={draft} onChange={(event) => setDraft(event.target.value)} maxLength={500} autoComplete="off" enterKeyHint="send" placeholder="Ask about Amlesh..." className="min-w-0 flex-1 bg-transparent px-2 py-2.5 text-base text-foreground outline-none placeholder:text-muted-foreground sm:text-sm" />
              <button type="submit" disabled={!draft.trim()} aria-label="Send question" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent text-accent-foreground hover:bg-accent-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-40"><Send className="h-4 w-4" aria-hidden="true" /></button>
            </div>
            <p className="mt-2 text-center text-[10px] text-muted-foreground">Answers from Amlesh's portfolio.</p>
          </form>
        </PopoverContent>
      </Popover>
      {!isOpen && !reduceMotion && <motion.div aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-full bg-accent/20" animate={{ scale: [1, 1.4], opacity: [0.45, 0] }} transition={{ duration: 2.5, repeat: Infinity }} />}
    </div>
  );
};
