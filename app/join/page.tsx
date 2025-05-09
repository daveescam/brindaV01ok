"use client"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Sparkles, Users, Share2, QrCode, Loader2 } from "lucide-react"
import Link from "next/link"
import {
  getSessionById,
  addParticipant,
  generateCardsForSession,
  saveTableSessions,
  loadTableSessions,
} from "@/lib/types/session-manager"
import { WalletProvider } from "@/components/wallet/wallet-provider"

export default function JoinPage() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const sessionId = searchParams.get("session")
  const participantName = searchParams.get("name") || "Invitado"

  const [session, setSession] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const loadSession = () => {
      try {
        setLoading(true)

        if (!sessionId) {
          setError("No se proporcionó un ID de sesión válido.")
          setLoading(false)
          return
        }

        // Obtener la sesión
        const sessionData = getSessionById(sessionId)

        if (!sessionData) {
          setError("No se encontró la sesión especificada.")
          setLoading(false)
          return
        }

        // Añadir al participante si no está en modo de previsualización
        if (participantName !== "[name]") {
          // Verificar si ya hay cartas generadas
          let updatedSession = sessionData

          // Añadir al participante
          updatedSession = addParticipant(updatedSession, participantName)

          // Generar cartas si no hay
          if (updatedSession.activeCards.length === 0) {
            updatedSession = generateCardsForSession(updatedSession)
          }

          // Guardar la sesión actualizada
          const allSessions = loadTableSessions()
          const otherSessions = allSessions.filter((s) => s.id !== sessionId)
          saveTableSessions([...otherSessions, updatedSession])

          setSession(updatedSession)
        } else {
          setSession(sessionData)
        }

        setLoading(false)
      } catch (err) {
        console.error("Error loading session:", err)
        setError("Ocurrió un error al cargar la sesión.")
        setLoading(false)
      }
    }

    loadSession()
  }, [sessionId, participantName])

  const handleCopyLink = () => {
    if (session?.shareUrl) {
      navigator.clipboard.writeText(session.shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleStartSession = () => {
    router.push(`/session?id=${sessionId}`)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black to-purple-950 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-pink-500 mx-auto mb-4" />
          <p className="text-white text-lg">Cargando sesión...</p>
        </div>
      </div>
    )
  }

  if (error || !session) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black to-purple-950">
        <header className="container mx-auto py-6">
          <Link href="/" className="flex items-center gap-2">
            <Sparkles className="h-8 w-8 text-pink-500" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-yellow-500 text-transparent bg-clip-text">
              Brinda X
            </h1>
          </Link>
        </header>

        <main className="container mx-auto py-12">
          <Card className="max-w-md mx-auto border-red-300 bg-red-50/10 backdrop-blur-sm">
            <CardContent className="p-6">
              <h1 className="text-xl font-bold text-red-300 mb-4">Error</h1>
              <p className="text-white/80">{error || "No se pudo cargar la sesión."}</p>
              <Button asChild className="mt-4 w-full">
                <Link href="/scan">Volver a Escanear</Link>
              </Button>
            </CardContent>
          </Card>
        </main>
      </div>
    )
  }

  return (
    <WalletProvider>
      <div className="min-h-screen bg-gradient-to-b from-black to-purple-950">
        <header className="container mx-auto py-6">
          <Link href="/" className="flex items-center gap-2">
            <Sparkles className="h-8 w-8 text-pink-500" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-yellow-500 text-transparent bg-clip-text">
              Brinda X
            </h1>
          </Link>
        </header>

        <main className="container mx-auto py-12">
          <div className="max-w-md mx-auto">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="bg-pink-500/20 p-4 rounded-full">
                  <Users className="h-8 w-8 text-pink-500" />
                </div>
              </div>
              <h1 className="text-3xl font-bold mb-2 text-white">¡Te has unido a la sesión!</h1>
              <p className="text-white/80">
                {session.capsuleType === "borrachos"
                  ? "100 Borrachos Dijeron™"
                  : session.capsuleType === "despecho"
                    ? "Ritual Despecho™"
                    : "Experiencia Brinda X"}
              </p>
              <div className="mt-2 flex items-center justify-center gap-2">
                <span className="text-white/60 text-sm">{session.venueId}</span>
                <span className="text-white/40">•</span>
                <span className="text-white/60 text-sm">Mesa {session.tableId}</span>
              </div>
            </div>

            <Card className="border-purple-500/50 bg-black/40 backdrop-blur-sm mb-6">
              <CardContent className="p-6">
                <h2 className="text-lg font-medium text-white mb-4">Participantes ({session.participants.length})</h2>

                <div className="space-y-2 mb-6">
                  {session.participants.map((participant: any, index: number) => (
                    <div key={participant.id} className="flex items-center gap-3 p-2 bg-black/30 rounded-lg">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-white font-medium">
                        {participant.name.charAt(0).toUpperCase()}
                      </div>
                      <span className="text-white">{participant.name}</span>
                      {index === 0 && (
                        <span className="ml-auto text-xs bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded-full">
                          Anfitrión
                        </span>
                      )}
                    </div>
                  ))}
                </div>

                <div className="space-y-4">
                  <div className="flex flex-col items-center p-4 border border-dashed border-purple-500/30 rounded-lg">
                    <QrCode className="h-6 w-6 text-purple-400 mb-2" />
                    <p className="text-white/80 text-sm text-center mb-2">
                      Comparte este enlace para que más personas se unan a la sesión
                    </p>
                    <div className="flex w-full gap-2">
                      <div className="bg-black/60 p-2 rounded text-white/60 text-xs truncate flex-1">
                        {session.shareUrl}
                      </div>
                      <Button size="sm" variant="outline" onClick={handleCopyLink}>
                        {copied ? "¡Copiado!" : <Share2 className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="text-center">
              <p className="text-white/70 mb-4">
                {session.activeCards.length} cartas listas para jugar. ¡Prepárate para una experiencia emocional!
              </p>
              <Button
                onClick={handleStartSession}
                className="bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-90"
              >
                Comenzar Experiencia
              </Button>
            </div>
          </div>
        </main>

        <footer className="bg-black/60 backdrop-blur-sm py-8 mt-12">
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
    </WalletProvider>
  )
}
