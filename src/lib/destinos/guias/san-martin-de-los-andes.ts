import type { DestinoEntry } from "@/lib/destinos/types"

// Guía de San Martín de los Andes y Villa La Angostura (los dos extremos de la Ruta de los Siete Lagos).
// Una guía = un archivo (ver catalog.ts).

const guia: DestinoEntry = {
  slug: "san-martin-de-los-andes",
  prioridad: 12,
  nombre: "San Martín de los Andes y Villa La Angostura",
  pais: "AR",
  lat: -40.1575,
  lng: -71.3536,
  wikipediaTitle: "San Martín de los Andes",
  es: {
    metaTitle: "San Martín de los Andes: Qué Hacer, Clima y Cómo Llegar",
    metaDescription:
      "Guía de San Martín de los Andes y Villa La Angostura, Neuquén: qué hacer, clima por mes, cuándo ir, cómo llegar y la Ruta de los Siete Lagos entre las dos.",
    subtitulo: "Neuquén, Argentina · Ruta de los Siete Lagos",
    intro: [
      "San Martín de los Andes es una ciudad del sur de Neuquén, en la Patagonia argentina: está a 640 m de altura, sobre el lago Lácar y junto al Parque Nacional Lanín, a 1.575 km de Buenos Aires. Se fundó el 4 de febrero de 1898 y el departamento Lácar tiene 39.596 habitantes (censo 2022).",
      "Desde San Martín sale hacia el sur la Ruta de los Siete Lagos: 110 km de la Ruta 40, todos asfaltados, hasta Villa La Angostura, sobre el lago Nahuel Huapi y puerta de entrada al Parque Nacional Los Arrayanes. Entre las dos se recorren los lagos Lácar, Machónico, Falkner, Villarino, Escondido, Correntoso y Espejo, el volcán Lanín de 3.776 m, playas de lago y los centros de esquí Chapelco y Cerro Bayo.",
      "Se visita todo el año. En verano las máximas promedian unos 24 °C y en julio rondan los 7 °C, con mínimas cerca de 1 °C. De diciembre a marzo es la temporada de playas, trekking y navegaciones; de julio a septiembre, la de nieve.",
    ],
    datos: [
      { label: "Provincia", valor: "Neuquén" },
      { label: "Población", valor: "39.596 en el depto. Lácar y 15.555 en el depto. Los Lagos (censo 2022)" },
      { label: "Fundación", valor: "San Martín: 4 de febrero de 1898 · Villa La Angostura: 15 de mayo de 1932" },
      { label: "Altura", valor: "640 m (San Martín de los Andes)" },
      { label: "Aeropuerto", valor: "Chapelco Aviador Carlos Campos, a 22 km de San Martín" },
      { label: "Distancia desde Buenos Aires", valor: "1.575 km a San Martín · 1.624 km a Villa La Angostura" },
      { label: "Días recomendados", valor: "4 a 5" },
      { label: "Mejor época", valor: "Dic–mar (verano) · jul–sep (nieve)" },
    ],
    queHacer: [
      {
        nombre: "Ruta de los Siete Lagos",
        texto:
          "Son 110 km de la Ruta 40, asfaltados, entre San Martín de los Andes y Villa La Angostura, a través de los parques nacionales Lanín y Nahuel Huapi. Sin paradas se hace en unas 2 horas, pero vale la pena dedicarle el día: a unos 20 km de San Martín está el acceso al lago Hermoso, donde termina el Lanín y empieza el Nahuel Huapi; después vienen la cascada Vullignanco, los lagos Falkner y Villarino, el Escondido, el desvío a Villa Traful y, ya cerca de Villa La Angostura, el Correntoso (a 27 km) y el Espejo (a 12 km). Los accesos a los lagos Espejo Chico, Hermoso, Traful y Meliquina son de ripio.",
        gygQuery: "Seven Lakes Route San Martin de los Andes",
      },
      {
        nombre: "Lago Lácar, costanera y miradores",
        texto:
          "La ciudad está en un valle sobre el lago Lácar, con la costanera, la terminal de ómnibus y las playas a pocos kilómetros del centro, como Catritre. Hay paseos en barco por el lago y, dentro del Parque Nacional Lanín, sendas a los miradores Bandurrias y Arrayán, con vista al lago y a la ciudad. Para caminar en el parque hay que registrarse antes en el formulario online de Parques Nacionales.",
      },
      {
        nombre: "Quila Quina",
        texto:
          "Una villa a orillas del Lácar, dentro del Parque Nacional Lanín. Se llega por la Ruta 40 y su acceso, que tiene un mirador sobre el lago, pasando por casas de la comunidad mapuche antes de llegar a la playa. Es uno de los paseos de verano clásicos de San Martín.",
        gygQuery: "Lago Lacar San Martin de los Andes",
      },
      {
        nombre: "Hua Hum, Yuco y la cascada Chachín",
        texto:
          "Hacia el oeste, por la Ruta Provincial 48, se llega al extremo del Lácar: las playas de Yuco y Hua Hum, de aguas turquesas, y un camino interno del parque hasta la cascada Chachín, que se visita casi todo el año. El bosque mixto de coihue, raulí, roble pellín y lenga se pone rojo en otoño. En verano hay rafting por el río Hua Hum.",
      },
      {
        nombre: "Volcán Lanín y lago Huechulafquen",
        texto:
          "El Parque Nacional Lanín, creado en 1937, protege 412.000 hectáreas, unos 24 lagos y bosques de araucaria o pehuén, árboles que llegan a 50 m de alto y a unos 1.000 años. El volcán Lanín, de 3.776 m, se ve desde el circuito de los lagos Huechulafquen, Paimún y Epulafquen, al que se entra por Junín de los Andes. El ascenso sale del área Tromen, lleva 2 días con una noche en refugio o carpa y se hace de octubre a abril (mejor de diciembre a marzo). Es de dificultad alta: requiere registro y reserva previos, equipo obligatorio y, sin experiencia en hielo, guía habilitado.",
        gygQuery: "Lanin Volcano",
      },
      {
        nombre: "Esquí en Chapelco",
        texto:
          "Es el centro de esquí más importante de Neuquén y el de San Martín de los Andes. Su primer medio de elevación se instaló en 1963 y hoy tiene telecabina y pistas para todos los niveles. La temporada depende de la nieve, que en la zona cae de junio a agosto; el estado de pistas y medios se publica cada día en su parte diario.",
        gygQuery: "Chapelco",
      },
      {
        nombre: "Bosque de Arrayanes (Villa La Angostura)",
        texto:
          "El Parque Nacional Los Arrayanes, creado en 1971, protege más de 1.700 hectáreas en la península de Quetrihué, con arrayanes de más de 650 años y más de 15 m de alto. Desde la entrada, junto al muelle de Bahía Brava, un sendero de 12 km llega al bosque; en bici, la ida y vuelta lleva unas 3 horas. Hay horario de ingreso: en verano, hasta las 14 h para ir y volver a pie y hasta las 15 h en bici; en invierno, hasta las 11 y las 12 h. También se puede volver (o ir) en barco desde Bahía Brava o Bahía Mansa, con el pasaje comprado antes de entrar.",
        gygQuery: "Villa La Angostura Arrayanes Forest",
      },
      {
        nombre: "Villa La Angostura: miradores, cascada Inacayal y Cerro Bayo",
        texto:
          "Desde el istmo de Quetrihué, que le da nombre a la villa, un sendero de unos 20 minutos sube al mirador Brazo Norte. La cascada Inacayal, de 50 m, y el mirador Belvedere quedan subiendo desde el centro por la calle Cacique Antriao. El Cerro Bayo, a 15 minutos del pueblo, tiene 126 ha esquiables, 24 pistas y 11 medios de elevación entre 1.050 y 1.803 m; en verano funciona con bike park y la telecabina sube hasta la cota 1.500.",
        gygQuery: "Villa La Angostura",
      },
    ],
    cuandoIr: {
      resumen:
        "San Martín de los Andes y Villa La Angostura se visitan todo el año: de diciembre a marzo para playas de lago, trekking, navegaciones y la Ruta de los Siete Lagos; de julio a septiembre para esquiar en Chapelco y Cerro Bayo. El otoño tiene los bosques colorados y menos gente.",
      temporadas: [
        {
          nombre: "Verano",
          meses: "Diciembre a febrero",
          texto:
            "Máximas promedio de 22 a 24 °C, mínimas de 9 a 12 °C y hasta 15 horas de luz. Es temporada alta: playas en el Lácar, Quila Quina y Yuco, kayak, rafting y el ascenso al Lanín.",
        },
        {
          nombre: "Otoño",
          meses: "Marzo a mayo",
          texto:
            "Las lengas y los bosques se ponen rojos y amarillos y baja la cantidad de gente. Las máximas van de unos 21 °C en marzo a 11 °C en mayo. La temporada de pesca suele cerrar en abril.",
        },
        {
          nombre: "Invierno",
          meses: "Junio a agosto",
          texto:
            "Máximas de 7 a 8 °C, mínimas de 1 a 2 °C y entre 9 y 10 horas y media de luz. Es la temporada de esquí en Chapelco y Cerro Bayo. Para circular por la Ruta de los Siete Lagos hay que llevar cadenas.",
        },
        {
          nombre: "Primavera",
          meses: "Septiembre a noviembre",
          texto:
            "Se alargan los días y las máximas suben de unos 10 °C a 18 °C. En noviembre abre la temporada de pesca y empieza el horario de verano en el Bosque de Arrayanes.",
        },
      ],
    },
    comoLlegar: [
      {
        modo: "En avión",
        texto:
          "El aeropuerto Chapelco Aviador Carlos Campos está a 22 km de San Martín de los Andes y a 132 km de Villa La Angostura, con vuelos diarios desde Buenos Aires en temporada alta. Para Villa La Angostura suele convenir volar a Bariloche: el aeropuerto Teniente Luis Candelaria está a 83 km, y hay buses directos y traslados.",
      },
      {
        modo: "Por tierra",
        texto:
          "San Martín de los Andes está a 1.575 km de Buenos Aires y a 430 km de la ciudad de Neuquén, por la Ruta Nacional 237 hasta Piedra del Águila y luego la 234, o por la Ruta 40 desde Zapala. Villa La Angostura está a 1.624 km de Buenos Aires y a 83 km de Bariloche, y de Bariloche a San Martín hay 184 km por la Ruta de los Siete Lagos. Las dos tienen terminal de ómnibus con servicios de larga distancia.",
      },
      {
        modo: "Desde Chile",
        texto:
          "Villa La Angostura queda sobre el Paso Cardenal Samoré (1.305 m), por la Ruta 215 chilena y las rutas nacionales 231 y 40; Osorno está a unos 160 km. Desde San Martín de los Andes, el Paso Hua Hum cruza en barcaza el lago Pirehueico (capacidad para 22 vehículos y 56 pasajeros, con reserva previa) hacia Panguipulli, y por el Paso Mamuil Malal o Tromen se llega a Pucón.",
      },
    ],
    cuantosDias: {
      resumen:
        "Con 4 o 5 días se recorren San Martín de los Andes, la Ruta de los Siete Lagos y Villa La Angostura. Si querés sumar el circuito del Huechulafquen o el ascenso al Lanín, mejor una semana.",
      itinerario: [
        { dia: "Día 1", texto: "San Martín de los Andes: costanera del Lácar, Museo Primeros Pobladores y mirador Bandurrias." },
        { dia: "Día 2", texto: "Quila Quina a la mañana, o Yuco, Hua Hum y la cascada Chachín en el día completo." },
        { dia: "Día 3", texto: "Ruta de los Siete Lagos hasta Villa La Angostura, con desvío al lago Hermoso o a Villa Traful." },
        { dia: "Día 4", texto: "Bosque de Arrayanes: 12 km a pie o en bici desde Bahía Brava, con vuelta en barco." },
        { dia: "Día 5", texto: "Cascada Inacayal y mirador Belvedere, o Cerro Bayo (esquí en invierno, bike park en verano)." },
      ],
    },
    faq: [
      {
        pregunta: "¿Cuál es la mejor época para viajar a San Martín de los Andes?",
        respuesta:
          "De diciembre a marzo para playas de lago, trekking, navegaciones y la Ruta de los Siete Lagos, con máximas de 22 a 24 °C. De julio a septiembre para esquiar en Chapelco. El otoño, con los bosques colorados, es la época con menos gente.",
      },
      {
        pregunta: "¿Cuántos kilómetros tiene la Ruta de los Siete Lagos?",
        respuesta:
          "El tramo de la Ruta 40 entre San Martín de los Andes y Villa La Angostura tiene 110 km, todo asfaltado. Pasa por los lagos Lácar, Machónico, Falkner, Villarino, Escondido, Correntoso y Espejo. Sin paradas lleva unas 2 horas; con miradores y desvíos, un día entero.",
      },
      {
        pregunta: "¿Conviene alojarse en San Martín de los Andes o en Villa La Angostura?",
        respuesta:
          "San Martín de los Andes, con aeropuerto propio a 22 km, queda mejor para el lago Lácar, Quila Quina, Hua Hum, Chapelco y el volcán Lanín. Villa La Angostura, a 83 km de Bariloche, queda mejor para el Bosque de Arrayanes y el Cerro Bayo. Con 4 o 5 días se pueden repartir las noches entre las dos.",
      },
      {
        pregunta: "¿Cómo es el clima en San Martín de los Andes?",
        respuesta:
          "Veranos templados, con máximas promedio de unos 24 °C y mínimas de 11 °C en enero, e inviernos fríos, con máximas de unos 7 °C y mínimas cerca de 1 °C en julio. En invierno nieva en los cerros y en la Ruta de los Siete Lagos hay que llevar cadenas.",
      },
      {
        pregunta: "¿Cómo llegar a San Martín de los Andes desde Buenos Aires?",
        respuesta:
          "En avión al aeropuerto Chapelco Aviador Carlos Campos, a 22 km de la ciudad, con vuelos diarios en temporada alta. Por tierra son 1.575 km, en auto o en bus de larga distancia. Otra opción es volar a Bariloche y hacer 184 km por la Ruta de los Siete Lagos.",
      },
      {
        pregunta: "¿Cómo se llega al Bosque de Arrayanes desde Villa La Angostura?",
        respuesta:
          "A pie o en bici por un sendero de 12 km que sale de Bahía Brava, o en barco desde Bahía Brava o Bahía Mansa. En verano hay que entrar hasta las 14 h para ir y volver a pie y hasta las 15 h en bici; en invierno, hasta las 11 y las 12 h. Si volvés en barco, comprá el pasaje antes de entrar.",
      },
      {
        pregunta: "¿Se puede subir al volcán Lanín?",
        respuesta:
          "Sí, de octubre a abril (mejor de diciembre a marzo). El ascenso a los 3.776 m sale del área Tromen y lleva 2 días con una noche en refugio o carpa. Es de dificultad alta: Parques Nacionales pide registro y reserva previos, equipo obligatorio y, sin experiencia en hielo, guía habilitado.",
      },
    ],
  },
  en: {
    metaTitle: "San Martín de los Andes Travel Guide & Seven Lakes",
    metaDescription:
      "San Martín de los Andes and Villa La Angostura travel guide: things to do, weather by month, best time to visit, how to get there and the Seven Lakes Route.",
    subtitulo: "Neuquén, Argentina · Seven Lakes Route",
    intro: [
      "San Martín de los Andes is a town in southern Neuquén, in Argentine Patagonia. It sits at 640 m on Lake Lácar, next to Lanín National Park, 1,575 km from Buenos Aires. It was founded on February 4, 1898, and the Lácar department has 39,596 residents (2022 census).",
      "From San Martín, the Seven Lakes Route runs south: 110 km of fully paved Route 40 to Villa La Angostura, on Nahuel Huapi Lake and the gateway to Los Arrayanes National Park. Between the two towns are lakes Lácar, Machónico, Falkner, Villarino, Escondido, Correntoso and Espejo, the 3,776 m Lanín volcano, lake beaches, and the Chapelco and Cerro Bayo ski resorts.",
      "It is a year-round destination. Summer highs average about 24 °C (75 °F), while July highs are around 7 °C (45 °F) with lows near 1 °C (34 °F). December to March is the season for beaches, hiking and boat trips; July to September is for snow.",
    ],
    datos: [
      { label: "Province", valor: "Neuquén, Argentina" },
      { label: "Population", valor: "39,596 in Lácar dept. and 15,555 in Los Lagos dept. (2022 census)" },
      { label: "Founded", valor: "San Martín: Feb 4, 1898 · Villa La Angostura: May 15, 1932" },
      { label: "Elevation", valor: "640 m (San Martín de los Andes)" },
      { label: "Airport", valor: "Chapelco Aviador Carlos Campos, 22 km from San Martín" },
      { label: "Distance from Buenos Aires", valor: "1,575 km to San Martín · 1,624 km to Villa La Angostura" },
      { label: "Recommended stay", valor: "4 to 5 days" },
      { label: "Best time", valor: "Dec–Mar (summer) · Jul–Sep (snow)" },
    ],
    queHacer: [
      {
        nombre: "Seven Lakes Route",
        texto:
          "110 km of paved Route 40 between San Martín de los Andes and Villa La Angostura, through Lanín and Nahuel Huapi national parks. Driven straight through it takes about 2 hours, but it is worth a full day: about 20 km from San Martín is the turnoff to Lake Hermoso, where Lanín ends and Nahuel Huapi begins; then come the Vullignanco waterfall, lakes Falkner and Villarino, Lake Escondido, the turnoff to Villa Traful and, near Villa La Angostura, lakes Correntoso (27 km away) and Espejo (12 km away). Side roads to lakes Espejo Chico, Hermoso, Traful and Meliquina are gravel.",
        gygQuery: "Seven Lakes Route San Martin de los Andes",
      },
      {
        nombre: "Lake Lácar, the waterfront and viewpoints",
        texto:
          "The town lies in a valley on Lake Lácar, with its lakeside promenade, bus terminal and beaches such as Catritre a few kilometers from downtown. Boat trips run on the lake, and inside Lanín National Park trails climb to the Bandurrias and Arrayán viewpoints over the lake and town. Hikers in the park must register first on the National Parks online form.",
      },
      {
        nombre: "Quila Quina",
        texto:
          "A small village on the shore of Lake Lácar, inside Lanín National Park. You reach it from Route 40 along an access road with a lake viewpoint, passing homes of the local Mapuche community before the beach. It is one of San Martín's classic summer outings.",
        gygQuery: "Lago Lacar San Martin de los Andes",
      },
      {
        nombre: "Hua Hum, Yuco and Chachín Waterfall",
        texto:
          "West along Provincial Route 48 lies the far end of Lake Lácar: the turquoise beaches of Yuco and Hua Hum, and an internal park road to Chachín Waterfall, open most of the year. The mixed forest of coihue, raulí, roble pellín and lenga turns red in autumn. In summer there is rafting on the Hua Hum River.",
      },
      {
        nombre: "Lanín Volcano and Lake Huechulafquen",
        texto:
          "Lanín National Park, created in 1937, protects 412,000 hectares, some 24 lakes and forests of araucaria (monkey puzzle) trees that grow up to 50 m tall and live about 1,000 years. The 3,776 m Lanín volcano towers over the lakes Huechulafquen, Paimún and Epulafquen circuit, reached via Junín de los Andes. The climb starts from the Tromen area, takes 2 days with a night in a hut or tent, and runs from October to April (best December to March). It is a hard climb: advance registration and booking, mandatory gear and, without ice experience, a licensed guide are required.",
        gygQuery: "Lanin Volcano",
      },
      {
        nombre: "Skiing at Chapelco",
        texto:
          "Neuquén's main ski resort and San Martín de los Andes' home mountain. Its first lift opened in 1963, and today it has a gondola and runs for every level. The season depends on snowfall, which in the area comes from June to August; open runs and lifts are posted daily in its snow report.",
        gygQuery: "Chapelco",
      },
      {
        nombre: "Arrayanes Forest (Villa La Angostura)",
        texto:
          "Los Arrayanes National Park, created in 1971, protects over 1,700 hectares on the Quetrihué peninsula, with myrtle trees over 650 years old and more than 15 m tall. From the entrance next to the Bahía Brava pier, a 12 km trail leads to the forest; by bike the round trip takes about 3 hours. Entry times apply: in summer, until 2 pm to walk there and back and until 3 pm by bike; in winter, until 11 am and noon. You can also go or return by boat from Bahía Brava or Bahía Mansa, buying the ticket before you enter.",
        gygQuery: "Villa La Angostura Arrayanes Forest",
      },
      {
        nombre: "Villa La Angostura: viewpoints, Inacayal Waterfall and Cerro Bayo",
        texto:
          "From the Quetrihué isthmus, which gave the town its name, a 20-minute trail climbs to the Brazo Norte viewpoint. The 50 m Inacayal Waterfall and the Belvedere viewpoint are reached by heading uphill from downtown along Cacique Antriao street. Cerro Bayo, 15 minutes from town, has 126 skiable hectares, 24 runs and 11 lifts between 1,050 and 1,803 m; in summer it runs a bike park and its gondola goes up to 1,500 m.",
        gygQuery: "Villa La Angostura",
      },
    ],
    cuandoIr: {
      resumen:
        "San Martín de los Andes and Villa La Angostura are worth visiting year-round: December to March for lake beaches, hiking, boat trips and the Seven Lakes Route; July to September for skiing at Chapelco and Cerro Bayo. Autumn brings red forests and fewer crowds.",
      temporadas: [
        {
          nombre: "Summer",
          meses: "December to February",
          texto:
            "Average highs of 22–24 °C (72–75 °F), lows of 9–12 °C (48–54 °F) and up to 15 hours of daylight. Peak season: beaches on Lake Lácar, Quila Quina and Yuco, kayaking, rafting and the Lanín climb.",
        },
        {
          nombre: "Autumn",
          meses: "March to May",
          texto:
            "Lenga forests turn red and gold and crowds thin out. Highs drop from about 21 °C (70 °F) in March to 11 °C (52 °F) in May. Fishing season usually closes in April.",
        },
        {
          nombre: "Winter",
          meses: "June to August",
          texto:
            "Highs of 7–8 °C (45–46 °F), lows of 1–2 °C (34–36 °F) and 9 to 10.5 hours of daylight. Ski season at Chapelco and Cerro Bayo. Snow chains are required to drive the Seven Lakes Route.",
        },
        {
          nombre: "Spring",
          meses: "September to November",
          texto:
            "Days get longer and highs climb from about 10 °C (50 °F) to 18 °C (64 °F). Fishing season opens in November, when the Arrayanes Forest switches to summer hours.",
        },
      ],
    },
    comoLlegar: [
      {
        modo: "By plane",
        texto:
          "Chapelco Aviador Carlos Campos Airport is 22 km from San Martín de los Andes and 132 km from Villa La Angostura, with daily flights from Buenos Aires in high season. For Villa La Angostura it is often easier to fly into Bariloche: Teniente Luis Candelaria Airport is 83 km away, with direct buses and transfers.",
      },
      {
        modo: "By road",
        texto:
          "San Martín de los Andes is 1,575 km from Buenos Aires and 430 km from the city of Neuquén, via National Route 237 to Piedra del Águila and then Route 234, or via Route 40 from Zapala. Villa La Angostura is 1,624 km from Buenos Aires and 83 km from Bariloche, and Bariloche to San Martín is 184 km along the Seven Lakes Route. Both towns have bus terminals with long-distance services.",
      },
      {
        modo: "From Chile",
        texto:
          "Villa La Angostura lies on the Cardenal Samoré pass (1,305 m), via Chilean Route 215 and Argentine National Routes 231 and 40; Osorno is about 160 km away. From San Martín de los Andes, the Hua Hum pass crosses Lake Pirehueico by ferry (22 vehicles and 56 passengers, booking required) toward Panguipulli, and the Mamuil Malal (Tromen) pass leads to Pucón.",
      },
    ],
    cuantosDias: {
      resumen:
        "4 or 5 days cover San Martín de los Andes, the Seven Lakes Route and Villa La Angostura. Plan a week to add the Lake Huechulafquen circuit or the Lanín climb.",
      itinerario: [
        { dia: "Day 1", texto: "San Martín de los Andes: Lake Lácar waterfront, Primeros Pobladores Museum and the Bandurrias viewpoint." },
        { dia: "Day 2", texto: "Quila Quina in the morning, or a full day at Yuco, Hua Hum and Chachín Waterfall." },
        { dia: "Day 3", texto: "Seven Lakes Route to Villa La Angostura, with a detour to Lake Hermoso or Villa Traful." },
        { dia: "Day 4", texto: "Arrayanes Forest: 12 km on foot or by bike from Bahía Brava, returning by boat." },
        { dia: "Day 5", texto: "Inacayal Waterfall and Belvedere viewpoint, or Cerro Bayo (skiing in winter, bike park in summer)." },
      ],
    },
    faq: [
      {
        pregunta: "What is the best time to visit San Martín de los Andes?",
        respuesta:
          "December to March for lake beaches, hiking, boat trips and the Seven Lakes Route, with highs of 22–24 °C (72–75 °F). July to September for skiing at Chapelco. Autumn, with its red forests, is the quietest season.",
      },
      {
        pregunta: "How long is the Seven Lakes Route?",
        respuesta:
          "The Route 40 stretch between San Martín de los Andes and Villa La Angostura is 110 km and fully paved. It passes lakes Lácar, Machónico, Falkner, Villarino, Escondido, Correntoso and Espejo. Driven straight through it takes about 2 hours; with viewpoints and detours, a full day.",
      },
      {
        pregunta: "Should I stay in San Martín de los Andes or Villa La Angostura?",
        respuesta:
          "San Martín de los Andes, with its own airport 22 km away, is better for Lake Lácar, Quila Quina, Hua Hum, Chapelco and Lanín volcano. Villa La Angostura, 83 km from Bariloche, is better for the Arrayanes Forest and Cerro Bayo. With 4 or 5 days you can split your nights between them.",
      },
      {
        pregunta: "What is the weather like in San Martín de los Andes?",
        respuesta:
          "Summers are mild, with average highs of about 24 °C (75 °F) and lows of 11 °C (52 °F) in January. Winters are cold, with highs of about 7 °C (45 °F) and lows near 1 °C (34 °F) in July. It snows on the mountains in winter, and snow chains are required on the Seven Lakes Route.",
      },
      {
        pregunta: "How do you get to San Martín de los Andes from Buenos Aires?",
        respuesta:
          "Fly into Chapelco Aviador Carlos Campos Airport, 22 km from town, with daily flights in high season. By road it is 1,575 km by car or long-distance bus. You can also fly to Bariloche and drive 184 km along the Seven Lakes Route.",
      },
      {
        pregunta: "How do you get to the Arrayanes Forest from Villa La Angostura?",
        respuesta:
          "On foot or by bike along a 12 km trail from Bahía Brava, or by boat from Bahía Brava or Bahía Mansa. In summer you must enter by 2 pm to walk there and back, or by 3 pm by bike; in winter, by 11 am and noon. If you are returning by boat, buy the ticket before you enter.",
      },
      {
        pregunta: "Can you climb Lanín volcano?",
        respuesta:
          "Yes, from October to April (best December to March). The climb to 3,776 m starts from the Tromen area and takes 2 days with a night in a hut or tent. It is rated hard: National Parks requires advance registration and booking, mandatory gear and, without ice experience, a licensed guide.",
      },
    ],
  },
  fuentes: [
    { label: "San Martín de los Andes — Secretaría de Turismo", url: "https://sanmartindelosandes.gob.ar/" },
    { label: "San Martín de los Andes — Cómo llegar", url: "https://sanmartindelosandes.gob.ar/como-llegar/" },
    { label: "San Martín de los Andes — Paseos y circuitos", url: "https://sanmartindelosandes.gob.ar/nuestros-paseos-y-ircuitos-naturaleza/" },
    { label: "San Martín de los Andes — Centros invernales", url: "https://sanmartindelosandes.gob.ar/centros-invernales/" },
    { label: "Turismo Neuquén — San Martín de los Andes", url: "https://turismo.neuquen.gob.ar/san-martin-de-los-andes/" },
    { label: "Ruta de los Lagos del Sur — Turismo Neuquén (2026)", url: "https://turismo.neuquen.gob.ar/wp-content/uploads/2026/06/Folleto_Ruta_Lagos_del_Sur_2026-1.pdf" },
    { label: "Neuquén Informa — 115 años de San Martín de los Andes", url: "https://www.neuqueninforma.gob.ar/noticias/2013/02/01/23821-san-martin-de-los-andes-festeja-115-anos-de-vida-institucional" },
    { label: "Censo 2022, indicadores demográficos (INDEC)", url: "https://www.indec.gob.ar/ftp/cuadros/poblacion/censo2022_indicadores_demograficos.pdf" },
    { label: "Parque Nacional Lanín (APN)", url: "https://www.argentina.gob.ar/parquesnacionales/lanin" },
    { label: "Ficha del área protegida — PN Lanín (APN)", url: "https://www.argentina.gob.ar/parquesnacionales/regionpatagonia/parque-nacional-lanin/ficha-del-area-protegida" },
    { label: "Actividades — PN Lanín (APN)", url: "https://www.argentina.gob.ar/parquesnacionales/regionpatagonia/parque-nacional-lanin/actividades" },
    { label: "Horarios y cómo llegar — PN Lanín (APN)", url: "https://www.argentina.gob.ar/parquesnacionales/regionpatagonia/parque-nacional-lanin/horarios-como-llegar" },
    { label: "Ascender el Volcán Lanín — Viajá por Argentina", url: "https://www.argentina.gob.ar/viaja-por-argentina/que-hacer/ascender-el-volcan-lanin" },
    { label: "Recorrer el Parque Nacional Lanín — Viajá por Argentina", url: "https://www.argentina.gob.ar/viaja-por-argentina/que-hacer/recorrer-el-parque-nacional-lanin" },
    { label: "Parque Nacional Los Arrayanes (APN)", url: "https://www.argentina.gob.ar/parquesnacionales/losarrayanes" },
    { label: "Sendero al Bosque de Arrayanes (APN)", url: "https://www.argentina.gob.ar/node/153942" },
    { label: "Villa La Angostura Turismo — PN Los Arrayanes", url: "https://www.villalaangosturaturismo.gob.ar/atractivo/parque-nacional-bosque-de-los-arrayanes-3/" },
    { label: "Villa La Angostura Turismo — Historia", url: "https://www.villalaangosturaturismo.gob.ar/historia-de-villa-la-angostura/" },
    { label: "Villa La Angostura Turismo — Cómo llegar", url: "https://www.villalaangosturaturismo.gob.ar/como-llegar/" },
    { label: "Villa La Angostura Turismo — Ruta de los 7 Lagos", url: "https://www.villalaangosturaturismo.gob.ar/atractivo/ruta-de-los-7-lagos/" },
    { label: "Villa La Angostura Turismo — Istmo y miradores de Quetrihué", url: "https://www.villalaangosturaturismo.gob.ar/atractivo/miradores-de-quetrihue/" },
    { label: "Villa La Angostura Turismo — Mirador Belvedere y Cascada Inacayal", url: "https://www.villalaangosturaturismo.gob.ar/atractivo/mirador-belvedere-y-cascada-inacayal/" },
    { label: "Cerro Chapelco — Nosotros", url: "https://www.cerrochapelco.com.ar/nosotros/" },
    { label: "Cerro Bayo — Ficha técnica", url: "https://www.cerrobayo.com.ar/montana/ficha/" },
    { label: "Cerro Bayo — Ubicación", url: "https://www.cerrobayo.com.ar/montana/ubicacion/" },
    { label: "Bariloche Turismo — Siete Lagos", url: "https://barilocheturismo.gob.ar/es/siete-lagos" },
    { label: "Paso Cardenal Samoré — Pasos Fronterizos de Chile", url: "https://www.pasosfronterizos.gov.cl/complejos-fronterizos/loslagos/paso-cardenal-samore/" },
  ],
  relacionados: [
    { tipo: "parque", slug: "lanin" },
    { tipo: "parque", slug: "nahuel-huapi" },
    { tipo: "volcan", slug: "lanin" },
    { tipo: "sendero", slug: "volcan-lanin" },
    { tipo: "fauna", slug: "condor-andino" },
    { tipo: "gastronomia", slug: "trucha-patagonica-recetas-pesca" },
    { tipo: "gastronomia", slug: "hongo-de-pino-recoleccion-secado-usos" },
    { tipo: "gastronomia", slug: "cordero-patagonico" },
    { tipo: "destino", slug: "bariloche" },
    { tipo: "destino", slug: "pucon" },
  ],
}

export default guia
