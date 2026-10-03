import type { Route, Sector } from "../types"

// Datos de vías: guía Esqala v1.1 (2021) — https://esqala.com.ar/
// Se cargan solo los datos técnicos (nombre, grado, metros, chapas, aperturista,
// orientación). Los croquis, fotos y textos originales quedan en la guía.

type Extra = Partial<Pick<Route, "desplome" | "recomendada" | "aleje" | "descripcion" | "estilo">>

function via(
  numero: number,
  nombre: string,
  grado: string,
  metros: number,
  chapas: string,
  firstAscent: string | null,
  extra: Extra = {},
): Route {
  return {
    numero,
    nombre,
    grado,
    largo: `${metros} m`,
    chapas,
    estilo: "deportiva",
    desplome: "vertical",
    ...(firstAscent ? { firstAscent } : {}),
    ...extra,
  }
}

const clasica: Extra = { estilo: "clasica" }

export const esquel: Sector = {
  slug: "esquel",
  nombre: "Esquel",
  pais: "AR",
  region: "Esquel, Chubut",
  lat: -42.9173,
  lon: -71.3122,
  tipoRoca: [],
  estilos: ["deportiva", "clasica"],
  gradosMin: "4",
  gradosMax: "8b",
  temporada: [],
  altitud: null,
  totalViasEstimado: null,
  descripcion:
    "Esquel tiene 73 vías de escalada en roca repartidas en cuatro sectores a minutos del centro: La Crux, El Badén, La Palestra y el Cañadón de las Palomas. Son vías cortas, de 5 a 25 m, casi todas deportivas equipadas con chapas, con grados de 4 a 8b y predominio de placas con regletas y algunos desplomes. La escalada local empezó en 1974, cuando una cordada sudafricana que iba camino a Torres del Paine abrió La Primera (6a) en lo que hoy es el sector La Crux. La Palestra es el sector escuela: 36 vías y el acceso más simple.",
  acceso:
    "Los cuatro sectores están en los cerros que rodean la ciudad. La Crux queda al final de la Av. Fontana, cerca del centro. A El Badén se llega por Av. Holdich y Gobernador Lezana hasta el arroyo Esquel. La Palestra está dentro de una zona militar. Al Cañadón de las Palomas se camina unos 20 minutos por el arroyo Esquel desde el estacionamiento junto al puente de la Av. Alvear.",
  camping: null,
  permisos:
    "La Palestra está en zona militar: hay que pedir autorización en la guardia del regimiento antes de entrar. La guía no indica permisos para los otros tres sectores.",
  zonas: [
    {
      nombre: "La Crux",
      descripcion:
        "El primer sector donde se escaló en Esquel. Vías de placa con regletas, algunas desplomadas, de 6a a 8b. Por la cercanía al centro sirve para sesiones cortas.",
      acceso:
        "Al final de la Av. Fontana. Desde ahí sale el sendero: unos 5 minutos hasta cada subsector.",
      advertencia:
        "Los senderos tienen pendiente y acarreo. Hay casas debajo: cuidado con las piedras sueltas.",
      lat: -42.9173477,
      lon: -71.3122286,
    },
    {
      nombre: "El Badén",
      descripcion:
        "Placas con regletas y algunos desplomes, de 5+ a 7b más un proyecto abierto. Los pies de vía son incómodos y con bastante pendiente.",
      acceso:
        "Por Av. Holdich, doblando en Gobernador Lezana hasta el arroyo Esquel. Se deja el auto ahí, se cruza un puente y el sendero conecta los cuatro subsectores en 5 a 10 minutos.",
      advertencia:
        "Hay casas al pie del cerro: mucha atención con las rocas sueltas.",
      lat: -42.9166752,
      lon: -71.3026192,
    },
    {
      nombre: "La Palestra",
      descripcion:
        "El sector escuela de Esquel, el de acceso más fácil y el que más vías tiene: 36, de 4 a 7a+, en seis subsectores.",
      acceso:
        "Está dentro de una zona militar. Se entra pidiendo autorización en la guardia del regimiento.",
      advertencia:
        "Sin autorización de la guardia del regimiento no se puede acceder.",
      lat: -42.8844624,
      lon: -71.2884543,
    },
    {
      nombre: "Cañadón de las Palomas",
      descripcion:
        "El sector más exigente: siete vías de 6b+ a 8a+ repartidas entre La Entrada y La Cueva.",
      acceso:
        "En auto hasta el estacionamiento junto al puente de la Av. Alvear. Desde ahí, unos 20 minutos a pie siguiendo el arroyo Esquel hasta el cañadón.",
      lat: -42.8962494,
      lon: -71.301521,
    },
  ],
  subareas: [
    // ─── La Crux ────────────────────────────────────────────────────
    {
      nombre: "La Primera",
      zona: "La Crux",
      orientacion: "O",
      descripcion: "La vía que dio origen a la escalada en Esquel, abierta en 1974.",
      rutas: [
        via(1, "La Primera", "6a", 20, "2", "Cordada sudafricana, 1974", clasica),
      ],
    },
    {
      nombre: "Sangre Fría",
      zona: "La Crux",
      orientacion: "N",
      rutas: [
        via(1, "La víbora (L1)", "6a+", 20, "5+2", "Fer Pieruz, Martin Molina", { desplome: "desplomada" }),
        via(1, "La víbora (L2)", "8b", 15, "7+2", "Fer Pieruz, Martin Molina", { desplome: "desplomada" }),
        via(2, "Comisión de reptilianos", "6a+", 15, "7+2", "Ignacio Contreras", { desplome: "aplomada" }),
        via(3, "Gente lagartija", "6c+", 20, "8+2", "Ignacio Contreras", { desplome: "desplomada" }),
        via(4, "La serpiente", "7a+", 25, "11+2", "Ignacio Contreras", { desplome: "desplomada" }),
        via(5, "Usurpación", "7a", 15, "5+2", "Hernán Menoyo, Lucas Villa", {
          desplome: "desplomada",
          descripcion:
            "Aproximación expuesta: por una repisa desde los anclajes de las vías 1 y 2, o con un aleje desde el anclaje de la vía 3.",
        }),
        via(6, "Sin nombre", "7a", 25, "2", null, { ...clasica, desplome: "desplomada" }),
      ],
    },
    {
      nombre: "Radiactivo",
      zona: "La Crux",
      orientacion: "N",
      descripcion: "A unos 5 minutos de Sangre Fría, siguiendo el sendero hacia el este.",
      rutas: [
        via(1, "Posibles Piecitos", "6b", 15, "5+2", "Niseggi A. / Niseggi N."),
        via(2, "Pisando la nada, pensando de todo", "6b+", 15, "6+2", "Lucas Villa / Hernán Menoyo"),
        via(3, "Las 5 cachorras", "6a", 15, "2", "Lucas Villa", clasica),
        via(4, "Liberate", "6b", 18, "9+2", "Hernán Menoyo"),
      ],
    },

    // ─── El Badén ───────────────────────────────────────────────────
    {
      nombre: "La Placa",
      zona: "El Badén",
      orientacion: "NE",
      rutas: [
        via(1, "Los gladeolos", "6b+", 20, "8+2", "Menoyo H. / Arquero D."),
        via(2, "El hippie chillón", "6b+", 20, "9+2", "Hernán Menoyo"),
        via(3, "Fisura", "5+", 20, "2", "Menoyo H. / Arquero D.", clasica),
        via(4, "Sucio y harapiento", "7b", 20, "6+2", "Hernán Menoyo", { recomendada: true }),
        via(5, "La reina de Marte", "6b", 20, "6+2", "Lucas Villa / Hernán Menoyo"),
      ],
    },
    {
      nombre: "La Tortuga",
      zona: "El Badén",
      orientacion: "NE",
      descripcion:
        "A las vías 1 y 2 se sube por una trepada del lado derecho; el pie de vía es angosto, conviene que esté solo la cordada que escala.",
      rutas: [
        via(1, "Juguetona la Cuestión", "6a+", 20, "5+2", "Sebastian Quiroga, Alejandro Niseggi"),
        via(2, "The blue brothers", "6a", 20, "2", "Niseggi A. / Niseggi N.", clasica),
        via(3, "Manuelita", "6b", 20, "6+2", "Lucas Villa / Hernán Menoyo", { recomendada: true }),
        via(4, "Besos a la nena", "6a+", 20, "9+2", "Lucas Villa", { recomendada: true }),
        via(5, "Mixta", "6a", 12, "2", "Hernán Menoyo", clasica),
        via(6, "Liberen a Wila", "6b+", 12, "6+2", "Hernán Menoyo", { recomendada: true }),
        via(7, "Corre rasta corre", "7a+", 12, "6+2", "Hernán Menoyo", { recomendada: true, desplome: "desplomada" }),
        via(8, "Domingo híbrido", "7b", 12, "6+2", "Hernán Menoyo", { desplome: "desplomada" }),
        via(9, "Proyecto", "8?", 12, "6+2", null, { desplome: "desplomada" }),
      ],
    },
    {
      nombre: "La Escuela",
      zona: "El Badén",
      orientacion: "NE",
      rutas: [
        via(1, "Go Home", "5+", 20, "8+2", "Hernán Menoyo", { desplome: "aplomada" }),
      ],
    },
    {
      nombre: "Los Álamos",
      zona: "El Badén",
      orientacion: "NE",
      descripcion:
        "Pie de vía cómodo y con arboleda. La vía 3 mira al norte y ahí quien asegura tiene que estar atento por el terreno.",
      rutas: [
        via(1, "Todo comenzó bailando", "6b", 15, "5+2", "Hernán Menoyo"),
        via(2, "El peronauta del espacio", "5+", 15, "6+2", "Hernán Menoyo / C.A.J."),
        via(3, "Locuras contigo", "6b+", 20, "9+2", "Lucas Villa", { desplome: "desplomada" }),
      ],
    },

    // ─── La Palestra ────────────────────────────────────────────────
    {
      nombre: "Atrás",
      zona: "La Palestra",
      orientacion: "NE",
      rutas: [
        via(1, "Sin nombre", "4", 15, "2", "Pablo de la Fuente", clasica),
        via(2, "Sin nombre", "5", 20, "2", "Pablo de la Fuente", clasica),
        via(3, "Hasta las 8", "6a+", 15, "5+2", "Nahuel Nissegi y Nicolás Castro, 2020"),
        via(4, "Fefe", "6b", 20, "7+2", "S. Orrego, H. Bidegain y P. De La Fuente, 2009", { recomendada: true }),
        via(5, "Variante Pridinol", "6b", 20, "7+2", "Sergio Orrego", { descripcion: "Conexión entre las vías 3 y 5." }),
        via(6, "Bin Laden", "6a+", 20, "7+2", "Pablo De La Fuente, 2013", { recomendada: true }),
        via(7, "Bahía Parabolt", "6a+", 20, "7+2", "Sergio Orrego, 2013"),
      ],
    },
    {
      nombre: "Costado",
      zona: "La Palestra",
      orientacion: "N",
      rutas: [
        via(1, "Hey hey", "6a", 8, "3+2", "Sergio Orrego, 2012"),
        via(2, "Tú!", "6a", 8, "3+2", "Sergio Orrego, 2012"),
        via(3, "El Pastor", "6a", 18, "4+2", "Jeff Adams, 2005", { aleje: true }),
        via(4, "Nopainnogain", "6c", 18, "5+2", "Hernán Menoyo"),
        via(5, "Martín Fierro", "6b+", 15, "5+2", "Hernán Menoyo, Martín Menoyo, 2012", { desplome: "desplomada" }),
        via(6, "Que a mí no", "6b+", 15, "5+2", "Hernan Menoyo, Diego Acevedo, 2005", { desplome: "desplomada" }),
      ],
    },
    {
      nombre: "Escuela",
      zona: "La Palestra",
      orientacion: "N",
      rutas: [
        via(1, "Pachamama", "5", 5, "3+2", "Sergio Orrego, 2016", { desplome: "desplomada" }),
        via(2, "La piqui piqui", "4+", 5, "3+2", "Ale Nissegi, 2016"),
      ],
    },
    {
      nombre: "El Diedro",
      zona: "La Palestra",
      orientacion: "N",
      rutas: [
        via(1, "El corazón", "5+", 18, "8+2", "V. Livingston y P. De La Fuente, 2005"),
        via(2, "La Fernández Lambert", "5+", 10, "4+2", "Santiago Fernández, Jorge Luis Lambert, 2005", { desplome: "aplomada" }),
        via(3, "Por lo menos dejame la tuerca", "5+", 12, "5+2", "Sergio Orrego", { desplome: "aplomada" }),
        via(4, "Lulo", "5+", 12, "5+2", "Pablo De La Fuente, 2005", { desplome: "desplomada" }),
      ],
    },
    {
      nombre: "El Frente A",
      zona: "La Palestra",
      orientacion: "O",
      rutas: [
        via(1, "Faloperitos de siempre", "6b+", 18, "6+2", "Lucas Ruiz, Diego Nakamura, 2003", { recomendada: true, desplome: "desplomada" }),
        via(2, "Compermisito", "6c", 18, "6+2", "Sebastián Quiroga, Alejandro Niseggi", { desplome: "desplomada" }),
        via(3, "Herencia Mendocina", "6a+", 18, "6+2", "P. Vallone, M. Grech, P. De La Fuente, 1996", { recomendada: true, desplome: "desplomada" }),
        via(4, "Fisureros", "6a+", 20, "6+2", "Pablo De La Fuente, Sergio Orrego, 2018", { desplome: "desplomada" }),
        via(5, "Suba carajo suba", "5+ A0", 20, "2", "Pablo De La Fuente", clasica),
        via(6, "Pedaleando voy", "6b+", 15, "3+2", "Pablo De La Fuente", { aleje: true }),
        via(7, "Pequeñeces", "6c", 18, "5+2", "Ignacio Contreras", { aleje: true }),
        via(8, "Memorial Guy Costa", "6a+", 18, "6+2", "Pablo De La Fuente, 2001", { recomendada: true, desplome: "desplomada" }),
        via(9, "Juego de mente", "7a+", 18, "7+2", "Pablo De La Fuente, 2001", { recomendada: true, desplome: "desplomada" }),
        via(10, "La Pili", "6c", 18, "7+2", "P. Vallone, M. Greco y P. De La Fuente, 1996", { recomendada: true }),
        via(11, "Chimenea", "5+", 20, "2", "Pablo De La Fuente", clasica),
        via(12, "Variante Chimenea", "6a", 20, "7+2", "Sergio Orrego, Pablo De La Fuente, 2018"),
      ],
    },
    {
      nombre: "El Frente B",
      zona: "La Palestra",
      orientacion: "O",
      rutas: [
        via(1, "El hombre mosca", "6a", 10, "3+2", "Pablo De La Fuente, Sergio Orrego, 2012"),
        via(2, "Comprometido", "6a", 10, "4+2", "Sebastián Quiroga, Alejandro Niseggi"),
        via(3, "Hasta las manos", "5+", 10, "4+2", "Sebastián Quiroga, Alejandro Niseggi"),
        via(4, "Encadenando", "6a+", 10, "4+2", "Sebastián Quiroga, Alejandro Niseggi"),
        via(5, "Picapiedra", "6b", 10, "4+2", "Sebastián Quiroga, Alejandro Niseggi"),
      ],
    },

    // ─── Cañadón de las Palomas ─────────────────────────────────────
    {
      nombre: "La Entrada",
      zona: "Cañadón de las Palomas",
      orientacion: "SE",
      rutas: [
        via(1, "Re Sostenide", "7a+", 12, "6+2", "Sebastian Quiroga, Alejandro Niseggi", { desplome: "desplomada" }),
        via(2, "Chapay Peñí", "6c+", 12, "5+2", "Sebastian Quiroga, Alejandro Niseggi", { desplome: "desplomada" }),
        via(3, "Mundo mosquito", "6c", 7, "2+2", "Lucas Ruiz, Jorge Luis Lambert"),
        via(4, "Didi", "6b+", 20, "8+2", "Eduardo Depetris"),
      ],
    },
    {
      nombre: "La Cueva",
      zona: "Cañadón de las Palomas",
      orientacion: "SO",
      rutas: [
        via(1, "El cuerno", "7a+", 18, "6+2", "Ignacio Contreras"),
        via(2, "Emma Zoe", "6c+", 18, "6+2", "Eduardo Depetris"),
        via(3, "Místico y confuso", "8a+", 20, "9+2", "Hernán Menoyo, Ignacio Contreras", { desplome: "desplomada" }),
      ],
    },
  ],
  rutasIconicas: [
    { nombre: "La Primera", grado: "6a", estilo: "clasica" },
    { nombre: "Sucio y harapiento", grado: "7b", estilo: "deportiva" },
    { nombre: "Juego de mente", grado: "7a+", estilo: "deportiva" },
    { nombre: "Místico y confuso", grado: "8a+", estilo: "deportiva" },
  ],
  imagenUrl: null,
  fuente: {
    nombre: "Esqala — Guía de escalada de Esquel",
    edicion: "v1.1, 2021",
    creditos:
      "Edición, textos y diseño: Santiago Malizia. Fotografías: Santiago Malizia, Lucas Villa Nogueyra y Alejandro Segarra.",
    url: "https://esqala.com.ar/",
    descargaUrl: "https://esqala.com.ar/wp-content/uploads/2021/11/20211004_guia_esqala_v1.1.pdf",
    aportesUrl: "https://esqala.com.ar/#aportes",
    instagram: "https://www.instagram.com/guiaesqala/",
  },
}
