// Nivel de alerta SERNAGEOMIN RNVV
// Verde → sin actividad anómala
// Amarillo → intranquilidad menor/moderada
// Naranja → intranquilidad elevada, posible erupción
// Rojo → erupción en curso o inminente

export type NivelAlerta = "Verde" | "Amarillo" | "Naranja" | "Rojo"

export type Volcan = {
  nombre: string
  pais: "CL" | "AR" | "CL/AR"
  lat: number
  lng: number
  nivel: NivelAlerta | null
  descripcion: string | null
  fechaActualizacion: string | null
  urlFuente: string
}

// ─── Volcanes patagónicos de referencia (fallback cuando la API no responde) ──

const VOLCANES_PATAGONICOS: Omit<Volcan, "nivel" | "descripcion" | "fechaActualizacion">[] = [
  { nombre: "Copahue",          pais: "CL/AR", lat: -37.856, lng: -71.183, urlFuente: "https://rnvv.sernageomin.cl/rnvv/web/index.php?idVolcan=1" },
  { nombre: "Callaqui",         pais: "CL",    lat: -37.924, lng: -71.450, urlFuente: "https://rnvv.sernageomin.cl/rnvv/web/index.php?idVolcan=2" },
  { nombre: "Lonquimay",        pais: "CL",    lat: -38.379, lng: -71.586, urlFuente: "https://rnvv.sernageomin.cl/rnvv/web/index.php?idVolcan=3" },
  { nombre: "Llaima",           pais: "CL",    lat: -38.692, lng: -71.729, urlFuente: "https://rnvv.sernageomin.cl/rnvv/web/index.php?idVolcan=4" },
  { nombre: "Villarrica",       pais: "CL",    lat: -39.420, lng: -71.930, urlFuente: "https://rnvv.sernageomin.cl/rnvv/web/index.php?idVolcan=5" },
  { nombre: "Lanín",            pais: "CL/AR", lat: -39.638, lng: -71.503, urlFuente: "https://rnvv.sernageomin.cl/rnvv/web/index.php?idVolcan=6" },
  { nombre: "Mocho-Choshuenco", pais: "CL",    lat: -39.932, lng: -72.032, urlFuente: "https://rnvv.sernageomin.cl/rnvv/web/index.php?idVolcan=7" },
  { nombre: "Osorno",           pais: "CL",    lat: -41.100, lng: -72.493, urlFuente: "https://rnvv.sernageomin.cl/rnvv/web/index.php?idVolcan=8" },
  { nombre: "Calbuco",          pais: "CL",    lat: -41.330, lng: -72.614, urlFuente: "https://rnvv.sernageomin.cl/rnvv/web/index.php?idVolcan=9" },
  { nombre: "Chaitén",          pais: "CL",    lat: -42.833, lng: -72.646, urlFuente: "https://rnvv.sernageomin.cl/rnvv/web/index.php?idVolcan=10" },
  { nombre: "Michinmahuida",    pais: "CL",    lat: -43.299, lng: -72.440, urlFuente: "https://rnvv.sernageomin.cl/rnvv/web/index.php?idVolcan=11" },
  { nombre: "Hudson",           pais: "CL",    lat: -45.900, lng: -72.970, urlFuente: "https://rnvv.sernageomin.cl/rnvv/web/index.php?idVolcan=12" },
]

function toFallback(): Volcan[] {
  return VOLCANES_PATAGONICOS.map((v) => ({
    ...v,
    nivel: null,
    descripcion: null,
    fechaActualizacion: null,
  }))
}

// ─── API response shape (SERNAGEOMIN RNVV JSON) ───────────────────────────────

type RNVVVolcan = {
  nombre?: string
  nombreVolcan?: string
  nivel_alerta?: string
  nivelAlerta?: string
  descripcion?: string
  fecha?: string
  fechaActualizacion?: string
  latitud?: number
  lat?: number
  longitud?: number
  lng?: number
}

function normalizeNivel(raw: string | undefined): NivelAlerta | null {
  if (!raw) return null
  const s = raw.trim().toLowerCase()
  if (s.includes("verde"))    return "Verde"
  if (s.includes("amarillo")) return "Amarillo"
  if (s.includes("naranja"))  return "Naranja"
  if (s.includes("rojo"))     return "Rojo"
  return null
}

function parseRNVV(json: unknown): Volcan[] {
  const arr: RNVVVolcan[] = Array.isArray(json)
    ? json
    : (json as { volcanes?: RNVVVolcan[]; data?: RNVVVolcan[] })?.volcanes ??
      (json as { data?: RNVVVolcan[] })?.data ??
      []

  if (!arr.length) return []

  return VOLCANES_PATAGONICOS.map((ref) => {
    const match = arr.find((v) => {
      const n = (v.nombre ?? v.nombreVolcan ?? "").toLowerCase()
      return n.includes(ref.nombre.toLowerCase().split("-")[0].toLowerCase())
    })
    return {
      ...ref,
      nivel: match ? normalizeNivel(match.nivel_alerta ?? match.nivelAlerta) : null,
      descripcion: match?.descripcion ?? null,
      fechaActualizacion: match?.fecha ?? match?.fechaActualizacion ?? null,
    }
  })
}

// ─── Main export ──────────────────────────────────────────────────────────────

export async function fetchVolcanes(): Promise<Volcan[]> {
  try {
    const signal = AbortSignal.timeout(8000)
    const res = await fetch("https://rnvv.sernageomin.cl/rnvv/web/services/getReporteAll.php", {
      signal,
      next: { revalidate: 86400 },
    })
    if (!res.ok) return toFallback()
    const json: unknown = await res.json()
    const parsed = parseRNVV(json)
    return parsed.length > 0 ? parsed : toFallback()
  } catch {
    return toFallback()
  }
}
