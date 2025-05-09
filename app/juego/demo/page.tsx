"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Sparkles, ArrowLeft, Share2, Award, MessageSquare, ImageIcon, AlertTriangle } from "lucide-react"
import Link from "next/link"
import { useWallet } from "@/components/wallet/wallet-provider"
import { generateUnifiedCard } from "@/lib/types/unified-card"
import { motion } from "framer-motion"

// Importamos los componentes de plantillas AI
import { ChatToxico } from "@/components/ai-templates/chat-toxico"
import { InstagramDespechado } from "@/components/ai-templates/instagram-despechado"
import { MemeDespecho } from "@/components/ai-templates/meme-despecho"
import { RedFlagNotification } from "@/components/ai-templates/red-flag-notification"

export default function DemoPage() {
  const searchParams = useSearchParams()
  const qrData = searchParams.get("qr") || ""
  const [currentStep, setCurrentStep] = useState(0)
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)
  const [challengeCompleted, setChallengeCompleted] = useState(false)
  const [showReward, setShowReward] = useState(false)
  const { addCard, addSticker, addReward } = useWallet()

  // Datos de demostración
  const demoData = {
    capsule: searchParams.get("capsule") || "borrachos",
    brand: searchParams.get("brand") || "tecate",
    venue: searchParams.get("venue") || "cantina_ritual",
    emotion: searchParams.get("emotion") || "honestidad_ebria",
  }

  // Desafío de demostración
  const demoChallenge = {
    title: "El Malacopa Confidente",
    description: "Cuenta la historia más vergonzosa de algo que hiciste estando borracho/a",
    emotion: "honestidad_ebria",
    difficulty: "medio",
    points: 150,
    templates: ["chat", "instagram", "meme", "redflag"],
  }

  // Efecto para simular la carga de datos del QR
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentStep(1)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  // Función para seleccionar una plantilla
  const handleSelectTemplate = (template: string) => {
    setSelectedTemplate(template)
    setCurrentStep(2)
  }

  // Función para completar el desafío
  const handleCompleteChallenge = () => {
    setChallengeCompleted(true)
    setCurrentStep(3)

    // Simular un pequeño retraso antes de mostrar la recompensa
    setTimeout(() => {
      setShowReward(true)

      // Añadir recompensas a la wallet
      const card = generateUnifiedCard({
        experienceType: "campaign",
        challengeType: "individual",
        challengeCategory: "borrachos",
        emotionalTier: "intense",
        toneSubtype: "honestidad_ebria",
      })

      addCard(card)
      addSticker(
        `sticker_demo_${Date.now()}`,
        "Sticker de El Malacopa",
        "Completaste el desafío de El Malacopa Confidente",
        "borrachos",
      )
      addReward(
        "reward",
        `reward_demo_${Date.now()}`,
        "Shot Gratis",
        "Canjeable por un shot gratis en Cantina Ritual",
        undefined,
        new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 días
      )
    }, 1500)
  }

  // Renderizar el paso actual
  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <Card className="border-purple-500/50 bg-black/40 backdrop-blur-sm">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-white">Cargando experiencia...</CardTitle>
              <CardDescription className="text-white/70">
                Decodificando QR y preparando tu experiencia Brinda X
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center py-8">
              <div className="animate-pulse flex flex-col items-center">
                <Sparkles className="h-16 w-16 text-pink-500 mb-4" />
                <div className="h-2 w-48 bg-pink-500/50 rounded-full mb-2"></div>
                <div className="h-2 w-32 bg-pink-500/30 rounded-full"></div>
              </div>
            </CardContent>
          </Card>
        )

      case 1:
        return (
          <Card className="border-purple-500/50 bg-black/40 backdrop-blur-sm">
            <CardHeader className="text-center">
              <div className="mx-auto bg-pink-500/20 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <MessageSquare className="h-8 w-8 text-pink-500" />
              </div>
              <CardTitle className="text-2xl text-white">{demoChallenge.title}</CardTitle>
              <CardDescription className="text-white/70 text-lg mt-2">{demoChallenge.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-black/30 rounded-lg p-4 mb-6">
                <h3 className="text-white/90 font-medium mb-2">Elige cómo quieres completar este desafío:</h3>
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    variant="outline"
                    className="border-blue-500/50 bg-blue-500/10 hover:bg-blue-500/20 text-white flex flex-col h-auto py-4"
                    onClick={() => handleSelectTemplate("chat")}
                  >
                    <MessageSquare className="h-6 w-6 mb-2" />
                    <span>Chat Tóxico</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="border-pink-500/50 bg-pink-500/10 hover:bg-pink-500/20 text-white flex flex-col h-auto py-4"
                    onClick={() => handleSelectTemplate("instagram")}
                  >
                    <ImageIcon className="h-6 w-6 mb-2" />
                    <span>Instagram</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="border-green-500/50 bg-green-500/10 hover:bg-green-500/20 text-white flex flex-col h-auto py-4"
                    onClick={() => handleSelectTemplate("meme")}
                  >
                    <ImageIcon className="h-6 w-6 mb-2" />
                    <span>Meme</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="border-red-500/50 bg-red-500/10 hover:bg-red-500/20 text-white flex flex-col h-auto py-4"
                    onClick={() => handleSelectTemplate("redflag")}
                  >
                    <AlertTriangle className="h-6 w-6 mb-2" />
                    <span>Red Flag</span>
                  </Button>
                </div>
              </div>
              <div className="text-white/60 text-sm text-center">
                <p>Cada plantilla te permite expresar tu respuesta de forma diferente.</p>
                <p>¡Sé creativo y diviértete!</p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="ghost" className="text-white/70" asChild>
                <Link href="/escanear">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Volver
                </Link>
              </Button>
              <div className="text-white/70 text-sm">
                <span className="bg-pink-500/20 px-2 py-1 rounded-full">{demoChallenge.points} puntos</span>
              </div>
            </CardFooter>
          </Card>
        )

      case 2:
        return (
          <Card className="border-purple-500/50 bg-black/40 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl text-white">
                {selectedTemplate === "chat"
                  ? "Chat Tóxico"
                  : selectedTemplate === "instagram"
                    ? "Instagram Despechado"
                    : selectedTemplate === "meme"
                      ? "Meme Despecho"
                      : "Red Flag"}
              </CardTitle>
              <CardDescription className="text-white/70">
                Personaliza tu respuesta al desafío: {demoChallenge.title}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-black/30 rounded-lg p-4 mb-6">
                {selectedTemplate === "chat" && (
                  <ChatToxico
                    initialMessage="Cuéntame la historia más vergonzosa de algo que hiciste estando borracho/a"
                    demoMode={true}
                  />
                )}
                {selectedTemplate === "instagram" && (
                  <InstagramDespechado
                    prompt="Cuenta la historia más vergonzosa de algo que hiciste estando borracho/a"
                    demoMode={true}
                  />
                )}
                {selectedTemplate === "meme" && (
                  <MemeDespecho
                    prompt="Cuenta la historia más vergonzosa de algo que hiciste estando borracho/a"
                    demoMode={true}
                  />
                )}
                {selectedTemplate === "redflag" && (
                  <RedFlagNotification
                    prompt="¿Cuál fue la red flag más grande que mostraste estando borracho/a?"
                    demoMode={true}
                  />
                )}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="ghost" className="text-white/70" onClick={() => setCurrentStep(1)}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Volver
              </Button>
              <Button
                className="bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-90"
                onClick={handleCompleteChallenge}
              >
                Completar Desafío
              </Button>
            </CardFooter>
          </Card>
        )

      case 3:
        return (
          <Card className="border-purple-500/50 bg-black/40 backdrop-blur-sm">
            <CardHeader className="text-center">
              <div className="mx-auto bg-green-500/20 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <Award className="h-8 w-8 text-green-500" />
              </div>
              <CardTitle className="text-2xl text-white">¡Desafío Completado!</CardTitle>
              <CardDescription className="text-white/70 text-lg mt-2">
                Has completado el desafío "{demoChallenge.title}"
              </CardDescription>
            </CardHeader>
            <CardContent>
              {showReward ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="bg-black/30 rounded-lg p-4 mb-6">
                    <h3 className="text-white/90 font-medium mb-4 text-center">¡Has ganado!</h3>
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-3 flex flex-col items-center">
                        <div className="bg-blue-500/30 p-2 rounded-full mb-2">
                          <MessageSquare className="h-5 w-5 text-blue-500" />
                        </div>
                        <span className="text-white text-sm text-center">Carta Coleccionable</span>
                      </div>
                      <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-3 flex flex-col items-center">
                        <div className="bg-green-500/30 p-2 rounded-full mb-2">
                          <ImageIcon className="h-5 w-5 text-green-500" />
                        </div>
                        <span className="text-white text-sm text-center">Sticker Exclusivo</span>
                      </div>
                      <div className="bg-pink-500/20 border border-pink-500/30 rounded-lg p-3 flex flex-col items-center">
                        <div className="bg-pink-500/30 p-2 rounded-full mb-2">
                          <Award className="h-5 w-5 text-pink-500" />
                        </div>
                        <span className="text-white text-sm text-center">Shot Gratis</span>
                      </div>
                    </div>
                    <div className="text-center">
                      <p className="text-white/70 text-sm mb-4">Todos estos elementos han sido añadidos a tu wallet</p>
                      <Button className="bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-90 w-full" asChild>
                        <Link href="/wallet">Ver mi Wallet</Link>
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <div className="flex justify-center py-8">
                  <div className="animate-pulse flex flex-col items-center">
                    <Sparkles className="h-16 w-16 text-pink-500 mb-4" />
                    <div className="h-2 w-48 bg-pink-500/50 rounded-full mb-2"></div>
                    <div className="h-2 w-32 bg-pink-500/30 rounded-full"></div>
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="ghost" className="text-white/70" asChild>
                <Link href="/escanear">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Volver a Escanear
                </Link>
              </Button>
              {showReward && (
                <Button variant="outline" className="text-white border-pink-500/50">
                  <Share2 className="h-4 w-4 mr-2" />
                  Compartir
                </Button>
              )}
            </CardFooter>
          </Card>
        )

      default:
        return null
    }
  }

  return (
    <div className="container mx-auto py-12">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-pink-500/20 p-4 rounded-full">
              <Sparkles className="h-8 w-8 text-pink-500" />
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-2 text-white">Modo Demo</h1>
          <p className="text-white/80">
            Experimenta cómo funciona Brinda X con la cápsula {demoData.capsule} y la marca {demoData.brand}
          </p>
        </div>

        {renderStep()}

        <div className="mt-8 text-center text-white/60 text-sm">
          <p>
            Esta es una demostración de Brinda X. En una experiencia real, escanearías un QR en un bar o restaurante.
          </p>
        </div>
      </div>
    </div>
  )
}
