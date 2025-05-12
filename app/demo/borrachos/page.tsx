"use client"

import { useState } from "react"
import CardBorracho from "@/components/cards/card-borracho"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import ErrorBoundary from "@/components/error-boundary"

// Datos de ejemplo para las cartas
const cardsData = [
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
    title: "La Promesa Falsa",
    challenge: "¿Qué has dicho pedo que sabías que no cumplirías?",
    emotion: "honestidad_ebria",
    rarity: "común",
    chaos_level: 3,
    verification_type: "auto",
    reward: {
      digital: "Sticker 'Promesa Falsa'",
      physical: "QR para descuento en botana",
      social: "#NoVuelvoAPedir",
    },
  },
]

export default function BorrachosDemo() {
  const [currentCardIndex, setCurrentCardIndex] = useState(0)
  const [completedCards, setCompletedCards] = useState<string[]>([])

  const handlePrevCard = () => {
    setCurrentCardIndex((prev) => (prev > 0 ? prev - 1 : cardsData.length - 1))
  }

  const handleNextCard = () => {
    setCurrentCardIndex((prev) => (prev < cardsData.length - 1 ? prev + 1 : 0))
  }

  const handleCardComplete = (response: string, templateUsed: string) => {
    console.log(`Carta completada: ${cardsData[currentCardIndex].id}`)
    console.log(`Respuesta: ${response}`)
    console.log(`Plantilla usada: ${templateUsed}`)

    setCompletedCards((prev) => [...prev, cardsData[currentCardIndex].id])
  }

  const currentCard = cardsData[currentCardIndex]
  const isCardCompleted = completedCards.includes(currentCard.id)

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-purple-950 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8 text-center">100 Borrachos Dijeron™</h1>

        <div className="flex items-center justify-between mb-6">
          <Button variant="outline" onClick={handlePrevCard} className="text-white">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Anterior
          </Button>
          <div className="text-white">
            Carta {currentCardIndex + 1} de {cardsData.length}
          </div>
          <Button variant="outline" onClick={handleNextCard} className="text-white">
            Siguiente
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        <div className="flex gap-2 justify-center mb-6">
          {cardsData.map((card, index) => (
            <div
              key={card.id}
              className={`w-3 h-3 rounded-full ${
                index === currentCardIndex
                  ? "bg-pink-500"
                  : completedCards.includes(card.id)
                    ? "bg-green-500"
                    : "bg-gray-500"
              }`}
            />
          ))}
        </div>

        <ErrorBoundary>
          <CardBorracho card={currentCard} onComplete={handleCardComplete} />
        </ErrorBoundary>

        {isCardCompleted && (
          <div className="mt-4 p-3 bg-green-500/20 border border-green-500/30 rounded-lg text-center text-white">
            ¡Has completado esta carta! Puedes pasar a la siguiente.
          </div>
        )}
      </div>
    </div>
  )
}
