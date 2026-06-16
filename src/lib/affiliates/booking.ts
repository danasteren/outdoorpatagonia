const AID = process.env.NEXT_PUBLIC_BOOKING_AID ?? "";

export function bookingSearchUrl(destination: string): string {
  const params = new URLSearchParams({ ss: destination, lang: "es" });
  if (AID) params.set("aid", AID);
  return `https://www.booking.com/searchresults.es.html?${params}`;
}
