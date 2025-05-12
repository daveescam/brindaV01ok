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
  const [cameraPermission, setCameraPermission] = useState<"granted" | "denied" | "pending">("pending")

  useEffect(() => {
    // Asegurarse de que estamos en el cliente
    if (typeof window === "undefined") return

    // Verificar permisos de cámara
    const checkCameraPermission = async () => {
      try {
        const permissionStatus = await navigator.permissions.query({ name: "camera" as PermissionName })
        setCameraPermission(permissionStatus.state as "granted" | "denied" | "pending")

        permissionStatus.onchange = () => {
          setCameraPermission(permissionStatus.state as "granted" | "denied" | "pending")
        }
      } catch (error) {
        // Algunos navegadores no soportan permissions API, intentamos acceder directamente
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ video: true })
          stream.getTracks().forEach((track) => track.stop())
          setCameraPermission("granted")
        } catch (err) {
          setCameraPermission("denied")
          onError("No se pudo acceder a la cámara. Verifica los permisos del navegador.")
        }
      }
    }

    checkCameraPermission()

    // Limpiar al desmontar
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
  }, [onError])

  useEffect(() => {
    if (cameraPermission !== "granted" || !containerRef.current) return

    // Asegurarse de que el contenedor tiene dimensiones antes de inicializar
    if (containerRef.current.clientWidth === 0 || containerRef.current.clientHeight === 0) {
      console.warn("QR Scanner container has no dimensions, setting default size")
      containerRef.current.style.width = "100%"
      containerRef.current.style.height = "300px"
    }

    // Pequeño retraso para asegurar que el DOM está listo
    const initTimeout = setTimeout(() => {
      try {
        const qrScannerId = "qr-scanner-" + Math.random().toString(36).substring(2, 9)

        // Limpiar el contenedor antes de añadir un nuevo elemento
        if (containerRef.current && containerRef.current.firstChild) {
          containerRef.current.innerHTML = ""
        }

        // Crear un elemento para el scanner
        if (containerRef.current) {
          const qrContainer = document.createElement("div")
          qrContainer.id = qrScannerId
          qrContainer.style.width = "100%"
          qrContainer.style.height = "100%"
          containerRef.current.appendChild(qrContainer)

          // Importar dinámicamente Html5Qrcode para evitar problemas de SSR
          import("html5-qrcode")
            .then(({ Html5Qrcode }) => {
              if (!document.getElementById(qrScannerId)) {
                console.error("QR Scanner container not found after initialization")
                return
              }

              // Crear instancia del scanner
              scannerRef.current = new Html5Qrcode(qrScannerId)
              setIsInitialized(true)

              // Configuración del scanner
              const config = {
                fps: 10,
                qrbox: { width: 250, height: 250 },
                aspectRatio: 1.0,
                disableFlip: false,
                experimentalFeatures: {
                  useBarCodeDetectorIfSupported: true,
                },
              }

              // Iniciar escaneo con un pequeño retraso para asegurar que el DOM está listo
              setTimeout(() => {
                if (scannerRef.current) {
                  scannerRef.current
                    .start(
                      { facingMode: "environment" },
                      config,
                      (decodedText) => {
                        onScan(decodedText)
                      },
                      (errorMessage) => {
                        // Ignorar errores frecuentes durante el escaneo
                        if (typeof errorMessage === "string" && errorMessage.includes("No QR code found")) return
                        console.warn("QR Scanner warning:", errorMessage)
                      },
                    )
                    .catch((err) => {
                      console.error("Error starting QR Scanner:", err)
                      onError(err)
                    })
                }
              }, 500)
            })
            .catch((err) => {
              console.error("Error loading Html5Qrcode:", err)
              onError("Error loading QR scanner library")
            })
        }
      } catch (error) {
        console.error("Error in QR Scanner setup:", error)
        onError(error)
      }
    }, 300)

    return () => {
      clearTimeout(initTimeout)
      if (scannerRef.current && scannerRef.current.isScanning) {
        scannerRef.current.stop().catch((err) => {
          console.error("Error stopping QR Scanner:", err)
        })
      }
    }
  }, [cameraPermission, onScan, onError])

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        width: "100%",
        height: "300px",
        position: "relative",
        overflow: "hidden",
        borderRadius: "0.5rem",
      }}
    >
      {cameraPermission === "pending" && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-lg">
          <div className="animate-pulse text-white">Solicitando acceso a la cámara...</div>
        </div>
      )}

      {cameraPermission === "denied" && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/20 rounded-lg p-4">
          <div className="text-white text-center mb-2">Acceso a la cámara denegado</div>
          <div className="text-white/70 text-sm text-center">
            Por favor, permite el acceso a la cámara en la configuración de tu navegador.
          </div>
        </div>
      )}

      {cameraPermission === "granted" && !isInitialized && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-lg">
          <div className="animate-pulse text-white">Inicializando cámara...</div>
        </div>
      )}
    </div>
  )
}
