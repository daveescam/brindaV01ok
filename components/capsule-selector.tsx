"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Wine, Heart, Briefcase, Flame, Trophy, Utensils } from "lucide-react"
import { useRouter } from "next/navigation"
import { EMOTIONAL_CAPSULES } from "@/lib/types/capsule-engine"

export default function CapsuleSelector() {
  const [selectedCapsule, setSelectedCapsule] = useState<string | null>(null)
  const [emotionalIntensity, setEmotionalIntensity] = useState(50)
  const router = useRouter()

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case "wine":
        return <Wine className="h-10 w-10 text-pink-500" />
      case "heart":
        return <Heart className="h-10 w-10 text-red-500" />
      case "briefcase":
        return <Briefcase className="h-10 w-10 text-blue-500" />
      case "flame":
        return <Flame className="h-10 w-10 text-orange-500" />
      case "trophy":
        return <Trophy className="h-10 w-10 text-amber-500" />
      case "utensils":
        return <Utensils className="h-10 w-10 text-yellow-500" />
      default:
        return <Wine className="h-10 w-10 text-pink-500" />
    }
  }

  const getEmotionalTier = (intensity: number) => {
    if (intensity < 33) return "mild"
    if (intensity < 66) return "intense"
    return "chaotic"
  }

  const getEmotionalLabel = (intensity: number) => {
    if (intensity < 33) return "Suave"
    if (intensity < 66) return "Intenso"
    return "Caótico"
  }

  const handleStartSession = () => {
    if (!selectedCapsule) return

    // Create a session with the selected parameters
    const emotionalTier = getEmotionalTier(emotionalIntensity)

    // In a real app, you would create a session in the database
    // For now, we'll just navigate to the session page with query params
    router.push(`/session?capsule=${selectedCapsule}&emotionalTier=${emotionalTier}`)
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {EMOTIONAL_CAPSULES.map((capsule) => (
          <Card
            key={capsule.id}
            className={`bg-black/40 border-${capsule.color}-500/50 backdrop-blur-sm cursor-pointer transition-all ${
              selectedCapsule === capsule.id
                ? `ring-2 ring-${capsule.color}-500 bg-gradient-to-br from-black/60 to-${capsule.color}-950/30`
                : "hover:bg-black/50"
            }`}
            onClick={() => setSelectedCapsule(capsule.id)}
          >
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-3">
                {getIconComponent(capsule.icon)}
                <div>
                  <h3 className="text-lg font-bold text-white">{capsule.name}</h3>
                  <p className="text-sm text-white/70">{capsule.description}</p>
                </div>
              </div>
              <p className="text-xs text-white/50">{capsule.emotionalUniverse}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedCapsule && (
        <div className="space-y-6 mt-8">
          <div className="bg-black/40 border border-purple-500/50 backdrop-blur-sm rounded-lg p-6">
            <h3 className="text-lg font-bold text-white mb-4">Nivel de Intensidad Emocional</h3>
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-white/70">
                  <span>Suave</span>
                  <span>Intenso</span>
                  <span>Caótico</span>
                </div>
                <Slider
                  value={[emotionalIntensity]}
                  onValueChange={(value) => setEmotionalIntensity(value[0])}
                  max={100}
                  step={1}
                  className="py-4"
                />
              </div>
              <div className="bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-red-500/20 p-4 rounded-lg">
                <p className="text-white text-center">
                  Nivel seleccionado: <span className="font-bold">{getEmotionalLabel(emotionalIntensity)}</span>
                </p>
              </div>
            </div>
          </div>

          <Button
            onClick={handleStartSession}
            className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-90 py-6 text-lg"
          >
            Iniciar Experiencia
          </Button>
        </div>
      )}
    </div>
  )
}
