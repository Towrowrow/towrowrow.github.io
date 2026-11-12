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
    for (const lab of ['decisions', 'architecture', 'playground', 'agents']) {
      assert.ok(
        content.includes(`data-technical="${lab}"`),
        `${lab} technical reading is prerendered`,
      );
    }
    assert.ok(!content.includes('class="lab-guide-context"'));
    const playground = content.match(/<section id="playground"[\s\S]*?<\/section>/)[0];
    const primaryReading = playground.replace(/<details\b[\s\S]*?<\/details>/g, '');
    assert.ok(!/If-Match|intentId|\b409\b|\b422\b|<pre\b|<code\b/.test(primaryReading));
    assert.ok(playground.includes('If-Match'), 'advanced contracts remain available');
    assert.ok(primaryReading.includes('save-explanation'));
    for (const tag of content.matchAll(/<details class="story-technical"[^>]*>/g)) {
      assert.ok(!/\bopen(?:\s|=|>)/.test(tag[0]), 'technical detail starts closed');
    }
    for (const file of [
      'favicon.ico',
      'favicon-96x96.png',
      'favicon.svg',
      'apple-touch-icon.png',
    ]) {
      assert.ok(html.includes(`href="/${file}"`), `${file} resolves from either language URL`);
      await readFile(`dist/${file}`);
    }
    assert.ok(html.includes('sizes="96x96"'));
    assert.ok(html.includes('rel="apple-touch-icon"'));
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

test('Google verification and source assets survive the production build unchanged', async () => {
  for (const file of [
    'googleebb7b16e89457299.html',
    'favicon.svg',
    'favicon.ico',
    'favicon-16x16.png',
    'favicon-32x32.png',
    'favicon-48x48.png',
    'favicon-96x96.png',
    'apple-touch-icon.png',
  ]) {
    assert.deepEqual(await readFile(`dist/${file}`), await readFile(`public/${file}`));
  }
});
