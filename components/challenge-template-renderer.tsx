"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import type { UnifiedCard } from "@/lib/types/unified-card"
import {
  getTemplateForCard,
  type TemplateChallengeConfig,
  generateTemplatePrompt,
} from "@/lib/types/template-challenge-integration"

// Importar todas las plantillas correctamente
import { ChatToxico } from "@/components/ai-templates/chat-toxico"
import { InstagramDespechado } from "@/components/ai-templates/instagram-despechado"
import { MemeDespecho } from "@/components/ai-templates/meme-despecho"
import { NotificacionRedFlag } from "@/components/ai-templates/notificacion-redflag"
import { PerfilCitas } from "@/components/ai-templates/perfil-citas"
import { RevistaDrama } from "@/components/ai-templates/revista-drama"
import { TikTokDespecho } from "@/components/ai-templates/tiktok-despecho"

interface ChallengeTemplateRendererProps {
  card: UnifiedCard
  onComplete: (result: any) => void
  onCancel?: () => void
}

export default function ChallengeTemplateRenderer({ card, onComplete, onCancel }: ChallengeTemplateRendererProps) {
  const [loading, setLoading] = useState(true)
  const [templateConfig, setTemplateConfig] = useState<TemplateChallengeConfig | null>(null)
  const [prompt, setPrompt] = useState("")
  const { toast } = useToast()

  useEffect(() => {
    // Obtener la configuración de plantilla para esta carta
    const config = getTemplateForCard(card)

    if (config) {
      setTemplateConfig(config)
      // Generar el prompt para la plantilla
      setPrompt(generateTemplatePrompt(card, config))
    } else {
      toast({
        title: "Error",
        description: "No se encontró una plantilla para este desafío",
        variant: "destructive",
      })
    }

    setLoading(false)
  }, [card, toast])

  // Renderizar la plantilla correcta basada en el tipo
  const renderTemplate = () => {
    if (!templateConfig) return null

    // Preparar props comunes para todas las plantillas
    const commonProps = {
      onComplete,
      onCancel,
      prompt,
      initialMessage: prompt, // Para ChatToxico
      caption: prompt, // Para InstagramDespechado
      topText: templateConfig.defaultValues?.topText || "CUANDO", // Para MemeDespecho
      bottomText: templateConfig.defaultValues?.bottomText || prompt.toUpperCase(), // Para MemeDespecho
      title: templateConfig.defaultValues?.title || "ALERTA", // Para NotificacionRedFlag
      headline: templateConfig.defaultValues?.headline || "EXCLUSIVA", // Para RevistaDrama
      bio: templateConfig.defaultValues?.bio || prompt, // Para PerfilCitas
    }

    switch (templateConfig.templateType) {
      case "chat_toxico":
        return (
          <ChatToxico
            initialMessage={prompt}
            contactName={templateConfig.defaultValues?.contactName}
            aiResponse="..."
            onSendMessage={(message) => onComplete({ message })}
          />
        )
      case "instagram_despechado":
        return (
          <InstagramDespechado
            caption={prompt}
            userName={templateConfig.defaultValues?.username}
            onAddComment={(comment) => onComplete({ caption: prompt, comment })}
          />
        )
      case "meme_despecho":
        return (
          <MemeDespecho
            topText={templateConfig.defaultValues?.topText || "CUANDO"}
            bottomText={templateConfig.defaultValues?.bottomText || prompt.toUpperCase()}
            onGenerate={(top, bottom) => onComplete({ topText: top, bottomText: bottom })}
            onShare={() => onComplete({ shared: true })}
          />
        )
      case "notificacion_redflag":
        return (
          <NotificacionRedFlag
            title={templateConfig.defaultValues?.title || "ALERTA"}
            message={prompt}
            onGenerate={(title, message) => onComplete({ title, message })}
            onShare={() => onComplete({ shared: true })}
          />
        )
      case "perfil_citas":
        return (
          <PerfilCitas
            bio={prompt}
            userName={templateConfig.defaultValues?.name}
            userAge={templateConfig.defaultValues?.age}
            onGenerate={(bio) => onComplete({ bio })}
            onShare={() => onComplete({ shared: true })}
          />
        )
      case "revista_drama":
        return (
          <RevistaDrama
            headline={templateConfig.defaultValues?.headline || "EXCLUSIVA"}
            subheadline={prompt}
            onGenerate={(headline, subheadline) => onComplete({ headline, subheadline })}
            onShare={() => onComplete({ shared: true })}
          />
        )
      case "tiktok_despecho":
        return (
          <TikTokDespecho
            caption={prompt}
            username={templateConfig.defaultValues?.username}
            songName={templateConfig.defaultValues?.song}
            onGenerate={(caption, songName) => onComplete({ caption, songName })}
            onShare={() => onComplete({ shared: true })}
          />
        )
      default:
        return (
          <div className="text-center py-4">
            <p className="text-red-400">Plantilla no disponible</p>
            {onCancel && (
              <Button onClick={onCancel} className="mt-4">
                Volver
              </Button>
            )}
          </div>
        )
    }
  }

  if (loading) {
    return (
      <Card className="border-purple-500/50 bg-black/40 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-purple-500" />
            <span className="ml-2 text-white/70">Cargando plantilla...</span>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {templateConfig ? (
        renderTemplate()
      ) : (
        <Card className="border-red-500/50 bg-black/40 backdrop-blur-sm">
          <CardContent className="p-6">
            <p className="text-red-400 text-center">No se encontró una plantilla para este desafío</p>
            {onCancel && (
              <Button onClick={onCancel} className="mt-4 mx-auto block">
                Volver
              </Button>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
