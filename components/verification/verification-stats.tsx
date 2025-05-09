"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Award, Zap, CheckCircle, Users } from "lucide-react"
import { loadVerificationSessions, calculateVerificationStats } from "@/lib/types/verification-engine"

export function VerificationStats() {
  const [stats, setStats] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Cargar sesiones de verificación y calcular estadísticas
    const sessions = loadVerificationSessions()
    const calculatedStats = calculateVerificationStats(sessions)
    setStats(calculatedStats)
    setLoading(false)
  }, [])

  if (loading) {
    return <div className="p-4 text-center">Cargando estadísticas...</div>
  }

  if (!stats) {
    return <div className="p-4 text-center">No hay estadísticas disponibles.</div>
  }

  // Calcular porcentajes
  const completionRate =
    stats.totalChallenges > 0 ? Math.round((stats.completedChallenges / stats.totalChallenges) * 100) : 0

  const socialTriggerRate =
    stats.completedChallenges > 0 ? Math.round((stats.socialTriggersActivated / stats.completedChallenges) * 100) : 0

  return (
    <Tabs defaultValue="overview" className="w-full">
      <TabsList className="grid grid-cols-3 mb-4">
        <TabsTrigger value="overview">Resumen</TabsTrigger>
        <TabsTrigger value="emotional">Emocional</TabsTrigger>
        <TabsTrigger value="social">Social</TabsTrigger>
      </TabsList>

      <TabsContent value="overview">
        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center">
                <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                Retos Completados
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.completedChallenges}</div>
              <p className="text-xs text-muted-foreground">de {stats.totalChallenges} intentados</p>
              <Progress value={completionRate} className="h-2 mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center">
                <Award className="h-4 w-4 mr-2 text-amber-500" />
                Puntos Ganados
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.pointsEarned}</div>
              <p className="text-xs text-muted-foreground">
                {stats.completedChallenges > 0
                  ? `${Math.round(stats.pointsEarned / stats.completedChallenges)} puntos por reto`
                  : "0 puntos por reto"}
              </p>
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      <TabsContent value="emotional">
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-medium flex items-center">
              <Zap className="h-5 w-5 mr-2 text-purple-500" />
              Intensidad Emocional
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center mb-4">
              <div className="flex-1">
                <Progress
                  value={stats.averageEmotionalIntensity}
                  className={`h-3 ${
                    stats.averageEmotionalIntensity < 15
                      ? "bg-blue-500"
                      : stats.averageEmotionalIntensity < 25
                        ? "bg-purple-500"
                        : "bg-red-500"
                  }`}
                />
              </div>
              <Badge className="ml-2" variant="outline">
                {stats.averageEmotionalIntensity.toFixed(1)}
              </Badge>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center text-sm">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-md">
                <div className="font-medium">Suave</div>
                <div className="text-xs text-muted-foreground">0-15</div>
              </div>
              <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-md">
                <div className="font-medium">Intenso</div>
                <div className="text-xs text-muted-foreground">15-25</div>
              </div>
              <div className="p-2 bg-red-100 dark:bg-red-900/20 rounded-md">
                <div className="font-medium">Caótico</div>
                <div className="text-xs text-muted-foreground">25+</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="social">
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-medium flex items-center">
              <Users className="h-5 w-5 mr-2 text-blue-500" />
              Activación Social
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <div className="text-2xl font-bold">{stats.socialTriggersActivated}</div>
              <Badge variant="outline" className="bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300">
                {socialTriggerRate}% de tasa de activación
              </Badge>
            </div>

            <div className="p-3 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <p className="text-sm">
                Los desencadenantes sociales aumentan la intensidad emocional y los puntos ganados, desbloqueando
                recompensas especiales.
              </p>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
