"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  type UnifiedCard,
  generateUnifiedCard,
  getAllChallengeCategories,
  getAllChallengeTypes,
  getAllEmotionalTiers,
  getAllExperienceTypes,
  getAllInteractionFormats,
  getAllToneSubtypes,
  getCategoryDisplayName,
} from "@/lib/types/unified-card"

interface CardGeneratorProps {
  onCardGenerated?: (card: UnifiedCard) => void
}

export default function CardGenerator({ onCardGenerated }: CardGeneratorProps) {
  const [experienceType, setExperienceType] = useState<string>("individual")
  const [challengeType, setChallengeType] = useState<string>("individual")
  const [challengeCategory, setChallengeCategory] = useState<string>("social")
  const [interactionFormat, setInteractionFormat] = useState<string>("texto_imagen")
  const [toneSubtype, setToneSubtype] = useState<string>("humoristico")
  const [emotionalTier, setEmotionalTier] = useState<string>("mild")
  const [brandId, setBrandId] = useState<string>("")
  const [customChallenge, setCustomChallenge] = useState<string>("")

  const handleGenerate = () => {
    const card = generateUnifiedCard({
      experienceType: experienceType as any,
      challengeType: challengeType as any,
      challengeCategory: challengeCategory as any,
      interactionFormat: interactionFormat as any,
      toneSubtype: toneSubtype as any,
      emotionalTier: emotionalTier as any,
      brandId: brandId || undefined,
    })

    // If custom challenge text is provided, override the generated one
    if (customChallenge.trim()) {
      card.challenge = customChallenge
    }

    if (onCardGenerated) {
      onCardGenerated(card)
    }
  }

  return (
    <Card className="border-purple-500/50 bg-black/40 backdrop-blur-sm">
      <CardContent className="p-6">
        <div className="grid gap-6">
          <div className="grid gap-3">
            <Label htmlFor="experienceType" className="text-white">
              Tipo de Experiencia
            </Label>
            <Select value={experienceType} onValueChange={setExperienceType}>
              <SelectTrigger className="bg-black/40 border-purple-500/30 text-white">
                <SelectValue placeholder="Selecciona el tipo de experiencia" />
              </SelectTrigger>
              <SelectContent>
                {getAllExperienceTypes().map((type) => (
                  <SelectItem key={type} value={type}>
                    {type === "individual"
                      ? "Individual"
                      : type === "group"
                        ? "Grupal"
                        : type === "campaign"
                          ? "Campaña"
                          : "Multi-mesa"}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-3">
            <Label htmlFor="challengeType" className="text-white">
              Tipo de Reto
            </Label>
            <Select value={challengeType} onValueChange={setChallengeType}>
              <SelectTrigger className="bg-black/40 border-purple-500/30 text-white">
                <SelectValue placeholder="Selecciona el tipo de reto" />
              </SelectTrigger>
              <SelectContent>
                {getAllChallengeTypes().map((type) => (
                  <SelectItem key={type} value={type}>
                    {type === "individual" ? "Individual" : type === "duet" ? "Dueto" : "Grupal"}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-3">
            <Label htmlFor="challengeCategory" className="text-white">
              Categoría de Reto
            </Label>
            <Select value={challengeCategory} onValueChange={setChallengeCategory}>
              <SelectTrigger className="bg-black/40 border-purple-500/30 text-white">
                <SelectValue placeholder="Selecciona la categoría" />
              </SelectTrigger>
              <SelectContent>
                {getAllChallengeCategories().map((category) => (
                  <SelectItem key={category} value={category}>
                    {getCategoryDisplayName(category)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-3">
            <Label htmlFor="interactionFormat" className="text-white">
              Formato de Interacción
            </Label>
            <Select value={interactionFormat} onValueChange={setInteractionFormat}>
              <SelectTrigger className="bg-black/40 border-purple-500/30 text-white">
                <SelectValue placeholder="Selecciona el formato" />
              </SelectTrigger>
              <SelectContent>
                {getAllInteractionFormats().map((format) => (
                  <SelectItem key={format} value={format}>
                    {format.replace("_", " ")}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-3">
            <Label htmlFor="toneSubtype" className="text-white">
              Subtipo de Tono
            </Label>
            <Select value={toneSubtype} onValueChange={setToneSubtype}>
              <SelectTrigger className="bg-black/40 border-purple-500/30 text-white">
                <SelectValue placeholder="Selecciona el tono" />
              </SelectTrigger>
              <SelectContent>
                {getAllToneSubtypes().map((tone) => (
                  <SelectItem key={tone} value={tone}>
                    {tone}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-3">
            <Label htmlFor="emotionalTier" className="text-white">
              Nivel Emocional
            </Label>
            <Select value={emotionalTier} onValueChange={setEmotionalTier}>
              <SelectTrigger className="bg-black/40 border-purple-500/30 text-white">
                <SelectValue placeholder="Selecciona la intensidad" />
              </SelectTrigger>
              <SelectContent>
                {getAllEmotionalTiers().map((tier) => (
                  <SelectItem key={tier} value={tier}>
                    {tier === "mild" ? "Suave" : tier === "intense" ? "Intenso" : "Caótico"}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-3">
            <Label htmlFor="brandId" className="text-white">
              ID de Marca (opcional)
            </Label>
            <Input
              id="brandId"
              placeholder="Ej: tecate, bacardi, corona"
              className="bg-black/40 border-purple-500/30 text-white"
              value={brandId}
              onChange={(e) => setBrandId(e.target.value)}
            />
          </div>

          <div className="grid gap-3">
            <Label htmlFor="customChallenge" className="text-white">
              Texto de Reto Personalizado (opcional)
            </Label>
            <Textarea
              id="customChallenge"
              placeholder="Deja en blanco para generar automáticamente"
              className="bg-black/40 border-purple-500/30 text-white min-h-[100px]"
              value={customChallenge}
              onChange={(e) => setCustomChallenge(e.target.value)}
            />
          </div>

          <Button onClick={handleGenerate} className="bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-90">
            Generar Carta
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
