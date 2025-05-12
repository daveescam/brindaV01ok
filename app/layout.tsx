import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import ErrorBoundary from "@/components/error-boundary"
import { WalletProvider } from "@/components/wallet/wallet-provider"
import { WalletProviderMock } from "@/components/wallet/wallet-provider-mock"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Brinda X - Lotería Narrativa por Arquetipos",
  description: "Una experiencia emocional compartida a través de cartas y retos",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // Determinar si estamos en un entorno donde WalletProvider podría no estar disponible
  const isDemo = typeof window !== "undefined" && window.location.pathname.includes("/demo")

  return (
    <html lang="es">
      <body className={inter.className}>
        <ErrorBoundary>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
            {isDemo ? <WalletProviderMock>{children}</WalletProviderMock> : <WalletProvider>{children}</WalletProvider>}
            <Toaster />
          </ThemeProvider>
        </ErrorBoundary>
      </body>
    </html>
  )
}
