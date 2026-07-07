import type { Sector } from "../types"

export const valleDelFrances: Sector = {
  slug: "valle-del-frances",
  nombre: "Valle del Francés",
  pais: "CL",
  region: "Torres del Paine",
  lat: -50.97,
  lon: -73.35,
  tipoRoca: ["mixto"],
  estilos: ["clasica"],
  gradosMin: "5a",
  gradosMax: "7b",
  temporada: ["nov", "dic", "ene", "feb"],
  altitud: 2000,
  totalViasEstimado: 15,
  descripcion:
    "El Valle del Francés es el anfiteatro glaciar central del Circuito W. Para los escaladores, las paredes del Cuerno Principal (2.600 m) y la Hoja (2.500 m) ofrecen ascensiones alpinas en terreno mixto de roca, hielo y nieve. La logística se comparte con los trekkers del W, lo que facilita el abastecimiento. Las ventanas de buen tiempo son tan escasas como en el resto del Paine.",
  acceso:
    "Desde el embarcadero de Pudeto (acceso catamarán) o caminando el circuito W desde Las Torres (2 días). Campamento Italiano es la base.",
  camping:
    "Campamento Italiano (gratuito, sin servicio). Reserva previa CONAF en temporada alta.",
  permisos:
    "Permiso CONAF para ingresar al parque. Para escalar sobre la línea de glaciares, autorización adicional.",
  subareas: [],
  rutasIconicas: [
    { nombre: "Cuerno Principal — vía norte", grado: "6a M4", estilo: "clasica" },
    { nombre: "La Hoja — cara oeste", grado: "5c AI3", estilo: "clasica" },
    { nombre: "Espada — arista sur", grado: "6b", estilo: "clasica" },
  ],
  imagenUrl: null,
}
