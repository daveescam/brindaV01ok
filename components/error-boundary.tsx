"use client"

import { Component, type ErrorInfo, type ReactNode } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertTriangle, RefreshCw, Home } from "lucide-react"
import Link from "next/link"

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
  errorInfo: ErrorInfo | null
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    this.setState({ errorInfo })

    // Aquí podrías enviar el error a un servicio de monitoreo como Sentry
    console.error("Error capturado por ErrorBoundary:", error, errorInfo)
  }

  private handleReset = (): void => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    })
  }

  public render(): ReactNode {
    if (this.state.hasError) {
      // Puedes personalizar el fallback UI
      return (
        this.props.fallback || (
          <div className="min-h-screen bg-gradient-to-b from-black to-purple-950 flex items-center justify-center p-4">
            <Card className="w-full max-w-md border-red-500/50 bg-black/40 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-6 w-6 text-red-500" />
                  <CardTitle className="text-white">Algo salió mal</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="p-4 bg-red-500/10 rounded-lg mb-4">
                  <p className="text-white/80">{this.state.error?.message || "Ha ocurrido un error inesperado."}</p>
                  {this.state.error?.stack && (
                    <details className="mt-2">
                      <summary className="text-sm text-white/50 cursor-pointer">Ver detalles técnicos</summary>
                      <pre className="mt-2 text-xs text-white/50 overflow-auto p-2 bg-black/50 rounded">
                        {this.state.error.stack}
                      </pre>
                    </details>
                  )}
                </div>
                {this.state.errorInfo && (
                  <details className="mt-2">
                    <summary className="text-sm text-white/50 cursor-pointer">Información del componente</summary>
                    <pre className="mt-2 text-xs text-white/50 overflow-auto p-2 bg-black/50 rounded">
                      {this.state.errorInfo.componentStack}
                    </pre>
                  </details>
                )}
              </CardContent>
              <CardFooter className="flex gap-4 justify-end">
                <Button variant="outline" asChild>
                  <Link href="/">
                    <Home className="mr-2 h-4 w-4" />
                    Inicio
                  </Link>
                </Button>
                <Button onClick={this.handleReset}>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Reintentar
                </Button>
              </CardFooter>
            </Card>
          </div>
        )
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
