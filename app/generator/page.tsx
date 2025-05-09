"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import CardGenerator from "@/components/card-generator"
import CardDisplay from "@/components/card-display"
import type { UnifiedCard } from "@/lib/types/unified-card"
import { Sparkles } from "lucide-react"
import Link from "next/link"

export default function GeneratorPage() {
  const [generatedCard, setGeneratedCard] = useState<UnifiedCard | null>(null)

  const handleCardGenerated = (card: UnifiedCard) => {
    setGeneratedCard(card)
  }

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
          <Link href="/scan">Escanear QR</Link>
        </Button>
      </header>

      <main className="container mx-auto py-12">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4 text-white">Generador de Cartas</h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Crea cartas personalizadas para tus experiencias Brinda X.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Configuración</h2>
            <CardGenerator onCardGenerated={handleCardGenerated} />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Vista Previa</h2>
            {generatedCard ? (
              <CardDisplay card={generatedCard} />
            ) : (
              <Card className="border-purple-500/50 bg-black/40 backdrop-blur-sm h-[500px] flex items-center justify-center">
                <CardContent className="text-center text-white/60">
                  <Sparkles className="h-12 w-12 mx-auto mb-4 text-pink-500/50" />
                  <p>Configura los parámetros para generar una carta</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
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
