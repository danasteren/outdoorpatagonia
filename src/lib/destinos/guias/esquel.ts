import type { DestinoEntry } from "@/lib/destinos/types"

// Guía de Esquel y El Bolsón (Comarca Andina del Paralelo 42°).
// Una guía = un archivo (ver catalog.ts).

const guia: DestinoEntry = {
  slug: "esquel",
  prioridad: 13,
  nombre: "Esquel y El Bolsón",
  pais: "AR",
  lat: -42.9,
  lng: -71.3167,
  wikipediaTitle: "Esquel",
  es: {
    metaTitle: "Esquel y El Bolsón: Qué Hacer, Clima y Cómo Llegar",
    metaDescription:
      "Guía de Esquel (Chubut) y El Bolsón (Río Negro): qué hacer, La Trochita, Parque Nacional Los Alerces, Lago Puelo, cuándo ir y cómo llegar.",
    subtitulo: "Chubut y Río Negro, Argentina · Comarca Andina",
    intro: [
      "Esquel, en el noroeste de Chubut, y El Bolsón, en el sudoeste de Río Negro, son las dos ciudades de la Comarca Andina del Paralelo 42°, en la Patagonia argentina. Las separan unos 130 km por la Ruta 40 de Bariloche a El Bolsón, y entre ellas quedan los parques nacionales Los Alerces y Lago Puelo, cerca de la frontera con Chile.",
      "Esquel (593 m de altura, 37.019 habitantes en el censo 2022) es la puerta de entrada al Parque Nacional Los Alerces, Patrimonio Mundial de la UNESCO desde 2017, y la cabecera de La Trochita, el \"Viejo Expreso Patagónico\" de trocha angosta. El Bolsón (315 m, 24.276 habitantes en el municipio) está al pie del cerro Piltriquitrón, tiene una feria regional artesanal que nació en los años 70 y queda a minutos del Parque Nacional Lago Puelo.",
      "Se visita todo el año: el verano es la época de lagos, bosques y trekking, y el invierno la de nieve en La Hoya, el centro de esquí de Esquel, y en el cerro Perito Moreno, en El Bolsón.",
    ],
    datos: [
      { label: "Provincias", valor: "Chubut (Esquel) y Río Negro (El Bolsón)" },
      { label: "Población", valor: "37.019 en Esquel y 24.276 en El Bolsón (censo 2022)" },
      { label: "Altura", valor: "593 m (Esquel) · 315 m (El Bolsón)" },
      { label: "Fundación", valor: "Esquel: 25 de febrero de 1906 · El Bolsón: 28 de enero de 1926" },
      { label: "Parque Nacional Los Alerces", valor: "259.822 ha, creado en 1937 · a 52 km de Esquel hasta Villa Futalaufquen" },
      { label: "Parque Nacional Lago Puelo", valor: "Más de 27.000 ha, creado en 1971 · abre todos los días de 9 a 19 h" },
      { label: "Días recomendados", valor: "4 a 6" },
      { label: "Mejor época", valor: "Dic–mar (verano) · jul–sep (nieve)" },
    ],
    queHacer: [
      {
        nombre: "Parque Nacional Los Alerces",
        texto:
          "Creado en 1937, protege 259.822 hectáreas de bosques patagónicos y el sector de selva valdiviana más extenso de la Argentina, con alerces, coihues, arrayanes y caña coligüe. Es Patrimonio Mundial de la UNESCO desde 2017. El ejemplar más conocido es el Alerce Abuelo: casi 60 m de altura, más de 2,20 m de diámetro y unos 2.600 años; el alerzal más longevo está en el Brazo Norte del lago Menéndez. Entre su fauna están el pudú, el gato huiña, el huemul y la rana de los alerces, que solo vive en una isla del Menéndez. Desde Esquel, Villa Futalaufquen (el centro administrativo del parque) está a 52 km por las rutas 259 y provincial 71.",
        gygQuery: "Los Alerces National Park",
      },
      {
        nombre: "Navegación y trekking al Glaciar Torrecillas",
        texto:
          "La Secretaría de Turismo de Esquel ofrece, dentro de Los Alerces, el trekking al Glaciar Torrecillas, que combina navegación y caminata. Las excursiones por los lagos del parque salen de Villa Futalaufquen y de los puertos del Futalaufquen y el Menéndez.",
        gygQuery: "Los Alerces lake cruise Esquel",
      },
      {
        nombre: "La Trochita, el Viejo Expreso Patagónico",
        texto:
          "Es un tren de trocha angosta de 75 cm, con locomotoras a vapor de 1922, que funciona desde hace más de 70 años. Hoy sale como paseo turístico desde la estación Esquel, principalmente hacia Nahuel Pan, y también circula desde El Maitén. Los pasajes se compran online y hay que presentarse una hora antes de la salida.",
        gygQuery: "La Trochita Esquel",
      },
      {
        nombre: "La Hoya, esquí y verano",
        texto:
          "Abrió en 1974 por iniciativa del Club Andino Esquel y es el cerro más alto de Esquel. Tiene nieve hasta bien entrada la primavera. En verano se puede subir al mirador de La Hoya, desde donde también se hace parapente.",
        gygQuery: "La Hoya Esquel",
      },
      {
        nombre: "Aventura en Esquel: cabalgatas, rafting y túneles de hielo",
        texto:
          "La Secretaría de Turismo de Esquel lista cabalgatas por cerros y valles con baqueanos, rafting en el río Corcovado (al sur de la ciudad, en verano), túneles de hielo en una excursión 4x4 y la Piedra Parada, una formación volcánica a orillas del río Chubut. Los despegues de parapente son el Cerro 21 y el Mirador de La Hoya.",
        gygQuery: "Esquel",
      },
      {
        nombre: "Feria regional y cerro Piltriquitrón (El Bolsón)",
        texto:
          "La Feria Regional Artesanal de El Bolsón, instalada en la plaza central, reúne más de 230 puestos de lanas, cuchillos, dulces naturales y cerámica y nació en los años 70. Sobre el pueblo está el cerro Piltriquitrón (en mapudungun, \"colgado de las nubes\"), donde se hace trekking y parapente y donde está el Bosque Tallado, con 61 esculturas en los árboles.",
        gygQuery: "El Bolsón",
      },
      {
        nombre: "Cabeza del Indio, Cascada Escondida y Mallín Ahogado",
        texto:
          "Desde El Bolsón hay un circuito de miradores hacia el Río Azul y la formación rocosa Cabeza del Indio, y desde ahí senderos de bosque llegan a la Cascada Escondida y a un jardín botánico. En el Circuito del Mallín Ahogado se suman chacras con frutas finas y cerveza artesanal. Hay fiestas como la del Lúpulo y la Fiesta Regional de la Chicha.",
      },
      {
        nombre: "Parque Nacional Lago Puelo",
        texto:
          "Creado en 1971 (antes era un anexo de Los Alerces), protege más de 27.000 hectáreas de transición entre bosque andino patagónico y selva valdiviana. Su lago turquesa está a unos 200 m de altura, en una de las zonas más bajas de la cordillera. Abre todos los días de 9 a 19 h y el único acceso es la Ruta Provincial 16. Se puede acampar, nadar, navegar y pescar. El derecho de acceso vale 72 horas.",
        gygQuery: "Lago Puelo",
      },
    ],
    cuandoIr: {
      resumen:
        "De diciembre a marzo para lagos, bosques y trekking; de julio a septiembre para esquiar en La Hoya y en el cerro Perito Moreno. En primavera hay menos gente y la temporada de pesca deportiva abre en noviembre. En invierno el parque puede estar cubierto de nieve.",
      temporadas: [
        {
          nombre: "Verano",
          meses: "Diciembre a febrero",
          texto:
            "Es la temporada alta. En El Bolsón, la máxima media de enero es de unos 27 °C. Es la época de rafting, navegación en los lagos del parque, playas de lago y trekking.",
        },
        {
          nombre: "Otoño",
          meses: "Marzo a mayo",
          texto: "Bajan las temperaturas y los bosques cambian de color. Hay menos gente en los parques.",
        },
        {
          nombre: "Invierno",
          meses: "Junio a agosto",
          texto:
            "En julio, la temperatura media es de unos 1,7 °C en Esquel y 3,5 °C en El Bolsón. Es la temporada de esquí en La Hoya, que tiene nieve hasta bien entrada la primavera, y en el cerro Perito Moreno. Para Los Alerces, hay que consultar el estado de las rutas en Vialidad Nacional.",
        },
        {
          nombre: "Primavera",
          meses: "Septiembre a noviembre",
          texto:
            "Mejor clima que en invierno y poca gente. La temporada de pesca deportiva 2026-2027 abre en Pueblo Carao el domingo 1 de noviembre.",
        },
      ],
    },
    comoLlegar: [
      {
        modo: "En avión",
        texto:
          "Esquel tiene vuelos regulares a Buenos Aires (Aeroparque) y, en invierno, directos desde Córdoba. Para El Bolsón y Lago Puelo se suele volar a Bariloche o a Esquel y seguir por tierra.",
      },
      {
        modo: "Por tierra",
        texto:
          "De Bariloche a El Bolsón hay unos 130 km por la Ruta 40. A Los Alerces desde Esquel se va por las rutas 259 y provincial 71 (52 km hasta Villa Futalaufquen; la entrada Portada Centro está a 38 km); desde El Bolsón, por la Ruta 40 y la provincial 71 hasta la Portada Norte (105 km). A Lago Puelo se llega desde Bariloche por la Ruta 40 y la provincial 16 (unos 145 km) y desde Esquel (unos 155 km) por la Ruta 40, pasando por El Hoyo hasta Cerro Radal. Hay buses de larga distancia a Esquel y colectivos locales a Villa Futalaufquen y Lago Puelo.",
      },
    ],
    cuantosDias: {
      resumen:
        "Con 4 a 6 días se recorren las dos ciudades y los dos parques: dos días para Esquel y Los Alerces, y dos o tres para El Bolsón y Lago Puelo.",
      itinerario: [
        { dia: "Día 1", texto: "Esquel: La Trochita (Nahuel Pan) y Reserva Laguna La Zeta." },
        { dia: "Día 2", texto: "Parque Nacional Los Alerces: Villa Futalaufquen, el lago Menéndez y el Alerce Abuelo." },
        { dia: "Día 3", texto: "Traslado a El Bolsón por la Ruta 40 y la provincial 71; feria regional." },
        { dia: "Día 4", texto: "Cerro Piltriquitrón y el Bosque Tallado, o Cabeza del Indio y Cascada Escondida." },
        { dia: "Día 5", texto: "Parque Nacional Lago Puelo: playa, navegación o senderos." },
      ],
    },
    faq: [
      {
        pregunta: "¿Cuántos días conviene quedarse en Esquel y El Bolsón?",
        respuesta:
          "Entre 4 y 6 días. Esquel y Los Alerces llevan unos 2 días; El Bolsón y el Parque Nacional Lago Puelo, 2 o 3.",
      },
      {
        pregunta: "¿Cuál es la mejor época para ir a Esquel y El Bolsón?",
        respuesta:
          "De diciembre a marzo para lagos, trekking y rafting; de julio a septiembre para esquiar en La Hoya y en el cerro Perito Moreno. La primavera tiene menos gente y la pesca deportiva abre en noviembre.",
      },
      {
        pregunta: "¿Cómo se llega al Parque Nacional Los Alerces desde Esquel?",
        respuesta:
          "Por la Ruta 259 y la provincial 71: son 52 km hasta Villa Futalaufquen y 38 km hasta la Portada Centro. Hay colectivo diario de Esquel a Villa Futalaufquen. La provincial 71 llega a las tres portadas (Sur, Centro y Norte); desde El Bolsón la Portada Norte está a 105 km.",
      },
      {
        pregunta: "¿Cuánto cuesta entrar a Los Alerces y a Lago Puelo?",
        respuesta:
          "Las tarifas cambian: hay que consultarlas en la intendencia de cada parque antes de viajar. En Lago Puelo el derecho de acceso vale 72 horas y, por el momento, no se cobra.",
      },
      {
        pregunta: "¿Qué es La Trochita?",
        respuesta:
          "Es el Viejo Expreso Patagónico, un tren de trocha angosta (75 cm) con locomotoras a vapor de 1922. Hoy hace paseos turísticos desde la estación Esquel, sobre todo hasta Nahuel Pan.",
      },
      {
        pregunta: "¿Qué ver en El Bolsón?",
        respuesta:
          "La Feria Regional Artesanal en la plaza central, el cerro Piltriquitrón con su Bosque Tallado, la Cabeza del Indio, la Cascada Escondida y el Parque Nacional Lago Puelo.",
      },
    ],
  },
  en: {
    metaTitle: "Esquel & El Bolsón Travel Guide: Things to Do",
    metaDescription:
      "Esquel (Chubut) and El Bolsón (Río Negro) travel guide: things to do, La Trochita, Los Alerces National Park, Lago Puelo, best time to visit and how to get there.",
    subtitulo: "Chubut and Río Negro, Argentina · Andean Region",
    intro: [
      "Esquel, in northwest Chubut, and El Bolsón, in southwest Río Negro, are the two towns of the Comarca Andina del Paralelo 42° in Argentine Patagonia. El Bolsón is about 130 km south of Bariloche on Route 40, and between the two towns lie Los Alerces and Lago Puelo national parks, close to the Chilean border.",
      "Esquel (593 m, 37,019 residents in the 2022 census) is the gateway to Los Alerces National Park, a UNESCO World Heritage Site since 2017, and the base of La Trochita, the narrow-gauge \"Old Patagonian Express\". El Bolsón (315 m, 24,276 residents in the municipality) sits at the foot of Piltriquitrón mountain, has a regional crafts fair that dates from the 1970s, and is minutes from Lago Puelo National Park.",
      "It is a year-round destination: summer is for lakes, forests and hiking, and winter for snow at La Hoya, Esquel's ski resort, and Cerro Perito Moreno near El Bolsón.",
    ],
    datos: [
      { label: "Provinces", valor: "Chubut (Esquel) and Río Negro (El Bolsón)" },
      { label: "Population", valor: "37,019 in Esquel and 24,276 in El Bolsón (2022 census)" },
      { label: "Elevation", valor: "593 m (Esquel) · 315 m (El Bolsón)" },
      { label: "Founded", valor: "Esquel: Feb 25, 1906 · El Bolsón: Jan 28, 1926" },
      { label: "Los Alerces National Park", valor: "259,822 ha, created in 1937 · 52 km from Esquel to Villa Futalaufquen" },
      { label: "Lago Puelo National Park", valor: "Over 27,000 ha, created in 1971 · open daily 9 am to 7 pm" },
      { label: "Recommended stay", valor: "4 to 6 days" },
      { label: "Best time", valor: "Dec–Mar (summer) · Jul–Sep (snow)" },
    ],
    queHacer: [
      {
        nombre: "Los Alerces National Park",
        texto:
          "Created in 1937, it protects 259,822 hectares of Patagonian forest and the largest stretch of Valdivian rainforest in Argentina, with alerce, coihue, arrayán and colihue cane. It has been a UNESCO World Heritage Site since 2017. The best-known tree is the Alerce Abuelo: almost 60 m tall, over 2.2 m in diameter and about 2,600 years old; the oldest known alerce grove is on the North Arm of Lake Menéndez. Wildlife includes the pudú, the kodkod, the huemul and the Los Alerces frog, found only on one island in Lake Menéndez. From Esquel, Villa Futalaufquen (the park's administrative center) is 52 km away via routes 259 and 71.",
        gygQuery: "Los Alerces National Park",
      },
      {
        nombre: "Boat trips and the Torrecillas Glacier trek",
        texto:
          "Esquel's tourism office lists, inside Los Alerces, a trek to the Torrecillas Glacier that combines a boat ride and a hike. Lake excursions leave from Villa Futalaufquen and the piers on Lakes Futalaufquen and Menéndez.",
        gygQuery: "Los Alerces lake cruise Esquel",
      },
      {
        nombre: "La Trochita, the Old Patagonian Express",
        texto:
          "A 75 cm narrow-gauge train with steam locomotives from 1922, running for more than 70 years. Today it operates as a tourist ride from Esquel station, mainly to Nahuel Pan, and also from El Maitén. Tickets are sold online and passengers should arrive one hour before departure.",
        gygQuery: "La Trochita Esquel",
      },
      {
        nombre: "La Hoya: skiing and summer",
        texto:
          "It opened in 1974 on the initiative of the Club Andino Esquel and is Esquel's highest mountain, with snow well into spring. In summer you can ride up to the La Hoya viewpoint, which is also a paragliding launch.",
        gygQuery: "La Hoya Esquel",
      },
      {
        nombre: "Adventure around Esquel: horseback, rafting and ice tunnels",
        texto:
          "Esquel's tourism office lists horseback rides with local guides, summer rafting on the Corcovado River (south of town), ice tunnels on a 4x4 excursion and Piedra Parada, a volcanic formation on the Chubut River. Paragliding launches are Cerro 21 and the La Hoya viewpoint.",
        gygQuery: "Esquel",
      },
      {
        nombre: "Regional fair and Piltriquitrón (El Bolsón)",
        texto:
          "El Bolsón's Regional Crafts Fair, on the main square, has more than 230 stalls of wool goods, knives, natural jams and ceramics and dates from the 1970s. Above town rises Piltriquitrón (\"hanging from the clouds\" in Mapudungun), with hiking, paragliding and the Bosque Tallado, a forest with 61 sculptures carved into the trees.",
        gygQuery: "El Bolsón",
      },
      {
        nombre: "Cabeza del Indio, Cascada Escondida and Mallín Ahogado",
        texto:
          "From El Bolsón a viewpoint circuit looks toward the Río Azul and the Cabeza del Indio rock formation, and forest trails lead from there to Cascada Escondida and a botanical garden. The Mallín Ahogado circuit adds farms with berries and craft beer. Local festivals include the Hop Festival and the Fiesta Regional de la Chicha.",
      },
      {
        nombre: "Lago Puelo National Park",
        texto:
          "Created in 1971 (it used to be an annex of Los Alerces), it protects over 27,000 hectares of transition between Andean Patagonian forest and Valdivian rainforest. Its turquoise lake lies at about 200 m, in one of the lowest parts of the Andes. It is open daily 9 am to 7 pm and the only access is Provincial Route 16. You can camp, swim, boat and fish. The entry permit is valid for 72 hours.",
        gygQuery: "Lago Puelo",
      },
    ],
    cuandoIr: {
      resumen:
        "December to March for lakes, forests and hiking; July to September for skiing at La Hoya and Cerro Perito Moreno. Spring is quieter and the sport fishing season opens in November. In winter the park can be covered in snow.",
      temporadas: [
        {
          nombre: "Summer",
          meses: "December to February",
          texto:
            "High season. In El Bolsón the average January high is about 27 °C (81 °F). It is the time for rafting, boat trips in the park, lake beaches and hiking.",
        },
        {
          nombre: "Autumn",
          meses: "March to May",
          texto: "Temperatures drop and the forests change color. Fewer visitors in the parks.",
        },
        {
          nombre: "Winter",
          meses: "June to August",
          texto:
            "The July mean temperature is about 1.7 °C (35 °F) in Esquel and 3.5 °C (38 °F) in El Bolsón. It is ski season at La Hoya, which keeps snow well into spring, and at Cerro Perito Moreno. For Los Alerces, check road conditions with Vialidad Nacional.",
        },
        {
          nombre: "Spring",
          meses: "September to November",
          texto:
            "Milder than winter and quiet. The 2026-2027 sport fishing season opens at Pueblo Carao on Sunday, November 1.",
        },
      ],
    },
    comoLlegar: [
      {
        modo: "By air",
        texto:
          "Esquel has scheduled flights to Buenos Aires (Aeroparque) and, in winter, direct flights from Córdoba. For El Bolsón and Lago Puelo, most visitors fly to Bariloche or Esquel and continue by road.",
      },
      {
        modo: "By road",
        texto:
          "Bariloche to El Bolsón is about 130 km on Route 40. To Los Alerces from Esquel, take routes 259 and 71 (52 km to Villa Futalaufquen; the Portada Centro entrance is 38 km away); from El Bolsón, Route 40 and Provincial 71 to the Portada Norte (105 km). Lago Puelo is reached from Bariloche on Route 40 and Provincial 16 (about 145 km) and from Esquel (about 155 km) via Route 40 through El Hoyo to Cerro Radal. Long-distance buses serve Esquel, and local buses run to Villa Futalaufquen and Lago Puelo.",
      },
    ],
    cuantosDias: {
      resumen:
        "Four to six days cover both towns and both parks: two days for Esquel and Los Alerces, and two or three for El Bolsón and Lago Puelo.",
      itinerario: [
        { dia: "Day 1", texto: "Esquel: La Trochita (Nahuel Pan) and Laguna La Zeta reserve." },
        { dia: "Day 2", texto: "Los Alerces National Park: Villa Futalaufquen, Lake Menéndez and the Alerce Abuelo." },
        { dia: "Day 3", texto: "Transfer to El Bolsón via Route 40 and Provincial 71; regional fair." },
        { dia: "Day 4", texto: "Piltriquitrón and the Bosque Tallado, or Cabeza del Indio and Cascada Escondida." },
        { dia: "Day 5", texto: "Lago Puelo National Park: beach, boat trip or trails." },
      ],
    },
    faq: [
      {
        pregunta: "How many days do you need in Esquel and El Bolsón?",
        respuesta:
          "Four to six days. Esquel and Los Alerces take about 2 days; El Bolsón and Lago Puelo National Park, 2 or 3.",
      },
      {
        pregunta: "What is the best time to visit Esquel and El Bolsón?",
        respuesta:
          "December to March for lakes, hiking and rafting; July to September for skiing at La Hoya and Cerro Perito Moreno. Spring is quieter and sport fishing opens in November.",
      },
      {
        pregunta: "How do you get to Los Alerces National Park from Esquel?",
        respuesta:
          "Take Route 259 and Provincial 71: it is 52 km to Villa Futalaufquen and 38 km to the Portada Centro entrance. A daily bus runs from Esquel to Villa Futalaufquen. Provincial 71 reaches all three entrances (Sur, Centro and Norte); from El Bolsón the Portada Norte is 105 km away.",
      },
      {
        pregunta: "How much does it cost to enter Los Alerces and Lago Puelo?",
        respuesta:
          "Fees change, so check with each park's office before you travel. At Lago Puelo the entry permit is valid for 72 hours and, for now, is not charged.",
      },
      {
        pregunta: "What is La Trochita?",
        respuesta:
          "The Old Patagonian Express, a 75 cm narrow-gauge train with steam locomotives from 1922. Today it runs tourist rides from Esquel station, mainly to Nahuel Pan.",
      },
      {
        pregunta: "What is there to see in El Bolsón?",
        respuesta:
          "The Regional Crafts Fair on the main square, Piltriquitrón mountain and its Bosque Tallado, Cabeza del Indio, Cascada Escondida and Lago Puelo National Park.",
      },
    ],
  },
  fuentes: [
    { label: "Turismo Esquel — Subsecretaría de Turismo", url: "https://www.esquel.tur.ar" },
    { label: "Parque Nacional Los Alerces (APN)", url: "https://www.argentina.gob.ar/parquesnacionales/losalerces" },
    { label: "Ficha del área protegida — PN Los Alerces (APN)", url: "https://www.argentina.gob.ar/parquesnacionales/regionpatagonia/parque-nacional-los-alerces/ficha-del-area-protegida" },
    { label: "Horarios y cómo llegar — PN Los Alerces (APN)", url: "https://www.argentina.gob.ar/parquesnacionales/regionpatagonia/parque-nacional-los-alerces/horarios-como-llegar" },
    { label: "Parque Nacional Lago Puelo (APN)", url: "https://www.argentina.gob.ar/parquesnacionales/lagopuelo" },
    { label: "Horarios y cómo llegar — PN Lago Puelo (APN)", url: "https://www.argentina.gob.ar/parquesnacionales/regionpatagonia/parque-nacional-lago-puelo/horarios-como-llegar" },
    { label: "La Trochita", url: "https://latrochita.org.ar" },
    { label: "Municipalidad de El Bolsón — Turismo", url: "https://www.elbolson.gob.ar/index.php/turismo/cascada-escondida-cabeza-del-indio" },
    { label: "Turismo Río Negro — El Bolsón", url: "https://turismo.rionegro.gov.ar/localidad/el-bolson_154" },
    { label: "Censo 2022 (INDEC)", url: "https://www.indec.gob.ar/ftp/cuadros/poblacion/censo2022_indicadores_demograficos.pdf" },
  ],
  relacionados: [
    { tipo: "parque", slug: "los-alerces" },
    { tipo: "parque", slug: "lago-puelo" },
    { tipo: "parque", slug: "nahuel-huapi" },
    { tipo: "escalada", slug: "esquel" },
    { tipo: "fauna", slug: "huemul" },
    { tipo: "gastronomia", slug: "trucha-patagonica-recetas-pesca" },
    { tipo: "gastronomia", slug: "mermelada-rosa-mosqueta-patagonica" },
    { tipo: "destino", slug: "bariloche" },
    { tipo: "destino", slug: "san-martin-de-los-andes" },
  ],
}

export default guia
