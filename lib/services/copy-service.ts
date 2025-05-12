import type { CapsuleType } from "../types/capsule-engine"
import type { ToneSubtype } from "../types/unified-card"

// Tipos para el servicio de copy
export type CopyType =
  | "challenge"
  | "reward_description"
  | "social_trigger"
  | "notification"
  | "vault_description"
  | "template_prompt"
  | "ai_backup_prompt"
  | "card_title"

export type CopyContext = {
  capsuleType?: CapsuleType
  archetypeId?: string
  toneSubtype?: ToneSubtype
  emotionalTier?: "mild" | "intense" | "chaotic"
  templateType?: string
  rewardType?: string
  challengeType?: string
  targetAudience?: "individual" | "group"
  venue?: string
  language?: "es" | "en"
}

export type CopyVariant = {
  id: string
  text: string
  context: CopyContext
  tags: string[]
  usageCount: number
  rating: number
}

// Clase principal del servicio de copy
class CopyService {
  private static instance: CopyService
  private copyVariants: Record<CopyType, CopyVariant[]> = {
    challenge: [],
    reward_description: [],
    social_trigger: [],
    notification: [],
    vault_description: [],
    template_prompt: [],
    ai_backup_prompt: [],
    card_title: [],
  }
  private copies: any[] = []

  private constructor() {
    // Inicializar con algunas variantes de ejemplo
    this.initializeCopyVariants()
  }

  // Patrón Singleton
  public static getInstance(): CopyService {
    if (!CopyService.instance) {
      CopyService.instance = new CopyService()
    }
    return CopyService.instance
  }

  public setCopies(copies: any[]): void {
    this.copies = copies
  }

  public getCopies(): any[] {
    return this.copies
  }

  public getCopyById(id: string): any | undefined {
    return this.copies.find((copy) => copy.id === id)
  }

  public generateCopy(template: string, data: any): string {
    // Logic to generate copy based on a template and data
    console.log(`Generating copy from template: ${template}`)
    return `Generated copy from ${template} with data: ${JSON.stringify(data)}`
  }

  private initializeCopyVariants() {
    // Desafíos
    this.copyVariants.challenge = [
      {
        id: "challenge_001",
        text: "POV: Le escribiste un mensaje pedo a tu ex... ¡pero era tu jefe!",
        context: {
          capsuleType: "borrachos",
          archetypeId: "extexter",
          toneSubtype: "humoristico",
          emotionalTier: "intense",
          templateType: "ChatToxico",
          targetAudience: "individual",
          language: "es",
        },
        tags: ["mensaje", "ex", "jefe", "borracho"],
        usageCount: 42,
        rating: 4.8,
      },
      {
        id: "challenge_002",
        text: "Relata tu peor caída pública después de 5 mezcales.",
        context: {
          capsuleType: "borrachos",
          archetypeId: "malacopa",
          toneSubtype: "caotico",
          emotionalTier: "chaotic",
          templateType: "InstagramDespechado",
          targetAudience: "individual",
          language: "es",
        },
        tags: ["caída", "mezcal", "público", "vergüenza"],
        usageCount: 38,
        rating: 4.6,
      },
      {
        id: "challenge_003",
        text: "¿Qué has dicho pedo que sabías que no cumplirías?",
        context: {
          capsuleType: "borrachos",
          archetypeId: "shotfinal",
          toneSubtype: "ironico",
          emotionalTier: "mild",
          templateType: "InstagramDespechado",
          targetAudience: "individual",
          language: "es",
        },
        tags: ["promesa", "borracho", "incumplir"],
        usageCount: 29,
        rating: 4.3,
      },
    ]

    // Social triggers
    this.copyVariants.social_trigger = [
      {
        id: "social_trigger_001",
        text: "Si alguien dice 'yo también lo hice', ambos ganan la cortesía.",
        context: {
          capsuleType: "borrachos",
          archetypeId: "extexter",
          emotionalTier: "intense",
          targetAudience: "group",
          language: "es",
        },
        tags: ["grupo", "confesión", "compartir"],
        usageCount: 56,
        rating: 4.7,
      },
      {
        id: "social_trigger_002",
        text: "Si todos aprueban tu historia, ganas un sticker exclusivo.",
        context: {
          capsuleType: "borrachos",
          archetypeId: "malacopa",
          emotionalTier: "chaotic",
          targetAudience: "group",
          language: "es",
        },
        tags: ["aprobación", "grupo", "historia"],
        usageCount: 48,
        rating: 4.5,
      },
      {
        id: "social_trigger_003",
        text: "Si compartes en redes con #DespertarBrinda, obtienes XP extra.",
        context: {
          capsuleType: "borrachos",
          archetypeId: "despertar",
          emotionalTier: "mild",
          targetAudience: "individual",
          language: "es",
        },
        tags: ["redes", "compartir", "hashtag"],
        usageCount: 37,
        rating: 4.2,
      },
    ]

    // AI backup prompts
    this.copyVariants.ai_backup_prompt = [
      {
        id: "ai_prompt_001",
        text: "Genera una historia sobre cómo justificarías este mensaje sin morir de vergüenza.",
        context: {
          capsuleType: "borrachos",
          archetypeId: "extexter",
          toneSubtype: "humoristico",
          templateType: "ChatToxico",
          language: "es",
        },
        tags: ["mensaje", "justificación", "vergüenza"],
        usageCount: 28,
        rating: 4.6,
      },
      {
        id: "ai_prompt_002",
        text: "Imagina que estás borracho y te caes en medio de un bar. Describe cómo fue tu caída con detalles cómicos.",
        context: {
          capsuleType: "borrachos",
          archetypeId: "malacopa",
          toneSubtype: "caotico",
          templateType: "InstagramDespechado",
          language: "es",
        },
        tags: ["caída", "bar", "cómico"],
        usageCount: 32,
        rating: 4.8,
      },
      {
        id: "ai_prompt_003",
        text: "Escribe una excusa ridículamente creativa para faltar al trabajo después de haber bebido demasiado.",
        context: {
          capsuleType: "borrachos",
          archetypeId: "shotfinal",
          toneSubtype: "ironico",
          templateType: "MemeDespecho",
          language: "es",
        },
        tags: ["excusa", "trabajo", "creativo"],
        usageCount: 25,
        rating: 4.4,
      },
    ]

    // Reward descriptions
    this.copyVariants.reward_description = [
      {
        id: "reward_001",
        text: "Sticker AR 'Rey del DM Fallido'",
        context: {
          rewardType: "sticker",
          capsuleType: "borrachos",
          archetypeId: "extexter",
          language: "es",
        },
        tags: ["sticker", "AR", "mensaje"],
        usageCount: 42,
        rating: 4.5,
      },
      {
        id: "reward_002",
        text: "QR canjeable por shot gratis",
        context: {
          rewardType: "shot",
          capsuleType: "borrachos",
          archetypeId: "shotfinal",
          language: "es",
        },
        tags: ["QR", "shot", "gratis"],
        usageCount: 67,
        rating: 4.9,
      },
      {
        id: "reward_003",
        text: "NFT de 'Influencer Corporativo'",
        context: {
          rewardType: "digital",
          capsuleType: "linkedin",
          archetypeId: "influencer",
          language: "es",
        },
        tags: ["NFT", "influencer", "digital"],
        usageCount: 18,
        rating: 4.2,
      },
    ]

    // Template prompts
    this.copyVariants.template_prompt = [
      {
        id: "template_prompt_001",
        text: "Mensaje borracho a las 3am: ",
        context: {
          templateType: "ChatToxico",
          capsuleType: "borrachos",
          archetypeId: "extexter",
          language: "es",
        },
        tags: ["mensaje", "borracho", "3am"],
        usageCount: 53,
        rating: 4.7,
      },
      {
        id: "template_prompt_002",
        text: "Caption indirecta para: ",
        context: {
          templateType: "InstagramDespechado",
          capsuleType: "despecho",
          archetypeId: "ghosteado",
          language: "es",
        },
        tags: ["caption", "indirecta", "instagram"],
        usageCount: 48,
        rating: 4.6,
      },
      {
        id: "template_prompt_003",
        text: "Red flag que ignoraste en tu ex: ",
        context: {
          templateType: "NotificacionRedFlag",
          capsuleType: "despecho",
          archetypeId: "extoxico",
          language: "es",
        },
        tags: ["red flag", "ex", "ignorar"],
        usageCount: 61,
        rating: 4.8,
      },
    ]

    // Card titles
    this.copyVariants.card_title = [
      {
        id: "card_title_001",
        text: "El Ex-Borracho",
        context: {
          capsuleType: "borrachos",
          archetypeId: "extexter",
          language: "es",
        },
        tags: ["ex", "borracho", "título"],
        usageCount: 42,
        rating: 4.5,
      },
      {
        id: "card_title_002",
        text: "El Malacopa",
        context: {
          capsuleType: "borrachos",
          archetypeId: "malacopa",
          language: "es",
        },
        tags: ["malacopa", "título"],
        usageCount: 56,
        rating: 4.8,
      },
      {
        id: "card_title_003",
        text: "La Promesa Falsa",
        context: {
          capsuleType: "borrachos",
          archetypeId: "shotfinal",
          language: "es",
        },
        tags: ["promesa", "falsa", "título"],
        usageCount: 38,
        rating: 4.4,
      },
    ]
  }

  // Métodos públicos
  public async generateCopy2(type: CopyType, context: CopyContext, count = 1): Promise<string[]> {
    // Filtrar variantes que coincidan con el contexto
    const matchingVariants = this.filterVariantsByContext(type, context)

    // Si no hay variantes que coincidan, generar texto genérico
    if (matchingVariants.length === 0) {
      return this.generateGenericCopy(type, context, count)
    }

    // Ordenar por rating y uso
    matchingVariants.sort((a, b) => {
      // 70% importancia al rating, 30% a la frecuencia de uso (inversa)
      const ratingScore = (b.rating - a.rating) * 0.7
      const usageScore = ((a.usageCount - b.usageCount) * 0.3) / 100
      return ratingScore + usageScore
    })

    // Seleccionar las mejores variantes
    const selectedVariants = matchingVariants.slice(0, count)

    // Incrementar contador de uso
    selectedVariants.forEach((variant) => {
      variant.usageCount += 1
    })

    return selectedVariants.map((variant) => variant.text)
  }

  private filterVariantsByContext(type: CopyType, context: CopyContext): CopyVariant[] {
    const variants = this.copyVariants[type]

    return variants.filter((variant) => {
      // Verificar coincidencias de contexto
      const contextMatch = Object.entries(context).every(([key, value]) => {
        // Si el valor no está definido en el contexto de la variante, se considera coincidencia
        if (variant.context[key as keyof CopyContext] === undefined) {
          return true
        }

        // Si el valor está definido, debe coincidir
        return variant.context[key as keyof CopyContext] === value
      })

      return contextMatch
    })
  }

  private generateGenericCopy(type: CopyType, context: CopyContext, count: number): string[] {
    const result: string[] = []

    for (let i = 0; i < count; i++) {
      let text = ""

      switch (type) {
        case "challenge":
          text = this.generateGenericChallenge(context)
          break
        case "social_trigger":
          text = this.generateGenericSocialTrigger(context)
          break
        case "ai_backup_prompt":
          text = this.generateGenericAIPrompt(context)
          break
        case "reward_description":
          text = this.generateGenericReward(context)
          break
        case "template_prompt":
          text = this.generateGenericTemplatePrompt(context)
          break
        case "card_title":
          text = this.generateGenericCardTitle(context)
          break
        default:
          text = "Texto genérico"
      }

      result.push(text)
    }

    return result
  }

  private generateGenericChallenge(context: CopyContext): string {
    const challenges = [
      "Cuenta una historia vergonzosa relacionada con alcohol",
      "Comparte tu peor experiencia en una fiesta",
      "¿Cuál es el mensaje más incómodo que has enviado?",
      "Describe tu peor resaca en tres palabras",
      "¿Qué promesa hiciste borracho/a que nunca cumpliste?",
    ]

    return challenges[Math.floor(Math.random() * challenges.length)]
  }

  private generateGenericSocialTrigger(context: CopyContext): string {
    const triggers = [
      "Si alguien más comparte una historia similar, ambos ganan puntos extra",
      "Si todo el grupo vota a favor, ganas una recompensa especial",
      "Si compartes en redes sociales, desbloqueas un sticker exclusivo",
      "Si haces reír a todos, duplicas tu recompensa",
      "Si alguien dice 'yo también', ambos ganan un bonus",
    ]

    return triggers[Math.floor(Math.random() * triggers.length)]
  }

  private generateGenericAIPrompt(context: CopyContext): string {
    const prompts = [
      "Genera una historia divertida sobre una noche de fiesta que salió mal",
      "Escribe un mensaje de texto que enviarías estando borracho/a",
      "Crea una excusa creativa para justificar tu comportamiento después de beber",
      "Inventa una anécdota vergonzosa que podría pasar en un bar",
      "Describe cómo sería tu peor resaca de forma humorística",
    ]

    return prompts[Math.floor(Math.random() * prompts.length)]
  }

  private generateGenericReward(context: CopyContext): string {
    const rewards = [
      "Sticker digital exclusivo",
      "QR para bebida gratis",
      "Descuento especial en tu próxima visita",
      "Acceso a contenido exclusivo",
      "Puntos extra para tu perfil",
    ]

    return rewards[Math.floor(Math.random() * rewards.length)]
  }

  private generateGenericTemplatePrompt(context: CopyContext): string {
    const prompts = [
      "Escribe aquí tu mensaje: ",
      "Comparte tu historia: ",
      "Cuéntanos tu experiencia: ",
      "Describe lo que pasó: ",
      "Comparte tu anécdota: ",
    ]

    return prompts[Math.floor(Math.random() * prompts.length)]
  }

  private generateGenericCardTitle(context: CopyContext): string {
    const titles = ["El Aventurero", "La Confesión", "El Desastre", "La Anécdota", "El Recuerdo"]

    return titles[Math.floor(Math.random() * titles.length)]
  }

  // Métodos para añadir y actualizar variantes
  public async addCopyVariant(
    type: CopyType,
    variant: Omit<CopyVariant, "id" | "usageCount" | "rating">,
  ): Promise<CopyVariant> {
    const newVariant: CopyVariant = {
      ...variant,
      id: `${type}_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      usageCount: 0,
      rating: 3.0, // Rating inicial neutral
    }

    this.copyVariants[type].push(newVariant)
    return newVariant
  }

  public async updateVariantRating(type: CopyType, id: string, rating: number): Promise<boolean> {
    const variant = this.copyVariants[type].find((v) => v.id === id)

    if (!variant) {
      return false
    }

    // Actualizar rating (promedio ponderado)
    const oldWeight = variant.usageCount
    const newWeight = 1
    const totalWeight = oldWeight + newWeight

    variant.rating = (variant.rating * oldWeight + rating * newWeight) / totalWeight

    return true
  }

  public async getTopVariants(type: CopyType, limit = 10): Promise<CopyVariant[]> {
    return [...this.copyVariants[type]].sort((a, b) => b.rating - a.rating).slice(0, limit)
  }
}

// Exportar una instancia del servicio
export const copyService = CopyService.getInstance()
export default CopyService.getInstance()
