export type TipoCambio = "nuevo" | "mejora" | "correccion";

export interface Cambio {
  tipo: TipoCambio;
  texto: string;
}

export interface VersionNovedades {
  numero: string;
  fecha: string;
  titulo: string;
  esUltima?: boolean;
  cambios: Cambio[];
}

export const novedades: VersionNovedades[] = [
  {
    numero: "1.7",
    fecha: "Octubre 2026",
    titulo: "Guías de viaje por destino, empezando por Ushuaia",
    esUltima: true,
    cambios: [
      {
        tipo: "nuevo",
        texto: "Guías de viaje por destino — qué hacer, clima mes a mes, cuándo ir, cómo llegar y cuántos días quedarse. La primera es Ushuaia, en español y en inglés",
      },
      {
        tipo: "nuevo",
        texto: "Clima en cada guía — la temperatura de ahora y los promedios de cada mes, con las horas de luz, para elegir cuándo viajar",
      },
      {
        tipo: "nuevo",
        texto: "Guía de viaje de El Calafate — qué hacer, clima, cuándo ir y cómo llegar, con el Glaciar Perito Moreno y las navegaciones por el Lago Argentino, en español y en inglés",
      },
      {
        tipo: "nuevo",
        texto: "Escalada en Esquel, vía por vía — 73 vías en cuatro sectores (La Crux, El Badén, La Palestra y Cañadón de las Palomas) con grado, metros, chapas y aperturista, cargadas desde la guía local Esqala",
      },
      {
        tipo: "nuevo",
        texto: "Escalada en la portada — un bloque nuevo con las vías por grado y las recomendadas de la guía",
      },
      {
        tipo: "mejora",
        texto: "Filtros de vías — por sector, nivel, desplome y recomendadas, cómodos de usar desde el celular",
      },
      {
        tipo: "mejora",
        texto: "Fotos recientes de la portada — la grilla ahora muestra cuatro fotos por fila en la computadora y dos por fila, más grandes, en el celular",
      },
      {
        tipo: "correccion",
        texto: "Artículos de flora que no abrían — el calafate, la rosa mosqueta, la frutilla, el ciprés de la cordillera y otros cuatro mostraban \"Página no encontrada\"; ya se pueden leer de nuevo",
      },
      {
        tipo: "correccion",
        texto: "Fotos de los artículos — habían dejado de verse en todo el sitio; todas las notas vuelven a tener portada y volvió buena parte de las fotos dentro del texto",
      },
    ],
  },
  {
    numero: "1.6",
    fecha: "Septiembre 2026",
    titulo: "Termas en el menú, créditos de fotos y buscador más completo",
    cambios: [
      {
        tipo: "nuevo",
        texto: "Termas en el menú principal — ahora las encontrás directo desde la navegación, en desktop y en el celular",
      },
      {
        tipo: "nuevo",
        texto: "Página Anunciá — si tenés un emprendimiento turístico en la Patagonia, podés destacar tu ficha en el directorio de operadores",
      },
      {
        tipo: "mejora",
        texto: "Crédito de las fotos — cada artículo muestra quién sacó la foto de portada, con link a su Instagram",
      },
      {
        tipo: "mejora",
        texto: "Buscador rápido más completo — la lupa del header ahora encuentra también artículos y platos de gastronomía",
      },
      {
        tipo: "mejora",
        texto: "Títulos más claros en fichas de flora y gastronomía — se entiende mejor de qué se trata cada una desde Google",
      },
    ],
  },
  {
    numero: "1.5",
    fecha: "Julio 2026",
    titulo: "Termas, Gastronomía y Patagonia Ahora",
    cambios: [
      {
        tipo: "nuevo",
        texto: "Sección Termas — Copahue, Puyuhuapi, Huife, Malalcahuello, Llifén, Pucón y más, conectadas con los volcanes y parques de cada zona",
      },
      {
        tipo: "nuevo",
        texto: "Sección Gastronomía — platos típicos de la Patagonia organizados en pestañas por categoría",
      },
      {
        tipo: "nuevo",
        texto: "Patagonia Ahora — la foto o el video del día desde el campo, en la home y con archivo completo en /ahora",
      },
      {
        tipo: "nuevo",
        texto: "Newsletter — suscribite desde el pie de página para recibir el contenido nuevo en tu mail",
      },
      {
        tipo: "nuevo",
        texto: "Notificaciones en tu perfil — elegí qué alertas querés recibir: contenido nuevo, incendios o volcanes",
      },
      {
        tipo: "nuevo",
        texto: "Senderos de El Chaltén en el mapa",
      },
      {
        tipo: "mejora",
        texto: "Perfil renovado — guardá cualquier ficha (parques, senderos, volcanes, termas, fauna, flora y más), abrí tus viajes guardados, mirá la cuenta regresiva al próximo y recibí recomendaciones",
      },
      {
        tipo: "mejora",
        texto: "Astronomía con pestañas — cielos oscuros, meteoros y eventos celestes, cada uno en su lugar",
      },
      {
        tipo: "mejora",
        texto: "Header renovado — transparente arriba de todo, Explorar al lado de la lupa y logo adaptado al modo oscuro",
      },
      {
        tipo: "mejora",
        texto: "Mapa en el celular — se centra solo al tocar un punto y el panel inferior es más cómodo",
      },
      {
        tipo: "mejora",
        texto: "El buscador ahora encuentra termas y sitios arqueológicos",
      },
      {
        tipo: "correccion",
        texto: "Los links viejos del blog llevan directo al artículo correcto, con aviso y migas de pan",
      },
      {
        tipo: "correccion",
        texto: "Los Glaciares — tarifas y cómo llegar actualizados con datos 2026",
      },
      {
        tipo: "correccion",
        texto: "Celular — el iPhone ya no hace zoom al abrir la búsqueda y las barras de categorías ya no se desbordan de costado",
      },
      {
        tipo: "correccion",
        texto: "Grilla de fotos y visor ampliado en /estado — se ven mejor y se navegan más fácil",
      },
    ],
  },
  {
    numero: "1.4",
    fecha: "Julio 2026",
    titulo: "Escalada, Tours y mejoras en el Planner",
    cambios: [
      {
        tipo: "nuevo",
        texto: "Bloque \"Tours disponibles\" en páginas de parques — propuestas de GetYourGuide para salidas guiadas desde cada parque",
      },
      {
        tipo: "mejora",
        texto: "Sección de escalada rediseñada — nuevo modelo de datos, fichas más completas y mejor navegación por sector",
      },
      {
        tipo: "mejora",
        texto: "Sección \"Relacionados\" en páginas de fauna y flora — acceso directo a contenido vinculado desde cada ficha",
      },
      {
        tipo: "mejora",
        texto: "Sección de ozono reubicada en la home — aparece al final de la página principal con más contexto",
      },
      {
        tipo: "correccion",
        texto: "Mapa del Planner — vuelve a funcionar correctamente en todos los navegadores",
      },
      {
        tipo: "mejora",
        texto: "Botón guardar flotante en el Planner — siempre a mano mientras armás tu itinerario",
      },
    ],
  },
  {
    numero: "1.3",
    fecha: "Julio 2026",
    titulo: "Astronomía, Qué llevar y mejoras en la home",
    cambios: [
      {
        tipo: "nuevo",
        texto: "Página Astronomía — cielos oscuros, lluvia de meteoros, eclipse anular de febrero 2027 y próximos eventos celestes visibles desde la Patagonia",
      },
      {
        tipo: "nuevo",
        texto: "Herramienta \"Qué llevar\" en Planear — lista de equipo personalizada según destino y mes del viaje",
      },
      {
        tipo: "nuevo",
        texto: "Sección Ozono en /estado — explicación del agujero de ozono con mapa de alcance sobre la Patagonia y recomendaciones prácticas",
      },
      {
        tipo: "nuevo",
        texto: "Sección Impacto en /estado — calidad del aire en tiempo real en zonas extractivas de la región",
      },
      {
        tipo: "mejora",
        texto: "Hero de la home renovado — foto real, hora local de Patagonia y dato del día clickeable que lleva directo a /estado",
      },
      {
        tipo: "mejora",
        texto: "Tarjetas y navegación rediseñadas — nueva sección \"Explorar\" en el menú y tarjetas más visuales en la home",
      },
      {
        tipo: "mejora",
        texto: "Catálogo de parques con fotos reales — cobertura completa de Patagonia Argentina y Chile",
      },
      {
        tipo: "mejora",
        texto: "Astronomía ampliada — card de luna rediseñada, mejor sección de Vía Láctea y eclipse anular de febrero 2027",
      },
      {
        tipo: "correccion",
        texto: "Gráfico de temporada de avistamiento en fauna — ya se ve correctamente en todos los dispositivos",
      },
      {
        tipo: "correccion",
        texto: "Panel de información del mapa — funciona bien en celulares",
      },
    ],
  },
  {
    numero: "1.2",
    fecha: "Junio 2026",
    titulo: "Fauna, parques nacionales y senderos",
    cambios: [
      {
        tipo: "nuevo",
        texto: "Sección Fauna — 48 especies patagónicas con avistamientos recientes en mapa interactivo, histograma mensual para saber cuándo verlas y datos en tiempo real de iNaturalist",
      },
      {
        tipo: "nuevo",
        texto: "Sección Parques Nacionales — 16 parques con descripción, highlights, fauna que habita cada uno, senderos y cómo llegar",
      },
      {
        tipo: "nuevo",
        texto: "Sección Senderos — 10 rutas con distancia, duración, dificultad, fauna para ver en el camino y equipo recomendado",
      },
    ],
  },
  {
    numero: "1.1",
    fecha: "Junio 2026",
    titulo: "Mapa interactivo, clima en tiempo real y página Planear",
    cambios: [
      {
        tipo: "nuevo",
        texto: "Mapa interactivo — explorá los destinos de Patagonia en un mapa navegable con zoom y puntos de interés",
      },
      {
        tipo: "nuevo",
        texto: "Status board en la homepage — clima actual e iNaturalist en tiempo real para saber qué está pasando en la Patagonia",
      },
      {
        tipo: "nuevo",
        texto: "Página Planear — los primeros pasos para armar tu viaje a la Patagonia, en un solo lugar",
      },
      {
        tipo: "nuevo",
        texto: "Página de novedades — changelog público con todo lo que vamos sumando y mejorando, versión a versión",
      },
      {
        tipo: "mejora",
        texto: "Header rediseñado con mejor navegación y acceso directo a la sección Planear",
      },
      {
        tipo: "mejora",
        texto: "Footer renovado con secciones organizadas y links rápidos a las principales áreas del sitio",
      },
    ],
  },
  {
    numero: "1.0",
    fecha: "Junio 2026",
    titulo: "Lanzamiento del nuevo sitio web outdoorpatagonia.com",
    cambios: [
      {
        tipo: "nuevo",
        texto: "Nuevo sitio rediseñado desde cero — más rápido, mobile-first y sin WordPress",
      },
      {
        tipo: "nuevo",
        texto: "186 artículos disponibles en español e inglés, con URLs limpias y mejor SEO",
      },
      {
        tipo: "nuevo",
        texto: "Categorías navegables desde el header y desde cada artículo",
      },
      {
        tipo: "nuevo",
        texto: "Selector de idioma — aparece solo cuando el artículo tiene traducción disponible",
      },
      {
        tipo: "nuevo",
        texto: "Modo oscuro — se activa automáticamente según la preferencia del sistema",
      },
    ],
  },
];
