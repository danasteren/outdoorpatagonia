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
]

export function getDestinoEntry(slug: string): DestinoEntry | undefined {
  return DESTINOS_CATALOG.find((d) => d.slug === slug)
}
