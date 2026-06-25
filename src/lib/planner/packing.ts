export type Destino =
  | "calafate"
  | "chalten"
  | "ushuaia"
  | "madryn"
  | "bariloche"
  | "angostura"
  | "carretera-austral"
  | "torres-paine";

export type Temporada = "verano" | "otono" | "invierno" | "primavera";

export interface PackingItem {
  label: string;
  esencial?: boolean;
  nota?: string;
}

export interface PackingCategory {
  id: string;
  titulo: string;
  emoji: string;
  items: PackingItem[];
}

export interface ClimaInfo {
  tempMin: number;
  tempMax: number;
  descripcion: string;
  advertencia?: string;
}

export interface PackingResult {
  clima: ClimaInfo;
  categorias: PackingCategory[];
}

// ─── Destinos config ─────────────────────────────────────────────────────────

export const DESTINOS: Record<Destino, { label: string; emoji: string; subtitulo: string }> = {
  calafate: { label: "El Calafate", emoji: "🏔️", subtitulo: "Glaciar Perito Moreno" },
  chalten: { label: "El Chaltén", emoji: "⛰️", subtitulo: "Capital del trekking" },
  ushuaia: { label: "Ushuaia", emoji: "🌊", subtitulo: "Fin del mundo" },
  madryn: { label: "Puerto Madryn", emoji: "🐋", subtitulo: "Ballenas y Península Valdés" },
  bariloche: { label: "Bariloche", emoji: "🏔️", subtitulo: "Lagos y montañas" },
  angostura: { label: "Villa La Angostura", emoji: "🌲", subtitulo: "Patagonia andina norte" },
  "carretera-austral": { label: "Carretera Austral", emoji: "🛣️", subtitulo: "Ruta de los fiordos" },
  "torres-paine": { label: "Torres del Paine", emoji: "🗼", subtitulo: "Parque nacional Chile" },
};

// ─── Climate data ─────────────────────────────────────────────────────────────

const CLIMATE: Record<Destino, Record<Temporada, ClimaInfo>> = {
  calafate: {
    verano: {
      tempMin: 5, tempMax: 20,
      descripcion: "Días largos y soleados. Viento vespertino frecuente e intenso.",
      advertencia: "Ráfagas de 60-80 km/h por las tardes. La campera cortavientos es indispensable.",
    },
    otono: {
      tempMin: 0, tempMax: 12,
      descripcion: "Fresco y con viento. Colores otoñales en la estepa. Menos turistas.",
    },
    invierno: {
      tempMin: -8, tempMax: 5,
      descripcion: "Frío intenso. El glaciar sigue abierto y en invierno hay menos gente.",
      advertencia: "Posibilidad de nieve. Llevá equipo para temperaturas bajo cero.",
    },
    primavera: {
      tempMin: 2, tempMax: 15,
      descripcion: "Clima muy variable. Los vientos más fuertes del año en Patagonia.",
      advertencia: "Septiembre y octubre son los meses más ventosos de la región.",
    },
  },
  chalten: {
    verano: {
      tempMin: 2, tempMax: 18,
      descripcion: "Alta temporada de trekking. Días muy largos pero clima extremadamente variable.",
      advertencia: "El clima puede cambiar en 15 minutos: sol, viento, lluvia y nieve en el mismo día.",
    },
    otono: {
      tempMin: -2, tempMax: 12,
      descripcion: "La mejor época para colores y fotografía. Viento algo más moderado que en verano.",
    },
    invierno: {
      tempMin: -10, tempMax: 4,
      descripcion: "La mayoría de los senderos están cerrados o con nieve acumulada.",
      advertencia: "Muchos alojamientos cierran en junio y julio. Verificar antes de ir.",
    },
    primavera: {
      tempMin: -2, tempMax: 14,
      descripcion: "Senderos abren progresivamente. Vientos muy fuertes.",
      advertencia: "Septiembre-octubre tienen las ráfagas más peligrosas del año. Senderos pueden cerrar.",
    },
  },
  ushuaia: {
    verano: {
      tempMin: 5, tempMax: 14,
      descripcion: "Hasta 20 horas de luz. Templado pero con lluvias frecuentes y viento.",
    },
    otono: {
      tempMin: 0, tempMax: 9,
      descripcion: "Colores del bosque de lenga. Lluvia y viento frecuentes. Días más cortos.",
    },
    invierno: {
      tempMin: -5, tempMax: 4,
      descripcion: "Nieve abundante. Temporada de esquí en Cerro Castor.",
      advertencia: "Días muy cortos (5-6 horas de luz). Abrigarte es clave.",
    },
    primavera: {
      tempMin: 1, tempMax: 11,
      descripcion: "Muy variable. Mezcla de días soleados y lluviosos, con algo de nieve posible.",
    },
  },
  madryn: {
    verano: {
      tempMin: 18, tempMax: 30,
      descripcion: "Caluroso y seco. El único destino en Patagonia donde podés ir a la playa.",
      advertencia: "El UV es extremo: el protector solar 50+ es indispensable incluso en días nublados.",
    },
    otono: {
      tempMin: 8, tempMax: 20,
      descripcion: "Clima agradable. Temporada de ballenas jorobadas (abril-mayo).",
    },
    invierno: {
      tempMin: 2, tempMax: 12,
      descripcion: "Fresco y con viento. Temporada alta de ballenas francas australes.",
      advertencia: "De junio a noviembre se pueden ver ballenas francas desde la orilla.",
    },
    primavera: {
      tempMin: 10, tempMax: 24,
      descripcion: "Temporada de ballenas francas (sep-nov). Clima ideal para avistamientos.",
    },
  },
  bariloche: {
    verano: {
      tempMin: 8, tempMax: 24,
      descripcion: "La mejor época: soleado, ideal para lago, trekking y mountain bike.",
    },
    otono: {
      tempMin: 2, tempMax: 15,
      descripcion: "Colores espectaculares del bosque andino. Lluvia moderada.",
    },
    invierno: {
      tempMin: -5, tempMax: 8,
      descripcion: "Nieve en las alturas. Temporada de esquí en Cerro Catedral.",
    },
    primavera: {
      tempMin: 4, tempMax: 18,
      descripcion: "Flores y bosques verdes. Lluvia frecuente.",
    },
  },
  angostura: {
    verano: {
      tempMin: 6, tempMax: 22,
      descripcion: "Tranquilo y soleado. Bosque de arrayanes y lago Nahuel Huapi.",
    },
    otono: {
      tempMin: 1, tempMax: 13,
      descripcion: "Colores muy intensos. Muy poca gente. Uno de los otoños más bellos del país.",
    },
    invierno: {
      tempMin: -6, tempMax: 6,
      descripcion: "Nieve posible. El pueblo se pone tranquilo.",
    },
    primavera: {
      tempMin: 3, tempMax: 16,
      descripcion: "Lluvia frecuente. Los arrayanes y notros florecen.",
    },
  },
  "carretera-austral": {
    verano: {
      tempMin: 8, tempMax: 22,
      descripcion: "La única época para recorrerla completa. Lluvia frecuente en la zona de Aysén.",
      advertencia: "Polvo en tramos de ripio. Lluvia casi diaria entre Coyhaique y el sur.",
    },
    otono: {
      tempMin: 2, tempMax: 15,
      descripcion: "Lluvias más frecuentes. Algunos tramos con barro en ripio. Menos tráfico.",
    },
    invierno: {
      tempMin: -3, tempMax: 10,
      descripcion: "Nieve bloquea pasos. Solo recomendable con vehículo alto 4x4.",
      advertencia: "Varios tramos quedan cortados. Verificar con Vialidad Chile antes de salir.",
    },
    primavera: {
      tempMin: 4, tempMax: 18,
      descripcion: "La ruta abre progresivamente. Lluvias frecuentes hasta diciembre.",
    },
  },
  "torres-paine": {
    verano: {
      tempMin: 3, tempMax: 15,
      descripcion: "Temporada alta. Viento extremo e impredecible. Reservas agotadas meses antes.",
      advertencia: "Vientos de 100+ km/h son normales. Las Torres pueden cerrar por viento fuerte.",
    },
    otono: {
      tempMin: -2, tempMax: 12,
      descripcion: "La mejor época para fotografía: colores rojos y dorados con menos turistas.",
    },
    invierno: {
      tempMin: -8, tempMax: 5,
      descripcion: "Parque abierto pero refugios y campings cerrados. Solo para expedicionistas.",
      advertencia: "Solo apto con experiencia en montaña y equipo de invierno completo.",
    },
    primavera: {
      tempMin: -2, tempMax: 12,
      descripcion: "Vientos máximos. Las Torres son muy difíciles de ver por las nubes.",
      advertencia: "Octubre es el mes con más viento y peor clima estadístico del parque.",
    },
  },
};

// ─── Item builders ────────────────────────────────────────────────────────────

function getRopa(destino: Destino, temporada: Temporada): PackingItem[] {
  const items: PackingItem[] = [];

  if (temporada === "invierno" || (temporada === "primavera" && destino !== "madryn")) {
    items.push({ label: "Capa base térmica superior", esencial: true });
    items.push({ label: "Calza o pantalón térmico", esencial: true });
  }

  if (temporada === "verano" || temporada === "otono") {
    items.push({ label: "Remera de manga corta × 2" });
  }

  items.push({ label: "Remera de manga larga × 2-3", esencial: true });
  items.push({ label: "Polar o buzo grueso × 2", esencial: true });
  items.push({ label: "Pantalón cómodo o de trekking × 2", esencial: true });
  items.push({ label: "Ropa interior × varios días" });
  items.push({ label: "Calcetines de trekking × 4-5 pares", esencial: true, nota: "Calidad importa: evitarás ampollas en caminatas largas" });

  if (temporada === "invierno") {
    items.push({ label: "Medias de lana gruesa × 2" });
  }

  if (destino === "chalten" || destino === "torres-paine") {
    items.push({ label: "Pantalón impermeable (lluvia)", esencial: true, nota: "Imprescindible para los senderos con viento y lluvia" });
  } else if (destino === "ushuaia" || destino === "carretera-austral") {
    items.push({ label: "Pantalón impermeable (lluvia)", esencial: true });
  }

  if ((destino === "madryn" && (temporada === "verano" || temporada === "primavera")) ||
      ((destino === "bariloche" || destino === "angostura") && temporada === "verano")) {
    items.push({ label: "Traje de baño" });
  }

  return items;
}

function getCortavientos(destino: Destino, temporada: Temporada): PackingItem[] {
  const items: PackingItem[] = [
    {
      label: "Campera cortavientos impermeable (hardshell)",
      esencial: true,
      nota: "El ítem más importante de la Patagonia. Sin esta, el frío y el viento te ganan siempre",
    },
  ];

  if (temporada === "invierno" || (temporada === "otono" && destino !== "madryn")) {
    items.push({ label: "Campera de plumas o abrigo grueso", esencial: true });
  } else if (temporada === "verano" && (destino === "chalten" || destino === "torres-paine" || destino === "ushuaia")) {
    items.push({ label: "Campera de abrigo intermedia (puffy liviana)", esencial: true });
  } else if (temporada === "verano") {
    items.push({ label: "Campera de abrigo liviana (polar o puffy)" });
  }

  if (temporada === "primavera" && destino !== "madryn") {
    items.push({ label: "Campera de abrigo intermedia (puffy liviana)", esencial: true });
  }

  items.push({ label: "Bolsas zip para proteger ropa y electrónicos del agua", nota: "El agua de lluvia se filtra por todo. Bolsas plásticas salvan teléfonos y ropa" });

  return items;
}

function getCalzado(destino: Destino, temporada: Temporada): PackingItem[] {
  const items: PackingItem[] = [];

  const needsHikingBoots = destino === "chalten" || destino === "torres-paine";
  const needsWaterproofBoots =
    destino === "ushuaia" || destino === "carretera-austral" ||
    (temporada === "invierno");

  if (needsHikingBoots) {
    items.push({
      label: "Botas de trekking impermeables",
      esencial: true,
      nota: "Los senderos tienen barro y agua. Las zapatillas comunes no alcanzan",
    });
    items.push({ label: "Calzado cómodo para el pueblo (zapatillas)" });
  } else if (needsWaterproofBoots) {
    items.push({ label: "Botas impermeables o de lluvia", esencial: true });
    items.push({ label: "Zapatillas cómodas para interior", esencial: true });
  } else {
    items.push({ label: "Zapatillas cómodas para caminar", esencial: true });
    if (destino === "bariloche" || destino === "angostura") {
      items.push({ label: "Botas de trekking livianas (para cerros)" });
    }
  }

  if (destino === "madryn" && (temporada === "verano" || temporada === "primavera")) {
    items.push({ label: "Ojotas o sandalias (para playa)" });
  }

  if (temporada === "invierno" && (destino === "bariloche" || destino === "angostura")) {
    items.push({ label: "Botas de nieve o ski", nota: "Si vas a esquiar en Catedral/Bayo" });
  }
  if (temporada === "invierno" && destino === "ushuaia") {
    items.push({ label: "Botas de nieve o ski", nota: "Para Cerro Castor" });
  }

  return items;
}

function getAccesorios(destino: Destino, temporada: Temporada): PackingItem[] {
  const items: PackingItem[] = [
    { label: "Protector solar SPF 50+", esencial: true, nota: "El UV en Patagonia es muy alto todo el año por la capa de ozono. Aplica incluso en días nublados" },
    { label: "Anteojos de sol con filtro UV400", esencial: true, nota: "El viento con polvo o arena lastima los ojos sin protección" },
    { label: "Buff o cuello de viento", esencial: true, nota: "Versátil: protege cuello, cara y cabeza del viento" },
    { label: "Gorra o visera", esencial: true },
  ];

  const needsWarmAccessories = temporada !== "verano" || destino === "chalten" || destino === "torres-paine" || destino === "ushuaia";
  if (needsWarmAccessories) {
    items.push({ label: "Gorro de lana o polar", esencial: temporada !== "verano" });
    items.push({ label: "Guantes impermeables", esencial: temporada === "invierno" || temporada === "primavera" });
  }

  if (destino === "madryn" && (temporada === "verano" || temporada === "primavera")) {
    items.push({ label: "Protector labial con SPF" });
    items.push({ label: "Repelente de insectos (para avistamientos en la estepa)" });
  }

  if (destino === "chalten" || destino === "torres-paine") {
    items.push({ label: "Protector labial con SPF", nota: "El viento y el sol secan y queman los labios muy rápido" });
  }

  return items;
}

function getEquipamiento(destino: Destino, temporada: Temporada): PackingItem[] {
  const items: PackingItem[] = [
    { label: "Mochila de día 20-30L", esencial: true },
    { label: "Botella de agua reutilizable 1L+", esencial: true, nota: "El agua de ríos y glaciares es potable en muchos tramos" },
    { label: "Powerbank cargado", esencial: true, nota: "Hay poca señal y electricidad en rutas y senderos" },
    { label: "Mapas offline descargados (Maps.me o Google Maps offline)", esencial: true, nota: "La señal desaparece a pocos km de los pueblos" },
    { label: "Adaptador de enchufe tipo I (si venís del exterior)" },
    { label: "Bolsa impermeable o funda para mochila" },
  ];

  const isTrekkingDestino = destino === "chalten" || destino === "torres-paine";
  if (isTrekkingDestino) {
    items.push({ label: "Bastones de trekking", esencial: true, nota: "Con el viento y los senderos técnicos, los bastones marcan la diferencia" });
    items.push({ label: "Linterna frontal con pilas de repuesto", esencial: true });
    items.push({ label: "Manta de emergencia (aluminizada)" });
    items.push({ label: "Botiquín básico (curita, ibuprofeno, antidiarreico)" });
    if (destino === "torres-paine") {
      items.push({ label: "Mochila grande 50-60L (si hacés el Circuito W o O)", nota: "Para llevar ropa y comida entre refugios" });
    }
  }

  if (destino === "carretera-austral") {
    items.push({ label: "Equipo de camping completo (carpa, sleeping, colchoneta)", esencial: true, nota: "Muchos tramos no tienen alojamiento disponible" });
    items.push({ label: "Filtro de agua o pastillas potabilizadoras" });
    items.push({ label: "Bidón de nafta extra (si vas en vehículo)", nota: "Las estaciones de servicio son escasas al sur de Coyhaique" });
  }

  return items;
}

function getDocumentacion(destino: Destino): PackingItem[] {
  const items: PackingItem[] = [
    { label: "DNI vigente (argentinos) o pasaporte (extranjeros)", esencial: true },
    { label: "Tarjeta de débito/crédito", esencial: true },
    { label: "Efectivo ARS (o CLP si vas a Chile)", esencial: true, nota: "Muchos negocios y puestos en ruta no tienen POS" },
    { label: "Seguro de viaje o seguro médico activo", esencial: true, nota: "Recomendado para cualquier actividad en montaña o parques" },
    { label: "Reservas de alojamiento guardadas offline" },
    { label: "Número de emergencias: 911 (AR) o 133 (CL)" },
  ];

  if (destino === "torres-paine") {
    items.push({
      label: "Reserva confirmada en CONAF o refugios",
      esencial: true,
      nota: "Las plazas del parque se agotan meses antes. Sin reserva no podés ingresar al trekking",
    });
  }

  if (destino === "chalten") {
    items.push({ label: "Registro en la Oficina de Turismo al llegar", esencial: true, nota: "Obligatorio antes de salir a cualquier sendero" });
  }

  if (destino === "ushuaia") {
    items.push({ label: "Tarjeta para el Parque Nacional Tierra del Fuego", nota: "Se compra en la entrada del parque" });
  }

  if (destino === "carretera-austral") {
    items.push({ label: "Documentación del vehículo + seguro habilitado para Chile" });
  }

  return items;
}

// ─── Main export ──────────────────────────────────────────────────────────────

export function monthToTemporada(month: number): Temporada {
  if (month === 12 || month <= 2) return "verano";
  if (month >= 3 && month <= 5) return "otono";
  if (month >= 6 && month <= 8) return "invierno";
  return "primavera";
}

export function getPackingResult(destino: Destino, mes: number): PackingResult {
  const temporada = monthToTemporada(mes);
  const clima = CLIMATE[destino][temporada];

  const categorias: PackingCategory[] = [
    {
      id: "ropa",
      titulo: "Ropa y capas",
      emoji: "🧥",
      items: getRopa(destino, temporada),
    },
    {
      id: "viento",
      titulo: "Cortavientos y lluvia",
      emoji: "💨",
      items: getCortavientos(destino, temporada),
    },
    {
      id: "calzado",
      titulo: "Calzado",
      emoji: "👟",
      items: getCalzado(destino, temporada),
    },
    {
      id: "accesorios",
      titulo: "Accesorios",
      emoji: "🕶️",
      items: getAccesorios(destino, temporada),
    },
    {
      id: "equipamiento",
      titulo: "Equipamiento",
      emoji: "🎒",
      items: getEquipamiento(destino, temporada),
    },
    {
      id: "documentacion",
      titulo: "Documentación y dinero",
      emoji: "📄",
      items: getDocumentacion(destino),
    },
  ];

  return { clima, categorias };
}
