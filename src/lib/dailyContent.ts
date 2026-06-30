// Deterministic "changes every day" content for the homepage hero —
// no client JS or DB needed, just date math. Paired with `revalidate`
// on the page so it refreshes in production.

const PATAGONIA_FACTS = [
  "El glaciar Perito Moreno es uno de los pocos del mundo que sigue creciendo.",
  "El cóndor andino puede vivir más de 50 años y volar sin apenas batir las alas.",
  "Ushuaia es la ciudad más austral del mundo, a 3.000 km de la Antártida.",
  "El Parque Nacional Los Glaciares protege 726.927 hectáreas de hielo y bosque.",
  "Los vientos patagónicos pueden superar los 100 km/h en primavera.",
  "El huemul, símbolo del escudo argentino, está en peligro de extinción.",
  "La Torre Sur del Fitz Roy se eleva 3.405 metros sobre el valle.",
  "El bosque de lengas cambia de verde a rojo fuego entre marzo y abril.",
  "Bajo cielos sin contaminación lumínica, la Vía Láctea se ve a simple vista.",
  "El delfín austral solo habita las costas frías del extremo sur de Sudamérica.",
] as const

function getDayOfYear(date: Date): number {
  const start = Date.UTC(date.getUTCFullYear(), 0, 0)
  const diff = date.getTime() - start
  return Math.floor(diff / 86_400_000)
}

export function getDailyFact(): string {
  const dayOfYear = getDayOfYear(new Date())
  return PATAGONIA_FACTS[dayOfYear % PATAGONIA_FACTS.length]
}

export type TimeOfDay = "amanecer" | "dia" | "atardecer" | "noche"

export function getTimeOfDay(): TimeOfDay {
  const hour = Number(
    new Intl.DateTimeFormat("es-AR", {
      timeZone: "America/Argentina/Buenos_Aires",
      hour: "numeric",
      hour12: false,
    }).format(new Date()),
  )
  if (hour >= 6 && hour < 9) return "amanecer"
  if (hour >= 9 && hour < 18) return "dia"
  if (hour >= 18 && hour < 21) return "atardecer"
  return "noche"
}

export function getTodayLabel(): string {
  return new Intl.DateTimeFormat("es-AR", {
    timeZone: "America/Argentina/Buenos_Aires",
    day: "numeric",
    month: "long",
  }).format(new Date())
}
