"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, Loader2 } from "lucide-react"
import type { CapsuleConfig } from "@/lib/types/dynamic-capsule"
import { useToast } from "@/hooks/use-toast"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface AIChallengeGeneratorProps {
  capsule: CapsuleConfig
  onGenerate?: (challenge: { title: string; challenge: string; aiPrompt: string }) => void
}

export default function AIChallengeGenerator({ capsule, onGenerate }: AIChallengeGeneratorProps) {
  const [challenge, setChallenge] = useState<{
    title: string
    challenge: string
    aiPrompt: string
    isMock?: boolean
  } | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const { toast } = useToast()

  const generateChallenge = async () => {
    setIsGenerating(true)

    try {
      const response = await fetch("/api/generate-challenge", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ capsule }),
      })

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`)
      }

      const data = await response.json()

      const generatedChallenge = {
        title: data.title,
        challenge: data.challenge,
        aiPrompt: data.aiPrompt,
        isMock: data.isMock,
      }

      setChallenge(generatedChallenge)

      if (onGenerate) {
        onGenerate(generatedChallenge)
      }

      if (data.isMock) {
        toast({
          title: "Usando retos pre-generados",
          description: "No se encontró una clave de API de OpenAI. Usando retos de ejemplo.",
          variant: "default",
        })
      } else {
        toast({
          title: "¡Reto generado!",
          description: "Se ha creado un nuevo reto para ti con GPT-4.",
          variant: "default",
        })
      }
    } catch (error) {
      console.error("Failed to generate challenge:", error)
      toast({
        title: "Error al generar reto",
        description: "No se pudo generar el reto. Usando reto de respaldo.",
        variant: "destructive",
      })

      // Set a fallback challenge
      setChallenge({
        title: "🎲 Reto de Emergencia",
        challenge: "Comparte una historia divertida sobre un momento inesperado.",
        aiPrompt: "Genera una imagen que represente una situación sorpresiva y cómica.",
        isMock: true,
      })
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <Card className="w-full bg-black/20 border-purple-500/30">
      <CardHeader>
        <CardTitle className="text-white">Generador de Retos</CardTitle>
        <CardDescription className="text-white/70">Genera un reto personalizado con IA</CardDescription>
      </CardHeader>
      <CardContent>
        {challenge ? (
          <div className="space-y-4">
            <div className="bg-purple-900/30 p-4 rounded-md border border-purple-500/30">
              <h3 className="text-white font-bold text-lg mb-2">{challenge.title}</h3>
              <p className="text-white font-medium">{challenge.challenge}</p>
            </div>
            <div className="bg-purple-900/30 p-4 rounded-md border border-purple-500/30">
              <h4 className="text-white/80 font-medium text-sm mb-1">Prompt para imagen:</h4>
              <p className="text-white/70 italic text-sm">{challenge.aiPrompt}</p>
            </div>

            {challenge.isMock && (
              <Alert variant="warning" className="bg-yellow-900/30 border-yellow-500/30">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle className="text-yellow-300">Modo de demostración</AlertTitle>
                <AlertDescription className="text-yellow-200/70">
                  Este es un reto pre-generado. Para usar GPT-4, configura la variable de entorno OPENAI_API_KEY.
                </AlertDescription>
              </Alert>
            )}
          </div>
        ) : (
          <p className="text-white/70 italic">Presiona el botón para generar un reto</p>
        )}
      </CardContent>
      <CardFooter>
        <Button
          onClick={generateChallenge}
          disabled={isGenerating}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
        >
          {isGenerating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generando...
            </>
          ) : challenge ? (
            "Generar Otro Reto"
          ) : (
            "Generar Reto"
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}
