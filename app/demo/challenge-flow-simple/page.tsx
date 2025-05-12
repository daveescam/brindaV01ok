"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Loader2, CheckCircle, XCircle, Gift, Share2, Camera, Award } from "lucide-react"
import { WalletProviderMock } from "@/components/wallet/wallet-provider-mock"

export default function ChallengeFlowSimpleDemo() {
  const [capsuleType, setCapsuleType] = useState("borrachos")
  const [archetypeId, setArchetypeId] = useState("malacopa")
  const [location, setLocation] = useState("Bar La Cortesía")
  const [groupSize, setGroupSize] = useState(4)

  return (
    <WalletProviderMock>
      <div className="container mx-auto py-10">
        <h1 className="text-3xl font-bold mb-6 text-center">Demo de Flujo de Desafío</h1>
        <p className="text-center mb-8 text-gray-500">
          Experimenta el flujo completo de desafíos de Brinda X con todos los servicios integrados
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Configuración</CardTitle>
                <CardDescription>Personaliza el desafío</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="capsuleType">Tipo de Cápsula</Label>
                  <Select value={capsuleType} onValueChange={setCapsuleType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona una cápsula" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="borrachos">100 Borrachos Dijeron</SelectItem>
                      <SelectItem value="despecho">Ritual Despecho</SelectItem>
                      <SelectItem value="linkedin">LinkedIn Caótico</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="archetypeId">Arquetipo</Label>
                  <Select value={archetypeId} onValueChange={setArchetypeId}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona un arquetipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="malacopa">El Malacopa</SelectItem>
                      <SelectItem value="extexter">El Ex-Texter</SelectItem>
                      <SelectItem value="shotfinal">El Shot Final</SelectItem>
                      <SelectItem value="crudaemocional">La Cruda Emocional</SelectItem>
                      <SelectItem value="despertar">El Despertar</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Ubicación</Label>
                  <Input id="location" value={location} onChange={(e) => setLocation(e.target.value)} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="groupSize">Tamaño del Grupo</Label>
                  <Input
                    id="groupSize"
                    type="number"
                    value={groupSize}
                    onChange={(e) => setGroupSize(Number(e.target.value))}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-2">
            <Tabs defaultValue="challenge">
              <TabsList className="grid grid-cols-2 mb-8">
                <TabsTrigger value="challenge">Desafío</TabsTrigger>
                <TabsTrigger value="wallet">Wallet</TabsTrigger>
              </TabsList>

              <TabsContent value="challenge" className="mt-0">
                <SimpleChallengeFlow
                  capsuleType={capsuleType}
                  archetypeId={archetypeId}
                  location={location}
                  groupSize={groupSize}
                />
              </TabsContent>

              <TabsContent value="wallet" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Tu Wallet</CardTitle>
                    <CardDescription>Recompensas y stickers obtenidos</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <WalletContent />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </WalletProviderMock>
  )
}

// Tipos para el flujo de desafío
type ChallengeStep = "challenge" | "verification" | "reward" | "complete"

interface SimpleChallengeFlowProps {
  capsuleType?: string
  archetypeId?: string
  location?: string
  groupSize?: number
  userId?: string
}

// Componente SimpleChallengeFlow que no depende de los servicios
function SimpleChallengeFlow({
  capsuleType = "borrachos",
  archetypeId = "malacopa",
  location = "Bar La Cortesía",
  groupSize = 4,
  userId = "user_123",
}: SimpleChallengeFlowProps) {
  // Estados
  const [step, setStep] = useState<ChallengeStep>("challenge")
  const [loading, setLoading] = useState(false)
  const [challenge, setChallenge] = useState<any>(null)
  const [reward, setReward] = useState<any>(null)
  const [verificationMethod, setVerificationMethod] = useState<"group" | "ai" | "manual">("group")
  const [socialTriggerActivated, setSocialTriggerActivated] = useState(false)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState<string | null>(null)

  // Acceder al wallet
  const wallet = useWalletMock()

  // Generar un desafío al cargar el componente
  useState(() => {
    generateChallenge()
  })

  // Función para generar un desafío
  const generateChallenge = async () => {
    setLoading(true)
    setError(null)
    try {
      // Simular generación de desafío
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Crear un desafío de ejemplo
      const generatedChallenge = {
        id: `challenge_${Date.now()}`,
        title: `Desafío de ${capsuleType}: ${archetypeId}`,
        description: `Un desafío emocionante para ${groupSize} personas en ${location}`,
        capsuleType,
        archetypeId,
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
    } catch (err) {
      console.error("Error generating challenge:", err)
      setError("Error al generar el desafío. Inténtalo de nuevo.")
    } finally {
      setLoading(false)
    }
  }

  // Función para verificar el desafío
  const verifyChallenge = async (success: boolean) => {
    setLoading(true)
    setError(null)
    try {
      // Simular verificación
      await new Promise((resolve) => setTimeout(resolve, 1500))

      if (success) {
        setStep("reward")
        setProgress(50)
      } else {
        setError("Verificación fallida. Inténtalo de nuevo.")
      }
    } catch (err) {
      console.error("Error verifying challenge:", err)
      setError("Error en la verificación. Inténtalo de nuevo.")
    } finally {
      setLoading(false)
    }
  }

  // Función para generar recompensa
  const generateReward = async () => {
    setLoading(true)
    setError(null)
    try {
      // Simular generación de recompensa
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Crear una recompensa de ejemplo
      const generatedReward = {
        id: `reward_${Date.now()}`,
        name: socialTriggerActivated ? "Recompensa Premium" : "Recompensa Estándar",
        description: `Una recompensa por completar el desafío de ${capsuleType}`,
        type: Math.random() > 0.5 ? "sticker" : "reward",
        value: Math.floor(Math.random() * 100) + 10,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        category: capsuleType,
      }

      setReward(generatedReward)
      setProgress(75)
      setStep("complete")

      // Añadir la recompensa al wallet
      if (generatedReward.type === "sticker") {
        wallet.addSticker(
          generatedReward.id,
          generatedReward.name,
          generatedReward.description,
          generatedReward.category,
        )
      } else {
        wallet.addReward(
          "reward",
          generatedReward.id,
          generatedReward.name,
          generatedReward.description,
          undefined,
          generatedReward.expiresAt,
        )
      }
    } catch (err) {
      console.error("Error generating reward:", err)
      setError("Error al generar la recompensa. Inténtalo de nuevo.")
    } finally {
      setLoading(false)
    }
  }

  // Función para activar trigger social
  const toggleSocialTrigger = () => {
    setSocialTriggerActivated(!socialTriggerActivated)
  }

  // Función para reiniciar el flujo
  const resetFlow = () => {
    setStep("challenge")
    setChallenge(null)
    setReward(null)
    setVerificationMethod("group")
    setSocialTriggerActivated(false)
    setProgress(0)
    setError(null)
    generateChallenge()
  }

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
    <div className="max-w-md mx-auto">
      <Card className="w-full">
        <div className="px-6 pt-6">
          <Progress value={progress} className="h-2" />
        </div>
        {renderStep()}
      </Card>
    </div>
  )
}

// Componente para mostrar el contenido del wallet
function WalletContent() {
  const wallet = useWalletMock()

  if (wallet.rewards.length === 0 && wallet.stickers.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Tu wallet está vacío. Completa desafíos para ganar recompensas y stickers.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {wallet.rewards.length > 0 && (
        <div>
          <h3 className="text-lg font-medium mb-3">Recompensas</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {wallet.rewards.map((reward) => (
              <Card key={reward.id}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-medium">{reward.name}</h4>
                      <p className="text-sm text-gray-500">{reward.description}</p>
                      <div className="mt-2 flex items-center">
                        <Badge variant="outline" className="mr-2">
                          {reward.type}
                        </Badge>
                        {reward.expiresAt && (
                          <span className="text-xs text-gray-500">Expira: {reward.expiresAt.toLocaleDateString()}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {wallet.stickers.length > 0 && (
        <div>
          <h3 className="text-lg font-medium mb-3">Stickers</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {wallet.stickers.map((sticker) => (
              <Card key={sticker.id}>
                <CardContent className="p-4">
                  <h4 className="font-medium">{sticker.name}</h4>
                  <p className="text-xs text-gray-500">{sticker.description}</p>
                  <Badge variant="secondary" className="mt-2">
                    {sticker.category}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// Importar el hook para usar el wallet
import { useWalletMock } from "@/components/wallet/wallet-provider-mock"
