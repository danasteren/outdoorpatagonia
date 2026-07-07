import type { Sector } from "../types"

export const cerroTorre: Sector = {
  slug: "cerro-torre",
  nombre: "Cerro Torre",
  pais: "AR",
  region: "El Chaltén, Santa Cruz",
  lat: -49.2936,
  lon: -73.0972,
  tipoRoca: ["granito"],
  estilos: ["clasica"],
  gradosMin: "5a",
  gradosMax: "8b",
  temporada: ["nov", "dic", "ene", "feb"],
  altitud: 3102,
  totalViasEstimado: 15,
  descripcion:
    "El Cerro Torre (3.102 m) es posiblemente la montaña más difícil del mundo para su altura. La columna de granito culmina en un hongo de hielo que cambia constantemente. La ruta normal (Compressor Route, sin los bolts históricos) es una ascensión alpina de máxima exigencia. El viento puede superar los 150 km/h. Solo para equipos con amplia experiencia en escalada en hielo y mixta.",
  acceso:
    "Desde El Chaltén, sendero al Lago Torre (2h30) y Aguja Standhart (campo base) en otras 2 horas.",
  camping: "Campo base en el Río Pollone / Lago Torre. Zona de acampe libre.",
  permisos:
    "Registro obligatorio en PNGL. La ascensión al Cerro Torre implica travesía glaciar — recomendada con guía certificado UIAGM.",
  subareas: [],
  rutasIconicas: [
    { nombre: "Compressor Route (sin bolts)", grado: "8a M8 AI5", estilo: "clasica" },
    { nombre: "El Arca de los Vientos", grado: "8b", estilo: "clasica" },
    { nombre: "Directa de la Mentira", grado: "7c+", estilo: "clasica" },
  ],
  imagenUrl: null,
}
