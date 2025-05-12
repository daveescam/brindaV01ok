"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Beer, MessageSquare, ImageIcon, AlertTriangle, Award, Share2, Info } from "lucide-react"
import { ChatToxico } from "@/components/ai-templates/chat-toxico"
import { InstagramDespechado } from "@/components/ai-templates/instagram-despechado"
import { MemeDespecho } from "@/components/ai-templates/meme-despecho"
import { RedFlagNotification } from "@/components/ai-templates/red-flag-notification"
import { useSafeWallet } from "@/hooks/use-safe-wallet"
import { motion } from "framer-motion"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface CardBorrachoProps {
  card: {
    id: string
    title: string
    challenge: string
    emotion: string
    rarity: string
    chaos_level: number
    verification_type: string
    reward: {
      digital: string
      physical: string
      social: string
    }
  }
  onComplete?: (response: string, templateUsed: string) => void
}

export default function CardBorracho({ card, onComplete }: CardBorrachoProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)
  const [isCompleted, setIsCompleted] = useState(false)
  const [response, setResponse] = useState("")
  const [showReward, setShowReward] = useState(false)

  // Usamos el hook seguro que no falla si no hay WalletProvider
  const { addSticker, addReward, isProviderMissing } = useSafeWallet()

  const handleTemplateSelect = (template: string) => {
    setSelectedTemplate(template)
  }

  const handleResponseSubmit = (responseText: string) => {
    setResponse(responseText)
    setIsCompleted(true)

    // Simular verificación
    setTimeout(() => {
      setShowReward(true)

      // Solo intentamos añadir recompensas si el provider existe
      if (!isProviderMissing) {
        // Añadir recompensas a la wallet
        addSticker(
          `sticker_borracho_${Date.now()}`,
          card.reward.digital,
          "Completaste un desafío de 100 Borrachos Dijeron™",
          "borrachos",
        )

        addReward(
          "reward",
          `reward_borracho_${Date.now()}`,
          card.reward.physical,
          "Canjeable en el bar",
          undefined,
          new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 días
        )
      } else {
        console.warn("WalletProvider no encontrado. Las recompensas no se guardarán.")
      }

      if (onComplete) {
        onComplete(responseText, selectedTemplate || "")
      }
    }, 1500)
  }

  const renderRarityBadge = () => {
    const rarityColors = {
      común: "bg-gray-500",
      rara: "bg-blue-500",
      épica: "bg-purple-500",
      legendaria: "bg-yellow-500",
    }

    return (
      <Badge className={`${rarityColors[card.rarity as keyof typeof rarityColors] || "bg-gray-500"}`}>
        {card.rarity}
      </Badge>
    )
  }

  const renderEmotionBadge = () => {
    const emotionColors = {
      despecho: "bg-pink-500",
      cringe: "bg-green-500",
      honestidad_ebria: "bg-amber-500",
      vergüenza: "bg-red-500",
    }

    return (
      <Badge className={`${emotionColors[card.emotion as keyof typeof emotionColors] || "bg-gray-500"}`}>
        {card.emotion}
      </Badge>
    )
  }

  const renderChaosLevel = () => {
    const chaosIcons = []
    for (let i = 0; i < card.chaos_level; i++) {
      chaosIcons.push(<Beer key={i} className="h-4 w-4 text-amber-500" />)
    }
    return <div className="flex">{chaosIcons}</div>
  }

  const renderTemplateSelector = () => {
    return (
      <div className="space-y-4">
        {isProviderMissing && (
          <Alert variant="warning" className="bg-yellow-500/10 border-yellow-500/30 mb-4">
            <Info className="h-4 w-4 text-yellow-500" />
            <AlertTitle>Modo Demo</AlertTitle>
            <AlertDescription>WalletProvider no encontrado. Las recompensas no se guardarán.</AlertDescription>
          </Alert>
        )}

        <h3 className="text-lg font-medium">Elige cómo quieres responder:</h3>
        <div className="grid grid-cols-2 gap-3">
          <Button
            variant="outline"
            className={`border-blue-500/50 ${selectedTemplate === "chat" ? "bg-blue-500/20" : "bg-blue-500/10"} hover:bg-blue-500/20 text-white flex flex-col h-auto py-4`}
            onClick={() => handleTemplateSelect("chat")}
          >
            <MessageSquare className="h-6 w-6 mb-2" />
            <span>Chat Tóxico</span>
          </Button>
          <Button
            variant="outline"
            className={`border-pink-500/50 ${selectedTemplate === "instagram" ? "bg-pink-500/20" : "bg-pink-500/10"} hover:bg-pink-500/20 text-white flex flex-col h-auto py-4`}
            onClick={() => handleTemplateSelect("instagram")}
          >
            <ImageIcon className="h-6 w-6 mb-2" />
            <span>Instagram</span>
          </Button>
          <Button
            variant="outline"
            className={`border-green-500/50 ${selectedTemplate === "meme" ? "bg-green-500/20" : "bg-green-500/10"} hover:bg-green-500/20 text-white flex flex-col h-auto py-4`}
            onClick={() => handleTemplateSelect("meme")}
          >
            <ImageIcon className="h-6 w-6 mb-2" />
            <span>Meme</span>
          </Button>
          <Button
            variant="outline"
            className={`border-red-500/50 ${selectedTemplate === "redflag" ? "bg-red-500/20" : "bg-red-500/10"} hover:bg-red-500/20 text-white flex flex-col h-auto py-4`}
            onClick={() => handleTemplateSelect("redflag")}
          >
            <AlertTriangle className="h-6 w-6 mb-2" />
            <span>Red Flag</span>
          </Button>
        </div>
      </div>
    )
  }

  const renderSelectedTemplate = () => {
    switch (selectedTemplate) {
      case "chat":
        return <ChatToxico initialMessage={card.challenge} onChallengeComplete={handleResponseSubmit} />
      case "instagram":
        return <InstagramDespechado prompt={card.challenge} onChallengeComplete={handleResponseSubmit} />
      case "meme":
        return <MemeDespecho prompt={card.challenge} onChallengeComplete={handleResponseSubmit} />
      case "redflag":
        return <RedFlagNotification prompt={card.challenge} onChallengeComplete={handleResponseSubmit} />
      default:
        return null
    }
  }

  const renderReward = () => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-4"
      >
        <div className="flex justify-center mb-4">
          <div className="bg-green-500/20 p-4 rounded-full">
            <Award className="h-8 w-8 text-green-500" />
          </div>
        </div>

        <h3 className="text-xl font-bold text-center">¡Desafío Completado!</h3>
        <p className="text-center text-gray-400">Has ganado:</p>

        <div className="grid grid-cols-3 gap-4 mt-4">
          <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-3 flex flex-col items-center">
            <div className="bg-blue-500/30 p-2 rounded-full mb-2">
              <MessageSquare className="h-5 w-5 text-blue-500" />
            </div>
            <span className="text-white text-sm text-center">{card.reward.digital}</span>
          </div>
          <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-3 flex flex-col items-center">
            <div className="bg-green-500/30 p-2 rounded-full mb-2">
              <Award className="h-5 w-5 text-green-500" />
            </div>
            <span className="text-white text-sm text-center">{card.reward.physical}</span>
          </div>
          <div className="bg-pink-500/20 border border-pink-500/30 rounded-lg p-3 flex flex-col items-center">
            <div className="bg-pink-500/30 p-2 rounded-full mb-2">
              <Share2 className="h-5 w-5 text-pink-500" />
            </div>
            <span className="text-white text-sm text-center">{card.reward.social}</span>
          </div>
        </div>

        {isProviderMissing && (
          <Alert variant="warning" className="bg-yellow-500/10 border-yellow-500/30 mt-4">
            <Info className="h-4 w-4 text-yellow-500" />
            <AlertTitle>Modo Demo</AlertTitle>
            <AlertDescription>WalletProvider no encontrado. Las recompensas no se han guardado.</AlertDescription>
          </Alert>
        )}

        <div className="flex justify-center mt-6">
          <Button className="bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-90">
            <Share2 className="h-4 w-4 mr-2" />
            Compartir
          </Button>
        </div>
      </motion.div>
    )
  }

  return (
    <Card className="border-purple-500/50 bg-black/40 backdrop-blur-sm">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            {renderRarityBadge()}
            {renderEmotionBadge()}
          </div>
          {renderChaosLevel()}
        </div>
        <CardTitle className="text-2xl">{card.title}</CardTitle>
        <CardDescription className="text-white/70 text-lg">{card.challenge}</CardDescription>
      </CardHeader>

      <CardContent>
        {isCompleted ? (
          showReward ? (
            renderReward()
          ) : (
            <div className="flex justify-center py-8">
              <div className="animate-pulse flex flex-col items-center">
                <Award className="h-16 w-16 text-pink-500 mb-4" />
                <div className="h-2 w-48 bg-pink-500/50 rounded-full mb-2"></div>
                <div className="h-2 w-32 bg-pink-500/30 rounded-full"></div>
              </div>
            </div>
          )
        ) : selectedTemplate ? (
          renderSelectedTemplate()
        ) : (
          renderTemplateSelector()
        )}
      </CardContent>

      <CardFooter className="flex justify-between">
        {!isCompleted && selectedTemplate && (
          <Button variant="outline" onClick={() => setSelectedTemplate(null)} className="text-white/70">
            Volver
          </Button>
        )}
        <div className="text-white/70 text-sm">
          <span className="bg-pink-500/20 px-2 py-1 rounded-full">Verificación: {card.verification_type}</span>
        </div>
      </CardFooter>
    </Card>
  )
}
