import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { MapPin, BookOpen, Calendar, LogOut, Compass, ArrowRight, Bookmark, Bell, ChevronRight } from 'lucide-react'
import { getSavedItineraries, getSavedArticles } from '@/lib/actions/user-data'
import { DeleteItineraryButton } from '@/components/perfil/DeleteItineraryButton'
import { toCategorySlug } from '@/lib/category'

export const metadata = {
  title: 'Mi perfil — Outdoor Patagonia',
}

const MONTH_NAMES = [
  '', 'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun',
  'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic',
]

const MONTH_NAMES_FULL = [
  '', 'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
]

function getInitials(name: string) {
  return name.split(' ').map(n => n[0]).filter(Boolean).slice(0, 2).join('').toUpperCase()
}

function formatMemberSince(dateStr: string) {
  const date = new Date(dateStr)
  return date.toLocaleDateString('es-AR', { month: 'long', year: 'numeric' })
}

export default async function PerfilPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/')

  const [itineraries, articles] = await Promise.all([
    getSavedItineraries(),
    getSavedArticles(),
  ])

  const name = (user.user_metadata?.full_name as string | undefined) ?? user.email?.split('@')[0] ?? 'Usuario'
  const avatarUrl = user.user_metadata?.avatar_url as string | undefined
  const memberSince = user.created_at ? formatMemberSince(user.created_at) : null

  return (
    <div className="min-h-screen">
      {/* ── Hero ─────────────────────────────────────────────── */}
      <div className="bg-[var(--color-forest)] relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(ellipse at 15% 60%, #4b9492 0%, transparent 55%),
                              radial-gradient(ellipse at 85% 10%, #87cabf 0%, transparent 45%),
                              radial-gradient(ellipse at 50% 100%, #1a3a2a 0%, transparent 60%)`,
          }}
        />

        <div className="relative max-w-3xl mx-auto px-4 pt-14 pb-10 text-center">
          {/* Avatar */}
          <div className="mb-5 flex justify-center">
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt={name}
                className="w-24 h-24 rounded-full object-cover ring-4 ring-white/20 ring-offset-4 ring-offset-[var(--color-forest)]"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-[var(--color-teal)] flex items-center justify-center text-3xl font-bold text-white ring-4 ring-white/20 ring-offset-4 ring-offset-[var(--color-forest)]">
                {getInitials(name)}
              </div>
            )}
          </div>

          <h1 className="text-3xl font-bold text-white mb-1 tracking-tight">{name}</h1>
          <p className="text-[var(--color-teal-light)] text-sm mb-8">
            {memberSince ? `Explorador patagónico desde ${memberSince}` : 'Explorador Patagónico'}
          </p>

          {/* Stats */}
          <div className="inline-flex items-center gap-0 rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm">
            <div className="px-7 py-4 text-center">
              <p className="text-2xl font-bold text-white tabular-nums">{itineraries.length}</p>
              <p className="text-[10px] text-[var(--color-teal-light)]/70 uppercase tracking-widest mt-0.5">
                {itineraries.length === 1 ? 'Viaje' : 'Viajes'}
              </p>
            </div>
            <div className="w-px self-stretch bg-white/10" />
            <div className="px-7 py-4 text-center">
              <p className="text-2xl font-bold text-white tabular-nums">{articles.length}</p>
              <p className="text-[10px] text-[var(--color-teal-light)]/70 uppercase tracking-widest mt-0.5">
                {articles.length === 1 ? 'Artículo' : 'Artículos'}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom fade into background */}
        <div className="h-8 bg-gradient-to-b from-transparent to-background" />
      </div>

      {/* ── Content ──────────────────────────────────────────── */}
      <div className="max-w-3xl mx-auto px-4 py-8 space-y-8">

        {/* Viajes guardados */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[var(--color-teal)]/10 flex items-center justify-center">
                <MapPin size={15} strokeWidth={1.5} className="text-[var(--color-teal)]" />
              </div>
              <h2 className="font-semibold text-base">Mis viajes guardados</h2>
            </div>
            {itineraries.length > 0 && (
              <span className="text-xs bg-[var(--color-teal)]/10 text-[var(--color-teal)] px-2.5 py-0.5 rounded-full font-semibold">
                {itineraries.length}
              </span>
            )}
          </div>

          {itineraries.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border bg-card p-10 text-center">
              <div className="w-14 h-14 rounded-2xl bg-[var(--color-teal)]/8 flex items-center justify-center mx-auto mb-4">
                <Compass size={24} strokeWidth={1.2} className="text-[var(--color-teal)]" />
              </div>
              <p className="text-sm font-semibold text-foreground mb-1.5">Todavía no guardaste ningún viaje</p>
              <p className="text-xs text-muted-foreground mb-6 max-w-xs mx-auto">
                Planificá tu próxima aventura y guardala para no perderla
              </p>
              <Link
                href="/planear"
                className="inline-flex items-center gap-1.5 text-xs font-semibold bg-[var(--color-teal)] text-white px-5 py-2.5 rounded-full hover:opacity-90 transition-opacity"
              >
                Planear viaje
                <ArrowRight size={12} strokeWidth={2} />
              </Link>
            </div>
          ) : (
            <ul className="space-y-3">
              {itineraries.map((it) => (
                <li
                  key={it.id}
                  className="flex items-center gap-4 p-4 rounded-2xl border border-border bg-card hover:shadow-[var(--shadow-hover)] transition-shadow"
                >
                  <div className="shrink-0 w-14 h-14 rounded-xl bg-[var(--color-forest)] flex flex-col items-center justify-center gap-0.5">
                    <span className="text-[9px] uppercase tracking-widest text-[var(--color-teal-light)]/60 font-medium">
                      {MONTH_NAMES[it.form_data.month]}
                    </span>
                    <span className="text-base font-bold text-white leading-none">{it.form_data.year}</span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm text-foreground truncate">{it.title}</p>
                    {it.subtitle && (
                      <p className="text-xs text-muted-foreground truncate mt-0.5">{it.subtitle}</p>
                    )}
                    <div className="flex items-center gap-1.5 mt-1.5">
                      <Calendar size={10} strokeWidth={1.5} className="text-muted-foreground/60" />
                      <span className="text-xs text-muted-foreground">
                        {it.form_data.days} {it.form_data.days === 1 ? 'día' : 'días'} · {MONTH_NAMES_FULL[it.form_data.month]} {it.form_data.year}
                      </span>
                    </div>
                  </div>

                  <DeleteItineraryButton id={it.id} />
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* Artículos guardados */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[var(--color-terracotta)]/10 flex items-center justify-center">
                <BookOpen size={15} strokeWidth={1.5} className="text-[var(--color-terracotta)]" />
              </div>
              <h2 className="font-semibold text-base">Artículos guardados</h2>
            </div>
            {articles.length > 0 && (
              <span className="text-xs bg-[var(--color-terracotta)]/10 text-[var(--color-terracotta)] px-2.5 py-0.5 rounded-full font-semibold">
                {articles.length}
              </span>
            )}
          </div>

          {articles.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border bg-card p-10 text-center">
              <div className="w-14 h-14 rounded-2xl bg-[var(--color-terracotta)]/8 flex items-center justify-center mx-auto mb-4">
                <Bookmark size={24} strokeWidth={1.2} className="text-[var(--color-terracotta)]" />
              </div>
              <p className="text-sm font-semibold text-foreground mb-1.5">Todavía no guardaste ningún artículo</p>
              <p className="text-xs text-muted-foreground mb-6 max-w-xs mx-auto">
                Marcá los artículos que te interesen para encontrarlos fácilmente después
              </p>
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 text-xs font-semibold bg-[var(--color-terracotta)] text-white px-5 py-2.5 rounded-full hover:opacity-90 transition-opacity"
              >
                Explorar contenido
                <ArrowRight size={12} strokeWidth={2} />
              </Link>
            </div>
          ) : (
            <ul className="divide-y divide-border rounded-2xl border border-border bg-card overflow-hidden">
              {articles.map((art) => (
                <li key={art.id}>
                  <Link
                    href={`/${art.category ? toCategorySlug(art.category) : 'articulos'}/${art.slug}`}
                    className="flex items-center gap-3 px-5 py-3.5 hover:bg-muted/40 transition-colors group"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground group-hover:text-[var(--color-teal)] transition-colors truncate">
                        {art.title}
                      </p>
                      {art.category && (
                        <span className="inline-block mt-1 text-[10px] uppercase tracking-wide font-semibold bg-[var(--color-terracotta)]/10 text-[var(--color-terracotta)] px-1.5 py-0.5 rounded">
                          {art.category}
                        </span>
                      )}
                    </div>
                    <ArrowRight size={14} strokeWidth={1.5} className="shrink-0 text-muted-foreground/40 group-hover:text-[var(--color-teal)] transition-colors" />
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* Configuración */}
        <section>
          <Link
            href="/perfil/notificaciones"
            className="flex items-center gap-4 p-4 rounded-2xl border border-border bg-card hover:shadow-[var(--shadow-hover)] transition-shadow"
          >
            <div className="w-8 h-8 rounded-xl bg-[var(--color-teal)]/10 flex items-center justify-center shrink-0">
              <Bell size={15} strokeWidth={1.5} className="text-[var(--color-teal)]" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm text-foreground">Notificaciones</p>
              <p className="text-xs text-muted-foreground mt-0.5">Elegí qué alertas recibir por correo</p>
            </div>
            <ChevronRight size={16} strokeWidth={1.5} className="text-muted-foreground/40 shrink-0" />
          </Link>
        </section>

        {/* Cerrar sesión */}
        <div className="pt-2 border-t border-border">
          <form action="/auth/signout" method="POST">
            <button
              type="submit"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-destructive transition-colors py-2"
            >
              <LogOut size={14} strokeWidth={1.5} />
              Cerrar sesión
            </button>
          </form>
        </div>

      </div>
    </div>
  )
}
