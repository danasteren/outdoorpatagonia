---
paths:
  - "src/components/status/**"
  - "src/lib/apis/**"
  - "src/lib/astronomy.ts"
---
# StatusBoard: cómo agregar un ítem nuevo

El StatusBoard es un Server Component en `src/components/status/StatusBoard.tsx`. Para agregar una sección nueva:

1. **Función de API**: crearla en `src/lib/apis/<nombre>.ts` o sumarla a uno que ya exista.
   - Exportar siempre los tipos de TypeScript además de la función.
   - La función es async y, si hay error, devuelve `[]` o un objeto vacío. Nunca tira error.
2. **Componente de la sección**: crear `src/components/status/<NombreSection>.tsx`.
   - Server Component (sin "use client").
   - Recibe por props los datos ya traídos.
   - Si no hay datos, renderiza `null` (el patrón de FireSection).
3. **Conectarlo en StatusBoard.tsx**:
   - Sumar el fetch al `Promise.allSettled([...])` que ya existe.
   - Sacar el resultado con el mismo patrón `status === "fulfilled"`.
   - Renderizar el componente en el JSX.

## APIs ya integradas (reutilizarlas, sin sumar dependencias)
- **Open-Meteo** (`src/lib/apis/openmeteo.ts`): clima y glaciares. `windSpeed` ya viene en `WeatherData`. Para variables nuevas (nieve, presión), sumar parámetros a la URL de Open-Meteo.
- **iNaturalist** (`src/lib/apis/inaturalist.ts`): avistamientos por `iconic_taxa` o `taxon_id`. Para ballenas: `taxon_id=152784` (Cetacea).
- **NASA FIRMS** (`src/lib/apis/nasa-firms.ts`): focos de incendio. La key está en `NASA_FIRMS_KEY`.
- **GBIF** (`src/lib/apis/gbif.ts`): biodiversidad por región.
- **`src/lib/astronomy.ts`**: cálculo puro, sin API: `getMoonData()`.

## APIs candidatas para ítems futuros
- **USGS Earthquake**: `https://earthquake.usgs.gov/fdsnws/event/1/query`. Sin API key, con bbox de la Patagonia.
- **SERNAGEOMIN volcanes**: `https://rnvv.sernageomin.cl/api/`. Alertas volcánicas de Chile.
- **SHOA mareas**: para Ushuaia y Puerto Madryn.
