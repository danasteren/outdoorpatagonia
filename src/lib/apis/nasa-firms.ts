// NASA FIRMS (Fire Information for Resource Management System)
// API key gratuita en: https://firms.modaps.eosdis.nasa.gov/api/map_key/
// Configurar en .env.local como NASA_FIRMS_KEY=<tu_key>

export type FireHotspot = {
  latitude: number
  longitude: number
  brightness: number
  acqDate: string
  confidence: string
  frp: number // fire radiative power en MW — indica intensidad
}

export type FireSummary = {
  count: number
  hotspots: FireHotspot[]
  lastDate: string
}

const EMPTY: FireSummary = { count: 0, hotspots: [], lastDate: "" }

// Patagonia bounding box (W,S,E,N) para la API de FIRMS
const PATAGONIA_AREA = "-76,-56,-62,-38"

export async function fetchPatagoniaFires(): Promise<FireSummary> {
  const key = process.env.NASA_FIRMS_KEY
  if (!key) return EMPTY

  const url = `https://firms.modaps.eosdis.nasa.gov/api/area/csv/${key}/VIIRS_SNPP_NRT/${PATAGONIA_AREA}/1`

  try {
    const res = await fetch(url, { next: { revalidate: 3600 } })
    if (!res.ok) return EMPTY

    const text = await res.text()
    const lines = text.trim().split("\n")
    if (lines.length <= 1) return EMPTY

    const headers = lines[0].split(",")
    const idx = (h: string) => headers.indexOf(h)

    const hotspots: FireHotspot[] = lines
      .slice(1)
      .filter((l) => l.trim())
      .map((l) => {
        const c = l.split(",")
        return {
          latitude: parseFloat(c[idx("latitude")]),
          longitude: parseFloat(c[idx("longitude")]),
          brightness: parseFloat(c[idx("bright_ti4")]),
          acqDate: c[idx("acq_date")] ?? "",
          confidence: c[idx("confidence")] ?? "",
          frp: parseFloat(c[idx("frp")]),
        }
      })
      .filter((f) => !isNaN(f.latitude) && f.confidence !== "l") // descartar confianza baja

    return {
      count: hotspots.length,
      hotspots,
      lastDate: hotspots[0]?.acqDate ?? "",
    }
  } catch {
    return EMPTY
  }
}
