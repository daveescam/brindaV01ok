"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="flex space-x-2 lg:space-x-3">
      <NavItem href="/" current={pathname === "/"}>
        Inicio
      </NavItem>
      <NavItem href="/cards" current={pathname === "/cards"}>
        Cards
      </NavItem>
      <NavItem href="/session" current={pathname === "/session"}>
        Sessions
      </NavItem>
      <NavItem href="/wallet" current={pathname.startsWith("/wallet")}>
        Wallet
      </NavItem>
      <NavItem href="/plantillas" current={pathname.startsWith("/plantillas")}>
        Plantillas
      </NavItem>
      <NavItem href="/demo/plantillas-despecho" current={pathname.startsWith("/demo/plantillas-despecho")}>
        Demo
      </NavItem>
    </nav>
  )
}

function NavItem({
  href,
  current,
  children,
}: {
  href: string
  current: boolean
  children: React.ReactNode
}) {
  return (
    <Link href={href} passHref>
      <Button
        variant={current ? "default" : "ghost"}
        className={cn("h-9 rounded-lg px-3", current && "bg-gradient-to-r from-pink-500 to-purple-600 text-white")}
      >
        {children}
      </Button>
    </Link>
  )
}
