// Nivel de alerta SERNAGEOMIN RNVV
// Verde → sin actividad anómala
// Amarillo → intranquilidad menor/moderada
// Naranja → intranquilidad elevada, posible erupción
// Rojo → erupción en curso o inminente
//
// El servidor rnvv.sernageomin.cl fue atacado en dic 2025 y permanece caído.
// Fuente alternativa: API WordPress de www.sernageomin.cl — publican un post por
// cada cambio de nivel de alerta. Si no hay post reciente = sin alertas activas.

export type NivelAlerta = "Verde" | "Amarillo" | "Naranja" | "Rojo"

export type Volcan = {
  nombre: string
  pais: "CL" | "AR" | "CL/AR"
  lat: number
  lng: number
  nivel: NivelAlerta
  // true = nivel extraído de un post de SERNAGEOMIN con fecha
  // false = Verde por defecto (sin alertas recientes publicadas)
  nivelVerificado: boolean
  fechaPost: string | null   // ISO fecha del post de referencia
  urlFuente: string
}

// ─── Volcanes patagónicos ─────────────────────────────────────────────────────

type VolcanBase = Omit<Volcan, "nivel" | "nivelVerificado" | "fechaPost">

const VOLCANES_PATAGONICOS: VolcanBase[] = [
  { nombre: "Copahue",          pais: "CL/AR", lat: -37.856, lng: -71.183, urlFuente: "https://www.sernageomin.cl/?s=Copahue+alerta" },
  { nombre: "Callaqui",         pais: "CL",    lat: -37.924, lng: -71.450, urlFuente: "https://www.sernageomin.cl/?s=Callaqui+alerta" },
  { nombre: "Lonquimay",        pais: "CL",    lat: -38.379, lng: -71.586, urlFuente: "https://www.sernageomin.cl/?s=Lonquimay+alerta" },
  { nombre: "Llaima",           pais: "CL",    lat: -38.692, lng: -71.729, urlFuente: "https://www.sernageomin.cl/?s=Llaima+alerta" },
  { nombre: "Villarrica",       pais: "CL",    lat: -39.420, lng: -71.930, urlFuente: "https://www.sernageomin.cl/?s=Villarrica+alerta" },
  { nombre: "Lanín",            pais: "CL/AR", lat: -39.638, lng: -71.503, urlFuente: "https://www.sernageomin.cl/?s=Lan%C3%ADn+alerta" },
  { nombre: "Mocho-Choshuenco", pais: "CL",    lat: -39.932, lng: -72.032, urlFuente: "https://www.sernageomin.cl/?s=Mocho+alerta" },
  { nombre: "Osorno",           pais: "CL",    lat: -41.100, lng: -72.493, urlFuente: "https://www.sernageomin.cl/?s=Osorno+alerta" },
  { nombre: "Calbuco",          pais: "CL",    lat: -41.330, lng: -72.614, urlFuente: "https://www.sernageomin.cl/?s=Calbuco+alerta" },
  { nombre: "Chaitén",          pais: "CL",    lat: -42.833, lng: -72.646, urlFuente: "https://www.sernageomin.cl/?s=Chaiten+alerta" },
  { nombre: "Michinmahuida",    pais: "CL",    lat: -43.299, lng: -72.440, urlFuente: "https://www.sernageomin.cl/?s=Michinmahuida+alerta" },
  { nombre: "Hudson",           pais: "CL",    lat: -45.900, lng: -72.970, urlFuente: "https://www.sernageomin.cl/?s=Hudson+alerta" },
]

// ─── WP API parser ────────────────────────────────────────────────────────────

type WPPost = { title: { rendered: string }; date: string }

// Extrae nivel de alerta del título de un post.
// SERNAGEOMIN usa la forma femenina "amarilla/roja" en sus comunicados,
// por eso se compara por prefijo (amari- = amarillo/amarilla, etc.)
function nivelDePost(titulo: string): NivelAlerta | null {
  const t = titulo.toLowerCase()
  if (t.includes("roj"))   return "Rojo"
  if (t.includes("naran")) return "Naranja"
  if (t.includes("amari")) return "Amarillo"
  if (t.includes("verde")) return "Verde"
  return null
}

// Devuelve true si el título del post menciona este volcán
function postMenciona(titulo: string, volcanNombre: string): boolean {
  const t = titulo.toLowerCase()
  // Cada palabra del nombre (split por guión o espacio) con mínimo 4 chars
  return volcanNombre
    .toLowerCase()
    .split(/[-\s]+/)
    .filter((w) => w.length >= 4)
    .some((w) => t.includes(w))
}

function toVerdeDefault(base: VolcanBase): Volcan {
  return { ...base, nivel: "Verde", nivelVerificado: false, fechaPost: null }
}

// ─── Fetch desde WP API de SERNAGEOMIN ───────────────────────────────────────

export async function fetchVolcanes(): Promise<Volcan[]> {
  try {
    // Buscamos todos los posts con "alerta" en el título — SERNAGEOMIN publica
    // un comunicado por cada cambio de nivel volcánico.
    const url =
      "https://www.sernageomin.cl/wp-json/wp/v2/posts" +
      "?search=alerta+volcan&per_page=100&_fields=title,date&orderby=date&order=desc"

    const res = await fetch(url, { next: { revalidate: 86400 } })
    if (!res.ok) return VOLCANES_PATAGONICOS.map(toVerdeDefault)

    const posts: WPPost[] = await res.json()
    if (!Array.isArray(posts) || posts.length === 0)
      return VOLCANES_PATAGONICOS.map(toVerdeDefault)

    // Para cada volcán: buscar el post más reciente que lo mencione con un nivel
    return VOLCANES_PATAGONICOS.map((base) => {
      for (const post of posts) {
        const titulo = post.title?.rendered ?? ""
        if (!postMenciona(titulo, base.nombre)) continue
        const nivel = nivelDePost(titulo)
        if (!nivel) continue
        return {
          ...base,
          nivel,
          nivelVerificado: true,
          fechaPost: post.date?.slice(0, 10) ?? null,
        }
      }
      // Sin post reciente → Verde por defecto (sin alertas activas publicadas)
      return toVerdeDefault(base)
    })
  } catch {
    return VOLCANES_PATAGONICOS.map(toVerdeDefault)
  }
}
