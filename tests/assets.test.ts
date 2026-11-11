import { test } from 'node:test';
import assert from 'node:assert/strict';
import { assetUrl } from '../src/utils/assets.ts';

test('public project images remain inside the GitHub Pages subdirectory', () => {
  assert.equal(assetUrl('projects/example.webp', '/portofolio/'), '/portofolio/projects/example.webp');
  assert.equal(assetUrl('/projects/example.webp', '/portofolio/'), '/portofolio/projects/example.webp');
  assert.equal(assetUrl('/portofolio/projects/example.webp', '/portofolio/'), '/portofolio/projects/example.webp');
});

test('external project images are preserved', () => {
  assert.equal(assetUrl('https://example.com/image.webp', '/portofolio/'), 'https://example.com/image.webp');
  assert.equal(assetUrl('//example.com/image.webp', '/portofolio/'), '//example.com/image.webp');
});
