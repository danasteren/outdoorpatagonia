"use server"

/*
  Tablas necesarias en Supabase (correr en SQL Editor):

  create table contact_messages (
    id uuid primary key default gen_random_uuid(),
    created_at timestamptz default now(),
    nombre text not null,
    email text not null,
    asunto text not null,
    mensaje text not null
  );
  alter table contact_messages enable row level security;
  create policy "anon insert" on contact_messages for insert with check (true);

  -- Ver supabase/migrations/008_form_antispam.sql para la columna `ip`
  -- usada en el rate limit de este archivo.

  create table operator_applications (
    id uuid primary key default gen_random_uuid(),
    created_at timestamptz default now(),
    empresa text not null,
    contacto text not null,
    email text not null,
    telefono text,
    sitio_web text,
    pais text not null,
    especialidades text[],
    descripcion text
  );
  alter table operator_applications enable row level security;
  create policy "anon insert" on operator_applications for insert with check (true);
*/

import { createClient } from "@/lib/supabase/server"
import { getClientIp, isRateLimited } from "@/lib/antispam"
import { sendContactNotificationEmail } from "@/lib/email"

export type FormState = { success: true } | { success: false; error: string } | null

export async function submitContactForm(
  _prev: FormState,
  formData: FormData
): Promise<FormState> {
  // Honeypot: campo invisible para humanos. Si viene completo, es un bot —
  // devolvemos éxito sin guardar nada para no delatar el filtro.
  if (formData.get("website")?.toString().trim()) {
    return { success: true }
  }

  const nombre = formData.get("nombre")?.toString().trim()
  const email = formData.get("email")?.toString().trim()
  const asunto = formData.get("asunto")?.toString().trim()
  const mensaje = formData.get("mensaje")?.toString().trim()

  if (!nombre || !email || !asunto || !mensaje) {
    return { success: false, error: "Completá todos los campos." }
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { success: false, error: "El email no es válido." }
  }

  const ip = await getClientIp()
  if (await isRateLimited({ table: "contact_messages", email, ip, maxByEmail: 3, maxByIp: 5 })) {
    return { success: false, error: "Enviaste muchos mensajes en poco tiempo. Probá de nuevo más tarde." }
  }

  const supabase = await createClient()
  const { error } = await supabase
    .from("contact_messages")
    .insert({ nombre, email, asunto, mensaje, ip })

  if (error) return { success: false, error: "No pudimos enviar tu mensaje. Intentá de nuevo." }

  try {
    await sendContactNotificationEmail({ nombre, email, asunto, mensaje })
  } catch {
    // No bloqueamos el alta del mensaje si falla el email de notificación.
  }

  return { success: true }
}

export async function submitOperatorApplication(
  _prev: FormState,
  formData: FormData
): Promise<FormState> {
  const empresa = formData.get("empresa")?.toString().trim()
  const contacto = formData.get("contacto")?.toString().trim()
  const email = formData.get("email")?.toString().trim()
  const telefono = formData.get("telefono")?.toString().trim() || null
  const sitio_web = formData.get("sitio_web")?.toString().trim() || null
  const pais = formData.get("pais")?.toString().trim()
  const descripcion = formData.get("descripcion")?.toString().trim() || null
  const especialidades = formData.getAll("especialidades").map(String)

  if (!empresa || !contacto || !email || !pais) {
    return { success: false, error: "Completá los campos obligatorios." }
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { success: false, error: "El email no es válido." }
  }

  const supabase = await createClient()
  const { error } = await supabase
    .from("operator_applications")
    .insert({ empresa, contacto, email, telefono, sitio_web, pais, especialidades, descripcion })

  if (error) return { success: false, error: "No pudimos enviar tu solicitud. Intentá de nuevo." }
  return { success: true }
}
