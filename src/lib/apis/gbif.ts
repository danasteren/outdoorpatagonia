export type GbifSpeciesData = {
  usageKey: number
  scientificName: string
  canonicalName: string
  rank: string
  kingdom: string | null
  phylum: string | null
  class: string | null
  order: string | null
  family: string | null
  genus: string | null
  iucnRedListCategory: string | null
}

// ─── Internal response types ──────────────────────────────────────────────────

type GbifMatchResponse = {
  usageKey?: number
  scientificName?: string
  canonicalName?: string
  rank?: string
  status?: string
  matchType?: string
  kingdom?: string
  phylum?: string
  class?: string
  order?: string
  family?: string
  genus?: string
}

type GbifSpeciesResponse = {
  key?: number
  scientificName?: string
  canonicalName?: string
  rank?: string
  taxonomicStatus?: string
  kingdom?: string
  phylum?: string
  class?: string
  order?: string
  family?: string
  genus?: string
  iucnRedListCategory?: string
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function fromSpeciesResponse(r: GbifSpeciesResponse): GbifSpeciesData {
  return {
    usageKey: r.key ?? 0,
    scientificName: r.scientificName ?? r.canonicalName ?? "",
    canonicalName: r.canonicalName ?? r.scientificName ?? "",
    rank: r.rank ?? "",
    kingdom: r.kingdom ?? null,
    phylum: r.phylum ?? null,
    class: r.class ?? null,
    order: r.order ?? null,
    family: r.family ?? null,
    genus: r.genus ?? null,
    iucnRedListCategory: r.iucnRedListCategory ?? null,
  }
}

function fromMatchResponse(r: GbifMatchResponse): GbifSpeciesData {
  return {
    usageKey: r.usageKey ?? 0,
    scientificName: r.scientificName ?? r.canonicalName ?? "",
    canonicalName: r.canonicalName ?? r.scientificName ?? "",
    rank: r.rank ?? "",
    kingdom: r.kingdom ?? null,
    phylum: r.phylum ?? null,
    class: r.class ?? null,
    order: r.order ?? null,
    family: r.family ?? null,
    genus: r.genus ?? null,
    iucnRedListCategory: null, // match endpoint doesn't return IUCN
  }
}

// ─── Public API ───────────────────────────────────────────────────────────────

// Fetch full species data by GBIF taxon key. Includes IUCN Red List category.
// Taxonomy data changes very rarely — cache for 24h.
export async function fetchGbifSpecies(
  key: number
): Promise<GbifSpeciesData | null> {
  const url = `https://api.gbif.org/v1/species/${key}`
  const res = await fetch(url, { next: { revalidate: 86400 } })
  if (!res.ok) return null
  const data: GbifSpeciesResponse = await res.json()
  if (!data.canonicalName && !data.scientificName) return null
  return fromSpeciesResponse(data)
}

// Match species by scientific name. Returns taxonomy but no IUCN.
// Use when no GBIF key is known (on-demand pages for unknown species).
export async function fetchGbifByScientificName(
  scientificName: string
): Promise<GbifSpeciesData | null> {
  const params = new URLSearchParams({
    name: scientificName,
    rank: "SPECIES",
    strict: "false",
  })
  const url = `https://api.gbif.org/v1/species/match?${params}`
  const res = await fetch(url, { next: { revalidate: 86400 } })
  if (!res.ok) return null
  const data: GbifMatchResponse = await res.json()
  if (!data.usageKey || data.matchType === "NONE") return null
  return fromMatchResponse(data)
}
