# Outdoor Patagonia — outdoorpatagonia.com

Sitio bilingüe (ES/EN) sobre la Patagonia argentina y chilena: naturaleza, destinos, parques, senderos, fauna, flora, gastronomía, escalada y datos en vivo. El objetivo es generar ingresos pasivos con tráfico orgánico, a través de GetYourGuide, AdSense y fichas destacadas de operadores.

El repo es la única fuente de verdad. El chat del Proyecto y Claude Code leen los mismos archivos:

- `CLAUDE.md` (este archivo): arquitectura, comandos, reglas de dominio y trampas.
- `.claude/rules/`: flujos temáticos. Se cargan solos cuando tocás los archivos de cada tema.
- `docs/STATUS.md`: qué está hecho, qué está en curso, qué está pendiente y qué viene después.
- `docs/DECISIONS.md`: decisiones con fecha, motivo y detalle.

## Workflow (obligatorio)

**Antes de empezar cualquier tarea**
1. Leer `docs/STATUS.md` y `docs/DECISIONS.md`.
2. Si la tarea contradice una decisión registrada, frenar y preguntar. No reinterpretar la decisión.

**Al terminar cada tarea**
1. `docs/STATUS.md`: mover lo terminado a "Hecho", actualizar "En curso" y "Próximo".
2. `docs/DECISIONS.md`: agregar arriba de todo cada decisión nueva tomada durante la tarea, con el formato del archivo. Si una decisión reemplaza a otra, marcar la vieja como `Reemplazada por <fecha/título>`. No se borra nada.
3. Si el cambio lo ve el lector: actualizar novedades (`.claude/rules/novedades.md`).
4. Si cambió la arquitectura, un comando o una trampa: actualizar este archivo.
5. Hacer commit de la tarea junto con los docs actualizados, directo en `main` y sin PR. **El push lo hace la usuaria**: avisarle que quedó listo. (Las rutinas en la nube sí abren PR.)

**Reglas de documentación**
- No hacer inventarios de rutas, tablas, componentes o env vars completos. Documentar la estructura, las reglas y lo que no se deduce del código, y remitir al archivo fuente.
- Cada dato vive en un solo archivo. Si ya está en otro, se remite a ese.
- Las decisiones que guardes en tu memoria propia (auto-memory) también van a `docs/DECISIONS.md`. La memoria no reemplaza a los docs.

## Stack: no asumir defaults

Esta versión de Next.js tiene cambios que rompen compatibilidad: las APIs, las convenciones y la estructura pueden no coincidir con lo que conocés de tu entrenamiento. Antes de escribir código, leé la guía que corresponda en `node_modules/next/dist/docs/` y respetá los avisos de deprecación.

- **Next.js 16.2.7 + React 19.2.4** (App Router, React Compiler activado). Leer la doc antes de usar cualquier API de routing o de data-fetching.
- **Tailwind v4**: la config está en `src/app/globals.css` con `@theme`. **No existe** `tailwind.config.js`.
- **lucide-react 1.17.0**: los nombres de íconos pueden no ser los que conocés. Verificar que exista antes de usarlo, por ejemplo con `node -e "console.log('X' in require('lucide-react'))"`.
- **Supabase Auth con flujo PKCE manual**: no se usa `@supabase/auth-helpers-nextjs`. La sesión se maneja en `src/proxy.ts`.
- **`src/proxy.ts` reemplaza a `middleware.ts`** (deprecado en esta versión). Hace los 301 de URLs viejas de WordPress y de artículos absorbidos por guías, y refresca la sesión de Supabase.
- Hosting en Vercel. `vercel.json` solo saca la barra final de las URLs viejas.

## Comandos

- `npm run dev`: dev server en el **puerto 3006** (está en `package.json` y en `.claude/launch.json`).
- `npm run build`: usarlo para verificar antes de dar algo por terminado.
- `npm run lint`
- Scripts Python en `scripts/`. Cada uno documenta su uso en el docstring. El de research semanal es `scripts/keyword_research.py`.
- Migraciones SQL en `supabase/migrations/` (numeradas; 005 y 006 están repetidas). **Se corren a mano en el SQL Editor de Supabase**: no hay CLI linkeado ni `supabase/config.toml`. Las nuevas tienen que poder correrse más de una vez (`if not exists`, `drop … if exists`, como `008`). Las 001 a 007 no son idempotentes: no volver a correrlas.
- Los scripts Python no leen `.env.local`: usan `SUPABASE_URL` y `SUPABASE_SERVICE_ROLE_KEY` (sin `NEXT_PUBLIC_`), pasadas por entorno. Para Search Console en local: `GSC_SERVICE_ACCOUNT_FILE=~/.config/outdoorpatagonia/gsc.json`.
- **Deploy**: Vercel deploya solo cuando se pushea a `main`. Los PR tienen preview, cuyo entorno Preview tiene a propósito solo `NEXT_PUBLIC_SUPABASE_*` (sin Resend ni service role).

## Arquitectura

- **Dos fuentes de contenido:**
  - **Supabase, tabla `articles`**: los artículos que vinieron del WordPress (ES y EN, `slug` + `language` únicos). Se ven en `/[categoria]/[slug]` y `/en/[categoria]/[slug]`, igual que las URLs de WordPress (carpetas `src/app/[slug]/[article]` y `src/app/en/[slug]/[article]`).
  - **Catálogos estáticos en TypeScript** (`src/lib/<seccion>/catalog.ts`): destinos, parques, senderos, volcanes, termas, arqueología, escalada, fauna, flora, gastronomía. De cada catálogo salen solas la página, el JSON-LD, el sitemap y el buscador.
- **Conexiones entre catálogos**: el campo `relacionados`, resuelto en `src/lib/relacionados.ts` (ver `.claude/rules/relacionados.md`).
- **Datos en vivo**: una API por archivo en `src/lib/apis/`, mostradas en el StatusBoard y en `/estado` (ver `.claude/rules/statusboard.md`).
- **Inglés**: todo lo que está en inglés cuelga de `src/app/en/`. Los catálogos tienen contenido `es` y `en` en el mismo objeto.
- **Admin** en `src/app/admin/` y `src/app/api/admin/`. `/admin/agentes` muestra los PR que abren las rutinas y permite publicarlos con `GITHUB_TOKEN` (`src/lib/agentes/github.ts`). **Protección**: cada page y cada route compara el mail del usuario de Supabase con una constante `ADMIN_EMAIL` local (`proxy.ts` no protege `/admin`). Una ruta de admin nueva tiene que repetir ese chequeo.
- **Usuarios**: perfil, favoritos, itinerarios guardados (`/planear`) y notificaciones. Newsletter propio en Supabase, con mails por Resend.
- **Guardar contenido**: todo usa `saved_articles`. Para los catálogos, la columna `category` lleva el prefijo de ruta (`"parques"`, `"fauna"`…). Para sumar guardado a un catálogo, pasar `save={{ slug, title, category }}` a `DetailHero`.
- **Supabase Storage**: bucket `wp-uploads` (fotos migradas de WordPress; las portadas de reemplazo están en `wikimedia/` y exigen atribución) y bucket `ahora` (subidas del admin con URL firmada).
- **SEO**: `seo/` tiene la investigación (`destinos-prioridad.md`, `seeds.txt`), los reportes semanales (`reports/`) y los SQL de cambios masivos de títulos (`updates/`).
- **Env vars**: ver `.env.local`, que no se versiona. Para cada una, ver qué código la usa.

## Reglas de dominio

- **Bilingüe**: todo contenido nuevo para el lector sale en ES y EN completos, con la misma estructura.
- **Datos solo de fuentes oficiales**: APN, CONAF, SERNAGEOMIN, turismo municipal o provincial, el sitio del atractivo. Wikipedia sirve solo como apoyo. Si no hay fuente, no va el dato.
- **Afiliados**: GetYourGuide es el único activo (`src/lib/affiliates/getyourguide.ts`, ID en `NEXT_PUBLIC_GYG_PARTNER_ID`). Booking y Amazon están dados de baja: no sumar links ni componentes de ellos.
- **SEO/GEO** obligatorio en cada página nueva: `.claude/rules/seo-geo.md`.
- **Nav**: una sección nueva no entra al menú hasta tener masa crítica (ver `.claude/rules/relacionados.md`).
- **Textos para el lector**: en español argentino. Nunca el nombre personal de la dueña del sitio: siempre "Outdoor Patagonia" o "el equipo" (en mails, metadata, UI y JSON-LD).
- **Malvinas**: siempre "Islas Malvinas (Argentina)", nunca "Falkland Islands". Si los tiles de OpenStreetMap muestran "Falkland", taparlo con un label propio.
- **IDs externos** (taxonId de iNaturalist, gbifKey, estaciones, códigos SERNAGEOMIN): nunca escribirlos de memoria. Resolverlos en runtime por nombre o verificarlos contra la API real antes de commitear.
- **Arqueología**: solo Patagonia (Neuquén, Río Negro, Chubut, Santa Cruz, Tierra del Fuego, Magallanes). Mendoza y Buenos Aires quedan afuera.

## Trampas conocidas

- `redirect()` dentro de un page component devuelve **200 + meta-refresh**, no un 301 real. Para un 301 real, hacerlo en `src/proxy.ts`.
- `generateStaticParams` tiene que usar un cliente de Supabase **sin cookies**. Con el cliente de servidor normal falla el build.
- El nav está duplicado en `src/components/HeaderShell.tsx`, una lista para desktop y otra para mobile. Hay que mantenerlas sincronizadas.
- Las fotos de los artículos se sirven desde Supabase Storage. El fallback de portadas está en `src/data/cover-fallbacks.ts`.
- En `fauna/[especie]` y `flora/[especie]`, si existe un artículo de Supabase con el mismo slug, su `seo_title` le gana al `metaTitle` del catálogo. Antes de editar títulos en el catálogo, fijarse si hay artículo.
- Mapas: `react-leaflet` + OSM. `maplibre-gl` sigue en `package.json` pero se descartó (pantalla gris): no reintroducirlo.
- `.claude/settings.local.json` no se versiona y puede tener secretos en permisos viejos. Nunca commitearlo.
