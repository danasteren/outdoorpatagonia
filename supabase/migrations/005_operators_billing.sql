-- Tracking interno de cobros para operadores destacados
-- price_monthly / featured_until / notes no se muestran en el sitio público,
-- solo se leen desde el panel admin (RLS ya permite lectura pública de toda la fila,
-- así que las queries públicas deben seguir seleccionando columnas explícitas
-- o simplemente no renderizar estos campos en el front, como ya hace OperadorPage).

ALTER TABLE operators
  ADD COLUMN price_monthly NUMERIC,
  ADD COLUMN featured_until DATE,
  ADD COLUMN notes TEXT;
