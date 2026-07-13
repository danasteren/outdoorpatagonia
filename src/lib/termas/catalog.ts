import type { Relacionado } from "@/lib/relacionados"

export type TermaEntry = {
  slug: string
  nombre: string
  pais: "CL" | "AR"
  region: string
  // Omitir si la fuente oficial no publica coordenadas verificables — nunca estimar/inventar.
  lat?: number
  lng?: number
  temperaturaAgua: string
  descripcion: string[]
  datosExtra: Array<{ label: string; valor: string }>
  faq: Array<{ pregunta: string; respuesta: string }>
  urlFuente: string
  wikipediaTitle?: string
  relacionados?: Relacionado[]
}

export const TERMAS_CATALOG: TermaEntry[] = [
  {
    slug: "geometricas",
    nombre: "Termas Geométricas",
    pais: "CL",
    region: "Los Ríos (comuna de Panguipulli), a 90 km de Pucón (Araucanía)",
    lat: -39.501659,
    lng: -71.874697,
    temperaturaAgua: "35–45 °C (fuentes emergen a 80 °C)",
    descripcion: [
      "Las Termas Geométricas son un complejo de 18 piscinas de piedra conectadas por más de 450 metros de pasarelas de madera pintadas de rojo, tendidas a lo largo de una quebrada volcánica en pleno bosque nativo. Están ubicadas dentro del Parque Nacional Villarrica, en el kilómetro 16 del camino que une Coñaripe con Palguín, a unos 90 km de Pucón.",
      "El complejo fue diseñado por el arquitecto chileno Germán del Sol —también responsable de las Termas Puritama en el desierto de Atacama— e inaugurado en 2004. Su diseño ganó reconocimiento internacional por integrar la arquitectura al paisaje sin intervenir el cañón natural por el que corre el estero Aihué.",
      "El agua proviene de más de 60 vertientes termales naturales que emergen a 80 °C y se enfrían mediante mezcla controlada hasta los 35–45 °C de las piscinas, sin uso de filtros ni químicos: el recambio constante mantiene el agua limpia. El entorno integra el Parque Nacional Villarrica, a metros del volcán Villarrica y su lago de lava permanente.",
    ],
    datosExtra: [
      { label: "Piscinas", valor: "18 piscinas de piedra" },
      { label: "Fuentes termales", valor: "Más de 60 vertientes naturales" },
      { label: "Temperatura del agua", valor: "35–45 °C (piscinas)" },
      { label: "Arquitecto", valor: "Germán del Sol" },
      { label: "Año de apertura", valor: "2004" },
      { label: "Horario", valor: "10:00–19:00 (9:00–21:00 en fines de semana largos)" },
    ],
    faq: [
      {
        pregunta: "¿Cómo llegar a las Termas Geométricas desde Pucón?",
        respuesta:
          "Desde Pucón son unos 90 km por camino pavimentado y de ripio vía Coñaripe, aproximadamente 1h30 en auto. También se puede acceder por Liquiñe o por el camino Coñaripe–Palguín (km 16), donde está la entrada. Hay traslados organizados desde Pucón y Coñaripe.",
      },
      {
        pregunta: "¿Cuál es el precio de entrada a las Termas Geométricas?",
        respuesta:
          "El valor de entrada varía según temporada y se actualiza en el sitio oficial (termasgeometricas.cl). Se recomienda reservar con anticipación, especialmente en temporada alta (diciembre–febrero) y fines de semana largos.",
      },
      {
        pregunta: "¿Las Termas Geométricas están abiertas todo el año?",
        respuesta:
          "Sí, funcionan los 365 días del año, de 10:00 a 19:00 hs, con horario extendido de 9:00 a 21:00 en fines de semana largos y temporada de vacaciones. El agua termal mantiene su temperatura durante todo el año, incluido el invierno con nieve alrededor.",
      },
    ],
    urlFuente: "https://www.termasgeometricas.cl/",
    wikipediaTitle: "Termas Geométricas",
    relacionados: [{ tipo: "volcan", slug: "villarrica" }],
  },
  {
    slug: "puyehue",
    nombre: "Termas de Puyehue",
    pais: "CL",
    region: "Los Lagos, a 76 km de Osorno por la ruta CH-215",
    lat: -40.71186,
    lng: -72.328285,
    temperaturaAgua: "36–38 °C en las piscinas del hotel (vertientes naturales entre 24 y 75 °C)",
    descripcion: [
      "Las Termas de Puyehue son uno de los complejos termales más antiguos y emblemáticos del sur de Chile, a orillas del lago Puyehue y rodeadas por el Parque Nacional Puyehue. Sus aguas fueron descubiertas en 1851 y desde 1907 una sociedad local empezó a desarrollar la infraestructura para recibir visitantes.",
      "El edificio actual del Gran Hotel Termas de Puyehue se construyó entre 1937 y 1942, obra del arquitecto alemán Eugenio Freitag, inspirada en la arquitectura alpina suiza con piedra y maderas nativas: 26.500 m² que en su época dorada recibieron a presidentes chilenos como Arturo Alessandri y Eduardo Frei Montalva. Un incendio en 1957 destruyó parte del edificio, del que luego se recuperó.",
      "El agua termal emerge de vertientes naturales con temperaturas de entre 24 °C y 75 °C y alimenta las piscinas del hotel a 36–38 °C. El complejo es distinto —aunque cercano— a las Termas de Aguas Calientes, otro centro termal dentro del mismo Parque Nacional Puyehue, más próximo al centro de esquí Antillanca.",
    ],
    datosExtra: [
      { label: "Piscinas del hotel", valor: "3 piscinas termales, 36–38 °C" },
      { label: "Vertientes naturales", valor: "24 °C a 75 °C" },
      { label: "Arquitecto", valor: "Eugenio Freitag" },
      { label: "Construcción", valor: "1937–1942" },
      { label: "Descubrimiento de las aguas", valor: "1851" },
      { label: "Superficie del hotel", valor: "26.500 m²" },
    ],
    faq: [
      {
        pregunta: "¿Cómo llegar a las Termas de Puyehue desde Osorno?",
        respuesta:
          "Están a 76 km de Osorno por la ruta CH-215, aproximadamente 1h30 en auto, en el camino hacia el paso fronterizo Cardenal Samoré. También se puede llegar desde Puerto Montt o Bariloche (Argentina) por el mismo corredor.",
      },
      {
        pregunta: "¿Termas de Puyehue es lo mismo que Aguas Calientes?",
        respuesta:
          "No. Termas de Puyehue es el hotel histórico a orillas del lago Puyehue; Aguas Calientes es otro centro termal dentro del mismo Parque Nacional Puyehue, más cerca del centro de esquí Antillanca. Ambos comparten el origen volcánico del Cordón Caulle pero son instalaciones distintas.",
      },
      {
        pregunta: "¿Se puede visitar sin alojarse en el hotel?",
        respuesta:
          "El complejo ofrece acceso de day-pass a sus piscinas termales además de alojamiento. Los horarios y valores de entrada se confirman en el sitio oficial (puyehue.cl), ya que varían por temporada.",
      },
    ],
    urlFuente: "https://puyehue.cl/",
    wikipediaTitle: "Termas de Puyehue",
    relacionados: [{ tipo: "parque", slug: "puyehue" }],
  },
  {
    slug: "pucon-indomito",
    nombre: "Termas Pucón Indómito",
    pais: "CL",
    region: "Araucanía — camino Pucón–Huife km 27, Lote 2A (~27 km de Pucón)",
    temperaturaAgua: "30–39 °C en piscinas y tinajas",
    descripcion: [
      "Termas Pucón Indómito es un complejo termal a orillas del río Liucura, a unos 27 km de Pucón por el camino totalmente pavimentado hacia Huife. A diferencia de las Termas Geométricas o Puyehue, es un desarrollo más reciente orientado al día de spa: combina piscinas al aire libre, una piscina techada y tinajas de madera individuales.",
      "El complejo cuenta con 5 piscinas termales al aire libre —una de ellas con acceso para silla de ruedas—, una piscina techada y 13 tinajas privadas, además de sauna, spa con masajes y restaurante con cocina local. El agua se mantiene entre 30 y 39 °C según la piscina.",
      "Está en el mismo corredor que las Termas de Huife y Menetué, en el valle del Liucura camino a Curarrehue, una de las zonas con mayor concentración de centros termales cerca de Pucón por su cercanía al volcán Villarrica.",
    ],
    datosExtra: [
      { label: "Piscinas al aire libre", valor: "5 (una accesible en silla de ruedas)" },
      { label: "Piscina techada", valor: "1" },
      { label: "Tinajas privadas", valor: "13" },
      { label: "Temperatura del agua", valor: "30–39 °C" },
      { label: "Horario", valor: "Martes a domingo, 10:30–20:30 (piscinas cierran 20:00)" },
      { label: "Distancia desde Pucón", valor: "~27 km, camino pavimentado a Huife" },
    ],
    faq: [
      {
        pregunta: "¿Cómo llegar a Termas Pucón Indómito?",
        respuesta:
          "Están a unos 27 km de Pucón por el camino pavimentado hacia Huife (Camino Pucón–Huife, km 27, Lote 2A), en el valle del río Liucura. El trayecto es de aproximadamente 30–40 minutos en auto desde el centro de Pucón.",
      },
      {
        pregunta: "¿Termas Pucón Indómito abre todos los días?",
        respuesta:
          "No: el horario de atención es de martes a domingo, de 10:30 a 20:30 hs (las piscinas cierran a las 20:00). Permanece cerrado los lunes.",
      },
      {
        pregunta: "¿Qué diferencia a Indómito de otras termas cerca de Pucón?",
        respuesta:
          "Indómito es un desarrollo más moderno orientado al spa de un día, con tinajas privadas de madera además de piscinas compartidas. Está en el mismo camino que Termas de Huife y Menetué, por lo que suele compararse con esas opciones más tradicionales de la zona.",
      },
    ],
    urlFuente: "https://termaspuconindomito.cl/",
    relacionados: [{ tipo: "volcan", slug: "villarrica" }],
  },
  {
    slug: "copahue",
    nombre: "Termas de Copahue",
    pais: "AR",
    region: "Neuquén — 19 km de Caviahue, a ~2.000 m s. n. m.",
    lat: -37.8167,
    lng: -71.1,
    temperaturaAgua: "20–70 °C según laguna (Laguna del Chancho y Laguna Verde: 27–40 °C)",
    descripcion: [
      "Las Termas de Copahue son un complejo termal único en Argentina por combinar aguas, vapores, fangos y algas mineromedicinales en un mismo lugar, a los pies del volcán Copahue, dentro del Parque Provincial Caviahue-Copahue. El pueblo de Copahue está a 19 km de Caviahue y a unos 2.000 m s.n.m., lo que lo convierte en uno de los centros termales más altos de Sudamérica.",
      "El pueblo pehuenche conocía las propiedades curativas de estas aguas desde mucho antes de la llegada de los criollos. El uso médico documentado comenzó en 1870, cuando el médico Pedro Ortiz Vélez empezó a traer pacientes con la autorización del cacique Cheuquel. El complejo es administrado hoy por el Ente Provincial de Termas de Neuquén (EPROTEN).",
      "El agua termal —de origen volcánico directo, alimentada por la misma actividad que el volcán Copahue— varía entre 20 °C y 70 °C según la fuente. Las lagunas Laguna del Chancho y Laguna Verde, las más visitadas, oscilan entre 27 °C y 40 °C. Por la nieve, el complejo solo abre de diciembre a abril/mayo; el resto del año el acceso por la ruta provincial 26 queda cortado.",
    ],
    datosExtra: [
      { label: "Altitud", valor: "~2.000 m s. n. m." },
      { label: "Temperatura del agua", valor: "20–70 °C según fuente" },
      { label: "Temporada de apertura", valor: "Diciembre a abril/mayo (cierra por nieve)" },
      { label: "Distancia desde Caviahue", valor: "19 km" },
      { label: "Uso médico documentado desde", valor: "1870" },
      { label: "Administración", valor: "EPROTEN (Ente Provincial de Termas de Neuquén)" },
    ],
    faq: [
      {
        pregunta: "¿Cuándo se puede visitar las Termas de Copahue?",
        respuesta:
          "El complejo opera de diciembre a abril o mayo, según la nieve. El resto del año la ruta provincial 26 entre Caviahue y Copahue queda cortada por nevadas y el pueblo de Copahue prácticamente se vacía.",
      },
      {
        pregunta: "¿Las Termas de Copahue están conectadas al volcán del mismo nombre?",
        respuesta:
          "Sí, el agua termal es de origen volcánico directo: proviene de la misma actividad geotérmica que mantiene activo al volcán Copahue, que se puede ver desde el complejo. Es importante verificar el nivel de alerta de SERNAGEOMIN/SEGEMAR antes de la visita, ya que el volcán tiene actividad eruptiva intermitente.",
      },
      {
        pregunta: "¿Qué tratamientos ofrecen las Termas de Copahue?",
        respuesta:
          "Baños sulfurosos y ferruginosos, baños de vapor, aplicaciones de fango y algas, e hidromasajes, indicados para afecciones de piel, reuma, artritis y vías respiratorias. El complejo cuenta con seis tipos de aguas medicinales distintas.",
      },
    ],
    urlFuente: "https://www.caviahue-copahue.gob.ar/termasdelcopahue/",
    wikipediaTitle: "Termas de Copahue",
    relacionados: [{ tipo: "volcan", slug: "copahue" }],
  },
  {
    slug: "malalcahuello",
    nombre: "Termas de Malalcahuello",
    pais: "CL",
    region: "Araucanía — 1,5 km al interior de Malalcahuello, comuna de Curacautín (~120 km de Temuco)",
    temperaturaAgua: "37–43 °C según piscina (brota a más de 38 °C)",
    descripcion: [
      "Las Termas de Malalcahuello son un hotel termal de montaña frente al volcán Lonquimay, dentro de la Reserva Nacional Malalcahuello, en la comuna de Curacautín. Están a 1,5 km del pueblo de Malalcahuello y a unos 120 km de Temuco, sobre la ruta internacional hacia el paso Pino Hachado.",
      "El agua brota a más de 38 °C y es rica en minerales como calcio, hierro y magnesio. En 2003 el Ministerio de Salud de Chile las declaró oficialmente 'fuente de agua curativa'. El complejo combina piscinas termales, spa, cabañas y bungalows en un entorno de bosque de araucarias y coigües.",
      "El complejo tiene una piscina de nado a contracorriente entre 37 y 38 °C, un jacuzzi que llega a 41 °C, y dos piletas más pequeñas de 7 °C y 43 °C para contraste térmico. Es uno de los puntos de partida habituales para el ascenso al volcán Lonquimay y para el centro de esquí Corralco.",
    ],
    datosExtra: [
      { label: "Temperatura del agua", valor: "37–43 °C según piscina" },
      { label: "Reconocimiento oficial", valor: "'Fuente de agua curativa', MINSAL 2003" },
      { label: "Distancia desde Temuco", valor: "~120 km" },
      { label: "Ubicación", valor: "Reserva Nacional Malalcahuello" },
      { label: "Volcán cercano", valor: "Lonquimay" },
    ],
    faq: [
      {
        pregunta: "¿Cómo llegar a las Termas de Malalcahuello?",
        respuesta:
          "Desde Temuco se toma la Ruta 5 Sur hasta Victoria y luego la ruta hacia Curacautín y Malalcahuello (~120 km en total). Las termas están 1,5 km al interior del pueblo de Malalcahuello, sobre el camino internacional hacia el paso Pino Hachado.",
      },
      {
        pregunta: "¿Por qué las Termas de Malalcahuello son 'agua curativa'?",
        respuesta:
          "El Ministerio de Salud de Chile las reconoció oficialmente como fuente de agua curativa en 2003 por su composición mineral (calcio, hierro, magnesio), utilizada tradicionalmente para dolencias reumáticas y de piel.",
      },
      {
        pregunta: "¿Se puede combinar con el volcán Lonquimay o el centro de esquí Corralco?",
        respuesta:
          "Sí, las termas están frente al volcán Lonquimay y son un punto de partida habitual tanto para el ascenso de verano como para acceder al centro de esquí Corralco en temporada de nieve.",
      },
    ],
    urlFuente: "https://www.termasdemalalcahuello.cl/",
    relacionados: [{ tipo: "volcan", slug: "lonquimay" }],
  },
  {
    slug: "llifen",
    nombre: "Termas de Llifén",
    pais: "CL",
    region: "Los Ríos — 20 km de Futrono, a orillas del río Calcurrupe (123 km de Valdivia)",
    lat: -40.20637,
    lng: -72.26285,
    temperaturaAgua: "20–40 °C según piscina",
    descripcion: [
      "Las Termas de Llifén son manantiales termales descubiertos en 1865 en la margen norte del río Calcurrupe, cerca de la orilla este del lago Ranco, a 125 m s.n.m. Su nombre viene del mapudungún 'lyvn' ('arder', 'encenderse el fuego'). Están a 20 km de Futrono y 123 km de Valdivia, en la Región de Los Ríos.",
      "El agua es rica en calcio, azufre, magnesio, potasio y sodio, tradicionalmente usada para afecciones reumáticas, cardiovasculares y hepáticas. El complejo actual combina piscinas termales con alojamiento tipo spa y cabañas frente al lago Ranco.",
      "A diferencia de las termas volcánicas de la Araucanía, Llifén no está asociada a un volcán activo específico: su origen es hidrotermal profundo, ligado a la falla Liquiñe-Ofqui que atraviesa toda esta franja de la Patagonia chilena.",
    ],
    datosExtra: [
      { label: "Temperatura del agua", valor: "20–40 °C según piscina" },
      { label: "Altitud", valor: "125 m s. n. m." },
      { label: "Descubrimiento", valor: "1865" },
      { label: "Distancia desde Futrono", valor: "20 km" },
      { label: "Distancia desde Valdivia", valor: "123 km" },
    ],
    faq: [
      {
        pregunta: "¿Cómo llegar a las Termas de Llifén?",
        respuesta:
          "Están a 20 km de Futrono y 123 km de Valdivia, en la Región de Los Ríos, a orillas del río Calcurrupe cerca del lago Ranco. El acceso es por camino pavimentado y ripio desde Futrono.",
      },
      {
        pregunta: "¿Qué significa 'Llifén'?",
        respuesta:
          "Es una palabra mapudungún derivada de 'lyvn', que significa 'arder' o 'encenderse el fuego' — una referencia directa al origen termal de las aguas.",
      },
      {
        pregunta: "¿Las Termas de Llifén están cerca de un volcán?",
        respuesta:
          "No de uno activo específico. A diferencia de Malalcahuello o Copahue, el origen de estas aguas es hidrotermal profundo, asociado a la falla Liquiñe-Ofqui que recorre la Patagonia chilena, no a la actividad de un cráter puntual.",
      },
    ],
    urlFuente: "https://www.termasllifen.cl/",
    wikipediaTitle: "Baños de Llifén",
  },
  {
    slug: "huife",
    nombre: "Termas de Huife",
    pais: "CL",
    region: "Araucanía — 33 km de Pucón, a orillas del río Liucura",
    lat: -39.227698,
    lng: -71.657364,
    temperaturaAgua: "38–58 °C, pH 8,8–8,9 (aguas sulfatadas, alcalinas, cloruradas)",
    descripcion: [
      "Las Termas de Huife están a 33 km de Pucón por camino pavimentado, a orillas del río Liucura y a 400 m s.n.m., con vista al cordón montañoso que rodea al volcán Villarrica. Es uno de los complejos termales más antiguos y conocidos del corredor Pucón–Curarrehue.",
      "El agua brota entre 38 °C y 58 °C, con un pH de 8,8 a 8,9: son aguas sulfatadas, alcalinas, cloruradas y carbonatadas, ricas en sodio y potasio. El complejo combina piscinas al aire libre —una con guijarros de cuarzo para reflexología— con piscinas individuales y pozones naturales de piedra junto al río.",
      "El contraste entre el agua termal caliente y el agua fría del río Liucura, que corre al lado, es parte de la experiencia tradicional del lugar, aprovechado también por circulación sanguínea. Está en el mismo corredor que Termas Pucón Indómito y Termas Menetué.",
    ],
    datosExtra: [
      { label: "Temperatura del agua", valor: "38–58 °C" },
      { label: "pH", valor: "8,8–8,9" },
      { label: "Altitud", valor: "400 m s. n. m." },
      { label: "Distancia desde Pucón", valor: "33 km" },
      { label: "Distancia desde Temuco", valor: "130 km" },
    ],
    faq: [
      {
        pregunta: "¿Cómo llegar a las Termas de Huife desde Pucón?",
        respuesta:
          "Son 33 km por camino pavimentado desde Pucón, siguiendo el valle del río Liucura hacia Curarrehue. El trayecto toma alrededor de 40 minutos en auto.",
      },
      {
        pregunta: "¿Qué diferencia a Huife de Termas Pucón Indómito?",
        respuesta:
          "Ambas están en el mismo corredor del río Liucura, pero Huife es un complejo más tradicional con piscinas de aguas más calientes (hasta 58 °C) y pozones naturales junto al río, mientras que Indómito es un desarrollo más moderno con tinajas privadas.",
      },
      {
        pregunta: "¿Se puede combinar Huife con el volcán Villarrica?",
        respuesta:
          "Sí, desde el complejo se ve el cordón montañoso que rodea al volcán Villarrica, y muchos visitantes combinan el ascenso al volcán o el paso por Pucón con una parada termal en Huife.",
      },
    ],
    urlFuente: "https://termashuife.cl/",
    wikipediaTitle: "Termas Huife",
    relacionados: [{ tipo: "volcan", slug: "villarrica" }],
  },
  {
    slug: "puyuhuapi",
    nombre: "Termas de Puyuhuapi",
    pais: "CL",
    region: "Aysén — Bahía Dorita, 16 km al sur de Puyuhuapi (225 km de Coyhaique), junto a la Carretera Austral",
    lat: -44.413727,
    lng: -72.645821,
    temperaturaAgua: "30–42 °C en piscinas exteriores; 34 °C en la piscina interior",
    descripcion: [
      "Las Termas de Puyuhuapi son uno de los complejos termales más remotos y exclusivos de la Patagonia chilena: se accede únicamente en bote, cruzando el fiordo desde el pueblo de Puyuhuapi o navegando cinco horas desde Puerto Chacabuco. Están en la Bahía Dorita, dentro del Seno Ventisquero, muy cerca del Parque Nacional Queulat y su Ventisquero Colgante.",
      "El lodge fue fundado a mediados de los años 80 en un terreno originalmente explorado por el aviador Ernesto Hein Águila, y desarrollado desde 1986 por el empresario germano-chileno Eberhard Kossmann, quien conoció el lugar navegando los fiordos al sur de Puerto Montt. La construcción, en madera nativa trabajada por artesanos locales, mantiene ese origen artesanal.",
      "El agua termal emerge del campo volcánico de Puyuhuapi y confluye con agua de mar y agua dulce de vertiente, una combinación poco común. Las tres piscinas exteriores frente a la bahía varían entre 30 °C y 42 °C según el caudal, mientras que la piscina interior del lodge se mantiene a 34 °C todo el año.",
    ],
    datosExtra: [
      { label: "Acceso", valor: "Solo en bote (fiordo Puyuhuapi / Seno Ventisquero)" },
      { label: "Temperatura del agua", valor: "30–42 °C exterior, 34 °C piscina interior" },
      { label: "Fundación", valor: "Mediados de los 80, desarrollado desde 1986" },
      { label: "Distancia desde Coyhaique", valor: "225 km por Carretera Austral + cruce en bote" },
      { label: "Parque cercano", valor: "Parque Nacional Queulat" },
    ],
    faq: [
      {
        pregunta: "¿Cómo se llega a las Termas de Puyuhuapi?",
        respuesta:
          "Solo por agua: hay cruces en bote desde el muelle del pueblo de Puyuhuapi (horarios habituales 13:00, 15:30 y 19:00), o una navegación de unas 5 horas desde Puerto Chacabuco por el fiordo Aysén y el canal Puyuhuapi. No hay acceso terrestre directo al lodge.",
      },
      {
        pregunta: "¿Se puede visitar sin alojarse en el lodge?",
        respuesta:
          "El acceso de día (day-pass) está sujeto a disponibilidad y a los horarios de cruce en bote, que conviene confirmar y reservar con el lodge con anticipación dado lo remoto del lugar.",
      },
      {
        pregunta: "¿Las Termas de Puyuhuapi se pueden combinar con el Parque Nacional Queulat?",
        respuesta:
          "Sí, están a poca distancia por la Carretera Austral del Parque Nacional Queulat y su famoso Ventisquero Colgante, uno de los atractivos más visitados de la ruta.",
      },
    ],
    urlFuente: "https://www.puyuhuapilodge.com/",
    wikipediaTitle: "Termas de Puyuhuapi",
    relacionados: [{ tipo: "parque", slug: "queulat" }],
  },
]

export function getTermaEntry(slug: string): TermaEntry | null {
  return TERMAS_CATALOG.find((t) => t.slug === slug) ?? null
}
