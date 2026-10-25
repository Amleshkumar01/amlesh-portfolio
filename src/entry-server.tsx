import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import App from './App';
export { getPageMetadata, getStructuredData, siteMetadata } from './lib/seo';

export function render(pathname: string) {
  return renderToString(<StaticRouter location={pathname}><App /></StaticRouter>);
}
