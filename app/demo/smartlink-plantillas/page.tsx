"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Wine, Heart, Briefcase, QrCode, LinkIcon } from "lucide-react"
import { EMOTIONAL_CAPSULES } from "@/lib/types/capsule-engine"
import { useRouter } from "next/navigation"

export default function SmartlinkPlantillasDemo() {
  const [selectedCapsule, setSelectedCapsule] = useState("borrachos")
  const [selectedArchetype, setSelectedArchetype] = useState("")
  const router = useRouter()

  // Obtener la cápsula seleccionada
  const capsule = EMOTIONAL_CAPSULES.find((c) => c.id === selectedCapsule)

  // Generar un smartlink para el arquetipo seleccionado
  const generateSmartlink = () => {
    if (!selectedArchetype) return ""

    return `/challenge/${selectedCapsule}_${selectedArchetype}`
  }

  // Manejar la activación del smartlink
  const handleActivateSmartlink = () => {
    const smartlink = generateSmartlink()
    if (smartlink) {
      router.push(smartlink)
    }
  }

  // Renderizar el icono de la cápsula
  const renderCapsuleIcon = (capsuleId: string) => {
    switch (capsuleId) {
      case "borrachos":
        return <Wine className="h-5 w-5 mr-2" />
      case "despecho":
        return <Heart className="h-5 w-5 mr-2" />
      case "linkedin":
        return <Briefcase className="h-5 w-5 mr-2" />
      default:
        return null
    }
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-2 text-center">Demo Smartlinks y Plantillas</h1>
      <p className="text-center text-gray-500 mb-8">
        Explora cómo los smartlinks activan automáticamente las plantillas para cada desafío
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Paso 1: Selecciona una Cápsula y Arquetipo</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="borrachos" onValueChange={(value) => setSelectedCapsule(value)}>
              <TabsList className="grid grid-cols-3 mb-4">
                <TabsTrigger value="borrachos">Borrachos</TabsTrigger>
                <TabsTrigger value="despecho">Despecho</TabsTrigger>
                <TabsTrigger value="linkedin">LinkedIn</TabsTrigger>
              </TabsList>

              <TabsContent value="borrachos">
                <div className="grid grid-cols-1 gap-2">
                  {capsule?.archetypes.map((archetype) => (
                    <Button
                      key={archetype.id}
                      variant={selectedArchetype === archetype.id ? "default" : "outline"}
                      className="justify-start"
                      onClick={() => setSelectedArchetype(archetype.id)}
                    >
                      <Wine className="h-4 w-4 mr-2" />
                      {archetype.name}
                    </Button>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="despecho">
                <div className="grid grid-cols-1 gap-2">
                  {EMOTIONAL_CAPSULES.find((c) => c.id === "despecho")?.archetypes.map((archetype) => (
                    <Button
                      key={archetype.id}
                      variant={selectedArchetype === archetype.id ? "default" : "outline"}
                      className="justify-start"
                      onClick={() => setSelectedArchetype(archetype.id)}
                    >
                      <Heart className="h-4 w-4 mr-2" />
                      {archetype.name}
                    </Button>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="linkedin">
                <div className="grid grid-cols-1 gap-2">
                  {EMOTIONAL_CAPSULES.find((c) => c.id === "linkedin")?.archetypes.map((archetype) => (
                    <Button
                      key={archetype.id}
                      variant={selectedArchetype === archetype.id ? "default" : "outline"}
                      className="justify-start"
                      onClick={() => setSelectedArchetype(archetype.id)}
                    >
                      <Briefcase className="h-4 w-4 mr-2" />
                      {archetype.name}
                    </Button>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Paso 2: Activa el Smartlink</CardTitle>
          </CardHeader>
          <CardContent>
            {selectedArchetype ? (
              <div className="space-y-4">
                <div className="bg-black/20 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <LinkIcon className="h-4 w-4 mr-2 text-purple-400" />
                    <span className="text-purple-400 font-medium">Smartlink generado:</span>
                  </div>
                  <code className="block bg-black/40 p-2 rounded text-white/80 overflow-x-auto">
                    {generateSmartlink()}
                  </code>
                </div>

                <div className="flex flex-col gap-2">
                  <Button
                    onClick={handleActivateSmartlink}
                    className="w-full bg-gradient-to-r from-pink-500 to-purple-600"
                  >
                    <LinkIcon className="h-4 w-4 mr-2" />
                    Activar Smartlink
                  </Button>

                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      // Simular escaneo de QR
                      setTimeout(() => {
                        handleActivateSmartlink()
                      }, 1500)
                    }}
                  >
                    <QrCode className="h-4 w-4 mr-2" />
                    Simular Escaneo QR
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                Selecciona una cápsula y un arquetipo para generar un smartlink
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {selectedArchetype && (
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center">
              {renderCapsuleIcon(selectedCapsule)}
              <CardTitle>{capsule?.archetypes.find((a) => a.id === selectedArchetype)?.name || "Arquetipo"}</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-300 mb-4">
              {capsule?.archetypes.find((a) => a.id === selectedArchetype)?.description || "Descripción del arquetipo"}
            </p>

            <div className="bg-purple-500/20 rounded-lg p-3 mb-4 border border-purple-500/30">
              <p className="text-purple-300 text-sm">
                <span className="font-bold">Smartlink:</span> Al activar este smartlink, se cargará automáticamente la
                plantilla correspondiente para este arquetipo.
              </p>
            </div>

            <div className="flex gap-2">
              <span className="bg-purple-500/20 text-purple-300 text-xs px-2 py-0.5 rounded-full">
                {selectedCapsule}
              </span>
              <span className="bg-pink-500/20 text-pink-300 text-xs px-2 py-0.5 rounded-full">{selectedArchetype}</span>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
