#!/usr/bin/env python3
"""
Migrates articles from WordPress REST API → Supabase.
Usage: python migrate_wp_articles.py [--dry-run]
"""

import os
import re
import math
import time
import argparse
import requests
from datetime import datetime, timezone
from typing import Optional

# ── Config ────────────────────────────────────────────────────────────────────

WP_BASE_URL      = "https://outdoorpatagonia.com/wp-json/wp/v2"
SUPABASE_URL     = os.environ["SUPABASE_URL"]
SUPABASE_KEY     = os.environ["SUPABASE_SERVICE_ROLE_KEY"]  # needs service role
BATCH_SIZE       = 100   # WordPress API max per_page
SLEEP_BETWEEN    = 0.5   # seconds between WP requests

HEADERS = {
    "apikey":        SUPABASE_KEY,
    "Authorization": f"Bearer {SUPABASE_KEY}",
    "Content-Type":  "application/json",
    "Prefer":        "resolution=merge-duplicates",  # upsert on wp_id
}

# ── Helpers ───────────────────────────────────────────────────────────────────

def fetch_wp_posts(page: int, language: Optional[str] = None) -> list[dict]:
    params = {
        "per_page": BATCH_SIZE,
        "page":     page,
        "status":   "publish",
        "_fields":  "id,slug,title,content,excerpt,date,categories,tags,yoast_head_json,_links",
    }
    if language:
        params["lang"] = language

    r = requests.get(f"{WP_BASE_URL}/posts", params=params, timeout=30)
    if r.status_code in (400, 404):
        return []
    r.raise_for_status()
    posts = r.json()
    # tag each post with the language used to fetch it
    if language:
        for p in posts:
            p["_language"] = language
    return posts


def fetch_all_wp_posts() -> list[dict]:
    posts = []
    for lang in ("es", "en"):
        print(f"  [{lang}] fetching...")
        page = 1
        while True:
            batch = fetch_wp_posts(page, language=lang)
            if not batch:
                break
            posts.extend(batch)
            print(f"  [{lang}] page {page}: {len(batch)} posts (total {len(posts)})")
            page += 1
            time.sleep(SLEEP_BETWEEN)
    return posts


def estimate_reading_time(html: str) -> int:
    text = re.sub(r"<[^>]+>", "", html)
    words = len(text.split())
    return max(1, math.ceil(words / 200))


def detect_language(post: dict) -> str:
    if post.get("_language"):
        return post["_language"]
    yoast = post.get("yoast_head_json", {}) or {}
    og_locale = yoast.get("og_locale", "")
    if og_locale.startswith("en"):
        return "en"
    return "es"


def extract_cover_image(post: dict) -> Optional[str]:
    yoast = post.get("yoast_head_json", {}) or {}
    og_images = yoast.get("og_image", [])
    if og_images and isinstance(og_images, list):
        return og_images[0].get("url")
    return None


def transform(post: dict) -> dict:
    title   = post["title"]["rendered"]
    content = post["content"]["rendered"]
    excerpt_raw = post["excerpt"]["rendered"]
    excerpt = re.sub(r"<[^>]+>", "", excerpt_raw).strip()

    yoast       = post.get("yoast_head_json", {}) or {}
    seo_title   = yoast.get("title") or title
    seo_desc    = yoast.get("description") or excerpt[:160]

    published_at = datetime.fromisoformat(
        post["date"].replace("Z", "+00:00")
    ).astimezone(timezone.utc).isoformat()

    return {
        "wp_id":           post["id"],
        "slug":            post["slug"],
        "title":           title,
        "content":         content,
        "excerpt":         excerpt or None,
        "language":        detect_language(post),
        "cover_image_url": extract_cover_image(post),
        "status":          "published",
        "seo_title":       seo_title,
        "seo_description": seo_desc,
        "reading_time_min": estimate_reading_time(content),
        "published_at":    published_at,
    }


def upsert_to_supabase(rows: list[dict], dry_run: bool) -> None:
    if dry_run:
        print(f"  [DRY RUN] Would upsert {len(rows)} articles")
        for r in rows[:3]:
            print(f"    - [{r['language']}] {r['slug'][:60]}")
        if len(rows) > 3:
            print(f"    ... and {len(rows) - 3} more")
        return

    r = requests.post(
        f"{SUPABASE_URL}/rest/v1/articles",
        headers={**HEADERS, "Prefer": "resolution=merge-duplicates,return=minimal"},
        params={"on_conflict": "slug,language"},
        json=rows,
        timeout=60,
    )
    if not r.ok:
        print(f"  ERROR {r.status_code}: {r.text[:300]}")
        r.raise_for_status()
    print(f"  Upserted {len(rows)} articles ✓")


# ── Main ──────────────────────────────────────────────────────────────────────

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--dry-run", action="store_true",
                        help="Fetch from WP but don't write to Supabase")
    args = parser.parse_args()

    print("Fetching posts from WordPress...")
    posts = fetch_all_wp_posts()
    print(f"\nTotal posts fetched: {len(posts)}")

    print("\nTransforming...")
    rows = [transform(p) for p in posts]

    # Stats
    by_lang = {}
    for r in rows:
        by_lang[r["language"]] = by_lang.get(r["language"], 0) + 1
    for lang, count in sorted(by_lang.items()):
        print(f"  {lang}: {count} articles")

    print(f"\nUpserting to Supabase {'(DRY RUN)' if args.dry_run else ''}...")
    upsert_to_supabase(rows, dry_run=args.dry_run)

    print("\nDone.")


if __name__ == "__main__":
    main()
