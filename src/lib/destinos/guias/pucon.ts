import type { DestinoEntry } from "@/lib/destinos/types"

// Guía de Pucón. Una guía = un archivo (ver catalog.ts).

const guia: DestinoEntry = {
  slug: "pucon",
  prioridad: 9,
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
}

export default guia
