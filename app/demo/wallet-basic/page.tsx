"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Award, Gift, Ticket } from "lucide-react"

export default function WalletBasicDemo() {
  const [rewards, setRewards] = useState<any[]>([])
  const [stickers, setStickers] = useState<any[]>([])

  // Simular recompensas y stickers
  useEffect(() => {
    // Recompensas de ejemplo
    const sampleRewards = [
      {
        id: "reward_1",
        name: "Shot Gratis",
        description: "Un shot gratis en tu próxima visita",
        type: "reward",
        value: 50,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        category: "borrachos",
      },
      {
        id: "reward_2",
        name: "Descuento 2x1",
        description: "Descuento 2x1 en bebidas seleccionadas",
        type: "discount",
        value: 100,
        expiresAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
        category: "despecho",
      },
    ]

    // Stickers de ejemplo
    const sampleStickers = [
      {
        id: "sticker_1",
        name: "Rey del DM Fallido",
        description: "Ganado por completar el desafío 'El Ex-Borracho'",
        category: "borrachos",
        createdAt: new Date(),
      },
      {
        id: "sticker_2",
        name: "Maestro del Despecho",
        description: "Ganado por completar 5 desafíos de despecho",
        category: "despecho",
        createdAt: new Date(),
      },
    ]

    setRewards(sampleRewards)
    setStickers(sampleStickers)
  }, [])

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Tu Wallet</h1>
      <p className="text-center mb-8 text-gray-500">Recompensas y stickers obtenidos en tus desafíos</p>

      <Tabs defaultValue="rewards" className="max-w-3xl mx-auto">
        <TabsList className="grid grid-cols-2 mb-8">
          <TabsTrigger value="rewards">Recompensas</TabsTrigger>
          <TabsTrigger value="stickers">Stickers</TabsTrigger>
        </TabsList>

        <TabsContent value="rewards" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {rewards.length > 0 ? (
              rewards.map((reward) => (
                <Card key={reward.id}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{reward.name}</CardTitle>
                      <Badge variant="outline">{reward.type}</Badge>
                    </div>
                    <CardDescription>{reward.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Gift className="h-5 w-5 text-primary mr-2" />
                        <span className="font-medium">{reward.value} puntos</span>
                      </div>
                      <div className="text-sm text-gray-500">
                        Expira: {new Date(reward.expiresAt).toLocaleDateString()}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" size="sm" className="w-full">
                      Usar Recompensa
                    </Button>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="col-span-2 text-center py-12">
                <Gift className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No tienes recompensas aún. Completa desafíos para ganarlas.</p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="stickers" className="mt-0">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {stickers.length > 0 ? (
              stickers.map((sticker) => (
                <Card key={sticker.id}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{sticker.name}</CardTitle>
                    <Badge>{sticker.category}</Badge>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-center h-24 bg-gray-100 dark:bg-gray-800 rounded-md mb-4">
                      <Award className="h-12 w-12 text-primary" />
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{sticker.description}</p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" size="sm" className="w-full">
                      Compartir
                    </Button>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="col-span-3 text-center py-12">
                <Ticket className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No tienes stickers aún. Completa desafíos para ganarlos.</p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
