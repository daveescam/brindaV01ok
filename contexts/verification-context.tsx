"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import type { UnifiedCard } from "@/lib/types/unified-card"
import { useWallet } from "@/components/wallet/wallet-provider"
import { useToast } from "@/components/ui/use-toast"
import {
  type VerificationSession,
  type VerificationType,
  type VerificationStatus,
  type VerificationData,
  createVerificationSession,
  startVerification,
  completeVerification,
  verifyChallenge,
  processRewards,
  determineVerificationType,
  generateVerificationFeedback,
  saveVerificationSessions,
  loadVerificationSessions,
} from "@/lib/types/verification-engine"

// Tipo para el contexto de verificación
type VerificationContextType = {
  currentSession: VerificationSession | null
  sessions: VerificationSession[]
  status: VerificationStatus
  verificationType: VerificationType
  emotionalIntensity: number
  socialTriggerActivated: boolean
  feedback: string
  error: string | null

  // Métodos
  startChallengeVerification: (card: UnifiedCard) => void
  completeChallenge: () => void
  submitVerification: (data: VerificationData) => Promise<boolean>
  resetVerification: () => void
  clearError: () => void

  // Métodos específicos de verificación
  submitPhotoVerification: (photoData: string) => Promise<boolean>
  submitAudioVerification: (audioData: Blob) => Promise<boolean>
  submitTextVerification: (text: string) => Promise<boolean>
  submitGroupVerification: (votes: number) => Promise<boolean>
}

// Crear el contexto
const VerificationContext = createContext<VerificationContextType | undefined>(undefined)

// Hook para usar el contexto
export function useVerification() {
  const context = useContext(VerificationContext)
  if (context === undefined) {
    throw new Error("useVerification must be used within a VerificationProvider")
  }
  return context
}

// Proveedor del contexto
export function VerificationProvider({ children }: { children: React.ReactNode }) {
  const { wallet, addSessionRewards } = useWallet()
  const { toast } = useToast()

  const [currentSession, setCurrentSession] = useState<VerificationSession | null>(null)
  const [sessions, setSessions] = useState<VerificationSession[]>([])
  const [status, setStatus] = useState<VerificationStatus>("idle")
  const [verificationType, setVerificationType] = useState<VerificationType>("self")
  const [emotionalIntensity, setEmotionalIntensity] = useState(0)
  const [socialTriggerActivated, setSocialTriggerActivated] = useState(false)
  const [feedback, setFeedback] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [currentCard, setCurrentCard] = useState<UnifiedCard | null>(null)

  // Cargar sesiones guardadas al iniciar
  useEffect(() => {
    try {
      const savedSessions = loadVerificationSessions()
      if (savedSessions.length > 0) {
        setSessions(savedSessions)
      }
    } catch (err) {
      console.error("Error loading verification sessions:", err)
      setError("No se pudieron cargar las sesiones guardadas.")
    }
  }, [])

  // Guardar sesiones cuando cambien
  useEffect(() => {
    if (sessions.length > 0) {
      saveVerificationSessions(sessions)
    }
  }, [sessions])

  // Iniciar una verificación de reto
  const startChallengeVerification = (card: UnifiedCard) => {
    try {
      // Determinar el tipo de verificación adecuado para esta carta
      const verType = determineVerificationType(card)

      // Crear una nueva sesión
      const newSession = createVerificationSession(card.card_id, card.challenge_category as string, verType)

      // Iniciar la verificación
      const startedSession = startVerification(newSession)

      // Actualizar el estado
      setCurrentSession(startedSession)
      setStatus(startedSession.status)
      setVerificationType(verType)
      setCurrentCard(card)
      setFeedback("")
      setError(null)

      // Añadir a la lista de sesiones
      setSessions((prev) => [...prev, startedSession])

      return startedSession
    } catch (err) {
      console.error("Error starting challenge verification:", err)
      setError("Ocurrió un error al iniciar la verificación del reto.")
      return null
    }
  }

  // Completar un reto
  const completeChallenge = () => {
    try {
      if (!currentSession) {
        setError("No hay una sesión de verificación activa.")
        return
      }

      // Marcar la sesión como en verificación
      const updatedSession = completeVerification(currentSession)

      // Actualizar el estado
      setCurrentSession(updatedSession)
      setStatus(updatedSession.status)

      // Actualizar en la lista de sesiones
      setSessions((prev) => prev.map((session) => (session.id === updatedSession.id ? updatedSession : session)))

      return updatedSession
    } catch (err) {
      console.error("Error completing challenge:", err)
      setError("Ocurrió un error al completar el reto.")
      return null
    }
  }

  // Enviar verificación
  const submitVerification = async (data: VerificationData): Promise<boolean> => {
    try {
      if (!currentSession) {
        setError("No hay una sesión de verificación activa.")
        return false
      }

      // Verificar el reto
      const verifiedSession = await verifyChallenge(currentSession, data)

      // Actualizar el estado
      setCurrentSession(verifiedSession)
      setStatus(verifiedSession.status)
      setEmotionalIntensity(verifiedSession.emotionalIntensity)
      setSocialTriggerActivated(verifiedSession.socialTriggerActivated)

      // Generar feedback
      const feedbackText = generateVerificationFeedback(verifiedSession)
      setFeedback(feedbackText)

      // Actualizar en la lista de sesiones
      setSessions((prev) => prev.map((session) => (session.id === verifiedSession.id ? verifiedSession : session)))

      // Si la verificación fue exitosa y tenemos una wallet y carta
      if (verifiedSession.status === "completed" && wallet && currentCard) {
        // Procesar recompensas
        const { rewards } = processRewards(verifiedSession, wallet, currentCard)

        // Añadir recompensas a la wallet
        addSessionRewards(
          currentCard.challenge_category as string,
          currentCard.card_id.split("_")[1] || "default",
          currentCard.emotional_tier as any,
          verifiedSession.points,
        )

        // Mostrar notificación de recompensa
        if (rewards.length > 0) {
          toast({
            title: "¡Recompensas obtenidas!",
            description: `Has ganado ${rewards.length} recompensas nuevas.`,
          })
        }
      }

      return verifiedSession.status === "completed"
    } catch (err) {
      console.error("Error submitting verification:", err)
      setError("Ocurrió un error al enviar la verificación.")
      return false
    }
  }

  // Métodos específicos de verificación
  const submitPhotoVerification = async (photoData: string): Promise<boolean> => {
    return submitVerification({ photo: photoData })
  }

  const submitAudioVerification = async (audioData: Blob): Promise<boolean> => {
    return submitVerification({ audio: audioData })
  }

  const submitTextVerification = async (text: string): Promise<boolean> => {
    return submitVerification({ text })
  }

  const submitGroupVerification = async (votes: number): Promise<boolean> => {
    return submitVerification({ groupVotes: votes })
  }

  // Reiniciar verificación
  const resetVerification = () => {
    setCurrentSession(null)
    setStatus("idle")
    setVerificationType("self")
    setEmotionalIntensity(0)
    setSocialTriggerActivated(false)
    setFeedback("")
    setError(null)
    setCurrentCard(null)
  }

  // Limpiar error
  const clearError = () => {
    setError(null)
  }

  // Valor del contexto
  const value = {
    currentSession,
    sessions,
    status,
    verificationType,
    emotionalIntensity,
    socialTriggerActivated,
    feedback,
    error,

    startChallengeVerification,
    completeChallenge,
    submitVerification,
    resetVerification,
    clearError,

    submitPhotoVerification,
    submitAudioVerification,
    submitTextVerification,
    submitGroupVerification,
  }

  return <VerificationContext.Provider value={value}>{children}</VerificationContext.Provider>
}
