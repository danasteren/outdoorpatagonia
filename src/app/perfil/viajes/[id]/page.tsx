import { notFound } from "next/navigation"
import { getSavedItinerary } from "@/lib/actions/user-data"
import { ItineraryOutput } from "@/components/planner/ItineraryOutput"

export const metadata = {
  title: "Tu viaje — Outdoor Patagonia",
}

export default async function ViajeGuardadoPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const itinerary = await getSavedItinerary(id)
  if (!itinerary) notFound()

  return (
    <div className="px-4 sm:px-6 py-8">
      <ItineraryOutput
        result={itinerary.result}
        form={itinerary.form_data}
        alreadySaved
        backHref="/perfil"
        backLabel="Volver a mi perfil"
      />
    </div>
  )
}
