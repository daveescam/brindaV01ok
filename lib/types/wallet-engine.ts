import type { UnifiedCard } from "./unified-card"
import { getCapsuleById } from "./capsule-engine"

// Tipos de elementos que pueden estar en la wallet
export type WalletItemType = "card" | "sticker" | "reward" | "vault" | "discount" | "experience"

// Estructura de un elemento en la wallet
export interface WalletItem {
  id: string
  type: WalletItemType
  name: string
  description: string
  imageUrl?: string
  capsuleId?: string
  archetypeId?: string
  dateAcquired: Date
  expiryDate?: Date
  redeemed: boolean
  redemptionCode?: string
  value?: number
  rarity?: "common" | "uncommon" | "rare" | "legendary"
  metadata?: Record<string, any>
}

// Estructura de la wallet
export interface Wallet {
  userId: string
  items: WalletItem[]
  lastUpdated: Date
}

// Función para crear una nueva wallet
export function createWallet(userId: string): Wallet {
  return {
    userId,
    items: [],
    lastUpdated: new Date(),
  }
}

// Función para añadir una carta a la wallet
export function addCardToWallet(wallet: Wallet, card: UnifiedCard): Wallet {
  const existingCard = wallet.items.find((item) => item.type === "card" && item.id === card.card_id)

  if (existingCard) {
    return wallet
  }

  const newItem: WalletItem = {
    id: card.card_id,
    type: "card",
    name: card.card_title,
    description: card.challenge,
    capsuleId: card.challenge_category as string,
    dateAcquired: new Date(),
    redeemed: false,
    rarity: card.emotional_tier === "mild" ? "common" : card.emotional_tier === "intense" ? "uncommon" : "rare",
    metadata: {
      challengeType: card.challenge_type,
      emotionalTier: card.emotional_tier,
      interactionFormat: card.interaction_format,
      toneSubtype: card.tone_subtype,
    },
  }

  return {
    ...wallet,
    items: [...wallet.items, newItem],
    lastUpdated: new Date(),
  }
}

// Función para añadir un sticker a la wallet
export function addStickerToWallet(
  wallet: Wallet,
  stickerId: string,
  name: string,
  description: string,
  capsuleId?: string,
  imageUrl?: string,
): Wallet {
  const existingSticker = wallet.items.find((item) => item.type === "sticker" && item.id === stickerId)

  if (existingSticker) {
    return wallet
  }

  const newItem: WalletItem = {
    id: stickerId,
    type: "sticker",
    name,
    description,
    imageUrl,
    capsuleId,
    dateAcquired: new Date(),
    redeemed: false,
    rarity: "common",
  }

  return {
    ...wallet,
    items: [...wallet.items, newItem],
    lastUpdated: new Date(),
  }
}

// Función para añadir una recompensa a la wallet
export function addRewardToWallet(
  wallet: Wallet,
  rewardType: "reward" | "discount" | "experience" | "vault",
  rewardId: string,
  name: string,
  description: string,
  value?: number,
  expiryDate?: Date,
  redemptionCode?: string,
  capsuleId?: string,
): Wallet {
  // Generar un código de redención si no se proporciona uno
  const code = redemptionCode || generateRedemptionCode()

  const newItem: WalletItem = {
    id: rewardId,
    type: rewardType,
    name,
    description,
    value,
    expiryDate,
    redemptionCode: code,
    capsuleId,
    dateAcquired: new Date(),
    redeemed: false,
    rarity: rewardType === "vault" ? "legendary" : rewardType === "experience" ? "rare" : "uncommon",
  }

  return {
    ...wallet,
    items: [...wallet.items, newItem],
    lastUpdated: new Date(),
  }
}

// Función para marcar un elemento como canjeado
export function redeemWalletItem(wallet: Wallet, itemId: string): Wallet {
  const updatedItems = wallet.items.map((item) => {
    if (item.id === itemId) {
      return {
        ...item,
        redeemed: true,
      }
    }
    return item
  })

  return {
    ...wallet,
    items: updatedItems,
    lastUpdated: new Date(),
  }
}

// Función para obtener todos los elementos de un tipo específico
export function getWalletItemsByType(wallet: Wallet, type: WalletItemType): WalletItem[] {
  return wallet.items.filter((item) => item.type === type)
}

// Función para obtener todos los elementos de una cápsula específica
export function getWalletItemsByCapsule(wallet: Wallet, capsuleId: string): WalletItem[] {
  return wallet.items.filter((item) => item.capsuleId === capsuleId)
}

// Función para obtener un elemento específico por ID
export function getWalletItemById(wallet: Wallet, itemId: string): WalletItem | undefined {
  return wallet.items.find((item) => item.id === itemId)
}

// Función para verificar si un usuario tiene un elemento específico
export function hasWalletItem(wallet: Wallet, itemId: string): boolean {
  return wallet.items.some((item) => item.id === itemId)
}

// Función para verificar si un usuario ha completado una cápsula
export function hasCompletedCapsule(wallet: Wallet, capsuleId: string): boolean {
  const capsule = getCapsuleById(capsuleId)
  if (!capsule) return false

  // Verificar si el usuario tiene todos los arquetipos de la cápsula
  return capsule.archetypes.every((archetype) => {
    return wallet.items.some(
      (item) => item.type === "card" && item.archetypeId === archetype.id && item.capsuleId === capsuleId,
    )
  })
}

// Función para verificar si un usuario ha desbloqueado el vault de una cápsula
export function hasUnlockedVault(wallet: Wallet, capsuleId: string): boolean {
  return wallet.items.some((item) => item.type === "vault" && item.capsuleId === capsuleId && !item.redeemed)
}

// Función para generar un código de redención aleatorio
function generateRedemptionCode(): string {
  const prefix = "BRINDA"
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
  let code = ""
  for (let i = 0; i < 6; i++) {
    code += characters.charAt(Math.floor(Math.random() * characters.length))
  }
  return `${prefix}-${code}`
}

// Función para guardar la wallet en localStorage
export function saveWalletToStorage(wallet: Wallet): void {
  if (typeof window !== "undefined") {
    localStorage.setItem(`wallet_${wallet.userId}`, JSON.stringify(wallet))
  }
}

// Función para cargar la wallet desde localStorage
export function loadWalletFromStorage(userId: string): Wallet | null {
  if (typeof window !== "undefined") {
    const walletData = localStorage.getItem(`wallet_${userId}`)
    if (walletData) {
      const wallet = JSON.parse(walletData) as Wallet

      // Convertir las fechas de string a Date
      wallet.lastUpdated = new Date(wallet.lastUpdated)
      wallet.items = wallet.items.map((item) => ({
        ...item,
        dateAcquired: new Date(item.dateAcquired),
        expiryDate: item.expiryDate ? new Date(item.expiryDate) : undefined,
      }))

      return wallet
    }
  }
  return null
}

// Función para obtener estadísticas de la wallet
export function getWalletStats(wallet: Wallet): {
  totalItems: number
  cards: number
  stickers: number
  rewards: number
  vaults: number
  redeemedItems: number
  pendingItems: number
} {
  const cards = wallet.items.filter((item) => item.type === "card").length
  const stickers = wallet.items.filter((item) => item.type === "sticker").length
  const rewards = wallet.items.filter(
    (item) => item.type === "reward" || item.type === "discount" || item.type === "experience",
  ).length
  const vaults = wallet.items.filter((item) => item.type === "vault").length
  const redeemedItems = wallet.items.filter((item) => item.redeemed).length
  const pendingItems = wallet.items.filter((item) => !item.redeemed).length

  return {
    totalItems: wallet.items.length,
    cards,
    stickers,
    rewards,
    vaults,
    redeemedItems,
    pendingItems,
  }
}

// Función para añadir elementos de una sesión completada
export function addSessionRewardsToWallet(
  wallet: Wallet,
  capsuleId: string,
  archetypeId: string,
  emotionalTier: "mild" | "intense" | "chaotic",
  points: number,
): Wallet {
  let updatedWallet = { ...wallet }

  // Obtener la cápsula y el arquetipo
  const capsule = getCapsuleById(capsuleId)
  if (!capsule) return wallet

  const archetype = capsule.archetypes.find((a) => a.id === archetypeId)
  if (!archetype) return wallet

  // Añadir la carta del arquetipo
  const cardId = `${capsuleId}_${archetypeId}`
  const cardItem: WalletItem = {
    id: cardId,
    type: "card",
    name: archetype.name,
    description: `Carta de ${archetype.name} de la cápsula ${capsule.name}`,
    capsuleId,
    archetypeId,
    dateAcquired: new Date(),
    redeemed: false,
    rarity: emotionalTier === "mild" ? "common" : emotionalTier === "intense" ? "uncommon" : "rare",
  }

  updatedWallet = {
    ...updatedWallet,
    items: [...updatedWallet.items.filter((item) => item.id !== cardId), cardItem],
    lastUpdated: new Date(),
  }

  // Añadir sticker si los puntos son suficientes
  if (points >= 10) {
    const stickerId = `sticker_${capsuleId}_${archetypeId}`
    const stickerItem: WalletItem = {
      id: stickerId,
      type: "sticker",
      name: `Sticker de ${archetype.name}`,
      description: `Sticker coleccionable de ${archetype.name}`,
      capsuleId,
      archetypeId,
      dateAcquired: new Date(),
      redeemed: false,
      rarity: "common",
    }

    updatedWallet = {
      ...updatedWallet,
      items: [...updatedWallet.items.filter((item) => item.id !== stickerId), stickerItem],
      lastUpdated: new Date(),
    }
  }

  // Añadir recompensa si los puntos son suficientes
  if (points >= 20) {
    const rewardId = `reward_${capsuleId}_${Date.now()}`
    const rewardItem: WalletItem = {
      id: rewardId,
      type: "reward",
      name: "Shot Gratis",
      description: "Canjeable por un shot gratis en el bar",
      capsuleId,
      dateAcquired: new Date(),
      expiryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 días
      redemptionCode: generateRedemptionCode(),
      redeemed: false,
      rarity: "uncommon",
    }

    updatedWallet = {
      ...updatedWallet,
      items: [...updatedWallet.items, rewardItem],
      lastUpdated: new Date(),
    }
  }

  // Añadir vault si los puntos son suficientes y es el último arquetipo
  const isLastArchetype = capsule.sequence[capsule.sequence.length - 1] === archetypeId
  if (points >= 25 && isLastArchetype) {
    const vaultId = `vault_${capsuleId}`
    const vaultItem: WalletItem = {
      id: vaultId,
      type: "vault",
      name: `Vault de ${capsule.name}`,
      description: `Acceso al contenido exclusivo de la cápsula ${capsule.name}`,
      capsuleId,
      dateAcquired: new Date(),
      redemptionCode: generateRedemptionCode(),
      redeemed: false,
      rarity: "legendary",
    }

    updatedWallet = {
      ...updatedWallet,
      items: [...updatedWallet.items.filter((item) => item.id !== vaultId), vaultItem],
      lastUpdated: new Date(),
    }
  }

  return updatedWallet
}
