"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Sparkles, Search } from "lucide-react"
import Link from "next/link"
import CardDisplay from "@/components/card-display"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  type UnifiedCard,
  generateUnifiedCard,
  getAllChallengeCategories,
  getAllEmotionalTiers,
  getAllToneSubtypes,
} from "@/lib/types/unified-card"

export default function CardsPage() {
  const [cards, setCards] = useState<UnifiedCard[]>([])
  const [filteredCards, setFilteredCards] = useState<UnifiedCard[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState<string>("all")
  const [emotionalTierFilter, setEmotionalTierFilter] = useState<string>("all")

  // Generate sample cards
  useEffect(() => {
    const categories = getAllChallengeCategories()
    const emotionalTiers = getAllEmotionalTiers()
    const toneSubtypes = getAllToneSubtypes()

    const generatedCards = Array.from({ length: 20 }, (_, i) => {
      const randomCategory = categories[Math.floor(Math.random() * categories.length)]
      const randomTier = emotionalTiers[Math.floor(Math.random() * emotionalTiers.length)]
      const randomTone = toneSubtypes[Math.floor(Math.random() * toneSubtypes.length)]

      return generateUnifiedCard({
        challengeCategory: randomCategory,
        emotionalTier: randomTier,
        toneSubtype: randomTone,
      })
    })

    setCards(generatedCards)
    setFilteredCards(generatedCards)
  }, [])

  // Filter cards based on search and filters
  useEffect(() => {
    let result = [...cards]

    if (searchTerm) {
      result = result.filter(
        (card) =>
          card.challenge.toLowerCase().includes(searchTerm.toLowerCase()) ||
          card.card_title.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (categoryFilter !== "all") {
      result = result.filter((card) => card.challenge_category === categoryFilter)
    }

    if (emotionalTierFilter !== "all") {
      result = result.filter((card) => card.emotional_tier === emotionalTierFilter)
    }

    setFilteredCards(result)
  }, [searchTerm, categoryFilter, emotionalTierFilter, cards])

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-purple-950">
      <header className="container mx-auto py-6 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <Sparkles className="h-8 w-8 text-pink-500" />
          <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-yellow-500 text-transparent bg-clip-text">
            Brinda X
          </h1>
        </Link>
        <Button asChild variant="outline" className="border-pink-500 text-white hover:bg-pink-500/20">
          <Link href="/generator">Crear Carta</Link>
        </Button>
      </header>

      <main className="container mx-auto py-12">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4 text-white">Biblioteca de Cartas</h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Explora todas las cartas disponibles para tus experiencias Brinda X.
          </p>
        </div>

        <div className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50" size={18} />
              <Input
                placeholder="Buscar cartas..."
                className="pl-10 bg-black/40 border-purple-500/30 text-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="bg-black/40 border-purple-500/30 text-white">
                <SelectValue placeholder="Categoría" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las categorías</SelectItem>
                {getAllChallengeCategories().map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={emotionalTierFilter} onValueChange={setEmotionalTierFilter}>
              <SelectTrigger className="bg-black/40 border-purple-500/30 text-white">
                <SelectValue placeholder="Intensidad Emocional" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las intensidades</SelectItem>
                {getAllEmotionalTiers().map((tier) => (
                  <SelectItem key={tier} value={tier}>
                    {tier === "mild" ? "Suave" : tier === "intense" ? "Intenso" : "Caótico"}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <Tabs defaultValue="grid" className="mb-12">
          <div className="flex justify-center mb-8">
            <TabsList className="bg-black/40">
              <TabsTrigger value="grid">Cuadrícula</TabsTrigger>
              <TabsTrigger value="list">Lista</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="grid">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCards.map((card) => (
                <div key={card.card_id} className="h-[500px]">
                  <CardDisplay card={card} />
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="list">
            <div className="space-y-4">
              {filteredCards.map((card) => (
                <Card key={card.card_id} className="bg-black/40 border-purple-500/50 backdrop-blur-sm">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-bold text-white mb-1">{card.card_title}</h3>
                        <p className="text-white/80 mb-2">{card.challenge}</p>
                        <div className="flex flex-wrap gap-2 mt-2">
                          <span className="bg-pink-500/20 text-pink-300 text-xs px-2 py-1 rounded-full">
                            {card.challenge_category}
                          </span>
                          <span className="bg-purple-500/20 text-purple-300 text-xs px-2 py-1 rounded-full">
                            {card.emotional_tier}
                          </span>
                          <span className="bg-blue-500/20 text-blue-300 text-xs px-2 py-1 rounded-full">
                            {card.tone_subtype}
                          </span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="border-pink-500 text-white hover:bg-pink-500/20">
                        Ver
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <footer className="bg-black/60 backdrop-blur-sm py-8">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <Sparkles className="h-6 w-6 text-pink-500" />
              <span className="text-white/90 font-semibold">Brinda X</span>
            </div>
            <div className="flex gap-6">
              <Link href="/terms" className="text-white/60 hover:text-white transition text-sm">
                Términos
              </Link>
              <Link href="/privacy" className="text-white/60 hover:text-white transition text-sm">
                Privacidad
              </Link>
              <Link href="/contact" className="text-white/60 hover:text-white transition text-sm">
                Contacto
              </Link>
            </div>
          </div>
          <div className="mt-6 text-center text-white/40 text-sm">
            © {new Date().getFullYear()} Brinda X. Todos los derechos reservados.
          </div>
        </div>
      </footer>
    </div>
  )
}
