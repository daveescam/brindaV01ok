"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import { AlertTriangle, Bell, Share2 } from "lucide-react"

interface RedFlagNotificationProps {
  prompt?: string
  demoMode?: boolean
}

export function RedFlagNotification({ prompt = "Comparte una red flag", demoMode = false }: RedFlagNotificationProps) {
  const [redFlagText, setRedFlagText] = useState("")
  const [toxicityLevel, setToxicityLevel] = useState([50])
  const [isGenerated, setIsGenerated] = useState(false)

  const handleGenerateRedFlag = () => {
    setIsGenerated(true)
  }

  const getToxicityLabel = () => {
    const level = toxicityLevel[0]
    if (level < 25) return "Leve"
    if (level < 50) return "Moderada"
    if (level < 75) return "Alta"
    return "Extrema"
  }

  const getToxicityColor = () => {
    const level = toxicityLevel[0]
    if (level < 25) return "yellow"
    if (level < 50) return "orange"
    if (level < 75) return "red"
    return "purple"
  }

  return (
    <div className="flex flex-col bg-gray-900 rounded-lg overflow-hidden">
      <div className="p-3 border-b border-gray-800">
        <h3 className="text-white font-medium">Alerta de Red Flag</h3>
        <p className="text-white/60 text-sm">{prompt}</p>
      </div>

      {isGenerated ? (
        <div className="p-4">
          <div
            className={`bg-${getToxicityColor()}-500/20 border border-${getToxicityColor()}-500/40 rounded-lg p-4 mb-4`}
          >
            <div className="flex items-center mb-3">
              <div className={`bg-${getToxicityColor()}-500/30 p-2 rounded-full mr-3`}>
                <AlertTriangle className={`h-5 w-5 text-${getToxicityColor()}-500`} />
              </div>
              <div>
                <h4 className="text-white font-medium">Alerta de Red Flag</h4>
                <p className="text-white/60 text-xs">Nivel de toxicidad: {getToxicityLabel()}</p>
              </div>
              <div className="ml-auto">
                <Bell className="h-5 w-5 text-white/60" />
              </div>
            </div>
            <div className="bg-black/30 rounded p-3 mb-3">
              <p className="text-white/90">{redFlagText}</p>
            </div>
            <div className="flex items-center justify-between text-xs text-white/60">
              <span>Ahora</span>
              <span>Swipe para ignorar</span>
            </div>
          </div>
          <Button variant="outline" className="w-full border-gray-700 text-white">
            <Share2 className="h-4 w-4 mr-2" />
            Compartir Alerta
          </Button>
        </div>
      ) : (
        <div className="p-4">
          <div className="mb-4">
            <label className="block text-white/70 text-sm mb-1">Describe la red flag</label>
            <Textarea
              value={redFlagText}
              onChange={(e) => setRedFlagText(e.target.value)}
              placeholder="Escribe la red flag que quieres compartir..."
              className="bg-gray-800 border-gray-700 text-white resize-none"
              rows={4}
            />
          </div>

          <div className="mb-6">
            <label className="block text-white/70 text-sm mb-3">
              Nivel de toxicidad: <span className="text-white font-medium">{getToxicityLabel()}</span>
            </label>
            <Slider
              value={toxicityLevel}
              onValueChange={setToxicityLevel}
              max={100}
              step={1}
              className={`text-${getToxicityColor()}-500`}
            />
            <div className="flex justify-between text-white/50 text-xs mt-1">
              <span>Leve</span>
              <span>Moderada</span>
              <span>Alta</span>
              <span>Extrema</span>
            </div>
          </div>

          <Button
            onClick={handleGenerateRedFlag}
            className={`w-full bg-gradient-to-r from-${getToxicityColor()}-500 to-${getToxicityColor()}-700 hover:opacity-90`}
            disabled={!redFlagText.trim()}
          >
            Generar Alerta
          </Button>
        </div>
      )}
    </div>
  )
}
