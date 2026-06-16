const TAG = process.env.NEXT_PUBLIC_AMAZON_TAG ?? "";

export function amazonSearchUrl(query: string): string {
  const params = new URLSearchParams({ k: query });
  if (TAG) params.set("tag", TAG);
  return `https://www.amazon.com/s?${params}`;
}
