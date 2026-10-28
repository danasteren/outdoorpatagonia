import type { DestinoEntry } from "@/lib/destinos/types"

// Guía de Coyhaique y la Carretera Austral. Una guía = un archivo (ver catalog.ts).

const guia: DestinoEntry = {
  slug: "coyhaique",
  prioridad: 11,
  nombre: "Coyhaique y la Carretera Austral",
  pais: "CL",
  lat: -45.5712,
  lng: -72.0685,
  wikipediaTitle: "Coyhaique",
  es: {
    metaTitle: "Coyhaique y Carretera Austral: Qué Hacer y Cuándo Ir",
    metaDescription:
      "Guía de Coyhaique y la Carretera Austral, Chile: Capillas de Mármol, Cerro Castillo, Ventisquero Colgante de Queulat, Laguna San Rafael, clima mes a mes y cómo llegar.",
    subtitulo: "Región de Aysén, Chile · Ruta 7, de Puerto Montt a Villa O'Higgins",
    intro: [
      "Coyhaique es la capital de la Región de Aysén, en la Patagonia chilena, y una de las paradas centrales de la Carretera Austral. Tiene 57.823 habitantes, según el Censo 2024. Fue fundada el 12 de octubre de 1929 con el nombre de Baquedano y es capital regional desde 1974. A 55 km está el aeródromo de Balmaceda (BBA), con vuelos directos desde Santiago.",
      "La Carretera Austral, o Ruta 7, recorre unos 1.058 km entre Puerto Montt y Villa O'Higgins, según el Ministerio de Obras Públicas, que a abril de 2026 informaba 614,5 km pavimentados (58 %). Tiene tramos de ripio y cruces en transbordador, y une parques nacionales, glaciares, fiordos y pueblos chicos.",
      "Desde Coyhaique se llega en el día al Parque Nacional Cerro Castillo (64 km al sur), al lago General Carrera y las Capillas de Mármol (unas 5 horas), al Ventisquero Colgante del Parque Nacional Queulat (165 km al norte) y a Puerto Chacabuco, de donde salen los barcos a la Laguna San Rafael. La mejor época es de diciembre a marzo.",
    ],
    datos: [
      { label: "Región", valor: "Aysén, Chile" },
      { label: "Población (Censo 2024)", valor: "Coyhaique 57.823 hab." },
      { label: "Aeródromo", valor: "Balmaceda (BBA), a 55 km de Coyhaique" },
      { label: "Carretera Austral", valor: "Ruta 7, ≈ 1.058 km (MOP)" },
      { label: "Coyhaique – Capillas de Mármol", valor: "≈ 223 km, unas 5 h" },
      { label: "Lago General Carrera", valor: "1.850 km², el más grande de Chile" },
      { label: "Días recomendados", valor: "4 a 7" },
      { label: "Mejor época", valor: "Diciembre a marzo" },
    ],
    queHacer: [
      {
        nombre: "Capillas de Mármol y lago General Carrera",
        texto:
          "Las Capillas de Mármol son formaciones de mármol talladas por el agua en la orilla del lago General Carrera, que con 1.850 km² es el más grande de Chile. Son Santuario de la Naturaleza desde 1994 (Decreto 281). Se visitan desde Puerto Río Tranquilo, a unos 223 km al sur de Coyhaique (unas 5 horas), en bote, alrededor de 2 horas, o en kayak, de 2 a 3 horas. De noviembre a marzo es la temporada más visitada; en primavera y otoño el lago está más bajo y es más fácil entrar a las cavernas. Sernatur recomienda contratar solo servicios registrados.",
        gygQuery: "Marble Caves Chile",
      },
      {
        nombre: "Parque Nacional Cerro Castillo",
        texto:
          "A 64 km al sur de Coyhaique por la Carretera Austral, protege 143.502 ha alrededor del cerro Castillo, de basalto negro y glaciares colgantes. Fue reserva nacional desde 1970 y es parque nacional desde 2018. El sendero a la Laguna Castillo tiene 14 km (unas 8 horas) y la travesía Las Horquetas, 53,5 km en 3 a 5 días. Los dos cierran de mayo a septiembre y CONAF los habilita solo con guía certificado: consultá antes. Hay que registrarse en la administración, en la laguna Chiguay (km 57 de la Ruta 7 Sur).",
        gygQuery: "Cerro Castillo",
      },
      {
        nombre: "Ventisquero Colgante (Parque Nacional Queulat)",
        texto:
          "El Parque Nacional Queulat, creado en 1983, tiene 154.093 ha y está a 165 km al norte de Coyhaique. Su atractivo principal es el Ventisquero Colgante, un glaciar suspendido sobre la roca del que caen cascadas. Desde el sector del ventisquero, la caminata al mirador lleva alrededor de una hora y media. El pueblo más cercano es Puyuhuapi, fundado por colonos alemanes en 1935, con las termas de Puyuhuapi, a unas 3 horas al norte de Coyhaique.",
        gygQuery: "Queulat",
      },
      {
        nombre: "Glaciar San Rafael",
        texto:
          "El Parque Nacional Laguna San Rafael, creado en 1959, tiene 1.742.000 ha y es Reserva de la Biosfera de la UNESCO desde 1979. El glaciar San Rafael, que baja del Campo de Hielo Norte, tiene un frente de casi 4 km y unos 60 m de alto. Los barcos salen de Puerto Chacabuco y la excursión dura de 10 a 12 horas; también hay vuelos desde Coyhaique. Desde Puerto Río Tranquilo hay una ruta por el valle Exploradores hasta Puerto Grosse, pero CONAF cerró el acceso frontal al glaciar Exploradores por seguridad.",
        gygQuery: "San Rafael Glacier",
      },
      {
        nombre: "Reserva Nacional Coyhaique",
        texto:
          "A unos 5 km de la ciudad, por la ruta a Puerto Aysén y un camino de ripio, la reserva protege 2.150 ha desde 1948. Tiene senderos cortos, como el de la Laguna Verde (1,2 km, 20 minutos), y el de Las Piedras (6,6 km, unas 5 horas), con vista a la ciudad y al valle. Las Piedras y los senderos de ciclismo cierran de mayo a septiembre.",
      },
      {
        nombre: "Reserva Nacional Río Simpson",
        texto:
          "A unos 37 km de Coyhaique, sobre el camino a Puerto Aysén, protege 41.620 ha a lo largo del río Simpson, conocido por la pesca con mosca. Tiene el sendero Los Colonos (3,4 km), uno de acceso universal (800 m) y el del cerro Cordillerano (6 km, dificultad media). No se permiten perros ni fuego.",
      },
      {
        nombre: "Caleta Tortel",
        texto:
          "En el sur de la Región de Aysén, cerca de la desembocadura del río Baker, Caleta Tortel no tiene calles: se recorre por unos 7 km de pasarelas de madera de ciprés. Desde ahí salen botes a los glaciares Jorge Montt y Steffens y a la Isla de los Muertos. Desde Coyhaique se llega en 6 a 8 horas en auto o bus.",
        gygQuery: "Caleta Tortel",
      },
      {
        nombre: "Manejar la Carretera Austral",
        texto:
          "La ruta tiene tramos de ripio, obras de pavimentación y cruces en transbordador, como Caleta La Arena y Puerto Yungay. Sernatur recomienda un 4×4 o una camper equipada, rueda de auxilio y combustible extra, y llevar efectivo: en los pueblos chicos casi no hay cajeros y la señal de internet falla. Los transbordadores de la ruta bimodal se llenan meses antes de la temporada alta, así que conviene reservarlos con tiempo.",
      },
    ],
    cuandoIr: {
      resumen:
        "La mejor época es de diciembre a marzo, con días largos y todos los servicios abiertos, según Sernatur. Llueve aun en verano y el viento en los lagos del sur es fuerte y frío: llevá capas e impermeable. Varios senderos de CONAF cierran de mayo a septiembre.",
      temporadas: [
        {
          nombre: "Verano",
          meses: "Diciembre a febrero",
          texto:
            "Temporada alta: días largos, navegaciones a las Capillas de Mármol y la Laguna San Rafael, y senderos abiertos. Reservá los transbordadores y el alojamiento con tiempo.",
        },
        {
          nombre: "Otoño",
          meses: "Marzo a mayo",
          texto:
            "Marzo sigue siendo buena época, con menos gente. El lago General Carrera baja y es más fácil entrar a las cavernas de mármol. En mayo cierran los senderos de Cerro Castillo y Las Piedras.",
        },
        {
          nombre: "Invierno",
          meses: "Junio a agosto",
          texto:
            "Frío y nieve; varios senderos están cerrados y el sendero al glaciar de Laguna San Rafael cierra de mayo a agosto. En el Parque Nacional Cerro Castillo las temperaturas bajan hasta -15 °C. En los pasos fronterizos se recomienda 4×4 y cadenas.",
        },
        {
          nombre: "Primavera",
          meses: "Septiembre a noviembre",
          texto:
            "Los días se alargan y desde octubre reabren los senderos. Con el lago todavía bajo, es buena época para entrar a las Capillas de Mármol. El clima es cambiante.",
        },
      ],
    },
    comoLlegar: [
      {
        modo: "En avión",
        texto:
          "Hay vuelos directos desde Santiago al aeródromo de Balmaceda (BBA), a 55 km de Coyhaique. Para arrancar la Carretera Austral desde el norte, se vuela al aeropuerto El Tepual (PMC), en Puerto Montt. Sernatur sugiere entrar por un aeropuerto y salir por el otro.",
      },
      {
        modo: "Por la Carretera Austral desde Puerto Montt",
        texto:
          "La Ruta 7 sale de Puerto Montt, cruza en transbordador el estuario de Reloncaví y sigue por Hornopirén, Chaitén, Puyuhuapi y Queulat hasta Coyhaique. Sernatur propone hacerla en 7 días hasta Balmaceda, con 1.089 km de viaje. Hay tramos que solo se pasan en barcaza.",
      },
      {
        modo: "Desde Argentina",
        texto:
          "Coyhaique tiene dos pasos fronterizos cerca: Coyhaique Alto (795 m), por la Ruta 240, y Huemules (523 m), cerca de Balmaceda, por la Ruta 245. Los dos están habilitados para todo tipo de vehículos. En invierno pueden cerrar por clima: consultá el estado diario en Pasos Fronterizos.",
      },
    ],
    cuantosDias: {
      resumen:
        "Con 4 días desde Coyhaique ves Cerro Castillo, las Capillas de Mármol y la Reserva Nacional Coyhaique. Para recorrer la Carretera Austral desde Puerto Montt, Sernatur propone 7 días.",
      itinerario: [
        { dia: "Día 1", texto: "Llegada a Balmaceda. Coyhaique: Monumento al Ovejero, plaza y Reserva Nacional Coyhaique (Laguna Verde)." },
        { dia: "Día 2", texto: "Parque Nacional Cerro Castillo: registro en la laguna Chiguay y miradores sobre la Ruta 7. Seguir hacia Puerto Río Tranquilo." },
        { dia: "Día 3", texto: "Capillas de Mármol en bote o kayak desde Puerto Río Tranquilo. Vuelta a Coyhaique." },
        { dia: "Día 4", texto: "Reserva Nacional Río Simpson y, si hay tiempo, Puerto Aysén." },
        { dia: "Día 5", texto: "Navegación al glaciar San Rafael desde Puerto Chacabuco (10 a 12 horas)." },
        { dia: "Día 6", texto: "Hacia el norte: Parque Nacional Queulat y el Ventisquero Colgante." },
        { dia: "Día 7", texto: "Puyuhuapi y sus termas, o vuelta a Balmaceda." },
      ],
    },
    faq: [
      {
        pregunta: "¿Dónde queda Coyhaique?",
        respuesta:
          "En la Región de Aysén, en la Patagonia chilena. Es la capital regional y una de las paradas centrales de la Carretera Austral, con 57.823 habitantes según el Censo 2024. El aeródromo de Balmaceda (BBA) está a 55 km.",
      },
      {
        pregunta: "¿Cuántos kilómetros tiene la Carretera Austral?",
        respuesta:
          "Unos 1.058 km entre Puerto Montt y Villa O'Higgins, según el Ministerio de Obras Públicas. A abril de 2026 había 614,5 km pavimentados (58 %); el resto es ripio, y hay tramos con transbordador.",
      },
      {
        pregunta: "¿Cómo llegar a las Capillas de Mármol desde Coyhaique?",
        respuesta:
          "Por la Carretera Austral hasta Puerto Río Tranquilo, a unos 223 km al sur (unas 5 horas). Ahí salen los botes, de unas 2 horas, y los kayaks, de 2 a 3 horas. También hay tours desde Coyhaique.",
      },
      {
        pregunta: "¿Cuál es la mejor época para hacer la Carretera Austral?",
        respuesta:
          "De diciembre a marzo, con días largos y clima más favorable, según Sernatur. Igual llueve en verano: llevá ropa en capas e impermeable.",
      },
      {
        pregunta: "¿Hace falta un 4×4 para la Carretera Austral?",
        respuesta:
          "Sernatur lo recomienda, o una camper bien equipada, porque hay tramos de ripio y obras. Llevá rueda de auxilio, combustible extra para los desvíos y efectivo.",
      },
      {
        pregunta: "¿Qué distancia hay de Coyhaique al Parque Nacional Cerro Castillo?",
        respuesta:
          "64 km al sur por la Carretera Austral. La administración del parque está en la laguna Chiguay, en el km 57 de la Ruta 7 Sur, donde hay que registrarse antes de salir a un sendero.",
      },
      {
        pregunta: "¿Cómo se visita el glaciar San Rafael?",
        respuesta:
          "En barco desde Puerto Chacabuco, en una excursión de 10 a 12 horas, o en avioneta desde Coyhaique. El glaciar tiene un frente de casi 4 km y unos 60 m de alto.",
      },
      {
        pregunta: "¿Cuántos días hacen falta para la Carretera Austral?",
        respuesta:
          "Sernatur propone 7 días entre Puerto Montt y Balmaceda. Si solo vas a Coyhaique y alrededores, con 4 días ves Cerro Castillo, las Capillas de Mármol y las reservas cercanas.",
      },
    ],
  },
  en: {
    metaTitle: "Carretera Austral & Coyhaique Travel Guide, Chile",
    metaDescription:
      "Coyhaique and the Carretera Austral, Chile: Marble Caves, Cerro Castillo, Queulat Hanging Glacier, San Rafael Glacier, weather by month and how to get there.",
    subtitulo: "Aysén Region, Chile · Route 7, from Puerto Montt to Villa O'Higgins",
    intro: [
      "Coyhaique is the capital of Chile's Aysén Region, in Chilean Patagonia, and a central stop on the Carretera Austral, with 57,823 inhabitants according to the 2024 Census. It was founded on 12 October 1929 under the name Baquedano and has been the regional capital since 1974. Balmaceda Airport (BBA), 55 km away, has direct flights from Santiago.",
      "The Carretera Austral, or Route 7, runs about 1,058 km between Puerto Montt and Villa O'Higgins, according to Chile's Ministry of Public Works, which reported 614.5 km paved (58%) as of April 2026. It has gravel sections and ferry crossings, and links national parks, glaciers, fjords and small towns.",
      "From Coyhaique you can reach Cerro Castillo National Park (64 km south), General Carrera Lake and the Marble Caves (about 5 hours), the Hanging Glacier in Queulat National Park (165 km north) and Puerto Chacabuco, where boats leave for San Rafael Lagoon. The best time is December to March.",
    ],
    datos: [
      { label: "Region", valor: "Aysén, Chile" },
      { label: "Population (2024 Census)", valor: "Coyhaique 57,823" },
      { label: "Airport", valor: "Balmaceda (BBA), 55 km from Coyhaique" },
      { label: "Carretera Austral", valor: "Route 7, ≈ 1,058 km (MOP)" },
      { label: "Coyhaique – Marble Caves", valor: "≈ 223 km, about 5 h" },
      { label: "General Carrera Lake", valor: "1,850 km², Chile's largest" },
      { label: "Recommended stay", valor: "4 to 7 days" },
      { label: "Best time", valor: "December to March" },
    ],
    queHacer: [
      {
        nombre: "Marble Caves and General Carrera Lake",
        texto:
          "The Marble Caves (Capillas de Mármol) are marble formations carved by water on the shore of General Carrera Lake, which at 1,850 km² is the largest lake in Chile. They have been a Nature Sanctuary since 1994 (Decree 281). Trips leave from Puerto Río Tranquilo, about 223 km south of Coyhaique (about 5 hours), by boat, around 2 hours, or by kayak, 2 to 3 hours. November to March is the busiest season; in spring and autumn the lake is lower and it's easier to get inside the caverns. Sernatur recommends booking only registered operators.",
        gygQuery: "Marble Caves Chile",
      },
      {
        nombre: "Cerro Castillo National Park",
        texto:
          "64 km south of Coyhaique on the Carretera Austral, it protects 143,502 ha around Cerro Castillo, a black basalt peak with hanging glaciers. It was a national reserve from 1970 and became a national park in 2018. The Laguna Castillo trail is 14 km (about 8 hours) and the Las Horquetas trek is 53.5 km over 3 to 5 days. Both close from May to September and CONAF only allows them with a certified guide: check before you go. You must register at the park office at Laguna Chiguay (km 57 of Route 7 South).",
        gygQuery: "Cerro Castillo",
      },
      {
        nombre: "Hanging Glacier (Queulat National Park)",
        texto:
          "Queulat National Park, created in 1983, covers 154,093 ha and lies 165 km north of Coyhaique. Its main sight is the Hanging Glacier (Ventisquero Colgante), suspended above the rock with waterfalls pouring from it. From the glacier sector, the hike to the viewpoint takes about an hour and a half. The nearest town is Puyuhuapi, founded by German settlers in 1935, with the Puyuhuapi hot springs, about 3 hours north of Coyhaique.",
        gygQuery: "Queulat",
      },
      {
        nombre: "San Rafael Glacier",
        texto:
          "Laguna San Rafael National Park, created in 1959, covers 1,742,000 ha and has been a UNESCO Biosphere Reserve since 1979. San Rafael Glacier, flowing from the Northern Patagonian Ice Field, has an ice front of almost 4 km and stands about 60 m high. Boats leave from Puerto Chacabuco and the trip takes 10 to 12 hours; there are also flights from Coyhaique. From Puerto Río Tranquilo a route runs through the Exploradores valley to Puerto Grosse, but CONAF has closed the frontal access to Exploradores Glacier for safety reasons.",
        gygQuery: "San Rafael Glacier",
      },
      {
        nombre: "Coyhaique National Reserve",
        texto:
          "About 5 km from town, via the road to Puerto Aysén and a gravel track, the reserve has protected 2,150 ha since 1948. It has short trails such as Laguna Verde (1.2 km, 20 minutes) and the Las Piedras trail (6.6 km, about 5 hours), with views over the town and valley. Las Piedras and the cycling trails close from May to September.",
      },
      {
        nombre: "Río Simpson National Reserve",
        texto:
          "About 37 km from Coyhaique, on the road to Puerto Aysén, it protects 41,620 ha along the Simpson River, known for fly fishing. Trails include Los Colonos (3.4 km), a universal-access path (800 m) and Cerro Cordillerano (6 km, moderate). Dogs and fires are not allowed.",
      },
      {
        nombre: "Caleta Tortel",
        texto:
          "In the south of the Aysén Region, near the mouth of the Baker River, Caleta Tortel has no streets: you get around on about 7 km of cypress-wood boardwalks. Boats leave from there to the Jorge Montt and Steffens glaciers and to Isla de los Muertos. It's 6 to 8 hours from Coyhaique by car or bus.",
        gygQuery: "Caleta Tortel",
      },
      {
        nombre: "Driving the Carretera Austral",
        texto:
          "The route has gravel sections, paving works and ferry crossings, such as Caleta La Arena and Puerto Yungay. Sernatur recommends a 4×4 or a well-equipped camper, a spare tire and extra fuel, and carrying cash: small towns have almost no ATMs and internet is unreliable. Ferries on the bimodal route fill up months before high season, so book early.",
      },
    ],
    cuandoIr: {
      resumen:
        "The best time is December to March, with long days and all services open, according to Sernatur. It rains even in summer and the wind on the southern lakes is strong and cold: pack layers and a rain jacket. Several CONAF trails close from May to September.",
      temporadas: [
        {
          nombre: "Summer",
          meses: "December to February",
          texto:
            "High season: long days, boat trips to the Marble Caves and San Rafael Lagoon, and all trails open. Book ferries and accommodation early.",
        },
        {
          nombre: "Autumn",
          meses: "March to May",
          texto:
            "March is still a good time, with fewer visitors. General Carrera Lake drops and it's easier to enter the marble caverns. In May the Cerro Castillo and Las Piedras trails close.",
        },
        {
          nombre: "Winter",
          meses: "June to August",
          texto:
            "Cold and snow; several trails are closed, and the glacier trail at Laguna San Rafael closes from May to August. Temperatures in Cerro Castillo National Park drop to -15 °C. A 4×4 and chains are recommended at the border crossings.",
        },
        {
          nombre: "Spring",
          meses: "September to November",
          texto:
            "Days get longer and trails reopen from October. With the lake still low, it's a good time to enter the Marble Caves. The weather is changeable.",
        },
      ],
    },
    comoLlegar: [
      {
        modo: "By plane",
        texto:
          "There are direct flights from Santiago to Balmaceda Airport (BBA), 55 km from Coyhaique. To start the Carretera Austral from the north, fly to El Tepual Airport (PMC) in Puerto Montt. Sernatur suggests flying into one airport and out of the other.",
      },
      {
        modo: "On the Carretera Austral from Puerto Montt",
        texto:
          "Route 7 leaves Puerto Montt, crosses the Reloncaví Estuary by ferry and continues through Hornopirén, Chaitén, Puyuhuapi and Queulat to Coyhaique. Sernatur suggests a 7-day trip to Balmaceda covering 1,089 km. Some sections can only be crossed by barge.",
      },
      {
        modo: "From Argentina",
        texto:
          "Coyhaique has two nearby border crossings: Coyhaique Alto (795 m), on Route 240, and Huemules (523 m), near Balmaceda, on Route 245. Both are open to all types of vehicles. In winter they may close due to weather: check the daily status on Chile's Pasos Fronterizos site.",
      },
    ],
    cuantosDias: {
      resumen:
        "4 days based in Coyhaique cover Cerro Castillo, the Marble Caves and Coyhaique National Reserve. To drive the Carretera Austral from Puerto Montt, Sernatur suggests 7 days.",
      itinerario: [
        { dia: "Day 1", texto: "Arrive in Balmaceda. Coyhaique: the Shepherd Monument, the main square and Coyhaique National Reserve (Laguna Verde)." },
        { dia: "Day 2", texto: "Cerro Castillo National Park: register at Laguna Chiguay and stop at the viewpoints on Route 7. Continue to Puerto Río Tranquilo." },
        { dia: "Day 3", texto: "Marble Caves by boat or kayak from Puerto Río Tranquilo. Drive back to Coyhaique." },
        { dia: "Day 4", texto: "Río Simpson National Reserve and, time permitting, Puerto Aysén." },
        { dia: "Day 5", texto: "Boat trip to San Rafael Glacier from Puerto Chacabuco (10 to 12 hours)." },
        { dia: "Day 6", texto: "North to Queulat National Park and the Hanging Glacier." },
        { dia: "Day 7", texto: "Puyuhuapi and its hot springs, or back to Balmaceda." },
      ],
    },
    faq: [
      {
        pregunta: "Where is Coyhaique?",
        respuesta:
          "In the Aysén Region of Chilean Patagonia. It's the regional capital and a central stop on the Carretera Austral, with 57,823 inhabitants according to the 2024 Census. Balmaceda Airport (BBA) is 55 km away.",
      },
      {
        pregunta: "How long is the Carretera Austral?",
        respuesta:
          "About 1,058 km between Puerto Montt and Villa O'Higgins, according to Chile's Ministry of Public Works. As of April 2026, 614.5 km were paved (58%); the rest is gravel, and some sections require ferries.",
      },
      {
        pregunta: "How do you get to the Marble Caves from Coyhaique?",
        respuesta:
          "Drive the Carretera Austral to Puerto Río Tranquilo, about 223 km south (about 5 hours). Boat trips of about 2 hours and kayak trips of 2 to 3 hours leave from there. There are also tours from Coyhaique.",
      },
      {
        pregunta: "What is the best time to drive the Carretera Austral?",
        respuesta:
          "December to March, with long days and better weather, according to Sernatur. It still rains in summer: pack layers and waterproof clothing.",
      },
      {
        pregunta: "Do you need a 4×4 for the Carretera Austral?",
        respuesta:
          "Sernatur recommends one, or a well-equipped camper, because of gravel sections and roadworks. Carry a spare tire, extra fuel for side roads and cash.",
      },
      {
        pregunta: "How far is Cerro Castillo National Park from Coyhaique?",
        respuesta:
          "64 km south on the Carretera Austral. The park office is at Laguna Chiguay, at km 57 of Route 7 South, where you must register before starting a trail.",
      },
      {
        pregunta: "How do you visit San Rafael Glacier?",
        respuesta:
          "By boat from Puerto Chacabuco, on a 10 to 12 hour trip, or by small plane from Coyhaique. The glacier has an ice front of almost 4 km and stands about 60 m high.",
      },
      {
        pregunta: "How many days do you need for the Carretera Austral?",
        respuesta:
          "Sernatur suggests 7 days between Puerto Montt and Balmaceda. If you only visit Coyhaique and its surroundings, 4 days cover Cerro Castillo, the Marble Caves and the nearby reserves.",
      },
    ],
  },
  fuentes: [
    { label: "Carretera Austral — Chile.travel (Sernatur)", url: "https://chile.travel/en/destinations/carretera-austral/" },
    { label: "A 7-day trip along the Carretera Austral — Chile.travel (Sernatur)", url: "https://chile.travel/en/itineraries/a-7-day-trip-along-the-carretera-austral/" },
    { label: "Travel guide: must-see destinations on the Carretera Austral — Chile.travel (Sernatur)", url: "https://chile.travel/en/blog/travel-guide-5-must-see-destinations-on-the-carretera-austral/" },
    { label: "Explore the landscapes of the Aysén Region — Chile.travel (Sernatur)", url: "https://chile.travel/en/itineraries/explore-and-discover-the-landscapes-of-the-aysen-region/" },
    { label: "General Carrera Lake and Marble Caves — Chile.travel (Sernatur)", url: "https://chile.travel/en/attractions/general-carrera-lake-and-marble-caves/" },
    { label: "Marble Chapels: how to visit them — Chile.travel (Sernatur)", url: "https://chile.travel/en/blog/marble-chapels-how-to-visit-them-and-their-surprising-connection-to-ancient-greece/" },
    { label: "Cerro Castillo — Chile.travel (Sernatur)", url: "https://chile.travel/atractivos/cerro-castillo/" },
    { label: "Tortel and Villa O'Higgins — Chile.travel (Sernatur)", url: "https://chile.travel/en/attractions/tortel-and-villa-ohiggins/" },
    { label: "Plan de pavimentación de la Carretera Austral (abril 2026) — MOP", url: "https://dgop.mop.gob.cl/presidente-kast-y-ministro-arrau-anuncian-plan-historico-por-mas-de-800-mil-millones-para-potenciar-la-carretera-austral/" },
    { label: "Santuario de la Naturaleza Capillas de Mármol — Consejo de Monumentos Nacionales", url: "https://www.monumentos.gob.cl/monumentos/santuarios-de-la-naturaleza/capillas-de-marmol" },
    { label: "Parque Nacional Cerro Castillo — CONAF", url: "https://www.conaf.cl/parques/parque-nacional-cerro-castillo/" },
    { label: "Parque Nacional Queulat — CONAF", url: "https://www.conaf.cl/parques/parque-nacional-queulat/" },
    { label: "Parque Nacional Laguna San Rafael — CONAF", url: "https://www.conaf.cl/parque_nacionales/parque-nacional-laguna-san-rafael/" },
    { label: "Cierre del acceso frontal al glaciar Exploradores — CONAF", url: "https://www.conaf.cl/conaf-informa-cierre-definitivo-del-acceso-frontal-al-glaciar-exploradores-para-resguardar-la-seguridad-de-visitantes/" },
    { label: "Reserva Nacional Coyhaique — CONAF", url: "https://www.conaf.cl/parque_nacionales/reserva-nacional-coyhaique/" },
    { label: "Reserva Nacional Río Simpson — CONAF", url: "https://www.conaf.cl/parque_nacionales/reserva-nacional-rio-simpson/" },
    { label: "Pases Parques — venta oficial de entradas (CONAF)", url: "https://www.pasesparques.cl/" },
    { label: "Complejo Coyhaique Alto — Pasos Fronterizos", url: "https://www.pasosfronterizos.gov.cl/complejos-fronterizos/aysen/paso-coyhaique/" },
    { label: "Complejo Huemules — Pasos Fronterizos", url: "https://www.pasosfronterizos.gov.cl/complejos-fronterizos/aysen/paso-huemules/" },
    { label: "Nuestro Municipio — Municipalidad de Coyhaique", url: "https://coyhaique.cl/index.php?Itemid=125&id=66&option=com_content&view=article" },
    { label: "Reporte comunal de Coyhaique (Censo 2024) — BCN", url: "https://www.bcn.cl/siit/reportescomunales/comunas_v.html?idcom=11101" },
  ],
  relacionados: [
    { tipo: "parque", slug: "cerro-castillo" },
    { tipo: "parque", slug: "queulat" },
    { tipo: "parque", slug: "laguna-san-rafael" },
    { tipo: "parque", slug: "patagonia-cl" },
    { tipo: "termas", slug: "puyuhuapi" },
    { tipo: "escalada", slug: "cerro-castillo" },
    { tipo: "fauna", slug: "huemul" },
    { tipo: "destino", slug: "puerto-varas" },
  ],
}

export default guia
