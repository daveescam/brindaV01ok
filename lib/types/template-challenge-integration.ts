import type { ArchetypeChallenge } from "./capsule-engine"
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

// Mapeo de tipos de desafío a plantillas
export const CHALLENGE_TYPE_TO_TEMPLATE: Record<string, TemplateType> = {
  confession: "chat_toxico",
  performance: "tiktok_despecho",
  karaoke: "tiktok_despecho",
  vote: "instagram_despechado",
  story: "revista_drama",
  roleplay: "perfil_citas",
}

// Mapeo de formatos de respuesta a plantillas
export const RESPONSE_FORMAT_TO_TEMPLATE: Record<string, TemplateType> = {
  voice: "chat_toxico",
  video: "tiktok_despecho",
  text: "instagram_despechado",
  group: "meme_despecho",
}

// Configuración de una plantilla para un desafío específico
export interface TemplateChallengeConfig {
  templateType: TemplateType
  defaultValues?: Record<string, any>
  promptPrefix?: string
  promptSuffix?: string
  verificationMethod: "ai" | "manual" | "group"
  requiredFields?: string[]
}

// Mapeo directo de desafíos a plantillas específicas
export const CHALLENGE_TEMPLATE_MAPPING: Record<string, TemplateChallengeConfig> = {
  // 100 Borrachos Dijeron
  borrachos_malacopa: {
    templateType: "chat_toxico",
    defaultValues: {
      contactName: "Grupo de Amigos 🍻",
      lastSeen: "Hace 5 minutos",
    },
    promptPrefix: "Mensaje borracho a las 3am: ",
    verificationMethod: "manual",
  },
  borrachos_extexter: {
    templateType: "chat_toxico",
    defaultValues: {
      contactName: "Ex 🚫",
      lastSeen: "Hace 3 semanas",
    },
    promptPrefix: "Mensaje a tu ex que nunca deberías haber enviado: ",
    verificationMethod: "manual",
  },
  borrachos_shotfinal: {
    templateType: "tiktok_despecho",
    defaultValues: {
      username: "shot_final",
      likes: 420,
      comments: 69,
    },
    verificationMethod: "ai",
  },
  borrachos_crudaemocional: {
    templateType: "revista_drama",
    defaultValues: {
      title: "CRUDA EMOCIONAL",
      subtitle: "Confesiones de una noche que nadie recuerda",
    },
    verificationMethod: "manual",
  },
  borrachos_despertar: {
    templateType: "meme_despecho",
    defaultValues: {
      topText: "CUANDO DESPIERTAS",
      bottomText: "Y NO SABES DÓNDE ESTÁS",
    },
    verificationMethod: "group",
  },

  // Ritual Despecho
  despecho_extoxico: {
    templateType: "notificacion_redflag",
    defaultValues: {
      title: "🚩 ALERTA DE RED FLAG 🚩",
    },
    promptPrefix: "Red flag que ignoraste en tu ex: ",
    verificationMethod: "group",
  },
  despecho_ghosteado: {
    templateType: "instagram_despechado",
    defaultValues: {
      username: "alma_en_visto",
      location: "Zona de Ghosting",
      likes: 184,
    },
    promptPrefix: "Caption indirecta para: ",
    verificationMethod: "manual",
  },
  despecho_stalker: {
    templateType: "perfil_citas",
    defaultValues: {
      name: "Stalker Nocturno",
      age: 28,
      bio: "Experto en investigación de perfiles a las 2am",
    },
    verificationMethod: "manual",
  },
  despecho_playlist: {
    templateType: "tiktok_despecho",
    defaultValues: {
      username: "playlist_dolor",
      likes: 999,
      comments: 88,
    },
    verificationMethod: "ai",
  },
  despecho_borrachodeamor: {
    templateType: "chat_toxico",
    defaultValues: {
      contactName: "Ex (NO ESCRIBIR) ⛔",
      lastSeen: "En línea",
    },
    promptPrefix: "Mensaje borracho de amor: ",
    verificationMethod: "manual",
  },

  // LinkedIn Caótico
  linkedin_influencer: {
    templateType: "instagram_despechado",
    defaultValues: {
      username: "influencer_corporativo",
      location: "Conferencia de Liderazgo",
      likes: 1243,
    },
    promptPrefix: "Post motivacional innecesario: ",
    verificationMethod: "manual",
  },
  // Añadir más mapeos según sea necesario...
}

// Función para obtener la configuración de plantilla para un desafío específico
export function getTemplateForChallenge(challenge: ArchetypeChallenge): TemplateChallengeConfig {
  const challengeKey = `${challenge.capsuleId}_${challenge.archetypeId}`

  // Si existe una configuración específica, la usamos
  if (CHALLENGE_TEMPLATE_MAPPING[challengeKey]) {
    return CHALLENGE_TEMPLATE_MAPPING[challengeKey]
  }

  // Si no, determinamos la plantilla basada en el tipo de desafío y formato de respuesta
  let templateType: TemplateType = "chat_toxico" // Default

  if (CHALLENGE_TYPE_TO_TEMPLATE[challenge.challengeType]) {
    templateType = CHALLENGE_TYPE_TO_TEMPLATE[challenge.challengeType]
  } else if (RESPONSE_FORMAT_TO_TEMPLATE[challenge.responseFormat]) {
    templateType = RESPONSE_FORMAT_TO_TEMPLATE[challenge.responseFormat]
  }

  // Crear una configuración genérica
  return {
    templateType,
    verificationMethod: challenge.responseFormat === "group" ? "group" : "manual",
  }
}

// Función para obtener la configuración de plantilla para una carta unificada
export function getTemplateForCard(card: UnifiedCard): TemplateChallengeConfig | null {
  // Extraer el ID de la carta para buscar la configuración específica
  const cardId = card.card_id

  if (CHALLENGE_TEMPLATE_MAPPING[cardId]) {
    return CHALLENGE_TEMPLATE_MAPPING[cardId]
  }

  // Si no hay configuración específica, determinar basado en el tipo de desafío
  let templateType: TemplateType

  switch (card.challenge_type) {
    case "individual":
      templateType =
        card.verification_type === "audio"
          ? "chat_toxico"
          : card.verification_type === "photo"
            ? "tiktok_despecho"
            : "instagram_despechado"
      break
    case "duet":
      templateType = "chat_toxico"
      break
    case "group":
      templateType = "meme_despecho"
      break
    default:
      templateType = "chat_toxico"
  }

  return {
    templateType,
    verificationMethod:
      card.verification_type === "group" ? "group" : card.verification_type === "ai" ? "ai" : "manual",
  }
}

// Función para generar un prompt para una plantilla basado en la carta
export function generateTemplatePrompt(card: UnifiedCard, config: TemplateChallengeConfig): string {
  let prompt = card.challenge

  if (config.promptPrefix) {
    prompt = config.promptPrefix + prompt
  }

  if (config.promptSuffix) {
    prompt = prompt + config.promptSuffix
  }

  return prompt
}

// Función para verificar si una carta tiene una plantilla asociada
export function hasTemplateForCard(card: UnifiedCard): boolean {
  return !!getTemplateForCard(card)
}

// Función para generar un resultado de verificación para una plantilla
export function generateTemplateVerification(card: UnifiedCard, templateResult: any): any {
  const config = getTemplateForCard(card)

  return {
    cardId: card.card_id,
    templateType: config?.templateType || "chat_toxico",
    verificationMethod: config?.verificationMethod || "manual",
    result: templateResult,
    timestamp: Date.now(),
    points: card.difficulty_level === "easy" ? 5 : card.difficulty_level === "medium" ? 10 : 15,
  }
}
