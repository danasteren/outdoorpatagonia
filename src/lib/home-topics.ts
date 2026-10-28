import type { LucideIcon } from "lucide-react"
import {
  EXPLORE_ITEMS,
  PLAN_ITEMS,
  TOOL_ITEMS,
  localizeNavItem,
  type Label,
  type Lang,
} from "@/lib/nav-items"

// Tarjetas de "Explorá por tema" de las dos homes. Nombre, ícono y link salen de las
// listas del header (src/lib/nav-items.ts); acá solo va lo propio de la tarjeta.
const TOPICS: { href: string; description: Label; color: string }[] = [
  { href: "/astronomia", description: { es: "Cielos oscuros, luna y meteoros", en: "Dark skies, the moon and meteor showers" }, color: "from-[#0f1d2e] to-[#1a2a4a]" },
  { href: "/destinos", description: { es: "Guías de viaje por destino", en: "Travel guides by destination" }, color: "from-[#0a2233] to-[#103a4d]" },
  { href: "/escalada", description: { es: "Sectores y vías de escalada", en: "Climbing areas and routes" }, color: "from-[#5a4a3a] to-[var(--color-charcoal)]" },
  { href: "/estado", description: { es: "Clima, incendios y condiciones", en: "Weather, wildfires and conditions" }, color: "from-[var(--color-teal)] to-[#1a6a8a]" },
  { href: "/fauna", description: { es: "Aves, mamíferos y vida silvestre", en: "Birds, mammals and wildlife" }, color: "from-[var(--color-forest)] to-[var(--color-teal)]" },
  { href: "/flora", description: { es: "Plantas nativas y ecosistemas", en: "Native plants and ecosystems" }, color: "from-[var(--color-teal)] to-[var(--color-teal-light)]" },
  { href: "/planear", description: { es: "Armá tu recorrido día a día", en: "Plan your route day by day" }, color: "from-[var(--color-terracotta)] to-[#8a4d22]" },
  { href: "/mapa", description: { es: "Todos los puntos de interés en un mapa", en: "Every point of interest on one map" }, color: "from-[#1a6a8a] to-[var(--color-charcoal)]" },
  { href: "/operadores", description: { es: "Guías y operadores turísticos", en: "Guides and tour operators" }, color: "from-[var(--color-charcoal)] to-[#3a322f]" },
  { href: "/parques", description: { es: "Áreas protegidas y reservas", en: "Protected areas and reserves" }, color: "from-[var(--color-charcoal)] to-[var(--color-forest)]" },
  { href: "/planear/que-llevar", description: { es: "Equipo y checklist para tu viaje", en: "Gear and packing checklist" }, color: "from-[#8a4d22] to-[var(--color-charcoal)]" },
  { href: "/senderos", description: { es: "Trekking y caminatas", en: "Trekking and hikes" }, color: "from-[#3a5a2a] to-[var(--color-forest)]" },
  { href: "/volcanes", description: { es: "Alertas volcánicas en tiempo real", en: "Live volcano alerts" }, color: "from-[#8a2a0a] to-[var(--color-terracotta)]" },
]

const NAV_ITEMS = [...EXPLORE_ITEMS, ...PLAN_ITEMS, ...TOOL_ITEMS]

export type HomeTopic = { label: string; href: string; icon: LucideIcon; description: string; color: string }

/** Tarjetas de tema en el idioma pedido, ordenadas por nombre (como el menú). */
export function getHomeTopics(lang: Lang): HomeTopic[] {
  return TOPICS.map(({ href, description, color }) => {
    const item = NAV_ITEMS.find((i) => i.href === href)
    if (!item) throw new Error(`home-topics: ${href} no está en nav-items`)
    const { href: localizedHref, label, Icon } = localizeNavItem(item, lang)
    return { label, href: localizedHref, icon: Icon, description: description[lang], color }
  }).sort((a, b) => a.label.localeCompare(b.label, lang))
}
