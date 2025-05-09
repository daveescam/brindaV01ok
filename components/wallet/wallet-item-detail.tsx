"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { useWallet } from "./wallet-provider"
import type { WalletItem } from "@/lib/types/wallet-engine"
import { Award, Calendar, Check, ChevronLeft, Copy, Share2, Sparkles } from "lucide-react"
import QRCode from "react-qr-code"

interface WalletItemDetailProps {
  item: WalletItem
  onClose: () => void
}

export function WalletItemDetail({ item, onClose }: WalletItemDetailProps) {
  const { redeemItem } = useWallet()
  const { toast } = useToast()
  const [isRedeeming, setIsRedeeming] = useState(false)
  const [copied, setCopied] = useState(false)

  // Formatear la fecha
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  // Canjear el elemento
  const handleRedeem = () => {
    setIsRedeeming(true)

    // Simular una petición a la API
    setTimeout(() => {
      redeemItem(item.id)
      toast({
        title: "¡Elemento canjeado!",
        description: "Has canjeado este elemento con éxito.",
      })
      setIsRedeeming(false)
    }, 1500)
  }

  // Copiar el código de redención
  const copyRedemptionCode = () => {
    if (item.redemptionCode) {
      navigator.clipboard.writeText(item.redemptionCode)
      setCopied(true)
      toast({
        title: "Código copiado",
        description: "El código ha sido copiado al portapapeles.",
      })

      setTimeout(() => setCopied(false), 2000)
    }
  }

  // Compartir el elemento
  const shareItem = () => {
    // En una aplicación real, esto abriría un diálogo de compartir
    toast({
      title: "Compartir",
      description: "Función de compartir no implementada en esta demo.",
    })
  }

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

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-6">
        <Button variant="ghost" size="sm" onClick={onClose} className="text-white">
          <ChevronLeft className="h-4 w-4 mr-2" />
          Volver
        </Button>

        <div className="flex gap-2">
          <Button variant="ghost" size="sm" onClick={shareItem} className="text-white">
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className={`bg-gradient-to-br ${getBgColor()} rounded-lg p-6 mb-6`}>
        <div className="flex justify-center mb-6">
          {item.imageUrl ? (
            <img
              src={item.imageUrl || "/placeholder.svg"}
              alt={item.name}
              className="h-32 w-32 object-contain rounded-lg"
            />
          ) : (
            <div className="h-32 w-32 flex items-center justify-center bg-black/40 rounded-lg">
              {item.type === "card" && <Sparkles className="h-16 w-16 text-blue-500/70" />}
              {item.type === "vault" && <Award className="h-16 w-16 text-amber-500/70" />}
              {(item.type === "reward" || item.type === "discount" || item.type === "experience") && (
                <Award className="h-16 w-16 text-pink-500/70" />
              )}
            </div>
          )}
        </div>

        <h2 className="text-2xl font-bold text-white text-center mb-2">{item.name}</h2>
        <p className="text-white/80 text-center mb-6">{item.description}</p>

        {item.redemptionCode && (
          <div className="mb-6">
            <div className="flex justify-center mb-4">
              <div className="bg-white p-3 rounded-lg">
                <QRCode
                  value={item.redemptionCode}
                  size={150}
                  style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                />
              </div>
            </div>

            <div className="flex items-center justify-center gap-2">
              <div className="bg-black/40 px-4 py-2 rounded-lg text-white font-mono text-lg">{item.redemptionCode}</div>
              <Button
                variant="outline"
                size="sm"
                onClick={copyRedemptionCode}
                className="border-white/30 text-white hover:bg-white/10"
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        )}

        <div className="flex flex-col gap-2 text-white/70 text-sm">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>Adquirido: {formatDate(item.dateAcquired)}</span>
          </div>

          {item.expiryDate && (
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>Expira: {formatDate(item.expiryDate)}</span>
            </div>
          )}

          {item.capsuleId && (
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              <span>Cápsula: {item.capsuleId}</span>
            </div>
          )}
        </div>
      </div>

      {item.redemptionCode && !item.redeemed ? (
        <Button
          className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-90"
          onClick={handleRedeem}
          disabled={isRedeeming}
        >
          {isRedeeming ? "Canjeando..." : "Canjear Ahora"}
        </Button>
      ) : item.redeemed ? (
        <div className="bg-gray-500/20 text-white/70 py-3 px-4 rounded-lg text-center">
          <div className="flex items-center justify-center gap-2">
            <Check className="h-5 w-5" />
            <span>Canjeado el {formatDate(new Date())}</span>
          </div>
        </div>
      ) : null}
    </div>
  )
}
