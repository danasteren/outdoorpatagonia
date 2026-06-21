"use client"

import { useState, useEffect } from "react"
import { Bookmark, BookmarkCheck, Loader2 } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { toggleFavoriteArticle } from "@/lib/actions/user-data"

export function FavoriteButton({
  slug,
  title,
  category,
}: {
  slug: string
  title: string
  category: string | null
}) {
  const [isFavorite, setIsFavorite] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loading, setLoading] = useState(false)
  const [checked, setChecked] = useState(false)
  const [showHint, setShowHint] = useState(false)

  useEffect(() => {
    async function init() {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        setChecked(true)
        return
      }
      setIsLoggedIn(true)
      const { data } = await supabase
        .from("saved_articles")
        .select("id")
        .eq("user_id", user.id)
        .eq("slug", slug)
        .maybeSingle()
      setIsFavorite(!!data)
      setChecked(true)
    }
    init()
  }, [slug])

  async function handleClick() {
    if (!isLoggedIn) {
      setShowHint(true)
      setTimeout(() => setShowHint(false), 3000)
      return
    }
    setLoading(true)
    const res = await toggleFavoriteArticle(slug, title, category)
    if (!("error" in res)) setIsFavorite(res.isFavorite)
    setLoading(false)
  }

  if (!checked) return null

  return (
    <div className="relative inline-flex">
      <button
        type="button"
        onClick={handleClick}
        disabled={loading}
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50"
        title={isFavorite ? "Quitar de guardados" : "Guardar artículo"}
      >
        {loading ? (
          <Loader2 size={13} className="animate-spin" />
        ) : isFavorite ? (
          <BookmarkCheck size={13} strokeWidth={1.5} className="text-[var(--color-teal)]" />
        ) : (
          <Bookmark size={13} strokeWidth={1.5} />
        )}
        {isFavorite ? "Guardado" : "Guardar"}
      </button>
      {showHint && (
        <span className="absolute bottom-full left-0 mb-1.5 whitespace-nowrap text-xs bg-popover border border-border rounded-lg px-2.5 py-1.5 shadow-sm text-muted-foreground z-10">
          Iniciá sesión desde el menú para guardar
        </span>
      )}
    </div>
  )
}
