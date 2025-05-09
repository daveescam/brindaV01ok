"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { WalletItem } from "@/lib/types/wallet-engine"
import { Award, Gift, ImageIcon, Ticket, Sparkles, Lock } from "lucide-react"

interface WalletCardProps {
  item: WalletItem
  onClick?: () => void
}

export function WalletCard({ item, onClick }: WalletCardProps) {
  // Determinar el color de fondo según el tipo y rareza
  const getBgColor = () => {
    if (item.redeemed) return "from-gray-500/20 to-gray-600/20 border-gray-500/30"

    if (item.type === "card") {
      switch (item.rarity) {
        case "common":
          return "from-blue-500/20 to-purple-500/20 border-blue-500/30"
        case "uncommon":
          return "from-purple-500/20 to-pink-500/20 border-purple-500/30"
        case "rare":
          return "from-pink-500/20 to-red-500/20 border-pink-500/30"
        case "legendary":
          return "from-amber-500/20 to-yellow-500/20 border-amber-500/30"
        default:
          return "from-blue-500/20 to-purple-500/20 border-blue-500/30"
      }
    }

    if (item.type === "sticker") {
      return "from-green-500/20 to-teal-500/20 border-green-500/30"
    }

    if (item.type === "vault") {
      return "from-amber-500/20 to-yellow-500/20 border-amber-500/30"
    }

    if (item.type === "reward" || item.type === "discount" || item.type === "experience") {
      return "from-pink-500/20 to-purple-500/20 border-pink-500/30"
    }

    return "from-gray-500/20 to-gray-600/20 border-gray-500/30"
  }

  // Obtener el icono según el tipo
  const getIcon = () => {
    switch (item.type) {
      case "card":
        return <Sparkles className="h-5 w-5 text-blue-500" />
      case "sticker":
        return <ImageIcon className="h-5 w-5 text-green-500" />
      case "reward":
        return <Gift className="h-5 w-5 text-pink-500" />
      case "discount":
        return <Ticket className="h-5 w-5 text-purple-500" />
      case "experience":
        return <Award className="h-5 w-5 text-amber-500" />
      case "vault":
        return <Lock className="h-5 w-5 text-yellow-500" />
      default:
        return <Gift className="h-5 w-5 text-pink-500" />
    }
  }

  // Formatear la fecha
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <Card
      className={`bg-gradient-to-br ${getBgColor()} backdrop-blur-sm border cursor-pointer transition-all hover:shadow-md ${item.redeemed ? "opacity-70" : ""}`}
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className="bg-black/40 p-2 rounded-full mt-1">{getIcon()}</div>

          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h3 className="text-white font-bold">{item.name}</h3>
              {item.rarity && (
                <Badge
                  variant="outline"
                  className={`
                    text-xs border-white/20 
                    ${item.rarity === "common" ? "bg-blue-500/30" : ""}
                    ${item.rarity === "uncommon" ? "bg-purple-500/30" : ""}
                    ${item.rarity === "rare" ? "bg-pink-500/30" : ""}
                    ${item.rarity === "legendary" ? "bg-amber-500/30" : ""}
                  `}
                >
                  {item.rarity}
                </Badge>
              )}
            </div>

            <p className="text-white/80 text-sm mt-1">{item.description}</p>

            <div className="flex items-center justify-between mt-3">
              <div>
                <p className="text-white/60 text-xs">Adquirido: {formatDate(item.dateAcquired)}</p>
                {item.expiryDate && <p className="text-white/60 text-xs">Expira: {formatDate(item.expiryDate)}</p>}
              </div>

              {item.redemptionCode && (
                <Badge variant={item.redeemed ? "secondary" : "default"} className="text-xs">
                  {item.redeemed ? "Canjeado" : "Por canjear"}
                </Badge>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
