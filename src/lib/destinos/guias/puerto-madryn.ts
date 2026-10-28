import type { DestinoEntry } from "@/lib/destinos/types"

// Guía de Puerto Madryn y Península Valdés. Una guía = un archivo (ver catalog.ts).

const guia: DestinoEntry = {
  slug: "puerto-madryn",
  prioridad: 6,
  nombre: "Puerto Madryn y Península Valdés",
  pais: "AR",
  lat: -42.7692,
  lng: -65.0385,
  wikipediaTitle: "Puerto Madryn",
  es: {
    metaTitle: "Puerto Madryn y Península Valdés: Qué Hacer y Cuándo Ir",
    metaDescription:
      "Guía de Puerto Madryn y Península Valdés, Chubut: avistaje de ballenas de junio a diciembre, pingüinos, orcas, clima mes a mes, cómo llegar y cuántos días ir.",
    subtitulo: "Chubut, Argentina · Puerta de entrada a Península Valdés",
    intro: [
      "Puerto Madryn es una ciudad de la costa de Chubut, en la Patagonia argentina, sobre el Golfo Nuevo, a 1.350 km al sur de Buenos Aires. Nació con el desembarco de 153 colonos galeses que llegaron en el barco Mimosa el 28 de julio de 1865, y es la base para visitar Península Valdés, a 100 km.",
      "Península Valdés es un Área Natural Protegida de la provincia del Chubut de unos 4.000 km², Patrimonio Mundial de la UNESCO desde 1999. Es uno de los mejores lugares del mundo para ver la ballena franca austral, que llega a los golfos de junio a diciembre, y tiene colonias de elefantes marinos, lobos marinos y pingüinos de Magallanes. En Punta Norte, las orcas salen a cazar varándose a propósito en la playa.",
      "La mejor época para ir es de septiembre a noviembre, cuando coinciden las ballenas, los pingüinos, los elefantes marinos y las orcas. De junio a agosto las ballenas se ven incluso desde la costa, en El Doradillo, a pocos kilómetros de la ciudad.",
    ],
    datos: [
      { label: "Provincia", valor: "Chubut" },
      { label: "Fundación", valor: "28 de julio de 1865 (desembarco galés)" },
      { label: "Distancia a Buenos Aires", valor: "1.350 km" },
      { label: "Distancia a Puerto Pirámides", valor: "100 km" },
      { label: "Península Valdés", valor: "≈ 4.000 km², Patrimonio Mundial UNESCO (1999)" },
      { label: "Temporada de ballenas", valor: "Junio a diciembre" },
      { label: "Días recomendados", valor: "3 a 4" },
      { label: "Mejor época", valor: "Septiembre a noviembre" },
    ],
    queHacer: [
      {
        nombre: "Avistaje de ballenas en Puerto Pirámides",
        texto:
          "Puerto Pirámides, el único pueblo dentro de Península Valdés y a 100 km de Puerto Madryn, es el único lugar del Chubut desde donde salen las embarcaciones para ver a la ballena franca austral. Hay salidas todos los días de junio a diciembre y duran entre una hora y media y dos horas. Septiembre y octubre son los meses de más actividad: saltos, coletazos y crías jugando cerca del barco.",
        gygQuery: "Puerto Madryn whale watching",
      },
      {
        nombre: "Ballenas desde la costa en El Doradillo",
        texto:
          "El Área Natural Protegida El Doradillo empieza a unos 15 km del centro de Puerto Madryn, y la playa Las Canteras está a 19 km. Ahí las ballenas madres se acercan con sus crías a pocos metros de la orilla. La visita es libre y gratuita, y conviene ir con marea alta.",
      },
      {
        nombre: "Recorrido por Península Valdés",
        texto:
          "La excursión de día completo empieza en el Centro de Visitantes del Istmo Carlos Ameghino, a 22 km de la entrada al área protegida, y sigue por Puerto Pirámides, Punta Pirámide (lobería), Caleta Valdés (pingüinos y, en Punta Cantor, elefantes marinos) y Punta Norte (lobos y elefantes marinos y orcas). Caleta Valdés está a 75 km de Puerto Pirámides por ripio, y Punta Norte a 79 km. Los puntos de observación abren de 8 a 20 h.",
        gygQuery: "Peninsula Valdes",
      },
      {
        nombre: "Orcas en Punta Norte",
        texto:
          "En Punta Norte, las orcas hacen varamientos intencionales para cazar crías de lobo marino en la orilla, una técnica de caza que se ve en muy pocos lugares del mundo. Pasa sobre todo en marzo y abril, y verlas depende de la marea y de la suerte.",
      },
      {
        nombre: "Pingüinos de Magallanes en Punta Tombo",
        texto:
          "La Reserva Faunística Provincial Punta Tombo, a 175 km al sur de Puerto Madryn, tiene la colonia continental de pingüinos de Magallanes más importante del mundo. Se visita de mediados de septiembre a mediados de abril. Si vas en auto, cargá combustible antes de salir.",
        gygQuery: "Punta Tombo",
      },
      {
        nombre: "Snorkel con lobos marinos en Punta Loma",
        texto:
          "En el Área Natural Protegida Punta Loma, al sur de la ciudad sobre el Golfo Nuevo, hay una colonia de lobos marinos de un pelo que se ve desde un mirador. Desde Puerto Madryn salen excursiones de snorkel para nadar con los lobos marinos en el agua.",
        gygQuery: "Puerto Madryn snorkeling sea lions",
      },
      {
        nombre: "Ecocentro y Punta Cuevas",
        texto:
          "El Ecocentro, sobre la costa de la ciudad, es un centro de interpretación sobre la fauna marina del Golfo Nuevo: ballenas, lobos marinos y pingüinos. Cerca está Punta Cuevas, donde se refugiaron los primeros colonos galeses al desembarcar en 1865.",
      },
      {
        nombre: "Té galés en Gaiman",
        texto:
          "Los colonos galeses se mudaron al valle inferior del río Chubut, donde nacieron Rawson, Trelew y Gaiman. En la zona se conservan la repostería casera y el té galés, y en la provincia se celebra el Eisteddfod, un certamen literario y musical de origen galés.",
        gygQuery: "Gaiman",
      },
    ],
    cuandoIr: {
      resumen:
        "Puerto Madryn se visita todo el año, pero la fauna marca la temporada. De septiembre a noviembre se ven ballenas, pingüinos, elefantes marinos y orcas a la vez. Las ballenas están de junio a diciembre y los pingüinos de septiembre a abril.",
      temporadas: [
        {
          nombre: "Invierno",
          meses: "Junio a agosto",
          texto:
            "Llegan las ballenas francas australes y arrancan los avistajes embarcados en Puerto Pirámides. En julio y agosto las madres con crías se acercan mucho a la costa de El Doradillo. Todavía no hay pingüinos ni elefantes marinos.",
        },
        {
          nombre: "Primavera",
          meses: "Septiembre a noviembre",
          texto:
            "La mejor época: septiembre y octubre son los meses de más actividad de las ballenas, llegan los pingüinos a Punta Tombo y Caleta Valdés, hay elefantes marinos en la costa de la península y aparecen orcas. Es temporada alta: conviene reservar las excursiones con tiempo.",
        },
        {
          nombre: "Verano",
          meses: "Diciembre a febrero",
          texto:
            "Las últimas ballenas se van en diciembre. Es la temporada de playa: Puerto Madryn tiene unos 4 km de costa con agua calma y guardavidas, y hay kayak, buceo y salidas para ver delfines. Siguen los pingüinos y los lobos marinos.",
        },
        {
          nombre: "Otoño",
          meses: "Marzo a mayo",
          texto:
            "Marzo y abril son los meses de las orcas en Punta Norte, que salen a cazar crías de lobo marino. Los pingüinos dejan Punta Tombo a mediados de abril. Ya no hay ballenas.",
        },
      ],
    },
    comoLlegar: [
      {
        modo: "En avión",
        texto:
          "Hay dos aeropuertos: El Tehuelche (PMY), en Puerto Madryn, y el Aeropuerto Internacional Almirante Zar (REL), en Trelew, al sur de la ciudad.",
      },
      {
        modo: "En auto o en bus",
        texto:
          "Puerto Madryn está a 1.350 km de Buenos Aires por la Ruta Nacional 3. La terminal de ómnibus de la ciudad recibe buses de larga distancia. Rawson, la capital de la provincia, queda a unos 50 km al sur.",
      },
      {
        modo: "A Península Valdés",
        texto:
          "Se llega por la Ruta Provincial 2, que sale de la Ruta Nacional 3. El acceso al área protegida está abierto las 24 horas, los 365 días del año. La empresa Mar y Valle tiene buses desde las terminales de Puerto Madryn y Trelew hasta Puerto Pirámides, con horarios que cambian según la temporada.",
      },
    ],
    cuantosDias: {
      resumen:
        "Con 3 días ves la ciudad, Península Valdés y una salida más. Con 4 días sumás Punta Tombo (de septiembre a abril) o el snorkel con lobos marinos sin apuro.",
      itinerario: [
        { dia: "Día 1", texto: "Ecocentro y Punta Cuevas a la mañana; Punta Loma o El Doradillo a la tarde (en temporada de ballenas, con marea alta)." },
        { dia: "Día 2", texto: "Península Valdés en el día: Istmo Ameghino, avistaje de ballenas en Puerto Pirámides, Caleta Valdés y Punta Norte." },
        { dia: "Día 3", texto: "Punta Tombo y sus pingüinos, con vuelta por Gaiman para el té galés." },
        { dia: "Día 4", texto: "Snorkel con lobos marinos, kayak o playa en Puerto Madryn." },
      ],
    },
    faq: [
      {
        pregunta: "¿Cuándo es la temporada de ballenas en Puerto Madryn?",
        respuesta:
          "De junio a diciembre. Los avistajes embarcados salen todos los días desde Puerto Pirámides, en Península Valdés. Septiembre y octubre son los meses de más actividad, y en julio y agosto las ballenas se ven desde la costa en El Doradillo.",
      },
      {
        pregunta: "¿Cuál es la mejor época para ir a Península Valdés?",
        respuesta:
          "De septiembre a noviembre, cuando coinciden las ballenas francas, los pingüinos de Magallanes, los elefantes marinos y las orcas. Para ver los varamientos de orcas en Punta Norte, marzo y abril.",
      },
      {
        pregunta: "¿Cuántos días hacen falta en Puerto Madryn?",
        respuesta:
          "Al menos 3 días: uno para la ciudad, Punta Loma y El Doradillo, uno para Península Valdés y uno para Punta Tombo o el snorkel con lobos marinos. Con 4 días se hace todo sin apuro.",
      },
      {
        pregunta: "¿Se puede ver ballenas desde la costa en Puerto Madryn?",
        respuesta:
          "Sí. En el Área Natural Protegida El Doradillo, a unos 15 km del centro, las ballenas con sus crías se acercan a pocos metros de la orilla, sobre todo en julio y agosto. La visita es libre y gratuita y conviene ir con marea alta.",
      },
      {
        pregunta: "¿Hay que pagar para entrar a Península Valdés?",
        respuesta:
          "Sí. La entrada se paga por persona y por día, con tarifas distintas para visitantes extranjeros, argentinos y residentes del Chubut. Los menores de 5 años y las personas con discapacidad no pagan. El ticket se compra online en el sitio oficial del área protegida.",
      },
      {
        pregunta: "¿A cuánto queda Península Valdés de Puerto Madryn?",
        respuesta:
          "Puerto Pirámides, el único pueblo de la península, está a 100 km de Puerto Madryn por las rutas nacional 3 y provincial 2. El Centro de Visitantes del Istmo Carlos Ameghino está a 22 km de la entrada al área protegida.",
      },
      {
        pregunta: "¿Cuándo hay pingüinos en Punta Tombo?",
        respuesta:
          "De mediados de septiembre a mediados de abril. Punta Tombo está a 175 km de Puerto Madryn y tiene la colonia continental de pingüinos de Magallanes más importante del mundo.",
      },
      {
        pregunta: "¿Cuándo se ven orcas en Península Valdés?",
        respuesta:
          "Las orcas aparecen en primavera y a fines del verano, pero los varamientos intencionales para cazar crías de lobo marino en Punta Norte se ven sobre todo en marzo y abril.",
      },
    ],
  },
  en: {
    metaTitle: "Puerto Madryn & Península Valdés Travel Guide",
    metaDescription:
      "Puerto Madryn and Península Valdés, Argentina: whale watching June to December, penguins, orcas, weather by month, how to get there and how many days to stay.",
    subtitulo: "Chubut, Argentina · Gateway to Península Valdés",
    intro: [
      "Puerto Madryn is a city on the coast of Chubut, in Argentine Patagonia, on the Golfo Nuevo, 1,350 km south of Buenos Aires. It began with the landing of 153 Welsh settlers who arrived on the ship Mimosa on July 28, 1865, and it is the base for visiting Península Valdés, 100 km away.",
      "Península Valdés is a Chubut provincial protected area of about 4,000 km², a UNESCO World Heritage Site since 1999. It is one of the best places in the world to see southern right whales, which come into its gulfs from June to December, and it has colonies of elephant seals, sea lions and Magellanic penguins. At Punta Norte, orcas hunt by deliberately stranding themselves on the beach.",
      "The best time to go is September to November, when whales, penguins, elephant seals and orcas overlap. From June to August you can even see whales from the shore at El Doradillo, a few kilometers from town.",
    ],
    datos: [
      { label: "Province", valor: "Chubut, Argentina" },
      { label: "Founded", valor: "July 28, 1865 (Welsh landing)" },
      { label: "Distance to Buenos Aires", valor: "1,350 km" },
      { label: "Distance to Puerto Pirámides", valor: "100 km" },
      { label: "Península Valdés", valor: "≈ 4,000 km², UNESCO World Heritage (1999)" },
      { label: "Whale season", valor: "June to December" },
      { label: "Recommended stay", valor: "3 to 4 days" },
      { label: "Best time", valor: "September to November" },
    ],
    queHacer: [
      {
        nombre: "Whale watching from Puerto Pirámides",
        texto:
          "Puerto Pirámides, the only town inside Península Valdés and 100 km from Puerto Madryn, is the only place in Chubut where boats leave to see southern right whales. Trips run daily from June to December and last an hour and a half to two hours. September and October are the most active months, with breaching, tail slaps and calves playing near the boat.",
        gygQuery: "Puerto Madryn whale watching",
      },
      {
        nombre: "Shore whale watching at El Doradillo",
        texto:
          "The El Doradillo protected area starts about 15 km from downtown Puerto Madryn, and Las Canteras beach is 19 km away. Mother whales swim with their calves just meters from the shore. Access is free and unrestricted; go at high tide.",
      },
      {
        nombre: "Península Valdés day trip",
        texto:
          "The full-day tour starts at the Istmo Carlos Ameghino Visitor Center, 22 km from the protected area entrance, and continues to Puerto Pirámides, Punta Pirámide (sea lion colony), Caleta Valdés (penguins and, at Punta Cantor, elephant seals) and Punta Norte (sea lions, elephant seals and orcas). Caleta Valdés is 75 km from Puerto Pirámides on gravel, and Punta Norte is 79 km. Viewing points open 8 am to 8 pm.",
        gygQuery: "Peninsula Valdes",
      },
      {
        nombre: "Orcas at Punta Norte",
        texto:
          "At Punta Norte, orcas strand themselves on purpose to catch sea lion pups at the water's edge, a hunting technique seen in very few places on Earth. It happens mostly in March and April, and seeing it depends on the tide and on luck.",
      },
      {
        nombre: "Magellanic penguins at Punta Tombo",
        texto:
          "Punta Tombo Provincial Wildlife Reserve, 175 km south of Puerto Madryn, has the world's most important mainland colony of Magellanic penguins. It is open from mid-September to mid-April. If you drive, fill up before you leave.",
        gygQuery: "Punta Tombo",
      },
      {
        nombre: "Snorkeling with sea lions at Punta Loma",
        texto:
          "The Punta Loma protected area, south of the city on the Golfo Nuevo, has a South American sea lion colony you can watch from a viewpoint. Snorkeling trips leave from Puerto Madryn to swim with the sea lions in the water.",
        gygQuery: "Puerto Madryn snorkeling sea lions",
      },
      {
        nombre: "Ecocentro and Punta Cuevas",
        texto:
          "The Ecocentro, on the city's waterfront, is an interpretation center about the marine life of the Golfo Nuevo: whales, sea lions and penguins. Nearby is Punta Cuevas, where the first Welsh settlers took shelter after landing in 1865.",
      },
      {
        nombre: "Welsh tea in Gaiman",
        texto:
          "The Welsh settlers moved on to the lower Chubut River valley, where Rawson, Trelew and Gaiman were born. The area keeps Welsh home baking and Welsh tea alive, and the province holds the Eisteddfod, a literary and music festival of Welsh origin.",
        gygQuery: "Gaiman",
      },
    ],
    cuandoIr: {
      resumen:
        "Puerto Madryn welcomes visitors year-round, but wildlife sets the calendar. From September to November you can see whales, penguins, elephant seals and orcas at once. Whales are around from June to December and penguins from September to April.",
      temporadas: [
        {
          nombre: "Winter",
          meses: "June to August",
          texto:
            "Southern right whales arrive and boat trips start from Puerto Pirámides. In July and August mothers with calves come very close to the shore at El Doradillo. No penguins or elephant seals yet.",
        },
        {
          nombre: "Spring",
          meses: "September to November",
          texto:
            "The best time: September and October are the whales' most active months, penguins arrive at Punta Tombo and Caleta Valdés, elephant seals line the peninsula's coast and orcas show up. It's high season, so book tours ahead.",
        },
        {
          nombre: "Summer",
          meses: "December to February",
          texto:
            "The last whales leave in December. It's beach season: Puerto Madryn has about 4 km of calm, lifeguarded shoreline, plus kayaking, diving and dolphin-watching trips. Penguins and sea lions are still around.",
        },
        {
          nombre: "Autumn",
          meses: "March to May",
          texto:
            "March and April are orca months at Punta Norte, when they hunt sea lion pups. Penguins leave Punta Tombo in mid-April. The whales are gone.",
        },
      ],
    },
    comoLlegar: [
      {
        modo: "By plane",
        texto:
          "There are two airports: El Tehuelche (PMY) in Puerto Madryn, and Almirante Zar International Airport (REL) in Trelew, south of the city.",
      },
      {
        modo: "By car or bus",
        texto:
          "Puerto Madryn is 1,350 km from Buenos Aires on National Route 3. The city's bus terminal has long-distance services. Rawson, the provincial capital, is about 50 km south.",
      },
      {
        modo: "To Península Valdés",
        texto:
          "Take Provincial Route 2, which branches off National Route 3. The protected area entrance is open 24 hours a day, 365 days a year. Mar y Valle runs buses from the Puerto Madryn and Trelew terminals to Puerto Pirámides, with seasonal schedules.",
      },
    ],
    cuantosDias: {
      resumen:
        "3 days cover the city, Península Valdés and one more outing. With 4 days you can add Punta Tombo (September to April) or sea lion snorkeling without rushing.",
      itinerario: [
        { dia: "Day 1", texto: "Ecocentro and Punta Cuevas in the morning; Punta Loma or El Doradillo in the afternoon (during whale season, at high tide)." },
        { dia: "Day 2", texto: "Península Valdés day trip: Istmo Ameghino, whale watching from Puerto Pirámides, Caleta Valdés and Punta Norte." },
        { dia: "Day 3", texto: "Punta Tombo and its penguins, returning through Gaiman for Welsh tea." },
        { dia: "Day 4", texto: "Sea lion snorkeling, kayaking or the beach in Puerto Madryn." },
      ],
    },
    faq: [
      {
        pregunta: "When is whale season in Puerto Madryn?",
        respuesta:
          "June to December. Boat trips leave daily from Puerto Pirámides, on Península Valdés. September and October are the most active months, and in July and August you can see whales from the shore at El Doradillo.",
      },
      {
        pregunta: "What is the best time to visit Península Valdés?",
        respuesta:
          "September to November, when southern right whales, Magellanic penguins, elephant seals and orcas overlap. To see orcas stranding at Punta Norte, go in March or April.",
      },
      {
        pregunta: "How many days do you need in Puerto Madryn?",
        respuesta:
          "At least 3 days: one for the city, Punta Loma and El Doradillo, one for Península Valdés and one for Punta Tombo or sea lion snorkeling. With 4 days you can do it all at an easy pace.",
      },
      {
        pregunta: "Can you see whales from the shore in Puerto Madryn?",
        respuesta:
          "Yes. At the El Doradillo protected area, about 15 km from downtown, whales and their calves come within meters of the shore, especially in July and August. Access is free; go at high tide.",
      },
      {
        pregunta: "Is there an entrance fee for Península Valdés?",
        respuesta:
          "Yes. The fee is per person per day, with different rates for foreign visitors, Argentine citizens and Chubut residents. Children under 5 and people with disabilities enter free. Tickets are sold online on the protected area's official website.",
      },
      {
        pregunta: "How far is Península Valdés from Puerto Madryn?",
        respuesta:
          "Puerto Pirámides, the peninsula's only town, is 100 km from Puerto Madryn via National Route 3 and Provincial Route 2. The Istmo Carlos Ameghino Visitor Center is 22 km from the protected area entrance.",
      },
      {
        pregunta: "When are the penguins at Punta Tombo?",
        respuesta:
          "From mid-September to mid-April. Punta Tombo is 175 km from Puerto Madryn and has the world's most important mainland colony of Magellanic penguins.",
      },
      {
        pregunta: "When can you see orcas at Península Valdés?",
        respuesta:
          "Orcas appear in spring and late summer, but the deliberate strandings to catch sea lion pups at Punta Norte happen mostly in March and April.",
      },
    ],
  },
  fuentes: [
    { label: "Área Natural Protegida Península Valdés — sitio oficial", url: "https://peninsulavaldes.org.ar/" },
    { label: "Cómo llegar — ANP Península Valdés", url: "https://peninsulavaldes.org.ar/visita-peninsula/como-llegar/" },
    { label: "Qué visitar — ANP Península Valdés", url: "https://peninsulavaldes.org.ar/visita-peninsula/areas-turisticas/" },
    { label: "Calendario de fauna — ANP Península Valdés", url: "https://peninsulavaldes.org.ar/descubri-peninsula/calendario-de-fauna/" },
    { label: "Valor de ingreso — ANP Península Valdés", url: "https://peninsulavaldes.org.ar/visita-peninsula/valor-de-ingreso/" },
    { label: "Particularidades del área — ANP Península Valdés", url: "https://peninsulavaldes.org.ar/descubri-peninsula/particularidades-del-area/" },
    { label: "Folleto oficial de Península Valdés (AANPPV)", url: "https://peninsulavaldes.org.ar/wp-content/uploads/2025/02/Brochure-Peninsula-Valdes.pdf" },
    { label: "Secretaría de Turismo de Puerto Madryn — Conocé Madryn", url: "https://madryn.travel/conoce-madryn/" },
    { label: "Secretaría de Turismo de Puerto Madryn — Ballenas", url: "https://madryn.travel/ballenas-landing" },
    { label: "Ballena franca austral: cuándo y dónde verla — Argentina.travel (INPROTUR)", url: "https://www.argentina.travel/novedades/ballena-franca-austral-en-argentina-cuando-y-donde-verlas-en-su-habitat-natural" },
    { label: "3 días en Puerto Madryn — Argentina.travel (INPROTUR)", url: "https://www.argentina.travel/planea-tu-viaje/3-dias-en-puerto-madryn-entre-julio-y-diciembre" },
    { label: "Caminar entre pingüinos de Magallanes (Punta Tombo) — Presidencia de la Nación", url: "https://www.argentina.gob.ar/node/466975" },
    { label: "Desembarco de los colonos galeses — Cámara de Diputados de la Nación", url: "https://www4.hcdn.gob.ar/dependencias/dsecretaria/Periodo2024/PDF2024/TP2024/3937-D-2024.pdf" },
  ],
  relacionados: [
    { tipo: "fauna", slug: "ballena-franca-austral" },
    { tipo: "fauna", slug: "orca" },
    { tipo: "fauna", slug: "elefante-marino-del-sur" },
    { tipo: "fauna", slug: "pinguino-de-magallanes" },
    { tipo: "fauna", slug: "lobo-marino-del-sur" },
    { tipo: "fauna", slug: "choique" },
    { tipo: "gastronomia", slug: "torta-galesa-historia-receta-patagonia" },
  ],
}

export default guia
