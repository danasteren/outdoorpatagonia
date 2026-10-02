// Artículos viejos (migrados de WordPress) que pasan a vivir dentro de una guía de destino.
// Clave: ruta vieja exacta. Valor: guía nueva. proxy.ts responde 301 y sitemap.ts los excluye,
// así Google concentra todo en la guía en vez de tener dos páginas compitiendo.
// Sin imports a propósito: lo carga proxy.ts en cada request.
export const LEGACY_TO_GUIDE: Record<string, string> = {
  // "/lugares/bariloche-argentina": "/destinos/bariloche",
  // "/en/destinations/bariloche-travel-guide": "/en/guides/bariloche",
}
