// ─── Shared types ────────────────────────────────────────────────────────────

export type Sighting = {
  id: number
  speciesName: string
  commonName: string | null
  imageUrl: string | null
  placeGuess: string | null
  observedOn: string | null
  observerLogin: string
  uri: string
}

export type SightingWithCoords = Sighting & {
  latitude: number | null
  longitude: number | null
}

export type SpeciesDetail = {
  taxonId: number
  scientificName: string
  commonNameEs: string | null
  imageUrl: string | null
  largeImageUrl: string | null
  description: string | null
  wikipediaUrl: string | null
  conservationStatus: string | null
  conservationStatusCode: string | null
  rank: string
}

// ─── Internal iNaturalist API types ──────────────────────────────────────────

type INatTaxon = {
  name: string
  preferred_common_name?: string
  default_photo?: { square_url: string }
}

type INatObservation = {
  id: number
  species_guess: string | null
  taxon?: INatTaxon
  place_guess: string | null
  observed_on: string | null
  user: { login: string }
  uri: string
  location?: string
  photos?: Array<{ url: string }>
}

type INatResponse = {
  results: INatObservation[]
}

type INatPhoto = {
  square_url?: string
  medium_url?: string
  large_url?: string
  original_url?: string
}

type INatTaxonDetail = {
  id: number
  name: string
  rank: string
  preferred_common_name?: string
  wikipedia_url?: string
  wikipedia_summary?: string
  conservation_status?: {
    status: string
    status_name: string
  }
  taxon_photos?: Array<{ photo: INatPhoto }>
  default_photo?: INatPhoto
}

type INatTaxonResponse = {
  results: INatTaxonDetail[]
}

type INatHistogramResponse = {
  results: {
    month_of_year?: Record<string, number>
  }
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function daysAgo(n: number): string {
  const d = new Date()
  d.setDate(d.getDate() - n)
  return d.toISOString().split("T")[0]
}

// Patagonia bounding box (Argentine + Chilean)
const PATAGONIA_BBOX = {
  swlat: "-56",
  swlng: "-76",
  nelat: "-38",
  nelng: "-62",
}

// ─── Status board: recent fauna sightings ────────────────────────────────────

export async function fetchPatagoniaFauna(): Promise<Sighting[]> {
  const params = new URLSearchParams({
    ...PATAGONIA_BBOX,
    quality_grade: "research",
    per_page: "6",
    order: "desc",
    order_by: "created_at",
    d1: daysAgo(7),
    photos: "true",
    locale: "es",
  })
  const url = `https://api.inaturalist.org/v1/observations?${params}`
  const res = await fetch(url, { next: { revalidate: 3600 } })
  if (!res.ok) throw new Error("iNaturalist fetch failed")
  const data: INatResponse = await res.json()

  return data.results.map((obs) => ({
    id: obs.id,
    speciesName: obs.taxon?.name ?? obs.species_guess ?? "Especie desconocida",
    commonName: obs.taxon?.preferred_common_name ?? null,
    imageUrl: obs.taxon?.default_photo?.square_url ?? null,
    placeGuess: obs.place_guess,
    observedOn: obs.observed_on,
    observerLogin: obs.user.login,
    uri: obs.uri,
  }))
}

// ─── Species pages: taxon detail ─────────────────────────────────────────────

export async function fetchSpeciesDetail(
  taxonId: number
): Promise<SpeciesDetail | null> {
  const url = `https://api.inaturalist.org/v1/taxa/${taxonId}?locale=es`
  const res = await fetch(url, { next: { revalidate: 3600 } })
  if (!res.ok) return null
  const data: INatTaxonResponse = await res.json()
  const t = data.results[0]
  if (!t) return null

  const photo = t.taxon_photos?.[0]?.photo ?? t.default_photo
  return {
    taxonId: t.id,
    scientificName: t.name,
    commonNameEs: t.preferred_common_name ?? null,
    imageUrl: photo?.medium_url ?? photo?.square_url ?? null,
    largeImageUrl:
      photo?.original_url ?? photo?.large_url ?? photo?.medium_url ?? null,
    description: t.wikipedia_summary ?? null,
    wikipediaUrl: t.wikipedia_url ?? null,
    conservationStatus: t.conservation_status?.status_name ?? null,
    conservationStatusCode: t.conservation_status?.status ?? null,
    rank: t.rank,
  }
}

// Fallback: search by scientific name when taxon ID is unknown
export async function fetchSpeciesByName(
  scientificName: string
): Promise<SpeciesDetail | null> {
  const params = new URLSearchParams({
    q: scientificName,
    rank: "species",
    locale: "es",
    per_page: "1",
  })
  const url = `https://api.inaturalist.org/v1/taxa?${params}`
  const res = await fetch(url, { next: { revalidate: 3600 } })
  if (!res.ok) return null
  const data: INatTaxonResponse = await res.json()
  const t = data.results[0]
  if (!t) return null

  const photo = t.taxon_photos?.[0]?.photo ?? t.default_photo
  return {
    taxonId: t.id,
    scientificName: t.name,
    commonNameEs: t.preferred_common_name ?? null,
    imageUrl: photo?.medium_url ?? photo?.square_url ?? null,
    largeImageUrl:
      photo?.original_url ?? photo?.large_url ?? photo?.medium_url ?? null,
    description: t.wikipedia_summary ?? null,
    wikipediaUrl: t.wikipedia_url ?? null,
    conservationStatus: t.conservation_status?.status_name ?? null,
    conservationStatusCode: t.conservation_status?.status ?? null,
    rank: t.rank,
  }
}

// ─── Species pages: recent sightings in Patagonia with coords ────────────────

export async function fetchSpeciesSightingsPatagonia(
  taxonId: number,
  limit = 20
): Promise<SightingWithCoords[]> {
  const params = new URLSearchParams({
    taxon_id: String(taxonId),
    ...PATAGONIA_BBOX,
    quality_grade: "research",
    per_page: String(limit),
    order: "desc",
    order_by: "observed_on",
    photos: "true",
    locale: "es",
    geo: "true",
  })
  const url = `https://api.inaturalist.org/v1/observations?${params}`
  const res = await fetch(url, { next: { revalidate: 3600 } })
  if (!res.ok) return []
  const data: INatResponse = await res.json()

  return data.results.map((obs) => {
    const [lat, lng] = (obs.location ?? "").split(",").map(Number)
    return {
      id: obs.id,
      speciesName: obs.taxon?.name ?? obs.species_guess ?? "Especie desconocida",
      commonName: obs.taxon?.preferred_common_name ?? null,
      imageUrl:
        obs.photos?.[0]?.url?.replace("square", "small") ??
        obs.taxon?.default_photo?.square_url ??
        null,
      placeGuess: obs.place_guess,
      observedOn: obs.observed_on,
      observerLogin: obs.user.login,
      uri: obs.uri,
      latitude: isNaN(lat) ? null : lat,
      longitude: isNaN(lng) ? null : lng,
    }
  })
}

// ─── Species pages: monthly sighting histogram (all-time, global) ─────────────

export async function fetchSpeciesMonthlyHistogram(
  taxonId: number
): Promise<Record<string, number>> {
  const params = new URLSearchParams({
    taxon_id: String(taxonId),
    date_field: "observed",
    interval: "month_of_year",
    ...PATAGONIA_BBOX,
  })
  const url = `https://api.inaturalist.org/v1/observations/histogram?${params}`
  const res = await fetch(url, { next: { revalidate: 3600 } })
  if (!res.ok) return {}
  const data: INatHistogramResponse = await res.json()
  return data.results.month_of_year ?? {}
}
