'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect, useRef, useCallback } from 'react'
import {
  Menu, X, Map, Globe, ChevronDown, Users, Search, User, LogOut, ShieldCheck,
} from 'lucide-react'
import { DarkModeToggle } from './DarkModeToggle'
import { LangToggle } from './LangToggle'
import { LangFallbackNotice } from './LangFallbackNotice'
import { useAltLang } from '@/lib/lang-alternate'
import { generateRandomBase64url, generateCodeChallenge } from '@/lib/pkce'
import { SearchOverlay } from './SearchOverlay'
import type { SearchItem } from '@/lib/search/types'
import { EXPLORE_ITEMS, PLAN_ITEMS, TOOL_ITEMS, localizeNavItem, type Lang } from '@/lib/nav-items'

export type AuthUser = { name: string; email: string; avatarUrl: string | null } | null

const ADMIN_EMAIL = 'danasteren@gmail.com'

const T = {
  es: {
    explore: 'Explorar', tools: 'Herramientas', plan: 'Planear', mapLong: 'Mapa interactivo',
    operators: 'Operadores', search: 'Buscar', userMenu: 'Menú de usuario', myProfile: 'Mi perfil',
    signIn: 'Iniciar sesión', signOut: 'Cerrar sesión', menu: 'Menú', openMenu: 'Abrir menú', closeMenu: 'Cerrar menú',
  },
  en: {
    explore: 'Explore', tools: 'Tools', plan: 'Plan', mapLong: 'Interactive map',
    operators: 'Tour operators', search: 'Search', userMenu: 'User menu', myProfile: 'My profile',
    signIn: 'Sign in', signOut: 'Sign out', menu: 'Menu', openMenu: 'Open menu', closeMenu: 'Close menu',
  },
} satisfies Record<Lang, Record<string, string>>


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
  articleItems,
}: {
  lang: Lang
  user: AuthUser
  articleItems: SearchItem[]
}) {
  const pathname = usePathname()
  const altLang = useAltLang()
  const [menuOpen, setMenuOpen] = useState(false)
  const [exploreOpen, setExploreOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const closeSearch = useCallback(() => setSearchOpen(false), [])
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
    setSearchOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const t = T[lang]
  const exploreItems = EXPLORE_ITEMS
    .map((item) => localizeNavItem(item, lang))
    .sort((a, b) => a.label.localeCompare(b.label, lang))
  const planItems = PLAN_ITEMS.map((item) => localizeNavItem(item, lang))
  const toolItems = TOOL_ITEMS.map((item) => localizeNavItem(item, lang))
  // El idioma del selector sale de la ruta del cliente (`lang` viene del servidor
  // y no cambia en las navegaciones del cliente).
  const langToggle = (
    <LangToggle
      currentLang={altLang.current}
      esHref={altLang.current === 'es' ? altLang.pathname : altLang.href}
      enHref={altLang.current === 'en' ? altLang.pathname : altLang.href}
    />
  )

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
      {searchOpen && <SearchOverlay onClose={closeSearch} articleItems={articleItems} lang={lang} />}
      <header
        style={{
          backgroundColor: `color-mix(in oklch, var(--color-background) ${scrolled ? '75%' : '15%'}, transparent)`,
        }}
        className={`sticky top-0 z-50 backdrop-blur-md border-b transition-all duration-300 ${scrolled ? 'border-border shadow-sm' : 'border-transparent'}`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center gap-2">

          {/* Logo */}
          <Link href={lang === 'en' ? '/en' : '/'} className="flex items-center shrink-0 mr-3">
            <img
              src="/brand/op_02.svg"
              alt="Outdoor Patagonia"
              className={`w-auto transition-all duration-300 dark:hidden ${scrolled ? 'h-9' : 'h-11'}`}
            />
            {/* Diferida: con display:none (modo claro) no se descarga */}
            <img
              src="/brand/op_02_dark.svg"
              alt="Outdoor Patagonia"
              loading="lazy"
              className={`hidden w-auto transition-all duration-300 dark:block ${scrolled ? 'h-9' : 'h-11'}`}
            />
          </Link>

          {/* Desktop utilities — Explorar al lado de la lupa, logo queda solo */}
          <div className="hidden md:flex items-center gap-2 ml-auto shrink-0">

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
                {t.explore}
                <ChevronDown
                  size={13}
                  strokeWidth={2}
                  className={`transition-transform duration-200${exploreOpen ? ' rotate-180' : ''}`}
                />
              </button>

              <div
                className={`absolute top-full right-0 mt-2 w-[460px] bg-popover border border-border rounded-xl shadow-modal p-3 z-50 transition-[opacity,transform] duration-150 origin-top-right${exploreOpen
                  ? ' opacity-100 scale-100 pointer-events-auto'
                  : ' opacity-0 scale-95 pointer-events-none'
                  }`}
              >
                <div className="grid grid-cols-2 gap-0.5">
                  {exploreItems.map(({ href, label, Icon }) => (
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
                    {t.tools}
                  </p>
                  <div className="grid grid-cols-2 gap-0.5">
                    {toolItems.map(({ href, label, Icon }) => (
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
                </div>
                <div className="mt-2 pt-2 border-t border-border">
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/50 px-3 mb-1">
                    {t.plan}
                  </p>
                  <div className="grid grid-cols-2 gap-0.5">
                    {planItems.map(({ href, label, Icon }) => (
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

            <div className="w-px h-3.5 bg-border" />
            <button
              onClick={() => setSearchOpen(true)}
              aria-label={t.search}
              className="flex items-center justify-center w-8 h-8 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              <Search size={16} strokeWidth={1.75} />
            </button>
            <div className="w-px h-3.5 bg-border" />

            {/* Auth */}
            {user ? (
              <div ref={userMenuRef} className="relative">
                <button
                  onClick={() => setUserMenuOpen((v) => !v)}
                  aria-label={t.userMenu}
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
                    {t.myProfile}
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
                      {t.signOut}
                    </button>
                  </form>
                </div>
              </div>
            ) : (
              <button
                onClick={handleSignIn}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {t.signIn}
              </button>
            )}

            <div className="w-px h-3.5 bg-border" />
            <DarkModeToggle lang={lang} />
            <div className="w-px h-3.5 bg-border" />
            <div className="px-1">{langToggle}</div>
          </div>

          {/* Mobile: idioma + lupa + dark mode + hamburger */}
          <div className="md:hidden flex items-center gap-1 ml-auto">
            <div className="px-1.5">{langToggle}</div>
            <button
              onClick={() => setSearchOpen(true)}
              aria-label={t.search}
              className="flex items-center justify-center w-9 h-9 rounded-lg text-foreground/70 hover:text-foreground hover:bg-muted transition-colors"
            >
              <Search size={18} strokeWidth={1.75} />
            </button>
            <DarkModeToggle lang={lang} />
            <button
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? t.closeMenu : t.openMenu}
              aria-expanded={menuOpen}
              className="flex items-center justify-center w-9 h-9 rounded-lg text-foreground/70 hover:text-foreground hover:bg-muted transition-colors"
            >
              {menuOpen ? <X size={20} strokeWidth={1.75} /> : <Menu size={20} strokeWidth={1.75} />}
            </button>
          </div>
        </div>
      </header>
      <LangFallbackNotice />

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
              {t.menu}
            </span>
            <button
              onClick={() => setMenuOpen(false)}
              aria-label={t.closeMenu}
              className="w-8 h-8 flex items-center justify-center rounded-lg text-foreground/60 hover:text-foreground hover:bg-muted transition-colors"
            >
              <X size={17} strokeWidth={1.75} />
            </button>
          </div>

          {/* Tools */}
          <div className="px-3 pt-4 pb-2 shrink-0">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/50 px-2 mb-1.5">
              {t.tools}
            </p>
            <Link
              href="/mapa"
              className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              <Map size={16} strokeWidth={1.75} className="text-[var(--color-teal)] shrink-0" />
              {t.mapLong}
            </Link>
            <Link
              href="/operadores"
              className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              <Users size={16} strokeWidth={1.75} className="text-[var(--color-teal)] shrink-0" />
              {t.operators}
            </Link>
          </div>

          <div className="mx-4 h-px bg-border shrink-0" />

          {/* Explorar */}
          <div className="flex-1 overflow-y-auto px-3 pt-3 pb-2">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/50 px-2 mb-1.5">
              {t.explore}
            </p>
            {exploreItems.map(({ href, label, Icon }) => (
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
                {t.plan}
              </p>
              {planItems.map(({ href, label, Icon }) => (
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
                    {t.signOut}
                  </button>
                </form>
              </>
            ) : (
              <button
                onClick={handleSignIn}
                className="w-full flex items-center gap-3 px-2 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              >
                <User size={15} strokeWidth={1.75} className="shrink-0" />
                {t.signIn}
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
