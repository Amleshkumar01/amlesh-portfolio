import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const siteName = "Amlesh Kumar";
const siteUrl = "https://amleshkumar.tech";
const shareImagePath = "/og-image.png";
const shareImageUrl = `${siteUrl}${shareImagePath}`;
const pageTitle = "Amlesh Kumar | B.Tech CSE Student, Cybersecurity & Software Developer";
const pageDescription =
  "Amlesh Kumar's portfolio. B.Tech CSE student at LNCT University, Bhopal, focused on cybersecurity, software development, and modern web projects.";

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: siteName,
  alternateName: ["Amlesh Kumar"],
  jobTitle: "B.Tech CSE Student, Cybersecurity & Software Developer",
  description: pageDescription,
  url: siteUrl,
  image: shareImageUrl,
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

const App = () => {
  useEffect(() => {
    const setMeta = (attribute: "name" | "property", key: string, content: string) => {
      const selector = `meta[${attribute}="${key}"]`;
      const existing = document.querySelector(selector) as HTMLMetaElement | null;

      if (existing) {
        existing.setAttribute("content", content);
        return;
      }

      const meta = document.createElement("meta");
      meta.setAttribute(attribute, key);
      meta.setAttribute("content", content);
      document.head.appendChild(meta);
    };

    const removeMeta = (attribute: "name" | "property", key: string) => {
      document.querySelector(`meta[${attribute}="${key}"]`)?.remove();
    };

    document.title = pageTitle;
    setMeta("name", "description", pageDescription);
    setMeta("name", "author", siteName);
    setMeta("name", "robots", "index,follow");
    setMeta("name", "googlebot", "index,follow");
    setMeta("property", "og:type", "website");
    setMeta("property", "og:title", pageTitle);
    setMeta("property", "og:description", pageDescription);
    setMeta("property", "og:url", siteUrl);
    setMeta("property", "og:site_name", siteName);
    setMeta("property", "og:image", shareImageUrl);
    setMeta("property", "og:image:alt", "Amlesh Kumar profile photo");
    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", pageTitle);
    setMeta("name", "twitter:description", pageDescription);
    setMeta("name", "twitter:image", shareImageUrl);
    setMeta("name", "twitter:image:alt", "Amlesh Kumar profile photo");
    removeMeta("name", "twitter:site");
    removeMeta("name", "twitter:creator");

    const canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;

    if (canonicalLink) {
      canonicalLink.setAttribute("href", siteUrl);
    } else {
      const link = document.createElement("link");
      link.rel = "canonical";
      link.href = siteUrl;
      document.head.appendChild(link);
    }

    const schemaId = "person-schema";
    const schemaScript = document.getElementById(schemaId) as HTMLScriptElement | null;

    if (schemaScript) {
      schemaScript.textContent = JSON.stringify(personSchema);
      return;
    }

    const script = document.createElement("script");
    script.id = schemaId;
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(personSchema);
    document.head.appendChild(script);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
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
};

export default App;
