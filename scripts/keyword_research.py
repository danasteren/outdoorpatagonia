#!/usr/bin/env python3
"""
Weekly keyword research: finds what people search that the site doesn't cover well yet.

Sources:
  - Google Search Console (real queries where the site already shows up)
  - Google Autocomplete (what people type around seed topics in seo/seeds.txt)

Output: seo/reports/YYYY-MM-DD.md (human/agent readable) + .json (raw data).

Usage: python3 scripts/keyword_research.py [--days 28] [--no-gsc] [--seeds seo/seeds.txt] [--out seo/reports]

Env:
  GSC_AUTH=proxy            cloud routines: the environment's "GCP access token" credential
                            injects auth on *.googleapis.com, so the key never reaches this script
  GSC_SERVICE_ACCOUNT_FILE  local runs: path to the service account JSON key
  GSC_SITE_URL              default "sc-domain:outdoorpatagonia.com"
"""

from __future__ import annotations

import os, re, json, time, argparse, unicodedata, requests
from datetime import date, timedelta
from pathlib import Path
from urllib.parse import quote

ROOT = Path(__file__).resolve().parent.parent
SITE = "https://outdoorpatagonia.com"

# Rough organic CTR by position — used only to flag pages far below expectation.
EXPECTED_CTR = {1: .28, 2: .15, 3: .10, 4: .07, 5: .05, 6: .04, 7: .03, 8: .025, 9: .02, 10: .018}

AUTOCOMPLETE_PREFIXES = ("como", "donde", "cuando", "que")
AUTOCOMPLETE_SUFFIXES = "abcdefghijlmnoprstv"
STOPWORDS = {"de", "del", "la", "el", "los", "las", "y", "en", "a", "the"}


def norm(s: str) -> str:
    s = unicodedata.normalize("NFD", s.lower())
    return "".join(c for c in s if unicodedata.category(c) != "Mn").strip()


# ── Search Console ────────────────────────────────────────────────────────────

def gsc_enabled() -> bool:
    return os.environ.get("GSC_AUTH") == "proxy" or bool(os.environ.get("GSC_SERVICE_ACCOUNT_FILE"))


def gsc_session():
    if os.environ.get("GSC_AUTH") == "proxy":
        return requests.Session()

    from google.oauth2 import service_account
    from google.auth.transport.requests import AuthorizedSession

    path = os.path.expanduser(os.environ["GSC_SERVICE_ACCOUNT_FILE"])
    creds = service_account.Credentials.from_service_account_file(
        path, scopes=["https://www.googleapis.com/auth/webmasters.readonly"])
    return AuthorizedSession(creds)


def fetch_gsc_rows(days: int) -> list[dict]:
    site = os.environ.get("GSC_SITE_URL", "sc-domain:outdoorpatagonia.com")
    session = gsc_session()
    end = date.today() - timedelta(days=3)  # GSC data lags ~2-3 days
    start = end - timedelta(days=days)
    url = f"https://www.googleapis.com/webmasters/v3/sites/{quote(site, safe='')}/searchAnalytics/query"

    rows, start_row = [], 0
    while True:
        r = session.post(url, json={
            "startDate": start.isoformat(), "endDate": end.isoformat(),
            "dimensions": ["query", "page"], "rowLimit": 25000, "startRow": start_row,
        }, timeout=60)
        r.raise_for_status()
        batch = r.json().get("rows", [])
        rows += [{
            "query": row["keys"][0], "page": row["keys"][1],
            "clicks": row["clicks"], "impressions": row["impressions"],
            "ctr": row["ctr"], "position": row["position"],
        } for row in batch]
        if len(batch) < 25000:
            return rows
        start_row += 25000


def best_row_per_query(rows: list[dict]) -> dict[str, dict]:
    best = {}
    for row in rows:
        cur = best.get(row["query"])
        if not cur or row["impressions"] > cur["impressions"]:
            best[row["query"]] = row
    return best


def striking_distance(best: dict[str, dict], min_impr: int) -> list[dict]:
    """Queries ranking on page 1 bottom / pages 2-3: small push → big traffic gain."""
    out = [r for r in best.values() if 8 <= r["position"] <= 30 and r["impressions"] >= min_impr]
    return sorted(out, key=lambda r: -r["impressions"])[:60]


def low_ctr(best: dict[str, dict], min_impr: int) -> list[dict]:
    """Top-10 rankings whose CTR is under half the expected — title/description problem."""
    out = []
    for r in best.values():
        pos = round(r["position"])
        if 1 <= pos <= 10 and r["impressions"] >= min_impr and r["ctr"] < EXPECTED_CTR[pos] / 2:
            out.append({**r, "expected_ctr": EXPECTED_CTR[pos]})
    return sorted(out, key=lambda r: -r["impressions"])[:40]


# ── Autocomplete ──────────────────────────────────────────────────────────────

def autocomplete(q: str) -> list[str]:
    try:
        r = requests.get("https://suggestqueries.google.com/complete/search",
                         params={"client": "firefox", "hl": "es", "gl": "ar", "q": q}, timeout=15)
        r.raise_for_status()
        return r.json()[1]
    except Exception:
        return []


def expand_seed(seed: str) -> list[str]:
    variants = [seed] + [f"{p} {seed}" for p in AUTOCOMPLETE_PREFIXES] \
                      + [f"{seed} {l}" for l in AUTOCOMPLETE_SUFFIXES]
    found = []
    for v in variants:
        for s in autocomplete(v):
            if norm(s) not in {norm(f) for f in found}:
                found.append(s)
        time.sleep(0.3)
    return found


# ── Site inventory ────────────────────────────────────────────────────────────

def catalog_pages() -> list[tuple[str, set[str]]]:
    """(url, slug tokens) for every catalog entry, to spot suggestions we already cover."""
    pages = []
    for f in sorted((ROOT / "src/lib").glob("*/catalog.ts")):
        section = f.parent.name
        for slug in re.findall(r'^\s*slug:\s*"([^"]+)"', f.read_text(), re.M):
            tokens = {t for t in slug.split("-") if t not in STOPWORDS}
            pages.append((f"/{section}/{slug}", tokens))
    return pages


def coverage(suggestion: str, gsc_queries: dict[str, dict], pages) -> str | None:
    n = norm(suggestion)
    if n in gsc_queries:
        r = gsc_queries[n]
        return f"GSC pos {r['position']:.0f} → {r['page'].replace(SITE, '')}"
    words = set(re.split(r"\W+", n))
    for url, tokens in pages:
        if tokens and tokens <= words:
            return f"entrada relacionada {url}"
    return None


# ── Report ────────────────────────────────────────────────────────────────────

def pct(x: float) -> str:
    return f"{x * 100:.1f}%"


def write_report(out_dir: Path, data: dict):
    out_dir.mkdir(parents=True, exist_ok=True)
    stamp = date.today().isoformat()
    (out_dir / f"{stamp}.json").write_text(json.dumps(data, ensure_ascii=False, indent=2))

    md = [f"# Keyword research — {stamp}", ""]
    if data["gsc_enabled"]:
        md += [f"Search Console: {data['gsc_total_queries']} queries en los últimos {data['days']} días.", "",
               "## Cerca del top (posición 8–30)", "",
               "Empujar estas páginas (contenido más completo, FAQ, links internos) o crear entrada dedicada.", "",
               "| Query | Impr. | Pos. | Clics | Página |", "|---|---|---|---|---|"]
        md += [f"| {r['query']} | {r['impressions']} | {r['position']:.1f} | {r['clicks']} | {r['page'].replace(SITE, '')} |"
               for r in data["striking_distance"]]
        md += ["", "## CTR bajo en top 10", "",
               "Reescribir title/description de estas páginas.", "",
               "| Query | Impr. | Pos. | CTR | Esperado | Página |", "|---|---|---|---|---|---|"]
        md += [f"| {r['query']} | {r['impressions']} | {r['position']:.1f} | {pct(r['ctr'])} | {pct(r['expected_ctr'])} | {r['page'].replace(SITE, '')} |"
               for r in data["low_ctr"]]
    else:
        md += ["_Search Console no configurado — solo autocompletado._"]

    md += ["", "## Autocompletado por tema", "",
           "Sin cobertura = nadie en el sitio responde esa búsqueda todavía.", ""]
    for seed, items in data["autocomplete"].items():
        uncovered = [i["suggestion"] for i in items if not i["covered_by"]]
        covered = [i for i in items if i["covered_by"]]
        md += [f"### {seed}", "", f"**Sin cobertura ({len(uncovered)}):** " + (", ".join(uncovered) or "—"), ""]
        if covered:
            md += ["Cubiertas: " + "; ".join(f"{i['suggestion']} ({i['covered_by']})" for i in covered), ""]

    path = out_dir / f"{stamp}.md"
    path.write_text("\n".join(md) + "\n")
    return path


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--days", type=int, default=28)
    ap.add_argument("--min-impr", type=int, default=20)
    ap.add_argument("--no-gsc", action="store_true")
    ap.add_argument("--seeds", default=str(ROOT / "seo/seeds.txt"))
    ap.add_argument("--out", default=str(ROOT / "seo/reports"))
    args = ap.parse_args()

    use_gsc = not args.no_gsc and gsc_enabled()
    rows = fetch_gsc_rows(args.days) if use_gsc else []
    best = best_row_per_query(rows)
    best_norm = {norm(q): r for q, r in best.items()}
    print(f"GSC: {len(best)} queries" if use_gsc else "GSC: desactivado")

    pages = catalog_pages()
    seeds = [s.strip() for s in Path(args.seeds).read_text().splitlines()
             if s.strip() and not s.startswith("#")]
    ac = {}
    for i, seed in enumerate(seeds, 1):
        print(f"[{i}/{len(seeds)}] autocompletado: {seed}")
        ac[seed] = [{"suggestion": s, "covered_by": coverage(s, best_norm, pages)} for s in expand_seed(seed)]

    path = write_report(Path(args.out), {
        "days": args.days, "gsc_enabled": use_gsc, "gsc_total_queries": len(best),
        "striking_distance": striking_distance(best, args.min_impr) if use_gsc else [],
        "low_ctr": low_ctr(best, args.min_impr) if use_gsc else [],
        "autocomplete": ac,
    })
    print(f"Reporte: {path}")


if __name__ == "__main__":
    main()
