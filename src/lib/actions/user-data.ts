"use server"

import { createClient } from "@/lib/supabase/server"
import type { TripFormData, ItineraryResult } from "@/lib/planner/types"

export async function saveItinerary(form: TripFormData, result: ItineraryResult) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: "no_auth" as const }

  const { data, error } = await supabase
    .from("saved_itineraries")
    .insert({
      user_id: user.id,
      title: result.title,
      subtitle: result.subtitle,
      form_data: form,
      result,
    })
    .select("id")
    .single()

  if (error) return { error: "db_error" as const }
  return { id: data.id as string }
}

export async function deleteItinerary(id: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return

  await supabase
    .from("saved_itineraries")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id)
}

export async function getSavedItineraries() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return []

  const { data } = await supabase
    .from("saved_itineraries")
    .select("id, title, subtitle, created_at, form_data")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })

  return (data ?? []) as Array<{
    id: string
    title: string
    subtitle: string | null
    created_at: string
    form_data: TripFormData
  }>
}

export async function toggleFavoriteArticle(slug: string, title: string, category: string | null) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: "no_auth" as const }

  const { data: existing } = await supabase
    .from("saved_articles")
    .select("id")
    .eq("user_id", user.id)
    .eq("slug", slug)
    .maybeSingle()

  if (existing) {
    await supabase.from("saved_articles").delete().eq("id", existing.id)
    return { isFavorite: false }
  }

  await supabase.from("saved_articles").insert({ user_id: user.id, slug, title, category })
  return { isFavorite: true }
}

export async function getSavedArticles() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return []

  const { data } = await supabase
    .from("saved_articles")
    .select("id, slug, title, category, created_at")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })

  return (data ?? []) as Array<{
    id: string
    slug: string
    title: string
    category: string | null
    created_at: string
  }>
}
