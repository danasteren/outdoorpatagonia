import type { DestinoEntry } from "@/lib/destinos/types"

// Guía de Chiloé. Una guía = un archivo (ver catalog.ts).

const guia: DestinoEntry = {
  slug: "chiloe",
  prioridad: 10,
  nombre: "Chiloé",
  pais: "CL",
  lat: -42.4808,
  lng: -73.7627,
  wikipediaTitle: "Isla Grande de Chiloé",
  es: {
    metaTitle: "Chiloé: Qué Hacer, Clima, Cuándo Ir y Cómo Llegar",
    metaDescription:
      "Guía de Chiloé, Chile: iglesias Patrimonio de la Humanidad, palafitos de Castro, pingüinos de Puñihuil, Parque Nacional Chiloé, clima mes a mes y cómo llegar.",
    subtitulo: "Región de Los Lagos, Chile · Castro, Ancud y Dalcahue",
    intro: [
      "Chiloé es un archipiélago de la Región de Los Lagos, en el sur de Chile, al sur de Puerto Montt. Su isla principal, la Isla Grande de Chiloé, se separa del continente por el Canal de Chacao, que se cruza en transbordador desde Pargua, a 60 km de Puerto Montt. Sus ciudades más grandes son Castro, la capital provincial, con 46.997 habitantes, y Ancud, con 40.949, según el Censo 2024.",
      "En el archipiélago hay más de 80 iglesias históricas de madera, y 16 de ellas fueron declaradas Patrimonio de la Humanidad por la UNESCO en el año 2000. La de Santa María de Loreto, en Achao, construida hacia 1740 por misioneros jesuitas, es la más antigua que sigue en pie. Castro suma los palafitos, casas de colores construidas sobre pilotes en el agua.",
      "En la costa del Pacífico, el Parque Nacional Chiloé protege 42.567 ha de bosque siempreverde desde 1982, y frente a Ancud están los Islotes de Puñihuil, uno de los pocos lugares del mundo donde anidan juntos el pingüino de Humboldt y el de Magallanes. La cocina chilota, con el curanto en hoyo y el milcao, es parte del viaje.",
    ],
    datos: [
      { label: "Región", valor: "Los Lagos, Chile" },
      { label: "Población (Censo 2024)", valor: "Castro 46.997 · Ancud 40.949 hab." },
      { label: "Aeródromo", valor: "Mocopulli (MHC), entre Castro y Dalcahue" },
      { label: "Santiago – Chiloé", valor: "1.100 km por la Ruta 5 Sur" },
      { label: "Cruce a la isla", valor: "Transbordador Pargua – Chacao" },
      { label: "Iglesias UNESCO", valor: "16, declaradas en 2000" },
      { label: "Días recomendados", valor: "3 a 5" },
      { label: "Mejor época", valor: "Noviembre a marzo" },
    ],
    queHacer: [
      {
        nombre: "Castro y sus palafitos",
        texto:
          "Castro es la capital de la provincia y el mejor punto para recorrer la isla. Su Iglesia de San Francisco, construida en 1910 con alerce, ciprés, coigüe, raulí y olivillo, es Monumento Nacional desde 1979 y Patrimonio de la Humanidad desde 2000. Los palafitos se ven desde arriba en el Mirador Gamboa o desde el agua, en los paseos en lancha que salen del puerto, sobre todo al atardecer. A 5 km está la iglesia de Nercón, levantada sin clavos de metal.",
        gygQuery: "Castro Chiloe",
      },
      {
        nombre: "Ruta de las iglesias Patrimonio de la Humanidad",
        texto:
          "Las 16 iglesias declaradas por la UNESCO están en Castro, Nercón, Rilán, Dalcahue, Tenaún, Colo, San Juan, Chonchi, Vilupulli, Achao, Quinchao, Caguach, Chelín, Ichuac, Aldachildo y Detif. Sernatur propone recorrer nueve en 3 días y 142 km, desde Colo (a 70 km de Castro) hasta Chonchi, con su cielo abovedado de estrellas. La de Vilupulli, a 15 km de Castro, tiene la torre más alta y esbelta del archipiélago. Varias siguen siendo templos activos: revisá los horarios antes de ir.",
        gygQuery: "Chiloe churches",
      },
      {
        nombre: "Pingüinos en los Islotes de Puñihuil",
        texto:
          "El Monumento Natural Islotes de Puñihuil, administrado por CONAF, son tres islotes frente a la caleta de Puñihuil, en la comuna de Ancud. Ahí anidan el pingüino de Humboldt y el de Magallanes, y también se ve el chungungo o nutria de mar. Los islotes se recorren en bote, en paseos de 30 minutos que salen de la caleta; no se puede desembarcar. Se llega por la Ruta W-20 entre Ancud y Pumillahue (23 km) y un desvío de unos 3 km hasta la playa.",
        gygQuery: "Punihuil penguins",
      },
      {
        nombre: "Dalcahue, su feria y la isla Quinchao",
        texto:
          "A 25 km de Castro, Dalcahue tiene una feria artesanal a la que llegan en bote artesanos de las islas, dos veces por semana, con tejidos de lana, cestería y tallados en madera nativa. Su iglesia, de 1849, tiene una torre de 26 m. Desde la rampa de Dalcahue, un transbordador cruza en pocos minutos a la isla Quinchao, la segunda más grande del archipiélago, con las iglesias de Achao y Quinchao.",
        gygQuery: "Dalcahue",
      },
      {
        nombre: "Parque Nacional Chiloé (Cucao)",
        texto:
          "El acceso más visitado es el sector Cucao-Chanquín: desde Castro, Ruta 5 al sur hasta el cruce Notuco (24 km) y después 34,5 km hasta Cucao, alrededor de 90 minutos, con transporte público. Ahí hay un sendero elevado de unos 200 m con mirador al lago Cucao, dunas costeras y camping de la comunidad indígena de Chanquín. Desde Ancud se llega al sector Chepu, donde un sendero costero de 14 km (unas 5 horas) va de Puerto Anguay al río Lar. CONAF avisa que las playas del Pacífico no son aptas para nadar.",
        gygQuery: "Chiloe National Park",
      },
      {
        nombre: "Muelle de las Almas",
        texto:
          "En la comuna de Chonchi, sobre la costa del Pacífico, es un muelle de madera construido como prolongación de un acantilado. Recuerda la leyenda chilota del balsero Tempilkahue, que lleva a las almas a su descanso eterno. Se llega desde Chonchi y es uno de los lugares más fotografiados de la isla.",
      },
      {
        nombre: "Isla Aucar, Putemún y Tantauco",
        texto:
          "En Quemchi, la isla Aucar se alcanza por una pasarela de más de 430 m. Cerca de Castro, el humedal de Putemún se recorre en kayak, con flamencos. Al sur, el Parque Tantauco, un área protegida privada, tiene el Sendero del Bosque Hundido. Para Chepu y Tantauco conviene tener vehículo propio.",
      },
      {
        nombre: "Curanto, milcao y cocina chilota",
        texto:
          "El curanto en hoyo cocina mariscos, carnes ahumadas y longanizas bajo tierra, sobre piedras calientes, y se acompaña con milcao y chapalele, panes de papa. El milcao es un pan frito de papa nativa relleno de chicharrones. En la feria de Dalcahue hay cocinerías con curanto, cazuela y pescado.",
        gygQuery: "Chiloe food tour",
      },
    ],
    cuandoIr: {
      resumen:
        "Se puede ir todo el año, pero noviembre a marzo es la mejor época para el Parque Nacional Chiloé y los paseos al aire libre, según CONAF. El clima es oceánico, lluvioso y cambiante en cualquier mes: llevá ropa impermeable y abrigo.",
      temporadas: [
        {
          nombre: "Verano",
          meses: "Diciembre a febrero",
          texto:
            "Temporada alta: días largos, paseos en bote en Puñihuil, senderos del Parque Nacional Chiloé y ferias costumbristas. Aun en verano puede llover.",
        },
        {
          nombre: "Otoño",
          meses: "Marzo a mayo",
          texto:
            "Marzo todavía entra en la mejor época del parque. Después hay menos visitantes y más lluvia; las iglesias y las ferias siguen abiertas.",
        },
        {
          nombre: "Invierno",
          meses: "Junio a agosto",
          texto:
            "Es la época más lluviosa y de días más cortos. Los paseos en bote en Puñihuil tienen horario de invierno, hasta las 17:30. Buen momento para la ruta de las iglesias y la cocina chilota.",
        },
        {
          nombre: "Primavera",
          meses: "Septiembre a noviembre",
          texto:
            "Los días se alargan y desde noviembre empieza la mejor época para el Parque Nacional Chiloé. El clima sigue cambiante: llevá capas e impermeable.",
        },
      ],
    },
    comoLlegar: [
      {
        modo: "En avión",
        texto:
          "Hay vuelos desde Santiago al aeródromo Mocopulli (MHC), entre Castro y Dalcahue, de unas 2 horas. La otra opción es volar al aeropuerto El Tepual (PMC), en Puerto Montt, y seguir por tierra hasta Pargua para cruzar el Canal de Chacao.",
      },
      {
        modo: "En auto o bus desde Puerto Montt",
        texto:
          "Pargua está a 60 km de Puerto Montt. Ahí se cruza el Canal de Chacao en transbordador hasta Chacao, en la Isla Grande, y la Ruta 5 sigue hacia Ancud y Castro.",
      },
      {
        modo: "Desde Santiago por tierra",
        texto:
          "Son 1.100 km por la Ruta 5 Sur, unas 12 horas de manejo sin paradas. En bus, el viaje a Castro lleva unas 14 horas, con el cruce del canal incluido.",
      },
    ],
    cuantosDias: {
      resumen:
        "Con 3 días ves Castro, Dalcahue, algunas iglesias y el Parque Nacional Chiloé. Con 4 o 5 sumás los pingüinos de Puñihuil, la isla Quinchao y Chonchi.",
      itinerario: [
        { dia: "Día 1", texto: "Castro: Iglesia de San Francisco, palafitos desde el Mirador Gamboa y paseo en lancha al atardecer; iglesia de Nercón." },
        { dia: "Día 2", texto: "Parque Nacional Chiloé en Cucao: sendero elevado de Chanquín y dunas. A la vuelta, Vilupulli, Chonchi y el Muelle de las Almas." },
        { dia: "Día 3", texto: "Dalcahue y su feria, transbordador a Quinchao e iglesia de Achao." },
        { dia: "Día 4", texto: "Ancud y los pingüinos de los Islotes de Puñihuil en bote." },
        { dia: "Día 5", texto: "Iglesias del norte (Tenaún, Colo, San Juan) o isla Aucar en Quemchi." },
      ],
    },
    faq: [
      {
        pregunta: "¿Dónde queda Chiloé?",
        respuesta:
          "En la Región de Los Lagos, en el sur de Chile, al sur de Puerto Montt. La Isla Grande de Chiloé se separa del continente por el Canal de Chacao, que se cruza en transbordador desde Pargua, a 60 km de Puerto Montt.",
      },
      {
        pregunta: "¿Cómo llegar a Chiloé?",
        respuesta:
          "En avión desde Santiago al aeródromo Mocopulli (MHC), entre Castro y Dalcahue, unas 2 horas. Por tierra, hasta Pargua y en transbordador por el Canal de Chacao. Desde Santiago son 1.100 km por la Ruta 5 Sur; en bus, unas 14 horas hasta Castro.",
      },
      {
        pregunta: "¿Cuántas iglesias de Chiloé son Patrimonio de la Humanidad?",
        respuesta:
          "16, declaradas por la UNESCO en el año 2000, entre más de 80 iglesias históricas de madera del archipiélago. La más antigua en pie es la de Achao, de alrededor de 1740.",
      },
      {
        pregunta: "¿Dónde ver pingüinos en Chiloé?",
        respuesta:
          "En el Monumento Natural Islotes de Puñihuil, en la comuna de Ancud, donde anidan el pingüino de Humboldt y el de Magallanes. Se ven desde el bote, en paseos de 30 minutos que salen de la caleta de Puñihuil; no se puede desembarcar en los islotes.",
      },
      {
        pregunta: "¿Cómo llegar al Parque Nacional Chiloé desde Castro?",
        respuesta:
          "Por la Ruta 5 al sur hasta el cruce Notuco (24 km) y después 34,5 km hasta Cucao, alrededor de 90 minutos. Hay transporte público a Cucao.",
      },
      {
        pregunta: "¿Cuántos días hacen falta en Chiloé?",
        respuesta:
          "Al menos 3: Castro, el Parque Nacional Chiloé y Dalcahue con la isla Quinchao. Con 4 o 5 días sumás los pingüinos de Puñihuil y las iglesias del norte de la isla.",
      },
      {
        pregunta: "¿Cuál es la mejor época para ir a Chiloé?",
        respuesta:
          "De noviembre a marzo, según CONAF, para el Parque Nacional Chiloé. Igual se puede ir todo el año: el clima es lluvioso y cambiante en cualquier estación, así que hace falta ropa impermeable.",
      },
      {
        pregunta: "¿Qué comer en Chiloé?",
        respuesta:
          "Curanto en hoyo (mariscos y carnes cocidos bajo tierra sobre piedras calientes), milcao y chapalele, panes de papa. En la feria de Dalcahue hay cocinerías con curanto y cazuela.",
      },
    ],
  },
  en: {
    metaTitle: "Chiloé Travel Guide: Things to Do & Best Time, Chile",
    metaDescription:
      "Chiloé, Chile: UNESCO wooden churches, Castro's stilt houses, Puñihuil penguins, Chiloé National Park, weather by month and how to get to the island.",
    subtitulo: "Los Lagos Region, Chile · Castro, Ancud and Dalcahue",
    intro: [
      "Chiloé is an archipelago in Chile's Los Lagos Region, south of Puerto Montt. Its main island, Isla Grande de Chiloé, is separated from the mainland by the Chacao Channel, crossed by ferry from Pargua, 60 km from Puerto Montt. Its largest towns are Castro, the provincial capital, with 46,997 inhabitants, and Ancud, with 40,949, according to the 2024 Census.",
      "The archipelago has more than 80 historic wooden churches, and 16 of them were declared UNESCO World Heritage Sites in 2000. Santa María de Loreto in Achao, built around 1740 by Jesuit missionaries, is the oldest one still standing. Castro adds its palafitos, colorful houses built on stilts over the water.",
      "On the Pacific coast, Chiloé National Park has protected 42,567 ha of evergreen forest since 1982, and off Ancud lie the Puñihuil Islets, one of the few places in the world where Humboldt and Magellanic penguins nest together. Chilote cooking, with curanto cooked in a pit and milcao, is part of the trip.",
    ],
    datos: [
      { label: "Region", valor: "Los Lagos, Chile" },
      { label: "Population (2024 Census)", valor: "Castro 46,997 · Ancud 40,949" },
      { label: "Airport", valor: "Mocopulli (MHC), between Castro and Dalcahue" },
      { label: "Santiago – Chiloé", valor: "1,100 km on Route 5 South" },
      { label: "Getting to the island", valor: "Pargua – Chacao ferry" },
      { label: "UNESCO churches", valor: "16, declared in 2000" },
      { label: "Recommended stay", valor: "3 to 5 days" },
      { label: "Best time", valor: "November to March" },
    ],
    queHacer: [
      {
        nombre: "Castro and its stilt houses",
        texto:
          "Castro is the provincial capital and the best base for exploring the island. Its San Francisco Church, built in 1910 from alerce, cypress, coigüe, raulí and olivillo wood, has been a National Monument since 1979 and a UNESCO World Heritage Site since 2000. The palafitos can be seen from above at the Gamboa viewpoint or from the water, on boat rides from the port, best at sunset. 5 km away is the Nercón church, built without metal nails.",
        gygQuery: "Castro Chiloe",
      },
      {
        nombre: "The UNESCO churches route",
        texto:
          "The 16 UNESCO-listed churches are in Castro, Nercón, Rilán, Dalcahue, Tenaún, Colo, San Juan, Chonchi, Vilupulli, Achao, Quinchao, Caguach, Chelín, Ichuac, Aldachildo and Detif. Sernatur suggests visiting nine over 3 days and 142 km, from Colo (70 km from Castro) to Chonchi, with its star-vaulted ceiling. Vilupulli, 15 km from Castro, has the tallest and most slender tower in the archipelago. Several are still active churches: check opening hours before you go.",
        gygQuery: "Chiloe churches",
      },
      {
        nombre: "Penguins at the Puñihuil Islets",
        texto:
          "Puñihuil Islets Natural Monument, managed by CONAF, is a group of three islets off Puñihuil cove, in Ancud commune. Humboldt and Magellanic penguins nest there, and you can also spot the marine otter, or chungungo. The islets are seen by boat, on 30-minute trips from the cove; landing is not allowed. Access is via Route W-20 between Ancud and Pumillahue (23 km) and a turnoff of about 3 km to the beach.",
        gygQuery: "Punihuil penguins",
      },
      {
        nombre: "Dalcahue, its market and Quinchao Island",
        texto:
          "25 km from Castro, Dalcahue has a crafts fair where island artisans arrive by boat twice a week, with wool textiles, basketry and native-wood carvings. Its church, from 1849, has a 26 m tower. From the Dalcahue ramp, a ferry crosses in a few minutes to Quinchao Island, the second largest in the archipelago, with the Achao and Quinchao churches.",
        gygQuery: "Dalcahue",
      },
      {
        nombre: "Chiloé National Park (Cucao)",
        texto:
          "The most visited access is the Cucao-Chanquín sector: from Castro, take Route 5 south to the Notuco junction (24 km) and then 34.5 km to Cucao, about 90 minutes, with public transport. There you'll find an elevated trail of about 200 m with a viewpoint over Lake Cucao, coastal dunes and a campground run by the Chanquín indigenous community. From Ancud you reach the Chepu sector, where a 14 km coastal trail (about 5 hours) runs from Puerto Anguay to the Lar River. CONAF warns that the Pacific beaches are not safe for swimming.",
        gygQuery: "Chiloe National Park",
      },
      {
        nombre: "Muelle de las Almas",
        texto:
          "In Chonchi commune, on the Pacific coast, this wooden pier was built as an extension of a cliff. It recalls the Chilote legend of the boatman Tempilkahue, who carries souls to their eternal rest. It's reached from Chonchi and is one of the most photographed spots on the island.",
      },
      {
        nombre: "Aucar Island, Putemún and Tantauco",
        texto:
          "In Quemchi, Aucar Island is reached by a footbridge more than 430 m long. Near Castro, the Putemún wetland can be explored by kayak, with flamingos. In the south, Tantauco Park, a private protected area, has the Sunken Forest trail. A car of your own is the best way to reach Chepu and Tantauco.",
      },
      {
        nombre: "Curanto, milcao and Chilote food",
        texto:
          "Curanto en hoyo cooks seafood, smoked meats and sausages underground on hot stones, served with milcao and chapalele, two potato breads. Milcao is a fried native-potato bread filled with pork cracklings. The Dalcahue market has cookshops serving curanto, cazuela and fish.",
        gygQuery: "Chiloe food tour",
      },
    ],
    cuandoIr: {
      resumen:
        "You can visit year-round, but November to March is the best time for Chiloé National Park and outdoor trips, according to CONAF. The climate is oceanic, rainy and changeable in any month: bring waterproof and warm clothing.",
      temporadas: [
        {
          nombre: "Summer",
          meses: "December to February",
          texto:
            "High season: long days, boat trips at Puñihuil, Chiloé National Park trails and traditional food fairs. It can rain even in summer.",
        },
        {
          nombre: "Autumn",
          meses: "March to May",
          texto:
            "March is still within the park's best season. After that there are fewer visitors and more rain; churches and markets stay open.",
        },
        {
          nombre: "Winter",
          meses: "June to August",
          texto:
            "The rainiest season, with the shortest days. Puñihuil boat trips run on winter hours, until 5:30 pm. A good time for the churches route and Chilote food.",
        },
        {
          nombre: "Spring",
          meses: "September to November",
          texto:
            "Days get longer, and from November the best season for Chiloé National Park begins. The weather stays changeable: pack layers and a rain jacket.",
        },
      ],
    },
    comoLlegar: [
      {
        modo: "By plane",
        texto:
          "There are flights from Santiago to Mocopulli Airport (MHC), between Castro and Dalcahue, taking about 2 hours. The alternative is to fly to El Tepual Airport (PMC) in Puerto Montt and continue overland to Pargua to cross the Chacao Channel.",
      },
      {
        modo: "By car or bus from Puerto Montt",
        texto:
          "Pargua is 60 km from Puerto Montt. There you cross the Chacao Channel by ferry to Chacao, on Isla Grande, and Route 5 continues to Ancud and Castro.",
      },
      {
        modo: "Overland from Santiago",
        texto:
          "It's 1,100 km on Route 5 South, about 12 hours of driving without stops. By bus, the trip to Castro takes about 14 hours, including the channel crossing.",
      },
    ],
    cuantosDias: {
      resumen:
        "3 days cover Castro, Dalcahue, some of the churches and Chiloé National Park. With 4 or 5 you can add the Puñihuil penguins, Quinchao Island and Chonchi.",
      itinerario: [
        { dia: "Day 1", texto: "Castro: San Francisco Church, stilt houses from the Gamboa viewpoint and a sunset boat ride; Nercón church." },
        { dia: "Day 2", texto: "Chiloé National Park at Cucao: Chanquín elevated trail and dunes. On the way back, Vilupulli, Chonchi and the Muelle de las Almas." },
        { dia: "Day 3", texto: "Dalcahue and its market, ferry to Quinchao and the Achao church." },
        { dia: "Day 4", texto: "Ancud and the Puñihuil Islets penguins by boat." },
        { dia: "Day 5", texto: "Northern churches (Tenaún, Colo, San Juan) or Aucar Island in Quemchi." },
      ],
    },
    faq: [
      {
        pregunta: "Where is Chiloé?",
        respuesta:
          "In Chile's Los Lagos Region, south of Puerto Montt. Isla Grande de Chiloé is separated from the mainland by the Chacao Channel, crossed by ferry from Pargua, 60 km from Puerto Montt.",
      },
      {
        pregunta: "How do you get to Chiloé?",
        respuesta:
          "Fly from Santiago to Mocopulli Airport (MHC), between Castro and Dalcahue, in about 2 hours. Overland, drive to Pargua and take the ferry across the Chacao Channel. From Santiago it's 1,100 km on Route 5 South; by bus, about 14 hours to Castro.",
      },
      {
        pregunta: "How many Chiloé churches are UNESCO World Heritage Sites?",
        respuesta:
          "16, declared by UNESCO in 2000, out of more than 80 historic wooden churches in the archipelago. The oldest still standing is Achao's, from around 1740.",
      },
      {
        pregunta: "Where can you see penguins in Chiloé?",
        respuesta:
          "At Puñihuil Islets Natural Monument, in Ancud commune, where Humboldt and Magellanic penguins nest. You see them from the boat, on 30-minute trips from Puñihuil cove; landing on the islets is not allowed.",
      },
      {
        pregunta: "How do you get to Chiloé National Park from Castro?",
        respuesta:
          "Take Route 5 south to the Notuco junction (24 km) and then 34.5 km to Cucao, about 90 minutes. There is public transport to Cucao.",
      },
      {
        pregunta: "How many days do you need in Chiloé?",
        respuesta:
          "At least 3: Castro, Chiloé National Park, and Dalcahue with Quinchao Island. With 4 or 5 days you can add the Puñihuil penguins and the churches in the north of the island.",
      },
      {
        pregunta: "What is the best time to visit Chiloé?",
        respuesta:
          "November to March, according to CONAF, for Chiloé National Park. You can still go year-round: the climate is rainy and changeable in every season, so waterproof clothing is a must.",
      },
      {
        pregunta: "What should you eat in Chiloé?",
        respuesta:
          "Curanto en hoyo (seafood and meats cooked underground on hot stones), plus milcao and chapalele, two potato breads. The Dalcahue market has cookshops serving curanto and cazuela.",
      },
    ],
  },
  fuentes: [
    { label: "Imperdibles de Chiloé: qué ver y hacer durante tres días — Chile.travel (Sernatur)", url: "https://chile.travel/itinerarios/imperdibles-de-chiloe-que-ver-y-hacer-durante-tres-dias/" },
    { label: "Chiloé — Chile.travel (Sernatur)", url: "https://chile.travel/en/destinations/chiloe/" },
    { label: "Explore Chiloé in 3 days — Chile.travel (Sernatur)", url: "https://chile.travel/en/blog/explore-chiloe-in-3-days-visit-the-best-this-magical-chilean-island-has-to-offer-2/" },
    { label: "Heritage Route: Chiloé's UNESCO Churches in 3 Days — Chile.travel (Sernatur)", url: "https://chile.travel/en/itineraries/heritage-route-chiloes-unesco-churches-in-3-days/" },
    { label: "Chiloé Churches Route: the 16 UNESCO temples — Chile.travel (Sernatur)", url: "https://chile.travel/en/blog/chiloe-churches-route-how-to-visit-the-16-unesco-world-heritage-temples/" },
    { label: "Chiloé, un patrimonio de la humanidad — Chile.travel (Sernatur)", url: "https://chile.travel/blog/chiloe-un-patrimonio-de-la-humanidad-ubicado-en-chile/" },
    { label: "Pingüinos de Chile: dónde verlos — Chile.travel (Sernatur)", url: "https://chile.travel/en/blog/penguins-from-chile-where-to-see-these-amazing-diving-birds/" },
    { label: "Dalcahue: el latido de los canales — LosLagos.Travel (Sernatur Los Lagos)", url: "https://loslagos.travel/2026/03/13/dalcahue-el-latido-de-los-canales-y-el-alma-de-la-madera/" },
    { label: "Parque Nacional Chiloé — CONAF", url: "https://www.conaf.cl/parques/parque-nacional-chiloe/" },
    { label: "Monumento Natural Islotes de Puñihuil — CONAF", url: "https://www.conaf.cl/parques/monumento-natural-islotes-de-punihuil/" },
    { label: "Pases Parques — venta oficial de entradas (CONAF)", url: "https://www.pasesparques.cl/" },
    { label: "Reporte comunal de Castro (Censo 2024) — BCN", url: "https://www.bcn.cl/siit/reportescomunales/comunas_v.html?idcom=10201" },
    { label: "Reporte comunal de Ancud (Censo 2024) — BCN", url: "https://www.bcn.cl/siit/reportescomunales/comunas_v.html?idcom=10202" },
  ],
  relacionados: [
    { tipo: "parque", slug: "chiloe" },
    { tipo: "fauna", slug: "pinguino-de-magallanes" },
    { tipo: "gastronomia", slug: "curanto-chilote-historia-receta" },
    { tipo: "destino", slug: "puerto-varas" },
  ],
}

export default guia
