#!/usr/bin/env python3
"""
Auditoría de solo lectura de la tabla `articles`: cuerpos incompletos y fotos perdidas.

Solo hace GET contra Supabase (ningún UPDATE, INSERT ni DELETE) y escribe el
reporte en docs/audits/2026-11-contenido-articulos.md. Correrlo de nuevo
reescribe todo lo que está arriba de la línea `<!-- HIPOTESIS -->`; lo de abajo
(hipótesis y notas a mano) se conserva.

Por artículo mide: palabras de texto visible, H2/H3, secciones H2 con menos de
40 palabras, reading_time_min guardado vs. calculado (misma fórmula que
scripts/migrate_wp_articles.py, pero sobre el contenido actual), relación de
palabras con su par ES↔EN, fotos originales vs. las que sobreviven a
fixLegacyImages (port de src/lib/legacy-images.ts) y si la portada cae al
fallback de Wikimedia.

Usage:
  SUPABASE_URL=... SUPABASE_SERVICE_ROLE_KEY=... python scripts/audit_articles.py [--out RUTA]
"""

import argparse, html as htmllib, math, os, re, sys
from pathlib import Path

import requests

ROOT = Path(__file__).resolve().parent.parent
DEFAULT_OUT = ROOT / "docs" / "audits" / "2026-11-contenido-articulos.md"
MARKER = "<!-- HIPOTESIS -->"

SHORT_SECTION_WORDS = 40   # una sección H2 con menos palabras cuenta como vacía
SHORT_ARTICLE_WORDS = 300  # un artículo con menos palabras cuenta como corto
PAIR_RATIO = 0.5           # par con menos de la mitad de palabras que el otro idioma


# ── Datos del repo (se leen de los .ts para no copiarlos a mano) ────────────

def read_ts(rel: str) -> str:
    return (ROOT / rel).read_text(encoding="utf8")

LEGACY_IMAGES = set(re.findall(r'^\s*"([^"]+)",?\s*$', read_ts("src/data/legacy-images.ts"), re.M))
COVER_FALLBACK_SLUGS = set(re.findall(r'^\s*"([^"]+)":\s*[A-Z]+,', read_ts("src/data/cover-fallbacks.ts"), re.M))
_pairs = re.findall(r'\{\s*es:\s*"([^"]+)",\s*en:\s*"([^"]+)"\s*\}', read_ts("src/lib/article-translations.ts"))
ES_TO_EN = dict(_pairs)
EN_TO_ES = {en: es for es, en in _pairs}


# ── Port de fixLegacyImages (src/lib/legacy-images.ts) ──────────────────────

DEAD_HOST = "outdoorpatagonia.dreamhosters.com"
DEAD_PREFIX = re.compile(r"^https?://outdoorpatagonia\.dreamhosters\.com/wp-content/uploads/")
DEAD_URL = re.compile(r"https?://outdoorpatagonia\.dreamhosters\.com/wp-content/uploads/[^\"'\s)<>,]+")
STORAGE_BASE = "STORAGE/"  # el valor real no importa: solo se compara si hay copia


def original_path(path: str) -> str:
    path = re.sub(r"-\d+x\d+(\.\w+)$", r"\1", path)
    return re.sub(r"-scaled(\.\w+)$", r"\1", path)


def recover(url: str):
    path = original_path(DEAD_PREFIX.sub("", url).split("?")[0])
    return STORAGE_BASE + path if path in LEGACY_IMAGES else None


def legacy_img_urls(h: str) -> list:
    out = []
    for tag in re.findall(r"<img\b[^>]*>", h):
        m = re.search(r'\b(?:data-src|src)="(https?://outdoorpatagonia\.dreamhosters\.com[^"]+)"', tag)
        if m:
            out.append(m.group(1))
    return out


def drop_if_all_lost(m) -> str:
    block = m.group(0)
    urls = legacy_img_urls(block)
    return "" if urls and all(not recover(u) for u in urls) else block


def fix_legacy_images(h: str) -> str:
    if DEAD_HOST not in h:
        return h
    h = re.sub(r"<figure\b[^>]*>[\s\S]*?</figure>", drop_if_all_lost, h)
    h = re.sub(r'<div class="w-gallery-item">[\s\S]*?</div>[\s\S]*?</div>', drop_if_all_lost, h)

    def img(m):
        tag = m.group(0)
        urls = legacy_img_urls(tag)
        if not urls:
            return tag
        return "" if not recover(urls[0]) else tag  # lo que sigue no cambia el conteo

    return re.sub(r"<img\b[^>]*>", img, h)


def count_imgs(h: str) -> int:
    return len(re.findall(r"<img\b", h))


# ── Métricas de texto ───────────────────────────────────────────────────────

def visible_text(h: str) -> str:
    h = re.sub(r"<(script|style)\b[\s\S]*?</\1>", " ", h, flags=re.I)
    h = re.sub(r"<[^>]+>", " ", h)
    return htmllib.unescape(h)


def words(h: str) -> int:
    return len(visible_text(h).split())


TOC_TITLE = re.compile(r"índice|indice|table of contents|^contents$|^contenidos?$", re.I)


def h2_sections(h: str) -> list:
    """Palabras bajo cada H2 (incluye sus H3) hasta el próximo H2."""
    parts = re.split(r"<h2\b[^>]*>", h, flags=re.I)[1:]
    out = []
    for p in parts:
        title_html, _, body = p.partition("</h2>")
        title = " ".join(visible_text(title_html).split())
        if TOC_TITLE.search(title):
            continue  # el índice es una lista de links, no una sección de contenido
        out.append((title, words(body)))
    return out


def reading_time(h: str) -> int:
    # Misma fórmula que migrate_wp_articles.py (tags fuera, palabras / 200).
    text = re.sub(r"<[^>]+>", "", h)
    return max(1, math.ceil(len(text.split()) / 200))


# ── Supabase (solo GET) ─────────────────────────────────────────────────────

def fetch_all(url: str, key: str) -> list:
    headers = {"apikey": key, "Authorization": f"Bearer {key}"}
    cols = "id,slug,language,category,title,status,content,cover_image_url,reading_time_min,wp_id,updated_at"
    rows, offset, page = [], 0, 50
    while True:
        r = requests.get(
            f"{url}/rest/v1/articles",
            headers={**headers, "Range": f"{offset}-{offset + page - 1}"},
            params={"select": cols, "order": "id.asc"},
            timeout=60,
        )
        r.raise_for_status()
        batch = r.json()
        rows += batch
        if len(batch) < page:
            return rows
        offset += page


def cover_state(a: dict) -> str:
    c = a.get("cover_image_url")
    if not c:
        return "fallback" if a["slug"] in COVER_FALLBACK_SLUGS else "sin portada"
    if DEAD_PREFIX.match(c) and not recover(c):
        return "fallback" if a["slug"] in COVER_FALLBACK_SLUGS else "perdida, sin fallback"
    return "propia"


def broken_anchors(h: str) -> int:
    """Enlaces `#ancla` del índice sin un id/name que los reciba en el mismo contenido."""
    ids = set(re.findall(r'\b(?:id|name)="([^"]+)"', h))
    return sum(1 for a in set(re.findall(r'href="#([^"]+)"', h)) if a not in ids)


def analyze(a: dict) -> dict:
    raw = a.get("content") or ""
    fixed = fix_legacy_images(raw)
    secs = h2_sections(raw)
    w = words(raw)
    rt_calc = reading_time(raw)
    return {
        **{k: a[k] for k in ("id", "slug", "language", "category", "title", "status", "wp_id")},
        "words": w,
        "h2": len(re.findall(r"<h2\b", raw, flags=re.I)),
        "h3": len(re.findall(r"<h3\b", raw, flags=re.I)),
        "short_secs": sum(1 for _, n in secs if n < SHORT_SECTION_WORDS),
        "empty_titles": [t for t, n in secs if n < SHORT_SECTION_WORDS],
        "rt_saved": a.get("reading_time_min"),
        "rt_calc": rt_calc,
        "imgs": count_imgs(raw),
        "imgs_ok": count_imgs(fixed),
        "cover": cover_state(a),
        "broken_anchors": broken_anchors(raw),
        "updated": (a.get("updated_at") or "")[:10],
    }


def link_pairs(rows: list) -> None:
    by = {(r["language"], r["slug"]): r for r in rows}
    for r in rows:
        r["pair"] = None
        if r["language"] == "es":
            other = by.get(("en", ES_TO_EN.get(r["slug"], r["slug"])))
        else:
            other = by.get(("es", EN_TO_ES.get(r["slug"], r["slug"])))
        if other:
            r["pair"] = other
            hi = max(r["words"], other["words"])
            r["ratio"] = (min(r["words"], other["words"]) / hi) if hi else None
        else:
            r["ratio"] = None


def flags(r: dict) -> list:
    f = []
    if r["short_secs"]:
        f.append("secciones vacías")
    if r["words"] < SHORT_ARTICLE_WORDS:
        f.append("corto")
    if r["ratio"] is not None and r["ratio"] < PAIR_RATIO and r["words"] < r["pair"]["words"]:
        f.append("par más largo")
    if r["rt_saved"] and r["rt_saved"] >= r["rt_calc"] + 2 and r["rt_saved"] >= 2 * r["rt_calc"]:
        f.append("tiempo guardado >> calculado")
    if r["broken_anchors"] >= 3:
        f.append("índice con anclas sin destino")
    if r["imgs"] > r["imgs_ok"]:
        f.append("fotos perdidas")
    if r["cover"] != "propia":
        f.append("portada " + r["cover"])
    return f


def severity(r: dict) -> float:
    s = r["short_secs"] * 1.0
    if r["words"] < SHORT_ARTICLE_WORDS:
        s += 5
    if r["ratio"] is not None and r["ratio"] < PAIR_RATIO and r["words"] < r["pair"]["words"]:
        s += 10 * (1 - r["ratio"])
    if "tiempo guardado >> calculado" in flags(r):
        s += 5
    s += 0.5 * (r["imgs"] - r["imgs_ok"])
    return s


# ── Reporte ─────────────────────────────────────────────────────────────────

def fmt_ratio(r: dict) -> str:
    return f"{r['ratio']:.2f}" if r["ratio"] is not None else "—"


def esc(s: str) -> str:
    return s.replace("|", "\\|")


def render(rows: list) -> str:
    pub = [r for r in rows if r["status"] == "published"]
    es = [r for r in pub if r["language"] == "es"]
    en = [r for r in pub if r["language"] == "en"]
    n_short = lambda rs: sum(1 for r in rs if r["short_secs"])
    n_pair = lambda rs: sum(1 for r in rs if "par más largo" in flags(r))
    n_lost = lambda rs: sum(1 for r in rs if r["imgs"] > r["imgs_ok"])
    n_rt = lambda rs: sum(1 for r in rs if "tiempo guardado >> calculado" in flags(r))
    n_anchor = lambda rs: sum(1 for r in rs if r["broken_anchors"] >= 3)
    n_cover = lambda rs: sum(1 for r in rs if r["cover"] != "propia")
    n_tiny = lambda rs: sum(1 for r in rs if r["words"] < SHORT_ARTICLE_WORDS)
    imgs = sum(r["imgs"] for r in pub)
    imgs_ok = sum(r["imgs_ok"] for r in pub)
    paired = [r for r in pub if r["pair"] and r["pair"]["status"] == "published"]

    L = []
    a = L.append
    a("# Auditoría de contenido de artículos (2026-11)\n")
    a("> Solo lectura. Generado por `scripts/audit_articles.py` (reescribe todo lo que está arriba de la línea `HIPOTESIS`). "
      "Los números son **medidos** sobre la columna `content` de `articles`; las hipótesis sobre la causa están aparte, al final.\n")
    a("## Qué se midió y cómo\n")
    a(f"- **Palabras**: texto visible del HTML (sin etiquetas, `script` ni `style`, entidades decodificadas).")
    a(f"- **Sección vacía**: H2 con menos de {SHORT_SECTION_WORDS} palabras hasta el próximo H2 (los H3 cuentan para su H2).")
    a(f"- **Corto**: menos de {SHORT_ARTICLE_WORDS} palabras.")
    a("- **reading_time**: guardado vs. `ceil(palabras/200)` del contenido actual (misma fórmula que `migrate_wp_articles.py`). "
      "Se marca cuando el guardado es al menos 2 min y el doble del calculado: el contenido de hoy es mucho más corto que el original.")
    a(f"- **Par**: ES↔EN por `PAIRS` de `article-translations.ts` o mismo slug. Se marca si el artículo tiene menos de {int(PAIR_RATIO*100)}% de las palabras de su par.")
    a("- **Fotos**: `<img>` del contenido original vs. las que quedan tras un port de `fixLegacyImages` (`src/lib/legacy-images.ts` con `LEGACY_IMAGES`). Un bloque `<figure>` o de galería sin ninguna foto recuperable se quita entero.")
    a("- **Portada**: `propia` (existe o se recupera), `fallback` (cae a Wikimedia por `COVER_FALLBACKS`), `perdida, sin fallback` o `sin portada`.")
    a("- **Gravedad** (solo para ordenar): secciones vacías + 5 si es corto + hasta 10 por par más largo + 5 por tiempo guardado >> calculado + 0,5 por foto perdida.\n")

    a("## Totales (solo `published`)\n")
    a("| | ES | EN | Total |")
    a("|---|---:|---:|---:|")
    for label, fn in [
        ("Artículos", len),
        (f"Con al menos 1 sección H2 vacía (<{SHORT_SECTION_WORDS} palabras)", n_short),
        (f"Cortos (<{SHORT_ARTICLE_WORDS} palabras)", n_tiny),
        (f"Par con menos de {int(PAIR_RATIO*100)}% de las palabras del otro idioma", n_pair),
        ("Tiempo guardado ≥ 2× el calculado", n_rt),
        ("Índice con 3 o más anclas `#…` sin destino en el cuerpo", n_anchor),
        ("Con fotos perdidas", n_lost),
        ("Portada que no es la propia", n_cover),
    ]:
        a(f"| {label} | {fn(es)} | {fn(en)} | {fn(pub)} |")
    a(f"\nFotos en el HTML: {imgs} originales, {imgs_ok} sobreviven, {imgs - imgs_ok} perdidas "
      f"({(imgs - imgs_ok) / imgs * 100 if imgs else 0:.0f}%). Artículos con par ES↔EN publicado: {len(paired) // 2} pares.")
    others = [r for r in rows if r["status"] != "published"]
    if others:
        a(f"Fuera de los totales: {len(others)} artículos que no están `published` (aparecen en la tabla completa).")
    a("")

    ranked = sorted(rows, key=lambda r: -severity(r))
    worst = [r for r in ranked if severity(r) > 0][:40]
    a("## Peores casos (por gravedad)\n")
    a("| # | Idioma | Slug | Palabras | Par (palabras) | Ratio | H2/H3 | H2 vacíos | Min guardado/calc. | Fotos ok/orig. | Portada | Anclas rotas | `updated_at` | Marcas |")
    a("|--:|---|---|--:|--:|--:|---|--:|---|---|---|--:|---|---|")
    for i, r in enumerate(worst, 1):
        p = r["pair"]
        a(f"| {i} | {r['language']} | `{r['slug']}` | {r['words']} | {p['words'] if p else '—'} | "
          f"{fmt_ratio(r)} | {r['h2']}/{r['h3']} | {r['short_secs']} | "
          f"{r['rt_saved']}/{r['rt_calc']} | {r['imgs_ok']}/{r['imgs']} | {r['cover']} | {r['broken_anchors']} | {r['updated']} | {esc(', '.join(flags(r)))} |")
    a("")

    bad = [r for r in pub if "par más largo" in flags(r) or r["words"] < SHORT_ARTICLE_WORDS]
    if bad:
        from collections import Counter
        a("## Los incompletos (cortos o con par mucho más largo), por `updated_at`\n")
        a("Medido: fecha de última modificación de cada uno. " + ", ".join(
            f"{d}: {n}" for d, n in sorted(Counter(r["updated"] for r in bad).items())) + ".")
        a(f"Con índice de anclas sin destino: {sum(1 for r in bad if r['broken_anchors'] >= 3)} de {len(bad)}.\n")

    a("## Caso testigo: jabalí\n")
    for lang, slug in (("es", "jabali-europeo"), ("en", "wild-boar")):
        r = next((x for x in rows if x["language"] == lang and x["slug"] == slug), None)
        if not r:
            a(f"- `{slug}` ({lang}): **no está en la tabla**.")
            continue
        rank = ranked.index(r) + 1
        a(f"- `{slug}` ({lang}, {r['status']}): {r['words']} palabras, {r['h2']} H2 / {r['h3']} H3, "
          f"{r['short_secs']} H2 con <{SHORT_SECTION_WORDS} palabras, "
          f"reading_time guardado {r['rt_saved']} vs. calculado {r['rt_calc']}, fotos {r['imgs_ok']}/{r['imgs']}, "
          f"portada {r['cover']}, {r['broken_anchors']} anclas del índice sin destino, `updated_at` {r['updated']}, puesto {rank} de {len(ranked)} por gravedad. Marcas: {', '.join(flags(r)) or 'ninguna'}.")
        if r["empty_titles"]:
            a(f"  - H2 casi vacíos: {'; '.join(esc(t) for t in r['empty_titles'])}")
    a("")

    a("## Tabla completa\n")
    a("Ordenada por idioma y gravedad. `—` = sin par.\n")
    a("| Idioma | Slug | Estado | Palabras | Par | Ratio | H2/H3 | H2 vacíos | Min g/c | Fotos ok/orig. | Portada | Anclas rotas | `updated_at` |")
    a("|---|---|---|--:|--:|--:|---|--:|---|---|---|--:|---|")
    for r in sorted(rows, key=lambda r: (r["language"], -severity(r), r["slug"])):
        p = r["pair"]
        a(f"| {r['language']} | `{r['slug']}` | {r['status']} | {r['words']} | {p['words'] if p else '—'} | "
          f"{fmt_ratio(r)} | {r['h2']}/{r['h3']} | {r['short_secs']} | "
          f"{r['rt_saved']}/{r['rt_calc']} | {r['imgs_ok']}/{r['imgs']} | {r['cover']} | {r['broken_anchors']} | {r['updated']} |")
    a("")
    return "\n".join(L)


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--out", default=str(DEFAULT_OUT))
    args = ap.parse_args()

    url = os.environ["SUPABASE_URL"].strip().rstrip("/")
    key = os.environ["SUPABASE_SERVICE_ROLE_KEY"]

    articles = fetch_all(url, key)
    rows = [analyze(a) for a in articles]
    link_pairs(rows)
    body = render(rows)

    out = Path(args.out)
    tail = f"{MARKER}\n"
    if out.exists() and MARKER in out.read_text(encoding="utf8"):
        tail = MARKER + out.read_text(encoding="utf8").split(MARKER, 1)[1]
    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_text(body + "\n" + tail, encoding="utf8")
    print(f"{len(rows)} artículos auditados → {out}")


if __name__ == "__main__":
    sys.exit(main())
