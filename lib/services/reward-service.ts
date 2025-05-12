import type { UnifiedCard } from "../types/unified-card"
import type { WalletItem } from "../types/wallet-engine"

// Tipos para el servicio de recompensas
export type RewardType = "sticker" | "discount" | "product" | "experience" | "shot" | "combo" | "zerosum_card"

export type RewardContext = {
  userId: string
  challengeId: string
  card: UnifiedCard
  completionTime?: number
  verificationMethod: string
  verificationResult: boolean
  socialTriggerActivated?: boolean
  venue?: string
  capsuleType?: string
  archetypeId?: string
}

export type RewardResponse = {
  success: boolean
  walletItem?: WalletItem
  message: string
  rewardType: RewardType
  rewardValue?: number
  redeemCode?: string
  expiresAt?: Date
}

// Clase principal del servicio de recompensas
class RewardService {
  private static instance: RewardService
  private rewards: any[] = []
  private rewardTemplates: Record<string, any> = {}

  private constructor() {
    // Inicializar plantillas de recompensas
    this.initializeRewardTemplates()
  }

  public static getInstance(): RewardService {
    if (!RewardService.instance) {
      RewardService.instance = new RewardService()
    }
    return RewardService.instance
  }

  public setRewards(rewards: any[]): void {
    this.rewards = rewards
  }

  public getRewards(): any[] {
    return this.rewards
  }

  public getRewardById(id: string): any | undefined {
    return this.rewards.find((reward) => reward.id === id)
  }

  public assignReward(user: any, reward: any): void {
    // Logic to assign a reward to a user
    console.log(`Reward ${reward.name} assigned to user ${user.id}`)
  }

  private initializeRewardTemplates() {
    // Plantillas básicas de recompensas
    this.rewardTemplates = {
      sticker_default: {
        type: "sticker",
        title: "Sticker Digital",
        description: "Un sticker digital para tu colección",
        imageUrl: "/stickers/default.png",
        value: 5,
      },
      shot_default: {
        type: "shot",
        title: "Shot Gratis",
        description: "Un shot gratis en tu próxima visita",
        imageUrl: "/rewards/shot.png",
        value: 10,
        expiresInDays: 7,
      },
      discount_default: {
        type: "discount",
        title: "10% de Descuento",
        description: "10% de descuento en tu próxima compra",
        imageUrl: "/rewards/discount.png",
        value: 15,
        expiresInDays: 30,
      },
      product_default: {
        type: "product",
        title: "Producto Gratis",
        description: "Un producto gratis en tu próxima visita",
        imageUrl: "/rewards/product.png",
        value: 20,
        expiresInDays: 14,
      },
      experience_default: {
        type: "experience",
        title: "Experiencia Exclusiva",
        description: "Acceso a una experiencia exclusiva",
        imageUrl: "/rewards/experience.png",
        value: 50,
        expiresInDays: 60,
      },
    }

    // Añadir plantillas específicas para cada tipo de carta
    this.rewardTemplates["cortesia_001"] = {
      type: "sticker",
      title: "Rey del DM Fallido",
      description: "Sticker AR 'Rey del DM Fallido'",
      imageUrl: "/stickers/dm_fallido.png",
      value: 15,
    }

    // Más plantillas específicas...
  }

  // Generar una recompensa basada en el contexto
  public async generateReward(context: RewardContext): Promise<RewardResponse> {
    // Si la verificación falló, no hay recompensa
    if (!context.verificationResult) {
      return {
        success: false,
        message: "No se pudo verificar el desafío",
        rewardType: "sticker",
      }
    }

    // Determinar la plantilla de recompensa
    let rewardTemplate = this.rewardTemplates["sticker_default"]

    // Si hay una plantilla específica para esta carta, usarla
    if (this.rewardTemplates[context.card.card_id]) {
      rewardTemplate = this.rewardTemplates[context.card.card_id]
    } else if (context.card.reward_type && this.rewardTemplates[`${context.card.reward_type}_default`]) {
      rewardTemplate = this.rewardTemplates[`${context.card.reward_type}_default`]
    }

    // Aplicar bonus si se activó el trigger social
    const valueMultiplier = context.socialTriggerActivated ? 2 : 1

    // Crear el item para la wallet
    const walletItem: WalletItem = {
      id: `reward_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      type: rewardTemplate.type,
      title: rewardTemplate.title,
      description: rewardTemplate.description,
      imageUrl: rewardTemplate.imageUrl,
      value: rewardTemplate.value * valueMultiplier,
      createdAt: new Date(),
      expiresAt: rewardTemplate.expiresInDays
        ? new Date(Date.now() + rewardTemplate.expiresInDays * 24 * 60 * 60 * 1000)
        : undefined,
      metadata: {
        challengeId: context.challengeId,
        cardId: context.card.card_id,
        venue: context.venue,
        socialTriggerActivated: context.socialTriggerActivated,
      },
    }

    // Generar código de canje para recompensas físicas
    const redeemCode = this.generateRedeemCode(rewardTemplate.type)

    return {
      success: true,
      walletItem,
      message: `¡Has ganado ${rewardTemplate.title}!`,
      rewardType: rewardTemplate.type as RewardType,
      rewardValue: rewardTemplate.value * valueMultiplier,
      redeemCode: ["shot", "product", "discount", "experience"].includes(rewardTemplate.type) ? redeemCode : undefined,
      expiresAt: walletItem.expiresAt,
    }
  }

  // Generar un código de canje único
  private generateRedeemCode(type: string): string {
    const prefix = type.substring(0, 2).toUpperCase()
    const timestamp = Date.now().toString(36).substring(4, 10)
    const random = Math.floor(Math.random() * 1000)
      .toString()
      .padStart(3, "0")
    return `${prefix}-${timestamp}-${random}`
  }

  // Verificar si un código de canje es válido
  public async verifyRedeemCode(code: string): Promise<boolean> {
    // Aquí iría la lógica para verificar el código en una base de datos
    // Por ahora, simplemente verificamos el formato
    const regex = /^[A-Z]{2}-[a-z0-9]{6}-\d{3}$/
    return regex.test(code)
  }

  // Marcar una recompensa como canjeada
  public async markRewardAsRedeemed(rewardId: string): Promise<boolean> {
    // Aquí iría la lógica para marcar la recompensa como canjeada en una base de datos
    console.log(`Reward ${rewardId} marked as redeemed`)
    return true
  }
}

// Exportar una instancia del servicio
export const rewardService = RewardService.getInstance()

export default RewardService.getInstance()
