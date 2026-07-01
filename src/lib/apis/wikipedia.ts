// Lead image from a Spanish Wikipedia article — used as a real landscape
// photo for park heroes. Some articles fall back to a generic locator map
// when the infobox has no photo, so those are filtered out.

const GENERIC_IMAGE_PATTERN = /location_map|locator|topographic/i

export type WikipediaImage = {
  url: string
  pageUrl: string
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
    return { url: imageUrl, pageUrl: pageUrl ?? `https://es.wikipedia.org/wiki/${encoded}` }
  } catch {
    return null
  }
}
