/** Narrow native select values against the explicit options used to render them. */
export function isOptionValue<const Options extends readonly string[]>(
  options: Options,
  value: string,
): value is Options[number] {
  return options.some((option) => option === value);
}
