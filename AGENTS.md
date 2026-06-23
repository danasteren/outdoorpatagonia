<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

## Stack versions (do not assume defaults)
- Next.js **16.2.7** + React **19.2.4** — read the docs before using any routing or data-fetching API
- Tailwind **v4** — config is in `globals.css` via `@theme`, NOT `tailwind.config.js`
- `lucide-react` **1.17.0** — icon names may differ from training data; check available icons before using
- Supabase Auth with **manual PKCE flow** — no `@supabase/auth-helpers-nextjs`; session managed in `src/proxy.ts`
- `src/proxy.ts` replaces `middleware.ts` (deprecated in this version) — handles WordPress redirects + Supabase session refresh

## Key env vars
- `NASA_FIRMS_KEY` — NASA FIRMS API key (already set in .env.local)
- `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` — Supabase
- `NEXT_PUBLIC_BOOKING_AID`, `NEXT_PUBLIC_GYG_PARTNER_ID`, `NEXT_PUBLIC_AMAZON_TAG` — affiliate IDs
<!-- END:nextjs-agent-rules -->

<!-- BEGIN:novedades-workflow -->
## Workflow: "actualiza novedades"

When the user says **"actualiza novedades"** (or equivalent phrasing):

1. Run `git log --oneline -30` to get recent commits since the last published version
2. **Filter strictly to user-visible changes only.** Include:
   - New pages or sections readers can visit
   - UI improvements visible to readers
   - Bug fixes that affected the reading/navigation experience
   - New content features (search, maps, quizzes, etc.)
3. **Never publish** (skip entirely):
   - Auth, security, or session changes
   - DB schema, migrations, Supabase config
   - Deployment, Vercel, env vars, infra
   - Script internals or migration tooling
   - Admin-only features
   - Performance/build optimizations with no visible effect
4. Map each item to a `TipoCambio`: `"nuevo"` (new feature), `"mejora"` (enhancement), `"correccion"` (bug fix)
5. Write descriptions in plain Argentine Spanish from the reader's perspective — what changed *for them*, not what changed in the code
6. Confirm the new version number with the user before writing (bump minor for feature releases, patch for fixes only)
7. Edit `src/data/novedades.ts`: prepend the new entry at the top of the array, set `esUltima: true` on it, remove `esUltima` from all other entries
8. The page `/novedades` is statically rendered from `src/data/novedades.ts` — no DB, no CMS, no admin panel needed

**Example mental filter:** "feat: category pages" → NUEVO user-visible feature ✓. "fix: generateStaticParams uses cookie-free Supabase client" → internal build fix, skip ✗.
<!-- END:novedades-workflow -->

<!-- BEGIN:statusboard-pattern -->
## StatusBoard — cómo agregar un nuevo item

El StatusBoard es un Server Component en `src/components/status/StatusBoard.tsx`.
Patrón para agregar una nueva sección:

1. **API function** → crear en `src/lib/apis/<nombre>.ts` (o agregar a uno existente).
   - Siempre exportar tipos TypeScript además de la función.
   - La función debe ser async y devolver [] / objeto vacío en error, nunca tirar.

2. **Section component** → crear `src/components/status/<NombreSection>.tsx`.
   - Server Component (no "use client").
   - Recibe los datos ya fetcheados como props.
   - Renderiza `null` si no hay datos (patrón de FireSection).

3. **Wiring en StatusBoard.tsx**:
   - Agregar el fetch al `Promise.allSettled([...])` existente.
   - Extraer el resultado con el mismo patrón `status === "fulfilled"`.
   - Renderizar el componente en el JSX.

### APIs ya integradas (reutilizar sin crear nuevas dependencias)
- **Open-Meteo** (`src/lib/apis/openmeteo.ts`) — clima + glaciares. `windSpeed` ya viene en `WeatherData`. Para nuevas variables (nieve, presión) agregar parámetros a la URL de Open-Meteo.
- **iNaturalist** (`src/lib/apis/inaturalist.ts`) — avistamientos por `iconic_taxa` o `taxon_id`. Para ballenas: `taxon_id=152784` (Cetacea).
- **NASA FIRMS** (`src/lib/apis/nasa-firms.ts`) — focos de incendio. Key en `NASA_FIRMS_KEY`.
- **GBIF** (`src/lib/apis/gbif.ts`) — biodiversidad por región.
- **`src/lib/astronomy.ts`** — cálculo puro sin API: `getMoonData()`.

### APIs nuevas disponibles para próximos items
- **USGS Earthquake** — `https://earthquake.usgs.gov/fdsnws/event/1/query` — sin API key, bbox Patagonia
- **SERNAGEOMIN volcanes** — `https://rnvv.sernageomin.cl/api/` — alertas volcánicas Chile
- **SHOA mareas** — para Ushuaia y Pto. Madryn
<!-- END:statusboard-pattern -->
