import type { Sector } from "../types"

export const piedraParada: Sector = {
  slug: "piedra-parada",
  nombre: "Piedra Parada",
  pais: "AR",
  region: "Chubut",
  lat: -43.0,
  lon: -68.1,
  tipoRoca: ["basalto"],
  estilos: ["deportiva"],
  gradosMin: "4a",
  gradosMax: "8b",
  temporada: ["sep", "oct", "nov", "dic", "ene", "feb", "mar", "abr", "may"],
  altitud: 1100,
  totalViasEstimado: 200,
  descripcion:
    "Piedra Parada es el plugón basáltico más grande del mundo: un monolito de 270 m que se levanta sobre la estepa patagónica del Chubut. La roca basáltica de columnas hexagonales ofrece una escalada completamente distinta al granito: fisuras perfectas, horizontales y diedros con adherencia inusual. Con más de 200 vías equipadas, es el destino de escalada más completo de la Patagonia árida. Desde Esquel, se llega en un día.",
  acceso:
    "Desde Esquel, Ruta 259 hacia el norte (120 km). Ripio los últimos 20 km hasta el camping del sector.",
  camping: "Camping guardafauna a pie del monolito. Servicio básico de agua.",
  permisos: "Control de guardaparques en el acceso. Sin costo adicional.",
  subareas: [],
  rutasIconicas: [
    { nombre: "La Arista del Diablo", grado: "6a", estilo: "deportiva" },
    { nombre: "El Filo de la Navaja", grado: "7b+", estilo: "deportiva" },
    { nombre: "Hexagonal", grado: "5b", estilo: "deportiva" },
    { nombre: "Basalto Puro", grado: "8a", estilo: "deportiva" },
  ],
  imagenUrl: null,
}
