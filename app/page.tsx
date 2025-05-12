import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Bienvenido a Brinda X
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  La plataforma de experiencias sociales que transforma tus salidas nocturnas
                </p>
              </div>
              <div className="space-x-4">
                <Button asChild size="lg">
                  <Link href="/demo">Ver Demos</Link>
                </Button>
                <Button variant="outline" size="lg">
                  <Link href="/como-funciona">Cómo Funciona</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Desafíos Sociales</h2>
                  <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                    Participa en desafíos emocionantes diseñados para crear momentos memorables con tus amigos.
                  </p>
                </div>
                <div>
                  <Button variant="link" asChild className="p-0">
                    <Link href="/demo/challenge-flow-basic">Probar Desafíos →</Link>
                  </Button>
                </div>
              </div>
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Recompensas Exclusivas</h2>
                  <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                    Gana recompensas digitales y físicas que puedes canjear en tus bares y restaurantes favoritos.
                  </p>
                </div>
                <div>
                  <Button variant="link" asChild className="p-0">
                    <Link href="/demo/wallet-basic">Ver Wallet →</Link>
                  </Button>
                </div>
              </div>
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Plantillas AI</h2>
                  <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                    Crea contenido personalizado con nuestras plantillas impulsadas por inteligencia artificial.
                  </p>
                </div>
                <div>
                  <Button variant="link" asChild className="p-0">
                    <Link href="/demo/plantillas-despecho">Explorar Plantillas →</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">© 2023 Brinda X. Todos los derechos reservados.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="/terminos">
            Términos
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="/privacidad">
            Privacidad
          </Link>
        </nav>
      </footer>
    </div>
  )
}
