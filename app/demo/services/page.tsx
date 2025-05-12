"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, RefreshCw, Gift, Archive, BarChart2, FileText } from "lucide-react"
import { challengeService } from "@/lib/services/challenge-service"
import { rewardService } from "@/lib/services/reward-service"
import { vaultService } from "@/lib/services/vault-service"
import analyticsService from "@/lib/services/analytics-service"
import { copyService } from "@/lib/services/copy-service"

export default function ServicesDemo() {
  const [activeTab, setActiveTab] = useState("challenge")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)

  // Challenge Service
  const [challengeContext, setChallengeContext] = useState({
    userId: "user_123",
    location: "Bar La Cortesía",
    capsuleType: "borrachos",
    archetypeId: "malacopa",
    groupSize: 4,
  })

  // Reward Service
  const [rewardContext, setRewardContext] = useState({
    userId: "user_123",
    challengeId: "cortesia_001",
    verificationMethod: "group",
    verificationResult: true,
    socialTriggerActivated: false,
  })

  // Vault Service
  const [vaultParams, setVaultParams] = useState({
    type: "meme",
    limit: 5,
  })

  // Analytics Service
  const [analyticsQuery, setAnalyticsQuery] = useState({
    startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    endDate: new Date(),
  })

  // Copy Service
  const [copyParams, setCopyParams] = useState({
    type: "challenge",
    capsuleType: "borrachos",
    archetypeId: "extexter",
    emotionalTier: "intense",
    count: 3,
  })

  // Handlers para cada servicio
  const handleChallengeGenerate = async () => {
    setLoading(true)
    try {
      const challenge = await challengeService.generateChallenge(challengeContext)
      setResult(challenge)
    } catch (error) {
      console.error("Error generating challenge:", error)
      setResult({ error: "Error al generar el desafío" })
    } finally {
      setLoading(false)
    }
  }

  const handleRewardGenerate = async () => {
    setLoading(true)
    try {
      // Obtener una carta para el contexto
      const challenge = await challengeService.getChallengeById(rewardContext.challengeId)
      if (!challenge) {
        throw new Error("Desafío no encontrado")
      }

      const reward = await rewardService.generateReward({
        ...rewardContext,
        card: challenge,
      })
      setResult(reward)
    } catch (error) {
      console.error("Error generating reward:", error)
      setResult({ error: "Error al generar la recompensa" })
    } finally {
      setLoading(false)
    }
  }

  const handleVaultQuery = async () => {
    setLoading(true)
    try {
      const items = await vaultService.getVaultItems({
        type: vaultParams.type as any,
        limit: vaultParams.limit,
      })
      setResult(items)
    } catch (error) {
      console.error("Error querying vault:", error)
      setResult({ error: "Error al consultar el vault" })
    } finally {
      setLoading(false)
    }
  }

  const handleAnalyticsQuery = async () => {
    setLoading(true)
    try {
      const summary = await analyticsService.getSummary(analyticsQuery.startDate, analyticsQuery.endDate)
      setResult(summary)
    } catch (error) {
      console.error("Error querying analytics:", error)
      setResult({ error: "Error al consultar las analíticas" })
    } finally {
      setLoading(false)
    }
  }

  const handleCopyGenerate = async () => {
    setLoading(true)
    try {
      const copies = await copyService.generateCopy(
        copyParams.type as any,
        {
          capsuleType: copyParams.capsuleType as any,
          archetypeId: copyParams.archetypeId,
          emotionalTier: copyParams.emotionalTier as any,
        },
        copyParams.count,
      )
      setResult(copies)
    } catch (error) {
      console.error("Error generating copy:", error)
      setResult({ error: "Error al generar el copy" })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Servicios de Brinda X</h1>
      <p className="text-center mb-8 text-gray-500">Demostración de los servicios principales de la plataforma</p>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-5 mb-8">
          <TabsTrigger value="challenge" className="flex items-center gap-2">
            <RefreshCw className="h-4 w-4" />
            <span>Challenge</span>
          </TabsTrigger>
          <TabsTrigger value="reward" className="flex items-center gap-2">
            <Gift className="h-4 w-4" />
            <span>Reward</span>
          </TabsTrigger>
          <TabsTrigger value="vault" className="flex items-center gap-2">
            <Archive className="h-4 w-4" />
            <span>Vault</span>
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <BarChart2 className="h-4 w-4" />
            <span>Analytics</span>
          </TabsTrigger>
          <TabsTrigger value="copy" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <span>Copy</span>
          </TabsTrigger>
        </TabsList>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Panel de configuración */}
          <Card>
            <CardHeader>
              <CardTitle>Configuración</CardTitle>
              <CardDescription>Configura los parámetros para probar el servicio</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Challenge Service */}
              <TabsContent value="challenge" className="mt-0">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="capsuleType">Tipo de Cápsula</Label>
                      <Select
                        value={challengeContext.capsuleType}
                        onValueChange={(value) => setChallengeContext({ ...challengeContext, capsuleType: value })}
                      >
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
                      <Select
                        value={challengeContext.archetypeId}
                        onValueChange={(value) => setChallengeContext({ ...challengeContext, archetypeId: value })}
                      >
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
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="location">Ubicación</Label>
                      <Input
                        id="location"
                        value={challengeContext.location}
                        onChange={(e) => setChallengeContext({ ...challengeContext, location: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="groupSize">Tamaño del Grupo</Label>
                      <Input
                        id="groupSize"
                        type="number"
                        value={challengeContext.groupSize}
                        onChange={(e) =>
                          setChallengeContext({ ...challengeContext, groupSize: Number.parseInt(e.target.value) })
                        }
                      />
                    </div>
                  </div>
                  <Button onClick={handleChallengeGenerate} className="w-full" disabled={loading}>
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Generando...
                      </>
                    ) : (
                      "Generar Desafío"
                    )}
                  </Button>
                </div>
              </TabsContent>

              {/* Reward Service */}
              <TabsContent value="reward" className="mt-0">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="challengeId">ID del Desafío</Label>
                      <Input
                        id="challengeId"
                        value={rewardContext.challengeId}
                        onChange={(e) => setRewardContext({ ...rewardContext, challengeId: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="verificationMethod">Método de Verificación</Label>
                      <Select
                        value={rewardContext.verificationMethod}
                        onValueChange={(value) => setRewardContext({ ...rewardContext, verificationMethod: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona un método" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="group">Grupo</SelectItem>
                          <SelectItem value="ai">IA</SelectItem>
                          <SelectItem value="manual">Manual</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="verificationResult">Resultado de Verificación</Label>
                      <Select
                        value={rewardContext.verificationResult.toString()}
                        onValueChange={(value) =>
                          setRewardContext({ ...rewardContext, verificationResult: value === "true" })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona un resultado" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="true">Éxito</SelectItem>
                          <SelectItem value="false">Fallido</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="socialTriggerActivated">Trigger Social Activado</Label>
                      <Select
                        value={rewardContext.socialTriggerActivated.toString()}
                        onValueChange={(value) =>
                          setRewardContext({ ...rewardContext, socialTriggerActivated: value === "true" })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="true">Sí</SelectItem>
                          <SelectItem value="false">No</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <Button onClick={handleRewardGenerate} className="w-full" disabled={loading}>
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Generando...
                      </>
                    ) : (
                      "Generar Recompensa"
                    )}
                  </Button>
                </div>
              </TabsContent>

              {/* Vault Service */}
              <TabsContent value="vault" className="mt-0">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="vaultType">Tipo de Item</Label>
                      <Select
                        value={vaultParams.type}
                        onValueChange={(value) => setVaultParams({ ...vaultParams, type: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona un tipo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="meme">Meme</SelectItem>
                          <SelectItem value="sticker">Sticker</SelectItem>
                          <SelectItem value="clip">Clip</SelectItem>
                          <SelectItem value="photo">Foto</SelectItem>
                          <SelectItem value="audio">Audio</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="limit">Límite</Label>
                      <Input
                        id="limit"
                        type="number"
                        value={vaultParams.limit}
                        onChange={(e) => setVaultParams({ ...vaultParams, limit: Number.parseInt(e.target.value) })}
                      />
                    </div>
                  </div>
                  <Button onClick={handleVaultQuery} className="w-full" disabled={loading}>
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Consultando...
                      </>
                    ) : (
                      "Consultar Vault"
                    )}
                  </Button>
                </div>
              </TabsContent>

              {/* Analytics Service */}
              <TabsContent value="analytics" className="mt-0">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="startDate">Fecha Inicio</Label>
                      <Input
                        id="startDate"
                        type="date"
                        value={analyticsQuery.startDate.toISOString().split("T")[0]}
                        onChange={(e) =>
                          setAnalyticsQuery({
                            ...analyticsQuery,
                            startDate: new Date(e.target.value),
                          })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="endDate">Fecha Fin</Label>
                      <Input
                        id="endDate"
                        type="date"
                        value={analyticsQuery.endDate.toISOString().split("T")[0]}
                        onChange={(e) =>
                          setAnalyticsQuery({
                            ...analyticsQuery,
                            endDate: new Date(e.target.value),
                          })
                        }
                      />
                    </div>
                  </div>
                  <Button onClick={handleAnalyticsQuery} className="w-full" disabled={loading}>
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Analizando...
                      </>
                    ) : (
                      "Generar Resumen"
                    )}
                  </Button>
                </div>
              </TabsContent>

              {/* Copy Service */}
              <TabsContent value="copy" className="mt-0">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="copyType">Tipo de Copy</Label>
                      <Select
                        value={copyParams.type}
                        onValueChange={(value) => setCopyParams({ ...copyParams, type: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona un tipo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="challenge">Desafío</SelectItem>
                          <SelectItem value="social_trigger">Trigger Social</SelectItem>
                          <SelectItem value="ai_backup_prompt">AI Prompt</SelectItem>
                          <SelectItem value="reward_description">Recompensa</SelectItem>
                          <SelectItem value="template_prompt">Prompt de Plantilla</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="emotionalTier">Nivel Emocional</Label>
                      <Select
                        value={copyParams.emotionalTier}
                        onValueChange={(value) => setCopyParams({ ...copyParams, emotionalTier: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona un nivel" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="mild">Suave</SelectItem>
                          <SelectItem value="intense">Intenso</SelectItem>
                          <SelectItem value="chaotic">Caótico</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="capsuleType">Tipo de Cápsula</Label>
                      <Select
                        value={copyParams.capsuleType}
                        onValueChange={(value) => setCopyParams({ ...copyParams, capsuleType: value })}
                      >
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
                      <Label htmlFor="count">Cantidad</Label>
                      <Input
                        id="count"
                        type="number"
                        value={copyParams.count}
                        onChange={(e) => setCopyParams({ ...copyParams, count: Number.parseInt(e.target.value) })}
                      />
                    </div>
                  </div>
                  <Button onClick={handleCopyGenerate} className="w-full" disabled={loading}>
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Generando...
                      </>
                    ) : (
                      "Generar Copy"
                    )}
                  </Button>
                </div>
              </TabsContent>
            </CardContent>
          </Card>

          {/* Panel de resultados */}
          <Card>
            <CardHeader>
              <CardTitle>Resultados</CardTitle>
              <CardDescription>Resultados de la operación del servicio</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-50 dark:bg-gray-900 rounded-md p-4 h-[400px] overflow-auto">
                {loading ? (
                  <div className="flex items-center justify-center h-full">
                    <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
                  </div>
                ) : result ? (
                  <pre className="text-xs whitespace-pre-wrap">{JSON.stringify(result, null, 2)}</pre>
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-500">
                    <p>Configura los parámetros y haz clic en el botón para ver los resultados</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </Tabs>
    </div>
  )
}
