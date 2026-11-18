/** Convierte una ruta de `public/` (p. ej. "/catalogo/logos/kundera.png") en una URL válida. */
export function assetUrl(path: string) {
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`
}
