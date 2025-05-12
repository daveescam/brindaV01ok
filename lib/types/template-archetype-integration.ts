import type { CapsuleType } from "./capsule-engine"
import type { UnifiedCard } from "./unified-card"

// Tipos de plantillas disponibles
export type TemplateType =
  | "chat_toxico"
  | "instagram_despechado"
  | "meme_despecho"
  | "revista_drama"
  | "tiktok_despecho"
  | "perfil_citas"
  | "notificacion_redflag"

// Configuración de una plantilla para un arquetipo específico
export interface TemplateArchetypeConfig {
  templateType: TemplateType
  archetypeId: string
  capsuleType: CapsuleType
  promptPrefix?: string
  promptSuffix?: string
  defaultValues?: Record<string, any>
  requiredFields?: string[]
  emotionalTier: "mild" | "intense" | "chaotic"
  verificationPoints: number
  socialTrigger?: string
}

// Mapeo de arquetipos a plantillas recomendadas
export const ARCHETYPE_TEMPLATE_MAPPING: Record<string, TemplateType[]> = {
  // 100 Borrachos Dijeron
  malacopa: ["chat_toxico", "meme_despecho"],
  extexter: ["chat_toxico", "notificacion_redflag"],
  shotfinal: ["meme_despecho", "instagram_despechado"],
  crudaemocional: ["revista_drama", "tiktok_despecho"],
  despertar: ["instagram_despechado", "meme_despecho"],

  // Ritual Despecho
  extoxico: ["notificacion_redflag", "chat_toxico"],
  ghosteado: ["chat_toxico", "instagram_despechado"],
  stalker: ["perfil_citas", "instagram_despechado"],
  playlist: ["tiktok_despecho", "revista_drama"],
  borrachodeamor: ["chat_toxico", "meme_despecho"],

  // LinkedIn Caótico
  influencer: ["instagram_despechado", "revista_drama"],
  humblebragger: ["instagram_despechado", "notificacion_redflag"],
  networker: ["perfil_citas", "chat_toxico"],
  startupguy: ["revista_drama", "meme_despecho"],
  consultant: ["notificacion_redflag", "revista_drama"],
}

// Configuraciones predefinidas para combinaciones específicas de arquetipo y plantilla
export const TEMPLATE_ARCHETYPE_CONFIGS: TemplateArchetypeConfig[] = [
  // 100 Borrachos Dijeron - El Malacopa
  {
    templateType: "chat_toxico",
    archetypeId: "malacopa",
    capsuleType: "borrachos",
    promptPrefix: "Mensaje borracho a las 3am: ",
    defaultValues: {
      contactName: "Grupo de Amigos 🍻",
      lastSeen: "Hace 5 minutos",
    },
    emotionalTier: "intense",
    verificationPoints: 10,
    socialTrigger: "Si alguien más comparte un mensaje vergonzoso, ambos ganan 5 puntos extra",
  },
  {
    templateType: "meme_despecho",
    archetypeId: "malacopa",
    capsuleType: "borrachos",
    defaultValues: {
      topText: "YO DESPUÉS DE",
      bottomText: "5 SHOTS DE TEQUILA",
    },
    emotionalTier: "mild",
    verificationPoints: 5,
  },

  // 100 Borrachos Dijeron - El Ex-Texter
  {
    templateType: "chat_toxico",
    archetypeId: "extexter",
    capsuleType: "borrachos",
    promptPrefix: "Mensaje a tu ex que nunca deberías haber enviado: ",
    defaultValues: {
      contactName: "Ex 🚫",
      lastSeen: "Hace 3 semanas",
    },
    emotionalTier: "chaotic",
    verificationPoints: 15,
    socialTrigger: "Si tu mensaje hace reír a todo el grupo, ganas 10 puntos extra",
  },

  // Ritual Despecho - El Ex Tóxico
  {
    templateType: "notificacion_redflag",
    archetypeId: "extoxico",
    capsuleType: "despecho",
    promptPrefix: "Red flag que ignoraste en tu ex: ",
    defaultValues: {
      title: "🚩 ALERTA DE RED FLAG 🚩",
    },
    emotionalTier: "intense",
    verificationPoints: 10,
    socialTrigger: "Si alguien dice 'me pasó igual', ambos ganan 3 puntos extra",
  },

  // Ritual Despecho - El Ghosteado
  {
    templateType: "instagram_despechado",
    archetypeId: "ghosteado",
    capsuleType: "despecho",
    promptPrefix: "Caption indirecta para: ",
    defaultValues: {
      username: "alma_en_visto",
      location: "Zona de Ghosting",
      likes: 184,
    },
    emotionalTier: "intense",
    verificationPoints: 10,
  },

  // Añadir más configuraciones para otras combinaciones...
]

// Función para obtener las plantillas recomendadas para un arquetipo
export function getRecommendedTemplatesForArchetype(archetypeId: string): TemplateType[] {
  return ARCHETYPE_TEMPLATE_MAPPING[archetypeId] || ["chat_toxico", "meme_despecho"]
}

// Función para obtener la configuración de una plantilla para un arquetipo específico
export function getTemplateConfigForArchetype(
  templateType: TemplateType,
  archetypeId: string,
  capsuleType: CapsuleType,
): TemplateArchetypeConfig | null {
  const config = TEMPLATE_ARCHETYPE_CONFIGS.find(
    (config) =>
      config.templateType === templateType && config.archetypeId === archetypeId && config.capsuleType === capsuleType,
  )

  if (config) return config

  // Si no hay configuración específica, crear una genérica
  return {
    templateType,
    archetypeId,
    capsuleType,
    emotionalTier: "mild",
    verificationPoints: 5,
  }
}

// Función para obtener la configuración de una plantilla para una carta unificada
export function getTemplateConfigForCard(card: UnifiedCard): TemplateArchetypeConfig | null {
  // Extraer el ID del arquetipo y el tipo de cápsula de la carta
  const cardIdParts = card.card_id.split("_")
  if (cardIdParts.length < 2) return null

  const capsuleType = cardIdParts[0] as CapsuleType
  const archetypeId = cardIdParts[1]

  // Obtener las plantillas recomendadas para este arquetipo
  const recommendedTemplates = getRecommendedTemplatesForArchetype(archetypeId)
  if (recommendedTemplates.length === 0) return null

  // Usar la primera plantilla recomendada
  return getTemplateConfigForArchetype(recommendedTemplates[0], archetypeId, capsuleType)
}

// Función para verificar si una carta tiene integración de plantilla
export function hasTemplateIntegration(card: UnifiedCard): boolean {
  const cardIdParts = card.card_id.split("_")
  if (cardIdParts.length < 2) return false

  const archetypeId = cardIdParts[1]
  return !!ARCHETYPE_TEMPLATE_MAPPING[archetypeId]
}

// Función para generar un prompt para una plantilla basado en la carta y la configuración
export function generateTemplatePrompt(card: UnifiedCard, config: TemplateArchetypeConfig): string {
  let prompt = card.challenge

  if (config.promptPrefix) {
    prompt = config.promptPrefix + prompt
  }

  if (config.promptSuffix) {
    prompt = prompt + config.promptSuffix
  }

  return prompt
}

// Función para generar un resultado de verificación para una plantilla
export function generateTemplateVerification(
  card: UnifiedCard,
  config: TemplateArchetypeConfig,
  templateResult: any,
): any {
  return {
    cardId: card.card_id,
    templateType: config.templateType,
    archetypeId: config.archetypeId,
    capsuleType: config.capsuleType,
    emotionalTier: config.emotionalTier,
    points: config.verificationPoints,
    result: templateResult,
    timestamp: Date.now(),
  }
}
