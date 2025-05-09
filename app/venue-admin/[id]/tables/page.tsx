"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch"
import { ArrowLeft, QrCode, Plus, Trash, Edit, Download, RefreshCw } from "lucide-react"

// Tipos
interface Table {
  id: string
  name: string
  capacity: number
  isActive: boolean
  qrCodeUrl?: string
  activeSessions: number
}

// Datos de ejemplo
const mockTables: Table[] = [
  { id: "table_1", name: "Mesa 1", capacity: 6, isActive: true, activeSessions: 1 },
  { id: "table_2", name: "Mesa 2", capacity: 4, isActive: true, activeSessions: 0 },
  { id: "table_3", name: "Mesa 3", capacity: 8, isActive: true, activeSessions: 1 },
  { id: "table_4", name: "Mesa 4", capacity: 4, isActive: false, activeSessions: 0 },
  { id: "table_5", name: "Mesa 5", capacity: 6, isActive: true, activeSessions: 0 },
  { id: "table_6", name: "Mesa VIP", capacity: 10, isActive: true, activeSessions: 1 },
  { id: "table_7", name: "Mesa Terraza 1", capacity: 8, isActive: true, activeSessions: 0 },
  { id: "table_8", name: "Mesa Terraza 2", capacity: 8, isActive: true, activeSessions: 0 },
]

export default function VenueTablesPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [tables, setTables] = useState<Table[]>(mockTables)
  const [showAddTableDialog, setShowAddTableDialog] = useState(false)
  const [showEditTableDialog, setShowEditTableDialog] = useState(false)
  const [newTable, setNewTable] = useState<Partial<Table>>({ name: "", capacity: 4, isActive: true })
  const [editingTable, setEditingTable] = useState<Table | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  // Manejadores para tablas
  const handleAddTable = () => {
    if (!newTable.name) return

    const table: Table = {
      id: `table_${Date.now()}`,
      name: newTable.name,
      capacity: newTable.capacity || 4,
      isActive: newTable.isActive !== false,
      activeSessions: 0,
    }

    setTables([...tables, table])
    setNewTable({ name: "", capacity: 4, isActive: true })
    setShowAddTableDialog(false)
  }

  const handleEditTable = () => {
    if (!editingTable) return

    setTables(tables.map((table) => (table.id === editingTable.id ? editingTable : table)))

    setEditingTable(null)
    setShowEditTableDialog(false)
  }

  const handleDeleteTable = (tableId: string) => {
    setTables(tables.filter((table) => table.id !== tableId))
  }

  // Generar QR para una mesa
  const generateQrCode = (tableId: string) => {
    const updatedTables = tables.map((table) => {
      if (table.id === tableId) {
        const qrData = `https://brindax.com/join?venue=${params.id}&table=${tableId}`
        const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(qrData)}`
        return { ...table, qrCodeUrl }
      }
      return table
    })

    setTables(updatedTables)
  }

  // Filtrar mesas por búsqueda
  const filteredTables = tables.filter((table) => table.name.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-purple-950 text-white">
      <header className="container mx-auto py-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/10"
            onClick={() => router.push(`/venue-admin/${params.id}`)}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold">Gestión de Mesas</h1>
        </div>
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            className="border-pink-500 text-white hover:bg-pink-500/20"
            onClick={() => {
              // En una implementación real, aquí se descargarían todos los QR
              alert("Descargando todos los QR...")
            }}
          >
            <Download className="h-4 w-4 mr-2" />
            Descargar QRs
          </Button>
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
                <DialogDescription className="text-white/60">Crea una nueva mesa para tu venue.</DialogDescription>
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
      </header>

      <main className="container mx-auto py-6">
        <div className="max-w-4xl mx-auto mb-6">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Input
                className="bg-black/40 border-purple-500/30 text-white pl-10"
                placeholder="Buscar mesas..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/60">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </div>
            </div>
            <Button
              variant="outline"
              className="border-purple-500/30 text-white hover:bg-purple-500/20"
              onClick={() => setSearchQuery("")}
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Reiniciar
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTables.map((table) => (
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
                <CardDescription className="text-white/60">Capacidad: {table.capacity} personas</CardDescription>
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
                            alert(`Descargando QR para ${table.name}...`)
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

        {filteredTables.length === 0 && (
          <div className="text-center py-12 text-white/60">
            <p>No se encontraron mesas que coincidan con tu búsqueda.</p>
            <Button
              className="mt-4 bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-90"
              onClick={() => setSearchQuery("")}
            >
              Mostrar todas las mesas
            </Button>
          </div>
        )}

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
                    onChange={(e) => setEditingTable({ ...editingTable, capacity: Number.parseInt(e.target.value) })}
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
      </main>
    </div>
  )
}
