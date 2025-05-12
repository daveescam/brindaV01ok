"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Loader2, ArrowLeft, Sparkles, Award } from "lucide-react"
import Link from "next/link"
import { generateUnifiedCard } from "@/lib/types/unified-card"
import { useToast } from "@/components/ui/use-toast"
import { hasTemplateForCard } from "@/lib/types/template-challenge-integration"
import ChallengeTemplateRenderer from "@/components/challenge-template-renderer"

export default function ChallengePage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()

  const [card, setCard] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [step, setStep] = useState<"intro" | "template" | "success" | "failed">("intro")
  const [templateResult, setTemplateResult] = useState<any>(null)

  useEffect(() => {
    // Función simplificada para obtener una carta
    const fetchCard = () => {
      try {
        setLoading(true)

        // Obtener el ID del parámetro
        const id = params.id as string

        // Para previsualización o IDs inválidos, crear una carta de muestra
        if (id === "[id]" || !id.includes("_")) {
          // Generar una carta de muestra
          const sampleCard = generateUnifiedCard({
            challengeCategory: "confesion",
            emotionalTier: "intense",
            toneSubtype: "vulnerable",
          })

          // Asignar un ID basado en el parámetro o uno predeterminado
          sampleCard.card_id = id === "[id]" ? "sample_card" : id

          setCard(sampleCard)
        } else {
          // Para IDs con formato correcto (capsuleId_archetypeId)
          const [capsuleType, archetypeId] = id.split("_")

          // Generar una carta basada en los parámetros
          const generatedCard = generateUnifiedCard({
            challengeCategory: capsuleType as any,
            emotionalTier: "intense",
            toneSubtype: "vulnerable",
          })

          // Asignar el ID correcto
          generatedCard.card_id = id

          setCard(generatedCard)
        }

        setLoading(false)
      } catch (err) {
        console.error("Error generating card:", err)
        setError("No se pudo cargar la carta. Por favor, intenta de nuevo.")
        setLoading(false)
      }
    }

    fetchCard()
  }, [params.id])

  // Manejar el inicio del desafío
  const handleStartChallenge = () => {
    // Verificar si la carta tiene una plantilla asociada
    if (card && hasTemplateForCard(card)) {
      setStep("template")
    } else {
      toast({
        title: "Error",
        description: "Este desafío no tiene una plantilla asociada",
        variant: "destructive",
      })
    }
  }

  // Manejar la finalización de la plantilla
  const handleTemplateComplete = (result: any) => {
    setTemplateResult(result)

    // Simular verificación (80% de éxito)
    const success = Math.random() < 0.8

    if (success) {
      setStep("success")

      // Mostrar notificación de éxito
      toast({
        title: "¡Reto completado!",
        description: "Has completado el reto con éxito.",
      })

      // Simular desencadenante social (25% de probabilidad)
      if (Math.random() < 0.25 && card.social_trigger) {
        toast({
          title: "¡Desencadenante social activado!",
          description: card.social_trigger,
        })
      }
    } else {
      setStep("failed")

      // Mostrar notificación de fallo
      toast({
        title: "Verificación fallida",
        description: "No se pudo verificar que hayas completado el reto.",
        variant: "destructive",
      })
    }
  }

  // Manejar la finalización del reto
  const handleComplete = () => {
    // Redirigir a la sesión
    router.push("/session")
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black to-purple-950 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-pink-500 mx-auto mb-4" />
          <p className="text-white text-lg">Cargando reto...</p>
        </div>
      </div>
    )
  }

  if (error || !card) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black to-purple-950">
        <header className="container mx-auto py-6">
          <Link href="/session" className="flex items-center text-white hover:text-pink-300 transition">
            <ArrowLeft className="h-5 w-5 mr-2" />
            Volver a la Sesión
          </Link>
        </header>

        <main className="container mx-auto py-12">
          <Card className="max-w-md mx-auto border-red-300 bg-red-50/10 backdrop-blur-sm">
            <CardContent className="p-6">
              <h1 className="text-xl font-bold text-red-300 mb-4">Error</h1>
              <p className="text-white/80">{error || "No se pudo cargar la carta."}</p>
              <Button asChild className="mt-4 w-full">
                <Link href="/session">Volver a la Sesión</Link>
              </Button>
            </CardContent>
          </Card>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-purple-950">
      <header className="container mx-auto py-6 flex justify-between items-center">
        <Link href="/session" className="flex items-center text-white hover:text-pink-300 transition">
          <ArrowLeft className="h-5 w-5 mr-2" />
          Volver a la Sesión
        </Link>

        <div className="flex items-center">
          <Sparkles className="h-6 w-6 text-pink-500 mr-2" />
          <h1 className="text-xl font-bold bg-gradient-to-r from-pink-500 to-yellow-500 text-transparent bg-clip-text">
            Brinda X
          </h1>
        </div>
      </header>

      <main className="container mx-auto py-12">
        <div className="max-w-md mx-auto">
          <h1 className="text-2xl font-bold text-white mb-6 text-center">Completar Reto</h1>

          {step === "intro" && (
            <>
              <Card className="bg-gradient-to-br from-purple-500/20 to-blue-500/20 border-purple-500/30 backdrop-blur-sm mb-6">
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold text-white mb-2">{card.card_title}</h2>
                  <div className="bg-black/40 rounded-lg p-4 mb-4">
                    <p className="text-white/90 text-lg">{card.challenge}</p>
                  </div>

                  {card.social_trigger && (
                    <div className="bg-purple-500/20 rounded-lg p-3 mb-4 border border-purple-500/30">
                      <p className="text-purple-300 text-sm">
                        <span className="font-bold">Bonus:</span> {card.social_trigger}
                      </p>
                    </div>
                  )}

                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <span className="text-white/60 text-sm">Tipo:</span>
                      <span className="bg-pink-500/20 text-pink-300 text-xs px-2 py-0.5 rounded-full">
                        {card.challenge_type === "individual"
                          ? "Individual"
                          : card.challenge_type === "duet"
                            ? "Dueto"
                            : "Grupal"}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-white/60 text-sm">Dificultad:</span>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full ${
                          card.emotional_tier === "mild"
                            ? "bg-blue-500/20 text-blue-300"
                            : card.emotional_tier === "intense"
                              ? "bg-purple-500/20 text-purple-300"
                              : "bg-red-500/20 text-red-300"
                        }`}
                      >
                        {card.emotional_tier === "mild"
                          ? "Suave"
                          : card.emotional_tier === "intense"
                            ? "Intenso"
                            : "Caótico"}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Button onClick={handleStartChallenge} className="w-full bg-gradient-to-r from-pink-500 to-purple-600">
                Comenzar Reto
              </Button>
            </>
          )}

          {step === "template" && (
            <ChallengeTemplateRenderer
              card={card}
              onComplete={handleTemplateComplete}
              onCancel={() => setStep("intro")}
            />
          )}

          {step === "success" && (
            <Card className="border-green-500/50 bg-black/40 backdrop-blur-sm mb-6">
              <CardContent className="p-6">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center">
                    <Award className="h-8 w-8 text-green-500" />
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white text-center mb-4">¡Reto Completado!</h3>

                <div className="bg-gradient-to-r from-amber-500/20 to-yellow-500/20 rounded-lg p-4 mb-4 border border-amber-500/30">
                  <p className="text-amber-300 font-medium">Tu recompensa:</p>
                  <p className="text-white mt-1">{card.reward || "Sticker digital exclusivo"}</p>
                </div>

                <Button onClick={handleComplete} className="w-full bg-gradient-to-r from-green-500 to-emerald-600">
                  Reclamar y Continuar
                </Button>
              </CardContent>
            </Card>
          )}

          {step === "failed" && (
            <Card className="border-red-500/50 bg-black/40 backdrop-blur-sm mb-6">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-white text-center mb-4">Verificación Fallida</h3>

                <p className="text-white/80 text-center mb-4">
                  No se pudo verificar que hayas completado el reto. Puedes intentarlo de nuevo.
                </p>

                <Button onClick={() => setStep("intro")} className="w-full bg-gradient-to-r from-red-500 to-pink-600">
                  Intentar de Nuevo
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </main>

      <footer className="bg-black/60 backdrop-blur-sm py-8 mt-12">
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
