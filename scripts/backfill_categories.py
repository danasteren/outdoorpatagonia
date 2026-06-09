#!/usr/bin/env python3
"""
Backfills the `category` field in Supabase articles from WordPress categories.
Usage: python scripts/backfill_categories.py [--dry-run]
"""

import os, re, time, argparse, requests

WP_BASE_URL  = "https://outdoorpatagonia.com/wp-json/wp/v2"
SUPABASE_URL = os.environ["SUPABASE_URL"]
SUPABASE_KEY = os.environ["SUPABASE_SERVICE_ROLE_KEY"]

HEADERS = {
    "apikey":        SUPABASE_KEY,
    "Authorization": f"Bearer {SUPABASE_KEY}",
    "Content-Type":  "application/json",
}


def fetch_category_map(lang: str) -> dict[int, str]:
    r = requests.get(f"{WP_BASE_URL}/categories", params={"per_page": 100, "lang": lang}, timeout=30)
    r.raise_for_status()
    return {c["id"]: c["name"] for c in r.json() if c["name"] != "Uncategorized"}


def fetch_posts(lang: str) -> list[dict]:
    posts, page = [], 1
    while True:
        r = requests.get(
            f"{WP_BASE_URL}/posts",
            params={"per_page": 100, "page": page, "status": "publish",
                    "_fields": "id,slug,categories", "lang": lang},
            timeout=30,
        )
        if r.status_code in (400, 404):
            break
        r.raise_for_status()
        batch = r.json()
        if not batch:
            break
        posts.extend(batch)
        page += 1
        time.sleep(0.3)
    return posts


def update_article(slug: str, lang: str, category: str, dry_run: bool):
    if dry_run:
        print(f"  [DRY RUN] [{lang}] {slug} → {category}")
        return
    r = requests.patch(
        f"{SUPABASE_URL}/rest/v1/articles",
        headers=HEADERS,
        params={"slug": f"eq.{slug}", "language": f"eq.{lang}"},
        json={"category": category},
        timeout=15,
    )
    if not r.ok:
        print(f"  ERROR [{lang}] {slug}: {r.status_code} {r.text[:100]}")


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--dry-run", action="store_true")
    args = parser.parse_args()

    for lang in ("es", "en"):
        print(f"\n[{lang}] Fetching categories...")
        cat_map = fetch_category_map(lang)
        print(f"  {len(cat_map)} categories: {list(cat_map.values())}")

        print(f"[{lang}] Fetching posts...")
        posts = fetch_posts(lang)
        print(f"  {len(posts)} posts")

        updated = 0
        for post in posts:
            cat_ids = [cid for cid in post.get("categories", []) if cid in cat_map]
            if not cat_ids:
                continue
            category = cat_map[cat_ids[0]]
            update_article(post["slug"], lang, category, args.dry_run)
            updated += 1

        print(f"  {'Would update' if args.dry_run else 'Updated'} {updated} articles")

    print("\nDone.")


if __name__ == "__main__":
    main()
