import type { Sector } from "../types"

export const laEsfinge: Sector = {
  slug: "la-esfinge",
  nombre: "La Esfinge",
  pais: "CL",
  region: "Cochrane, Aysén",
  lat: -47.25,
  lon: -72.56,
  tipoRoca: ["granito"],
  estilos: ["clasica"],
  gradosMin: "5b",
  gradosMax: "8a",
  temporada: ["nov", "dic", "ene", "feb", "mar"],
  altitud: 1800,
  totalViasEstimado: 10,
  descripcion:
    "La Esfinge es una pared de granito de 700 m cerca de Cochrane, uno de los secretos mejor guardados de la escalada en Aysén. Solo unas decenas de escaladores la han ascendido, y las rutas son largas, solitarias y expuestas. La región recibe muy poca lluvia comparada con Cochamó, lo que la convierte en una alternativa válida cuando el norte está empapado.",
  acceso:
    "Desde Cochrane, vehículo 4x4 hacia el norte por Carretera Austral (40 km). El acceso final requiere cruzar el Río Baker a pie.",
  camping: "Acampe silvestre al pie de la pared. Sin infraestructura.",
  permisos: "Acceso por campo privado — consultar con operadores locales en Cochrane.",
  subareas: [],
  rutasIconicas: [
    { nombre: "Vía de los Australes", grado: "6c+", estilo: "clasica" },
    { nombre: "El Ojo de la Esfinge", grado: "7b", estilo: "clasica" },
    { nombre: "Fisura Directa", grado: "5b", estilo: "clasica" },
  ],
  imagenUrl: null,
}
