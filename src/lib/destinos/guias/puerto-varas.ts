import type { DestinoEntry } from "@/lib/destinos/types"

// Guía de Puerto Varas y Puerto Montt. Una guía = un archivo (ver catalog.ts).

const guia: DestinoEntry = {
  slug: "puerto-varas",
  prioridad: 8,
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
  ],
}

export default guia
