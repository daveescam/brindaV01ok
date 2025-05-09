/**
 * Sistema de integración de plantillas AI en los desafíos de Brinda X
 *
 * Este módulo permite conectar las plantillas AI con los desafíos de las cartas,
 * permitiendo que los usuarios generen contenido como parte del desafío.
 */

import type { UnifiedCard } from "./unified-card"
import type { VerificationSession, VerificationData } from "./verification-engine"

// Tipos de plantillas AI disponibles
export type AITemplateType =
  | "chat_toxico"
  | "instagram_despechado"
  | "meme_despecho"
  | "red_flag_notification"
  | "playlist_despecho"
  | "carta_ex"
  | "horoscopo_desamor"
  | "tweet_viral"

// Configuración de una plantilla para un desafío
export interface ChallengeTemplateConfig {
  templateType: AITemplateType
  initialPrompt?: string
  requiredFields?: string[]
  outputFormat: "image" | "text" | "audio" | "video" | "social"
  verificationCriteria?: {
    minLength?: number
    requiredKeywords?: string[]
    emotionalIntensity?: number
    socialSharing?: boolean
  }
}

// Resultado generado por una plantilla
export interface TemplateResult {
  id: string
  templateType: AITemplateType
  content: string | Blob
  contentType: "image" | "text" | "audio" | "video" | "social"
  metadata: {
    prompt?: string
    timestamp: number
    userInputs?: Record<string, any>
    socialMetrics?: {
      likes?: number
      comments?: number
      shares?: number
    }
  }
}

// Mapeo de plantillas a componentes React
export const TEMPLATE_COMPONENTS: Record<AITemplateType, string> = {
  chat_toxico: "ChatToxico",
  instagram_despechado: "InstagramDespechado",
  meme_despecho: "MemeDespecho",
  red_flag_notification: "RedFlagNotification",
  playlist_despecho: "PlaylistDespecho",
  carta_ex: "CartaEx",
  horoscopo_desamor: "HoroscopoDesamor",
  tweet_viral: "TweetViral",
}

// Mapeo de plantillas a categorías de desafío
export const TEMPLATE_CATEGORY_MAPPING: Record<string, AITemplateType[]> = {
  despecho: [
    "chat_toxico",
    "instagram_despechado",
    "meme_despecho",
    "red_flag_notification",
    "playlist_despecho",
    "carta_ex",
  ],
  borrachos: ["meme_despecho", "red_flag_notification", "tweet_viral"],
  linkedin: ["tweet_viral", "red_flag_notification"],
  mundial: ["meme_despecho", "tweet_viral"],
  regios: ["meme_despecho", "tweet_viral", "red_flag_notification"],
  foodies: ["instagram_despechado", "tweet_viral"],
}

// Función para determinar si una carta tiene integración de plantilla
export function hasTemplateIntegration(card: UnifiedCard): boolean {
  // Verificar si la carta tiene un formato de interacción compatible con plantillas
  const compatibleFormats = [
    "descripcion_imagen",
    "descripcion_caption",
    "descripcion_meme",
    "texto_imagen",
    "emojis_interpretacion",
  ]

  return compatibleFormats.includes(card.interaction_format)
}

// Función para obtener la configuración de plantilla para una carta
export function getTemplateConfigForCard(card: UnifiedCard): ChallengeTemplateConfig | null {
  if (!hasTemplateIntegration(card)) return null

  // Determinar qué plantilla es más adecuada según la categoría y formato
  const category = card.challenge_category as string
  const availableTemplates = TEMPLATE_CATEGORY_MAPPING[category] || []

  if (availableTemplates.length === 0) return null

  // Seleccionar plantilla basada en el formato de interacción
  let selectedTemplate: AITemplateType

  switch (card.interaction_format) {
    case "descripcion_meme":
      selectedTemplate = availableTemplates.includes("meme_despecho") ? "meme_despecho" : availableTemplates[0]
      break
    case "descripcion_caption":
      selectedTemplate = availableTemplates.includes("instagram_despechado")
        ? "instagram_despechado"
        : availableTemplates[0]
      break
    case "texto_imagen":
      selectedTemplate = availableTemplates.includes("red_flag_notification")
        ? "red_flag_notification"
        : availableTemplates[0]
      break
    default:
      // Seleccionar una plantilla aleatoria de las disponibles
      selectedTemplate = availableTemplates[Math.floor(Math.random() * availableTemplates.length)]
  }

  // Crear configuración basada en la plantilla seleccionada
  return createTemplateConfig(selectedTemplate, card)
}

// Función para crear una configuración de plantilla
function createTemplateConfig(templateType: AITemplateType, card: UnifiedCard): ChallengeTemplateConfig {
  // Configuración base según el tipo de plantilla
  const baseConfig: Record<AITemplateType, Partial<ChallengeTemplateConfig>> = {
    chat_toxico: {
      outputFormat: "image",
      initialPrompt: card.challenge,
      requiredFields: ["message", "response"],
      verificationCriteria: {
        minLength: 20,
        emotionalIntensity: 3,
        socialSharing: true,
      },
    },
    instagram_despechado: {
      outputFormat: "image",
      initialPrompt: card.challenge,
      requiredFields: ["caption", "comments"],
      verificationCriteria: {
        minLength: 30,
        requiredKeywords: ["#despecho", "#desamor"],
        socialSharing: true,
      },
    },
    meme_despecho: {
      outputFormat: "image",
      initialPrompt: card.challenge,
      requiredFields: ["topText", "bottomText"],
      verificationCriteria: {
        socialSharing: true,
      },
    },
    red_flag_notification: {
      outputFormat: "image",
      initialPrompt: card.challenge,
      requiredFields: ["title", "message"],
      verificationCriteria: {
        minLength: 40,
        emotionalIntensity: 4,
      },
    },
    playlist_despecho: {
      outputFormat: "social",
      initialPrompt: "Crea una playlist de despecho basada en tu experiencia",
      requiredFields: ["songs", "playlistName"],
      verificationCriteria: {
        minLength: 5, // Mínimo 5 canciones
        socialSharing: true,
      },
    },
    carta_ex: {
      outputFormat: "text",
      initialPrompt: "Escribe una carta a tu ex que nunca enviarías",
      requiredFields: ["letterContent", "signature"],
      verificationCriteria: {
        minLength: 100,
        emotionalIntensity: 4,
      },
    },
    horoscopo_desamor: {
      outputFormat: "text",
      initialPrompt: "Crea un horóscopo de desamor para tu signo",
      requiredFields: ["sign", "prediction"],
      verificationCriteria: {
        minLength: 50,
      },
    },
    tweet_viral: {
      outputFormat: "social",
      initialPrompt: "Crea un tweet viral sobre tu situación",
      requiredFields: ["tweetContent", "hashtags"],
      verificationCriteria: {
        minLength: 20,
        socialSharing: true,
      },
    },
  }

  // Combinar la configuración base con ajustes específicos de la carta
  return {
    templateType,
    initialPrompt: card.challenge,
    outputFormat: baseConfig[templateType].outputFormat as any,
    requiredFields: baseConfig[templateType].requiredFields,
    verificationCriteria: {
      ...baseConfig[templateType].verificationCriteria,
      emotionalIntensity: card.emotional_tier === "mild" ? 2 : card.emotional_tier === "intense" ? 4 : 5,
    },
  }
}

// Función para generar un resultado de plantilla
export function generateTemplateResult(
  templateConfig: ChallengeTemplateConfig,
  userInputs: Record<string, any>,
): TemplateResult {
  // En una implementación real, aquí se generaría el contenido
  // usando la plantilla AI y los inputs del usuario

  return {
    id: `result_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
    templateType: templateConfig.templateType,
    content: JSON.stringify(userInputs), // Simplificado para este ejemplo
    contentType: templateConfig.outputFormat,
    metadata: {
      prompt: templateConfig.initialPrompt,
      timestamp: Date.now(),
      userInputs,
      socialMetrics: {
        likes: Math.floor(Math.random() * 100),
        comments: Math.floor(Math.random() * 20),
        shares: Math.floor(Math.random() * 10),
      },
    },
  }
}

// Función para verificar un resultado de plantilla
export function verifyTemplateResult(
  result: TemplateResult,
  config: ChallengeTemplateConfig,
  session: VerificationSession,
): VerificationData {
  // Analizar el resultado según los criterios de verificación
  const criteria = config.verificationCriteria || {}
  let isValid = true
  let points = 0

  // Verificar longitud mínima si aplica
  if (criteria.minLength && typeof result.content === "string") {
    isValid = result.content.length >= criteria.minLength
    points += isValid ? 5 : 0
  }

  // Verificar palabras clave requeridas
  if (criteria.requiredKeywords && typeof result.content === "string") {
    const hasAllKeywords = criteria.requiredKeywords.every((keyword) =>
      result.content.toString().toLowerCase().includes(keyword.toLowerCase()),
    )
    isValid = isValid && hasAllKeywords
    points += hasAllKeywords ? 3 : 0
  }

  // Puntos por intensidad emocional
  if (criteria.emotionalIntensity) {
    // Simulamos una puntuación de intensidad emocional
    const emotionalScore = Math.min(5, Math.floor(Math.random() * criteria.emotionalIntensity) + 1)
    points += emotionalScore
  }

  // Puntos por compartir en redes sociales
  if (criteria.socialSharing && result.metadata.socialMetrics) {
    const { likes = 0, shares = 0 } = result.metadata.socialMetrics
    points += likes > 50 ? 5 : likes > 20 ? 3 : 1
    points += shares > 5 ? 10 : shares > 0 ? 5 : 0
  }

  // Crear datos de verificación
  return {
    isValid,
    points,
    templateResult: result,
    feedback: isValid
      ? `¡Excelente creación! Has ganado ${points} puntos.`
      : "Tu creación no cumple con todos los criterios. Intenta de nuevo.",
  }
}

// Función para guardar un resultado de plantilla en la wallet
export function saveTemplateResultToWallet(result: TemplateResult): string {
  // En una implementación real, aquí se guardaría el resultado en la wallet
  // y se devolvería un ID de referencia

  return `wallet_item_${result.id}`
}

// Función para obtener el componente adecuado para una plantilla
export function getTemplateComponent(templateType: AITemplateType): string {
  return TEMPLATE_COMPONENTS[templateType] || "DefaultTemplate"
}
