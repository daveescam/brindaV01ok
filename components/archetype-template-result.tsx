"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Award, Share2, Save, ArrowRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import type { TemplateType } from "@/lib/types/template-archetype-integration"

interface ArchetypeTemplateResultProps {
  result: {
    templateType: TemplateType
    content: any
    timestamp: number
  }
  points: number
  onShare?: () => void
  onSaveToWallet?: () => void
  onContinue?: () => void
}

export default function ArchetypeTemplateResult({
  result,
  points,
  onShare,
  onSaveToWallet,
  onContinue,
}: ArchetypeTemplateResultProps) {
  // Función para obtener el nombre para mostrar de cada tipo de plantilla
  const getTemplateDisplayName = (type: TemplateType) => {
    switch (type) {
      case "chat_toxico":
        return "Chat Tóxico"
      case "instagram_despechado":
        return "Instagram Despechado"
      case "meme_despecho":
        return "Meme de Despecho"
      case "notificacion_redflag":
        return "Alerta Red Flag"
      case "revista_drama":
        return "Revista Drama"
      case "tiktok_despecho":
        return "TikTok Despechado"
      case "perfil_citas":
        return "Perfil de Citas"
      default:
        return type.replace("_", " ")
    }
  }

  // Función para renderizar una vista previa del resultado
  const renderResultPreview = () => {
    switch (result.templateType) {
      case "chat_toxico":
        return (
          <div className="bg-gray-800 rounded-lg p-4 mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-white font-medium">Mensaje enviado:</span>
              <Badge variant="outline" className="bg-green-500/20 text-green-300">
                Enviado
              </Badge>
            </div>
            <p className="text-white/80 bg-blue-500/20 p-3 rounded-lg">{result.content.message || "..."}</p>
          </div>
        )
      case "instagram_despechado":
        return (
          <div className="bg-gray-800 rounded-lg p-4 mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-white font-medium">Post de Instagram:</span>
              <Badge variant="outline" className="bg-pink-500/20 text-pink-300">
                Publicado
              </Badge>
            </div>
            <p className="text-white/80 italic mb-2">"{result.content.caption || "..."}"</p>
            <div className="bg-pink-500/10 p-2 rounded-lg">
              <p className="text-white/60 text-sm">
                <span className="font-medium">Comentario:</span> {result.content.comment || "..."}
              </p>
            </div>
          </div>
        )
      case "meme_despecho":
        return (
          <div className="bg-gray-800 rounded-lg p-4 mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-white font-medium">Meme generado:</span>
              <Badge variant="outline" className="bg-amber-500/20 text-amber-300">
                Creado
              </Badge>
            </div>
            <div className="bg-black p-3 rounded-lg text-center">
              <p className="text-white font-bold mb-2">{result.content.topText || "CUANDO"}</p>
              <div className="h-24 bg-gray-700 rounded-lg mb-2 flex items-center justify-center">
                <span className="text-gray-500">[Imagen del meme]</span>
              </div>
              <p className="text-white font-bold">{result.content.bottomText || "..."}</p>
            </div>
          </div>
        )
      case "notificacion_redflag":
        return (
          <div className="bg-gray-800 rounded-lg p-4 mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-white font-medium">Alerta de Red Flag:</span>
              <Badge variant="outline" className="bg-red-500/20 text-red-300">
                Alerta
              </Badge>
            </div>
            <div className="bg-red-500/20 border border-red-500/30 p-3 rounded-lg">
              <p className="text-white font-bold mb-1">{result.content.title || "🚩 ALERTA DE RED FLAG 🚩"}</p>
              <p className="text-white/80">{result.content.message || "..."}</p>
            </div>
          </div>
        )
      default:
        return (
          <div className="bg-gray-800 rounded-lg p-4 mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-white font-medium">Contenido creado:</span>
              <Badge variant="outline" className="bg-purple-500/20 text-purple-300">
                Completado
              </Badge>
            </div>
            <p className="text-white/80">Contenido generado con éxito.</p>
          </div>
        )
    }
  }

  return (
    <Card className="border-green-500/50 bg-black/40 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <Award className="h-5 w-5 mr-2 text-green-500" />
          ¡Desafío Completado!
        </CardTitle>
      </CardHeader>

      <CardContent className="p-6">
        {renderResultPreview()}

        <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 mb-6">
          <div className="flex justify-between items-center">
            <span className="text-white">Plantilla utilizada:</span>
            <span className="text-green-300 font-medium">{getTemplateDisplayName(result.templateType)}</span>
          </div>
          <div className="flex justify-between items-center mt-2">
            <span className="text-white">Puntos ganados:</span>
            <span className="text-green-300 font-bold">{points} pts</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <Button variant="outline" className="border-pink-500 text-white hover:bg-pink-500/20" onClick={onShare}>
            <Share2 className="h-4 w-4 mr-2" />
            Compartir
          </Button>
          <Button
            variant="outline"
            className="border-amber-500 text-white hover:bg-amber-500/20"
            onClick={onSaveToWallet}
          >
            <Save className="h-4 w-4 mr-2" />
            Guardar
          </Button>
          <Button className="bg-gradient-to-r from-green-500 to-emerald-600 hover:opacity-90" onClick={onContinue}>
            Continuar
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
