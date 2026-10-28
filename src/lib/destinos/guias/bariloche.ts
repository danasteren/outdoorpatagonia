import type { DestinoEntry } from "@/lib/destinos/types"

// Guía de Bariloche. Una guía = un archivo (ver catalog.ts).

const guia: DestinoEntry = {
  slug: "bariloche",
  prioridad: 3,
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
    { tipo: "destino", slug: "puerto-varas" },
  ],
}

export default guia
