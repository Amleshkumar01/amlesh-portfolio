import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getPageMetadata, getStructuredData } from '@/lib/seo';

export const PageMetadata = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    const page = getPageMetadata(pathname);
    document.title = page.title;
    for (const [name, content] of Object.entries({ description: page.description, robots: page.robots })) {
      let meta = document.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
      if (!meta) { meta = document.createElement('meta'); meta.name = name; document.head.appendChild(meta); }
      meta.content = content;
    }
    const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (page.canonical) {
      const link = canonical ?? document.createElement('link');
      link.rel = 'canonical'; link.href = page.canonical;
      if (!canonical) document.head.appendChild(link);
    } else canonical?.remove();

    const existing = document.getElementById('person-schema');
    if (pathname === '/') {
      const schema = existing ?? document.createElement('script');
      schema.id = 'person-schema'; schema.setAttribute('type', 'application/ld+json');
      schema.textContent = JSON.stringify(getStructuredData());
      if (!existing) document.head.appendChild(schema);
    } else existing?.remove();
  }, [pathname]);
  return null;
};
