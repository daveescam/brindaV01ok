"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Award, Share2, Download, ThumbsUp, MessageSquare, Sparkles } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import type { TemplateResult } from "@/lib/types/challenge-template-integration"

interface ChallengeTemplateResultProps {
  result: TemplateResult
  points: number
  onShare?: () => void
  onSaveToWallet?: () => void
  onContinue?: () => void
}

export default function ChallengeTemplateResult({
  result,
  points,
  onShare,
  onSaveToWallet,
  onContinue,
}: ChallengeTemplateResultProps) {
  const [likes, setLikes] = useState(result.metadata.socialMetrics?.likes || 0)
  const [comments, setComments] = useState(result.metadata.socialMetrics?.comments || 0)
  const [shared, setShared] = useState(false)
  const [saved, setSaved] = useState(false)
  const { toast } = useToast()

  // Calcular nivel de viralidad basado en puntos
  const viralityLevel = points < 10 ? "Bajo" : points < 20 ? "Medio" : "Alto"
  const viralityPercentage = Math.min(100, (points / 30) * 100)

  // Manejar compartir
  const handleShare = () => {
    setShared(true)
    setLikes(likes + Math.floor(Math.random() * 10) + 5)
    setComments(comments + Math.floor(Math.random() * 3) + 1)

    if (onShare) onShare()

    toast({
      title: "¡Compartido con éxito!",
      description: "Tu creación ha sido compartida y está recibiendo interacciones.",
    })
  }

  // Manejar guardar en wallet
  const handleSaveToWallet = () => {
    setSaved(true)

    if (onSaveToWallet) onSaveToWallet()

    toast({
      title: "¡Guardado en tu Wallet!",
      description: "Tu creación ha sido guardada en tu wallet de Brinda X.",
    })
  }

  // Formatear el tipo de plantilla para mostrar
  const formatTemplateType = (type: string) => {
    return type
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  }

  return (
    <Card className="border-purple-500/50 bg-black/40 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-white flex items-center justify-between">
          <div className="flex items-center">
            <Sparkles className="h-5 w-5 mr-2 text-pink-500" />
            Resultado Creativo
          </div>
          <Badge
            variant="outline"
            className={`
              ${
                points >= 20
                  ? "border-green-500 text-green-400"
                  : points >= 10
                    ? "border-yellow-500 text-yellow-400"
                    : "border-red-500 text-red-400"
              }
            `}
          >
            {points} puntos
          </Badge>
        </CardTitle>
      </CardHeader>

      <CardContent className="p-6">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-white mb-2">{formatTemplateType(result.templateType)}</h3>

          <div className="p-4 bg-black/60 rounded-lg mb-4 min-h-[100px]">
            {typeof result.content === "string" ? (
              <p className="text-white/90">{result.content}</p>
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-white/70">Contenido multimedia</p>
              </div>
            )}
          </div>

          <div className="flex justify-between text-sm text-white/70 mb-1">
            <span>Nivel de viralidad: {viralityLevel}</span>
            <span>{Math.round(viralityPercentage)}%</span>
          </div>
          <Progress
            value={viralityPercentage}
            className={`h-2 ${
              viralityPercentage >= 66 ? "bg-green-900" : viralityPercentage >= 33 ? "bg-yellow-900" : "bg-red-900"
            }`}
          />
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="flex items-center gap-2 p-3 bg-black/30 rounded-lg">
            <ThumbsUp className="h-5 w-5 text-blue-400" />
            <div>
              <p className="text-white font-medium">{likes}</p>
              <p className="text-xs text-white/60">Likes</p>
            </div>
          </div>
          <div className="flex items-center gap-2 p-3 bg-black/30 rounded-lg">
            <MessageSquare className="h-5 w-5 text-purple-400" />
            <div>
              <p className="text-white font-medium">{comments}</p>
              <p className="text-xs text-white/60">Comentarios</p>
            </div>
          </div>
        </div>

        {points >= 15 && (
          <div className="p-3 bg-gradient-to-r from-yellow-500/20 to-amber-500/20 rounded-lg border border-yellow-500/30 mb-6 animate-pulse">
            <p className="text-yellow-300 font-medium flex items-center justify-center">
              <Award className="h-5 w-5 mr-2" />
              ¡Recompensa Desbloqueada!
            </p>
          </div>
        )}
      </CardContent>

      <CardFooter className="px-6 pb-6 pt-0 flex justify-between">
        <div className="flex gap-2">
          <Button
            variant="outline"
            className={`border-pink-500 text-white hover:bg-pink-500/20 ${shared ? "bg-pink-500/20" : ""}`}
            onClick={handleShare}
            disabled={shared}
          >
            <Share2 className="h-4 w-4 mr-2" />
            {shared ? "Compartido" : "Compartir"}
          </Button>
          <Button
            variant="outline"
            className={`border-blue-500 text-white hover:bg-blue-500/20 ${saved ? "bg-blue-500/20" : ""}`}
            onClick={handleSaveToWallet}
            disabled={saved}
          >
            <Download className="h-4 w-4 mr-2" />
            {saved ? "Guardado" : "Guardar"}
          </Button>
        </div>
        <Button onClick={onContinue} className="bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-90">
          Continuar
        </Button>
      </CardFooter>
    </Card>
  )
}
