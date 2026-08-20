-- Guarda el alt text original de la foto de portada (cover_image_url).
-- La migración de WordPress solo copió la URL de la portada, no su alt/crédito,
-- a diferencia de las fotos del cuerpo del artículo que sí retienen el alt completo.
-- Esto dejaba portadas con crédito de fotógrafo (ej. Instagram) sin mostrar ni linkear nada.
--
-- El backfill de datos (para las ~186 portadas migradas de WordPress) se hace
-- aparte con scripts/backfill_cover_image_alt.py, que trae el alt_text real
-- desde la API de WordPress para cada artículo en vez de hardcodear créditos
-- uno por uno a mano.

ALTER TABLE articles
  ADD COLUMN cover_image_alt TEXT;

-- Backfill puntual: créditos rescatados de la metadata original en WordPress
-- (outdoorpatagonia.dreamhosters.com/wp-json/wp/v2/media) para las portadas
-- que sabemos hoy que llevan crédito de fotógrafo. El backfill general del
-- resto de las portadas se hace aparte con scripts/backfill_cover_image_alt.py.

UPDATE articles
SET cover_image_alt = 'Rosa negra Ameghiniella australis fotografiada por Veronica Lopez (@vero_lopez_v)'
WHERE cover_image_url = 'https://outdoorpatagonia.dreamhosters.com/wp-content/uploads/2025/12/rosa-negra-.jpg';

UPDATE articles
SET cover_image_alt = 'Tabla de cordero patagónico - Foto: @lberlinakm12 — Instagram'
WHERE cover_image_url = 'https://outdoorpatagonia.dreamhosters.com/wp-content/uploads/2025/12/cordero-patagonico-10.jpg';
