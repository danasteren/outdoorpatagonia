import type { Season, Interest, Tour, GearItem } from "./types";
import { gygSearchUrl } from "../affiliates/getyourguide";

export interface Destination {
  id: string;
  name: string;
  country: "ar" | "cl";
  coordinates: [number, number]; // [lng, lat]
  seasons: Season[];
  interests: Interest[];
  recommendedDays: number;
  activities: string[];
  description: Record<"short" | "medium" | "long", string>;
}

export const DESTINATIONS: Record<string, Destination> = {
  calafate: {
    id: "calafate",
    name: "El Calafate",
    country: "ar",
    coordinates: [-72.267, -50.337],
    seasons: ["verano", "otono", "primavera"],
    interests: ["naturaleza", "fotografia"],
    recommendedDays: 2,
    activities: [
      "Glaciar Perito Moreno — patrimonio de la humanidad",
      "Mini Trekking sobre el glaciar (2–3 hs sobre el hielo)",
      "Safari náutico por Lago Argentino",
      "Laguna Nimez (flamencos y más de 100 especies de aves)",
    ],
    description: {
      short:
        "Día completo en el Glaciar Perito Moreno: recorrido por las pasarelas, ruidos del hielo y vistas imposibles sobre el lago.",
      medium:
        "Primer día al Glaciar Perito Moreno con tarde en las pasarelas. Segundo día: safari náutico por Lago Argentino para ver Glaciar Upsala y Spegazzini desde el agua.",
      long: "Tres días: Glaciar Perito Moreno, safari náutico, Mini Trekking sobre el hielo (reservar con anticipación) y tarde de avistamiento en Laguna Nimez.",
    },
  },

  chalten: {
    id: "chalten",
    name: "El Chaltén",
    country: "ar",
    coordinates: [-72.889, -49.331],
    seasons: ["verano", "otono", "primavera"],
    interests: ["trekking", "fotografia", "naturaleza"],
    recommendedDays: 3,
    activities: [
      "Laguna de los Tres — vista frontal del Fitz Roy (21 km ida y vuelta)",
      "Laguna Torre — frente al Cerro Torre con su aguja de hielo (18 km)",
      "Mirador de los Cóndores y Mirador Cóndor",
      "Chorrillo del Salto — cascada a 5 km del pueblo",
    ],
    description: {
      short:
        "Salida temprano a Laguna de los Tres: si el cielo despeja, la vista del Fitz Roy es de otro mundo. Todos los senderos son gratuitos.",
      medium:
        "Día 1: Laguna de los Tres (Fitz Roy), salida a las 7 AM. Día 2: Laguna Torre (Cerro Torre) y tarde libre en el pueblo.",
      long: "Cinco días de trekking: Laguna de los Tres, Laguna Torre, Glaciar Piedras Blancas, Loma del Pliegue Tumbado y el circuito al Lago del Desierto.",
    },
  },

  ushuaia: {
    id: "ushuaia",
    name: "Ushuaia",
    country: "ar",
    coordinates: [-68.303, -54.801],
    seasons: ["verano", "otono", "invierno", "primavera"],
    interests: ["naturaleza", "fauna", "fotografia", "gastronomia"],
    recommendedDays: 2,
    activities: [
      "Parque Nacional Tierra del Fuego (con tren del fin del mundo)",
      "Navegación por el Canal Beagle — Isla de los Lobos, Isla de los Pájaros",
      "Pingüinera Isla Martillo — único lugar para caminar entre pingüinos",
      "Cerro Marcial (trekking verano / ski invierno)",
      "Centolla y cocina fueguina en restaurantes locales",
    ],
    description: {
      short:
        "La ciudad más austral del mundo. Navegación por el Canal Beagle y tarde en el Parque Nacional Tierra del Fuego.",
      medium:
        "Día 1: Canal Beagle con visita a Isla de los Lobos y Corveta Uruguay. Día 2: Parque Nacional Tierra del Fuego completo, Laguna Esmeralda (trek 2 hs).",
      long: "Tres o cuatro días: Canal Beagle, Parque Nacional, Isla Martillo (pingüinos), Glaciar Martial y una noche de centolla frente al canal.",
    },
  },

  torres_paine: {
    id: "torres_paine",
    name: "Torres del Paine",
    country: "cl",
    coordinates: [-72.9, -51.2],
    seasons: ["verano", "otono", "primavera"],
    interests: ["trekking", "fotografia", "naturaleza"],
    recommendedDays: 4,
    activities: [
      "Mirador Las Torres — ascenso al amanecer, luz rosada en las rocas",
      "Valle del Francés — cóndores, cascadas y glaciares suspendidos",
      "Glaciar Grey — trekking o kayak sobre el lago",
      "Lago Nordenskjöld — Los Cuernos reflejados en el agua al atardecer",
    ],
    description: {
      short:
        "Tres días mínimos: Las Torres al amanecer, Valle del Francés y Glaciar Grey. Reservar refugios con 6 meses de anticipación.",
      medium:
        "La W en 5 días: Las Torres (día 1), Valle del Francés (día 2-3), Glaciar Grey (día 4), regreso (día 5). Refugios o camping.",
      long: "El circuito O completo (8-10 días) o la W extendida con días extra en el sector norte del parque (Lago Dickson, Valle del Paine).",
    },
  },

  puerto_natales: {
    id: "puerto_natales",
    name: "Puerto Natales",
    country: "cl",
    coordinates: [-72.497, -51.733],
    seasons: ["verano", "otono", "primavera"],
    interests: ["gastronomia", "naturaleza"],
    recommendedDays: 1,
    activities: [
      "Cueva del Milodón — donde vivió el perezoso gigante (Milodón)",
      "Kayak por el Seno Última Esperanza",
      "Preparar y alquilar equipo para Torres del Paine",
      "Gastronomía local: cordero patagónico y mariscos",
    ],
    description: {
      short:
        "Base de operaciones para Torres del Paine. Cueva del Milodón por la tarde y cena de cordero patagónico.",
      medium:
        "Día de llegada: Cueva del Milodón por la tarde, alquilar equipo para el parque y cena en el centro. Organizar el día siguiente.",
      long: "Dos días: Cueva del Milodón, kayak en Última Esperanza y tiempo libre en el mercado artesanal antes de entrar al parque.",
    },
  },

  punta_arenas: {
    id: "punta_arenas",
    name: "Punta Arenas",
    country: "cl",
    coordinates: [-70.916, -53.163],
    seasons: ["verano", "otono", "invierno", "primavera"],
    interests: ["fauna", "gastronomia", "naturaleza"],
    recommendedDays: 1,
    activities: [
      "Isla Magdalena — colonia de 60.000 pingüinos (Nov-Feb)",
      "Estrecho de Magallanes — barco o caminata costera",
      "Cementerio Municipal (declarado monumento histórico)",
      "Centolla en restaurantes de la costanera",
    ],
    description: {
      short:
        "Ciudad histórica sobre el Estrecho de Magallanes. Si coincide con la temporada, la excursión a Isla Magdalena vale todo el viaje.",
      medium:
        "Un día: excursión a Isla Magdalena por la mañana, tarde en el centro histórico y cena de centolla frente al estrecho.",
      long: "Dos días en Punta Arenas: Isla Magdalena, recorrido histórico, visita al Centro Austral de Expediciones y preparación del equipo.",
    },
  },

  bariloche: {
    id: "bariloche",
    name: "Bariloche",
    country: "ar",
    coordinates: [-71.307, -41.133],
    seasons: ["verano", "otono", "invierno", "primavera"],
    interests: ["naturaleza", "gastronomia", "trekking", "fotografia"],
    recommendedDays: 3,
    activities: [
      "Circuito Chico — Lagos Moreno, Llao Llao, Colonia Suiza",
      "Cerro Campanario — panorama 360° de los lagos desde la silla aérea",
      "Parque Nacional Nahuel Huapi — trekking y kayak",
      "Cerro Catedral — ski en invierno (mayor centro de ski de Sudamérica)",
      "Ruta del Chocolate y cerveza artesanal",
    ],
    description: {
      short:
        "La Suiza argentina. Cerro Campanario al atardecer con vista a los lagos y tarde de chocolate en el centro.",
      medium:
        "Día 1: Circuito Chico y Cerro Campanario. Día 2: Cerro Catedral (ski en invierno, trekking en verano) y cena de fondue.",
      long: "Cuatro días: Circuito Chico, Catedral, Ruta de los Siete Lagos hasta Villa La Angostura, kayak en el lago y degustación de cervezas artesanales.",
    },
  },

  madryn: {
    id: "madryn",
    name: "Puerto Madryn",
    country: "ar",
    coordinates: [-65.038, -42.765],
    seasons: ["primavera", "verano", "otono"],
    interests: ["fauna", "naturaleza"],
    recommendedDays: 2,
    activities: [
      "Reserva Faunística Península Valdés (UNESCO)",
      "Avistamiento de ballenas jorobadas (Jun-Dic)",
      "Orcas varadas cazando lobos marinos (Sep-Oct)",
      "Pingüinos de Magallanes en Punta Tombo (Sep-Mar)",
      "Elefantes y lobos marinos año redondo",
    ],
    description: {
      short:
        "Península Valdés: si coincide con las orcas (Sep-Oct) o las ballenas (Jun-Dic), es posiblemente el mejor avistamiento de fauna de toda la Patagonia.",
      medium:
        "Dos días: Península Valdés completa (El Doradillo, Puerto Pirámides, Caleta Valdés, Punta Norte) con avistamiento de ballenas, pingüinos y elefantes.",
      long: "Tres días: Península Valdés, Punta Tombo (pingüinos, la mayor colonia del mundo), buceo en el mar y kayak en Puerto Pirámides.",
    },
  },
};


// --- TOURS ---

export const ALL_TOURS: Tour[] = [
  {
    name: "Mini Trekking sobre el Glaciar Perito Moreno",
    location: "El Calafate",
    duration: "4 horas",
    description: "Caminata equipada con crampones sobre el glaciar. Incluye equipamiento y guía.",
    url: gygSearchUrl("perito moreno ice trekking"),
    interests: ["trekking", "naturaleza", "fotografia"],
  },
  {
    name: "Safari náutico Lago Argentino",
    location: "El Calafate",
    duration: "3 horas",
    description: "Navegación entre glaciares Upsala, Spegazzini y Onelli desde el lago.",
    url: gygSearchUrl("lago argentino safari"),
    interests: ["naturaleza", "fotografia"],
  },
  {
    name: "Navegación Canal Beagle + Isla Martillo (pingüinos)",
    location: "Ushuaia",
    duration: "5 horas",
    description: "Barco por el Canal Beagle con parada en Isla Martillo para caminar entre pingüinos.",
    url: gygSearchUrl("ushuaia canal beagle penguins"),
    interests: ["fauna", "naturaleza", "fotografia"],
  },
  {
    name: "Trekking W en Torres del Paine",
    location: "Torres del Paine",
    duration: "5 días",
    description: "Recorrido guiado por el circuito W. Refugios y comidas incluidos.",
    url: gygSearchUrl("torres del paine W trek"),
    interests: ["trekking", "naturaleza", "fotografia"],
  },
  {
    name: "Tour fotográfico al Fitz Roy (amanecer)",
    location: "El Chaltén",
    duration: "6 horas",
    description: "Guía fotográfico hasta Laguna de los Tres para capturar el amanecer en el Fitz Roy.",
    url: gygSearchUrl("fitz roy photography tour"),
    interests: ["fotografia", "trekking"],
  },
  {
    name: "Avistamiento de ballenas en Península Valdés",
    location: "Puerto Madryn",
    duration: "4 horas",
    description: "Barco zodiac entre ballenas jorobadas y sus crías en el Golfo Nuevo.",
    url: gygSearchUrl("peninsula valdes whale watching"),
    interests: ["fauna", "naturaleza", "fotografia"],
  },
  {
    name: "Ski en Cerro Catedral",
    location: "Bariloche",
    duration: "Día completo",
    description: "El mayor centro de ski de Sudamérica: 60 pistas, vistas al lago Nahuel Huapi.",
    url: gygSearchUrl("cerro catedral bariloche ski"),
    interests: ["naturaleza", "trekking"],
  },
  {
    name: "Trekking nocturno al Río Blanco (Fitz Roy)",
    location: "El Chaltén",
    duration: "3 horas",
    description: "Salida nocturna al río con guía. Las estrellas de la Patagonia sin contaminación lumínica.",
    url: gygSearchUrl("chalten night trekking"),
    interests: ["trekking", "fotografia", "naturaleza"],
  },
  {
    name: "Ruta del Chocolate y Cerveza Artesanal",
    location: "Bariloche",
    duration: "3 horas",
    description: "Recorrido guiado por chocolaterías, microcervecerías y mercados gourmet locales.",
    url: gygSearchUrl("bariloche chocolate beer tour"),
    interests: ["gastronomia"],
  },
  {
    name: "Tour de orcas en Punta Norte",
    location: "Puerto Madryn",
    duration: "Día completo",
    description: "Vehículo 4x4 a Punta Norte (Península Valdés) en temporada de orcas varadas (Sep-Oct).",
    url: gygSearchUrl("peninsula valdes orca tour"),
    interests: ["fauna", "fotografia"],
  },
  {
    name: "Kayak en Glaciar Grey",
    location: "Torres del Paine",
    duration: "4 horas",
    description: "Kayak entre témpanos del Glaciar Grey. Incluye equipamiento y guía acuático.",
    url: gygSearchUrl("glacier grey kayak patagonia"),
    interests: ["naturaleza", "trekking", "fotografia"],
  },
];

// --- GEAR ---

export const ALL_GEAR: GearItem[] = [
  {
    name: "Mochila 60L para trekking",
    description: "Osprey Atmos AG 65 o similar: ajuste ergonómico, soporte lumbar y cubierta de lluvia.",
    url: "https://www.amazon.com/s?k=60L+trekking+backpack+patagonia&tag=outdoorpatago-20",
    interests: ["trekking", "naturaleza"],
    seasons: ["verano", "otono", "primavera", "invierno"],
  },
  {
    name: "Campera de lluvia GORE-TEX",
    description: "Imprescindible en Patagonia. Patagonia Torrentshell o Arc'teryx Beta: viento y lluvia.",
    url: "https://www.amazon.com/s?k=gore-tex+rain+jacket+patagonia+wind&tag=outdoorpatago-20",
    interests: ["trekking", "naturaleza", "fotografia"],
    seasons: ["verano", "otono", "primavera", "invierno"],
  },
  {
    name: "Botas de trekking impermeables",
    description: "Salomon X Ultra o Merrell Moab: suela Vibram, impermeables y tobillo alto para senderos de roca.",
    url: "https://www.amazon.com/s?k=waterproof+hiking+boots+trekking&tag=outdoorpatago-20",
    interests: ["trekking"],
    seasons: ["verano", "otono", "primavera"],
  },
  {
    name: "Campera de pluma (down jacket)",
    description: "Para noches y mañanas en Patagonia incluso en verano. Patagonia Down Sweater o similar.",
    url: "https://www.amazon.com/s?k=down+jacket+patagonia+lightweight&tag=outdoorpatago-20",
    interests: ["trekking", "naturaleza", "fauna"],
    seasons: ["verano", "otono", "invierno", "primavera"],
  },
  {
    name: "Binoculares para fauna",
    description: "Nikon Monarch M5 8x42: ideal para avistamiento de ballenas, cóndores y orcas.",
    url: "https://www.amazon.com/s?k=nikon+monarch+binoculars+wildlife&tag=outdoorpatago-20",
    interests: ["fauna", "naturaleza", "fotografia"],
    seasons: ["verano", "otono", "primavera", "invierno"],
  },
  {
    name: "Cámara mirrorless + trípode ultraligero",
    description: "Sony A7C o Fujifilm X-T5 con trípode de fibra de carbono: ideal para poca luz en glaciares y fauna.",
    url: "https://www.amazon.com/s?k=mirrorless+camera+wildlife+landscape+photography&tag=outdoorpatago-20",
    interests: ["fotografia"],
    seasons: ["verano", "otono", "primavera"],
  },
  {
    name: "Lente teleobjetivo 100-400mm",
    description: "Para fotografía de fauna a distancia: orcas, ballenas, cóndores, flamencos.",
    url: "https://www.amazon.com/s?k=100-400mm+telephoto+lens+wildlife&tag=outdoorpatago-20",
    interests: ["fotografia", "fauna"],
    seasons: ["verano", "otono", "primavera", "invierno"],
  },
  {
    name: "Base layer merino wool",
    description: "Icebreaker o Smartwool 200g: regula temperatura, no retiene olores, esencial para varios días de trekking.",
    url: "https://www.amazon.com/s?k=merino+wool+base+layer+hiking&tag=outdoorpatago-20",
    interests: ["trekking", "naturaleza"],
    seasons: ["otono", "invierno", "primavera"],
  },
  {
    name: "Sleeping bag -10°C",
    description: "Western Mountaineering o Sea to Summit: para camping en Torres del Paine y El Chaltén donde las noches son frías.",
    url: "https://www.amazon.com/s?k=sleeping+bag+minus+10+camping&tag=outdoorpatago-20",
    interests: ["trekking"],
    seasons: ["verano", "otono", "primavera"],
  },
  {
    name: "Guía de campo — Fauna de la Patagonia",
    description: "Identificación de aves, mamíferos y flora patagónica para salidas en Valdés y parques nacionales.",
    url: "https://www.amazon.com/s?k=patagonia+wildlife+field+guide&tag=outdoorpatago-20",
    interests: ["fauna", "naturaleza"],
    seasons: ["verano", "otono", "primavera", "invierno"],
  },
  {
    name: "Tabla de corte portátil + set de cocina camping",
    description: "MSR TrailShot + utensilios: para el circuito W o El Chaltén donde la comida en los refugios puede ser cara.",
    url: "https://www.amazon.com/s?k=backpacking+cooking+set+camping&tag=outdoorpatago-20",
    interests: ["trekking", "gastronomia"],
    seasons: ["verano", "otono", "primavera"],
  },
  {
    name: "Crampones para hielo",
    description: "Necesarios si hacés el Mini Trekking en el Perito Moreno o hielos continentales. Grivel o Camp.",
    url: "https://www.amazon.com/s?k=crampons+ice+trekking+glacier&tag=outdoorpatago-20",
    interests: ["trekking", "naturaleza"],
    seasons: ["verano", "primavera"],
  },
];
