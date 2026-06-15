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
}

type INatResponse = {
  results: INatObservation[]
}

function daysAgo(n: number): string {
  const d = new Date()
  d.setDate(d.getDate() - n)
  return d.toISOString().split("T")[0]
}

export async function fetchPatagoniaFauna(): Promise<Sighting[]> {
  // Bounding box covering Argentine + Chilean Patagonia
  const params = new URLSearchParams({
    nelat: "-38",
    nelng: "-62",
    swlat: "-56",
    swlng: "-76",
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
