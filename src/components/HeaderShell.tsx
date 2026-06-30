'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'
import {
  Menu, X, Map, Globe, Compass, ChevronDown, Users, Search,
  PawPrint, Leaf, MapPin, Mountain, Activity, Pickaxe, Telescope,
  User, LogOut, Backpack, ShieldCheck,
} from 'lucide-react'
import { DarkModeToggle } from './DarkModeToggle'
import { generateRandomBase64url, generateCodeChallenge } from '@/lib/pkce'

export type AuthUser = { name: string; email: string; avatarUrl: string | null } | null

const ADMIN_EMAIL = 'danasteren@gmail.com'


function UserAvatar({ user, size = 7 }: { user: AuthUser & object; size?: number }) {
  const cls = `w-${size} h-${size} rounded-full object-cover`
  if (user.avatarUrl) {
    return <img src={user.avatarUrl} alt={user.name} className={cls} />
  }
  return (
    <div className={`w-${size} h-${size} rounded-full bg-muted flex items-center justify-center text-xs font-semibold text-muted-foreground shrink-0`}>
      {user.name[0]?.toUpperCase()}
    </div>
  )
}

export function HeaderShell({
  lang,
  user,
}: {
  lang: string
  user: AuthUser
}) {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const [exploreOpen, setExploreOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const exploreRef = useRef<HTMLDivElement>(null)
  const userMenuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!exploreOpen) return
    const onClickOutside = (e: MouseEvent) => {
      if (!exploreRef.current?.contains(e.target as Node)) setExploreOpen(false)
    }
    document.addEventListener('mousedown', onClickOutside)
    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [exploreOpen])

  useEffect(() => {
    if (!userMenuOpen) return
    const onClickOutside = (e: MouseEvent) => {
      if (!userMenuRef.current?.contains(e.target as Node)) setUserMenuOpen(false)
    }
    document.addEventListener('mousedown', onClickOutside)
    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [userMenuOpen])

  useEffect(() => {
    setMenuOpen(false)
    setExploreOpen(false)
    setUserMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const mapaHref = lang === 'en' ? '/en/mapa' : '/mapa'
  const planearHref = '/planear'
  const operadoresHref = '/operadores'
  const isActiveMapa = pathname === '/mapa' || pathname === '/en/mapa'
  const isActivePlanear = pathname === '/planear'
  const isActiveOperadores = pathname.startsWith('/operadores')

  async function handleSignIn() {
    const codeVerifier = generateRandomBase64url(32)
    const codeChallenge = await generateCodeChallenge(codeVerifier)
    document.cookie = `oauth_cv=${codeVerifier}; path=/; SameSite=Lax; Max-Age=300`
    const params = new URLSearchParams({
      client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
      redirect_uri: `${window.location.origin}/auth/callback`,
      response_type: 'code',
      scope: 'openid email profile',
      code_challenge: codeChallenge,
      code_challenge_method: 'S256',
    })
    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?${params}`
  }

  return (
    <>
      <header
        className={`sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border transition-[box-shadow] duration-200${scrolled ? ' shadow-sm' : ''}`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center gap-2">

          {/* Logo */}
          <Link href={lang === 'en' ? '/en' : '/'} className="flex items-center shrink-0 mr-3">
            <img src="/brand/op_02.svg" alt="Outdoor Patagonia" className="h-9 w-auto" />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-0.5 flex-1">

            {/* Explorar dropdown */}
            <div ref={exploreRef} className="relative">
              <button
                onClick={() => setExploreOpen((v) => !v)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${exploreOpen
                    ? 'text-foreground bg-muted'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/60'
                  }`}
              >
                <Globe size={15} strokeWidth={1.75} />
                Explorar
                <ChevronDown
                  size={13}
                  strokeWidth={2}
                  className={`transition-transform duration-200${exploreOpen ? ' rotate-180' : ''}`}
                />
              </button>

              <div
                className={`absolute top-full left-0 mt-2 w-[460px] bg-popover border border-border rounded-xl shadow-modal p-3 z-50 transition-[opacity,transform] duration-150 origin-top-left${exploreOpen
                    ? ' opacity-100 scale-100 pointer-events-auto'
                    : ' opacity-0 scale-95 pointer-events-none'
                  }`}
              >
                <div className="grid grid-cols-2 gap-0.5">
                  {[
                    { href: '/astronomia', label: 'Astronomía', Icon: Telescope },
                    { href: '/escalada', label: 'Escalada', Icon: Pickaxe },
                    { href: '/estado', label: 'Estado', Icon: Activity },
                    { href: '/fauna', label: 'Fauna', Icon: PawPrint },
                    { href: '/flora', label: 'Flora', Icon: Leaf },
                    { href: '/parques', label: 'Parques', Icon: Mountain },
                    { href: '/senderos', label: 'Senderos', Icon: MapPin },
                  ].map(({ href, label, Icon }) => (
                    <Link
                      key={href}
                      href={href}
                      onClick={() => setExploreOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                    >
                      <Icon size={14} strokeWidth={1.75} className="text-[var(--color-teal)] shrink-0" />
                      <span className="truncate font-medium">{label}</span>
                    </Link>
                  ))}
                </div>
                <div className="mt-2 pt-2 border-t border-border">
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/50 px-3 mb-1">
                    Planear
                  </p>
                  <div className="grid grid-cols-2 gap-0.5">
                    {[
                      { href: '/planear', label: 'Itinerario', Icon: Compass },
                      { href: '/planear/que-llevar', label: 'Qué llevar', Icon: Backpack },
                    ].map(({ href, label, Icon }) => (
                      <Link
                        key={href}
                        href={href}
                        onClick={() => setExploreOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                      >
                        <Icon size={14} strokeWidth={1.75} className="text-[var(--color-terracotta)] shrink-0" />
                        <span className="truncate font-medium">{label}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Mapa */}
            <Link
              href={mapaHref}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isActiveMapa
                  ? 'text-foreground bg-muted'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/60'
                }`}
            >
              <Map size={15} strokeWidth={1.75} />
              Mapa
            </Link>

            {/* Operadores */}
            <Link
              href={operadoresHref}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isActiveOperadores
                  ? 'text-foreground bg-muted'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/60'
                }`}
            >
              <Users size={15} strokeWidth={1.75} />
              Operadores
            </Link>

            {/* Planear — terracotta CTA */}
            <Link
              href={planearHref}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isActivePlanear
                  ? 'text-[var(--color-terracotta)] bg-[var(--color-terracotta)]/10'
                  : 'text-[var(--color-terracotta)] hover:bg-[var(--color-terracotta)]/8'
                }`}
            >
              <Compass size={15} strokeWidth={1.75} />
              Planear
            </Link>
          </nav>

          {/* Desktop utilities */}
          <div className="hidden md:flex items-center gap-3 ml-auto shrink-0">
            <Link
              href="/buscar"
              aria-label="Buscar"
              className="flex items-center justify-center w-8 h-8 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              <Search size={16} strokeWidth={1.75} />
            </Link>
            <div className="w-px h-3.5 bg-border" />

            {/* Auth */}
            {user ? (
              <div ref={userMenuRef} className="relative">
                <button
                  onClick={() => setUserMenuOpen((v) => !v)}
                  aria-label="Menú de usuario"
                  className="flex items-center justify-center w-8 h-8 rounded-full overflow-hidden ring-2 ring-transparent hover:ring-border transition-all"
                >
                  {user.avatarUrl ? (
                    <img src={user.avatarUrl} alt={user.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-muted flex items-center justify-center text-xs font-semibold text-muted-foreground">
                      {user.name[0]?.toUpperCase()}
                    </div>
                  )}
                </button>
                <div
                  className={`absolute top-full right-0 mt-2 w-48 bg-popover border border-border rounded-xl shadow-modal p-1.5 z-50 transition-[opacity,transform] duration-150 origin-top-right${userMenuOpen
                      ? ' opacity-100 scale-100 pointer-events-auto'
                      : ' opacity-0 scale-95 pointer-events-none'
                    }`}
                >
                  <div className="px-3 py-2 mb-1">
                    <p className="text-xs font-medium truncate">{user.name}</p>
                    <p className="text-[11px] text-muted-foreground truncate">{user.email}</p>
                  </div>
                  <div className="h-px bg-border mx-1 mb-1" />
                  <Link
                    href="/perfil"
                    onClick={() => setUserMenuOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                  >
                    <User size={13} strokeWidth={1.75} />
                    Mi perfil
                  </Link>
                  {user.email === ADMIN_EMAIL && (
                    <Link
                      href="/admin"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                    >
                      <ShieldCheck size={13} strokeWidth={1.75} />
                      Admin
                    </Link>
                  )}
                  <form action="/auth/signout" method="POST">
                    <button
                      type="submit"
                      className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors text-left"
                    >
                      <LogOut size={13} strokeWidth={1.75} />
                      Cerrar sesión
                    </button>
                  </form>
                </div>
              </div>
            ) : (
              <button
                onClick={handleSignIn}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Iniciar sesión
              </button>
            )}

            <div className="w-px h-3.5 bg-border" />
            <DarkModeToggle />
          </div>

          {/* Mobile: dark mode + hamburger */}
          <div className="md:hidden flex items-center gap-1 ml-auto">
            <DarkModeToggle />
            <button
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={menuOpen}
              className="flex items-center justify-center w-9 h-9 rounded-lg text-foreground/70 hover:text-foreground hover:bg-muted transition-colors"
            >
              {menuOpen ? <X size={20} strokeWidth={1.75} /> : <Menu size={20} strokeWidth={1.75} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile overlay + drawer */}
      <div
        className={`fixed inset-0 z-[1001] md:hidden transition-opacity duration-200${menuOpen ? ' opacity-100 pointer-events-auto' : ' opacity-0 pointer-events-none'
          }`}
      >
        <div
          className="absolute inset-0 bg-foreground/20 backdrop-blur-sm"
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />

        <div
          className={`absolute right-0 top-0 bottom-0 w-[280px] bg-background border-l border-border flex flex-col shadow-modal transition-transform duration-300 ease-out${menuOpen ? ' translate-x-0' : ' translate-x-full'
            }`}
        >
          {/* Drawer header */}
          <div className="h-16 flex items-center justify-between px-5 border-b border-border shrink-0">
            <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/50">
              Menú
            </span>
            <button
              onClick={() => setMenuOpen(false)}
              className="w-8 h-8 flex items-center justify-center rounded-lg text-foreground/60 hover:text-foreground hover:bg-muted transition-colors"
            >
              <X size={17} strokeWidth={1.75} />
            </button>
          </div>

          {/* Tools */}
          <div className="px-3 pt-4 pb-2 shrink-0">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/50 px-2 mb-1.5">
              Herramientas
            </p>
            <Link
              href={mapaHref}
              className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              <Map size={16} strokeWidth={1.75} className="text-[var(--color-teal)] shrink-0" />
              Mapa interactivo
            </Link>
            <Link
              href={planearHref}
              className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium text-[var(--color-terracotta)] hover:bg-[var(--color-terracotta)]/8 transition-colors"
            >
              <Compass size={16} strokeWidth={1.75} className="shrink-0" />
              Planeá tu viaje
            </Link>
            <Link
              href={operadoresHref}
              className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              <Users size={16} strokeWidth={1.75} className="text-[var(--color-teal)] shrink-0" />
              Operadores
            </Link>
            <Link
              href="/buscar"
              className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              <Search size={16} strokeWidth={1.75} className="text-[var(--color-teal)] shrink-0" />
              Buscar
            </Link>
          </div>

          <div className="mx-4 h-px bg-border shrink-0" />

          {/* Explorar */}
          <div className="flex-1 overflow-y-auto px-3 pt-3 pb-2">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/50 px-2 mb-1.5">
              Explorar
            </p>
            {[
              { href: '/astronomia', label: 'Astronomía', Icon: Telescope },
              { href: '/escalada', label: 'Escalada', Icon: Pickaxe },
              { href: '/estado', label: 'Estado', Icon: Activity },
              { href: '/fauna', label: 'Fauna', Icon: PawPrint },
              { href: '/flora', label: 'Flora', Icon: Leaf },
              { href: '/parques', label: 'Parques', Icon: Mountain },
              { href: '/senderos', label: 'Senderos', Icon: MapPin },
            ].map(({ href, label, Icon }) => (
              <Link
                key={href}
                href={href}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              >
                <Icon size={15} strokeWidth={1.75} className="text-[var(--color-teal)] shrink-0" />
                {label}
              </Link>
            ))}
            <div className="mt-3 pt-3 border-t border-border">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/50 px-2 mb-1.5">
                Planear
              </p>
              {[
                { href: '/planear', label: 'Itinerario', Icon: Compass },
                { href: '/planear/que-llevar', label: 'Qué llevar', Icon: Backpack },
              ].map(({ href, label, Icon }) => (
                <Link
                  key={href}
                  href={href}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                >
                  <Icon size={15} strokeWidth={1.75} className="text-[var(--color-terracotta)] shrink-0" />
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Bottom */}
          <div className="px-4 py-4 border-t border-border shrink-0 space-y-1">
            {user ? (
              <>
                <Link
                  href="/perfil"
                  className="flex items-center gap-3 px-2 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                >
                  {user.avatarUrl ? (
                    <img src={user.avatarUrl} alt={user.name} className="w-6 h-6 rounded-full object-cover shrink-0" />
                  ) : (
                    <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-[10px] font-semibold text-muted-foreground shrink-0">
                      {user.name[0]?.toUpperCase()}
                    </div>
                  )}
                  <span className="truncate">{user.name}</span>
                </Link>
                {user.email === ADMIN_EMAIL && (
                  <Link
                    href="/admin"
                    className="flex items-center gap-3 px-2 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                  >
                    <ShieldCheck size={15} strokeWidth={1.75} className="shrink-0" />
                    Admin
                  </Link>
                )}
                <form action="/auth/signout" method="POST">
                  <button
                    type="submit"
                    className="w-full flex items-center gap-3 px-2 py-2.5 rounded-xl text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                  >
                    <LogOut size={15} strokeWidth={1.75} className="shrink-0" />
                    Cerrar sesión
                  </button>
                </form>
              </>
            ) : (
              <button
                onClick={handleSignIn}
                className="w-full flex items-center gap-3 px-2 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              >
                <User size={15} strokeWidth={1.75} className="shrink-0" />
                Iniciar sesión
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
