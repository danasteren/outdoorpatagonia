// Nivel de alerta SERNAGEOMIN RNVV
// Verde → sin actividad anómala
// Amarillo → intranquilidad menor/moderada
// Naranja → intranquilidad elevada, posible erupción
// Rojo → erupción en curso o inminente
//
// El servidor rnvv.sernageomin.cl fue atacado en dic 2025 y permanece caído.
// Fuente alternativa: API WordPress de www.sernageomin.cl — publican un post por
// cada cambio de nivel de alerta. Si no hay post reciente = sin alertas activas.

import { VOLCANES_CATALOG } from "@/lib/volcanes/catalog"

export type NivelAlerta = "Verde" | "Amarillo" | "Naranja" | "Rojo"

export type Volcan = {
  nombre: string
  slug: string
  pais: "CL" | "AR" | "CL/AR"
  lat: number
  lng: number
  nivel: NivelAlerta
  nivelVerificado: boolean
  fechaPost: string | null
  urlFuente: string
  thumbnailUrl: string | null
}

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

function postMenciona(titulo: string, volcanNombre: string): boolean {
  const t = titulo.toLowerCase()
  return volcanNombre
    .toLowerCase()
    .split(/[-\s]+/)
    .filter((w) => w.length >= 4)
    .some((w) => t.includes(w))
}

// ─── Wikipedia thumbnails (un solo fetch batch) ───────────────────────────────

type WPMediaPage = { thumbnail?: { source: string }; title: string }
type WPMediaResponse = { query: { pages: Record<string, WPMediaPage> } }

async function fetchWikipediaThumbnails(
  titles: string[]
): Promise<Map<string, string>> {
  const map = new Map<string, string>()
  try {
    const joined = titles.map((t) => encodeURIComponent(t)).join("|")
    const url =
      `https://es.wikipedia.org/w/api.php` +
      `?action=query&titles=${joined}&prop=pageimages&pithumbsize=120` +
      `&format=json&redirects=1&origin=*`
    const res = await fetch(url, {
      headers: { "User-Agent": "OutdoorPatagonia/1.0 (https://outdoorpatagonia.com)" },
      next: { revalidate: 86400 },
    })
    if (!res.ok) return map
    const data: WPMediaResponse = await res.json()
    for (const page of Object.values(data.query?.pages ?? {})) {
      if (page.thumbnail?.source) map.set(page.title, page.thumbnail.source)
    }
  } catch {
    // thumbnails son decorativos — no bloquear si falla
  }
  return map
}

// ─── Fetch desde WP API de SERNAGEOMIN ───────────────────────────────────────

export async function fetchVolcanes(): Promise<Volcan[]> {
  const bases = VOLCANES_CATALOG.map((v) => ({
    nombre: v.nombre,
    slug: v.slug,
    pais: v.pais,
    lat: v.lat,
    lng: v.lng,
    urlFuente: v.urlFuente,
    wikipediaTitle: v.wikipediaTitle ?? `Volcán ${v.nombre}`,
  }))

  const wpTitles = bases.map((b) => b.wikipediaTitle)

  const [sernageominResult, thumbnailMap] = await Promise.allSettled([
    fetch(
      "https://www.sernageomin.cl/wp-json/wp/v2/posts" +
        "?search=alerta+volcan&per_page=100&_fields=title,date&orderby=date&order=desc",
      { next: { revalidate: 86400 } }
    ),
    fetchWikipediaThumbnails(wpTitles),
  ])

  const thumbs: Map<string, string> =
    thumbnailMap.status === "fulfilled" ? thumbnailMap.value : new Map()

  const toDefault = (base: typeof bases[number]): Volcan => ({
    nombre: base.nombre,
    slug: base.slug,
    pais: base.pais,
    lat: base.lat,
    lng: base.lng,
    nivel: "Verde",
    nivelVerificado: false,
    fechaPost: null,
    urlFuente: base.urlFuente,
    thumbnailUrl: thumbs.get(base.wikipediaTitle) ?? null,
  })

  try {
    if (sernageominResult.status !== "fulfilled" || !sernageominResult.value.ok)
      return bases.map(toDefault)

    const posts: WPPost[] = await sernageominResult.value.json()
    if (!Array.isArray(posts) || posts.length === 0) return bases.map(toDefault)

    return bases.map((base) => {
      const thumb = thumbs.get(base.wikipediaTitle) ?? null
      for (const post of posts) {
        const titulo = post.title?.rendered ?? ""
        if (!postMenciona(titulo, base.nombre)) continue
        const nivel = nivelDePost(titulo)
        if (!nivel) continue
        return {
          nombre: base.nombre,
          slug: base.slug,
          pais: base.pais,
          lat: base.lat,
          lng: base.lng,
          nivel,
          nivelVerificado: true,
          fechaPost: post.date?.slice(0, 10) ?? null,
          urlFuente: base.urlFuente,
          thumbnailUrl: thumb,
        }
      }
      return toDefault(base)
    })
  } catch {
    return bases.map(toDefault)
  }
}
