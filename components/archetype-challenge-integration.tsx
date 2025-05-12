"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import type { UnifiedCard } from "@/lib/types/unified-card"
import { useVerification } from "@/contexts/verification-context"
import { useSafeWallet } from "@/hooks/use-safe-wallet"
import ArchetypeTemplateSelector from "@/components/archetype-template-selector"
import ArchetypeTemplateResult from "@/components/archetype-template-result"
import {
  type TemplateType,
  type TemplateArchetypeConfig,
  generateTemplateVerification,
} from "@/lib/types/template-archetype-integration"

interface ArchetypeChallengeIntegrationProps {
  card: UnifiedCard
  onComplete?: () => void
}

export default function ArchetypeChallengeIntegration({ card, onComplete }: ArchetypeChallengeIntegrationProps) {
  const [step, setStep] = useState<"select" | "create" | "result">("select")
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateType | null>(null)
  const [templateConfig, setTemplateConfig] = useState<TemplateArchetypeConfig | null>(null)
  const [templateResult, setTemplateResult] = useState<any | null>(null)
  const [verificationPoints, setVerificationPoints] = useState(0)
  const { startChallengeVerification, completeChallenge, submitVerification } = useVerification()
  const { addSticker, addReward, isProviderMissing } = useSafeWallet()
  const { toast } = useToast()

  // Manejar la selección de plantilla
  const handleTemplateSelected = (templateType: TemplateType, config: TemplateArchetypeConfig) => {
    setSelectedTemplate(templateType)
    setTemplateConfig(config)
    setStep("create")

    // Iniciar verificación
    startChallengeVerification(card)
  }

  // Manejar la finalización de la plantilla
  const handleTemplateCompleted = (result: any) => {
    if (!templateConfig) return

    // Guardar el resultado
    setTemplateResult(result)

    // Completar el desafío
    completeChallenge()

    // Verificar el resultado
    if (templateConfig) {
      const verificationData = generateTemplateVerification(card, templateConfig, result)

      // Enviar verificación
      submitVerification(verificationData).then((success) => {
        if (success) {
          setVerificationPoints(templateConfig.verificationPoints)
          setStep("result")
        }
      })
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
    if (!templateResult || !templateConfig) return

    // Solo intentamos añadir recompensas si el provider existe
    if (!isProviderMissing) {
      // Añadir sticker a la wallet
      const stickerId = `sticker_${templateConfig.archetypeId}_${Date.now()}`
      addSticker(
        stickerId,
        `Sticker de ${card.card_title}`,
        `Completaste un desafío de ${templateConfig.archetypeId}`,
        templateConfig.capsuleType,
      )

      // Añadir recompensa a la wallet si hay puntos suficientes
      if (verificationPoints >= 10) {
        const rewardId = `reward_${templateConfig.archetypeId}_${Date.now()}`
        addReward(
          "reward",
          rewardId,
          card.reward.toString(),
          "Recompensa por completar desafío",
          undefined,
          new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 días
        )
      }

      toast({
        title: "¡Guardado en tu wallet!",
        description: "Tu creación y recompensas han sido guardadas en tu wallet.",
      })
    } else {
      toast({
        title: "Modo Demo",
        description: "En modo demo, las recompensas no se guardan en la wallet.",
      })
    }
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
          <ArchetypeTemplateSelector
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
          <ArchetypeTemplateResult
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
