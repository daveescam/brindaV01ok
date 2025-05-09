"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import type { UnifiedCard } from "@/lib/types/unified-card"
import { useVerification } from "@/contexts/verification-context"
import { useWallet } from "@/components/wallet/wallet-provider"
import ChallengeTemplateSelector from "@/components/challenge-template-selector"
import ChallengeTemplateResult from "@/components/challenge-template-result"
import {
  type AITemplateType,
  type ChallengeTemplateConfig,
  type TemplateResult,
  generateTemplateResult,
  verifyTemplateResult,
  saveTemplateResultToWallet,
} from "@/lib/types/challenge-template-integration"

interface ChallengeTemplateIntegrationProps {
  card: UnifiedCard
  onComplete?: () => void
}

export default function ChallengeTemplateIntegration({ card, onComplete }: ChallengeTemplateIntegrationProps) {
  const [step, setStep] = useState<"select" | "create" | "result">("select")
  const [selectedTemplate, setSelectedTemplate] = useState<AITemplateType | null>(null)
  const [templateConfig, setTemplateConfig] = useState<ChallengeTemplateConfig | null>(null)
  const [templateResult, setTemplateResult] = useState<TemplateResult | null>(null)
  const [verificationPoints, setVerificationPoints] = useState(0)
  const { startChallengeVerification, completeChallenge, submitVerification } = useVerification()
  const { addItem } = useWallet()
  const { toast } = useToast()

  // Manejar la selección de plantilla
  const handleTemplateSelected = (templateType: AITemplateType, config: ChallengeTemplateConfig) => {
    setSelectedTemplate(templateType)
    setTemplateConfig(config)
    setStep("create")

    // Iniciar verificación
    startChallengeVerification(card)
  }

  // Manejar la finalización de la plantilla
  const handleTemplateCompleted = (result: any) => {
    if (!templateConfig) return

    // Generar resultado de plantilla
    const generatedResult = generateTemplateResult(templateConfig, result)
    setTemplateResult(generatedResult)

    // Completar el desafío
    completeChallenge()

    // Verificar el resultado
    if (templateConfig) {
      const verificationSession = completeChallenge()
      if (verificationSession) {
        const verificationData = verifyTemplateResult(generatedResult, templateConfig, verificationSession)

        // Enviar verificación
        submitVerification(verificationData).then((success) => {
          if (success) {
            setVerificationPoints(verificationData.points || 0)
            setStep("result")
          }
        })
      }
    }
  }

  // Manejar compartir resultado
  const handleShareResult = () => {
    // Lógica para compartir en redes sociales
    toast({
      title: "Compartido en redes",
      description: "Tu creación ha sido compartida en redes sociales.",
    })
  }

  // Manejar guardar en wallet
  const handleSaveToWallet = () => {
    if (!templateResult) return

    // Guardar en wallet
    const walletItemId = saveTemplateResultToWallet(templateResult)

    // Añadir a la wallet del usuario
    addItem({
      id: walletItemId,
      type: "template_result",
      name: `${templateResult.templateType.replace("_", " ")} - ${new Date().toLocaleDateString()}`,
      description: "Creación de plantilla AI",
      imageUrl: "/placeholder.svg?height=200&width=200",
      value: verificationPoints,
      dateAdded: new Date(),
      metadata: {
        templateType: templateResult.templateType,
        content: typeof templateResult.content === "string" ? templateResult.content : "Contenido multimedia",
        points: verificationPoints,
      },
    })
  }

  // Manejar continuar
  const handleContinue = () => {
    if (onComplete) onComplete()
  }

  // Renderizar el paso actual
  const renderStep = () => {
    switch (step) {
      case "select":
        return (
          <ChallengeTemplateSelector
            card={card}
            onTemplateSelected={handleTemplateSelected}
            onTemplateCompleted={handleTemplateCompleted}
          />
        )
      case "create":
        return (
          <Card className="border-purple-500/50 bg-black/40 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="text-center py-8">
                <p className="text-white/70">Creando tu contenido...</p>
                <Button
                  onClick={() => handleTemplateCompleted({ content: "Contenido de ejemplo" })}
                  className="mt-4 bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-90"
                >
                  Finalizar Creación
                </Button>
              </div>
            </CardContent>
          </Card>
        )
      case "result":
        return templateResult ? (
          <ChallengeTemplateResult
            result={templateResult}
            points={verificationPoints}
            onShare={handleShareResult}
            onSaveToWallet={handleSaveToWallet}
            onContinue={handleContinue}
          />
        ) : (
          <Card className="border-purple-500/50 bg-black/40 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="text-center py-8">
                <p className="text-white/70">No hay resultado disponible.</p>
                <Button
                  onClick={() => setStep("select")}
                  className="mt-4 bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-90"
                >
                  Volver a Intentar
                </Button>
              </div>
            </CardContent>
          </Card>
        )
      default:
        return null
    }
  }

  return <div className="space-y-6">{renderStep()}</div>
}
