"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Sparkles } from "lucide-react"
import { ChallengeFlow } from "@/components/challenge-flow"
import { generateBrindaCard } from "@/lib/card-generator-pipeline-enhanced"
import { CoreEmotion, EmotionalIntensity } from "@/lib/types/brinda-emotional-engine"

export function FinalDemo() {
  const [card, setCard] = useState(
    generateBrindaCard({ emotion: CoreEmotion.DESPECHO, intensity: EmotionalIntensity.MEDIUM }),
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Sparkles className="mr-2 h-4 w-4" />
          Challenge Demo
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChallengeFlow card={card} />
      </CardContent>
    </Card>
  )
}
