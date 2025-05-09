import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Sparkles, QrCode, Smartphone, Users, Award, Share2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function ComoFunciona() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-purple-950">
      <div className="container mx-auto py-12">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4 text-white">Cómo Funciona Brinda X</h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Un ecosistema viral de caos emocional que fusiona lo digital y lo físico.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">La Fórmula Mágica</h2>
            <Card className="border-purple-500/50 bg-black/40 backdrop-blur-sm mb-8">
              <CardContent className="p-6">
                <p className="text-white/90 mb-4">Brinda X es un ecosistema viral que fusiona:</p>
                <ul className="space-y-4 text-white/80">
                  <li className="flex gap-3">
                    <span className="bg-pink-500/20 p-2 rounded-full h-8 w-8 flex items-center justify-center flex-shrink-0">
                      <Sparkles className="h-4 w-4 text-pink-500" />
                    </span>
                    <div>
                      <span className="font-medium text-white">TikTok + Cards Against Humanity</span>
                      <p className="text-sm text-white/70">Virality + UGC + humor ácido + respuestas incómodas</p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="bg-purple-500/20 p-2 rounded-full h-8 w-8 flex items-center justify-center flex-shrink-0">
                      <Sparkles className="h-4 w-4 text-purple-500" />
                    </span>
                    <div>
                      <span className="font-medium text-white">100 Mexicanos Dijeron + MSCHF</span>
                      <p className="text-sm text-white/70">
                        Interacción grupal + humor local + experiencias absurdas + hype
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="bg-amber-500/20 p-2 rounded-full h-8 w-8 flex items-center justify-center flex-shrink-0">
                      <Sparkles className="h-4 w-4 text-amber-500" />
                    </span>
                    <div>
                      <span className="font-medium text-white">Exploding Kittens + Lotería Mexicana</span>
                      <p className="text-sm text-white/70">
                        Sorpresa + mecánicas de caos + coleccionismo + cultura visual
                      </p>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <h2 className="text-2xl font-bold text-white mb-6">Arquitectura Técnica</h2>
            <Card className="border-purple-500/50 bg-black/40 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <span className="bg-blue-500/20 p-2 rounded-full h-8 w-8 flex items-center justify-center flex-shrink-0">
                      <Sparkles className="h-4 w-4 text-blue-500" />
                    </span>
                    <div>
                      <span className="font-medium text-white">Auth + Datos</span>
                      <p className="text-sm text-white/70">
                        Supabase para autenticación, base de datos, storage y realtime.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <span className="bg-green-500/20 p-2 rounded-full h-8 w-8 flex items-center justify-center flex-shrink-0">
                      <Sparkles className="h-4 w-4 text-green-500" />
                    </span>
                    <div>
                      <span className="font-medium text-white">Generador de cartas</span>
                      <p className="text-sm text-white/70">
                        GPT-4 API con reglas validadas para crear contenido dinámico.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <span className="bg-red-500/20 p-2 rounded-full h-8 w-8 flex items-center justify-center flex-shrink-0">
                      <Sparkles className="h-4 w-4 text-red-500" />
                    </span>
                    <div>
                      <span className="font-medium text-white">QR/NFC tracking</span>
                      <p className="text-sm text-white/70">
                        Dub.co para redireccionar al URL con parámetros mesa_id, campaign_id, etc.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <span className="bg-yellow-500/20 p-2 rounded-full h-8 w-8 flex items-center justify-center flex-shrink-0">
                      <Sparkles className="h-4 w-4 text-yellow-500" />
                    </span>
                    <div>
                      <span className="font-medium text-white">Real-time</span>
                      <p className="text-sm text-white/70">
                        Ably para experiencias compartidas (brindis, votación, sticker hunt).
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-6">El Flujo de Experiencia</h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="bg-pink-500/20 rounded-full h-12 w-12 flex items-center justify-center flex-shrink-0">
                  <QrCode className="h-6 w-6 text-pink-500" />
                </div>
                <div>
                  <h3 className="font-bold text-white mb-1">1. Entrada IRL compartida</h3>
                  <p className="text-white/80">
                    Se coloca un QR físico o proyectado en la mesa o venue (coaster, sticker, menú, cartel, etc.). Al
                    escanearlo, se crea una "sala de cápsula" única con un session_id. Todos los móviles quedan
                    sincronizados.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="bg-purple-500/20 rounded-full h-12 w-12 flex items-center justify-center flex-shrink-0">
                  <Smartphone className="h-6 w-6 text-purple-500" />
                </div>
                <div>
                  <h3 className="font-bold text-white mb-1">2. Desencadenamiento del ritual emocional</h3>
                  <p className="text-white/80">
                    Aparece en todos los móviles una pregunta provocadora emocional del bloque elegido (despecho,
                    borrachera, etc.). Se invita a responder en alguno de los 3 modos (voz, selfie drama, AI voice).
                    Otros jugadores en la mesa votan y reaccionan.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="bg-blue-500/20 rounded-full h-12 w-12 flex items-center justify-center flex-shrink-0">
                  <Users className="h-6 w-6 text-blue-500" />
                </div>
                <div>
                  <h3 className="font-bold text-white mb-1">3. Generación de contenido compartido</h3>
                  <p className="text-white/80">
                    Las respuestas se graban y se editan al instante. La mejor se proyecta en el venue (si aplica) o se
                    comparte como link. Se crea un vault grupal desbloqueable.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="bg-amber-500/20 rounded-full h-12 w-12 flex items-center justify-center flex-shrink-0">
                  <Award className="h-6 w-6 text-amber-500" />
                </div>
                <div>
                  <h3 className="font-bold text-white mb-1">4. Recompensa emocional compartida</h3>
                  <p className="text-white/80">
                    Si la mesa alcanza cierto umbral (3 confesiones + 10 votos, por ejemplo), se desbloquea un loot: QR
                    para un shot gratis en la barra, meme gif "mesa del caos", clip emocional personalizado, o
                    afterpass.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="bg-green-500/20 rounded-full h-12 w-12 flex items-center justify-center flex-shrink-0">
                  <Share2 className="h-6 w-6 text-green-500" />
                </div>
                <div>
                  <h3 className="font-bold text-white mb-1">5. Reentrada al loop</h3>
                  <p className="text-white/80">
                    El clip viral se comparte → atrae más mesas → más engagement IRL y URL.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-xl mb-16">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/90 to-pink-900/90 z-10"></div>
          <Image
            src="/placeholder.svg?height=400&width=1200"
            alt="Brinda X Experience"
            width={1200}
            height={400}
            className="object-cover w-full h-[400px]"
          />
          <div className="relative z-20 p-12">
            <h2 className="text-3xl font-bold text-white mb-4">¿Por qué funciona?</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <li className="flex gap-3">
                <span className="bg-white/20 p-2 rounded-full h-8 w-8 flex items-center justify-center flex-shrink-0">
                  <Sparkles className="h-4 w-4 text-white" />
                </span>
                <div>
                  <span className="font-medium text-white">Es personal, pero no invasivo</span>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="bg-white/20 p-2 rounded-full h-8 w-8 flex items-center justify-center flex-shrink-0">
                  <Sparkles className="h-4 w-4 text-white" />
                </span>
                <div>
                  <span className="font-medium text-white">
                    Te hace sentir como parte de un juego secreto o exclusivo
                  </span>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="bg-white/20 p-2 rounded-full h-8 w-8 flex items-center justify-center flex-shrink-0">
                  <Sparkles className="h-4 w-4 text-white" />
                </span>
                <div>
                  <span className="font-medium text-white">La recompensa es simbólica + material</span>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="bg-white/20 p-2 rounded-full h-8 w-8 flex items-center justify-center flex-shrink-0">
                  <Sparkles className="h-4 w-4 text-white" />
                </span>
                <div>
                  <span className="font-medium text-white">La emoción se vuelve mecánica de juego</span>
                </div>
              </li>
            </ul>
            <Button asChild size="lg" className="bg-white text-purple-900 hover:bg-white/90">
              <Link href="/capsulas">Explorar Cápsulas</Link>
            </Button>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-8">¿Listo para probar la experiencia?</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-90">
              <Link href="/escanear">Escanear QR</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-pink-500 text-white hover:bg-pink-500/20">
              <Link href="/capsulas">Ver Todas las Cápsulas</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
