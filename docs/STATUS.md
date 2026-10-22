# STATUS

> Lo actualiza Code al final de cada tarea (ver Workflow en `CLAUDE.md`). Se escribe corto: el detalle de lo que ve el lector está en `src/data/novedades.ts`, el de los cambios en `git log` y los porqués en `docs/DECISIONS.md`.

_Última actualización: 2026-10-22_

## Hecho (a grandes rasgos)

- Migración de WordPress a Next.js + Supabase + Vercel, con 301 desde las URLs viejas.
- Secciones de catálogo: parques, senderos, volcanes, termas, arqueología, escalada, fauna, flora y gastronomía, conectadas por `relacionados`. Escalada: solo Esquel tiene fuente (guía Esqala). Los otros 11 sectores siguen sin fuente; Piedra Parada tiene guía propia, pendiente de recibirla, y Esqala también tiene una de Trevelin sin cargar.
- Datos en vivo: StatusBoard, `/estado`, mapa y astronomía. Publicaciones cortas en `/ahora`, cargadas desde el admin.
- Usuarios: perfil, favoritos, planificador de viaje con itinerarios guardados, notificaciones y newsletter propio.
- Monetización: GetYourGuide, AdSense, página `/anunciar` con fichas destacadas para operadores.
- SEO: research semanal de keywords, reescritura de títulos con CTR bajo, sitemap con `lastmod` real y redirección de artículos viejos a las guías.
- Panel `/admin/agentes` para revisar y publicar los PR de las rutinas.
- 2026-10-10: artículos viejos del Perito Moreno (ES y EN) → 301 a la guía de El Calafate.
- 2026-10-10: auditoría del contexto (CLAUDE.md, rules y docs contra el código) y decisiones de la memoria de Code pasadas a DECISIONS.
- 2026-10-22: artículo del campo de tulipanes de Trevelin (`/flora/tulipanes-trevelin` y `/en/flora/trevelin-tulip-fields`), el primero creado directo en la tabla `articles` (ver DECISIONS). Link agregado en el tip de Trevelin del artículo de los galeses (ES y EN).
- Versión publicada: ver la entrada `esUltima` de `src/data/novedades.ts`.

## En curso

- **Guías de destino** (prioridad #1 de contenido). Hechas: Ushuaia, El Calafate, Bariloche (#7), Puerto Natales + Torres del Paine (#8), El Chaltén (#9) y Puerto Madryn + Península Valdés (#10, con "Destinos" en el nav y bloque en la home). Orden: `seo/destinos-prioridad.md`. Las produce la rutina semanal (ver `.claude/rules/destinos.md`).

## Rutinas en la nube (lunes)

- Guía de destino: `trig_01Gqz7Knx4E6Az4cLeQAhewY`, ver `.claude/rules/destinos.md`.
- Auditoría SEO/CTR (abre PR con metadata): `trig_018sMnZzcAJD4dg42NabCZov`.
- Borrador de newsletter: `trig_01Acb1XD3UHgbZXLb5EuA1E7`.
- ⛔ **Caídas desde el cambio de plan Pro → Enterprise (mismo mail).** Las rutinas vivían en la organización Pro y no pasaron a la Enterprise: `RemoteTrigger` da 404 y claude.ai/code redirige a `/code/onboarding`. Último PR de una rutina: #7 (2026-10-05). Para volver: hacer el onboarding de Code web en la org Enterprise (conectar GitHub y crear el entorno con la credencial de Search Console) y recrear las 3 rutinas. Los IDs de arriba ya no sirven.

## Pendiente

- **Seguridad (la usuaria)**: rotar la service role key de Supabase (y actualizarla en `.env.local` y Vercel). Estuvo en texto plano en `.claude/settings.local.json`; las reglas se sacaron el 2026-10-10. Si existe `NEXT_PUBLIC_AMAZON_TAG` en `.env.local` o Vercel, borrarla.
- `ADMIN_EMAIL` está repetido en 10 archivos: centralizarlo en un helper.
- `notification_preferences` (migración 006) existe pero nada lo consume.
- Fines de octubre de 2026: medir el CTR de los títulos reescritos el 30/09 y el RPM real de AdSense.
- _(Lo que se defina en el chat del Proyecto.)_

## Próximo

- **Tulipanes de Trevelin, después del 7/11/2026**: el artículo dice "temporada 2026" y $45.000. Para 2027, revisar la página oficial de entradas y actualizar fechas y precio en `seo/articles/` + `scripts/upsert_articles.py`.
- Hreflang de los artículos migrados: ES y EN solo se emparejan si comparten slug. Los pares con slug distinto (p. ej. galeses ↔ `welsh-patagonia`) no tienen hreflang ni botón de idioma hasta cargarlos en `src/lib/article-translations.ts`.

- Guía #7: Punta Arenas (según `seo/destinos-prioridad.md`).
- `senderos/catalog.ts` dice que la Laguna de los Tres es "completamente gratuito", pero la APN cobra el acceso a los senderos desde El Chaltén (pase "Portada El Chaltén"). Corregirlo.
