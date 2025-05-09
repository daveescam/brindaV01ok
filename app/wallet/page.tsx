"use client"
import { Button } from "@/components/ui/button"
import { Sparkles, Plus, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { WalletProvider } from "@/components/wallet/wallet-provider"
import { WalletView } from "@/components/wallet/wallet-view"
import { useWallet } from "@/components/wallet/wallet-provider"
import { generateUnifiedCard } from "@/lib/types/unified-card"

// Componente de demostración para añadir elementos a la wallet
function WalletDemo() {
  const { addCard, addSticker, addReward, getStats, addSessionRewards } = useWallet()

  // Función para añadir una carta de demostración
  const addDemoCard = () => {
    const card = generateUnifiedCard({
      experienceType: "campaign",
      challengeType: "individual",
      challengeCategory: "karaoke",
      emotionalTier: "intense",
      toneSubtype: "vulnerable",
    })

    addCard(card)
  }

  // Función para añadir un sticker de demostración
  const addDemoSticker = () => {
    addSticker(
      `sticker_${Date.now()}`,
      "Sticker de El Malacopa",
      "Sticker coleccionable de la cápsula 100 Borrachos Dijeron",
      "borrachos",
    )
  }

  // Función para añadir una recompensa de demostración
  const addDemoReward = () => {
    addReward(
      "reward",
      `reward_${Date.now()}`,
      "Shot Gratis",
      "Canjeable por un shot gratis en el bar",
      undefined,
      new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 días
    )
  }

  // Función para añadir un vault de demostración
  const addDemoVault = () => {
    addReward(
      "vault",
      `vault_${Date.now()}`,
      "Vault de 100 Borrachos Dijeron",
      "Acceso al contenido exclusivo de la cápsula 100 Borrachos Dijeron",
      undefined,
      undefined,
      undefined,
      "borrachos",
    )
  }

  // Función para simular una sesión completa
  const simulateSession = () => {
    addSessionRewards("borrachos", "malacopa", "intense", 25)
  }

  // Obtener estadísticas
  const stats = getStats()

  return (
    <div className="bg-black/40 backdrop-blur-sm rounded-lg border border-purple-500/30 p-4 mb-6">
      <h3 className="text-lg font-bold text-white mb-4">Demostración de Wallet</h3>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <Button
          onClick={addDemoCard}
          className="bg-blue-500/20 border border-blue-500/30 text-white hover:bg-blue-500/30"
        >
          <Plus className="h-4 w-4 mr-2" />
          Añadir Carta
        </Button>

        <Button
          onClick={addDemoSticker}
          className="bg-green-500/20 border border-green-500/30 text-white hover:bg-green-500/30"
        >
          <Plus className="h-4 w-4 mr-2" />
          Añadir Sticker
        </Button>

        <Button
          onClick={addDemoReward}
          className="bg-pink-500/20 border border-pink-500/30 text-white hover:bg-pink-500/30"
        >
          <Plus className="h-4 w-4 mr-2" />
          Añadir Premio
        </Button>

        <Button
          onClick={addDemoVault}
          className="bg-amber-500/20 border border-amber-500/30 text-white hover:bg-amber-500/30"
        >
          <Plus className="h-4 w-4 mr-2" />
          Añadir Vault
        </Button>
      </div>

      <Button
        onClick={simulateSession}
        className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-90"
      >
        Simular Sesión Completa
      </Button>

      {stats && (
        <div className="mt-4 p-3 bg-black/30 rounded-lg">
          <p className="text-white/70 text-sm">
            Total de elementos: <span className="text-white font-bold">{stats.totalItems}</span>
          </p>
        </div>
      )}
    </div>
  )
}

export default function WalletPage() {
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
          <Link href="/">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver
          </Link>
        </Button>
      </header>

      <main className="container mx-auto py-12">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-white mb-8">Mi Wallet</h1>

          <WalletProvider>
            <WalletDemo />
            <WalletView />
          </WalletProvider>
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
