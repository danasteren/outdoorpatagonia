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

## 2026-10-28 — Las rutinas de SEO/CTR y newsletter vuelven como tareas locales
**Decisión:** la auditoría SEO/CTR y el borrador del newsletter se recrean como tareas programadas locales de la app de escritorio (lunes 09:30 y 10:00), igual que `guia-destino-diaria`. La de CTR abre PR; la del newsletter es de solo lectura.
**Motivo:** las rutinas en la nube ya no existían (la lista de `RemoteTrigger` está vacía) y la de guías funciona bien como tarea local. La usuaria pidió recrearlas.
**Detalle:** prompts en `~/.claude/scheduled-tasks/auditoria-ctr-semanal/` y `borrador-newsletter-semanal/`, adaptados de los viejos a las reglas actuales (`CLAUDE.md`, `.claude/rules/`). Search Console se lee con la cuenta de servicio local (`GSC_SERVICE_ACCOUNT_FILE`), probada el 2026-10-28. Cambio respecto de la rutina vieja: los títulos de artículos de Supabase ya no quedan solo como propuesta en el PR, sino en un SQL de `seo/updates/` para correr a mano. Las propuestas del PR #6 para 6 artículos (ciervo colorado, liebre europea, tero, monito del monte, loica, estrecho de Magallanes) nunca se aplicaron. La rutina las va a volver a tomar porque siguen con CTR bajo.
**Estado:** Vigente

## 2026-10-27 — La home en inglés es la misma que la de español
**Decisión:** /en usa la misma estructura y los mismos componentes que la home en español, con los textos en inglés. Las secciones sin versión en inglés llevan a la página en español con el nombre traducido, igual que el header. Al final se suman los últimos artículos en inglés.
**Motivo:** la home en inglés se veía como otro sitio. Desde que el header en inglés enlaza a las secciones en español, ya no hace falta limitarla a lo que existe en inglés.
**Detalle:** los componentes de la home reciben `lang`. Lo que solo existe en español y no tiene sentido traducir (por ejemplo, las publicaciones de /ahora) no se muestra en inglés. Implementación (2026-10-28): `Hero`, `TopicCard`, `EscaladaSection`, `StatusBoard` (y sus secciones), `EstadoCTA` y `OzoneSection` reciben `lang`, con español por defecto (`/estado` y `/astronomia` no cambian). Las tarjetas de tema salen de `src/lib/home-topics.ts`: cada tarjeta suma descripción y color a un item del menú, y nombre, ícono y link salen de `src/lib/nav-items.ts`, adonde pasaron `EXPLORE_ITEMS`, `PLAN_ITEMS` y el nuevo `TOOL_ITEMS` (Mapa, Operadores) desde `HeaderShell.tsx`. En cada idioma se ordenan por nombre, como el menú. Hero: se tradujeron el badge, la bajada, los botones, el dato del día y el crédito; el `h1` en inglés es la traducción literal del actual (el título nuevo se define aparte). El dato del día en inglés sale de la intro de las guías de destino, porque parques y senderos solo tienen texto en español. iNaturalist recibe `locale` para dar los nombres comunes en inglés. `wmoToCondition` y `getMoonData` aceptan `lang` (la condición en inglés que tenía `DestinoGuide` pasó a `openmeteo.ts`). Los links de /en a páginas en español usan `SiteLink` (`<a>` con carga completa, por la trampa del layout de CLAUDE.md). Los temas por categoría de artículos en inglés (`/en/category/*`) dejaron de estar en la home.
**Estado:** Vigente. Reemplaza a 2026-10-22 — Home en inglés con el diseño del sitio.

## 2026-10-27 — /mapa a pantalla completa, sin footer
**Decisión:** `/mapa` ocupa exactamente el viewport: header con su alto real arriba y el mapa llenando el resto, sin footer. En mobile no se ve el hero (el `h1` queda con `sr-only`). Con la ficha de un punto abierta, los controles quedan debajo del backdrop.
**Motivo:** en mobile el mapa era `fixed` con `top: 8rem`: por el hueco se veían el hero y el footer, la página scrolleaba y los controles de capas y zoom (z-1000) tapaban la ficha (z-800).
**Detalle:** el alto sale de CSS y no de medir el header: `body:has([data-map-fullscreen])` pasa a `height: 100dvh` + `overflow: hidden` y `main` a flex columna (`globals.css`); `MapPageClient` lleva el atributo. Así funciona también al llegar con `<Link>`, donde el layout no se vuelve a renderizar. Por el mismo motivo el footer se oculta con `HideOnPaths` (componente cliente con `usePathname`) y no leyendo `x-pathname` en el layout. El contenedor del mapa tiene `isolate` (los z-index de Leaflet, hasta 1000, quedan adentro y no pasan por encima del header ni de la ficha) y `overflow-hidden` (el bottom sheet cerrado, con `translate-y-full`, agregaba 23px de scroll). Capas: controles z-10, backdrop y panel desktop z-20, bottom sheet z-30. Zoom y capas suman `env(safe-area-inset-*)`. Desktop no cambia: hero compacto, panel lateral y controles en el mismo lugar.
**Estado:** Vigente

## 2026-10-27 — Selector de idioma en el header
**Decisión:** el header muestra ES | EN en todas las páginas. Lleva al par de la página actual (el mismo que su hreflang). Si no hay par, lleva a la home del otro idioma.
**Motivo:** hoy solo se puede cambiar de idioma desde el sidebar de los artículos. El resto del sitio no tiene forma de llegar a la otra versión.
**Detalle:** se reutiliza src/components/LangToggle.tsx. El par sale de la misma fuente que alternates.languages (incluye article-translations.ts y destinos ↔ /en/guides). Implementación: `src/lib/lang-alternate.ts` no tiene mapa propio; lee en el navegador el `<link rel="alternate" hreflang>` que ya renderiza la metadata de la página (y lo vuelve a leer en cada navegación, porque la metadata se streamea). Sin par, va a `/en#sin-traduccion` o `/#sin-traduccion`, y `LangFallbackNotice` muestra un aviso cerrable debajo del header. Excepción: en `/categoria/*` y `/en/category/*` se ignora el hreflang porque apunta a URLs que dan 404 (ver STATUS); el hreflang de categorías no se tocó. El link al otro idioma es un `<a>` (carga completa) y no un `<Link>`, porque el layout toma el idioma de la ruta en el servidor y una navegación del cliente dejaba header y footer en el idioma anterior. Se sumó el hreflang `en` que faltaba en `/`, `/contacto`, `/privacidad` y `/terminos` (las versiones en inglés ya apuntaban a ellas). El link "Read in English" del sidebar de los artículos se queda, pero también pasa a `<a>` (`ArticleLayout.tsx`), por el mismo motivo.
**Estado:** Vigente

## 2026-10-27 — Se restaura /recursos-viaje-patagonia
**Decisión:** vuelve la página de recursos en español, como par de /en/resources-traveling-patagonia.
**Motivo:** el footer la linkea y el hreflang de la versión en inglés apunta a ella. Hoy da 404. El borrado del 19/06 dejó la versión en inglés sin par.
**Detalle:** se toma de la historia de git (276e364^) y se adapta al diseño actual (PageHero). Los links son solo de organismos o sitios oficiales. Los links y textos de las dos páginas salen de un solo archivo (`src/lib/recursos.ts`, renderizado por `src/components/TravelResources.tsx`), así ES y EN no se desalinean. Criterio aplicado: para información (parques, clima, turismo, emergencias), solo organismos; para herramientas (Waze, Maps.me, iNaturalist, Wikiloc, Ruta 0) y la Guía Esqala, su sitio propio. Se sacaron Visit Chile (sitio comercial de tours; en su lugar va chile.travel, el oficial) y Comarca Una (guía privada, sin respaldo oficial a la vista). Gendarmería pasa a `argentina.gob.ar/gendarmeria` porque `gendarmeria.gob.ar` no responde. `patagonia-chile.com` se queda: es sitio de Sernatur.
**Estado:** Vigente

## 2026-10-22 — Guía de Punta Arenas: alcance y datos que no se publican
**Decisión:** la guía #7 se publica como `/destinos/punta-arenas` y `/en/guides/punta-arenas`. No se redirige ningún artículo viejo (no hay ninguno de Punta Arenas; el del Estrecho de Magallanes es de historia y sigue vivo). Los parques Alberto de Agostini y Cabo de Hornos suman el campo `relacionados` hacia la guía.
**Motivo:** no hay artículos que compitan con la guía. Pali Aike, la Reserva Nacional Magallanes y el Monumento Natural Los Pingüinos no tienen página en `parques`, así que quedan dentro de la guía.
**Detalle:** decidido por la rutina diaria sin supervisión; revisable en el PR. No se publican: precios de entradas ni del ferry, la pingüinera de Seno Otway (sin fuente oficial), la duración del cruce a Porvenir, ni los meses exactos de la temporada de ballenas. Fuerte Bulnes figura a 58 km (Consejo de Monumentos Nacionales); Sernatur dice 52 km. El Museo Regional de Magallanes se menciona como cerrado por restauración (Serpat, diciembre de 2025).
**Estado:** Vigente

## 2026-10-22 — Footer en inglés en las páginas /en
**Decisión:** en las páginas `/en` el footer se muestra en inglés. Los links van a la versión en inglés cuando existe (sobre nosotros, contacto, privacidad, términos, recursos de viaje, guías) y a la de español cuando no (mapa, astronomía, operadores, novedades). "Artículos" lleva a `/en`, que lista los últimos artículos, porque no hay índice de artículos en inglés.
**Motivo:** la usuaria lo pidió, siguiendo con el header.
**Detalle:** `src/components/Footer.tsx` (recibe `lang` desde `layout.tsx`), `NewsletterForm` y `subscribeNewsletter` (los errores se traducen según un campo oculto `lang`). En la columna Explorar del inglés, "Arqueología" se cambió por las guías de viaje, que sí tienen versión en inglés. Los suscriptores siguen sin idioma guardado (ver STATUS).
**Estado:** Vigente

## 2026-10-22 — Header en inglés en las páginas /en
**Decisión:** en las páginas `/en` el header y el buscador se muestran en inglés. Las secciones del menú que no tienen versión en inglés llevan igual a la página en español (con el nombre traducido); Destinos lleva a `/en/guides`.
**Motivo:** la usuaria lo pidió: el menú en español en las páginas en inglés no tenía sentido para ese lector.
**Detalle:** `src/components/HeaderShell.tsx` pasó a una sola lista de secciones (`EXPLORE_ITEMS`, `PLAN_ITEMS`) con el texto en los dos idiomas, que usan desktop y mobile (antes estaban duplicadas). En inglés se ordenan por el nombre en inglés. `SearchOverlay` y `DarkModeToggle` reciben `lang`. El link al mapa en inglés apuntaba a `/en/mapa`, que no existe (404): ahora va a `/mapa`. El footer no se tocó.
**Estado:** Vigente

## 2026-10-22 — Home en inglés con el diseño del sitio
**Decisión:** `/en` deja de ser un listado de blog y se arma como la home en español con lo que existe en inglés: `PageHero`, "Explore by topic" con las categorías de los artículos en inglés (`/en/category/*`), el bloque de guías de viaje y los últimos 12 artículos con `ArticleTile`.
**Motivo:** la usuaria pidió pasar también la home en inglés al diseño del sitio. La home en español usa secciones que solo existen en español (hero con datos del día, estado en vivo, escalada), así que no se tradujo tal cual.
**Detalle:** las tarjetas de tema salieron a `src/components/home/TopicCard.tsx` (las usan las dos homes) y `DestinosSection` recibe `lang`. "Sin categorizar" no aparece como tema. Los temas se ordenan por cantidad de artículos y no cuentan los que redirigen a una guía. `ArticleCard` se borró porque ya no lo usaba nadie. El header del sitio sigue en español en las páginas en inglés (no se tocó).
**Estado:** Reemplazada por 2026-10-27 — La home en inglés es la misma que la de español

## 2026-10-22 — Los artículos se ven como el resto del sitio
**Decisión:** la página de artículo deja el formato de blog (badge, título suelto, portada en el cuerpo) y usa el de las fichas de catálogo: `DetailHero` con la portada, columna principal con el texto y sidebar con datos (categoría, fecha, lectura), idioma y tags. Los listados de artículos usan `ArticleTile`, la tarjeta compacta de los catálogos, en lugar de `ArticleCard`.
**Motivo:** la usuaria pidió que todo se vea como el sitio: con "una sola página por temática", los artículos quedaban debajo del catálogo con un estilo de blog que no combinaba.
**Detalle:** `src/components/ArticleLayout.tsx` (lo usan las cuatro rutas de artículos) y `src/components/ArticleTile.tsx` (bloque de las secciones, `/categoria`, `/en/category` y `/articulos`). En los artículos migrados no se muestra el excerpt: es el corte automático de WordPress y repite el primer párrafo. El aviso de "artículo del sitio anterior" pasó abajo del hero porque los botones fijos de `HeroActions` lo tapaban. `DetailHero`: alto mínimo en vez de fijo (los títulos de artículo son largos) y crédito de foto debajo del título en celular. `ArticleCard` queda solo en la home en inglés.
**Estado:** Vigente

## 2026-10-22 — Una sola página por temática
**Decisión:** las categorías de artículos que tienen sección propia se muestran dentro de esa sección (catálogo arriba y artículos del blog abajo), y /categoria/{slug} redirige con 301 a la sección. Las categorías sin sección, y todas las de /en/category/, se quedan en su URL con el mismo diseño que las secciones.
**Motivo:** convivían dos páginas por temática: la sección con catálogo (la que enlaza el menú) y un listado genérico de artículos al que solo se llegaba desde la etiqueta de categoría. Eso partía el contenido, dejaba los artículos sin enlaces desde las secciones y se veía distinto al resto del sitio.
**Detalle:** generaliza lo que ya se hizo con gastronomía (redirect en proxy.ts, categoryHref, exclusión en el sitemap). El emparejamiento categoría → sección vive en un solo lugar (src/lib/category.ts). Solo entran las coincidencias exactas de slug; las dudosas quedan pendientes en STATUS. Las URLs de los artículos no cambian. Implementación: entraron fauna, flora y gastronomía. El bloque "Artículos" (`src/components/SectionArticles.tsx`) deja afuera los artículos con el mismo slug que una ficha del catálogo (la ruta muestra la ficha, no el artículo), así que en gastronomía no aparece: sus 9 artículos ES son fichas. También deja afuera los que redirigen; esos 301 (guías y fichas, como frutos rojos → calafate) pasaron a `src/lib/article-redirects.ts`, que leen proxy.ts, el sitemap, las secciones y las páginas de categoría. El sitemap dejó de listar artículos con la misma URL que una ficha (antes solo se hacía con gastronomía). Con barra final, `/categoria/flora/` hace 308 (Next) y después el 301. Encabezado de las categorías: `PageHero`, con `CollectionPage` en JSON-LD.
**Estado:** Vigente

## 2026-10-22 — Las tarjetas de artículo son links reales
**Decisión:** Toda tarjeta que lleve a un artículo usa <a href> (next/link) para navegar. No se usa onClick + router.push.
**Motivo:** Google solo sigue enlaces <a href>. Con el div clickeable, las páginas de categoría y los listados no le pasaban enlaces internos a los artículos.
**Detalle:** El link de categoría que va adentro de la tarjeta no puede quedar anidado dentro de otro <a>. Se resuelve con el patrón de link estirado (stretched link). Aplicado en `src/components/ArticleCard.tsx`, que pasó a server component; al 2026-10-22 ningún otro componente de tarjeta navega con `router.push` (solo el Enter del buscador, `SearchOverlay.tsx`).
**Estado:** Vigente

## 2026-10-22 — Tulipanes de Trevelin: artículo nuevo en `articles` (flora), sin sección propia
**Decisión:** el campo de tulipanes de Trevelin se publica como dos filas nuevas de `articles` (categoría `Flora`): `/flora/tulipanes-trevelin` y `/en/flora/trevelin-tulip-fields`. Slugs sin año; el año va solo en el texto ("temporada 2026"). Datos solo de la página oficial de entradas de Tulipanes Patagonia (temporada estimada 7/10 al 7/11/2026, $45.000 por persona, pago en el lugar, sin reserva, RN 259 km 50). Sin sección ni catálogo nuevo y sin tocar el nav.
**Motivo:** búsqueda de temporada con fecha límite (termina el 7/11). El horario, la gratuidad para menores, la cantidad de bulbos y las novedades de la temporada solo salieron en la prensa, así que no van.
**Detalle:** primer artículo creado directo en la tabla (hasta ahora todas las filas venían de WordPress). Se carga con `scripts/upsert_articles.py` (upsert por `slug, language`, idempotente) desde `seo/articles/` (JSON con los campos + un HTML por idioma); se eligió el script en vez de un SQL porque el cuerpo es HTML largo y se edita mejor en archivo. El FAQPage JSON-LD va dentro del contenido, como en los artículos de WordPress (el script lo arma desde `<section class="faq">`). La portada es "Campo de Tulipanes.jpg" de Polarcito (CC BY-SA 4.0) en `wp-uploads/wikimedia/`, con el crédito en `src/data/cover-fallbacks.ts` (`cover_image_url` queda vacío). El link en el tip "Visitar Trevelin en primavera" de los galeses se hizo con `seo/updates/2026-10-22-galeses-link-tulipanes.sql` (ya aplicado por la API). Ese tip sigue diciendo "mediados a finales de octubre": no se tocó.
**Estado:** Vigente

## 2026-10-22 — Pares ES ↔ EN de artículos con slug distinto
**Decisión:** los artículos cuyo slug cambia según el idioma se emparejan en `src/lib/article-translations.ts`. Las rutas de artículos (`[slug]/[article]`, `en/[slug]/[article]` y los artículos de `flora/[especie]`) lo usan para el hreflang y el botón de idioma. Arranca con tulipanes y lupinos.
**Motivo:** `getAltLang` solo busca el mismo slug en el otro idioma, así que los pares con slug distinto quedaban sin hreflang (el de lupinos, que se tomó como antecedente, no tenía). Además, `flora/[especie]` no emitía hreflang en la metadata de sus artículos.
**Detalle:** un mapa en código y no una columna nueva para no sumar una migración manual. `fauna/[especie]` no se tocó. Los demás pares de WordPress con slug distinto siguen sin emparejar (ver STATUS → Próximo).
**Estado:** Vigente

## 2026-10-21 — Guía de Puerto Madryn + Península Valdés y entrada de "Destinos" al nav
**Decisión:** la guía #6 se publica como `/destinos/puerto-madryn` y `/en/guides/puerto-madryn`, con Península Valdés en el nombre y el contenido. Con ella, "Destinos" entra al menú Explorar (desktop y mobile), a las tarjetas "Explorá por tema" y a un bloque propio en la home (`src/components/home/DestinosSection.tsx`). No se redirige ningún artículo viejo.
**Motivo:** Puerto Madryn es la ciudad base (alojamiento, aeropuerto, excursiones); Península Valdés no tiene página en `parques` y queda dentro de la guía. Los artículos viejos relacionados (excursión de crías de lobos marinos, Punta Tombo, galeses, fauna) responden a búsquedas puntuales que la guía no reemplaza, igual que los de campings de El Chaltén. El nav y la home siguen la regla de la 6ª guía de `.claude/rules/destinos.md`.
**Detalle:** decidido por la rutina diaria sin supervisión; revisable en el PR. La guía no publica montos de la entrada a la península (cambian por resolución), ni población, ni la distancia al aeropuerto de Trelew. Fauna no tiene campo `relacionados`, así que la simetría solo se hizo con la torta galesa.
**Estado:** Vigente

## 2026-10-20 — Guía de El Chaltén: qué artículos viejos se redirigen
**Decisión:** solo las guías generales viejas de El Chaltén (`/lugares/chalten-patagonia-argentina` y `/en/destinations/el-chalten-patagonia-argentina`) pasan con 301 a `/destinos/el-chalten`. Los artículos de campings (ES y EN) siguen vivos.
**Motivo:** los de campings responden a otra búsqueda (dónde acampar) que la guía no cubre; redirigirlos perdería ese tráfico.
**Detalle:** `src/lib/destinos/redirects.ts`. La guía no publica la población: la cifra del censo 2022 no se pudo confirmar en el INDEC y la de INPROTUR (1.627) es del censo 2010.
**Estado:** Vigente

## 2026-10-19 — Guía #4 con slug `puerto-natales`, no `torres-del-paine`
**Decisión:** la guía #4 de `seo/destinos-prioridad.md` (Torres del Paine + Puerto Natales) se publica como `/destinos/puerto-natales` y `/en/guides/puerto-natales`, con "Torres del Paine" en el título y el contenido. Los artículos viejos `/lugares/torres-del-paine-patagonia` y `/en/destinations/torres-del-paine-patagonia` van con 301 a esa guía.
**Motivo:** `/parques/torres-del-paine` ya apunta a "Torres del Paine" como parque; la guía apunta a la intención de viaje (qué hacer, cómo llegar, cuántos días) desde la ciudad base, y así no compiten dos páginas con el mismo nombre. Los artículos viejos se redirigen como el del Perito Moreno a la guía de El Calafate.
**Detalle:** decidido por la rutina diaria sin supervisión; revisable en el PR. Archivos: `src/lib/destinos/catalog.ts`, `src/lib/destinos/redirects.ts`. Alternativa descartada: redirigir los artículos viejos a `/parques/torres-del-paine`.
**Estado:** Vigente

## 2026-10-10 — Code hace commit y push al terminar cada tarea
**Decisión:** al cerrar cada tarea, Code commitea en main con los docs actualizados y pushea.
**Motivo:** el Proyecto del chat sincroniza desde GitHub; sin push, el chat no ve el estado ni las decisiones nuevas. Flujo: chat decide → Code implementa → actualiza docs → commit + push → sincronizo el chat.
**Detalle:** reemplaza a "commit sin push" (2026-09-24). Vercel deploya solo al pushear a main.
**Estado:** Vigente

## 2026-10-10 — Code commitea, la usuaria pushea
**Decisión:** al cerrar una tarea, Code hace commit en `main` (sin rama ni PR) y la usuaria hace el push. Las rutinas en la nube siguen abriendo PR.
**Motivo:** la usuaria lo confirmó en la auditoría del contexto. Así queda la regla del 2026-09-24, que el workflow de 2026-10-07 había cambiado sin querer a "commit y push".
**Detalle:** `CLAUDE.md` → Workflow, paso 5.
**Estado:** Reemplazada por 2026-10-10 — Code hace commit y push

## 2026-10-07 — Contexto compartido entre el chat y Code
**Decisión:** el repo es la única fuente de verdad. `CLAUDE.md` es el archivo real con lo general, los flujos temáticos van a `.claude/rules/`, y el estado y las decisiones a `docs/STATUS.md` y `docs/DECISIONS.md`. `AGENTS.md` queda como una línea que remite a `CLAUDE.md`.
**Motivo:** el Proyecto del chat sincroniza desde GitHub solo `CLAUDE.md`, `docs/` y `.claude/rules/`. Antes, `CLAUDE.md` era `@AGENTS.md` y el chat no veía nada.
**Detalle:** el flujo es: el chat decide → Code implementa → Code actualiza los docs → commit y push → se sincroniza el chat. El contenido de `AGENTS.md` se movió casi textual. Lo que era estado (foco actual, rutina) pasó a STATUS y a esta lista. El 2026-10-10 se auditó contra el código y se pasaron acá las decisiones que estaban solo en la memoria de Code.
**Estado:** Vigente (el push: ver 2026-10-10 — Code hace commit y push)

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
**Estado:** Reemplazada por 2026-10-10 — Code hace commit y push

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
