import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Wine, Briefcase, Heart, Flame, Trophy, Utensils } from "lucide-react"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Capsulas() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-purple-950">
      <div className="container mx-auto py-12">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4 text-white">Cápsulas Brinda X</h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Explora nuestras experiencias de caos emocional y elige tu ritual favorito.
          </p>
        </div>

        <Tabs defaultValue="populares" className="mb-12">
          <div className="flex justify-center mb-8">
            <TabsList className="bg-black/40">
              <TabsTrigger value="populares">Populares</TabsTrigger>
              <TabsTrigger value="nuevas">Nuevas</TabsTrigger>
              <TabsTrigger value="todas">Todas</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="populares">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="bg-black/40 border-purple-500/50 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Wine className="h-10 w-10 text-pink-500" />
                    <div>
                      <h3 className="text-xl font-bold text-white">100 Borrachos Dijeron™</h3>
                      <p className="text-white/70">Honestidad ebria + Caos tragicómico</p>
                    </div>
                  </div>
                  <p className="text-white/80 mb-4">Confiesa lo que hiciste después del 5to mezcal y gana tu shot.</p>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="bg-pink-500/20 text-pink-300 text-xs px-2 py-1 rounded-full">Tecate</span>
                    <span className="bg-purple-500/20 text-purple-300 text-xs px-2 py-1 rounded-full">Bares</span>
                  </div>
                  <Button asChild variant="secondary" className="w-full">
                    <Link href="/capsulas/borrachos">Explorar</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-black/40 border-purple-500/50 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Heart className="h-10 w-10 text-red-500" />
                    <div>
                      <h3 className="text-xl font-bold text-white">Ritual Despecho™</h3>
                      <p className="text-white/70">Dolor + Drama + Catarsis</p>
                    </div>
                  </div>
                  <p className="text-white/80 mb-4">Si cantas con el alma rota, la casa invita.</p>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="bg-red-500/20 text-red-300 text-xs px-2 py-1 rounded-full">Tinder</span>
                    <span className="bg-purple-500/20 text-purple-300 text-xs px-2 py-1 rounded-full">Bares</span>
                  </div>
                  <Button asChild variant="secondary" className="w-full">
                    <Link href="/capsulas/despecho">Explorar</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-black/40 border-purple-500/50 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Briefcase className="h-10 w-10 text-blue-500" />
                    <div>
                      <h3 className="text-xl font-bold text-white">LinkedIn Caótico™</h3>
                      <p className="text-white/70">Cringe corporativo + Humor de oficina</p>
                    </div>
                  </div>
                  <p className="text-white/80 mb-4">¿Orgulloso de anunciar... que vas a hacer el ridículo?</p>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="bg-blue-500/20 text-blue-300 text-xs px-2 py-1 rounded-full">WeWork</span>
                    <span className="bg-green-500/20 text-green-300 text-xs px-2 py-1 rounded-full">Oficinas</span>
                  </div>
                  <Button asChild variant="secondary" className="w-full">
                    <Link href="/capsulas/linkedin">Explorar</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="nuevas">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="bg-black/40 border-purple-500/50 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Flame className="h-10 w-10 text-orange-500" />
                    <div>
                      <h3 className="text-xl font-bold text-white">Fiesta Mundial™</h3>
                      <p className="text-white/70">Pasión + Euforia + Competencia</p>
                    </div>
                  </div>
                  <p className="text-white/80 mb-4">
                    Grita como si fuera gol de último minuto. Si convences al grupo, ganas.
                  </p>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="bg-orange-500/20 text-orange-300 text-xs px-2 py-1 rounded-full">Corona</span>
                    <span className="bg-green-500/20 text-green-300 text-xs px-2 py-1 rounded-full">Estadios</span>
                  </div>
                  <Button asChild variant="secondary" className="w-full">
                    <Link href="/capsulas/mundial">Explorar</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-black/40 border-purple-500/50 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Utensils className="h-10 w-10 text-yellow-500" />
                    <div>
                      <h3 className="text-xl font-bold text-white">100 Foodies Dijeron™</h3>
                      <p className="text-white/70">Culinary Shame + Antojos</p>
                    </div>
                  </div>
                  <p className="text-white/80 mb-4">Confiesa tu combinación de comida más vergonzosa y gana.</p>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="bg-yellow-500/20 text-yellow-300 text-xs px-2 py-1 rounded-full">Uber Eats</span>
                    <span className="bg-purple-500/20 text-purple-300 text-xs px-2 py-1 rounded-full">
                      Restaurantes
                    </span>
                  </div>
                  <Button asChild variant="secondary" className="w-full">
                    <Link href="/capsulas/foodies">Explorar</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-black/40 border-purple-500/50 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Trophy className="h-10 w-10 text-amber-500" />
                    <div>
                      <h3 className="text-xl font-bold text-white">100 Regios Dijeron™</h3>
                      <p className="text-white/70">Orgullo regio + Carne asada</p>
                    </div>
                  </div>
                  <p className="text-white/80 mb-4">Defiende a muerte que Monterrey inventó el asado y gana.</p>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="bg-amber-500/20 text-amber-300 text-xs px-2 py-1 rounded-full">Carta Blanca</span>
                    <span className="bg-red-500/20 text-red-300 text-xs px-2 py-1 rounded-full">Monterrey</span>
                  </div>
                  <Button asChild variant="secondary" className="w-full">
                    <Link href="/capsulas/regios">Explorar</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="todas">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Combine all capsules here */}
              <Card className="bg-black/40 border-purple-500/50 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Wine className="h-10 w-10 text-pink-500" />
                    <div>
                      <h3 className="text-xl font-bold text-white">100 Borrachos Dijeron™</h3>
                      <p className="text-white/70">Honestidad ebria + Caos tragicómico</p>
                    </div>
                  </div>
                  <p className="text-white/80 mb-4">Confiesa lo que hiciste después del 5to mezcal y gana tu shot.</p>
                  <Button asChild variant="secondary" className="w-full">
                    <Link href="/capsulas/borrachos">Explorar</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-black/40 border-purple-500/50 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Heart className="h-10 w-10 text-red-500" />
                    <div>
                      <h3 className="text-xl font-bold text-white">Ritual Despecho™</h3>
                      <p className="text-white/70">Dolor + Drama + Catarsis</p>
                    </div>
                  </div>
                  <p className="text-white/80 mb-4">Si cantas con el alma rota, la casa invita.</p>
                  <Button asChild variant="secondary" className="w-full">
                    <Link href="/capsulas/despecho">Explorar</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-black/40 border-purple-500/50 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Briefcase className="h-10 w-10 text-blue-500" />
                    <div>
                      <h3 className="text-xl font-bold text-white">LinkedIn Caótico™</h3>
                      <p className="text-white/70">Cringe corporativo + Humor de oficina</p>
                    </div>
                  </div>
                  <p className="text-white/80 mb-4">¿Orgulloso de anunciar... que vas a hacer el ridículo?</p>
                  <Button asChild variant="secondary" className="w-full">
                    <Link href="/capsulas/linkedin">Explorar</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-black/40 border-purple-500/50 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Flame className="h-10 w-10 text-orange-500" />
                    <div>
                      <h3 className="text-xl font-bold text-white">Fiesta Mundial™</h3>
                      <p className="text-white/70">Pasión + Euforia + Competencia</p>
                    </div>
                  </div>
                  <p className="text-white/80 mb-4">
                    Grita como si fuera gol de último minuto. Si convences al grupo, ganas.
                  </p>
                  <Button asChild variant="secondary" className="w-full">
                    <Link href="/capsulas/mundial">Explorar</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-black/40 border-purple-500/50 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Utensils className="h-10 w-10 text-yellow-500" />
                    <div>
                      <h3 className="text-xl font-bold text-white">100 Foodies Dijeron™</h3>
                      <p className="text-white/70">Culinary Shame + Antojos</p>
                    </div>
                  </div>
                  <p className="text-white/80 mb-4">Confiesa tu combinación de comida más vergonzosa y gana.</p>
                  <Button asChild variant="secondary" className="w-full">
                    <Link href="/capsulas/foodies">Explorar</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-black/40 border-purple-500/50 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Trophy className="h-10 w-10 text-amber-500" />
                    <div>
                      <h3 className="text-xl font-bold text-white">100 Regios Dijeron™</h3>
                      <p className="text-white/70">Orgullo regio + Carne asada</p>
                    </div>
                  </div>
                  <p className="text-white/80 mb-4">Defiende a muerte que Monterrey inventó el asado y gana.</p>
                  <Button asChild variant="secondary" className="w-full">
                    <Link href="/capsulas/regios">Explorar</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        <div className="text-center">
          <Button asChild size="lg" className="bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-90">
            <Link href="/scan">Escanear QR y Jugar Ahora</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
