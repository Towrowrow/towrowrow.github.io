/** Remove fallback SEO regardless of source formatting before inserting locale metadata. */
export function removeFallbackSeo(template) {
  return template
    .replace(/\s*<title>.*?<\/title>/s, '')
    .replace(/<meta\s+name="description"[^>]*>/g, '')
    .replace(/<meta\s+property="og:[^>]*>/g, '')
    .replace(/<link\s+rel="canonical"[^>]*>/g, '');
}
