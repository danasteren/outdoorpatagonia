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

<!-- BEGIN:seo-geo -->
## SEO & GEO — obligatorio en cada página nueva

Toda página nueva debe cumplir este checklist antes de darse por terminada.

### 1. `metadata` mínimo

El `layout.tsx` ya define `metadataBase`, title template (`%s | Outdoor Patagonia`) y openGraph/twitter globales como fallback. Cada `page.tsx` solo sobreescribe lo que cambia:

```typescript
export const metadata: Metadata = {
  title: "Keyword principal + Patagonia (50-60 chars)",
  description: "Responde qué, dónde y por qué en 150-160 chars. Los AI overviews citan estas descripciones literalmente.",
  openGraph: {
    title: "...",
    description: "...",
    url: "https://outdoorpatagonia.com/ruta",
    images: [{ url: "/og-default.jpg", width: 1200, height: 630, alt: "descripción de la imagen" }],
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "https://outdoorpatagonia.com/ruta" },
}
```

Reglas irrompibles:
- `title`: único por página, incluir "Patagonia" + keyword principal
- `description`: frase directa que responde who/what/where — nunca empiece con "En este artículo..."
- `canonical`: **obligatorio** — previene contenido duplicado por query params; en rutas dinámicas, generarlo por entrada
- Si la página tiene imagen destacada, usarla en `openGraph.images`; si no, usar `/og-default.jpg`

### 2. Estructura HTML

- **Un `<h1>` por página** — keyword principal + "Patagonia" cuando tiene sentido
- Jerarquía `h2 → h3` sin saltos; nunca usar headings solo por estilo visual
- Toda `<Image>` / `<img>` con `alt` descriptivo (nunca vacío, nunca "imagen de X")
- **Agregar la nueva ruta estática a `src/app/sitemap.ts`** — si no aparece en el sitemap, Google la indexa más lento

### 3. JSON-LD structured data (GEO)

Agregar `<script type="application/ld+json">` en el JSX. Tipo según contexto:

| Tipo de página | Schema recomendado |
|---|---|
| Artículo / post | `Article` con `author`, `datePublished`, `image`, `publisher` |
| Parque / sendero / lugar | `TouristDestination` con `geo` (lat/lng) |
| Especie fauna / flora | `Article` con `about: { "@type": "Thing", name: nombre científico }` |
| Página de categoría / índice | `CollectionPage` |
| Preguntas frecuentes | `FAQPage` — máximo impacto en AI overviews |

Patrón para lugares (parques, senderos):

```typescript
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "TouristDestination",
  name: "Nombre del lugar",
  description: "...",
  url: "https://outdoorpatagonia.com/parques/...",
  geo: { "@type": "GeoCoordinates", latitude: -50.0, longitude: -73.0 },
  touristType: { "@type": "Audience", audienceType: "outdoor enthusiasts" },
  containedInPlace: { "@type": "Country", name: "Argentina" },
}
// en el JSX:
// <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
```

### 4. GEO — optimizar para AI overviews (Perplexity, Google AI, ChatGPT Search)

Los motores de IA priorizan páginas que:
- Responden la pregunta directamente en los **primeros 100 palabras** de cada sección
- Usan datos concretos: altitud, distancia, temperatura media, temporada, precio
- Nombran entidades específicas: nombre científico, coordenadas, nombre de parque oficial
- Tienen `FAQPage` schema con preguntas reales que la gente busca

Al escribir contenido o descripciones, estructurar así:
- ✅ "El Parque Nacional Los Glaciares tiene 726.927 ha y alberga el Perito Moreno, uno de los pocos glaciares en crecimiento del mundo."
- ❌ "En este artículo vamos a explorar todo lo que necesitás saber sobre los glaciares patagónicos."
<!-- END:seo-geo -->
