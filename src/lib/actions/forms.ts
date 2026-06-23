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

export type FormState = { success: true } | { success: false; error: string } | null

export async function submitContactForm(
  _prev: FormState,
  formData: FormData
): Promise<FormState> {
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

  const supabase = await createClient()
  const { error } = await supabase
    .from("contact_messages")
    .insert({ nombre, email, asunto, mensaje })

  if (error) return { success: false, error: "No pudimos enviar tu mensaje. Intentá de nuevo." }
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
