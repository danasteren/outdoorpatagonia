import { FAUNA_CATALOG, CATEGORY_LABELS as FAUNA_LABELS } from '@/lib/fauna/catalog'
import { FLORA_CATALOG, CATEGORY_LABELS as FLORA_LABELS } from '@/lib/flora/catalog'
import { PARQUES_CATALOG } from '@/lib/parques/catalog'
import { SENDEROS_CATALOG, DIFICULTAD_LABELS } from '@/lib/senderos/catalog'
import { VOLCANES_CATALOG } from '@/lib/volcanes/catalog'
import { ESCALADA_CATALOG } from '@/lib/escalada/catalog'
import { ARQUEOLOGIA_CATALOG, CATEGORIA_LABELS as ARQUE_LABELS } from '@/lib/arqueologia/catalog'
import type { SearchItem } from './types'

const STATIC_PAGES: SearchItem[] = [
  { type: 'pagina', title: 'Astronomía', description: 'Cielos oscuros y observación estelar en la Patagonia', href: '/astronomia', meta: 'Sección' },
  { type: 'pagina', title: 'Estado actual', description: 'Clima, incendios, glaciares y avistamientos en tiempo real', href: '/estado', meta: 'Sección' },
  { type: 'pagina', title: 'Mapa interactivo', description: 'Mapa de parques, senderos y fauna de la Patagonia', href: '/mapa', meta: 'Herramienta' },
  { type: 'pagina', title: 'Operadores turísticos', description: 'Empresas y guías de aventura en Patagonia', href: '/operadores', meta: 'Herramienta' },
  { type: 'pagina', title: 'Planear viaje', description: 'Armá tu itinerario personalizado para Patagonia', href: '/planear', meta: 'Herramienta' },
  { type: 'pagina', title: 'Qué llevar', description: 'Checklist de equipamiento para trekking patagónico', href: '/planear/que-llevar', meta: 'Herramienta' },
  { type: 'pagina', title: 'Escalada en Patagonia', description: 'Sectores y vías de escalada en Argentina y Chile', href: '/escalada', meta: 'Sección' },
  { type: 'pagina', title: 'Flora patagónica', description: 'Árboles, arbustos y plantas nativas de la Patagonia', href: '/flora', meta: 'Sección' },
  { type: 'pagina', title: 'Fauna patagónica', description: 'Animales silvestres de la Patagonia', href: '/fauna', meta: 'Sección' },
  { type: 'pagina', title: 'Parques nacionales', description: 'Parques nacionales de Argentina y Chile en Patagonia', href: '/parques', meta: 'Sección' },
  { type: 'pagina', title: 'Senderos y trekking', description: 'Los mejores senderos para hacer trekking en Patagonia', href: '/senderos', meta: 'Sección' },
  { type: 'pagina', title: 'Volcanes patagónicos', description: 'Volcanes activos y principales de la Patagonia', href: '/volcanes', meta: 'Sección' },
  { type: 'pagina', title: 'Arqueología patagónica', description: 'Dinosaurios, fósiles, sitios humanos y petroglifos de la Patagonia', href: '/arqueologia', meta: 'Sección' },
]

function buildStaticIndex(): SearchItem[] {
  const fauna: SearchItem[] = FAUNA_CATALOG.map((f) => ({
    type: 'fauna',
    title: f.commonNameEs,
    description: `${f.scientificName} · ${f.parquesRelacionados.map((p) => p.nombre).join(', ')}`,
    href: `/fauna/${f.slug}`,
    meta: FAUNA_LABELS[f.category],
    searchableText: f.commonNameEn,
  }))

  const flora: SearchItem[] = FLORA_CATALOG.map((f) => ({
    type: 'flora',
    title: f.commonNameEs,
    description: `${f.scientificName} · ${f.parquesRelacionados.map((p) => p.nombre).join(', ')}`,
    href: `/flora/${f.slug}`,
    meta: FLORA_LABELS[f.category],
    searchableText: f.commonNameEn,
  }))

  const parques: SearchItem[] = PARQUES_CATALOG.map((p) => ({
    type: 'parque',
    title: p.name,
    description: p.description.slice(0, 120),
    href: `/parques/${p.slug}`,
    meta: p.country === 'ar' ? 'Argentina' : 'Chile',
    searchableText: p.highlights.join(' '),
  }))

  const senderos: SearchItem[] = SENDEROS_CATALOG.map((s) => ({
    type: 'sendero',
    title: s.title,
    description: `${s.parqueName} · ${s.distancia} · ${s.duracion}`,
    href: `/senderos/${s.slug}`,
    meta: DIFICULTAD_LABELS[s.dificultad],
    searchableText: `${s.parqueName} ${s.inicio}`,
  }))

  const volcanes: SearchItem[] = VOLCANES_CATALOG.map((v) => ({
    type: 'volcan',
    title: v.nombre,
    description: `${v.tipoVolcan} · ${v.pais === 'CL/AR' ? 'Chile / Argentina' : v.pais === 'CL' ? 'Chile' : 'Argentina'} · ${v.elevacion} m`,
    href: `/volcanes/${v.slug}`,
    meta: v.pais,
  }))

  const sectores: SearchItem[] = ESCALADA_CATALOG.map((s) => ({
    type: 'sector',
    title: s.nombre,
    description: `${s.region} · ${s.tipoRoca.join(', ')}`,
    href: `/escalada/${s.slug}`,
    meta: s.pais === 'AR' ? 'Argentina' : 'Chile',
  }))

  const arqueologia: SearchItem[] = ARQUEOLOGIA_CATALOG.map((a) => ({
    type: 'arqueologia',
    title: a.nombre,
    description: `${a.era} · ${a.provincia}, ${a.pais === 'AR' ? 'Argentina' : a.pais === 'CL' ? 'Chile' : 'Chile / Argentina'}`,
    href: `/arqueologia/${a.slug}`,
    meta: ARQUE_LABELS[a.categoria],
    searchableText: a.nombreCientifico,
  }))

  return [...STATIC_PAGES, ...fauna, ...flora, ...parques, ...senderos, ...volcanes, ...sectores, ...arqueologia]
}

export const STATIC_SEARCH_INDEX: SearchItem[] = buildStaticIndex()
