"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle } from "lucide-react"
import Link from "next/link"
import { useEffect } from "react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-purple-950 flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-red-500/50 bg-black/40 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-6 w-6 text-red-500" />
            <CardTitle className="text-white">Algo salió mal</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="p-4 bg-red-500/10 rounded-lg mb-4">
            <p className="text-white/80">
              {error.message || "Ha ocurrido un error inesperado. Por favor, intenta de nuevo."}
            </p>
            {error.digest && <p className="text-xs text-white/50 mt-2">Error ID: {error.digest}</p>}
          </div>
        </CardContent>
        <CardFooter className="flex gap-4 justify-end">
          <Button variant="outline" asChild>
            <Link href="/">Volver al Inicio</Link>
          </Button>
          <Button onClick={reset}>Intentar de Nuevo</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
