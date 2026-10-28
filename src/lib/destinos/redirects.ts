// Artículos viejos (migrados de WordPress) que pasan a vivir dentro de una guía de destino.
// Clave: ruta vieja exacta. Valor: guía nueva. proxy.ts responde 301 y sitemap.ts los excluye,
// así Google concentra todo en la guía en vez de tener dos páginas compitiendo.
// Cada guía con artículos viejos tiene su archivo en ./legacy/<slug>.ts; el mapa lo arma
// scripts/gen-destinos.mjs. Sin contenido de las guías a propósito: lo carga proxy.ts en cada request.
export { LEGACY_TO_GUIDE } from "@/lib/destinos/legacy.generated"
