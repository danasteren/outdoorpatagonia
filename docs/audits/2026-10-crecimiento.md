# Auditoría de crecimiento: monetización, SEO técnico y performance

_Fecha: 2026-10-29. Solo lectura: no se tocó código, contenido ni configuración._

**Cómo se midió:** curl contra producción (las 363 URLs del sitemap y unos 40 patrones de URL de WordPress), lectura del código (`src/proxy.ts`, `src/app/layout.tsx`, `src/app/loading.tsx`, `vercel.json`, componentes), Search Console por API (web, imágenes y Discover, del 30/09 al 27/10), Lighthouse 12.8.2 local (mobile, throttling simulado) y una prueba de navegación en el navegador. PageSpeed Insights había agotado la cuota diaria, así que **no hay datos de campo (CrUX)**. No hubo acceso a GA4 ni al panel de AdSense desde acá.

**Contexto de Search Console (28 días):** web: 68.810 impresiones, 509 clics, CTR 0,74 %, posición 9,4. Imágenes: 83.970 impresiones y 187 clics (CTR 0,22 %). Discover: 0. Mobile tiene un CTR de 0,59 % y desktop, de 1,08 %. Países: Argentina 51 % de las impresiones, EE. UU. 13 %, Chile 9 %. EEE + Reino Unido suman alrededor del 7 %.

---

## Prioridades (de mayor a menor)

| # | Hallazgo | Estado | Impacto estimado | Esfuerzo |
|---|---|---|---|---|
| 1 | AdSense no muestra anuncios al navegar dentro del sitio (navegación client-side) | falla | **Alto**: solo la página de entrada lleva anuncios | Medio |
| 2 | `www.outdoorpatagonia.com` apunta a otro servidor (143.198.26.246) con certificado autofirmado | falla | **Alto** si hay backlinks o enlaces viejos con `www` | Bajo (DNS + dominio en Vercel) |
| 3 | LCP mobile de 10,7 a 13,5 s en la home y en 2 de los 3 artículos top | falla | **Alto**: Core Web Vitals en rojo y anuncios que cargan tarde | Medio |
| 4 | GetYourGuide no aparece en los artículos, que es donde está el tráfico, y no se mide el clic | falla | **Alto** para afiliados | Bajo a medio |
| 5 | Todo el sitio se renderiza en cada request (sin caché, TTFB de ~1 s) | falla | Medio a alto: LCP, costo y rastreo | Medio a alto |
| 6 | Soft 404: cualquier URL inexistente devuelve 200 + `noindex`; los archivos de WP (tags, autores, feeds, fechas, `?p=`) no redirigen | falla | Medio | Bajo a medio |
| 7 | `/wp-content/uploads/*` devuelve 403 (firewall de Vercel); las fotos están en Supabase con la misma ruta | falla | Medio (búsqueda de imágenes y backlinks a fotos) | Bajo |
| 8 | CLS de 0,11 a 0,27 en artículos por Auto ads sin espacio reservado | falla | Medio | Medio (sale con el #1) |
| 9 | Hreflang: solo 34 de 113 URLs en inglés tienen par; faltan la autorreferencia y `x-default` en 39 páginas | falla | Medio para el tráfico en inglés | Medio |
| 10 | Datos estructurados incompletos: artículos sin `BreadcrumbList` ni `dateModified`; parques y senderos sin `TouristDestination`; home sin `WebSite`/`Organization` | falla | Bajo a medio | Bajo |
| 11 | Home ES, `/mapa` y `/planear` sin canonical; `/?p=…` y `/?lang=en` sirven la home duplicada | falla | Bajo a medio | Bajo |
| 12 | GA4 sin eventos propios (clic de afiliado, newsletter, guardar) ni Consent Mode | dudoso | Medio para decidir, bajo para el tráfico | Bajo |
| 13 | CMP: carga el mensaje de privacidad de Google (Funding Choices) | dudoso (probablemente OK) | Bajo (~7 % del tráfico es EEE/RU) | Verificar en el panel |

---

## 1. Redirects de la migración

**Cómo está implementado:** `src/proxy.ts`, en este orden. (a) Artículos absorbidos por una guía o una ficha (`src/lib/article-redirects.ts`, que incluye `LEGACY_TO_GUIDE`): 301. (b) `/categoria/{slug}` de categorías con sección propia: 301 a la sección (`src/lib/category.ts`). (c) URL plana `/{slug}` o `/en/{slug}`: busca el artículo en Supabase y hace 301 a `/{categoria}/{slug}`. (d) Dos o más segmentos con categoría vieja o jerarquía muerta: busca por el último segmento y hace 301 si la URL no coincide. La barra final la saca Next o `vercel.json` con un **308** y después sigue el 301 (2 saltos, aceptable).

| Hallazgo | Estado | Evidencia | Impacto | Fix propuesto |
|---|---|---|---|---|
| Artículos ES y EN de WP (con o sin barra, con categoría vieja, planos) | OK | `/todo-sobre-el-guanaco/` → `/fauna/todo-sobre-el-guanaco` (2 saltos); `/en/strait-of-magellan-history-significance/` → `/en/history/…`; `/lugares/torres-del-paine-patagonia/` → `/destinos/puerto-natales`; `/en/destinations/torres-del-paine-patagonia/` → `/en/guides/puerto-natales`; `/categoria/fauna/` → `/fauna`. De las 363 URLs del sitemap, 362 dan 200 | — | — |
| Subdominio `www` roto | **falla** | `www.outdoorpatagonia.com` resuelve a 143.198.26.246 (no es Vercel). HTTPS: "self signed certificate". `http://www…` hace 301 a `https://www…`, que falla | Alto: se pierde todo enlace o marcador con `www` (incluido `ads.txt` en `www`) | Apuntar `www` (CNAME) a Vercel en Cloudflare y sumarlo al proyecto de Vercel como redirect 308 al apex. Es configuración, no código |
| `/wp-content/uploads/*` | **falla** | 403 con `x-vercel-mitigated: deny` (firewall de Vercel). La misma ruta existe en Supabase: `…/storage/v1/object/public/wp-uploads/2025/06/hongos-de-pino-en-escabeche-outdoor-patagonia.jpg` da 200 | Medio: 84 k impresiones mensuales en búsqueda de imágenes; las fotos indexadas con la URL vieja y los backlinks a fotos dan error | Excluir `/wp-content/uploads/` de la regla del firewall y hacer 301 a `wp-uploads/` de Supabase en `proxy.ts` (un prefijo, sin consultar la base) |
| Archivos de WP: `/tag/*`, `/etiqueta/*`, `/author/*`, `/page/N`, `/AAAA/MM`, `/feed`, `/en/feed`, `/comments/feed`, `/amp`, `/sin-categoria/*` | **falla** | 308 (barra) → **200 con `noindex`**, con el título genérico de la home (ver punto 4, soft 404) | Medio: Google los trata como soft 404 y se pierde la señal de los enlaces que tuvieran | 301 en `proxy.ts`: tags y etiquetas → `/buscar?q=…` o a la sección; autor → `/sobre-nosotros`; feeds → 410 o home; `/AAAA/MM` y `/page/N` → home; `/sin-categoria/{slug}` → resolver como artículo |
| Paginación de categorías `/categoria/x/page/N`, `/en/category/x/page/N` | falla menor | 404 real | Bajo | 301 a la categoría sin `/page/N` |
| Parámetros de WP: `/?p=123`, `/?page_id=2`, `/?lang=en`, `/en?p=5` | **falla** | 200 con la home completa y **sin canonical** (la home ES no tiene) | Bajo a medio: duplicados de la home; `?lang=en` (modo de idioma de WPML) muestra la home en español | `?lang=en` → 301 a `/en`. `?p=` y `?page_id=` → 301 a la home o al artículo si se puede resolver por `wp_id`. Además, canonical en la home (punto 4) |
| `/wp-login.php`, `/wp-admin`, `/index.php`, `/sitemap_index.xml`, `/post-sitemap.xml` | falla menor | 200 + `noindex` (HTML de la home) | Bajo: rastreo desperdiciado; los sitemaps viejos de Yoast pueden seguir cargados en Search Console | 301 de `sitemap_index.xml` y `*-sitemap.xml` a `/sitemap.xml`; 410 para `wp-login.php` y `wp-admin` |
| URL del sitemap que redirige | falla menor | `/recursos-descargables/dibujos-para-colorear-condor-andino` está en el sitemap y da 301 | Bajo | Excluirla del sitemap, como las demás que redirigen |

---

## 2. AdSense

| Hallazgo | Estado | Evidencia | Impacto | Fix propuesto |
|---|---|---|---|---|
| Carga del script | OK | Una sola vez, en `src/app/layout.tsx`, con `next/script` `afterInteractive`, `async` y `crossOrigin`. En el navegador: 1 script `adsbygoogle.js` | — | — |
| **Anuncios en la navegación client-side** | **falla (verificado)** | Prueba en el navegador: se entró a `/gastronomia/recoleccion-morillas-…` (1 pedido a `pagead/ads`) y se hizo clic en un link interno. GA4 registró un `page_view` nuevo, pero AdSense **no hizo ningún pedido nuevo** (siguió en 1). Solo hay Auto ads (no existe ningún `<ins class="adsbygoogle">` propio en `src/`): se colocan al cargar la página y, en una navegación del App Router, React reemplaza `<main>` y se lleva los anuncios insertados en el contenido | **Alto.** Cada página vista después de la de entrada sale sin anuncios en el contenido. Explica en parte las 0,44 impresiones de anuncio por página vista (2,66 k / 6,07 k). Además, las "vistas" de AdSense solo cuentan cargas completas, así que subestiman las páginas vistas reales | Unidades manuales en las plantillas de artículo, ficha y guía: un componente cliente que renderiza `<ins>` con `key={pathname}` y hace `adsbygoogle.push({})` al montarse, dentro de un contenedor con `min-height` fijo. Auto ads puede quedar para anchor y vignette. **Contradice la decisión vigente "AdSense: Auto ads + ads.txt" (2026-07-16): hay que aprobarlo** (ver punto 6) |
| Espacio reservado (CLS) | **falla** | Sin unidades manuales no hay espacio reservado. Lighthouse mobile: CLS de 0,27 (Estrecho de Magallanes), 0,116 (hongos en escabeche) y 0,111 (morillas). El elemento que se mueve es el contenedor del artículo con `style="height: auto !important"`, la marca que deja Auto ads al insertar un anuncio. Home: CLS 0 | Medio: CLS > 0,1 es "necesita mejorar" en Core Web Vitals | Lo resuelve el fix anterior (contenedores con alto mínimo). Como complemento, excluir zonas en el panel de Auto ads o bajar la carga de anuncios |
| `ads.txt` | OK | `https://outdoorpatagonia.com/ads.txt` → `google.com, pub-3634364666141836, DIRECT, f08c47fec0942fa0`. El pub ID coincide con el del script. Falla en `www` (ver punto 1) | — | Arreglar `www` |
| CMP para EEE / Reino Unido | dudoso (probablemente OK) | En todas las páginas carga `fundingchoicesmessages.google.com/i/ca-pub-3634364666141836`: hay un mensaje de "Privacidad y mensajes" de Google configurado en AdSense. Desde Argentina, los pedidos salen con `gdpr=0`, como corresponde. No se pudo probar desde una IP europea | Bajo: EEE + RU son ~7 % de las impresiones de Search Console | En AdSense → Privacidad y mensajes: confirmar que el mensaje del RGPD está **publicado** para EEE, Reino Unido y Suiza |
| Caída del 61 % contra el trimestre anterior | dudoso | El trimestre anterior incluye mayo y junio con el WordPress y sus anuncios propios (offline desde el 11/06). DECISIONS (2026-07-16) registra que el 22/09 se encontraron los Auto ads **apagados** en el panel y un experimento de "Optimización automática" que bloqueaba la edición | Explica la caída junto con la fila de navegación client-side | Ver en el panel el desglose por mes y por formato. Si las impresiones no subieron después del 22/09, revisar Optimización → Experimentos |
| El script de AdSense se precarga | falla menor | Next agrega `<link rel="preload" href="…adsbygoogle.js">` y compite con la imagen LCP | Bajo | Se puede dejar: lo resuelve el punto 5 (prioridad de la imagen LCP) |

---

## 3. GA4

| Hallazgo | Estado | Evidencia | Impacto | Fix propuesto |
|---|---|---|---|---|
| Carga única, sin doble conteo | OK | Un solo `gtag.js` (`G-0W9F62HBB7`) y un solo `config` en `layout.tsx`. No hay GTM ni otro tag. En el navegador: 1 script, 1 `config`. En la navegación client-side se mandó **un** `page_view` por cambio de página (medición mejorada por historial). `@vercel/analytics` está en `package.json`, pero no se usa en ningún lado | — | Sacar `@vercel/analytics` de las dependencias si no se va a usar |
| Eventos propios | **falla** | No hay ningún `gtag('event', …)` en `src/`. Solo los automáticos (`page_view`, `scroll`, clics salientes de la medición mejorada) | Medio: no se puede medir qué páginas generan clics en GetYourGuide ni el valor de las guías, que es la prioridad #1 de contenido | Eventos `affiliate_click` (con `partner`, `destino` y `page_path`) en los links de GYG, `newsletter_signup`, `save_item`, `search`. Marcar `affiliate_click` como evento clave |
| Consent Mode | falla menor | Hay CMP de Google (punto 2), pero GA4 no define `gtag('consent', 'default', …)`. En el EEE, GA4 deja cookies antes del consentimiento | Bajo para el tráfico, alto si hay un reclamo legal | Consent Mode v2 con default `denied` para EEE/RU, actualizado por el CMP de Google (soporta Consent Mode de forma nativa) |
| Señales de tráfico bot | dudoso | Sin acceso a GA4 desde acá. Indicio indirecto: AdSense registra ~2 k vistas por mes y Search Console, ~700 clics orgánicos por mes (web + imágenes). Es una proporción razonable para un sitio con tráfico directo y de redes, no muestra bots evidentes | Desconocido | En GA4, revisar: ciudades "Ashburn", "Boardman" o "(not set)" con engagement de ~0 s; picos de tráfico directo; navegador "(not set)"; tasa de interacción por país. Si aparecen, activar el filtro de tráfico interno y comparar con los "accesos no válidos" de AdSense |

---

## 4. SEO técnico

Crawl de las 363 URLs del sitemap (362 dan 200).

| Hallazgo | Estado | Evidencia | Impacto | Fix propuesto |
|---|---|---|---|---|
| **Soft 404 en todo el sitio** | **falla** | `/no-existe-xyz`, `/en/no-existe-xyz` y `/en/fauna/no-existe` devuelven **200** con dos meta robots: `index, follow` (del layout) y `noindex` (lo agrega Next al llamar a `notFound()`). `/fauna/no-existe-xyz` además genera el título "no existe xyz — Fauna de la Patagonia". Causa probable: `src/app/loading.tsx` en la raíz crea un Suspense alrededor de todas las páginas, así que el 200 sale antes de que la página llame a `notFound()` (Next no puede cambiar el status una vez que empezó el streaming) | Medio: Search Console lo informa como soft 404 / "excluida por noindex", se desperdicia rastreo y los errores reales no se ven como 404 | Sacar el `loading.tsx` de la raíz (o bajarlo a los segmentos que lo necesitan) para que `notFound()` devuelva 404 real. En `generateMetadata`, devolver `notFound()` antes de armar el título |
| Títulos y descriptions únicos | OK con detalles | 0 descriptions duplicadas y ninguna vacía. 1 título duplicado: `/parques/patagonia-sc` y `/parques/patagonia-cl` ("Patagonia — Parque Nacional"). 5 títulos de más de 65 caracteres sin la marca (`/arqueologia`, `/volcanes/villarrica`, `/volcanes/mocho-choshuenco`, `/flora/cipres-de-la-cordillera`, `/flora/avellano`). Hay un solo `<h1>` por página, salvo `/planear` (0) y 2 artículos EN con 2 (`nalgene-water-bottle-review`, `rosehip-patagonia`) | Bajo | Distinguir los dos parques Patagonia por país; acortar los 5 títulos |
| Canonical | falla | 359 de 362 tienen canonical igual a su URL. **Sin canonical:** `/` (home ES), `/mapa` y `/planear`. La home sin canonical, más `/?p=…` y `/?lang=en` que dan 200, genera duplicados de la home | Bajo a medio | `alternates.canonical` en esas tres páginas |
| Hreflang recíproco + `x-default` | **falla** | Solo 63 de 362 URLs tienen hreflang, y solo **34 de las 113 en inglés** tienen par. 39 páginas con hreflang **no se incluyen a sí mismas** y no tienen `x-default` (home, `/en`, recursos, categorías, artículos emparejados): Google pide que cada versión se liste a sí misma. 22 apuntan a URLs que no existen (categorías: problema ya registrado en STATUS). 3 no son recíprocos: `/en/flora/chilco`, `/en/flora/alerce` y `/en/fungi/llao-llao-patagonia` apuntan a URLs en español que muestran la ficha del catálogo, y la ficha no apunta de vuelta. Guías (`/destinos` ↔ `/en/guides`): OK, completas y con `x-default` | Medio: el tráfico en inglés (EE. UU. es el 13 % de las impresiones) compite con su par en español o no se le asigna. El emparejamiento de WPML se perdió en la migración | (a) Un helper único de `alternates` que siempre sume la autorreferencia y `x-default`. (b) Recuperar los pares de WPML de forma semiautomática: mismo `cover_image_url` + misma categoría + fecha cercana, revisado a mano y cargado en `src/lib/article-translations.ts`. (c) Que las fichas de catálogo emitan el hreflang de su artículo EN cuando lo tienen |
| Sitemap con los dos idiomas | OK | 363 URLs, 114 en inglés, con `lastmod`. No usa `xhtml:link`, pero el hreflang está en el HTML (es válido). 1 URL redirige (punto 1) | — | — |
| `robots.txt` | OK con detalle | `Allow: /` y el sitemap. No bloquea `/api/`, `/admin/`, `/auth/` ni `/perfil` (el admin está protegido igual) | Bajo | `Disallow` para `/api/`, `/admin/`, `/auth/` y `/perfil` |
| `Article` en JSON-LD | OK con detalles | Artículos: `Article` con `author`, `datePublished`, `image`, `publisher` e `inLanguage`. Falta `dateModified`. En las fichas de gastronomía falta `datePublished`. La `description` del JSON-LD trae entidades HTML sin decodificar (`&#8230;`) | Bajo | Sumar `dateModified` (de `updated_at`) y decodificar la description |
| `BreadcrumbList` | **falla** | Está en guías, parques, senderos, escalada y parte de fauna y flora. **Falta en todos los artículos migrados** (ES y EN), que son las páginas con más tráfico | Bajo a medio: migas en el resultado y mejor lectura de la estructura | Sumarla en `ArticleLayout.tsx`: Inicio → categoría (`categoryHref`) → artículo |
| `TouristDestination` en parques y senderos | falla | `/parques/*` (28) y `/senderos/*` (12) solo tienen `BreadcrumbList`. `.claude/rules/seo-geo.md` pide `TouristDestination` con `geo` | Bajo a medio (GEO / AI overviews) | Sumarlo desde el catálogo, que ya tiene coordenadas |
| Home sin JSON-LD | falla menor | `/` y `/en` no tienen `WebSite` ni `Organization` | Bajo | `WebSite` (con `SearchAction` a `/buscar`) + `Organization` con el logo |

---

## 5. Performance (Lighthouse mobile)

Lighthouse 12.8.2 local, mobile con throttling simulado, 29/10/2026. Los 3 artículos son los de más clics en Search Console en los últimos 28 días. Sin datos de campo: PageSpeed Insights estaba sin cuota y el sitio probablemente no llega al mínimo de tráfico de CrUX. **INP** no se mide en laboratorio; el TBT (90 a 160 ms) sugiere que no es un problema.

| Página | Score | FCP | LCP | TBT | CLS | Peso | Elemento LCP |
|---|---|---|---|---|---|---|---|
| `/` | 56 | 6,1 s | **13,5 s** | 90 ms | 0 | 2.140 KB | `<img>` del hero (Wikimedia, 1920 px) |
| `/en/history/strait-of-magellan-history-significance` | 48 | 2,4 s | **12,5 s** | 90 ms | **0,27** | 3.291 KB | `<img>` de `DetailHero` (Supabase) |
| `/gastronomia/hongos-de-pino-en-escabeche` | 63 | 1,7 s | **10,7 s** | 160 ms | **0,116** | 1.429 KB | `<img>` de `DetailHero` (Supabase) |
| `/gastronomia/recoleccion-morillas-patagonia-consejos` | 87 | 1,9 s | 2,5 s | 150 ms | **0,111** | 1.396 KB | párrafo (sin foto en el hero) |

**Terceros por página:** gtag.js ~197 KB, AdSense/DoubleClick 284 a 570 KB, Funding Choices 78 KB. En total, **560 a 850 KB de Google** por página, con 300 a 440 ms de CPU solo para AdSense. El artículo del Estrecho de Magallanes carga además un iframe de YouTube de **994 KB** al abrir la página: el contenido de WP tiene `class="lazyload"`, pero el script de lazyload de WordPress ya no existe.

| Hallazgo | Estado | Evidencia | Impacto | Fix propuesto |
|---|---|---|---|---|
| Imagen del hero sin prioridad | **falla** | `DetailHero.tsx` usa `<img>` sin `fetchPriority` ni preload y sirve el JPG original de Supabase sin redimensionar. Fases del LCP: 4,2 a 6,8 s de "load delay". En cambio, se precargan 4 logos SVG (~150 KB: `op_01`, `op_02`, `op_02_dark`, `op_03`) y los scripts de AdSense y GA. El hero de la home tiene `fetchPriority="high"`, pero es una miniatura de Wikimedia de 1920 px (364 KB) | **Alto**: el LCP de 10 a 13 s se explica casi entero por esto | `fetchPriority="high"` + `<link rel="preload">` de la imagen LCP; servirla redimensionada (render transformations de Supabase Storage o `next/image` con el host de Supabase en `remotePatterns`); en mobile, pedir una miniatura de 960 px en lugar de 1920 px |
| `loading.tsx` de la raíz | **falla** | Pantalla completa `fixed inset-0 z-50` con el logo animado. Está en el HTML de **todas** las páginas como fallback de Suspense y tapa el contenido hasta que llega el resto del stream. Home: FCP 6,1 s y 4 s de "render delay" del LCP | Alto en la home, medio en el resto. Además causa el soft 404 (punto 4) | Sacarlo de la raíz. Si hace falta feedback de carga, un skeleton por segmento que no tape el header |
| Todo dinámico, sin caché | **falla** | `layout.tsx` hace `await headers()` (para leer `x-pathname` y decidir el idioma), así que **todas** las rutas se renderizan en cada request: `cache-control: private, no-store`, `x-vercel-cache: MISS`. TTFB medido desde Argentina: ~1,0 s en las páginas, contra 0,26 s de un archivo estático. `x-vercel-id: gru1::iad1`: la función corre en Washington y el visitante es de Argentina. Además, `proxy.ts` hace una consulta a Supabase en cada URL de 1 segmento y en cada URL de 2 o más (todas las fichas y todos los artículos), y corre también en `ads.txt`, `robots.txt` y `sitemap.xml` (TTFB de 0,53 s en `ads.txt`, que es un HIT de caché) | Medio a alto: suma ~1 s a cada página, más costo en Vercel y en Supabase | (a) Sacar el idioma del layout: dos root layouts (`app/(es)/layout.tsx` y `app/en/layout.tsx`) o `lang` desde el segmento, para que las páginas puedan ser estáticas/ISR. (b) En `proxy.ts`, consultar la base solo si la URL no es una ruta conocida (catálogos, `/destinos`, etc.) y excluir del matcher `ads.txt`, `robots.txt`, `sitemap.xml` y `.ico`. (c) Revisar la región de la función contra la de Supabase y acercarlas. **Toca la trampa del layout de CLAUDE.md** (ver punto 6) |
| Iframe de YouTube eager | falla | 994 KB en el artículo con más clics | Medio en ese artículo | Al renderizar el HTML del artículo, pasar `loading="lazy"` a los iframes, o mostrar una miniatura que cargue el video al hacer clic |
| Imágenes sin formato moderno ni tamaño responsive | falla | Home: 237 KB de ahorro posible por tamaño y 401 KB por formato. Strait: 396 KB | Medio | Sale con el fix de la imagen del hero |
| CLS | falla | Ver punto 2 (Auto ads) | Medio | Ver punto 2 |
| JS propio | OK | TBT de 90 a 160 ms. La home tiene 1.602 nodos en el DOM y 374 KB de HTML (`/en`: 414 KB), con payload de RSC grande | Bajo | Revisar el payload de la home si se busca más velocidad |

---

## 6. Puntos del plan que tocan decisiones vigentes

| Fix propuesto | Decisión vigente | Qué pasa | Qué hace falta |
|---|---|---|---|
| Unidades de AdSense manuales en artículos, fichas y guías (punto 2) | **2026-07-16 — AdSense: Auto ads + ads.txt** | La decisión es Auto ads. Con Auto ads solos, el sitio pierde los anuncios en cada navegación interna y genera CLS | **Aprobación de la usuaria** para pasar a unidades manuales + Auto ads solo para anchor/vignette. Si se aprueba, la nueva decisión reemplaza a la de 2026-07-16 |
| Sacar `headers()` del layout para cachear las páginas (punto 5) | **2026-10-27 — Selector de idioma** y **2026-10-22 — Header/footer en inglés**, más la trampa de CLAUDE.md ("el layout lo calcula en el servidor") | No las contradice en el resultado (header y footer siguen en el idioma de la ruta), pero cambia el mecanismo que esas decisiones y la trampa describen | Decidirlo como cambio de arquitectura y actualizar la trampa de `CLAUDE.md` |
| Redirects nuevos de WP (punto 1) | **2026-07-09 — Redirects de URLs viejas en `proxy.ts`** | Compatible si van en `proxy.ts`. No sumarlos a `vercel.json` (hoy solo saca la barra final) | Nada |
| `/wp-content/uploads` → Supabase (punto 1) | 2026-07-09 (idem) | El redirect va en `proxy.ts`, pero antes hay que cambiar la regla del firewall de Vercel, que es configuración del panel | Que la usuaria ajuste la regla del firewall (o que lo apruebe) |
| Emparejar ~80 artículos ES ↔ EN (punto 4) | **2026-10-22 — Pares ES ↔ EN con slug distinto** (mapa en código, sin columna nueva) | Compatible si los pares van a `src/lib/article-translations.ts`. Con ~80 pares el mapa crece mucho, y ahí puede convenir una columna `translation_of` | Si se prefiere la columna, es una decisión nueva que reemplaza a la de 2026-10-22 |
| GetYourGuide en los artículos de más tráfico (punto 2/3) | **2026-10-01 — Guías por destino = prioridad #1** y "GetYourGuide es el único afiliado activo" | No hay contradicción, pero sí tensión de prioridades: el tráfico de hoy está en fauna, flora y gastronomía (hongos, morillas, tero, Estrecho de Magallanes), no en las guías. Un bloque "Excursiones cerca" en los artículos con lugar asociado monetiza ese tráfico sin cambiar el foco de contenido | Decidir si se suma GYG contextual a los artículos (solo donde hay un lugar con excursiones, sin forzarlo en recetas) |
| Consent Mode y CMP (puntos 2 y 3) | Ninguna | — | — |

---

## Próximos pasos sugeridos (en este orden)

1. **Configuración, sin código (la usuaria):** apuntar `www` a Vercel; excluir `/wp-content/uploads/` del firewall; confirmar en AdSense que el mensaje del RGPD está publicado y revisar Optimización → Experimentos; revisar en GA4 las señales de bots.
2. **Performance:** sacar `loading.tsx` de la raíz (también arregla el soft 404) y dar prioridad a la imagen del hero redimensionada. Es lo que más baja el LCP con menos cambios.
3. **AdSense:** unidades manuales con alto reservado (requiere aprobar el cambio de la decisión del 2026-07-16).
4. **Monetización:** evento `affiliate_click` en GA4 y GYG contextual en los artículos con lugar.
5. **SEO:** redirects de patrones de WP en `proxy.ts`, canonical de la home, helper de hreflang con autorreferencia y `x-default`, `BreadcrumbList` en artículos, `TouristDestination` en parques y senderos.
6. **Arquitectura:** sacar `headers()` del layout y cachear (más grande; decidirlo aparte).
7. **Contenido:** recuperar los pares ES ↔ EN de WPML.
