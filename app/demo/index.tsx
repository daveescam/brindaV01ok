import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function DemoIndex() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Brinda X - Demos</h1>
      <p className="text-center mb-8 text-gray-500">Explora las diferentes funcionalidades de la plataforma Brinda X</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <DemoCard
          title="Flujo de Desafío"
          description="Experimenta el flujo completo de desafíos de Brinda X"
          link="/demo/challenge-flow-basic"
        />
        <DemoCard title="Wallet" description="Explora tu wallet con recompensas y stickers" link="/demo/wallet-basic" />
        <DemoCard
          title="100 Borrachos Dijeron"
          description="Juega al clásico juego de 100 Borrachos Dijeron"
          link="/juego/borrachos"
        />
        <DemoCard
          title="Plantillas de Despecho"
          description="Explora las plantillas de despecho generadas por IA"
          link="/demo/plantillas-despecho"
        />
        <DemoCard
          title="Arquetipos y Plantillas"
          description="Descubre cómo los arquetipos se integran con las plantillas"
          link="/demo/arquetipos-plantillas"
        />
        <DemoCard
          title="Smartlinks y Plantillas"
          description="Explora la integración de smartlinks con plantillas"
          link="/demo/smartlink-plantillas"
        />
      </div>
    </div>
  )
}

function DemoCard({ title, description, link }: { title: string; description: string; link: string }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-32 bg-gray-100 dark:bg-gray-800 rounded-md flex items-center justify-center">
          <span className="text-gray-500">Vista previa</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full">
          <Link href={link}>Ver Demo</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
