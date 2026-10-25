# Amlesh Kumar's portfolio

A React, TypeScript, Vite and Tailwind CSS portfolio for Amlesh Kumar, with education, skills, projects, certificates, contact channels and a portfolio assistant. The visual theme uses warm neutrals, coral accents, DM Sans and Space Grotesk.

## Develop and verify

Use Node.js 18 or newer and the committed npm lockfile.

~~~sh
npm ci
npm run dev
npm run check
npm run build
npm run check:seo
npm run preview
~~~

The production build creates the static site in dist and a build-only server bundle in dist-ssr. Deploy dist only. The build prerenders the actual React homepage and a noindex 404 page; the browser hydrates that HTML to enable navigation, filters, project dialogs and chat. The chatbot code is downloaded when a visitor opens it.

The SEO check inspects the production HTML, structured data, canonical URL, headings, anchor targets, document/image paths, image attributes, social metadata, sitemap, robots.txt and the 404 page. These checks do not produce a Lighthouse score or replace visual/mobile browser testing.

## Content sources

- src/data/profile.ts: public contact details, social links and resume URL.
- src/data/contact-channels.ts: contact cards and Direct / Code / Social categories.
- src/data/education.ts: degree, current CGPA, school results and achievements.
- src/data/skills.ts: listed skills and levels.
- src/data/projects.ts: project descriptions, status, technologies and available links.
- src/data/certifications.ts: the curated order of certificate records.
- src/lib/seo.ts: production domain, page title, description, modification date and structured data.

Certificate PDFs live in public/certifications, with optimized previews in its previews folder. Add both files and the matching record when adding a certificate. A missing project demo or repository is not shown as a clickable link. Keep personal claims and certification titles consistent with the supplied documents.

The portfolio assistant uses these same public content records. It supports common English, Hindi and Hinglish questions, and returns a limited-information response for unsupported details. It does not call a hosted AI model or require an API key.

## Search and social previews

The canonical URL is https://www.amleshkumar.tech/. The production build generates the homepage metadata, Person / ProfilePage structured data, robots.txt and sitemap from the shared SEO settings. It marks missing pages noindex instead of reusing the homepage canonical.

When content changes, update the real modification date in src/lib/seo.ts and public/sitemap.xml. Do not update the date merely because the site was rebuilt. Update the default index.html metadata too if changing the title, description or domain used in development.

The profile portrait has responsive WebP variants. The hero is visible immediately, has explicit dimensions and a high fetch priority. Certificate previews load lazily. Navigation and project links use normal anchors; the site also provides a keyboard skip link, accessible project dialogs and reduced-motion support.

Social preview tags named twitter:card or twitter:image are sharing metadata, not an X/Twitter contact profile. Removing a social profile does not require removing those preview tags.

## Publish on Vercel

The repository's vercel.json sets the build command and dist output directory. Vercel serves dist/404.html for missing routes. Do not add a catch-all rewrite to index.html: this site uses section anchors, and unknown paths should keep a real HTTP 404 status.

Content-hashed assets under /assets receive long-lived immutable caching. HTML and stable-name documents should not receive that same immutable policy.

After deployment, run this read-only check:

~~~sh
npm run check:live
~~~

It reports the public homepage, apex-domain redirect, robots.txt, sitemap and a missing path. A source-only edit does not change the live website until a deployment succeeds.

## Google Search Console

1. Verify the domain in [Google Search Console](https://search.google.com/search-console) using the owner's account and the supplied DNS or HTML verification method. Never commit private credentials.
2. Submit https://www.amleshkumar.tech/sitemap.xml.
3. Inspect the canonical homepage, check the rendered HTML, and request indexing after deployment.
4. Monitor indexing, queries and Core Web Vitals over time. Link to the canonical portfolio URL from the owner's real public profiles.

SEO helps search engines understand and discover a site; it does not guarantee indexing, rich results or a first-place ranking. See [Google's SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide) and [JavaScript SEO guidance](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics).
