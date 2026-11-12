import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { test } from 'node:test';

const pngSignature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

function pngDimensions(data) {
  assert.ok(data.subarray(0, 8).equals(pngSignature));
  assert.equal(data.toString('ascii', 12, 16), 'IHDR');
  return [data.readUInt32BE(16), data.readUInt32BE(20)];
}

test('favicon PNGs and Apple icon contain the advertised square dimensions', async () => {
  for (const size of [16, 32, 48, 96, 180]) {
    const file = size === 180 ? 'apple-touch-icon.png' : `favicon-${size}x${size}.png`;
    assert.deepEqual(pngDimensions(await readFile(`public/${file}`)), [size, size]);
  }
});

test('ICO contains distinct valid 16, 32 and 48 pixel images', async () => {
  const ico = await readFile('public/favicon.ico');
  assert.equal(ico.readUInt16LE(0), 0);
  assert.equal(ico.readUInt16LE(2), 1);
  assert.equal(ico.readUInt16LE(4), 3);
  for (const [index, size] of [16, 32, 48].entries()) {
    const entry = 6 + index * 16;
    assert.equal(ico[entry], size);
    assert.equal(ico[entry + 1], size);
    const length = ico.readUInt32LE(entry + 8);
    const offset = ico.readUInt32LE(entry + 12);
    assert.ok(offset >= 54 && offset + length <= ico.length);
    assert.deepEqual(pngDimensions(ico.subarray(offset, offset + length)), [size, size]);
  }
});

test('SVG identity is standalone vector artwork without fonts or remote assets', async () => {
  const svg = await readFile('public/favicon.svg', 'utf8');
  assert.ok(svg.includes('viewBox="0 0 64 64"'));
  assert.ok(svg.includes('RT. — Rémi Tilmant'));
  assert.ok(!/<(?:text|image|script|foreignObject)\b/i.test(svg));
  assert.ok(!/(?:href|font-family)\s*=/i.test(svg));
});
