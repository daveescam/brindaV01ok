"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Gift, Share2, Trophy } from "lucide-react"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

interface RewardDisplayProps {
  rewards: {
    digital: string
    physical: string
    social: string
  }
}

export default function RewardDisplay({ rewards }: RewardDisplayProps) {
  const [isRedeeming, setIsRedeeming] = useState(false)
  const { toast } = useToast()

  const handleRedeemReward = async () => {
    setIsRedeeming(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    toast({
      title: "¡Recompensa canjeada!",
      description: `Has canjeado: ${rewards.physical}`,
      variant: "default",
    })

    setIsRedeeming(false)
  }

  const handleShareSocial = () => {
    // In a real implementation, this would open a share dialog
    navigator.clipboard.writeText(`¡Acabo de completar un reto en Brinda X! ${rewards.social}`)

    toast({
      title: "¡Listo para compartir!",
      description: `Hashtag copiado: ${rewards.social}`,
      variant: "default",
    })
  }

  return (
    <Card className="w-full bg-black/20 border-purple-500/30">
      <CardHeader>
        <CardTitle className="text-white">Recompensas</CardTitle>
        <CardDescription className="text-white/70">Completa el reto para desbloquear estas recompensas</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-purple-900/30 p-4 rounded-md border border-purple-500/30 flex items-start space-x-3">
          <Trophy className="text-yellow-400 h-5 w-5 mt-0.5" />
          <div>
            <h3 className="text-white font-medium text-sm">Recompensa Digital</h3>
            <p className="text-white/90">{rewards.digital}</p>
          </div>
        </div>

        <div className="bg-purple-900/30 p-4 rounded-md border border-purple-500/30 flex items-start space-x-3">
          <Gift className="text-pink-400 h-5 w-5 mt-0.5" />
          <div>
            <h3 className="text-white font-medium text-sm">Recompensa Física</h3>
            <p className="text-white/90">{rewards.physical}</p>
            <Button
              onClick={handleRedeemReward}
              disabled={isRedeeming}
              size="sm"
              className="mt-2 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700"
            >
              {isRedeeming ? "Canjeando..." : "Canjear Ahora"}
            </Button>
          </div>
        </div>

        <div className="bg-purple-900/30 p-4 rounded-md border border-purple-500/30 flex items-start space-x-3">
          <Share2 className="text-blue-400 h-5 w-5 mt-0.5" />
          <div>
            <h3 className="text-white font-medium text-sm">Recompensa Social</h3>
            <p className="text-white/90">{rewards.social}</p>
            <Button
              onClick={handleShareSocial}
              variant="outline"
              size="sm"
              className="mt-2 border-white/20 text-white hover:bg-white/10 hover:text-white"
            >
              Compartir
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
