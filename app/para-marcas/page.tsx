import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Sparkles, BarChart, Target, Users, Zap } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function ParaMarcas() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-purple-950">
      <div className="container mx-auto py-12">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4 text-white">Brinda X para Marcas</h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Convierte tu marca en el patrocinador oficial del caos emocional.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">¿Por qué Brinda X?</h2>
            <Card className="border-purple-500/50 bg-black/40 backdrop-blur-sm mb-8">
              <CardContent className="p-6">
                <div className="space-y-6">
                  <div className="flex gap-3">
                    <span className="bg-pink-500/20 p-2 rounded-full h-8 w-8 flex items-center justify-center flex-shrink-0">
                      <Target className="h-4 w-4 text-pink-500" />
                    </span>
                    <div>
                      <span className="font-medium text-white">Engagement Emocional</span>
                      <p className="text-sm text-white/70">
                        Conecta con tu audiencia a través de experiencias emocionales memorables.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <span className="bg-purple-500/20 p-2 rounded-full h-8 w-8 flex items-center justify-center flex-shrink-0">
                      <Users className="h-4 w-4 text-purple-500" />
                    </span>
                    <div>
                      <span className="font-medium text-white">Contenido Generado por Usuarios</span>
                      <p className="text-sm text-white/70">
                        Tu marca se convierte en parte de historias auténticas y compartibles.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <span className="bg-blue-500/20 p-2 rounded-full h-8 w-8 flex items-center justify-center flex-shrink-0">
                      <BarChart className="h-4 w-4 text-blue-500" />
                    </span>
                    <div>
                      <span className="font-medium text-white">Datos Accionables</span>
                      <p className="text-sm text-white/70">
                        Obtén insights sobre las emociones y comportamientos de tu audiencia.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <span className="bg-amber-500/20 p-2 rounded-full h-8 w-8 flex items-center justify-center flex-shrink-0">
                      <Zap className="h-4 w-4 text-amber-500" />
                    </span>
                    <div>
                      <span className="font-medium text-white">Activación Híbrida</span>
                      <p className="text-sm text-white/70">
                        Combina experiencias físicas y digitales para maximizar el impacto.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <h2 className="text-2xl font-bold text-white mb-6">Casos de Éxito</h2>
            <Card className="border-purple-500/50 bg-black/40 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="space-y-6">
                  <div className="p-4 bg-gradient-to-br from-pink-500/20 to-purple-500/20 rounded-lg border border-pink-500/30">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="bg-white/20 p-1 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0">
                        <Sparkles className="h-3 w-3 text-white" />
                      </span>
                      <h4 className="font-bold text-white">Tecate x 100 Borrachos Dijeron™</h4>
                    </div>
                    <p className="text-sm text-white/70">
                      Incremento del 45% en engagement en bares asociados. 12,000+ clips virales generados en un fin de
                      semana.
                    </p>
                  </div>

                  <div className="p-4 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg border border-blue-500/30">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="bg-white/20 p-1 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0">
                        <Sparkles className="h-3 w-3 text-white" />
                      </span>
                      <h4 className="font-bold text-white">WeWork x LinkedIn Caótico™</h4>
                    </div>
                    <p className="text-sm text-white/70">
                      300% de aumento en menciones de marca. 5,000+ nuevos leads cualificados a través de experiencias
                      en coworkings.
                    </p>
                  </div>

                  <div className="p-4 bg-gradient-to-br from-red-500/20 to-purple-500/20 rounded-lg border border-red-500/30">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="bg-white/20 p-1 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0">
                        <Sparkles className="h-3 w-3 text-white" />
                      </span>
                      <h4 className="font-bold text-white">Tinder x Ritual Despecho™</h4>
                    </div>
                    <p className="text-sm text-white/70">
                      78% de incremento en descargas de la app. 25,000+ historias de despecho compartidas en la
                      plataforma.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Cómo Funciona para Marcas</h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="bg-pink-500/20 rounded-full h-12 w-12 flex items-center justify-center flex-shrink-0">
                  <span className="font-bold text-pink-500">1</span>
                </div>
                <div>
                  <h3 className="font-bold text-white mb-1">Selección de Cápsula</h3>
                  <p className="text-white/80">
                    Elige la cápsula emocional que mejor se alinee con tu marca y objetivos. Personaliza la experiencia
                    con tu identidad visual y tono de voz.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="bg-purple-500/20 rounded-full h-12 w-12 flex items-center justify-center flex-shrink-0">
                  <span className="font-bold text-purple-500">2</span>
                </div>
                <div>
                  <h3 className="font-bold text-white mb-1">Implementación</h3>
                  <p className="text-white/80">
                    Despliega QR codes en tus espacios físicos (bares, restaurantes, oficinas, eventos) o integra la
                    experiencia en tus canales digitales.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="bg-blue-500/20 rounded-full h-12 w-12 flex items-center justify-center flex-shrink-0">
                  <span className="font-bold text-blue-500">3</span>
                </div>
                <div>
                  <h3 className="font-bold text-white mb-1">Activación</h3>
                  <p className="text-white/80">
                    Los usuarios interactúan con la experiencia, generando contenido auténtico y emocional relacionado
                    con tu marca. Desbloquean recompensas patrocinadas.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="bg-amber-500/20 rounded-full h-12 w-12 flex items-center justify-center flex-shrink-0">
                  <span className="font-bold text-amber-500">4</span>
                </div>
                <div>
                  <h3 className="font-bold text-white mb-1">Análisis y Optimización</h3>
                  <p className="text-white/80">
                    Recibe insights detallados sobre el engagement, emociones y comportamientos de los usuarios.
                    Optimiza la experiencia en tiempo real.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h2 className="text-2xl font-bold text-white mb-6">Opciones de Integración</h2>
              <Card className="border-purple-500/50 bg-black/40 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-gradient-to-br from-pink-500/20 to-purple-500/20 rounded-lg border border-pink-500/30">
                      <h4 className="font-bold text-white mb-2">Cápsula Personalizada</h4>
                      <p className="text-sm text-white/70">
                        Crea una cápsula exclusiva para tu marca con preguntas, mecánicas y recompensas personalizadas.
                      </p>
                    </div>

                    <div className="p-4 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg border border-blue-500/30">
                      <h4 className="font-bold text-white mb-2">Patrocinio de Cápsula</h4>
                      <p className="text-sm text-white/70">
                        Patrocina una cápsula existente con tu branding y recompensas exclusivas.
                      </p>
                    </div>

                    <div className="p-4 bg-gradient-to-br from-green-500/20 to-purple-500/20 rounded-lg border border-green-500/30">
                      <h4 className="font-bold text-white mb-2">Activación en Eventos</h4>
                      <p className="text-sm text-white/70">
                        Implementa Brinda X en tus eventos para generar engagement y contenido viral.
                      </p>
                    </div>

                    <div className="p-4 bg-gradient-to-br from-amber-500/20 to-purple-500/20 rounded-lg border border-amber-500/30">
                      <h4 className="font-bold text-white mb-2">Integración API</h4>
                      <p className="text-sm text-white/70">
                        Integra la experiencia Brinda X en tus propias aplicaciones y plataformas.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-xl mb-16">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/90 to-pink-900/90 z-10"></div>
          <Image
            src="/placeholder.svg?height=400&width=1200"
            alt="Brinda X para Marcas"
            width={1200}
            height={400}
            className="object-cover w-full h-[400px]"
          />
          <div className="relative z-20 p-12">
            <h2 className="text-3xl font-bold text-white mb-4">Resultados que Puedes Esperar</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="bg-white/10 p-4 rounded-lg">
                <h3 className="text-2xl font-bold text-white mb-2">45%</h3>
                <p className="text-white/80">Incremento promedio en engagement</p>
              </div>

              <div className="bg-white/10 p-4 rounded-lg">
                <h3 className="text-2xl font-bold text-white mb-2">3.2M</h3>
                <p className="text-white/80">Impresiones orgánicas generadas</p>
              </div>

              <div className="bg-white/10 p-4 rounded-lg">
                <h3 className="text-2xl font-bold text-white mb-2">78%</h3>
                <p className="text-white/80">Tasa de conversión de recompensas</p>
              </div>
            </div>
            <Button asChild size="lg" className="bg-white text-purple-900 hover:bg-white/90">
              <Link href="/contacto">Contactar Ventas</Link>
            </Button>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-8">¿Listo para llevar tu marca al siguiente nivel?</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-90">
              <Link href="/contacto">Contactar Ventas</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-pink-500 text-white hover:bg-pink-500/20">
              <Link href="/capsulas">Explorar Cápsulas</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
