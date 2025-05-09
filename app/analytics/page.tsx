"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { VerificationStats } from "@/components/verification/verification-stats"
import { Sparkles, BarChart3, Wallet, Users, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function AnalyticsPage() {
  const [activeTab, setActiveTab] = useState("verification")

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-purple-950">
      <header className="container mx-auto py-6 flex justify-between items-center">
        <Link href="/" className="flex items-center text-white hover:text-pink-300 transition">
          <ArrowLeft className="h-5 w-5 mr-2" />
          Volver al Inicio
        </Link>

        <div className="flex items-center">
          <Sparkles className="h-6 w-6 text-pink-500 mr-2" />
          <h1 className="text-xl font-bold bg-gradient-to-r from-pink-500 to-yellow-500 text-transparent bg-clip-text">
            Brinda X
          </h1>
        </div>
      </header>

      <main className="container mx-auto py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-white mb-2">Analíticas</h1>
          <p className="text-white/70 mb-8">Visualiza tu progreso emocional y social en Brinda X</p>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid grid-cols-3 w-full max-w-md mx-auto">
              <TabsTrigger value="verification" className="flex items-center">
                <BarChart3 className="h-4 w-4 mr-2" />
                Verificación
              </TabsTrigger>
              <TabsTrigger value="wallet" className="flex items-center">
                <Wallet className="h-4 w-4 mr-2" />
                Recompensas
              </TabsTrigger>
              <TabsTrigger value="social" className="flex items-center">
                <Users className="h-4 w-4 mr-2" />
                Social
              </TabsTrigger>
            </TabsList>

            <TabsContent value="verification" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Estadísticas de Verificación</CardTitle>
                  <CardDescription>Análisis de tus retos completados y su impacto emocional</CardDescription>
                </CardHeader>
                <CardContent>
                  <VerificationStats />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="wallet" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Análisis de Recompensas</CardTitle>
                  <CardDescription>Estadísticas de tus recompensas y coleccionables</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">
                      Las estadísticas detalladas de recompensas estarán disponibles próximamente.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="social" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Impacto Social</CardTitle>
                  <CardDescription>Análisis de tu interacción social y desencadenantes activados</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">
                      Las estadísticas sociales detalladas estarán disponibles próximamente.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <footer className="bg-black/60 backdrop-blur-sm py-8 mt-12">
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
