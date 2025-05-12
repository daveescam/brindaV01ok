"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

// Definir el tipo para los stickers
interface Sticker {
  id: string
  name: string
  description: string
  category: string
  createdAt: Date
}

// Definir el tipo para las recompensas
interface Reward {
  type: "reward" | "discount" | "freebie"
  id: string
  name: string
  description: string
  image?: string
  expiresAt?: Date
  createdAt: Date
}

// Definir el tipo para el contexto del wallet
interface WalletContextType {
  stickers: Sticker[]
  rewards: Reward[]
  addSticker: (id: string, name: string, description: string, category: string) => void
  addReward: (
    type: "reward" | "discount" | "freebie",
    id: string,
    name: string,
    description: string,
    image?: string,
    expiresAt?: Date,
  ) => void
  removeSticker: (id: string) => void
  removeReward: (id: string) => void
}

// Crear el contexto
const WalletContext = createContext<WalletContextType | undefined>(undefined)

// Props para el provider
interface WalletProviderMockProps {
  children: ReactNode
  initialStickers?: Sticker[]
  initialRewards?: Reward[]
}

// Componente provider
export function WalletProviderMock({ children, initialStickers = [], initialRewards = [] }: WalletProviderMockProps) {
  // Estado para stickers y recompensas
  const [stickers, setStickers] = useState<Sticker[]>(initialStickers)
  const [rewards, setRewards] = useState<Reward[]>(initialRewards)

  // Cargar datos del localStorage al iniciar
  useEffect(() => {
    try {
      const savedStickers = localStorage.getItem("wallet_stickers")
      const savedRewards = localStorage.getItem("wallet_rewards")

      if (savedStickers) {
        setStickers(JSON.parse(savedStickers))
      }

      if (savedRewards) {
        setRewards(JSON.parse(savedRewards))
      }
    } catch (error) {
      console.error("Error loading wallet data from localStorage:", error)
    }
  }, [])

  // Guardar datos en localStorage cuando cambien
  useEffect(() => {
    try {
      localStorage.setItem("wallet_stickers", JSON.stringify(stickers))
      localStorage.setItem("wallet_rewards", JSON.stringify(rewards))
    } catch (error) {
      console.error("Error saving wallet data to localStorage:", error)
    }
  }, [stickers, rewards])

  // Función para añadir un sticker
  const addSticker = (id: string, name: string, description: string, category: string) => {
    const newSticker: Sticker = {
      id,
      name,
      description,
      category,
      createdAt: new Date(),
    }

    setStickers((prev) => [...prev, newSticker])
  }

  // Función para añadir una recompensa
  const addReward = (
    type: "reward" | "discount" | "freebie",
    id: string,
    name: string,
    description: string,
    image?: string,
    expiresAt?: Date,
  ) => {
    const newReward: Reward = {
      type,
      id,
      name,
      description,
      image,
      expiresAt,
      createdAt: new Date(),
    }

    setRewards((prev) => [...prev, newReward])
  }

  // Función para eliminar un sticker
  const removeSticker = (id: string) => {
    setStickers((prev) => prev.filter((sticker) => sticker.id !== id))
  }

  // Función para eliminar una recompensa
  const removeReward = (id: string) => {
    setRewards((prev) => prev.filter((reward) => reward.id !== id))
  }

  // Valor del contexto
  const value = {
    stickers,
    rewards,
    addSticker,
    addReward,
    removeSticker,
    removeReward,
  }

  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>
}

// Hook para usar el contexto
export function useWalletMock() {
  const context = useContext(WalletContext)
  if (context === undefined) {
    throw new Error("useWalletMock must be used within a WalletProviderMock")
  }
  return context
}
