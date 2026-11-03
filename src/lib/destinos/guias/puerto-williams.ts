import type { DestinoEntry } from "@/lib/destinos/types"

// Guía de Puerto Williams e Isla Navarino (Tierra del Fuego chilena). Una guía = un archivo (ver catalog.ts).

const guia: DestinoEntry = {
  slug: "puerto-williams",
  prioridad: 14,
  nombre: "Puerto Williams",
  pais: "CL",
  lat: -54.9333,
  lng: -67.6167,
  wikipediaTitle: "Puerto Williams",
  es: {
    metaTitle: "Puerto Williams: Qué Hacer, Cuándo Ir y Cómo Llegar",
    metaDescription:
      "Guía de Puerto Williams e Isla Navarino, Chile: qué hacer, Dientes de Navarino, Cabo de Hornos, cuándo ir y cómo llegar desde Punta Arenas o Ushuaia.",
    subtitulo: "Isla Navarino, Magallanes, Chile · Al sur del Canal Beagle",
    intro: [
      "Puerto Williams es el pueblo principal de la Isla Navarino, en la Región de Magallanes y de la Antártica Chilena, sobre la costa sur del Canal Beagle y frente a Ushuaia. Es la capital de la comuna de Cabo de Hornos y la base de acceso al Parque Nacional Cabo de Hornos, el área silvestre protegida más austral del planeta según CONAF.",
      "Desde acá sale el circuito Dientes de Navarino, un trekking de alta exigencia de cuatro a cinco días con terreno de roca suelta, nieve y turbales, que empieza a 2 km del pueblo, cruzando el puente sobre el río Róbalo. También hay navegación por el Canal Beagle y la ruta al Cabo de Hornos, que desde Puerto Williams implica unas 12 horas de navegación.",
      "No es un destino de servicios masivos: es chico, remoto y para quien viene a caminar, navegar y conocer el territorio yagán. Se llega en avión desde Punta Arenas, en ferry o en lancha cruzando desde Ushuaia.",
    ],
    datos: [
      { label: "Región", valor: "Magallanes y de la Antártica Chilena, Chile" },
      { label: "Isla", valor: "Navarino, sobre el Canal Beagle" },
      { label: "Comuna", valor: "Cabo de Hornos" },
      { label: "Parque Nacional Cabo de Hornos", valor: "63.093 ha, creado en 1945 · Reserva de la Biosfera UNESCO desde 2005" },
      { label: "Dientes de Navarino", valor: "4 a 5 días, alta exigencia · inicio a 2 km del pueblo" },
      { label: "Vuelo desde Punta Arenas", valor: "Unas 1 h 15 min hasta el aeródromo de Puerto Williams (WPU)" },
      { label: "Ferry desde Punta Arenas", valor: "Cerca de 30 horas" },
      { label: "Días recomendados", valor: "3 a 5 (más si se hace el circuito Dientes)" },
    ],
    queHacer: [
      {
        nombre: "Circuito Dientes de Navarino",
        texto:
          "Es la travesía de trekking más austral que se puede hacer a pie: de cuatro a cinco días por terreno de roca suelta, nieve y turbales. Chile Travel la describe como de alta exigencia y pide buena forma física y equipo de calidad. Hay que registrar el inicio y el término del trekking en la oficina de Carabineros de Chile en Puerto Williams. El sendero empieza a 2 km del pueblo, cruzando el puente sobre el río Róbalo.",
        gygQuery: "Dientes de Navarino Puerto Williams",
      },
      {
        nombre: "Parque Nacional Cabo de Hornos",
        texto:
          "Creado en 1945, protege 63.093 hectáreas del archipiélago Wollaston y es Reserva de la Biosfera de la UNESCO desde 2005. Hay bosques bajos de coigüe de Magallanes, tundra y turbales, y en el mar lobos marinos, focas, delfines y ballenas. Abre todos los días de 9 a 18 h. No hay alojamiento, comida ni servicios de emergencia en el parque: se resuelven en Puerto Williams o Punta Arenas. El sendero al Faro de Hornos está cerrado en invierno.",
        gygQuery: "Cape Horn Puerto Williams",
      },
      {
        nombre: "Navegación por el Canal Beagle",
        texto:
          "Desde Puerto Williams salen excursiones en barco por el Canal Beagle, y también cruceros que continúan hacia el Cabo de Hornos. El viaje al parque desde Puerto Williams lleva unas 12 horas de navegación, así que depende del clima y de la empresa.",
        gygQuery: "Beagle Channel Puerto Williams",
      },
      {
        nombre: "Territorio yagán y museo",
        texto:
          "Isla Navarino es parte del territorio histórico del pueblo yagán. En Puerto Williams hay un museo dedicado a su cultura, que fue renovado y cambió de nombre: confirmá en el sitio oficial de los museos de Chile el nombre y el horario vigentes antes de ir.",
      },
    ],
    cuandoIr: {
      resumen:
        "Diciembre a febrero es la temporada para caminar los Dientes y navegar hacia el Cabo de Hornos: es cuando hay más horas de luz y el acceso al faro de Hornos está abierto. En invierno el sendero del faro cierra y la nieve complica el trekking.",
      temporadas: [
        {
          nombre: "Verano",
          meses: "Diciembre a febrero",
          texto: "Temporada alta para el circuito Dientes y la navegación. Conviene reservar pasajes y excursiones con anticipación.",
        },
        {
          nombre: "Otoño y primavera",
          meses: "Marzo a abril y octubre a noviembre",
          texto: "Menos gente y días más cortos. El clima es muy cambiante: hay que llevar abrigo para viento, lluvia y nieve.",
        },
        {
          nombre: "Invierno",
          meses: "Mayo a septiembre",
          texto: "Nieve en altura y sendero al Faro de Hornos cerrado. Es época de poca actividad turística.",
        },
      ],
    },
    comoLlegar: [
      {
        modo: "En avión desde Punta Arenas",
        texto:
          "Se vuela al aeropuerto Presidente Carlos Ibáñez del Campo (PUQ) en Punta Arenas y de ahí a Puerto Williams (WPU), en unos 1 h 15 min. Es la forma más rápida desde Chile continental.",
      },
      {
        modo: "En ferry desde Punta Arenas",
        texto: "El ferry tarda cerca de 30 horas.",
      },
      {
        modo: "Desde Ushuaia",
        texto:
          "Se cruza el Canal Beagle en lancha y después hay un traslado terrestre hasta Puerto Williams. Los horarios y las empresas cambian: confirmalos con los operadores del muelle de Ushuaia y llevá el pasaporte, porque se cruza la frontera.",
      },
    ],
    cuantosDias: {
      resumen:
        "Con 3 a 5 días se conoce el pueblo, el Canal Beagle y alguna caminata corta. Si se suma el circuito Dientes de Navarino (4 a 5 días), hay que contar una semana en total.",
      itinerario: [
        { dia: "Día 1", texto: "Llegada, paseo por Puerto Williams y registro en Carabineros si vas a caminar." },
        { dia: "Día 2", texto: "Museo y territorio yagán, y caminata corta desde el pueblo." },
        { dia: "Día 3", texto: "Excursión en barco por el Canal Beagle." },
        { dia: "Días 4 y 5", texto: "Opcional: inicio del circuito Dientes de Navarino, o navegación hacia el Parque Nacional Cabo de Hornos." },
      ],
    },
    faq: [
      {
        pregunta: "¿Dónde queda Puerto Williams?",
        respuesta:
          "En la Isla Navarino, Región de Magallanes y de la Antártica Chilena, Chile, sobre la costa sur del Canal Beagle y frente a Ushuaia.",
      },
      {
        pregunta: "¿Cómo se llega a Puerto Williams?",
        respuesta:
          "En avión desde Punta Arenas (unos 1 h 15 min), en ferry desde Punta Arenas (cerca de 30 horas) o cruzando el Canal Beagle en lancha desde Ushuaia.",
      },
      {
        pregunta: "¿Cuántos días dura el circuito Dientes de Navarino?",
        respuesta:
          "Entre cuatro y cinco días según Chile Travel. Es de alta exigencia y hay que registrar la salida y el regreso en Carabineros de Chile en Puerto Williams.",
      },
      {
        pregunta: "¿Cómo se llega al Cabo de Hornos?",
        respuesta:
          "Por mar: desde Puerto Williams son unas 12 horas de navegación. También se llega en circuitos en barco desde Punta Arenas. Depende del clima.",
      },
      {
        pregunta: "¿Cuándo conviene ir a Puerto Williams?",
        respuesta:
          "De diciembre a febrero, cuando hay más luz y está abierto el sendero al Faro de Hornos, que cierra en invierno.",
      },
      {
        pregunta: "¿Hace falta pasaporte para cruzar desde Ushuaia?",
        respuesta:
          "Sí, el cruce del Canal Beagle es un paso internacional entre Argentina y Chile. Verificá los requisitos vigentes antes de viajar.",
      },
    ],
  },
  en: {
    metaTitle: "Puerto Williams Travel Guide: Things to Do & Getting There",
    metaDescription:
      "Puerto Williams and Navarino Island, Chile: things to do, Dientes de Navarino trek, Cape Horn, best time to visit and how to get there from Punta Arenas or Ushuaia.",
    subtitulo: "Navarino Island, Magallanes, Chile · South of the Beagle Channel",
    intro: [
      "Puerto Williams is the main town on Navarino Island, in Chile's Magallanes and Chilean Antarctica Region, on the south shore of the Beagle Channel across from Ushuaia. It is the capital of the Cabo de Hornos commune and the access point to Cabo de Hornos National Park, the southernmost protected wilderness area on Earth according to CONAF.",
      "The Dientes de Navarino circuit starts here: a demanding four-to-five-day trek over loose rock, snow and peat bogs, beginning 2 km from town across the bridge over the Róbalo River. There are also boat trips on the Beagle Channel and the route to Cape Horn, which takes about 12 hours of sailing from Puerto Williams.",
      "This is not a mass-tourism destination: it is small and remote, for people who come to hike, sail and learn about Yaghan territory. You get here by plane from Punta Arenas, by ferry, or by boat across the channel from Ushuaia.",
    ],
    datos: [
      { label: "Region", valor: "Magallanes and Chilean Antarctica, Chile" },
      { label: "Island", valor: "Navarino, on the Beagle Channel" },
      { label: "Commune", valor: "Cabo de Hornos" },
      { label: "Cabo de Hornos National Park", valor: "63,093 ha, created in 1945 · UNESCO Biosphere Reserve since 2005" },
      { label: "Dientes de Navarino", valor: "4 to 5 days, high difficulty · starts 2 km from town" },
      { label: "Flight from Punta Arenas", valor: "About 1 h 15 min to Puerto Williams airfield (WPU)" },
      { label: "Ferry from Punta Arenas", valor: "About 30 hours" },
      { label: "Recommended stay", valor: "3 to 5 days (more if you hike the Dientes circuit)" },
    ],
    queHacer: [
      {
        nombre: "Dientes de Navarino circuit",
        texto:
          "The southernmost trekking route you can walk: four to five days over loose rock, snow and peat bogs. Chile Travel rates it as highly demanding and asks for good fitness and quality gear. You must register your start and finish at the Carabineros de Chile office in Puerto Williams. The trail begins 2 km from town, across the bridge over the Róbalo River.",
        gygQuery: "Dientes de Navarino Puerto Williams",
      },
      {
        nombre: "Cabo de Hornos National Park",
        texto:
          "Created in 1945, it protects 63,093 hectares of the Wollaston archipelago and has been a UNESCO Biosphere Reserve since 2005. Vegetation is low Magellan coigüe forest, tundra and peat bogs; at sea there are sea lions, seals, dolphins and whales. It is open daily 9 am to 6 pm. The park has no lodging, food or emergency services: those are in Puerto Williams or Punta Arenas. The trail to the Cape Horn lighthouse is closed in winter.",
        gygQuery: "Cape Horn Puerto Williams",
      },
      {
        nombre: "Beagle Channel boat trips",
        texto:
          "Boat excursions on the Beagle Channel leave from Puerto Williams, along with cruises that continue to Cape Horn. The trip to the park takes about 12 hours of sailing, so it depends on the weather and the operator.",
        gygQuery: "Beagle Channel Puerto Williams",
      },
      {
        nombre: "Yaghan territory and museum",
        texto:
          "Navarino Island is part of the historic territory of the Yaghan people. Puerto Williams has a museum devoted to their culture that was renovated and renamed: check the official Chilean museums website for its current name and opening hours before you go.",
      },
    ],
    cuandoIr: {
      resumen:
        "December to February is the season for the Dientes trek and for sailing toward Cape Horn: there is more daylight and the lighthouse trail is open. In winter that trail closes and snow makes trekking harder.",
      temporadas: [
        {
          nombre: "Summer",
          meses: "December to February",
          texto: "High season for the Dientes circuit and boat trips. Book tickets and excursions ahead.",
        },
        {
          nombre: "Autumn and spring",
          meses: "March to April and October to November",
          texto: "Fewer visitors and shorter days. Weather changes fast: bring layers for wind, rain and snow.",
        },
        {
          nombre: "Winter",
          meses: "May to September",
          texto: "Snow at altitude and the Cape Horn lighthouse trail is closed. Very little tourist activity.",
        },
      ],
    },
    comoLlegar: [
      {
        modo: "By air from Punta Arenas",
        texto:
          "Fly to Presidente Carlos Ibáñez del Campo airport (PUQ) in Punta Arenas, then on to Puerto Williams (WPU) in about 1 h 15 min. It is the fastest way from mainland Chile.",
      },
      {
        modo: "By ferry from Punta Arenas",
        texto: "The ferry takes about 30 hours.",
      },
      {
        modo: "From Ushuaia",
        texto:
          "You cross the Beagle Channel by boat, followed by a land transfer to Puerto Williams. Schedules and companies change: confirm with the operators at the Ushuaia pier and bring your passport, since you cross an international border.",
      },
    ],
    cuantosDias: {
      resumen:
        "Three to five days cover the town, the Beagle Channel and a short hike. Add the Dientes de Navarino circuit (4 to 5 days) and plan about a week in total.",
      itinerario: [
        { dia: "Day 1", texto: "Arrival, walk around Puerto Williams, and register with Carabineros if you plan to trek." },
        { dia: "Day 2", texto: "Museum and Yaghan territory, plus a short hike from town." },
        { dia: "Day 3", texto: "Boat excursion on the Beagle Channel." },
        { dia: "Days 4 and 5", texto: "Optional: start the Dientes de Navarino circuit, or sail toward Cabo de Hornos National Park." },
      ],
    },
    faq: [
      {
        pregunta: "Where is Puerto Williams?",
        respuesta:
          "On Navarino Island, in Chile's Magallanes and Chilean Antarctica Region, on the south shore of the Beagle Channel across from Ushuaia.",
      },
      {
        pregunta: "How do you get to Puerto Williams?",
        respuesta:
          "By plane from Punta Arenas (about 1 h 15 min), by ferry from Punta Arenas (about 30 hours), or by boat across the Beagle Channel from Ushuaia.",
      },
      {
        pregunta: "How long is the Dientes de Navarino circuit?",
        respuesta:
          "Four to five days according to Chile Travel. It is highly demanding and you must register your departure and return with Carabineros de Chile in Puerto Williams.",
      },
      {
        pregunta: "How do you get to Cape Horn?",
        respuesta:
          "By sea: about 12 hours of sailing from Puerto Williams. Boat circuits also run from Punta Arenas. It depends on the weather.",
      },
      {
        pregunta: "When is the best time to visit Puerto Williams?",
        respuesta:
          "December to February, when there is more daylight and the Cape Horn lighthouse trail is open; it closes in winter.",
      },
      {
        pregunta: "Do I need a passport to cross from Ushuaia?",
        respuesta:
          "Yes, crossing the Beagle Channel is an international border crossing between Argentina and Chile. Check current requirements before you travel.",
      },
    ],
  },
  fuentes: [
    { label: "Parque Nacional Cabo de Hornos (CONAF)", url: "https://www.conaf.cl/parques/parque-nacional-cabo-de-hornos/" },
    { label: "Dientes de Navarino (Chile Travel — Sernatur)", url: "https://chile.travel/?p=61697" },
  ],
  relacionados: [
    { tipo: "parque", slug: "cabo-de-hornos" },
    { tipo: "parque", slug: "tierra-del-fuego" },
    { tipo: "sendero", slug: "diente-de-navarino" },
    { tipo: "fauna", slug: "lobo-marino-del-sur" },
    { tipo: "gastronomia", slug: "centolla-patagonica" },
    { tipo: "destino", slug: "ushuaia" },
    { tipo: "destino", slug: "punta-arenas" },
  ],
}

export default guia
