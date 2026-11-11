/** Resolve configured public assets under Vite's base; preserve external URLs. */
export function assetUrl(path: string, base: string): string {
  if (/^(?:[a-z][a-z\d+.-]*:|\/\/)/i.test(path) || path.startsWith(base)) return path;
  return `${base}${path.replace(/^\/+/, '')}`;
}
