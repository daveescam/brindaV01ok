"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Sparkles,
  BarChart3,
  QrCode,
  ArrowLeft,
  Users,
  Wine,
  Heart,
  Briefcase,
  Flame,
  Trophy,
  Utensils,
} from "lucide-react"
import Link from "next/link"

// Tipos
interface VenueDetails {
  id: string
  name: string
  location: string
  activeSessions: number
  totalSessions: number
  activeUsers: number
  totalUsers: number
  totalInteractions: number
  activeCampaigns: number
  totalCampaigns: number
}

interface SessionStats {
  date: string
  sessions: number
  users: number
  interactions: number
}

interface CapsuleStats {
  id: string
  name: string
  sessions: number
  users: number
  interactions: number
  completionRate: number
}

// Datos de ejemplo
const mockVenueDetails: VenueDetails = {
  id: "venue_1",
  name: "La Cortesía CDMX",
  location: "Ciudad de México",
  activeSessions: 3,
  totalSessions: 156,
  activeUsers: 24,
  totalUsers: 1872,
  totalInteractions: 5243,
  activeCampaigns: 2,
  totalCampaigns: 8,
}

const mockSessionStats: SessionStats[] = [
  { date: "Lun", sessions: 12, users: 48, interactions: 156 },
  { date: "Mar", sessions: 15, users: 62, interactions: 203 },
  { date: "Mié", sessions: 18, users: 75, interactions: 245 },
  { date: "Jue", sessions: 25, users: 104, interactions: 342 },
  { date: "Vie", sessions: 32, users: 145, interactions: 478 },
  { date: "Sáb", sessions: 38, users: 172, interactions: 564 },
  { date: "Dom", sessions: 16, users: 68, interactions: 223 },
]

const mockCapsuleStats: CapsuleStats[] = [
  { id: "borrachos", name: "100 Borrachos Dijeron™", sessions: 78, users: 312, interactions: 2340, completionRate: 87 },
  { id: "despecho", name: "Ritual Despecho™", sessions: 45, users: 180, interactions: 1350, completionRate: 82 },
  { id: "linkedin", name: "LinkedIn Caótico™", sessions: 23, users: 92, interactions: 690, completionRate: 75 },
  { id: "mundial", name: "Fiesta Mundial™", sessions: 10, users: 40, interactions: 300, completionRate: 90 },
]

// Mapeo de íconos para cápsulas
const capsuleIcons: Record<string, React.ReactNode> = {
  borrachos: <Wine className="h-5 w-5 text-pink-500" />,
  despecho: <Heart className="h-5 w-5 text-red-500" />,
  linkedin: <Briefcase className="h-5 w-5 text-blue-500" />,
  mundial: <Flame className="h-5 w-5 text-orange-500" />,
  regios: <Trophy className="h-5 w-5 text-amber-500" />,
  foodies: <Utensils className="h-5 w-5 text-yellow-500" />,
}

export default function VenueDetailsPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [venueDetails, setVenueDetails] = useState<VenueDetails>(mockVenueDetails)
  const [sessionStats, setSessionStats] = useState<SessionStats[]>(mockSessionStats)
  const [capsuleStats, setCapsuleStats] = useState<CapsuleStats[]>(mockCapsuleStats)

  // En una implementación real, aquí cargaríamos los datos del venue desde una API
  useEffect(() => {
    // Simulamos la carga de datos
    console.log(`Loading venue details for ID: ${params.id}`)
  }, [params.id])

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-purple-950 text-white">
      <header className="container mx-auto py-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/10"
            onClick={() => router.push("/venue-admin")}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-yellow-500 text-transparent bg-clip-text">
              {venueDetails.name}
            </h1>
            <p className="text-sm text-white/60">{venueDetails.location}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Button asChild variant="outline" className="border-pink-500 text-white hover:bg-pink-500/20">
            <Link href={`/venue-admin/${params.id}/tables`}>Gestionar Mesas</Link>
          </Button>
          <Button asChild className="bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-90">
            <Link href={`/venue-admin/${params.id}/campaigns`}>Ver Campañas</Link>
          </Button>
        </div>
      </header>

      <main className="container mx-auto py-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-black/40 border-purple-500/50 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-white text-lg">Sesiones Activas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <QrCode className="h-5 w-5 text-purple-500" />
                  <span className="text-white/80">Ahora</span>
                </div>
                <span className="text-2xl font-bold text-white">{venueDetails.activeSessions}</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/40 border-pink-500/50 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-white text-lg">Usuarios Activos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-pink-500" />
                  <span className="text-white/80">Ahora</span>
                </div>
                <span className="text-2xl font-bold text-white">{venueDetails.activeUsers}</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/40 border-amber-500/50 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-white text-lg">Campañas Activas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-amber-500" />
                  <span className="text-white/80">Total</span>
                </div>
                <span className="text-2xl font-bold text-white">{venueDetails.activeCampaigns}</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/40 border-green-500/50 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-white text-lg">Interacciones</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-green-500" />
                  <span className="text-white/80">Total</span>
                </div>
                <span className="text-2xl font-bold text-white">{venueDetails.totalInteractions}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="mb-8">
          <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto">
            <TabsTrigger value="overview">Resumen</TabsTrigger>
            <TabsTrigger value="sessions">Sesiones</TabsTrigger>
            <TabsTrigger value="capsules">Cápsulas</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-black/40 border-purple-500/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">Actividad Semanal</CardTitle>
                  <CardDescription className="text-white/60">
                    Sesiones e interacciones de los últimos 7 días
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80 flex items-center justify-center">
                    <p className="text-white/60">Gráfico de actividad semanal</p>
                    {/* Aquí iría un gráfico de actividad */}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-black/40 border-purple-500/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">Popularidad de Cápsulas</CardTitle>
                  <CardDescription className="text-white/60">Distribución de uso por tipo de cápsula</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80 flex items-center justify-center">
                    <p className="text-white/60">Gráfico de popularidad de cápsulas</p>
                    {/* Aquí iría un gráfico de popularidad */}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="sessions" className="mt-6">
            <Card className="bg-black/40 border-purple-500/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Estadísticas de Sesiones</CardTitle>
                <CardDescription className="text-white/60">Desglose de sesiones por día</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-purple-500/30">
                        <th className="text-left py-3 px-4 text-white/80">Día</th>
                        <th className="text-center py-3 px-4 text-white/80">Sesiones</th>
                        <th className="text-center py-3 px-4 text-white/80">Usuarios</th>
                        <th className="text-center py-3 px-4 text-white/80">Interacciones</th>
                        <th className="text-right py-3 px-4 text-white/80">Promedio</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sessionStats.map((stat) => (
                        <tr key={stat.date} className="border-b border-purple-500/10">
                          <td className="py-3 px-4 text-white">{stat.date}</td>
                          <td className="py-3 px-4 text-center text-white">{stat.sessions}</td>
                          <td className="py-3 px-4 text-center text-white">{stat.users}</td>
                          <td className="py-3 px-4 text-center text-white">{stat.interactions}</td>
                          <td className="py-3 px-4 text-right text-white">
                            {Math.round(stat.interactions / stat.sessions)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr className="border-t border-purple-500/30">
                        <td className="py-3 px-4 font-medium text-white">Total</td>
                        <td className="py-3 px-4 text-center font-medium text-white">
                          {sessionStats.reduce((sum, stat) => sum + stat.sessions, 0)}
                        </td>
                        <td className="py-3 px-4 text-center font-medium text-white">
                          {sessionStats.reduce((sum, stat) => sum + stat.users, 0)}
                        </td>
                        <td className="py-3 px-4 text-center font-medium text-white">
                          {sessionStats.reduce((sum, stat) => sum + stat.interactions, 0)}
                        </td>
                        <td className="py-3 px-4 text-right font-medium text-white">
                          {Math.round(
                            sessionStats.reduce((sum, stat) => sum + stat.interactions, 0) /
                              sessionStats.reduce((sum, stat) => sum + stat.sessions, 0),
                          )}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="capsules" className="mt-6">
            <Card className="bg-black/40 border-purple-500/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Rendimiento por Cápsula</CardTitle>
                <CardDescription className="text-white/60">Estadísticas de uso por tipo de cápsula</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {capsuleStats.map((capsule) => (
                    <div key={capsule.id} className="p-4 rounded-lg border border-purple-500/20 bg-purple-500/5">
                      <div className="flex items-center gap-3 mb-4">
                        {capsuleIcons[capsule.id]}
                        <h3 className="text-lg font-medium text-white">{capsule.name}</h3>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                          <p className="text-sm text-white/60">Sesiones</p>
                          <p className="text-xl font-medium text-white">{capsule.sessions}</p>
                        </div>
                        <div>
                          <p className="text-sm text-white/60">Usuarios</p>
                          <p className="text-xl font-medium text-white">{capsule.users}</p>
                        </div>
                        <div>
                          <p className="text-sm text-white/60">Interacciones</p>
                          <p className="text-xl font-medium text-white">{capsule.interactions}</p>
                        </div>
                        <div>
                          <p className="text-sm text-white/60">Tasa de Completado</p>
                          <p className="text-xl font-medium text-white">{capsule.completionRate}%</p>
                        </div>
                      </div>

                      <div className="mt-4">
                        <div className="h-2 bg-black/40 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-pink-500 to-purple-600"
                            style={{ width: `${capsule.completionRate}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
