import type { Sector } from "../types"

export const piedrasBlancas: Sector = {
  slug: "piedras-blancas",
  nombre: "Piedras Blancas",
  pais: "AR",
  region: "Bariloche, Río Negro",
  lat: -41.18,
  lon: -71.48,
  tipoRoca: ["granito"],
  estilos: ["deportiva"],
  gradosMin: "5a",
  gradosMax: "8a",
  temporada: ["oct", "nov", "dic", "ene", "feb", "mar", "abr"],
  altitud: 900,
  totalViasEstimado: 80,
  descripcion:
    "El sector de escalada deportiva más completo de Bariloche. Bloques y paredes de granito de alta calidad con más de 80 vías en todos los grados. A 45 minutos del centro, es ideal para quienes quieran combinar trekking y escalada. Las placas del sector principal ofrecen vías largas de deporte en grados medios, perfectas para progresar.",
  acceso:
    "Desde Bariloche, Ruta Nacional 40 hacia el sur. Desvío señalizado a Piedras Blancas, 12 km de ripio.",
  camping: "Camping privado a 500 m del sector. También se puede ir en día desde Bariloche.",
  permisos: null,
  subareas: [],
  rutasIconicas: [
    { nombre: "Placa del Cóndor", grado: "7a+", estilo: "deportiva" },
    { nombre: "El Techo de los Sueños", grado: "7c", estilo: "deportiva" },
    { nombre: "Grieta Norte", grado: "5c", estilo: "deportiva" },
  ],
  imagenUrl: null,
}
