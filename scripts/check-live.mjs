const urls = [
  'https://www.amleshkumar.tech/',
  'https://amleshkumar.tech/',
  'https://www.amleshkumar.tech/robots.txt',
  'https://www.amleshkumar.tech/sitemap.xml',
  'https://www.amleshkumar.tech/__seo-check-missing__',
  'https://github.com/Amleshkumar01/CyberGuard-AI',
  'https://github.com/Amleshkumar01/e-com-project',
  'https://placementiq.centralindia.cloudapp.azure.com/',
];
await Promise.all(urls.map(async (url) => {
  try {
    const response = await fetch(url, { signal: AbortSignal.timeout(15000), redirect: 'follow' });
    const text = await response.text();
    const result = { url, status: response.status, finalUrl: response.url, server: response.headers.get('server') };
    if (response.headers.get('content-type')?.includes('text/html')) {
      result.headingCount = [...text.matchAll(/<h1\b/gi)].length;
      result.prerendered = text.includes('id="home"') && text.includes('CyberGuard');
    } else result.content = text.slice(0, 650);
    console.log(JSON.stringify(result));
  } catch (error) { console.log(JSON.stringify({ url, error: error.message, cause: error.cause?.code ?? error.cause?.message })); }
}));
