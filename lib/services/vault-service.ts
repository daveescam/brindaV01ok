// Tipos para el servicio de vault
export type VaultItemType = "clip" | "meme" | "sticker" | "photo" | "audio" | "experience"

export type VaultItem = {
  id: string
  type: VaultItemType
  title: string
  description: string
  contentUrl: string
  thumbnailUrl?: string
  createdAt: Date
  createdBy?: string
  capsuleType?: string
  archetypeId?: string
  tags: string[]
  isPublic: boolean
  viewCount: number
  metadata?: Record<string, any>
}

export type VaultQueryParams = {
  type?: VaultItemType
  capsuleType?: string
  archetypeId?: string
  tags?: string[]
  isPublic?: boolean
  createdBy?: string
  limit?: number
  offset?: number
}

// Clase principal del servicio de vault
class VaultService {
  private static instance: VaultService
  private items: any[] = []

  private constructor() {}

  public static getInstance(): VaultService {
    if (!VaultService.instance) {
      VaultService.instance = new VaultService()
    }
    return VaultService.instance
  }

  public setItems(items: any[]): void {
    this.items = items
  }

  public getItems(): any[] {
    return this.items
  }

  public getItemById(id: string): any | undefined {
    return this.items.find((item) => item.id === id)
  }

  public addItem(item: any): void {
    this.items.push(item)
  }

  public updateItem(id: string, newItem: any): void {
    this.items = this.items.map((item) => (item.id === id ? newItem : item))
  }

  public deleteItem(id: string): void {
    this.items = this.items.filter((item) => item.id !== id)
  }
}

export default VaultService.getInstance()
