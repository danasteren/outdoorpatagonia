// Tipos de las guías de destino. Cada guía vive en su propio archivo de ./guias/ (ver catalog.ts).

import type { Relacionado } from "@/lib/relacionados"

export type DestinoLang = "es" | "en"

export type DestinoContent = {
  metaTitle: string
  metaDescription: string
  /** Línea bajo el título del hero. */
  subtitulo: string
  /** Primeros párrafos: responden qué es, dónde queda y por qué ir, con datos concretos. */
  intro: string[]
  datos: Array<{ label: string; valor: string }>
  queHacer: Array<{ nombre: string; texto: string; /** Búsqueda en GetYourGuide, si hay excursiones. */ gygQuery?: string }>
  cuandoIr: { resumen: string; temporadas: Array<{ nombre: string; meses: string; texto: string }> }
  comoLlegar: Array<{ modo: string; texto: string }>
  cuantosDias: { resumen: string; itinerario: Array<{ dia: string; texto: string }> }
  faq: Array<{ pregunta: string; respuesta: string }>
}

export type DestinoEntry = {
  slug: string
  /** Número del destino en seo/destinos-prioridad.md. Ordena los listados y la rotación del destino del día. */
  prioridad: number
  nombre: string
  pais: "AR" | "CL"
  lat: number
  lng: number
  wikipediaTitle?: string
  es: DestinoContent
  en: DestinoContent
  fuentes: Array<{ label: string; url: string }>
  relacionados?: Relacionado[]
}
