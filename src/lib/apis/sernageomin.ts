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

// Devuelve true si el título del post menciona este volcán
function postMenciona(titulo: string, volcanNombre: string): boolean {
  const t = titulo.toLowerCase()
  return volcanNombre
    .toLowerCase()
    .split(/[-\s]+/)
    .filter((w) => w.length >= 4)
    .some((w) => t.includes(w))
}

function toVerdeDefault(base: { nombre: string; slug: string; pais: "CL" | "AR" | "CL/AR"; lat: number; lng: number; urlFuente: string }): Volcan {
  return { ...base, nivel: "Verde", nivelVerificado: false, fechaPost: null }
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
  }))

  try {
    const url =
      "https://www.sernageomin.cl/wp-json/wp/v2/posts" +
      "?search=alerta+volcan&per_page=100&_fields=title,date&orderby=date&order=desc"

    const res = await fetch(url, { next: { revalidate: 86400 } })
    if (!res.ok) return bases.map(toVerdeDefault)

    const posts: WPPost[] = await res.json()
    if (!Array.isArray(posts) || posts.length === 0)
      return bases.map(toVerdeDefault)

    return bases.map((base) => {
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
      return toVerdeDefault(base)
    })
  } catch {
    return bases.map(toVerdeDefault)
  }
}
