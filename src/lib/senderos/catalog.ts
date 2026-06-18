// Augments SENDEROS from map-data.ts. coordinates: [lng, lat]
// Properties from map-data are duplicated here for type-safety in pages

import type { Interest, Season } from "@/lib/planner/types"

export type Dificultad = "baja" | "baja-moderada" | "moderada" | "moderada-alta" | "alta"

export type SenderoEntry = {
  slug: string
  title: string
  // [lng, lat] — consistent with map-data.ts
  coordinates: [number, number]
  description: string
  distancia: string
  duracion: string
  dificultad: Dificultad
  desnivel?: string
  inicio: string
  parqueSlug: string
  parqueName: string
  bestMonths: string[]
  // cross-references
  faunaEspecies: string[]
  gearInterests: Interest[]     // filters ALL_GEAR from planner/data.ts
  gearSeasons: Season[]         // additional season filter
  highlights: string[]
  tips: string[]
}

export const SENDEROS_CATALOG: SenderoEntry[] = [
  {
    slug: "laguna-de-los-tres",
    title: "Laguna de los Tres",
    coordinates: [-72.91, -49.27],
    description:
      "El trek más icónico de El Chaltén y uno de los más impresionantes del mundo. 21 km de ida y vuelta con 800 m de desnivel, culminando en una laguna glaciar con vista frontal e inmediata al Fitz Roy (3.405 m). El ascenso final es técnico sobre roca suelta, pero el premio es inigualable.",
    distancia: "22 km",
    duracion: "8–10 horas",
    dificultad: "moderada-alta",
    desnivel: "+800 m",
    inicio: "El Chaltén (Sendero al Fitz Roy)",
    parqueSlug: "los-glaciares",
    parqueName: "Los Glaciares",
    bestMonths: ["Oct", "Nov", "Dic", "Ene", "Feb", "Mar", "Abr"],
    faunaEspecies: ["condor-andino", "guanaco"],
    gearInterests: ["trekking", "fotografia"],
    gearSeasons: ["verano", "otono", "primavera"],
    highlights: [
      "Vista directa al Fitz Roy desde la laguna glaciar — la mejor del Parque",
      "Laguna Sucia — de color verde turquesa por sedimentos glaciares, a mitad del camino",
      "Sendero completamente gratuito, sin permiso necesario",
      "Salida recomendada antes de las 7 AM para evitar nublados de tarde",
    ],
    tips: [
      "El cielo despeja con más frecuencia en las mañanas — salir antes de las 7 AM",
      "Llevar al menos 3 litros de agua: el sendero tiene pocas fuentes seguras",
      "El tramo final sobre roca suelta (últimos 200 m) es el más exigente",
      "Hay un refugio privado (Poincenot) a 14 km donde se puede dejar mochilas",
    ],
  },
  {
    slug: "circuito-w",
    title: "Circuito W — Torres del Paine",
    coordinates: [-73.0, -51.03],
    description:
      "El clásico de la Patagonia chilena. El 'W' recorre en 80 km los tres brazos principales del parque: Las Torres (granito puro), el Valle del Francés (anfiteatro de glaciares colgantes) y el Glaciar Grey (témpanos azules en el lago). Se puede hacer en refugios o camping, en 4 a 5 días.",
    distancia: "80 km",
    duracion: "4–5 días",
    dificultad: "moderada",
    desnivel: "+1.200 m acumulado",
    inicio: "Pudeto o Las Torres (según dirección)",
    parqueSlug: "torres-del-paine",
    parqueName: "Torres del Paine",
    bestMonths: ["Oct", "Nov", "Dic", "Ene", "Feb", "Mar"],
    faunaEspecies: ["guanaco", "condor-andino", "puma", "zorro-gris"],
    gearInterests: ["trekking", "fotografia", "naturaleza"],
    gearSeasons: ["verano", "primavera"],
    highlights: [
      "Torres al amanecer — luz rosada sobre el granito, la foto más buscada de Patagonia",
      "Valle del Francés — anfiteatro natural con glaciares colgantes y cóndores sobrevolando",
      "Glaciar Grey — kayak entre témpanos de 10 metros o trekking sobre el hielo",
      "El viento del Paine — parte de la experiencia, Roaring Forties en todo su esplendor",
    ],
    tips: [
      "Reservar refugios con 6 a 8 meses de anticipación (temporada alta: se agotan en horas)",
      "El viento puede superar 100 km/h — campera de lluvia y gafas de sol obligatorias",
      "Llevar el circuito de O a E (Refugio Grey → Las Torres) da mejores condiciones de luz",
      "CONAF cobra entrada adicional al parque ($36–55 USD) sobre el costo de los refugios",
    ],
  },
  {
    slug: "diente-de-navarino",
    title: "Diente de Navarino",
    coordinates: [-68.5, -54.93],
    description:
      "El trekking más remoto del planeta accesible sin helicóptero. 53 km en un circuito de alta montaña en la Isla Navarino, al sur del Canal Beagle, con vistas a los dientes de roca volcánica de hasta 1.000 m. Solo para trekkers experimentados: no hay rescate garantizado y el clima es extremo.",
    distancia: "53 km",
    duracion: "4–6 días",
    dificultad: "alta",
    desnivel: "+3.200 m acumulado",
    inicio: "Puerto Williams (Isla Navarino, Chile)",
    parqueSlug: "tierra-del-fuego",
    parqueName: "Tierra del Fuego",
    bestMonths: ["Dic", "Ene", "Feb"],
    faunaEspecies: ["cauquen-comun", "zorro-gris"],
    gearInterests: ["trekking", "naturaleza"],
    gearSeasons: ["verano"],
    highlights: [
      "El trekking más austral del mundo — al sur del Canal Beagle",
      "Los Dientes — picos volcánicos de roca negra sobre lagos de altura",
      "Cero infraestructura — no hay refugios, solo campings sin servicio",
      "Vista aérea del Canal Beagle y Cabo de Hornos en días despejados",
    ],
    tips: [
      "Permiso obligatorio en Carabineros de Puerto Williams antes de salir",
      "No hay señal de celular ni GPS confiable — llevar mapa físico y brújula",
      "El barro y la turba hacen el avance muy lento — calcular tiempo extra",
      "Solo para grupos de 2+ personas con experiencia en alta montaña",
    ],
  },
  {
    slug: "huemul-circuit",
    title: "Huemul Circuit",
    coordinates: [-73.0, -49.33],
    description:
      "El circuito más técnico de Los Glaciares. 60 km con cruces de glaciares mediante cuelgas (tirolesas básicas), vistas al glaciar Perito Moreno desde arriba y la posibilidad de avistar el escurridizo huemul en su hábitat. Solo para trekkers con experiencia en terreno glaciar.",
    distancia: "60 km",
    duracion: "4 días",
    dificultad: "alta",
    desnivel: "+1.800 m acumulado",
    inicio: "El Chaltén (a 3 km del centro)",
    parqueSlug: "los-glaciares",
    parqueName: "Los Glaciares",
    bestMonths: ["Dic", "Ene", "Feb"],
    faunaEspecies: ["huemul", "condor-andino", "guanaco"],
    gearInterests: ["trekking", "naturaleza"],
    gearSeasons: ["verano"],
    highlights: [
      "Cuatro cuelgas (tirolesas) sobre ríos glaciares — el factor diferenciador",
      "Vista superior al glaciar Perito Moreno — ángulo que no ven los turistas en las pasarelas",
      "Zona de avistamiento de huemul — el ciervo patagónico más raro del mundo",
      "Campamentos a orilla de ríos de glaciar — soledad total",
    ],
    tips: [
      "Registrarse obligatoriamente en el PNGL antes de partir",
      "Las cuelgas pueden estar bloqueadas por crecida de ríos — consultar condiciones",
      "Llevar suficiente comida: no hay reabastecimiento posible",
      "Requiere grupo: no apto para solistas",
    ],
  },
  {
    slug: "cerro-tronador",
    title: "Cerro Tronador",
    coordinates: [-71.88, -41.16],
    description:
      "El único volcán extinguido con glaciares activos de la Patagonia argentina. El Ventisquero Negro, visible desde el camino, es un glaciar de color oscuro por los sedimentos que arrastra. La caminata hasta la base del Tronador (3.491 m) ofrece vistas a los seracs de hielo y los saltos de agua glaciar.",
    distancia: "18 km",
    duracion: "7–9 horas",
    dificultad: "moderada",
    desnivel: "+600 m",
    inicio: "Pampa Linda (55 km de Bariloche por ruta de ripio)",
    parqueSlug: "nahuel-huapi",
    parqueName: "Nahuel Huapi",
    bestMonths: ["Dic", "Ene", "Feb"],
    faunaEspecies: ["condor-andino"],
    gearInterests: ["trekking", "fotografia", "naturaleza"],
    gearSeasons: ["verano"],
    highlights: [
      "Ventisquero Negro — glaciar de color oscuro por sedimentos, único en la Patagonia",
      "Cascadas de seracs — bloques de hielo que caen del volcán con estruendo",
      "Bosque de arrayán en el camino a Pampa Linda",
      "Opcional: ascenso técnico al cráter del Tronador (requiere crampones y guía)",
    ],
    tips: [
      "El acceso por ripio desde Bariloche es de 2h — salir bien temprano",
      "En enero-febrero el camino se llena: ir entre semana o en la primera salida",
      "Los crujidos del glaciar (el 'trueno' que da nombre al volcán) son más audibles por las tardes",
      "Pampa Linda tiene un refugio con comida básica — no hay más servicios",
    ],
  },
  {
    slug: "volcan-lanin",
    title: "Ascenso al Volcán Lanín",
    coordinates: [-71.47, -39.64],
    description:
      "El cono perfecto del Lanín (3.776 m) es el ascenso técnico más accesible de la Patagonia argentina. Se hace en 2 días con una noche en el refugio de altura (2.000 m). Requiere crampones, piolet y autorización previa del Parque Nacional Lanín. El panorama desde la cumbre abarca Chile y Argentina.",
    distancia: "24 km",
    duracion: "2 días",
    dificultad: "alta",
    desnivel: "+2.400 m",
    inicio: "Paso Tromen (57 km de Junín de los Andes)",
    parqueSlug: "lanin",
    parqueName: "Lanín",
    bestMonths: ["Ene", "Feb"],
    faunaEspecies: ["condor-andino"],
    gearInterests: ["trekking", "naturaleza"],
    gearSeasons: ["verano"],
    highlights: [
      "Cima del Lanín (3.776 m) — el volcán más alto de la Patagonia argentina",
      "Cráter activo y fumarolas visibles desde la cumbre",
      "Vista al Lago Huechulafquen y a decenas de lagos patagónicos",
      "Bosques de pehuén (araucaria) en el camino hasta la línea de nieve",
    ],
    tips: [
      "Permiso obligatorio en la Intendencia del Parque Lanín (Junín de los Andes o San Martín)",
      "El cupo es limitado: reservar con semanas de anticipación en temporada",
      "Crampones de 10 puntas y piolet son obligatorios — se pueden alquilar en San Martín",
      "El ascenso nocturno (salida a las 2-3 AM) evita el calor que ablanda la nieve",
    ],
  },
  {
    slug: "sendero-de-los-cipreses",
    title: "Sendero de los Cipreses",
    coordinates: [-71.38, -41.0],
    description:
      "Caminata suave entre cipreses de la cordillera centenarios en el corazón de Nahuel Huapi. Un sendero accesible para familias y principiantes, con arroyos, pastizales de altura y vistas al Cerro Campanario.",
    distancia: "8 km",
    duracion: "3–4 horas",
    dificultad: "baja",
    desnivel: "+250 m",
    inicio: "Villa La Angostura (acceso desde el centro del pueblo)",
    parqueSlug: "nahuel-huapi",
    parqueName: "Nahuel Huapi",
    bestMonths: ["Oct", "Nov", "Dic", "Ene", "Feb", "Mar", "Abr"],
    faunaEspecies: ["coipo"],
    gearInterests: ["naturaleza", "fotografia"],
    gearSeasons: ["verano", "otono", "primavera"],
    highlights: [
      "Bosque de cipreses de la cordillera — árbol endémico del sur de Sudamérica",
      "Arroyo con puentes de madera y piletas naturales",
      "Ideal para familias con niños — sin tramos técnicos",
      "Villa La Angostura en la llegada — para almorzar junto al lago Nahuel Huapi",
    ],
    tips: [
      "Sendero muy corto: combinarlo con el Circuito Chico en el mismo día",
      "En otoño (marzo-mayo) los colores del bosque son espectaculares",
      "Llevar repelente: hay mosquitos en los tramos húmedos",
    ],
  },
  {
    slug: "laguna-esmeralda",
    title: "Laguna Esmeralda",
    coordinates: [-68.49, -54.78],
    description:
      "La caminata más popular de Ushuaia. 15 km de ida y vuelta que atraviesan turbales, bosques de lenga y ñire, culminando en una laguna de color verde esmeralda formada por glaciares disueltos. Una muestra perfecta del ecosistema fueguino sin la exigencia de un trekking técnico.",
    distancia: "15 km",
    duracion: "5–6 horas",
    dificultad: "baja-moderada",
    desnivel: "+350 m",
    inicio: "Ushuaia (7 km del centro por Ruta Complementaria J)",
    parqueSlug: "tierra-del-fuego",
    parqueName: "Tierra del Fuego",
    bestMonths: ["Oct", "Nov", "Dic", "Ene", "Feb", "Mar"],
    faunaEspecies: ["cauquen-comun", "zorro-gris"],
    gearInterests: ["naturaleza", "fotografia"],
    gearSeasons: ["verano", "primavera"],
    highlights: [
      "La laguna — color verde esmeralda intenso por sedimentos glaciares",
      "Turbales — el paisaje más típico de Tierra del Fuego, suelo esponjoso",
      "Bosque de lenga y ñire — el otoño los tiñe de rojo y naranja (Mar-May)",
      "Accesible desde el centro de Ushuaia sin necesidad de contratista",
    ],
    tips: [
      "El camino a la laguna es un ripio marcado pero hay barro en los turbales: llevar botas impermeables",
      "El taxi hasta el inicio sale aproximadamente USD 10 desde el centro",
      "Llegar temprano: es el trekking más transitado de Ushuaia",
      "El otoño (marzo-mayo) ofrece colores únicos aunque el clima es más impredecible",
    ],
  },
]

export function getSenderoEntry(slug: string): SenderoEntry | null {
  return SENDEROS_CATALOG.find((s) => s.slug === slug) ?? null
}

export const DIFICULTAD_LABELS: Record<Dificultad, string> = {
  baja: "Baja",
  "baja-moderada": "Baja–Moderada",
  moderada: "Moderada",
  "moderada-alta": "Moderada–Alta",
  alta: "Alta",
}

export const DIFICULTAD_COLORS: Record<Dificultad, string> = {
  baja: "text-green-600",
  "baja-moderada": "text-yellow-600",
  moderada: "text-yellow-600",
  "moderada-alta": "text-orange-500",
  alta: "text-red-500",
}
