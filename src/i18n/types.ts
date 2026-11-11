/** Preserve translation keys and tuple lengths while allowing translated strings. */
export type TranslationShape<T> = T extends string
  ? string
  : { readonly [Key in keyof T]: TranslationShape<T[Key]> };
