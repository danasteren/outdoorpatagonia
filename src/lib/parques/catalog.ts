// Catalog augments PARQUES from map-data.ts — coordinates use [lng, lat] convention

import type { Relacionado } from "@/lib/relacionados"

export type ParqueEntry = {
  slug: string
  name: string
  country: "ar" | "cl"
  province?: string
  region?: string
  surface: string
  // [lng, lat] — consistent with map-data.ts and planner/data.ts
  coordinates: [number, number]
  description: string
  highlights: string[]
  howToGet: string
  entryFee: string
  bestMonths: string[]
  website?: string
  // Manual override for the hero photo — used when the auto-fetched
  // Wikipedia lead image is missing or doesn't represent the park well.
  heroImageUrl?: string
  // Override the Wikipedia article title used for the hero image lookup.
  // Default: "Parque nacional ${name}" — set this when the auto-title
  // resolves to the wrong article (e.g. name collision between AR/CL).
  wikipediaTitle?: string
  // cross-references to existing data
  plannerDestinationId?: string          // key in DESTINATIONS from planner/data.ts
  faunaEspecies: string[]                // slugs in FAUNA_CATALOG
  senderosEnElParque: string[]           // slugs in SENDEROS_CATALOG
  // planner location name for filtering ALL_ACCOMMODATIONS + ALL_TOURS
  plannerLocation?: string
  // GetYourGuide search links — label shown to user, query sent to gygSearchUrl()
  gygTours?: Array<{ label: string; query: string }>
  relacionados?: Relacionado[]
}

export const PARQUES_CATALOG: ParqueEntry[] = [
  {
    slug: "nahuel-huapi",
    name: "Nahuel Huapi",
    country: "ar",
    province: "Neuquén / Río Negro",
    surface: "717.261 ha",
    coordinates: [-71.32, -41.17],
    description:
      "El parque nacional más antiguo de Argentina, fundado en 1934. Cubre el corazón de la Patagonia andina con lagos de color turquesa, volcanes nevados, bosques de lenga y coihue, y un sistema de humedales único. El lago Nahuel Huapi, con sus 560 km² de extensión, es el espejo de agua que lo define.",
    highlights: [
      "Cerro Campanario — panorama 360° de los lagos desde la silla aérea",
      "Circuito Chico — lagos Moreno, Llao Llao y Colonia Suiza en un día",
      "Cerro Catedral — mayor centro de esquí de Sudamérica (ski invierno, trek verano)",
      "Isla Victoria y Bosque de Arrayanes — navegación y bosque de arrayán único en el mundo",
    ],
    howToGet:
      "Vuelo directo desde Buenos Aires al aeropuerto de Bariloche (BRC), 2 horas. Desde el centro de Bariloche todos los accesos al parque están a menos de 45 minutos en auto, combi o colectivo urbano.",
    entryFee: "USD 10–18 por persona (varía por temporada)",
    bestMonths: ["Dic", "Ene", "Feb", "Mar", "Jun", "Jul", "Ago"],
    website: "https://www.argentina.gob.ar/parques-nacionales/nahuelhuapi",
    plannerDestinationId: "bariloche",
    plannerLocation: "Bariloche",
    faunaEspecies: ["condor-andino", "huemul", "coipo"],
    senderosEnElParque: ["cerro-tronador", "sendero-de-los-cipreses"],
    gygTours: [
      { label: "Excursión Circuito Chico", query: "bariloche circuito chico tour" },
      { label: "Navegación Isla Victoria", query: "bariloche isla victoria tour" },
      { label: "Trekking Cerro Catedral", query: "bariloche cerro catedral trekking" },
    ],
  },
  {
    slug: "lanin",
    name: "Lanín",
    country: "ar",
    province: "Neuquén",
    surface: "412.014 ha",
    coordinates: [-71.47, -39.64],
    description:
      "Dominado por el imponente volcán Lanín (3.776 m), uno de los conos volcánicos más perfectos del mundo, el parque es también hogar del araucario o pehuén, árbol milenario sagrado para el pueblo mapuche. Siete lagos atraviesan sus 412.000 hectáreas, uniendo bosques de coihue, ciprés y raulí.",
    highlights: [
      "Ascenso al Volcán Lanín (3.776 m) — requiere permiso y crampones",
      "Lago Huechulafquen — el más grande del parque, pesca de trucha",
      "Bosques de pehuén (araucaria) — árboles de hasta 1.000 años",
      "San Martín de los Andes — base de operaciones con gastronomía patagónica",
    ],
    howToGet:
      "Vuelo a Chapelco (SMQ) o Bariloche (BRC). Desde Bariloche, colectivo o auto por RN234 hasta San Martín de los Andes (2.5h). Desde ahí, accesos al parque a 10–50 km.",
    entryFee: "USD 8–15 por persona",
    bestMonths: ["Dic", "Ene", "Feb", "Mar"],
    website: "https://www.argentina.gob.ar/parques-nacionales/lanin",
    faunaEspecies: ["condor-andino"],
    senderosEnElParque: ["volcan-lanin"],
    gygTours: [
      { label: "Ascenso Volcán Lanín", query: "volcan lanin trekking tour" },
      { label: "Tour San Martín de los Andes", query: "san martin de los andes tour" },
    ],
  },
  {
    slug: "los-alerces",
    name: "Los Alerces",
    country: "ar",
    province: "Chubut",
    surface: "263.000 ha",
    coordinates: [-71.79, -42.84],
    description:
      "Patrimonio de la Humanidad UNESCO desde 2017, Los Alerces protege uno de los últimos bosques de alerce patagónico (Fitzroya cupressoides), árboles que pueden vivir más de 3.000 años y alcanzar 70 metros de altura. El lago Menéndez, con aguas de color verde esmeralda, es el centro del parque.",
    highlights: [
      "Alerce El Abuelo — árbol de 2.600 años de antigüedad (solo accesible en barco)",
      "Lago Menéndez — navegación entre bosques primarios y glaciar Torrecillas",
      "Lago Futalaufquen — camping, kayak y pesca de truchas y salmones",
      "Sendero El Dedal — vistas panorámicas del cordón andino",
    ],
    howToGet:
      "Vuelo a Bariloche (BRC) o Esquel (EQS). Desde Esquel, RP71 hasta Villa Futalaufquen (30 km). También se puede llegar en colectivo desde Esquel.",
    entryFee: "USD 8–15 por persona",
    bestMonths: ["Nov", "Dic", "Ene", "Feb", "Mar", "Abr"],
    website: "https://www.argentina.gob.ar/parques-nacionales/losalerces",
    faunaEspecies: ["coipo"],
    senderosEnElParque: [],
    gygTours: [
      { label: "Navegación Lago Menéndez", query: "los alerces lake tour esquel" },
      { label: "Tour Alerce El Abuelo", query: "los alerces ancient alerce tree tour" },
    ],
  },
  {
    slug: "lago-puelo",
    name: "Lago Puelo",
    country: "ar",
    province: "Chubut",
    surface: "27.674 ha",
    coordinates: [-71.61, -42.12],
    description:
      "Pequeño pero único: el Lago Puelo es el único lago patagónico con salida al Pacífico, a través del río Puelo hacia Chile. Sus aguas color turquesa, rodeadas de bosques de arrayán y mirtáceas, lo convierten en el parque más cálido y húmedo de la Patagonia argentina.",
    highlights: [
      "Cruce lacustre a Chile — navegación entre bosques hasta la frontera",
      "Lago Puelo — aguas calmas ideales para kayak y sup",
      "Sendero Las Lágrimas — cascadas entre bosques de arrayán",
      "El Bolsón — pueblo artesanal y feria regional a 18 km",
    ],
    howToGet:
      "Vuelo a Bariloche (BRC), luego combi o auto a El Bolsón (2h, 127 km). Desde El Bolsón, combi o taxi 18 km al parque. También existen colectivos directos desde Bariloche.",
    entryFee: "USD 5–10 por persona",
    bestMonths: ["Nov", "Dic", "Ene", "Feb", "Mar", "Abr"],
    website: "https://www.argentina.gob.ar/parques-nacionales/lagopuelo",
    faunaEspecies: ["coipo"],
    senderosEnElParque: [],
  },
  {
    slug: "perito-moreno",
    name: "Perito Moreno",
    country: "ar",
    province: "Santa Cruz",
    surface: "115.000 ha",
    coordinates: [-72.03, -47.92],
    description:
      "Uno de los parques más remotos y vírgenes de Argentina. Sin infraestructura turística masiva, ofrece una experiencia de naturaleza auténtica: lagunas de altura, bosques de lenga y ñire, y la posibilidad de no cruzarse con nadie en días enteros. Ideal para visitantes que buscan soledad patagónica.",
    highlights: [
      "Lago Belgrano — el lago de color azul intenso del sur de Santa Cruz",
      "Lagunas Nansen y Volcán — escenarios de película sin turistas",
      "Cerro San Lorenzo (3.706 m) — accesible solo con guía y experiencia alpina",
      "Oscuridad total — sin contaminación lumínica, cielos estrellados nítidos",
    ],
    howToGet:
      "Muy remoto. Vuelo a Perito Moreno (PMQ) o Gobernador Gregores. Desde allí, auto 4x4 (obligatorio, caminos de ripio) hasta la intendencia. No hay transporte público al parque.",
    entryFee: "Gratuito o arancel bajo (verificar en temporada)",
    bestMonths: ["Nov", "Dic", "Ene", "Feb"],
    website: "https://www.argentina.gob.ar/parques-nacionales/peritomoreno",
    // Wikipedia's lead image for this article is a generic lenga forest
    // shot, not representative — using a real Lago Belgrano photo instead.
    heroImageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/c/c4/%C3%81rea_protegida-Parque_Nacional_Perito_Moreno.jpg",
    faunaEspecies: ["huemul", "guanaco"],
    senderosEnElParque: [],
  },
  {
    slug: "los-glaciares",
    name: "Los Glaciares",
    country: "ar",
    province: "Santa Cruz",
    surface: "724.929 ha",
    coordinates: [-73.03, -50.05],
    description:
      "Patrimonio de la Humanidad UNESCO. El parque más visitado de la Patagonia argentina alberga dos íconos: el Glaciar Perito Moreno — el único glaciar del mundo que avanza — y el Cerro Fitz Roy (3.405 m), símbolo de la escalada técnica. Dos sectores separados: El Calafate (glaciares) y El Chaltén (trekking).",
    highlights: [
      "Glaciar Perito Moreno — el único glaciar en equilibrio, con rupturas de hielo espectaculares",
      "Mini Trekking sobre el glaciar — caminata con crampones sobre el hielo",
      "Laguna de los Tres — vista frontal al Fitz Roy tras 21 km de trek",
      "Safari náutico por Lago Argentino — glaciares Upsala y Spegazzini desde el agua",
    ],
    howToGet:
      "Vuelo directo desde Buenos Aires al aeropuerto El Calafate (FTE), 2.5 horas. El sector glaciares está a 80 km de El Calafate (bus de línea —Cal Tur, Taqsa, Chaltén Travel—, transfer privado o excursión con guía, 1h30 de viaje). El sector Fitz Roy: bus desde El Calafate a El Chaltén (3h).",
    entryFee:
      "$45.000 ARS turistas extranjeros, $15.000 ARS residentes argentinos, $5.000 ARS residentes de Santa Cruz (tarifas 2026, sujetas a actualización — confirmar en argentina.gob.ar/parquesnacionales/tarifas)",
    bestMonths: ["Oct", "Nov", "Dic", "Ene", "Feb", "Mar", "Abr"],
    website: "https://www.argentina.gob.ar/parques-nacionales/glaciares",
    plannerDestinationId: "calafate",
    plannerLocation: "El Calafate",
    faunaEspecies: ["guanaco", "condor-andino", "huemul", "coipo", "zorro-gris"],
    senderosEnElParque: ["laguna-de-los-tres", "huemul-circuit"],
    gygTours: [
      { label: "Tour Glaciar Perito Moreno", query: "perito moreno glacier tour el calafate" },
      { label: "Trekking Fitz Roy — El Chaltén", query: "el chalten fitz roy trekking" },
      { label: "Safari náutico Lago Argentino", query: "el calafate lago argentino boat tour" },
    ],
  },
  {
    slug: "monte-leon",
    name: "Monte León",
    country: "ar",
    province: "Santa Cruz",
    surface: "62.169 ha",
    coordinates: [-68.86, -50.34],
    description:
      "El primer parque nacional marino de Argentina, creado en 2004. Combina 40 km de costa atlántica con acantilados de toba volcánica, colonias de pingüinos, lobos y elefantes marinos, y la Isla Monte León, refugio de cormoranes y gaviotas. Muy poco visitado, lo que lo hace especialmente auténtico.",
    highlights: [
      "Pingüinera de Monte León — 60.000+ parejas de pingüinos de Magallanes",
      "Cueva del Indio y La Olla — formaciones rocosas marinas únicas",
      "Elefantes marinos — machos de hasta 4 toneladas en época de celo (Sep-Nov)",
      "Costa sin turistas — senderos sin señalización masiva, contacto directo con fauna",
    ],
    howToGet:
      "Vuelo a Río Gallegos (RGL). Por RN3, 110 km hacia el norte (aprox. 1.5h). El parque no tiene transporte público; se requiere auto propio o excursión organizada desde Río Gallegos o El Calafate.",
    entryFee: "Gratuito",
    bestMonths: ["Sep", "Oct", "Nov", "Dic", "Ene", "Feb"],
    website: "https://www.argentina.gob.ar/parques-nacionales/monteleon",
    faunaEspecies: ["pinguino-de-magallanes", "lobo-marino-del-sur", "elefante-marino-del-sur"],
    senderosEnElParque: [],
  },
  {
    slug: "tierra-del-fuego",
    name: "Tierra del Fuego",
    country: "ar",
    province: "Tierra del Fuego",
    surface: "63.000 ha",
    coordinates: [-68.32, -54.87],
    description:
      "El parque más austral del planeta. A 11 km de Ushuaia, marca el fin de la Ruta Nacional 3 y el inicio del Canal Beagle. Bosques de lenga y ñire, turbales, bahías y una atmósfera del fin del mundo que no tiene parangón. El Tren del Fin del Mundo conecta el centro de Ushuaia con el parque.",
    highlights: [
      "Bahía Lapataia — el fin de la Ruta 3, punto más austral de toda Argentina",
      "Lago Roca y Laguna Verde — senderismo suave entre lengas y flamencos",
      "Tren del Fin del Mundo — ferrocarril histórico al interior del parque",
      "Laguna Esmeralda — turba, lengas y agua color verde esmeralda (15 km ida y vuelta)",
    ],
    howToGet:
      "Vuelo directo desde Buenos Aires a Ushuaia (USH), 3 horas. El parque está a 11 km del centro de Ushuaia por RN3. Hay colectivos regulares y taxis desde la ciudad.",
    entryFee: "USD 10–15 por persona",
    bestMonths: ["Nov", "Dic", "Ene", "Feb", "Mar"],
    website: "https://www.argentina.gob.ar/parques-nacionales/tierradelfuego",
    plannerDestinationId: "ushuaia",
    plannerLocation: "Ushuaia",
    faunaEspecies: ["pinguino-de-magallanes", "cauquen-comun", "zorro-gris"],
    senderosEnElParque: ["laguna-esmeralda"],
    gygTours: [
      { label: "Tour Parque Tierra del Fuego", query: "ushuaia tierra del fuego national park tour" },
      { label: "Tren del Fin del Mundo", query: "ushuaia end of the world train" },
      { label: "Navegación Canal Beagle", query: "ushuaia beagle channel tour" },
    ],
  },
  {
    slug: "vicente-perez-rosales",
    name: "Vicente Pérez Rosales",
    country: "cl",
    region: "Los Lagos",
    surface: "251.320 ha",
    coordinates: [-72.14, -41.01],
    description:
      "El parque nacional más antiguo de Chile, creado en 1926. El volcán Osorno (2.652 m) — cono perfecto cubierto de nieve — domina el paisaje junto al lago Todos Los Santos, llamado 'Lago Esmeralda' por el color de sus aguas. Los saltos de Petrohué son el acceso más popular al parque.",
    highlights: [
      "Volcán Osorno — ascenso técnico o solo contemplación desde la base",
      "Lago Todos Los Santos — travesía lacustre hacia Argentina (cruce de lagos)",
      "Saltos de Petrohué — rápidos en basalto volcánico, aptos para kayak",
      "Cruce de los Lagos — ruta lacustre entre Puerto Montt y Bariloche",
    ],
    howToGet:
      "Vuelo a Puerto Montt (PMC) o Osorno. Desde Puerto Montt, bus o auto a Puerto Varas (30 min) y luego a Petrohué (2h total). También hay tours directos desde Puerto Varas.",
    entryFee: "USD 5–10 por persona",
    bestMonths: ["Nov", "Dic", "Ene", "Feb", "Mar"],
    website: "https://parqueperezrosales.cl",
    faunaEspecies: ["condor-andino"],
    senderosEnElParque: [],
  },
  {
    slug: "puyehue",
    name: "Puyehue",
    country: "cl",
    region: "Los Lagos",
    surface: "107.000 ha",
    coordinates: [-72.18, -40.72],
    description:
      "El volcán Puyehue y la cadena Cordón Caulle, famosa por su erupción de 2011 que llenó de cenizas el sur del continente, son los protagonistas de este parque. Las termas de Aguas Calientes y el bosque siempreverde hacen de Puyehue una opción accesible y diversa.",
    highlights: [
      "Termas de Aguas Calientes — aguas termales en plena selva valdiviana",
      "Volcán Puyehue y Cordón Caulle — campo de lava de 2011, paisaje lunar",
      "Sendero El Pionero — bosque de arrayán y roble pellín milenario",
      "Paso Cardenal Samoré — cruce fronterizo de menor tráfico a Argentina",
    ],
    howToGet:
      "Vuelo a Osorno (ZOS) o Puerto Montt (PMC). Desde Osorno, ruta U-215 directo al parque (80 km, aprox. 1.5h). Hay buses locales desde Osorno.",
    entryFee: "USD 5–10 por persona",
    bestMonths: ["Nov", "Dic", "Ene", "Feb"],
    website: "https://www.conaf.cl/parques/parque-nacional-puyehue/",
    faunaEspecies: ["condor-andino"],
    senderosEnElParque: [],
    relacionados: [{ tipo: "termas", slug: "puyehue" }],
  },
  {
    slug: "chiloe",
    name: "Chiloé",
    country: "cl",
    region: "Los Lagos",
    surface: "43.057 ha",
    coordinates: [-73.93, -42.45],
    description:
      "El parque nacional de la Isla Grande de Chiloé protege los últimos bosques de tepas y tiques en la costa del Pacífico sur. Pero Chiloé es también cultura: palafitos, iglesias de madera UNESCO, mitología local y una gastronomía única hacen de esta isla una experiencia totalmente distinta al resto de la Patagonia.",
    highlights: [
      "Playa de Cole Cole — playa pacífica sin acceso en vehículo, solo a pie o kayak",
      "Sector Cucao — portal de entrada con laguna costera y bosque siempreverde",
      "Dalcahue y Castro — palafitos y cultura chilota auténtica",
      "Pingüinos de Magallanes en islotes cercanos (temporada Oct-Feb)",
    ],
    howToGet:
      "Vuelo directo desde Santiago a Castro (MHC) en Chiloé, o a Puerto Montt y ferry a Chaitén / Quellón. Desde Castro, bus a Cucao (2h).",
    entryFee: "USD 3–8 por persona",
    bestMonths: ["Nov", "Dic", "Ene", "Feb"],
    website: "https://www.conaf.cl/parques/parque-nacional-chiloe/",
    faunaEspecies: ["pinguino-de-magallanes"],
    senderosEnElParque: [],
  },
  {
    slug: "queulat",
    name: "Queulat",
    country: "cl",
    region: "Aysén",
    surface: "154.093 ha",
    coordinates: [-72.68, -44.34],
    description:
      "El ventisquero colgante de Queulat — un glaciar suspendido sobre la roca, del que caen cascadas constantes — es una de las imágenes más icónicas de la Carretera Austral. El parque cubre una selva valdiviana densa y húmeda, con fiordos, ríos color café y casi sin visitantes en comparación con el resto de la Patagonia.",
    highlights: [
      "Ventisquero Colgante — glaciar suspendido sobre la roca, accesible en kayak y a pie",
      "Fiordos aiséninos — canales de agua helada entre bosques primarios",
      "Río Queulat — aguas color café de la turba, ideal para pesca de trucha",
      "Soledad total — el parque recibe muy pocos visitantes incluso en temporada alta",
    ],
    howToGet:
      "Vuelo a Balmaceda (BBA) o Coyhaique. Desde Coyhaique, conducir hacia el norte por la Carretera Austral aprox. 200 km (3.5h). También hay buses desde Coyhaique, aunque poco frecuentes.",
    entryFee: "USD 5–10 por persona",
    bestMonths: ["Nov", "Dic", "Ene", "Feb"],
    website: "https://www.conaf.cl/parques/parque-nacional-queulat/",
    faunaEspecies: [],
    senderosEnElParque: [],
    relacionados: [{ tipo: "termas", slug: "puyuhuapi" }],
  },
  {
    slug: "torres-del-paine",
    name: "Torres del Paine",
    country: "cl",
    region: "Magallanes",
    surface: "242.242 ha",
    coordinates: [-73.0, -51.03],
    description:
      "El parque más fotografiado de Sudamérica. Las tres torres de granito de 2.500 metros, los Cuernos del Paine, el Glaciar Grey y el Valle del Francés forman un escenario que no existe en ningún otro lugar del planeta. Declarado Reserva de la Biósfera, recibe más de 250.000 visitantes al año.",
    highlights: [
      "Mirador Las Torres — ascenso al amanecer para ver las torres en luz rosada",
      "Valle del Francés — cóndores, cascadas y glaciares suspendidos en el anfiteatro",
      "Glaciar Grey — trekking o kayak entre témpanos azules",
      "Los Cuernos — la postal más icónica del parque al atardecer sobre el lago",
    ],
    howToGet:
      "Vuelo desde Santiago a Punta Arenas (PUQ), 3 horas. Bus de Punta Arenas a Puerto Natales (3h). Transfer de Puerto Natales al parque (2h). Total desde Santiago: 8-10h. Alternativamente, vuelo directo a Puerto Natales desde Santiago.",
    entryFee: "USD 36–55 por persona (temporada alta Dec-Feb, hasta USD 90 con estadía en el parque)",
    bestMonths: ["Oct", "Nov", "Dic", "Ene", "Feb", "Mar"],
    website: "https://www.torresdelpaine.com",
    plannerDestinationId: "torres_paine",
    plannerLocation: "Torres del Paine",
    faunaEspecies: ["guanaco", "puma", "condor-andino", "choique", "flamenco-austral", "zorro-gris"],
    senderosEnElParque: ["circuito-w"],
    gygTours: [
      { label: "Trek W — 5 días", query: "torres del paine W trek" },
      { label: "Tour de día desde Puerto Natales", query: "torres del paine day tour" },
      { label: "Kayak Glaciar Grey", query: "torres del paine kayak glacier grey" },
    ],
  },
  {
    slug: "bernardo-ohiggins",
    name: "Bernardo O'Higgins",
    country: "cl",
    region: "Aysén / Magallanes",
    surface: "3.525.901 ha",
    coordinates: [-73.5, -49.5],
    description:
      "El parque nacional más grande de Chile y uno de los más grandes del mundo. Sin acceso terrestre, solo se llega en barco desde Puerto Natales. Campos de hielo patagónicos norte y sur, fiordos, glaciares que caen al mar y una vida silvestre intacta que incluye cóndores, huemules y ballenas azules.",
    highlights: [
      "Glaciar Serrano — el más accesible del parque, en barco desde Puerto Natales",
      "Campos de Hielo Sur — el tercer mayor manto de hielo del mundo",
      "Fiordos del fin del mundo — sin carreteras, solo barcos y kayaks",
      "Avistamiento de ballenas azules — en los canales en temporada (Jan-Mar)",
    ],
    howToGet:
      "Solo acceso en barco desde Puerto Natales (aprox. 3-5 horas para el sector Serrano). No existe acceso terrestre. Las excursiones al Glaciar Serrano salen desde Puerto Natales y combinan con Torres del Paine.",
    entryFee: "Gratuito (el acceso en barco tiene costo según operador)",
    bestMonths: ["Nov", "Dic", "Ene", "Feb"],
    website: "https://www.conaf.cl/parques/parque-nacional-bernardo-ohiggins/",
    faunaEspecies: ["condor-andino", "huemul"],
    senderosEnElParque: [],
  },

  // ─── Argentina — parques faltantes ───────────────────────────────────────────

  {
    slug: "patagonia-sc",
    name: "Patagonia",
    country: "ar",
    province: "Santa Cruz",
    surface: "467.533 ha",
    coordinates: [-72.27, -47.57],
    wikipediaTitle: "Parque nacional Patagonia (Argentina)",
    description:
      "Creado en 2014 a partir de la donación de Tompkins Conservation y la Administración de Parques Nacionales, es el proyecto de rewilding más ambicioso de Argentina. Las estepas de la meseta patagónica se mezclan con cañadones y bosques de lenga en una zona donde el puma, el huemul y el guanaco conviven con paisajes volcánicos únicos.",
    highlights: [
      "Estepas abiertas — avistamiento de pumas y guanacos en extensiones sin barreras",
      "Cañadón Pinturas — acceso al circuito de la Cueva de las Manos (9.000 años de antigüedad)",
      "Trekking por la meseta patagónica — sin masificación turística",
      "Cielos sin contaminación lumínica — astronomía de primer nivel",
    ],
    howToGet:
      "Vuelo a Perito Moreno, Santa Cruz (PMQ). Desde allí, auto por RN40 aprox. 80 km hasta el parque. Se requiere vehículo propio; sin transporte público regular al interior.",
    entryFee: "Gratuito",
    bestMonths: ["Nov", "Dic", "Ene", "Feb"],
    website: "https://www.argentina.gob.ar/parques-nacionales/patagonia",
    faunaEspecies: ["guanaco", "puma", "huemul", "condor-andino", "choique"],
    senderosEnElParque: [],
  },
  {
    slug: "bosques-petrificados-de-jaramillo",
    name: "Bosques Petrificados de Jaramillo",
    country: "ar",
    province: "Santa Cruz",
    surface: "60.369 ha",
    coordinates: [-68.0, -47.78],
    description:
      "El bosque petrificado más grande del hemisferio sur: troncos de araucarias silicificadas de hasta 35 metros de largo y 150 millones de años de antigüedad yacen sobre la estepa patagónica. Fue Monumento Natural desde 1954 y ascendido a Parque Nacional en 2012. La distancia lo mantiene prácticamente sin visitantes.",
    highlights: [
      "Troncos petrificados de hasta 35 m — araucarias del período Jurásico",
      "Formaciones de toba volcánica y mesetas — paisaje de otra época geológica",
      "Silencio total y cielos oscuros — uno de los mejores sitios de astronomía de la Patagonia",
      "Centro de interpretación en el ingreso — sin alojamiento en el parque",
    ],
    howToGet:
      "Vuelo a Comodoro Rivadavia (CRD). Por RN3 sur hasta Caleta Olivia y luego RN12 oeste, aprox. 240 km en total. Se requiere vehículo propio; hay excursiones organizadas desde Puerto Deseado.",
    entryFee: "Gratuito",
    bestMonths: ["Oct", "Nov", "Dic", "Ene", "Feb", "Mar"],
    website: "https://www.argentina.gob.ar/parques-nacionales/bosquespetrificados",
    faunaEspecies: ["guanaco", "choique"],
    senderosEnElParque: [],
  },
  {
    slug: "laguna-blanca",
    name: "Laguna Blanca",
    country: "ar",
    province: "Neuquén",
    surface: "11.250 ha",
    coordinates: [-70.33, -39.03],
    description:
      "El parque más pequeño de la Patagonia y uno de los más especiales: creado en 1940 para proteger la laguna Blanca, un humedal de aguas someras y alcalinas en la estepa volcánica neuquina. Es uno de los pocos lugares del mundo donde el flamenco austral nidifica a 1.200 metros de altitud.",
    highlights: [
      "Laguna Blanca — colonia reproductora de flamencos australes, la más importante de Neuquén",
      "Cisnes de cuello negro — nidifican en los juncales de la laguna (Oct–Feb)",
      "Estepa volcánica y basaltos — paisaje de lava solidificada del volcán Tromen",
      "Aves acuáticas — pato puna, coscoroba, macá grande",
    ],
    howToGet:
      "Vuelo a Neuquén (NQN) o Bariloche (BRC). Desde Zapala por RN40 norte aprox. 30 km hasta el acceso. Hay colectivos desde Neuquén a Zapala; desde Zapala se necesita remís o auto propio.",
    entryFee: "Gratuito",
    bestMonths: ["Oct", "Nov", "Dic", "Ene", "Feb", "Mar"],
    website: "https://www.argentina.gob.ar/parques-nacionales/lagunablanca",
    faunaEspecies: ["flamenco-austral", "condor-andino"],
    senderosEnElParque: [],
  },

  // ─── Chile — parques faltantes ────────────────────────────────────────────────

  {
    slug: "alerce-andino",
    name: "Alerce Andino",
    country: "cl",
    region: "Los Lagos",
    surface: "39.255 ha",
    coordinates: [-72.5, -41.6],
    description:
      "Creado en 1982 para proteger los bosques de alerce patagónico (Fitzroya cupressoides), árbol declarado Monumento Natural en Chile. Los alerces de este parque pueden superar los 3.600 años de edad, convirtiéndolos en los organismos vivos más antiguos del hemisferio sur. Cubre un ambiente húmedo de fiordos y valles andinos entre Puerto Montt y Hornopirén.",
    highlights: [
      "Alerces de hasta 3.600 años de antigüedad — los árboles más viejos del hemisferio sur",
      "Lago Chapo — el mayor lago del parque, kayak y pesca",
      "Sendero Laguna Sargazo — trekking entre alerces centenarios",
      "Vistas al volcán Calbuco — desde los senderos de altura",
    ],
    howToGet:
      "Vuelo a Puerto Montt (PMC). Desde Puerto Montt al sector Correntoso aprox. 35 km sureste (1 h en auto). Acceso alternativo desde Lenca por la carretera a Cochamó.",
    entryFee: "CLP 3.000–5.000 por persona (verificar en CONAF)",
    bestMonths: ["Nov", "Dic", "Ene", "Feb"],
    website: "https://www.conaf.cl/parques/parque-nacional-alerce-andino/",
    faunaEspecies: ["condor-andino", "puma"],
    senderosEnElParque: [],
  },
  {
    slug: "hornopiren",
    name: "Hornopirén",
    country: "cl",
    region: "Los Lagos",
    surface: "48.232 ha",
    coordinates: [-72.43, -41.87],
    description:
      "Uno de los parques menos visitados de Chile, Hornopirén protege volcanes activos (Hornopirén 1.572 m, Yate 2.111 m), termas naturales y bosques de coihue y alerce en el inicio de la Patagonia de fiordos. Es la puerta de entrada a la Carretera Austral para quienes vienen en ferry desde Puerto Montt.",
    highlights: [
      "Volcán Hornopirén (1.572 m) — ascenso técnico con vistas al fiordo de Comau",
      "Termas de Porcelana — fuentes termales en selva valdiviana, solo accesibles en bote",
      "Fiordo de Comau — avistamiento de delfines australes y ballenas jorobadas",
      "Bosques de alerce en sectores altos del parque",
    ],
    howToGet:
      "Ferry desde Puerto Montt a Hornopirén (2 h + espera). El pueblo de Hornopirén es el acceso al parque. También hay ruta terrestre por Cochamó desde Puerto Montt (4-5 h).",
    entryFee: "Gratuito o arancel simbólico (verificar en CONAF)",
    bestMonths: ["Dic", "Ene", "Feb"],
    website: "https://www.conaf.cl/parques/parque-nacional-hornopiren/",
    faunaEspecies: ["delfin-austral", "condor-andino"],
    senderosEnElParque: [],
  },
  {
    slug: "pumalin-douglas-tompkins",
    name: "Pumalín Douglas Tompkins",
    country: "cl",
    region: "Los Lagos",
    surface: "402.191 ha",
    coordinates: [-72.65, -42.8],
    description:
      "El legado más visible de Douglas Tompkins en Sudamérica: 402.000 hectáreas de selva valdiviana prístina, bosques de alerce milenarios y volcanes activos donados al Estado chileno en 2018. El volcán Chaitén, que entró en erupción en 2008, convive con naturaleza en plena recuperación. La Carretera Austral atraviesa el parque.",
    highlights: [
      "Volcán Chaitén — caldera accesible y bosque en regeneración post-erupción 2008",
      "Alerces costeros de hasta 4.000 años — en sectores del Alerce Costero",
      "Cascada Escondida y Sendero de los Alerces — trekking emblemático del parque",
      "Caleta González — fiordo remoto con fauna marina y ecoturismo de bajo impacto",
    ],
    howToGet:
      "Ferry desde Puerto Montt a Chaitén (3.5 h) o desde Hornopirén a Caleta González (4 h de navegación). También avioneta a Chaitén desde Puerto Montt (20 min). La Carretera Austral atraviesa el parque.",
    entryFee: "Gratuito",
    bestMonths: ["Nov", "Dic", "Ene", "Feb"],
    website: "https://www.conaf.cl/parques/parque-nacional-pumalin-douglas-tompkins/",
    faunaEspecies: ["puma", "condor-andino"],
    senderosEnElParque: [],
  },
  {
    slug: "corcovado",
    name: "Corcovado",
    country: "cl",
    region: "Los Lagos",
    surface: "294.903 ha",
    coordinates: [-72.8, -43.55],
    // "Parque nacional Corcovado" could clash with Corcovado in Brazil
    wikipediaTitle: "Parque nacional Corcovado (Chile)",
    description:
      "Uno de los parques más remotos de Chile, Corcovado protege la transición entre la selva valdiviana y la Patagonia de fiordos. El golfo Corcovado concentra entre enero y marzo una de las mayores densidades de ballenas azules del planeta, que vienen a alimentarse en sus aguas ricas en krill.",
    highlights: [
      "Golfo Corcovado — área de alimentación de ballenas azules (Ene–Mar)",
      "Volcán Corcovado (2.300 m) — ascenso técnico con vistas al Pacífico y fiordos",
      "Bosques templados lluviosos sin intervención — entre los más prístinos de Chile",
      "Avistamiento en kayak desde Chaitén — excursiones de varios días",
    ],
    howToGet:
      "Muy remoto. Acceso desde Chaitén en bote o kayak (varias horas). Excursiones organizadas desde Futaleufú o Puerto Cisnes.",
    entryFee: "Sin información — consultar CONAF Aysén",
    bestMonths: ["Ene", "Feb", "Mar"],
    website: "https://www.conaf.cl/parques/parque-nacional-corcovado/",
    faunaEspecies: ["ballena-jorobada", "lobo-marino-del-sur", "delfin-austral", "condor-andino"],
    senderosEnElParque: [],
  },
  {
    slug: "isla-magdalena",
    name: "Isla Magdalena",
    country: "cl",
    region: "Aysén",
    surface: "157.616 ha",
    coordinates: [-72.85, -44.6],
    description:
      "Parque de fiordos y canales en Aysén creado en 1981 para proteger la biodiversidad marina y terrestre de las islas patagónicas. Sus ecosistemas de bosque siempreverde, turberas y aguas de fiordo albergan poblaciones de lobo marino, nutria de mar y numerosas aves marinas. Sin acceso terrestre ni infraestructura turística.",
    highlights: [
      "Canales y fiordos intactos — ecosistemas marinos sin intervención",
      "Nutria de mar (chungungo) — una de las poblaciones más estables de la Patagonia chilena",
      "Aves marinas — cormorán imperial, pato quetru no volador, pilpilén austral",
      "Selva siempreverde costera — solo accesible en embarcación",
    ],
    howToGet:
      "Desde Coyhaique o Puerto Cisnes en embarcación. No hay acceso terrestre. Excursiones organizadas desde Puerto Aysén o por la Carretera Austral.",
    entryFee: "Sin información — consultar CONAF Aysén",
    bestMonths: ["Nov", "Dic", "Ene", "Feb"],
    website: "https://www.conaf.cl/parques/parque-nacional-isla-magdalena/",
    faunaEspecies: ["lobo-marino-del-sur", "delfin-austral"],
    senderosEnElParque: [],
  },
  {
    slug: "laguna-san-rafael",
    name: "Laguna San Rafael",
    country: "cl",
    region: "Aysén",
    surface: "1.742.000 ha",
    coordinates: [-73.9, -46.6],
    description:
      "Uno de los parques más grandes de Chile, protege el Campo de Hielo Patagónico Norte y el glaciar San Rafael — considerado el glaciar de latitudes templadas más accesible del mundo. Se puede llegar en zodiac o lancha directamente al frente glaciar, cruzando una laguna plagada de témpanos de color azul intenso.",
    highlights: [
      "Glaciar San Rafael — frente de 70 m de altura, accesible en navegación directa",
      "Campo de Hielo Patagónico Norte — 4.200 km² de hielo, tercero más grande fuera de los polos",
      "Témpanos de color azul intenso — fragmentos de hielo milenario en la laguna",
      "Ferry desde Puerto Montt — navegación de 2 días por canales y fiordos prístinos",
    ],
    howToGet:
      "Vuelo a Balmaceda (BBA) + avioneta a la laguna (1 h), o ferry desde Puerto Montt (2 días). Las excursiones al glaciar salen de Puerto Montt o Coyhaique.",
    entryFee: "Incluido en el costo del ferry o tour (verificar tarifa independiente)",
    bestMonths: ["Nov", "Dic", "Ene", "Feb"],
    website: "https://www.conaf.cl/parques/parque-nacional-laguna-san-rafael/",
    faunaEspecies: ["lobo-marino-del-sur", "delfin-austral", "condor-andino"],
    senderosEnElParque: [],
    gygTours: [
      { label: "Glaciar San Rafael en zodiac", query: "laguna san rafael glacier tour" },
      { label: "Ferry Puerto Montt — Campos de Hielo", query: "puerto montt san rafael glacier navigation" },
    ],
  },
  {
    slug: "cerro-castillo",
    name: "Cerro Castillo",
    country: "cl",
    region: "Aysén",
    surface: "179.550 ha",
    coordinates: [-72.14, -46.11],
    description:
      "Ascendido a Parque Nacional en 2018 como parte del legado Tompkins, Cerro Castillo protege el pico de basalto negro que da nombre al parque (2.675 m), rodeado de glaciares colgantes y valles de lenga. El trekking de cuatro días alrededor del cerro es uno de los mejores de la Patagonia chilena — menos masificado que Torres del Paine e igualmente espectacular.",
    highlights: [
      "Circuito Cerro Castillo (4 días) — trekking de categoría internacional sin masas de turistas",
      "Glaciares colgantes en paredes de basalto negro — paisaje único en la Patagonia",
      "Laguna Cerro Castillo — reflejo del pico en agua color turquesa",
      "Pinturas rupestres en el Valle Ibáñez — arte de cazadores-recolectores del Pleistoceno",
    ],
    howToGet:
      "Vuelo a Balmaceda (BBA) o Coyhaique. Desde Coyhaique, Carretera Austral sur aprox. 75 km hasta Villa Cerro Castillo. Hay buses desde Coyhaique.",
    entryFee: "CLP 5.000–10.000 por persona (verificar en CONAF)",
    bestMonths: ["Nov", "Dic", "Ene", "Feb", "Mar"],
    website: "https://www.conaf.cl/parques/parque-nacional-cerro-castillo/",
    faunaEspecies: ["huemul", "puma", "condor-andino"],
    senderosEnElParque: [],
    gygTours: [
      { label: "Trekking Cerro Castillo (4 días)", query: "cerro castillo trekking patagonia" },
      { label: "Tour desde Coyhaique", query: "coyhaique patagonia day tour" },
    ],
  },
  {
    slug: "patagonia-cl",
    name: "Patagonia",
    country: "cl",
    region: "Aysén",
    surface: "301.920 ha",
    coordinates: [-72.5, -47.5],
    wikipediaTitle: "Parque nacional Patagonia",
    description:
      "El proyecto de conservación más influyente de América Latina: Tompkins Conservation donó más de 200.000 hectáreas privadas que, unidas a tierras fiscales, crearon un parque de más de 300.000 ha en el corazón de la estepa patagónica chilena. La restauración de praderas sobreexplotadas por la ganadería ha permitido la recuperación del huemul, el puma y el guanaco.",
    highlights: [
      "Valle Chacabuco — antiguo fundo ovejero convertido en reserva de huemul y guanaco",
      "Avistamiento de huemul — una de las mejores oportunidades del continente para ver el ciervo andino",
      "Sendero Valle del Lago Cochrane — trekking de altura con vistas al lago General Carrera",
      "Centro de visitantes de referencia — interpretación del rewilding patagónico",
    ],
    howToGet:
      "Vuelo a Balmaceda (BBA) o Coyhaique. Desde Coyhaique, Carretera Austral sur hasta Cochrane (340 km, 5-6 h). El parque rodea Cochrane. Hay buses desde Coyhaique.",
    entryFee: "Gratuito",
    bestMonths: ["Nov", "Dic", "Ene", "Feb", "Mar"],
    website: "https://www.conaf.cl/parques/parque-nacional-patagonia/",
    faunaEspecies: ["huemul", "puma", "guanaco", "condor-andino", "choique", "flamenco-austral"],
    senderosEnElParque: [],
  },
  {
    slug: "kawesqar",
    name: "Kawésqar",
    country: "cl",
    region: "Magallanes y Antártica Chilena",
    surface: "7.023.542 ha",
    coordinates: [-75.0, -51.5],
    description:
      "El parque terrestre más grande de Chile y uno de los más grandes del mundo, creado en 2019 para proteger los canales y fiordos que fueron hogar del pueblo kawésqar durante milenios. Abarca desde el Campo de Hielo Sur hasta el archipiélago de los canales de Magallanes, con glaciares, fiordos y bosques subantárticos prácticamente inaccesibles.",
    highlights: [
      "Canales de Magallanes — miles de islas y fiordos sin nombre ni visitantes",
      "Campo de Hielo Sur — el tercer mayor manto de hielo continental del planeta",
      "Patrimonio cultural kawésqar — vestigios de la civilización canoera más austral del mundo",
      "Avistamiento de ballenas — jorobadas, minke y sei en los canales interiores",
    ],
    howToGet:
      "Solo en embarcación desde Puerto Natales o Punta Arenas. No existe acceso terrestre. Cruceros de expedición (Australis, Ponant) o veleros particulares son los únicos visitantes.",
    entryFee: "Sin información — consultar CONAF Magallanes",
    bestMonths: ["Nov", "Dic", "Ene", "Feb"],
    website: "https://www.conaf.cl/parques/parque-nacional-kawesqar/",
    faunaEspecies: ["ballena-jorobada", "lobo-marino-del-sur", "delfin-austral", "condor-andino"],
    senderosEnElParque: [],
  },
  {
    slug: "alberto-de-agostini",
    name: "Alberto de Agostini",
    country: "cl",
    region: "Magallanes y Antártica Chilena",
    surface: "1.460.000 ha",
    coordinates: [-69.5, -54.4],
    description:
      "Nombrado en homenaje al sacerdote salesiano que mapeó los fiordos de Tierra del Fuego, este parque abarca el Canal Beagle, fiordos glaciares y la Cordillera Darwin, con los glaciares más australes del planeta fuera de la Antártida. Solo accesible por mar.",
    highlights: [
      "Canal Beagle — navegación con glaciares que caen directamente al mar",
      "Glaciar Garibaldi — uno de los accesos glaciares más dramáticos del extremo sur",
      "Cordillera Darwin — campos de hielo vírgenes en el fin del continente",
      "Fauna del fin del mundo — lobo marino, delfines, pingüinos de Magallanes y papúa",
    ],
    howToGet:
      "Desde Punta Arenas o Ushuaia (Argentina) en embarcación. Cruceros de expedición o catamaranes desde Punta Arenas. No existe acceso terrestre.",
    entryFee: "Gratuito (el acceso en barco tiene costo según operador)",
    bestMonths: ["Nov", "Dic", "Ene", "Feb"],
    website: "https://www.conaf.cl/parques/parque-nacional-alberto-de-agostini/",
    faunaEspecies: ["lobo-marino-del-sur", "delfin-austral", "pinguino-de-magallanes", "condor-andino"],
    senderosEnElParque: [],
  },
  {
    slug: "cabo-de-hornos",
    name: "Cabo de Hornos",
    country: "cl",
    region: "Magallanes y Antártica Chilena",
    surface: "63.093 ha",
    coordinates: [-67.27, -55.97],
    description:
      "El parque más austral de América y Reserva de Biosfera UNESCO (2005). El Cabo de Hornos (55°58' Sur) es el punto donde se unen el Pacífico y el Atlántico, uno de los cabos más temidos de la historia marítima. Una sola familia de guardaparques habita permanentemente la pequeña estación meteorológica del cabo.",
    highlights: [
      "Cabo de Hornos — el punto más austral de América continental, hito geográfico mundial",
      "Faro y Monumento al Albatros — escultura icónica en el extremo del mundo",
      "Turberas y lenga enana — ecosistemas únicos del clima subantártico",
      "Albatros de ceja negra y errante — los mayores planeadores del planeta",
    ],
    howToGet:
      "En embarcación desde Puerto Williams (el asentamiento más austral del mundo) o en crucero desde Ushuaia. Vuelos a Puerto Williams desde Punta Arenas (1 h).",
    entryFee: "Gratuito (el acceso en barco tiene costo según operador)",
    bestMonths: ["Nov", "Dic", "Ene", "Feb"],
    website: "https://www.conaf.cl/parques/parque-nacional-cabo-de-hornos/",
    faunaEspecies: ["lobo-marino-del-sur", "delfin-austral", "pinguino-de-magallanes"],
    senderosEnElParque: [],
  },
]

export function getParqueEntry(slug: string): ParqueEntry | null {
  return PARQUES_CATALOG.find((p) => p.slug === slug) ?? null
}
