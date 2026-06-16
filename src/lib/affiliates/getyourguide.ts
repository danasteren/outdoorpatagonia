const PARTNER_ID = process.env.NEXT_PUBLIC_GYG_PARTNER_ID ?? "";

export function gygSearchUrl(query: string): string {
  const params = new URLSearchParams({ q: query });
  if (PARTNER_ID) params.set("partner_id", PARTNER_ID);
  return `https://www.getyourguide.com/s/?${params}`;
}
