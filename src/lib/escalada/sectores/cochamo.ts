import type { Sector } from "../types"

export const cochamo: Sector = {
  slug: "cochamo",
  nombre: "Cochamó",
  pais: "CL",
  region: "Los Lagos",
  lat: -41.55,
  lon: -72.28,
  tipoRoca: ["granito"],
  estilos: ["clasica"],
  gradosMin: "5a",
  gradosMax: "8b",
  temporada: ["oct", "nov", "dic", "ene", "feb", "mar", "abr"],
  altitud: 300,
  totalViasEstimado: 60,
  descripcion:
    "Cochamó es el Yosemite de Sudamérica. El Valle del Cochamó ofrece paredes de granito de hasta 600 m, accesibles solo a pie o a caballo después de 4–6 horas de caminata. La lluvia es frecuente pero la roca seca rápido. La comunidad de escaladores que lo habita en temporada es pequeña e internacional. Trinidad Wall y La Junta son las zonas más desarrolladas.",
  acceso:
    "Desde Puerto Montt, bus a Cochamó (2h30). Desde el pueblo, caminata o caballo al Valle (4–6 horas por terreno lodoso).",
  camping: "Camping La Junta al pie de las paredes. Servicio de comida disponible en temporada.",
  permisos:
    "Acceso por campo privado — arancel de $5.000 CLP por persona. Sin permiso especial de escalada.",
  subareas: [],
  rutasIconicas: [
    { nombre: "La Pared de Huinay", grado: "6b+", estilo: "clasica" },
    { nombre: "Trinidad Wall — vía clásica", grado: "7a", estilo: "clasica" },
    { nombre: "Manos al Cielo", grado: "7c", estilo: "clasica" },
  ],
  imagenUrl: null,
}
