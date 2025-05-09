import type { CapsuleType } from "./capsule-engine"
import type { UnifiedCard } from "./unified-card"
import { generateUnifiedCard } from "./unified-card"

// Tipo de sesión de mesa
export interface TableSession {
  id: string
  venueId: string
  tableId: string
  campaignId?: string
  capsuleType: CapsuleType
  emotionalTier: "mild" | "intense" | "chaotic"
  participants: Participant[]
  activeCards: UnifiedCard[]
  completedCards: string[]
  startTime: Date
  lastActivity: Date
  isActive: boolean
  qrCodeUrl?: string
  shareUrl?: string
}

// Tipo de participante
export interface Participant {
  id: string
  name: string
  joinTime: Date
  points: number
  completedChallenges: string[]
  emotionalIntensity: number
}

// Crear una nueva sesión de mesa
export function createTableSession(
  venueId: string,
  tableId: string,
  capsuleType: CapsuleType = "borrachos",
  emotionalTier: "mild" | "intense" | "chaotic" = "intense",
  campaignId?: string,
): TableSession {
  const sessionId = `session_${venueId}_${tableId}_${Date.now()}`

  // Generar URL para compartir
  const shareUrl = generateShareUrl(sessionId, venueId, tableId, capsuleType, emotionalTier, campaignId)

  // Generar URL del código QR
  const qrCodeUrl = generateQrCodeUrl(shareUrl)

  return {
    id: sessionId,
    venueId,
    tableId,
    campaignId,
    capsuleType,
    emotionalTier,
    participants: [],
    activeCards: [],
    completedCards: [],
    startTime: new Date(),
    lastActivity: new Date(),
    isActive: true,
    qrCodeUrl,
    shareUrl,
  }
}

// Añadir un participante a la sesión
export function addParticipant(session: TableSession, name: string): TableSession {
  const newParticipant: Participant = {
    id: `participant_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
    name,
    joinTime: new Date(),
    points: 0,
    completedChallenges: [],
    emotionalIntensity: 0,
  }

  return {
    ...session,
    participants: [...session.participants, newParticipant],
    lastActivity: new Date(),
  }
}

// Generar cartas para la sesión basadas en el número de participantes
export function generateCardsForSession(session: TableSession, count = 5): TableSession {
  const cards: UnifiedCard[] = []

  // Ajustar el número de cartas según el número de participantes
  const adjustedCount = Math.max(count, session.participants.length * 2)

  // Generar cartas
  for (let i = 0; i < adjustedCount; i++) {
    const card = generateUnifiedCard({
      experienceType: "multi_table",
      challengeType: i % 3 === 0 ? "group" : i % 3 === 1 ? "duet" : "individual",
      challengeCategory: session.capsuleType as any,
      emotionalTier: session.emotionalTier,
      brandId: session.campaignId,
    })

    cards.push(card)
  }

  return {
    ...session,
    activeCards: cards,
    lastActivity: new Date(),
  }
}

// Marcar una carta como completada
export function completeCard(
  session: TableSession,
  cardId: string,
  participantId: string,
  points: number,
): TableSession {
  // Actualizar la lista de cartas completadas
  const updatedCompletedCards = [...session.completedCards, cardId]

  // Actualizar los puntos del participante
  const updatedParticipants = session.participants.map((participant) => {
    if (participant.id === participantId) {
      return {
        ...participant,
        points: participant.points + points,
        completedChallenges: [...participant.completedChallenges, cardId],
        emotionalIntensity: Math.min(100, participant.emotionalIntensity + points / 2),
      }
    }
    return participant
  })

  // Filtrar la carta completada de las activas
  const updatedActiveCards = session.activeCards.filter((card) => card.card_id !== cardId)

  return {
    ...session,
    activeCards: updatedActiveCards,
    completedCards: updatedCompletedCards,
    participants: updatedParticipants,
    lastActivity: new Date(),
  }
}

// Generar URL para compartir la sesión
function generateShareUrl(
  sessionId: string,
  venueId: string,
  tableId: string,
  capsuleType: CapsuleType,
  emotionalTier: string,
  campaignId?: string,
): string {
  const baseUrl = typeof window !== "undefined" ? window.location.origin : "https://brindax.com"

  const url = new URL(`${baseUrl}/join`)
  url.searchParams.append("session", sessionId)
  url.searchParams.append("venue", venueId)
  url.searchParams.append("table", tableId)
  url.searchParams.append("capsule", capsuleType)
  url.searchParams.append("tier", emotionalTier)

  if (campaignId) {
    url.searchParams.append("campaign", campaignId)
  }

  return url.toString()
}

// Generar URL del código QR
function generateQrCodeUrl(shareUrl: string): string {
  // En una implementación real, aquí se generaría un código QR usando dub.co o similar
  // Para esta demo, usamos una API de QR code gratuita
  return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(shareUrl)}`
}

// Guardar sesiones en localStorage
export function saveTableSessions(sessions: TableSession[]): void {
  if (typeof window !== "undefined") {
    localStorage.setItem("brinda_table_sessions", JSON.stringify(sessions))
  }
}

// Cargar sesiones desde localStorage
export function loadTableSessions(): TableSession[] {
  if (typeof window !== "undefined") {
    const data = localStorage.getItem("brinda_table_sessions")
    if (data) {
      try {
        const sessions = JSON.parse(data) as TableSession[]

        // Convertir fechas de string a Date
        return sessions.map((session) => ({
          ...session,
          startTime: new Date(session.startTime),
          lastActivity: new Date(session.lastActivity),
          participants: session.participants.map((participant) => ({
            ...participant,
            joinTime: new Date(participant.joinTime),
          })),
        }))
      } catch (e) {
        console.error("Error parsing table sessions:", e)
      }
    }
  }
  return []
}

// Obtener una sesión por ID
export function getSessionById(sessionId: string): TableSession | null {
  const sessions = loadTableSessions()
  return sessions.find((session) => session.id === sessionId) || null
}

// Obtener sesiones activas para un venue
export function getActiveSessionsForVenue(venueId: string): TableSession[] {
  const sessions = loadTableSessions()
  return sessions.filter((session) => session.venueId === venueId && session.isActive)
}

// Obtener la sesión activa para una mesa
export function getActiveSessionForTable(venueId: string, tableId: string): TableSession | null {
  const sessions = loadTableSessions()
  return (
    sessions.find((session) => session.venueId === venueId && session.tableId === tableId && session.isActive) || null
  )
}
