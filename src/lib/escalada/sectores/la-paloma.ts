import type { Sector } from "../types"

export const laPaloma: Sector = {
  slug: "la-paloma",
  nombre: "La Paloma",
  pais: "AR",
  region: "Bariloche, Río Negro",
  lat: -41.16,
  lon: -71.5,
  tipoRoca: ["granito"],
  estilos: ["deportiva"],
  gradosMin: "5a",
  gradosMax: "7c",
  temporada: ["oct", "nov", "dic", "ene", "feb", "mar", "abr"],
  altitud: 800,
  totalViasEstimado: 30,
  descripcion:
    "La Paloma es el sector de iniciación y escalada familiar más popular de Bariloche. A solo 20 minutos en auto del centro, ofrece paredes bajas y bien equipadas en grados 5a–7c, ideales para quienes se inician en la escalada deportiva. El entorno de bosque de coihue y lago hace del sector uno de los más pintorescos de la región.",
  acceso:
    "Ruta 237 hacia Villa Angostura, desvío señalizado a La Paloma a 10 km del centro de Bariloche.",
  camping: "Camping municipal en la ruta principal a 2 km del sector.",
  permisos: null,
  subareas: [],
  rutasIconicas: [
    { nombre: "El Palomino", grado: "5c", estilo: "deportiva" },
    { nombre: "Vuelo Libre", grado: "6c+", estilo: "deportiva" },
    { nombre: "La Cumbrera", grado: "7b", estilo: "deportiva" },
  ],
  imagenUrl: null,
}
