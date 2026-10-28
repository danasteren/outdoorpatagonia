import type { DestinoEntry } from "@/lib/destinos/types"

// Guía de Punta Arenas. Una guía = un archivo (ver catalog.ts).

const guia: DestinoEntry = {
  slug: "punta-arenas",
  prioridad: 7,
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
}

export default guia
