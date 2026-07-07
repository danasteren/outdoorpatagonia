import type { Sector } from "../types"

export const cerroCastillo: Sector = {
  slug: "cerro-castillo",
  nombre: "Cerro Castillo",
  pais: "CL",
  region: "Aysén",
  lat: -46.12,
  lon: -71.97,
  tipoRoca: ["basalto", "brecha"],
  estilos: ["clasica"],
  gradosMin: "4a",
  gradosMax: "7b",
  temporada: ["dic", "ene", "feb", "mar"],
  altitud: 2675,
  totalViasEstimado: 20,
  descripcion:
    "El Cerro Castillo (2.675 m) es la cumbre más imponente de la región de Aysén, con torres de basalto que recuerdan a los dolomitas pero en escala patagónica. El trekking de 4 días que rodea la base es la actividad principal, pero las paredes del sector norte ofrecen escalada en roca mixta y hielo poco documentada. Territorio en exploración activa por escaladores chilenos.",
  acceso:
    "Desde Coyhaique, Carretera Austral sur (65 km). Villa Cerro Castillo es el punto de partida de todos los accesos.",
  camping: "Camping CONAF en Villa Cerro Castillo. Camping silvestre permitido en el circuito.",
  permisos:
    "Zona CONAF — ingreso con pago de tarifa. Para escalar en las paredes norte, registrarse en la administración.",
  subareas: [],
  rutasIconicas: [
    { nombre: "Cara Norte — vía de aproximación", grado: "4c", estilo: "clasica" },
    { nombre: "La Aguja del Diablo", grado: "6b", estilo: "clasica" },
    { nombre: "Columna Basáltica", grado: "5c", estilo: "clasica" },
  ],
  imagenUrl: null,
}
