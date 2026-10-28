import type { LucideIcon } from 'lucide-react'
import {
  Activity, Backpack, Bone, ChefHat, Compass, Droplets, Flame, Leaf, Map, MapPin,
  Mountain, PawPrint, Pickaxe, Signpost, Telescope, Users,
} from 'lucide-react'

export type Lang = 'es' | 'en'
export type Label = Record<Lang, string>

export type NavItem = { href: string; hrefEn?: string; label: Label; Icon: LucideIcon }

// Lista única de secciones: la usan el header (desktop y mobile) y las tarjetas de tema
// de la home (src/lib/home-topics.ts). Las secciones solo existen en español, salvo las
// que tienen `hrefEn`.
export const EXPLORE_ITEMS: NavItem[] = [
  { href: '/arqueologia', label: { es: 'Arqueología', en: 'Archaeology' }, Icon: Bone },
  { href: '/astronomia', label: { es: 'Astronomía', en: 'Astronomy' }, Icon: Telescope },
  { href: '/destinos', hrefEn: '/en/guides', label: { es: 'Destinos', en: 'Destinations' }, Icon: Signpost },
  { href: '/escalada', label: { es: 'Escalada', en: 'Climbing' }, Icon: Pickaxe },
  { href: '/estado', label: { es: 'Estado', en: 'Conditions' }, Icon: Activity },
  { href: '/fauna', label: { es: 'Fauna', en: 'Fauna' }, Icon: PawPrint },
  { href: '/flora', label: { es: 'Flora', en: 'Flora' }, Icon: Leaf },
  { href: '/gastronomia', label: { es: 'Gastronomía', en: 'Gastronomy' }, Icon: ChefHat },
  { href: '/parques', label: { es: 'Parques', en: 'Parks' }, Icon: Mountain },
  { href: '/senderos', label: { es: 'Senderos', en: 'Trails' }, Icon: MapPin },
  { href: '/termas', label: { es: 'Termas', en: 'Hot springs' }, Icon: Droplets },
  { href: '/volcanes', label: { es: 'Volcanes', en: 'Volcanoes' }, Icon: Flame },
]

export const PLAN_ITEMS: NavItem[] = [
  { href: '/planear', label: { es: 'Itinerario', en: 'Itinerary' }, Icon: Compass },
  { href: '/planear/que-llevar', label: { es: 'Qué llevar', en: 'What to pack' }, Icon: Backpack },
]

export const TOOL_ITEMS: NavItem[] = [
  { href: '/mapa', label: { es: 'Mapa', en: 'Map' }, Icon: Map },
  { href: '/operadores', label: { es: 'Operadores', en: 'Tour operators' }, Icon: Users },
]

/** El item con `href` y `label` en el idioma pedido. */
export function localizeNavItem({ href, hrefEn, label, Icon }: NavItem, lang: Lang) {
  return { href: lang === 'en' ? hrefEn ?? href : href, label: label[lang], Icon }
}
