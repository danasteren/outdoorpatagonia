import type { Relacionado } from "@/lib/relacionados"

export type TermaEntry = {
  slug: string
  nombre: string
  pais: "CL" | "AR"
  region: string
  lat: number
  lng: number
  temperaturaAgua: string
  descripcion: string[]
  datosExtra: Array<{ label: string; valor: string }>
  faq: Array<{ pregunta: string; respuesta: string }>
  urlFuente: string
  wikipediaTitle?: string
  relacionados?: Relacionado[]
}

export const TERMAS_CATALOG: TermaEntry[] = [
  {
    slug: "geometricas",
    nombre: "Termas Geométricas",
    pais: "CL",
    region: "Los Ríos (comuna de Panguipulli), a 90 km de Pucón (Araucanía)",
    lat: -39.501659,
    lng: -71.874697,
    temperaturaAgua: "35–45 °C (fuentes emergen a 80 °C)",
    descripcion: [
      "Las Termas Geométricas son un complejo de 18 piscinas de piedra conectadas por más de 450 metros de pasarelas de madera pintadas de rojo, tendidas a lo largo de una quebrada volcánica en pleno bosque nativo. Están ubicadas dentro del Parque Nacional Villarrica, en el kilómetro 16 del camino que une Coñaripe con Palguín, a unos 90 km de Pucón.",
      "El complejo fue diseñado por el arquitecto chileno Germán del Sol —también responsable de las Termas Puritama en el desierto de Atacama— e inaugurado en 2004. Su diseño ganó reconocimiento internacional por integrar la arquitectura al paisaje sin intervenir el cañón natural por el que corre el estero Aihué.",
      "El agua proviene de más de 60 vertientes termales naturales que emergen a 80 °C y se enfrían mediante mezcla controlada hasta los 35–45 °C de las piscinas, sin uso de filtros ni químicos: el recambio constante mantiene el agua limpia. El entorno integra el Parque Nacional Villarrica, a metros del volcán Villarrica y su lago de lava permanente.",
    ],
    datosExtra: [
      { label: "Piscinas", valor: "18 piscinas de piedra" },
      { label: "Fuentes termales", valor: "Más de 60 vertientes naturales" },
      { label: "Temperatura del agua", valor: "35–45 °C (piscinas)" },
      { label: "Arquitecto", valor: "Germán del Sol" },
      { label: "Año de apertura", valor: "2004" },
      { label: "Horario", valor: "10:00–19:00 (9:00–21:00 en fines de semana largos)" },
    ],
    faq: [
      {
        pregunta: "¿Cómo llegar a las Termas Geométricas desde Pucón?",
        respuesta:
          "Desde Pucón son unos 90 km por camino pavimentado y de ripio vía Coñaripe, aproximadamente 1h30 en auto. También se puede acceder por Liquiñe o por el camino Coñaripe–Palguín (km 16), donde está la entrada. Hay traslados organizados desde Pucón y Coñaripe.",
      },
      {
        pregunta: "¿Cuál es el precio de entrada a las Termas Geométricas?",
        respuesta:
          "El valor de entrada varía según temporada y se actualiza en el sitio oficial (termasgeometricas.cl). Se recomienda reservar con anticipación, especialmente en temporada alta (diciembre–febrero) y fines de semana largos.",
      },
      {
        pregunta: "¿Las Termas Geométricas están abiertas todo el año?",
        respuesta:
          "Sí, funcionan los 365 días del año, de 10:00 a 19:00 hs, con horario extendido de 9:00 a 21:00 en fines de semana largos y temporada de vacaciones. El agua termal mantiene su temperatura durante todo el año, incluido el invierno con nieve alrededor.",
      },
    ],
    urlFuente: "https://www.termasgeometricas.cl/",
    wikipediaTitle: "Termas Geométricas",
    relacionados: [{ tipo: "volcan", slug: "villarrica" }],
  },
  {
    slug: "puyehue",
    nombre: "Termas de Puyehue",
    pais: "CL",
    region: "Los Lagos, a 76 km de Osorno por la ruta CH-215",
    lat: -40.71186,
    lng: -72.328285,
    temperaturaAgua: "36–38 °C en las piscinas del hotel (vertientes naturales entre 24 y 75 °C)",
    descripcion: [
      "Las Termas de Puyehue son uno de los complejos termales más antiguos y emblemáticos del sur de Chile, a orillas del lago Puyehue y rodeadas por el Parque Nacional Puyehue. Sus aguas fueron descubiertas en 1851 y desde 1907 una sociedad local empezó a desarrollar la infraestructura para recibir visitantes.",
      "El edificio actual del Gran Hotel Termas de Puyehue se construyó entre 1937 y 1942, obra del arquitecto alemán Eugenio Freitag, inspirada en la arquitectura alpina suiza con piedra y maderas nativas: 26.500 m² que en su época dorada recibieron a presidentes chilenos como Arturo Alessandri y Eduardo Frei Montalva. Un incendio en 1957 destruyó parte del edificio, del que luego se recuperó.",
      "El agua termal emerge de vertientes naturales con temperaturas de entre 24 °C y 75 °C y alimenta las piscinas del hotel a 36–38 °C. El complejo es distinto —aunque cercano— a las Termas de Aguas Calientes, otro centro termal dentro del mismo Parque Nacional Puyehue, más próximo al centro de esquí Antillanca.",
    ],
    datosExtra: [
      { label: "Piscinas del hotel", valor: "3 piscinas termales, 36–38 °C" },
      { label: "Vertientes naturales", valor: "24 °C a 75 °C" },
      { label: "Arquitecto", valor: "Eugenio Freitag" },
      { label: "Construcción", valor: "1937–1942" },
      { label: "Descubrimiento de las aguas", valor: "1851" },
      { label: "Superficie del hotel", valor: "26.500 m²" },
    ],
    faq: [
      {
        pregunta: "¿Cómo llegar a las Termas de Puyehue desde Osorno?",
        respuesta:
          "Están a 76 km de Osorno por la ruta CH-215, aproximadamente 1h30 en auto, en el camino hacia el paso fronterizo Cardenal Samoré. También se puede llegar desde Puerto Montt o Bariloche (Argentina) por el mismo corredor.",
      },
      {
        pregunta: "¿Termas de Puyehue es lo mismo que Aguas Calientes?",
        respuesta:
          "No. Termas de Puyehue es el hotel histórico a orillas del lago Puyehue; Aguas Calientes es otro centro termal dentro del mismo Parque Nacional Puyehue, más cerca del centro de esquí Antillanca. Ambos comparten el origen volcánico del Cordón Caulle pero son instalaciones distintas.",
      },
      {
        pregunta: "¿Se puede visitar sin alojarse en el hotel?",
        respuesta:
          "El complejo ofrece acceso de day-pass a sus piscinas termales además de alojamiento. Los horarios y valores de entrada se confirman en el sitio oficial (puyehue.cl), ya que varían por temporada.",
      },
    ],
    urlFuente: "https://puyehue.cl/",
    wikipediaTitle: "Termas de Puyehue",
    relacionados: [{ tipo: "parque", slug: "puyehue" }],
  },
]

export function getTermaEntry(slug: string): TermaEntry | null {
  return TERMAS_CATALOG.find((t) => t.slug === slug) ?? null
}
