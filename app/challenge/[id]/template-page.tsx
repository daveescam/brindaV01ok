"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Sparkles, ArrowLeft, Award } from "lucide-react"
import Link from "next/link"
import CardDisplay from "@/components/card-display"
import { useToast } from "@/components/ui/use-toast"
import { WalletProvider } from "@/components/wallet/wallet-provider"
import { VerificationProvider } from "@/contexts/verification-context"
import ChallengeTemplateIntegration from "@/components/challenge-template-integration"
import type { UnifiedCard } from "@/lib/types/unified-card"
import { generateUnifiedCard } from "@/lib/types/unified-card"

// Componente principal que integra wallet y verificación
export default function TemplateChallengePage() {
  return (
    <WalletProvider>
      <VerificationProvider>
        <TemplateChallenge />
      </VerificationProvider>
    </WalletProvider>
  )
}

// Componente de desafío con plantilla
function TemplateChallenge() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()

  const [card, setCard] = useState<UnifiedCard | null>(null)
  const [loading, setLoading] = useState(true)
  const [completed, setCompleted] = useState(false)
  const [progress, setProgress] = useState(0)

  // Cargar la carta basada en el ID
  useEffect(() => {
    const challengeId = params.id as string

    // En una implementación real, aquí se cargaría la carta desde una API
    // Por ahora, generamos una carta de ejemplo
    const exampleCard = generateUnifiedCard({
      experienceType: "campaign",
      challengeType: "individual",
      challengeCategory: "despecho",
      interactionFormat: "descripcion_meme",
      toneSubtype: "humoristico",
      emotionalTier: "intense",
    })

    // Simular carga
    setTimeout(() => {
      setCard(exampleCard)
      setLoading(false)
    }, 1000)
  }, [params.id])

  // Manejar la finalización del desafío
  const handleComplete = () => {
    setCompleted(true)
    setProgress(100)

    toast({
      title: "¡Desafío completado!",
      description: "Has completado el desafío con éxito.",
    })
  }

  // Manejar la reclamación de recompensa
  const handleClaimReward = () => {
    toast({
      title: "¡Recompensa reclamada!",
      description: "Tu recompensa ha sido añadida a tu wallet.",
    })

    // Redirigir a la wallet
    router.push("/wallet")
  }

  // Si está cargando, mostrar estado de carga
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black to-purple-950">
        <div className="container mx-auto py-12">
          <div className="max-w-md mx-auto text-center">
            <Sparkles className="h-12 w-12 text-pink-500 mx-auto mb-4 animate-pulse" />
            <p className="text-white">Cargando desafío...</p>
          </div>
        </div>
      </div>
    )
  }

  // Si no hay carta, mostrar error
  if (!card) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black to-purple-950">
        <div className="container mx-auto py-12">
          <div className="max-w-md mx-auto text-center">
            <p className="text-white">No se encontró el desafío.</p>
            <Button asChild className="mt-4">
              <Link href="/">Volver al inicio</Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-purple-950">
      <header className="container mx-auto py-6">
        <div className="flex items-center">
          <Button asChild variant="ghost" className="text-white">
            <Link href="/">
              <ArrowLeft className="h-5 w-5 mr-2" />
              Volver
            </Link>
          </Button>
          <h1 className="text-xl font-bold text-white ml-4">Desafío Creativo</h1>
        </div>
      </header>

      <main className="container mx-auto py-8">
        <div className="max-w-md mx-auto">
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-white/70 text-sm">Progreso del desafío</span>
              <span className="text-white/70 text-sm">{completed ? "Completado" : "En progreso"}</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {!completed ? (
            <>
              <div className="mb-8">
                <CardDisplay card={card} />
              </div>

              <ChallengeTemplateIntegration card={card} onComplete={handleComplete} />
            </>
          ) : (
            <Card className="border-purple-500/50 bg-black/40 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <div className="flex justify-center mb-6">
                  <div className="bg-gradient-to-r from-pink-500/30 to-purple-500/30 p-4 rounded-full">
                    <Award className="h-12 w-12 text-yellow-400" />
                  </div>
                </div>

                <h2 className="text-2xl font-bold text-white mb-4">¡Desafío Completado!</h2>

                <p className="text-white/80 mb-6">
                  Has completado el desafío creativo con éxito. Tu creación ha sido guardada en tu wallet.
                </p>

                <div className="flex justify-center gap-4">
                  <Button
                    onClick={handleClaimReward}
                    className="bg-gradient-to-r from-amber-500 to-yellow-600 hover:opacity-90"
                  >
                    Reclamar Recompensa
                  </Button>
                  <Button asChild className="bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-90">
                    <Link href="/wallet">Ver Mi Wallet</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  )
}
