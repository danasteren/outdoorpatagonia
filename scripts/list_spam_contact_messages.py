#!/usr/bin/env python3
"""
Lista (solo lectura, no borra nada) los contact_messages cuyo email es de un
dominio de lead-gen, para revisarlos y borrarlos a mano desde /admin.

Las listas repiten las de src/lib/antispam.ts: mantenerlas iguales.

Usage:
  SUPABASE_URL=... SUPABASE_SERVICE_ROLE_KEY=... python scripts/list_spam_contact_messages.py
"""

import os, requests

SUPABASE_URL = os.environ["SUPABASE_URL"].strip().rstrip("/")
SUPABASE_KEY = os.environ["SUPABASE_SERVICE_ROLE_KEY"]

SPAM_DOMAINS = ["ultraleadgeneration.com", "amazingleadgen.com", "boostleadgen.com", "freeb2bdata.org"]
SPAM_PATTERNS = ["leadgen", "b2bdata"]

HEADERS = {"apikey": SUPABASE_KEY, "Authorization": f"Bearer {SUPABASE_KEY}"}


def fetch_all() -> list[dict]:
    rows, offset, page = [], 0, 1000
    while True:
        r = requests.get(
            f"{SUPABASE_URL}/rest/v1/contact_messages",
            headers={**HEADERS, "Range": f"{offset}-{offset + page - 1}"},
            params={"select": "id,created_at,nombre,email,asunto,mensaje", "order": "created_at.desc"},
            timeout=30,
        )
        r.raise_for_status()
        batch = r.json()
        rows += batch
        if len(batch) < page:
            return rows
        offset += page


def is_spam_email(email: str) -> bool:
    domain = email.rsplit("@", 1)[-1].strip().lower()
    return (
        any(domain == d or domain.endswith("." + d) for d in SPAM_DOMAINS)
        or any(p in domain for p in SPAM_PATTERNS)
    )


def main() -> None:
    rows = fetch_all()
    hits = [r for r in rows if is_spam_email(r["email"])]
    for r in hits:
        print(f'{r["created_at"][:16]}  {r["email"]:<40} {r["asunto"]:<28} id={r["id"]}')
    print(f"\n{len(hits)} de {len(rows)} mensajes coinciden. No se borró nada: revisalos y borralos desde /admin.")


if __name__ == "__main__":
    main()
