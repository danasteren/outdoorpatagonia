// OpenAQ v3 — calidad del aire en zonas industriales patagónicas
// API key gratuita en: https://explore.openaq.org/register
// Configurar en .env.local como OPENAQ_API_KEY=<tu_key>

const BASE = "https://api.openaq.org/v3"

// Límites OMS 2021 (µg/m³, promedio 24h)
export const WHO_LIMITS: Record<string, { label: string; limit: number; unit: string }> = {
  pm25: { label: "PM2.5", limit: 15, unit: "µg/m³" },
  no2:  { label: "NO₂",   limit: 25, unit: "µg/m³" },
  so2:  { label: "SO₂",   limit: 40, unit: "µg/m³" },
}

export type PollutantReading = {
  parameter: string
  label: string
  value: number
  unit: string
  whoLimit: number
  zone: string
  locationName: string
  lastUpdated: string
}

export type ImpactoData = {
  readings: PollutantReading[]
  lastDate: string
}

const EMPTY: ImpactoData = { readings: [], lastDate: "" }

const ZONES = [
  { name: "Vaca Muerta", lat: -38.9516, lon: -68.0591 },
  { name: "Comodoro Rivadavia", lat: -45.8645, lon: -67.4979 },
]

type OAQLocation = {
  id: number
  name: string
  locality: string | null
  lastUpdated: string
  sensors: Array<{
    id: number
    parameter: { name: string; displayName: string; units: string }
  }>
}

type OAQMeasurement = {
  value: number
  period: { datetimeTo: { utc: string } }
}

async function fetchLocations(key: string, lat: number, lon: number): Promise<OAQLocation[]> {
  const url = `${BASE}/locations?coordinates=${lat},${lon}&radius=200000&limit=5&order_by=lastUpdated&sort_direction=desc`
  const res = await fetch(url, {
    headers: { "X-API-Key": key },
    next: { revalidate: 3600 },
  })
  if (!res.ok) return []
  const json = await res.json()
  return json.results ?? []
}

async function fetchLatestValue(key: string, sensorId: number): Promise<number | null> {
  const url = `${BASE}/sensors/${sensorId}/measurements?limit=1`
  const res = await fetch(url, {
    headers: { "X-API-Key": key },
    next: { revalidate: 3600 },
  })
  if (!res.ok) return null
  const json = await res.json()
  const m: OAQMeasurement | undefined = json.results?.[0]
  return m ? m.value : null
}

export async function fetchImpactoData(): Promise<ImpactoData> {
  const key = process.env.OPENAQ_API_KEY
  if (!key) return EMPTY

  try {
    const readings: PollutantReading[] = []

    for (const zone of ZONES) {
      const locations = await fetchLocations(key, zone.lat, zone.lon)
      if (!locations.length) continue

      // Tomar la estación más reciente que tenga sensores relevantes
      const best = locations.find((loc) =>
        loc.sensors.some((s) => WHO_LIMITS[s.parameter.name])
      )
      if (!best) continue

      const relevantSensors = best.sensors.filter((s) => WHO_LIMITS[s.parameter.name])

      await Promise.all(
        relevantSensors.map(async (sensor) => {
          const value = await fetchLatestValue(key, sensor.id)
          if (value === null || value < 0) return

          const meta = WHO_LIMITS[sensor.parameter.name]
          readings.push({
            parameter: sensor.parameter.name,
            label: meta.label,
            value: Math.round(value * 10) / 10,
            unit: meta.unit,
            whoLimit: meta.limit,
            zone: zone.name,
            locationName: best.locality ?? best.name,
            lastUpdated: best.lastUpdated,
          })
        })
      )
    }

    if (!readings.length) return EMPTY

    const lastDate = readings
      .map((r) => r.lastUpdated)
      .sort()
      .at(-1) ?? ""

    return { readings, lastDate }
  } catch {
    return EMPTY
  }
}
