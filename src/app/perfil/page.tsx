import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export const metadata = {
  title: 'Mi perfil — Outdoor Patagonia',
}

export default async function PerfilPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/')

  const name = (user.user_metadata?.full_name as string | undefined) ?? user.email ?? 'Usuario'
  const avatarUrl = user.user_metadata?.avatar_url as string | undefined

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
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

      <section className="mb-8">
        <h2 className="text-base font-semibold mb-2">Mis viajes guardados</h2>
        <p className="text-sm text-muted-foreground">Aún no guardaste ningún viaje.</p>
      </section>

      <section className="mb-10">
        <h2 className="text-base font-semibold mb-2">Artículos favoritos</h2>
        <p className="text-sm text-muted-foreground">Aún no guardaste ningún artículo.</p>
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
