"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import {
  type Wallet,
  type WalletItem,
  createWallet,
  loadWalletFromStorage,
  saveWalletToStorage,
  addCardToWallet,
  addStickerToWallet,
  addRewardToWallet,
  redeemWalletItem,
  getWalletItemsByType,
  getWalletItemsByCapsule,
  getWalletItemById,
  hasWalletItem,
  getWalletStats,
  addSessionRewardsToWallet,
} from "@/lib/types/wallet-engine"
import type { UnifiedCard } from "@/lib/types/unified-card"

// Contexto para la wallet
type WalletContextType = {
  wallet: Wallet | null
  isLoading: boolean
  addCard: (card: UnifiedCard) => void
  addSticker: (stickerId: string, name: string, description: string, capsuleId?: string, imageUrl?: string) => void
  addReward: (
    rewardType: "reward" | "discount" | "experience" | "vault",
    rewardId: string,
    name: string,
    description: string,
    value?: number,
    expiryDate?: Date,
    redemptionCode?: string,
    capsuleId?: string,
  ) => void
  redeemItem: (itemId: string) => void
  getItemsByType: (type: string) => WalletItem[]
  getItemsByCapsule: (capsuleId: string) => WalletItem[]
  getItemById: (itemId: string) => WalletItem | undefined
  hasItem: (itemId: string) => boolean
  getStats: () => ReturnType<typeof getWalletStats> | null
  addSessionRewards: (
    capsuleId: string,
    archetypeId: string,
    emotionalTier: "mild" | "intense" | "chaotic",
    points: number,
  ) => void
}

const WalletContext = createContext<WalletContextType | undefined>(undefined)

// Hook para usar la wallet
export function useWallet() {
  const context = useContext(WalletContext)
  if (context === undefined) {
    throw new Error("useWallet must be used within a WalletProvider")
  }
  return context
}

// Proveedor de la wallet
export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [wallet, setWallet] = useState<Wallet | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Cargar la wallet al iniciar
  useEffect(() => {
    // En una aplicación real, obtendríamos el ID del usuario autenticado
    const userId = "demo_user"

    // Intentar cargar la wallet desde localStorage
    let userWallet = loadWalletFromStorage(userId)

    // Si no existe, crear una nueva
    if (!userWallet) {
      userWallet = createWallet(userId)
      saveWalletToStorage(userWallet)
    }

    setWallet(userWallet)
    setIsLoading(false)
  }, [])

  // Guardar la wallet cuando cambie
  useEffect(() => {
    if (wallet) {
      saveWalletToStorage(wallet)
    }
  }, [wallet])

  // Función para añadir una carta
  const addCard = (card: UnifiedCard) => {
    if (!wallet) return
    const updatedWallet = addCardToWallet(wallet, card)
    setWallet(updatedWallet)
  }

  // Función para añadir un sticker
  const addSticker = (stickerId: string, name: string, description: string, capsuleId?: string, imageUrl?: string) => {
    if (!wallet) return
    const updatedWallet = addStickerToWallet(wallet, stickerId, name, description, capsuleId, imageUrl)
    setWallet(updatedWallet)
  }

  // Función para añadir una recompensa
  const addReward = (
    rewardType: "reward" | "discount" | "experience" | "vault",
    rewardId: string,
    name: string,
    description: string,
    value?: number,
    expiryDate?: Date,
    redemptionCode?: string,
    capsuleId?: string,
  ) => {
    if (!wallet) return
    const updatedWallet = addRewardToWallet(
      wallet,
      rewardType,
      rewardId,
      name,
      description,
      value,
      expiryDate,
      redemptionCode,
      capsuleId,
    )
    setWallet(updatedWallet)
  }

  // Función para canjear un elemento
  const redeemItem = (itemId: string) => {
    if (!wallet) return
    const updatedWallet = redeemWalletItem(wallet, itemId)
    setWallet(updatedWallet)
  }

  // Función para obtener elementos por tipo
  const getItemsByType = (type: string) => {
    if (!wallet) return []
    return getWalletItemsByType(wallet, type as any)
  }

  // Función para obtener elementos por cápsula
  const getItemsByCapsule = (capsuleId: string) => {
    if (!wallet) return []
    return getWalletItemsByCapsule(wallet, capsuleId)
  }

  // Función para obtener un elemento por ID
  const getItemById = (itemId: string) => {
    if (!wallet) return undefined
    return getWalletItemById(wallet, itemId)
  }

  // Función para verificar si tiene un elemento
  const hasItem = (itemId: string) => {
    if (!wallet) return false
    return hasWalletItem(wallet, itemId)
  }

  // Función para obtener estadísticas
  const getStats = () => {
    if (!wallet) return null
    return getWalletStats(wallet)
  }

  // Función para añadir recompensas de una sesión
  const addSessionRewards = (
    capsuleId: string,
    archetypeId: string,
    emotionalTier: "mild" | "intense" | "chaotic",
    points: number,
  ) => {
    if (!wallet) return
    const updatedWallet = addSessionRewardsToWallet(wallet, capsuleId, archetypeId, emotionalTier, points)
    setWallet(updatedWallet)
  }

  const value = {
    wallet,
    isLoading,
    addCard,
    addSticker,
    addReward,
    redeemItem,
    getItemsByType,
    getItemsByCapsule,
    getItemById,
    hasItem,
    getStats,
    addSessionRewards,
  }

  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>
}
