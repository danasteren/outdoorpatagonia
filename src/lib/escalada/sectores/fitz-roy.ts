import type { Sector } from "../types"

export const fitzRoy: Sector = {
  slug: "fitz-roy",
  nombre: "Fitz Roy",
  pais: "AR",
  region: "El Chaltén, Santa Cruz",
  lat: -49.2713,
  lon: -72.9988,
  tipoRoca: ["granito"],
  estilos: ["clasica"],
  gradosMin: "5a",
  gradosMax: "8b",
  temporada: ["nov", "dic", "ene", "feb", "mar"],
  altitud: 1600,
  totalViasEstimado: 30,
  descripcion:
    "El Fitz Roy (3.405 m) es el emblema de la escalada patagónica. Sus agujas de granito de agua compacto ofrecen algunas de las rutas más comprometidas y bellas del mundo. El acceso al campo base desde El Chaltén toma 3–4 horas, y las condiciones climáticas determinan todo: las ventanas de buen tiempo suelen durar solo 24–48 horas. Las rutas clásicas como Supercanaleta y Franco-Argentina mixturan dificultad técnica con exposición alpina extrema.",
  acceso:
    "Vuelo o bus a El Calafate. Bus diario a El Chaltén (3 horas). Desde el pueblo, sendero al Río Blanco y Camp Cóndores (campo base).",
  camping:
    "Camp Cóndores (campo base oficial, a 3h de El Chaltén). Camping libre permitido en zona de escalada.",
  permisos:
    "Registro obligatorio en el PNGL (Parque Nacional Los Glaciares) antes de acceder a la pared. Sin costo adicional al ingreso del parque.",
  subareas: [],
  rutasIconicas: [
    { nombre: "Supercanaleta", grado: "6a A2 M5", estilo: "clasica" },
    { nombre: "Franco-Argentina", grado: "7a+", estilo: "clasica" },
    { nombre: "Goretta Pillar", grado: "6b+", estilo: "clasica" },
    { nombre: "Afanassieff", grado: "6c", estilo: "clasica" },
  ],
  imagenUrl: null,
}
