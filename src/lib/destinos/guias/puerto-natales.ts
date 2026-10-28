import type { DestinoEntry } from "@/lib/destinos/types"

// Guía de Puerto Natales. Una guía = un archivo (ver catalog.ts).

const guia: DestinoEntry = {
  slug: "puerto-natales",
  prioridad: 4,
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
}

export default guia
