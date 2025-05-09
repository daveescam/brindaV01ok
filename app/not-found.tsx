import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { FileQuestion } from "lucide-react"
import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-purple-950 flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-amber-500/50 bg-black/40 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-center gap-2">
            <FileQuestion className="h-6 w-6 text-amber-500" />
            <CardTitle className="text-white">Página No Encontrada</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="p-4 bg-amber-500/10 rounded-lg mb-4">
            <p className="text-white/80">La página que estás buscando no existe o ha sido movida.</p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button asChild>
            <Link href="/">Volver al Inicio</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
