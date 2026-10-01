import type { Metadata } from "next"
import { getDestinoEntry, type DestinoEntry, type DestinoLang } from "@/lib/destinos/catalog"
import { fetchClimateNormals } from "@/lib/apis/climate"
import { fetchWeatherForLocation } from "@/lib/apis/openmeteo"
import { fetchWikipediaLeadImage } from "@/lib/apis/wikipedia"
import { destinoUrl } from "@/components/destinos/DestinoGuide"

// Lógica compartida por /destinos/[slug] (es) y /en/guides/[slug] (en).

export function buildDestinoMetadata(slug: string, lang: DestinoLang): Metadata {
  const entry = getDestinoEntry(slug)
  if (!entry) return {}
  const c = entry[lang]
  const url = destinoUrl(slug, lang)
  return {
    title: c.metaTitle,
    description: c.metaDescription,
    alternates: {
      canonical: url,
      languages: {
        es: destinoUrl(slug, "es"),
        en: destinoUrl(slug, "en"),
        "x-default": destinoUrl(slug, "es"),
      },
    },
    openGraph: {
      title: c.metaTitle,
      description: c.metaDescription,
      url,
      type: "article",
      locale: lang === "es" ? "es_AR" : "en_US",
    },
    twitter: { card: "summary_large_image" },
  }
}

export async function loadDestinoData(entry: DestinoEntry) {
  const [image, climate, weather] = await Promise.all([
    entry.wikipediaTitle ? fetchWikipediaLeadImage(entry.wikipediaTitle) : Promise.resolve(null),
    fetchClimateNormals(entry.lat, entry.lng),
    fetchWeatherForLocation(entry.lat, entry.lng, entry.nombre),
  ])
  return { image, climate, weather }
}
