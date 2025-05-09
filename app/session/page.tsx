"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Sparkles, Mic, Camera, Award, ThumbsUp, ArrowRight, Check, MessageSquare, Wallet } from "lucide-react"
import Link from "next/link"
import CardDisplay from "@/components/card-display"
import { useToast } from "@/components/ui/use-toast"
import {
  createGameSession,
  getSessionCards,
  getCurrentArchetype,
  getCurrentChallenge,
  advanceToNextArchetype,
  addPointsToSession,
  determineFinalArchetype,
  archetypeToChallengeCard,
  type GameSession,
  type CapsuleType,
} from "@/lib/types/capsule-engine"
import { WalletProvider } from "@/components/wallet/wallet-provider"
import { useWallet } from "@/components/wallet/wallet-provider"

// Componente para integrar la wallet con la sesión
function SessionWithWallet({ children }: { children: React.ReactNode }) {
  return <WalletProvider>{children}</WalletProvider>
}

// Componente principal de la sesión
function SessionContent() {
  const searchParams = useSearchParams()
  const { toast } = useToast()
  const { addSessionRewards } = useWallet()

  // Get session parameters from URL
  const capsuleId = (searchParams.get("capsule") as CapsuleType) || "borrachos"
  const emotionalTier = (searchParams.get("emotionalTier") as "mild" | "intense" | "chaotic") || "intense"
  const campaign = searchParams.get("campaign") || ""
  const venue = searchParams.get("venue") || ""

  // Session state
  const [session, setSession] = useState<GameSession | null>(null)
  const [sessionCards, setSessionCards] = useState<any[]>([])
  const [currentCard, setCurrentCard] = useState<any>(null)
  const [sessionProgress, setSessionProgress] = useState(0)
  const [sessionState, setSessionState] = useState<
    "intro" | "challenge" | "recording" | "voting" | "results" | "summary"
  >("intro")

  // Challenge state
  const [responseMode, setResponseMode] = useState<"voice" | "video" | "text">("voice")
  const [isRecording, setIsRecording] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const [votes, setVotes] = useState(0)
  const [hasVoted, setHasVoted] = useState(false)
  const [hasShared, setHasShared] = useState(false)

  // Initialize session
  useEffect(() => {
    // Create a new game session
    const newSession = createGameSession(capsuleId, emotionalTier, venue, campaign)
    setSession(newSession)

    // Get all cards for this session
    const cards = getSessionCards(newSession)
    setSessionCards(cards)

    // Set the current card
    if (cards.length > 0) {
      setCurrentCard(cards[0])
    }
  }, [capsuleId, emotionalTier, venue, campaign])

  // Recording timer
  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime((prev) => {
          if (prev >= 30) {
            setIsRecording(false)
            return 30
          }
          return prev + 1
        })
      }, 1000)
    } else {
      setRecordingTime(0)
    }

    return () => clearInterval(interval)
  }, [isRecording])

  // Start the challenge
  const startChallenge = () => {
    setSessionState("challenge")
  }

  // Start recording response
  const startRecording = () => {
    setSessionState("recording")
    setIsRecording(true)

    // Simulate recording for demo purposes
    setTimeout(() => {
      setIsRecording(false)
      setSessionState("voting")
    }, 5000)
  }

  // Handle voting
  const handleVote = () => {
    if (!hasVoted) {
      setVotes((prev) => prev + 1)
      setHasVoted(true)

      // Add points to the session
      if (session) {
        const updatedSession = addPointsToSession(session, 5)
        setSession(updatedSession)

        // Check if we've reached the threshold for reward
        if (votes >= 4) {
          toast({
            title: "¡Recompensa desbloqueada!",
            description: "Has ganado una recompensa especial.",
          })
        }
      }
    }
  }

  // Share result
  const shareResult = () => {
    setHasShared(true)
    toast({
      title: "¡Compartido con éxito!",
      description: "Tu respuesta ha sido compartida con tu mesa.",
    })

    // Add points for sharing
    if (session) {
      const updatedSession = addPointsToSession(session, 3)
      setSession(updatedSession)
    }
  }

  // Complete challenge and move to next
  const completeChallenge = () => {
    if (!session) return

    // Get the current archetype before advancing
    const currentArchetypeId =
      session.capsuleId === "borrachos"
        ? ["malacopa", "extexter", "shotfinal", "crudaemocional", "despertar"][session.currentArchetypeIndex]
        : session.capsuleId === "despecho"
          ? ["extoxico", "ghosteado", "stalker", "playlist", "borrachodeamor"][session.currentArchetypeIndex]
          : `archetype_${session.currentArchetypeIndex}`

    // Add rewards to wallet
    addSessionRewards(session.capsuleId, currentArchetypeId, session.emotionalTier, session.points)

    // Advance to the next archetype in the sequence
    const updatedSession = advanceToNextArchetype(session)
    setSession(updatedSession)

    // Update progress
    const newProgress = (updatedSession.currentArchetypeIndex / sessionCards.length) * 100
    setSessionProgress(newProgress)

    // Reset challenge state
    setVotes(0)
    setHasVoted(false)
    setHasShared(false)

    // Get the next card
    if (updatedSession.currentArchetypeIndex < sessionCards.length) {
      setCurrentCard(sessionCards[updatedSession.currentArchetypeIndex])
      setSessionState("challenge")
    } else {
      // If we've completed all cards, show the summary
      setSessionState("summary")
    }
  }

  // Claim reward
  const claimReward = () => {
    toast({
      title: "¡Recompensa reclamada!",
      description: "Muestra este código en la barra: BRINDA-X-2024",
    })
  }

  // Get the current archetype and challenge
  const currentArchetype = session ? getCurrentArchetype(session) : null
  const currentChallengeData = session ? getCurrentChallenge(session) : null
  const finalArchetype = session ? determineFinalArchetype(session) : null
  const finalArchetypeCard =
    finalArchetype && session
      ? archetypeToChallengeCard(finalArchetype, session.capsuleId, session.emotionalTier)
      : null

  // Render session content based on state
  const renderSessionContent = () => {
    switch (sessionState) {
      case "intro":
        return (
          <div className="text-center">
            <div className="mb-8">
              <div className="flex justify-center mb-4">
                <div className="bg-pink-500/20 p-4 rounded-full">
                  <Sparkles className="h-8 w-8 text-pink-500" />
                </div>
              </div>
              <h1 className="text-3xl font-bold mb-2 text-white">
                {capsuleId === "borrachos"
                  ? "100 Borrachos Dijeron™"
                  : capsuleId === "despecho"
                    ? "Ritual Despecho™"
                    : capsuleId === "linkedin"
                      ? "LinkedIn Caótico™"
                      : capsuleId === "mundial"
                        ? "Fiesta Mundial™"
                        : "Brinda X"}
              </h1>
              <p className="text-white/80 mb-4">{campaign ? `Patrocinado por ${campaign}` : "Experiencia Emocional"}</p>
              <div className="p-4 bg-black/40 rounded-lg border border-pink-500/30 mb-6">
                <p className="text-white font-medium">
                  Prepárate para un viaje emocional a través de arquetipos y retos.
                </p>
                <p className="text-white/70 text-sm mt-2">
                  Completa los retos para desbloquear tu carta final y recompensas especiales.
                </p>
              </div>
            </div>

            <Button onClick={startChallenge} className="bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-90">
              Empezar Experiencia
            </Button>
          </div>
        )

      case "challenge":
        if (!currentCard || !currentArchetype) return <div className="text-white">Cargando...</div>

        return (
          <div>
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-white/70 text-sm">Progreso de la lotería</span>
                <span className="text-white/70 text-sm">
                  Carta {session?.currentArchetypeIndex! + 1} de {sessionCards.length}
                </span>
              </div>
              <Progress value={sessionProgress} className="h-2" />
            </div>

            <div className="mb-8 text-center">
              <h2 className="text-2xl font-bold mb-6 text-white">{currentArchetype.name}</h2>
              <CardDisplay card={currentCard} />
            </div>

            <div className="text-center">
              <Button
                onClick={startRecording}
                className="bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-90"
              >
                Aceptar Reto
              </Button>
            </div>
          </div>
        )

      case "recording":
        if (!currentChallengeData) return <div className="text-white">Cargando...</div>

        // Determine response mode based on challenge
        const challengeResponseMode =
          currentChallengeData.responseFormat === "voice"
            ? "voice"
            : currentChallengeData.responseFormat === "video"
              ? "video"
              : "text"

        return (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-6 text-white">Grabando tu respuesta</h2>

            <div className="mb-8">
              <Card className="border-pink-500/50 bg-black/40 backdrop-blur-sm mb-4">
                <CardContent className="p-6">
                  <p className="text-lg text-white/90 mb-4">{currentChallengeData.challenge}</p>

                  {challengeResponseMode === "voice" && (
                    <div className="flex justify-center">
                      <div
                        className={`h-24 w-24 rounded-full flex items-center justify-center ${
                          isRecording ? "bg-red-500/20 animate-pulse" : "bg-gray-500/20"
                        }`}
                      >
                        <Mic className={`h-12 w-12 ${isRecording ? "text-red-500" : "text-gray-400"}`} />
                      </div>
                    </div>
                  )}

                  {challengeResponseMode === "video" && (
                    <div className="aspect-video bg-black/60 rounded-lg flex items-center justify-center">
                      <Camera className={`h-12 w-12 ${isRecording ? "text-red-500" : "text-gray-400"}`} />
                    </div>
                  )}

                  {challengeResponseMode === "text" && (
                    <div className="p-4 bg-black/60 rounded-lg min-h-[100px] flex items-center justify-center">
                      <MessageSquare className="h-12 w-12 text-gray-400" />
                    </div>
                  )}
                </CardContent>
              </Card>

              {isRecording && (
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-white/70 mb-1">
                    <span>Grabando...</span>
                    <span>{recordingTime}s / 30s</span>
                  </div>
                  <Progress value={(recordingTime / 30) * 100} className="h-2" />
                </div>
              )}
            </div>

            <Button onClick={() => setIsRecording(false)} variant="destructive" disabled={!isRecording}>
              Detener Grabación
            </Button>
          </div>
        )

      case "voting":
        if (!currentChallengeData) return <div className="text-white">Cargando...</div>

        return (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-6 text-white">¡Respuesta Grabada!</h2>

            <Card className="border-pink-500/50 bg-black/40 backdrop-blur-sm mb-8">
              <CardContent className="p-6">
                <div className="mb-4">
                  <p className="text-lg text-white/90 mb-2">{currentChallengeData.challenge}</p>
                  <div className="p-4 bg-black/60 rounded-lg">
                    <p className="text-white/80 italic">
                      "Tu respuesta ha sido grabada y está lista para ser evaluada por el grupo."
                    </p>
                  </div>
                </div>

                <div className="flex justify-center gap-4 mb-4">
                  <Button
                    variant="outline"
                    className={`border-pink-500 text-white hover:bg-pink-500/20 ${hasVoted ? "bg-pink-500/20" : ""}`}
                    onClick={handleVote}
                    disabled={hasVoted}
                  >
                    <ThumbsUp className="h-4 w-4 mr-2" />
                    Votar ({votes})
                  </Button>

                  <Button
                    variant="outline"
                    className={`border-blue-500 text-white hover:bg-blue-500/20 ${hasShared ? "bg-blue-500/20" : ""}`}
                    onClick={shareResult}
                    disabled={hasShared}
                  >
                    Compartir
                  </Button>
                </div>

                {votes >= 5 && (
                  <div className="p-3 bg-gradient-to-r from-yellow-500/20 to-amber-500/20 rounded-lg border border-yellow-500/30 animate-pulse">
                    <p className="text-yellow-300 font-medium flex items-center justify-center">
                      <Award className="h-5 w-5 mr-2" />
                      ¡Recompensa Desbloqueada!
                    </p>
                  </div>
                )}

                {currentChallengeData.socialTrigger && (
                  <div className="p-3 bg-purple-500/20 rounded-lg mt-4">
                    <p className="text-white/80 text-sm">
                      <span className="font-bold">Bonus:</span> {currentChallengeData.socialTrigger}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {votes >= 5 ? (
              <div>
                <h3 className="text-xl font-bold mb-4 text-white">¡Felicidades!</h3>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="p-4 bg-gradient-to-br from-pink-500/20 to-purple-500/20 rounded-lg border border-pink-500/30">
                    <h4 className="font-bold text-white mb-1">🎭 {currentArchetype?.name}</h4>
                    <p className="text-sm text-white/70">Carta Desbloqueada</p>
                  </div>
                  <div className="p-4 bg-gradient-to-br from-amber-500/20 to-yellow-500/20 rounded-lg border border-amber-500/30">
                    <h4 className="font-bold text-white mb-1">🎁 {currentChallengeData.reward?.type.toUpperCase()}</h4>
                    <p className="text-sm text-white/70">{currentChallengeData.reward?.description}</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Button
                    onClick={claimReward}
                    className="bg-gradient-to-r from-amber-500 to-yellow-600 hover:opacity-90"
                  >
                    Reclamar Recompensa
                  </Button>
                  <Button
                    onClick={completeChallenge}
                    className="bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-90"
                  >
                    Siguiente Carta <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            ) : (
              <div>
                <p className="text-white/70 mb-4">Necesitas {5 - votes} votos más para desbloquear una recompensa.</p>
                <Button
                  onClick={completeChallenge}
                  className="bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-90"
                >
                  Siguiente Carta <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        )

      case "summary":
        return (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-6 text-white">¡Lotería Completada!</h2>

            <Card className="border-pink-500/50 bg-black/40 backdrop-blur-sm mb-8">
              <CardContent className="p-6">
                <div className="flex justify-center mb-6">
                  <div className="bg-gradient-to-r from-pink-500/30 to-purple-500/30 p-4 rounded-full">
                    <Check className="h-12 w-12 text-green-500" />
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white mb-6">Tu Carta Final</h3>

                {finalArchetypeCard && (
                  <div className="mb-6">
                    <CardDisplay card={finalArchetypeCard} />
                  </div>
                )}

                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="p-3 bg-black/40 rounded-lg">
                    <p className="text-2xl font-bold text-pink-500">{session?.completedArchetypes.length || 0}</p>
                    <p className="text-xs text-white/70">Cartas Completadas</p>
                  </div>
                  <div className="p-3 bg-black/40 rounded-lg">
                    <p className="text-2xl font-bold text-blue-500">{session?.points || 0}</p>
                    <p className="text-xs text-white/70">Puntos Ganados</p>
                  </div>
                  <div className="p-3 bg-black/40 rounded-lg">
                    <p className="text-2xl font-bold text-amber-500">{session?.vaultUnlocked ? "Sí" : "No"}</p>
                    <p className="text-xs text-white/70">Vault Desbloqueado</p>
                  </div>
                </div>

                {session?.vaultUnlocked && (
                  <div className="p-3 bg-gradient-to-r from-yellow-500/20 to-amber-500/20 rounded-lg border border-yellow-500/30 mb-4">
                    <p className="text-yellow-300 font-medium flex items-center justify-center">
                      <Award className="h-5 w-5 mr-2" />
                      ¡Vault Desbloqueado!
                    </p>
                  </div>
                )}

                <div className="p-4 bg-black/30 rounded-lg">
                  <p className="text-white/80">
                    ¡Gracias por participar en Brinda X! Puedes reclamar tus recompensas en la barra o compartir tu
                    experiencia con amigos.
                  </p>
                </div>
              </CardContent>
            </Card>

            <div className="flex flex-wrap justify-center gap-4">
              {session?.vaultUnlocked && (
                <Button
                  onClick={claimReward}
                  className="bg-gradient-to-r from-amber-500 to-yellow-600 hover:opacity-90"
                >
                  Reclamar Vault
                </Button>
              )}
              <Button asChild className="bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-90">
                <Link href="/wallet">Ver Mi Wallet</Link>
              </Button>
              <Button asChild variant="outline" className="border-pink-500 text-white hover:bg-pink-500/20">
                <Link href="/scan">Nueva Experiencia</Link>
              </Button>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-purple-950">
      <header className="container mx-auto py-6 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <Sparkles className="h-8 w-8 text-pink-500" />
          <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-yellow-500 text-transparent bg-clip-text">
            Brinda X
          </h1>
        </Link>
        <div className="flex gap-2">
          <Button asChild variant="outline" className="border-pink-500 text-white hover:bg-pink-500/20">
            <Link href="/wallet">
              <Wallet className="h-4 w-4 mr-2" />
              Mi Wallet
            </Link>
          </Button>
          <Button asChild variant="outline" className="border-pink-500 text-white hover:bg-pink-500/20">
            <Link href="/capsulas">Ver Cápsulas</Link>
          </Button>
        </div>
      </header>

      <main className="container mx-auto py-12">
        <div className="max-w-md mx-auto">{renderSessionContent()}</div>
      </main>

      <footer className="bg-black/60 backdrop-blur-sm py-8">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <Sparkles className="h-6 w-6 text-pink-500" />
              <span className="text-white/90 font-semibold">Brinda X</span>
            </div>
            <div className="flex gap-6">
              <Link href="/terms" className="text-white/60 hover:text-white transition text-sm">
                Términos
              </Link>
              <Link href="/privacy" className="text-white/60 hover:text-white transition text-sm">
                Privacidad
              </Link>
              <Link href="/contact" className="text-white/60 hover:text-white transition text-sm">
                Contacto
              </Link>
            </div>
          </div>
          <div className="mt-6 text-center text-white/40 text-sm">
            © {new Date().getFullYear()} Brinda X. Todos los derechos reservados.
          </div>
        </div>
      </footer>
    </div>
  )
}

export default function SessionPage() {
  return (
    <SessionWithWallet>
      <SessionContent />
    </SessionWithWallet>
  )
}
