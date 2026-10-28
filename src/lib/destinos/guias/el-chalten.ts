import type { DestinoEntry } from "@/lib/destinos/types"

// Guía de El Chaltén. Una guía = un archivo (ver catalog.ts).

const guia: DestinoEntry = {
  slug: "el-chalten",
  prioridad: 5,
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
}

export default guia
