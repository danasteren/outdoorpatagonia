import type { Sector } from "../types"

export const cerroCatedral: Sector = {
  slug: "cerro-catedral",
  nombre: "Cerro Catedral",
  pais: "AR",
  region: "Bariloche, Río Negro",
  lat: -41.18,
  lon: -71.44,
  tipoRoca: ["granito"],
  estilos: ["deportiva", "boulder"],
  gradosMin: "4a",
  gradosMax: "8c",
  temporada: ["sep", "oct", "nov", "dic", "ene", "feb", "mar", "abr", "may"],
  altitud: 2388,
  totalViasEstimado: 150,
  descripcion:
    "Las agujas del Catedral (2.388 m) dominan el horizonte oeste de Bariloche. En el sector inferior, docenas de bloques de boulder permiten entrenar en grados altos sin equipo de anclaje. Las agujas principales (Aguja Frey, Los Dedos, Nunatak) ofrecen vías de hasta 300 m. El refugio Frey es el punto de partida para todas las ascensiones.",
  acceso:
    "Desde Bariloche, colectivo urbano hasta Villa Catedral (ski center). Caminata al Refugio Frey: 3 horas.",
  camping:
    "Refugio Frey (con comida y alquiler de colchonetas). Camping al lado del refugio.",
  permisos: null,
  subareas: [],
  rutasIconicas: [
    { nombre: "Aguja Frey — vía normal", grado: "5b", estilo: "alpinismo" },
    { nombre: "Los Dedos — vía oeste", grado: "6b", estilo: "alpinismo" },
    { nombre: "Nunatak — pilar central", grado: "7a", estilo: "deportiva" },
    { nombre: "La Bonita", grado: "8a", estilo: "boulder" },
  ],
  imagenUrl: null,
}
