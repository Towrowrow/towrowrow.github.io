import assert from 'node:assert/strict';
import { test } from 'node:test';

import { assetUrl } from '../src/utils/assets.ts';

test('public project images remain inside the GitHub Pages site root', () => {
  assert.equal(assetUrl('projects/example.webp', '/'), '/projects/example.webp');
  assert.equal(assetUrl('/projects/example.webp', '/'), '/projects/example.webp');
});

test('subdirectory assets are not double-prefixed', () => {
  assert.equal(
    assetUrl('projects/example.webp', '/portfolio/'),
    '/portfolio/projects/example.webp',
  );
  assert.equal(
    assetUrl('/portfolio/projects/example.webp', '/portfolio/'),
    '/portfolio/projects/example.webp',
  );
});

test('external project images are preserved', () => {
  assert.equal(assetUrl('https://example.com/image.webp', '/'), 'https://example.com/image.webp');
  assert.equal(assetUrl('//example.com/image.webp', '/'), '//example.com/image.webp');
});
