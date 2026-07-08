"use client"

import { useState, useEffect, useRef } from "react"
import { Share2, Link2, Maximize2, X, Check } from "lucide-react"

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  )
}

interface HeroActionsProps {
  imageUrl?: string
  imageAlt?: string
  title?: string
}

export function HeroActions({ imageUrl, imageAlt = "imagen", title }: HeroActionsProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [shareOpen, setShareOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const [instaCopied, setInstaCopied] = useState(false)
  // Start visible — observer will flip to false once hero exits viewport
  const [heroVisible, setHeroVisible] = useState(true)

  const containerRef = useRef<HTMLDivElement>(null)
  // Sentinel sits at the bottom edge of the hero div
  const sentinelRef = useRef<HTMLDivElement>(null)

  // Track whether hero is in the viewport
  useEffect(() => {
    const el = sentinelRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => setHeroVisible(entry.isIntersecting),
      { threshold: 0 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // Escape closes lightbox
  useEffect(() => {
    if (!lightboxOpen) return
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") setLightboxOpen(false) }
    document.addEventListener("keydown", handler)
    return () => document.removeEventListener("keydown", handler)
  }, [lightboxOpen])

  // Lock scroll while lightbox open
  useEffect(() => {
    document.body.style.overflow = lightboxOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [lightboxOpen])

  // Click outside collapses share panel
  useEffect(() => {
    if (!shareOpen) return
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShareOpen(false)
      }
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [shareOpen])

  const getUrl = () => window.location.href

  const doCopy = async (text: string) => {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleCopy = () => doCopy(getUrl())

  const handleWhatsapp = () => {
    const url = getUrl()
    const text = encodeURIComponent(title ? `${title} — ${url}` : url)
    window.open(`https://wa.me/?text=${text}`, "_blank", "noopener,noreferrer")
  }

  const handleInstagram = async () => {
    await navigator.clipboard.writeText(getUrl())
    setInstaCopied(true)
    setTimeout(() => setInstaCopied(false), 2500)
  }

  const btn =
    "flex items-center justify-center w-8 lg:w-9 h-8 lg:h-9 rounded-lg backdrop-blur-sm bg-black/40 border border-white/20 text-white/80 hover:bg-black/65 hover:text-white transition-all cursor-pointer"

  return (
    <>
      {/* Sentinel at the bottom edge of the hero — tracked by IntersectionObserver */}
      <div ref={sentinelRef} className="absolute bottom-0 left-0 w-full h-px pointer-events-none" aria-hidden />

      {/* Buttons — fixed to viewport, fade out when hero exits */}
      <div
        ref={containerRef}
        className={`fixed top-20 lg:top-24 right-2 lg:right-6 flex flex-col items-center gap-1.5 z-20 transition-opacity duration-300 ${heroVisible ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
      >
        {imageUrl && (
          <button
            onClick={() => setLightboxOpen(true)}
            title="Ver imagen completa"
            aria-label="Ver imagen completa"
            className={btn}
          >
            <Maximize2 size={18} />
          </button>
        )}

        <button
          onClick={() => setShareOpen((v) => !v)}
          title="Compartir"
          aria-label="Compartir"
          aria-expanded={shareOpen}
          className={`${btn} ${shareOpen ? "bg-black/65 text-white" : ""}`}
        >
          <Share2 size={18} />
        </button>

        {/* Share sub-actions — slide in when open */}
        <div
          className={`flex flex-col items-center gap-1.5 overflow-hidden transition-all duration-200 ${shareOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0 pointer-events-none"
            }`}
        >
          <button onClick={handleCopy} title="Copiar enlace" aria-label="Copiar enlace" className={btn}>
            {copied ? <Check size={16} className="text-green-400" /> : <Link2 size={16} />}
          </button>

          <button onClick={handleWhatsapp} title="Compartir en WhatsApp" aria-label="Compartir en WhatsApp" className={btn}>
            <WhatsAppIcon />
          </button>

          <div className="relative">
            <button
              onClick={handleInstagram}
              title="Copiar para Instagram"
              aria-label="Copiar enlace para Instagram"
              className={btn}
            >
              {instaCopied ? <Check size={16} className="text-green-400" /> : <InstagramIcon />}
            </button>
            {instaCopied && (
              <div className="absolute top-0 right-11 bg-black/80 text-white text-[11px] px-2.5 py-1.5 rounded-lg whitespace-nowrap pointer-events-none">
                Copiado — pegalo en tu historia
              </div>
            )}
          </div>
        </div>
      </div>

      {lightboxOpen && imageUrl && (
        <div
          className="fixed inset-0 z-50 bg-black/78 flex items-center justify-center p-4"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            onClick={() => setLightboxOpen(false)}
            aria-label="Cerrar"
            className="absolute top-4 right-4 flex items-center justify-center w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageUrl}
            alt={imageAlt}
            className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  )
}
