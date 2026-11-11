import { renderToString } from 'react-dom/server';
import { App } from './App';
import { StaticRenderingContext } from './rendering';
import type { Locale } from './data/profile';
export { seoFor, personSchema, siteUrl, languageUrl } from './data/seo';
export function render(locale: Locale) {
 return renderToString(<StaticRenderingContext.Provider value={true}><App initialLanguage={locale}/></StaticRenderingContext.Provider>);
}
