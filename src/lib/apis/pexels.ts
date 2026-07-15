// Real food photos from Pexels — used when there's no own photo and no good
// Wikipedia lead image. Requires PEXELS_API_KEY; returns null (never throws)
// if the key is missing or the request fails, so callers fall back cleanly.

export type PexelsPhoto = {
  url: string
  photographer: string
  pageUrl: string
}

export async function fetchPexelsPhoto(query: string): Promise<PexelsPhoto | null> {
  const apiKey = process.env.PEXELS_API_KEY
  if (!apiKey) return null

  try {
    const res = await fetch(
      `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=1&orientation=landscape`,
      {
        headers: { Authorization: apiKey },
        next: { revalidate: 86400 },
      }
    )
    if (!res.ok) return null

    const data = await res.json()
    const photo = data.photos?.[0]
    if (!photo) return null

    return {
      url: photo.src?.large2x ?? photo.src?.large,
      photographer: photo.photographer,
      pageUrl: photo.url,
    }
  } catch {
    return null
  }
}
