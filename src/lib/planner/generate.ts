import {
  DESTINATIONS,
  ALL_TOURS,
  ALL_GEAR,
  type Destination,
} from "./data";
import type {
  TripFormData,
  ItineraryDay,
  ItineraryResult,
  Season,
  Interest,
} from "./types";

function getSeason(month: number): Season {
  if (month === 12 || month <= 2) return "verano";
  if (month <= 5) return "otono";
  if (month <= 8) return "invierno";
  return "primavera";
}

const SEASON_LABELS: Record<Season, string> = {
  verano: "verano austral",
  otono: "otoño",
  invierno: "invierno",
  primavera: "primavera",
};

const MONTH_NAMES = [
  "", "enero", "febrero", "marzo", "abril", "mayo", "junio",
  "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre",
];

function selectDestinations(
  form: TripFormData,
  season: Season
): Destination[] {
  const { origin, days, interests } = form;
  const hasTrekking = interests.includes("trekking");
  const hasFauna = interests.includes("fauna");
  const hasGastro = interests.includes("gastronomia");
  const isSummer = season === "verano";
  const isWinter = season === "invierno";

  // Winter limits access to many places
  if (isWinter) {
    if (origin === "chile") {
      return days <= 7
        ? [DESTINATIONS.punta_arenas, DESTINATIONS.ushuaia]
        : [DESTINATIONS.punta_arenas, DESTINATIONS.ushuaia, DESTINATIONS.bariloche];
    }
    return days <= 7
      ? [DESTINATIONS.bariloche, DESTINATIONS.ushuaia]
      : [DESTINATIONS.bariloche, DESTINATIONS.ushuaia, DESTINATIONS.punta_arenas];
  }

  if (origin === "chile") {
    if (days <= 7) return [DESTINATIONS.puerto_natales, DESTINATIONS.torres_paine];
    if (days <= 14)
      return [
        DESTINATIONS.punta_arenas,
        DESTINATIONS.puerto_natales,
        DESTINATIONS.torres_paine,
        DESTINATIONS.calafate,
      ];
    return [
      DESTINATIONS.punta_arenas,
      DESTINATIONS.puerto_natales,
      DESTINATIONS.torres_paine,
      DESTINATIONS.calafate,
      DESTINATIONS.chalten,
    ];
  }

  // Argentina or Internacional (typically fly in via Buenos Aires)
  if (days <= 5) {
    if (hasTrekking) return [DESTINATIONS.chalten];
    if (hasFauna) return [DESTINATIONS.madryn];
    return [DESTINATIONS.calafate, DESTINATIONS.chalten];
  }

  if (days <= 9) {
    const base = hasTrekking
      ? [DESTINATIONS.calafate, DESTINATIONS.chalten]
      : [DESTINATIONS.calafate, DESTINATIONS.ushuaia];
    if (hasFauna && (isSummer || season === "primavera"))
      base.push(DESTINATIONS.madryn);
    return base;
  }

  if (days <= 14) {
    const base = [DESTINATIONS.calafate, DESTINATIONS.chalten, DESTINATIONS.ushuaia];
    if (hasFauna) base.push(DESTINATIONS.madryn);
    if (hasGastro) base.push(DESTINATIONS.bariloche);
    return base;
  }

  // Long trip (15+)
  const all = [
    DESTINATIONS.calafate,
    DESTINATIONS.chalten,
    DESTINATIONS.ushuaia,
    DESTINATIONS.bariloche,
    DESTINATIONS.torres_paine,
    DESTINATIONS.puerto_natales,
  ];
  if (hasFauna) all.splice(3, 0, DESTINATIONS.madryn);
  return all;
}

function distributeDays(
  destinations: Destination[],
  totalDays: number
): Array<{ dest: Destination; days: number }> {
  const weights = destinations.map((d) => d.recommendedDays);
  const totalWeight = weights.reduce((a, b) => a + b, 0);

  let allocated = destinations.map((dest, i) => ({
    dest,
    days: Math.max(1, Math.round((weights[i] / totalWeight) * totalDays)),
  }));

  // Adjust to hit exact total
  const currentTotal = allocated.reduce((a, b) => a + b.days, 0);
  const diff = totalDays - currentTotal;
  if (diff !== 0) {
    // Add/subtract from the destination with most days
    const idx = allocated.reduce(
      (maxI, cur, i) => (cur.days > allocated[maxI].days ? i : maxI),
      0
    );
    allocated[idx].days += diff;
    if (allocated[idx].days < 1) allocated[idx].days = 1;
  }

  return allocated;
}

function buildDays(
  blocks: Array<{ dest: Destination; days: number }>,
  interests: Interest[]
): ItineraryDay[] {
  const result: ItineraryDay[] = [];
  let dayCounter = 1;

  for (const { dest, days } of blocks) {
    const size = days <= 1 ? "short" : days <= 3 ? "medium" : "long";
    const description = dest.description[size];

    // Pick relevant activities based on interests
    const interestActivities = dest.activities.filter((act) =>
      dest.interests.some((i) => interests.includes(i))
    );
    const activities =
      interestActivities.length > 0 ? interestActivities : dest.activities;

    for (let d = 0; d < days; d++) {
      const isFirst = d === 0;
      const isLast = d === days - 1;

      let title = dest.name;
      if (days === 1) {
        title = `${dest.name} — día completo`;
      } else if (isFirst) {
        title = `Llegada a ${dest.name}`;
      } else if (isLast) {
        title = `${dest.name} — último día`;
      } else {
        const actIndex = d % activities.length;
        title = activities[actIndex].split(" — ")[0].split(" (")[0];
      }

      result.push({
        day: dayCounter++,
        location: dest.name,
        coordinates: dest.coordinates,
        title,
        description: isFirst ? description : activities[d % activities.length],
        activities: activities.slice(0, Math.min(activities.length, 3)),
      });
    }
  }

  return result;
}

function getTips(
  form: TripFormData,
  season: Season,
  destinations: Destination[]
): string[] {
  const tips: string[] = [];
  const destIds = destinations.map((d) => d.id);

  if (season === "verano") {
    tips.push(
      "Temporada alta: reservar todo con al menos 3 meses de anticipación, especialmente alojamiento en Torres del Paine."
    );
  }
  if (season === "invierno") {
    tips.push(
      "Los días son cortos y las temperaturas bajas. Llevá capas térmicas y campera de pluma aunque el sol engañe."
    );
  }
  if (destIds.includes("torres_paine")) {
    tips.push(
      "Torres del Paine requiere reserva de refugios y camping con hasta 6 meses de anticipación para dic-feb."
    );
  }
  if (destIds.includes("chalten")) {
    tips.push(
      "El Chaltén: todos los senderos son gratuitos. El clima cambia en minutos — llevá ropa de abrigo siempre."
    );
  }
  if (destIds.includes("madryn")) {
    const month = form.month;
    if (month >= 9 && month <= 10) {
      tips.push("¡Estás en la temporada perfecta de orcas en Punta Norte! Reservar el tour con tiempo.");
    } else if (month >= 6 && month <= 12) {
      tips.push("Temporada de ballenas en Golfo Nuevo. Las excursiones salen desde Puerto Pirámides.");
    }
  }
  if (form.interests.includes("trekking")) {
    tips.push(
      "En Patagonia el viento puede superar los 100 km/h. Nunca salgas sin chubasquero y guantes, incluso en verano."
    );
  }
  if (form.budget === "economico") {
    tips.push(
      "El Chaltén no cobra entrada al parque y tiene excelentes opciones de camping. Comprá víveres en Calafate antes de llegar."
    );
  }
  tips.push("El efectivo es útil fuera de las ciudades principales — llevá pesos argentinos y pesos chilenos según el itinerario.");

  return tips.slice(0, 4);
}

function getMapCenter(destinations: Destination[]): [number, number] {
  const lngs = destinations.map((d) => d.coordinates[0]);
  const lats = destinations.map((d) => d.coordinates[1]);
  return [
    (Math.min(...lngs) + Math.max(...lngs)) / 2,
    (Math.min(...lats) + Math.max(...lats)) / 2,
  ];
}

function getMapZoom(destinations: Destination[]): number {
  if (destinations.length === 1) return 8;
  const lngs = destinations.map((d) => d.coordinates[0]);
  const lats = destinations.map((d) => d.coordinates[1]);
  const lngSpan = Math.max(...lngs) - Math.min(...lngs);
  const latSpan = Math.max(...lats) - Math.min(...lats);
  const span = Math.max(lngSpan, latSpan);
  if (span < 2) return 8;
  if (span < 5) return 6;
  if (span < 10) return 5;
  return 4;
}

export function generateItinerary(form: TripFormData): ItineraryResult {
  const season = getSeason(form.month);
  const destinations = selectDestinations(form, season);
  const blocks = distributeDays(destinations, form.days);
  const itineraryDays = buildDays(blocks, form.interests);

  const relevantTours = ALL_TOURS.filter(
    (t) =>
      t.interests.some((i) => form.interests.includes(i)) &&
      destinations.some((d) => d.name === t.location)
  ).slice(0, 4);

  const relevantGear = ALL_GEAR.filter(
    (g) =>
      g.interests.some((i) => form.interests.includes(i)) &&
      g.seasons.includes(season)
  ).slice(0, 5);

  const tips = getTips(form, season, destinations);
  const mapCenter = getMapCenter(destinations);
  const mapZoom = getMapZoom(destinations);

  const primaryDest = destinations[0];
  const monthName = MONTH_NAMES[form.month];
  const title = destinations.length === 1
    ? `${form.days} días en ${primaryDest.name}`
    : destinations.length === 2
    ? `${form.days} días en ${destinations[0].name} y ${destinations[1].name}`
    : `${form.days} días por la Patagonia`;

  const subtitle = `${monthName.charAt(0).toUpperCase() + monthName.slice(1)} ${form.year} — ${SEASON_LABELS[season]}`;

  return {
    title,
    subtitle,
    season,
    days: itineraryDays,
    tours: relevantTours,
    gear: relevantGear,
    mapCenter,
    mapZoom,
    tips,
  };
}
