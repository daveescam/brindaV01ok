"use client"

import type { CapsuleConfig } from "@/lib/types/dynamic-capsule"
import AIChallengeGenerator from "./AIChallengeGenerator"
import RewardDisplay from "./RewardDisplay"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"

interface DynamicCardProps {
  capsule: CapsuleConfig
}

export default function DynamicCard({ capsule }: DynamicCardProps) {
  const [generatedChallenge, setGeneratedChallenge] = useState<{
    title: string
    challenge: string
    aiPrompt: string
  } | null>(null)

  const handleChallengeGenerated = (challenge: {
    title: string
    challenge: string
    aiPrompt: string
  }) => {
    setGeneratedChallenge(challenge)
  }

  // Determine the background style based on the capsule's visualStyle
  const getBackgroundStyle = () => {
    switch (capsule.visualStyle) {
      case "neon":
        return "bg-gradient-to-br from-purple-900/40 to-pink-900/40 border-purple-500/30"
      case "vintage-loteria":
        return "bg-gradient-to-br from-amber-900/40 to-red-900/40 border-yellow-500/30"
      case "moderno-irónico":
        return "bg-gradient-to-br from-blue-900/40 to-cyan-900/40 border-blue-500/30"
      default:
        return "bg-black/40 border-purple-500/30"
    }
  }

  return (
    <Card className={`rounded-lg p-0 border ${getBackgroundStyle()}`}>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-white text-2xl font-bold">{capsule.name}</CardTitle>
            <CardDescription className="text-white/70">
              ¡Activa esta cápsula en {capsule.triggerContext.venues.join(", ")}!
            </CardDescription>
          </div>
          <Badge variant="outline" className="bg-black/30 text-white border-white/20 px-3 py-1">
            {capsule.theme}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6 pb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-4">
            <AIChallengeGenerator capsule={capsule} onGenerate={handleChallengeGenerated} />
            {generatedChallenge && (
              <Card className="bg-black/30 border-white/10">
                <CardHeader className="pb-2">
                  <CardTitle className="text-white text-lg">Imagen Sugerida</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-800/50 rounded-md p-4 border border-white/10 flex items-center justify-center h-40">
                    <p className="text-white/70 text-center text-sm italic">
                      Aquí se generaría una imagen basada en:
                      <br />
                      <span className="text-white font-medium mt-2 block">"{generatedChallenge.aiPrompt}"</span>
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
          <div>
            <RewardDisplay rewards={capsule.rewards} />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
