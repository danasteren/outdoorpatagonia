import type { Sector } from "../types"

export const torresDelPaine: Sector = {
  slug: "torres-del-paine",
  nombre: "Torres del Paine",
  pais: "CL",
  region: "Magallanes",
  lat: -50.9423,
  lon: -73.4068,
  tipoRoca: ["granito"],
  estilos: ["alpinismo"],
  gradosMin: "5a",
  gradosMax: "8a",
  temporada: ["nov", "dic", "ene", "feb"],
  altitud: 2500,
  totalViasEstimado: 25,
  descripcion:
    "Las Torres del Paine (2.850 m) son los monolitos de granito más fotografiados del mundo. Para los escaladores, representan uno de los mayores desafíos alpinos: paredes de 1.200 m con viento casi constante, acceso glaciar y logística compleja. La Torre Central (vía Bonington) y la Torre Sur (East Face) son las ascensiones más codiciadas. Se requiere acreditación ante CONAF y experiencia demostrable.",
  acceso:
    "Desde Pto. Natales, bus al parque (2h). Acceso a las Torres: sendero clásico del W (8 km desde hotel Las Torres).",
  camping:
    "Campamentos concesionados del circuito W. Para escalada: vivac al pie de las paredes (autorización CONAF necesaria).",
  permisos:
    "Permiso CONAF obligatorio para acceder al pie de las paredes. Requiere CV de escalada y equipo de rescate propio.",
  subareas: [],
  rutasIconicas: [
    { nombre: "Torre Central — vía Bonington", grado: "7b A2", estilo: "alpinismo" },
    { nombre: "Torre Sur — East Face", grado: "7a+", estilo: "alpinismo" },
    { nombre: "Torre Norte — vía normal", grado: "6a", estilo: "alpinismo" },
  ],
  imagenUrl: null,
}
