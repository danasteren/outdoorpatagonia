export type ClimbingStyle = "deportiva" | "alpinismo" | "boulder"

export type Equipment = "parabolt" | "spits" | "mixto" | "natural" | "hielo"

export type Route = {
  nombre: string
  grado: string        // French scale: 3a … 9b+; alpine: "6a M5 AI4"
  largo: string        // "20 m", "700 m", "6 largos"
  estilo: ClimbingStyle
  equipamiento?: Equipment
  firstAscent?: string // "Comesaña-Fonrouge, 1965"
  descripcion?: string
}

export type Subarea = {
  nombre: string
  descripcion?: string
  orientacion?: string // "N", "SO", "E", etc.
  rutas: Route[]
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
  altitud: number
  descripcion: string
  acceso: string
  camping: string | null
  permisos: string | null
  subareas: Subarea[]
  rutasIconicas: { nombre: string; grado: string; estilo: ClimbingStyle }[]
  totalViasEstimado: number | null
  imagenUrl: string | null
}

export const ESTILO_LABELS: Record<ClimbingStyle, string> = {
  deportiva: "Deportiva",
  alpinismo: "Alpinismo",
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

export function gradeIndex(g: string): number {
  const first = g.split(" ")[0].replace("+", "+")
  const i = (FRENCH_GRADES as readonly string[]).indexOf(first)
  return i === -1 ? 999 : i
}

export function gradeColor(grado: string): string {
  const idx = gradeIndex(grado)
  if (idx <= gradeIndex("5c"))  return "text-emerald-700 dark:text-emerald-400"
  if (idx <= gradeIndex("6c+")) return "text-sky-700 dark:text-sky-400"
  if (idx <= gradeIndex("7c+")) return "text-orange-600 dark:text-orange-400"
  return "text-red-600 dark:text-red-400"
}

export function totalVias(s: Sector): number {
  const fromSubareas = s.subareas.reduce((acc, sub) => acc + sub.rutas.length, 0)
  if (fromSubareas > 0) return fromSubareas
  return s.totalViasEstimado ?? 0
}
