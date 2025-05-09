import { Button } from "@/components/ui/button"
import { Sparkles, Wine, Briefcase, Heart } from "lucide-react"
import Link from "next/link"
import CardGenerator from "@/components/card-generator"
import CardDisplay from "@/components/card-display"
import { generateUnifiedCard } from "@/lib/types/unified-card"

export default function Home() {
  // Generate a sample card for the preview
  const sampleCard = generateUnifiedCard({
    challengeCategory: "confesion",
    emotionalTier: "intense",
    toneSubtype: "vulnerable",
    interactionFormat: "voz_texto",
  })

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-purple-950">
      <header className="container mx-auto py-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Sparkles className="h-8 w-8 text-pink-500" />
          <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-yellow-500 text-transparent bg-clip-text">
            Brinda X
          </h1>
        </div>
        <nav className="hidden md:flex gap-6">
          <Link href="/cards" className="text-white/80 hover:text-white transition">
            Cápsulas
          </Link>
          <Link href="/generator" className="text-white/80 hover:text-white transition">
            Generador
          </Link>
          <Link href="/dashboard" className="text-white/80 hover:text-white transition">
            Dashboard
          </Link>
        </nav>
        <Button asChild variant="outline" className="border-pink-500 text-white hover:bg-pink-500/20">
          <Link href="/scan">Escanear QR</Link>
        </Button>
      </header>

      <main className="container mx-auto py-12">
        <section className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-pink-500 via-purple-500 to-yellow-500 text-transparent bg-clip-text">
            Ecosistema Viral de Caos Emocional
          </h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto mb-8">
            Cada cápsula es un ritual que fusiona TikTok, Cards Against Humanity, 100 Mexicanos Dijeron y la Lotería
            Mexicana en una experiencia única.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-90">
              <Link href="/cards">Explorar Cápsulas</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-pink-500 text-white hover:bg-pink-500/20">
              <Link href="/generator">Crear Cartas</Link>
            </Button>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center text-white mb-8">Ejemplo de Carta</h2>
          <div className="flex justify-center">
            <div className="w-full max-w-md">
              <CardDisplay card={sampleCard} />
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center text-white mb-8">Generador de Cartas</h2>
          <CardGenerator />
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-black/40 border border-purple-500/50 backdrop-blur-sm rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Wine className="h-10 w-10 text-pink-500" />
              <h3 className="text-xl font-bold text-white">100 Borrachos Dijeron™</h3>
            </div>
            <p className="text-white/80 mb-4">
              Honestidad ebria + Caos tragicómico. Confiesa lo que hiciste después del 5to mezcal y gana tu shot.
            </p>
            <Button asChild variant="secondary" className="w-full">
              <Link href="/capsulas/borrachos">Explorar</Link>
            </Button>
          </div>

          <div className="bg-black/40 border border-purple-500/50 backdrop-blur-sm rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Briefcase className="h-10 w-10 text-blue-500" />
              <h3 className="text-xl font-bold text-white">LinkedIn Caótico™</h3>
            </div>
            <p className="text-white/80 mb-4">
              Cringe corporativo + Humor de oficina. ¿Orgulloso de anunciar... que vas a hacer el ridículo?
            </p>
            <Button asChild variant="secondary" className="w-full">
              <Link href="/capsulas/linkedin">Explorar</Link>
            </Button>
          </div>

          <div className="bg-black/40 border border-purple-500/50 backdrop-blur-sm rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Heart className="h-10 w-10 text-red-500" />
              <h3 className="text-xl font-bold text-white">Ritual Despecho™</h3>
            </div>
            <p className="text-white/80 mb-4">Dolor + Drama + Catarsis. Si cantas con el alma rota, la casa invita.</p>
            <Button asChild variant="secondary" className="w-full">
              <Link href="/capsulas/despecho">Explorar</Link>
            </Button>
          </div>
        </section>

        <section className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-8">¿Listo para el Caos Emocional?</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-90">
              <Link href="/scan">Escanear QR</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-pink-500 text-white hover:bg-pink-500/20">
              <Link href="/cards">Ver Todas las Cápsulas</Link>
            </Button>
          </div>
        </section>
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
