// Lead image from a Spanish Wikipedia article — used as a real landscape
// photo for park heroes. Some articles fall back to a generic locator map
// when the infobox has no photo, so those are filtered out.

const GENERIC_IMAGE_PATTERN = /location_map|locator|topographic/i

export type WikipediaImage = {
  url: string
  pageUrl: string
  /** Ancho del original, si la API lo informa. */
  width?: number
}

// Miniatura de Wikimedia de un ancho estándar (960, 1280, 1920…), para no
// bajar el original entero. Si el original es más chico o la URL no es de
// Wikimedia Commons, devuelve el original.
export function wikipediaImageAt(image: WikipediaImage, width: number): string {
  if (!image.width || image.width <= width) return image.url
  const m = image.url.match(/^https:\/\/(?:upload|thumb)\.wikimedia\.org\/wikipedia\/commons\/(?:thumb\/)?([0-9a-f]\/[0-9a-f]{2})\/([^/?]+)/)
  if (!m) return image.url
  return `https://upload.wikimedia.org/wikipedia/commons/thumb/${m[1]}/${m[2]}/${width}px-${m[2]}`
}

export async function fetchWikipediaLeadImage(
  title: string
): Promise<WikipediaImage | null> {
  const encoded = encodeURIComponent(title.replace(/ /g, "_"))
  const url = `https://es.wikipedia.org/api/rest_v1/page/summary/${encoded}`

  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent": "OutdoorPatagonia/1.0 (https://outdoorpatagonia.com)",
      },
      next: { revalidate: 86400 },
    })
    if (!res.ok) return null

    const data = await res.json()
    const imageUrl: string | undefined = data.originalimage?.source ?? data.thumbnail?.source
    if (!imageUrl || GENERIC_IMAGE_PATTERN.test(imageUrl)) return null

    const pageUrl: string | undefined = data.content_urls?.desktop?.page
    return {
      url: imageUrl,
      pageUrl: pageUrl ?? `https://es.wikipedia.org/wiki/${encoded}`,
      width: data.originalimage?.width,
    }
  } catch {
    return null
  }
}
