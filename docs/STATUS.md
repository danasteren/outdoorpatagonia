# STATUS

> Lo actualiza Code al final de cada tarea (ver Workflow en `CLAUDE.md`). Se escribe corto: el detalle de lo que ve el lector está en `src/data/novedades.ts`, el de los cambios en `git log` y los porqués en `docs/DECISIONS.md`.

_Última actualización: 2026-10-10_

## Hecho (a grandes rasgos)

- Migración de WordPress a Next.js + Supabase + Vercel, con 301 desde las URLs viejas.
- Secciones de catálogo: parques, senderos, volcanes, termas, arqueología, escalada, fauna, flora y gastronomía, conectadas por `relacionados`. Escalada: solo Esquel tiene fuente (guía Esqala). Los otros 11 sectores siguen sin fuente; Piedra Parada tiene guía propia, pendiente de recibirla, y Esqala también tiene una de Trevelin sin cargar.
- Datos en vivo: StatusBoard, `/estado`, mapa y astronomía. Publicaciones cortas en `/ahora`, cargadas desde el admin.
- Usuarios: perfil, favoritos, planificador de viaje con itinerarios guardados, notificaciones y newsletter propio.
- Monetización: GetYourGuide, AdSense, página `/anunciar` con fichas destacadas para operadores.
- SEO: research semanal de keywords, reescritura de títulos con CTR bajo, sitemap con `lastmod` real y redirección de artículos viejos a las guías.
- Panel `/admin/agentes` para revisar y publicar los PR de las rutinas.
- 2026-10-10: auditoría del contexto (CLAUDE.md, rules y docs contra el código) y decisiones de la memoria de Code pasadas a DECISIONS.
- Versión publicada: ver la entrada `esUltima` de `src/data/novedades.ts`.

## En curso

- **Guías de destino** (prioridad #1 de contenido). Hechas: Ushuaia, El Calafate y Bariloche (#7). Orden: `seo/destinos-prioridad.md`. Las produce la rutina semanal (ver `.claude/rules/destinos.md`).

## Rutinas en la nube (lunes)

- Guía de destino: `trig_01Gqz7Knx4E6Az4cLeQAhewY`, ver `.claude/rules/destinos.md`.
- Auditoría SEO/CTR (abre PR con metadata): `trig_018sMnZzcAJD4dg42NabCZov`.
- Borrador de newsletter: `trig_01Acb1XD3UHgbZXLb5EuA1E7`.
- ⚠️ 2026-10-10: desde la sesión local de Code, `RemoteTrigger` da 404 para estos IDs y la lista vuelve vacía. Los PR #5 a #7 (3 y 5 de octubre) prueban que andaban. Confirmar en claude.ai → Routines si siguen activas o si cambiaron de ID.

## Pendiente

- Al sumar la 6ª guía: "Destinos" al nav y bloque en la home (regla en `.claude/rules/destinos.md`).
- El Calafate: según `seo/destinos-prioridad.md` hay 2 artículos viejos y no están en `LEGACY_TO_GUIDE`. Identificar las URLs y redirigirlas.
- **Seguridad (la usuaria)**: rotar la service role key de Supabase (y actualizarla en `.env.local` y Vercel). Estuvo en texto plano en `.claude/settings.local.json`; las reglas se sacaron el 2026-10-10. Si existe `NEXT_PUBLIC_AMAZON_TAG` en `.env.local` o Vercel, borrarla.
- `ADMIN_EMAIL` está repetido en 10 archivos: centralizarlo en un helper.
- `notification_preferences` (migración 006) existe pero nada lo consume.
- Fines de octubre de 2026: medir el CTR de los títulos reescritos el 30/09 y el RPM real de AdSense.
- _(Lo que se defina en el chat del Proyecto.)_

## Próximo

- Guía #4: Torres del Paine + Puerto Natales (según `seo/destinos-prioridad.md`).
