export type ClimbingStyle = "deporte" | "trad" | "big wall" | "bouldering" | "alpinismo"

export type Sector = {
  slug: string
  nombre: string
  pais: "AR" | "CL"
  region: string
  lat: number
  lon: number
  tipoRoca: string[]
  estilos: ClimbingStyle[]
  gradosMin: string
  gradosMax: string
  temporada: string[]
  altitud: number
  descripcion: string
  comoLlegar: string
  camping: string | null
  permisos: string | null
  rutasDestacadas: { nombre: string; grado: string; largo: string; estilo: ClimbingStyle }[]
  imagenUrl: string | null
}

export const ESCALADA_CATALOG: Sector[] = [
  // ─── Argentina ──────────────────────────────────────────────────────────────
  {
    slug: "fitz-roy",
    nombre: "Fitz Roy",
    pais: "AR",
    region: "El Chaltén, Santa Cruz",
    lat: -49.2713,
    lon: -72.9988,
    tipoRoca: ["granito"],
    estilos: ["big wall", "trad", "alpinismo"],
    gradosMin: "5a",
    gradosMax: "8b",
    temporada: ["nov", "dic", "ene", "feb", "mar"],
    altitud: 1600,
    descripcion:
      "El Fitz Roy (3.405 m) es el emblema de la escalada patagónica. Sus agujas de granito de agua compacto ofrecen algunas de las rutas más comprometidas y bellas del mundo. El acceso al campo base desde El Chaltén toma 3–4 horas, y las condiciones climáticas determinan todo: las ventanas de buen tiempo suelen durar solo 24–48 horas. Las rutas clásicas como Supercanaleta y Franco-Argentina mixturan dificultad técnica con exposición alpina extrema.",
    comoLlegar:
      "Vuelo o bus a El Calafate. Bus diario a El Chaltén (3 horas). Desde el pueblo, sendero al Río Blanco y Camp Cóndores (campo base).",
    camping:
      "Camp Cóndores (campo base oficial, a 3h de El Chaltén). Camping libre permitido en zona de escalada.",
    permisos:
      "Registro obligatorio en el PNGL (Parque Nacional Los Glaciares) antes de acceder a la pared. Sin costo adicional al ingreso del parque.",
    rutasDestacadas: [
      { nombre: "Supercanaleta", grado: "6a A2 M5", largo: "1.500 m", estilo: "alpinismo" },
      { nombre: "Franco-Argentina", grado: "7a+", largo: "1.200 m", estilo: "trad" },
      { nombre: "Goretta Pillar", grado: "6b+", largo: "900 m", estilo: "trad" },
      { nombre: "Afanassieff", grado: "6c", largo: "1.100 m", estilo: "alpinismo" },
    ],
    imagenUrl: null,
  },
  {
    slug: "cerro-torre",
    nombre: "Cerro Torre",
    pais: "AR",
    region: "El Chaltén, Santa Cruz",
    lat: -49.2936,
    lon: -73.0972,
    tipoRoca: ["granito"],
    estilos: ["alpinismo", "trad"],
    gradosMin: "5a",
    gradosMax: "8b",
    temporada: ["nov", "dic", "ene", "feb"],
    altitud: 3102,
    descripcion:
      "El Cerro Torre (3.102 m) es posiblemente la montaña más difícil del mundo para su altura. La columna de granito culmina en un hongo de hielo que cambia constantemente. La ruta normal (Compressor Route, sin los bolts históricos) es una ascensión alpina de máxima exigencia. El viento puede superar los 150 km/h. Solo para equipos con amplia experiencia en escalada en hielo y mixta.",
    comoLlegar:
      "Desde El Chaltén, sendero al Lago Torre (2h30) y Aguja Standhart (campo base) en otras 2 horas.",
    camping:
      "Campo base en el Río Pollone / Lago Torre. Zona de acampe libre.",
    permisos:
      "Registro obligatorio en PNGL. La ascensión al Cerro Torre implica travesía glaciar — recomendada con guía certificado UIAGM.",
    rutasDestacadas: [
      { nombre: "Compressor Route (sin bolts)", grado: "8a M8 AI5", largo: "1.000 m", estilo: "alpinismo" },
      { nombre: "El Arca de los Vientos", grado: "8b", largo: "1.200 m", estilo: "trad" },
      { nombre: "Directa de la Mentira", grado: "7c+", largo: "900 m", estilo: "trad" },
    ],
    imagenUrl: null,
  },
  {
    slug: "piedras-blancas",
    nombre: "Piedras Blancas",
    pais: "AR",
    region: "Bariloche, Río Negro",
    lat: -41.18,
    lon: -71.48,
    tipoRoca: ["granito"],
    estilos: ["deporte", "trad"],
    gradosMin: "5a",
    gradosMax: "8a",
    temporada: ["oct", "nov", "dic", "ene", "feb", "mar", "abr"],
    altitud: 900,
    descripcion:
      "El sector de escalada deportiva más completo de Bariloche. Bloques y paredes de granito de alta calidad con más de 80 vías en todos los grados. A 45 minutos del centro de Bariloche, es ideal para visitantes que quieran combinar trekking y escalada. Las placas del sector principal ofrecen vías largas de deporte en grados medios, perfectas para progresar.",
    comoLlegar:
      "Desde Bariloche, tomar Ruta Nacional 40 hacia el sur. Desvío señalizado a Piedras Blancas, 12 km de ripio.",
    camping:
      "Camping privado a 500 m del sector. También se puede ir en día desde Bariloche.",
    permisos: null,
    rutasDestacadas: [
      { nombre: "La Fisura Clásica", grado: "6a", largo: "25 m", estilo: "trad" },
      { nombre: "Placa del Condor", grado: "7a+", largo: "30 m", estilo: "deporte" },
      { nombre: "El Techo de los Sueños", grado: "7c", largo: "20 m", estilo: "deporte" },
      { nombre: "Grieta Norte", grado: "5c", largo: "35 m", estilo: "trad" },
    ],
    imagenUrl: null,
  },
  {
    slug: "cerro-catedral",
    nombre: "Cerro Catedral",
    pais: "AR",
    region: "Bariloche, Río Negro",
    lat: -41.18,
    lon: -71.44,
    tipoRoca: ["granito"],
    estilos: ["deporte", "bouldering"],
    gradosMin: "4a",
    gradosMax: "8c",
    temporada: ["sep", "oct", "nov", "dic", "ene", "feb", "mar", "abr", "may"],
    altitud: 2388,
    descripcion:
      "Las agujas del Catedral (2.388 m) dominan el horizonte de Bariloche desde el oeste. En el sector inferior, docenas de bloques de bouldering permiten entrenar en grados altos sin equipo de anclaje. Las agujas principales (Aguja Frey, Los Dedos, Nunatak) ofrecen vías de hasta 300 m en grado técnico. El refugio Frey es el punto de partida para todas las ascensiones.",
    comoLlegar:
      "Desde Bariloche, colectivo urbano hasta el fin de línea de Villa Catedral (ski center). Caminata al Refugio Frey: 3 horas.",
    camping:
      "Refugio Frey (con comida y alquiler de colchonetas). Camping al lado del refugio.",
    permisos: null,
    rutasDestacadas: [
      { nombre: "Aguja Frey — vía normal", grado: "5b", largo: "200 m", estilo: "trad" },
      { nombre: "Los Dedos — vía oeste", grado: "6b", largo: "180 m", estilo: "trad" },
      { nombre: "Nunatak — pilar central", grado: "7a", largo: "250 m", estilo: "deporte" },
      { nombre: "La Bonita (boulder)", grado: "8a", largo: "Bloque", estilo: "bouldering" },
    ],
    imagenUrl: null,
  },
  {
    slug: "la-paloma",
    nombre: "La Paloma",
    pais: "AR",
    region: "Bariloche, Río Negro",
    lat: -41.16,
    lon: -71.5,
    tipoRoca: ["granito"],
    estilos: ["deporte"],
    gradosMin: "5a",
    gradosMax: "7c",
    temporada: ["oct", "nov", "dic", "ene", "feb", "mar", "abr"],
    altitud: 800,
    descripcion:
      "La Paloma es el sector de iniciación y escalada familiar más popular de Bariloche. A solo 20 minutos en auto del centro, ofrece paredes bajas y bien equipadas en grados 5a–7c, ideales para quienes se inician en la escalada deportiva. El entorno de bosque de coihue y lago hace del sector uno de los más pintorescos de la región.",
    comoLlegar:
      "Ruta 237 hacia Villa Angostura, desvío señalizado a La Paloma a 10 km del centro de Bariloche.",
    camping:
      "Camping municipal en la ruta principal a 2 km del sector.",
    permisos: null,
    rutasDestacadas: [
      { nombre: "El Palomino", grado: "5c", largo: "15 m", estilo: "deporte" },
      { nombre: "Vuelo Libre", grado: "6c+", largo: "18 m", estilo: "deporte" },
      { nombre: "La Cumbrera", grado: "7b", largo: "22 m", estilo: "deporte" },
    ],
    imagenUrl: null,
  },
  {
    slug: "piedra-parada",
    nombre: "Piedra Parada",
    pais: "AR",
    region: "Chubut",
    lat: -43.0,
    lon: -68.1,
    tipoRoca: ["basalto"],
    estilos: ["deporte", "trad"],
    gradosMin: "4a",
    gradosMax: "8b",
    temporada: ["sep", "oct", "nov", "dic", "ene", "feb", "mar", "abr", "may"],
    altitud: 1100,
    descripcion:
      "Piedra Parada es el plugón basáltico más grande del mundo: un monolito de 270 m que se levanta sobre la estepa patagónica del Chubut. La roca basáltica de columnas hexagonales ofrece una escalada completamente distinta al granito: fisuras perfectas, horizontales y diedros con adherencia inusual. Con más de 120 vías equipadas, es el destino de escalada más completo de la Patagonia árida.",
    comoLlegar:
      "Desde Esquel, Ruta 259 hacia el norte (120 km). Ripio los últimos 20 km hasta el camping del sector.",
    camping:
      "Camping guardafauna a pie del monolito. Servicio básico de agua.",
    permisos:
      "Control de guardaparques en el acceso. Sin costo adicional.",
    rutasDestacadas: [
      { nombre: "La Arista del Diablo", grado: "6a", largo: "270 m", estilo: "trad" },
      { nombre: "El Filo de la Navaja", grado: "7b+", largo: "180 m", estilo: "deporte" },
      { nombre: "Hexagonal", grado: "5b", largo: "120 m", estilo: "trad" },
      { nombre: "Basalto Puro", grado: "8a", largo: "30 m", estilo: "deporte" },
    ],
    imagenUrl: null,
  },

  // ─── Chile ───────────────────────────────────────────────────────────────────
  {
    slug: "torres-del-paine",
    nombre: "Torres del Paine",
    pais: "CL",
    region: "Magallanes",
    lat: -50.9423,
    lon: -73.4068,
    tipoRoca: ["granito"],
    estilos: ["big wall", "alpinismo"],
    gradosMin: "5a",
    gradosMax: "8a",
    temporada: ["nov", "dic", "ene", "feb"],
    altitud: 2500,
    descripcion:
      "Las Torres del Paine (2.850 m) son los monolitos de granito más fotografiados del mundo. Para los escaladores, representan uno de los mayores desafíos alpinos: paredes de 1.200 m con viento casi constante, acceso glaciar y logística compleja. La Torre Central (vía Bonington) y la Torre Sur (vía East Face) son las ascensiones más codiciadas. Se requiere acreditación ante CONAF y experiencia demostrable.",
    comoLlegar:
      "Desde Pto. Natales, bus al parque (2h). Acceso a las Torres: sendero clásico del W (8 km desde hotel Las Torres).",
    camping:
      "Campamentos concesionados del circuito W. Para escalada: vivac al pie de las paredes (autorización CONAF necesaria).",
    permisos:
      "Permiso CONAF obligatorio para acceder al pie de las paredes. Requiere CV de escalada y equipo de rescate propio.",
    rutasDestacadas: [
      { nombre: "Torre Central — vía Bonington", grado: "7b A2", largo: "1.200 m", estilo: "big wall" },
      { nombre: "Torre Sur — East Face", grado: "7a+", largo: "1.100 m", estilo: "big wall" },
      { nombre: "Torre Norte — vía normal", grado: "6a", largo: "800 m", estilo: "alpinismo" },
    ],
    imagenUrl: null,
  },
  {
    slug: "cochamo",
    nombre: "Cochamó",
    pais: "CL",
    region: "Los Lagos",
    lat: -41.55,
    lon: -72.28,
    tipoRoca: ["granito"],
    estilos: ["trad", "big wall"],
    gradosMin: "5a",
    gradosMax: "8b",
    temporada: ["oct", "nov", "dic", "ene", "feb", "mar", "abr"],
    altitud: 300,
    descripcion:
      "Cochamó es el Yosemite de Sudamérica. El Valle del Cochamó ofrece paredes de granito de hasta 600 m, accesibles solo a pie o a caballo después de 4–6 horas de caminata. La lluvia es frecuente pero la roca seca rápido. La comunidad de escaladores que lo habita en temporada es pequeña e internacional. Trinidad Wall y La Junta son las zonas más desarrolladas.",
    comoLlegar:
      "Desde Puerto Montt, bus a Cochamó (2h30). Desde el pueblo, caminata o caballo al Valle (4–6 horas por terreno lodoso).",
    camping:
      "Camping La Junta al pie de las paredes. Servicio de comida disponible en temporada.",
    permisos:
      "Acceso por campo privado — arancel de $5.000 CLP por persona. Sin permiso especial de escalada.",
    rutasDestacadas: [
      { nombre: "La Pared de Huinay", grado: "6b+", largo: "400 m", estilo: "trad" },
      { nombre: "Trinidad Wall — vía clásica", grado: "7a", largo: "550 m", estilo: "big wall" },
      { nombre: "El Anfiteatro", grado: "5c", largo: "250 m", estilo: "trad" },
      { nombre: "Manos al Cielo", grado: "7c", largo: "300 m", estilo: "trad" },
    ],
    imagenUrl: null,
  },
  {
    slug: "cerro-castillo",
    nombre: "Cerro Castillo",
    pais: "CL",
    region: "Aysén",
    lat: -46.12,
    lon: -71.97,
    tipoRoca: ["basalto", "brecha"],
    estilos: ["alpinismo", "trad"],
    gradosMin: "4a",
    gradosMax: "7b",
    temporada: ["dic", "ene", "feb", "mar"],
    altitud: 2675,
    descripcion:
      "El Cerro Castillo (2.675 m) es la cumbre más imponente de la región de Aysén, con torres de basalto que recuerdan a los dolomitas pero en escala patagónica. El trekking de 4 días que rodea la base es la actividad principal, pero las paredes del sector norte ofrecen escalada en roca mixta y hielo poco documentada. Territorio en exploración activa por escaladores chilenos.",
    comoLlegar:
      "Desde Coyhaique, Carretera Austral sur (65 km). Villa Cerro Castillo es el punto de partida de todos los accesos.",
    camping:
      "Camping CONAF en Villa Cerro Castillo. Camping silvestre permitido en el circuito.",
    permisos:
      "Zona CONAF — ingreso con pago de tarifa. Para escalada en las paredes norte, registrarse en la administración.",
    rutasDestacadas: [
      { nombre: "Cara Norte — vía de aproximación", grado: "4c", largo: "600 m", estilo: "alpinismo" },
      { nombre: "La Aguja del Diablo", grado: "6b", largo: "350 m", estilo: "trad" },
      { nombre: "Columna Basáltica", grado: "5c", largo: "200 m", estilo: "trad" },
    ],
    imagenUrl: null,
  },
  {
    slug: "la-esfinge",
    nombre: "La Esfinge",
    pais: "CL",
    region: "Cochrane, Aysén",
    lat: -47.25,
    lon: -72.56,
    tipoRoca: ["granito"],
    estilos: ["trad", "big wall"],
    gradosMin: "5b",
    gradosMax: "8a",
    temporada: ["nov", "dic", "ene", "feb", "mar"],
    altitud: 1800,
    descripcion:
      "La Esfinge es una pared de granito de 700 m cerca de Cochrane, uno de los secretos mejor guardados de la escalada en Aysén. Solo unas decenas de escaladores la han ascendido, y las rutas son largas, solitarias y expuestas. La región recibe muy poca lluvia comparada con Cochamó, lo que la convierte en una alternativa válida cuando el norte está empapado.",
    comoLlegar:
      "Desde Cochrane, vehículo 4x4 hacia el norte por Carretera Austral (40 km). El acceso final requiere cruzar el Río Baker a pie.",
    camping:
      "Acampe silvestre al pie de la pared. Sin infraestructura.",
    permisos:
      "Acceso por campo privado — consultar con operadores locales en Cochrane.",
    rutasDestacadas: [
      { nombre: "Vía de los Australes", grado: "6c+", largo: "700 m", estilo: "trad" },
      { nombre: "El Ojo de la Esfinge", grado: "7b", largo: "500 m", estilo: "big wall" },
      { nombre: "Fisura Directa", grado: "5b", largo: "250 m", estilo: "trad" },
    ],
    imagenUrl: null,
  },
  {
    slug: "valle-del-frances",
    nombre: "Valle del Francés",
    pais: "CL",
    region: "Torres del Paine",
    lat: -50.97,
    lon: -73.35,
    tipoRoca: ["mixto"],
    estilos: ["alpinismo"],
    gradosMin: "5a",
    gradosMax: "7b",
    temporada: ["nov", "dic", "ene", "feb"],
    altitud: 2000,
    descripcion:
      "El Valle del Francés es el anfiteatro glaciar central del Circuito W. Para los escaladores, las paredes del Cuerno Principal (2.600 m) y la Hoja (2.500 m) ofrecen ascensiones alpinas en terreno mixto de roca, hielo y nieve. La logística se comparte con los trekkers del W, lo que facilita el abastecimiento. Las ventanas de buen tiempo son tan escasas como en el resto del Paine.",
    comoLlegar:
      "Desde el embarcadero de Pudeto (acceso catamarán) o caminando el circuito W desde Las Torres (2 días). Campamento Italiano es la base.",
    camping:
      "Campamento Italiano (gratuito, sin servicio). Reserva previa CONAF en temporada alta.",
    permisos:
      "Permiso CONAF para ingresar al parque. Para escalar sobre la línea de glaciares, autorización adicional.",
    rutasDestacadas: [
      { nombre: "Cuerno Principal — vía norte", grado: "6a M4", largo: "800 m", estilo: "alpinismo" },
      { nombre: "La Hoja — cara oeste", grado: "5c AI3", largo: "600 m", estilo: "alpinismo" },
      { nombre: "Espada — arista sur", grado: "6b", largo: "450 m", estilo: "alpinismo" },
    ],
    imagenUrl: null,
  },
]

export function getSectorEntry(slug: string): Sector | null {
  return ESCALADA_CATALOG.find((s) => s.slug === slug) ?? null
}

export const ESTILO_LABELS: Record<ClimbingStyle, string> = {
  deporte: "Deporte",
  trad: "Trad",
  "big wall": "Big Wall",
  bouldering: "Bouldering",
  alpinismo: "Alpinismo",
}

export const PAIS_LABELS: Record<"AR" | "CL", string> = {
  AR: "Argentina",
  CL: "Chile",
}
