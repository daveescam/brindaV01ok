"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import ChallengeFlow from "@/components/challenge-flow"
import { WalletProviderMock } from "@/components/wallet/wallet-provider-mock"

export default function ChallengeFlowDemo() {
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
                <ChallengeFlow
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
import { Badge } from "@/components/ui/badge"
