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
      { tipo: "destino", slug: "punta-arenas" },
    ],
  },
  {
    slug: "el-calafate",
    nombre: "El Calafate",
    pais: "AR",
    lat: -50.3378,
    lng: -72.26,
    wikipediaTitle: "El Calafate",
    es: {
      metaTitle: "El Calafate: Qué Hacer, Clima y Cómo Llegar",
      metaDescription:
        "Guía de El Calafate, Santa Cruz: qué hacer, clima mes a mes, cuándo ir, cómo llegar y cuántos días quedarse. Glaciar Perito Moreno, Upsala y Lago Argentino.",
      subtitulo: "Santa Cruz, Argentina · Lago Argentino",
      intro: [
        "El Calafate es una ciudad de la provincia de Santa Cruz, en la Patagonia argentina, sobre la costa sur del Lago Argentino, el lago más grande que está íntegramente en territorio argentino (1.415 km²). Tiene unos 23.000 habitantes, queda a 2.800 km de Buenos Aires y nació por un decreto nacional del 7 de diciembre de 1927.",
        "Es la puerta de entrada al Parque Nacional Los Glaciares, Patrimonio de la Humanidad desde 1981, con 726.927 ha y casi la mitad de su superficie cubierta por hielo. Desde la ciudad se va al Glaciar Perito Moreno, a 80 km, cuyo frente tiene unos 5 km de ancho y entre 60 y 70 m de altura sobre el lago, y se navega el Lago Argentino hasta los glaciares Upsala y Spegazzini.",
        "Se puede visitar todo el año: el Perito Moreno abre también en invierno, aunque algunas excursiones, como el Big Ice o la Estancia Cristina, funcionan solo entre la primavera y el otoño. La época ideal es de octubre a marzo, cuando opera toda la oferta de navegaciones y caminatas sobre el hielo.",
      ],
      datos: [
        { label: "Provincia", valor: "Santa Cruz" },
        { label: "Población", valor: "≈ 23.000 habitantes" },
        { label: "Fundación", valor: "7 de diciembre de 1927" },
        { label: "Aeropuerto", valor: "Internacional Comandante Armando Tola (FTE), a 23 km" },
        { label: "Glaciar Perito Moreno", valor: "80 km por la Ruta Provincial 11" },
        { label: "Días recomendados", valor: "3 a 4" },
        { label: "Mejor época", valor: "Octubre a marzo" },
      ],
      queHacer: [
        {
          nombre: "Pasarelas del Glaciar Perito Moreno",
          texto:
            "La excursión que no puede faltar. Frente al glaciar hay unos 4 km de pasarelas y balcones, divididos en seis circuitos de entre 150 m y 1,1 km, incluido uno accesible. Si hay suerte, se ven desprendimientos de hielo sobre el Canal de los Témpanos. Entre septiembre y abril el acceso abre de 8 a 18 h y en invierno, de 9 a 16 h; la entrada al parque se paga en el camino.",
          gygQuery: "Perito Moreno Glacier",
        },
        {
          nombre: "Safari náutico frente al glaciar",
          texto:
            "Una navegación de una hora que sale de Puerto Bajo de las Sombras, sobre la Ruta 11, y se acerca hasta unos 400 m de la pared sur del Perito Moreno. Es apta para todas las edades y funciona todo el año.",
          gygQuery: "Perito Moreno boat safari",
        },
        {
          nombre: "Minitrekking y Big Ice sobre el glaciar",
          texto:
            "Caminatas con crampones sobre el Perito Moreno. El Minitrekking tiene alrededor de una hora sobre el hielo y es para personas de 8 a 65 años; el Big Ice suma unas 3 horas de hielo, es para personas de 18 a 50 años y funciona del 15 de septiembre al 30 de abril. Conviene reservar con anticipación.",
          gygQuery: "Perito Moreno minitrekking",
        },
        {
          nombre: "Navegación a los glaciares Upsala y Spegazzini",
          texto:
            "Las navegaciones por el Lago Argentino salen de Puerto Punta Bandera, a 47 km de la ciudad, y recorren los brazos del lago entre témpanos hasta el Upsala y el Spegazzini, cuyas paredes llegan a 135 m. La excursión Todo Glaciares dura unas 7 horas y sale todos los días de septiembre a abril y día por medio en invierno.",
          gygQuery: "El Calafate Upsala Spegazzini",
        },
        {
          nombre: "Estancia Cristina",
          texto:
            "Una estancia histórica dentro del Parque Nacional, a la que solo se llega en barco desde Puerto Punta Bandera. La excursión de día completo suma unas 4 horas de navegación (ida y vuelta) y varias horas en la estancia. Funciona del 1 de octubre al 30 de abril.",
          gygQuery: "Estancia Cristina",
        },
        {
          nombre: "Glaciarium",
          texto:
            "Centro de interpretación dedicado a los glaciares y al hielo patagónico, a 6 km de la ciudad por la Ruta Provincial 11, con un bar de hielo (Glaciobar). Hay un transfer gratuito desde el centro. Es un buen plan para el día de llegada o para una tarde de viento.",
        },
        {
          nombre: "Reserva Laguna Nimez",
          texto:
            "Reserva natural municipal a 800 m de la avenida principal, sobre la costa del Lago Argentino. Está reconocida como Área Importante para la Conservación de las Aves (AICA) y tiene un sendero interpretativo de 3 km para observar aves acuáticas. Abre todo el año.",
        },
        {
          nombre: "Punta Walichu",
          texto:
            "Sitio arqueológico a 8 km del centro con pinturas rupestres de unos 4.000 años en aleros de arenisca, relevado por Francisco P. Moreno en 1877. Se recorre con audioguía y abre todo el año.",
        },
        {
          nombre: "Excursión a El Chaltén",
          texto:
            "El sector norte del Parque Nacional Los Glaciares, al pie del Fitz Roy, está a 220 km por ruta asfaltada, unas 3 horas y media. Se puede hacer en el día, pero los trekkings más conocidos, como la Laguna de los Tres, piden quedarse al menos una noche.",
          gygQuery: "El Chalten day trip from El Calafate",
        },
      ],
      cuandoIr: {
        resumen:
          "El Calafate se visita todo el año. De octubre a marzo funcionan todas las excursiones y es la época ideal; en invierno el Perito Moreno sigue abierto, con menos gente y menos oferta de alojamiento y excursiones.",
        temporadas: [
          {
            nombre: "Verano",
            meses: "Diciembre a febrero",
            texto:
              "Temporada alta: días largos y todas las navegaciones, caminatas sobre el hielo y excursiones a estancias en funcionamiento. Conviene reservar con tiempo alojamiento y el Minitrekking o el Big Ice.",
          },
          {
            nombre: "Otoño",
            meses: "Marzo a mayo",
            texto:
              "Baja la cantidad de visitantes. El Big Ice y la Estancia Cristina operan hasta el 30 de abril; desde mayo rige el horario de invierno del glaciar.",
          },
          {
            nombre: "Invierno",
            meses: "Junio a agosto",
            texto:
              "El acceso al Perito Moreno abre de 9 a 16 h, el safari náutico sigue funcionando y la navegación a Upsala y Spegazzini sale día por medio. Hay menos alojamientos y servicios abiertos.",
          },
          {
            nombre: "Primavera",
            meses: "Septiembre a noviembre",
            texto:
              "Desde el 1 de septiembre el glaciar vuelve al horario de 8 a 18 h, el Big Ice arranca el 15 de septiembre y la Estancia Cristina abre en octubre. Hay menos gente que en verano.",
          },
        ],
      },
      comoLlegar: [
        {
          modo: "En avión",
          texto:
            "Es la forma más práctica. El Aeropuerto Internacional Comandante Armando Tola, a 23 km del centro, tiene vuelos directos desde Buenos Aires (menos de 3 horas), Córdoba, Bariloche, Trelew y Ushuaia.",
        },
        {
          modo: "Por tierra",
          texto:
            "Desde Río Gallegos son 316 km por las rutas nacionales 3 y 40 y la provincial 11. El Chaltén está a 220 km por ruta asfaltada.",
        },
        {
          modo: "Desde Chile",
          texto:
            "Hay buses desde Puerto Natales, la puerta de entrada a Torres del Paine, que tardan unas 5 horas y cruzan la frontera por el paso Río Don Guillermo, en Cerro Castillo.",
        },
      ],
      cuantosDias: {
        resumen:
          "Con 3 o 4 días completos se recorre lo principal. Si querés sumar El Chaltén, agregá al menos 2 o 3 días más y dormí allá.",
        itinerario: [
          { dia: "Día 1", texto: "Glaciar Perito Moreno: pasarelas y safari náutico, o Minitrekking o Big Ice sobre el hielo." },
          { dia: "Día 2", texto: "Navegación por el Lago Argentino a los glaciares Upsala y Spegazzini, o Estancia Cristina (octubre a abril)." },
          { dia: "Día 3", texto: "Glaciarium, Reserva Laguna Nimez y Punta Walichu, en la ciudad y sus alrededores." },
          { dia: "Día 4", texto: "Excursión a El Chaltén o segundo día en el Perito Moreno con otra actividad." },
        ],
      },
      faq: [
        {
          pregunta: "¿Cuál es la mejor época para viajar a El Calafate?",
          respuesta:
            "De octubre a marzo, cuando funcionan todas las excursiones: navegaciones, Minitrekking, Big Ice y Estancia Cristina. El Perito Moreno se puede visitar todo el año, así que el invierno es una opción si buscás menos gente y no te importa tener menos excursiones disponibles.",
        },
        {
          pregunta: "¿Cuántos días hacen falta para conocer El Calafate?",
          respuesta:
            "Entre 3 y 4 días completos: uno para el Glaciar Perito Moreno, uno para la navegación a los glaciares Upsala y Spegazzini o la Estancia Cristina, y uno para el Glaciarium, la Laguna Nimez y Punta Walichu. Si sumás El Chaltén, agregá 2 o 3 días más.",
        },
        {
          pregunta: "¿Cómo es el clima en El Calafate?",
          respuesta:
            "Los veranos son templados y los inviernos fríos, con viento predominante del oeste y del sudoeste. Los promedios de temperatura y de horas de luz de cada mes están en la sección de clima de esta guía. En cualquier época conviene vestirse por capas, sobre todo para ir al glaciar.",
        },
        {
          pregunta: "¿Se puede visitar El Calafate en invierno?",
          respuesta:
            "Sí. El acceso al Glaciar Perito Moreno abre de 9 a 16 h entre mayo y agosto, el safari náutico funciona todo el año y la navegación a Upsala y Spegazzini sale día por medio. El Big Ice y la Estancia Cristina no operan en invierno, y hay menos alojamientos abiertos.",
        },
        {
          pregunta: "¿Cómo llegar a El Calafate desde Buenos Aires?",
          respuesta:
            "En avión, con vuelos directos de menos de 3 horas al Aeropuerto Internacional Comandante Armando Tola, a 23 km del centro. La ciudad está a 2.800 km de Buenos Aires.",
        },
        {
          pregunta: "¿A cuánto está el Glaciar Perito Moreno de El Calafate?",
          respuesta:
            "A 80 km por la Ruta Provincial 11. Se llega en excursión, bus regular, transfer o auto propio. La entrada al Parque Nacional Los Glaciares se paga en el acceso, sobre el camino al glaciar.",
        },
        {
          pregunta: "¿Cómo ir de El Calafate a El Chaltén o a Puerto Natales?",
          respuesta:
            "El Chaltén está a 220 km por ruta asfaltada, unas 3 horas y media en bus o auto. A Puerto Natales, en Chile, hay buses de unas 5 horas que cruzan por el paso Río Don Guillermo, en Cerro Castillo.",
        },
      ],
    },
    en: {
      metaTitle: "El Calafate Travel Guide: Things to Do & Weather",
      metaDescription:
        "El Calafate, Argentina travel guide: things to do, weather by month, best time to visit, how to get there and how long to stay. Perito Moreno Glacier & more.",
      subtitulo: "Santa Cruz, Argentina · Lake Argentino",
      intro: [
        "El Calafate is a town in Argentina's Santa Cruz province, in Patagonia, on the southern shore of Lake Argentino, the largest lake lying entirely within Argentina (1,415 km²). It has about 23,000 residents, sits 2,800 km from Buenos Aires and was created by a national decree on December 7, 1927.",
        "It is the gateway to Los Glaciares National Park, a UNESCO World Heritage Site since 1981, covering 726,927 ha with almost half of it under ice. From town you can visit the Perito Moreno Glacier, 80 km away, whose front is about 5 km wide and 60 to 70 m high above the lake, and take boat trips across Lake Argentino to the Upsala and Spegazzini glaciers.",
        "You can visit year-round: the Perito Moreno stays open in winter, although some excursions, such as Big Ice or Estancia Cristina, only run from spring to autumn. The best time to go is October to March, when every boat trip and glacier hike is operating.",
      ],
      datos: [
        { label: "Province", valor: "Santa Cruz, Argentina" },
        { label: "Population", valor: "≈ 23,000" },
        { label: "Founded", valor: "December 7, 1927" },
        { label: "Airport", valor: "Comandante Armando Tola International (FTE), 23 km" },
        { label: "Perito Moreno Glacier", valor: "80 km on Provincial Route 11" },
        { label: "Recommended stay", valor: "3 to 4 days" },
        { label: "Best time", valor: "October to March" },
      ],
      queHacer: [
        {
          nombre: "Perito Moreno Glacier walkways",
          texto:
            "The one trip you can't skip. Facing the glacier there are about 4 km of walkways and balconies, split into six trails from 150 m to 1.1 km long, including an accessible one. With luck you'll see ice calving into the Canal de los Témpanos. From September to April access is open 8 am to 6 pm, and 9 am to 4 pm in winter; the park entrance fee is paid on the way in.",
          gygQuery: "Perito Moreno Glacier",
        },
        {
          nombre: "Boat safari to the glacier face",
          texto:
            "A one-hour boat ride from Puerto Bajo de las Sombras, on Route 11, that gets to about 400 m from the glacier's south wall. Suitable for all ages and runs year-round.",
          gygQuery: "Perito Moreno boat safari",
        },
        {
          nombre: "Minitrekking and Big Ice on the glacier",
          texto:
            "Guided hikes on the Perito Moreno with crampons. Minitrekking spends about an hour on the ice and is open to ages 8 to 65; Big Ice spends about 3 hours on the ice, is for ages 18 to 50 and runs from September 15 to April 30. Book well ahead.",
          gygQuery: "Perito Moreno minitrekking",
        },
        {
          nombre: "Boat trip to Upsala and Spegazzini glaciers",
          texto:
            "Lake Argentino cruises leave from Puerto Punta Bandera, 47 km from town, and sail through icebergs to the Upsala and Spegazzini glaciers, whose walls reach 135 m. The full-day Todo Glaciares trip takes about 7 hours and runs daily from September to April and every other day in winter.",
          gygQuery: "El Calafate Upsala Spegazzini",
        },
        {
          nombre: "Estancia Cristina",
          texto:
            "A historic ranch inside the national park that can only be reached by boat from Puerto Punta Bandera. The full-day trip includes about 4 hours of sailing (round trip) plus several hours at the ranch. It runs from October 1 to April 30.",
          gygQuery: "Estancia Cristina",
        },
        {
          nombre: "Glaciarium",
          texto:
            "An interpretation center about glaciers and Patagonian ice, 6 km from town on Provincial Route 11, with an ice bar (Glaciobar). A free shuttle runs from downtown. A good plan for your arrival day or a windy afternoon.",
        },
        {
          nombre: "Laguna Nimez Nature Reserve",
          texto:
            "A municipal nature reserve 800 m from the main street, on the shore of Lake Argentino. It is an Important Bird Area (IBA) with a 3 km interpretive trail for spotting waterbirds. Open year-round.",
        },
        {
          nombre: "Punta Walichu",
          texto:
            "An archaeological site 8 km from downtown with rock paintings about 4,000 years old in sandstone shelters, surveyed by Francisco P. Moreno in 1877. Visits come with an audio guide and it is open year-round.",
        },
        {
          nombre: "Day trip to El Chaltén",
          texto:
            "The northern section of Los Glaciares National Park, at the foot of Mount Fitz Roy, is 220 km away on a paved road, about 3.5 hours. It works as a day trip, but the best-known hikes, like Laguna de los Tres, are worth at least one night there.",
          gygQuery: "El Chalten day trip from El Calafate",
        },
      ],
      cuandoIr: {
        resumen:
          "El Calafate is a year-round destination. October to March is the best time, with every excursion running; in winter the Perito Moreno is still open, with fewer visitors and fewer hotels and tours available.",
        temporadas: [
          {
            nombre: "Summer",
            meses: "December to February",
            texto:
              "Peak season: long days and every boat trip, glacier hike and ranch excursion running. Book accommodation and Minitrekking or Big Ice well in advance.",
          },
          {
            nombre: "Autumn",
            meses: "March to May",
            texto:
              "Crowds thin out. Big Ice and Estancia Cristina run until April 30; from May the glacier switches to winter hours.",
          },
          {
            nombre: "Winter",
            meses: "June to August",
            texto:
              "Perito Moreno access is open 9 am to 4 pm, the boat safari keeps running and the Upsala and Spegazzini cruise sails every other day. Fewer hotels and services are open.",
          },
          {
            nombre: "Spring",
            meses: "September to November",
            texto:
              "From September 1 the glacier is back to 8 am–6 pm hours, Big Ice starts on September 15 and Estancia Cristina opens in October. Fewer crowds than in summer.",
          },
        ],
      },
      comoLlegar: [
        {
          modo: "By plane",
          texto:
            "The easiest option. Comandante Armando Tola International Airport, 23 km from downtown, has direct flights from Buenos Aires (under 3 hours), Córdoba, Bariloche, Trelew and Ushuaia.",
        },
        {
          modo: "By road",
          texto:
            "Río Gallegos is 316 km away via National Routes 3 and 40 and Provincial Route 11. El Chaltén is 220 km away on a paved road.",
        },
        {
          modo: "From Chile",
          texto:
            "Buses from Puerto Natales, the gateway to Torres del Paine, take about 5 hours and cross the border at the Río Don Guillermo pass in Cerro Castillo.",
        },
      ],
      cuantosDias: {
        resumen:
          "3 or 4 full days cover the highlights. If you want to add El Chaltén, plan at least 2 or 3 more days and stay overnight there.",
        itinerario: [
          { dia: "Day 1", texto: "Perito Moreno Glacier: walkways and boat safari, or Minitrekking or Big Ice on the ice." },
          { dia: "Day 2", texto: "Lake Argentino cruise to the Upsala and Spegazzini glaciers, or Estancia Cristina (October to April)." },
          { dia: "Day 3", texto: "Glaciarium, Laguna Nimez Reserve and Punta Walichu, in and around town." },
          { dia: "Day 4", texto: "Day trip to El Chaltén, or a second day at the Perito Moreno with a different activity." },
        ],
      },
      faq: [
        {
          pregunta: "What is the best time to visit El Calafate?",
          respuesta:
            "October to March, when every excursion runs: boat trips, Minitrekking, Big Ice and Estancia Cristina. The Perito Moreno is open all year, so winter is an option if you prefer fewer crowds and don't mind a shorter list of tours.",
        },
        {
          pregunta: "How many days do you need in El Calafate?",
          respuesta:
            "3 to 4 full days: one for the Perito Moreno Glacier, one for the Upsala and Spegazzini cruise or Estancia Cristina, and one for the Glaciarium, Laguna Nimez and Punta Walichu. Add 2 or 3 more days for El Chaltén.",
        },
        {
          pregunta: "What is the weather like in El Calafate?",
          respuesta:
            "Summers are mild and winters cold, with prevailing winds from the west and southwest. Average temperatures and daylight hours for each month are in the weather section of this guide. Dress in layers in any season, especially for the glacier.",
        },
        {
          pregunta: "Is El Calafate worth visiting in winter?",
          respuesta:
            "Yes. Perito Moreno access is open 9 am to 4 pm from May to August, the boat safari runs year-round and the Upsala and Spegazzini cruise sails every other day. Big Ice and Estancia Cristina don't operate in winter, and fewer hotels are open.",
        },
        {
          pregunta: "How do you get to El Calafate from Buenos Aires?",
          respuesta:
            "By plane, with direct flights of under 3 hours to Comandante Armando Tola International Airport, 23 km from downtown. The town is 2,800 km from Buenos Aires.",
        },
        {
          pregunta: "How far is the Perito Moreno Glacier from El Calafate?",
          respuesta:
            "80 km on Provincial Route 11. You can go on a tour, by regular bus, by transfer or in your own car. The Los Glaciares National Park entrance fee is paid at the park gate on the way to the glacier.",
        },
        {
          pregunta: "How do you get from El Calafate to El Chaltén or Puerto Natales?",
          respuesta:
            "El Chaltén is 220 km away on a paved road, about 3.5 hours by bus or car. To Puerto Natales, in Chile, buses take about 5 hours and cross the border at the Río Don Guillermo pass in Cerro Castillo.",
        },
      ],
    },
    fuentes: [
      { label: "Secretaría de Turismo de El Calafate — Historia", url: "https://www.elcalafate.tur.ar/historia-de-el-calafate.htm" },
      { label: "Secretaría de Turismo de El Calafate — Consejos prácticos", url: "https://www.elcalafate.tur.ar/consejos-practicos-para-el-calafate.htm" },
      { label: "Reserva Laguna Nimez — Turismo El Calafate", url: "https://www.elcalafate.tur.ar/observacion-de-aves-bird-watching/reserva-laguna-nimez-bird-watching-es.htm" },
      { label: "Punta Walichu — Turismo El Calafate", url: "https://www.elcalafate.tur.ar/en-la-ciudad-de-el-calafate/punta-walichu.htm" },
      { label: "Glaciarium — Turismo El Calafate", url: "https://www.elcalafate.tur.ar/en-la-ciudad-de-el-calafate/glaciarium-centro-de-interpretacion.htm" },
      { label: "El Calafate — Argentina.travel (INPROTUR)", url: "https://www.argentina.travel/actividades/el-calafate" },
      { label: "Parque Nacional Los Glaciares (APN)", url: "https://www.argentina.gob.ar/parquesnacionales/losglaciares" },
      { label: "Horarios y cómo llegar — PN Los Glaciares (APN)", url: "https://www.argentina.gob.ar/parquesnacionales/patagonia-austral/parque-nacional-los-glaciares/horarios-como-llegar-0" },
      { label: "Folleto PN Los Glaciares (APN)", url: "https://argentina.gob.ar/sites/default/files/2019/06/folleto_informacion_gral_pnlg_espanol_2024.pdf" },
      { label: "Mapa de pasarelas del Glaciar Perito Moreno (APN)", url: "https://argentina.gob.ar/sites/default/files/2019/06/mapa_pasarelas_-_el_calafate_2024.pdf" },
      { label: "Ruptura del Glaciar Perito Moreno (APN, 2016)", url: "https://www.argentina.gob.ar/noticias/ruptura-total-del-glaciar-perito-moreno" },
      { label: "Senderismo en El Calafate — Ministerio de Turismo", url: "https://www.argentina.gob.ar/jefatura/turismo/viaja-por-argentina/hacer-senderismo-y-trekking-en-el-calafate" },
      { label: "Lagos de la Argentina (INDEC) — educ.ar", url: "https://www.educ.ar/recursos/70373/datos-sobre-la-argentina" },
      { label: "Cómo llegar a Santa Cruz — Gobierno de Santa Cruz", url: "https://www.argentina.gob.ar/santacruz/llegar" },
      { label: "Aeropuerto El Calafate", url: "https://www.aeropuertoelcalafate.com/" },
      { label: "Vuelos directos a El Calafate — Aerolíneas Argentinas", url: "https://www.aerolineas.com.ar/destinos/argentina/vuelos-directos-a-el-calafate" },
      { label: "Hielo y Aventura (Minitrekking, Big Ice, Safari Náutico)", url: "https://www.hieloyaventura.com/" },
      { label: "Glaciares Upsala y Spegazzini — Solo Patagonia", url: "https://solopatagonia.com/glaciar-upsala-y-glaciar-spegazzini-como-visitarlos/" },
      { label: "Estancia Cristina", url: "https://estanciacristina.com/es/como-llegar/" },
      { label: "Glaciarium", url: "https://glaciarium.com/" },
      { label: "Bus Sur — Puerto Natales a El Calafate", url: "https://bussur.com/wp-content/uploads/2024/05/TDP-CAL.pdf" },
      { label: "Paso Río Don Guillermo — Pasos Fronterizos de Chile", url: "https://www.pasosfronterizos.gov.cl/complejos-fronterizos/magallanes/paso-rio-don-guillermo/" },
    ],
    relacionados: [
      { tipo: "parque", slug: "los-glaciares" },
      { tipo: "destino", slug: "puerto-natales" },
      { tipo: "fauna", slug: "guanaco" },
      { tipo: "fauna", slug: "condor-andino" },
      { tipo: "gastronomia", slug: "cordero-patagonico" },
      { tipo: "destino", slug: "el-chalten" },
    ],
  },
  {
    slug: "bariloche",
    nombre: "Bariloche",
    pais: "AR",
    lat: -41.1335,
    lng: -71.3103,
    wikipediaTitle: "San Carlos de Bariloche",
    es: {
      metaTitle: "Bariloche: Qué Hacer, Clima, Cuándo Ir y Cómo Llegar",
      metaDescription:
        "Guía de Bariloche, Río Negro: qué hacer, clima mes a mes, cuándo ir, cómo llegar y cuántos días quedarse. Circuito Chico, Cerro Catedral y lago Nahuel Huapi.",
      subtitulo: "Río Negro, Argentina · Lago Nahuel Huapi",
      intro: [
        "San Carlos de Bariloche es una ciudad de la provincia de Río Negro, en la Patagonia argentina: está sobre el lago Nahuel Huapi y dentro del Parque Nacional Nahuel Huapi, a unos 1.640 km de Buenos Aires. El departamento Bariloche tiene 162.088 habitantes (censo 2022) y el pueblo se fundó el 3 de mayo de 1902.",
        "Es la base para recorrer un parque nacional de más de 717.000 hectáreas, con lagos, bosques y montañas: el Circuito Chico, los cerros Campanario, Otto y Catedral, las navegaciones a Isla Victoria, el Bosque de Arrayanes y Puerto Blest, y el Cerro Tronador. Por ley es la Capital Nacional del Chocolate y en invierno tiene el Cerro Catedral, el centro de esquí más grande del hemisferio sur.",
        "Se visita todo el año. Los veranos son templados, con máximas promedio de unos 22 °C en enero, y los inviernos fríos, con máximas de unos 5 °C en julio. De diciembre a marzo es la mejor época para trekking, playas de lago y navegaciones; de julio a septiembre, para la nieve.",
      ],
      datos: [
        { label: "Provincia", valor: "Río Negro" },
        { label: "Población", valor: "162.088 habitantes en el departamento (censo 2022)" },
        { label: "Fundación", valor: "3 de mayo de 1902" },
        { label: "Aeropuerto", valor: "Internacional Teniente Luis Candelaria" },
        { label: "Distancia desde Buenos Aires", valor: "1.640 km por ruta" },
        { label: "Días recomendados", valor: "4 a 5" },
        { label: "Mejor época", valor: "Dic–mar (verano) · jul–sep (nieve)" },
      ],
      queHacer: [
        {
          nombre: "Circuito Chico",
          texto:
            "El paseo clásico de Bariloche: unos 60 km por la avenida Bustillo y la península de Llao Llao, con el Hotel Llao Llao, la capilla San Eduardo, Puerto Pañuelo, Bahía López y el Punto Panorámico sobre el lago Moreno, a 945 m. En excursión lleva de 3 horas y media a 4; por tu cuenta, da para el día entero. Desde el km 42 se puede desviar a Colonia Suiza, el primer asentamiento europeo de la zona, con feria artesanal los miércoles y domingos y curanto los domingos.",
          gygQuery: "Bariloche Circuito Chico",
        },
        {
          nombre: "Cerro Campanario",
          texto:
            "En el km 17,5 de la avenida Bustillo. Una aerosilla de 640 m sube en unos 7 minutos hasta la cumbre, a 1.050 m, con vista a los lagos y montañas del Nahuel Huapi. También se puede subir a pie en unos 30 minutos. Abre todo el año, salvo algunos días de temporada baja.",
        },
        {
          nombre: "Cerro Otto y su confitería giratoria",
          texto:
            "La base está a 5 km del centro. Un teleférico de góndolas recorre 2.100 m en unos 12 minutos hasta la cima, a 1.405 m, donde está la confitería giratoria, que da una vuelta completa en 20 minutos. Arriba también hay una galería con réplicas de esculturas de Miguel Ángel. Abre todo el año, salvo algunas semanas de mayo.",
        },
        {
          nombre: "Cerro Catedral: esquí y trekking al Refugio Frey",
          texto:
            "A 19 km de la ciudad, es el centro de esquí más grande del hemisferio sur, con 1.200 hectáreas esquiables y 32 medios de elevación que suben desde unos 1.000 m hasta casi 2.000 m. La temporada de nieve va de julio a fines de septiembre, según las condiciones. En verano sigue abierto, con mountain bike, y desde su base sale el trekking al Refugio Frey: 10 km, 700 m de desnivel y de 4 a 6 horas de marcha, de diciembre a abril.",
          gygQuery: "Cerro Catedral Bariloche",
        },
        {
          nombre: "Isla Victoria y Bosque de Arrayanes",
          texto:
            "La navegación sale de Puerto Pañuelo, a 25 km del centro, y en una hora llega a la península de Quetrihue, donde está el Parque Nacional Los Arrayanes, con ejemplares de más de 650 años y más de 15 m de alto. En Isla Victoria se recorren senderos, la Playa del Toro y pinturas rupestres.",
          gygQuery: "Isla Victoria Arrayanes Forest",
        },
        {
          nombre: "Puerto Blest y Cascada Los Cántaros",
          texto:
            "Otra navegación desde Puerto Pañuelo, por el brazo Blest del Nahuel Huapi, pasando junto a la Isla Centinela, donde descansan los restos del Perito Moreno. En Puerto Cántaros se sube a la Cascada Los Cántaros y a un alerce de más de 1.500 años; se puede sumar la navegación por el lago Frías.",
          gygQuery: "Puerto Blest Bariloche",
        },
        {
          nombre: "Cerro Tronador y Ventisquero Negro",
          texto:
            "El Tronador tiene 3.491 m. Se llega por la Ruta 40, bordeando los lagos Gutiérrez y Mascardi, y luego por la Ruta Provincial 81, de ripio, hasta Pampa Linda (unas 2 horas desde Bariloche) y el mirador del Ventisquero Negro. El último tramo tiene horarios: se sube solo de 10:30 a 14 h y se baja solo de 16 a 18 h. El circuito puede cerrarse por crecidas o nieve, así que consultá su estado en el Parque Nacional antes de ir.",
          gygQuery: "Cerro Tronador Bariloche",
        },
        {
          nombre: "Centro Cívico, Museo de la Patagonia y chocolate",
          texto:
            "El Centro Cívico se inauguró el 17 de marzo de 1940 con diseño del arquitecto Ernesto de Estrada y es Monumento Histórico Nacional. En su ala este funciona el Museo de la Patagonia Francisco P. Moreno, de lunes a viernes de 9 a 12 y de 14 a 17 h. Bariloche es Capital Nacional del Chocolate por la Ley 27.089: hay chocolaterías donde se elabora a la vista y en Semana Santa se hace la Fiesta Nacional del Chocolate, en el Centro Cívico y la calle Mitre.",
        },
        {
          nombre: "Ruta de los Siete Lagos",
          texto:
            "El tramo de 110 km de la Ruta 40 entre Villa La Angostura y San Martín de los Andes une siete lagos de la cordillera neuquina. Desde Bariloche hasta San Martín de los Andes son 184 km; la excursión de ida y vuelta suma unos 370 km y lleva de 10 a 11 horas. Otra salida de día completo es El Bolsón, a 129 km por la Ruta 40.",
          gygQuery: "Bariloche 7 Lakes San Martin de los Andes",
        },
      ],
      cuandoIr: {
        resumen:
          "Bariloche se visita todo el año: de diciembre a marzo para trekking, navegaciones y playas de lago; de julio a septiembre para esquiar en el Cerro Catedral. El otoño y la primavera tienen menos gente y los paseos principales siguen funcionando.",
        temporadas: [
          {
            nombre: "Verano",
            meses: "Diciembre a febrero",
            texto:
              "Máximas de unos 20 a 22 °C y unas 15 horas de luz. Es temporada alta y la época del trekking al Refugio Frey, que se hace de diciembre a abril.",
          },
          {
            nombre: "Otoño",
            meses: "Marzo a mayo",
            texto:
              "Los bosques cambian de color, baja la cantidad de gente y las temperaturas van de unos 19 °C de máxima en marzo a 9 °C en mayo. El teleférico del Cerro Otto suele cerrar algunas semanas en mayo.",
          },
          {
            nombre: "Invierno",
            meses: "Junio a agosto",
            texto:
              "Máximas de 5 a 6 °C, mínimas cerca de 0 °C y entre 9 y 10 horas de luz. Es la temporada de esquí del Cerro Catedral, que arranca en julio según la nieve.",
          },
          {
            nombre: "Primavera",
            meses: "Septiembre a noviembre",
            texto:
              "En septiembre todavía se esquía y desde octubre se alargan los días y suben las temperaturas, de unos 9 °C de máxima en septiembre a 16 °C en noviembre. Hay menos turistas que en verano.",
          },
        ],
      },
      comoLlegar: [
        {
          modo: "En avión",
          texto:
            "Es la forma más práctica. El Aeropuerto Internacional Teniente Luis Candelaria recibe vuelos directos de Aerolíneas Argentinas desde Buenos Aires, Córdoba, Rosario, Mendoza y El Calafate; también vuelan JetSMART y Flybondi. Al centro se llega en la línea de colectivo 72, remís, taxi o auto de alquiler.",
        },
        {
          modo: "Por tierra",
          texto:
            "Desde Buenos Aires son 1.640 km, por Santa Rosa (rutas nacionales 5, 35, 22, 237 y 40) o por Bahía Blanca (rutas 3, 22, 237 y 40). El Tren Patagónico une Viedma y Bariloche una vez por semana en cada sentido, en más de 800 km de recorrido; conviene confirmar el servicio en su sitio oficial.",
        },
        {
          modo: "Desde Chile",
          texto:
            "Por el Paso Cardenal Samoré, a 53 km de Villa La Angostura, habilitado todo el año y asfaltado (en invierno las cadenas son obligatorias); Osorno está a 250 km y Puerto Varas a 318 km. El Cruce Andino une Bariloche y Puerto Varas en unas 12 horas, combinando bus y navegación por los lagos Nahuel Huapi, Frías y Todos los Santos.",
        },
      ],
      cuantosDias: {
        resumen:
          "Con 4 o 5 días completos se recorre lo principal. Si querés sumar la Ruta de los Siete Lagos, El Bolsón o trekkings largos, mejor una semana.",
        itinerario: [
          { dia: "Día 1", texto: "Centro Cívico, Museo de la Patagonia, chocolaterías y Cerro Otto al atardecer." },
          { dia: "Día 2", texto: "Circuito Chico con Cerro Campanario a la mañana y Colonia Suiza a la tarde." },
          { dia: "Día 3", texto: "Navegación a Isla Victoria y el Bosque de Arrayanes, o a Puerto Blest y la Cascada Los Cántaros." },
          { dia: "Día 4", texto: "Cerro Catedral: esquí en invierno o trekking al Refugio Frey en verano." },
          { dia: "Día 5", texto: "Cerro Tronador y Ventisquero Negro, o Ruta de los Siete Lagos hasta San Martín de los Andes." },
        ],
      },
      faq: [
        {
          pregunta: "¿Cuál es la mejor época para viajar a Bariloche?",
          respuesta:
            "Depende de lo que busques. De diciembre a marzo es la mejor época para trekking, navegaciones y playas de lago, con máximas de unos 20 a 22 °C. De julio a septiembre es la temporada de esquí en el Cerro Catedral. El otoño y la primavera tienen menos gente y casi todos los paseos funcionan.",
        },
        {
          pregunta: "¿Cuántos días hacen falta para conocer Bariloche?",
          respuesta:
            "Entre 4 y 5 días completos alcanzan para el Circuito Chico, los cerros Campanario, Otto y Catedral, una navegación a Isla Victoria o Puerto Blest y el Cerro Tronador. Con una semana se suman la Ruta de los Siete Lagos y El Bolsón.",
        },
        {
          pregunta: "¿Cómo es el clima en Bariloche?",
          respuesta:
            "Veranos templados, con máximas promedio de unos 22 °C y mínimas de 10 °C en enero, e inviernos fríos, con máximas de unos 5 °C y mínimas cerca de 0 °C en julio. En los cerros nieva en invierno y en verano las noches son frescas, así que conviene llevar abrigo en cualquier época.",
        },
        {
          pregunta: "¿Qué hacer en Bariloche en invierno?",
          respuesta:
            "Esquiar o hacer snowboard en el Cerro Catedral, a 19 km de la ciudad, cuya temporada va de julio a fines de septiembre según la nieve. El Circuito Chico, el Cerro Campanario, el Cerro Otto y las navegaciones a Isla Victoria funcionan todo el año.",
        },
        {
          pregunta: "¿Cómo llegar a Bariloche desde Buenos Aires?",
          respuesta:
            "En avión, con vuelos directos al Aeropuerto Internacional Teniente Luis Candelaria. Por tierra son 1.640 km, en auto o en bus. También se puede combinar con el Tren Patagónico desde Viedma, que sale una vez por semana.",
        },
        {
          pregunta: "¿Cómo llegar a Bariloche desde Chile?",
          respuesta:
            "Por el Paso Cardenal Samoré, que abre todo el año: Osorno está a 250 km y Puerto Montt a 390 km. La otra opción es el Cruce Andino desde Puerto Varas, de unas 12 horas, en bus y barco por los lagos Todos los Santos, Frías y Nahuel Huapi.",
        },
        {
          pregunta: "¿Qué hacer en Bariloche con lluvia?",
          respuesta:
            "El Museo de la Patagonia, en el Centro Cívico, abre de lunes a viernes de 9 a 12 y de 14 a 17 h. Las chocolaterías del centro elaboran el chocolate a la vista, y la confitería giratoria del Cerro Otto, a 1.405 m, se recorre bajo techo.",
        },
      ],
    },
    en: {
      metaTitle: "Bariloche Travel Guide: Things to Do & Weather",
      metaDescription:
        "Bariloche, Argentina travel guide: things to do, weather by month, best time to visit, how to get there and how long to stay. Circuito Chico, skiing & lakes.",
      subtitulo: "Río Negro, Argentina · Nahuel Huapi Lake",
      intro: [
        "San Carlos de Bariloche is a city in Río Negro province, in Argentine Patagonia. It lies on Nahuel Huapi Lake and inside Nahuel Huapi National Park, about 1,640 km from Buenos Aires by road. The Bariloche department has 162,088 residents (2022 census), and the town was founded on May 3, 1902.",
        "It is the base for exploring a national park of over 717,000 hectares of lakes, forests and mountains: the Circuito Chico scenic drive, Cerro Campanario, Cerro Otto and Cerro Catedral, boat trips to Victoria Island, the Arrayanes Forest and Puerto Blest, and Mount Tronador. By law it is Argentina's National Chocolate Capital, and in winter Cerro Catedral is the largest ski resort in the Southern Hemisphere.",
        "Bariloche is a year-round destination. Summers are mild, with average highs of about 22 °C (72 °F) in January, and winters are cold, with highs of about 5 °C (41 °F) in July. December to March is best for hiking, lake beaches and boat trips; July to September is for snow.",
      ],
      datos: [
        { label: "Province", valor: "Río Negro, Argentina" },
        { label: "Population", valor: "162,088 in the department (2022 census)" },
        { label: "Founded", valor: "May 3, 1902" },
        { label: "Airport", valor: "Teniente Luis Candelaria International" },
        { label: "Distance from Buenos Aires", valor: "1,640 km by road" },
        { label: "Recommended stay", valor: "4 to 5 days" },
        { label: "Best time", valor: "Dec–Mar (summer) · Jul–Sep (snow)" },
      ],
      queHacer: [
        {
          nombre: "Circuito Chico",
          texto:
            "Bariloche's classic scenic loop: about 60 km along Bustillo Avenue and the Llao Llao peninsula, past the Llao Llao Hotel, San Eduardo chapel, Puerto Pañuelo, López Bay and the Punto Panorámico viewpoint over Lake Moreno, at 945 m. A guided tour takes 3.5 to 4 hours; on your own, it fills a whole day. At km 42 you can detour to Colonia Suiza, the area's first European settlement, with a craft fair on Wednesdays and Sundays and curanto on Sundays.",
          gygQuery: "Bariloche Circuito Chico",
        },
        {
          nombre: "Cerro Campanario",
          texto:
            "At km 17.5 of Bustillo Avenue. A 640 m chairlift takes about 7 minutes to the 1,050 m summit, with views over the lakes and mountains of Nahuel Huapi. You can also hike up in about 30 minutes. Open year-round, except some low-season days.",
        },
        {
          nombre: "Cerro Otto and the revolving café",
          texto:
            "The base is 5 km from downtown. A gondola cable car covers 2,100 m in about 12 minutes to the 1,405 m summit, home to a revolving café that turns a full circle in 20 minutes. There is also a gallery with replicas of Michelangelo sculptures. Open year-round, except a few weeks in May.",
        },
        {
          nombre: "Cerro Catedral: skiing and the Refugio Frey hike",
          texto:
            "19 km from town, it is the largest ski resort in the Southern Hemisphere, with 1,200 skiable hectares and 32 lifts rising from about 1,000 m to almost 2,000 m. Ski season runs from July to late September, snow permitting. In summer it stays open for mountain biking, and the hike to Refugio Frey starts at its base: 10 km, 700 m of elevation gain and 4 to 6 hours of walking, from December to April.",
          gygQuery: "Cerro Catedral Bariloche",
        },
        {
          nombre: "Victoria Island and the Arrayanes Forest",
          texto:
            "Boats leave from Puerto Pañuelo, 25 km from downtown, and reach the Quetrihue peninsula in an hour. There, Los Arrayanes National Park protects myrtle trees over 650 years old and more than 15 m tall. On Victoria Island you can walk trails to Playa del Toro and see rock paintings.",
          gygQuery: "Isla Victoria Arrayanes Forest",
        },
        {
          nombre: "Puerto Blest and Los Cántaros Waterfall",
          texto:
            "Another cruise from Puerto Pañuelo, along the Blest arm of Nahuel Huapi Lake and past Centinela Island, where Perito Moreno is buried. At Puerto Cántaros you climb to Los Cántaros Waterfall and an alerce tree over 1,500 years old; you can add a boat trip on Lake Frías.",
          gygQuery: "Puerto Blest Bariloche",
        },
        {
          nombre: "Mount Tronador and the Black Glacier",
          texto:
            "Tronador rises to 3,491 m. The road follows Route 40 past lakes Gutiérrez and Mascardi, then gravel Provincial Route 81 to Pampa Linda (about 2 hours from Bariloche) and the Ventisquero Negro (Black Glacier) viewpoint. The last stretch is one-way at set times: up only from 10:30 am to 2 pm, down only from 4 to 6 pm. The road can close after floods or snow, so check its status with the national park before you go.",
          gygQuery: "Cerro Tronador Bariloche",
        },
        {
          nombre: "Civic Center, Patagonia Museum and chocolate",
          texto:
            "The Civic Center opened on March 17, 1940, designed by architect Ernesto de Estrada, and is a National Historic Monument. Its east wing houses the Francisco P. Moreno Patagonia Museum, open Monday to Friday, 9 am to noon and 2 to 5 pm. Law 27,089 made Bariloche the National Chocolate Capital: some chocolate shops make it in front of you, and the National Chocolate Festival takes over the Civic Center and Mitre Street during Easter week.",
        },
        {
          nombre: "Seven Lakes Route",
          texto:
            "The 110 km stretch of Route 40 between Villa La Angostura and San Martín de los Andes links seven Andean lakes in Neuquén. Bariloche to San Martín de los Andes is 184 km; the round-trip tour covers about 370 km and takes 10 to 11 hours. Another full-day trip is El Bolsón, 129 km south on Route 40.",
          gygQuery: "Bariloche 7 Lakes San Martin de los Andes",
        },
      ],
      cuandoIr: {
        resumen:
          "Bariloche is worth visiting year-round: December to March for hiking, boat trips and lake beaches; July to September for skiing at Cerro Catedral. Autumn and spring are quieter, and the main sights stay open.",
        temporadas: [
          {
            nombre: "Summer",
            meses: "December to February",
            texto:
              "Highs of about 20–22 °C (68–72 °F) and around 15 hours of daylight. Peak season, and the time for the Refugio Frey hike, done from December to April.",
          },
          {
            nombre: "Autumn",
            meses: "March to May",
            texto:
              "Forests change color, crowds thin out and highs drop from about 19 °C (66 °F) in March to 9 °C (48 °F) in May. The Cerro Otto cable car usually closes for a few weeks in May.",
          },
          {
            nombre: "Winter",
            meses: "June to August",
            texto:
              "Highs of 5–6 °C (41–43 °F), lows near 0 °C (32 °F) and 9 to 10 hours of daylight. Ski season at Cerro Catedral starts in July, snow permitting.",
          },
          {
            nombre: "Spring",
            meses: "September to November",
            texto:
              "You can still ski in September, and from October days get longer and warmer, with highs rising from about 9 °C (48 °F) in September to 16 °C (61 °F) in November. Fewer tourists than in summer.",
          },
        ],
      },
      comoLlegar: [
        {
          modo: "By plane",
          texto:
            "The easiest option. Teniente Luis Candelaria International Airport has direct Aerolíneas Argentinas flights from Buenos Aires, Córdoba, Rosario, Mendoza and El Calafate; JetSMART and Flybondi also fly there. Bus line 72, taxis, remises and rental cars connect it with downtown.",
        },
        {
          modo: "By road or train",
          texto:
            "Buenos Aires is 1,640 km away, via Santa Rosa (National Routes 5, 35, 22, 237 and 40) or via Bahía Blanca (Routes 3, 22, 237 and 40). The Tren Patagónico links Viedma and Bariloche once a week in each direction, over more than 800 km; check the official site before planning around it.",
        },
        {
          modo: "From Chile",
          texto:
            "Through the Cardenal Samoré pass, 53 km from Villa La Angostura, open year-round and fully paved (snow chains are mandatory in winter); Osorno is 250 km away and Puerto Varas 318 km. The Cruce Andino links Bariloche and Puerto Varas in about 12 hours by bus and boat across lakes Nahuel Huapi, Frías and Todos los Santos.",
        },
      ],
      cuantosDias: {
        resumen:
          "4 or 5 full days cover the highlights. Plan a week if you want to add the Seven Lakes Route, El Bolsón or longer hikes.",
        itinerario: [
          { dia: "Day 1", texto: "Civic Center, Patagonia Museum, chocolate shops and Cerro Otto at sunset." },
          { dia: "Day 2", texto: "Circuito Chico with Cerro Campanario in the morning and Colonia Suiza in the afternoon." },
          { dia: "Day 3", texto: "Boat trip to Victoria Island and the Arrayanes Forest, or to Puerto Blest and Los Cántaros Waterfall." },
          { dia: "Day 4", texto: "Cerro Catedral: skiing in winter or the Refugio Frey hike in summer." },
          { dia: "Day 5", texto: "Mount Tronador and the Black Glacier, or the Seven Lakes Route to San Martín de los Andes." },
        ],
      },
      faq: [
        {
          pregunta: "What is the best time to visit Bariloche?",
          respuesta:
            "It depends on your plans. December to March is best for hiking, boat trips and lake beaches, with highs around 20–22 °C (68–72 °F). July to September is ski season at Cerro Catedral. Autumn and spring are quieter and almost every tour still runs.",
        },
        {
          pregunta: "How many days do you need in Bariloche?",
          respuesta:
            "4 to 5 full days are enough for Circuito Chico, Cerro Campanario, Cerro Otto and Cerro Catedral, a boat trip to Victoria Island or Puerto Blest, and Mount Tronador. With a week you can add the Seven Lakes Route and El Bolsón.",
        },
        {
          pregunta: "What is the weather like in Bariloche?",
          respuesta:
            "Summers are mild, with average highs of about 22 °C (72 °F) and lows of 10 °C (50 °F) in January. Winters are cold, with highs of about 5 °C (41 °F) and lows near 0 °C (32 °F) in July. It snows on the mountains in winter and summer nights are cool, so pack warm layers in any season.",
        },
        {
          pregunta: "What is there to do in Bariloche in winter?",
          respuesta:
            "Ski or snowboard at Cerro Catedral, 19 km from town, where the season runs from July to late September, snow permitting. Circuito Chico, Cerro Campanario, Cerro Otto and the Victoria Island boat trip all operate year-round.",
        },
        {
          pregunta: "How do you get to Bariloche from Buenos Aires?",
          respuesta:
            "By plane, with direct flights to Teniente Luis Candelaria International Airport. By road it is 1,640 km by car or long-distance bus. You can also take the weekly Tren Patagónico from Viedma.",
        },
        {
          pregunta: "How do you get to Bariloche from Chile?",
          respuesta:
            "Through the Cardenal Samoré pass, open year-round: Osorno is 250 km away and Puerto Montt 390 km. Or take the Cruce Andino from Puerto Varas, about 12 hours by bus and boat across lakes Todos los Santos, Frías and Nahuel Huapi.",
        },
        {
          pregunta: "Is Bariloche worth visiting?",
          respuesta:
            "Yes. It combines a national park of over 717,000 hectares of lakes and forests with a city full of services: scenic drives, cable cars, boat trips, mountain huts, the largest ski resort in the Southern Hemisphere and Argentina's National Chocolate Capital.",
        },
      ],
    },
    fuentes: [
      { label: "Bariloche Turismo — Sobre Bariloche", url: "https://barilocheturismo.gob.ar/es/sobre-bariloche" },
      { label: "Bariloche Turismo — Cómo llegar y distancias", url: "https://barilocheturismo.gob.ar/es/como-llegar" },
      { label: "Bariloche Turismo — Circuito Chico", url: "https://barilocheturismo.gob.ar/es/circuito-chico" },
      { label: "Bariloche Turismo — Cerro Campanario", url: "https://barilocheturismo.gob.ar/es/actividades-cerro-campanario" },
      { label: "Bariloche Turismo — Cerro Otto", url: "https://barilocheturismo.gob.ar/es/actividades-cerro-otto" },
      { label: "Bariloche Turismo — Cerro Catedral", url: "https://barilocheturismo.gob.ar/es/actividades-cerro-catedral" },
      { label: "Bariloche Turismo — Cerros", url: "https://barilocheturismo.gob.ar/es/actividades-cerros" },
      { label: "Bariloche Turismo — Colonia Suiza", url: "https://barilocheturismo.gob.ar/es/colonia-suiza" },
      { label: "Bariloche Turismo — Siete Lagos", url: "https://barilocheturismo.gob.ar/es/siete-lagos" },
      { label: "Bariloche Turismo — El Bolsón", url: "https://barilocheturismo.gob.ar/es/el-bolson" },
      { label: "Bariloche Turismo — Puerto Blest y Cascada Los Cántaros", url: "https://barilocheturismo.gob.ar/es/puerto-blest-y-cascada-de-los-cantaros" },
      { label: "Bariloche Turismo — Gastronomía", url: "https://barilocheturismo.gob.ar/es/gastronomia" },
      { label: "Bariloche Turismo — Preguntas frecuentes", url: "https://barilocheturismo.gob.ar/es/preguntas-frecuentes" },
      { label: "Municipalidad de Bariloche — Historia", url: "https://www.bariloche.gov.ar/descubri-bariloche/historia/" },
      { label: "Censo 2022, indicadores demográficos (INDEC)", url: "https://www.indec.gob.ar/ftp/cuadros/poblacion/censo2022_indicadores_demograficos.pdf" },
      { label: "Parque Nacional Nahuel Huapi (APN)", url: "https://www.argentina.gob.ar/parquesnacionales/nahuelhuapi" },
      { label: "Ficha del área protegida — PN Nahuel Huapi (APN)", url: "https://www.argentina.gob.ar/parquesnacionales/regionpatagonia/parque-nacional-nahuel-huapi/ficha-del-area-protegida" },
      { label: "Paseos lacustres — PN Nahuel Huapi", url: "https://nahuelhuapi.gov.ar/paseos-lacustres/" },
      { label: "Circuitos en auto (Tronador) — PN Nahuel Huapi", url: "https://nahuelhuapi.gov.ar/circuitos-en-auto-2/" },
      { label: "Estado del circuito a Tronador — PN Nahuel Huapi", url: "https://nahuelhuapi.gov.ar/2026/10/02/estado-de-los-circuitos-a-tronador-y-cascada-los-alerces/" },
      { label: "Museo de la Patagonia — PN Nahuel Huapi", url: "https://nahuelhuapi.gov.ar/museo-de-la-patagonia/" },
      { label: "Centro Cívico — Ministerio de Cultura", url: "https://www.argentina.gob.ar/capital-humano/cultura/monumentos/centro-civico-e-intendencia-de-parques-nacionales" },
      { label: "Ley 27.089 — Capital Nacional del Chocolate", url: "https://www.argentina.gob.ar/normativa/nacional/ley-27089-241809/texto" },
      { label: "Fiesta Nacional del Chocolate — Gobierno de Río Negro", url: "https://rionegro.gov.ar/articulo/53485/se-viene-la-fiesta-nacional-del-chocolate-en-bariloche" },
      { label: "Cerro Campanario — Aerosilla", url: "http://cerrocampanario.com.ar/la-aerosilla/" },
      { label: "Teleférico Cerro Otto", url: "https://www.telefericobariloche.com.ar/" },
      { label: "Cerro Catedral — Preguntas frecuentes", url: "https://catedralaltapatagonia.com/preguntas-frecuentes/" },
      { label: "Refugio Emilio Frey — Club Andino Bariloche", url: "https://www.clubandino.org/refugios-y-campings/refugio-emilio-frey/" },
      { label: "Ruta de los Lagos del Sur — Turismo Neuquén (2026)", url: "https://turismo.neuquen.gob.ar/wp-content/uploads/2026/06/Folleto_Ruta_Lagos_del_Sur_2026-1.pdf" },
      { label: "Vuelos directos a Bariloche — Aerolíneas Argentinas", url: "https://www.aerolineas.com.ar/destinos/argentina/vuelos-directos-a-bariloche" },
      { label: "Tren Patagónico", url: "https://trenpatagonicosa.com.ar/" },
      { label: "Tren Patagónico — Gobierno de Río Negro", url: "https://rionegro.gov.ar/articulo/60633/tren-patagonico-habilito-la-venta-de-pasajes-para-septiembre" },
      { label: "Paso Cardenal Samoré — Pasos Fronterizos de Chile", url: "https://www.pasosfronterizos.gov.cl/complejos-fronterizos/loslagos/paso-cardenal-samore/" },
      { label: "Cruce Andino — Datos básicos", url: "https://www.cruceandino.com/cruce/ES/datos_CA/datos-basicos-cruce-andino" },
    ],
    relacionados: [
      { tipo: "parque", slug: "nahuel-huapi" },
      { tipo: "sendero", slug: "cerro-tronador" },
      { tipo: "escalada", slug: "cerro-catedral" },
      { tipo: "fauna", slug: "condor-andino" },
      { tipo: "fauna", slug: "huemul" },
      { tipo: "gastronomia", slug: "llao-llao-patagonia" },
      { tipo: "gastronomia", slug: "mermelada-rosa-mosqueta-patagonica" },
      { tipo: "destino", slug: "puerto-varas" },
    ],
  },
  {
    slug: "puerto-natales",
    nombre: "Puerto Natales",
    pais: "CL",
    lat: -51.7236,
    lng: -72.4875,
    wikipediaTitle: "Puerto Natales",
    es: {
      metaTitle: "Puerto Natales y Torres del Paine: Qué Hacer y Clima",
      metaDescription:
        "Guía de Puerto Natales y Torres del Paine, Chile: qué hacer, clima mes a mes, cuándo ir, cómo llegar y cuántos días quedarse. Base Torres, Glaciar Grey y el W.",
      subtitulo: "Magallanes, Chile · Puerta de entrada a Torres del Paine",
      intro: [
        "Puerto Natales es la capital de la provincia de Última Esperanza, en la Región de Magallanes, en la Patagonia chilena. Está a orillas del Seno Última Esperanza, a 250 km de Punta Arenas por la Ruta 9, y es la ciudad base para visitar el Parque Nacional Torres del Paine, a unas 2 horas en bus. Se fundó en 1911 y la comuna de Natales tiene 24.152 habitantes (Censo 2024).",
        "Torres del Paine es un parque nacional de 227.298 hectáreas, creado en 1959 y declarado Reserva de la Biósfera por la UNESCO en 1978. Su macizo llega a unos 3.050 m y en él viven más de 274 especies de plantas, 126 de aves y 25 de mamíferos. Ahí están la Base de las Torres, el Valle del Francés, el Glaciar Grey y los circuitos de trekking W y O.",
        "Desde Natales también se visitan la Cueva del Milodón, donde se hallaron restos de un perezoso gigante extinguido, el ex Frigorífico Bories y, en barco, el Glaciar Serrano. La temporada va de octubre a abril: en enero las máximas rondan los 14 °C y hay unas 16 horas de luz; en invierno los senderos se cubren de nieve y varios tramos exigen guía.",
      ],
      datos: [
        { label: "Región", valor: "Magallanes y de la Antártica Chilena" },
        { label: "Población", valor: "24.152 habitantes en la comuna de Natales (Censo 2024)" },
        { label: "Fundación", valor: "1911" },
        { label: "Aeropuerto", valor: "Aeródromo Teniente Julio Gallardo (PNT) · Punta Arenas (PUQ) a 250 km" },
        { label: "Parque Nacional Torres del Paine", valor: "227.298 ha · creado en 1959" },
        { label: "Días recomendados", valor: "4 a 5" },
        { label: "Mejor época", valor: "Oct–abr (temporada de trekking)" },
      ],
      queHacer: [
        {
          nombre: "Mirador Base de las Torres",
          texto:
            "El trekking más famoso del parque. Sale del sector hotelero, al que se llega en transfer desde la portería Laguna Amarga, remonta el Valle Ascencio por bosques de lenga y termina con una subida empinada sobre una morrena de roca hasta la laguna al pie de las tres torres. Ida y vuelta lleva de 8 a 10 horas: el último tramo, de 1,4 km desde la Guardería Torres, toma alrededor de una hora y es exigente. En invierno es obligatorio ir con guía certificado.",
          gygQuery: "Base Torres trek Torres del Paine",
        },
        {
          nombre: "Circuito W",
          texto:
            "Un trekking lineal de unos 70 km en 5 días que une los tres valles del parque: la Base de las Torres, el Valle del Francés y el Glaciar Grey, pasando por el lago Nordenskjöld y los Cuernos del Paine. Se duerme en refugios o campamentos, y la reserva de todas las noches es obligatoria antes de entrar al parque: conviene hacerla con 6 meses o más de anticipación. Al terminar se cruza el lago Pehoé en catamarán hasta Pudeto para volver a Natales.",
          gygQuery: "Torres del Paine W trek",
        },
        {
          nombre: "Valle del Francés y Mirador Británico",
          texto:
            "El tramo central del W. Desde el Campamento Italiano se sube por el valle hasta el Mirador Francés o se sigue hasta el Mirador Británico: 5,4 km y unas 3 horas de ida, de dificultad exigente, en un anfiteatro rodeado de glaciares colgantes y paredes de granito.",
        },
        {
          nombre: "Glaciar Grey",
          texto:
            "Nace en el Campo de Hielo Sur y avanza 28 km hasta el lago Grey, donde se desprenden témpanos azules desde paredes de unos 30 m. La forma más popular de verlo es la navegación de 3 horas que sale del Hotel Lago Grey, a unos 100 km de Natales; también hay caminatas guiadas sobre el hielo. A pie, desde Paine Grande hasta la Guardería Grey son 11 km y unas 3 horas y media.",
          gygQuery: "Grey Glacier boat Torres del Paine",
        },
        {
          nombre: "Torres del Paine en un día desde Natales",
          texto:
            "Si no vas a hacer trekking largo, el parque se recorre en el día con un tour o en auto: el lago Pehoé, el Salto Grande, el sector Pudeto y el lago Grey son las paradas clásicas. Cuatro empresas de buses salen de Natales a las 7:30 y a las 14:30 hacia Laguna Amarga, Pudeto y la Administración. No hay estaciones de servicio dentro ni cerca del parque, así que hay que cargar combustible en Natales.",
          gygQuery: "Torres del Paine full day tour from Puerto Natales",
        },
        {
          nombre: "Monumento Natural Cueva del Milodón",
          texto:
            "A unos 25 km al norte de Natales (17 km por la Ruta 9 Norte y 8 km por la Y-290). Desde 1896 se hallaron en la cueva restos de piel, huesos y excrementos del milodón (Mylodon darwini), un perezoso gigante extinguido. Tiene 189 ha y tres senderos fáciles: Cueva Grande (350 m, 30 minutos, accesible en silla de ruedas hasta el mirador), Mirador (650 m, 45 minutos) y Cuevas y Aleros (4,3 km, 3 a 4 horas).",
          gygQuery: "Milodon Cave Puerto Natales",
        },
        {
          nombre: "Navegación al Glaciar Serrano",
          texto:
            "El sector Magallanes del Parque Nacional Bernardo O'Higgins, de más de 3,5 millones de hectáreas, solo tiene acceso por mar. Desde Natales salen excursiones en barco por el Seno Última Esperanza hasta el Glaciar Serrano, donde un sendero corto de unos 90 minutos llega al frente del glaciar.",
          gygQuery: "Serrano Glacier boat Puerto Natales",
        },
        {
          nombre: "Costanera, Cerro Dorotea y ex Frigorífico Bories",
          texto:
            "La costanera Pedro Montt mira al Seno Última Esperanza y a los Andes patagónicos, y el Cerro Dorotea es el mirador de la ciudad. A 5 km al norte está el ex Frigorífico Bories, construido entre 1906 y 1914, que procesó la producción ovina de la zona hasta mediados de los años 80. Es Monumento Histórico desde 1996 y hoy funciona como museo y hotel. Para comer, la especialidad local es el cordero y la centolla.",
        },
      ],
      cuandoIr: {
        resumen:
          "La temporada de Torres del Paine va de octubre a abril, cuando abren todos los senderos y la portería atiende de 7 a 21 h. De mayo a septiembre hay riesgo de nieve en casi todos los senderos, los tramos del W se hacen con guía y el circuito O cierra.",
        temporadas: [
          {
            nombre: "Verano",
            meses: "Diciembre a febrero",
            texto:
              "Máximas de unos 14 a 15 °C, mínimas de 6 a 7 °C y entre 14 y 16,5 horas de luz. Es temporada alta: refugios, campamentos y navegaciones se agotan, así que hay que reservar con meses de anticipación. El viento es fuerte y constante.",
          },
          {
            nombre: "Otoño",
            meses: "Marzo a mayo",
            texto:
              "Las lengas se ponen rojas y hay menos gente. Las máximas bajan de unos 13 °C en marzo a 6 °C en mayo. Desde mayo empieza el horario de invierno del parque y el riesgo de nieve en los senderos.",
          },
          {
            nombre: "Invierno",
            meses: "Junio a agosto",
            texto:
              "Máximas de 2 a 5 °C, mínimas bajo cero y unas 8 horas de luz. El parque abre de 8 a 18:30 h, los tramos del W y la Base de las Torres se hacen con guía y equipo de invierno, y los senderos del sector Dickson cierran. Para manejar se exigen neumáticos con clavos.",
          },
          {
            nombre: "Primavera",
            meses: "Septiembre a noviembre",
            texto:
              "Los días se alargan rápido, de unas 12 horas de luz en septiembre a casi 16 en noviembre, y las máximas suben de 7 a 12 °C. En octubre arranca la temporada de trekking y el horario de verano del parque.",
          },
        ],
      },
      comoLlegar: [
        {
          modo: "En avión",
          texto:
            "El Aeródromo Teniente Julio Gallardo (PNT), a 15 minutos del centro de Natales, recibe vuelos directos de temporada desde Santiago. El resto del año conviene volar a Punta Arenas (PUQ), que tiene más frecuencias, y seguir por tierra.",
        },
        {
          modo: "Desde Punta Arenas",
          texto:
            "Son 250 km por la Ruta 9, pavimentada, unas 3 horas en bus interurbano o en auto de alquiler. De Natales al parque hay unas 2 horas en bus hasta las porterías Laguna Amarga, Sarmiento o Serrano.",
        },
        {
          modo: "Desde Argentina",
          texto:
            "Desde El Calafate hay buses de unas 5 horas que cruzan por el paso Río Don Guillermo, en Cerro Castillo. El paso Dorotea, muy cerca de Natales, también está habilitado para todo tipo de vehículos. Revisá los horarios de los pasos antes de viajar.",
        },
        {
          modo: "Por mar",
          texto:
            "Desde Puerto Montt hay un ferry que navega la Ruta de los Canales hasta Natales, entre fiordos y canales de la Patagonia occidental.",
        },
      ],
      cuantosDias: {
        resumen:
          "Con 4 o 5 días ves lo principal de Natales y Torres del Paine haciendo excursiones de un día. Si querés hacer el circuito W, sumá 5 días de trekking; el circuito O lleva unos 9.",
        itinerario: [
          { dia: "Día 1", texto: "Llegada a Natales, costanera Pedro Montt y ex Frigorífico Bories al atardecer." },
          { dia: "Día 2", texto: "Torres del Paine en el día: lago Pehoé, Salto Grande, Pudeto y lago Grey." },
          { dia: "Día 3", texto: "Trekking a la Base de las Torres desde el sector hotelero (de 8 a 10 horas)." },
          { dia: "Día 4", texto: "Navegación al Glaciar Grey o, desde Natales, al Glaciar Serrano." },
          { dia: "Día 5", texto: "Cueva del Milodón a la mañana y Cerro Dorotea a la tarde." },
        ],
      },
      faq: [
        {
          pregunta: "¿Cuál es la mejor época para ir a Torres del Paine?",
          respuesta:
            "De octubre a abril, la temporada de trekking: abren todos los senderos y los días son largos, con hasta 16 horas de luz en diciembre y enero. De mayo a septiembre hay riesgo de nieve, los tramos del W se hacen con guía y el circuito O cierra.",
        },
        {
          pregunta: "¿Cuántos días hacen falta para Puerto Natales y Torres del Paine?",
          respuesta:
            "Entre 4 y 5 días alcanzan para recorrer el parque en el día, hacer la Base de las Torres, navegar al Glaciar Grey o al Serrano y visitar la Cueva del Milodón. El circuito W lleva 5 días de trekking y el O, unos 9.",
        },
        {
          pregunta: "¿Cómo llegar a Torres del Paine desde Punta Arenas?",
          respuesta:
            "Primero hasta Puerto Natales: 250 km por la Ruta 9, unas 3 horas en bus o auto. Desde Natales salen buses a las 7:30 y a las 14:30 hacia las porterías del parque, a unas 2 horas.",
        },
        {
          pregunta: "¿Cómo ir de El Calafate a Puerto Natales?",
          respuesta:
            "En bus, en unas 5 horas, cruzando la frontera por el paso Río Don Guillermo, en Cerro Castillo. También se puede ir en auto; el paso Dorotea, cerca de Natales, está habilitado para todo tipo de vehículos.",
        },
        {
          pregunta: "¿Cómo se compra la entrada a Torres del Paine?",
          respuesta:
            "Por adelantado y online en Pases Parques (pasesparques.cl), el portal oficial de venta de CONAF. Si vas a dormir en refugios o campamentos, además necesitás la reserva confirmada de cada noche antes de entrar a los senderos.",
        },
        {
          pregunta: "¿Se puede visitar Torres del Paine en un día?",
          respuesta:
            "Sí. Desde Puerto Natales hay tours y buses de ida y vuelta en el día, y en auto se recorren el lago Pehoé, el Salto Grande, Pudeto y el lago Grey. La Base de las Torres también se hace en un día, pero es una caminata exigente de 8 a 10 horas.",
        },
        {
          pregunta: "¿Cómo es el clima en Puerto Natales?",
          respuesta:
            "Fresco todo el año y con mucho viento. En enero las máximas rondan los 14 °C y las mínimas los 7 °C; en julio, las máximas son de unos 2 °C y las mínimas bajo cero. Conviene llevar ropa en capas y una campera impermeable aun en verano.",
        },
      ],
    },
    en: {
      metaTitle: "Puerto Natales & Torres del Paine Travel Guide",
      metaDescription:
        "Puerto Natales and Torres del Paine, Chile: things to do, weather by month, best time to visit, how to get there and how long to stay. Base Torres, Grey & the W.",
      subtitulo: "Magallanes, Chile · Gateway to Torres del Paine",
      intro: [
        "Puerto Natales is the capital of Última Esperanza province, in Chile's Magallanes Region, in Chilean Patagonia. It sits on the Última Esperanza Sound, 250 km from Punta Arenas on Route 9, and is the base town for Torres del Paine National Park, about 2 hours away by bus. It was founded in 1911, and the Natales municipality has 24,152 residents (2024 census).",
        "Torres del Paine is a 227,298-hectare national park, created in 1959 and named a UNESCO Biosphere Reserve in 1978. Its massif rises to about 3,050 m and is home to more than 274 plant species, 126 bird species and 25 mammal species. It holds the Base of the Towers, the French Valley, Grey Glacier and the W and O treks.",
        "From Natales you can also visit the Milodon Cave, where remains of an extinct giant ground sloth were found, the former Bories meatpacking plant and, by boat, Serrano Glacier. The season runs from October to April: in January highs are around 14 °C (57 °F) with about 16 hours of daylight; in winter the trails are snowy and several sections require a guide.",
      ],
      datos: [
        { label: "Region", valor: "Magallanes y de la Antártica Chilena, Chile" },
        { label: "Population", valor: "24,152 in the Natales municipality (2024 census)" },
        { label: "Founded", valor: "1911" },
        { label: "Airport", valor: "Teniente Julio Gallardo Aerodrome (PNT) · Punta Arenas (PUQ), 250 km away" },
        { label: "Torres del Paine National Park", valor: "227,298 ha · created in 1959" },
        { label: "Recommended stay", valor: "4 to 5 days" },
        { label: "Best time", valor: "Oct–Apr (hiking season)" },
      ],
      queHacer: [
        {
          nombre: "Base of the Towers viewpoint",
          texto:
            "The park's most famous hike. It starts at the hotel sector, reached by shuttle from the Laguna Amarga entrance, climbs the Ascencio Valley through lenga forest and ends with a steep scramble up a rocky moraine to the lagoon at the foot of the three towers. The round trip takes 8 to 10 hours; the last 1.4 km from Guardería Torres takes about an hour and is demanding. In winter a certified guide is mandatory.",
          gygQuery: "Base Torres trek Torres del Paine",
        },
        {
          nombre: "The W Trek",
          texto:
            "A linear trek of about 70 km over 5 days linking the park's three valleys: the Base of the Towers, the French Valley and Grey Glacier, past Lake Nordenskjöld and the Cuernos del Paine. You sleep in refugios or campsites, and bookings for every night are mandatory before you enter the park; book 6 months or more ahead. At the end, a catamaran crosses Lake Pehoé to Pudeto for the bus back to Natales.",
          gygQuery: "Torres del Paine W trek",
        },
        {
          nombre: "French Valley and the Británico viewpoint",
          texto:
            "The middle section of the W. From Campamento Italiano you climb the valley to the Francés viewpoint or carry on to the Británico viewpoint: 5.4 km and about 3 hours one way, rated demanding, in an amphitheater of hanging glaciers and granite walls.",
        },
        {
          nombre: "Grey Glacier",
          texto:
            "It flows 28 km from the Southern Patagonian Ice Field to Lake Grey, calving blue icebergs from walls about 30 m high. The most popular way to see it is the 3-hour boat trip from Hotel Lago Grey, about 100 km from Natales; guided ice hikes are also available. On foot, Paine Grande to Guardería Grey is 11 km and about 3.5 hours.",
          gygQuery: "Grey Glacier boat Torres del Paine",
        },
        {
          nombre: "Torres del Paine as a day trip from Natales",
          texto:
            "If you are not doing a long trek, you can see the park in a day on a tour or by car: Lake Pehoé, Salto Grande waterfall, the Pudeto sector and Lake Grey are the classic stops. Four bus companies leave Natales at 7:30 am and 2:30 pm for Laguna Amarga, Pudeto and the park headquarters. There are no gas stations in or near the park, so fill up in Natales.",
          gygQuery: "Torres del Paine full day tour from Puerto Natales",
        },
        {
          nombre: "Milodon Cave Natural Monument",
          texto:
            "About 25 km north of Natales (17 km on Route 9 North, then 8 km on Route Y-290). From 1896 on, skin, bones and dung of the mylodon (Mylodon darwini), an extinct giant ground sloth, were found in the cave. The 189-hectare monument has three easy trails: Cueva Grande (350 m, 30 minutes, wheelchair accessible to the viewpoint), Mirador (650 m, 45 minutes) and Cuevas y Aleros (4.3 km, 3 to 4 hours).",
          gygQuery: "Milodon Cave Puerto Natales",
        },
        {
          nombre: "Boat trip to Serrano Glacier",
          texto:
            "The Magallanes side of Bernardo O'Higgins National Park, which covers over 3.5 million hectares, can only be reached by sea. Boat tours leave Natales along the Última Esperanza Sound to Serrano Glacier, where a short trail of about 90 minutes leads to the glacier front.",
          gygQuery: "Serrano Glacier boat Puerto Natales",
        },
        {
          nombre: "Waterfront, Cerro Dorotea and the former Bories plant",
          texto:
            "The Pedro Montt waterfront faces the Última Esperanza Sound and the Patagonian Andes, and Cerro Dorotea is the town's lookout hill. 5 km north is the former Bories meatpacking plant, built between 1906 and 1914, which processed the area's sheep until the mid-1980s. It has been a Historic Monument since 1996 and now houses a museum and a hotel. The local specialties are lamb and king crab.",
        },
      ],
      cuandoIr: {
        resumen:
          "Torres del Paine's season runs from October to April, when every trail is open and the entrance gates operate from 7 am to 9 pm. From May to September most trails can be snowy, W sections must be hiked with a guide and the O Circuit closes.",
        temporadas: [
          {
            nombre: "Summer",
            meses: "December to February",
            texto:
              "Highs of about 14–15 °C (57–59 °F), lows of 6–7 °C (43–45 °F) and 14 to 16.5 hours of daylight. Peak season: refugios, campsites and boat trips sell out, so book months ahead. Expect strong, constant wind.",
          },
          {
            nombre: "Autumn",
            meses: "March to May",
            texto:
              "The lenga forests turn red and crowds thin out. Highs drop from about 13 °C (55 °F) in March to 6 °C (43 °F) in May. Winter park hours and snow risk on the trails start in May.",
          },
          {
            nombre: "Winter",
            meses: "June to August",
            texto:
              "Highs of 2–5 °C (36–41 °F), lows below freezing and about 8 hours of daylight. The park opens 8 am to 6:30 pm, W sections and the Base of the Towers require a guide and winter gear, and the Dickson-area trails close. Studded tires are required for driving.",
          },
          {
            nombre: "Spring",
            meses: "September to November",
            texto:
              "Days lengthen fast, from about 12 hours of daylight in September to almost 16 in November, and highs rise from 7 to 12 °C (45 to 54 °F). The hiking season and summer park hours start in October.",
          },
        ],
      },
      comoLlegar: [
        {
          modo: "By plane",
          texto:
            "Teniente Julio Gallardo Aerodrome (PNT), 15 minutes from downtown Natales, has seasonal direct flights from Santiago. The rest of the year, fly into Punta Arenas (PUQ), which has more flights, and continue overland.",
        },
        {
          modo: "From Punta Arenas",
          texto:
            "It is 250 km on paved Route 9, about 3 hours by long-distance bus or rental car. From Natales, buses take about 2 hours to the Laguna Amarga, Sarmiento or Serrano park entrances.",
        },
        {
          modo: "From Argentina",
          texto:
            "Buses from El Calafate take about 5 hours and cross the border at the Río Don Guillermo pass in Cerro Castillo. The Dorotea pass, close to Natales, is also open to all vehicles. Check border crossing hours before you travel.",
        },
        {
          modo: "By sea",
          texto:
            "A ferry from Puerto Montt sails the Route of the Channels to Natales, through the fjords and channels of western Patagonia.",
        },
      ],
      cuantosDias: {
        resumen:
          "4 or 5 days cover the highlights of Natales and Torres del Paine with day trips. Add 5 days of hiking for the W Trek; the O Circuit takes about 9.",
        itinerario: [
          { dia: "Day 1", texto: "Arrive in Natales, walk the Pedro Montt waterfront and visit the former Bories plant at sunset." },
          { dia: "Day 2", texto: "Torres del Paine day trip: Lake Pehoé, Salto Grande, Pudeto and Lake Grey." },
          { dia: "Day 3", texto: "Hike to the Base of the Towers from the hotel sector (8 to 10 hours)." },
          { dia: "Day 4", texto: "Boat trip to Grey Glacier or, from Natales, to Serrano Glacier." },
          { dia: "Day 5", texto: "Milodon Cave in the morning and Cerro Dorotea in the afternoon." },
        ],
      },
      faq: [
        {
          pregunta: "What is the best time to visit Torres del Paine?",
          respuesta:
            "October to April, the hiking season: every trail is open and days are long, with up to 16 hours of daylight in December and January. From May to September there is snow risk, W sections require a guide and the O Circuit closes.",
        },
        {
          pregunta: "How many days do you need in Puerto Natales and Torres del Paine?",
          respuesta:
            "4 to 5 days are enough for a park day trip, the Base of the Towers hike, a boat trip to Grey or Serrano Glacier and the Milodon Cave. The W Trek takes 5 days of hiking and the O Circuit about 9.",
        },
        {
          pregunta: "How do you get to Torres del Paine from Punta Arenas?",
          respuesta:
            "First to Puerto Natales: 250 km on Route 9, about 3 hours by bus or car. From Natales, buses leave at 7:30 am and 2:30 pm for the park entrances, about 2 hours away.",
        },
        {
          pregunta: "How do you get from El Calafate to Puerto Natales?",
          respuesta:
            "By bus, in about 5 hours, crossing the border at the Río Don Guillermo pass in Cerro Castillo. You can also drive; the Dorotea pass, near Natales, is open to all vehicles.",
        },
        {
          pregunta: "How do you buy Torres del Paine tickets?",
          respuesta:
            "In advance and online at Pases Parques (pasesparques.cl), CONAF's official ticketing site. If you are staying in refugios or campsites, you also need a confirmed booking for every night before you start the trails.",
        },
        {
          pregunta: "Can you visit Torres del Paine in one day?",
          respuesta:
            "Yes. Tours and round-trip buses run from Puerto Natales in a day, and by car you can see Lake Pehoé, Salto Grande, Pudeto and Lake Grey. The Base of the Towers can also be done in a day, but it is a demanding 8 to 10 hour hike.",
        },
        {
          pregunta: "Is Torres del Paine worth visiting?",
          respuesta:
            "Yes. It is a 227,298-hectare UNESCO Biosphere Reserve with granite towers, glaciers calving into lakes and some of the best-known treks in South America, and Puerto Natales adds the Milodon Cave and boat trips to Serrano Glacier.",
        },
      ],
    },
    fuentes: [
      { label: "Parque Nacional Torres del Paine (CONAF)", url: "https://www.conaf.cl/parques/parque-nacional-torres-del-paine/" },
      { label: "Pases Parques — Torres del Paine (portal oficial de CONAF)", url: "https://www.pasesparques.cl/es/puerto-natales-298/parque-nacional-torres-del-paine-3412" },
      { label: "Monumento Natural Cueva del Milodón (CONAF)", url: "https://www.conaf.cl/parques/monumento-natural-cueva-del-milodon/" },
      { label: "Parque Nacional Bernardo O'Higgins (CONAF)", url: "https://www.conaf.cl/parques/parque-nacional-bernardo-ohiggins/" },
      { label: "Chile Travel (Sernatur) — Torres del Paine", url: "https://chile.travel/destinos/torres-del-paine/" },
      { label: "Chile Travel (Sernatur) — Puerto Natales", url: "https://chile.travel/destinos/puerto-natales/" },
      { label: "Chile Travel (Sernatur) — Circuito W", url: "https://chile.travel/itinerarios/circuito-w-de-torres-del-paine-la-guia-definitiva/" },
      { label: "Chile Travel (Sernatur) — Base Torres", url: "https://chile.travel/atractivos/base-torres/" },
      { label: "Chile Travel (Sernatur) — Glaciar Grey", url: "https://chile.travel/atractivos/glaciar-grey/" },
      { label: "Consejo de Monumentos Nacionales — Ex Frigorífico Bories", url: "https://www.monumentos.gob.cl/monumentos/monumentos-historicos/conjunto-de-edificaciones-del-ex-frigorifico-bories" },
      { label: "Memoria Chilena — Última Esperanza", url: "https://www.memoriachilena.gob.cl/602/w3-article-93348.html" },
      { label: "BCN — Reporte comunal de Natales (Censo 2024, INE)", url: "https://www.bcn.cl/siit/reportescomunales/comunas_v.html?anno=2025&idcom=12401" },
      { label: "Pasos Fronterizos de Chile — Paso Río Don Guillermo", url: "https://www.pasosfronterizos.gov.cl/complejos-fronterizos/magallanes/paso-rio-don-guillermo/" },
      { label: "Pasos Fronterizos de Chile — Paso Dorotea", url: "https://www.pasosfronterizos.gov.cl/complejos-fronterizos/magallanes/paso-dorotea/" },
      { label: "Bus Sur — Puerto Natales a El Calafate", url: "https://bussur.com/wp-content/uploads/2024/05/TDP-CAL.pdf" },
    ],
    relacionados: [
      { tipo: "parque", slug: "torres-del-paine" },
      { tipo: "parque", slug: "bernardo-ohiggins" },
      { tipo: "sendero", slug: "circuito-w" },
      { tipo: "arqueologia", slug: "cueva-del-milodon" },
      { tipo: "escalada", slug: "torres-del-paine" },
      { tipo: "destino", slug: "el-calafate" },
      { tipo: "fauna", slug: "puma" },
      { tipo: "fauna", slug: "guanaco" },
      { tipo: "gastronomia", slug: "cordero-patagonico" },
      { tipo: "gastronomia", slug: "centolla-patagonica" },
      { tipo: "destino", slug: "punta-arenas" },
    ],
  },
  {
    slug: "el-chalten",
    nombre: "El Chaltén",
    pais: "AR",
    lat: -49.3315,
    lng: -72.8863,
    wikipediaTitle: "El Chaltén",
    es: {
      metaTitle: "El Chaltén: Qué Hacer, Trekking, Clima y Cómo Llegar",
      metaDescription:
        "Guía de El Chaltén, Santa Cruz: qué hacer, trekking a Laguna de los Tres y Laguna Torre, clima mes a mes, cuándo ir, cómo llegar desde El Calafate y cuántos días.",
      subtitulo: "Santa Cruz, Argentina · Capital Nacional del Trekking",
      intro: [
        "El Chaltén es un pueblo de la provincia de Santa Cruz, en la Patagonia argentina, ubicado dentro del Parque Nacional Los Glaciares, en la confluencia de los ríos Fitz Roy y de las Vueltas, a unos 400 m sobre el nivel del mar. Se fundó el 12 de octubre de 1985 y es el pueblo más joven de la Argentina. Queda a 220 km de El Calafate, todos asfaltados.",
        "Es la Capital Nacional del Trekking por la Ley 27.055. Desde el mismo pueblo salen a pie los senderos de la Zona Norte del parque: a la Laguna de los Tres, al pie del Cerro Fitz Roy (3.405 m), y a la Laguna Torre, frente al Cerro Torre (3.102 m), dos de las montañas de granito más famosas del mundo entre escaladores.",
        "La mejor época para ir es de octubre a marzo. En invierno el pueblo tiene menos servicios abiertos, los senderos tienen nieve y barro y, de mayo a septiembre, hay que registrarse en el Centro de Visitantes del parque antes de salir a caminar.",
      ],
      datos: [
        { label: "Provincia", valor: "Santa Cruz" },
        { label: "Fundación", valor: "12 de octubre de 1985" },
        { label: "Altitud", valor: "≈ 400 m s. n. m." },
        { label: "Distancia a El Calafate", valor: "220 km de ruta asfaltada" },
        { label: "Aeropuerto más cercano", valor: "El Calafate (FTE), a 200 km" },
        { label: "Cerro Fitz Roy", valor: "3.405 m" },
        { label: "Días recomendados", valor: "3 a 7" },
        { label: "Mejor época", valor: "Octubre a marzo" },
      ],
      queHacer: [
        {
          nombre: "Trekking a la Laguna de los Tres (Fitz Roy)",
          texto:
            "El sendero más buscado de la zona. Son 25 km en total, entre 8 y 9 horas, con dificultad media-alta, y termina en la laguna glaciar al pie del Cerro Fitz Roy. Arranca al final de la avenida San Martín. Si tenés poco tiempo, la Laguna Capri, sobre el mismo sendero, son 8 km ida y vuelta con vista al Fitz Roy.",
          gygQuery: "Laguna de los Tres Fitz Roy trek",
        },
        {
          nombre: "Trekking a la Laguna Torre (Cerro Torre)",
          texto:
            "Unos 18 km ida y vuelta por el valle del río Fitz Roy hasta el mirador de la Laguna Torre, frente al Cerro Torre y su glaciar. Se calculan entre 3 y 4 horas por tramo y es de dificultad baja. Una opción corta es ir y volver hasta el mirador del Cerro Torre, unos 5 km en total.",
          gygQuery: "Laguna Torre El Chalten",
        },
        {
          nombre: "Miradores de los Cóndores y de las Águilas",
          texto:
            "Dos de los senderos más cortos y accesibles del parque. Salen desde el Centro de Visitantes, a la entrada del pueblo, y tienen vista al pueblo, al valle del río de las Vueltas y, con buen tiempo, al Fitz Roy. Son ideales para el día de llegada o para ver el atardecer.",
        },
        {
          nombre: "Loma del Pliegue Tumbado",
          texto:
            "Un sendero que sube a un mirador panorámico sobre los cerros de la Zona Norte del parque. Se puede hacer en el día y es una alternativa a las dos lagunas clásicas.",
        },
        {
          nombre: "Chorrillo del Salto",
          texto:
            "Una salida de medio día a una cascada a unos 6 km del pueblo, sobre el camino al Lago del Desierto. Se puede ir caminando y es el plan clásico para un día de mal tiempo en la montaña.",
        },
        {
          nombre: "Lago del Desierto y Glaciar Huemul",
          texto:
            "El Lago del Desierto es una reserva provincial a 37 km del pueblo por la Ruta Provincial 41, un camino de ripio que acompaña al río de las Vueltas. Está rodeado de bosques de lenga y ñire y del cordón Vespignani, con glaciares colgantes. Se navega en catamarán y se puede subir a ver el Glaciar Huemul desde arriba.",
          gygQuery: "Lago del Desierto",
        },
        {
          nombre: "Navegación al Glaciar Viedma",
          texto:
            "Las navegaciones salen de Puerto Bahía Túnel, sobre el Lago Viedma, cerca del pueblo, y se acercan al frente del Glaciar Viedma. Hay opciones que suman una caminata con crampones sobre el hielo.",
          gygQuery: "Viedma Glacier",
        },
        {
          nombre: "Escalada en el Fitz Roy y el Cerro Torre",
          texto:
            "La Zona Norte del parque es una meca de la escalada técnica en el mundo. La escalada y el trekking en áreas remotas exigen registrarse antes en el parque, y las expediciones al Hielo Continental Patagónico se hacen solo con prestadores y guías habilitados.",
        },
      ],
      cuandoIr: {
        resumen:
          "La mejor época es de octubre a marzo, con días largos y todos los servicios abiertos. El pueblo recibe visitantes todo el año, pero en invierno los senderos tienen nieve y barro y la mayoría de los servicios cierra.",
        temporadas: [
          {
            nombre: "Verano",
            meses: "Diciembre a febrero",
            texto:
              "Temporada alta: días largos para hacer los senderos largos en el día y toda la oferta de navegaciones y excursiones funcionando. Conviene reservar el alojamiento con anticipación.",
          },
          {
            nombre: "Otoño",
            meses: "Marzo a mayo",
            texto:
              "Baja la cantidad de visitantes. En marzo se hace la Fiesta Nacional del Trekking, que recuerda el primer intento argentino de escalar el Fitz Roy, el 18 de marzo de 1948.",
          },
          {
            nombre: "Invierno",
            meses: "Junio a agosto",
            texto:
              "Hay nieve y barro en los senderos y de mayo a septiembre es obligatorio registrarse en el Centro de Visitantes antes de caminar. Muchos alojamientos y restaurantes cierran.",
          },
          {
            nombre: "Primavera",
            meses: "Septiembre a noviembre",
            texto:
              "Se reactiva la temporada: desde octubre vuelven los buses por la Ruta 40 desde el norte y abre la mayoría de los servicios. Hay menos gente que en verano.",
          },
        ],
      },
      comoLlegar: [
        {
          modo: "En avión + bus",
          texto:
            "El aeropuerto más cercano es el de El Calafate (Comandante Armando Tola, FTE), con vuelos desde Buenos Aires, Córdoba, Bariloche, Ushuaia y Trelew. Desde ahí hay 200 km de ruta asfaltada hasta El Chaltén.",
        },
        {
          modo: "En bus desde El Calafate",
          texto:
            "Son 220 km por ruta asfaltada, en parte por la Ruta Nacional 40, con tres frecuencias diarias desde la terminal de El Calafate. También hay buses desde Río Gallegos (452 km).",
        },
        {
          modo: "Por la Ruta 40 desde el norte",
          texto:
            "Desde Tres Lagos se siguen 35 km por la Ruta 40 y después 90 km por la Ruta Provincial 41 hasta el pueblo. De octubre a abril hay buses con varias frecuencias semanales desde Bariloche, a 1.392 km.",
        },
      ],
      cuantosDias: {
        resumen:
          "Con 3 días completos se hacen los dos senderos clásicos y una salida corta. Para sumar el Lago del Desierto, el Glaciar Viedma o la Loma del Pliegue Tumbado, y tener margen si hay mal tiempo, lo ideal son 5 a 7 días.",
        itinerario: [
          { dia: "Día 1", texto: "Llegada desde El Calafate y atardecer en los Miradores de los Cóndores y de las Águilas." },
          { dia: "Día 2", texto: "Trekking a la Laguna de los Tres, con parada en la Laguna Capri." },
          { dia: "Día 3", texto: "Trekking a la Laguna Torre, frente al Cerro Torre." },
          { dia: "Día 4", texto: "Lago del Desierto y Glaciar Huemul, con parada en el Chorrillo del Salto a la vuelta." },
          { dia: "Día 5", texto: "Navegación al Glaciar Viedma o Loma del Pliegue Tumbado. Es también el día de reserva si llovió." },
        ],
      },
      faq: [
        {
          pregunta: "¿Cuál es la mejor época para ir a El Chaltén?",
          respuesta:
            "De octubre a marzo, cuando los días son largos y están abiertos todos los servicios. En invierno los senderos tienen nieve y barro y muchos servicios cierran.",
        },
        {
          pregunta: "¿Cuántos días hacen falta en El Chaltén?",
          respuesta:
            "Al menos 3 días completos para la Laguna de los Tres, la Laguna Torre y una salida corta. Lo ideal son 5 a 7 días: el clima de montaña cambia rápido y conviene tener días de reserva para ver el Fitz Roy despejado.",
        },
        {
          pregunta: "¿Hay que pagar entrada para hacer los senderos de El Chaltén?",
          respuesta:
            "Sí. El acceso a los senderos del Parque Nacional Los Glaciares desde El Chaltén se paga. La Administración de Parques Nacionales vende el pase diario y el Flexipass de 3 o 7 días en su portal online, y el segundo día tiene un 50 % de descuento si volvés dentro de las 72 horas.",
        },
        {
          pregunta: "¿Cómo llegar a El Chaltén desde El Calafate?",
          respuesta:
            "En bus o en auto, por 220 km de ruta asfaltada, en parte por la Ruta Nacional 40. Hay tres frecuencias diarias de bus. El aeropuerto de El Calafate está a 200 km de El Chaltén.",
        },
        {
          pregunta: "¿Qué trekking hacer en El Chaltén si tengo un solo día?",
          respuesta:
            "La Laguna de los Tres, si estás en buen estado físico: 25 km y entre 8 y 9 horas, con vista al Fitz Roy. Si preferís algo más corto, la Laguna Capri (8 km ida y vuelta) o la Laguna Torre, de dificultad baja.",
        },
        {
          pregunta: "¿Se puede visitar El Chaltén en invierno?",
          respuesta:
            "Sí, pero con menos servicios y senderos con nieve y barro. De mayo a septiembre es obligatorio registrarse en el Centro de Visitantes del parque antes de salir a caminar. El Centro de Visitantes atiende de 10 a 18 h en invierno y de 9 a 17 h de septiembre a abril.",
        },
        {
          pregunta: "¿A cuánto queda el Lago del Desierto de El Chaltén?",
          respuesta:
            "A 37 km por la Ruta Provincial 41, un camino de ripio que sigue el río de las Vueltas. El lago es una reserva provincial, fuera del parque nacional, y se recorre en catamarán.",
        },
      ],
    },
    en: {
      metaTitle: "El Chaltén Travel Guide: Hikes, Weather & How to Go",
      metaDescription:
        "El Chaltén, Argentina travel guide: hikes to Laguna de los Tres and Laguna Torre, weather by month, best time to visit, how to get there and how long to stay.",
      subtitulo: "Santa Cruz, Argentina · National Trekking Capital",
      intro: [
        "El Chaltén is a village in Argentina's Santa Cruz province, in Patagonia, inside Los Glaciares National Park, where the Fitz Roy and de las Vueltas rivers meet, about 400 m above sea level. It was founded on October 12, 1985, making it Argentina's youngest town. It is 220 km from El Calafate on a fully paved road.",
        "It is Argentina's National Trekking Capital under Law 27,055. The trails of the park's northern section start right from town: to Laguna de los Tres, at the foot of Mount Fitz Roy (3,405 m), and to Laguna Torre, facing Cerro Torre (3,102 m), two of the world's most famous granite peaks among climbers.",
        "The best time to go is October to March. In winter fewer services are open, the trails have snow and mud and, from May to September, hikers must register at the park's Visitor Center before heading out.",
      ],
      datos: [
        { label: "Province", valor: "Santa Cruz, Argentina" },
        { label: "Founded", valor: "October 12, 1985" },
        { label: "Altitude", valor: "≈ 400 m above sea level" },
        { label: "Distance to El Calafate", valor: "220 km, paved road" },
        { label: "Nearest airport", valor: "El Calafate (FTE), 200 km" },
        { label: "Mount Fitz Roy", valor: "3,405 m" },
        { label: "Recommended stay", valor: "3 to 7 days" },
        { label: "Best time", valor: "October to March" },
      ],
      queHacer: [
        {
          nombre: "Laguna de los Tres hike (Fitz Roy)",
          texto:
            "The area's most popular trail. It is 25 km in total, 8 to 9 hours, rated medium-high, and ends at the glacial lake at the foot of Mount Fitz Roy. It starts at the end of San Martín Avenue. If you're short on time, Laguna Capri, on the same trail, is an 8 km round trip with Fitz Roy views.",
          gygQuery: "Laguna de los Tres Fitz Roy trek",
        },
        {
          nombre: "Laguna Torre hike (Cerro Torre)",
          texto:
            "About 18 km round trip up the Fitz Roy river valley to the Laguna Torre viewpoint, facing Cerro Torre and its glacier. Allow 3 to 4 hours each way; it is rated easy. A shorter option is the round trip to the Cerro Torre viewpoint, about 5 km in total.",
          gygQuery: "Laguna Torre El Chalten",
        },
        {
          nombre: "Los Cóndores and Las Águilas viewpoints",
          texto:
            "Two of the park's shortest and most accessible trails. They start at the Visitor Center at the entrance to town and look over the village, the de las Vueltas river valley and, on clear days, Fitz Roy. Ideal for your arrival day or for sunset.",
        },
        {
          nombre: "Loma del Pliegue Tumbado",
          texto:
            "A trail that climbs to a panoramic viewpoint over the peaks of the park's northern section. It can be done in a day and is an alternative to the two classic lakes.",
        },
        {
          nombre: "Chorrillo del Salto",
          texto:
            "A half-day outing to a waterfall about 6 km from town, on the road to Lago del Desierto. You can walk there, and it's the classic plan for a day of bad weather in the mountains.",
        },
        {
          nombre: "Lago del Desierto and Huemul Glacier",
          texto:
            "Lago del Desierto is a provincial reserve 37 km from town on Provincial Route 41, a gravel road along the de las Vueltas river. It is surrounded by lenga and ñire forest and by the Vespignani range, with hanging glaciers. You can sail it by catamaran and hike up to see the Huemul Glacier from above.",
          gygQuery: "Lago del Desierto",
        },
        {
          nombre: "Boat trip to Viedma Glacier",
          texto:
            "Boat trips leave from Puerto Bahía Túnel, on Lake Viedma, near town, and approach the face of the Viedma Glacier. Some options add a hike on the ice with crampons.",
          gygQuery: "Viedma Glacier",
        },
        {
          nombre: "Climbing on Fitz Roy and Cerro Torre",
          texto:
            "The park's northern section is a world mecca for technical climbing. Climbing and trekking in remote areas require registering with the park first, and expeditions onto the Southern Patagonian Ice Field must be done with licensed operators and guides.",
        },
      ],
      cuandoIr: {
        resumen:
          "The best time is October to March, with long days and every service open. The village welcomes visitors year-round, but in winter the trails have snow and mud and most services close.",
        temporadas: [
          {
            nombre: "Summer",
            meses: "December to February",
            texto:
              "Peak season: long days to fit the long hikes into a single day, and every boat trip and tour running. Book accommodation well in advance.",
          },
          {
            nombre: "Autumn",
            meses: "March to May",
            texto:
              "Crowds thin out. In March the town holds the National Trekking Festival, which marks the first Argentine attempt to climb Fitz Roy on March 18, 1948.",
          },
          {
            nombre: "Winter",
            meses: "June to August",
            texto:
              "Trails have snow and mud, and from May to September hikers must register at the Visitor Center before setting out. Many hotels and restaurants close.",
          },
          {
            nombre: "Spring",
            meses: "September to November",
            texto:
              "The season picks up again: from October buses return along Route 40 from the north and most services reopen. Fewer crowds than in summer.",
          },
        ],
      },
      comoLlegar: [
        {
          modo: "By plane + bus",
          texto:
            "The nearest airport is El Calafate (Comandante Armando Tola, FTE), with flights from Buenos Aires, Córdoba, Bariloche, Ushuaia and Trelew. From there it's 200 km of paved road to El Chaltén.",
        },
        {
          modo: "By bus from El Calafate",
          texto:
            "It's 220 km on a paved road, partly on National Route 40, with three daily departures from El Calafate's bus terminal. There are also buses from Río Gallegos (452 km).",
        },
        {
          modo: "On Route 40 from the north",
          texto:
            "From Tres Lagos, follow Route 40 for 35 km and then Provincial Route 41 for 90 km to town. From October to April there are several weekly buses from Bariloche, 1,392 km away.",
        },
      ],
      cuantosDias: {
        resumen:
          "3 full days cover the two classic hikes and a short outing. To add Lago del Desierto, Viedma Glacier or Loma del Pliegue Tumbado, and leave room for bad weather, 5 to 7 days is ideal.",
        itinerario: [
          { dia: "Day 1", texto: "Arrive from El Calafate and catch sunset at Los Cóndores and Las Águilas viewpoints." },
          { dia: "Day 2", texto: "Hike to Laguna de los Tres, stopping at Laguna Capri." },
          { dia: "Day 3", texto: "Hike to Laguna Torre, facing Cerro Torre." },
          { dia: "Day 4", texto: "Lago del Desierto and Huemul Glacier, stopping at Chorrillo del Salto on the way back." },
          { dia: "Day 5", texto: "Viedma Glacier boat trip or Loma del Pliegue Tumbado. Also your spare day if it rained." },
        ],
      },
      faq: [
        {
          pregunta: "What is the best time to visit El Chaltén?",
          respuesta:
            "October to March, when days are long and every service is open. In winter the trails have snow and mud and many services close.",
        },
        {
          pregunta: "How many days do you need in El Chaltén?",
          respuesta:
            "At least 3 full days for Laguna de los Tres, Laguna Torre and a short outing. 5 to 7 days is ideal: mountain weather changes fast, and spare days give you a better chance of seeing Fitz Roy clear.",
        },
        {
          pregunta: "Do you have to pay to hike in El Chaltén?",
          respuesta:
            "Yes. Access to the Los Glaciares National Park trails from El Chaltén requires a paid pass. Argentina's National Parks Administration sells day passes and 3- or 7-day Flexipasses on its online portal, and the second day is 50% off if you return within 72 hours.",
        },
        {
          pregunta: "How do you get from El Calafate to El Chaltén?",
          respuesta:
            "By bus or car, on 220 km of paved road, partly on National Route 40. There are three daily buses. El Calafate's airport is 200 km from El Chaltén.",
        },
        {
          pregunta: "Which hike should I do in El Chaltén if I only have one day?",
          respuesta:
            "Laguna de los Tres, if you're fit: 25 km and 8 to 9 hours, with Fitz Roy views. For something shorter, try Laguna Capri (8 km round trip) or Laguna Torre, which is rated easy.",
        },
        {
          pregunta: "Can you visit El Chaltén in winter?",
          respuesta:
            "Yes, but with fewer services and trails covered in snow and mud. From May to September you must register at the park's Visitor Center before hiking. The Visitor Center opens 10 am to 6 pm in winter and 9 am to 5 pm from September to April.",
        },
        {
          pregunta: "How far is Lago del Desierto from El Chaltén?",
          respuesta:
            "37 km on Provincial Route 41, a gravel road that follows the de las Vueltas river. The lake is a provincial reserve outside the national park, and you can tour it by catamaran.",
        },
      ],
    },
    fuentes: [
      { label: "Hacer trekking en El Chaltén — Ministerio de Turismo", url: "https://www.argentina.gob.ar/jefatura/turismo/viaja-por-argentina/hacer-trekking-en-el-chalten" },
      { label: "Actividades — PN Los Glaciares (APN)", url: "https://www.argentina.gob.ar/interior/ambiente/parquesnacionales/patagonia-austral/parque-nacional-los-glaciares/actividades" },
      { label: "Horarios y cómo llegar — PN Los Glaciares (APN)", url: "https://www.argentina.gob.ar/parquesnacionales/patagonia-austral/parque-nacional-los-glaciares/horarios-como-llegar-0" },
      { label: "Folleto de senderos Zona Norte — PN Los Glaciares (APN)", url: "https://www.argentina.gob.ar/sites/default/files/2019/06/folleto_senderos_zona_norte_pnlg_espanol.pdf" },
      { label: "Derechos de acceso a Parques Nacionales (APN)", url: "https://www.argentina.gob.ar/parquesnacionales/tarifas" },
      { label: "Fiesta Nacional del Trekking — Presidencia de la Nación", url: "https://www.argentina.gob.ar/node/141390" },
      { label: "El Chaltén — Argentina.travel (INPROTUR)", url: "https://www.argentina.travel/actividades/el-chalten" },
      { label: "Lago del Desierto — Argentina.travel (INPROTUR)", url: "https://www.argentina.travel/actividades/lago-del-desierto" },
      { label: "Secretaría de Turismo de El Chaltén — Qué hacer", url: "https://elchalten.tur.ar/circuito-chico-y-circuito-grande/" },
      { label: "Secretaría de Turismo de El Chaltén — Ómnibus", url: "https://elchalten.tur.ar/omnibus/" },
      { label: "Secretaría de Turismo de El Chaltén — En vehículo", url: "https://elchalten.tur.ar/vehiculo/" },
      { label: "Secretaría de Turismo de El Chaltén — En avión", url: "https://elchalten.tur.ar/avion/" },
    ],
    relacionados: [
      { tipo: "parque", slug: "los-glaciares" },
      { tipo: "destino", slug: "el-calafate" },
      { tipo: "sendero", slug: "laguna-de-los-tres" },
      { tipo: "sendero", slug: "laguna-torre" },
      { tipo: "sendero", slug: "laguna-capri" },
      { tipo: "sendero", slug: "loma-del-pliegue-tumbado" },
      { tipo: "sendero", slug: "chorrillo-del-salto" },
      { tipo: "sendero", slug: "huemul-circuit" },
      { tipo: "escalada", slug: "fitz-roy" },
      { tipo: "escalada", slug: "cerro-torre" },
      { tipo: "arqueologia", slug: "lago-viedma-pinturas" },
      { tipo: "fauna", slug: "huemul" },
      { tipo: "fauna", slug: "condor-andino" },
    ],
  },
  {
    slug: "puerto-madryn",
    nombre: "Puerto Madryn y Península Valdés",
    pais: "AR",
    lat: -42.7692,
    lng: -65.0385,
    wikipediaTitle: "Puerto Madryn",
    es: {
      metaTitle: "Puerto Madryn y Península Valdés: Qué Hacer y Cuándo Ir",
      metaDescription:
        "Guía de Puerto Madryn y Península Valdés, Chubut: avistaje de ballenas de junio a diciembre, pingüinos, orcas, clima mes a mes, cómo llegar y cuántos días ir.",
      subtitulo: "Chubut, Argentina · Puerta de entrada a Península Valdés",
      intro: [
        "Puerto Madryn es una ciudad de la costa de Chubut, en la Patagonia argentina, sobre el Golfo Nuevo, a 1.350 km al sur de Buenos Aires. Nació con el desembarco de 153 colonos galeses que llegaron en el barco Mimosa el 28 de julio de 1865, y es la base para visitar Península Valdés, a 100 km.",
        "Península Valdés es un Área Natural Protegida de la provincia del Chubut de unos 4.000 km², Patrimonio Mundial de la UNESCO desde 1999. Es uno de los mejores lugares del mundo para ver la ballena franca austral, que llega a los golfos de junio a diciembre, y tiene colonias de elefantes marinos, lobos marinos y pingüinos de Magallanes. En Punta Norte, las orcas salen a cazar varándose a propósito en la playa.",
        "La mejor época para ir es de septiembre a noviembre, cuando coinciden las ballenas, los pingüinos, los elefantes marinos y las orcas. De junio a agosto las ballenas se ven incluso desde la costa, en El Doradillo, a pocos kilómetros de la ciudad.",
      ],
      datos: [
        { label: "Provincia", valor: "Chubut" },
        { label: "Fundación", valor: "28 de julio de 1865 (desembarco galés)" },
        { label: "Distancia a Buenos Aires", valor: "1.350 km" },
        { label: "Distancia a Puerto Pirámides", valor: "100 km" },
        { label: "Península Valdés", valor: "≈ 4.000 km², Patrimonio Mundial UNESCO (1999)" },
        { label: "Temporada de ballenas", valor: "Junio a diciembre" },
        { label: "Días recomendados", valor: "3 a 4" },
        { label: "Mejor época", valor: "Septiembre a noviembre" },
      ],
      queHacer: [
        {
          nombre: "Avistaje de ballenas en Puerto Pirámides",
          texto:
            "Puerto Pirámides, el único pueblo dentro de Península Valdés y a 100 km de Puerto Madryn, es el único lugar del Chubut desde donde salen las embarcaciones para ver a la ballena franca austral. Hay salidas todos los días de junio a diciembre y duran entre una hora y media y dos horas. Septiembre y octubre son los meses de más actividad: saltos, coletazos y crías jugando cerca del barco.",
          gygQuery: "Puerto Madryn whale watching",
        },
        {
          nombre: "Ballenas desde la costa en El Doradillo",
          texto:
            "El Área Natural Protegida El Doradillo empieza a unos 15 km del centro de Puerto Madryn, y la playa Las Canteras está a 19 km. Ahí las ballenas madres se acercan con sus crías a pocos metros de la orilla. La visita es libre y gratuita, y conviene ir con marea alta.",
        },
        {
          nombre: "Recorrido por Península Valdés",
          texto:
            "La excursión de día completo empieza en el Centro de Visitantes del Istmo Carlos Ameghino, a 22 km de la entrada al área protegida, y sigue por Puerto Pirámides, Punta Pirámide (lobería), Caleta Valdés (pingüinos y, en Punta Cantor, elefantes marinos) y Punta Norte (lobos y elefantes marinos y orcas). Caleta Valdés está a 75 km de Puerto Pirámides por ripio, y Punta Norte a 79 km. Los puntos de observación abren de 8 a 20 h.",
          gygQuery: "Peninsula Valdes",
        },
        {
          nombre: "Orcas en Punta Norte",
          texto:
            "En Punta Norte, las orcas hacen varamientos intencionales para cazar crías de lobo marino en la orilla, una técnica de caza que se ve en muy pocos lugares del mundo. Pasa sobre todo en marzo y abril, y verlas depende de la marea y de la suerte.",
        },
        {
          nombre: "Pingüinos de Magallanes en Punta Tombo",
          texto:
            "La Reserva Faunística Provincial Punta Tombo, a 175 km al sur de Puerto Madryn, tiene la colonia continental de pingüinos de Magallanes más importante del mundo. Se visita de mediados de septiembre a mediados de abril. Si vas en auto, cargá combustible antes de salir.",
          gygQuery: "Punta Tombo",
        },
        {
          nombre: "Snorkel con lobos marinos en Punta Loma",
          texto:
            "En el Área Natural Protegida Punta Loma, al sur de la ciudad sobre el Golfo Nuevo, hay una colonia de lobos marinos de un pelo que se ve desde un mirador. Desde Puerto Madryn salen excursiones de snorkel para nadar con los lobos marinos en el agua.",
          gygQuery: "Puerto Madryn snorkeling sea lions",
        },
        {
          nombre: "Ecocentro y Punta Cuevas",
          texto:
            "El Ecocentro, sobre la costa de la ciudad, es un centro de interpretación sobre la fauna marina del Golfo Nuevo: ballenas, lobos marinos y pingüinos. Cerca está Punta Cuevas, donde se refugiaron los primeros colonos galeses al desembarcar en 1865.",
        },
        {
          nombre: "Té galés en Gaiman",
          texto:
            "Los colonos galeses se mudaron al valle inferior del río Chubut, donde nacieron Rawson, Trelew y Gaiman. En la zona se conservan la repostería casera y el té galés, y en la provincia se celebra el Eisteddfod, un certamen literario y musical de origen galés.",
          gygQuery: "Gaiman",
        },
      ],
      cuandoIr: {
        resumen:
          "Puerto Madryn se visita todo el año, pero la fauna marca la temporada. De septiembre a noviembre se ven ballenas, pingüinos, elefantes marinos y orcas a la vez. Las ballenas están de junio a diciembre y los pingüinos de septiembre a abril.",
        temporadas: [
          {
            nombre: "Invierno",
            meses: "Junio a agosto",
            texto:
              "Llegan las ballenas francas australes y arrancan los avistajes embarcados en Puerto Pirámides. En julio y agosto las madres con crías se acercan mucho a la costa de El Doradillo. Todavía no hay pingüinos ni elefantes marinos.",
          },
          {
            nombre: "Primavera",
            meses: "Septiembre a noviembre",
            texto:
              "La mejor época: septiembre y octubre son los meses de más actividad de las ballenas, llegan los pingüinos a Punta Tombo y Caleta Valdés, hay elefantes marinos en la costa de la península y aparecen orcas. Es temporada alta: conviene reservar las excursiones con tiempo.",
          },
          {
            nombre: "Verano",
            meses: "Diciembre a febrero",
            texto:
              "Las últimas ballenas se van en diciembre. Es la temporada de playa: Puerto Madryn tiene unos 4 km de costa con agua calma y guardavidas, y hay kayak, buceo y salidas para ver delfines. Siguen los pingüinos y los lobos marinos.",
          },
          {
            nombre: "Otoño",
            meses: "Marzo a mayo",
            texto:
              "Marzo y abril son los meses de las orcas en Punta Norte, que salen a cazar crías de lobo marino. Los pingüinos dejan Punta Tombo a mediados de abril. Ya no hay ballenas.",
          },
        ],
      },
      comoLlegar: [
        {
          modo: "En avión",
          texto:
            "Hay dos aeropuertos: El Tehuelche (PMY), en Puerto Madryn, y el Aeropuerto Internacional Almirante Zar (REL), en Trelew, al sur de la ciudad.",
        },
        {
          modo: "En auto o en bus",
          texto:
            "Puerto Madryn está a 1.350 km de Buenos Aires por la Ruta Nacional 3. La terminal de ómnibus de la ciudad recibe buses de larga distancia. Rawson, la capital de la provincia, queda a unos 50 km al sur.",
        },
        {
          modo: "A Península Valdés",
          texto:
            "Se llega por la Ruta Provincial 2, que sale de la Ruta Nacional 3. El acceso al área protegida está abierto las 24 horas, los 365 días del año. La empresa Mar y Valle tiene buses desde las terminales de Puerto Madryn y Trelew hasta Puerto Pirámides, con horarios que cambian según la temporada.",
        },
      ],
      cuantosDias: {
        resumen:
          "Con 3 días ves la ciudad, Península Valdés y una salida más. Con 4 días sumás Punta Tombo (de septiembre a abril) o el snorkel con lobos marinos sin apuro.",
        itinerario: [
          { dia: "Día 1", texto: "Ecocentro y Punta Cuevas a la mañana; Punta Loma o El Doradillo a la tarde (en temporada de ballenas, con marea alta)." },
          { dia: "Día 2", texto: "Península Valdés en el día: Istmo Ameghino, avistaje de ballenas en Puerto Pirámides, Caleta Valdés y Punta Norte." },
          { dia: "Día 3", texto: "Punta Tombo y sus pingüinos, con vuelta por Gaiman para el té galés." },
          { dia: "Día 4", texto: "Snorkel con lobos marinos, kayak o playa en Puerto Madryn." },
        ],
      },
      faq: [
        {
          pregunta: "¿Cuándo es la temporada de ballenas en Puerto Madryn?",
          respuesta:
            "De junio a diciembre. Los avistajes embarcados salen todos los días desde Puerto Pirámides, en Península Valdés. Septiembre y octubre son los meses de más actividad, y en julio y agosto las ballenas se ven desde la costa en El Doradillo.",
        },
        {
          pregunta: "¿Cuál es la mejor época para ir a Península Valdés?",
          respuesta:
            "De septiembre a noviembre, cuando coinciden las ballenas francas, los pingüinos de Magallanes, los elefantes marinos y las orcas. Para ver los varamientos de orcas en Punta Norte, marzo y abril.",
        },
        {
          pregunta: "¿Cuántos días hacen falta en Puerto Madryn?",
          respuesta:
            "Al menos 3 días: uno para la ciudad, Punta Loma y El Doradillo, uno para Península Valdés y uno para Punta Tombo o el snorkel con lobos marinos. Con 4 días se hace todo sin apuro.",
        },
        {
          pregunta: "¿Se puede ver ballenas desde la costa en Puerto Madryn?",
          respuesta:
            "Sí. En el Área Natural Protegida El Doradillo, a unos 15 km del centro, las ballenas con sus crías se acercan a pocos metros de la orilla, sobre todo en julio y agosto. La visita es libre y gratuita y conviene ir con marea alta.",
        },
        {
          pregunta: "¿Hay que pagar para entrar a Península Valdés?",
          respuesta:
            "Sí. La entrada se paga por persona y por día, con tarifas distintas para visitantes extranjeros, argentinos y residentes del Chubut. Los menores de 5 años y las personas con discapacidad no pagan. El ticket se compra online en el sitio oficial del área protegida.",
        },
        {
          pregunta: "¿A cuánto queda Península Valdés de Puerto Madryn?",
          respuesta:
            "Puerto Pirámides, el único pueblo de la península, está a 100 km de Puerto Madryn por las rutas nacional 3 y provincial 2. El Centro de Visitantes del Istmo Carlos Ameghino está a 22 km de la entrada al área protegida.",
        },
        {
          pregunta: "¿Cuándo hay pingüinos en Punta Tombo?",
          respuesta:
            "De mediados de septiembre a mediados de abril. Punta Tombo está a 175 km de Puerto Madryn y tiene la colonia continental de pingüinos de Magallanes más importante del mundo.",
        },
        {
          pregunta: "¿Cuándo se ven orcas en Península Valdés?",
          respuesta:
            "Las orcas aparecen en primavera y a fines del verano, pero los varamientos intencionales para cazar crías de lobo marino en Punta Norte se ven sobre todo en marzo y abril.",
        },
      ],
    },
    en: {
      metaTitle: "Puerto Madryn & Península Valdés Travel Guide",
      metaDescription:
        "Puerto Madryn and Península Valdés, Argentina: whale watching June to December, penguins, orcas, weather by month, how to get there and how many days to stay.",
      subtitulo: "Chubut, Argentina · Gateway to Península Valdés",
      intro: [
        "Puerto Madryn is a city on the coast of Chubut, in Argentine Patagonia, on the Golfo Nuevo, 1,350 km south of Buenos Aires. It began with the landing of 153 Welsh settlers who arrived on the ship Mimosa on July 28, 1865, and it is the base for visiting Península Valdés, 100 km away.",
        "Península Valdés is a Chubut provincial protected area of about 4,000 km², a UNESCO World Heritage Site since 1999. It is one of the best places in the world to see southern right whales, which come into its gulfs from June to December, and it has colonies of elephant seals, sea lions and Magellanic penguins. At Punta Norte, orcas hunt by deliberately stranding themselves on the beach.",
        "The best time to go is September to November, when whales, penguins, elephant seals and orcas overlap. From June to August you can even see whales from the shore at El Doradillo, a few kilometers from town.",
      ],
      datos: [
        { label: "Province", valor: "Chubut, Argentina" },
        { label: "Founded", valor: "July 28, 1865 (Welsh landing)" },
        { label: "Distance to Buenos Aires", valor: "1,350 km" },
        { label: "Distance to Puerto Pirámides", valor: "100 km" },
        { label: "Península Valdés", valor: "≈ 4,000 km², UNESCO World Heritage (1999)" },
        { label: "Whale season", valor: "June to December" },
        { label: "Recommended stay", valor: "3 to 4 days" },
        { label: "Best time", valor: "September to November" },
      ],
      queHacer: [
        {
          nombre: "Whale watching from Puerto Pirámides",
          texto:
            "Puerto Pirámides, the only town inside Península Valdés and 100 km from Puerto Madryn, is the only place in Chubut where boats leave to see southern right whales. Trips run daily from June to December and last an hour and a half to two hours. September and October are the most active months, with breaching, tail slaps and calves playing near the boat.",
          gygQuery: "Puerto Madryn whale watching",
        },
        {
          nombre: "Shore whale watching at El Doradillo",
          texto:
            "The El Doradillo protected area starts about 15 km from downtown Puerto Madryn, and Las Canteras beach is 19 km away. Mother whales swim with their calves just meters from the shore. Access is free and unrestricted; go at high tide.",
        },
        {
          nombre: "Península Valdés day trip",
          texto:
            "The full-day tour starts at the Istmo Carlos Ameghino Visitor Center, 22 km from the protected area entrance, and continues to Puerto Pirámides, Punta Pirámide (sea lion colony), Caleta Valdés (penguins and, at Punta Cantor, elephant seals) and Punta Norte (sea lions, elephant seals and orcas). Caleta Valdés is 75 km from Puerto Pirámides on gravel, and Punta Norte is 79 km. Viewing points open 8 am to 8 pm.",
          gygQuery: "Peninsula Valdes",
        },
        {
          nombre: "Orcas at Punta Norte",
          texto:
            "At Punta Norte, orcas strand themselves on purpose to catch sea lion pups at the water's edge, a hunting technique seen in very few places on Earth. It happens mostly in March and April, and seeing it depends on the tide and on luck.",
        },
        {
          nombre: "Magellanic penguins at Punta Tombo",
          texto:
            "Punta Tombo Provincial Wildlife Reserve, 175 km south of Puerto Madryn, has the world's most important mainland colony of Magellanic penguins. It is open from mid-September to mid-April. If you drive, fill up before you leave.",
          gygQuery: "Punta Tombo",
        },
        {
          nombre: "Snorkeling with sea lions at Punta Loma",
          texto:
            "The Punta Loma protected area, south of the city on the Golfo Nuevo, has a South American sea lion colony you can watch from a viewpoint. Snorkeling trips leave from Puerto Madryn to swim with the sea lions in the water.",
          gygQuery: "Puerto Madryn snorkeling sea lions",
        },
        {
          nombre: "Ecocentro and Punta Cuevas",
          texto:
            "The Ecocentro, on the city's waterfront, is an interpretation center about the marine life of the Golfo Nuevo: whales, sea lions and penguins. Nearby is Punta Cuevas, where the first Welsh settlers took shelter after landing in 1865.",
        },
        {
          nombre: "Welsh tea in Gaiman",
          texto:
            "The Welsh settlers moved on to the lower Chubut River valley, where Rawson, Trelew and Gaiman were born. The area keeps Welsh home baking and Welsh tea alive, and the province holds the Eisteddfod, a literary and music festival of Welsh origin.",
          gygQuery: "Gaiman",
        },
      ],
      cuandoIr: {
        resumen:
          "Puerto Madryn welcomes visitors year-round, but wildlife sets the calendar. From September to November you can see whales, penguins, elephant seals and orcas at once. Whales are around from June to December and penguins from September to April.",
        temporadas: [
          {
            nombre: "Winter",
            meses: "June to August",
            texto:
              "Southern right whales arrive and boat trips start from Puerto Pirámides. In July and August mothers with calves come very close to the shore at El Doradillo. No penguins or elephant seals yet.",
          },
          {
            nombre: "Spring",
            meses: "September to November",
            texto:
              "The best time: September and October are the whales' most active months, penguins arrive at Punta Tombo and Caleta Valdés, elephant seals line the peninsula's coast and orcas show up. It's high season, so book tours ahead.",
          },
          {
            nombre: "Summer",
            meses: "December to February",
            texto:
              "The last whales leave in December. It's beach season: Puerto Madryn has about 4 km of calm, lifeguarded shoreline, plus kayaking, diving and dolphin-watching trips. Penguins and sea lions are still around.",
          },
          {
            nombre: "Autumn",
            meses: "March to May",
            texto:
              "March and April are orca months at Punta Norte, when they hunt sea lion pups. Penguins leave Punta Tombo in mid-April. The whales are gone.",
          },
        ],
      },
      comoLlegar: [
        {
          modo: "By plane",
          texto:
            "There are two airports: El Tehuelche (PMY) in Puerto Madryn, and Almirante Zar International Airport (REL) in Trelew, south of the city.",
        },
        {
          modo: "By car or bus",
          texto:
            "Puerto Madryn is 1,350 km from Buenos Aires on National Route 3. The city's bus terminal has long-distance services. Rawson, the provincial capital, is about 50 km south.",
        },
        {
          modo: "To Península Valdés",
          texto:
            "Take Provincial Route 2, which branches off National Route 3. The protected area entrance is open 24 hours a day, 365 days a year. Mar y Valle runs buses from the Puerto Madryn and Trelew terminals to Puerto Pirámides, with seasonal schedules.",
        },
      ],
      cuantosDias: {
        resumen:
          "3 days cover the city, Península Valdés and one more outing. With 4 days you can add Punta Tombo (September to April) or sea lion snorkeling without rushing.",
        itinerario: [
          { dia: "Day 1", texto: "Ecocentro and Punta Cuevas in the morning; Punta Loma or El Doradillo in the afternoon (during whale season, at high tide)." },
          { dia: "Day 2", texto: "Península Valdés day trip: Istmo Ameghino, whale watching from Puerto Pirámides, Caleta Valdés and Punta Norte." },
          { dia: "Day 3", texto: "Punta Tombo and its penguins, returning through Gaiman for Welsh tea." },
          { dia: "Day 4", texto: "Sea lion snorkeling, kayaking or the beach in Puerto Madryn." },
        ],
      },
      faq: [
        {
          pregunta: "When is whale season in Puerto Madryn?",
          respuesta:
            "June to December. Boat trips leave daily from Puerto Pirámides, on Península Valdés. September and October are the most active months, and in July and August you can see whales from the shore at El Doradillo.",
        },
        {
          pregunta: "What is the best time to visit Península Valdés?",
          respuesta:
            "September to November, when southern right whales, Magellanic penguins, elephant seals and orcas overlap. To see orcas stranding at Punta Norte, go in March or April.",
        },
        {
          pregunta: "How many days do you need in Puerto Madryn?",
          respuesta:
            "At least 3 days: one for the city, Punta Loma and El Doradillo, one for Península Valdés and one for Punta Tombo or sea lion snorkeling. With 4 days you can do it all at an easy pace.",
        },
        {
          pregunta: "Can you see whales from the shore in Puerto Madryn?",
          respuesta:
            "Yes. At the El Doradillo protected area, about 15 km from downtown, whales and their calves come within meters of the shore, especially in July and August. Access is free; go at high tide.",
        },
        {
          pregunta: "Is there an entrance fee for Península Valdés?",
          respuesta:
            "Yes. The fee is per person per day, with different rates for foreign visitors, Argentine citizens and Chubut residents. Children under 5 and people with disabilities enter free. Tickets are sold online on the protected area's official website.",
        },
        {
          pregunta: "How far is Península Valdés from Puerto Madryn?",
          respuesta:
            "Puerto Pirámides, the peninsula's only town, is 100 km from Puerto Madryn via National Route 3 and Provincial Route 2. The Istmo Carlos Ameghino Visitor Center is 22 km from the protected area entrance.",
        },
        {
          pregunta: "When are the penguins at Punta Tombo?",
          respuesta:
            "From mid-September to mid-April. Punta Tombo is 175 km from Puerto Madryn and has the world's most important mainland colony of Magellanic penguins.",
        },
        {
          pregunta: "When can you see orcas at Península Valdés?",
          respuesta:
            "Orcas appear in spring and late summer, but the deliberate strandings to catch sea lion pups at Punta Norte happen mostly in March and April.",
        },
      ],
    },
    fuentes: [
      { label: "Área Natural Protegida Península Valdés — sitio oficial", url: "https://peninsulavaldes.org.ar/" },
      { label: "Cómo llegar — ANP Península Valdés", url: "https://peninsulavaldes.org.ar/visita-peninsula/como-llegar/" },
      { label: "Qué visitar — ANP Península Valdés", url: "https://peninsulavaldes.org.ar/visita-peninsula/areas-turisticas/" },
      { label: "Calendario de fauna — ANP Península Valdés", url: "https://peninsulavaldes.org.ar/descubri-peninsula/calendario-de-fauna/" },
      { label: "Valor de ingreso — ANP Península Valdés", url: "https://peninsulavaldes.org.ar/visita-peninsula/valor-de-ingreso/" },
      { label: "Particularidades del área — ANP Península Valdés", url: "https://peninsulavaldes.org.ar/descubri-peninsula/particularidades-del-area/" },
      { label: "Folleto oficial de Península Valdés (AANPPV)", url: "https://peninsulavaldes.org.ar/wp-content/uploads/2025/02/Brochure-Peninsula-Valdes.pdf" },
      { label: "Secretaría de Turismo de Puerto Madryn — Conocé Madryn", url: "https://madryn.travel/conoce-madryn/" },
      { label: "Secretaría de Turismo de Puerto Madryn — Ballenas", url: "https://madryn.travel/ballenas-landing" },
      { label: "Ballena franca austral: cuándo y dónde verla — Argentina.travel (INPROTUR)", url: "https://www.argentina.travel/novedades/ballena-franca-austral-en-argentina-cuando-y-donde-verlas-en-su-habitat-natural" },
      { label: "3 días en Puerto Madryn — Argentina.travel (INPROTUR)", url: "https://www.argentina.travel/planea-tu-viaje/3-dias-en-puerto-madryn-entre-julio-y-diciembre" },
      { label: "Caminar entre pingüinos de Magallanes (Punta Tombo) — Presidencia de la Nación", url: "https://www.argentina.gob.ar/node/466975" },
      { label: "Desembarco de los colonos galeses — Cámara de Diputados de la Nación", url: "https://www4.hcdn.gob.ar/dependencias/dsecretaria/Periodo2024/PDF2024/TP2024/3937-D-2024.pdf" },
    ],
    relacionados: [
      { tipo: "fauna", slug: "ballena-franca-austral" },
      { tipo: "fauna", slug: "orca" },
      { tipo: "fauna", slug: "elefante-marino-del-sur" },
      { tipo: "fauna", slug: "pinguino-de-magallanes" },
      { tipo: "fauna", slug: "lobo-marino-del-sur" },
      { tipo: "fauna", slug: "choique" },
      { tipo: "gastronomia", slug: "torta-galesa-historia-receta-patagonia" },
    ],
  },
  {
    slug: "puerto-varas",
    nombre: "Puerto Varas y Puerto Montt",
    pais: "CL",
    lat: -41.3195,
    lng: -72.9854,
    wikipediaTitle: "Puerto Varas",
    es: {
      metaTitle: "Puerto Varas y Puerto Montt: Qué Hacer y Cuándo Ir",
      metaDescription:
        "Guía de Puerto Varas y Puerto Montt, Chile: lago Llanquihue, volcán Osorno, Saltos del Petrohué, Cruce Andino a Bariloche, clima mes a mes y cómo llegar.",
      subtitulo: "Región de Los Lagos, Chile · Lago Llanquihue y volcán Osorno",
      intro: [
        "Puerto Varas es una ciudad a orillas del lago Llanquihue, en la Región de Los Lagos, en el sur de Chile, a unos 20 minutos de Puerto Montt por la Ruta 5 Sur. La fundaron colonos alemanes a mediados del siglo XIX, y todavía se nota en sus casas con fachadas de alerce y en su cocina. Desde la costanera se ven los volcanes Osorno y Calbuco.",
        "El Llanquihue es el segundo lago más grande de Chile, rodeado por los volcanes Osorno (2.652 m), Calbuco y Puntiagudo, con Puerto Varas, Frutillar y Puerto Octay en sus orillas. Puerto Varas es la base para el Parque Nacional Vicente Pérez Rosales, creado en 1926, con los Saltos del Petrohué, el lago Todos los Santos y el Cruce Andino a Bariloche.",
        "Puerto Montt, capital de la Región de Los Lagos, fue fundada en 1853 con el nombre de Astillero de Melipulli. Es la puerta de entrada a la zona: tiene el aeropuerto El Tepual, el puerto de donde salen los barcos a Chiloé, Chaitén, Aysén y Magallanes, y el inicio de la Carretera Austral.",
      ],
      datos: [
        { label: "Región", valor: "Los Lagos, Chile" },
        { label: "Aeropuerto", valor: "El Tepual (PMC), Puerto Montt" },
        { label: "Puerto Montt – Puerto Varas", valor: "≈ 20 min por la Ruta 5 Sur" },
        { label: "Puerto Varas – Saltos del Petrohué", valor: "50 km por la Ruta 225" },
        { label: "Volcán Osorno", valor: "2.652 m" },
        { label: "PN Vicente Pérez Rosales", valor: "Creado en 1926, 253.780 ha" },
        { label: "Días recomendados", valor: "3 a 4" },
        { label: "Mejor época", valor: "Diciembre a marzo" },
      ],
      queHacer: [
        {
          nombre: "Costanera y centro de Puerto Varas",
          texto:
            "El centro se recorre a pie: la costanera sobre el lago Llanquihue con vista a los volcanes Osorno y Calbuco, las casas de inmigrantes alemanes con fachadas de alerce, la iglesia del Sagrado Corazón, el Museo Pablo Fierro y el monumento a la Princesa Licarayén. El atardecer se ve gratis desde el Parque Philippi, en el cerro sobre la ciudad. Alrededor del lago hay una ciclovía larga, y en el agua se hace kayak, vela y windsurf.",
          gygQuery: "Puerto Varas",
        },
        {
          nombre: "Saltos del Petrohué y lago Todos los Santos",
          texto:
            "Los Saltos del Petrohué, dentro del Parque Nacional Vicente Pérez Rosales, están a 50 km de Puerto Varas por la Ruta 225 hacia Ensenada, unos 53 minutos en auto. Se recorren por pasarelas, con el volcán Osorno de fondo. Muy cerca está el lago Todos los Santos, de origen glaciar, desde donde se ven el Osorno, el Puntiagudo y el cerro Tronador; la navegación hasta Peulla dura 1 h 40 min. No se recomienda bañarse. La entrada al parque se compra online en Pases Parques.",
          gygQuery: "Petrohue Falls",
        },
        {
          nombre: "Volcán Osorno",
          texto:
            "El Osorno es un estratovolcán de 2.652 m, el cono nevado que domina el lago Llanquihue. En su base hay un centro de ski y montaña con aerosillas, ski, snowboard y tubing en la nieve. El ascenso a la cumbre lleva de 4 a 5 horas y es técnico: se hace con un operador registrado en Sernatur, y los andinistas tienen que registrarse en las oficinas de CONAF de Petrohué, Ensenada o Peulla.",
          gygQuery: "Osorno Volcano",
        },
        {
          nombre: "Cruce Andino a Bariloche",
          texto:
            "El Cruce Andino une Puerto Varas y Bariloche por la cordillera combinando tres lagos (Todos los Santos, Frías y Nahuel Huapi) con cuatro tramos por tierra, a través de los parques nacionales Vicente Pérez Rosales y Nahuel Huapi. De Puerto Varas a Bariloche son unas 12 horas en un día, y funciona los 365 días del año. Se puede partir el viaje en dos y dormir en Peulla o en Puerto Blest.",
          gygQuery: "Cruce Andino",
        },
        {
          nombre: "Rafting en el río Petrohué",
          texto:
            "El río Petrohué, que nace en el lago Todos los Santos y pasa por los saltos, se baja en rafting con agencias certificadas. Elegí una registrada en Sernatur.",
          gygQuery: "Petrohue rafting",
        },
        {
          nombre: "Frutillar y el Teatro del Lago",
          texto:
            "Frutillar, también sobre el lago Llanquihue, a unos 50 minutos de Puerto Montt, conserva casas patrimoniales de los inmigrantes alemanes y el Museo Colonial Alemán. Su Teatro del Lago, a orillas del agua, es sede de las Semanas Musicales de Frutillar, un festival de música clásica que se hace a fines de enero y principios de febrero. Frutillar es Ciudad Creativa de la Música de la UNESCO.",
          gygQuery: "Frutillar",
        },
        {
          nombre: "Angelmó e Isla Tenglo, en Puerto Montt",
          texto:
            "Angelmó es la caleta de pescadores de Puerto Montt, con una feria de artesanías y cocinerías de mariscos y comida chilota, como el curanto, con vista a la Isla Tenglo y al volcán Calbuco. Desde la caleta salen botes a Tenglo, un cruce de unos 20 minutos. En la isla, una subida empinada lleva hasta una gran cruz con vista a la ciudad y a los volcanes Osorno, Puntiagudo y Calbuco.",
          gygQuery: "Puerto Montt",
        },
        {
          nombre: "Parque Nacional Alerce Andino",
          texto:
            "A unos 50 km de Puerto Montt, protege bosques de alerce con árboles de más de 3.000 años. Tiene tres accesos (Correntoso, Sargazo y Chaicas), con senderos a cascadas y lagunas. Al norte del parque está el lago Chapo, a 240 m sobre el nivel del mar.",
        },
      ],
      cuandoIr: {
        resumen:
          "Diciembre a marzo es la mejor época y la temporada alta: los días son largos, se aprovecha el lago y hay festivales como las Semanas Musicales de Frutillar. El Cruce Andino y el Parque Vicente Pérez Rosales funcionan todo el año, y en invierno se suma el ski en el volcán Osorno.",
        temporadas: [
          {
            nombre: "Verano",
            meses: "Diciembre a febrero",
            texto:
              "Temporada alta: kayak, vela y ciclovía en el lago Llanquihue, rafting en el Petrohué, ascensos al Osorno y las Semanas Musicales en el Teatro del Lago de Frutillar, a fines de enero. Conviene reservar con tiempo y llevar repelente para los insectos.",
          },
          {
            nombre: "Otoño",
            meses: "Marzo a mayo",
            texto:
              "Hay menos visitantes que en verano. Los Saltos del Petrohué, la navegación por el lago Todos los Santos y el Cruce Andino siguen funcionando.",
          },
          {
            nombre: "Invierno",
            meses: "Junio a agosto",
            texto:
              "Es la temporada de nieve en el centro de ski del volcán Osorno. Antes de subir, CONAF recomienda revisar el estado del camino al volcán y del camino de Ensenada al lago Todos los Santos.",
          },
          {
            nombre: "Primavera",
            meses: "Septiembre a noviembre",
            texto:
              "Los días se alargan antes del verano. Es temporada baja: el Parque Vicente Pérez Rosales y el Cruce Andino funcionan todo el año.",
          },
        ],
      },
      comoLlegar: [
        {
          modo: "En avión",
          texto:
            "El Aeropuerto Internacional El Tepual (PMC), en Puerto Montt, es la puerta de entrada a la Región de Los Lagos. Desde ahí son unos 20 minutos a Puerto Varas y unos 50 a Frutillar por la Ruta 5 Sur, en shuttle, taxi o auto de alquiler.",
        },
        {
          modo: "Desde Bariloche por tierra",
          texto:
            "Por el Paso Cardenal Antonio Samoré, que del lado chileno se toma por la Ruta 215-CH, a la altura de Osorno. Puerto Varas está a 318 km de Bariloche. En invierno pueden pedir cadenas: revisá el estado del paso antes de salir.",
        },
        {
          modo: "Desde Bariloche por los lagos",
          texto:
            "El Cruce Andino combina bus y navegación por los lagos Nahuel Huapi, Frías y Todos los Santos, y llega a Puerto Varas en unas 12 horas, o en dos días con noche en Peulla o Puerto Blest.",
        },
        {
          modo: "Hacia el sur",
          texto:
            "Puerto Montt es el inicio de la Carretera Austral. De su puerto salen barcos a la Isla Grande de Chiloé, a Chaitén y a las regiones de Aysén y Magallanes.",
        },
      ],
      cuantosDias: {
        resumen:
          "Con 3 días ves Puerto Varas, los Saltos del Petrohué, el volcán Osorno y Puerto Montt. Con 4 sumás Frutillar o el Parque Alerce Andino, o seguís a Bariloche por el Cruce Andino.",
        itinerario: [
          { dia: "Día 1", texto: "Costanera y centro de Puerto Varas a la mañana; Frutillar y el Teatro del Lago a la tarde." },
          { dia: "Día 2", texto: "Saltos del Petrohué y lago Todos los Santos, con subida al centro de ski y montaña del volcán Osorno." },
          { dia: "Día 3", texto: "Puerto Montt: Angelmó para almorzar mariscos y bote a la Isla Tenglo." },
          { dia: "Día 4", texto: "Rafting en el Petrohué o Parque Nacional Alerce Andino. Otra opción: Cruce Andino a Bariloche." },
        ],
      },
      faq: [
        {
          pregunta: "¿A cuánto queda Puerto Varas de Puerto Montt?",
          respuesta:
            "A unos 20 minutos por la Ruta 5 Sur. El Aeropuerto El Tepual, en Puerto Montt, es el más cercano a Puerto Varas.",
        },
        {
          pregunta: "¿Cómo llegar a los Saltos del Petrohué desde Puerto Varas?",
          respuesta:
            "Por la Ruta 225 hacia Ensenada, y después el desvío a los saltos: son 50 km, unos 53 minutos en auto. Están dentro del Parque Nacional Vicente Pérez Rosales, y la entrada se compra online en Pases Parques.",
        },
        {
          pregunta: "¿Cuánto cuesta la entrada a los Saltos del Petrohué?",
          respuesta:
            "La entrada al Parque Nacional Vicente Pérez Rosales tiene tarifas distintas para chilenos y extranjeros, y los menores de 12 años no pagan. Los valores vigentes y la compra están en Pases Parques, el sistema oficial de CONAF.",
        },
        {
          pregunta: "¿Cómo ir de Puerto Varas a Bariloche?",
          respuesta:
            "Por tierra, por el Paso Cardenal Samoré (318 km), o por los lagos con el Cruce Andino, que combina bus y navegación por los lagos Todos los Santos, Frías y Nahuel Huapi en unas 12 horas y funciona todo el año.",
        },
        {
          pregunta: "¿Se puede subir al volcán Osorno?",
          respuesta:
            "Sí. En la base hay un centro de ski y montaña con aerosillas al que se llega en auto. La cumbre (2.652 m) es un ascenso técnico de 4 a 5 horas: hay que ir con un operador registrado en Sernatur y registrarse en CONAF.",
        },
        {
          pregunta: "¿Cuántos días hacen falta en Puerto Varas?",
          respuesta:
            "Al menos 3 días: uno para Puerto Varas y Frutillar, uno para los Saltos del Petrohué y el volcán Osorno, y uno para Puerto Montt. Con 4 días sumás rafting, el Parque Alerce Andino o el Cruce Andino.",
        },
        {
          pregunta: "¿Cuál es la mejor época para ir a Puerto Varas?",
          respuesta:
            "De diciembre a marzo, cuando los días son largos y funcionan todas las actividades en el lago y en la montaña. En invierno se puede esquiar en el volcán Osorno.",
        },
        {
          pregunta: "¿Qué ver en Puerto Montt?",
          respuesta:
            "La caleta y feria de Angelmó, con mariscos y comida chilota, el bote a la Isla Tenglo y la playa de Pelluco. A unos 50 km está el Parque Nacional Alerce Andino, con alerces de más de 3.000 años.",
        },
      ],
    },
    en: {
      metaTitle: "Puerto Varas & Puerto Montt Travel Guide, Chile",
      metaDescription:
        "Puerto Varas and Puerto Montt, Chile: Lake Llanquihue, Osorno Volcano, Petrohué Falls, the Andean Lakes Crossing to Bariloche, weather by month and how to get there.",
      subtitulo: "Los Lagos Region, Chile · Lake Llanquihue and Osorno Volcano",
      intro: [
        "Puerto Varas is a town on the shore of Lake Llanquihue, in Chile's Los Lagos Region, about 20 minutes from Puerto Montt on Route 5 South. German settlers founded it in the mid-19th century, and it still shows in its alerce-shingled houses and its food. From the waterfront you can see the Osorno and Calbuco volcanoes.",
        "Llanquihue is Chile's second-largest lake, ringed by the Osorno (2,652 m), Calbuco and Puntiagudo volcanoes, with Puerto Varas, Frutillar and Puerto Octay on its shores. Puerto Varas is the base for Vicente Pérez Rosales National Park, created in 1926, with Petrohué Falls, Lake Todos los Santos and the Andean Lakes Crossing to Bariloche.",
        "Puerto Montt, capital of the Los Lagos Region, was founded in 1853 as Astillero de Melipulli. It is the gateway to the area: it has El Tepual airport, the port where boats leave for Chiloé, Chaitén, Aysén and Magallanes, and the start of the Carretera Austral.",
      ],
      datos: [
        { label: "Region", valor: "Los Lagos, Chile" },
        { label: "Airport", valor: "El Tepual (PMC), Puerto Montt" },
        { label: "Puerto Montt – Puerto Varas", valor: "≈ 20 min on Route 5 South" },
        { label: "Puerto Varas – Petrohué Falls", valor: "50 km on Route 225" },
        { label: "Osorno Volcano", valor: "2,652 m" },
        { label: "Vicente Pérez Rosales NP", valor: "Created 1926, 253,780 ha" },
        { label: "Recommended stay", valor: "3 to 4 days" },
        { label: "Best time", valor: "December to March" },
      ],
      queHacer: [
        {
          nombre: "Puerto Varas waterfront and town center",
          texto:
            "The center is walkable: the waterfront on Lake Llanquihue with views of the Osorno and Calbuco volcanoes, German settlers' houses with alerce-shingled facades, the Sacred Heart church, the Pablo Fierro Museum and the Princess Licarayén monument. Watch the sunset for free from Philippi Park, on the hill above town. A long bike path follows the lakeshore, and on the water you can kayak, sail and windsurf.",
          gygQuery: "Puerto Varas",
        },
        {
          nombre: "Petrohué Falls and Lake Todos los Santos",
          texto:
            "Petrohué Falls, inside Vicente Pérez Rosales National Park, are 50 km from Puerto Varas on Route 225 toward Ensenada, about 53 minutes by car. Walkways lead along the falls with Osorno Volcano behind them. Close by is Lake Todos los Santos, of glacial origin, with views of Osorno, Puntiagudo and Mount Tronador; the boat ride to Peulla takes 1 h 40 min. Swimming is not recommended. Park tickets are sold online through Pases Parques.",
          gygQuery: "Petrohue Falls",
        },
        {
          nombre: "Osorno Volcano",
          texto:
            "Osorno is a 2,652 m stratovolcano, the snow-capped cone that dominates Lake Llanquihue. At its base there is a ski and mountain center with chairlifts, skiing, snowboarding and snow tubing. The summit climb takes 4 to 5 hours and is technical: go with a Sernatur-registered operator, and climbers must register at the CONAF offices in Petrohué, Ensenada or Peulla.",
          gygQuery: "Osorno Volcano",
        },
        {
          nombre: "Andean Lakes Crossing to Bariloche",
          texto:
            "The Cruce Andino links Puerto Varas and Bariloche across the Andes, combining three lakes (Todos los Santos, Frías and Nahuel Huapi) with four land segments through Vicente Pérez Rosales and Nahuel Huapi national parks. Puerto Varas to Bariloche takes about 12 hours in one day, and it runs 365 days a year. You can split the trip and spend a night in Peulla or Puerto Blest.",
          gygQuery: "Cruce Andino",
        },
        {
          nombre: "Rafting on the Petrohué River",
          texto:
            "The Petrohué River, which flows out of Lake Todos los Santos and over the falls, is run by raft with certified agencies. Pick one registered with Sernatur.",
          gygQuery: "Petrohue rafting",
        },
        {
          nombre: "Frutillar and the Teatro del Lago",
          texto:
            "Frutillar, also on Lake Llanquihue and about 50 minutes from Puerto Montt, keeps German settlers' heritage houses and the German Colonial Museum. Its lakeside Teatro del Lago hosts the Frutillar Musical Weeks, a classical music festival held in late January and early February. Frutillar is a UNESCO Creative City of Music.",
          gygQuery: "Frutillar",
        },
        {
          nombre: "Angelmó and Tenglo Island, Puerto Montt",
          texto:
            "Angelmó is Puerto Montt's fishing cove, with a crafts market and cookshops serving seafood and Chilote food such as curanto, looking out to Tenglo Island and Calbuco Volcano. Boats leave the cove for Tenglo, a crossing of about 20 minutes. On the island, a steep climb leads to a large cross with views of the city and the Osorno, Puntiagudo and Calbuco volcanoes.",
          gygQuery: "Puerto Montt",
        },
        {
          nombre: "Alerce Andino National Park",
          texto:
            "About 50 km from Puerto Montt, it protects alerce forests with trees over 3,000 years old. It has three entrances (Correntoso, Sargazo and Chaicas), with trails to waterfalls and lagoons. North of the park lies Lake Chapo, at 240 m above sea level.",
        },
      ],
      cuandoIr: {
        resumen:
          "December to March is the best time and the high season: long days, the lake at its best and festivals like the Frutillar Musical Weeks. The Andean Lakes Crossing and Vicente Pérez Rosales National Park are open year-round, and winter adds skiing on Osorno Volcano.",
        temporadas: [
          {
            nombre: "Summer",
            meses: "December to February",
            texto:
              "High season: kayaking, sailing and the bike path on Lake Llanquihue, rafting on the Petrohué, Osorno climbs and the Musical Weeks at Frutillar's Teatro del Lago in late January. Book ahead and bring insect repellent.",
          },
          {
            nombre: "Autumn",
            meses: "March to May",
            texto:
              "There are fewer visitors than in summer. Petrohué Falls, the Lake Todos los Santos boat trip and the Andean Lakes Crossing keep running.",
          },
          {
            nombre: "Winter",
            meses: "June to August",
            texto:
              "Snow season at the Osorno Volcano ski center. Before heading up, CONAF advises checking road conditions on the volcano road and on the Ensenada–Lake Todos los Santos road.",
          },
          {
            nombre: "Spring",
            meses: "September to November",
            texto:
              "Days get longer ahead of summer. It's low season: Vicente Pérez Rosales National Park and the Andean Lakes Crossing are open year-round.",
          },
        ],
      },
      comoLlegar: [
        {
          modo: "By plane",
          texto:
            "El Tepual International Airport (PMC), in Puerto Montt, is the gateway to the Los Lagos Region. From there it's about 20 minutes to Puerto Varas and about 50 to Frutillar on Route 5 South, by shuttle, taxi or rental car.",
        },
        {
          modo: "From Bariloche by road",
          texto:
            "Via the Cardenal Antonio Samoré Pass, reached on the Chilean side by Route 215-CH near Osorno. Puerto Varas is 318 km from Bariloche. Chains may be required in winter: check the pass status before you go.",
        },
        {
          modo: "From Bariloche across the lakes",
          texto:
            "The Andean Lakes Crossing combines bus and boat across lakes Nahuel Huapi, Frías and Todos los Santos, reaching Puerto Varas in about 12 hours, or in two days with a night in Peulla or Puerto Blest.",
        },
        {
          modo: "Heading south",
          texto:
            "Puerto Montt is the start of the Carretera Austral. Boats leave its port for Chiloé Island, Chaitén and the Aysén and Magallanes regions.",
        },
      ],
      cuantosDias: {
        resumen:
          "3 days cover Puerto Varas, Petrohué Falls, Osorno Volcano and Puerto Montt. With 4 you can add Frutillar or Alerce Andino National Park, or continue to Bariloche on the Andean Lakes Crossing.",
        itinerario: [
          { dia: "Day 1", texto: "Puerto Varas waterfront and town center in the morning; Frutillar and the Teatro del Lago in the afternoon." },
          { dia: "Day 2", texto: "Petrohué Falls and Lake Todos los Santos, then up to the Osorno Volcano ski and mountain center." },
          { dia: "Day 3", texto: "Puerto Montt: seafood lunch at Angelmó and a boat to Tenglo Island." },
          { dia: "Day 4", texto: "Rafting on the Petrohué or Alerce Andino National Park. Or take the Andean Lakes Crossing to Bariloche." },
        ],
      },
      faq: [
        {
          pregunta: "How far is Puerto Varas from Puerto Montt?",
          respuesta:
            "About 20 minutes on Route 5 South. El Tepual Airport, in Puerto Montt, is the closest airport to Puerto Varas.",
        },
        {
          pregunta: "How do you get to Petrohué Falls from Puerto Varas?",
          respuesta:
            "Take Route 225 toward Ensenada and then the turnoff to the falls: 50 km, about 53 minutes by car. They are inside Vicente Pérez Rosales National Park, and tickets are sold online through Pases Parques.",
        },
        {
          pregunta: "How much is the entrance fee for Petrohué Falls?",
          respuesta:
            "Vicente Pérez Rosales National Park has different rates for Chilean and foreign visitors, and children under 12 enter free. Current prices and tickets are on Pases Parques, CONAF's official booking system.",
        },
        {
          pregunta: "How do you get from Puerto Varas to Bariloche?",
          respuesta:
            "By road over the Cardenal Samoré Pass (318 km), or across the lakes on the Andean Lakes Crossing, which combines bus and boat over lakes Todos los Santos, Frías and Nahuel Huapi in about 12 hours and runs year-round.",
        },
        {
          pregunta: "Can you climb Osorno Volcano?",
          respuesta:
            "Yes. You can drive to the ski and mountain center at its base, which has chairlifts. The summit (2,652 m) is a technical 4 to 5 hour climb: go with a Sernatur-registered operator and register with CONAF.",
        },
        {
          pregunta: "How many days do you need in Puerto Varas?",
          respuesta:
            "At least 3 days: one for Puerto Varas and Frutillar, one for Petrohué Falls and Osorno Volcano, and one for Puerto Montt. With 4 days you can add rafting, Alerce Andino National Park or the Andean Lakes Crossing.",
        },
        {
          pregunta: "What is the best time to visit Puerto Varas?",
          respuesta:
            "December to March, when days are long and all lake and mountain activities are running. In winter you can ski on Osorno Volcano.",
        },
        {
          pregunta: "What is there to see in Puerto Montt?",
          respuesta:
            "The Angelmó cove and market, with seafood and Chilote food, the boat to Tenglo Island and Pelluco beach. About 50 km away is Alerce Andino National Park, with alerce trees over 3,000 years old.",
        },
      ],
    },
    fuentes: [
      { label: "Lago Llanquihue — Chile.travel (Sernatur)", url: "https://chile.travel/en/?p=78352" },
      { label: "Volcán Osorno, Saltos del Petrohué y lago Todos los Santos — Chile.travel (Sernatur)", url: "https://chile.travel/blog/visita-el-volcan-osorno-y-descubre-los-entornos-magicos-del-sur-de-chile/" },
      { label: "Puerto Varas, puerta del destino Lago Llanquihue — Sernatur Los Lagos", url: "https://loslagos.travel/en/puerto-varas-the-gateway-to-the-destination-lake-llanquihue/" },
      { label: "Puerto Montt, inicio de la Patagonia — Sernatur Los Lagos", url: "https://loslagos.travel/en/explore-the-beginning-of-patagonia/" },
      { label: "Turismo — Municipalidad de Puerto Montt", url: "https://www.puertomontt.cl/?p=157" },
      { label: "Parque Nacional Vicente Pérez Rosales — CONAF", url: "https://www.conaf.cl/parques/parque-nacional-vicente-perez-rosales/" },
      { label: "Pases Parques — venta oficial de entradas (CONAF)", url: "https://www.pasesparques.cl/" },
      { label: "Volcán Osorno — SERNAGEOMIN, Red Nacional de Vigilancia Volcánica", url: "https://www.sernageomin.cl/wp-content/uploads/2020/09/Maqueta_Plegable_Volcan_Osorno.pdf" },
      { label: "Cruce Andino — sitio oficial", url: "https://www.cruceandino.com/" },
      { label: "Cruce Andino — Datos básicos", url: "https://www.cruceandino.com/cruce/ES/datos_CA/datos-basicos-cruce-andino" },
      { label: "Paso Cardenal Samoré — Pasos Fronterizos de Chile", url: "https://www.pasosfronterizos.gov.cl/complejos-fronterizos/loslagos/paso-cardenal-samore/" },
      { label: "Bariloche Turismo — Preguntas frecuentes", url: "https://barilocheturismo.gob.ar/es/preguntas-frecuentes" },
      { label: "Semanas Musicales de Frutillar — sitio oficial", url: "https://semanasmusicales.cl/" },
    ],
    relacionados: [
      { tipo: "parque", slug: "vicente-perez-rosales" },
      { tipo: "parque", slug: "alerce-andino" },
      { tipo: "volcan", slug: "osorno" },
      { tipo: "volcan", slug: "calbuco" },
      { tipo: "destino", slug: "bariloche" },
      { tipo: "destino", slug: "pucon" },
      { tipo: "escalada", slug: "cochamo" },
      { tipo: "gastronomia", slug: "curanto-chilote-historia-receta" },
      { tipo: "gastronomia", slug: "kuchen-chileno-historia-tradicion" },
      { tipo: "destino", slug: "chiloe" },
      { tipo: "destino", slug: "coyhaique" },
    ],
  },
  {
    slug: "punta-arenas",
    nombre: "Punta Arenas",
    pais: "CL",
    lat: -53.1638,
    lng: -70.9171,
    wikipediaTitle: "Punta Arenas",
    es: {
      metaTitle: "Punta Arenas: Qué Hacer, Clima, Cuándo Ir y Cómo Llegar",
      metaDescription:
        "Guía de Punta Arenas, Chile: qué hacer, clima mes a mes, cuándo ir, cómo llegar y cuántos días quedarse. Pingüinos de Isla Magdalena, Fuerte Bulnes y el Estrecho.",
      subtitulo: "Magallanes, Chile · A orillas del Estrecho de Magallanes",
      intro: [
        "Punta Arenas es la capital de la Región de Magallanes y de la Antártica Chilena y está a orillas del Estrecho de Magallanes, en el extremo sur de la Patagonia chilena. Se fundó el 18 de diciembre de 1848, cuando la colonia de Fuerte Bulnes se trasladó a este punto de la costa, y en 1868 fue declarada puerto libre. La comuna tiene 132.363 habitantes (Censo 2024).",
        "Es la puerta de entrada aérea a la Patagonia chilena: el aeropuerto Presidente Carlos Ibáñez del Campo (PUQ) está a unos 20 km del centro y Puerto Natales, la base para Torres del Paine, queda a 250 km por la Ruta 9. Desde la ciudad salen los barcos a Isla Magdalena, donde anidan unas 7.000 parejas de pingüinos de Magallanes, y los ferris hacia Tierra del Fuego.",
        "El centro conserva los palacios de la época de la ganadería ovina alrededor de la Plaza Muñoz Gamero, y el Cementerio Municipal es Monumento Nacional. La temporada de pingüinos va de octubre a mediados de abril: en enero las máximas rondan los 13 °C y hay más de 16 horas de luz; en julio las máximas son de unos 4 °C y hay 8 horas de luz.",
      ],
      datos: [
        { label: "Región", valor: "Magallanes y de la Antártica Chilena" },
        { label: "Población", valor: "132.363 habitantes en la comuna (Censo 2024)" },
        { label: "Fundación", valor: "18 de diciembre de 1848" },
        { label: "Aeropuerto", valor: "Presidente Carlos Ibáñez del Campo (PUQ), a unos 20 km del centro" },
        { label: "Distancia a Puerto Natales", valor: "250 km por la Ruta 9" },
        { label: "Días recomendados", valor: "3 a 4" },
        { label: "Mejor época", valor: "Oct–abr (temporada de pingüinos)" },
      ],
      queHacer: [
        {
          nombre: "Pingüinos en Isla Magdalena",
          texto:
            "El Monumento Natural Los Pingüinos, formado por las islas Magdalena y Marta, está 35 km al noreste de Punta Arenas, en el Estrecho de Magallanes. En Isla Magdalena anidan unas 7.000 parejas de pingüinos de Magallanes, y un sendero fácil de 1,4 km, de unos 60 minutos, recorre la colonia. Isla Marta tiene una colonia de cormorán imperial y una lobería de lobos marinos de uno y dos pelos. Se llega solo en las embarcaciones turísticas que salen del terminal Tres Puentes, con una navegación de alrededor de 1 hora y media, y se visita de octubre a mediados de abril, siempre con guías certificados por CONAF.",
          gygQuery: "Magdalena Island penguins Punta Arenas",
        },
        {
          nombre: "Plaza Muñoz Gamero y el centro histórico",
          texto:
            "La plaza central y los edificios que la rodean son Zona Típica desde 1991. En el medio está el monumento a Hernando de Magallanes, una escultura de bronce de unos 10 m inaugurada en 1920 por el cuarto centenario del descubrimiento del Estrecho. Frente a la plaza está el Palacio Sara Braun, Monumento Histórico desde 1981, uno de los palacios que dejó la riqueza de la ganadería ovina de fines del siglo XIX.",
          gygQuery: "Punta Arenas city tour",
        },
        {
          nombre: "Cementerio Municipal Sara Braun",
          texto:
            "Se inauguró en 1894, ocupa 8 hectáreas sobre la Avenida Bulnes, en el norte de la ciudad, y es Monumento Nacional desde 2012. Se recorre por avenidas de cipreses entre los mausoleos de las familias pioneras de Magallanes, y la entrada principal es el pórtico construido entre 1918 y 1923. Abre todos los días de 8 a 19 h.",
        },
        {
          nombre: "Fuerte Bulnes",
          texto:
            "A unos 58 km al sur de la ciudad, en la península de Punta Santa Ana, está el fuerte que levantó en 1843 la expedición llegada desde Ancud, el primer asentamiento chileno en el Estrecho. En 1848 la colonia se mudó a lo que hoy es Punta Arenas. El fuerte se reconstruyó con sus características originales para el centenario: empalizada, foso, blocao, cuarteles y dos baterías de cañones. Es Monumento Histórico desde 1968.",
          gygQuery: "Fuerte Bulnes Punta Arenas",
        },
        {
          nombre: "Reserva Nacional Magallanes",
          texto:
            "Un bosque patagónico de 13.500 hectáreas a solo 7 km al oeste del centro, protegido desde 1932. Tiene senderos fáciles como Los Ñirres (1,1 km, 1 hora) y El Bosque al Alcance de Todos (470 m, apto para personas con movilidad reducida), y otros más largos como Las Lengas (9,3 km, 3 a 5 horas). En invierno la nieve puede cortar el acceso, y se habilitan un sendero para raquetas, áreas de esquí de fondo y de trineos.",
        },
        {
          nombre: "Ballenas jorobadas en el Parque Marino Francisco Coloane",
          texto:
            "Creado en 2003, es el primer parque marino de Chile: 1.506 hectáreas alrededor de la isla Carlos III, en el Estrecho de Magallanes. Protege la única zona de alimentación conocida de la ballena jorobada en el hemisferio sur fuera de aguas antárticas, además de colonias de pingüinos de Magallanes y lobos marinos. Las excursiones salen desde Punta Arenas en temporada de verano.",
          gygQuery: "whale watching Punta Arenas",
        },
        {
          nombre: "Parque Nacional Pali Aike",
          texto:
            "Un paisaje volcánico de 5.030 hectáreas junto a la frontera con Argentina, lleno de cráteres, conos y campos de lava. Se llega por la Ruta 255-CH, la que va al paso Integración Austral, con un desvío hacia Punta Delgada: el camino tiene 168 km de hormigón y 28 km de ripio. El sendero a la Cueva Pali Aike tiene 600 m y 30 minutos; el de la Morada del Diablo, el cráter de la erupción más reciente (hace entre 16.000 y 10.000 años), 7,4 km y casi 3 horas.",
          gygQuery: "Pali Aike National Park",
        },
        {
          nombre: "Museo Nao Victoria y mirador del Cerro de la Cruz",
          texto:
            "El Museo Nao Victoria tiene una réplica a escala real de la nave con la que Magallanes cruzó el Estrecho. El mirador del Cerro de la Cruz es el balcón de la ciudad sobre los techos de colores y el Estrecho. El Museo Regional de Magallanes, en el Palacio Braun Menéndez, está cerrado al público por un proyecto de restauración integral: confirmá su estado antes de ir. Para comer, la especialidad local es el chupe de centolla y el cordero magallánico.",
        },
      ],
      cuandoIr: {
        resumen:
          "La mejor época es de octubre a abril: es la temporada de visitas a Isla Magdalena (de octubre a mediados de abril) y los días tienen entre 14 y 17 horas de luz. El invierno, de junio a agosto, es frío y corto de luz, pero la ciudad y la Reserva Nacional Magallanes se visitan todo el año.",
        temporadas: [
          {
            nombre: "Verano",
            meses: "Diciembre a febrero",
            texto:
              "Máximas de 12 a 13,5 °C, mínimas de 6 a 7 °C y entre 14,5 y casi 17 horas de luz. Es la temporada alta de pingüinos y de navegaciones por el Estrecho, así que conviene reservar las excursiones con anticipación. El viento es fuerte y constante.",
          },
          {
            nombre: "Otoño",
            meses: "Marzo a mayo",
            texto:
              "Las máximas bajan de unos 11,5 °C en marzo a 7 °C en mayo y la luz, de 12,5 a 8,5 horas. Las visitas a Isla Magdalena terminan a mediados de abril.",
          },
          {
            nombre: "Invierno",
            meses: "Junio a agosto",
            texto:
              "Máximas de 4 a 5 °C, mínimas cercanas a 0 °C y unas 8 horas de luz. El sendero de Isla Magdalena cierra, la nieve puede cortar el acceso a la Reserva Nacional Magallanes y ahí se practican raquetas, esquí de fondo y trineo.",
          },
          {
            nombre: "Primavera",
            meses: "Septiembre a noviembre",
            texto:
              "Los días se alargan rápido, de unas 12 horas de luz en septiembre a casi 16 en noviembre, y las máximas suben de 7 a 11 °C. En octubre arranca la temporada de pingüinos.",
          },
        ],
      },
      comoLlegar: [
        {
          modo: "En avión",
          texto:
            "El aeropuerto Presidente Carlos Ibáñez del Campo (PUQ) recibe vuelos directos desde Santiago y conexiones de temporada con Argentina. Está a unos 20 km del centro, con buses, taxis y traslados. Desde Punta Arenas también hay vuelos a Puerto Williams, de alrededor de 1 hora y cuarto.",
        },
        {
          modo: "Desde Puerto Natales y Torres del Paine",
          texto:
            "Son 250 km por la Ruta 9, pavimentada, unas 3 horas en bus interurbano o en auto. Por eso Punta Arenas suele ser el primer o el último punto de un viaje a Torres del Paine.",
        },
        {
          modo: "Desde Argentina",
          texto:
            "Desde Río Gallegos hay buses binacionales que cruzan por el paso Integración Austral (Monte Aymond), sobre la Ruta 255-CH, habilitado para todo tipo de vehículos. Revisá el horario del paso antes de viajar.",
        },
        {
          modo: "Por mar",
          texto:
            "Transbordadora Austral Broom (TABSA) une Punta Arenas con Porvenir, en Tierra del Fuego, desde el terminal Tres Puentes, y también navega hasta Puerto Williams: un viaje de unas 30 horas entre los fiordos del Parque Nacional Alberto de Agostini.",
        },
      ],
      cuantosDias: {
        resumen:
          "Con 3 o 4 días ves el centro, los pingüinos de Isla Magdalena, Fuerte Bulnes y la Reserva Nacional Magallanes. Si vas a Torres del Paine, sumá 4 o 5 días más desde Puerto Natales.",
        itinerario: [
          { dia: "Día 1", texto: "Plaza Muñoz Gamero, Palacio Sara Braun, Cementerio Municipal y atardecer en el Cerro de la Cruz." },
          { dia: "Día 2", texto: "Navegación a Isla Magdalena para ver los pingüinos (de octubre a mediados de abril)." },
          { dia: "Día 3", texto: "Fuerte Bulnes a la mañana y caminata en la Reserva Nacional Magallanes a la tarde." },
          { dia: "Día 4", texto: "Excursión al Parque Nacional Pali Aike o salida en barco a ver ballenas jorobadas." },
        ],
      },
      faq: [
        {
          pregunta: "¿Cuál es la mejor época para ir a Punta Arenas?",
          respuesta:
            "De octubre a abril. Es la temporada de visitas a Isla Magdalena, que va de octubre a mediados de abril, y los días tienen hasta casi 17 horas de luz en diciembre. En invierno las máximas son de 4 a 5 °C y hay unas 8 horas de luz.",
        },
        {
          pregunta: "¿Cuántos días hacen falta en Punta Arenas?",
          respuesta:
            "Entre 3 y 4 días alcanzan para el centro histórico, los pingüinos de Isla Magdalena, Fuerte Bulnes y la Reserva Nacional Magallanes. Si seguís a Torres del Paine, sumá 4 o 5 días desde Puerto Natales.",
        },
        {
          pregunta: "¿Cómo se va a ver los pingüinos de Isla Magdalena?",
          respuesta:
            "En las embarcaciones turísticas que salen del terminal Tres Puentes de Punta Arenas, de octubre a mediados de abril. La isla está 35 km al noreste de la ciudad, la navegación lleva alrededor de 1 hora y media y la visita se hace con guías certificados por CONAF, por un sendero de 1,4 km.",
        },
        {
          pregunta: "¿Cómo ir de Punta Arenas a Torres del Paine?",
          respuesta:
            "Primero hasta Puerto Natales: 250 km por la Ruta 9, unas 3 horas en bus o auto. Desde Natales salen buses hacia las porterías del parque, a unas 2 horas.",
        },
        {
          pregunta: "¿Cómo se cruza de Punta Arenas a Tierra del Fuego?",
          respuesta:
            "En el ferry de Transbordadora Austral Broom (TABSA), que sale del terminal Tres Puentes hacia Porvenir. Hacia Puerto Williams hay vuelos de alrededor de 1 hora y cuarto y un ferry de unas 30 horas.",
        },
        {
          pregunta: "¿Cómo es el clima en Punta Arenas?",
          respuesta:
            "Frío todo el año y con mucho viento. En enero las máximas rondan los 13 °C y las mínimas los 7 °C; en julio, las máximas son de unos 4 °C y las mínimas, cercanas a 0 °C. Conviene llevar ropa en capas, cortaviento e impermeable aun en verano.",
        },
        {
          pregunta: "¿Qué hay para hacer en Punta Arenas?",
          respuesta:
            "Ver los pingüinos de Isla Magdalena, recorrer la Plaza Muñoz Gamero y el Cementerio Municipal, visitar Fuerte Bulnes, caminar por la Reserva Nacional Magallanes, salir a ver ballenas jorobadas al Parque Marino Francisco Coloane y conocer los cráteres del Parque Nacional Pali Aike.",
        },
      ],
    },
    en: {
      metaTitle: "Punta Arenas Travel Guide: Things to Do & Weather",
      metaDescription:
        "Punta Arenas, Chile: things to do, weather by month, best time to visit, how to get there and how long to stay. Magdalena Island penguins, Fuerte Bulnes & the Strait.",
      subtitulo: "Magallanes, Chile · On the Strait of Magellan",
      intro: [
        "Punta Arenas is the capital of Chile's Magallanes and Chilean Antarctica Region and sits on the Strait of Magellan, at the southern tip of Chilean Patagonia. It was founded on December 18, 1848, when the Fuerte Bulnes colony moved to this stretch of coast, and was declared a free port in 1868. The municipality has 132,363 residents (2024 census).",
        "It is the main air gateway to Chilean Patagonia: Presidente Carlos Ibáñez del Campo Airport (PUQ) is about 20 km from downtown, and Puerto Natales, the base for Torres del Paine, is 250 km away on Route 9. Boats leave the city for Magdalena Island, where about 7,000 pairs of Magellanic penguins nest, and ferries cross to Tierra del Fuego.",
        "Downtown keeps the mansions of the sheep-farming boom around Plaza Muñoz Gamero, and the Municipal Cemetery is a National Monument. Penguin season runs from October to mid-April: in January highs are around 13 °C (55 °F) with over 16 hours of daylight; in July highs are about 4 °C (39 °F) with 8 hours of daylight.",
      ],
      datos: [
        { label: "Region", valor: "Magallanes y de la Antártica Chilena, Chile" },
        { label: "Population", valor: "132,363 in the municipality (2024 census)" },
        { label: "Founded", valor: "December 18, 1848" },
        { label: "Airport", valor: "Presidente Carlos Ibáñez del Campo (PUQ), about 20 km from downtown" },
        { label: "Distance to Puerto Natales", valor: "250 km on Route 9" },
        { label: "Recommended stay", valor: "3 to 4 days" },
        { label: "Best time", valor: "Oct–Apr (penguin season)" },
      ],
      queHacer: [
        {
          nombre: "Penguins on Magdalena Island",
          texto:
            "Los Pingüinos Natural Monument, made up of Magdalena and Marta islands, lies 35 km northeast of Punta Arenas in the Strait of Magellan. About 7,000 pairs of Magellanic penguins nest on Magdalena Island, and an easy 1.4 km trail, about 60 minutes, crosses the colony. Marta Island has an imperial cormorant colony and a breeding rookery of South American sea lions and fur seals. It can only be reached on tour boats from the Tres Puentes terminal, a crossing of about 1.5 hours, and is open from October to mid-April, always with CONAF-certified guides.",
          gygQuery: "Magdalena Island penguins Punta Arenas",
        },
        {
          nombre: "Plaza Muñoz Gamero and the historic center",
          texto:
            "The main square and the buildings around it have been a protected historic zone since 1991. At its center stands the Hernando de Magallanes monument, a bronze sculpture about 10 m tall unveiled in 1920 for the 400th anniversary of the discovery of the Strait. Facing the square is the Sara Braun Palace, a Historic Monument since 1981 and one of the mansions built with the wealth of the late 19th-century sheep-farming boom.",
          gygQuery: "Punta Arenas city tour",
        },
        {
          nombre: "Sara Braun Municipal Cemetery",
          texto:
            "Opened in 1894, it covers 8 hectares on Avenida Bulnes, in the north of the city, and has been a National Monument since 2012. You walk along avenues of cypresses between the mausoleums of Magallanes' pioneer families, entering through the gateway built between 1918 and 1923. Open daily from 8 am to 7 pm.",
        },
        {
          nombre: "Fuerte Bulnes",
          texto:
            "About 58 km south of the city, on the Punta Santa Ana peninsula, stands the fort built in 1843 by the expedition from Ancud, the first Chilean settlement on the Strait. In 1848 the colony moved to what is now Punta Arenas. The fort was rebuilt to its original design for its centenary: palisade, moat, blockhouse, barracks and two gun batteries. It has been a Historic Monument since 1968.",
          gygQuery: "Fuerte Bulnes Punta Arenas",
        },
        {
          nombre: "Magallanes National Reserve",
          texto:
            "A 13,500-hectare Patagonian forest just 7 km west of downtown, protected since 1932. It has easy trails such as Los Ñirres (1.1 km, 1 hour) and El Bosque al Alcance de Todos (470 m, accessible for people with reduced mobility), and longer ones such as Las Lengas (9.3 km, 3 to 5 hours). In winter snow can block access, and a snowshoe trail, cross-country ski areas and sledding areas open.",
        },
        {
          nombre: "Humpback whales in Francisco Coloane Marine Park",
          texto:
            "Created in 2003, it is Chile's first marine park: 1,506 hectares around Carlos III Island in the Strait of Magellan. It protects the only known humpback whale feeding ground in the Southern Hemisphere outside Antarctic waters, as well as Magellanic penguin and sea lion colonies. Tours leave from Punta Arenas in the summer season.",
          gygQuery: "whale watching Punta Arenas",
        },
        {
          nombre: "Pali Aike National Park",
          texto:
            "A 5,030-hectare volcanic landscape next to the Argentine border, full of craters, cones and lava fields. It is reached on Route 255-CH, toward the Integración Austral border crossing, with a turnoff to Punta Delgada: the road has 168 km of concrete and 28 km of gravel. The trail to Pali Aike Cave is 600 m and 30 minutes; the Morada del Diablo trail, to the crater of the most recent eruption (16,000 to 10,000 years ago), is 7.4 km and almost 3 hours.",
          gygQuery: "Pali Aike National Park",
        },
        {
          nombre: "Nao Victoria Museum and Cerro de la Cruz viewpoint",
          texto:
            "The Nao Victoria Museum has a full-scale replica of the ship Magellan sailed through the Strait. The Cerro de la Cruz viewpoint looks out over the city's colorful roofs and the Strait. The Magallanes Regional Museum, in the Braun Menéndez Palace, is closed to the public for a full restoration project: check its status before you go. The local specialties are king crab chowder (chupe de centolla) and Magallanes lamb.",
        },
      ],
      cuandoIr: {
        resumen:
          "The best time is October to April: it is the visiting season for Magdalena Island (October to mid-April) and days have 14 to 17 hours of daylight. Winter, June to August, is cold and short on daylight, but the city and the Magallanes National Reserve can be visited year-round.",
        temporadas: [
          {
            nombre: "Summer",
            meses: "December to February",
            texto:
              "Highs of 12–13.5 °C (54–56 °F), lows of 6–7 °C (43–45 °F) and 14.5 to almost 17 hours of daylight. It is peak season for penguins and boat trips on the Strait, so book tours ahead. Expect strong, constant wind.",
          },
          {
            nombre: "Autumn",
            meses: "March to May",
            texto:
              "Highs drop from about 11.5 °C (53 °F) in March to 7 °C (45 °F) in May, and daylight from 12.5 to 8.5 hours. Magdalena Island visits end in mid-April.",
          },
          {
            nombre: "Winter",
            meses: "June to August",
            texto:
              "Highs of 4–5 °C (39–41 °F), lows around 0 °C (32 °F) and about 8 hours of daylight. The Magdalena Island trail closes, snow can block access to the Magallanes National Reserve, and snowshoeing, cross-country skiing and sledding open there.",
          },
          {
            nombre: "Spring",
            meses: "September to November",
            texto:
              "Days lengthen fast, from about 12 hours of daylight in September to almost 16 in November, and highs rise from 7 to 11 °C (45 to 52 °F). Penguin season starts in October.",
          },
        ],
      },
      comoLlegar: [
        {
          modo: "By plane",
          texto:
            "Presidente Carlos Ibáñez del Campo Airport (PUQ) has direct flights from Santiago and seasonal connections to Argentina. It is about 20 km from downtown, served by buses, taxis and shuttles. Flights from Punta Arenas to Puerto Williams take about 1 hour 15 minutes.",
        },
        {
          modo: "From Puerto Natales and Torres del Paine",
          texto:
            "It is 250 km on paved Route 9, about 3 hours by long-distance bus or car. That is why Punta Arenas is often the first or last stop of a Torres del Paine trip.",
        },
        {
          modo: "From Argentina",
          texto:
            "Cross-border buses from Río Gallegos cross at the Integración Austral (Monte Aymond) border post, on Route 255-CH, which is open to all vehicles. Check the crossing's hours before you travel.",
        },
        {
          modo: "By sea",
          texto:
            "Transbordadora Austral Broom (TABSA) links Punta Arenas with Porvenir, in Tierra del Fuego, from the Tres Puentes terminal, and also sails to Puerto Williams: a voyage of about 30 hours through the fjords of Alberto de Agostini National Park.",
        },
      ],
      cuantosDias: {
        resumen:
          "3 or 4 days cover downtown, the Magdalena Island penguins, Fuerte Bulnes and the Magallanes National Reserve. If you are heading to Torres del Paine, add 4 or 5 days from Puerto Natales.",
        itinerario: [
          { dia: "Day 1", texto: "Plaza Muñoz Gamero, the Sara Braun Palace, the Municipal Cemetery and sunset at Cerro de la Cruz." },
          { dia: "Day 2", texto: "Boat trip to Magdalena Island to see the penguins (October to mid-April)." },
          { dia: "Day 3", texto: "Fuerte Bulnes in the morning and a hike in the Magallanes National Reserve in the afternoon." },
          { dia: "Day 4", texto: "Day trip to Pali Aike National Park or a boat trip to see humpback whales." },
        ],
      },
      faq: [
        {
          pregunta: "What is the best time to visit Punta Arenas?",
          respuesta:
            "October to April. It is the visiting season for Magdalena Island, which runs from October to mid-April, and days have up to almost 17 hours of daylight in December. In winter highs are 4–5 °C (39–41 °F) with about 8 hours of daylight.",
        },
        {
          pregunta: "How many days do you need in Punta Arenas?",
          respuesta:
            "3 to 4 days are enough for the historic center, the Magdalena Island penguins, Fuerte Bulnes and the Magallanes National Reserve. If you continue to Torres del Paine, add 4 or 5 days from Puerto Natales.",
        },
        {
          pregunta: "How do you see the penguins on Magdalena Island?",
          respuesta:
            "On tour boats from the Tres Puentes terminal in Punta Arenas, from October to mid-April. The island is 35 km northeast of the city, the crossing takes about 1.5 hours and visits are made with CONAF-certified guides along a 1.4 km trail.",
        },
        {
          pregunta: "How do you get from Punta Arenas to Torres del Paine?",
          respuesta:
            "First to Puerto Natales: 250 km on Route 9, about 3 hours by bus or car. From Natales, buses run to the park entrances, about 2 hours away.",
        },
        {
          pregunta: "How do you get from Punta Arenas to Tierra del Fuego?",
          respuesta:
            "On the Transbordadora Austral Broom (TABSA) ferry from the Tres Puentes terminal to Porvenir. To Puerto Williams there are flights of about 1 hour 15 minutes and a ferry of about 30 hours.",
        },
        {
          pregunta: "What is the weather like in Punta Arenas?",
          respuesta:
            "Cold year-round and very windy. In January highs are around 13 °C (55 °F) and lows 7 °C (45 °F); in July highs are about 4 °C (39 °F) and lows around 0 °C (32 °F). Pack layers, a windbreaker and a waterproof jacket even in summer.",
        },
        {
          pregunta: "Is Punta Arenas worth visiting?",
          respuesta:
            "Yes. Few cities let you walk among about 7,000 pairs of nesting penguins on a half-day trip, see humpback whales in their feeding ground and visit the fort where Chile's first settlement on the Strait of Magellan began, and it is the natural gateway to Torres del Paine and Tierra del Fuego.",
        },
      ],
    },
    fuentes: [
      { label: "Monumento Natural Los Pingüinos (CONAF)", url: "https://www.conaf.cl/parques/monumento-natural-los-pinguinos/" },
      { label: "Reserva Nacional Magallanes (CONAF)", url: "https://www.conaf.cl/parques/reserva-nacional-magallanes/" },
      { label: "Parque Nacional Pali Aike (CONAF)", url: "https://www.conaf.cl/parques/parque-nacional-pali-aike/" },
      { label: "Chile Travel (Sernatur) — Punta Arenas", url: "https://chile.travel/destinos/punta-arenas/" },
      { label: "Chile Travel (Sernatur) — Patrimonio en Punta Arenas", url: "https://chile.travel/itinerarios/historia-y-cultura-en-punta-arenas" },
      { label: "Chile Travel (Sernatur) — Cementerio Municipal de Punta Arenas", url: "https://chile.travel/blog/cementerio-municipal-de-punta-arenas-uno-de-los-mas-bellos-de-chile-2/" },
      { label: "Chile Travel (Sernatur) — Punta Arenas y Puerto Williams", url: "https://chile.travel/en/itineraries/the-south-of-the-world-six-days-in-punta-arenas-and-puerto-williams/" },
      { label: "Consejo de Monumentos Nacionales — Fuerte Bulnes", url: "https://www.monumentos.gob.cl/monumentos/monumentos-historicos/fuerte-bulnes-y-toda-la-peninsula-denominada-punta-santa-ana" },
      { label: "Consejo de Monumentos Nacionales — Plaza Muñoz Gamero", url: "https://www.monumentos.gob.cl/monumentos/zonas-tipicas/plaza-munoz-gamero-y-edificios-que-la-acotan" },
      { label: "Consejo de Monumentos Nacionales — Monumento a Hernando de Magallanes", url: "https://www.monumentos.gob.cl/monumentos/monumentos-publicos/hernando-de-magallanes" },
      { label: "Consejo de Monumentos Nacionales — Palacio Sara Braun", url: "https://www.monumentos.gob.cl/monumentos/monumentos-historicos/inmueble-denominado-palacio-sara-braun" },
      { label: "Memoria Chilena — Punta Arenas y la economía magallánica (1848-1950)", url: "https://www.memoriachilena.gob.cl/602/w3-article-784.html" },
      { label: "Servicio del Patrimonio Cultural — Museo Regional de Magallanes (dic. 2025)", url: "https://www.patrimoniocultural.gob.cl/noticias/museo-regional-de-magallanes-del-serpat-cumple-56-anos" },
      { label: "Sernapesca — Parque Marino Francisco Coloane", url: "https://www.sernapesca.cl/app/uploads/2023/11/ficha_pm_fcocoloane.pdf" },
      { label: "Subpesca — Parques marinos", url: "https://www.subpesca.cl/portal/616/w3-propertyvalue-50958.html" },
      { label: "BCN — Reporte comunal de Punta Arenas (Censo 2024, INE)", url: "https://www.bcn.cl/siit/reportescomunales/comunas_v.html?anno=2025&idcom=12101" },
      { label: "Pasos Fronterizos de Chile — Paso Integración Austral", url: "https://www.pasosfronterizos.gov.cl/complejos-fronterizos/magallanes/paso-integracion-austral/" },
      { label: "Transbordadora Austral Broom (TABSA)", url: "https://www.tabsa.cl/" },
    ],
    relacionados: [
      { tipo: "destino", slug: "puerto-natales" },
      { tipo: "destino", slug: "ushuaia" },
      { tipo: "parque", slug: "alberto-de-agostini" },
      { tipo: "parque", slug: "cabo-de-hornos" },
      { tipo: "fauna", slug: "pinguino-de-magallanes" },
      { tipo: "fauna", slug: "ballena-jorobada" },
      { tipo: "fauna", slug: "lobo-marino-del-sur" },
      { tipo: "gastronomia", slug: "centolla-patagonica" },
      { tipo: "gastronomia", slug: "cordero-patagonico" },
    ],
  },
  {
    slug: "pucon",
    nombre: "Pucón",
    pais: "CL",
    lat: -39.2822,
    lng: -71.9545,
    wikipediaTitle: "Pucón",
    es: {
      metaTitle: "Pucón: Qué Hacer, Clima, Cuándo Ir y Cómo Llegar",
      metaDescription:
        "Guía de Pucón, Chile: volcán Villarrica, Parque Huerquehue, Ojos del Caburgua, termas, rafting en el Trancura, clima mes a mes y cómo llegar desde Santiago.",
      subtitulo: "Región de La Araucanía, Chile · Lago y volcán Villarrica",
      intro: [
        "Pucón es una ciudad de la Región de La Araucanía, en el sur de Chile, a orillas del lago Villarrica y al pie del volcán del mismo nombre. Está a 785 km de Santiago por la Ruta 5 Sur y a unos 90 km del Aeropuerto La Araucanía (ZCO), cerca de Temuco. Según el Censo 2024, la comuna tiene 32.321 habitantes.",
        "El volcán Villarrica (2.847 m) es un estratovolcán activo vigilado por el SERNAGEOMIN, que lo ubica primero en su ranking de riesgo específico de volcanes de Chile. Lo protege el Parque Nacional Villarrica, creado en 1940, con 53.460 ha entre las comunas de Villarrica, Pucón, Curarrehue y Panguipulli. En su ladera norte funciona el Centro de Montaña Pillán, a unos 30 minutos de la ciudad.",
        "Alrededor de Pucón hay lagos, ríos y bosques de araucaria: el Parque Nacional Huerquehue (12.500 ha, creado en 1967), los Ojos del Caburgua, el río Trancura y más de diez centros termales en un radio de 35 km. Los parques Villarrica y Huerquehue forman parte de la Reserva de la Biósfera Araucarias, declarada por la UNESCO en 1983.",
      ],
      datos: [
        { label: "Región", valor: "La Araucanía, Chile" },
        { label: "Población (Censo 2024)", valor: "32.321 hab. (comuna)" },
        { label: "Aeropuerto", valor: "La Araucanía (ZCO), cerca de Temuco" },
        { label: "Santiago – Pucón", valor: "785 km por la Ruta 5 Sur" },
        { label: "Volcán Villarrica", valor: "2.847 m" },
        { label: "PN Villarrica", valor: "Creado en 1940, 53.460 ha" },
        { label: "Días recomendados", valor: "3 a 4" },
        { label: "Mejor época", valor: "Diciembre a marzo" },
      ],
      queHacer: [
        {
          nombre: "Volcán Villarrica y su parque nacional",
          texto:
            "El sector Rucapillán del Parque Nacional Villarrica está a 8 km de Pucón por el camino al volcán, y de ahí sale el ascenso al cráter: CONAF lo registra como un sendero de 3,3 km y 3 horas, de dificultad exigente. Se sube con guía y con un operador registrado en Sernatur, y solo cuando el nivel de alerta del SERNAGEOMIN lo permite: si sube la actividad, el acceso al cráter se cierra. Sin subir a la cumbre, el sendero Mirador Los Cráteres (3,9 km, 2 horas) da vistas del volcán. Según Sernatur, la entrada al parque cuesta $11.000 pesos chilenos (unos US$12) y se compra en Pases Parques.",
          gygQuery: "Villarrica Volcano",
        },
        {
          nombre: "Lago Villarrica, Playa Grande y La Poza",
          texto:
            "La costanera de Pucón une la Playa Grande, de arena oscura de origen volcánico, con La Poza, un embarcadero de aguas tranquilas. En verano el lago se llena de deportes náuticos. El centro se recorre a pie por las avenidas Bernardo O'Higgins y Fresia y la calle Caupolicán, con ferias de artesanía.",
          gygQuery: "Pucon",
        },
        {
          nombre: "Parque Nacional Huerquehue",
          texto:
            "A 35 km de Pucón, protege 12.500 ha de bosques de araucaria y lagunas de altura. Su sendero más conocido, Los Lagos, tiene 10,8 km de ida y lleva unas 4 horas, con dificultad media. Se llega por el camino a Caburgua y el desvío a Paillaco; los últimos 8 km son de ripio. Tiene camping con 22 sitios que se asignan por orden de llegada, sin reserva. De junio a septiembre hay nieve en los senderos.",
          gygQuery: "Huerquehue",
        },
        {
          nombre: "Ojos del Caburgua",
          texto:
            "A 20 km del centro de Pucón por la Ruta S-199 hacia Caburgua, son cascadas formadas por agua subterránea que aflora desde el lago Caburgua. Se recorren por senderos y pasarelas de madera hasta la Laguna Azul. La entrada se paga en el lugar.",
          gygQuery: "Ojos del Caburgua",
        },
        {
          nombre: "Termas cerca de Pucón",
          texto:
            "Hay más de diez centros termales en un radio de 35 km. Algunos: las Termas de Huife, con tres piscinas al aire libre de 38 a 40 °C; Quimey-Co, de 36 a 43 °C, declaradas Fuente Curativa en 2014; Menetúe, con alojamiento y spa; y el Parque Termal Botánico, con 10 piscinas de 35 a 41 °C. Las Termas Geométricas, con sus pasarelas rojas, quedan a 82 km, casi dos horas en auto.",
          gygQuery: "Pucon hot springs",
        },
        {
          nombre: "Rafting en el río Trancura",
          texto:
            "A unos 50 minutos de Pucón, el Trancura tiene rápidos de grado II, III y IV. También se hace kayak e hidrospeed. Según Sernatur, el rafting cuesta desde unos $25.000 pesos chilenos por persona (US$27), según el operador, el tramo y la temporada. Elegí un operador registrado en Sernatur.",
          gygQuery: "Trancura rafting",
        },
        {
          nombre: "Curarrehue y la cultura mapuche",
          texto:
            "Curarrehue (Kurarewe) está a 40 km de Pucón, camino al Paso Mamuil Malal. Ahí la red Rutas Ancestrales Araucarias ofrece experiencias de la cultura mapuche-pehuenche, con programas de un día a ocho días.",
        },
        {
          nombre: "Esquí en el volcán",
          texto:
            "En invierno, el Centro de Montaña Pillán, dentro del Parque Nacional Villarrica y a unos 30 minutos de Pucón, es uno de los pocos centros de ski del mundo sobre un volcán activo. Tiene andariveles, escuela y pistas con vista al lago Villarrica. Para subir, las cadenas son obligatorias: conviene ir en 4x4.",
        },
      ],
      cuandoIr: {
        resumen:
          "Diciembre a marzo es la mejor época y la temporada alta: hay deportes náuticos en el lago, rafting en el Trancura y todos los senderos de los parques abiertos. En invierno se esquía en el volcán y se combinan la nieve y las termas, el plan que propone Sernatur para el otoño y el invierno.",
        temporadas: [
          {
            nombre: "Verano",
            meses: "Diciembre a febrero",
            texto:
              "Temporada alta: Playa Grande, kayak y deportes náuticos en el lago Villarrica, rafting y senderos en Huerquehue y en el Parque Nacional Villarrica. CONAF advierte que en el sendero al cráter del Villarrica hay riesgo de caída de rocas de diciembre a abril.",
          },
          {
            nombre: "Otoño",
            meses: "Marzo a mayo",
            texto:
              "Hay menos visitantes que en verano y el ambiente es más tranquilo. Es buena época para caminar y para las termas.",
          },
          {
            nombre: "Invierno",
            meses: "Junio a agosto",
            texto:
              "Temporada de esquí en el Centro de Montaña Pillán. Hace frío, llueve y nieva en altura: las cadenas son obligatorias para subir al centro de ski y a los parques. En Huerquehue hay nieve en los senderos de junio a septiembre.",
          },
          {
            nombre: "Primavera",
            meses: "Septiembre a noviembre",
            texto:
              "Los días se alargan antes del verano. Algunos senderos de altura de Huerquehue y del Parque Nacional Villarrica siguen cerrados hasta diciembre: revisá el estado de cada uno en CONAF antes de ir.",
          },
        ],
      },
      comoLlegar: [
        {
          modo: "En avión",
          texto:
            "El vuelo de Santiago al Aeropuerto La Araucanía (ZCO), cerca de Temuco, dura alrededor de 1 h 20 min. Desde ahí son unos 90 km hasta Pucón, cerca de una hora y media en auto.",
        },
        {
          modo: "En auto o bus desde Santiago",
          texto:
            "Son 785 km por la Ruta 5 Sur, unas 8 a 9 horas de manejo. También hay buses interurbanos entre Santiago y Pucón.",
        },
        {
          modo: "Desde Argentina",
          texto:
            "Por el Paso Mamuil Malal (1.210 m), por la Ruta 199-CH, pasando por Curarrehue. Del lado argentino conecta con la provincia del Neuquén. Está habilitado solo para vehículos menores y buses: revisá el horario y el estado del paso en Pasos Fronterizos antes de salir.",
        },
      ],
      cuantosDias: {
        resumen:
          "Con 3 días ves Pucón y el lago, el Parque Nacional Villarrica y Huerquehue. Con 4 sumás rafting en el Trancura y Curarrehue, o un día de termas.",
        itinerario: [
          { dia: "Día 1", texto: "Centro de Pucón, Playa Grande y La Poza a la mañana; Ojos del Caburgua a la tarde." },
          { dia: "Día 2", texto: "Parque Nacional Villarrica: ascenso al cráter con guía, si la alerta lo permite, o sendero Mirador Los Cráteres. Termas a la vuelta." },
          { dia: "Día 3", texto: "Parque Nacional Huerquehue: sendero Los Lagos (10,8 km de ida)." },
          { dia: "Día 4", texto: "Rafting en el río Trancura y visita a Curarrehue." },
        ],
      },
      faq: [
        {
          pregunta: "¿Dónde queda Pucón?",
          respuesta:
            "En la Región de La Araucanía, en el sur de Chile, a orillas del lago Villarrica y al pie del volcán Villarrica. Está a 785 km de Santiago y a unos 90 km del Aeropuerto La Araucanía, cerca de Temuco.",
        },
        {
          pregunta: "¿Se puede subir al volcán Villarrica?",
          respuesta:
            "Sí, con guía y con un operador registrado en Sernatur, y solo si el nivel de alerta del SERNAGEOMIN lo permite. El ascenso sale del sector Rucapillán del Parque Nacional Villarrica; CONAF registra el sendero al cráter con 3,3 km y 3 horas, de dificultad exigente.",
        },
        {
          pregunta: "¿Cuánto cuesta la entrada al Parque Nacional Villarrica?",
          respuesta:
            "Según Sernatur, $11.000 pesos chilenos (unos US$12). Las entradas se compran en Pases Parques, el sistema oficial de CONAF, donde también están los horarios y el estado de los senderos.",
        },
        {
          pregunta: "¿Cómo llegar a Pucón desde Santiago?",
          respuesta:
            "En avión hasta el Aeropuerto La Araucanía (ZCO), cerca de Temuco (alrededor de 1 h 20 min), y después unos 90 km por tierra. En auto son 785 km por la Ruta 5 Sur, de 8 a 9 horas, y también hay buses interurbanos.",
        },
        {
          pregunta: "¿Cómo ir de Pucón a Argentina?",
          respuesta:
            "Por el Paso Mamuil Malal, por la Ruta 199-CH pasando por Curarrehue, hacia la provincia del Neuquén. Está habilitado solo para vehículos menores y buses; el horario y el estado se publican en Pasos Fronterizos.",
        },
        {
          pregunta: "¿Qué termas hay cerca de Pucón?",
          respuesta:
            "Más de diez en un radio de 35 km, entre ellas Huife, Quimey-Co, Menetúe y el Parque Termal Botánico. Las Termas Geométricas quedan a 82 km, casi dos horas en auto.",
        },
        {
          pregunta: "¿Cuántos días hacen falta en Pucón?",
          respuesta:
            "Al menos 3 días: uno para Pucón, el lago y los Ojos del Caburgua, uno para el volcán Villarrica y uno para el Parque Nacional Huerquehue. Con 4 días sumás rafting en el Trancura y Curarrehue.",
        },
        {
          pregunta: "¿Cuál es la mejor época para ir a Pucón?",
          respuesta:
            "De diciembre a marzo, cuando funcionan las actividades en el lago, el rafting y los senderos de altura. En invierno se esquía en el Centro de Montaña Pillán y las termas son el plan principal.",
        },
      ],
    },
    en: {
      metaTitle: "Pucón Travel Guide: Things to Do & Best Time, Chile",
      metaDescription:
        "Pucón, Chile: Villarrica Volcano, Huerquehue National Park, Ojos del Caburgua, hot springs, Trancura River rafting, weather by month and how to get there.",
      subtitulo: "La Araucanía Region, Chile · Lake and Volcano Villarrica",
      intro: [
        "Pucón is a town in Chile's La Araucanía Region, in the south of the country, on the shore of Lake Villarrica and at the foot of the volcano of the same name. It lies 785 km from Santiago on Route 5 South and about 90 km from La Araucanía Airport (ZCO), near Temuco. According to the 2024 Census, the commune has 32,321 inhabitants.",
        "Villarrica Volcano (2,847 m) is an active stratovolcano monitored by SERNAGEOMIN, which ranks it first in its specific-risk ranking of Chile's volcanoes. It is protected by Villarrica National Park, created in 1940, covering 53,460 ha across the communes of Villarrica, Pucón, Curarrehue and Panguipulli. The Pillán Mountain Center runs on its northern slope, about 30 minutes from town.",
        "Around Pucón there are lakes, rivers and araucaria forests: Huerquehue National Park (12,500 ha, created in 1967), Ojos del Caburgua, the Trancura River and more than ten hot springs within a 35 km radius. Villarrica and Huerquehue national parks are part of the Araucarias Biosphere Reserve, declared by UNESCO in 1983.",
      ],
      datos: [
        { label: "Region", valor: "La Araucanía, Chile" },
        { label: "Population (2024 Census)", valor: "32,321 (commune)" },
        { label: "Airport", valor: "La Araucanía (ZCO), near Temuco" },
        { label: "Santiago – Pucón", valor: "785 km on Route 5 South" },
        { label: "Villarrica Volcano", valor: "2,847 m" },
        { label: "Villarrica NP", valor: "Created 1940, 53,460 ha" },
        { label: "Recommended stay", valor: "3 to 4 days" },
        { label: "Best time", valor: "December to March" },
      ],
      queHacer: [
        {
          nombre: "Villarrica Volcano and its national park",
          texto:
            "The Rucapillán sector of Villarrica National Park is 8 km from Pucón on the volcano road, and the crater climb starts there: CONAF lists it as a 3.3 km, 3-hour trail rated demanding. You climb with a guide and a Sernatur-registered operator, and only when SERNAGEOMIN's alert level allows it: if activity rises, crater access is closed. Without going to the summit, the Mirador Los Cráteres trail (3.9 km, 2 hours) offers views of the volcano. According to Sernatur, park entry costs 11,000 Chilean pesos (about US$12) and is sold through Pases Parques.",
          gygQuery: "Villarrica Volcano",
        },
        {
          nombre: "Lake Villarrica, Playa Grande and La Poza",
          texto:
            "Pucón's waterfront links Playa Grande, a beach of dark volcanic sand, with La Poza, a calm-water boat landing. In summer the lake fills with water sports. The town center is walkable along Bernardo O'Higgins and Fresia avenues and Caupolicán street, with crafts fairs.",
          gygQuery: "Pucon",
        },
        {
          nombre: "Huerquehue National Park",
          texto:
            "35 km from Pucón, it protects 12,500 ha of araucaria forest and high lagoons. Its best-known trail, Los Lagos, is 10.8 km one way and takes about 4 hours, rated medium. Access is via the Caburgua road and the turnoff to Paillaco; the last 8 km are gravel. It has a campground with 22 sites assigned first come, first served, with no reservations. From June to September there is snow on the trails.",
          gygQuery: "Huerquehue",
        },
        {
          nombre: "Ojos del Caburgua",
          texto:
            "20 km from central Pucón on Route S-199 toward Caburgua, these waterfalls are fed by groundwater surfacing from Lake Caburgua. Trails and wooden walkways lead to the Laguna Azul. The entrance fee is paid on site.",
          gygQuery: "Ojos del Caburgua",
        },
        {
          nombre: "Hot springs near Pucón",
          texto:
            "There are more than ten hot springs within a 35 km radius. Some of them: Termas de Huife, with three outdoor pools at 38 to 40 °C; Quimey-Co, at 36 to 43 °C, declared a Healing Spring in 2014; Menetúe, with lodging and a spa; and Parque Termal Botánico, with 10 pools at 35 to 41 °C. Termas Geométricas, with its red walkways, is 82 km away, almost two hours by car.",
          gygQuery: "Pucon hot springs",
        },
        {
          nombre: "Rafting on the Trancura River",
          texto:
            "About 50 minutes from Pucón, the Trancura has class II, III and IV rapids. Kayaking and hydrospeed are also on offer. According to Sernatur, rafting starts at about 25,000 Chilean pesos per person (US$27), depending on the operator, the section and the season. Pick an operator registered with Sernatur.",
          gygQuery: "Trancura rafting",
        },
        {
          nombre: "Curarrehue and Mapuche culture",
          texto:
            "Curarrehue (Kurarewe) is 40 km from Pucón, on the road to the Mamuil Malal Pass. There, the Rutas Ancestrales Araucarias network offers Mapuche-Pehuenche cultural experiences, with programs from one to eight days.",
        },
        {
          nombre: "Skiing on the volcano",
          texto:
            "In winter, the Pillán Mountain Center, inside Villarrica National Park and about 30 minutes from Pucón, is one of the few ski areas in the world on an active volcano. It has lifts, a ski school and runs with views of Lake Villarrica. Snow chains are mandatory on the way up: a 4x4 is the best option.",
        },
      ],
      cuandoIr: {
        resumen:
          "December to March is the best time and the high season: water sports on the lake, rafting on the Trancura and every park trail open. In winter you can ski on the volcano and combine snow with hot springs, the plan Sernatur suggests for autumn and winter.",
        temporadas: [
          {
            nombre: "Summer",
            meses: "December to February",
            texto:
              "High season: Playa Grande, kayaking and water sports on Lake Villarrica, rafting, and trails in Huerquehue and Villarrica national parks. CONAF warns of rockfall risk on the Villarrica crater trail from December to April.",
          },
          {
            nombre: "Autumn",
            meses: "March to May",
            texto:
              "There are fewer visitors than in summer and a quieter feel. It's a good time for hiking and hot springs.",
          },
          {
            nombre: "Winter",
            meses: "June to August",
            texto:
              "Ski season at the Pillán Mountain Center. It's cold and rainy, with snow higher up: chains are mandatory to drive up to the ski center and the parks. Huerquehue's trails have snow from June to September.",
          },
          {
            nombre: "Spring",
            meses: "September to November",
            texto:
              "Days get longer ahead of summer. Some high trails in Huerquehue and Villarrica national parks stay closed until December: check each one's status with CONAF before you go.",
          },
        ],
      },
      comoLlegar: [
        {
          modo: "By plane",
          texto:
            "The flight from Santiago to La Araucanía Airport (ZCO), near Temuco, takes about 1 h 20 min. From there it's about 90 km to Pucón, roughly an hour and a half by car.",
        },
        {
          modo: "By car or bus from Santiago",
          texto:
            "It's 785 km on Route 5 South, about 8 to 9 hours of driving. Intercity buses also run between Santiago and Pucón.",
        },
        {
          modo: "From Argentina",
          texto:
            "Via the Mamuil Malal Pass (1,210 m), on Route 199-CH through Curarrehue. On the Argentine side it connects with Neuquén Province. It's open to cars and buses only: check the pass hours and status on Pasos Fronterizos before you go.",
        },
      ],
      cuantosDias: {
        resumen:
          "3 days cover Pucón and the lake, Villarrica National Park and Huerquehue. With 4 you can add Trancura rafting and Curarrehue, or a hot springs day.",
        itinerario: [
          { dia: "Day 1", texto: "Pucón town center, Playa Grande and La Poza in the morning; Ojos del Caburgua in the afternoon." },
          { dia: "Day 2", texto: "Villarrica National Park: guided crater climb, if the alert level allows it, or the Mirador Los Cráteres trail. Hot springs on the way back." },
          { dia: "Day 3", texto: "Huerquehue National Park: Los Lagos trail (10.8 km one way)." },
          { dia: "Day 4", texto: "Rafting on the Trancura River and a visit to Curarrehue." },
        ],
      },
      faq: [
        {
          pregunta: "Where is Pucón?",
          respuesta:
            "In Chile's La Araucanía Region, on the shore of Lake Villarrica and at the foot of Villarrica Volcano. It's 785 km from Santiago and about 90 km from La Araucanía Airport, near Temuco.",
        },
        {
          pregunta: "Can you climb Villarrica Volcano?",
          respuesta:
            "Yes, with a guide and a Sernatur-registered operator, and only if SERNAGEOMIN's alert level allows it. The climb starts from the Rucapillán sector of Villarrica National Park; CONAF lists the crater trail at 3.3 km and 3 hours, rated demanding.",
        },
        {
          pregunta: "How much is the entrance fee for Villarrica National Park?",
          respuesta:
            "According to Sernatur, 11,000 Chilean pesos (about US$12). Tickets are sold through Pases Parques, CONAF's official system, which also lists opening hours and trail status.",
        },
        {
          pregunta: "How do you get to Pucón from Santiago?",
          respuesta:
            "Fly to La Araucanía Airport (ZCO), near Temuco (about 1 h 20 min), then drive about 90 km. By car it's 785 km on Route 5 South, 8 to 9 hours, and there are also intercity buses.",
        },
        {
          pregunta: "How do you get from Pucón to Argentina?",
          respuesta:
            "Via the Mamuil Malal Pass, on Route 199-CH through Curarrehue, into Neuquén Province. It's open to cars and buses only; hours and status are published on Pasos Fronterizos.",
        },
        {
          pregunta: "What hot springs are near Pucón?",
          respuesta:
            "More than ten within a 35 km radius, including Huife, Quimey-Co, Menetúe and Parque Termal Botánico. Termas Geométricas is 82 km away, almost two hours by car.",
        },
        {
          pregunta: "How many days do you need in Pucón?",
          respuesta:
            "At least 3 days: one for Pucón, the lake and Ojos del Caburgua, one for Villarrica Volcano and one for Huerquehue National Park. With 4 days you can add Trancura rafting and Curarrehue.",
        },
        {
          pregunta: "What is the best time to visit Pucón?",
          respuesta:
            "December to March, when lake activities, rafting and the high trails are all running. In winter you can ski at the Pillán Mountain Center, and hot springs are the main plan.",
        },
      ],
    },
    fuentes: [
      { label: "Qué hacer en Pucón — Chile.travel (Sernatur)", url: "https://chile.travel/?p=103409" },
      { label: "Villarrica y Pucón — Chile.travel (Sernatur)", url: "https://chile.travel/en/destinations/villarrica-and-pucon/" },
      { label: "Pucón en invierno: nieve, termas y aventura — Chile.travel (Sernatur)", url: "https://chile.travel/itinerarios/pucon-en-invierno-5-dias-de-nieve-termas-y-aventura/" },
      { label: "Ruta de aguas termales desde Pucón — Chile.travel (Sernatur)", url: "https://chile.travel/en/?p=78784" },
      { label: "Parque Nacional Villarrica — CONAF", url: "https://www.conaf.cl/parques/parque-nacional-villarrica/" },
      { label: "Parque Nacional Huerquehue — CONAF", url: "https://www.conaf.cl/parques/parque-nacional-huerquehue/" },
      { label: "Pases Parques — venta oficial de entradas (CONAF)", url: "https://www.pasesparques.cl/" },
      { label: "Volcán Villarrica — SERNAGEOMIN, Red Nacional de Vigilancia Volcánica", url: "https://rnvv.sernageomin.cl/volcan-villarrica/" },
      { label: "Ranking de riesgo específico de volcanes activos de Chile — SERNAGEOMIN", url: "https://rnvv.sernageomin.cl/ranking-de-riesgo-especifico-de-volcanes-activos-de-chile/" },
      { label: "Paso Mamuil Malal — Pasos Fronterizos de Chile", url: "https://www.pasosfronterizos.gov.cl/complejos-fronterizos/araucania/paso-mamuil-malal/" },
      { label: "Reporte comunal de Pucón (Censo 2024) — BCN", url: "https://www.bcn.cl/siit/reportescomunales/comunas_v.html?idcom=9115" },
    ],
    relacionados: [
      { tipo: "volcan", slug: "villarrica" },
      { tipo: "volcan", slug: "lanin" },
      { tipo: "termas", slug: "huife" },
      { tipo: "termas", slug: "pucon-indomito" },
      { tipo: "termas", slug: "geometricas" },
      { tipo: "gastronomia", slug: "comprar-merken-en-la-patagonia" },
      { tipo: "destino", slug: "puerto-varas" },
    ],
  },
  {
    slug: "chiloe",
    nombre: "Chiloé",
    pais: "CL",
    lat: -42.4808,
    lng: -73.7627,
    wikipediaTitle: "Isla Grande de Chiloé",
    es: {
      metaTitle: "Chiloé: Qué Hacer, Clima, Cuándo Ir y Cómo Llegar",
      metaDescription:
        "Guía de Chiloé, Chile: iglesias Patrimonio de la Humanidad, palafitos de Castro, pingüinos de Puñihuil, Parque Nacional Chiloé, clima mes a mes y cómo llegar.",
      subtitulo: "Región de Los Lagos, Chile · Castro, Ancud y Dalcahue",
      intro: [
        "Chiloé es un archipiélago de la Región de Los Lagos, en el sur de Chile, al sur de Puerto Montt. Su isla principal, la Isla Grande de Chiloé, se separa del continente por el Canal de Chacao, que se cruza en transbordador desde Pargua, a 60 km de Puerto Montt. Sus ciudades más grandes son Castro, la capital provincial, con 46.997 habitantes, y Ancud, con 40.949, según el Censo 2024.",
        "En el archipiélago hay más de 80 iglesias históricas de madera, y 16 de ellas fueron declaradas Patrimonio de la Humanidad por la UNESCO en el año 2000. La de Santa María de Loreto, en Achao, construida hacia 1740 por misioneros jesuitas, es la más antigua que sigue en pie. Castro suma los palafitos, casas de colores construidas sobre pilotes en el agua.",
        "En la costa del Pacífico, el Parque Nacional Chiloé protege 42.567 ha de bosque siempreverde desde 1982, y frente a Ancud están los Islotes de Puñihuil, uno de los pocos lugares del mundo donde anidan juntos el pingüino de Humboldt y el de Magallanes. La cocina chilota, con el curanto en hoyo y el milcao, es parte del viaje.",
      ],
      datos: [
        { label: "Región", valor: "Los Lagos, Chile" },
        { label: "Población (Censo 2024)", valor: "Castro 46.997 · Ancud 40.949 hab." },
        { label: "Aeródromo", valor: "Mocopulli (MHC), entre Castro y Dalcahue" },
        { label: "Santiago – Chiloé", valor: "1.100 km por la Ruta 5 Sur" },
        { label: "Cruce a la isla", valor: "Transbordador Pargua – Chacao" },
        { label: "Iglesias UNESCO", valor: "16, declaradas en 2000" },
        { label: "Días recomendados", valor: "3 a 5" },
        { label: "Mejor época", valor: "Noviembre a marzo" },
      ],
      queHacer: [
        {
          nombre: "Castro y sus palafitos",
          texto:
            "Castro es la capital de la provincia y el mejor punto para recorrer la isla. Su Iglesia de San Francisco, construida en 1910 con alerce, ciprés, coigüe, raulí y olivillo, es Monumento Nacional desde 1979 y Patrimonio de la Humanidad desde 2000. Los palafitos se ven desde arriba en el Mirador Gamboa o desde el agua, en los paseos en lancha que salen del puerto, sobre todo al atardecer. A 5 km está la iglesia de Nercón, levantada sin clavos de metal.",
          gygQuery: "Castro Chiloe",
        },
        {
          nombre: "Ruta de las iglesias Patrimonio de la Humanidad",
          texto:
            "Las 16 iglesias declaradas por la UNESCO están en Castro, Nercón, Rilán, Dalcahue, Tenaún, Colo, San Juan, Chonchi, Vilupulli, Achao, Quinchao, Caguach, Chelín, Ichuac, Aldachildo y Detif. Sernatur propone recorrer nueve en 3 días y 142 km, desde Colo (a 70 km de Castro) hasta Chonchi, con su cielo abovedado de estrellas. La de Vilupulli, a 15 km de Castro, tiene la torre más alta y esbelta del archipiélago. Varias siguen siendo templos activos: revisá los horarios antes de ir.",
          gygQuery: "Chiloe churches",
        },
        {
          nombre: "Pingüinos en los Islotes de Puñihuil",
          texto:
            "El Monumento Natural Islotes de Puñihuil, administrado por CONAF, son tres islotes frente a la caleta de Puñihuil, en la comuna de Ancud. Ahí anidan el pingüino de Humboldt y el de Magallanes, y también se ve el chungungo o nutria de mar. Los islotes se recorren en bote, en paseos de 30 minutos que salen de la caleta; no se puede desembarcar. Se llega por la Ruta W-20 entre Ancud y Pumillahue (23 km) y un desvío de unos 3 km hasta la playa.",
          gygQuery: "Punihuil penguins",
        },
        {
          nombre: "Dalcahue, su feria y la isla Quinchao",
          texto:
            "A 25 km de Castro, Dalcahue tiene una feria artesanal a la que llegan en bote artesanos de las islas, dos veces por semana, con tejidos de lana, cestería y tallados en madera nativa. Su iglesia, de 1849, tiene una torre de 26 m. Desde la rampa de Dalcahue, un transbordador cruza en pocos minutos a la isla Quinchao, la segunda más grande del archipiélago, con las iglesias de Achao y Quinchao.",
          gygQuery: "Dalcahue",
        },
        {
          nombre: "Parque Nacional Chiloé (Cucao)",
          texto:
            "El acceso más visitado es el sector Cucao-Chanquín: desde Castro, Ruta 5 al sur hasta el cruce Notuco (24 km) y después 34,5 km hasta Cucao, alrededor de 90 minutos, con transporte público. Ahí hay un sendero elevado de unos 200 m con mirador al lago Cucao, dunas costeras y camping de la comunidad indígena de Chanquín. Desde Ancud se llega al sector Chepu, donde un sendero costero de 14 km (unas 5 horas) va de Puerto Anguay al río Lar. CONAF avisa que las playas del Pacífico no son aptas para nadar.",
          gygQuery: "Chiloe National Park",
        },
        {
          nombre: "Muelle de las Almas",
          texto:
            "En la comuna de Chonchi, sobre la costa del Pacífico, es un muelle de madera construido como prolongación de un acantilado. Recuerda la leyenda chilota del balsero Tempilkahue, que lleva a las almas a su descanso eterno. Se llega desde Chonchi y es uno de los lugares más fotografiados de la isla.",
        },
        {
          nombre: "Isla Aucar, Putemún y Tantauco",
          texto:
            "En Quemchi, la isla Aucar se alcanza por una pasarela de más de 430 m. Cerca de Castro, el humedal de Putemún se recorre en kayak, con flamencos. Al sur, el Parque Tantauco, un área protegida privada, tiene el Sendero del Bosque Hundido. Para Chepu y Tantauco conviene tener vehículo propio.",
        },
        {
          nombre: "Curanto, milcao y cocina chilota",
          texto:
            "El curanto en hoyo cocina mariscos, carnes ahumadas y longanizas bajo tierra, sobre piedras calientes, y se acompaña con milcao y chapalele, panes de papa. El milcao es un pan frito de papa nativa relleno de chicharrones. En la feria de Dalcahue hay cocinerías con curanto, cazuela y pescado.",
          gygQuery: "Chiloe food tour",
        },
      ],
      cuandoIr: {
        resumen:
          "Se puede ir todo el año, pero noviembre a marzo es la mejor época para el Parque Nacional Chiloé y los paseos al aire libre, según CONAF. El clima es oceánico, lluvioso y cambiante en cualquier mes: llevá ropa impermeable y abrigo.",
        temporadas: [
          {
            nombre: "Verano",
            meses: "Diciembre a febrero",
            texto:
              "Temporada alta: días largos, paseos en bote en Puñihuil, senderos del Parque Nacional Chiloé y ferias costumbristas. Aun en verano puede llover.",
          },
          {
            nombre: "Otoño",
            meses: "Marzo a mayo",
            texto:
              "Marzo todavía entra en la mejor época del parque. Después hay menos visitantes y más lluvia; las iglesias y las ferias siguen abiertas.",
          },
          {
            nombre: "Invierno",
            meses: "Junio a agosto",
            texto:
              "Es la época más lluviosa y de días más cortos. Los paseos en bote en Puñihuil tienen horario de invierno, hasta las 17:30. Buen momento para la ruta de las iglesias y la cocina chilota.",
          },
          {
            nombre: "Primavera",
            meses: "Septiembre a noviembre",
            texto:
              "Los días se alargan y desde noviembre empieza la mejor época para el Parque Nacional Chiloé. El clima sigue cambiante: llevá capas e impermeable.",
          },
        ],
      },
      comoLlegar: [
        {
          modo: "En avión",
          texto:
            "Hay vuelos desde Santiago al aeródromo Mocopulli (MHC), entre Castro y Dalcahue, de unas 2 horas. La otra opción es volar al aeropuerto El Tepual (PMC), en Puerto Montt, y seguir por tierra hasta Pargua para cruzar el Canal de Chacao.",
        },
        {
          modo: "En auto o bus desde Puerto Montt",
          texto:
            "Pargua está a 60 km de Puerto Montt. Ahí se cruza el Canal de Chacao en transbordador hasta Chacao, en la Isla Grande, y la Ruta 5 sigue hacia Ancud y Castro.",
        },
        {
          modo: "Desde Santiago por tierra",
          texto:
            "Son 1.100 km por la Ruta 5 Sur, unas 12 horas de manejo sin paradas. En bus, el viaje a Castro lleva unas 14 horas, con el cruce del canal incluido.",
        },
      ],
      cuantosDias: {
        resumen:
          "Con 3 días ves Castro, Dalcahue, algunas iglesias y el Parque Nacional Chiloé. Con 4 o 5 sumás los pingüinos de Puñihuil, la isla Quinchao y Chonchi.",
        itinerario: [
          { dia: "Día 1", texto: "Castro: Iglesia de San Francisco, palafitos desde el Mirador Gamboa y paseo en lancha al atardecer; iglesia de Nercón." },
          { dia: "Día 2", texto: "Parque Nacional Chiloé en Cucao: sendero elevado de Chanquín y dunas. A la vuelta, Vilupulli, Chonchi y el Muelle de las Almas." },
          { dia: "Día 3", texto: "Dalcahue y su feria, transbordador a Quinchao e iglesia de Achao." },
          { dia: "Día 4", texto: "Ancud y los pingüinos de los Islotes de Puñihuil en bote." },
          { dia: "Día 5", texto: "Iglesias del norte (Tenaún, Colo, San Juan) o isla Aucar en Quemchi." },
        ],
      },
      faq: [
        {
          pregunta: "¿Dónde queda Chiloé?",
          respuesta:
            "En la Región de Los Lagos, en el sur de Chile, al sur de Puerto Montt. La Isla Grande de Chiloé se separa del continente por el Canal de Chacao, que se cruza en transbordador desde Pargua, a 60 km de Puerto Montt.",
        },
        {
          pregunta: "¿Cómo llegar a Chiloé?",
          respuesta:
            "En avión desde Santiago al aeródromo Mocopulli (MHC), entre Castro y Dalcahue, unas 2 horas. Por tierra, hasta Pargua y en transbordador por el Canal de Chacao. Desde Santiago son 1.100 km por la Ruta 5 Sur; en bus, unas 14 horas hasta Castro.",
        },
        {
          pregunta: "¿Cuántas iglesias de Chiloé son Patrimonio de la Humanidad?",
          respuesta:
            "16, declaradas por la UNESCO en el año 2000, entre más de 80 iglesias históricas de madera del archipiélago. La más antigua en pie es la de Achao, de alrededor de 1740.",
        },
        {
          pregunta: "¿Dónde ver pingüinos en Chiloé?",
          respuesta:
            "En el Monumento Natural Islotes de Puñihuil, en la comuna de Ancud, donde anidan el pingüino de Humboldt y el de Magallanes. Se ven desde el bote, en paseos de 30 minutos que salen de la caleta de Puñihuil; no se puede desembarcar en los islotes.",
        },
        {
          pregunta: "¿Cómo llegar al Parque Nacional Chiloé desde Castro?",
          respuesta:
            "Por la Ruta 5 al sur hasta el cruce Notuco (24 km) y después 34,5 km hasta Cucao, alrededor de 90 minutos. Hay transporte público a Cucao.",
        },
        {
          pregunta: "¿Cuántos días hacen falta en Chiloé?",
          respuesta:
            "Al menos 3: Castro, el Parque Nacional Chiloé y Dalcahue con la isla Quinchao. Con 4 o 5 días sumás los pingüinos de Puñihuil y las iglesias del norte de la isla.",
        },
        {
          pregunta: "¿Cuál es la mejor época para ir a Chiloé?",
          respuesta:
            "De noviembre a marzo, según CONAF, para el Parque Nacional Chiloé. Igual se puede ir todo el año: el clima es lluvioso y cambiante en cualquier estación, así que hace falta ropa impermeable.",
        },
        {
          pregunta: "¿Qué comer en Chiloé?",
          respuesta:
            "Curanto en hoyo (mariscos y carnes cocidos bajo tierra sobre piedras calientes), milcao y chapalele, panes de papa. En la feria de Dalcahue hay cocinerías con curanto y cazuela.",
        },
      ],
    },
    en: {
      metaTitle: "Chiloé Travel Guide: Things to Do & Best Time, Chile",
      metaDescription:
        "Chiloé, Chile: UNESCO wooden churches, Castro's stilt houses, Puñihuil penguins, Chiloé National Park, weather by month and how to get to the island.",
      subtitulo: "Los Lagos Region, Chile · Castro, Ancud and Dalcahue",
      intro: [
        "Chiloé is an archipelago in Chile's Los Lagos Region, south of Puerto Montt. Its main island, Isla Grande de Chiloé, is separated from the mainland by the Chacao Channel, crossed by ferry from Pargua, 60 km from Puerto Montt. Its largest towns are Castro, the provincial capital, with 46,997 inhabitants, and Ancud, with 40,949, according to the 2024 Census.",
        "The archipelago has more than 80 historic wooden churches, and 16 of them were declared UNESCO World Heritage Sites in 2000. Santa María de Loreto in Achao, built around 1740 by Jesuit missionaries, is the oldest one still standing. Castro adds its palafitos, colorful houses built on stilts over the water.",
        "On the Pacific coast, Chiloé National Park has protected 42,567 ha of evergreen forest since 1982, and off Ancud lie the Puñihuil Islets, one of the few places in the world where Humboldt and Magellanic penguins nest together. Chilote cooking, with curanto cooked in a pit and milcao, is part of the trip.",
      ],
      datos: [
        { label: "Region", valor: "Los Lagos, Chile" },
        { label: "Population (2024 Census)", valor: "Castro 46,997 · Ancud 40,949" },
        { label: "Airport", valor: "Mocopulli (MHC), between Castro and Dalcahue" },
        { label: "Santiago – Chiloé", valor: "1,100 km on Route 5 South" },
        { label: "Getting to the island", valor: "Pargua – Chacao ferry" },
        { label: "UNESCO churches", valor: "16, declared in 2000" },
        { label: "Recommended stay", valor: "3 to 5 days" },
        { label: "Best time", valor: "November to March" },
      ],
      queHacer: [
        {
          nombre: "Castro and its stilt houses",
          texto:
            "Castro is the provincial capital and the best base for exploring the island. Its San Francisco Church, built in 1910 from alerce, cypress, coigüe, raulí and olivillo wood, has been a National Monument since 1979 and a UNESCO World Heritage Site since 2000. The palafitos can be seen from above at the Gamboa viewpoint or from the water, on boat rides from the port, best at sunset. 5 km away is the Nercón church, built without metal nails.",
          gygQuery: "Castro Chiloe",
        },
        {
          nombre: "The UNESCO churches route",
          texto:
            "The 16 UNESCO-listed churches are in Castro, Nercón, Rilán, Dalcahue, Tenaún, Colo, San Juan, Chonchi, Vilupulli, Achao, Quinchao, Caguach, Chelín, Ichuac, Aldachildo and Detif. Sernatur suggests visiting nine over 3 days and 142 km, from Colo (70 km from Castro) to Chonchi, with its star-vaulted ceiling. Vilupulli, 15 km from Castro, has the tallest and most slender tower in the archipelago. Several are still active churches: check opening hours before you go.",
          gygQuery: "Chiloe churches",
        },
        {
          nombre: "Penguins at the Puñihuil Islets",
          texto:
            "Puñihuil Islets Natural Monument, managed by CONAF, is a group of three islets off Puñihuil cove, in Ancud commune. Humboldt and Magellanic penguins nest there, and you can also spot the marine otter, or chungungo. The islets are seen by boat, on 30-minute trips from the cove; landing is not allowed. Access is via Route W-20 between Ancud and Pumillahue (23 km) and a turnoff of about 3 km to the beach.",
          gygQuery: "Punihuil penguins",
        },
        {
          nombre: "Dalcahue, its market and Quinchao Island",
          texto:
            "25 km from Castro, Dalcahue has a crafts fair where island artisans arrive by boat twice a week, with wool textiles, basketry and native-wood carvings. Its church, from 1849, has a 26 m tower. From the Dalcahue ramp, a ferry crosses in a few minutes to Quinchao Island, the second largest in the archipelago, with the Achao and Quinchao churches.",
          gygQuery: "Dalcahue",
        },
        {
          nombre: "Chiloé National Park (Cucao)",
          texto:
            "The most visited access is the Cucao-Chanquín sector: from Castro, take Route 5 south to the Notuco junction (24 km) and then 34.5 km to Cucao, about 90 minutes, with public transport. There you'll find an elevated trail of about 200 m with a viewpoint over Lake Cucao, coastal dunes and a campground run by the Chanquín indigenous community. From Ancud you reach the Chepu sector, where a 14 km coastal trail (about 5 hours) runs from Puerto Anguay to the Lar River. CONAF warns that the Pacific beaches are not safe for swimming.",
          gygQuery: "Chiloe National Park",
        },
        {
          nombre: "Muelle de las Almas",
          texto:
            "In Chonchi commune, on the Pacific coast, this wooden pier was built as an extension of a cliff. It recalls the Chilote legend of the boatman Tempilkahue, who carries souls to their eternal rest. It's reached from Chonchi and is one of the most photographed spots on the island.",
        },
        {
          nombre: "Aucar Island, Putemún and Tantauco",
          texto:
            "In Quemchi, Aucar Island is reached by a footbridge more than 430 m long. Near Castro, the Putemún wetland can be explored by kayak, with flamingos. In the south, Tantauco Park, a private protected area, has the Sunken Forest trail. A car of your own is the best way to reach Chepu and Tantauco.",
        },
        {
          nombre: "Curanto, milcao and Chilote food",
          texto:
            "Curanto en hoyo cooks seafood, smoked meats and sausages underground on hot stones, served with milcao and chapalele, two potato breads. Milcao is a fried native-potato bread filled with pork cracklings. The Dalcahue market has cookshops serving curanto, cazuela and fish.",
          gygQuery: "Chiloe food tour",
        },
      ],
      cuandoIr: {
        resumen:
          "You can visit year-round, but November to March is the best time for Chiloé National Park and outdoor trips, according to CONAF. The climate is oceanic, rainy and changeable in any month: bring waterproof and warm clothing.",
        temporadas: [
          {
            nombre: "Summer",
            meses: "December to February",
            texto:
              "High season: long days, boat trips at Puñihuil, Chiloé National Park trails and traditional food fairs. It can rain even in summer.",
          },
          {
            nombre: "Autumn",
            meses: "March to May",
            texto:
              "March is still within the park's best season. After that there are fewer visitors and more rain; churches and markets stay open.",
          },
          {
            nombre: "Winter",
            meses: "June to August",
            texto:
              "The rainiest season, with the shortest days. Puñihuil boat trips run on winter hours, until 5:30 pm. A good time for the churches route and Chilote food.",
          },
          {
            nombre: "Spring",
            meses: "September to November",
            texto:
              "Days get longer, and from November the best season for Chiloé National Park begins. The weather stays changeable: pack layers and a rain jacket.",
          },
        ],
      },
      comoLlegar: [
        {
          modo: "By plane",
          texto:
            "There are flights from Santiago to Mocopulli Airport (MHC), between Castro and Dalcahue, taking about 2 hours. The alternative is to fly to El Tepual Airport (PMC) in Puerto Montt and continue overland to Pargua to cross the Chacao Channel.",
        },
        {
          modo: "By car or bus from Puerto Montt",
          texto:
            "Pargua is 60 km from Puerto Montt. There you cross the Chacao Channel by ferry to Chacao, on Isla Grande, and Route 5 continues to Ancud and Castro.",
        },
        {
          modo: "Overland from Santiago",
          texto:
            "It's 1,100 km on Route 5 South, about 12 hours of driving without stops. By bus, the trip to Castro takes about 14 hours, including the channel crossing.",
        },
      ],
      cuantosDias: {
        resumen:
          "3 days cover Castro, Dalcahue, some of the churches and Chiloé National Park. With 4 or 5 you can add the Puñihuil penguins, Quinchao Island and Chonchi.",
        itinerario: [
          { dia: "Day 1", texto: "Castro: San Francisco Church, stilt houses from the Gamboa viewpoint and a sunset boat ride; Nercón church." },
          { dia: "Day 2", texto: "Chiloé National Park at Cucao: Chanquín elevated trail and dunes. On the way back, Vilupulli, Chonchi and the Muelle de las Almas." },
          { dia: "Day 3", texto: "Dalcahue and its market, ferry to Quinchao and the Achao church." },
          { dia: "Day 4", texto: "Ancud and the Puñihuil Islets penguins by boat." },
          { dia: "Day 5", texto: "Northern churches (Tenaún, Colo, San Juan) or Aucar Island in Quemchi." },
        ],
      },
      faq: [
        {
          pregunta: "Where is Chiloé?",
          respuesta:
            "In Chile's Los Lagos Region, south of Puerto Montt. Isla Grande de Chiloé is separated from the mainland by the Chacao Channel, crossed by ferry from Pargua, 60 km from Puerto Montt.",
        },
        {
          pregunta: "How do you get to Chiloé?",
          respuesta:
            "Fly from Santiago to Mocopulli Airport (MHC), between Castro and Dalcahue, in about 2 hours. Overland, drive to Pargua and take the ferry across the Chacao Channel. From Santiago it's 1,100 km on Route 5 South; by bus, about 14 hours to Castro.",
        },
        {
          pregunta: "How many Chiloé churches are UNESCO World Heritage Sites?",
          respuesta:
            "16, declared by UNESCO in 2000, out of more than 80 historic wooden churches in the archipelago. The oldest still standing is Achao's, from around 1740.",
        },
        {
          pregunta: "Where can you see penguins in Chiloé?",
          respuesta:
            "At Puñihuil Islets Natural Monument, in Ancud commune, where Humboldt and Magellanic penguins nest. You see them from the boat, on 30-minute trips from Puñihuil cove; landing on the islets is not allowed.",
        },
        {
          pregunta: "How do you get to Chiloé National Park from Castro?",
          respuesta:
            "Take Route 5 south to the Notuco junction (24 km) and then 34.5 km to Cucao, about 90 minutes. There is public transport to Cucao.",
        },
        {
          pregunta: "How many days do you need in Chiloé?",
          respuesta:
            "At least 3: Castro, Chiloé National Park, and Dalcahue with Quinchao Island. With 4 or 5 days you can add the Puñihuil penguins and the churches in the north of the island.",
        },
        {
          pregunta: "What is the best time to visit Chiloé?",
          respuesta:
            "November to March, according to CONAF, for Chiloé National Park. You can still go year-round: the climate is rainy and changeable in every season, so waterproof clothing is a must.",
        },
        {
          pregunta: "What should you eat in Chiloé?",
          respuesta:
            "Curanto en hoyo (seafood and meats cooked underground on hot stones), plus milcao and chapalele, two potato breads. The Dalcahue market has cookshops serving curanto and cazuela.",
        },
      ],
    },
    fuentes: [
      { label: "Imperdibles de Chiloé: qué ver y hacer durante tres días — Chile.travel (Sernatur)", url: "https://chile.travel/itinerarios/imperdibles-de-chiloe-que-ver-y-hacer-durante-tres-dias/" },
      { label: "Chiloé — Chile.travel (Sernatur)", url: "https://chile.travel/en/destinations/chiloe/" },
      { label: "Explore Chiloé in 3 days — Chile.travel (Sernatur)", url: "https://chile.travel/en/blog/explore-chiloe-in-3-days-visit-the-best-this-magical-chilean-island-has-to-offer-2/" },
      { label: "Heritage Route: Chiloé's UNESCO Churches in 3 Days — Chile.travel (Sernatur)", url: "https://chile.travel/en/itineraries/heritage-route-chiloes-unesco-churches-in-3-days/" },
      { label: "Chiloé Churches Route: the 16 UNESCO temples — Chile.travel (Sernatur)", url: "https://chile.travel/en/blog/chiloe-churches-route-how-to-visit-the-16-unesco-world-heritage-temples/" },
      { label: "Chiloé, un patrimonio de la humanidad — Chile.travel (Sernatur)", url: "https://chile.travel/blog/chiloe-un-patrimonio-de-la-humanidad-ubicado-en-chile/" },
      { label: "Pingüinos de Chile: dónde verlos — Chile.travel (Sernatur)", url: "https://chile.travel/en/blog/penguins-from-chile-where-to-see-these-amazing-diving-birds/" },
      { label: "Dalcahue: el latido de los canales — LosLagos.Travel (Sernatur Los Lagos)", url: "https://loslagos.travel/2026/03/13/dalcahue-el-latido-de-los-canales-y-el-alma-de-la-madera/" },
      { label: "Parque Nacional Chiloé — CONAF", url: "https://www.conaf.cl/parques/parque-nacional-chiloe/" },
      { label: "Monumento Natural Islotes de Puñihuil — CONAF", url: "https://www.conaf.cl/parques/monumento-natural-islotes-de-punihuil/" },
      { label: "Pases Parques — venta oficial de entradas (CONAF)", url: "https://www.pasesparques.cl/" },
      { label: "Reporte comunal de Castro (Censo 2024) — BCN", url: "https://www.bcn.cl/siit/reportescomunales/comunas_v.html?idcom=10201" },
      { label: "Reporte comunal de Ancud (Censo 2024) — BCN", url: "https://www.bcn.cl/siit/reportescomunales/comunas_v.html?idcom=10202" },
    ],
    relacionados: [
      { tipo: "parque", slug: "chiloe" },
      { tipo: "fauna", slug: "pinguino-de-magallanes" },
      { tipo: "gastronomia", slug: "curanto-chilote-historia-receta" },
      { tipo: "destino", slug: "puerto-varas" },
    ],
  },
  {
    slug: "coyhaique",
    nombre: "Coyhaique y la Carretera Austral",
    pais: "CL",
    lat: -45.5712,
    lng: -72.0685,
    wikipediaTitle: "Coyhaique",
    es: {
      metaTitle: "Coyhaique y Carretera Austral: Qué Hacer y Cuándo Ir",
      metaDescription:
        "Guía de Coyhaique y la Carretera Austral, Chile: Capillas de Mármol, Cerro Castillo, Ventisquero Colgante de Queulat, Laguna San Rafael, clima mes a mes y cómo llegar.",
      subtitulo: "Región de Aysén, Chile · Ruta 7, de Puerto Montt a Villa O'Higgins",
      intro: [
        "Coyhaique es la capital de la Región de Aysén, en la Patagonia chilena, y una de las paradas centrales de la Carretera Austral. Tiene 57.823 habitantes, según el Censo 2024. Fue fundada el 12 de octubre de 1929 con el nombre de Baquedano y es capital regional desde 1974. A 55 km está el aeródromo de Balmaceda (BBA), con vuelos directos desde Santiago.",
        "La Carretera Austral, o Ruta 7, recorre unos 1.058 km entre Puerto Montt y Villa O'Higgins, según el Ministerio de Obras Públicas, que a abril de 2026 informaba 614,5 km pavimentados (58 %). Tiene tramos de ripio y cruces en transbordador, y une parques nacionales, glaciares, fiordos y pueblos chicos.",
        "Desde Coyhaique se llega en el día al Parque Nacional Cerro Castillo (64 km al sur), al lago General Carrera y las Capillas de Mármol (unas 5 horas), al Ventisquero Colgante del Parque Nacional Queulat (165 km al norte) y a Puerto Chacabuco, de donde salen los barcos a la Laguna San Rafael. La mejor época es de diciembre a marzo.",
      ],
      datos: [
        { label: "Región", valor: "Aysén, Chile" },
        { label: "Población (Censo 2024)", valor: "Coyhaique 57.823 hab." },
        { label: "Aeródromo", valor: "Balmaceda (BBA), a 55 km de Coyhaique" },
        { label: "Carretera Austral", valor: "Ruta 7, ≈ 1.058 km (MOP)" },
        { label: "Coyhaique – Capillas de Mármol", valor: "≈ 223 km, unas 5 h" },
        { label: "Lago General Carrera", valor: "1.850 km², el más grande de Chile" },
        { label: "Días recomendados", valor: "4 a 7" },
        { label: "Mejor época", valor: "Diciembre a marzo" },
      ],
      queHacer: [
        {
          nombre: "Capillas de Mármol y lago General Carrera",
          texto:
            "Las Capillas de Mármol son formaciones de mármol talladas por el agua en la orilla del lago General Carrera, que con 1.850 km² es el más grande de Chile. Son Santuario de la Naturaleza desde 1994 (Decreto 281). Se visitan desde Puerto Río Tranquilo, a unos 223 km al sur de Coyhaique (unas 5 horas), en bote, alrededor de 2 horas, o en kayak, de 2 a 3 horas. De noviembre a marzo es la temporada más visitada; en primavera y otoño el lago está más bajo y es más fácil entrar a las cavernas. Sernatur recomienda contratar solo servicios registrados.",
          gygQuery: "Marble Caves Chile",
        },
        {
          nombre: "Parque Nacional Cerro Castillo",
          texto:
            "A 64 km al sur de Coyhaique por la Carretera Austral, protege 143.502 ha alrededor del cerro Castillo, de basalto negro y glaciares colgantes. Fue reserva nacional desde 1970 y es parque nacional desde 2018. El sendero a la Laguna Castillo tiene 14 km (unas 8 horas) y la travesía Las Horquetas, 53,5 km en 3 a 5 días. Los dos cierran de mayo a septiembre y CONAF los habilita solo con guía certificado: consultá antes. Hay que registrarse en la administración, en la laguna Chiguay (km 57 de la Ruta 7 Sur).",
          gygQuery: "Cerro Castillo",
        },
        {
          nombre: "Ventisquero Colgante (Parque Nacional Queulat)",
          texto:
            "El Parque Nacional Queulat, creado en 1983, tiene 154.093 ha y está a 165 km al norte de Coyhaique. Su atractivo principal es el Ventisquero Colgante, un glaciar suspendido sobre la roca del que caen cascadas. Desde el sector del ventisquero, la caminata al mirador lleva alrededor de una hora y media. El pueblo más cercano es Puyuhuapi, fundado por colonos alemanes en 1935, con las termas de Puyuhuapi, a unas 3 horas al norte de Coyhaique.",
          gygQuery: "Queulat",
        },
        {
          nombre: "Glaciar San Rafael",
          texto:
            "El Parque Nacional Laguna San Rafael, creado en 1959, tiene 1.742.000 ha y es Reserva de la Biosfera de la UNESCO desde 1979. El glaciar San Rafael, que baja del Campo de Hielo Norte, tiene un frente de casi 4 km y unos 60 m de alto. Los barcos salen de Puerto Chacabuco y la excursión dura de 10 a 12 horas; también hay vuelos desde Coyhaique. Desde Puerto Río Tranquilo hay una ruta por el valle Exploradores hasta Puerto Grosse, pero CONAF cerró el acceso frontal al glaciar Exploradores por seguridad.",
          gygQuery: "San Rafael Glacier",
        },
        {
          nombre: "Reserva Nacional Coyhaique",
          texto:
            "A unos 5 km de la ciudad, por la ruta a Puerto Aysén y un camino de ripio, la reserva protege 2.150 ha desde 1948. Tiene senderos cortos, como el de la Laguna Verde (1,2 km, 20 minutos), y el de Las Piedras (6,6 km, unas 5 horas), con vista a la ciudad y al valle. Las Piedras y los senderos de ciclismo cierran de mayo a septiembre.",
        },
        {
          nombre: "Reserva Nacional Río Simpson",
          texto:
            "A unos 37 km de Coyhaique, sobre el camino a Puerto Aysén, protege 41.620 ha a lo largo del río Simpson, conocido por la pesca con mosca. Tiene el sendero Los Colonos (3,4 km), uno de acceso universal (800 m) y el del cerro Cordillerano (6 km, dificultad media). No se permiten perros ni fuego.",
        },
        {
          nombre: "Caleta Tortel",
          texto:
            "En el sur de la Región de Aysén, cerca de la desembocadura del río Baker, Caleta Tortel no tiene calles: se recorre por unos 7 km de pasarelas de madera de ciprés. Desde ahí salen botes a los glaciares Jorge Montt y Steffens y a la Isla de los Muertos. Desde Coyhaique se llega en 6 a 8 horas en auto o bus.",
          gygQuery: "Caleta Tortel",
        },
        {
          nombre: "Manejar la Carretera Austral",
          texto:
            "La ruta tiene tramos de ripio, obras de pavimentación y cruces en transbordador, como Caleta La Arena y Puerto Yungay. Sernatur recomienda un 4×4 o una camper equipada, rueda de auxilio y combustible extra, y llevar efectivo: en los pueblos chicos casi no hay cajeros y la señal de internet falla. Los transbordadores de la ruta bimodal se llenan meses antes de la temporada alta, así que conviene reservarlos con tiempo.",
        },
      ],
      cuandoIr: {
        resumen:
          "La mejor época es de diciembre a marzo, con días largos y todos los servicios abiertos, según Sernatur. Llueve aun en verano y el viento en los lagos del sur es fuerte y frío: llevá capas e impermeable. Varios senderos de CONAF cierran de mayo a septiembre.",
        temporadas: [
          {
            nombre: "Verano",
            meses: "Diciembre a febrero",
            texto:
              "Temporada alta: días largos, navegaciones a las Capillas de Mármol y la Laguna San Rafael, y senderos abiertos. Reservá los transbordadores y el alojamiento con tiempo.",
          },
          {
            nombre: "Otoño",
            meses: "Marzo a mayo",
            texto:
              "Marzo sigue siendo buena época, con menos gente. El lago General Carrera baja y es más fácil entrar a las cavernas de mármol. En mayo cierran los senderos de Cerro Castillo y Las Piedras.",
          },
          {
            nombre: "Invierno",
            meses: "Junio a agosto",
            texto:
              "Frío y nieve; varios senderos están cerrados y el sendero al glaciar de Laguna San Rafael cierra de mayo a agosto. En el Parque Nacional Cerro Castillo las temperaturas bajan hasta -15 °C. En los pasos fronterizos se recomienda 4×4 y cadenas.",
          },
          {
            nombre: "Primavera",
            meses: "Septiembre a noviembre",
            texto:
              "Los días se alargan y desde octubre reabren los senderos. Con el lago todavía bajo, es buena época para entrar a las Capillas de Mármol. El clima es cambiante.",
          },
        ],
      },
      comoLlegar: [
        {
          modo: "En avión",
          texto:
            "Hay vuelos directos desde Santiago al aeródromo de Balmaceda (BBA), a 55 km de Coyhaique. Para arrancar la Carretera Austral desde el norte, se vuela al aeropuerto El Tepual (PMC), en Puerto Montt. Sernatur sugiere entrar por un aeropuerto y salir por el otro.",
        },
        {
          modo: "Por la Carretera Austral desde Puerto Montt",
          texto:
            "La Ruta 7 sale de Puerto Montt, cruza en transbordador el estuario de Reloncaví y sigue por Hornopirén, Chaitén, Puyuhuapi y Queulat hasta Coyhaique. Sernatur propone hacerla en 7 días hasta Balmaceda, con 1.089 km de viaje. Hay tramos que solo se pasan en barcaza.",
        },
        {
          modo: "Desde Argentina",
          texto:
            "Coyhaique tiene dos pasos fronterizos cerca: Coyhaique Alto (795 m), por la Ruta 240, y Huemules (523 m), cerca de Balmaceda, por la Ruta 245. Los dos están habilitados para todo tipo de vehículos. En invierno pueden cerrar por clima: consultá el estado diario en Pasos Fronterizos.",
        },
      ],
      cuantosDias: {
        resumen:
          "Con 4 días desde Coyhaique ves Cerro Castillo, las Capillas de Mármol y la Reserva Nacional Coyhaique. Para recorrer la Carretera Austral desde Puerto Montt, Sernatur propone 7 días.",
        itinerario: [
          { dia: "Día 1", texto: "Llegada a Balmaceda. Coyhaique: Monumento al Ovejero, plaza y Reserva Nacional Coyhaique (Laguna Verde)." },
          { dia: "Día 2", texto: "Parque Nacional Cerro Castillo: registro en la laguna Chiguay y miradores sobre la Ruta 7. Seguir hacia Puerto Río Tranquilo." },
          { dia: "Día 3", texto: "Capillas de Mármol en bote o kayak desde Puerto Río Tranquilo. Vuelta a Coyhaique." },
          { dia: "Día 4", texto: "Reserva Nacional Río Simpson y, si hay tiempo, Puerto Aysén." },
          { dia: "Día 5", texto: "Navegación al glaciar San Rafael desde Puerto Chacabuco (10 a 12 horas)." },
          { dia: "Día 6", texto: "Hacia el norte: Parque Nacional Queulat y el Ventisquero Colgante." },
          { dia: "Día 7", texto: "Puyuhuapi y sus termas, o vuelta a Balmaceda." },
        ],
      },
      faq: [
        {
          pregunta: "¿Dónde queda Coyhaique?",
          respuesta:
            "En la Región de Aysén, en la Patagonia chilena. Es la capital regional y una de las paradas centrales de la Carretera Austral, con 57.823 habitantes según el Censo 2024. El aeródromo de Balmaceda (BBA) está a 55 km.",
        },
        {
          pregunta: "¿Cuántos kilómetros tiene la Carretera Austral?",
          respuesta:
            "Unos 1.058 km entre Puerto Montt y Villa O'Higgins, según el Ministerio de Obras Públicas. A abril de 2026 había 614,5 km pavimentados (58 %); el resto es ripio, y hay tramos con transbordador.",
        },
        {
          pregunta: "¿Cómo llegar a las Capillas de Mármol desde Coyhaique?",
          respuesta:
            "Por la Carretera Austral hasta Puerto Río Tranquilo, a unos 223 km al sur (unas 5 horas). Ahí salen los botes, de unas 2 horas, y los kayaks, de 2 a 3 horas. También hay tours desde Coyhaique.",
        },
        {
          pregunta: "¿Cuál es la mejor época para hacer la Carretera Austral?",
          respuesta:
            "De diciembre a marzo, con días largos y clima más favorable, según Sernatur. Igual llueve en verano: llevá ropa en capas e impermeable.",
        },
        {
          pregunta: "¿Hace falta un 4×4 para la Carretera Austral?",
          respuesta:
            "Sernatur lo recomienda, o una camper bien equipada, porque hay tramos de ripio y obras. Llevá rueda de auxilio, combustible extra para los desvíos y efectivo.",
        },
        {
          pregunta: "¿Qué distancia hay de Coyhaique al Parque Nacional Cerro Castillo?",
          respuesta:
            "64 km al sur por la Carretera Austral. La administración del parque está en la laguna Chiguay, en el km 57 de la Ruta 7 Sur, donde hay que registrarse antes de salir a un sendero.",
        },
        {
          pregunta: "¿Cómo se visita el glaciar San Rafael?",
          respuesta:
            "En barco desde Puerto Chacabuco, en una excursión de 10 a 12 horas, o en avioneta desde Coyhaique. El glaciar tiene un frente de casi 4 km y unos 60 m de alto.",
        },
        {
          pregunta: "¿Cuántos días hacen falta para la Carretera Austral?",
          respuesta:
            "Sernatur propone 7 días entre Puerto Montt y Balmaceda. Si solo vas a Coyhaique y alrededores, con 4 días ves Cerro Castillo, las Capillas de Mármol y las reservas cercanas.",
        },
      ],
    },
    en: {
      metaTitle: "Carretera Austral & Coyhaique Travel Guide, Chile",
      metaDescription:
        "Coyhaique and the Carretera Austral, Chile: Marble Caves, Cerro Castillo, Queulat Hanging Glacier, San Rafael Glacier, weather by month and how to get there.",
      subtitulo: "Aysén Region, Chile · Route 7, from Puerto Montt to Villa O'Higgins",
      intro: [
        "Coyhaique is the capital of Chile's Aysén Region, in Chilean Patagonia, and a central stop on the Carretera Austral, with 57,823 inhabitants according to the 2024 Census. It was founded on 12 October 1929 under the name Baquedano and has been the regional capital since 1974. Balmaceda Airport (BBA), 55 km away, has direct flights from Santiago.",
        "The Carretera Austral, or Route 7, runs about 1,058 km between Puerto Montt and Villa O'Higgins, according to Chile's Ministry of Public Works, which reported 614.5 km paved (58%) as of April 2026. It has gravel sections and ferry crossings, and links national parks, glaciers, fjords and small towns.",
        "From Coyhaique you can reach Cerro Castillo National Park (64 km south), General Carrera Lake and the Marble Caves (about 5 hours), the Hanging Glacier in Queulat National Park (165 km north) and Puerto Chacabuco, where boats leave for San Rafael Lagoon. The best time is December to March.",
      ],
      datos: [
        { label: "Region", valor: "Aysén, Chile" },
        { label: "Population (2024 Census)", valor: "Coyhaique 57,823" },
        { label: "Airport", valor: "Balmaceda (BBA), 55 km from Coyhaique" },
        { label: "Carretera Austral", valor: "Route 7, ≈ 1,058 km (MOP)" },
        { label: "Coyhaique – Marble Caves", valor: "≈ 223 km, about 5 h" },
        { label: "General Carrera Lake", valor: "1,850 km², Chile's largest" },
        { label: "Recommended stay", valor: "4 to 7 days" },
        { label: "Best time", valor: "December to March" },
      ],
      queHacer: [
        {
          nombre: "Marble Caves and General Carrera Lake",
          texto:
            "The Marble Caves (Capillas de Mármol) are marble formations carved by water on the shore of General Carrera Lake, which at 1,850 km² is the largest lake in Chile. They have been a Nature Sanctuary since 1994 (Decree 281). Trips leave from Puerto Río Tranquilo, about 223 km south of Coyhaique (about 5 hours), by boat, around 2 hours, or by kayak, 2 to 3 hours. November to March is the busiest season; in spring and autumn the lake is lower and it's easier to get inside the caverns. Sernatur recommends booking only registered operators.",
          gygQuery: "Marble Caves Chile",
        },
        {
          nombre: "Cerro Castillo National Park",
          texto:
            "64 km south of Coyhaique on the Carretera Austral, it protects 143,502 ha around Cerro Castillo, a black basalt peak with hanging glaciers. It was a national reserve from 1970 and became a national park in 2018. The Laguna Castillo trail is 14 km (about 8 hours) and the Las Horquetas trek is 53.5 km over 3 to 5 days. Both close from May to September and CONAF only allows them with a certified guide: check before you go. You must register at the park office at Laguna Chiguay (km 57 of Route 7 South).",
          gygQuery: "Cerro Castillo",
        },
        {
          nombre: "Hanging Glacier (Queulat National Park)",
          texto:
            "Queulat National Park, created in 1983, covers 154,093 ha and lies 165 km north of Coyhaique. Its main sight is the Hanging Glacier (Ventisquero Colgante), suspended above the rock with waterfalls pouring from it. From the glacier sector, the hike to the viewpoint takes about an hour and a half. The nearest town is Puyuhuapi, founded by German settlers in 1935, with the Puyuhuapi hot springs, about 3 hours north of Coyhaique.",
          gygQuery: "Queulat",
        },
        {
          nombre: "San Rafael Glacier",
          texto:
            "Laguna San Rafael National Park, created in 1959, covers 1,742,000 ha and has been a UNESCO Biosphere Reserve since 1979. San Rafael Glacier, flowing from the Northern Patagonian Ice Field, has an ice front of almost 4 km and stands about 60 m high. Boats leave from Puerto Chacabuco and the trip takes 10 to 12 hours; there are also flights from Coyhaique. From Puerto Río Tranquilo a route runs through the Exploradores valley to Puerto Grosse, but CONAF has closed the frontal access to Exploradores Glacier for safety reasons.",
          gygQuery: "San Rafael Glacier",
        },
        {
          nombre: "Coyhaique National Reserve",
          texto:
            "About 5 km from town, via the road to Puerto Aysén and a gravel track, the reserve has protected 2,150 ha since 1948. It has short trails such as Laguna Verde (1.2 km, 20 minutes) and the Las Piedras trail (6.6 km, about 5 hours), with views over the town and valley. Las Piedras and the cycling trails close from May to September.",
        },
        {
          nombre: "Río Simpson National Reserve",
          texto:
            "About 37 km from Coyhaique, on the road to Puerto Aysén, it protects 41,620 ha along the Simpson River, known for fly fishing. Trails include Los Colonos (3.4 km), a universal-access path (800 m) and Cerro Cordillerano (6 km, moderate). Dogs and fires are not allowed.",
        },
        {
          nombre: "Caleta Tortel",
          texto:
            "In the south of the Aysén Region, near the mouth of the Baker River, Caleta Tortel has no streets: you get around on about 7 km of cypress-wood boardwalks. Boats leave from there to the Jorge Montt and Steffens glaciers and to Isla de los Muertos. It's 6 to 8 hours from Coyhaique by car or bus.",
          gygQuery: "Caleta Tortel",
        },
        {
          nombre: "Driving the Carretera Austral",
          texto:
            "The route has gravel sections, paving works and ferry crossings, such as Caleta La Arena and Puerto Yungay. Sernatur recommends a 4×4 or a well-equipped camper, a spare tire and extra fuel, and carrying cash: small towns have almost no ATMs and internet is unreliable. Ferries on the bimodal route fill up months before high season, so book early.",
        },
      ],
      cuandoIr: {
        resumen:
          "The best time is December to March, with long days and all services open, according to Sernatur. It rains even in summer and the wind on the southern lakes is strong and cold: pack layers and a rain jacket. Several CONAF trails close from May to September.",
        temporadas: [
          {
            nombre: "Summer",
            meses: "December to February",
            texto:
              "High season: long days, boat trips to the Marble Caves and San Rafael Lagoon, and all trails open. Book ferries and accommodation early.",
          },
          {
            nombre: "Autumn",
            meses: "March to May",
            texto:
              "March is still a good time, with fewer visitors. General Carrera Lake drops and it's easier to enter the marble caverns. In May the Cerro Castillo and Las Piedras trails close.",
          },
          {
            nombre: "Winter",
            meses: "June to August",
            texto:
              "Cold and snow; several trails are closed, and the glacier trail at Laguna San Rafael closes from May to August. Temperatures in Cerro Castillo National Park drop to -15 °C. A 4×4 and chains are recommended at the border crossings.",
          },
          {
            nombre: "Spring",
            meses: "September to November",
            texto:
              "Days get longer and trails reopen from October. With the lake still low, it's a good time to enter the Marble Caves. The weather is changeable.",
          },
        ],
      },
      comoLlegar: [
        {
          modo: "By plane",
          texto:
            "There are direct flights from Santiago to Balmaceda Airport (BBA), 55 km from Coyhaique. To start the Carretera Austral from the north, fly to El Tepual Airport (PMC) in Puerto Montt. Sernatur suggests flying into one airport and out of the other.",
        },
        {
          modo: "On the Carretera Austral from Puerto Montt",
          texto:
            "Route 7 leaves Puerto Montt, crosses the Reloncaví Estuary by ferry and continues through Hornopirén, Chaitén, Puyuhuapi and Queulat to Coyhaique. Sernatur suggests a 7-day trip to Balmaceda covering 1,089 km. Some sections can only be crossed by barge.",
        },
        {
          modo: "From Argentina",
          texto:
            "Coyhaique has two nearby border crossings: Coyhaique Alto (795 m), on Route 240, and Huemules (523 m), near Balmaceda, on Route 245. Both are open to all types of vehicles. In winter they may close due to weather: check the daily status on Chile's Pasos Fronterizos site.",
        },
      ],
      cuantosDias: {
        resumen:
          "4 days based in Coyhaique cover Cerro Castillo, the Marble Caves and Coyhaique National Reserve. To drive the Carretera Austral from Puerto Montt, Sernatur suggests 7 days.",
        itinerario: [
          { dia: "Day 1", texto: "Arrive in Balmaceda. Coyhaique: the Shepherd Monument, the main square and Coyhaique National Reserve (Laguna Verde)." },
          { dia: "Day 2", texto: "Cerro Castillo National Park: register at Laguna Chiguay and stop at the viewpoints on Route 7. Continue to Puerto Río Tranquilo." },
          { dia: "Day 3", texto: "Marble Caves by boat or kayak from Puerto Río Tranquilo. Drive back to Coyhaique." },
          { dia: "Day 4", texto: "Río Simpson National Reserve and, time permitting, Puerto Aysén." },
          { dia: "Day 5", texto: "Boat trip to San Rafael Glacier from Puerto Chacabuco (10 to 12 hours)." },
          { dia: "Day 6", texto: "North to Queulat National Park and the Hanging Glacier." },
          { dia: "Day 7", texto: "Puyuhuapi and its hot springs, or back to Balmaceda." },
        ],
      },
      faq: [
        {
          pregunta: "Where is Coyhaique?",
          respuesta:
            "In the Aysén Region of Chilean Patagonia. It's the regional capital and a central stop on the Carretera Austral, with 57,823 inhabitants according to the 2024 Census. Balmaceda Airport (BBA) is 55 km away.",
        },
        {
          pregunta: "How long is the Carretera Austral?",
          respuesta:
            "About 1,058 km between Puerto Montt and Villa O'Higgins, according to Chile's Ministry of Public Works. As of April 2026, 614.5 km were paved (58%); the rest is gravel, and some sections require ferries.",
        },
        {
          pregunta: "How do you get to the Marble Caves from Coyhaique?",
          respuesta:
            "Drive the Carretera Austral to Puerto Río Tranquilo, about 223 km south (about 5 hours). Boat trips of about 2 hours and kayak trips of 2 to 3 hours leave from there. There are also tours from Coyhaique.",
        },
        {
          pregunta: "What is the best time to drive the Carretera Austral?",
          respuesta:
            "December to March, with long days and better weather, according to Sernatur. It still rains in summer: pack layers and waterproof clothing.",
        },
        {
          pregunta: "Do you need a 4×4 for the Carretera Austral?",
          respuesta:
            "Sernatur recommends one, or a well-equipped camper, because of gravel sections and roadworks. Carry a spare tire, extra fuel for side roads and cash.",
        },
        {
          pregunta: "How far is Cerro Castillo National Park from Coyhaique?",
          respuesta:
            "64 km south on the Carretera Austral. The park office is at Laguna Chiguay, at km 57 of Route 7 South, where you must register before starting a trail.",
        },
        {
          pregunta: "How do you visit San Rafael Glacier?",
          respuesta:
            "By boat from Puerto Chacabuco, on a 10 to 12 hour trip, or by small plane from Coyhaique. The glacier has an ice front of almost 4 km and stands about 60 m high.",
        },
        {
          pregunta: "How many days do you need for the Carretera Austral?",
          respuesta:
            "Sernatur suggests 7 days between Puerto Montt and Balmaceda. If you only visit Coyhaique and its surroundings, 4 days cover Cerro Castillo, the Marble Caves and the nearby reserves.",
        },
      ],
    },
    fuentes: [
      { label: "Carretera Austral — Chile.travel (Sernatur)", url: "https://chile.travel/en/destinations/carretera-austral/" },
      { label: "A 7-day trip along the Carretera Austral — Chile.travel (Sernatur)", url: "https://chile.travel/en/itineraries/a-7-day-trip-along-the-carretera-austral/" },
      { label: "Travel guide: must-see destinations on the Carretera Austral — Chile.travel (Sernatur)", url: "https://chile.travel/en/blog/travel-guide-5-must-see-destinations-on-the-carretera-austral/" },
      { label: "Explore the landscapes of the Aysén Region — Chile.travel (Sernatur)", url: "https://chile.travel/en/itineraries/explore-and-discover-the-landscapes-of-the-aysen-region/" },
      { label: "General Carrera Lake and Marble Caves — Chile.travel (Sernatur)", url: "https://chile.travel/en/attractions/general-carrera-lake-and-marble-caves/" },
      { label: "Marble Chapels: how to visit them — Chile.travel (Sernatur)", url: "https://chile.travel/en/blog/marble-chapels-how-to-visit-them-and-their-surprising-connection-to-ancient-greece/" },
      { label: "Cerro Castillo — Chile.travel (Sernatur)", url: "https://chile.travel/atractivos/cerro-castillo/" },
      { label: "Tortel and Villa O'Higgins — Chile.travel (Sernatur)", url: "https://chile.travel/en/attractions/tortel-and-villa-ohiggins/" },
      { label: "Plan de pavimentación de la Carretera Austral (abril 2026) — MOP", url: "https://dgop.mop.gob.cl/presidente-kast-y-ministro-arrau-anuncian-plan-historico-por-mas-de-800-mil-millones-para-potenciar-la-carretera-austral/" },
      { label: "Santuario de la Naturaleza Capillas de Mármol — Consejo de Monumentos Nacionales", url: "https://www.monumentos.gob.cl/monumentos/santuarios-de-la-naturaleza/capillas-de-marmol" },
      { label: "Parque Nacional Cerro Castillo — CONAF", url: "https://www.conaf.cl/parques/parque-nacional-cerro-castillo/" },
      { label: "Parque Nacional Queulat — CONAF", url: "https://www.conaf.cl/parques/parque-nacional-queulat/" },
      { label: "Parque Nacional Laguna San Rafael — CONAF", url: "https://www.conaf.cl/parque_nacionales/parque-nacional-laguna-san-rafael/" },
      { label: "Cierre del acceso frontal al glaciar Exploradores — CONAF", url: "https://www.conaf.cl/conaf-informa-cierre-definitivo-del-acceso-frontal-al-glaciar-exploradores-para-resguardar-la-seguridad-de-visitantes/" },
      { label: "Reserva Nacional Coyhaique — CONAF", url: "https://www.conaf.cl/parque_nacionales/reserva-nacional-coyhaique/" },
      { label: "Reserva Nacional Río Simpson — CONAF", url: "https://www.conaf.cl/parque_nacionales/reserva-nacional-rio-simpson/" },
      { label: "Pases Parques — venta oficial de entradas (CONAF)", url: "https://www.pasesparques.cl/" },
      { label: "Complejo Coyhaique Alto — Pasos Fronterizos", url: "https://www.pasosfronterizos.gov.cl/complejos-fronterizos/aysen/paso-coyhaique/" },
      { label: "Complejo Huemules — Pasos Fronterizos", url: "https://www.pasosfronterizos.gov.cl/complejos-fronterizos/aysen/paso-huemules/" },
      { label: "Nuestro Municipio — Municipalidad de Coyhaique", url: "https://coyhaique.cl/index.php?Itemid=125&id=66&option=com_content&view=article" },
      { label: "Reporte comunal de Coyhaique (Censo 2024) — BCN", url: "https://www.bcn.cl/siit/reportescomunales/comunas_v.html?idcom=11101" },
    ],
    relacionados: [
      { tipo: "parque", slug: "cerro-castillo" },
      { tipo: "parque", slug: "queulat" },
      { tipo: "parque", slug: "laguna-san-rafael" },
      { tipo: "parque", slug: "patagonia-cl" },
      { tipo: "termas", slug: "puyuhuapi" },
      { tipo: "escalada", slug: "cerro-castillo" },
      { tipo: "fauna", slug: "huemul" },
      { tipo: "destino", slug: "puerto-varas" },
    ],
  },
]

export function getDestinoEntry(slug: string): DestinoEntry | undefined {
  return DESTINOS_CATALOG.find((d) => d.slug === slug)
}
