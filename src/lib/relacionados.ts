// Cross-links entre catálogos estáticos (volcanes, parques, arqueología, escalada, termas).
// Ver AGENTS.md → "Ampliar contenido: entradas conectadas" para el workflow completo.

import { VOLCANES_CATALOG } from "@/lib/volcanes/catalog"
import { PARQUES_CATALOG } from "@/lib/parques/catalog"
import { ARQUEOLOGIA_CATALOG } from "@/lib/arqueologia/catalog"
import { ESCALADA_CATALOG } from "@/lib/escalada/catalog"
import { TERMAS_CATALOG } from "@/lib/termas/catalog"
import { GASTRONOMIA_CATALOG } from "@/lib/gastronomia/catalog"

export type RelacionadoTipo = "volcan" | "parque" | "arqueologia" | "escalada" | "termas" | "gastronomia"

export type Relacionado = {
  tipo: RelacionadoTipo
  slug: string
}

export type RelacionadoResuelto = {
  nombre: string
  href: string
  categoria: string
}

export function resolveRelacionado(r: Relacionado): RelacionadoResuelto | null {
  switch (r.tipo) {
    case "volcan": {
      const e = VOLCANES_CATALOG.find((v) => v.slug === r.slug)
      return e ? { nombre: `Volcán ${e.nombre}`, href: `/volcanes/${e.slug}`, categoria: "Volcán" } : null
    }
    case "parque": {
      const e = PARQUES_CATALOG.find((p) => p.slug === r.slug)
      return e ? { nombre: e.name, href: `/parques/${e.slug}`, categoria: "Parque nacional" } : null
    }
    case "arqueologia": {
      const e = ARQUEOLOGIA_CATALOG.find((a) => a.slug === r.slug)
      return e ? { nombre: e.nombre, href: `/arqueologia/${e.slug}`, categoria: "Arqueología" } : null
    }
    case "escalada": {
      const e = ESCALADA_CATALOG.find((s) => s.slug === r.slug)
      return e ? { nombre: e.nombre, href: `/escalada/${e.slug}`, categoria: "Escalada" } : null
    }
    case "termas": {
      const e = TERMAS_CATALOG.find((t) => t.slug === r.slug)
      return e ? { nombre: e.nombre, href: `/termas/${e.slug}`, categoria: "Termas" } : null
    }
    case "gastronomia": {
      const e = GASTRONOMIA_CATALOG.find((g) => g.slug === r.slug)
      return e ? { nombre: e.nombre, href: `/gastronomia/${e.slug}`, categoria: "Gastronomía" } : null
    }
    default:
      return null
  }
}

export function resolveRelacionados(items: Relacionado[] | undefined): RelacionadoResuelto[] {
  if (!items) return []
  return items
    .map(resolveRelacionado)
    .filter((r): r is RelacionadoResuelto => r !== null)
}
