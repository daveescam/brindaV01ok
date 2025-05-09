"use client"

import { useState, useRef, useEffect } from "react"
import { useVerification } from "@/contexts/verification-context"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { motion, AnimatePresence } from "framer-motion"
import { Camera, Mic, CheckCircle, XCircle, Loader2, Award, AlertCircle, StopCircle } from "lucide-react"
import type { UnifiedCard } from "@/lib/types/unified-card"
import CardDisplay from "@/components/card-display"

interface VerificationFlowProps {
  card: UnifiedCard
  onComplete?: () => void
}

export function VerificationFlow({ card, onComplete }: VerificationFlowProps) {
  const {
    startChallengeVerification,
    completeChallenge,
    status,
    verificationType,
    emotionalIntensity,
    socialTriggerActivated,
    feedback,
    error,
    clearError,
    submitPhotoVerification,
    submitAudioVerification,
    submitTextVerification,
    submitGroupVerification,
  } = useVerification()

  // Estado local
  const [photoData, setPhotoData] = useState<string | null>(null)
  const [isRecording, setIsRecording] = useState(false)
  const [audioData, setAudioData] = useState<Blob | null>(null)
  const [textVerification, setTextVerification] = useState("")
  const [groupVotes, setGroupVotes] = useState(0)
  const [showConfetti, setShowConfetti] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false)
  const [verificationError, setVerificationError] = useState<string | null>(null)
  const [showAiHelp, setShowAiHelp] = useState(false)
  const [cameraActive, setCameraActive] = useState(false)

  // Referencias
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])

  // Iniciar la verificación cuando se monta el componente
  useEffect(() => {
    if (!isInitialized) {
      try {
        startChallengeVerification(card)
        setIsInitialized(true)
      } catch (err) {
        console.error("Error starting verification:", err)
        setVerificationError("Error al iniciar la verificación. Por favor, intenta de nuevo.")
      }
    }
  }, [card, startChallengeVerification, isInitialized])

  // Función para obtener el color de intensidad
  const getIntensityColor = (intensity: number) => {
    if (intensity < 15) return "bg-blue-500"
    if (intensity < 25) return "bg-purple-500"
    return "bg-red-500"
  }

  // Función para obtener la etiqueta de intensidad
  const getIntensityLabel = (intensity: number) => {
    if (intensity < 15) return "Suave"
    if (intensity < 25) return "Intenso"
    return "Caótico"
  }

  // Manejar la finalización del reto
  const handleCompleteChallenge = () => {
    try {
      completeChallenge()
    } catch (err) {
      console.error("Error completing challenge:", err)
      setVerificationError("Error al completar el reto. Por favor, intenta de nuevo.")
    }
  }

  // Manejar la captura de foto
  const startCamera = async () => {
    if (!videoRef.current) return

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true })
      videoRef.current.srcObject = stream
      setCameraActive(true)
    } catch (err) {
      console.error("Error accessing camera:", err)
      setVerificationError("No se pudo acceder a la cámara. Por favor, verifica los permisos e intenta de nuevo.")
    }
  }

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) {
      setVerificationError("No se pudo acceder a la cámara. Por favor, intenta de nuevo.")
      return
    }

    try {
      const video = videoRef.current
      const canvas = canvasRef.current
      const context = canvas.getContext("2d")

      if (context) {
        canvas.width = video.videoWidth
        canvas.height = video.videoHeight
        context.drawImage(video, 0, 0, canvas.width, canvas.height)

        const data = canvas.toDataURL("image/png")
        setPhotoData(data)

        // Detener la transmisión de la cámara
        if (video.srcObject) {
          const tracks = (video.srcObject as MediaStream).getTracks()
          tracks.forEach((track) => track.stop())
          setCameraActive(false)
        }
      }
    } catch (err) {
      console.error("Error capturing photo:", err)
      setVerificationError("Ocurrió un error al capturar la foto. Por favor, intenta de nuevo.")
    }
  }

  const handlePhotoVerification = async () => {
    if (!photoData) {
      setVerificationError("Por favor, toma una foto primero.")
      return
    }

    try {
      const success = await submitPhotoVerification(photoData)

      if (success) {
        setShowConfetti(true)
        setTimeout(() => setShowConfetti(false), 3000)

        if (onComplete) {
          setTimeout(onComplete, 3000)
        }
      }
    } catch (err) {
      console.error("Error submitting photo verification:", err)
      setVerificationError("Ocurrió un error al enviar la verificación. Por favor, intenta de nuevo.")
    }
  }

  // Manejar la grabación de audio
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      mediaRecorderRef.current = new MediaRecorder(stream)

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data)
        }
      }

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/wav" })
        setAudioData(audioBlob)
        audioChunksRef.current = []
      }

      mediaRecorderRef.current.start()
      setIsRecording(true)
    } catch (err) {
      console.error("Error accessing microphone:", err)
      setVerificationError("No se pudo acceder al micrófono. Por favor, verifica los permisos e intenta de nuevo.")
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)

      // Detener todas las pistas de audio
      if (mediaRecorderRef.current.stream) {
        mediaRecorderRef.current.stream.getTracks().forEach((track) => track.stop())
      }
    }
  }

  const handleAudioVerification = async () => {
    if (!audioData) {
      setVerificationError("Por favor, graba un audio primero.")
      return
    }

    try {
      const success = await submitAudioVerification(audioData)

      if (success) {
        setShowConfetti(true)
        setTimeout(() => setShowConfetti(false), 3000)

        if (onComplete) {
          setTimeout(onComplete, 3000)
        }
      }
    } catch (err) {
      console.error("Error submitting audio verification:", err)
      setVerificationError("Ocurrió un error al enviar la verificación. Por favor, intenta de nuevo.")
    }
  }

  // Manejar la verificación por texto
  const handleTextVerification = async () => {
    if (!textVerification.trim()) {
      setVerificationError("Por favor, escribe algo primero.")
      return
    }

    try {
      const success = await submitTextVerification(textVerification)

      if (success) {
        setShowConfetti(true)
        setTimeout(() => setShowConfetti(false), 3000)

        if (onComplete) {
          setTimeout(onComplete, 3000)
        }
      }
    } catch (err) {
      console.error("Error submitting text verification:", err)
      setVerificationError("Ocurrió un error al enviar la verificación. Por favor, intenta de nuevo.")
    }
  }

  // Manejar la verificación grupal
  const addGroupVote = () => {
    setGroupVotes((prev) => prev + 1)
  }

  const handleGroupVerification = async () => {
    try {
      const success = await submitGroupVerification(groupVotes)

      if (success) {
        setShowConfetti(true)
        setTimeout(() => setShowConfetti(false), 3000)

        if (onComplete) {
          setTimeout(onComplete, 3000)
        }
      }
    } catch (err) {
      console.error("Error submitting group verification:", err)
      setVerificationError("Ocurrió un error al enviar la verificación. Por favor, intenta de nuevo.")
    }
  }

  // Limpiar error de verificación
  const clearVerificationError = () => {
    setVerificationError(null)
  }

  // Renderizar UI de verificación según el método
  const renderVerificationUI = () => {
    switch (verificationType) {
      case "photo":
        return (
          <div className="space-y-4 mt-4 bg-gray-50 dark:bg-gray-900 p-4 rounded-lg border">
            <h3 className="text-lg font-medium">Verifica tu reto con una foto</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Toma una foto que demuestre que has completado el reto.
            </p>

            <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
              {!photoData ? (
                cameraActive ? (
                  <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-800">
                    <Camera className="h-12 w-12 text-gray-400" />
                  </div>
                )
              ) : (
                <img
                  src={photoData || "/placeholder.svg"}
                  alt="Captured verification"
                  className="w-full h-full object-cover"
                />
              )}
              <canvas ref={canvasRef} className="hidden" />
            </div>

            <div className="flex justify-center gap-4">
              {!photoData ? (
                !cameraActive ? (
                  <Button onClick={startCamera} className="w-full">
                    <Camera className="mr-2 h-4 w-4" />
                    Activar Cámara
                  </Button>
                ) : (
                  <Button onClick={capturePhoto} className="w-full">
                    <Camera className="mr-2 h-4 w-4" />
                    Capturar Foto
                  </Button>
                )
              ) : (
                <>
                  <Button variant="outline" onClick={() => setPhotoData(null)} className="flex-1">
                    Volver a Capturar
                  </Button>
                  <Button onClick={handlePhotoVerification} className="flex-1">
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Enviar Verificación
                  </Button>
                </>
              )}
            </div>
          </div>
        )

      case "audio":
        return (
          <div className="space-y-4 mt-4 bg-gray-50 dark:bg-gray-900 p-4 rounded-lg border">
            <h3 className="text-lg font-medium">Verifica tu reto con audio</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Graba un audio que demuestre que has completado el reto.
            </p>

            <div className="flex justify-center">
              <div
                className={`w-24 h-24 rounded-full flex items-center justify-center ${isRecording ? "bg-red-100 dark:bg-red-900 animate-pulse" : "bg-gray-100 dark:bg-gray-800"}`}
              >
                <Mic className={`h-12 w-12 ${isRecording ? "text-red-500" : "text-gray-400"}`} />
              </div>
            </div>

            {audioData && (
              <div className="mt-4">
                <audio controls src={URL.createObjectURL(audioData)} className="w-full" />
              </div>
            )}

            <div className="flex justify-center gap-4">
              {!isRecording && !audioData ? (
                <Button onClick={startRecording} className="w-full">
                  <Mic className="mr-2 h-4 w-4" />
                  Iniciar Grabación
                </Button>
              ) : isRecording ? (
                <Button variant="destructive" onClick={stopRecording} className="w-full">
                  <StopCircle className="mr-2 h-4 w-4" />
                  Detener Grabación
                </Button>
              ) : (
                <>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setAudioData(null)
                      startRecording()
                    }}
                    className="flex-1"
                  >
                    Volver a Grabar
                  </Button>
                  <Button onClick={handleAudioVerification} className="flex-1">
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Enviar Verificación
                  </Button>
                </>
              )}
            </div>
          </div>
        )

      case "group":
        return (
          <div className="space-y-4 mt-4 bg-gray-50 dark:bg-gray-900 p-4 rounded-lg border">
            <h3 className="text-lg font-medium">Verificación grupal</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Necesitas que al menos 3 personas confirmen que has completado el reto.
            </p>

            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border">
              <div className="flex justify-between items-center">
                <span className="font-medium">Votos recibidos:</span>
                <Badge variant="secondary">{groupVotes} / 3</Badge>
              </div>
              <Progress value={(groupVotes / 3) * 100} className="h-2 mt-2" />
            </div>

            <div className="flex flex-wrap gap-2 justify-center">
              {["Carlos", "Diana", "Miguel", "Laura", "Javier"].map((name, index) => (
                <TooltipProvider key={index}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="sm" className="rounded-full h-12 w-12 p-0" onClick={addGroupVote}>
                        <Avatar className="h-10 w-10">
                          <AvatarFallback>{name[0]}</AvatarFallback>
                        </Avatar>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Simular voto de {name}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ))}
            </div>

            <Button onClick={handleGroupVerification} disabled={groupVotes < 3} className="w-full">
              <CheckCircle className="mr-2 h-4 w-4" />
              Verificar con Grupo
            </Button>
          </div>
        )

      default:
        return (
          <div className="space-y-4 mt-4 bg-gray-50 dark:bg-gray-900 p-4 rounded-lg border">
            <h3 className="text-lg font-medium">Verificación por texto</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Describe cómo completaste el reto.</p>

            <Textarea
              placeholder="Escribe aquí cómo completaste el reto..."
              value={textVerification}
              onChange={(e) => setTextVerification(e.target.value)}
              className="min-h-[100px]"
            />

            <Button onClick={handleTextVerification} className="w-full">
              <CheckCircle className="mr-2 h-4 w-4" />
              Enviar Verificación
            </Button>
          </div>
        )
    }
  }

  // Renderizar UI de resultado según el estado de la verificación
  const renderResultUI = () => {
    if (status === "completed") {
      return (
        <div className="space-y-4">
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
            <div className="flex items-center">
              <CheckCircle className="h-6 w-6 text-green-500 mr-2" />
              <h3 className="text-lg font-medium text-green-800 dark:text-green-300">¡Reto completado!</h3>
            </div>
            <p className="mt-2 text-green-700 dark:text-green-400">{feedback}</p>
          </div>

          {socialTriggerActivated && (
            <Alert className="bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800">
              <Award className="h-4 w-4 text-purple-500" />
              <AlertTitle className="text-purple-800 dark:text-purple-300">¡Desencadenante social activado!</AlertTitle>
              <AlertDescription className="text-purple-700 dark:text-purple-400">
                {card.social_trigger}
              </AlertDescription>
            </Alert>
          )}

          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
            <h3 className="font-medium">Tu intensidad emocional:</h3>
            <div className="flex items-center mt-2">
              <Progress value={emotionalIntensity} className={`h-2 flex-1 ${getIntensityColor(emotionalIntensity)}`} />
              <Badge className="ml-2" variant="outline">
                {getIntensityLabel(emotionalIntensity)}
              </Badge>
            </div>
          </div>

          <div className="bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
            <h3 className="font-medium flex items-center">
              <Award className="h-5 w-5 text-amber-500 mr-2" />
              Tu recompensa:
            </h3>
            <p className="mt-2 text-amber-800 dark:text-amber-300 font-medium">
              {card.reward}
              {socialTriggerActivated && (
                <span className="block mt-1 text-purple-700 dark:text-purple-400">
                  ¡Bonus del 50% por activar el desencadenante social!
                </span>
              )}
            </p>
          </div>
        </div>
      )
    } else if (status === "failed") {
      return (
        <div className="space-y-4">
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
            <div className="flex items-center">
              <XCircle className="h-6 w-6 text-red-500 mr-2" />
              <h3 className="text-lg font-medium text-red-800 dark:text-red-300">Verificación fallida</h3>
            </div>
            <p className="mt-2 text-red-700 dark:text-red-400">
              {feedback || "No se pudo verificar que hayas completado el reto."}
            </p>
          </div>

          <Button onClick={() => startChallengeVerification(card)} className="w-full">
            Intentar de Nuevo
          </Button>
        </div>
      )
    } else {
      return (
        <div className="flex justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      )
    }
  }

  return (
    <div className="space-y-6">
      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
          <Button variant="ghost" size="sm" className="ml-auto" onClick={clearError}>
            Cerrar
          </Button>
        </Alert>
      )}

      {verificationError && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error de verificación</AlertTitle>
          <AlertDescription>{verificationError}</AlertDescription>
          <Button variant="ghost" size="sm" className="ml-auto" onClick={clearVerificationError}>
            Cerrar
          </Button>
        </Alert>
      )}

      {status === "completed" || status === "failed" ? (
        // Mostrar UI de resultado cuando la verificación está completada o fallida
        renderResultUI()
      ) : (
        // Mostrar UI de reto con verificación integrada
        <div>
          <CardDisplay card={card} />

          {/* Verificación UI integrada directamente bajo la carta */}
          {status === "verifying" ? (
            renderVerificationUI()
          ) : (
            <div className="mt-4">
              <Button onClick={handleCompleteChallenge} className="w-full" disabled={status !== "in-progress"}>
                {status === "in-progress" ? (
                  <>He Completado el Reto</>
                ) : (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                )}
              </Button>
            </div>
          )}
        </div>
      )}

      {/* Efecto de confeti para completado exitoso */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          <AnimatePresence>
            {Array.from({ length: 50 }).map((_, i) => {
              const size = Math.random() * 10 + 5
              const x = Math.random() * 100
              const y = -10
              const delay = Math.random() * 0.5
              const duration = Math.random() * 3 + 2
              const color = ["#FF5E5B", "#D8D8D8", "#FFFFEA", "#00CECB", "#FFED66"][Math.floor(Math.random() * 5)]

              return (
                <motion.div
                  key={i}
                  initial={{ x: `${x}vw`, y: `${y}vh` }}
                  animate={{
                    y: "110vh",
                    rotate: 360,
                    transition: {
                      duration,
                      delay,
                      ease: "easeIn",
                    },
                  }}
                  exit={{ opacity: 0 }}
                  style={{
                    position: "absolute",
                    width: size,
                    height: size,
                    borderRadius: "50%",
                    backgroundColor: color,
                  }}
                />
              )
            })}
          </AnimatePresence>
        </div>
      )}
    </div>
  )
}
