"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import { AlertTriangle, Share2, Download } from "lucide-react"

interface RedFlagNotificationProps {
  prompt?: string
  demoMode?: boolean
  onChallengeComplete?: (text: string, level: number) => void
}

export function RedFlagNotification({
  prompt = "¿Cuál fue la red flag más grande que ignoraste?",
  demoMode = false,
  onChallengeComplete,
}: RedFlagNotificationProps) {
  const [redFlagText, setRedFlagText] = useState("")
  const [toxicityLevel, setToxicityLevel] = useState(3)
  const [isGenerated, setIsGenerated] = useState(false)

  const handleToxicityChange = (value: number[]) => {
    setToxicityLevel(value[0])
  }

  const handleGenerate = () => {
    if (!redFlagText.trim()) return

    setIsGenerated(true)

    if (onChallengeComplete) {
      onChallengeComplete(redFlagText, toxicityLevel)
    }
  }

  const getToxicityLabel = () => {
    if (toxicityLevel <= 1) return "Leve"
    if (toxicityLevel <= 3) return "Moderada"
    if (toxicityLevel <= 4) return "Alta"
    return "Extrema"
  }

  const getToxicityColor = () => {
    if (toxicityLevel <= 1) return "text-yellow-500"
    if (toxicityLevel <= 3) return "text-orange-500"
    if (toxicityLevel <= 4) return "text-red-500"
    return "text-purple-500"
  }

  return (
    <div className="flex flex-col bg-gray-900 rounded-lg overflow-hidden">
      <div className="bg-red-900/30 p-3 border-b border-red-900/50">
        <div className="flex items-center">
          <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
          <h3 className="text-white font-medium">Red Flag Notification</h3>
        </div>
        <p className="text-white/60 text-sm mt-1">{prompt}</p>
      </div>

      {isGenerated ? (
        <div className="p-4">
          <div className="bg-black rounded-lg p-4 mb-4">
            <div className="flex items-center mb-3">
              <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
              <span className="text-white font-medium">Red Flag Detectada</span>
            </div>

            <div className="border border-red-500/30 rounded-lg p-4 mb-3">
              <p className="text-white text-lg">{redFlagText}</p>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <span className="text-white/70 text-sm">Nivel de toxicidad:</span>
                <span className={`ml-2 font-medium ${getToxicityColor()}`}>
                  {getToxicityLabel()} ({toxicityLevel}/5)
                </span>
              </div>
              <div className="flex space-x-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div
                    key={i}
                    className={`w-2 h-6 rounded-sm ${i < toxicityLevel ? "bg-red-500" : "bg-gray-700"}`}
                  ></div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex space-x-2">
            <Button variant="outline" className="flex-1 border-gray-700 text-white">
              <Download className="h-4 w-4 mr-2" />
              Guardar
            </Button>
            <Button variant="outline" className="flex-1 border-gray-700 text-white">
              <Share2 className="h-4 w-4 mr-2" />
              Compartir
            </Button>
          </div>
        </div>
      ) : (
        <div className="p-4">
          <div className="mb-4">
            <label className="block text-white/70 text-sm mb-1">Describe la red flag</label>
            <Textarea
              value={redFlagText}
              onChange={(e) => setRedFlagText(e.target.value)}
              placeholder="Ej: Me dijo que todos sus ex están locos..."
              className="bg-gray-800 border-gray-700 text-white resize-none"
              rows={3}
            />
          </div>

          <div className="mb-6">
            <label className="block text-white/70 text-sm mb-3">
              Nivel de toxicidad: <span className={getToxicityColor()}>{getToxicityLabel()}</span>
            </label>
            <Slider defaultValue={[3]} max={5} min={1} step={1} onValueChange={handleToxicityChange} className="mb-2" />
            <div className="flex justify-between text-xs text-white/50">
              <span>Leve</span>
              <span>Moderada</span>
              <span>Extrema</span>
            </div>
          </div>

          <Button
            onClick={handleGenerate}
            className="w-full bg-gradient-to-r from-red-500 to-pink-600 hover:opacity-90"
            disabled={!redFlagText.trim()}
          >
            Generar Red Flag
          </Button>
        </div>
      )}
    </div>
  )
}
