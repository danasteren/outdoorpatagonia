// Catálogo de tipos de alerta disponibles para suscripción por email.
// Agregar acá cada vez que se sume un nuevo tipo de alerta al sitio.
// `id` es el valor que se guarda en notification_preferences.type — no cambiar
// una vez publicado o se pierde el vínculo con las preferencias ya guardadas.

export type NotificationType = {
  id: string
  label: string
  description: string
  defaultEnabled: boolean
}

export const NOTIFICATION_TYPES: NotificationType[] = [
  {
    id: "contenido_nuevo",
    label: "Nuevo contenido",
    description: "Cuando publicamos un artículo, sendero o parque nuevo.",
    defaultEnabled: true,
  },
  {
    id: "incendios",
    label: "Alertas de incendios",
    description: "Focos de calor activos detectados por NASA FIRMS en Patagonia.",
    defaultEnabled: false,
  },
  {
    id: "volcanes",
    label: "Actividad volcánica",
    description: "Cambios de alerta en volcanes patagónicos (SERNAGEOMIN).",
    defaultEnabled: false,
  },
]
