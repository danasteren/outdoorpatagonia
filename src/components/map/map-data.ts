import type { MapFeature } from "./types";
import { ESCALADA_CATALOG } from "@/lib/escalada/catalog";

export const PARQUES: MapFeature[] = [
  { type: "parques", title: "Nahuel Huapi", coordinates: [-71.32, -41.17], pageUrl: "/parques/nahuel-huapi", description: "El parque nacional más antiguo de Argentina. Lagos, volcanes y bosques andino-patagónicos.", properties: { País: "Argentina", Provincia: "Neuquén / Río Negro", Superficie: "717.261 ha" } },
  { type: "parques", title: "Lanín", coordinates: [-71.47, -39.64], pageUrl: "/parques/lanin", description: "Dominado por el volcán Lanín (3.776 m), hogar del araucario milenario (pehuén).", properties: { País: "Argentina", Provincia: "Neuquén", Superficie: "412.014 ha" } },
  { type: "parques", title: "Los Alerces", coordinates: [-71.79, -42.84], pageUrl: "/parques/los-alerces", description: "Bosques de alerces milenarios y lagos cristalinos en la cordillera chubutense.", properties: { País: "Argentina", Provincia: "Chubut", Superficie: "263.000 ha" } },
  { type: "parques", title: "Lago Puelo", coordinates: [-71.61, -42.12], pageUrl: "/parques/lago-puelo", description: "Pequeño parque de gran belleza con el único lago patagónico con salida al Pacífico.", properties: { País: "Argentina", Provincia: "Chubut", Superficie: "27.674 ha" } },
  { type: "parques", title: "Perito Moreno", coordinates: [-72.03, -47.92], pageUrl: "/parques/perito-moreno", description: "Uno de los parques más remotos de la Patagonia, casi sin infraestructura turística.", properties: { País: "Argentina", Provincia: "Santa Cruz", Superficie: "115.000 ha" } },
  { type: "parques", title: "Los Glaciares", coordinates: [-73.03, -50.05], pageUrl: "/parques/los-glaciares", description: "Patrimonio de la Humanidad. Alberga el glaciar Perito Moreno y el cerro Fitz Roy.", properties: { País: "Argentina", Provincia: "Santa Cruz", Superficie: "724.929 ha" } },
  { type: "parques", title: "Monte León", coordinates: [-68.86, -50.34], pageUrl: "/parques/monte-leon", description: "El primer parque nacional marino de Argentina, con pingüineras y lobos marinos.", properties: { País: "Argentina", Provincia: "Santa Cruz", Superficie: "62.169 ha" } },
  { type: "parques", title: "Tierra del Fuego", coordinates: [-68.32, -54.87], pageUrl: "/parques/tierra-del-fuego", description: "El parque más austral del planeta. Bosques de lenga, turba y bahía Lapataia.", properties: { País: "Argentina", Provincia: "Tierra del Fuego", Superficie: "63.000 ha" } },
  { type: "parques", title: "Vicente Pérez Rosales", coordinates: [-72.14, -41.01], pageUrl: "/parques/vicente-perez-rosales", description: "El parque nacional más antiguo de Chile. Volcán Osorno, lago Todos los Santos y saltos de Petrohué.", properties: { País: "Chile", Región: "Los Lagos", Superficie: "251.320 ha" } },
  { type: "parques", title: "Puyehue", coordinates: [-72.18, -40.72], pageUrl: "/parques/puyehue", description: "Volcán Puyehue, termas y el paso fronterizo más transitado de la Patagonia.", properties: { País: "Chile", Región: "Los Lagos", Superficie: "107.000 ha" } },
  { type: "parques", title: "Chiloé", coordinates: [-73.93, -42.45], pageUrl: "/parques/chiloe", description: "Bosques siempreverdes, playas del Pacífico y la cosmovisión chilota.", properties: { País: "Chile", Región: "Los Lagos", Superficie: "43.057 ha" } },
  { type: "parques", title: "Queulat", coordinates: [-72.68, -44.34], pageUrl: "/parques/queulat", description: "El colgante glaciar Queulat y la selva valdiviana de los fiordos aiséninos.", properties: { País: "Chile", Región: "Aysén", Superficie: "154.093 ha" } },
  { type: "parques", title: "Torres del Paine", coordinates: [-73.0, -51.03], pageUrl: "/parques/torres-del-paine", description: "Ícono de la Patagonia. Torres de granito, glaciares y el famoso Circuito W.", properties: { País: "Chile", Región: "Magallanes", Superficie: "242.242 ha" } },
  { type: "parques", title: "Bernardo O'Higgins", coordinates: [-73.5, -49.5], pageUrl: "/parques/bernardo-ohiggins", description: "El parque más grande de Chile. Campos de hielo y fiordos casi sin acceso terrestre.", properties: { País: "Chile", Región: "Aysén / Magallanes", Superficie: "3.525.901 ha" } },
];

export const SENDEROS: MapFeature[] = [
  { type: "senderos", title: "Laguna de los Tres (Fitz Roy)", coordinates: [-72.91, -49.27], pageUrl: "/senderos/laguna-de-los-tres", description: "El trek más icónico de El Chaltén. Vista directa al cerro Fitz Roy desde la laguna glaciar.", properties: { Dificultad: "Moderada-Alta", Distancia: "22 km", Duración: "8–10 h", Inicio: "El Chaltén" } },
  { type: "senderos", title: "Circuito W — Torres del Paine", coordinates: [-73.0, -51.03], pageUrl: "/senderos/circuito-w", description: "El clásico de la Patagonia chilena. Pasa por las Torres, el Valle del Francés y el glaciar Grey.", properties: { Dificultad: "Moderada", Distancia: "80 km", Duración: "4–5 días", Inicio: "Pudeto / Las Torres" } },
  { type: "senderos", title: "Diente de Navarino", coordinates: [-68.5, -54.93], pageUrl: "/senderos/diente-de-navarino", description: "Circuito de alta montaña en el fin del mundo. Uno de los trekkings más remotos del planeta.", properties: { Dificultad: "Alta", Distancia: "53 km", Duración: "4–6 días", Inicio: "Puerto Williams" } },
  { type: "senderos", title: "Huemul Circuit", coordinates: [-73.0, -49.33], pageUrl: "/senderos/huemul-circuit", description: "Circuito exigente con cruce de cuelgas en glaciares y vistas al glaciar Perito Moreno.", properties: { Dificultad: "Alta", Distancia: "60 km", Duración: "4 días", Inicio: "El Chaltén" } },
  { type: "senderos", title: "Cerro Tronador", coordinates: [-71.88, -41.16], pageUrl: "/senderos/cerro-tronador", description: "El único volcán extinguido de la Patagonia argentina. Ventisquero Negro y vistas de 3.491 m.", properties: { Dificultad: "Moderada", Distancia: "18 km", Duración: "7–9 h", Inicio: "Pampa Linda" } },
  { type: "senderos", title: "Volcán Lanín", coordinates: [-71.47, -39.64], pageUrl: "/senderos/volcan-lanin", description: "Ascenso al cono perfecto del volcán Lanín (3.776 m). Requiere permiso y crampones.", properties: { Dificultad: "Alta", Distancia: "24 km", Duración: "2 días", Inicio: "Paso Tromen" } },
  { type: "senderos", title: "Sendero de los Cipreses", coordinates: [-71.38, -41.0], pageUrl: "/senderos/sendero-de-los-cipreses", description: "Bosque de cipreses de la cordillera en el Parque Nahuel Huapi.", properties: { Dificultad: "Baja", Distancia: "8 km", Duración: "3–4 h", Inicio: "Villa La Angostura" } },
  { type: "senderos", title: "Laguna Esmeralda (Ushuaia)", coordinates: [-68.49, -54.78], pageUrl: "/senderos/laguna-esmeralda", description: "Caminata clásica de Ushuaia. Turba, lengas y una laguna de color verde esmeralda.", properties: { Dificultad: "Baja-Moderada", Distancia: "15 km", Duración: "5–6 h", Inicio: "Ushuaia" } },
];

export const FAUNA: MapFeature[] = [
  { type: "fauna", title: "Península Valdés — Ballenas", coordinates: [-63.9, -42.5], description: "La mejor temporada para ver ballenas francas australes es de junio a diciembre. También orcas y elefantes marinos.", properties: { Especies: "Ballena franca austral, orca, elefante marino, lobo marino", Temporada: "Jun–Dic (ballenas)" } },
  { type: "fauna", title: "Punta Tombo — Pingüinos", coordinates: [-65.19, -44.03], description: "La mayor colonia de pingüinos de Magallanes del mundo continental, con más de un millón de ejemplares.", properties: { Especies: "Pingüino de Magallanes", Temporada: "Sep–Mar", Individuos: "+1.000.000" } },
  { type: "fauna", title: "Cabo Vírgenes — Pingüinos", coordinates: [-68.37, -52.35], description: "Segunda colonia más grande de pingüinos de Magallanes de Argentina, en el extremo continental.", properties: { Especies: "Pingüino de Magallanes", Temporada: "Oct–Mar", Individuos: "+150.000" } },
  { type: "fauna", title: "Patagonia Azul — Ballenas", coordinates: [-65.5, -43.5], description: "Área marina protegida con avistamiento de ballena azul, jorobada y franca. Lobos marinos y aves marinas.", properties: { Especies: "Ballena azul, ballena jorobada, delfín oscuro", Temporada: "Ene–Mar" } },
  { type: "fauna", title: "Ushuaia — Pingüinos de Magallanes", coordinates: [-68.3, -54.87], pageUrl: "/parques/tierra-del-fuego", description: "Colonia de pingüinos a 30 min de Ushuaia. Accesibles en kayak o bote desde la ciudad.", properties: { Especies: "Pingüino de Magallanes", Temporada: "Oct–Mar", Distancia: "30 min de Ushuaia" } },
  { type: "fauna", title: "Reserva Laguna Blanca — Flamencos", coordinates: [-70.33, -39.03], description: "Hábitat de flamencos australes, cisnes de cuello negro y patos puna.", properties: { Especies: "Flamenco austral, cisne de cuello negro, pato puna", Temporada: "Todo el año" } },
  { type: "fauna", title: "Parque Patagonia — Guanacos y Pumas", coordinates: [-72.27, -47.57], pageUrl: "/fauna/guanaco", description: "El proyecto de rewilding más ambicioso de América. Guanacos, ñandúes y avistamiento de pumas.", properties: { Especies: "Guanaco, puma, ñandú, huemul", Temporada: "Todo el año" } },
];

export const ESCALADA: MapFeature[] = ESCALADA_CATALOG.map((s) => ({
  type: "escalada" as const,
  title: s.nombre,
  coordinates: [s.lon, s.lat] as [number, number],
  description: s.descripcion.length > 220 ? s.descripcion.slice(0, 220) + "…" : s.descripcion,
  pageUrl: `/escalada/${s.slug}`,
  properties: {
    País: s.pais === "AR" ? "Argentina" : "Chile",
    Región: s.region,
    "Tipo de roca": s.tipoRoca.join(", "),
    Estilos: s.estilos.join(", "),
    Grados: `${s.gradosMin} – ${s.gradosMax}`,
    Temporada: s.temporada.join(", "),
    Altitud: `${s.altitud} m`,
  },
}));

export const GLACIARES: MapFeature[] = [
  {
    type: "glaciares",
    title: "Glaciar Perito Moreno",
    coordinates: [-73.05, -50.50],
    pageUrl: "/parques/los-glaciares",
    description: "El glaciar más famoso de la Patagonia. 257 km² de hielo en constante movimiento, con un frente de 70 m de altura sobre el Lago Argentino.",
    properties: { País: "Argentina", Superficie: "257 km²", Avance: "~2 m/día", "Estado": "Estable (singular en la región)", Acceso: "El Calafate" },
  },
  {
    type: "glaciares",
    title: "Glaciar Upsala",
    coordinates: [-73.3, -50.1],
    description: "El glaciar de montaña más grande de América del Sur. Se accede en navegación desde El Calafate, cruzando el lago Argentino.",
    properties: { País: "Argentina", Superficie: "904 km²", Longitud: "60 km", Retroceso: "~7 km desde 1990", Acceso: "Navegación desde El Calafate" },
  },
  {
    type: "glaciares",
    title: "Glaciar Viedma",
    coordinates: [-73.15, -49.5],
    description: "El segundo glaciar más grande de los Campos de Hielo Sur. Accesible desde El Chaltén con trekking sobre el hielo.",
    properties: { País: "Argentina", Superficie: "978 km²", Acceso: "El Chaltén (trekking sobre hielo disponible)" },
  },
  {
    type: "glaciares",
    title: "Glaciar Grey",
    coordinates: [-73.1, -51.0],
    pageUrl: "/parques/torres-del-paine",
    description: "Parte del Campo de Hielo Sur chileno. Se puede ver desde el Circuito W y navegar en kayak hasta su frente.",
    properties: { País: "Chile", Superficie: "270 km²", Longitud: "28 km", Acceso: "Torres del Paine — Circuito W" },
  },
  {
    type: "glaciares",
    title: "Glaciar Tyndall",
    coordinates: [-73.6, -51.2],
    description: "Tercer glaciar en tamaño del Campo de Hielo Sur. Solo accesible completando el Circuito O en Torres del Paine.",
    properties: { País: "Chile", Superficie: "331 km²", Acceso: "Circuito O completo (8–10 días)" },
  },
  {
    type: "glaciares",
    title: "San Rafael — Campo de Hielo Norte",
    coordinates: [-73.9, -46.6],
    description: "El glaciar de aguas cálidas más accesible del mundo. Se navega directamente al frente por los canales patagónicos chilenos.",
    properties: { País: "Chile", Longitud: "30 km", "Origen": "3.910 m s.n.m.", Acceso: "Coyhaique o Puerto Montt en ferry" },
  },
  {
    type: "glaciares",
    title: "Ventisquero Queulat",
    coordinates: [-72.68, -44.34],
    pageUrl: "/parques/queulat",
    description: "El famoso 'glaciar colgante' del Parque Queulat. Se contempla desde un mirador directo sobre la Carretera Austral.",
    properties: { País: "Chile", Tipo: "Glaciar colgante", Acceso: "Carretera Austral km 175 (mirador a 30 min)" },
  },
  {
    type: "glaciares",
    title: "Campo de Hielo Patagónico Norte",
    coordinates: [-73.5, -46.5],
    description: "Uno de los mayores campos de hielo fuera de las regiones polares. Alimenta los glaciares San Rafael, San Quintín y otros 30 glaciares.",
    properties: { País: "Chile", Superficie: "4.200 km²", Estado: "Retroceso acelerado desde 1980" },
  },
];

export const CLIMA: MapFeature[] = [
  { type: "clima", title: "Patagonia Andina — Bariloche", coordinates: [-71.3, -41.1], description: "Clima templado frío con 4 estaciones marcadas. Nieve en invierno (jun–ago). Precipitaciones moderadas a altas.", properties: { Temperatura: "-2°C a 22°C", Lluvias: "800–1500 mm/año", Viento: "Moderado", "Mejor época": "Dic–Mar" } },
  { type: "clima", title: "Patagonia Meseta — Comodoro Rivadavia", coordinates: [-67.5, -45.8], description: "Clima árido y muy ventoso. El viento patagónico supera los 100 km/h con frecuencia. Precipitaciones muy bajas.", properties: { Temperatura: "-5°C a 25°C", Lluvias: "200–300 mm/año", Viento: "Fuerte y constante", "Mejor época": "Nov–Abr" } },
  { type: "clima", title: "Costa Atlántica — Península Valdés", coordinates: [-63.9, -42.5], description: "Clima semiárido, más templado que el interior. Veranos cálidos y secos, inviernos suaves.", properties: { Temperatura: "0°C a 28°C", Lluvias: "250–300 mm/año", Viento: "Moderado", "Mejor época": "Sep–Abr" } },
  { type: "clima", title: "Patagonia Chilena — Aysén / Fiordos", coordinates: [-72.7, -45.5], description: "Zona de fiordos, una de las más lluviosas de América. Clima muy húmedo y frío todo el año.", properties: { Temperatura: "2°C a 18°C", Lluvias: "2000–4000 mm/año", Viento: "Moderado", "Mejor época": "Dic–Feb" } },
  { type: "clima", title: "Torres del Paine — Magallanes", coordinates: [-73.0, -51.0], description: "Clima subpolar oceánico. Vientos muy intensos en primavera-verano (Roaring Forties). Cambia varias veces al día.", properties: { Temperatura: "-2°C a 16°C", Lluvias: "600–700 mm/año", Viento: "Muy fuerte (70–120 km/h)", "Mejor época": "Oct–Mar" } },
  { type: "clima", title: "Tierra del Fuego — Ushuaia", coordinates: [-68.3, -54.8], description: "Clima subantártico. Precipitaciones todo el año, nieve ocasional en cualquier mes. Verano con días de hasta 17 horas de luz.", properties: { Temperatura: "-5°C a 14°C", Lluvias: "570 mm/año", Viento: "Moderado a fuerte", "Mejor época": "Nov–Feb" } },
  { type: "clima", title: "Islas Malvinas — Stanley", coordinates: [-57.85, -51.7], description: "Clima oceánico subantártico. Vientos fuertes casi todo el año, temperaturas frescas. Muy poca oscilación térmica.", properties: { Temperatura: "1°C a 13°C", Lluvias: "550–600 mm/año", Viento: "Fuerte (Roaring Forties)", "Mejor época": "Nov–Feb" } },
];

// Polygon for the Malvinas (Islas Malvinas — Argentina)
export const MALVINAS_POLYGON: [number, number][] = [
  [-51.25, -61.5],
  [-51.0, -60.5],
  [-51.1, -58.5],
  [-51.8, -57.7],
  [-52.5, -58.0],
  [-53.0, -59.3],
  [-52.5, -61.5],
  [-51.7, -62.0],
  [-51.25, -61.5],
];

// Simplified polygon for the Patagonia region
// Northern boundary: ~38°S in Argentina, ~39°S in Chile
export const PATAGONIA_POLYGON: [number, number][] = [
  [-39.0, -73.5],
  [-38.5, -71.0],
  [-38.5, -62.2],
  [-41.0, -62.5],
  [-43.5, -65.0],
  [-46.0, -65.5],
  [-49.0, -67.5],
  [-51.0, -68.8],
  [-52.5, -69.0],
  [-52.5, -70.5],
  [-53.8, -70.5],
  [-54.0, -67.5],
  [-54.9, -65.5],
  [-55.9, -67.5],
  [-55.0, -71.5],
  [-53.5, -72.5],
  [-51.5, -74.5],
  [-49.0, -75.2],
  [-47.0, -74.5],
  [-45.0, -74.0],
  [-43.0, -74.0],
  [-41.0, -73.8],
  [-39.5, -73.5],
  [-39.0, -73.5],
];
