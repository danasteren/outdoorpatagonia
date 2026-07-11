export type TabKey = "hoy" | "meteoros" | "eventos" | "cielos" | "constelaciones"

export const TAB_KEYS: TabKey[] = ["hoy", "meteoros", "eventos", "cielos", "constelaciones"]

export const TAB_LABELS: Record<TabKey, string> = {
  hoy: "Hoy",
  meteoros: "Meteoros",
  eventos: "Eventos",
  cielos: "Cielos oscuros",
  constelaciones: "Constelaciones",
}
