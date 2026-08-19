#!/usr/bin/env python3
"""
Backfills `cover_image_alt` in Supabase articles from the original WordPress
featured-image alt text / caption. The initial WP→Supabase migration only
copied the cover image URL (via Yoast's og_image), never its alt/credit —
this recovers it directly from the WordPress media API for every article
that's missing it, instead of hardcoding credits one by one.

Usage: python scripts/backfill_cover_image_alt.py [--dry-run]
"""

import os
import re
import time
import argparse
import requests
from typing import Optional

WP_BASE_URL  = "https://outdoorpatagonia.dreamhosters.com/wp-json/wp/v2"
SUPABASE_URL = os.environ["SUPABASE_URL"]
SUPABASE_KEY = os.environ["SUPABASE_SERVICE_ROLE_KEY"]

HEADERS = {
    "apikey":        SUPABASE_KEY,
    "Authorization": f"Bearer {SUPABASE_KEY}",
    "Content-Type":  "application/json",
}


def fetch_pending_articles() -> list[dict]:
    r = requests.get(
        f"{SUPABASE_URL}/rest/v1/articles",
        headers=HEADERS,
        params={
            "select": "slug,language,cover_image_url",
            "cover_image_url": "ilike.*dreamhosters.com*",
            "cover_image_alt": "is.null",
            "limit": 1000,
        },
        timeout=30,
    )
    r.raise_for_status()
    return r.json()


def fetch_alt_text(slug: str, lang: str) -> Optional[str]:
    r = requests.get(
        f"{WP_BASE_URL}/posts",
        params={"slug": slug, "lang": lang, "_embed": "wp:featuredmedia"},
        timeout=30,
    )
    if not r.ok:
        return None
    posts = r.json()
    if not posts:
        return None
    media = posts[0].get("_embedded", {}).get("wp:featuredmedia", [])
    if not media:
        return None
    alt = (media[0].get("alt_text") or "").strip()
    if alt:
        return alt
    caption = media[0].get("caption", {}).get("rendered", "")
    caption = re.sub(r"<[^>]+>", "", caption).strip()
    return caption or None


def update_article(slug: str, lang: str, alt: str, dry_run: bool):
    if dry_run:
        print(f"  [DRY RUN] [{lang}] {slug} → {alt}")
        return
    r = requests.patch(
        f"{SUPABASE_URL}/rest/v1/articles",
        headers=HEADERS,
        params={"slug": f"eq.{slug}", "language": f"eq.{lang}"},
        json={"cover_image_alt": alt},
        timeout=15,
    )
    if not r.ok:
        print(f"  ERROR [{lang}] {slug}: {r.status_code} {r.text[:100]}")


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--dry-run", action="store_true")
    args = parser.parse_args()

    print("Fetching articles missing cover_image_alt...")
    pending = fetch_pending_articles()
    print(f"  {len(pending)} articles pending\n")

    found, missing = 0, []
    for article in pending:
        slug, lang = article["slug"], article["language"]
        alt = fetch_alt_text(slug, lang)
        if alt:
            update_article(slug, lang, alt, args.dry_run)
            found += 1
        else:
            missing.append(f"[{lang}] {slug}")
        time.sleep(0.3)

    print(f"\n{'Would update' if args.dry_run else 'Updated'} {found} articles")
    if missing:
        print(f"\n{len(missing)} without alt text in WordPress (left as null):")
        for m in missing:
            print(f"  - {m}")

    print("\nDone.")


if __name__ == "__main__":
    main()
