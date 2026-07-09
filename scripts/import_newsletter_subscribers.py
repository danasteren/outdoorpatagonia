#!/usr/bin/env python3
"""
Importa el export CSV de MailerLite a la tabla `subscribers` de Supabase.
Acepta el formato default de export de MailerLite, con columna "Subscriber" o "email".

Usage: python scripts/import_newsletter_subscribers.py mailerlite_export.csv [--dry-run]
"""

import os, csv, sys, argparse, requests

SUPABASE_URL = os.environ.get("SUPABASE_URL") or os.environ["NEXT_PUBLIC_SUPABASE_URL"]
SUPABASE_KEY = os.environ["SUPABASE_SERVICE_ROLE_KEY"]

HEADERS = {
    "apikey":        SUPABASE_KEY,
    "Authorization": f"Bearer {SUPABASE_KEY}",
    "Content-Type":  "application/json",
    "Prefer":        "resolution=merge-duplicates,return=minimal",
}


def read_emails(path: str) -> list[str]:
    with open(path, newline="", encoding="utf-8-sig") as f:
        reader = csv.DictReader(f)
        field = next(
            (k for k in reader.fieldnames or [] if k.strip().lower() in ("email", "subscriber")),
            None,
        )
        if not field:
            sys.exit(f"No encontré una columna 'email' en {path}. Columnas: {reader.fieldnames}")
        emails = {row[field].strip().lower() for row in reader if row.get(field, "").strip()}
    return sorted(emails)


def import_emails(emails: list[str], dry_run: bool):
    if dry_run:
        print(f"[DRY RUN] Importaría {len(emails)} emails:")
        for email in emails:
            print(f"  {email}")
        return

    rows = [{"email": email, "source": "mailerlite_import"} for email in emails]
    r = requests.post(
        f"{SUPABASE_URL}/rest/v1/subscribers?on_conflict=email",
        headers=HEADERS,
        json=rows,
        timeout=30,
    )
    if not r.ok:
        sys.exit(f"ERROR {r.status_code}: {r.text[:300]}")
    print(f"Importados/actualizados {len(rows)} suscriptores.")


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("csv_path")
    parser.add_argument("--dry-run", action="store_true")
    args = parser.parse_args()

    emails = read_emails(args.csv_path)
    print(f"{len(emails)} emails únicos encontrados en {args.csv_path}")
    import_emails(emails, args.dry_run)


if __name__ == "__main__":
    main()
