import type React from "react"
export default function VenueAdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="min-h-screen bg-gradient-to-b from-black to-purple-950">{children}</div>
}
