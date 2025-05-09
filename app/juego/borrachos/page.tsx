"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Wine, Mic, Camera, MessageSquare, ThumbsUp, Award } from "lucide-react"
import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"

export default function JuegoBorrachos() {
  const searchParams = useSearchParams()
  const brand = searchParams.get("brand") || "tecate"
  const { toast } = useToast()

  const [gameState, setGameState] = useState<"intro" | "question" | "recording" | "voting" | "results">("intro")
  const [selectedQuestion, setSelectedQuestion] = useState("")
  const [responseMode, setResponseMode] = useState<"voice" | "video" | "text">("voice")
  const [isRecording, setIsRecording] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const [votes, setVotes] = useState(0)
  const [hasVoted, setHasVoted] = useState(false)
  const [hasShared, setHasShared] = useState(false)

  const questions = [
    "¿A quién le mandaste un mensaje que ahora te da pena?",
    "¿Cuál fue tu peor idea en una peda?",
    "¿Qué hiciste en una peda y nadie te creyó después?",
    "¿Qué te tatuarías pedo si fuera gratis?",
  ]

  useEffect(() => {
    if (gameState === "intro") {
      const randomIndex = Math.floor(Math.random() * questions.length)
      setSelectedQuestion(questions[randomIndex])
    }
  }, [gameState, questions])

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

  const startGame = () => {
    setGameState("question")
  }

  const startRecording = () => {
    setGameState("recording")
    setIsRecording(true)

    // Simulate recording for demo purposes
    setTimeout(() => {
      setIsRecording(false)
      setGameState("voting")
    }, 5000)
  }

  const handleVote = () => {
    if (!hasVoted) {
      setVotes((prev) => prev + 1)
      setHasVoted(true)

      // Check if we've reached the threshold for reward
      if (votes >= 4) {
        toast({
          title: "¡Recompensa desbloqueada!",
          description: "Has ganado un shot gratis de Tecate y una carta coleccionable.",
        })
      }
    }
  }

  const shareResult = () => {
    setHasShared(true)
    toast({
      title: "¡Compartido con éxito!",
      description: "Tu confesión ha sido compartida con tu mesa.",
    })
  }

  const claimReward = () => {
    toast({
      title: "¡Recompensa reclamada!",
      description: "Muestra este código en la barra: SHOT-TECATE-2024",
    })
  }

  const renderGameContent = () => {
    switch (gameState) {
      case "intro":
        return (
          <div className="text-center">
            <div className="mb-8">
              <div className="flex justify-center mb-4">
                <div className="bg-pink-500/20 p-4 rounded-full">
                  <Wine className="h-8 w-8 text-pink-500" />
                </div>
              </div>
              <h1 className="text-3xl font-bold mb-2 text-white">100 Borrachos Dijeron™</h1>
              <p className="text-white/80 mb-4">Patrocinado por {brand.charAt(0).toUpperCase() + brand.slice(1)}</p>
              <div className="p-4 bg-black/40 rounded-lg border border-pink-500/30 mb-6">
                <p className="text-white font-medium">Te ganaste una cortesía... si te atreves a ganártela.</p>
              </div>
            </div>

            <Button onClick={startGame} className="bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-90">
              Empezar Ritual
            </Button>
          </div>
        )

      case "question":
        return (
          <div>
            <div className="mb-8 text-center">
              <h2 className="text-2xl font-bold mb-6 text-white">Tu Pregunta</h2>
              <Card className="border-pink-500/50 bg-black/40 backdrop-blur-sm mb-8">
                <CardContent className="p-6">
                  <p className="text-xl text-white font-medium">{selectedQuestion}</p>
                </CardContent>
              </Card>
            </div>

            <div className="mb-8">
              <h3 className="text-lg font-medium mb-4 text-white">Elige cómo responder:</h3>
              <Tabs defaultValue="voice" onValueChange={(value) => setResponseMode(value as any)}>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="voice">
                    <Mic className="h-4 w-4 mr-2" />
                    Voz
                  </TabsTrigger>
                  <TabsTrigger value="video">
                    <Camera className="h-4 w-4 mr-2" />
                    Video
                  </TabsTrigger>
                  <TabsTrigger value="text">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Texto
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            <div className="text-center">
              <Button
                onClick={startRecording}
                className="bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-90"
              >
                {responseMode === "voice"
                  ? "Grabar Voz"
                  : responseMode === "video"
                    ? "Grabar Video"
                    : "Escribir Respuesta"}
              </Button>
            </div>
          </div>
        )

      case "recording":
        return (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-6 text-white">Grabando tu respuesta</h2>

            <div className="mb-8">
              <Card className="border-pink-500/50 bg-black/40 backdrop-blur-sm mb-4">
                <CardContent className="p-6">
                  <p className="text-lg text-white/90 mb-4">{selectedQuestion}</p>

                  {responseMode === "voice" && (
                    <div className="flex justify-center">
                      <div
                        className={`h-24 w-24 rounded-full flex items-center justify-center ${isRecording ? "bg-red-500/20 animate-pulse" : "bg-gray-500/20"}`}
                      >
                        <Mic className={`h-12 w-12 ${isRecording ? "text-red-500" : "text-gray-400"}`} />
                      </div>
                    </div>
                  )}

                  {responseMode === "video" && (
                    <div className="aspect-video bg-black/60 rounded-lg flex items-center justify-center">
                      <Camera className={`h-12 w-12 ${isRecording ? "text-red-500" : "text-gray-400"}`} />
                    </div>
                  )}

                  {responseMode === "text" && (
                    <div className="p-4 bg-black/60 rounded-lg min-h-[100px] flex items-center justify-center">
                      <p className="text-white/50">Escribiendo respuesta...</p>
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
        return (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-6 text-white">¡Respuesta Grabada!</h2>

            <Card className="border-pink-500/50 bg-black/40 backdrop-blur-sm mb-8">
              <CardContent className="p-6">
                <div className="mb-4">
                  <p className="text-lg text-white/90 mb-2">{selectedQuestion}</p>
                  <div className="p-4 bg-black/60 rounded-lg">
                    <p className="text-white/80 italic">
                      "Le escribí a mi ex después de 5 mezcales diciendo que lo extrañaba... ¡pero me equivoqué de
                      contacto y se lo mandé a mi jefe!"
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
              </CardContent>
            </Card>

            {votes >= 5 ? (
              <div>
                <h3 className="text-xl font-bold mb-4 text-white">¡Felicidades!</h3>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="p-4 bg-gradient-to-br from-pink-500/20 to-purple-500/20 rounded-lg border border-pink-500/30">
                    <h4 className="font-bold text-white mb-1">🍻 EL EX-TEXTER</h4>
                    <p className="text-sm text-white/70">Carta Coleccionable</p>
                  </div>
                  <div className="p-4 bg-gradient-to-br from-amber-500/20 to-yellow-500/20 rounded-lg border border-amber-500/30">
                    <h4 className="font-bold text-white mb-1">🎁 SHOT GRATIS</h4>
                    <p className="text-sm text-white/70">
                      Cortesía de {brand.charAt(0).toUpperCase() + brand.slice(1)}
                    </p>
                  </div>
                </div>
                <Button
                  onClick={claimReward}
                  className="bg-gradient-to-r from-amber-500 to-yellow-600 hover:opacity-90"
                >
                  Reclamar Recompensa
                </Button>
              </div>
            ) : (
              <div>
                <p className="text-white/70 mb-4">Necesitas {5 - votes} votos más para desbloquear una recompensa.</p>
                <Button onClick={() => setGameState("results")} variant="secondary">
                  Ver Resultados
                </Button>
              </div>
            )}
          </div>
        )

      case "results":
        return (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-6 text-white">Resultados</h2>

            <Card className="border-pink-500/50 bg-black/40 backdrop-blur-sm mb-8">
              <CardContent className="p-6">
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-white mb-2">Tu Respuesta</h3>
                  <div className="p-4 bg-black/60 rounded-lg">
                    <p className="text-white/80 italic">
                      "Le escribí a mi ex después de 5 mezcales diciendo que lo extrañaba... ¡pero me equivoqué de
                      contacto y se lo mandé a mi jefe!"
                    </p>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-bold text-white mb-2">Estadísticas</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="p-3 bg-black/40 rounded-lg">
                      <p className="text-2xl font-bold text-pink-500">{votes}</p>
                      <p className="text-xs text-white/70">Votos</p>
                    </div>
                    <div className="p-3 bg-black/40 rounded-lg">
                      <p className="text-2xl font-bold text-blue-500">{hasShared ? 1 : 0}</p>
                      <p className="text-xs text-white/70">Compartidos</p>
                    </div>
                    <div className="p-3 bg-black/40 rounded-lg">
                      <p className="text-2xl font-bold text-amber-500">{votes >= 5 ? 2 : 0}</p>
                      <p className="text-xs text-white/70">Recompensas</p>
                    </div>
                  </div>
                </div>

                {votes >= 5 ? (
                  <div className="p-3 bg-gradient-to-r from-yellow-500/20 to-amber-500/20 rounded-lg border border-yellow-500/30">
                    <p className="text-yellow-300 font-medium flex items-center justify-center">
                      <Award className="h-5 w-5 mr-2" />
                      ¡Recompensa Desbloqueada!
                    </p>
                  </div>
                ) : (
                  <div className="p-3 bg-purple-500/20 rounded-lg">
                    <p className="text-white/70 text-sm">
                      Necesitas {5 - votes} votos más para desbloquear una recompensa.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {votes >= 5 ? (
              <Button onClick={claimReward} className="bg-gradient-to-r from-amber-500 to-yellow-600 hover:opacity-90">
                Reclamar Recompensa
              </Button>
            ) : (
              <Button
                onClick={() => setGameState("intro")}
                className="bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-90"
              >
                Jugar de Nuevo
              </Button>
            )}
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="container mx-auto py-12">
      <div className="max-w-md mx-auto">{renderGameContent()}</div>
    </div>
  )
}
