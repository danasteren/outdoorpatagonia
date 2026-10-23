#!/usr/bin/env python3
"""
Crea o actualiza artículos nuevos (no migrados de WordPress) en la tabla
`articles` a partir de un JSON en seo/articles/. Es idempotente: hace upsert
por (slug, language), así que se puede correr de nuevo después de editar el
texto.

Cada fila del JSON lleva los campos de `articles` más `content_file`, el HTML
del cuerpo (relativo al JSON). Si el HTML tiene un <section class="faq"> con
pares <h3>pregunta</h3><p>respuesta</p>, se le agrega el JSON-LD FAQPage al
final del contenido (mismo patrón que los artículos de WordPress).

La portada no se guarda en cover_image_url: va en src/data/cover-fallbacks.ts,
que es donde vive la atribución de las fotos de Wikimedia Commons. El par ES ↔ EN
con slugs distintos se declara en src/lib/article-translations.ts.

Usage:
  SUPABASE_URL=... SUPABASE_SERVICE_ROLE_KEY=... \
    python scripts/upsert_articles.py seo/articles/tulipanes-trevelin.json [--dry-run]
"""

import os
import re
import json
import html
import argparse
from pathlib import Path
from typing import Optional

import requests

SUPABASE_URL = os.environ["SUPABASE_URL"]
SUPABASE_KEY = os.environ["SUPABASE_SERVICE_ROLE_KEY"]

HEADERS = {
    "apikey":        SUPABASE_KEY,
    "Authorization": f"Bearer {SUPABASE_KEY}",
    "Content-Type":  "application/json",
    "Prefer":        "resolution=merge-duplicates,return=representation",
}

WORDS_PER_MINUTE = 200


def plain_text(fragment: str) -> str:
    return html.unescape(re.sub(r"\s+", " ", re.sub(r"<[^>]+>", " ", fragment))).strip()


def faq_json_ld(content: str) -> Optional[str]:
    section = re.search(r'<section class="faq">(.*?)</section>', content, re.S)
    if not section:
        return None
    pairs = re.findall(r"<h3>(.*?)</h3>\s*<p>(.*?)</p>", section.group(1), re.S)
    if not pairs:
        return None
    data = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": plain_text(q),
                "acceptedAnswer": {"@type": "Answer", "text": plain_text(a)},
            }
            for q, a in pairs
        ],
    }
    return f'<script type="application/ld+json">{json.dumps(data, ensure_ascii=False)}</script>'


def build_row(entry: dict, base_dir: Path) -> dict:
    row = {k: v for k, v in entry.items() if k != "content_file"}
    content = (base_dir / entry["content_file"]).read_text(encoding="utf-8").strip()
    words = len(plain_text(content).split())
    faq = faq_json_ld(content)
    if faq:
        content = f"{content}\n{faq}"
    row.update(
        content=content,
        reading_time_min=max(1, round(words / WORDS_PER_MINUTE)),
        status="published",
        cover_image_url=None,
    )
    return row


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("json_file")
    parser.add_argument("--dry-run", action="store_true")
    args = parser.parse_args()

    path = Path(args.json_file)
    rows = [build_row(e, path.parent) for e in json.loads(path.read_text(encoding="utf-8"))]

    for r in rows:
        print(f"{r['language']} /{r['slug']}  {len(r['seo_title'])} chars título, "
              f"{len(r['seo_description'])} chars descripción, {r['reading_time_min']} min")
    if args.dry_run:
        return

    resp = requests.post(
        f"{SUPABASE_URL}/rest/v1/articles",
        headers=HEADERS,
        params={"on_conflict": "slug,language"},
        json=rows,
        timeout=30,
    )
    resp.raise_for_status()
    print(f"OK: {len(resp.json())} filas guardadas")


if __name__ == "__main__":
    main()
