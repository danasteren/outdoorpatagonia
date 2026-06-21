import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { MapPin, BookOpen } from 'lucide-react'
import { getSavedItineraries, getSavedArticles } from '@/lib/actions/user-data'
import { DeleteItineraryButton } from '@/components/perfil/DeleteItineraryButton'
import { toCategorySlug } from '@/lib/category'

export const metadata = {
  title: 'Mi perfil — Outdoor Patagonia',
}

const MONTH_NAMES = [
  '', 'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
]

export default async function PerfilPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/')

  const [itineraries, articles] = await Promise.all([
    getSavedItineraries(),
    getSavedArticles(),
  ])

  const name = (user.user_metadata?.full_name as string | undefined) ?? user.email ?? 'Usuario'
  const avatarUrl = user.user_metadata?.avatar_url as string | undefined

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      {/* Header usuario */}
      <div className="flex items-center gap-4 mb-10">
        {avatarUrl ? (
          <img src={avatarUrl} alt={name} className="w-16 h-16 rounded-full object-cover" />
        ) : (
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center text-2xl font-semibold text-muted-foreground">
            {name[0]?.toUpperCase()}
          </div>
        )}
        <div>
          <h1 className="text-2xl font-semibold">{name}</h1>
          <p className="text-sm text-muted-foreground">{user.email}</p>
        </div>
      </div>

      {/* Viajes guardados */}
      <section className="mb-10">
        <div className="flex items-center gap-2 mb-4">
          <MapPin size={15} strokeWidth={1.5} className="text-[var(--color-teal)]" />
          <h2 className="text-base font-semibold">Mis viajes guardados</h2>
          {itineraries.length > 0 && (
            <span className="ml-auto text-sm text-muted-foreground">{itineraries.length}</span>
          )}
        </div>
        {itineraries.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            Aún no guardaste ningún viaje.{' '}
            <Link href="/planear" className="underline hover:text-foreground transition-colors">
              Planear ahora
            </Link>
          </p>
        ) : (
          <ul className="space-y-3">
            {itineraries.map((it) => (
              <li
                key={it.id}
                className="flex items-center justify-between gap-3 p-4 rounded-xl border border-border bg-card"
              >
                <div className="min-w-0">
                  <p className="font-medium text-sm text-foreground truncate">{it.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {it.form_data.days} días · {MONTH_NAMES[it.form_data.month]} {it.form_data.year}
                  </p>
                </div>
                <DeleteItineraryButton id={it.id} />
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Artículos guardados */}
      <section className="mb-10">
        <div className="flex items-center gap-2 mb-4">
          <BookOpen size={15} strokeWidth={1.5} className="text-[var(--color-teal)]" />
          <h2 className="text-base font-semibold">Artículos guardados</h2>
          {articles.length > 0 && (
            <span className="ml-auto text-sm text-muted-foreground">{articles.length}</span>
          )}
        </div>
        {articles.length === 0 ? (
          <p className="text-sm text-muted-foreground">Aún no guardaste ningún artículo.</p>
        ) : (
          <ul className="space-y-2">
            {articles.map((art) => (
              <li key={art.id}>
                <Link
                  href={`/${art.category ? toCategorySlug(art.category) : 'articulos'}/${art.slug}`}
                  className="text-sm text-foreground hover:text-[var(--color-teal)] transition-colors"
                >
                  {art.title}
                </Link>
                {art.category && (
                  <span className="text-xs text-muted-foreground ml-2">· {art.category}</span>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>

      <form action="/auth/signout" method="POST">
        <button
          type="submit"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          Cerrar sesión
        </button>
      </form>
    </div>
  )
}
