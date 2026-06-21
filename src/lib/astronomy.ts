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

function phaseFromAge(age: number): { name: string; emoji: string } {
  if (age < 1.85) return { name: "Luna nueva", emoji: "🌑" }
  if (age < 7.38) return { name: "Creciente cóncava", emoji: "🌒" }
  if (age < 9.22) return { name: "Cuarto creciente", emoji: "🌓" }
  if (age < 14.77) return { name: "Creciente gibosa", emoji: "🌔" }
  if (age < 16.61) return { name: "Luna llena", emoji: "🌕" }
  if (age < 22.15) return { name: "Menguante gibosa", emoji: "🌖" }
  if (age < 23.99) return { name: "Cuarto menguante", emoji: "🌗" }
  return { name: "Menguante cóncava", emoji: "🌘" }
}

function stargazingFromIllumination(pct: number): {
  quality: StargazingQuality
  note: string
} {
  if (pct < 20) return { quality: "excelente", note: "Cielos oscuros — ideal para la Vía Láctea" }
  if (pct < 45) return { quality: "buena", note: "Buena visibilidad nocturna" }
  if (pct < 70) return { quality: "regular", note: "La luna reduce la visibilidad" }
  return { quality: "mala", note: "Luna brillante — difícil observar estrellas" }
}

export function getMoonData(): MoonData {
  const now = Date.now()
  const elapsedDays = (now - KNOWN_NEW_MOON) / 86_400_000
  const ageDays = ((elapsedDays % LUNATION_DAYS) + LUNATION_DAYS) % LUNATION_DAYS

  const illumination = Math.round(
    ((1 - Math.cos((ageDays / LUNATION_DAYS) * 2 * Math.PI)) / 2) * 100,
  )

  const halfCycle = LUNATION_DAYS / 2
  const daysUntilFull = ageDays <= halfCycle ? halfCycle - ageDays : LUNATION_DAYS - ageDays + halfCycle

  const nextFullMs = now + daysUntilFull * 86_400_000
  const nextFullDate = new Date(nextFullMs).toLocaleDateString("es-AR", {
    day: "numeric",
    month: "long",
  })

  const { name: phaseName, emoji: phaseEmoji } = phaseFromAge(ageDays)
  const { quality: stargazingQuality, note: stargazingNote } =
    stargazingFromIllumination(illumination)

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
