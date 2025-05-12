"use client"

import { useEffect, useState } from "react"

// Definir una interfaz para el wallet
interface WalletInterface {
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
  stickers: any[]
  rewards: any[]
}

// Hook seguro que no falla si no hay WalletProvider
export function useSafeWallet() {
  const [wallet, setWallet] = useState<WalletInterface | null>(null)
  const [isProviderMissing, setIsProviderMissing] = useState(true)
  const [walletHookLoaded, setWalletHookLoaded] = useState(false)
  const [mockWalletHookLoaded, setMockWalletHookLoaded] = useState(false)
  const [realWallet, setRealWallet] = useState<WalletInterface | null>(null)
  const [mockWallet, setMockWallet] = useState<WalletInterface | null>(null)

  // Load real wallet hook
  useEffect(() => {
    const loadRealWalletHook = async () => {
      try {
        const walletModule = await import("@/components/wallet/wallet-provider")
        if (walletModule.useWallet) {
          setWalletHookLoaded(true)
        }
      } catch (error) {
        console.warn("Error loading real wallet module:", error)
      }
    }

    loadRealWalletHook()
  }, [])

  // Load mock wallet hook
  useEffect(() => {
    const loadMockWalletHook = async () => {
      try {
        const mockModule = await import("@/components/wallet/wallet-provider-mock")
        if (mockModule.useWalletMock) {
          setMockWalletHookLoaded(true)
        }
      } catch (error) {
        console.warn("Error loading mock wallet module:", error)
      }
    }

    loadMockWalletHook()
  }, [])

  // Call real wallet hook
  useEffect(() => {
    if (walletHookLoaded) {
      try {
        const walletModule = require("@/components/wallet/wallet-provider")
        const walletInstance = walletModule.useWallet()
        setRealWallet(walletInstance)
        setIsProviderMissing(false)
      } catch (error) {
        console.warn("WalletProvider not found, using mock implementation")
        setIsProviderMissing(true)
      }
    }
  }, [walletHookLoaded])

  // Call mock wallet hook
  useEffect(() => {
    if (mockWalletHookLoaded) {
      try {
        const mockModule = require("@/components/wallet/wallet-provider-mock")
        const mockWalletInstance = mockModule.useWalletMock()
        setMockWallet(mockWalletInstance)
        setIsProviderMissing(true)
      } catch (error) {
        console.warn("WalletProviderMock not found, using dummy implementation")
        setIsProviderMissing(true)
      }
    }
  }, [mockWalletHookLoaded])

  useEffect(() => {
    if (realWallet) {
      setWallet(realWallet)
    } else if (mockWallet) {
      setWallet(mockWallet)
    } else {
      setWallet(createDummyWallet())
      setIsProviderMissing(true)
    }
  }, [realWallet, mockWallet])

  // Crear una implementación dummy que no hace nada
  const createDummyWallet = (): WalletInterface => {
    return {
      addSticker: () => console.log("Dummy addSticker called"),
      addReward: () => console.log("Dummy addReward called"),
      removeSticker: () => console.log("Dummy removeSticker called"),
      removeReward: () => console.log("Dummy removeReward called"),
      stickers: [],
      rewards: [],
    }
  }

  // Si no tenemos wallet, devolver la implementación dummy
  if (!wallet) {
    return {
      addSticker: () => console.log("Dummy addSticker called"),
      addReward: () => console.log("Dummy addReward called"),
      removeSticker: () => console.log("Dummy removeSticker called"),
      removeReward: () => console.log("Dummy removeReward called"),
      stickers: [],
      rewards: [],
      isProviderMissing: true,
    }
  }

  // Devolver el wallet con el flag de si el provider está ausente
  return {
    ...wallet,
    isProviderMissing,
  }
}
