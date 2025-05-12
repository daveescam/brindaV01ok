"use client"

import { useState } from "react"
import { TemplateSelector } from "@/components/template-selector"
import type { DespechoTemplate } from "@/lib/despecho-templates"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function PlantillasPage() {
  const [selectedTemplate, setSelectedTemplate] = useState<DespechoTemplate | null>(null)
  const [showResults, setShowResults] = useState(false)
  const { toast } = useToast()

  const handleSelectTemplate = (template: DespechoTemplate) => {
    setSelectedTemplate(template)
    setShowResults(false)
  }

  const handleCompletarDesafio = () => {
    setShowResults(true)
    toast({
      title: "¡Desafío completado!",
      description: "Tu creación ha sido guardada. ¡Revisa tu wallet para ver tus recompensas!",
    })
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-2 text-center">Plantillas de La Lotería del Despecho</h1>
      <p className="text-center text-gray-500 mb-8">Explora y prueba todas las plantillas disponibles</p>

      {!showResults ? (
        <div className="space-y-8">
          <Alert variant="warning">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Modo de prueba</AlertTitle>
            <AlertDescription>
              Estas plantillas son demostrativas. En el juego real, se usarán para completar desafíos y ganar
              recompensas.
            </AlertDescription>
          </Alert>

          <TemplateSelector onSelectTemplate={handleSelectTemplate} />

          {selectedTemplate && (
            <div className="flex justify-center mt-8">
              <Button
                onClick={handleCompletarDesafio}
                className="bg-gradient-to-r from-pink-500 to-purple-600 text-white py-2 px-6 rounded-full"
              >
                Completar Desafío
              </Button>
            </div>
          )}
        </div>
      ) : (
        <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-center">¡Desafío Completado!</h2>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
            <p className="text-green-800">Tu creación ha sido guardada y compartida con éxito.</p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-3 text-center">
              <p className="text-sm text-purple-800 font-medium">Puntos Ganados</p>
              <p className="text-2xl font-bold text-purple-600">+150</p>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-center">
              <p className="text-sm text-blue-800 font-medium">Nivel de Frescura</p>
              <p className="text-2xl font-bold text-blue-600">89%</p>
            </div>
          </div>

          <div className="flex space-x-2">
            <Button variant="outline" className="flex-1" onClick={() => setShowResults(false)}>
              Crear Otro
            </Button>
            <Button className="flex-1 bg-pink-500">Ver en Wallet</Button>
          </div>
        </div>
      )}
    </div>
  )
}
