import type { Relacionado } from "@/lib/relacionados"

export type VolcanEntry = {
  slug: string
  nombre: string
  pais: "CL" | "AR" | "CL/AR"
  lat: number
  lng: number
  elevacion: number
  tipoVolcan: string
  ultimaErupcion: string
  anoUltimaErupcion: number | null
  descripcion: string[]
  datosExtra: Array<{ label: string; valor: string }>
  faq: Array<{ pregunta: string; respuesta: string }>
  urlFuente: string
  wikipediaTitle?: string
  relacionados?: Relacionado[]
}

export const VOLCANES_CATALOG: VolcanEntry[] = [
  {
    slug: "copahue",
    nombre: "Copahue",
    pais: "CL/AR",
    lat: -37.856,
    lng: -71.183,
    elevacion: 2965,
    tipoVolcan: "Estratovolcán activo",
    ultimaErupcion: "Actividad continua desde 2012, episodios en 2022–2024",
    anoUltimaErupcion: 2024,
    descripcion: [
      "El Copahue es un volcán transfronterizo que comparte Chile y Argentina, ubicado en la región de la Araucanía y la provincia del Neuquén. Su característica más singular es el cráter El Agrio, que alberga un lago volcánico de aguas ácidas de color turquesa intenso, uno de los pocos en el mundo con pH cercano a cero.",
      "Desde 2012 mantiene actividad eruptiva intermitente con emisiones de gases sulfurosos, columnas de ceniza y lava. SERNAGEOMIN lo monitorea como uno de los volcanes de mayor atención en Chile. A sus pies se encuentra la localidad de Caviahue (Argentina), que combina aguas termales con vistas directas al volcán.",
      "El área circundante es parte de la Reserva Natural Provincial Copahue-Caviahue y del Parque Nacional Cayambe-Coca en el lado chileno. El volcán es sagrado para el pueblo mapuche, que llama al lugar 'Copahue' — 'agua sulfurosa' en mapudungún.",
    ],
    datosExtra: [
      { label: "Elevación", valor: "2.965 m s. n. m." },
      { label: "Tipo", valor: "Estratovolcán activo" },
      { label: "País", valor: "Chile / Argentina" },
      { label: "Coordenadas", valor: "37°51′S 71°11′O" },
      { label: "Última erupción", valor: "2024 (actividad continua)" },
      { label: "Roca predominante", valor: "Basalto y andesita" },
    ],
    faq: [
      {
        pregunta: "¿Se puede visitar el volcán Copahue?",
        respuesta:
          "El acceso al cráter está restringido por la actividad volcánica continua. Sin embargo, se puede visitar la base desde Caviahue (Argentina), donde hay aguas termales y vistas espectaculares del volcán. Siempre verificá el nivel de alerta de SERNAGEOMIN antes de planificar la visita.",
      },
      {
        pregunta: "¿Qué son las aguas termales de Copahue?",
        respuesta:
          "Las aguas termales de Copahue son conocidas por su alto contenido mineral sulfuroso, utilizadas con fines terapéuticos. El complejo termal de Copahue-Caviahue en Neuquén recibe miles de turistas por año.",
      },
      {
        pregunta: "¿El volcán Copahue es peligroso?",
        respuesta:
          "Sí, el Copahue es considerado de alto riesgo por su actividad eruptiva frecuente desde 2012. SERNAGEOMIN mantiene vigilancia permanente y emite comunicados ante cualquier cambio de nivel de alerta.",
      },
    ],
    urlFuente: "https://www.sernageomin.cl/?s=Copahue+alerta",
    wikipediaTitle: "Volcán Copahue",
    relacionados: [{ tipo: "termas", slug: "copahue" }],
  },
  {
    slug: "callaqui",
    nombre: "Callaqui",
    pais: "CL",
    lat: -37.924,
    lng: -71.45,
    elevacion: 3164,
    tipoVolcan: "Estratovolcán",
    ultimaErupcion: "1980",
    anoUltimaErupcion: 1980,
    descripcion: [
      "El Callaqui es un volcán elongado ubicado en la Región del Biobío, Chile, con una morfología inusual: en vez del cono clásico, tiene una forma alargada de más de 12 km con múltiples cráteres alineados en su cumbre. Esta geometría lo hace único en la zona volcánica sur de los Andes.",
      "Sus erupciones históricas más recientes ocurrieron en 1937 y 1980, siendo esta última la de mayor magnitud registrada en el siglo XX. El entorno del volcán está cubierto por bosques nativos de la Cordillera de Nahuelbuta y es parte del territorio ancestral pewenche.",
      "El volcán es conocido también como 'Aguilera' en algunas fuentes históricas. Actualmente se encuentra en nivel Verde, sin actividad anómala detectada.",
    ],
    datosExtra: [
      { label: "Elevación", valor: "3.164 m s. n. m." },
      { label: "Tipo", valor: "Estratovolcán elongado" },
      { label: "País", valor: "Chile" },
      { label: "Región", valor: "Biobío" },
      { label: "Última erupción", valor: "1980" },
      { label: "Longitud", valor: "~12 km (eje principal)" },
    ],
    faq: [
      {
        pregunta: "¿Cuándo fue la última erupción del Callaqui?",
        respuesta:
          "La última erupción registrada del Callaqui fue en 1980. Desde entonces el volcán permanece en nivel Verde, sin actividad eruptiva significativa.",
      },
      {
        pregunta: "¿Por qué el Callaqui tiene forma alargada?",
        respuesta:
          "El Callaqui tiene morfología elongada porque se formó a lo largo de una fisura tectónica, en lugar de un único punto de emisión. Esto generó múltiples cráteres alineados en su cima.",
      },
    ],
    urlFuente: "https://www.sernageomin.cl/?s=Callaqui+alerta",
    wikipediaTitle: "Volcán Callaqui",
  },
  {
    slug: "lonquimay",
    nombre: "Lonquimay",
    pais: "CL",
    lat: -38.379,
    lng: -71.586,
    elevacion: 2865,
    tipoVolcan: "Estratovolcán",
    ultimaErupcion: "1988–1990 (cono Navidad)",
    anoUltimaErupcion: 1990,
    descripcion: [
      "El Lonquimay es un estratovolcán ubicado en la Región de La Araucanía, Chile, famoso por la erupción que comenzó la noche del 25 de diciembre de 1988. Este evento creó un nuevo cono adventicio llamado 'Navidad' en su flanco norte, que expulsó lava durante más de un año y generó flujos que recorrieron el valle.",
      "La erupción de 1988-1990 fue una de las más largas de Chile en el siglo XX, con emisiones de lava basáltica que cubrieron el río Lolco y afectaron a comunidades mapuche de la zona. El cono Navidad sigue siendo visible como una protuberancia en el flanco norte del volcán.",
      "El área es parte del Parque Nacional Tolhuaca y es frecuentada por andinistas que suben a la cumbre durante el verano. El volcán es parte del territorio pehuenche, cuyo nombre significa 'gente del pehuén (araucaria)'.",
    ],
    datosExtra: [
      { label: "Elevación", valor: "2.865 m s. n. m." },
      { label: "Tipo", valor: "Estratovolcán" },
      { label: "País", valor: "Chile" },
      { label: "Región", valor: "La Araucanía" },
      { label: "Última erupción", valor: "1988–1990" },
      { label: "Cono Navidad", valor: "Formado en la erupción de 1988" },
    ],
    faq: [
      {
        pregunta: "¿Qué es el cono Navidad del Lonquimay?",
        respuesta:
          "El cono Navidad es un cono adventicio que se formó en el flanco norte del Lonquimay durante la erupción que comenzó el 25 de diciembre de 1988. Fue el mayor evento volcánico de Chile en esa década.",
      },
      {
        pregunta: "¿Se puede escalar el Lonquimay?",
        respuesta:
          "Sí, el Lonquimay es una montaña popular para el andinismo en verano. El ascenso técnicamente moderado requiere equipo básico de montaña y condiciones climáticas estables. Se accede desde el Paso Lonquimay.",
      },
    ],
    urlFuente: "https://www.sernageomin.cl/?s=Lonquimay+alerta",
    wikipediaTitle: "Volcán Lonquimay",
    relacionados: [{ tipo: "termas", slug: "malalcahuello" }],
  },
  {
    slug: "llaima",
    nombre: "Llaima",
    pais: "CL",
    lat: -38.692,
    lng: -71.729,
    elevacion: 3125,
    tipoVolcan: "Estratovolcán activo",
    ultimaErupcion: "2008–2009",
    anoUltimaErupcion: 2009,
    descripcion: [
      "El Llaima es uno de los volcanes más activos de Chile y de toda Sudamérica, con más de 40 erupciones registradas desde el siglo XVII. Se ubica en el corazón del Parque Nacional Conguillío, en la Región de La Araucanía, rodeado de araucarias milenarias y lagos de origen volcánico.",
      "La erupción de enero de 2008 obligó a evacuar zonas del parque y generó flujos de lava que derritieron parte del glaciar que cubre el volcán, produciendo lahares. Esta erupción fue seguida de actividad en 2009. El Llaima tiene dos cráteres activos en su cima y una morfología cónica casi perfecta.",
      "El Parque Nacional Conguillío, diseñado en torno al volcán, es uno de los destinos naturales más espectaculares de Chile, con bosques de lenga y coihue, el lago Conguillío y el lago Verde. El Llaima es un destino clásico para andinistas avanzados.",
    ],
    datosExtra: [
      { label: "Elevación", valor: "3.125 m s. n. m." },
      { label: "Tipo", valor: "Estratovolcán activo" },
      { label: "País", valor: "Chile" },
      { label: "Parque", valor: "Parque Nacional Conguillío" },
      { label: "Última erupción", valor: "2008–2009" },
      { label: "Erupciones registradas", valor: "+40 desde el siglo XVII" },
    ],
    faq: [
      {
        pregunta: "¿Se puede visitar el Parque Nacional Conguillío y el Llaima?",
        respuesta:
          "Sí, el Parque Nacional Conguillío está abierto al público y es uno de los destinos más visitados del sur de Chile. Se puede hacer trekking alrededor del volcán y visitar los lagos de origen glaciar. El ascenso a la cumbre requiere guía certificado.",
      },
      {
        pregunta: "¿Cuándo fue la última vez que el Llaima entró en erupción?",
        respuesta:
          "La última erupción significativa del Llaima fue en 2008–2009. Desde entonces, el volcán ha mantenido actividad fumarólica menor y se monitorea continuamente por SERNAGEOMIN.",
      },
    ],
    urlFuente: "https://www.sernageomin.cl/?s=Llaima+alerta",
    wikipediaTitle: "Volcán Llaima",
  },
  {
    slug: "villarrica",
    nombre: "Villarrica",
    pais: "CL",
    lat: -39.42,
    lng: -71.93,
    elevacion: 2847,
    tipoVolcan: "Estratovolcán activo (lago de lava permanente)",
    ultimaErupcion: "2024 (actividad constante; erupción mayor en marzo 2015)",
    anoUltimaErupcion: 2024,
    descripcion: [
      "El Villarrica es el volcán más activo de Chile y uno de los pocos en el mundo con un lago de lava permanente visible en su cráter. Ubicado junto a la ciudad turística de Pucón, en la Región de Los Ríos, es a la vez uno de los más monitoreados y uno de los destinos de andinismo más populares del país.",
      "La erupción de la madrugada del 3 de marzo de 2015 fue la más espectacular de Chile en décadas: una columna eruptiva de más de 1.500 metros expulsó lava incandescente que fue fotografiada y filmada en tiempo real, convirtiéndose en imágenes icónicas a nivel mundial. La ciudad de Pucón evacuó preventivamente esa noche.",
      "Hoy el volcán es accesible para andinismo guiado con equipamiento de alta montaña. La subida comienza en el centro de ski Villarrica-Pucón y culmina en una de las vistas más impactantes del país: el cráter humeante y el lago de lava al fondo. El entorno del volcán integra el Parque Nacional Villarrica.",
    ],
    datosExtra: [
      { label: "Elevación", valor: "2.847 m s. n. m." },
      { label: "Tipo", valor: "Estratovolcán activo" },
      { label: "País", valor: "Chile" },
      { label: "Ciudad cercana", valor: "Pucón, 15 km" },
      { label: "Última erupción mayor", valor: "Marzo 2015" },
      { label: "Característica", valor: "Lago de lava permanente" },
    ],
    faq: [
      {
        pregunta: "¿Puedo subir al cráter del Villarrica?",
        respuesta:
          "Sí, el ascenso al Villarrica es posible todo el año con guía certificado y equipo adecuado (crampones, piolet, casco, máscara de gases). Es obligatorio verificar el nivel de alerta de SERNAGEOMIN antes de salir. Cuando el volcán está en alerta Amarilla o superior, los ascensos están prohibidos.",
      },
      {
        pregunta: "¿Qué hace especial al Villarrica entre los volcanes activos?",
        respuesta:
          "El Villarrica es uno de los pocos volcanes del mundo con un lago de lava (magma fundida visible) permanente en su cráter. Esto lo hace científicamente fascinante y visualmente impactante.",
      },
      {
        pregunta: "¿Desde dónde se accede al Villarrica?",
        respuesta:
          "El acceso principal es desde la ciudad de Pucón, a 15 km del volcán. Pucón tiene aeropuerto con vuelos desde Santiago y amplia oferta turística. El punto de partida para el ascenso es el centro de ski Villarrica, a 1.400 m de altitud.",
      },
    ],
    urlFuente: "https://www.sernageomin.cl/?s=Villarrica+alerta",
    wikipediaTitle: "Volcán Villarrica",
    relacionados: [
      { tipo: "termas", slug: "geometricas" },
      { tipo: "termas", slug: "pucon-indomito" },
      { tipo: "termas", slug: "huife" },
    ],
  },
  {
    slug: "lanin",
    nombre: "Lanín",
    pais: "CL/AR",
    lat: -39.638,
    lng: -71.503,
    elevacion: 3776,
    tipoVolcan: "Estratovolcán (potencialmente activo)",
    ultimaErupcion: "Sin erupciones históricas confirmadas",
    anoUltimaErupcion: null,
    descripcion: [
      "El Lanín es el volcán más alto de la Patagonia septentrional, con 3.776 m de elevación, y uno de los conos volcánicos más perfectos del mundo. Su forma simétrica y la nieve perpetua que lo cubre lo hacen inconfundible en el horizonte desde ambos lados de la cordillera. Aunque se considera potencialmente activo, no tiene erupciones documentadas en tiempos históricos.",
      "Es el símbolo del Parque Nacional Lanín en Argentina, que lo rodea con un bosque de araucarias (pehuenes) declarado Reserva de Biosfera UNESCO. Del lado chileno integra la Reserva Nacional Villarrica. La cumbre puede alcanzarse por tres rutas, siendo la más popular la cara sur-este argentina.",
      "Para el pueblo mapuche-pewenche, el Lanín (cuyo nombre significa 'roca que murió' o 'montaña que cayó' en mapudungún) tiene un valor sagrado profundo. El ascenso requiere permiso de las comunidades indígenas, respeto por los protocolos culturales y habilitación del Parque Nacional.",
    ],
    datosExtra: [
      { label: "Elevación", valor: "3.776 m s. n. m." },
      { label: "Tipo", valor: "Estratovolcán potencialmente activo" },
      { label: "País", valor: "Chile / Argentina" },
      { label: "Parque", valor: "Parque Nacional Lanín (AR)" },
      { label: "Última erupción", valor: "Sin registro histórico" },
      { label: "Reconocimiento", valor: "Reserva de Biosfera UNESCO" },
    ],
    faq: [
      {
        pregunta: "¿Se puede escalar el volcán Lanín?",
        respuesta:
          "Sí, el Lanín es un destino de andinismo muy frecuentado desde Junín de los Andes (Argentina). El ascenso requiere acreditación en el Parque Nacional Lanín, equipo técnico completo y en algunos casos acompañamiento de guía. La temporada habitual es diciembre–marzo.",
      },
      {
        pregunta: "¿El Lanín podría entrar en erupción?",
        respuesta:
          "SERNAGEOMIN y el OAVV (Observatorio Andino de Vulcanología y Volcanología) monitorean el Lanín como potencialmente activo. No tiene erupciones documentadas en tiempos históricos, pero su actividad interna no puede descartarse.",
      },
      {
        pregunta: "¿Qué significa 'Lanín' en mapuche?",
        respuesta:
          "En mapudungún, 'Lanín' significa aproximadamente 'roca que murió' o 'montaña que se extinguió', haciendo referencia a su aparente quietud volcánica. El volcán es parte fundamental de la cosmovisión pewenche.",
      },
    ],
    urlFuente: "https://www.sernageomin.cl/?s=Lan%C3%ADn+alerta",
    wikipediaTitle: "Volcán Lanín",
  },
  {
    slug: "mocho-choshuenco",
    nombre: "Mocho-Choshuenco",
    pais: "CL",
    lat: -39.932,
    lng: -72.032,
    elevacion: 2422,
    tipoVolcan: "Complejo volcánico (dos estratovolcanes)",
    ultimaErupcion: "~1864",
    anoUltimaErupcion: 1864,
    descripcion: [
      "El Mocho-Choshuenco es un complejo volcánico formado por dos volcanes separados pero geológicamente relacionados: el Mocho (al oeste, con caldera glaciada) y el Choshuenco (al este, con cono más prominente). Ambos se ubican a orillas del Lago Panguipulli, en la Región de Los Ríos, Chile.",
      "La última erupción registrada ocurrió alrededor de 1864 y afectó el área local con depósitos de ceniza y flujos piroclásticos. Los registros geológicos muestran erupciones previas de carácter explosivo que depositaron capas de tefra a lo largo de la Patagonia. Actualmente el complejo se monitorea en nivel Verde.",
      "El entorno es parte de la Reserva Nacional Mocho-Choshuenco y ofrece acceso a senderos de trekking entre los dos cráteres. Los volcanes están rodeados de bosques valdiviano-templados con especies únicas como el alerce y la araucaria.",
    ],
    datosExtra: [
      { label: "Elevación", valor: "2.422 m s. n. m. (Choshuenco)" },
      { label: "Tipo", valor: "Complejo volcánico" },
      { label: "País", valor: "Chile" },
      { label: "Región", valor: "Los Ríos" },
      { label: "Última erupción", valor: "~1864" },
      { label: "Área protegida", valor: "Reserva Nacional Mocho-Choshuenco" },
    ],
    faq: [
      {
        pregunta: "¿Cuál es la diferencia entre el Mocho y el Choshuenco?",
        respuesta:
          "Son dos volcanes vecinos que forman un único complejo volcánico. El Mocho tiene una caldera glaciada al oeste, mientras el Choshuenco tiene un cono más clásico al este. Comparten la misma base magmática.",
      },
      {
        pregunta: "¿Se puede visitar el Mocho-Choshuenco?",
        respuesta:
          "Sí, desde el lago Panguipulli hay acceso a la Reserva Nacional. El trekking entre los cráteres es apto para caminantes con experiencia. El ascenso a la cumbre requiere equipo técnico.",
      },
    ],
    urlFuente: "https://www.sernageomin.cl/?s=Mocho+alerta",
    wikipediaTitle: "Complejo volcánico Mocho-Choshuenco",
  },
  {
    slug: "osorno",
    nombre: "Osorno",
    pais: "CL",
    lat: -41.1,
    lng: -72.493,
    elevacion: 2652,
    tipoVolcan: "Estratovolcán",
    ultimaErupcion: "1869",
    anoUltimaErupcion: 1869,
    descripcion: [
      "El Osorno es el volcán más fotogénico de Chile y uno de los más reconocibles del planeta, con su cono de nieve perfecto reflejado en el Lago Llanquihue. Ubicado en la Región de Los Lagos, comparte el paisaje con el Puerto Montt y los volcanes Calbuco y Puntiagudo. Su perfil inspiró comparaciones con el Monte Fuji japonés.",
      "La última erupción registrada ocurrió en 1869, aunque hay registros geológicos de actividad significativa en el siglo XVIII. Actualmente se considera en estado de quietud, aunque el monitoreo sísmico es continuo. En su faldeo hay un centro de ski con vista directa al lago.",
      "El Osorno integra el Parque Nacional Vicente Pérez Rosales, el más antiguo de Chile (1926). Está rodeado de cataratas, lagunas de origen glaciar y selva valdiviana. Desde Puerto Varas, a 50 km, la vista del volcán sobre el lago es una de las más icónicas de la Patagonia chilena.",
    ],
    datosExtra: [
      { label: "Elevación", valor: "2.652 m s. n. m." },
      { label: "Tipo", valor: "Estratovolcán" },
      { label: "País", valor: "Chile" },
      { label: "Ciudad cercana", valor: "Puerto Varas, 50 km" },
      { label: "Última erupción", valor: "1869" },
      { label: "Parque", valor: "Parque Nacional Vicente Pérez Rosales" },
    ],
    faq: [
      {
        pregunta: "¿Se puede escalar el volcán Osorno?",
        respuesta:
          "Sí, el Osorno es accesible para andinistas con experiencia. La ruta más popular parte del centro de ski y requiere crampones, piolet y guía certificado para llegar a la cumbre. La temporada recomendada es diciembre a marzo.",
      },
      {
        pregunta: "¿Desde dónde se ve mejor el volcán Osorno?",
        respuesta:
          "Las mejores vistas se obtienen desde Puerto Varas o desde la orilla del lago Llanquihue al amanecer. También desde el teleférico y el mirador del centro de ski en el faldeo.",
      },
      {
        pregunta: "¿El Osorno está activo?",
        respuesta:
          "El Osorno no ha tenido erupciones desde 1869 y se clasifica en estado de quietud. Sin embargo, es monitoreado por SERNAGEOMIN por su potencial volcánico.",
      },
    ],
    urlFuente: "https://www.sernageomin.cl/?s=Osorno+alerta",
    wikipediaTitle: "Volcán Osorno",
  },
  {
    slug: "calbuco",
    nombre: "Calbuco",
    pais: "CL",
    lat: -41.33,
    lng: -72.614,
    elevacion: 2003,
    tipoVolcan: "Estratovolcán activo",
    ultimaErupcion: "2015 (erupción explosiva inesperada)",
    anoUltimaErupcion: 2015,
    descripcion: [
      "El Calbuco es uno de los volcanes más peligrosos de Chile: a pesar de sus modestos 2.003 metros, protagonizó el 22 de abril de 2015 una de las erupciones más espectaculares del siglo XXI en Sudamérica. La columna de ceniza alcanzó los 15 km de altura y las imágenes de la erupción nocturna iluminada por relámpagos volcánicos dieron la vuelta al mundo en pocas horas.",
      "Lo que hizo especialmente alarmante la erupción del 2015 fue su carácter abrupto: el volcán pasó de nivel Verde a erupción activa en menos de dos horas, sin signos sísmicos previos significativos. Esto puso en evidencia la necesidad de monitoreo constante incluso en volcanes aparentemente tranquilos.",
      "El Calbuco está ubicado entre las ciudades de Puerto Montt y Ensenada, en la Región de Los Lagos. Su acceso es parte de la Ruta de los Parques de la Patagonia y ofrece trekking de temporada en su base. La zona tiene restricción de acceso al cráter por decreto.",
    ],
    datosExtra: [
      { label: "Elevación", valor: "2.003 m s. n. m." },
      { label: "Tipo", valor: "Estratovolcán activo" },
      { label: "País", valor: "Chile" },
      { label: "Ciudad cercana", valor: "Puerto Montt, 35 km" },
      { label: "Última erupción", valor: "22 de abril de 2015" },
      { label: "Altura columna 2015", valor: "~15 km" },
    ],
    faq: [
      {
        pregunta: "¿Se puede visitar el volcán Calbuco?",
        respuesta:
          "Se puede acceder a la base del volcán y hacer trekking en sus faldeos, pero el cráter está restringido. El acceso turístico más cercano es desde Ensenada, al norte del lago Llanquihue.",
      },
      {
        pregunta: "¿Por qué la erupción del Calbuco de 2015 fue tan famosa?",
        respuesta:
          "Por su violencia repentina, su columna de 15 km y las impactantes imágenes nocturnas con relámpagos volcánicos. El volcán estuvo 40 años sin erupcionar antes del evento de 2015.",
      },
      {
        pregunta: "¿Es segura la zona alrededor del Calbuco?",
        respuesta:
          "Puerto Montt y las localidades cercanas son seguras en condición normal. SERNAGEOMIN mantiene monitoreo 24/7 y emite alertas con instrucciones de evacuación ante cualquier cambio de actividad.",
      },
    ],
    urlFuente: "https://www.sernageomin.cl/?s=Calbuco+alerta",
    wikipediaTitle: "Volcán Calbuco",
  },
  {
    slug: "chaiten",
    nombre: "Chaitén",
    pais: "CL",
    lat: -42.833,
    lng: -72.646,
    elevacion: 1122,
    tipoVolcan: "Volcán de caldera (domo riolítico)",
    ultimaErupcion: "2008–2009 (primera erupción en ~9.400 años)",
    anoUltimaErupcion: 2009,
    descripcion: [
      "El Chaitén es uno de los volcanes más sorprendentes de la historia reciente: el 2 de mayo de 2008 entró en erupción por primera vez en aproximadamente 9.400 años. La erupción fue completamente inesperada, no había monitoreo sísmico previo, y en menos de 36 horas la columna de ceniza alcanzó la estratósfera. La ciudad de Chaitén (10.000 habitantes) fue evacuada de emergencia.",
      "La erupción continuó durante más de un año, generando el mayor domo de lava riolítica del siglo XXI hasta esa fecha. Los lahares (flujos de lodo volcánico) destruyeron buena parte del casco urbano de Chaitén, que fue parcialmente reconstruida a 10 km al norte. El domo interior del cráter sigue siendo geológicamente activo.",
      "Hoy el área alrededor del volcán es parte del Parque Nacional Chaitén. La caldera y el domo pueden visitarse con guía habilitado, y es uno de los sitios geológicos más interesantes de toda la Patagonia para entender la dinámica volcánica riolítica.",
    ],
    datosExtra: [
      { label: "Elevación", valor: "1.122 m s. n. m." },
      { label: "Tipo", valor: "Volcán de caldera — domo riolítico" },
      { label: "País", valor: "Chile" },
      { label: "Región", valor: "Los Lagos" },
      { label: "Última erupción", valor: "2008–2009" },
      { label: "Silencio previo", valor: "~9.400 años sin erupciones" },
    ],
    faq: [
      {
        pregunta: "¿Qué pasó con la ciudad de Chaitén después de la erupción de 2008?",
        respuesta:
          "La ciudad fue evacuada en 36 horas. Los lahares del río Blanco destruyeron el centro histórico. Parte de la ciudad fue reconstruida a 10 km al norte, aunque algunos sectores antiguos fueron abandonados y hoy son visitados como 'ciudad fantasma'.",
      },
      {
        pregunta: "¿Se puede visitar el interior del volcán Chaitén?",
        respuesta:
          "Sí, con guía certificado se puede acceder al interior de la caldera y ver el domo riolítico de cerca. Es una experiencia geológica única en Sudamérica. Se accede desde la ciudad de Chaitén por ruta terrestre.",
      },
      {
        pregunta: "¿Por qué la erupción del Chaitén fue tan inesperada?",
        respuesta:
          "Porque el volcán llevaba ~9.400 años inactivo, no estaba monitorizado con sismógrafos y no existían protocolos de evacuación para la zona. Fue un caso de estudio a nivel mundial sobre gestión de riesgo volcánico.",
      },
    ],
    urlFuente: "https://www.sernageomin.cl/?s=Chaiten+alerta",
    wikipediaTitle: "Volcán Chaitén",
  },
  {
    slug: "michinmahuida",
    nombre: "Michinmahuida",
    pais: "CL",
    lat: -43.299,
    lng: -72.44,
    elevacion: 2404,
    tipoVolcan: "Estratovolcán",
    ultimaErupcion: "~1835",
    anoUltimaErupcion: 1835,
    descripcion: [
      "El Michinmahuida es un volcán muy aislado en la Patagonia chilena septentrional, ubicado en la Región de Los Lagos, al norte del Parque Nacional Pumalín. Su nombre en mapuche significa 'volcán que se mueve' o 'montaña de hielo'. A pesar de su altura moderada, está cubierto por un extenso campo de hielo que lo hace difícil de acceder y estudiar.",
      "Las erupciones históricas del Michinmahuida están escasamente documentadas. La última actividad eruptiva confirmada ocurrió alrededor de 1835, contemporánea con la documentada por Charles Darwin durante su viaje en el HMS Beagle por la costa chilena.",
      "Hoy el volcán forma parte de la zona norte del Parque Nacional Pumalín, declarado Parque de las Américas. Es un destino para expedicionistas avanzados: el acceso requiere travesías largas por selva y campo de hielo, y hay muy poca infraestructura en la zona.",
    ],
    datosExtra: [
      { label: "Elevación", valor: "2.404 m s. n. m." },
      { label: "Tipo", valor: "Estratovolcán" },
      { label: "País", valor: "Chile" },
      { label: "Parque", valor: "Parque Nacional Pumalín" },
      { label: "Última erupción", valor: "~1835" },
      { label: "Característica", valor: "Cubierto por campo de hielo patagónico" },
    ],
    faq: [
      {
        pregunta: "¿Cómo se accede al volcán Michinmahuida?",
        respuesta:
          "El acceso es muy difícil y requiere planificación avanzada. Se accede por la Carretera Austral hacia la entrada norte del Parque Nacional Pumalín. El ascenso implica travesías largas por selva valdiviana y glaciares.",
      },
      {
        pregunta: "¿Está activo el Michinmahuida?",
        respuesta:
          "Se considera potencialmente activo con registros históricos de alrededor de 1835. No tiene actividad registrada reciente y se encuentra en nivel Verde.",
      },
    ],
    urlFuente: "https://www.sernageomin.cl/?s=Michinmahuida+alerta",
    wikipediaTitle: "Volcán Michinmahuida",
  },
  {
    slug: "hudson",
    nombre: "Hudson",
    pais: "CL",
    lat: -45.9,
    lng: -72.97,
    elevacion: 1905,
    tipoVolcan: "Volcán de escudo con caldera",
    ultimaErupcion: "2011 (actividad menor); gran erupción catastrófica en 1991",
    anoUltimaErupcion: 2011,
    descripcion: [
      "El Hudson es el volcán más austral del catálogo activo de SERNAGEOMIN y uno de los más peligrosos de Sudamérica. En agosto de 1991 protagonizó la mayor erupción del subcontinente en el siglo XX: la columna de ceniza llegó a 18 km de altura y los depósitos cubrieron más de 100.000 km² de la Patagonia argentina, llegando hasta las Islas Malvinas. Murieron miles de animales y la actividad ganadera de la región se paralizó durante años.",
      "El volcán tiene una caldera glaciada de aproximadamente 10 km de diámetro, la segunda más grande de Chile. A diferencia de los estratovolcanes clásicos, su morfología de escudo lo hace menos visible en el paisaje, pero no menos activo. Tuvo una erupción menor en 2011 con emisión de cenizas.",
      "El acceso al Hudson es extremadamente difícil: está rodeado por el Campo de Hielo Norte y su base está en zonas remotas de la Región de Aysén, sin carreteras cercanas. Las comunidades patagónicas de Cochrane y Puerto Aysén son los centros habitados más próximos.",
    ],
    datosExtra: [
      { label: "Elevación", valor: "1.905 m s. n. m." },
      { label: "Tipo", valor: "Volcán de escudo con caldera" },
      { label: "País", valor: "Chile" },
      { label: "Región", valor: "Aysén" },
      { label: "Gran erupción", valor: "Agosto 1991 — la mayor de Sudamérica en el siglo XX" },
      { label: "Caldera", valor: "~10 km de diámetro" },
    ],
    faq: [
      {
        pregunta: "¿Cuál fue el impacto de la erupción del Hudson en 1991?",
        respuesta:
          "La erupción de agosto de 1991 cubrió más de 100.000 km² con cenizas en la Patagonia argentina. La lluvia de tefra destruyó praderas, mató animales y afectó gravemente la economía ganadera de la región durante años. Las cenizas llegaron hasta las Islas Malvinas.",
      },
      {
        pregunta: "¿Se puede acceder al volcán Hudson?",
        respuesta:
          "El acceso es muy difícil. El volcán está rodeado por el Campo de Hielo Norte y no hay carreteras directas. Se accede con expediciones de varios días desde la Región de Aysén, con travesías en helicóptero o largas caminatas.",
      },
      {
        pregunta: "¿El volcán Hudson sigue activo?",
        respuesta:
          "Sí, el Hudson tuvo una erupción menor en 2011 y es considerado un volcán activo de alta peligrosidad. SERNAGEOMIN lo monitorea con instrumentación instalada en la zona.",
      },
    ],
    urlFuente: "https://www.sernageomin.cl/?s=Hudson+alerta",
    wikipediaTitle: "Volcán Hudson",
  },
]

export function getVolcanEntry(slug: string): VolcanEntry | undefined {
  return VOLCANES_CATALOG.find((v) => v.slug === slug)
}
