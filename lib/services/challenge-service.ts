import type { UnifiedCard } from "../types/unified-card"
import { getTemplateForCard } from "../types/template-challenge-integration"
import type { Card } from "@/lib/types/unified-card"

// Tipos para el servicio de desafíos
export type ChallengeContext = {
  userId?: string
  location?: string
  time?: Date
  previousChallenges?: string[]
  emotionalState?: string
  groupSize?: number
  venue?: string
  capsuleType?: string
  archetypeId?: string
}

export type ChallengeResponse = {
  card: UnifiedCard
  aiPrompt?: string
  templateType?: string
  verificationMethod: "ai" | "manual" | "group" | "auto"
  difficulty: number
  estimatedDuration: number
}

// Clase principal del servicio de desafíos
class ChallengeService {
  private static instance: ChallengeService
  private cards: Card[] = []
  private challenges: Record<string, any> = {}
  private defaultCards: any[] = []

  private constructor() {
    // Cargar desafíos predefinidos
    try {
      this.defaultCards = [
        {
          card_id: "cortesia_001",
          nombre: "El Ex-Borracho",
          emoción: "despecho",
          rareza: "rara",
          tipo_desafío: "verbal",
          desafío: "POV: Le escribiste un mensaje pedo a tu ex... ¡pero era tu jefe!",
          nivel_caos: 4,
          referencia_cultural: "Ghosting Chronicles",
          estilo_visual: "emoji_glitch",
          ai_backup_prompt: "Genera una historia sobre cómo justificarías este mensaje sin morir de vergüenza.",
          trigger_social: "💬💀",
          verification_type: "grupo",
          interaction_mode: "texto",
          template_used: "ChatToxico",
          reward: {
            digital: "Sticker AR 'Rey del DM Fallido'",
            physical: "QR canjeable por shot gratis",
            social: "#DespechoTecate",
          },
          social_trigger: "Si alguien dice 'yo también lo hice', ambos ganan la cortesía.",
        },
        // ... más cartas
      ]

      // Convertir a formato de desafíos
      this.defaultCards.forEach((card) => {
        this.challenges[card.card_id] = this.convertToChallenge(card)
      })
    } catch (error) {
      console.error("Error loading default challenges:", error)
    }
  }

  public static getInstance(): ChallengeService {
    if (!ChallengeService.instance) {
      ChallengeService.instance = new ChallengeService()
    }
    return ChallengeService.instance
  }

  public setCards(cards: Card[]): void {
    this.cards = cards
  }

  public getChallenges(): Card[] {
    return this.cards
  }

  public getChallengeById(id: string): Card | undefined {
    return this.cards.find((card) => card.card_id === id)
  }

  public generateChallenge(): Card {
    // Basic implementation: returns a random card
    const randomIndex = Math.floor(Math.random() * this.cards.length)
    return this.cards[randomIndex]
  }

  // Convertir formato de carta a desafío
  private convertToChallenge(card: any): UnifiedCard {
    return {
      card_id: card.card_id,
      card_title: card.nombre,
      challenge: card.desafío,
      challenge_type: this.mapChallengeType(card.tipo_desafío),
      challenge_category: this.mapEmotion(card.emoción),
      interaction_format: this.mapInteractionMode(card.interaction_mode),
      tone_subtype: this.mapEmotion(card.emoción),
      emotional_tier: this.mapChaosLevel(card.nivel_caos),
      theme_tag: card.referencia_cultural,
      genre_tag: card.emoción,
      social_trigger: card.social_trigger,
      verification_type: this.mapVerificationType(card.verification_type),
      reward: card.reward.digital,
      reward_type: "sticker",
      experience_type: "campaign",
      difficulty_level: this.mapChaosLevel(card.nivel_caos),
      ai_backup_response: card.ai_backup_prompt,
    }
  }

  // Mapeos de tipos
  private mapChallengeType(tipo: string): "individual" | "duet" | "group" {
    const map: Record<string, "individual" | "duet" | "group"> = {
      verbal: "individual",
      performance: "individual",
      karaoke: "individual",
      story: "individual",
      roleplay: "duet",
      visual: "individual",
      confesión: "individual",
      digital: "individual",
      group: "group",
    }
    return map[tipo] || "individual"
  }

  private mapEmotion(emocion: string): any {
    // Mapeo simplificado para demostración
    return emocion
  }

  private mapInteractionMode(mode: string): any {
    const map: Record<string, any> = {
      texto: "texto_imagen",
      voz: "voz_texto",
      foto: "descripcion_imagen",
      audio: "vocal_improvisacion",
    }
    return map[mode] || "texto_imagen"
  }

  private mapVerificationType(type: string): "self" | "group" | "ai" | "photo" | "audio" | "none" {
    const map: Record<string, "self" | "group" | "ai" | "photo" | "audio" | "none"> = {
      grupo: "group",
      auto: "self",
      ia: "ai",
    }
    return map[type] || "self"
  }

  private mapChaosLevel(level: number): "mild" | "intense" | "chaotic" {
    if (level <= 2) return "mild"
    if (level <= 4) return "intense"
    return "chaotic"
  }

  // Métodos públicos
  // public async getChallengeById(id: string): Promise<UnifiedCard | null> {
  //   return this.challenges[id] || null
  // }

  public async generateChallenge(context: ChallengeContext): Promise<ChallengeResponse> {
    // Lógica para generar un desafío basado en el contexto
    // Por ahora, seleccionamos uno aleatorio de los predefinidos
    const cardIds = Object.keys(this.challenges)
    const randomId = cardIds[Math.floor(Math.random() * cardIds.length)]
    const card = this.challenges[randomId]

    // Si tenemos contexto de cápsula y arquetipo, intentamos encontrar un desafío específico
    if (context.capsuleType && context.archetypeId) {
      const specificId = `${context.capsuleType}_${context.archetypeId}`
      if (this.challenges[specificId]) {
        return this.createChallengeResponse(this.challenges[specificId])
      }
    }

    return this.createChallengeResponse(card)
  }

  private createChallengeResponse(card: UnifiedCard): ChallengeResponse {
    const templateConfig = getTemplateForCard(card)

    return {
      card,
      aiPrompt: card.ai_backup_response,
      templateType: templateConfig?.templateType,
      verificationMethod: templateConfig?.verificationMethod || "manual",
      difficulty: card.difficulty_level === "easy" ? 1 : card.difficulty_level === "medium" ? 2 : 3,
      estimatedDuration: card.challenge_type === "group" ? 120 : 60,
    }
  }

  // Método para cargar desafíos personalizados
  public loadChallenges(challenges: any[]): void {
    challenges.forEach((challenge) => {
      this.challenges[challenge.card_id] = this.convertToChallenge(challenge)
    })
  }
}

// Exportar una instancia del servicio
export default ChallengeService.getInstance()
