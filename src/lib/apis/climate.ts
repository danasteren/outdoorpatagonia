// Promedios climáticos mensuales a partir del histórico diario de Open-Meteo (reanálisis ERA5).
// Solo temperatura y horas de luz: la precipitación de ERA5 en la Patagonia andina sale muy por
// encima de lo que miden las estaciones (ej. Ushuaia ~1.000 mm vs ~530 mm reales), así que no se publica.

export type MonthlyClimate = {
  month: number // 1-12
  tempMax: number // °C, promedio de máximas diarias
  tempMin: number // °C, promedio de mínimas diarias
  daylightHours: number // horas de luz promedio
}

export type ClimateNormals = {
  months: MonthlyClimate[]
  period: string // ej. "2015–2024"
}

type ArchiveResponse = {
  daily: {
    time: string[]
    temperature_2m_max: (number | null)[]
    temperature_2m_min: (number | null)[]
    daylight_duration: (number | null)[]
  }
}

const START_YEAR = 2015
const END_YEAR = 2024

export async function fetchClimateNormals(lat: number, lon: number): Promise<ClimateNormals | null> {
  try {
    const url =
      `https://archive-api.open-meteo.com/v1/archive` +
      `?latitude=${lat}&longitude=${lon}` +
      `&start_date=${START_YEAR}-01-01&end_date=${END_YEAR}-12-31` +
      `&daily=temperature_2m_max,temperature_2m_min,daylight_duration&timezone=auto`
    // Promedios de un período cerrado: no cambian, alcanza con revalidar una vez por mes.
    const res = await fetch(url, { next: { revalidate: 60 * 60 * 24 * 30 } })
    if (!res.ok) return null
    const { daily }: ArchiveResponse = await res.json()

    const acc = Array.from({ length: 12 }, () => ({ max: [] as number[], min: [] as number[], light: [] as number[] }))
    daily.time.forEach((t, i) => {
      const m = Number(t.slice(5, 7)) - 1
      const max = daily.temperature_2m_max[i]
      const min = daily.temperature_2m_min[i]
      const light = daily.daylight_duration[i]
      if (max != null) acc[m].max.push(max)
      if (min != null) acc[m].min.push(min)
      if (light != null) acc[m].light.push(light)
    })

    const avg = (xs: number[]) => xs.reduce((a, b) => a + b, 0) / xs.length
    const months = acc.map((a, i) => ({
      month: i + 1,
      tempMax: Math.round(avg(a.max) * 10) / 10,
      tempMin: Math.round(avg(a.min) * 10) / 10,
      daylightHours: Math.round((avg(a.light) / 3600) * 10) / 10,
    }))
    if (months.some((m) => Number.isNaN(m.tempMax))) return null

    return { months, period: `${START_YEAR}–${END_YEAR}` }
  } catch {
    return null
  }
}
