"use client"

import { useWallet } from "./wallet-provider"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Sparkles, Gift, Lock, Award } from "lucide-react"

export function WalletStats() {
  const { getStats, getItemsByType, getItemsByCapsule } = useWallet()

  const stats = getStats()
  if (!stats) return null

  // Calcular porcentajes
  const cardPercentage = stats.totalItems > 0 ? (stats.cards / stats.totalItems) * 100 : 0
  const stickerPercentage = stats.totalItems > 0 ? (stats.stickers / stats.totalItems) * 100 : 0
  const rewardPercentage = stats.totalItems > 0 ? (stats.rewards / stats.totalItems) * 100 : 0
  const vaultPercentage = stats.totalItems > 0 ? (stats.vaults / stats.totalItems) * 100 : 0

  // Calcular porcentaje de elementos canjeados
  const redeemedPercentage = stats.totalItems > 0 ? (stats.redeemedItems / stats.totalItems) * 100 : 0

  // Obtener cápsulas únicas
  const allItems = [
    ...getItemsByType("card"),
    ...getItemsByType("sticker"),
    ...getItemsByType("reward"),
    ...getItemsByType("discount"),
    ...getItemsByType("experience"),
    ...getItemsByType("vault"),
  ]

  const uniqueCapsules = [...new Set(allItems.map((item) => item.capsuleId).filter(Boolean))]

  return (
    <div>
      <h3 className="text-xl font-bold text-white mb-6">Estadísticas de tu Wallet</h3>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <Card className="bg-black/40 border-purple-500/30">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="bg-purple-500/20 p-2 rounded-full">
                <Award className="h-5 w-5 text-purple-500" />
              </div>
              <div>
                <p className="text-white/70 text-sm">Total de Elementos</p>
                <p className="text-2xl font-bold text-white">{stats.totalItems}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black/40 border-green-500/30">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="bg-green-500/20 p-2 rounded-full">
                <Lock className="h-5 w-5 text-green-500" />
              </div>
              <div>
                <p className="text-white/70 text-sm">Cápsulas Exploradas</p>
                <p className="text-2xl font-bold text-white">{uniqueCapsules.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <h4 className="text-lg font-medium text-white mb-3">Distribución de Elementos</h4>

      <div className="space-y-4 mb-6">
        <div>
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-blue-500" />
              <span className="text-white/80">Cartas</span>
            </div>
            <span className="text-white/80">{stats.cards}</span>
          </div>
          <Progress value={cardPercentage} className="h-2" />
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
              <Image className="h-4 w-4 text-green-500" />
              <span className="text-white/80">Stickers</span>
            </div>
            <span className="text-white/80">{stats.stickers}</span>
          </div>
          <Progress value={stickerPercentage} className="h-2" />
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
              <Gift className="h-4 w-4 text-pink-500" />
              <span className="text-white/80">Premios</span>
            </div>
            <span className="text-white/80">{stats.rewards}</span>
          </div>
          <Progress value={rewardPercentage} className="h-2" />
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
              <Lock className="h-4 w-4 text-amber-500" />
              <span className="text-white/80">Vaults</span>
            </div>
            <span className="text-white/80">{stats.vaults}</span>
          </div>
          <Progress value={vaultPercentage} className="h-2" />
        </div>
      </div>

      <h4 className="text-lg font-medium text-white mb-3">Estado de Elementos</h4>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <Card className="bg-black/40 border-blue-500/30">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="bg-blue-500/20 p-2 rounded-full">
                <Gift className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <p className="text-white/70 text-sm">Por Canjear</p>
                <p className="text-2xl font-bold text-white">{stats.pendingItems}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black/40 border-green-500/30">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="bg-green-500/20 p-2 rounded-full">
                <Award className="h-5 w-5 text-green-500" />
              </div>
              <div>
                <p className="text-white/70 text-sm">Canjeados</p>
                <p className="text-2xl font-bold text-white">{stats.redeemedItems}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div>
        <div className="flex items-center justify-between mb-1">
          <span className="text-white/80">Progreso de Canje</span>
          <span className="text-white/80">
            {stats.redeemedItems}/{stats.totalItems}
          </span>
        </div>
        <Progress value={redeemedPercentage} className="h-2" />
      </div>
    </div>
  )
}
