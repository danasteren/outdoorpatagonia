// Catalog augments PARQUES from map-data.ts — coordinates use [lng, lat] convention

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
  // cross-references to existing data
  plannerDestinationId?: string          // key in DESTINATIONS from planner/data.ts
  faunaEspecies: string[]                // slugs in FAUNA_CATALOG
  senderosEnElParque: string[]           // slugs in SENDEROS_CATALOG
  // planner location name for filtering ALL_ACCOMMODATIONS + ALL_TOURS
  plannerLocation?: string
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
      "Vuelo directo desde Buenos Aires al aeropuerto El Calafate (FTE), 2.5 horas. El sector glaciares está a 80 km (remis o transfer desde El Calafate). El sector Fitz Roy: bus desde El Calafate a El Chaltén (3h).",
    entryFee: "USD 21–28 por persona (varía por temporada)",
    bestMonths: ["Oct", "Nov", "Dic", "Ene", "Feb", "Mar", "Abr"],
    website: "https://www.argentina.gob.ar/parques-nacionales/glaciares",
    plannerDestinationId: "calafate",
    plannerLocation: "El Calafate",
    faunaEspecies: ["guanaco", "condor-andino", "huemul", "coipo", "zorro-gris"],
    senderosEnElParque: ["laguna-de-los-tres", "huemul-circuit"],
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
]

export function getParqueEntry(slug: string): ParqueEntry | null {
  return PARQUES_CATALOG.find((p) => p.slug === slug) ?? null
}
