"use client"

import { useState } from "react"
import Link from "next/link"
import { CAPSULES } from "@/lib/types/dynamic-capsule"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function CapsulasPage() {
  const [venue, setVenue] = useState("")
  const [event, setEvent] = useState("")
  const [dayOfWeek, setDayOfWeek] = useState("")

  // Get current time in HH:MM format
  const now = new Date()
  const hours = now.getHours().toString().padStart(2, "0")
  const minutes = now.getMinutes().toString().padStart(2, "0")
  const currentTime = `${hours}:${minutes}`

  const getCardStyle = (index: number) => {
    const styles = [
      "bg-gradient-to-br from-purple-900/40 to-pink-900/40 border-purple-500/30",
      "bg-gradient-to-br from-amber-900/40 to-red-900/40 border-amber-500/30",
      "bg-gradient-to-br from-blue-900/40 to-cyan-900/40 border-blue-500/30",
      "bg-gradient-to-br from-green-900/40 to-emerald-900/40 border-green-500/30",
    ]
    return styles[index % styles.length]
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-white mb-6">Cápsulas Emocionales</h1>

      <Card className="mb-8 bg-black/40 border-white/10">
        <CardHeader>
          <CardTitle className="text-white">Filtrar Cápsulas</CardTitle>
          <CardDescription className="text-white/70">
            Selecciona el contexto para activar cápsulas específicas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="venue" className="text-white">
                Venue
              </Label>
              <Input
                id="venue"
                placeholder="ej: mty, bar, oficina"
                value={venue}
                onChange={(e) => setVenue(e.target.value)}
                className="bg-black/30 border-white/20 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="event" className="text-white">
                Evento
              </Label>
              <Input
                id="event"
                placeholder="ej: partido-futbol, fiesta"
                value={event}
                onChange={(e) => setEvent(e.target.value)}
                className="bg-black/30 border-white/20 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dayOfWeek" className="text-white">
                Día de la Semana
              </Label>
              <Select value={dayOfWeek} onValueChange={setDayOfWeek}>
                <SelectTrigger className="bg-black/30 border-white/20 text-white">
                  <SelectValue placeholder="Selecciona un día" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="lunes">Lunes</SelectItem>
                  <SelectItem value="martes">Martes</SelectItem>
                  <SelectItem value="miércoles">Miércoles</SelectItem>
                  <SelectItem value="jueves">Jueves</SelectItem>
                  <SelectItem value="viernes">Viernes</SelectItem>
                  <SelectItem value="sábado">Sábado</SelectItem>
                  <SelectItem value="domingo">Domingo</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {CAPSULES.map((capsule, index) => (
          <Card key={capsule.id} className={`${getCardStyle(index)} overflow-hidden`}>
            <CardHeader className="bg-black/30">
              <CardTitle className="text-white">{capsule.name}</CardTitle>
              <CardDescription className="text-white/70">
                {capsule.theme} • {capsule.emotionCore}
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-3 text-sm">
                <div>
                  <span className="text-white/70">Estilo Visual:</span>
                  <span className="text-white ml-2">{capsule.visualStyle}</span>
                </div>
                <div>
                  <span className="text-white/70">Venues:</span>
                  <span className="text-white ml-2">{capsule.triggerContext.venues.join(", ")}</span>
                </div>
                <div>
                  <span className="text-white/70">Eventos:</span>
                  <span className="text-white ml-2">{capsule.triggerContext.events.join(", ")}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="bg-black/20 border-t border-white/10">
              <Link
                href={`/capsulas/${capsule.id}?venue=${venue}&event=${event}&dayOfWeek=${dayOfWeek}&currentTime=${currentTime}`}
                className="w-full"
              >
                <Button
                  variant="default"
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                >
                  Activar Cápsula
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
