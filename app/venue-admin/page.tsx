"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  Sparkles,
  BarChart3,
  QrCode,
  Table,
  Users,
  Wine,
  Heart,
  Briefcase,
  Flame,
  Trophy,
  Utensils,
  Plus,
  Trash,
  Edit,
  Download,
  RefreshCw,
} from "lucide-react"
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

// Tipos
interface Venue {
  id: string
  name: string
  location: string
  tables: TableType[]
  campaigns: Campaign[]
  activeSessions: number
  totalSessions: number
}

interface TableType {
  id: string
  name: string
  capacity: number
  isActive: boolean
  qrCodeUrl?: string
  activeSessions: number
}

interface Campaign {
  id: string
  name: string
  brandName: string
  startDate: Date
  endDate: Date
  status: "active" | "scheduled" | "completed" | "draft"
  allowedCapsules: string[]
  allowedEmotionalTiers: string[]
  prohibitedThemes: string[]
  tables: string[]
  totalInteractions: number
}

interface Session {
  id: string
  tableId: string
  tableName: string
  capsuleType: string
  startTime: Date
  participants: number
  status: "active" | "completed"
  completedChallenges: number
}

// Datos de ejemplo
const mockVenue: Venue = {
  id: "venue_1",
  name: "La Cortesía CDMX",
  location: "Ciudad de México",
  tables: [
    { id: "table_1", name: "Mesa 1", capacity: 6, isActive: true, activeSessions: 1 },
    { id: "table_2", name: "Mesa 2", capacity: 4, isActive: true, activeSessions: 0 },
    { id: "table_3", name: "Mesa 3", capacity: 8, isActive: true, activeSessions: 1 },
    { id: "table_4", name: "Mesa 4", capacity: 4, isActive: false, activeSessions: 0 },
    { id: "table_5", name: "Mesa 5", capacity: 6, isActive: true, activeSessions: 0 },
    { id: "table_6", name: "Mesa VIP", capacity: 10, isActive: true, activeSessions: 1 },
  ],
  campaigns: [
    {
      id: "campaign_1",
      name: "Verano Bacardi 2025",
      brandName: "Bacardi",
      startDate: new Date("2025-06-01"),
      endDate: new Date("2025-08-31"),
      status: "active",
      allowedCapsules: ["borrachos", "despecho"],
      allowedEmotionalTiers: ["mild", "intense"],
      prohibitedThemes: ["sexual", "political"],
      tables: ["table_1", "table_2", "table_3"],
      totalInteractions: 1245,
    },
    {
      id: "campaign_2",
      name: "Noche de Tequila",
      brandName: "José Cuervo",
      startDate: new Date("2025-05-15"),
      endDate: new Date("2025-06-15"),
      status: "scheduled",
      allowedCapsules: ["borrachos"],
      allowedEmotionalTiers: ["mild", "intense", "chaotic"],
      prohibitedThemes: ["drugs"],
      tables: ["table_4", "table_5", "table_6"],
      totalInteractions: 0,
    },
    {
      id: "campaign_3",
      name: "After Office LinkedIn",
      brandName: "Microsoft",
      startDate: new Date("2025-04-01"),
      endDate: new Date("2025-04-30"),
      status: "completed",
      allowedCapsules: ["linkedin"],
      allowedEmotionalTiers: ["mild", "intense"],
      prohibitedThemes: ["sexual", "offensive"],
      tables: ["table_1", "table_2"],
      totalInteractions: 3872,
    },
  ],
  activeSessions: 3,
  totalSessions: 156,
}

const mockSessions: Session[] = [
  {
    id: "session_1",
    tableId: "table_1",
    tableName: "Mesa 1",
    capsuleType: "borrachos",
    startTime: new Date(Date.now() - 45 * 60 * 1000), // 45 minutos atrás
    participants: 5,
    status: "active",
    completedChallenges: 12,
  },
  {
    id: "session_2",
    tableId: "table_3",
    tableName: "Mesa 3",
    capsuleType: "despecho",
    startTime: new Date(Date.now() - 20 * 60 * 1000), // 20 minutos atrás
    participants: 4,
    status: "active",
    completedChallenges: 8,
  },
  {
    id: "session_3",
    tableId: "table_6",
    tableName: "Mesa VIP",
    capsuleType: "linkedin",
    startTime: new Date(Date.now() - 10 * 60 * 1000), // 10 minutos atrás
    participants: 7,
    status: "active",
    completedChallenges: 5,
  },
  {
    id: "session_4",
    tableId: "table_2",
    tableName: "Mesa 2",
    capsuleType: "borrachos",
    startTime: new Date(Date.now() - 120 * 60 * 1000), // 2 horas atrás
    participants: 3,
    status: "completed",
    completedChallenges: 15,
  },
]

// Mapeo de íconos para cápsulas
const capsuleIcons: Record<string, React.ReactNode> = {
  borrachos: <Wine className="h-5 w-5 text-pink-500" />,
  despecho: <Heart className="h-5 w-5 text-red-500" />,
  linkedin: <Briefcase className="h-5 w-5 text-blue-500" />,
  mundial: <Flame className="h-5 w-5 text-orange-500" />,
  regios: <Trophy className="h-5 w-5 text-amber-500" />,
  foodies: <Utensils className="h-5 w-5 text-yellow-500" />,
}

// Componente principal
export default function VenueAdminPage() {
  const router = useRouter()
  const [venue, setVenue] = useState<Venue>(mockVenue)
  const [sessions, setSessions] = useState<Session[]>(mockSessions)
  const [activeTab, setActiveTab] = useState("dashboard")

  // Estados para diálogos
  const [showAddTableDialog, setShowAddTableDialog] = useState(false)
  const [showAddCampaignDialog, setShowAddCampaignDialog] = useState(false)
  const [showEditTableDialog, setShowEditTableDialog] = useState(false)
  const [showEditCampaignDialog, setShowEditCampaignDialog] = useState(false)

  // Estados para formularios
  const [newTable, setNewTable] = useState<Partial<TableType>>({ name: "", capacity: 4, isActive: true })
  const [editingTable, setEditingTable] = useState<TableType | null>(null)
  const [newCampaign, setNewCampaign] = useState<Partial<Campaign>>({
    name: "",
    brandName: "",
    allowedCapsules: ["borrachos"],
    allowedEmotionalTiers: ["mild", "intense"],
    prohibitedThemes: [],
    tables: [],
    status: "draft",
  })
  const [editingCampaign, setEditingCampaign] = useState<Campaign | null>(null)

  // Opciones para selects
  const capsules = [
    { id: "borrachos", name: "100 Borrachos Dijeron™" },
    { id: "despecho", name: "Ritual Despecho™" },
    { id: "linkedin", name: "LinkedIn Caótico™" },
    { id: "mundial", name: "Fiesta Mundial™" },
    { id: "regios", name: "100 Regios Dijeron™" },
    { id: "foodies", name: "100 Foodies Dijeron™" },
  ]

  const themes = [
    { id: "sexual", name: "Contenido Sexual" },
    { id: "political", name: "Política" },
    { id: "religious", name: "Religión" },
    { id: "offensive", name: "Lenguaje Ofensivo" },
    { id: "drugs", name: "Drogas Ilícitas" },
  ]

  // Manejadores para tablas
  const handleAddTable = () => {
    if (!newTable.name) return

    const table: TableType = {
      id: `table_${Date.now()}`,
      name: newTable.name,
      capacity: newTable.capacity || 4,
      isActive: newTable.isActive !== false,
      activeSessions: 0,
    }

    setVenue({
      ...venue,
      tables: [...venue.tables, table],
    })

    setNewTable({ name: "", capacity: 4, isActive: true })
    setShowAddTableDialog(false)
  }

  const handleEditTable = () => {
    if (!editingTable) return

    setVenue({
      ...venue,
      tables: venue.tables.map((table) => (table.id === editingTable.id ? editingTable : table)),
    })

    setEditingTable(null)
    setShowEditTableDialog(false)
  }

  const handleDeleteTable = (tableId: string) => {
    setVenue({
      ...venue,
      tables: venue.tables.filter((table) => table.id !== tableId),
    })
  }

  // Manejadores para campañas
  const handleAddCampaign = () => {
    if (!newCampaign.name || !newCampaign.brandName) return

    const campaign: Campaign = {
      id: `campaign_${Date.now()}`,
      name: newCampaign.name,
      brandName: newCampaign.brandName,
      startDate: new Date(),
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 días después
      status: newCampaign.status as "active" | "scheduled" | "completed" | "draft",
      allowedCapsules: newCampaign.allowedCapsules || ["borrachos"],
      allowedEmotionalTiers: newCampaign.allowedEmotionalTiers || ["mild", "intense"],
      prohibitedThemes: newCampaign.prohibitedThemes || [],
      tables: newCampaign.tables || [],
      totalInteractions: 0,
    }

    setVenue({
      ...venue,
      campaigns: [...venue.campaigns, campaign],
    })

    setNewCampaign({
      name: "",
      brandName: "",
      allowedCapsules: ["borrachos"],
      allowedEmotionalTiers: ["mild", "intense"],
      prohibitedThemes: [],
      tables: [],
      status: "draft",
    })
    setShowAddCampaignDialog(false)
  }

  const handleEditCampaign = () => {
    if (!editingCampaign) return

    setVenue({
      ...venue,
      campaigns: venue.campaigns.map((campaign) => (campaign.id === editingCampaign.id ? editingCampaign : campaign)),
    })

    setEditingCampaign(null)
    setShowEditCampaignDialog(false)
  }

  const handleDeleteCampaign = (campaignId: string) => {
    setVenue({
      ...venue,
      campaigns: venue.campaigns.filter((campaign) => campaign.id !== campaignId),
    })
  }

  // Generar QR para una mesa
  const generateQrCode = (tableId: string) => {
    const updatedTables = venue.tables.map((table) => {
      if (table.id === tableId) {
        const qrData = `https://brindax.com/join?venue=${venue.id}&table=${tableId}`
        const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(qrData)}`
        return { ...table, qrCodeUrl }
      }
      return table
    })

    setVenue({
      ...venue,
      tables: updatedTables,
    })
  }

  // Formatear fecha
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("es-MX", {
      day: "numeric",
      month: "short",
      year: "numeric",
    })
  }

  // Formatear hora
  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString("es-MX", {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  // Formatear duración
  const formatDuration = (startTime: Date) => {
    const diffMs = Date.now() - new Date(startTime).getTime()
    const diffMins = Math.floor(diffMs / 60000)

    if (diffMins < 60) {
      return `${diffMins} min`
    } else {
      const hours = Math.floor(diffMins / 60)
      const mins = diffMins % 60
      return `${hours}h ${mins}m`
    }
  }

  // Obtener color de estado para campañas
  const getCampaignStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500"
      case "scheduled":
        return "bg-blue-500"
      case "completed":
        return "bg-gray-500"
      case "draft":
        return "bg-amber-500"
      default:
        return "bg-gray-500"
    }
  }

  // Obtener texto de estado para campañas
  const getCampaignStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "Activa"
      case "scheduled":
        return "Programada"
      case "completed":
        return "Completada"
      case "draft":
        return "Borrador"
      default:
        return status
    }
  }

  return (
    <SidebarProvider>
      <div className="flex h-screen bg-gradient-to-b from-black to-purple-950 text-white">
        <Sidebar variant="sidebar" className="border-r border-purple-900/50">
          <SidebarHeader className="px-6 py-4">
            <div className="flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-pink-500" />
              <h1 className="text-xl font-bold bg-gradient-to-r from-pink-500 to-yellow-500 text-transparent bg-clip-text">
                Brinda X
              </h1>
            </div>
            <p className="text-xs text-white/60 mt-1">Panel de Administración</p>
          </SidebarHeader>

          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>General</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton isActive={activeTab === "dashboard"} onClick={() => setActiveTab("dashboard")}>
                      <BarChart3 className="h-5 w-5" />
                      <span>Dashboard</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton isActive={activeTab === "tables"} onClick={() => setActiveTab("tables")}>
                      <Table className="h-5 w-5" />
                      <span>Mesas</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton isActive={activeTab === "campaigns"} onClick={() => setActiveTab("campaigns")}>
                      <Sparkles className="h-5 w-5" />
                      <span>Campañas</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton isActive={activeTab === "sessions"} onClick={() => setActiveTab("sessions")}>
                      <Users className="h-5 w-5" />
                      <span>Sesiones</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup>
              <SidebarGroupLabel>Cápsulas</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {capsules.map((capsule) => (
                    <SidebarMenuItem key={capsule.id}>
                      <SidebarMenuButton>
                        {capsuleIcons[capsule.id]}
                        <span>{capsule.name}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter className="px-6 py-4">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src="/placeholder.svg?height=40&width=40" />
                <AvatarFallback>LC</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">{venue.name}</p>
                <p className="text-xs text-white/60">{venue.location}</p>
              </div>
            </div>
          </SidebarFooter>
        </Sidebar>

        <div className="flex-1 overflow-auto">
          <header className="sticky top-0 z-10 bg-black/50 backdrop-blur-md border-b border-purple-900/50 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <SidebarTrigger />
              <h1 className="text-xl font-semibold">
                {activeTab === "dashboard" && "Dashboard"}
                {activeTab === "tables" && "Gestión de Mesas"}
                {activeTab === "campaigns" && "Gestión de Campañas"}
                {activeTab === "sessions" && "Sesiones Activas"}
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" className="border-pink-500 text-white hover:bg-pink-500/20">
                <RefreshCw className="h-4 w-4 mr-2" />
                Actualizar
              </Button>
              <Button className="bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-90">
                <Plus className="h-4 w-4 mr-2" />
                {activeTab === "tables" && "Nueva Mesa"}
                {activeTab === "campaigns" && "Nueva Campaña"}
                {activeTab === "dashboard" && "Nuevo Reporte"}
                {activeTab === "sessions" && "Filtrar"}
              </Button>
            </div>
          </header>

          <main className="p-6">
            {/* Dashboard */}
            {activeTab === "dashboard" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="bg-black/40 border-purple-500/50 backdrop-blur-sm">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-white text-lg">Mesas Activas</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Table className="h-5 w-5 text-purple-500" />
                          <span className="text-white/80">Total</span>
                        </div>
                        <span className="text-2xl font-bold text-white">
                          {venue.tables.filter((t) => t.isActive).length}/{venue.tables.length}
                        </span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-black/40 border-pink-500/50 backdrop-blur-sm">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-white text-lg">Sesiones Activas</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Users className="h-5 w-5 text-pink-500" />
                          <span className="text-white/80">Ahora</span>
                        </div>
                        <span className="text-2xl font-bold text-white">{venue.activeSessions}</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-black/40 border-amber-500/50 backdrop-blur-sm">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-white text-lg">Campañas Activas</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Sparkles className="h-5 w-5 text-amber-500" />
                          <span className="text-white/80">Total</span>
                        </div>
                        <span className="text-2xl font-bold text-white">
                          {venue.campaigns.filter((c) => c.status === "active").length}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card className="bg-black/40 border-purple-500/50 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="text-white">Sesiones Activas</CardTitle>
                      <CardDescription className="text-white/60">Sesiones en curso en este momento</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {sessions
                          .filter((s) => s.status === "active")
                          .map((session) => (
                            <div
                              key={session.id}
                              className="flex items-center justify-between p-3 rounded-lg border border-purple-500/20 bg-purple-500/5"
                            >
                              <div className="flex items-center gap-3">
                                {capsuleIcons[session.capsuleType]}
                                <div>
                                  <p className="font-medium">{session.tableName}</p>
                                  <p className="text-sm text-white/60">
                                    {formatTime(session.startTime)} · {formatDuration(session.startTime)}
                                  </p>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="font-medium">{session.participants} participantes</p>
                                <p className="text-sm text-white/60">{session.completedChallenges} retos</p>
                              </div>
                            </div>
                          ))}

                        {sessions.filter((s) => s.status === "active").length === 0 && (
                          <div className="text-center py-6 text-white/60">
                            <p>No hay sesiones activas en este momento</p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-black/40 border-pink-500/50 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="text-white">Campañas Activas</CardTitle>
                      <CardDescription className="text-white/60">Campañas en curso actualmente</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {venue.campaigns
                          .filter((c) => c.status === "active")
                          .map((campaign) => (
                            <div
                              key={campaign.id}
                              className="flex items-center justify-between p-3 rounded-lg border border-pink-500/20 bg-pink-500/5"
                            >
                              <div>
                                <p className="font-medium">{campaign.name}</p>
                                <p className="text-sm text-white/60">{campaign.brandName}</p>
                              </div>
                              <div className="text-right">
                                <p className="font-medium">{campaign.totalInteractions} interacciones</p>
                                <p className="text-sm text-white/60">
                                  {formatDate(campaign.startDate)} - {formatDate(campaign.endDate)}
                                </p>
                              </div>
                            </div>
                          ))}

                        {venue.campaigns.filter((c) => c.status === "active").length === 0 && (
                          <div className="text-center py-6 text-white/60">
                            <p>No hay campañas activas en este momento</p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {/* Gestión de Mesas */}
            {activeTab === "tables" && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">Mesas de {venue.name}</h2>
                  <Dialog open={showAddTableDialog} onOpenChange={setShowAddTableDialog}>
                    <DialogTrigger asChild>
                      <Button className="bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-90">
                        <Plus className="h-4 w-4 mr-2" />
                        Nueva Mesa
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-black/90 border-purple-500/50 text-white">
                      <DialogHeader>
                        <DialogTitle>Añadir Nueva Mesa</DialogTitle>
                        <DialogDescription className="text-white/60">
                          Crea una nueva mesa para tu venue.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                          <Label htmlFor="tableName">Nombre de la Mesa</Label>
                          <Input
                            id="tableName"
                            placeholder="Ej: Mesa VIP"
                            className="bg-black/40 border-purple-500/30 text-white"
                            value={newTable.name}
                            onChange={(e) => setNewTable({ ...newTable, name: e.target.value })}
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="tableCapacity">Capacidad</Label>
                          <Input
                            id="tableCapacity"
                            type="number"
                            min="1"
                            max="20"
                            className="bg-black/40 border-purple-500/30 text-white"
                            value={newTable.capacity}
                            onChange={(e) => setNewTable({ ...newTable, capacity: Number.parseInt(e.target.value) })}
                          />
                        </div>
                        <div className="flex items-center gap-2">
                          <Switch
                            id="tableActive"
                            checked={newTable.isActive}
                            onCheckedChange={(checked) => setNewTable({ ...newTable, isActive: checked })}
                          />
                          <Label htmlFor="tableActive">Mesa Activa</Label>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setShowAddTableDialog(false)}>
                          Cancelar
                        </Button>
                        <Button
                          className="bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-90"
                          onClick={handleAddTable}
                        >
                          Añadir Mesa
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {venue.tables.map((table) => (
                    <Card
                      key={table.id}
                      className={`bg-black/40 border-purple-500/50 backdrop-blur-sm ${!table.isActive ? "opacity-60" : ""}`}
                    >
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-white text-lg">{table.name}</CardTitle>
                          <Badge
                            variant={table.isActive ? "default" : "outline"}
                            className={table.isActive ? "bg-green-500" : ""}
                          >
                            {table.isActive ? "Activa" : "Inactiva"}
                          </Badge>
                        </div>
                        <CardDescription className="text-white/60">
                          Capacidad: {table.capacity} personas
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-col gap-4">
                          {table.qrCodeUrl ? (
                            <div className="flex justify-center">
                              <div className="bg-white p-2 rounded-lg">
                                <img
                                  src={table.qrCodeUrl || "/placeholder.svg"}
                                  alt={`QR para ${table.name}`}
                                  className="w-32 h-32"
                                />
                              </div>
                            </div>
                          ) : (
                            <Button
                              variant="outline"
                              className="border-pink-500 text-white hover:bg-pink-500/20"
                              onClick={() => generateQrCode(table.id)}
                            >
                              <QrCode className="h-4 w-4 mr-2" />
                              Generar QR
                            </Button>
                          )}

                          <div className="flex justify-between items-center">
                            <p className="text-sm text-white/80">
                              <span className="font-medium">{table.activeSessions}</span>{" "}
                              {table.activeSessions === 1 ? "sesión activa" : "sesiones activas"}
                            </p>
                            <div className="flex gap-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-white/70 hover:text-white hover:bg-purple-500/20"
                                onClick={() => {
                                  setEditingTable(table)
                                  setShowEditTableDialog(true)
                                }}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-white/70 hover:text-white hover:bg-red-500/20"
                                onClick={() => handleDeleteTable(table.id)}
                              >
                                <Trash className="h-4 w-4" />
                              </Button>
                              {table.qrCodeUrl && (
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 text-white/70 hover:text-white hover:bg-blue-500/20"
                                  onClick={() => {
                                    // En una implementación real, aquí se descargaría el QR
                                    alert("Descargando QR...")
                                  }}
                                >
                                  <Download className="h-4 w-4" />
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Diálogo para editar mesa */}
                <Dialog open={showEditTableDialog} onOpenChange={setShowEditTableDialog}>
                  <DialogContent className="bg-black/90 border-purple-500/50 text-white">
                    <DialogHeader>
                      <DialogTitle>Editar Mesa</DialogTitle>
                      <DialogDescription className="text-white/60">Modifica los detalles de la mesa.</DialogDescription>
                    </DialogHeader>
                    {editingTable && (
                      <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                          <Label htmlFor="editTableName">Nombre de la Mesa</Label>
                          <Input
                            id="editTableName"
                            className="bg-black/40 border-purple-500/30 text-white"
                            value={editingTable.name}
                            onChange={(e) => setEditingTable({ ...editingTable, name: e.target.value })}
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="editTableCapacity">Capacidad</Label>
                          <Input
                            id="editTableCapacity"
                            type="number"
                            min="1"
                            max="20"
                            className="bg-black/40 border-purple-500/30 text-white"
                            value={editingTable.capacity}
                            onChange={(e) =>
                              setEditingTable({ ...editingTable, capacity: Number.parseInt(e.target.value) })
                            }
                          />
                        </div>
                        <div className="flex items-center gap-2">
                          <Switch
                            id="editTableActive"
                            checked={editingTable.isActive}
                            onCheckedChange={(checked) => setEditingTable({ ...editingTable, isActive: checked })}
                          />
                          <Label htmlFor="editTableActive">Mesa Activa</Label>
                        </div>
                      </div>
                    )}
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setShowEditTableDialog(false)}>
                        Cancelar
                      </Button>
                      <Button
                        className="bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-90"
                        onClick={handleEditTable}
                      >
                        Guardar Cambios
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            )}

            {/* Gestión de Campañas */}
            {activeTab === "campaigns" && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">Campañas</h2>
                  <Dialog open={showAddCampaignDialog} onOpenChange={setShowAddCampaignDialog}>
                    <DialogTrigger asChild>
                      <Button className="bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-90">
                        <Plus className="h-4 w-4 mr-2" />
                        Nueva Campaña
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-black/90 border-purple-500/50 text-white max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Crear Nueva Campaña</DialogTitle>
                        <DialogDescription className="text-white/60">
                          Configura una nueva campaña para tu venue.
                        </DialogDescription>
                      </DialogHeader>
                      <ScrollArea className="max-h-[70vh]">
                        <div className="grid gap-4 py-4 px-1">
                          <div className="grid gap-2">
                            <Label htmlFor="campaignName">Nombre de la Campaña</Label>
                            <Input
                              id="campaignName"
                              placeholder="Ej: Verano Bacardi 2025"
                              className="bg-black/40 border-purple-500/30 text-white"
                              value={newCampaign.name}
                              onChange={(e) => setNewCampaign({ ...newCampaign, name: e.target.value })}
                            />
                          </div>

                          <div className="grid gap-2">
                            <Label htmlFor="brandName">Nombre de la Marca</Label>
                            <Input
                              id="brandName"
                              placeholder="Ej: Bacardi"
                              className="bg-black/40 border-purple-500/30 text-white"
                              value={newCampaign.brandName}
                              onChange={(e) => setNewCampaign({ ...newCampaign, brandName: e.target.value })}
                            />
                          </div>

                          <div className="grid gap-2">
                            <Label htmlFor="campaignStatus">Estado</Label>
                            <Select
                              value={newCampaign.status}
                              onValueChange={(value) => setNewCampaign({ ...newCampaign, status: value as any })}
                            >
                              <SelectTrigger className="bg-black/40 border-purple-500/30 text-white">
                                <SelectValue placeholder="Selecciona un estado" />
                              </SelectTrigger>
                              <SelectContent className="bg-black/90 border-purple-500/50 text-white">
                                <SelectItem value="draft">Borrador</SelectItem>
                                <SelectItem value="scheduled">Programada</SelectItem>
                                <SelectItem value="active">Activa</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <Separator className="bg-purple-500/30 my-2" />

                          <div className="grid gap-2">
                            <Label>Cápsulas Permitidas</Label>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              {capsules.map((capsule) => (
                                <div
                                  key={capsule.id}
                                  className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                                    newCampaign.allowedCapsules?.includes(capsule.id)
                                      ? "border-pink-500/50 bg-pink-500/10"
                                      : "border-gray-700 bg-black/20 hover:bg-black/30"
                                  }`}
                                  onClick={() => {
                                    const current = newCampaign.allowedCapsules || []
                                    const updated = current.includes(capsule.id)
                                      ? current.filter((id) => id !== capsule.id)
                                      : [...current, capsule.id]
                                    setNewCampaign({ ...newCampaign, allowedCapsules: updated })
                                  }}
                                >
                                  <Checkbox
                                    checked={newCampaign.allowedCapsules?.includes(capsule.id)}
                                    className="data-[state=checked]:bg-pink-500 data-[state=checked]:border-pink-500"
                                  />
                                  <div className="flex items-center gap-2">
                                    {capsuleIcons[capsule.id]}
                                    <p className="text-white">{capsule.name}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="grid gap-2">
                            <Label>Niveles Emocionales Permitidos</Label>
                            <div className="flex flex-wrap gap-3">
                              <div
                                className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                                  newCampaign.allowedEmotionalTiers?.includes("mild")
                                    ? "border-blue-500/50 bg-blue-500/10"
                                    : "border-gray-700 bg-black/20 hover:bg-black/30"
                                }`}
                                onClick={() => {
                                  const current = newCampaign.allowedEmotionalTiers || []
                                  const updated = current.includes("mild")
                                    ? current.filter((tier) => tier !== "mild")
                                    : [...current, "mild"]
                                  setNewCampaign({ ...newCampaign, allowedEmotionalTiers: updated })
                                }}
                              >
                                <Checkbox
                                  checked={newCampaign.allowedEmotionalTiers?.includes("mild")}
                                  className="data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
                                />
                                <p className="text-white">Suave</p>
                              </div>

                              <div
                                className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                                  newCampaign.allowedEmotionalTiers?.includes("intense")
                                    ? "border-purple-500/50 bg-purple-500/10"
                                    : "border-gray-700 bg-black/20 hover:bg-black/30"
                                }`}
                                onClick={() => {
                                  const current = newCampaign.allowedEmotionalTiers || []
                                  const updated = current.includes("intense")
                                    ? current.filter((tier) => tier !== "intense")
                                    : [...current, "intense"]
                                  setNewCampaign({ ...newCampaign, allowedEmotionalTiers: updated })
                                }}
                              >
                                <Checkbox
                                  checked={newCampaign.allowedEmotionalTiers?.includes("intense")}
                                  className="data-[state=checked]:bg-purple-500 data-[state=checked]:border-purple-500"
                                />
                                <p className="text-white">Intenso</p>
                              </div>

                              <div
                                className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                                  newCampaign.allowedEmotionalTiers?.includes("chaotic")
                                    ? "border-red-500/50 bg-red-500/10"
                                    : "border-gray-700 bg-black/20 hover:bg-black/30"
                                }`}
                                onClick={() => {
                                  const current = newCampaign.allowedEmotionalTiers || []
                                  const updated = current.includes("chaotic")
                                    ? current.filter((tier) => tier !== "chaotic")
                                    : [...current, "chaotic"]
                                  setNewCampaign({ ...newCampaign, allowedEmotionalTiers: updated })
                                }}
                              >
                                <Checkbox
                                  checked={newCampaign.allowedEmotionalTiers?.includes("chaotic")}
                                  className="data-[state=checked]:bg-red-500 data-[state=checked]:border-red-500"
                                />
                                <p className="text-white">Caótico</p>
                              </div>
                            </div>
                          </div>

                          <div className="grid gap-2">
                            <Label>Temas Prohibidos</Label>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              {themes.map((theme) => (
                                <div
                                  key={theme.id}
                                  className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                                    newCampaign.prohibitedThemes?.includes(theme.id)
                                      ? "border-red-500/50 bg-red-500/10"
                                      : "border-gray-700 bg-black/20 hover:bg-black/30"
                                  }`}
                                  onClick={() => {
                                    const current = newCampaign.prohibitedThemes || []
                                    const updated = current.includes(theme.id)
                                      ? current.filter((id) => id !== theme.id)
                                      : [...current, theme.id]
                                    setNewCampaign({ ...newCampaign, prohibitedThemes: updated })
                                  }}
                                >
                                  <Checkbox
                                    checked={newCampaign.prohibitedThemes?.includes(theme.id)}
                                    className="data-[state=checked]:bg-red-500 data-[state=checked]:border-red-500"
                                  />
                                  <p className="text-white">{theme.name}</p>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="grid gap-2">
                            <Label>Mesas Asignadas</Label>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              {venue.tables.map((table) => (
                                <div
                                  key={table.id}
                                  className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                                    !table.isActive ? "opacity-50 pointer-events-none" : ""
                                  } ${
                                    newCampaign.tables?.includes(table.id)
                                      ? "border-amber-500/50 bg-amber-500/10"
                                      : "border-gray-700 bg-black/20 hover:bg-black/30"
                                  }`}
                                  onClick={() => {
                                    if (!table.isActive) return
                                    const current = newCampaign.tables || []
                                    const updated = current.includes(table.id)
                                      ? current.filter((id) => id !== table.id)
                                      : [...current, table.id]
                                    setNewCampaign({ ...newCampaign, tables: updated })
                                  }}
                                >
                                  <Checkbox
                                    checked={newCampaign.tables?.includes(table.id)}
                                    disabled={!table.isActive}
                                    className="data-[state=checked]:bg-amber-500 data-[state=checked]:border-amber-500"
                                  />
                                  <div>
                                    <p className="text-white">{table.name}</p>
                                    <p className="text-xs text-white/60">Capacidad: {table.capacity}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </ScrollArea>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setShowAddCampaignDialog(false)}>
                          Cancelar
                        </Button>
                        <Button
                          className="bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-90"
                          onClick={handleAddCampaign}
                        >
                          Crear Campaña
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>

                <div className="space-y-4">
                  {venue.campaigns.map((campaign) => (
                    <Card key={campaign.id} className="bg-black/40 border-purple-500/50 backdrop-blur-sm">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-white text-lg">{campaign.name}</CardTitle>
                            <CardDescription className="text-white/60">{campaign.brandName}</CardDescription>
                          </div>
                          <Badge className={getCampaignStatusColor(campaign.status)}>
                            {getCampaignStatusText(campaign.status)}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex flex-wrap gap-2">
                            <p className="text-sm text-white/80">Cápsulas:</p>
                            {campaign.allowedCapsules.map((capsuleId) => (
                              <Badge
                                key={capsuleId}
                                variant="outline"
                                className="bg-black/40 border-pink-500/30 flex items-center gap-1"
                              >
                                {capsuleIcons[capsuleId]}
                                <span>{capsules.find((c) => c.id === capsuleId)?.name.replace("™", "")}</span>
                              </Badge>
                            ))}
                          </div>

                          <div className="flex flex-wrap gap-2">
                            <p className="text-sm text-white/80">Niveles:</p>
                            {campaign.allowedEmotionalTiers.map((tier) => (
                              <Badge
                                key={tier}
                                variant="outline"
                                className={`
                                bg-black/40 
                                ${tier === "mild" ? "border-blue-500/30" : tier === "intense" ? "border-purple-500/30" : "border-red-500/30"}
                              `}
                              >
                                {tier === "mild" ? "Suave" : tier === "intense" ? "Intenso" : "Caótico"}
                              </Badge>
                            ))}
                          </div>

                          <div className="flex justify-between items-center">
                            <div className="text-sm text-white/80">
                              <span>
                                {formatDate(campaign.startDate)} - {formatDate(campaign.endDate)}
                              </span>
                            </div>
                            <div className="flex gap-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-white/70 hover:text-white hover:bg-purple-500/20"
                                onClick={() => {
                                  setEditingCampaign(campaign)
                                  setShowEditCampaignDialog(true)
                                }}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-white/70 hover:text-white hover:bg-red-500/20"
                                onClick={() => handleDeleteCampaign(campaign.id)}
                              >
                                <Trash className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Diálogo para editar campaña */}
                <Dialog open={showEditCampaignDialog} onOpenChange={setShowEditCampaignDialog}>
                  <DialogContent className="bg-black/90 border-purple-500/50 text-white max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Editar Campaña</DialogTitle>
                      <DialogDescription className="text-white/60">
                        Modifica los detalles de la campaña.
                      </DialogDescription>
                    </DialogHeader>
                    {editingCampaign && (
                      <ScrollArea className="max-h-[70vh]">
                        <div className="grid gap-4 py-4 px-1">
                          <div className="grid gap-2">
                            <Label htmlFor="editCampaignName">Nombre de la Campaña</Label>
                            <Input
                              id="editCampaignName"
                              className="bg-black/40 border-purple-500/30 text-white"
                              value={editingCampaign.name}
                              onChange={(e) => setEditingCampaign({ ...editingCampaign, name: e.target.value })}
                            />
                          </div>

                          <div className="grid gap-2">
                            <Label htmlFor="editBrandName">Nombre de la Marca</Label>
                            <Input
                              id="editBrandName"
                              className="bg-black/40 border-purple-500/30 text-white"
                              value={editingCampaign.brandName}
                              onChange={(e) => setEditingCampaign({ ...editingCampaign, brandName: e.target.value })}
                            />
                          </div>

                          <div className="grid gap-2">
                            <Label htmlFor="editCampaignStatus">Estado</Label>
                            <Select
                              value={editingCampaign.status}
                              onValueChange={(value) =>
                                setEditingCampaign({ ...editingCampaign, status: value as any })
                              }
                            >
                              <SelectTrigger className="bg-black/40 border-purple-500/30 text-white">
                                <SelectValue placeholder="Selecciona un estado" />
                              </SelectTrigger>
                              <SelectContent className="bg-black/90 border-purple-500/50 text-white">
                                <SelectItem value="draft">Borrador</SelectItem>
                                <SelectItem value="scheduled">Programada</SelectItem>
                                <SelectItem value="active">Activa</SelectItem>
                                <SelectItem value="completed">Completada</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <Separator className="bg-purple-500/30 my-2" />

                          <div className="grid gap-2">
                            <Label>Cápsulas Permitidas</Label>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              {capsules.map((capsule) => (
                                <div
                                  key={capsule.id}
                                  className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                                    editingCampaign.allowedCapsules.includes(capsule.id)
                                      ? "border-pink-500/50 bg-pink-500/10"
                                      : "border-gray-700 bg-black/20 hover:bg-black/30"
                                  }`}
                                  onClick={() => {
                                    const updated = editingCampaign.allowedCapsules.includes(capsule.id)
                                      ? editingCampaign.allowedCapsules.filter((id) => id !== capsule.id)
                                      : [...editingCampaign.allowedCapsules, capsule.id]
                                    setEditingCampaign({ ...editingCampaign, allowedCapsules: updated })
                                  }}
                                >
                                  <Checkbox
                                    checked={editingCampaign.allowedCapsules.includes(capsule.id)}
                                    className="data-[state=checked]:bg-pink-500 data-[state=checked]:border-pink-500"
                                  />
                                  <div className="flex items-center gap-2">
                                    {capsuleIcons[capsule.id]}
                                    <p className="text-white">{capsule.name}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="grid gap-2">
                            <Label>Niveles Emocionales Permitidos</Label>
                            <div className="flex flex-wrap gap-3">
                              <div
                                className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                                  editingCampaign.allowedEmotionalTiers.includes("mild")
                                    ? "border-blue-500/50 bg-blue-500/10"
                                    : "border-gray-700 bg-black/20 hover:bg-black/30"
                                }`}
                                onClick={() => {
                                  const updated = editingCampaign.allowedEmotionalTiers.includes("mild")
                                    ? editingCampaign.allowedEmotionalTiers.filter((tier) => tier !== "mild")
                                    : [...editingCampaign.allowedEmotionalTiers, "mild"]
                                  setEditingCampaign({ ...editingCampaign, allowedEmotionalTiers: updated })
                                }}
                              >
                                <Checkbox
                                  checked={editingCampaign.allowedEmotionalTiers.includes("mild")}
                                  className="data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
                                />
                                <p className="text-white">Suave</p>
                              </div>

                              <div
                                className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                                  editingCampaign.allowedEmotionalTiers.includes("intense")
                                    ? "border-purple-500/50 bg-purple-500/10"
                                    : "border-gray-700 bg-black/20 hover:bg-black/30"
                                }`}
                                onClick={() => {
                                  const updated = editingCampaign.allowedEmotionalTiers.includes("intense")
                                    ? editingCampaign.allowedEmotionalTiers.filter((tier) => tier !== "intense")
                                    : [...editingCampaign.allowedEmotionalTiers, "intense"]
                                  setEditingCampaign({ ...editingCampaign, allowedEmotionalTiers: updated })
                                }}
                              >
                                <Checkbox
                                  checked={editingCampaign.allowedEmotionalTiers.includes("intense")}
                                  className="data-[state=checked]:bg-purple-500 data-[state=checked]:border-purple-500"
                                />
                                <p className="text-white">Intenso</p>
                              </div>

                              <div
                                className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                                  editingCampaign.allowedEmotionalTiers.includes("chaotic")
                                    ? "border-red-500/50 bg-red-500/10"
                                    : "border-gray-700 bg-black/20 hover:bg-black/30"
                                }`}
                                onClick={() => {
                                  const updated = editingCampaign.allowedEmotionalTiers.includes("chaotic")
                                    ? editingCampaign.allowedEmotionalTiers.filter((tier) => tier !== "chaotic")
                                    : [...editingCampaign.allowedEmotionalTiers, "chaotic"]
                                  setEditingCampaign({ ...editingCampaign, allowedEmotionalTiers: updated })
                                }}
                              >
                                <Checkbox
                                  checked={editingCampaign.allowedEmotionalTiers.includes("chaotic")}
                                  className="data-[state=checked]:bg-red-500 data-[state=checked]:border-red-500"
                                />
                                <p className="text-white">Caótico</p>
                              </div>
                            </div>
                          </div>

                          <div className="grid gap-2">
                            <Label>Temas Prohibidos</Label>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              {themes.map((theme) => (
                                <div
                                  key={theme.id}
                                  className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                                    editingCampaign.prohibitedThemes.includes(theme.id)
                                      ? "border-red-500/50 bg-red-500/10"
                                      : "border-gray-700 bg-black/20 hover:bg-black/30"
                                  }`}
                                  onClick={() => {
                                    const updated = editingCampaign.prohibitedThemes.includes(theme.id)
                                      ? editingCampaign.prohibitedThemes.filter((id) => id !== theme.id)
                                      : [...editingCampaign.prohibitedThemes, theme.id]
                                    setEditingCampaign({ ...editingCampaign, prohibitedThemes: updated })
                                  }}
                                >
                                  <Checkbox
                                    checked={editingCampaign.prohibitedThemes.includes(theme.id)}
                                    className="data-[state=checked]:bg-red-500 data-[state=checked]:border-red-500"
                                  />
                                  <p className="text-white">{theme.name}</p>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="grid gap-2">
                            <Label>Mesas Asignadas</Label>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              {venue.tables.map((table) => (
                                <div
                                  key={table.id}
                                  className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                                    !table.isActive ? "opacity-50 pointer-events-none" : ""
                                  } ${
                                    editingCampaign.tables.includes(table.id)
                                      ? "border-amber-500/50 bg-amber-500/10"
                                      : "border-gray-700 bg-black/20 hover:bg-black/30"
                                  }`}
                                  onClick={() => {
                                    if (!table.isActive) return
                                    const updated = editingCampaign.tables.includes(table.id)
                                      ? editingCampaign.tables.filter((id) => id !== table.id)
                                      : [...editingCampaign.tables, table.id]
                                    setEditingCampaign({ ...editingCampaign, tables: updated })
                                  }}
                                >
                                  <Checkbox
                                    checked={editingCampaign.tables.includes(table.id)}
                                    disabled={!table.isActive}
                                    className="data-[state=checked]:bg-amber-500 data-[state=checked]:border-amber-500"
                                  />
                                  <div>
                                    <p className="text-white">{table.name}</p>
                                    <p className="text-xs text-white/60">Capacidad: {table.capacity}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </ScrollArea>
                    )}
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setShowEditCampaignDialog(false)}>
                        Cancelar
                      </Button>
                      <Button
                        className="bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-90"
                        onClick={handleEditCampaign}
                      >
                        Guardar Cambios
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            )}

            {/* Sesiones Activas */}
            {activeTab === "sessions" && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">Sesiones Activas</h2>
                  <Button className="bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-90">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Actualizar
                  </Button>
                </div>

                <div className="space-y-4">
                  {sessions
                    .filter((s) => s.status === "active")
                    .map((session) => (
                      <Card key={session.id} className="bg-black/40 border-purple-500/50 backdrop-blur-sm">
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-start">
                            <div className="flex items-center gap-3">
                              {capsuleIcons[session.capsuleType]}
                              <div>
                                <CardTitle className="text-white text-lg">{session.tableName}</CardTitle>
                                <CardDescription className="text-white/60">
                                  {formatTime(session.startTime)} · {formatDuration(session.startTime)}
                                </CardDescription>
                              </div>
                            </div>
                            <Badge className="bg-green-500">Activa</Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="flex justify-between items-center">
                              <div className="flex items-center gap-2">
                                <Users className="h-5 w-5 text-white/70" />
                                <span className="text-white/80">{session.participants} participantes</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Sparkles className="h-5 w-5 text-white/70" />
                                <span className="text-white/80">{session.completedChallenges} retos completados</span>
                              </div>
                            </div>

                            <div className="flex justify-end">
                              <Button
                                variant="outline"
                                className="border-pink-500 text-white hover:bg-pink-500/20"
                                onClick={() => router.push(`/session/${session.id}`)}
                              >
                                Ver Detalles
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}

                  {sessions.filter((s) => s.status === "active").length === 0 && (
                    <div className="text-center py-12 text-white/60">
                      <p>No hay sesiones activas en este momento</p>
                      <Button className="mt-4 bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-90">
                        Crear Sesión de Prueba
                      </Button>
                    </div>
                  )}
                </div>

                <div className="mt-8">
                  <h3 className="text-lg font-semibold mb-4">Sesiones Recientes</h3>
                  <div className="space-y-4">
                    {sessions
                      .filter((s) => s.status === "completed")
                      .map((session) => (
                        <Card key={session.id} className="bg-black/40 border-purple-500/30 backdrop-blur-sm opacity-80">
                          <CardHeader className="pb-2">
                            <div className="flex justify-between items-start">
                              <div className="flex items-center gap-3">
                                {capsuleIcons[session.capsuleType]}
                                <div>
                                  <CardTitle className="text-white text-lg">{session.tableName}</CardTitle>
                                  <CardDescription className="text-white/60">
                                    {formatDate(session.startTime)} · {formatTime(session.startTime)}
                                  </CardDescription>
                                </div>
                              </div>
                              <Badge variant="outline">Completada</Badge>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <div className="flex justify-between items-center">
                              <div className="flex items-center gap-2">
                                <Users className="h-5 w-5 text-white/70" />
                                <span className="text-white/80">{session.participants} participantes</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Sparkles className="h-5 w-5 text-white/70" />
                                <span className="text-white/80">{session.completedChallenges} retos completados</span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}
