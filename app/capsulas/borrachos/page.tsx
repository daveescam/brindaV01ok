import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Wine, Share2, Trophy, Users } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function BorrachosDijeron() {
  return (
    <div className="container mx-auto py-12">
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <Wine className="h-8 w-8 text-pink-500" />
          <h1 className="text-3xl md:text-4xl font-bold text-white">100 Borrachos Dijeron™</h1>
        </div>
        <p className="text-xl text-white/80 max-w-3xl">
          Honestidad ebria + Caos tragicómico. Una experiencia donde tus confesiones de borrachera pueden ganar premios.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        <div>
          <div className="relative overflow-hidden rounded-xl mb-8 aspect-video">
            <Image
              src="/placeholder.svg?height=400&width=600"
              alt="100 Borrachos Dijeron"
              width={600}
              height={400}
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
              <div className="flex items-center gap-2">
                <span className="bg-pink-500/80 text-white text-xs px-2 py-1 rounded-full">Tecate</span>
                <span className="bg-purple-500/80 text-white text-xs px-2 py-1 rounded-full">Bares</span>
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-white mb-4">¿Cómo funciona?</h2>
          <div className="space-y-6 text-white/80">
            <div className="flex gap-4">
              <div className="bg-pink-500/20 rounded-full h-8 w-8 flex items-center justify-center flex-shrink-0">
                <span className="text-pink-300 font-bold">1</span>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-1">Escanea el QR</h3>
                <p>Encuentra un QR de Brinda X en tu bar favorito, coaster, o menú.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="bg-pink-500/20 rounded-full h-8 w-8 flex items-center justify-center flex-shrink-0">
                <span className="text-pink-300 font-bold">2</span>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-1">Responde la pregunta</h3>
                <p>Confiesa algo vergonzoso que hiciste en una borrachera.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="bg-pink-500/20 rounded-full h-8 w-8 flex items-center justify-center flex-shrink-0">
                <span className="text-pink-300 font-bold">3</span>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-1">Recibe votos</h3>
                <p>Tu mesa y otros jugadores votan por las mejores confesiones.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="bg-pink-500/20 rounded-full h-8 w-8 flex items-center justify-center flex-shrink-0">
                <span className="text-pink-300 font-bold">4</span>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-1">Gana premios</h3>
                <p>Desbloquea shots gratis, cartas coleccionables y más.</p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <Card className="bg-black/40 border-purple-500/50 backdrop-blur-sm mb-8">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold text-white mb-4">Preguntas Borrachas</h3>
              <ul className="space-y-4 text-white/80">
                <li className="p-3 bg-purple-500/10 rounded-lg">
                  "¿A quién le mandaste un mensaje que ahora te da pena?"
                </li>
                <li className="p-3 bg-purple-500/10 rounded-lg">"¿Cuál fue tu peor idea en una peda?"</li>
                <li className="p-3 bg-purple-500/10 rounded-lg">
                  "¿Qué hiciste en una peda y nadie te creyó después?"
                </li>
                <li className="p-3 bg-purple-500/10 rounded-lg">"¿Qué te tatuarías pedo si fuera gratis?"</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-black/40 border-purple-500/50 backdrop-blur-sm">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold text-white mb-4">Cartas Tipo Lotería Emocional</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gradient-to-br from-pink-500/20 to-purple-500/20 rounded-lg border border-pink-500/30">
                  <h4 className="font-bold text-white mb-1">🍻 EL MALACOPA</h4>
                  <p className="text-sm text-white/70">"El que lloró, gritó y bailó en menos de 10 minutos"</p>
                </div>
                <div className="p-4 bg-gradient-to-br from-pink-500/20 to-purple-500/20 rounded-lg border border-pink-500/30">
                  <h4 className="font-bold text-white mb-1">📱 EL EX-TEXTER</h4>
                  <p className="text-sm text-white/70">"Le escribió a su ex desde la cuenta de su roomie"</p>
                </div>
                <div className="p-4 bg-gradient-to-br from-pink-500/20 to-purple-500/20 rounded-lg border border-pink-500/30">
                  <h4 className="font-bold text-white mb-1">🔥 EL SHOT FINAL</h4>
                  <p className="text-sm text-white/70">"El que dijo 'uno más y ya'… y perdió 7 horas de su vida"</p>
                </div>
                <div className="p-4 bg-gradient-to-br from-pink-500/20 to-purple-500/20 rounded-lg border border-pink-500/30">
                  <h4 className="font-bold text-white mb-1">🧻 EL DESPERTAR</h4>
                  <p className="text-sm text-white/70">"El que despertó en casa ajena con una toalla de Pikachu"</p>
                </div>
                <div className="p-4 bg-gradient-to-br from-pink-500/20 to-purple-500/20 rounded-lg border border-pink-500/30">
                  <h4 className="font-bold text-white mb-1">🤡 La Promesa Falsa /h4>
                  <p className="text-sm text-white/70">"El que siempre va armar un biz con sus amigos"</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8 items-center justify-center mb-16">
        <div className="flex items-center gap-4">
          <div className="bg-pink-500/20 p-3 rounded-full">
            <Trophy className="h-6 w-6 text-pink-500" />
          </div>
          <div>
            <h3 className="font-bold text-white">Premios Exclusivos</h3>
            <p className="text-white/70">Shots gratis, cartas coleccionables</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="bg-purple-500/20 p-3 rounded-full">
            <Users className="h-6 w-6 text-purple-500" />
          </div>
          <div>
            <h3 className="font-bold text-white">Juego Grupal</h3>
            <p className="text-white/70">Perfecto para mesas de 3-8 personas</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="bg-blue-500/20 p-3 rounded-full">
            <Share2 className="h-6 w-6 text-blue-500" />
          </div>
          <div>
            <h3 className="font-bold text-white">Contenido Viral</h3>
            <p className="text-white/70">Clips para compartir en redes</p>
          </div>
        </div>
      </div>

      <div className="text-center">
        <Button asChild size="lg" className="bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-90">
          <Link href="/escanear">Escanear QR y Jugar Ahora</Link>
        </Button>
      </div>
    </div>
  )
}
