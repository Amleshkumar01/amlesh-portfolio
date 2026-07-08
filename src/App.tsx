import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Amlesh Kumar",
  alternateName: ["Amlesh Kumar"],
  jobTitle: "B.Tech CSE Student, Cybersecurity & Software Developer",
  description:
    "B.Tech CSE student at LNCT University, Bhopal, focused on cybersecurity, software development, and modern web projects.",
  url: typeof window !== "undefined" ? window.location.origin : "/",
  sameAs: [
    "https://github.com/Amleshkumar01",
    "https://www.linkedin.com/in/amlesh-kumar23/",
  ],
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "LNCT University",
  },
  knowsAbout: [
    "Cybersecurity",
    "Software Development",
    "Web Development",
    "React",
    "TypeScript",
  ],
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
