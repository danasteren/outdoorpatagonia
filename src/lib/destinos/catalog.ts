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
    ],
  },
]

export function getDestinoEntry(slug: string): DestinoEntry | undefined {
  return DESTINOS_CATALOG.find((d) => d.slug === slug)
}
