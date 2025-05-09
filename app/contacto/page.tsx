"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { Mail, Phone, MapPin } from "lucide-react"

export default function Contacto() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    interest: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, interest: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      toast({
        title: "Formulario enviado",
        description: "Nos pondremos en contacto contigo pronto.",
      })

      // Reset form
      setFormData({
        name: "",
        email: "",
        company: "",
        interest: "",
        message: "",
      })
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-purple-950">
      <div className="container mx-auto py-12">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4 text-white">Contacto</h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            ¿Listo para llevar el caos emocional a tu marca o venue? Contáctanos.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <Card className="border-purple-500/50 bg-black/40 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">Envíanos un mensaje</CardTitle>
              <CardDescription className="text-white/70">
                Completa el formulario y nos pondremos en contacto contigo pronto.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="grid gap-6">
                  <div className="grid gap-3">
                    <Label htmlFor="name" className="text-white">
                      Nombre
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Tu nombre"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="bg-black/40 border-purple-500/30"
                    />
                  </div>

                  <div className="grid gap-3">
                    <Label htmlFor="email" className="text-white">
                      Email
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="tu@email.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="bg-black/40 border-purple-500/30"
                    />
                  </div>

                  <div className="grid gap-3">
                    <Label htmlFor="company" className="text-white">
                      Empresa
                    </Label>
                    <Input
                      id="company"
                      name="company"
                      placeholder="Nombre de tu empresa"
                      value={formData.company}
                      onChange={handleChange}
                      className="bg-black/40 border-purple-500/30"
                    />
                  </div>

                  <div className="grid gap-3">
                    <Label htmlFor="interest" className="text-white">
                      Interés
                    </Label>
                    <Select value={formData.interest} onValueChange={handleSelectChange}>
                      <SelectTrigger className="bg-black/40 border-purple-500/30">
                        <SelectValue placeholder="Selecciona tu interés" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="brand">Integración de marca</SelectItem>
                        <SelectItem value="venue">Implementación en venue</SelectItem>
                        <SelectItem value="event">Activación en evento</SelectItem>
                        <SelectItem value="api">Integración API</SelectItem>
                        <SelectItem value="other">Otro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid gap-3">
                    <Label htmlFor="message" className="text-white">
                      Mensaje
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="¿Cómo podemos ayudarte?"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="min-h-[120px] bg-black/40 border-purple-500/30"
                    />
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter>
              <Button
                type="submit"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-90"
              >
                {isSubmitting ? "Enviando..." : "Enviar Mensaje"}
              </Button>
            </CardFooter>
          </Card>

          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Información de Contacto</h2>
            <div className="space-y-6 mb-8">
              <div className="flex gap-4">
                <div className="bg-pink-500/20 rounded-full h-12 w-12 flex items-center justify-center flex-shrink-0">
                  <Mail className="h-6 w-6 text-pink-500" />
                </div>
                <div>
                  <h3 className="font-bold text-white mb-1">Email</h3>
                  <p className="text-white/80">contacto@brindax.com</p>
                  <p className="text-white/80">ventas@brindax.com</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="bg-purple-500/20 rounded-full h-12 w-12 flex items-center justify-center flex-shrink-0">
                  <Phone className="h-6 w-6 text-purple-500" />
                </div>
                <div>
                  <h3 className="font-bold text-white mb-1">Teléfono</h3>
                  <p className="text-white/80">+52 (55) 1234 5678</p>
                  <p className="text-white/80">Lunes a Viernes, 9am - 6pm</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="bg-blue-500/20 rounded-full h-12 w-12 flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-6 w-6 text-blue-500" />
                </div>
                <div>
                  <h3 className="font-bold text-white mb-1">Oficina</h3>
                  <p className="text-white/80">Av. Insurgentes Sur 1602</p>
                  <p className="text-white/80">Col. Crédito Constructor, CDMX</p>
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-white mb-6">Preguntas Frecuentes</h2>
            <div className="space-y-4">
              <div className="p-4 bg-black/40 rounded-lg border border-purple-500/30">
                <h3 className="font-bold text-white mb-1">¿Cómo funciona la integración de marca?</h3>
                <p className="text-white/80 text-sm">
                  Personalizamos una cápsula emocional con tu branding, tono de voz y recompensas exclusivas.
                  Implementamos QR codes en tus espacios físicos o canales digitales.
                </p>
              </div>

              <div className="p-4 bg-black/40 rounded-lg border border-purple-500/30">
                <h3 className="font-bold text-white mb-1">¿Cuánto cuesta implementar Brinda X?</h3>
                <p className="text-white/80 text-sm">
                  Los precios varían según el tipo de integración, alcance y duración. Contáctanos para recibir una
                  cotización personalizada.
                </p>
              </div>

              <div className="p-4 bg-black/40 rounded-lg border border-purple-500/30">
                <h3 className="font-bold text-white mb-1">¿En qué ciudades operan?</h3>
                <p className="text-white/80 text-sm">
                  Actualmente operamos en Ciudad de México, Guadalajara, Monterrey y próximamente en otras ciudades de
                  Latinoamérica.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
