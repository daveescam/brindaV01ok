"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Loader2, CheckCircle, XCircle, Gift, Share2, Camera, Award } from "lucide-react"

export default function ChallengeFlowBasicDemo() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Demo de Flujo de Desafío</h1>
      <p className="text-center mb-8 text-gray-500">Experimenta el flujo completo de desafíos de Brinda X</p>

      <div className="max-w-md mx-auto">
        <BasicChallengeFlow />
      </div>
    </div>
  )
}

// Tipos para el flujo de desafío
type ChallengeStep = "challenge" | "verification" | "reward" | "complete"

function BasicChallengeFlow() {
  // Estados
  const [step, setStep] = useState<ChallengeStep>("challenge")
  const [loading, setLoading] = useState(false)
  const [challenge, setChallenge] = useState<any>(null)
  const [reward, setReward] = useState<any>(null)
  const [verificationMethod, setVerificationMethod] = useState<"group" | "ai" | "manual">("group")
  const [socialTriggerActivated, setSocialTriggerActivated] = useState(false)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [rewards, setRewards] = useState<any[]>([])

  // Función para generar un desafío
  function generateChallenge() {
    setLoading(true)
    setError(null)

    // Simular generación de desafío
    setTimeout(() => {
      // Crear un desafío de ejemplo
      const generatedChallenge = {
        id: `challenge_${Date.now()}`,
        title: "Desafío de Borrachos: El Malacopa",
        description: "Un desafío emocionante para 4 personas en Bar La Cortesía",
        capsuleType: "borrachos",
        archetypeId: "malacopa",
        emotionalTier: "intense",
        instructions: [
          "Reúne a tu grupo",
          "Sigue las instrucciones en pantalla",
          "Completa el desafío para ganar recompensas",
        ],
        difficulty: Math.floor(Math.random() * 3) + 1,
      }

      setChallenge(generatedChallenge)
      setProgress(25)
      setLoading(false)
    }, 1000)
  }

  // Función para verificar el desafío
  function verifyChallenge(success: boolean) {
    setLoading(true)
    setError(null)

    // Simular verificación
    setTimeout(() => {
      if (success) {
        setStep("reward")
        setProgress(50)
      } else {
        setError("Verificación fallida. Inténtalo de nuevo.")
      }
      setLoading(false)
    }, 1500)
  }

  // Función para generar recompensa
  function generateReward() {
    setLoading(true)
    setError(null)

    // Simular generación de recompensa
    setTimeout(() => {
      // Crear una recompensa de ejemplo
      const generatedReward = {
        id: `reward_${Date.now()}`,
        name: socialTriggerActivated ? "Recompensa Premium" : "Recompensa Estándar",
        description: "Una recompensa por completar el desafío de borrachos",
        type: Math.random() > 0.5 ? "sticker" : "reward",
        value: Math.floor(Math.random() * 100) + 10,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        category: "borrachos",
      }

      setReward(generatedReward)
      setProgress(75)
      setStep("complete")

      // Añadir la recompensa a la lista
      setRewards((prev) => [...prev, generatedReward])

      setLoading(false)
    }, 1500)
  }

  // Función para activar trigger social
  function toggleSocialTrigger() {
    setSocialTriggerActivated(!socialTriggerActivated)
  }

  // Función para reiniciar el flujo
  function resetFlow() {
    setStep("challenge")
    setChallenge(null)
    setReward(null)
    setVerificationMethod("group")
    setSocialTriggerActivated(false)
    setProgress(0)
    setError(null)
    generateChallenge()
  }

  // Generar un desafío al cargar el componente
  useEffect(() => {
    generateChallenge()
  }, [])

  // Renderizar el paso actual
  const renderStep = () => {
    switch (step) {
      case "challenge":
        return (
          <>
            <CardHeader>
              <CardTitle className="text-2xl">Desafío</CardTitle>
              <CardDescription>Completa este desafío para ganar recompensas</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {loading ? (
                <div className="flex flex-col items-center justify-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
                  <p>Generando desafío...</p>
                </div>
              ) : challenge ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline">{challenge.capsuleType}</Badge>
                    <Badge>{challenge.archetypeId}</Badge>
                  </div>
                  <h3 className="text-xl font-bold">{challenge.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{challenge.description}</p>
                  <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
                    <p className="font-medium">Instrucciones:</p>
                    <ul className="list-disc list-inside space-y-1 mt-2">
                      {challenge.instructions?.map((instruction: string, i: number) => (
                        <li key={i}>{instruction}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : error ? (
                <div className="text-center py-8">
                  <XCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
                  <p className="text-destructive">{error}</p>
                  <Button onClick={generateChallenge} className="mt-4">
                    Intentar de nuevo
                  </Button>
                </div>
              ) : null}
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <div className="grid grid-cols-3 gap-2 w-full">
                <Button
                  variant="outline"
                  onClick={() => setVerificationMethod("group")}
                  className={verificationMethod === "group" ? "border-primary" : ""}
                >
                  Grupo
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setVerificationMethod("ai")}
                  className={verificationMethod === "ai" ? "border-primary" : ""}
                >
                  IA
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setVerificationMethod("manual")}
                  className={verificationMethod === "manual" ? "border-primary" : ""}
                >
                  Manual
                </Button>
              </div>
              <Button className="w-full" onClick={() => verifyChallenge(true)} disabled={loading || !challenge}>
                Verificar Desafío
              </Button>
            </CardFooter>
          </>
        )

      case "reward":
        return (
          <>
            <CardHeader>
              <CardTitle className="text-2xl">¡Desafío Completado!</CardTitle>
              <CardDescription>Activa un trigger social para mejorar tu recompensa</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-md flex items-center">
                <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400 mr-3" />
                <p>
                  Has completado el desafío <span className="font-medium">{challenge?.title}</span>
                </p>
              </div>

              <div className="border rounded-md p-4">
                <h3 className="font-medium mb-2">Activar Trigger Social</h3>
                <div className="flex items-center space-x-4">
                  <Button
                    variant={socialTriggerActivated ? "default" : "outline"}
                    size="sm"
                    onClick={toggleSocialTrigger}
                    className="flex items-center"
                  >
                    <Share2 className="h-4 w-4 mr-2" />
                    Compartir
                  </Button>
                  <Button variant="outline" size="sm" className="flex items-center" onClick={toggleSocialTrigger}>
                    <Camera className="h-4 w-4 mr-2" />
                    Foto
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={generateReward} disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generando...
                  </>
                ) : (
                  <>
                    <Gift className="mr-2 h-4 w-4" />
                    Reclamar Recompensa
                  </>
                )}
              </Button>
            </CardFooter>
          </>
        )

      case "complete":
        return (
          <>
            <CardHeader>
              <CardTitle className="text-2xl">¡Recompensa Obtenida!</CardTitle>
              <CardDescription>Tu recompensa ha sido añadida a tu wallet</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {reward ? (
                <div className="flex flex-col items-center text-center">
                  <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Award className="h-12 w-12 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">{reward.name}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mt-2">{reward.description}</p>
                  <Badge className="mt-4" variant="secondary">
                    {reward.type}
                  </Badge>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-4" />
                  <p>Cargando recompensa...</p>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button onClick={resetFlow}>Nuevo Desafío</Button>
            </CardFooter>
          </>
        )

      default:
        return null
    }
  }

  return (
    <Card className="w-full">
      <div className="px-6 pt-6">
        <Progress value={progress} className="h-2" />
      </div>
      {renderStep()}
    </Card>
  )
}
