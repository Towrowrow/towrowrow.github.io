import { test } from 'node:test';
import assert from 'node:assert/strict';
import { assetUrl } from '../src/utils/assets.ts';

test('public project images remain inside the GitHub Pages subdirectory', () => {
  assert.equal(assetUrl('projects/example.webp', '/PORTOFOLIO/'), '/PORTOFOLIO/projects/example.webp');
  assert.equal(assetUrl('/projects/example.webp', '/PORTOFOLIO/'), '/PORTOFOLIO/projects/example.webp');
  assert.equal(assetUrl('/PORTOFOLIO/projects/example.webp', '/PORTOFOLIO/'), '/PORTOFOLIO/projects/example.webp');
});

test('external project images are preserved', () => {
  assert.equal(assetUrl('https://example.com/image.webp', '/PORTOFOLIO/'), 'https://example.com/image.webp');
  assert.equal(assetUrl('//example.com/image.webp', '/PORTOFOLIO/'), '//example.com/image.webp');
});
