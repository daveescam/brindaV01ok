"use client"

import { useEffect, useRef, useState } from "react"
import type { Html5Qrcode } from "html5-qrcode"

interface QrScannerProps {
  onScan: (data: string) => void
  onError: (err: any) => void
  className?: string
}

export function QrScanner({ onScan, onError, className }: QrScannerProps) {
  const scannerRef = useRef<Html5Qrcode | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    // Asegurarse de que estamos en el cliente
    if (typeof window === "undefined") return

    if (!containerRef.current) return

    try {
      const qrScannerId = "qr-scanner-" + Math.random().toString(36).substring(2, 9)

      // Limpiar el contenedor antes de añadir un nuevo elemento
      if (containerRef.current.firstChild) {
        containerRef.current.innerHTML = ""
      }

      const qrContainer = document.createElement("div")
      qrContainer.id = qrScannerId
      containerRef.current.appendChild(qrContainer)

      // Importar dinámicamente Html5Qrcode para evitar problemas de SSR
      import("html5-qrcode")
        .then(({ Html5Qrcode }) => {
          // Crear instancia del scanner
          scannerRef.current = new Html5Qrcode(qrScannerId)
          setIsInitialized(true)

          // Iniciar escaneo
          scannerRef.current
            .start(
              { facingMode: "environment" },
              {
                fps: 10,
                qrbox: { width: 250, height: 250 },
              },
              (decodedText) => {
                onScan(decodedText)
              },
              (errorMessage) => {
                // Ignorar errores frecuentes durante el escaneo
                if (typeof errorMessage === "string" && errorMessage.includes("No QR code found")) return
                onError(errorMessage)
              },
            )
            .catch((err) => {
              console.error("Error starting QR Scanner:", err)
              onError(err)
            })
        })
        .catch((err) => {
          console.error("Error loading Html5Qrcode:", err)
          onError("Error loading QR scanner library")
        })

      // Limpieza
      return () => {
        if (scannerRef.current && scannerRef.current.isScanning) {
          scannerRef.current
            .stop()
            .then(() => {
              console.log("QR Scanner stopped")
              scannerRef.current = null
            })
            .catch((err) => {
              console.error("Error stopping QR Scanner:", err)
            })
        }
      }
    } catch (error) {
      console.error("Error in QR Scanner setup:", error)
      onError(error)
      return () => {}
    }
  }, [onScan, onError])

  return (
    <div ref={containerRef} className={className} style={{ width: "100%", height: "300px", position: "relative" }}>
      {!isInitialized && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-lg">
          <div className="animate-pulse text-white">Inicializando cámara...</div>
        </div>
      )}
    </div>
  )
}
