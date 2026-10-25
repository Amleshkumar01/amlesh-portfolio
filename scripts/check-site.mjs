import assert from 'node:assert/strict';
import { readFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { gzipSync } from 'node:zlib';

const root = path.resolve('dist');
const html = await readFile(path.join(root, 'index.html'), 'utf8');
const errorPage = await readFile(path.join(root, '404.html'), 'utf8');
const decode = (value) => value.replaceAll('&amp;', '&').replaceAll('&quot;', '"').replaceAll('&#x27;', "'");
const attributes = (tag) => Object.fromEntries([...tag.matchAll(/([\w:-]+)="([^"]*)"/g)].map((match) => [match[1], decode(match[2])]));
const tags = (name, content = html) => [...content.matchAll(new RegExp(`<${name}\\b[^>]*>`, 'gi'))].map((match) => attributes(match[0]));
let checks = 0;
const check = (name, fn) => { fn(); checks++; console.log(`PASS ${name}`); };

check('Content is present before JavaScript', () => {
  assert.ok(html.length > 30_000);
  assert.ok(!html.includes('<div id="root"></div>'));
  assert.match(html, /CyberGuard AI/);
  assert.match(html, /Salesforce Certified Platform Developer/);
  assert.match(html, /8\.10/);
});
check('One descriptive title and H1', () => {
  assert.equal([...html.matchAll(/<title>/g)].length, 1);
  assert.equal(tags('h1').length, 1);
  assert.match(html, /<h1[^>]*>Amlesh Kumar<\/h1>/);
  const title = decode(html.match(/<title>([^<]*)<\/title>/)[1]);
  assert.ok(title.length >= 30 && title.length <= 65);
});
const canonical = tags('link').filter((tag) => tag.rel === 'canonical');
check('One consistent HTTPS canonical', () => {
  assert.deepEqual(canonical.map((tag) => tag.href), ['https://www.amleshkumar.tech/']);
});
check('Indexable metadata and social previews', () => {
  const meta = tags('meta');
  const descriptions = meta.filter((tag) => tag.name === 'description');
  assert.equal(descriptions.length, 1);
  assert.ok(descriptions[0].content.length >= 100 && descriptions[0].content.length <= 170);
  assert.ok(meta.some((tag) => tag.name === 'robots' && tag.content === 'index,follow,max-image-preview:large'));
  for (const property of ['og:title', 'og:description', 'og:image', 'og:url']) assert.ok(meta.some((tag) => tag.property === property));
  assert.ok(meta.some((tag) => tag.name === 'twitter:card'));
});
const schema = JSON.parse(html.match(/<script id="person-schema" type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
check('Accurate Person and ProfilePage structured data', () => {
  const person = schema['@graph'].find((item) => item['@type'] === 'Person');
  const page = schema['@graph'].find((item) => item['@type'] === 'ProfilePage');
  assert.equal(person.name, 'Amlesh Kumar');
  assert.equal(person.affiliation.name, 'LNCT University');
  assert.ok(!person.alumniOf);
  assert.ok(person.hasCredential.length > 0);
  assert.ok(person.hasCredential.every((credential) => credential.name && credential.recognizedBy?.name && credential.url.startsWith(canonical[0].href)));
  assert.equal(page.mainEntity['@id'], person['@id']);
  assert.ok(person.sameAs.every((url) => url.startsWith('https://') && !url.includes('x.com/')));
});
const ids = new Set(tags('[a-z][a-z0-9-]*').map((tag) => tag.id).filter(Boolean));
check('Crawlable navigation and complete page sections', () => {
  for (const section of ['home', 'about', 'skills', 'education', 'certifications', 'projects', 'contact', 'main-content']) assert.ok(ids.has(section), section);
  assert.ok(tags('nav').some((tag) => tag['aria-label'] === 'Primary navigation'));
  assert.ok(tags('button').some((tag) => tag['aria-label'] === 'Open navigation menu' && tag['aria-expanded'] === 'false'));
  for (const link of tags('a')) {
    assert.ok(link.href && link.href !== '#' && !link.href.startsWith('javascript:'));
    if (link.href.startsWith('#')) assert.ok(ids.has(link.href.slice(1)), link.href);
    if (link.target === '_blank') assert.ok(link.rel?.includes('noopener'), link.href);
  }
});
const localAssets = new Set();
for (const tag of [...tags('script'), ...tags('img'), ...tags('link'), ...tags('a')]) {
  const url = tag.src ?? tag.href;
  if (url?.startsWith('/') && !url.startsWith('//')) localAssets.add(decodeURIComponent(url.split('?')[0]));
  for (const candidate of tag.srcSet?.split(',') ?? tag.srcset?.split(',') ?? []) {
    const url = candidate.trim().split(/\s+/)[0];
    if (url.startsWith('/')) localAssets.add(url);
  }
}
for (const asset of localAssets) {
  const filename = path.resolve(root, `.${asset}`);
  assert.ok(filename.startsWith(`${root}${path.sep}`), asset);
  assert.ok((await stat(filename)).isFile(), asset);
}
console.log(`PASS ${localAssets.size} local links and assets resolve`); checks++;
const certificateCount = (await readdir(path.join(root, 'certifications'))).filter((filename) => filename.endsWith('.pdf')).length;
check('Sized, optimized hero and lazy certificate images', () => {
  const images = tags('img');
  assert.equal(images.length, certificateCount + 1);
  assert.ok(images.every((image) => image.alt && image.width && image.height));
  assert.ok(images.some((image) => image.fetchPriority === 'high' || image.fetchpriority === 'high'));
  assert.ok(images.some((image) => image.src.endsWith('.webp') && (image.srcSet || image.srcset)));
  assert.equal(images.filter((image) => image.loading === 'lazy').length, certificateCount);
});
check('Current contact details; no removed UI', () => {
  assert.match(html, /https:\/\/wa\.me\/919905929106/);
  assert.match(html, /tel:\+919905929106/);
  assert.doesNotMatch(html, /<form\b|Send a Message|X \/ Twitter|Amlesh_yadav07|api\/placeholder/);
});
check('404 is marked noindex', () => {
  assert.ok(tags('meta', errorPage).some((tag) => tag.name === 'robots' && tag.content === 'noindex,follow'));
  assert.ok(!tags('link', errorPage).some((tag) => tag.rel === 'canonical'));
  assert.match(errorPage, /Page Not Found/);
});
const sitemap = await readFile(path.join(root, 'sitemap.xml'), 'utf8');
const robots = await readFile(path.join(root, 'robots.txt'), 'utf8');
check('Sitemap and robots use the canonical domain', () => {
  assert.match(sitemap, /<loc>https:\/\/www\.amleshkumar\.tech\/<\/loc>/);
  const modified = schema['@graph'].find((item) => item['@type'] === 'ProfilePage').dateModified;
  assert.ok(sitemap.includes(`<lastmod>${modified}</lastmod>`));
  assert.match(robots, /Allow: \//);
  assert.match(robots, /Sitemap: https:\/\/www\.amleshkumar\.tech\/sitemap.xml/);
});
const assets = await readdir(path.join(root, 'assets'));
const main = assets.find((filename) => /^index-.*\.js$/.test(filename));
const mainSource = await readFile(path.join(root, 'assets', main));
check('Chat code is deferred from the initial bundle', () => {
  assert.ok(assets.some((filename) => /^PortfolioChat-.*\.js$/.test(filename)));
  assert.ok(!mainSource.includes(Buffer.from("Ye detail Amlesh ke portfolio")));
});
console.log(`Initial JavaScript: ${(mainSource.length / 1024).toFixed(1)} KiB, ${(gzipSync(mainSource).length / 1024).toFixed(1)} KiB gzip.`);
console.log(`${checks} production-site checks passed. HTTP status codes and visual/mobile behavior still require live/browser verification.`);
