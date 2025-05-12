"use client"

import { useEffect, useState } from "react"
import { useParams, useSearchParams } from "next/navigation"
import { getCapsuleById } from "@/utils/activation-engine"
import DynamicCard from "@/components/DynamicCard"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertTriangle } from "lucide-react"

export default function CapsulePage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const [loading, setLoading] = useState(true)
  const [capsule, setCapsule] = useState<ReturnType<typeof getCapsuleById>>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Simulate loading
    setLoading(true)

    setTimeout(() => {
      try {
        const id = params.id as string
        const foundCapsule = getCapsuleById(id as any)

        if (!foundCapsule) {
          setError(`No se encontró la cápsula con ID: ${id}`)
          setCapsule(null)
        } else {
          setCapsule(foundCapsule)
          setError(null)
        }
      } catch (err) {
        setError("Error al cargar la cápsula")
        setCapsule(null)
      } finally {
        setLoading(false)
      }
    }, 1000)
  }, [params.id, searchParams])

  if (loading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <Skeleton className="h-12 w-3/4 mb-4" />
        <Skeleton className="h-6 w-1/2 mb-8" />
        <div className="grid grid-cols-1 gap-8">
          <Skeleton className="h-[600px] w-full rounded-lg" />
        </div>
      </div>
    )
  }

  if (error || !capsule) {
    return (
      <div className="container mx-auto py-8 px-4">
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error || "No se pudo cargar la cápsula. Intenta de nuevo más tarde."}</AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-4xl font-bold mb-2 text-white">Cápsula Activada</h1>
      <p className="text-white/70 mb-8">Completa el reto para desbloquear recompensas exclusivas</p>

      <div className="grid grid-cols-1 gap-8">
        <DynamicCard capsule={capsule} />
      </div>
    </div>
  )
}
