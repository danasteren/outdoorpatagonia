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
