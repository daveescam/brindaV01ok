"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Sparkles, QrCode, Camera, Users, Table2 } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import QrScanner from "@/components/qr-scanner"
import CapsuleSelector from "@/components/capsule-selector"
import {
  createTableSession,
  getActiveSessionForTable,
  saveTableSessions,
  loadTableSessions,
} from "@/lib/types/session-manager"

export default function ScanPage() {
  const [scanning, setScanning] = useState(false)
  const [qrValue, setQrValue] = useState("")
  const [venueName, setVenueName] = useState("")
  const [tableId, setTableId] = useState("")
  const [participantName, setParticipantName] = useState("")
  const [showJoinForm, setShowJoinForm] = useState(false)
  const router = useRouter()

  const handleScan = (data: string) => {
    setQrValue(data)
    setScanning(false)

    // Parse the QR data to extract parameters
    try {
      const url = new URL(data)
      const venue = url.searchParams.get("venue") || ""
      const table = url.searchParams.get("table") || ""
      const capsule = url.searchParams.get("capsule") || "borrachos"
      const emotionalTier = url.searchParams.get("tier") || "intense"
      const campaign = url.searchParams.get("campaign") || ""
      const sessionId = url.searchParams.get("session") || ""

      if (sessionId) {
        // Si hay un ID de sesión, unirse directamente
        router.push(`/join?session=${sessionId}&name=${encodeURIComponent(participantName || "Invitado")}`)
      } else if (venue && table) {
        // Verificar si ya existe una sesión activa para esta mesa
        const existingSession = getActiveSessionForTable(venue, table)

        if (existingSession) {
          // Si existe, unirse a ella
          router.push(`/join?session=${existingSession.id}&name=${encodeURIComponent(participantName || "Invitado")}`)
        } else {
          // Si no existe, mostrar formulario para crear una nueva
          setVenueName(venue)
          setTableId(table)
          setShowJoinForm(true)
        }
      } else {
        // Datos insuficientes
        alert("El código QR no contiene información válida de mesa o venue.")
      }
    } catch (error) {
      console.error("Error parsing QR:", error)
      alert("Error al leer el código QR. Por favor, intenta de nuevo.")
    }
  }

  const handleCreateSession = (capsuleType = "borrachos") => {
    if (!venueName || !tableId) {
      alert("Se requiere información del venue y la mesa.")
      return
    }

    // Crear una nueva sesión
    const newSession = createTableSession(venueName, tableId, capsuleType as any, "intense")

    // Guardar la sesión
    const existingSessions = loadTableSessions()
    saveTableSessions([...existingSessions, newSession])

    // Redirigir a la página de unirse
    router.push(`/join?session=${newSession.id}&name=${encodeURIComponent(participantName || "Anfitrión")}`)
  }

  const handleDemoQr = () => {
    handleScan(
      "https://brindax.com/join?venue=bar-la-nuclear&table=mesa-5&capsule=borrachos&tier=intense&campaign=tecate",
    )
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
          <Link href="/capsulas">Ver Cápsulas</Link>
        </Button>
      </header>

      <main className="container mx-auto py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="bg-pink-500/20 p-4 rounded-full">
                <QrCode className="h-8 w-8 text-pink-500" />
              </div>
            </div>
            <h1 className="text-3xl font-bold mb-2 text-white">Inicia tu Experiencia Brinda X</h1>
            <p className="text-white/80 max-w-2xl mx-auto">
              Escanea el código QR de tu mesa para comenzar una experiencia grupal, o selecciona una cápsula para jugar
              ahora.
            </p>
          </div>

          {showJoinForm ? (
            <Card className="border-purple-500/50 bg-black/40 backdrop-blur-sm max-w-md mx-auto">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold text-white mb-4">Crear Nueva Sesión</h2>

                <div className="space-y-4">
                  <div>
                    <label className="text-white/80 text-sm mb-1 block">Venue</label>
                    <div className="bg-black/60 p-3 rounded-md text-white">{venueName}</div>
                  </div>

                  <div>
                    <label className="text-white/80 text-sm mb-1 block">Mesa</label>
                    <div className="bg-black/60 p-3 rounded-md text-white">{tableId}</div>
                  </div>

                  <div>
                    <label className="text-white/80 text-sm mb-1 block">Tu Nombre</label>
                    <input
                      type="text"
                      value={participantName}
                      onChange={(e) => setParticipantName(e.target.value)}
                      placeholder="Ingresa tu nombre"
                      className="w-full bg-black/60 p-3 rounded-md text-white border border-gray-700 focus:border-pink-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-white/80 text-sm mb-1 block">Selecciona una Cápsula</label>
                    <div className="grid grid-cols-2 gap-3 mt-2">
                      <Button
                        variant="outline"
                        className="border-pink-500 text-white hover:bg-pink-500/20 flex flex-col items-center p-4 h-auto"
                        onClick={() => handleCreateSession("borrachos")}
                      >
                        <span className="text-2xl mb-2">🍻</span>
                        <span className="font-medium">100 Borrachos Dijeron</span>
                      </Button>

                      <Button
                        variant="outline"
                        className="border-red-500 text-white hover:bg-red-500/20 flex flex-col items-center p-4 h-auto"
                        onClick={() => handleCreateSession("despecho")}
                      >
                        <span className="text-2xl mb-2">💔</span>
                        <span className="font-medium">Ritual Despecho</span>
                      </Button>
                    </div>
                  </div>

                  <Button variant="outline" className="w-full mt-4" onClick={() => setShowJoinForm(false)}>
                    Cancelar
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Tabs defaultValue="qr" className="mb-8">
              <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
                <TabsTrigger value="qr">Escanear QR de Mesa</TabsTrigger>
                <TabsTrigger value="capsules">Jugar Solo</TabsTrigger>
              </TabsList>

              <TabsContent value="qr" className="mt-6">
                <div className="max-w-md mx-auto">
                  <Tabs defaultValue="camera" className="mb-8">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="camera">Cámara</TabsTrigger>
                      <TabsTrigger value="demo">Demo</TabsTrigger>
                    </TabsList>

                    <TabsContent value="camera">
                      <Card className="border-purple-500/50 bg-black/40 backdrop-blur-sm">
                        <CardContent className="pt-6">
                          {scanning ? (
                            <div className="relative">
                              <QrScanner
                                onScan={handleScan}
                                onError={(err) => console.error(err)}
                                className="rounded-lg overflow-hidden"
                              />
                              <Button
                                variant="secondary"
                                onClick={() => setScanning(false)}
                                className="absolute bottom-4 left-1/2 transform -translate-x-1/2"
                              >
                                Cancelar
                              </Button>
                            </div>
                          ) : (
                            <div className="flex flex-col items-center">
                              <div className="w-full aspect-square bg-black/60 rounded-lg flex items-center justify-center mb-4">
                                <Camera className="h-16 w-16 text-white/30" />
                              </div>
                              <p className="text-white/70 mb-4 text-center">
                                Escanea el código QR de tu mesa para unirte a una sesión grupal
                              </p>
                              <Button
                                onClick={() => setScanning(true)}
                                className="bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-90"
                              >
                                Iniciar Escaneo
                              </Button>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </TabsContent>

                    <TabsContent value="demo">
                      <Card className="border-purple-500/50 bg-black/40 backdrop-blur-sm">
                        <CardContent className="pt-6">
                          <div className="flex flex-col items-center">
                            <div className="w-full aspect-square bg-black/60 rounded-lg flex items-center justify-center mb-4 p-8">
                              <div className="border-2 border-dashed border-pink-500/50 rounded-lg w-full h-full flex flex-col items-center justify-center p-4">
                                <Table2 className="h-12 w-12 text-pink-500 mx-auto mb-4" />
                                <p className="text-white/80 text-sm mb-2">QR de mesa de demostración</p>
                                <div className="flex items-center gap-2 text-xs text-white/60">
                                  <Users className="h-3 w-3" />
                                  <span>Bar La Nuclear - Mesa 5</span>
                                </div>
                              </div>
                            </div>
                            <Button
                              onClick={handleDemoQr}
                              className="bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-90"
                            >
                              Usar Mesa de Demo
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>
                  </Tabs>
                </div>
              </TabsContent>

              <TabsContent value="capsules" className="mt-6">
                <CapsuleSelector />
              </TabsContent>
            </Tabs>
          )}
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
