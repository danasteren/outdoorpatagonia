-- Anti-spam: guarda la IP de origen en contacto y newsletter para poder
-- limitar la frecuencia de envíos por IP, además del honeypot y el límite
-- por email que se aplican en el server action.

ALTER TABLE contact_messages ADD COLUMN IF NOT EXISTS ip TEXT;
ALTER TABLE subscribers ADD COLUMN IF NOT EXISTS ip TEXT;

CREATE INDEX IF NOT EXISTS contact_messages_email_created_idx ON contact_messages (email, created_at);
CREATE INDEX IF NOT EXISTS contact_messages_ip_created_idx ON contact_messages (ip, created_at);
CREATE INDEX IF NOT EXISTS subscribers_ip_created_idx ON subscribers (ip, created_at);

-- subscribe_email pasa a aceptar la IP del suscriptor para el rate limit.
DROP FUNCTION IF EXISTS subscribe_email(TEXT);

CREATE FUNCTION subscribe_email(p_email TEXT, p_ip TEXT DEFAULT NULL)
RETURNS void
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  INSERT INTO subscribers (email, source, unsubscribed_at, ip)
  VALUES (lower(trim(p_email)), 'site', NULL, p_ip)
  ON CONFLICT (email) DO UPDATE SET unsubscribed_at = NULL;
$$;

GRANT EXECUTE ON FUNCTION subscribe_email(TEXT, TEXT) TO anon;
