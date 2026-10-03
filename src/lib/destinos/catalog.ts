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
      { tipo: "fauna", slug: "guanaco" },
      { tipo: "fauna", slug: "condor-andino" },
      { tipo: "gastronomia", slug: "cordero-patagonico" },
    ],
  },
]

export function getDestinoEntry(slug: string): DestinoEntry | undefined {
  return DESTINOS_CATALOG.find((d) => d.slug === slug)
}
