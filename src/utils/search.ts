/** Minúsculas y sin acentos, para que "cafe" encuentre "Café". */
export function normalizeText(text: string) {
  return text
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
}

/**
 * Verdadero si todas las palabras de `query` aparecen en alguno de los
 * `fields`. Una búsqueda vacía coincide con todo.
 */
export function matchesSearch(
  query: string,
  fields: readonly (string | null | undefined)[],
) {
  const terms = normalizeText(query).split(/\s+/).filter(Boolean)
  if (terms.length === 0) return true
  const haystack = normalizeText(fields.filter(Boolean).join(' '))
  return terms.every((term) => haystack.includes(term))
}
