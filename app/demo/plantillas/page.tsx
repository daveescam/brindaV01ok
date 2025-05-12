"use client"

import { useState } from "react"
import CardBorracho from "@/components/cards/card-borracho"
import { WalletProvider } from "@/components/wallet/wallet-provider-mock"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

// Datos de ejemplo para las cartas
const demoCards = [
  {
    id: "borracho_001",
    title: "El Ex-Texter",
    challenge: "POV: Le escribiste un mensaje pedo a tu ex... ¡pero era tu jefe!",
    emotion: "despecho",
    rarity: "rara",
    chaos_level: 4,
    verification_type: "grupo",
    reward: {
      digital: "Sticker AR 'Rey del DM Fallido'",
      physical: "QR canjeable por shot gratis",
      social: "#DespechoTecate",
    },
  },
  {
    id: "borracho_002",
    title: "El Malacopa",
    challenge: "Relata tu peor caída pública después de 5 mezcales.",
    emotion: "cringe",
    rarity: "épica",
    chaos_level: 5,
    verification_type: "grupo",
    reward: {
      digital: "Sticker 'El Malacopa'",
      physical: "QR para cerveza gratis",
      social: "#MalacopaConfidente",
    },
  },
  {
    id: "borracho_003",
    title: "El Shot Final",
    challenge: "Inventa excusa absurda para justificar por qué llegaste tarde al trabajo después de una peda.",
    emotion: "vergüenza",
    rarity: "común",
    chaos_level: 3,
    verification_type: "ia",
    reward: {
      digital: "NFT de 'Influencer Corporativo'",
      physical: "QR para comida rápida gratis",
      social: "#LinkedInCaótico",
    },
  },
]

export default function PlantillasDemo() {
  const [currentCardIndex, setCurrentCardIndex] = useState(0)
  const [completedCards, setCompletedCards] = useState<string[]>([])

  const handleCardComplete = (response: string, templateUsed: string) => {
    console.log(`Carta completada con respuesta: ${response} usando plantilla: ${templateUsed}`)
    setCompletedCards([...completedCards, demoCards[currentCardIndex].id])
  }

  const handleNextCard = () => {
    if (currentCardIndex < demoCards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1)
    }
  }

  const handlePrevCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1)
    }
  }

  const isCardCompleted = (cardId: string) => {
    return completedCards.includes(cardId)
  }

  return (
    <WalletProvider>
      <div className="container mx-auto py-12">
        <h1 className="text-3xl font-bold mb-8 text-center text-white">
          Demo de Plantillas AI - 100 Borrachos Dijeron™
        </h1>

        <div className="max-w-2xl mx-auto">
          <CardBorracho card={demoCards[currentCardIndex]} onComplete={handleCardComplete} />

          <div className="flex justify-between mt-8">
            <Button
              onClick={handlePrevCard}
              disabled={currentCardIndex === 0}
              variant="outline"
              className="flex items-center gap-2"
            >
              <ChevronLeft className="h-4 w-4" /> Anterior
            </Button>

            <div className="flex gap-2">
              {demoCards.map((card, index) => (
                <div
                  key={card.id}
                  className={`w-3 h-3 rounded-full ${
                    index === currentCardIndex
                      ? "bg-pink-500"
                      : isCardCompleted(card.id)
                        ? "bg-green-500"
                        : "bg-gray-500"
                  }`}
                />
              ))}
            </div>

            <Button
              onClick={handleNextCard}
              disabled={currentCardIndex === demoCards.length - 1}
              variant="outline"
              className="flex items-center gap-2"
            >
              Siguiente <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </WalletProvider>
  )
}
