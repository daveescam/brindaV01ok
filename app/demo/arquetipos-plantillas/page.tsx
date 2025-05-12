"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Wine, Heart, Briefcase } from "lucide-react"
import { EMOTIONAL_CAPSULES } from "@/lib/types/capsule-engine"
import { generateUnifiedCard } from "@/lib/types/unified-card"
import ArchetypeChallengeIntegration from "@/components/archetype-challenge-integration"

export default function ArquetiposPlantillasDemo() {
  const [selectedCapsule, setSelectedCapsule] = useState("borrachos")
  const [selectedArchetype, setSelectedArchetype] = useState("")
  const [card, setCard] = useState<any>(null)

  // Obtener la cápsula seleccionada
  const capsule = EMOTIONAL_CAPSULES.find((c) => c.id === selectedCapsule)

  // Manejar la selección de arquetipo
  const handleArchetypeSelect = (archetypeId: string) => {
    setSelectedArchetype(archetypeId)

    // Generar una carta para este arquetipo
    const generatedCard = generateUnifiedCard({
      experienceType: "campaign",
      emotionalTier: "intense",
    })

    // Asignar un ID específico para este arquetipo y cápsula
    generatedCard.card_id = `${selectedCapsule}_${archetypeId}`

    // Obtener el arquetipo
    const archetype = capsule?.archetypes.find((a) => a.id === archetypeId)

    if (archetype) {
      generatedCard.card_title = archetype.name
      generatedCard.challenge = archetype.description
    }

    setCard(generatedCard)
  }

  // Renderizar el icono de la cápsula
  const renderCapsuleIcon = (capsuleId: string) => {
    switch (capsuleId) {
      case "borrachos":
        return <Wine className="h-5 w-5 mr-2" />
      case "despecho":
        return <Heart className="h-5 w-5 mr-2" />
      case "linkedin":
        return <Briefcase className="h-5 w-5 mr-2" />
      default:
        return null
    }
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-2 text-center">Demo Arquetipos y Plantillas</h1>
      <p className="text-center text-gray-500 mb-8">
        Explora cómo las plantillas se integran con los diferentes arquetipos de las cápsulas
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Paso 1: Selecciona una Cápsula</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="borrachos" onValueChange={(value) => setSelectedCapsule(value)}>
              <TabsList className="grid grid-cols-3">
                <TabsTrigger value="borrachos">Borrachos</TabsTrigger>
                <TabsTrigger value="despecho">Despecho</TabsTrigger>
                <TabsTrigger value="linkedin">LinkedIn</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Paso 2: Selecciona un Arquetipo</CardTitle>
          </CardHeader>
          <CardContent>
            {capsule ? (
              <Select onValueChange={handleArchetypeSelect} value={selectedArchetype}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona un arquetipo" />
                </SelectTrigger>
                <SelectContent>
                  {capsule.archetypes.map((archetype) => (
                    <SelectItem key={archetype.id} value={archetype.id}>
                      {archetype.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <p className="text-gray-500">Selecciona una cápsula primero</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Paso 3: Prueba las Plantillas</CardTitle>
          </CardHeader>
          <CardContent>
            <Button
              disabled={!selectedArchetype}
              className="w-full bg-gradient-to-r from-pink-500 to-purple-600"
              onClick={() => handleArchetypeSelect(selectedArchetype)}
            >
              Probar Plantillas
            </Button>
          </CardContent>
        </Card>
      </div>

      {card && (
        <div className="mb-8">
          <Card className="border-purple-500/50 bg-black/40 backdrop-blur-sm mb-6">
            <CardHeader>
              <div className="flex items-center">
                {renderCapsuleIcon(selectedCapsule)}
                <CardTitle>{card.card_title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 mb-4">{card.challenge}</p>
              <div className="flex gap-2">
                <span className="bg-purple-500/20 text-purple-300 text-xs px-2 py-0.5 rounded-full">
                  {selectedCapsule}
                </span>
                <span className="bg-pink-500/20 text-pink-300 text-xs px-2 py-0.5 rounded-full">
                  {selectedArchetype}
                </span>
              </div>
            </CardContent>
          </Card>

          <ArchetypeChallengeIntegration
            card={card}
            onComplete={() => {
              setCard(null)
              setSelectedArchetype("")
            }}
          />
        </div>
      )}
    </div>
  )
}
