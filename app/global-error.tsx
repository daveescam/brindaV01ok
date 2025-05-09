"use client"

import { Button } from "@/components/ui/button"
import { AlertTriangle } from "lucide-react"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html lang="es">
      <body>
        <div className="min-h-screen bg-gradient-to-b from-black to-purple-950 flex items-center justify-center p-4">
          <div className="w-full max-w-md p-6 rounded-lg border border-red-500/50 bg-black/40 backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="h-6 w-6 text-red-500" />
              <h1 className="text-xl font-bold text-white">Error Crítico</h1>
            </div>

            <div className="p-4 bg-red-500/10 rounded-lg mb-6">
              <p className="text-white/80">
                {error.message ||
                  "Ha ocurrido un error crítico en la aplicación. Por favor, intenta recargar la página."}
              </p>
              {error.digest && <p className="text-xs text-white/50 mt-2">Error ID: {error.digest}</p>}
            </div>

            <div className="flex justify-center">
              <Button onClick={reset}>Reiniciar Aplicación</Button>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}
