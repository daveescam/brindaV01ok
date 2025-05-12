import { type CapsuleType, CAPSULES } from "@/lib/types/dynamic-capsule"

export function isTimeWithinRange(currentTime: string, range: { from: string; to: string }): boolean {
  const current = new Date(`1970-01-01T${currentTime}:00`)
  const from = new Date(`1970-01-01T${range.from}:00`)
  const to = new Date(`1970-01-01T${range.to}:00`)

  return current >= from && current <= to
}

export function selectActiveCapsule(context: {
  venue: string
  event: string
  dayOfWeek: string
  currentTime: string
}): CapsuleType | null {
  return (
    CAPSULES.find((capsule) => {
      const isVenueMatch = !capsule.triggerContext.venues || capsule.triggerContext.venues.includes(context.venue)
      const isEventMatch = !capsule.triggerContext.events || capsule.triggerContext.events.includes(context.event)
      const isDayMatch = !capsule.triggerContext.dayOfWeek || capsule.triggerContext.dayOfWeek === context.dayOfWeek
      const isTimeMatch =
        !capsule.triggerContext.timeRange || isTimeWithinRange(context.currentTime, capsule.triggerContext.timeRange)
      return isVenueMatch && isEventMatch && isDayMatch && isTimeMatch
    })?.id || null
  )
}

export function getCapsuleById(id: CapsuleType) {
  return CAPSULES.find((capsule) => capsule.id === id)
}

export const generateCardPrompt = (capsule: (typeof CAPSULES)[0]): string => {
  return `
    Crea un reto para la cápsula "${capsule.name}".
    Tema: ${capsule.theme}
    Emoción nuclear: ${capsule.emotionCore}
    Estilo visual: ${capsule.visualStyle}
    Instrucciones: ${capsule.aiPrompt}
    Ejemplo de formato:
    - Desafío: "¿Qué harías si México pierde por error del árbitro?"
    - Recompensa: "Sticker AR de la bandera ganadora"
    - Tono: "Sarcástico + Cómico"
  `
}

// Mock function to simulate AI card generation
export function generateDynamicCard(capsule: (typeof CAPSULES)[0]) {
  // In a real implementation, this would call an AI service
  return {
    id: `${capsule.id}-${Math.floor(Math.random() * 1000)}`,
    card_title:
      capsule.id === "tigres-rayados"
        ? "🔥 Grito de Gol Absurdo"
        : capsule.id === "borrachos"
          ? "🍺 El Mensaje Borracho"
          : capsule.id === "regios"
            ? "🥩 Maestro de la Carne Asada"
            : "💼 El Networker Agresivo",
    challenge:
      capsule.id === "tigres-rayados"
        ? "Imita cómo reaccionarías si los Tigres ganan por un penal fallido."
        : capsule.id === "borrachos"
          ? "Recrea el último mensaje vergonzoso que enviaste estando borracho."
          : capsule.id === "regios"
            ? "Demuestra cómo defiendes que tu carne asada es la mejor de Monterrey."
            : "Crea tu frase motivacional más exagerada estilo LinkedIn y dila con total seriedad.",
    ai_prompt:
      capsule.id === "tigres-rayados"
        ? "Genera un meme con cara de culpabilidad y texto irónico."
        : capsule.id === "borrachos"
          ? "Crea un sticker que capture la esencia del arrepentimiento post-borrachera."
          : capsule.id === "regios"
            ? "Diseña un meme que celebre el orgullo regio y la cultura de la carne asada."
            : "Genera una imagen de perfil de LinkedIn exageradamente profesional con una frase motivacional absurda.",
    rewards: capsule.rewards,
  }
}
