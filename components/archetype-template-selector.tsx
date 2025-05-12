"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Sparkles, ImageIcon, MessageSquare, Share2, AlertTriangle, BookOpen, User } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import type { UnifiedCard } from "@/lib/types/unified-card"
import {
  type TemplateType,
  type TemplateArchetypeConfig,
  getTemplateConfigForCard,
  hasTemplateIntegration,
  generateTemplatePrompt,
} from "@/lib/types/template-archetype-integration"

// Importar componentes de plantillas
import { ChatToxico } from "@/components/ai-templates/chat-toxico"
import { InstagramDespechado } from "@/components/ai-templates/instagram-despechado"
import { MemeDespecho } from "@/components/ai-templates/meme-despecho"
import { NotificacionRedFlag } from "@/components/ai-templates/notificacion-redflag"
import { RevistaDrama } from "@/components/ai-templates/revista-drama"
import { TikTokDespecho } from "@/components/ai-templates/tiktok-despecho"
import { PerfilCitas } from "@/components/ai-templates/perfil-citas"

interface ArchetypeTemplateSelectorProps {
  card: UnifiedCard
  onTemplateSelected?: (templateType: TemplateType, config: TemplateArchetypeConfig) => void
  onTemplateCompleted?: (result: any) => void
}

export default function ArchetypeTemplateSelector({
  card,
  onTemplateSelected,
  onTemplateCompleted,
}: ArchetypeTemplateSelectorProps) {
  const [hasTemplate, setHasTemplate] = useState(false)
  const [templateConfig, setTemplateConfig] = useState<TemplateArchetypeConfig | null>(null)
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateType | null>(null)
  const [prompt, setPrompt] = useState("")
  const { toast } = useToast()

  // Verificar si la carta tiene integración de plantilla
  useEffect(() => {
    const hasIntegration = hasTemplateIntegration(card)
    setHasTemplate(hasIntegration)

    if (hasIntegration) {
      const config = getTemplateConfigForCard(card)
      setTemplateConfig(config)

      if (config) {
        setSelectedTemplate(config.templateType)
        setPrompt(generateTemplatePrompt(card, config))

        if (onTemplateSelected) {
          onTemplateSelected(config.templateType, config)
        }
      }
    }
  }, [card, onTemplateSelected])

  // Si no hay plantilla disponible, mostrar mensaje
  if (!hasTemplate || !templateConfig) {
    return (
      <Card className="border-purple-500/50 bg-black/40 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="text-center py-8">
            <p className="text-white/70">Este desafío no tiene plantillas disponibles para su arquetipo.</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Renderizar la plantilla seleccionada
  const renderTemplate = () => {
    switch (selectedTemplate) {
      case "chat_toxico":
        return (
          <ChatToxico
            initialMessage={prompt}
            contactName={templateConfig.defaultValues?.contactName}
            lastSeen={templateConfig.defaultValues?.lastSeen}
            onSendMessage={(message) => handleTemplateComplete({ message })}
          />
        )
      case "instagram_despechado":
        return (
          <InstagramDespechado
            prompt={prompt}
            username={templateConfig.defaultValues?.username}
            location={templateConfig.defaultValues?.location}
            likes={templateConfig.defaultValues?.likes}
            onAddComment={(comment) => handleTemplateComplete({ caption: prompt, comment })}
          />
        )
      case "meme_despecho":
        return (
          <MemeDespecho
            initialTopText={templateConfig.defaultValues?.topText || "CUANDO"}
            initialBottomText={templateConfig.defaultValues?.bottomText || prompt.toUpperCase()}
            prompt={prompt}
            onGenerate={(top, bottom) => handleTemplateComplete({ topText: top, bottomText: bottom })}
            onShare={() => handleTemplateComplete({ shared: true })}
          />
        )
      case "notificacion_redflag":
        return (
          <NotificacionRedFlag
            prompt={prompt}
            initialTitle={templateConfig.defaultValues?.title}
            onGenerate={(title, message) => handleTemplateComplete({ title, message })}
            onShare={() => handleTemplateComplete({ shared: true })}
          />
        )
      case "revista_drama":
        return (
          <RevistaDrama
            prompt={prompt}
            initialHeadline={templateConfig.defaultValues?.headline}
            onGenerate={(headline, subheadline) => handleTemplateComplete({ headline, subheadline })}
            onShare={() => handleTemplateComplete({ shared: true })}
          />
        )
      case "tiktok_despecho":
        return (
          <TikTokDespecho
            prompt={prompt}
            initialCaption={templateConfig.defaultValues?.caption}
            initialSong={templateConfig.defaultValues?.song}
            onGenerate={(caption, song) => handleTemplateComplete({ caption, song })}
            onShare={() => handleTemplateComplete({ shared: true })}
          />
        )
      case "perfil_citas":
        return (
          <PerfilCitas
            prompt={prompt}
            initialName={templateConfig.defaultValues?.name}
            initialAge={templateConfig.defaultValues?.age}
            initialBio={templateConfig.defaultValues?.bio}
            onGenerate={(bio) => handleTemplateComplete({ bio })}
            onShare={() => handleTemplateComplete({ shared: true })}
          />
        )
      default:
        return (
          <div className="text-center py-8">
            <p className="text-white/70">Plantilla no disponible.</p>
          </div>
        )
    }
  }

  // Manejar la selección de plantilla
  const handleTemplateSelect = (templateType: TemplateType) => {
    setSelectedTemplate(templateType)

    if (templateConfig && onTemplateSelected) {
      const newConfig = {
        ...templateConfig,
        templateType,
      }
      setTemplateConfig(newConfig)
      onTemplateSelected(templateType, newConfig)
    }

    toast({
      title: "Plantilla seleccionada",
      description: `Has seleccionado la plantilla ${templateType.replace("_", " ")}.`,
    })
  }

  // Manejar la finalización de la plantilla
  const handleTemplateComplete = (result: any) => {
    if (onTemplateCompleted) {
      onTemplateCompleted({
        templateType: selectedTemplate,
        content: result,
        timestamp: Date.now(),
      })
    }

    toast({
      title: "¡Desafío completado!",
      description: "Tu creación ha sido guardada.",
    })
  }

  // Iconos para cada tipo de plantilla
  const getTemplateIcon = (type: TemplateType) => {
    switch (type) {
      case "chat_toxico":
        return <MessageSquare className="h-4 w-4 mr-2" />
      case "instagram_despechado":
        return <ImageIcon className="h-4 w-4 mr-2" />
      case "meme_despecho":
        return <ImageIcon className="h-4 w-4 mr-2" />
      case "notificacion_redflag":
        return <AlertTriangle className="h-4 w-4 mr-2" />
      case "revista_drama":
        return <BookOpen className="h-4 w-4 mr-2" />
      case "tiktok_despecho":
        return <ImageIcon className="h-4 w-4 mr-2" />
      case "perfil_citas":
        return <User className="h-4 w-4 mr-2" />
      default:
        return <Sparkles className="h-4 w-4 mr-2" />
    }
  }

  // Nombre para mostrar de cada tipo de plantilla
  const getTemplateDisplayName = (type: TemplateType) => {
    switch (type) {
      case "chat_toxico":
        return "Chat"
      case "instagram_despechado":
        return "Insta"
      case "meme_despecho":
        return "Meme"
      case "notificacion_redflag":
        return "Red Flag"
      case "revista_drama":
        return "Revista"
      case "tiktok_despecho":
        return "TikTok"
      case "perfil_citas":
        return "Dating"
      default:
        return type.replace("_", " ")
    }
  }

  return (
    <Card className="border-purple-500/50 bg-black/40 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <Sparkles className="h-5 w-5 mr-2 text-pink-500" />
          Plantillas para {card.card_title}
        </CardTitle>
      </CardHeader>

      <CardContent className="p-6">
        <Tabs defaultValue={selectedTemplate || "chat_toxico"} className="mb-6">
          <TabsList className="grid grid-cols-4 mb-4">
            {["chat_toxico", "instagram_despechado", "meme_despecho", "notificacion_redflag"].map((type) => (
              <TabsTrigger
                key={type}
                value={type}
                onClick={() => handleTemplateSelect(type as TemplateType)}
                className="data-[state=active]:bg-pink-500/20"
              >
                {getTemplateIcon(type as TemplateType)}
                {getTemplateDisplayName(type as TemplateType)}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value={selectedTemplate || "chat_toxico"}>{renderTemplate()}</TabsContent>
        </Tabs>

        <div className="flex justify-between mt-4">
          <Button variant="outline" className="border-pink-500 text-white hover:bg-pink-500/20">
            <Share2 className="h-4 w-4 mr-2" />
            Compartir
          </Button>
          <Button
            onClick={() => handleTemplateComplete({ completed: true })}
            className="bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-90"
          >
            Completar Desafío
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
