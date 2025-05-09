"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ImageIcon, Download, Share2 } from "lucide-react"

interface MemeDespechoProps {
  prompt?: string
  demoMode?: boolean
}

export function MemeDespecho({ prompt = "Crea un meme sobre tu despecho", demoMode = false }: MemeDespechoProps) {
  const [topText, setTopText] = useState("")
  const [bottomText, setBottomText] = useState("")
  const [template, setTemplate] = useState("despechado1")
  const [isGenerated, setIsGenerated] = useState(false)

  const memeTemplates = [
    { id: "despechado1", name: "Persona llorando" },
    { id: "despechado2", name: "Ex tóxico" },
    { id: "borracho1", name: "Borracho confundido" },
    { id: "borracho2", name: "Malacopa" },
  ]

  const handleGenerateMeme = () => {
    setIsGenerated(true)
  }

  return (
    <div className="flex flex-col bg-gray-900 rounded-lg overflow-hidden">
      <div className="p-3 border-b border-gray-800">
        <h3 className="text-white font-medium">Generador de Memes</h3>
        <p className="text-white/60 text-sm">{prompt}</p>
      </div>

      {isGenerated ? (
        <div className="p-4">
          <div className="aspect-square bg-gray-800 rounded-lg overflow-hidden flex flex-col items-center justify-between p-4 mb-4">
            <div className="text-white text-xl font-bold text-center uppercase tracking-wider drop-shadow-lg">
              {topText}
            </div>
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-white/50 text-sm">Vista previa del meme</div>
            </div>
            <div className="text-white text-xl font-bold text-center uppercase tracking-wider drop-shadow-lg">
              {bottomText}
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
            <label className="block text-white/70 text-sm mb-1">Plantilla de meme</label>
            <Select value={template} onValueChange={setTemplate}>
              <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                <SelectValue placeholder="Selecciona una plantilla" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700 text-white">
                {memeTemplates.map((template) => (
                  <SelectItem key={template.id} value={template.id}>
                    {template.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="aspect-square bg-gray-800 rounded-lg overflow-hidden flex items-center justify-center mb-4">
            <ImageIcon className="h-12 w-12 text-gray-600" />
          </div>

          <div className="mb-4">
            <label className="block text-white/70 text-sm mb-1">Texto superior</label>
            <Textarea
              value={topText}
              onChange={(e) => setTopText(e.target.value)}
              placeholder="Texto superior del meme..."
              className="bg-gray-800 border-gray-700 text-white resize-none"
              rows={2}
            />
          </div>

          <div className="mb-4">
            <label className="block text-white/70 text-sm mb-1">Texto inferior</label>
            <Textarea
              value={bottomText}
              onChange={(e) => setBottomText(e.target.value)}
              placeholder="Texto inferior del meme..."
              className="bg-gray-800 border-gray-700 text-white resize-none"
              rows={2}
            />
          </div>

          <Button
            onClick={handleGenerateMeme}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:opacity-90"
            disabled={!topText.trim() && !bottomText.trim()}
          >
            Generar Meme
          </Button>
        </div>
      )}
    </div>
  )
}
