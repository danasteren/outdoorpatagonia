'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'
import {
  Menu, X, Map, Compass, Globe, ChevronDown, Users, Search,
  Lightbulb, Landmark, Tent, PawPrint, Leaf, ChefHat,
  BookOpen, Sprout, Recycle, MapPin, Mountain, Download,
} from 'lucide-react'
import { DarkModeToggle } from './DarkModeToggle'
import { LangToggle } from './LangToggle'

type CategoryItem = { label: string; href: string }
type LangHrefs = { esHref: string | null; enHref: string | null; currentLang: 'es' | 'en' }

const CATEGORY_ICONS: Record<string, React.ElementType> = {
  consejos: Lightbulb,
  cultura: Landmark,
  domo: Tent,
  fauna: PawPrint,
  flora: Leaf,
  gastronomía: ChefHat,
  gastronomia: ChefHat,
  historia: BookOpen,
  hongo: Sprout,
  'impacto ambiental': Recycle,
  lugares: MapPin,
  paisajes: Mountain,
  'recursos descargables': Download,
}

function getCatIcon(label: string): React.ElementType {
  return CATEGORY_ICONS[label.toLowerCase()] ?? MapPin
}

export function HeaderShell({
  categories,
  langHrefs,
  lang,
}: {
  categories: CategoryItem[]
  langHrefs: LangHrefs
  lang: string
}) {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const [exploreOpen, setExploreOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const exploreRef = useRef<HTMLDivElement>(null)

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
    setMenuOpen(false)
    setExploreOpen(false)
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

  return (
    <>
      <header
        className={`sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border transition-[box-shadow] duration-200${scrolled ? ' shadow-sm' : ''}`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center gap-2">

          {/* Logo */}
          <Link href={lang === 'en' ? '/en' : '/'} className="flex items-center shrink-0 mr-3">
            <img src="/brand/op_02.svg" alt="Outdoor Patagonia" className="h-9 w-auto dark:hidden" />
            <img src="/brand/op_02_dark.svg" alt="Outdoor Patagonia" className="h-9 w-auto hidden dark:block" />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-0.5 flex-1">

            {/* Explorar dropdown */}
            <div ref={exploreRef} className="relative">
              <button
                onClick={() => setExploreOpen((v) => !v)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  exploreOpen
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
                className={`absolute top-full left-0 mt-2 w-[460px] bg-popover border border-border rounded-xl shadow-modal p-3 z-50 transition-[opacity,transform] duration-150 origin-top-left${
                  exploreOpen
                    ? ' opacity-100 scale-100 pointer-events-auto'
                    : ' opacity-0 scale-95 pointer-events-none'
                }`}
              >
                {/* Directorios de datos */}
                <Link
                  href="/fauna"
                  onClick={() => setExploreOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors mb-1"
                >
                  <PawPrint size={14} strokeWidth={1.75} className="text-[var(--color-teal)] shrink-0" />
                  <span className="font-medium">Fauna patagónica</span>
                  <span className="ml-auto text-[10px] uppercase tracking-widest opacity-40">Directorio</span>
                </Link>
                <div className="h-px bg-border mx-1 mb-2" />
                {/* Artículos por categoría */}
                <div className="grid grid-cols-3 gap-0.5">
                  {categories.map((cat) => {
                    const Icon = getCatIcon(cat.label)
                    return (
                      <Link
                        key={cat.href}
                        href={cat.href}
                        onClick={() => setExploreOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                      >
                        <Icon size={14} strokeWidth={1.75} className="text-[var(--color-teal)] shrink-0" />
                        <span className="truncate font-medium">{cat.label}</span>
                      </Link>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Mapa */}
            <Link
              href={mapaHref}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActiveMapa
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
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActiveOperadores
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
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActivePlanear
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
            <LangToggle {...langHrefs} />
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
        className={`fixed inset-0 z-[1001] md:hidden transition-opacity duration-200${
          menuOpen ? ' opacity-100 pointer-events-auto' : ' opacity-0 pointer-events-none'
        }`}
      >
        <div
          className="absolute inset-0 bg-foreground/20 backdrop-blur-sm"
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />

        <div
          className={`absolute right-0 top-0 bottom-0 w-[280px] bg-background border-l border-border flex flex-col shadow-modal transition-transform duration-300 ease-out${
            menuOpen ? ' translate-x-0' : ' translate-x-full'
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
            {/* Directorios de datos */}
            <Link
              href="/fauna"
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              <PawPrint size={15} strokeWidth={1.75} className="text-[var(--color-teal)] shrink-0" />
              Fauna patagónica
            </Link>
            <div className="mx-2 my-2 h-px bg-border" />
            {/* Artículos por categoría */}
            {categories.map((cat) => {
              const Icon = getCatIcon(cat.label)
              return (
                <Link
                  key={cat.href}
                  href={cat.href}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                >
                  <Icon size={15} strokeWidth={1.75} className="text-[var(--color-teal)] shrink-0" />
                  {cat.label}
                </Link>
              )
            })}
          </div>

          {/* Bottom */}
          <div className="px-5 py-4 border-t border-border shrink-0">
            <LangToggle {...langHrefs} />
          </div>
        </div>
      </div>
    </>
  )
}
