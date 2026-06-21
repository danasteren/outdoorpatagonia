export type WeatherData = {
  location: string
  region: "AR" | "CL"
  temperature: number
  weatherCode: number
  windSpeed: number
  condition: string
}

type OpenMeteoResponse = {
  current: {
    temperature_2m: number
    weather_code: number
    wind_speed_10m: number
  }
}

const LOCATIONS: { name: string; lat: number; lon: number; region: "AR" | "CL" }[] = [
  { name: "El Chaltén", lat: -49.3321, lon: -72.8856, region: "AR" },
  { name: "Ushuaia", lat: -54.8019, lon: -68.303, region: "AR" },
  { name: "Bariloche", lat: -41.1335, lon: -71.3103, region: "AR" },
  { name: "Pto. Natales", lat: -51.7311, lon: -72.4868, region: "CL" },
  { name: "Punta Arenas", lat: -53.1638, lon: -70.9171, region: "CL" },
  { name: "Coyhaique", lat: -45.5712, lon: -72.0658, region: "CL" },
]

export function wmoToCondition(code: number): string {
  if (code === 0) return "Despejado"
  if (code <= 2) return "Algo de nubes"
  if (code === 3) return "Nublado"
  if (code <= 48) return "Niebla"
  if (code <= 57) return "Llovizna"
  if (code <= 67) return "Lluvia"
  if (code <= 77) return "Nieve"
  if (code <= 82) return "Chaparrones"
  if (code <= 86) return "Nevadas"
  return "Tormenta"
}

// ─── Glaciares ────────────────────────────────────────────────────────────────

export type GlacierData = {
  location: string
  sublabel: string
  temperature: number
  snowfall: number
  windSpeed: number
  weatherCode: number
  condition: string
}

type OpenMeteoGlacierResponse = {
  current: {
    temperature_2m: number
    snowfall: number
    wind_speed_10m: number
    weather_code: number
  }
}

const GLACIER_POINTS: { name: string; sublabel: string; lat: number; lon: number }[] = [
  { name: "Perito Moreno", sublabel: "Los Glaciares NP", lat: -50.4967, lon: -73.0542 },
  { name: "Campo de Hielo Sur", sublabel: "Hielo Patagónico", lat: -49.6, lon: -73.5 },
  { name: "Glaciar Grey", sublabel: "Torres del Paine", lat: -51.0, lon: -73.2 },
]

export async function fetchGlacierData(): Promise<GlacierData[]> {
  const results = await Promise.allSettled(
    GLACIER_POINTS.map(async ({ name, sublabel, lat, lon }) => {
      const url =
        `https://api.open-meteo.com/v1/forecast` +
        `?latitude=${lat}&longitude=${lon}` +
        `&current=temperature_2m,snowfall,wind_speed_10m,weather_code` +
        `&timezone=auto&forecast_days=1`
      const res = await fetch(url, { next: { revalidate: 3600 } })
      if (!res.ok) throw new Error(`Open-Meteo glacier error: ${name}`)
      const data: OpenMeteoGlacierResponse = await res.json()
      return {
        location: name,
        sublabel,
        temperature: Math.round(data.current.temperature_2m),
        snowfall: data.current.snowfall,
        windSpeed: Math.round(data.current.wind_speed_10m),
        weatherCode: data.current.weather_code,
        condition: wmoToCondition(data.current.weather_code),
      } satisfies GlacierData
    })
  )
  return results
    .filter((r): r is PromiseFulfilledResult<GlacierData> => r.status === "fulfilled")
    .map((r) => r.value)
}

// ─── Weather por ubicación (para uso externo) ─────────────────────────────────

export async function fetchWeatherForLocation(
  lat: number,
  lon: number,
  name: string
): Promise<WeatherData | null> {
  try {
    const url =
      `https://api.open-meteo.com/v1/forecast` +
      `?latitude=${lat}&longitude=${lon}` +
      `&current=temperature_2m,weather_code,wind_speed_10m` +
      `&timezone=auto&forecast_days=1`
    const res = await fetch(url, { next: { revalidate: 3600 } })
    if (!res.ok) return null
    const data: OpenMeteoResponse = await res.json()
    return {
      location: name,
      region: lon < -68 ? "AR" : "CL",
      temperature: Math.round(data.current.temperature_2m),
      weatherCode: data.current.weather_code,
      windSpeed: Math.round(data.current.wind_speed_10m),
      condition: wmoToCondition(data.current.weather_code),
    }
  } catch {
    return null
  }
}

export async function fetchWeather(): Promise<WeatherData[]> {
  const results = await Promise.allSettled(
    LOCATIONS.map(async ({ name, lat, lon, region }) => {
      const url =
        `https://api.open-meteo.com/v1/forecast` +
        `?latitude=${lat}&longitude=${lon}` +
        `&current=temperature_2m,weather_code,wind_speed_10m` +
        `&timezone=auto&forecast_days=1`
      const res = await fetch(url, { next: { revalidate: 3600 } })
      if (!res.ok) throw new Error(`Open-Meteo error: ${name}`)
      const data: OpenMeteoResponse = await res.json()
      const result: WeatherData = {
        location: name,
        region,
        temperature: Math.round(data.current.temperature_2m),
        weatherCode: data.current.weather_code,
        windSpeed: Math.round(data.current.wind_speed_10m),
        condition: wmoToCondition(data.current.weather_code),
      }
      return result
    })
  )

  return results
    .filter((r): r is PromiseFulfilledResult<WeatherData> => r.status === "fulfilled")
    .map((r) => r.value)
}
