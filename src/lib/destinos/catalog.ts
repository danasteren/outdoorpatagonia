import type { DestinoEntry } from "@/lib/destinos/types"
import { GUIAS } from "@/lib/destinos/guias.generated"

export type { DestinoContent, DestinoEntry, DestinoLang } from "@/lib/destinos/types"

// Guías de viaje por destino, en español e inglés.
// Prioridad de destinos y búsquedas que cubrir: seo/destinos-prioridad.md.
// Cada dato tiene que salir de una fuente oficial listada en `fuentes` — nunca estimar ni inventar.
//
// Una guía = un archivo en ./guias/<slug>.ts. No hay lista editada a mano: scripts/gen-destinos.mjs
// arma guias.generated.ts (no se versiona) antes de `dev` y `build`. Así dos guías nuevas en PR
// distintos nunca tocan el mismo archivo.

export const DESTINOS_CATALOG: DestinoEntry[] = [...GUIAS].sort(
  (a, b) => a.prioridad - b.prioridad || a.slug.localeCompare(b.slug),
)

export function getDestinoEntry(slug: string): DestinoEntry | undefined {
  return DESTINOS_CATALOG.find((d) => d.slug === slug)
}
