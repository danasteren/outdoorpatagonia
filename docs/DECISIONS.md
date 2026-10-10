# DECISIONS

> Registro de decisiones, con la más nueva arriba. No se borra nada: si una decisión cambia, se agrega una nueva y la vieja se marca `Reemplazada por …`.
> Las reglas vigentes viven en `CLAUDE.md` y `.claude/rules/`. Acá van el **porqué** y el contexto.
> Si un motivo dice _(a completar)_, completarlo cuando se sepa. No inventarlo.

Formato:

```
## AAAA-MM-DD — Título corto
**Decisión:** qué se decidió.
**Motivo:** por qué.
**Detalle:** alcance, alternativas descartadas, archivos afectados.
**Estado:** Vigente | Reemplazada por <fecha — título>
```

---

## 2026-10-10 — Code commitea, la usuaria pushea
**Decisión:** al cerrar una tarea, Code hace commit en `main` (sin rama ni PR) y la usuaria hace el push. Las rutinas en la nube siguen abriendo PR.
**Motivo:** la usuaria lo confirmó en la auditoría del contexto. Así queda la regla del 2026-09-24, que el workflow de 2026-10-07 había cambiado sin querer a "commit y push".
**Detalle:** `CLAUDE.md` → Workflow, paso 5.
**Estado:** Vigente

## 2026-10-07 — Contexto compartido entre el chat y Code
**Decisión:** el repo es la única fuente de verdad. `CLAUDE.md` es el archivo real con lo general, los flujos temáticos van a `.claude/rules/`, y el estado y las decisiones a `docs/STATUS.md` y `docs/DECISIONS.md`. `AGENTS.md` queda como una línea que remite a `CLAUDE.md`.
**Motivo:** el Proyecto del chat sincroniza desde GitHub solo `CLAUDE.md`, `docs/` y `.claude/rules/`. Antes, `CLAUDE.md` era `@AGENTS.md` y el chat no veía nada.
**Detalle:** el flujo es: el chat decide → Code implementa → Code actualiza los docs → commit y push → se sincroniza el chat. El contenido de `AGENTS.md` se movió casi textual. Lo que era estado (foco actual, rutina) pasó a STATUS y a esta lista. El 2026-10-10 se auditó contra el código y se pasaron acá las decisiones que estaban solo en la memoria de Code.
**Estado:** Vigente (el push: ver 2026-10-10)

## 2026-10-03 — Escalada: solo datos con fuente, cargados desde guías por zona
**Decisión:** los sectores de escalada se cargan vía por vía desde guías publicadas, con crédito visible a la guía. Lo que no tiene fuente no se carga.
**Motivo:** los 11 sectores originales (Fitz Roy, Cerro Torre, Piedra Parada, etc.) tenían datos sin fuente. Además, se quiere apoyar a quienes hacen las guías (Esqala, de Esquel).
**Detalle:** `.claude/rules/escalada.md`. Primera zona: Esquel (guía Esqala v1.1, 2021).
**Estado:** Vigente

## 2026-10-02 — Artículos viejos de un destino → 301 a su guía
**Decisión:** cuando sale la guía de un destino, los artículos viejos sobre ese destino redirigen con 301 a la guía y salen del sitemap (`LEGACY_TO_GUIDE`).
**Motivo:** que el sitio no compita consigo mismo por las mismas búsquedas.
**Detalle:** `src/lib/destinos/redirects.ts` + `src/proxy.ts`.
**Estado:** Vigente

## 2026-10-02 — "Destinos" entra al nav con la 6ª guía
**Decisión:** "Destinos" se suma al menú y a la home en el mismo cambio que agrega la 6ª guía.
**Motivo:** es la regla de masa crítica (ver 2026-07-13) aplicada a destinos.
**Estado:** Vigente

## 2026-10-01 — Guías de viaje por destino = prioridad #1 de contenido
**Decisión:** el foco de contenido pasa a ser las guías por destino, en ES y EN, en el orden de `seo/destinos-prioridad.md`. Las produce una rutina semanal por PR.
**Motivo:** las búsquedas de viaje y destinos tenían unas 3.200 impresiones en 90 días, contra 39.000 de fauna. El sitio casi no competía en el tema con más volumen y mejor monetización (GetYourGuide + AdSense). Además, el clima en vivo que ya tenía el sitio es una ventaja frente a un blog común.
**Detalle:** la primera guía fue Ushuaia (2026-10-01), la segunda El Calafate (2026-10-03) y la tercera Bariloche. Cómo se arma una guía: `.claude/rules/destinos.md`. Fauna y flora quedan como contenido de soporte (relacionados). En inglés se usa `/en/guides/` porque `/en/destinations/` choca con una categoría de artículos viejos. Ese mismo día se activó `max-image-preview:large` para Google Discover.
**Estado:** Vigente

## 2026-09-30 — Amazon dado de baja como afiliado
**Decisión:** se sacan todos los links de Amazon. GetYourGuide queda como único afiliado activo.
**Motivo:** el 2026-09-24 Amazon cerró la cuenta de afiliados (`outdoorpata0b-20`) por no llegar a 3 ventas calificadas en 180 días. Sin tráfico de compra no tiene sentido volver a aplicar.
**Detalle:** commit `f83e82a` (ProductosRecomendados, `amazon.ts` y el equipo del planificador y de senderos, ahora sin link).
**Estado:** Vigente

## 2026-09-30 — Títulos SEO nunca en formato pregunta
**Decisión:** los `seo_title` y `metaTitle` arrancan con la keyword principal. No se usan títulos-pregunta ni se pone la marca en `title`.
**Motivo:** 151 artículos migrados de WordPress tenían títulos-pregunta: 38.761 impresiones y 88 clics en 90 días (CTR 0,23 %).
**Detalle:** se reescribieron con `seo/updates/2026-09-30-titulos-articulos.sql` (corrido a mano en el SQL Editor). La marca duplicada se sacó de unos 30 títulos (commit `d5feb04`). Regla en `.claude/rules/seo-geo.md`. Medir el CTR a fines de octubre de 2026.
**Estado:** Vigente

## 2026-09-29 — Novedades se actualizan solas en cada cambio visible
**Decisión:** Code actualiza `src/data/novedades.ts` al terminar cualquier tarea con cambios que ve el lector, en el mismo commit y sin que se lo pidan.
**Motivo:** novedades llevaba 3 meses atrasada: desde la 1.4 de julio había 61 commits sin registrar.
**Detalle:** `.claude/rules/novedades.md`.
**Estado:** Vigente

## 2026-09-29 — Los PR de las rutinas se publican desde `/admin/agentes`
**Decisión:** las rutinas abren PR y la usuaria los publica o descarta desde `/admin/agentes`, sin entrar a GitHub.
**Motivo:** la usuaria no quiere entrar a GitHub a mergear. El auto-merge y el push directo a `main` desde la rutina los bloquea el clasificador (merge sin revisión), salvo pedido explícito.
**Detalle:** `src/lib/agentes/github.ts`, con `GITHUB_TOKEN` fine-grained (contents + pull requests). Las rutinas usan la Claude GitHub App (instalada el 2026-09-26) y Search Console con la credencial "GCP access token" del entorno cloud (`GSC_AUTH=proxy`), no con una variable de entorno visible.
**Estado:** Vigente

## 2026-09-24 — Code commitea en main, sin PR
**Decisión:** el trabajo local de Code va en commit directo a `main`, sin rama ni PR. El push lo hace la usuaria.
**Motivo:** la usuaria lo pidió después de que se abrieran los PR #1 y #2 desde sesiones locales.
**Estado:** Vigente (confirmada el 2026-10-10)

## 2026-09-14 — Newsletter propio en Supabase + Resend
**Decisión:** se deja MailerLite y la lista pasa a la tabla `subscribers` de Supabase, con envío por Resend y composer de campañas en `/admin`.
**Motivo:** tener el control de la lista para newsletters y alertas propias, sin depender de MailerLite (tenía 48 suscriptores).
**Detalle:** migraciones `005_newsletter_subscribers` y `008_form_antispam` (honeypot + rate limit en la DB). Resend se paga aparte y se comparte con otro proyecto.
**Estado:** Vigente

## 2026-07-13 — Secciones nuevas: relacionados simétricos y nav por masa crítica
**Decisión:** las entradas de los catálogos se conectan con `relacionados` simétricos. Una sección nueva no entra al nav hasta tener unas 6 a 8 entradas.
**Motivo:** no ocupar el nav con secciones de 1 o 2 entradas. Hasta entonces se llega a ellas por relacionados y por el buscador.
**Detalle:** nació con `/termas`. `.claude/rules/relacionados.md`.
**Estado:** Vigente

## 2026-07-16 — AdSense: Auto ads + ads.txt
**Decisión:** se activan Auto ads y se publica `public/ads.txt`.
**Motivo:** desde la migración, el script de AdSense cargaba pero no había ni una unidad de anuncio, y faltaba `ads.txt`.
**Detalle:** el 2026-09-22 se encontró que en el panel los anuncios automáticos estaban apagados y que un experimento de "Optimización automática" de Google bloqueaba la edición. Si caen las impresiones, revisar primero Optimización → Experimentos en el panel.
**Estado:** Vigente

## 2026-07 — Escalar contenido por keywords, preguntando antes de abrir sección
**Decisión:** el contenido nuevo sale de keywords con volumen alto y competencia baja, en las secciones existentes. Una sección nueva se le pregunta antes a la usuaria. No se revisa cada página: se marcan los datos que no se pudieron verificar en fuente primaria.
**Motivo:** el crecimiento se apuesta a SEO orgánico. La usuaria delega la ejecución y también las decisiones de arquitectura de información.
**Detalle:** el foco temático cambió el 2026-10-01 (destinos).
**Estado:** Vigente

## 2026-07-09 — Redirects de URLs viejas en `proxy.ts`, nunca en el page
**Decisión:** toda normalización de URLs viejas se hace en `src/proxy.ts`. Para 2 o más segmentos, se busca el artículo por el último segmento y se hace un 301 a su URL canónica.
**Motivo:** `redirect()` en un Server Component devolvía 200 + meta-refresh. Los artículos se servían en URLs equivocadas (contenido duplicado) y los links viejos de WordPress daban 404.
**Detalle:** trampa en `CLAUDE.md`.
**Estado:** Vigente

## 2026-06-16 — URLs `/{categoria}/{slug}` iguales a las de WordPress
**Decisión:** los artículos migrados conservan la URL de WordPress `/{categoria}/{slug}`. Las URLs planas y con barra final redirigen con 301.
**Motivo:** conservar el posicionamiento y los backlinks del WordPress.
**Detalle:** `src/proxy.ts` y `vercel.json`.
**Estado:** Vigente

## 2026-06-30 — Booking dado de baja; IDs externos siempre verificados
**Decisión:** (1) se saca Booking del sitio. (2) No se hardcodean IDs de APIs externas sin verificarlos contra la API.
**Motivo:** (1) el alta en Booking Partner Hub fallaba siempre, y el `aid=2311236` que había en el código nunca se confirmó como cuenta propia. (2) Los taxonId y gbifKey inventados en fauna apuntaban a especies equivocadas (Madagascar, Filipinas, una tortuga en vez del guanaco) y hicieron falta dos fixes.
**Detalle:** si se quiere monetizar alojamiento, evaluar un agregador (por ejemplo TravelPayouts) en vez de Booking directo. Fauna y flora resuelven la taxonomía GBIF por `scientificName`.
**Estado:** Vigente

## 2026-06-02 — Migración de WordPress a Next.js + Supabase + Vercel
**Decisión:** se deja el WordPress (Impreza + WPML + Yoast) y se reconstruye el sitio en Next.js, con los artículos migrados a Supabase.
**Motivo:** el WordPress era lento y no soportaba un producto de plataforma: datos en vivo, mapa y planificador de viaje.
**Detalle:** el WordPress está offline desde el 2026-06-11 (DNS por Cloudflare, apuntando a Vercel). Login con Google por PKCE manual, para controlar el redirect URI y no mostrarle al usuario la URL de Supabase. Mapas con `react-leaflet` + OSM (`maplibre-gl` descartado: pantalla gris). El script de migración está en `scripts/migrate_wp_articles.py`. `proxy.ts` reemplaza a `middleware.ts` porque está deprecado en Next.js 16.
**Estado:** Vigente
