"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Sparkles, BarChart3, Users, MapPin, Wine, Heart, Briefcase, Flame, Trophy, Utensils } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  const [campaignName, setCampaignName] = useState("")
  const [brandName, setBrandName] = useState("")
  const [selectedVenues, setSelectedVenues] = useState<string[]>([])
  const [selectedCapsules, setSelectedCapsules] = useState<string[]>([])
  const [allowedEmotionalTiers, setAllowedEmotionalTiers] = useState<string[]>(["mild", "intense"])
  const [prohibitedThemes, setProhibitedThemes] = useState<string[]>([])

  const venues = [
    { id: "cdmx-bar1", name: "La Cortesía CDMX", location: "Ciudad de México" },
    { id: "cdmx-bar2", name: "Gin Gin Condesa", location: "Ciudad de México" },
    { id: "gdl-bar1", name: "Cervecería Chapultepec", location: "Guadalajara" },
    { id: "mty-bar1", name: "Almacén 42", location: "Monterrey" },
  ]

  const capsules = [
    { id: "borrachos", name: "100 Borrachos Dijeron™", icon: <Wine className="h-5 w-5 text-pink-500" /> },
    { id: "despecho", name: "Ritual Despecho™", icon: <Heart className="h-5 w-5 text-red-500" /> },
    { id: "linkedin", name: "LinkedIn Caótico™", icon: <Briefcase className="h-5 w-5 text-blue-500" /> },
    { id: "mundial", name: "Fiesta Mundial™", icon: <Flame className="h-5 w-5 text-orange-500" /> },
    { id: "regios", name: "100 Regios Dijeron™", icon: <Trophy className="h-5 w-5 text-amber-500" /> },
    { id: "foodies", name: "100 Foodies Dijeron™", icon: <Utensils className="h-5 w-5 text-yellow-500" /> },
  ]

  const themes = [
    { id: "sexual", name: "Contenido Sexual" },
    { id: "political", name: "Política" },
    { id: "religious", name: "Religión" },
    { id: "offensive", name: "Lenguaje Ofensivo" },
    { id: "drugs", name: "Drogas Ilícitas" },
  ]

  const toggleVenue = (venueId: string) => {
    setSelectedVenues((prev) => (prev.includes(venueId) ? prev.filter((id) => id !== venueId) : [...prev, venueId]))
  }

  const toggleCapsule = (capsuleId: string) => {
    setSelectedCapsules((prev) =>
      prev.includes(capsuleId) ? prev.filter((id) => id !== capsuleId) : [...prev, capsuleId],
    )
  }

  const toggleEmotionalTier = (tier: string) => {
    setAllowedEmotionalTiers((prev) => (prev.includes(tier) ? prev.filter((t) => t !== tier) : [...prev, tier]))
  }

  const toggleProhibitedTheme = (themeId: string) => {
    setProhibitedThemes((prev) => (prev.includes(themeId) ? prev.filter((id) => id !== themeId) : [...prev, themeId]))
  }

  const handleCreateCampaign = () => {
    // In a real app, you would send this data to your API
    console.log({
      campaignName,
      brandName,
      selectedVenues,
      selectedCapsules,
      allowedEmotionalTiers,
      prohibitedThemes,
    })

    // Show success message
    alert("Campaña creada exitosamente")
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
        <div className="flex items-center gap-4">
          <Button asChild variant="outline" className="border-pink-500 text-white hover:bg-pink-500/20">
            <Link href="/scan">Escanear QR</Link>
          </Button>
          <Button asChild className="bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-90">
            <Link href="/dashboard/campaigns">Mis Campañas</Link>
          </Button>
        </div>
      </header>

      <main className="container mx-auto py-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-white">Dashboard de Marca</h1>
            <div className="flex items-center gap-2">
              <div className="bg-pink-500/20 p-2 rounded-full">
                <BarChart3 className="h-5 w-5 text-pink-500" />
              </div>
              <span className="text-white/80">Estadísticas en vivo</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="bg-black/40 border-purple-500/50 backdrop-blur-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-white text-lg">Usuarios Activos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-purple-500" />
                    <span className="text-white/80">Hoy</span>
                  </div>
                  <span className="text-2xl font-bold text-white">1,245</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black/40 border-pink-500/50 backdrop-blur-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-white text-lg">Retos Completados</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-pink-500" />
                    <span className="text-white/80">Hoy</span>
                  </div>
                  <span className="text-2xl font-bold text-white">3,872</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black/40 border-amber-500/50 backdrop-blur-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-white text-lg">Recompensas Entregadas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-amber-500" />
                    <span className="text-white/80">Hoy</span>
                  </div>
                  <span className="text-2xl font-bold text-white">952</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="create" className="mb-8">
            <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
              <TabsTrigger value="create">Crear Campaña</TabsTrigger>
              <TabsTrigger value="analytics">Analíticas</TabsTrigger>
            </TabsList>

            <TabsContent value="create" className="mt-6">
              <Card className="bg-black/40 border-purple-500/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">Crear Nueva Campaña</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6">
                    <div className="grid gap-3">
                      <Label htmlFor="campaignName" className="text-white">
                        Nombre de la Campaña
                      </Label>
                      <Input
                        id="campaignName"
                        placeholder="Ej: Verano Bacardi 2025"
                        className="bg-black/40 border-purple-500/30 text-white"
                        value={campaignName}
                        onChange={(e) => setCampaignName(e.target.value)}
                      />
                    </div>

                    <div className="grid gap-3">
                      <Label htmlFor="brandName" className="text-white">
                        Nombre de la Marca
                      </Label>
                      <Input
                        id="brandName"
                        placeholder="Ej: Bacardi"
                        className="bg-black/40 border-purple-500/30 text-white"
                        value={brandName}
                        onChange={(e) => setBrandName(e.target.value)}
                      />
                    </div>

                    <div className="grid gap-3">
                      <Label className="text-white">Venues Seleccionados</Label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {venues.map((venue) => (
                          <div
                            key={venue.id}
                            className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                              selectedVenues.includes(venue.id)
                                ? "border-pink-500/50 bg-pink-500/10"
                                : "border-gray-700 bg-black/20 hover:bg-black/30"
                            }`}
                            onClick={() => toggleVenue(venue.id)}
                          >
                            <Checkbox
                              checked={selectedVenues.includes(venue.id)}
                              onCheckedChange={() => toggleVenue(venue.id)}
                              className="data-[state=checked]:bg-pink-500 data-[state=checked]:border-pink-500"
                            />
                            <div>
                              <p className="text-white font-medium">{venue.name}</p>
                              <p className="text-white/60 text-sm">{venue.location}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="grid gap-3">
                      <Label className="text-white">Cápsulas Permitidas</Label>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {capsules.map((capsule) => (
                          <div
                            key={capsule.id}
                            className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                              selectedCapsules.includes(capsule.id)
                                ? "border-pink-500/50 bg-pink-500/10"
                                : "border-gray-700 bg-black/20 hover:bg-black/30"
                            }`}
                            onClick={() => toggleCapsule(capsule.id)}
                          >
                            <Checkbox
                              checked={selectedCapsules.includes(capsule.id)}
                              onCheckedChange={() => toggleCapsule(capsule.id)}
                              className="data-[state=checked]:bg-pink-500 data-[state=checked]:border-pink-500"
                            />
                            <div className="flex items-center gap-2">
                              {capsule.icon}
                              <p className="text-white">{capsule.name}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="grid gap-3">
                      <Label className="text-white">Niveles Emocionales Permitidos</Label>
                      <div className="flex flex-wrap gap-3">
                        <div
                          className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                            allowedEmotionalTiers.includes("mild")
                              ? "border-blue-500/50 bg-blue-500/10"
                              : "border-gray-700 bg-black/20 hover:bg-black/30"
                          }`}
                          onClick={() => toggleEmotionalTier("mild")}
                        >
                          <Checkbox
                            checked={allowedEmotionalTiers.includes("mild")}
                            onCheckedChange={() => toggleEmotionalTier("mild")}
                            className="data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
                          />
                          <p className="text-white">Suave</p>
                        </div>

                        <div
                          className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                            allowedEmotionalTiers.includes("intense")
                              ? "border-purple-500/50 bg-purple-500/10"
                              : "border-gray-700 bg-black/20 hover:bg-black/30"
                          }`}
                          onClick={() => toggleEmotionalTier("intense")}
                        >
                          <Checkbox
                            checked={allowedEmotionalTiers.includes("intense")}
                            onCheckedChange={() => toggleEmotionalTier("intense")}
                            className="data-[state=checked]:bg-purple-500 data-[state=checked]:border-purple-500"
                          />
                          <p className="text-white">Intenso</p>
                        </div>

                        <div
                          className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                            allowedEmotionalTiers.includes("chaotic")
                              ? "border-red-500/50 bg-red-500/10"
                              : "border-gray-700 bg-black/20 hover:bg-black/30"
                          }`}
                          onClick={() => toggleEmotionalTier("chaotic")}
                        >
                          <Checkbox
                            checked={allowedEmotionalTiers.includes("chaotic")}
                            onCheckedChange={() => toggleEmotionalTier("chaotic")}
                            className="data-[state=checked]:bg-red-500 data-[state=checked]:border-red-500"
                          />
                          <p className="text-white">Caótico</p>
                        </div>
                      </div>
                    </div>

                    <div className="grid gap-3">
                      <Label className="text-white">Temas Prohibidos</Label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {themes.map((theme) => (
                          <div
                            key={theme.id}
                            className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                              prohibitedThemes.includes(theme.id)
                                ? "border-red-500/50 bg-red-500/10"
                                : "border-gray-700 bg-black/20 hover:bg-black/30"
                            }`}
                            onClick={() => toggleProhibitedTheme(theme.id)}
                          >
                            <Checkbox
                              checked={prohibitedThemes.includes(theme.id)}
                              onCheckedChange={() => toggleProhibitedTheme(theme.id)}
                              className="data-[state=checked]:bg-red-500 data-[state=checked]:border-red-500"
                            />
                            <p className="text-white">{theme.name}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Button
                      onClick={handleCreateCampaign}
                      className="bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-90"
                    >
                      Crear Campaña
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics" className="mt-6">
              <Card className="bg-black/40 border-purple-500/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">Analíticas de Campañas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <p className="text-white/70">Selecciona una campaña para ver sus analíticas detalladas.</p>
                    <Button className="mt-4 bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-90">
                      <Link href="/dashboard/campaigns">Ver Campañas</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
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
