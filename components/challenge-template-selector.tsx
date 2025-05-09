"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Sparkles, ImageIcon, MessageSquare, Share2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import type { UnifiedCard } from "@/lib/types/unified-card"
import {
  type AITemplateType,
  type ChallengeTemplateConfig,
  getTemplateConfigForCard,
  hasTemplateIntegration,
} from "@/lib/types/challenge-template-integration"

// Importar componentes de plantillas
import ChatToxico from "@/components/ai-templates/chat-toxico"
import InstagramDespechado from "@/components/ai-templates/instagram-despechado"
import MemeDespecho from "@/components/ai-templates/meme-despecho"
import RedFlagNotification from "@/components/ai-templates/red-flag-notification"

interface ChallengeTemplateSelectorProps {
  card: UnifiedCard
  onTemplateSelected?: (templateType: AITemplateType, config: ChallengeTemplateConfig) => void
  onTemplateCompleted?: (result: any) => void
}

export default function ChallengeTemplateSelector({
  card,
  onTemplateSelected,
  onTemplateCompleted,
}: ChallengeTemplateSelectorProps) {
  const [hasTemplate, setHasTemplate] = useState(false)
  const [templateConfig, setTemplateConfig] = useState<ChallengeTemplateConfig | null>(null)
  const [selectedTemplate, setSelectedTemplate] = useState<AITemplateType | null>(null)
  const { toast } = useToast()

  // Verificar si la carta tiene integración de plantilla
  useEffect(() => {
    const hasIntegration = hasTemplateIntegration(card)
    setHasTemplate(hasIntegration)

    if (hasIntegration) {
      const config = getTemplateConfigForCard(card)
      setTemplateConfig(config)

      if (config && onTemplateSelected) {
        setSelectedTemplate(config.templateType)
        onTemplateSelected(config.templateType, config)
      }
    }
  }, [card, onTemplateSelected])

  // Si no hay plantilla disponible, mostrar mensaje
  if (!hasTemplate || !templateConfig) {
    return (
      <Card className="border-purple-500/50 bg-black/40 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="text-center py-8">
            <p className="text-white/70">Este desafío no tiene plantillas AI disponibles.</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Renderizar la plantilla seleccionada
  const renderTemplate = () => {
    switch (selectedTemplate) {
      case "chat_toxico":
        return <ChatToxico initialMessage={card.challenge} />
      case "instagram_despechado":
        return <InstagramDespechado initialCaption={card.challenge} />
      case "meme_despecho":
        return <MemeDespecho initialTopText="CUANDO TE PIDEN" initialBottomText={card.challenge.toUpperCase()} />
      case "red_flag_notification":
        return <RedFlagNotification initialMessage={card.challenge} />
      default:
        return (
          <div className="text-center py-8">
            <p className="text-white/70">Plantilla no disponible.</p>
          </div>
        )
    }
  }

  // Manejar la selección de plantilla
  const handleTemplateSelect = (templateType: AITemplateType) => {
    setSelectedTemplate(templateType)

    if (templateConfig && onTemplateSelected) {
      onTemplateSelected(templateType, templateConfig)
    }

    toast({
      title: "Plantilla seleccionada",
      description: `Has seleccionado la plantilla ${templateType.replace("_", " ")}.`,
    })
  }

  // Manejar la finalización de la plantilla
  const handleComplete = () => {
    if (onTemplateCompleted) {
      // Aquí se enviaría el resultado real de la plantilla
      onTemplateCompleted({
        templateType: selectedTemplate,
        content: "Contenido generado por la plantilla",
        timestamp: Date.now(),
      })
    }

    toast({
      title: "¡Desafío completado!",
      description: "Tu creación ha sido guardada y compartida.",
    })
  }

  return (
    <Card className="border-purple-500/50 bg-black/40 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <Sparkles className="h-5 w-5 mr-2 text-pink-500" />
          Plantillas Creativas
        </CardTitle>
      </CardHeader>

      <CardContent className="p-6">
        <Tabs defaultValue={selectedTemplate || "chat_toxico"} className="mb-6">
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger
              value="chat_toxico"
              onClick={() => handleTemplateSelect("chat_toxico")}
              className="data-[state=active]:bg-pink-500/20"
            >
              <MessageSquare className="h-4 w-4 mr-2" />
              Chat
            </TabsTrigger>
            <TabsTrigger
              value="instagram_despechado"
              onClick={() => handleTemplateSelect("instagram_despechado")}
              className="data-[state=active]:bg-pink-500/20"
            >
              <ImageIcon className="h-4 w-4 mr-2" />
              Insta
            </TabsTrigger>
            <TabsTrigger
              value="meme_despecho"
              onClick={() => handleTemplateSelect("meme_despecho")}
              className="data-[state=active]:bg-pink-500/20"
            >
              <ImageIcon className="h-4 w-4 mr-2" />
              Meme
            </TabsTrigger>
            <TabsTrigger
              value="red_flag_notification"
              onClick={() => handleTemplateSelect("red_flag_notification")}
              className="data-[state=active]:bg-pink-500/20"
            >
              <MessageSquare className="h-4 w-4 mr-2" />
              Red Flag
            </TabsTrigger>
          </TabsList>

          <TabsContent value={selectedTemplate || "chat_toxico"}>{renderTemplate()}</TabsContent>
        </Tabs>

        <div className="flex justify-between mt-4">
          <Button variant="outline" className="border-pink-500 text-white hover:bg-pink-500/20">
            <Share2 className="h-4 w-4 mr-2" />
            Compartir
          </Button>
          <Button onClick={handleComplete} className="bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-90">
            Completar Desafío
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
