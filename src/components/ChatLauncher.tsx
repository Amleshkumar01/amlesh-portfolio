import { lazy, Suspense, useState } from 'react';
import { LoaderCircle, MessageCircle } from 'lucide-react';

const Chat = lazy(() => import('./PortfolioChat').then((module) => ({ default: module.PortfolioChat })));

export const ChatLauncher = () => {
  const [requested, setRequested] = useState(false);
  const button = (loading: boolean) => (
    <button type="button" onClick={() => setRequested(true)} disabled={loading}
      aria-label={loading ? 'Opening chat' : 'Chat about Amlesh'}
      className="fixed bottom-4 right-4 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-xl transition-shadow hover:shadow-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background sm:bottom-6 sm:right-6 sm:h-16 sm:w-16">
      {loading ? <LoaderCircle className="h-6 w-6 animate-spin motion-reduce:animate-none" aria-hidden="true" /> : <MessageCircle className="h-6 w-6" aria-hidden="true" />}
    </button>
  );
  return requested ? <Suspense fallback={button(true)}><Chat initialOpen /></Suspense> : button(false);
};
