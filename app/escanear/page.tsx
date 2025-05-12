"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { QrScanner } from "@/components/qr-scanner"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Sparkles, QrCode, Camera, AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function Escanear() {
  const [scanning, setScanning] = useState(false)
  const [qrValue, setQrValue] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isBrowserCompatible, setIsBrowserCompatible] = useState(true)
  const router = useRouter()

  // Verificar compatibilidad del navegador
  useEffect(() => {
    const checkBrowserCompatibility = async () => {
      // Verificar si estamos en el cliente
      if (typeof window === "undefined") return

      // Verificar si el navegador soporta getUserMedia
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setIsBrowserCompatible(false)
        setError("Tu navegador no soporta acceso a la cámara. Intenta con Chrome o Safari recientes.")
        return
      }

      try {
        // Intentar acceder a la cámara para verificar permisos
        const stream = await navigator.mediaDevices.getUserMedia({ video: true })
        // Detener el stream después de verificar
        stream.getTracks().forEach((track) => track.stop())
      } catch (err) {
        console.error("Error checking camera access:", err)
        setError("No se pudo acceder a la cámara. Verifica los permisos del navegador.")
        setIsBrowserCompatible(false)
      }
    }

    checkBrowserCompatibility()
  }, [])

  const handleScan = (data: string) => {
    if (!data) return

    setQrValue(data)
    setScanning(false)
    setError(null)

    // Parsear los datos del QR para extraer parámetros
    try {
      const url = new URL(data)
      const capsule = url.searchParams.get("capsule")
      const brand = url.searchParams.get("brand")

      if (capsule === "borrachos") {
        router.push("/juego/borrachos?brand=" + (brand || "tecate"))
      } else if (capsule === "despecho") {
        router.push("/juego/despecho?brand=" + (brand || "tinder"))
      } else if (capsule === "linkedin") {
        router.push("/juego/linkedin?brand=" + (brand || "wework"))
      } else {
        // Fallback por defecto
        router.push("/juego/demo?qr=" + encodeURIComponent(data))
      }
    } catch (error) {
      console.error("Error parsing QR data:", error)
      // Si no es una URL válida, ir a demo
      router.push("/juego/demo?qr=" + encodeURIComponent(data))
    }
  }

  const handleError = (err: any) => {
    console.error("QR Scanner error:", err)
    let errorMessage = "Error desconocido al escanear. Intenta de nuevo."

    if (typeof err === "string") {
      errorMessage = err
    } else if (err && err.message) {
      errorMessage = err.message

      // Mensajes de error más amigables
      if (errorMessage.includes("IndexSizeError") || errorMessage.includes("width is 0")) {
        errorMessage = "Error al inicializar la cámara. Por favor, recarga la página e intenta de nuevo."
      } else if (errorMessage.includes("Permission")) {
        errorMessage = "Permiso de cámara denegado. Por favor, permite el acceso a la cámara."
      }
    }

    setError(errorMessage)
    // Detener el escaneo si hay un error
    setScanning(false)
  }

  const startScanning = () => {
    setScanning(true)
    setQrValue("")
    setError(null)
  }

  const stopScanning = () => {
    setScanning(false)
  }

  const handleDemoQr = () => {
    handleScan("https://brinda.link/?capsule=borrachos&brand=tecate&venue=cantina_ritual&emotion=honestidad_ebria")
  }

  return (
    <div className="container mx-auto py-12">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-pink-500/20 p-4 rounded-full">
              <QrCode className="h-8 w-8 text-pink-500" />
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-2 text-white">Escanea un QR de Brinda X</h1>
          <p className="text-white/80">Encuentra un QR en un bar, restaurante o evento para comenzar la experiencia.</p>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <Tabs defaultValue={isBrowserCompatible ? "camera" : "demo"} className="mb-8">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="camera" disabled={!isBrowserCompatible}>
              Cámara
            </TabsTrigger>
            <TabsTrigger value="demo">Demo</TabsTrigger>
          </TabsList>

          <TabsContent value="camera">
            <Card className="border-purple-500/50 bg-black/40 backdrop-blur-sm">
              <CardContent className="pt-6">
                {scanning ? (
                  <div className="relative">
                    <QrScanner onScan={handleScan} onError={handleError} className="rounded-lg overflow-hidden" />
                    <Button
                      variant="secondary"
                      onClick={stopScanning}
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
                    <Button
                      onClick={startScanning}
                      className="bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-90"
                      disabled={!isBrowserCompatible}
                    >
                      {isBrowserCompatible ? "Iniciar Escaneo" : "Cámara no disponible"}
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
                    <div className="border-2 border-dashed border-pink-500/50 rounded-lg w-full h-full flex items-center justify-center p-4">
                      <div className="text-center">
                        <Sparkles className="h-12 w-12 text-pink-500 mx-auto mb-4" />
                        <p className="text-white/80 text-sm mb-2">QR de demostración</p>
                        <p className="text-xs text-white/60">100 Borrachos Dijeron™ x Tecate</p>
                      </div>
                    </div>
                  </div>
                  <Button
                    onClick={handleDemoQr}
                    className="bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-90"
                  >
                    Usar QR de Demo
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="text-center text-white/60 text-sm">
          <p>¿No tienes un QR? Visita un bar o restaurante asociado</p>
          <p>
            o prueba la{" "}
            <a href="/capsulas" className="text-pink-400 hover:underline">
              lista de cápsulas disponibles
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  )
}
