export type DespechoChallengeType =
  | "chat_toxico"
  | "instagram_despechado"
  | "meme_despecho"
  | "revista_drama"
  | "tiktok_despecho"
  | "perfil_citas"
  | "notificacion_redflag"

export type TemplateDifficulty = "easy" | "medium" | "hard"

export interface DespechoTemplate {
  id: string
  type: DespechoChallengeType
  title: string
  description: string
  emoji: string
  difficulty: TemplateDifficulty
  tags: string[]
  promptExamples: string[]
}

export const DESPECHO_TEMPLATES: DespechoTemplate[] = [
  {
    id: "chat-toxico-1",
    type: "chat_toxico",
    title: "Chat Tóxico",
    description: "Simula una conversación de mensajes con un ex tóxico",
    emoji: "💬",
    difficulty: "easy",
    tags: ["mensaje", "chat", "ghosting", "ex", "drama"],
    promptExamples: [
      "¿Por qué me dejaste en visto?",
      "Solo te escribo para decirte que ya te superé",
      "Perdona mi borrachera de anoche",
    ],
  },
  {
    id: "instagram-despechado-1",
    type: "instagram_despechado",
    title: "Instagram de Despecho",
    description: "Crea un post de Instagram con el drama perfecto",
    emoji: "📷",
    difficulty: "medium",
    tags: ["instagram", "social", "indirecta", "foto", "caption"],
    promptExamples: [
      "La felicidad después de bloquear a alguien tóxico",
      "Cuando te ghostean pero te ven todas las historias",
      "Nueva etapa, sin equipaje emocional",
    ],
  },
  {
    id: "meme-despecho-1",
    type: "meme_despecho",
    title: "Meme de Despecho",
    description: "Genera un meme sobre tus experiencias de desamor",
    emoji: "🤣",
    difficulty: "easy",
    tags: ["meme", "humor", "viral", "relatable", "divertido"],
    promptExamples: [
      "Cuando dices 'ya lo superé' pero stalkeas su perfil a las 3am",
      "Mi cara cuando me escribe después de ghostearme por 2 meses",
      "Yo entrando vs yo saliendo de una relación tóxica",
    ],
  },
  {
    id: "revista-drama-1",
    type: "revista_drama",
    title: "Portada de Revista",
    description: "Crea la portada de una revista de chismes sobre tu drama",
    emoji: "📰",
    difficulty: "medium",
    tags: ["revista", "chisme", "exclusiva", "drama", "portada"],
    promptExamples: [
      "¡EXCLUSIVA! Todos los secretos de una ruptura digital",
      "Los 5 mensajes que revelan que nunca te quiso",
      "Especial: Cómo sobrevivir a que te dejen en visto",
    ],
  },
  {
    id: "tiktok-despecho-1",
    type: "tiktok_despecho",
    title: "TikTok Despechado",
    description: "Simula un TikTok viral sobre tu drama romántico",
    emoji: "📱",
    difficulty: "hard",
    tags: ["tiktok", "viral", "tendencia", "baile", "audio"],
    promptExamples: [
      "POV: Tu ex te escribe cuando estás en tu mejor momento",
      "Cuando te bloquea pero crea una cuenta falsa para verte",
      "Las red flags que ignoré en mi última relación",
    ],
  },
  {
    id: "perfil-citas-1",
    type: "perfil_citas",
    title: "Perfil de Citas",
    description: "Diseña un perfil de app de citas con ironía y humor",
    emoji: "❤️",
    difficulty: "medium",
    tags: ["dating", "perfil", "bio", "tinder", "bumble"],
    promptExamples: [
      "Especialista en recoger red flags como si fueran pokémon",
      "Coleccionista de ghostings con sentido del humor",
      "Buscando alguien que dure más que mi última serie de Netflix",
    ],
  },
  {
    id: "notificacion-redflag-1",
    type: "notificacion_redflag",
    title: "Alerta Red Flag",
    description: "Crea una notificación de alerta sobre señales de peligro",
    emoji: "🚩",
    difficulty: "easy",
    tags: ["redflag", "alerta", "warning", "toxic", "señales"],
    promptExamples: [
      "Dice que todos sus ex están locos",
      "Solo te responde cuando le conviene",
      "Insiste en revisar tu teléfono 'por confianza'",
    ],
  },
]
