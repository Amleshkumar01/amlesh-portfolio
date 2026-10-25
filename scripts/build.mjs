import { build } from 'vite';
import { readFile, writeFile } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import path from 'node:path';

const root = process.cwd();
await build({ root });
await build({ root, build: { ssr: 'src/entry-server.tsx', outDir: 'dist-ssr', emptyOutDir: true, minify: false } });
const { render, getPageMetadata, getStructuredData, siteMetadata } = await import(pathToFileURL(path.join(root, 'dist-ssr/entry-server.js')).href);
const template = await readFile(path.join(root, 'dist/index.html'), 'utf8');
const escape = (value) => String(value).replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');

function head(pathname) {
  const page = getPageMetadata(pathname);
  const tags = [
    `<title>${escape(page.title)}</title>`,
    `<meta name="description" content="${escape(page.description)}">`,
    `<meta name="author" content="${escape(siteMetadata.name)}">`,
    `<meta name="robots" content="${page.robots}">`,
  ];
  if (page.canonical) {
    tags.push(`<link rel="canonical" href="${page.canonical}">`);
    for (const [property, content] of Object.entries({ 'og:type': 'profile', 'og:url': siteMetadata.url, 'og:site_name': siteMetadata.name, 'og:title': siteMetadata.title, 'og:description': siteMetadata.description, 'og:image': siteMetadata.image, 'og:image:alt': siteMetadata.imageAlt, 'og:image:width': '1024', 'og:image:height': '1024', 'og:locale': 'en_IN' })) {
      tags.push(`<meta property="${property}" content="${escape(content)}">`);
    }
    for (const [name, content] of Object.entries({ 'twitter:card': 'summary_large_image', 'twitter:title': siteMetadata.title, 'twitter:description': siteMetadata.description, 'twitter:image': siteMetadata.image, 'twitter:image:alt': siteMetadata.imageAlt })) {
      tags.push(`<meta name="${name}" content="${escape(content)}">`);
    }
    tags.push(`<script id="person-schema" type="application/ld+json">${JSON.stringify(getStructuredData()).replaceAll('<', '\\u003c')}</script>`);
  }
  return tags.join('\n    ');
}

for (const [pathname, filename] of [['/', 'index.html'], ['/404', '404.html']]) {
  const html = template.replace(/<!-- seo:start -->[\s\S]*?<!-- seo:end -->/, `<!-- seo:start -->\n    ${head(pathname)}\n    <!-- seo:end -->`)
    .replace('<div id="root"></div>', `<div id="root">${render(pathname)}</div>`);
  if (!html.includes('<h1') || html.includes('<div id="root"></div>')) throw new Error(`Prerender failed for ${filename}`);
  await writeFile(path.join(root, 'dist', filename), html);
}
await writeFile(path.join(root, 'dist/sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${siteMetadata.url}</loc><lastmod>${siteMetadata.updated}</lastmod></url></urlset>\n`);
await writeFile(path.join(root, 'dist/robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${siteMetadata.url}sitemap.xml\n`);
console.log('Prerendered homepage and noindex 404 page; generated canonical sitemap and robots.txt.');
await import('./check-site.mjs');
