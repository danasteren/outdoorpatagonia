export type WeatherData = {
  location: string
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

const LOCATIONS = [
  { name: "El Chaltén", lat: -49.3321, lon: -72.8856 },
  { name: "Ushuaia", lat: -54.8019, lon: -68.303 },
  { name: "Pto. Natales", lat: -51.7311, lon: -72.4868 },
  { name: "Bariloche", lat: -41.1335, lon: -71.3103 },
] as const

function wmoToCondition(code: number): string {
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

export async function fetchWeatherForLocation(
  lat: number,
  lon: number,
  name: string
): Promise<WeatherData | null> {
  const url =
    `https://api.open-meteo.com/v1/forecast` +
    `?latitude=${lat}&longitude=${lon}` +
    `&current=temperature_2m,weather_code,wind_speed_10m` +
    `&timezone=auto&forecast_days=1`
  try {
    const res = await fetch(url, { next: { revalidate: 3600 } })
    if (!res.ok) return null
    const data: OpenMeteoResponse = await res.json()
    return {
      location: name,
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
    LOCATIONS.map(async ({ name, lat, lon }) => {
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
