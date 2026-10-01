import type { Relacionado } from "@/lib/relacionados"

// Guías de viaje por destino, en español e inglés.
// Prioridad de destinos y búsquedas que cubrir: seo/destinos-prioridad.md.
// Cada dato tiene que salir de una fuente oficial listada en `fuentes` — nunca estimar ni inventar.

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

export const DESTINOS_CATALOG: DestinoEntry[] = [
  {
    slug: "ushuaia",
    nombre: "Ushuaia",
    pais: "AR",
    lat: -54.8019,
    lng: -68.303,
    wikipediaTitle: "Ushuaia",
    es: {
      metaTitle: "Ushuaia: Qué Hacer, Clima, Cuándo Ir y Cómo Llegar",
      metaDescription:
        "Guía de Ushuaia, Tierra del Fuego: qué hacer, clima mes a mes, cuándo ir, cómo llegar y cuántos días quedarse. Canal Beagle, pingüinos y Parque Nacional.",
      subtitulo: "Tierra del Fuego, Argentina · Canal Beagle",
      intro: [
        "Ushuaia es la capital de la provincia de Tierra del Fuego, en Argentina, y una de las ciudades más australes del mundo: está sobre la costa norte del Canal Beagle, entre el mar y los montes Martial, a 54,8° de latitud sur. Tiene unos 80.000 habitantes (censo 2022) y se fundó el 12 de octubre de 1884.",
        "Es la base para recorrer el Parque Nacional Tierra del Fuego, navegar el Canal Beagle hasta el faro Les Eclaireurs, ver pingüinos en Isla Martillo y, en invierno, esquiar en Cerro Castor. También es la principal puerta de entrada a la Antártida: más del 90 % de los buques de turismo antártico operan desde su puerto, a unos 1.000 km de la Península Antártica.",
        "El clima es frío todo el año, con máximas promedio de unos 12 °C en enero y apenas 2 °C en julio. La mejor época depende de lo que busques: de octubre a marzo para trekking, navegación y pingüinos; de junio a septiembre para la nieve.",
      ],
      datos: [
        { label: "Provincia", valor: "Tierra del Fuego, Antártida e Islas del Atlántico Sur" },
        { label: "Población", valor: "≈ 80.000 habitantes (censo 2022)" },
        { label: "Fundación", valor: "12 de octubre de 1884" },
        { label: "Aeropuerto", valor: "Internacional Malvinas Argentinas (USH)" },
        { label: "Vuelo desde Buenos Aires", valor: "≈ 3 h 30 min" },
        { label: "Días recomendados", valor: "3 a 4" },
        { label: "Mejor época", valor: "Oct–mar (verano) · jun–sep (nieve)" },
      ],
      queHacer: [
        {
          nombre: "Navegar el Canal Beagle",
          texto:
            "Las excursiones salen del muelle turístico y recorren la Isla de los Pájaros y la Isla de los Lobos, con colonias de lobos marinos y cormoranes, hasta el faro Les Eclaireurs, conocido como el faro del Fin del Mundo.",
          gygQuery: "Ushuaia Beagle Channel",
        },
        {
          nombre: "Parque Nacional Tierra del Fuego",
          texto:
            "Está a unos 12 km al oeste de la ciudad por la Ruta Nacional 3. Tiene más de 40 km de senderos por la costa del Canal Beagle y bosques de lenga, y llega hasta la Bahía Lapataia, donde termina la Ruta 3. Abre todos los días de 8 a 20 h; la entrada se paga en el acceso y varía según la temporada.",
          gygQuery: "Tierra del Fuego National Park",
        },
        {
          nombre: "Tren del Fin del Mundo",
          texto:
            "Recrea los últimos kilómetros del histórico tren de los presos del penal de Ushuaia y llega al Parque Nacional. Tiene tres salidas por día y hay que presentarse 45 minutos antes para el check-in.",
          gygQuery: "End of the World Train Ushuaia",
        },
        {
          nombre: "Pingüinos en Isla Martillo",
          texto:
            "La pingüinera está dentro de la Estancia Harberton, a unos 90 km de Ushuaia. Entre octubre y marzo crían ahí miles de pingüinos de Magallanes y un grupo pequeño de pingüinos papúa.",
          gygQuery: "Ushuaia penguins Martillo Island",
        },
        {
          nombre: "Glaciar Martial",
          texto:
            "A 7 km del centro. Desde la base del centro de montaña sale el circuito Mirador del Glaciar (2,5 km, unos 75 minutos y 220 m de desnivel), con vista a la ciudad y al Canal Beagle.",
        },
        {
          nombre: "Laguna Esmeralda",
          texto:
            "La caminata más popular de los alrededores: atraviesa turbales y bosques de lenga y ñire hasta una laguna de color verde intenso. No requiere guía, pero el barro de los turbales pide calzado impermeable.",
          gygQuery: "Laguna Esmeralda Ushuaia",
        },
        {
          nombre: "Museo Marítimo y ex Presidio",
          texto:
            "El antiguo penal de Ushuaia, que funcionó hasta 1947, hoy es museo: recorre la historia de la cárcel, de la ciudad y de la navegación antártica.",
        },
        {
          nombre: "Circuito de los Lagos",
          texto:
            "Hacia el norte por la Ruta 3 se cruza el Paso Garibaldi, con vista a los lagos Escondido y Fagnano (Khami), uno de los lagos más grandes del país, compartido con Chile.",
          gygQuery: "Ushuaia Lakes Escondido Fagnano",
        },
        {
          nombre: "Nieve: Cerro Castor y trineos",
          texto:
            "Cerro Castor, a 26 km de la ciudad, es el centro de esquí más austral del mundo. En el valle de Tierra Mayor hay centros invernales con trineos tirados por perros, raquetas de nieve y esquí de fondo.",
          gygQuery: "Ushuaia dog sledding",
        },
      ],
      cuandoIr: {
        resumen:
          "Ushuaia se visita todo el año y cada temporada ofrece algo distinto: entre octubre y marzo para trekking, navegación y pingüinos; entre junio y septiembre para esquí y actividades en la nieve.",
        temporadas: [
          {
            nombre: "Verano",
            meses: "Diciembre a febrero",
            texto:
              "Hasta 17 horas de luz y máximas de unos 12 °C. Es temporada alta: funcionan todas las navegaciones y senderos y la pingüinera está activa.",
          },
          {
            nombre: "Otoño",
            meses: "Marzo a mayo",
            texto:
              "Los bosques de lenga y ñire se tiñen de rojo y naranja, hay menos gente y los días se acortan. La temporada de pingüinos termina hacia fines de marzo.",
          },
          {
            nombre: "Invierno",
            meses: "Junio a agosto",
            texto:
              "Máximas de 2 a 3 °C, unas 7 horas de luz y nieve. Es la temporada de Cerro Castor y de los centros invernales del valle de Tierra Mayor.",
          },
          {
            nombre: "Primavera",
            meses: "Septiembre a noviembre",
            texto:
              "Deshielo, clima cambiante y menos turistas. Desde octubre llegan los pingüinos a Isla Martillo.",
          },
        ],
      },
      comoLlegar: [
        {
          modo: "En avión",
          texto:
            "Es la forma más práctica. El Aeropuerto Internacional Malvinas Argentinas recibe vuelos directos desde Buenos Aires (unas 3 h 30 min), El Calafate y Santiago de Chile.",
        },
        {
          modo: "Por tierra",
          texto:
            "Por la Ruta Nacional 3, que termina en el Parque Nacional Tierra del Fuego. Desde el continente hay que cruzar el Estrecho de Magallanes en balsa y atravesar un tramo de territorio chileno, con dos pasos fronterizos. Desde Río Grande son unos 210 km.",
        },
        {
          modo: "En crucero",
          texto:
            "Ushuaia es escala de los cruceros que recorren la Patagonia y punto de partida de la mayoría de las expediciones a la Antártida.",
        },
      ],
      cuantosDias: {
        resumen:
          "Con 3 o 4 días completos se recorre lo principal. Si querés sumar la pingüinera y trekkings largos, mejor 5.",
        itinerario: [
          { dia: "Día 1", texto: "Centro, Museo Marítimo y ex Presidio, y navegación por el Canal Beagle." },
          { dia: "Día 2", texto: "Parque Nacional Tierra del Fuego, con o sin el Tren del Fin del Mundo, hasta Bahía Lapataia." },
          { dia: "Día 3", texto: "Laguna Esmeralda o Glaciar Martial a la mañana y Circuito de los Lagos a la tarde." },
          { dia: "Día 4", texto: "Pingüinera de Isla Martillo y Estancia Harberton (octubre a marzo), o Cerro Castor en invierno." },
        ],
      },
      faq: [
        {
          pregunta: "¿Cuál es la mejor época para viajar a Ushuaia?",
          respuesta:
            "Depende de lo que quieras hacer. De octubre a marzo es la mejor época para trekking, navegar el Canal Beagle y ver pingüinos, con días de hasta 17 horas de luz. De junio a septiembre es temporada de nieve, con Cerro Castor y los centros invernales abiertos.",
        },
        {
          pregunta: "¿Cuántos días hacen falta para conocer Ushuaia?",
          respuesta:
            "Entre 3 y 4 días completos alcanzan para el Parque Nacional Tierra del Fuego, la navegación por el Canal Beagle, el Glaciar Martial o la Laguna Esmeralda y el Circuito de los Lagos. Con 5 días se suma la pingüinera de Isla Martillo.",
        },
        {
          pregunta: "¿Cómo es el clima en Ushuaia?",
          respuesta:
            "Frío todo el año: las máximas promedio rondan los 12 °C en enero y los 2 °C en julio, y en invierno nieva. El viento y los cambios bruscos de tiempo son habituales en cualquier estación, así que conviene vestirse por capas.",
        },
        {
          pregunta: "¿Cuándo se pueden ver pingüinos en Ushuaia?",
          respuesta:
            "Entre octubre y marzo, en Isla Martillo, dentro de la Estancia Harberton, a unos 90 km de la ciudad. Ahí crían pingüinos de Magallanes y un grupo pequeño de pingüinos papúa.",
        },
        {
          pregunta: "¿Cómo llegar a Ushuaia desde Buenos Aires?",
          respuesta:
            "En avión, con vuelos directos de unas 3 h 30 min al Aeropuerto Internacional Malvinas Argentinas. Por tierra son más de 3.000 km por la Ruta Nacional 3, cruzando el Estrecho de Magallanes en balsa y un tramo de Chile.",
        },
        {
          pregunta: "¿Ushuaia es la ciudad más austral del mundo?",
          respuesta:
            "Es la ciudad más austral de Argentina y se la conoce como la ciudad del Fin del Mundo. Puerto Williams, en Chile, está más al sur, pero es una localidad mucho más pequeña.",
        },
        {
          pregunta: "¿Se puede viajar a la Antártida desde Ushuaia?",
          respuesta:
            "Sí. Ushuaia es la principal puerta de entrada a la Antártida: más del 90 % de los buques de turismo antártico operan desde su puerto, a unos 1.000 km de la Península Antártica.",
        },
      ],
    },
    en: {
      metaTitle: "Ushuaia Travel Guide: Things to Do, Weather & Tips",
      metaDescription:
        "Ushuaia, Argentina travel guide: things to do, month-by-month weather, best time to visit, how to get there and how many days to stay. Beagle Channel & penguins.",
      subtitulo: "Tierra del Fuego, Argentina · Beagle Channel",
      intro: [
        "Ushuaia is the capital of Argentina's Tierra del Fuego province and one of the southernmost cities in the world. It sits on the northern shore of the Beagle Channel, between the sea and the Martial Mountains, at 54.8° south. It has about 80,000 residents (2022 census) and was founded on October 12, 1884.",
        "It is the base for exploring Tierra del Fuego National Park, sailing the Beagle Channel to the Les Eclaireurs lighthouse, seeing penguins on Martillo Island and, in winter, skiing at Cerro Castor. It is also the main gateway to Antarctica: over 90% of Antarctic tourism ships operate from its port, about 1,000 km from the Antarctic Peninsula.",
        "The weather is cold all year, with average highs of about 12 °C (54 °F) in January and barely 2 °C (36 °F) in July. The best time to visit depends on what you want: October to March for hiking, boat trips and penguins; June to September for snow.",
      ],
      datos: [
        { label: "Province", valor: "Tierra del Fuego, Argentina" },
        { label: "Population", valor: "≈ 80,000 (2022 census)" },
        { label: "Founded", valor: "October 12, 1884" },
        { label: "Airport", valor: "Malvinas Argentinas International (USH)" },
        { label: "Flight from Buenos Aires", valor: "≈ 3 h 30 min" },
        { label: "Recommended stay", valor: "3 to 4 days" },
        { label: "Best time", valor: "Oct–Mar (summer) · Jun–Sep (snow)" },
      ],
      queHacer: [
        {
          nombre: "Sail the Beagle Channel",
          texto:
            "Boat trips leave from the tourist pier and visit Bird Island and Sea Lion Island, home to sea lion and cormorant colonies, on the way to Les Eclaireurs, known as the Lighthouse at the End of the World.",
          gygQuery: "Ushuaia Beagle Channel",
        },
        {
          nombre: "Tierra del Fuego National Park",
          texto:
            "About 12 km west of town on National Route 3. It has over 40 km of trails along the Beagle Channel and through lenga forests, and reaches Lapataia Bay, where Route 3 ends. Open every day from 8 am to 8 pm; the entrance fee is paid at the gate and varies by season.",
          gygQuery: "Tierra del Fuego National Park",
        },
        {
          nombre: "End of the World Train",
          texto:
            "It recreates the last kilometers of the historic train used by inmates of the Ushuaia prison and runs into the national park. There are three departures a day; check-in opens 45 minutes before.",
          gygQuery: "End of the World Train Ushuaia",
        },
        {
          nombre: "Penguins on Martillo Island",
          texto:
            "The penguin colony is on Estancia Harberton, about 90 km from Ushuaia. From October to March thousands of Magellanic penguins and a small group of gentoo penguins breed there.",
          gygQuery: "Ushuaia penguins Martillo Island",
        },
        {
          nombre: "Martial Glacier",
          texto:
            "7 km from downtown. From the base of the mountain center, the Glacier Viewpoint trail (2.5 km, about 75 minutes, 220 m elevation gain) offers views over the city and the Beagle Channel.",
        },
        {
          nombre: "Laguna Esmeralda",
          texto:
            "The most popular hike near town crosses peat bogs and lenga and ñire forests to a bright green lake. No guide needed, but waterproof boots are a must for the muddy bogs.",
          gygQuery: "Laguna Esmeralda Ushuaia",
        },
        {
          nombre: "Maritime Museum and former Prison",
          texto:
            "Ushuaia's old prison, in use until 1947, is now a museum covering the history of the jail, the city and Antarctic navigation.",
        },
        {
          nombre: "Lakes Circuit",
          texto:
            "Heading north on Route 3 you cross Garibaldi Pass, with views of Lake Escondido and Lake Fagnano (Khami), one of Argentina's largest lakes, shared with Chile.",
          gygQuery: "Ushuaia Lakes Escondido Fagnano",
        },
        {
          nombre: "Snow: Cerro Castor and dog sledding",
          texto:
            "Cerro Castor, 26 km from town, is the southernmost ski resort in the world. In the Tierra Mayor valley, winter centers offer dog sledding, snowshoeing and cross-country skiing.",
          gygQuery: "Ushuaia dog sledding",
        },
      ],
      cuandoIr: {
        resumen:
          "Ushuaia is a year-round destination and each season offers something different: October to March for hiking, boat trips and penguins; June to September for skiing and snow activities.",
        temporadas: [
          {
            nombre: "Summer",
            meses: "December to February",
            texto:
              "Up to 17 hours of daylight and highs around 12 °C (54 °F). Peak season: all boat trips and trails are running and the penguin colony is active.",
          },
          {
            nombre: "Autumn",
            meses: "March to May",
            texto:
              "Lenga and ñire forests turn red and orange, crowds thin out and days get shorter. Penguin season ends around late March.",
          },
          {
            nombre: "Winter",
            meses: "June to August",
            texto:
              "Highs of 2–3 °C (36–37 °F), about 7 hours of daylight and snow. Ski season at Cerro Castor and the winter centers of the Tierra Mayor valley.",
          },
          {
            nombre: "Spring",
            meses: "September to November",
            texto: "Thaw, changeable weather and fewer tourists. Penguins return to Martillo Island from October.",
          },
        ],
      },
      comoLlegar: [
        {
          modo: "By plane",
          texto:
            "The easiest option. Malvinas Argentinas International Airport has direct flights from Buenos Aires (about 3 h 30 min), El Calafate and Santiago, Chile.",
        },
        {
          modo: "By road",
          texto:
            "Via National Route 3, which ends in Tierra del Fuego National Park. From the mainland you cross the Strait of Magellan by ferry and drive through a stretch of Chile, with two border crossings. Río Grande is about 210 km away.",
        },
        {
          modo: "By cruise",
          texto:
            "Ushuaia is a port of call for Patagonia cruises and the departure point for most Antarctic expeditions.",
        },
      ],
      cuantosDias: {
        resumen:
          "3 or 4 full days cover the highlights. Add a fifth day for the penguin colony and longer hikes.",
        itinerario: [
          { dia: "Day 1", texto: "Downtown, the Maritime Museum and former Prison, and a Beagle Channel boat trip." },
          { dia: "Day 2", texto: "Tierra del Fuego National Park, with or without the End of the World Train, to Lapataia Bay." },
          { dia: "Day 3", texto: "Laguna Esmeralda or Martial Glacier in the morning, the Lakes Circuit in the afternoon." },
          { dia: "Day 4", texto: "Martillo Island penguins and Estancia Harberton (October to March), or Cerro Castor in winter." },
        ],
      },
      faq: [
        {
          pregunta: "What is the best time to visit Ushuaia?",
          respuesta:
            "It depends on your plans. October to March is best for hiking, Beagle Channel boat trips and penguins, with up to 17 hours of daylight. June to September is snow season, with Cerro Castor and the winter centers open.",
        },
        {
          pregunta: "How many days do you need in Ushuaia?",
          respuesta:
            "3 to 4 full days are enough for Tierra del Fuego National Park, a Beagle Channel boat trip, Martial Glacier or Laguna Esmeralda and the Lakes Circuit. With 5 days you can add the Martillo Island penguin colony.",
        },
        {
          pregunta: "What is the weather like in Ushuaia?",
          respuesta:
            "Cold all year: average highs are around 12 °C (54 °F) in January and 2 °C (36 °F) in July, and it snows in winter. Wind and sudden weather changes are common in every season, so dress in layers.",
        },
        {
          pregunta: "When can you see penguins in Ushuaia?",
          respuesta:
            "From October to March on Martillo Island, part of Estancia Harberton, about 90 km from town. Magellanic penguins and a small group of gentoo penguins breed there.",
        },
        {
          pregunta: "How do you get to Ushuaia from Buenos Aires?",
          respuesta:
            "By plane, with direct flights of about 3 h 30 min to Malvinas Argentinas International Airport. By road it is over 3,000 km on National Route 3, crossing the Strait of Magellan by ferry and a stretch of Chile.",
        },
        {
          pregunta: "Is Ushuaia the southernmost city in the world?",
          respuesta:
            "It is Argentina's southernmost city and is known as the City at the End of the World. Puerto Williams, in Chile, lies further south but is a much smaller town.",
        },
        {
          pregunta: "Can you go to Antarctica from Ushuaia?",
          respuesta:
            "Yes. Ushuaia is the main gateway to Antarctica: over 90% of Antarctic tourism ships operate from its port, about 1,000 km from the Antarctic Peninsula.",
        },
      ],
    },
    fuentes: [
      { label: "Secretaría de Turismo de Ushuaia", url: "https://turismoushuaia.com/" },
      { label: "Parque Nacional Tierra del Fuego (APN)", url: "https://www.argentina.gob.ar/parquesnacionales/tierradelfuego" },
      { label: "Glaciar Martial — Turismo Ushuaia", url: "https://turismoushuaia.com/actividad/glaciar-martial/" },
      { label: "Tren del Fin del Mundo", url: "https://www.trendelfindelmundo.com.ar/" },
      { label: "Cerro Castor", url: "https://www.cerrocastor.com/" },
    ],
    relacionados: [
      { tipo: "parque", slug: "tierra-del-fuego" },
      { tipo: "sendero", slug: "laguna-esmeralda" },
      { tipo: "fauna", slug: "pinguino-de-magallanes" },
      { tipo: "fauna", slug: "lobo-marino-del-sur" },
      { tipo: "gastronomia", slug: "centolla-patagonica" },
    ],
  },
]

export function getDestinoEntry(slug: string): DestinoEntry | undefined {
  return DESTINOS_CATALOG.find((d) => d.slug === slug)
}
