"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { useWallet } from "./wallet-provider"
import { WalletCard } from "./wallet-card"
import { WalletItemDetail } from "./wallet-item-detail"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sparkles, ImageIcon, Gift, Lock, BarChart3 } from "lucide-react"
import type { WalletItem } from "@/lib/types/wallet-engine"
import { WalletStats } from "./wallet-stats"

export function WalletView() {
  const { getItemsByType, getStats } = useWallet()
  const [selectedItem, setSelectedItem] = useState<WalletItem | null>(null)
  const [isDetailOpen, setIsDetailOpen] = useState(false)

  // Obtener elementos por tipo
  const cards = getItemsByType("card")
  const stickers = getItemsByType("sticker")
  const rewards = [...getItemsByType("reward"), ...getItemsByType("discount"), ...getItemsByType("experience")]
  const vaults = getItemsByType("vault")

  // Abrir detalle de un elemento
  const openItemDetail = (item: WalletItem) => {
    setSelectedItem(item)
    setIsDetailOpen(true)
  }

  // Cerrar detalle
  const closeItemDetail = () => {
    setIsDetailOpen(false)
    setSelectedItem(null)
  }

  return (
    <div className="bg-black/40 backdrop-blur-sm rounded-lg border border-purple-500/30 overflow-hidden">
      {isDetailOpen && selectedItem ? (
        <WalletItemDetail item={selectedItem} onClose={closeItemDetail} />
      ) : (
        <Tabs defaultValue="cards">
          <div className="p-4 border-b border-purple-500/30">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-white">Mi Wallet</h2>
              <Button variant="ghost" size="sm" className="text-white/70 hover:text-white">
                <BarChart3 className="h-4 w-4 mr-2" />
                Estadísticas
              </Button>
            </div>

            <TabsList className="grid grid-cols-4 w-full">
              <TabsTrigger value="cards" className="flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
                <span className="hidden sm:inline">Cartas</span>
                <span className="inline sm:hidden">{cards.length}</span>
              </TabsTrigger>
              <TabsTrigger value="stickers" className="flex items-center gap-2">
                <ImageIcon className="h-4 w-4" />
                <span className="hidden sm:inline">Stickers</span>
                <span className="inline sm:hidden">{stickers.length}</span>
              </TabsTrigger>
              <TabsTrigger value="rewards" className="flex items-center gap-2">
                <Gift className="h-4 w-4" />
                <span className="hidden sm:inline">Premios</span>
                <span className="inline sm:hidden">{rewards.length}</span>
              </TabsTrigger>
              <TabsTrigger value="vaults" className="flex items-center gap-2">
                <Lock className="h-4 w-4" />
                <span className="hidden sm:inline">Vaults</span>
                <span className="inline sm:hidden">{vaults.length}</span>
              </TabsTrigger>
            </TabsList>
          </div>

          <ScrollArea className="h-[500px]">
            <TabsContent value="cards" className="p-4">
              {cards.length > 0 ? (
                <div className="grid grid-cols-1 gap-4">
                  {cards.map((card) => (
                    <WalletCard key={card.id} item={card} onClick={() => openItemDetail(card)} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Sparkles className="h-12 w-12 text-blue-500/50 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-white mb-2">No tienes cartas aún</h3>
                  <p className="text-white/60">Completa retos en las cápsulas emocionales para coleccionar cartas.</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="stickers" className="p-4">
              {stickers.length > 0 ? (
                <div className="grid grid-cols-1 gap-4">
                  {stickers.map((sticker) => (
                    <WalletCard key={sticker.id} item={sticker} onClick={() => openItemDetail(sticker)} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <ImageIcon className="h-12 w-12 text-green-500/50 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-white mb-2">No tienes stickers aún</h3>
                  <p className="text-white/60">Gana stickers completando retos y obteniendo votos.</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="rewards" className="p-4">
              {rewards.length > 0 ? (
                <div className="grid grid-cols-1 gap-4">
                  {rewards.map((reward) => (
                    <WalletCard key={reward.id} item={reward} onClick={() => openItemDetail(reward)} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Gift className="h-12 w-12 text-pink-500/50 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-white mb-2">No tienes premios aún</h3>
                  <p className="text-white/60">Gana premios completando cápsulas y acumulando puntos.</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="vaults" className="p-4">
              {vaults.length > 0 ? (
                <div className="grid grid-cols-1 gap-4">
                  {vaults.map((vault) => (
                    <WalletCard key={vault.id} item={vault} onClick={() => openItemDetail(vault)} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Lock className="h-12 w-12 text-amber-500/50 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-white mb-2">No tienes vaults aún</h3>
                  <p className="text-white/60">Desbloquea vaults completando todas las cartas de una cápsula.</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="stats" className="p-4">
              <WalletStats />
            </TabsContent>
          </ScrollArea>
        </Tabs>
      )}
    </div>
  )
}
