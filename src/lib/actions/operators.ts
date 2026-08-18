"use server"

import { revalidatePath } from "next/cache"
import { createClient } from "@/lib/supabase/server"
import { createAdminClient } from "@/lib/supabase/admin"
import type { FormState } from "./forms"

const ADMIN_EMAIL = "danasteren@gmail.com"

function slugify(name: string): string {
  return name
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

export async function createOperator(
  _prev: FormState,
  formData: FormData
): Promise<FormState> {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user || user.email !== ADMIN_EMAIL) {
    return { success: false, error: "No autorizado." }
  }

  const name = formData.get("name")?.toString().trim()
  const location = formData.get("location")?.toString().trim() || null
  const region = formData.get("region")?.toString().trim() || null
  const description = formData.get("description")?.toString().trim() || null
  const website = formData.get("website")?.toString().trim() || null
  const phone = formData.get("phone")?.toString().trim() || null
  const email = formData.get("email")?.toString().trim() || null
  const logo_url = formData.get("logo_url")?.toString().trim() || null
  const categories = formData.getAll("categories").map(String)
  const is_featured = formData.get("is_featured") === "on"
  const priceRaw = formData.get("price_monthly")?.toString().trim()
  const price_monthly = priceRaw ? Number(priceRaw) : null
  const featured_until = formData.get("featured_until")?.toString().trim() || null
  const notes = formData.get("notes")?.toString().trim() || null

  if (!name) {
    return { success: false, error: "Falta el nombre de la empresa." }
  }
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { success: false, error: "El email no es válido." }
  }
  if (priceRaw && Number.isNaN(price_monthly)) {
    return { success: false, error: "El precio debe ser un número." }
  }

  const admin = createAdminClient()
  const baseSlug = slugify(name)
  let slug = baseSlug
  let attempt = 0
  while (true) {
    const { data: existing } = await admin
      .from("operators")
      .select("id")
      .eq("slug", slug)
      .maybeSingle()
    if (!existing) break
    attempt += 1
    slug = `${baseSlug}-${attempt + 1}`
  }

  const { error } = await admin.from("operators").insert({
    name,
    slug,
    description,
    location,
    region,
    categories,
    website,
    phone,
    email,
    logo_url,
    is_featured,
    price_monthly,
    featured_until,
    notes,
  })

  if (error) {
    return { success: false, error: "No pudimos crear el operador: " + error.message }
  }

  revalidatePath("/operadores")
  revalidatePath("/admin")
  return { success: true }
}
