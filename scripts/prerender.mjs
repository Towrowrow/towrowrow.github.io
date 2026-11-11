import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';

import { languageUrl, personSchema, render, seoFor, siteUrl } from '../.prerender/entry-server.js';
import { removeFallbackSeo } from './html-template.mjs';

const template = await readFile('dist/index.html', 'utf8');
const escape = (value) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
for (const locale of ['fr', 'en']) {
  const seo = seoFor(locale);
  const head = `
  <title>${escape(seo.title)}</title>
  <meta name="description" content="${escape(seo.description)}"/>
  <meta name="author" content="Rémi Tilmant"/>
  <meta name="robots" content="index,follow,max-image-preview:large"/>
  <link rel="canonical" href="${seo.url}"/>
  <link rel="alternate" hreflang="fr" href="${languageUrl('fr')}"/>
  <link rel="alternate" hreflang="en" href="${languageUrl('en')}"/>
  <link rel="alternate" hreflang="x-default" href="${siteUrl}"/>
  <meta property="og:type" content="website"/>
  <meta property="og:site_name" content="Rémi Tilmant — Portfolio"/>
  <meta property="og:title" content="${escape(seo.title)}"/>
  <meta property="og:description" content="${escape(seo.description)}"/>
  <meta property="og:url" content="${seo.url}"/>
  <meta property="og:locale" content="${seo.ogLocale}"/>
  <meta property="og:locale:alternate" content="${locale === 'fr' ? 'en_US' : 'fr_FR'}"/>
  <meta property="og:image" content="${siteUrl}social-card.png"/>
  <meta property="og:image:width" content="1200"/>
  <meta property="og:image:height" content="630"/>
  <meta property="og:image:alt" content="Rémi Tilmant — Senior Full-Stack Engineer / Lead Developer"/>
  <meta name="twitter:card" content="summary_large_image"/>
  <meta name="twitter:title" content="${escape(seo.title)}"/>
  <meta name="twitter:description" content="${escape(seo.description)}"/>
  <meta name="twitter:image" content="${siteUrl}social-card.png"/>
  <meta name="twitter:image:alt" content="Rémi Tilmant — Senior Full-Stack Engineer / Lead Developer"/>
  <script type="application/ld+json">${JSON.stringify(personSchema(locale)).replaceAll('<', '\\u003c')}</script>`;
  const html = removeFallbackSeo(template)
    .replace('lang="fr"', `lang="${locale}"`)
    .replace('</head>', `${head}\n</head>`)
    .replace('<div id="root"></div>', `<div id="root">${render(locale)}</div>`);
  const path = locale === 'en' ? 'dist/en/index.html' : 'dist/index.html';
  if (locale === 'en') await mkdir('dist/en', { recursive: true });
  await writeFile(path, html);
}
await writeFile(
  'dist/sitemap.xml',
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${[
    'fr',
    'en',
  ]
    .map(
      (locale) => `
 <url><loc>${languageUrl(locale)}</loc><xhtml:link rel="alternate" hreflang="fr" href="${languageUrl('fr')}"/><xhtml:link rel="alternate" hreflang="en" href="${languageUrl('en')}"/><xhtml:link rel="alternate" hreflang="x-default" href="${siteUrl}"/></url>`,
    )
    .join('')}
</urlset>\n`,
);
await rm('.prerender', { recursive: true });
console.log('Prerendered FR/EN HTML, metadata, Person schema and sitemap.');
