// Moon phase calculation — pure math, no external API needed.
// Reference new moon: Jan 6, 2000 18:14 UTC (J2000 epoch)
const KNOWN_NEW_MOON = new Date("2000-01-06T18:14:00Z").getTime()
const LUNATION_DAYS = 29.530588853

export type StargazingQuality = "excelente" | "buena" | "regular" | "mala"

export type MoonData = {
  phaseName: string
  phaseEmoji: string
  illumination: number // 0–100
  ageDays: number // days since last new moon
  daysUntilFull: number
  nextFullDate: string // formatted date
  stargazingQuality: StargazingQuality
  stargazingNote: string
}

type Lang = "es" | "en"

function phaseFromAge(age: number, lang: Lang): { name: string; emoji: string } {
  const en = lang === "en"
  if (age < 1.85) return { name: en ? "New moon" : "Luna nueva", emoji: "🌑" }
  if (age < 7.38) return { name: en ? "Waxing crescent" : "Creciente cóncava", emoji: "🌒" }
  if (age < 9.22) return { name: en ? "First quarter" : "Cuarto creciente", emoji: "🌓" }
  if (age < 14.77) return { name: en ? "Waxing gibbous" : "Creciente gibosa", emoji: "🌔" }
  if (age < 16.61) return { name: en ? "Full moon" : "Luna llena", emoji: "🌕" }
  if (age < 22.15) return { name: en ? "Waning gibbous" : "Menguante gibosa", emoji: "🌖" }
  if (age < 23.99) return { name: en ? "Last quarter" : "Cuarto menguante", emoji: "🌗" }
  return { name: en ? "Waning crescent" : "Menguante cóncava", emoji: "🌘" }
}

const STARGAZING_NOTES: Record<StargazingQuality, Record<Lang, string>> = {
  excelente: { es: "Cielos oscuros — ideal para la Vía Láctea", en: "Dark skies — ideal for the Milky Way" },
  buena: { es: "Buena visibilidad nocturna", en: "Good night-sky visibility" },
  regular: { es: "La luna reduce la visibilidad", en: "The moon reduces visibility" },
  mala: { es: "Luna brillante — difícil observar estrellas", en: "Bright moon — hard to see stars" },
}

export const STARGAZING_LABELS: Record<StargazingQuality, Record<Lang, string>> = {
  excelente: { es: "Excelente", en: "Excellent" },
  buena: { es: "Buena", en: "Good" },
  regular: { es: "Regular", en: "Fair" },
  mala: { es: "Mala", en: "Poor" },
}

function stargazingFromIllumination(pct: number, lang: Lang): {
  quality: StargazingQuality
  note: string
} {
  const quality: StargazingQuality =
    pct < 20 ? "excelente" : pct < 45 ? "buena" : pct < 70 ? "regular" : "mala"
  return { quality, note: STARGAZING_NOTES[quality][lang] }
}

export function getMoonData(lang: Lang = "es"): MoonData {
  const now = Date.now()
  const elapsedDays = (now - KNOWN_NEW_MOON) / 86_400_000
  const ageDays = ((elapsedDays % LUNATION_DAYS) + LUNATION_DAYS) % LUNATION_DAYS

  const illumination = Math.round(
    ((1 - Math.cos((ageDays / LUNATION_DAYS) * 2 * Math.PI)) / 2) * 100,
  )

  const halfCycle = LUNATION_DAYS / 2
  const daysUntilFull = ageDays <= halfCycle ? halfCycle - ageDays : LUNATION_DAYS - ageDays + halfCycle

  const nextFullMs = now + daysUntilFull * 86_400_000
  const nextFullDate = new Date(nextFullMs).toLocaleDateString(lang === "en" ? "en-US" : "es-AR", {
    day: "numeric",
    month: "long",
  })

  const { name: phaseName, emoji: phaseEmoji } = phaseFromAge(ageDays, lang)
  const { quality: stargazingQuality, note: stargazingNote } =
    stargazingFromIllumination(illumination, lang)

  return {
    phaseName,
    phaseEmoji,
    illumination,
    ageDays: Math.round(ageDays),
    daysUntilFull: Math.ceil(daysUntilFull),
    nextFullDate,
    stargazingQuality,
    stargazingNote,
  }
}
