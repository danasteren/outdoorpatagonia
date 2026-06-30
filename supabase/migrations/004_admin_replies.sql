-- Tracking de respuestas desde el panel de administración
-- Permite marcar mensajes de contacto y solicitudes de operadores como respondidos

ALTER TABLE contact_messages
  ADD COLUMN replied_at TIMESTAMPTZ;

ALTER TABLE operator_applications
  ADD COLUMN replied_at TIMESTAMPTZ;
