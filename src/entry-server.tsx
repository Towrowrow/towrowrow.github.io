import { renderToString } from 'react-dom/server';

import { App } from './App';
import type { Locale } from './data/profile';
import { StaticRenderingContext } from './rendering';
export { languageUrl, personSchema, seoFor, siteUrl } from './data/seo';
export function render(locale: Locale) {
  return renderToString(
    <StaticRenderingContext.Provider value={true}>
      <App initialLanguage={locale} />
    </StaticRenderingContext.Provider>,
  );
}
