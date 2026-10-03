export type ClimbingStyle = "deportiva" | "clasica" | "boulder"

export type Equipment = "parabolt" | "spits" | "mixto" | "natural" | "hielo"

export type Desplome = "aplomada" | "vertical" | "desplomada"

export type Route = {
  numero?: number      // número de la vía en el croquis de la guía de origen
  nombre: string
  grado: string        // French scale: 3a … 9b+; alpine: "6a M5 AI4"; guías locales: "5+", "8?"
  largo: string        // "20 m", "700 m", "6 largos"
  estilo: ClimbingStyle
  equipamiento?: Equipment
  firstAscent?: string // "Comesaña-Fonrouge, 1965"
  descripcion?: string
  chapas?: string      // tal cual la guía de origen: "5+2" (chapas + reunión)
  desplome?: Desplome
  recomendada?: boolean
  aleje?: boolean      // aleje entre chapas ("R" en las guías)
}

export type Subarea = {
  nombre: string
  zona?: string        // nombre de la Zona a la que pertenece (agrupa en la página)
  descripcion?: string
  orientacion?: string // "N", "SO", "E", etc.
  rutas: Route[]
}

// Zona = sector dentro de una localidad (ej: "La Crux" dentro de Esquel)
export type Zona = {
  nombre: string
  descripcion: string
  acceso: string
  advertencia?: string
  lat: number
  lon: number
}

// Guía de origen de los datos — se muestra con crédito y links en la página
export type Fuente = {
  nombre: string
  edicion: string       // "v1.1, 2021"
  creditos: string
  url: string
  descargaUrl?: string
  aportesUrl?: string
  instagram?: string
}

export type Sector = {
  slug: string
  nombre: string
  pais: "AR" | "CL"
  region: string
  lat: number
  lon: number
  tipoRoca: string[]
  estilos: ClimbingStyle[]
  gradosMin: string
  gradosMax: string
  temporada: string[]
  altitud: number | null
  descripcion: string
  acceso: string
  camping: string | null
  permisos: string | null
  subareas: Subarea[]
  rutasIconicas: { nombre: string; grado: string; estilo: ClimbingStyle }[]
  totalViasEstimado: number | null
  imagenUrl: string | null
  zonas?: Zona[]
  fuente?: Fuente
}

export const ESTILO_LABELS: Record<ClimbingStyle, string> = {
  deportiva: "Deportiva",
  clasica: "Clásica",
  boulder: "Boulder",
}

export const PAIS_LABELS: Record<"AR" | "CL", string> = {
  AR: "Argentina",
  CL: "Chile",
}

export const FRENCH_GRADES = [
  "3a","3b","3c",
  "4a","4b","4c",
  "5a","5b","5c",
  "6a","6a+","6b","6b+","6c","6c+",
  "7a","7a+","7b","7b+","7c","7c+",
  "8a","8a+","8b","8b+","8c","8c+",
  "9a","9a+","9b","9b+",
] as const

export type FrenchGrade = (typeof FRENCH_GRADES)[number]

// Grados sin letra que usan algunas guías locales ("5+", "8?") → equivalente para ordenar y filtrar
const GRADOS_SIN_LETRA: Record<string, string> = {
  "3": "3b", "3+": "3c",
  "4": "4b", "4+": "4c",
  "5": "5b", "5+": "5c",
  "6": "6b", "7": "7b", "8": "8a", "9": "9a",
}

export function gradeIndex(g: string): number {
  const first = g.split(/[ |]/)[0].replace("?", "")
  const i = (FRENCH_GRADES as readonly string[]).indexOf(GRADOS_SIN_LETRA[first] ?? first)
  return i === -1 ? 999 : i
}

export function gradeColor(grado: string): string {
  const idx = gradeIndex(grado)
  if (idx <= gradeIndex("5c"))  return "text-emerald-700 dark:text-emerald-400"
  if (idx <= gradeIndex("6c+")) return "text-sky-700 dark:text-sky-400"
  if (idx <= gradeIndex("7c+")) return "text-orange-600 dark:text-orange-400"
  return "text-red-600 dark:text-red-400"
}

export const DESPLOME_LABELS: Record<Desplome, string> = {
  aplomada: "Aplomada",
  vertical: "Vertical",
  desplomada: "Desplomada",
}

export type GradeBucket = { grado: string; count: number; nivel: 0 | 1 | 2 | 3 }

/** Cantidad de vías por grado, ordenadas de fácil a difícil (para el histograma). */
export function gradeBuckets(rutas: Route[]): GradeBucket[] {
  const counts = new Map<string, number>()
  for (const r of rutas) {
    const grado = r.grado.split(/[ |]/)[0]
    counts.set(grado, (counts.get(grado) ?? 0) + 1)
  }
  return [...counts.entries()]
    .sort(([a], [b]) => gradeIndex(a) - gradeIndex(b))
    .map(([grado, count]) => {
      const idx = gradeIndex(grado)
      const nivel = idx <= gradeIndex("5c") ? 0 : idx <= gradeIndex("6c+") ? 1 : idx <= gradeIndex("7c+") ? 2 : 3
      return { grado, count, nivel }
    })
}

export function totalVias(s: Sector): number {
  const fromSubareas = s.subareas.reduce((acc, sub) => acc + sub.rutas.length, 0)
  if (fromSubareas > 0) return fromSubareas
  return s.totalViasEstimado ?? 0
}
