import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { test } from 'node:test';

for (const [locale, file, url] of [
  ['fr', 'dist/index.html', 'https://towrowrow.github.io/'],
  ['en', 'dist/en/index.html', 'https://towrowrow.github.io/en/'],
]) {
  test(`built ${locale} page exposes content, identity, metadata and language links without JS`, async () => {
    const html = await readFile(file, 'utf8');
    assert.ok(html.includes(`lang="${locale}"`));
    assert.ok(html.includes(`<link rel="canonical" href="${url}"`));
    assert.equal((html.match(/<title>/g) ?? []).length, 1);
    assert.equal((html.match(/name="description"/g) ?? []).length, 1);
    assert.ok(!/noindex/i.test(html));
    for (const language of ['fr', 'en', 'x-default'])
      assert.ok(html.includes(`hreflang="${language}"`));
    assert.ok(html.includes('name="twitter:card" content="summary_large_image"'));
    assert.ok(html.includes('property="og:image"'));
    const schema = JSON.parse(
      html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)[1],
    );
    assert.equal(schema['@type'], 'Person');
    assert.equal(schema.name, 'Rémi Tilmant');
    assert.deepEqual(schema.sameAs, ['https://github.com/Towrowrow']);
    const content = html.split('<div id="root">')[1];
    for (const text of [
      'Rémi',
      'Tilmant',
      'React',
      'TypeScript',
      'Node.js',
      'Go',
      'towtowrow@gmail.com',
    ])
      assert.ok(content.includes(text), text);
    assert.ok(!content.includes('opacity:0'), 'static content must be visible');
    assert.equal((content.match(/<h1[ >]/g) ?? []).length, 1);
    for (const id of [
      'about',
      'decisions',
      'expertise',
      'architecture',
      'playground',
      'ai',
      'build',
      'contact',
    ])
      assert.ok(content.includes(`id="${id}"`), id);
    assert.ok(content.includes('/images/remi-tilmant.webp'));
    assert.ok(content.includes('<blockquote>'));
    assert.ok(!content.includes('id="projects"'));
  });
}
test('sitemap declares both canonical language URLs and robots permits crawling', async () => {
  const sitemap = await readFile('dist/sitemap.xml', 'utf8');
  assert.ok(sitemap.includes('<loc>https://towrowrow.github.io/</loc>'));
  assert.ok(sitemap.includes('<loc>https://towrowrow.github.io/en/</loc>'));
  const robots = await readFile('dist/robots.txt', 'utf8');
  assert.ok(robots.includes('Allow: /'));
  assert.ok(robots.includes('Sitemap: https://towrowrow.github.io/sitemap.xml'));
});
