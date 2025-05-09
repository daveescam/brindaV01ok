import type { UnifiedCard } from "./unified-card"
import type { Wallet } from "./wallet-engine"

// Tipos de verificación
export type VerificationType = "self" | "group" | "ai" | "photo" | "audio" | "none"

// Estados de verificación
export type VerificationStatus = "idle" | "in-progress" | "verifying" | "completed" | "failed"

// Datos de verificación
export interface VerificationData {
  photo?: string
  audio?: Blob
  text?: string
  groupVotes?: number
  aiVerification?: any
}

// Sesión de verificación
export interface VerificationSession {
  id: string
  cardId: string
  capsuleId: string
  verificationType: VerificationType
  status: VerificationStatus
  startTime: Date
  endTime?: Date
  points: number
  emotionalIntensity: number
  socialTriggerActivated: boolean
  verificationData?: VerificationData
  feedback?: string
  venueId?: string
  tableId?: string
  campaignId?: string
  participantCount?: number
}

// Crear una nueva sesión de verificación
export function createVerificationSession(
  cardId: string,
  capsuleId: string,
  verificationType: VerificationType,
  venueId?: string,
  tableId?: string,
  campaignId?: string,
  participantCount?: number,
): VerificationSession {
  return {
    id: `verification_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
    cardId,
    capsuleId,
    verificationType,
    status: "idle",
    startTime: new Date(),
    points: 0,
    emotionalIntensity: 0,
    socialTriggerActivated: false,
    venueId,
    tableId,
    campaignId,
    participantCount: participantCount || 1,
  }
}

// Iniciar la verificación
export function startVerification(session: VerificationSession): VerificationSession {
  return {
    ...session,
    status: "in-progress",
    startTime: new Date(),
  }
}

// Completar la verificación (antes de verificar)
export function completeVerification(session: VerificationSession): VerificationSession {
  return {
    ...session,
    status: "verifying",
  }
}

// Verificar el reto
export async function verifyChallenge(
  session: VerificationSession,
  data: VerificationData,
): Promise<VerificationSession> {
  // Simulamos la verificación según el tipo
  let success = false
  let points = 0
  let emotionalIntensity = 0
  let socialTriggerActivated = false

  switch (session.verificationType) {
    case "self":
      // Auto-verificación siempre tiene éxito
      success = true
      points = 5
      emotionalIntensity = 10
      break

    case "group":
      // Verificación grupal basada en votos
      if (data.groupVotes) {
        // El umbral depende del número de participantes
        const threshold = Math.max(3, Math.ceil(session.participantCount! * 0.5))
        success = data.groupVotes >= threshold
        points = success ? 10 + data.groupVotes : 0
        emotionalIntensity = success ? 15 + Math.min(data.groupVotes, 10) : 0

        // Mayor probabilidad de activar desencadenante social en grupo
        socialTriggerActivated = success && Math.random() < 0.4
      }
      break

    case "photo":
      // Verificación por foto (simulada)
      if (data.photo) {
        // En una implementación real, aquí iría el análisis de la imagen
        success = Math.random() < 0.9 // 90% de éxito
        points = success ? 8 : 0
        emotionalIntensity = success ? 12 : 0
        socialTriggerActivated = success && Math.random() < 0.25
      }
      break

    case "audio":
      // Verificación por audio (simulada)
      if (data.audio) {
        // En una implementación real, aquí iría el análisis del audio
        success = Math.random() < 0.85 // 85% de éxito
        points = success ? 8 : 0
        emotionalIntensity = success ? 12 : 0
        socialTriggerActivated = success && Math.random() < 0.25
      }
      break

    case "ai":
      // Verificación por IA (simulada)
      success = Math.random() < 0.8 // 80% de éxito
      points = success ? 15 : 0
      emotionalIntensity = success ? 20 : 0
      socialTriggerActivated = success && Math.random() < 0.3
      break

    default:
      success = true
      points = 5
      emotionalIntensity = 5
  }

  // Bonus por campaña si existe
  if (success && session.campaignId) {
    points += 5
    emotionalIntensity += 5
  }

  // Bonus por participantes
  if (success && session.participantCount && session.participantCount > 1) {
    points += Math.min(session.participantCount, 10)
    emotionalIntensity += Math.min(session.participantCount * 2, 10)
  }

  // Actualizar la sesión
  return {
    ...session,
    status: success ? "completed" : "failed",
    points,
    emotionalIntensity,
    socialTriggerActivated,
    endTime: new Date(),
    verificationData: data,
  }
}

// Procesar recompensas
export function processRewards(
  session: VerificationSession,
  wallet: Wallet,
  card: UnifiedCard,
): { session: VerificationSession; rewards: string[] } {
  // Lista de recompensas obtenidas
  const rewards: string[] = []

  // Si la verificación fue exitosa
  if (session.status === "completed") {
    // Recompensa básica
    rewards.push(card.reward_type)

    // Recompensa por desencadenante social
    if (session.socialTriggerActivated) {
      rewards.push("social_bonus")
    }

    // Recompensa por intensidad emocional alta
    if (session.emotionalIntensity > 20) {
      rewards.push("emotional_bonus")
    }

    // Recompensa por puntos altos
    if (session.points > 15) {
      rewards.push("points_bonus")
    }

    // Recompensa por campaña
    if (session.campaignId) {
      rewards.push(`campaign_${session.campaignId}`)
    }
  }

  return { session, rewards }
}

// Determinar el tipo de verificación adecuado para una carta
export function determineVerificationType(card: UnifiedCard): VerificationType {
  // Si la carta ya tiene un tipo de verificación definido, usarlo
  if (card.verification_type) {
    return card.verification_type as VerificationType
  }

  // Determinar según el nivel emocional y tipo de reto
  if (card.emotional_tier === "chaotic") {
    return "group"
  } else if (card.emotional_tier === "intense") {
    if (card.challenge_type === "duet") {
      return "photo"
    } else {
      return Math.random() > 0.5 ? "audio" : "photo"
    }
  } else {
    return "self"
  }
}

// Generar feedback de verificación
export function generateVerificationFeedback(session: VerificationSession): string {
  if (session.status === "completed") {
    let feedback = "¡Has completado el reto con éxito!"

    if (session.socialTriggerActivated) {
      feedback += " ¡Además, has activado un desencadenante social!"
    }

    if (session.emotionalIntensity > 20) {
      feedback += " Tu intensidad emocional ha aumentado significativamente."
    }

    if (session.points > 15) {
      feedback += ` Has ganado ${session.points} puntos.`
    }

    return feedback
  } else if (session.status === "failed") {
    return "No se ha podido verificar que hayas completado el reto. Puedes intentarlo de nuevo."
  } else {
    return ""
  }
}

// Guardar sesiones de verificación en localStorage
export function saveVerificationSessions(sessions: VerificationSession[]): void {
  if (typeof window !== "undefined") {
    localStorage.setItem("brinda_verification_sessions", JSON.stringify(sessions))
  }
}

// Cargar sesiones de verificación desde localStorage
export function loadVerificationSessions(): VerificationSession[] {
  if (typeof window !== "undefined") {
    const data = localStorage.getItem("brinda_verification_sessions")
    if (data) {
      try {
        const sessions = JSON.parse(data) as VerificationSession[]

        // Convertir fechas de string a Date
        return sessions.map((session) => ({
          ...session,
          startTime: new Date(session.startTime),
          endTime: session.endTime ? new Date(session.endTime) : undefined,
        }))
      } catch (e) {
        console.error("Error parsing verification sessions:", e)
      }
    }
  }
  return []
}
