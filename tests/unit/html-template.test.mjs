import assert from 'node:assert/strict';
import { test } from 'node:test';

import { removeFallbackSeo } from '../../scripts/html-template.mjs';

test('SEO replacement accepts formatted multiline metadata and preserves non-SEO tags', () => {
  const template = `<head>
    <title>Fallback</title>
    <meta\n name="description"\n content="Fallback description" />
    <meta property="og:title" content="Fallback title"/>
    <meta\n property="og:description" content="Fallback description" />
    <link\n rel="canonical" href="https://example.com/"/>
    <meta name="viewport" content="width=device-width"/>
    <link rel="icon" href="/favicon.svg"/>
  </head>`;
  const cleaned = removeFallbackSeo(template);
  assert.ok(!cleaned.includes('Fallback'));
  assert.ok(!cleaned.includes('canonical'));
  assert.ok(cleaned.includes('name="viewport"'));
  assert.ok(cleaned.includes('href="/favicon.svg"'));
});
