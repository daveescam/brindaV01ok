// Types for the dynamic capsule system
export type CapsuleType = "borrachos" | "regios" | "linkedin-caotico" | "fiesta-mundial" | "tigres-rayados" | "pumas"

export interface CapsuleConfig {
  id: CapsuleType
  name: string // Ej: "100 Tigres vs Rayados Dijeron™"
  theme: "despecho" | "linkedin-caotico" | "fiesta-mundial" | "regios"
  emotionCore: "euforia" | "orgullo" | "cringe" | "ansiedad" // Emoción central
  visualStyle: "neon" | "vintage-loteria" | "moderno-irónico"
  triggerContext: {
    venues: string[] // Ej: ["mty", "monterrey"]
    events: string[] // Ej: ["partido-futbol", "navidad"]
    dayOfWeek?: string // "sábado"
    timeRange?: { from: string; to: string } // "15:00"-"22:00"
  }
  rewards: {
    digital: string // Ej: "sticker_tigres_fan"
    physical: string // Ej: "shot_mty_event"
    social: string // Ej: "#BrindaTigres"
  }
  aiPrompt: string // Prompt para GPT-4
}

export interface DynamicCard {
  id: string
  card_title: string
  challenge: string
  ai_prompt: string
  rewards: {
    digital: string
    physical: string
    social: string
  }
}

// Sample capsules data
export const CAPSULES: CapsuleConfig[] = [
  {
    id: "tigres-rayados",
    name: "100 Tigres vs Rayados Dijeron™",
    theme: "fiesta-mundial",
    emotionCore: "euforia",
    visualStyle: "neon",
    triggerContext: {
      venues: ["mty", "monterrey"],
      events: ["partido-futbol"],
      dayOfWeek: "sábado",
      timeRange: { from: "15:00", to: "22:00" },
    },
    rewards: {
      digital: "sticker_tigres_fan",
      physical: "shot_mty_event",
      social: "#BrindaTigres",
    },
    aiPrompt: "Genera un reto para fans de los Tigres. Usa lenguaje irónico y memes de fútbol.",
  },
  {
    id: "borrachos",
    name: "100 Borrachos Dijeron™",
    theme: "despecho",
    emotionCore: "ansiedad",
    visualStyle: "neon",
    triggerContext: {
      venues: ["bar", "antro", "club"],
      events: ["fiesta", "viernes"],
      dayOfWeek: "viernes",
      timeRange: { from: "20:00", to: "03:00" },
    },
    rewards: {
      digital: "sticker_borracho_epico",
      physical: "shot_tequila",
      social: "#BrindaBorrachos",
    },
    aiPrompt:
      "Genera un reto relacionado con situaciones vergonzosas de borrachera. Usa humor y situaciones cotidianas.",
  },
  {
    id: "regios",
    name: "100 Regios Dijeron™",
    theme: "regios",
    emotionCore: "orgullo",
    visualStyle: "vintage-loteria",
    triggerContext: {
      venues: ["mty", "monterrey", "san-pedro"],
      events: ["carne-asada", "fin-semana"],
      dayOfWeek: "domingo",
      timeRange: { from: "12:00", to: "18:00" },
    },
    rewards: {
      digital: "sticker_regio_pride",
      physical: "shot_cerveza",
      social: "#BrindaRegios",
    },
    aiPrompt:
      "Genera un reto que celebre la cultura regia. Menciona carne asada, expresiones locales o lugares icónicos.",
  },
  {
    id: "linkedin-caotico",
    name: "LinkedIn Caótico™",
    theme: "linkedin-caotico",
    emotionCore: "cringe",
    visualStyle: "moderno-irónico",
    triggerContext: {
      venues: ["oficina", "coworking", "cafe-trabajo"],
      events: ["networking", "after-office"],
      dayOfWeek: "jueves",
      timeRange: { from: "17:00", to: "21:00" },
    },
    rewards: {
      digital: "nft_influencer_corporativo",
      physical: "shot_cafe",
      social: "#BrindaLinkedIn",
    },
    aiPrompt:
      "Genera un reto que parodie la cultura corporativa de LinkedIn. Usa frases motivacionales exageradas y situaciones de oficina incómodas.",
  },
]
