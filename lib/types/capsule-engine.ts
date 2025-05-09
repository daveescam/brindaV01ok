import type { UnifiedCard } from "./unified-card"

// Tipos de cápsulas emocionales
export type CapsuleType = "borrachos" | "despecho" | "linkedin" | "mundial" | "regios" | "foodies"

// Estructura de un arquetipo (carta)
export interface Archetype {
  id: string
  name: string
  description: string
  emotionalLevel: number // 1-5, indica progresión de vulnerabilidad
  imageUrl?: string
  color: string
}

// Estructura de una cápsula emocional
export interface EmotionalCapsule {
  id: CapsuleType
  name: string
  description: string
  emotionalUniverse: string
  archetypes: Archetype[]
  sequence: string[] // IDs de arquetipos en orden de progresión
  brandPartners?: string[]
  icon: string
  color: string
}

// Estructura de una sesión de juego
export interface GameSession {
  id: string
  capsuleId: CapsuleType
  currentArchetypeIndex: number
  completedArchetypes: string[]
  points: number
  emotionalTier: "mild" | "intense" | "chaotic"
  vaultUnlocked: boolean
  finalArchetype?: string
  createdAt: Date
  venue?: string
  campaign?: string
}

// Estructura de un reto asociado a un arquetipo
export interface ArchetypeChallenge {
  archetypeId: string
  capsuleId: CapsuleType
  challenge: string
  challengeType: "confession" | "performance" | "karaoke" | "vote" | "story" | "roleplay"
  responseFormat: "voice" | "video" | "text" | "group"
  pointsToUnlock: number
  emotionalTier: "mild" | "intense" | "chaotic"
  socialTrigger: string
  reward?: {
    type: "sticker" | "shot" | "card" | "discount" | "experience"
    description: string
    imageUrl?: string
  }
}

// Biblioteca de cápsulas emocionales
export const EMOTIONAL_CAPSULES: EmotionalCapsule[] = [
  {
    id: "borrachos",
    name: "100 Borrachos Dijeron™",
    description: "Honestidad ebria + Caos tragicómico",
    emotionalUniverse: "borrachera + caos simpático",
    icon: "wine",
    color: "pink",
    archetypes: [
      {
        id: "malacopa",
        name: "El Malacopa",
        description: "El que lloró, gritó y bailó en menos de 10 minutos",
        emotionalLevel: 1,
        color: "pink",
      },
      {
        id: "extexter",
        name: "El Ex-Texter",
        description: "Le escribió a su ex desde la cuenta de su roomie",
        emotionalLevel: 2,
        color: "red",
      },
      {
        id: "shotfinal",
        name: "El Shot Final",
        description: "El que dijo 'uno más y ya'… y perdió 7 horas de su vida",
        emotionalLevel: 3,
        color: "purple",
      },
      {
        id: "crudaemocional",
        name: "La Cruda Emocional",
        description: "Confesó todos sus secretos y ahora no recuerda a quién",
        emotionalLevel: 4,
        color: "blue",
      },
      {
        id: "despertar",
        name: "El Despertar",
        description: "El que despertó en casa ajena con una toalla de Pikachu",
        emotionalLevel: 5,
        color: "amber",
      },
    ],
    sequence: ["malacopa", "extexter", "shotfinal", "crudaemocional", "despertar"],
    brandPartners: ["tecate", "bacardi", "jose_cuervo"],
  },
  {
    id: "despecho",
    name: "Ritual Despecho™",
    description: "Dolor + Drama + Catarsis",
    emotionalUniverse: "desamor + drama + liberación",
    icon: "heart",
    color: "red",
    archetypes: [
      {
        id: "extoxico",
        name: "El Ex Tóxico",
        description: "Siempre vuelve cuando estás mejor",
        emotionalLevel: 1,
        color: "red",
      },
      {
        id: "ghosteado",
        name: "El Ghosteado",
        description: "Desapareció sin explicación y te dejó en visto",
        emotionalLevel: 2,
        color: "purple",
      },
      {
        id: "stalker",
        name: "El Stalker Nocturno",
        description: "A las 2am revisando historias de hace 3 años",
        emotionalLevel: 3,
        color: "blue",
      },
      {
        id: "playlist",
        name: "La Playlist del Dolor",
        description: "Canciones que te destruyen pero no puedes dejar de escuchar",
        emotionalLevel: 4,
        color: "pink",
      },
      {
        id: "borrachodeamor",
        name: "El Borracho de Amor",
        description: "Envía mensajes que lamenta al día siguiente",
        emotionalLevel: 5,
        color: "amber",
      },
    ],
    sequence: ["extoxico", "ghosteado", "stalker", "playlist", "borrachodeamor"],
    brandPartners: ["tinder", "bumble", "spotify"],
  },
  {
    id: "linkedin",
    name: "LinkedIn Caótico™",
    description: "Cringe corporativo + Humor de oficina",
    emotionalUniverse: "oficina + cringe + networking forzado",
    icon: "briefcase",
    color: "blue",
    archetypes: [
      {
        id: "influencer",
        name: "El Influencer Corporativo",
        description: "Comparte frases motivacionales que nadie pidió",
        emotionalLevel: 1,
        color: "blue",
      },
      {
        id: "humblebragger",
        name: "El Humble Bragger",
        description: "Muy humilde para anunciar su ascenso por quinta vez",
        emotionalLevel: 2,
        color: "purple",
      },
      {
        id: "networker",
        name: "El Networker Agresivo",
        description: "Te pide una llamada de 15 minutos para 'sinergizar'",
        emotionalLevel: 3,
        color: "pink",
      },
      {
        id: "startupguy",
        name: "El Startup Guy",
        description: "Ha fracasado 7 veces pero sigue 'disrupting the industry'",
        emotionalLevel: 4,
        color: "amber",
      },
      {
        id: "consultant",
        name: "El Consultor de Todo",
        description: "Experto en absolutamente todo sin experiencia real",
        emotionalLevel: 5,
        color: "green",
      },
    ],
    sequence: ["influencer", "humblebragger", "networker", "startupguy", "consultant"],
    brandPartners: ["wework", "microsoft", "google"],
  },
  // Otras cápsulas...
]

// Biblioteca de retos por arquetipo
export const ARCHETYPE_CHALLENGES: ArchetypeChallenge[] = [
  // 100 Borrachos Dijeron
  {
    archetypeId: "malacopa",
    capsuleId: "borrachos",
    challenge: "Cuéntanos qué hiciste que casi arruinó la noche",
    challengeType: "confession",
    responseFormat: "voice",
    pointsToUnlock: 5,
    emotionalTier: "mild",
    socialTrigger: "Si alguien dice 'yo también', ambos ganan 2 puntos extra",
    reward: {
      type: "sticker",
      description: "Sticker de 'El Malacopa'",
      imageUrl: "/stickers/malacopa.png",
    },
  },
  {
    archetypeId: "extexter",
    capsuleId: "borrachos",
    challenge: "Graba el mensaje borracho más triste que hayas mandado",
    challengeType: "performance",
    responseFormat: "voice",
    pointsToUnlock: 10,
    emotionalTier: "intense",
    socialTrigger: "Si la mesa vota que tu mensaje es el más vergonzoso, ganas 5 puntos extra",
    reward: {
      type: "sticker",
      description: "Sticker de 'El Ex-Texter'",
      imageUrl: "/stickers/extexter.png",
    },
  },
  {
    archetypeId: "shotfinal",
    capsuleId: "borrachos",
    challenge: "Haz un mini performance de cómo tomaste ese último shot fatal",
    challengeType: "performance",
    responseFormat: "video",
    pointsToUnlock: 15,
    emotionalTier: "intense",
    socialTrigger: "Si alguien imita tu performance, ambos ganan un shot gratis",
    reward: {
      type: "shot",
      description: "Shot gratis de tequila",
    },
  },
  {
    archetypeId: "crudaemocional",
    capsuleId: "borrachos",
    challenge: "¿A quién juraste 'nunca volver a buscar' después de una borrachera?",
    challengeType: "confession",
    responseFormat: "text",
    pointsToUnlock: 20,
    emotionalTier: "chaotic",
    socialTrigger: "Si alguien confiesa algo peor, ganas 3 puntos extra",
    reward: {
      type: "card",
      description: "Carta coleccionable 'La Cruda Emocional'",
      imageUrl: "/cards/crudaemocional.png",
    },
  },
  {
    archetypeId: "despertar",
    capsuleId: "borrachos",
    challenge: "Cuenta la historia del despertar más extraño que has tenido después de una fiesta",
    challengeType: "story",
    responseFormat: "voice",
    pointsToUnlock: 25,
    emotionalTier: "chaotic",
    socialTrigger: "Si tu historia hace reír a toda la mesa, desbloqueas el Vault",
    reward: {
      type: "experience",
      description: "Desbloquea el Vault de '100 Borrachos Dijeron'",
    },
  },

  // Ritual Despecho
  {
    archetypeId: "extoxico",
    capsuleId: "despecho",
    challenge: "Comparte la red flag más grande que ignoraste en tu ex",
    challengeType: "confession",
    responseFormat: "text",
    pointsToUnlock: 5,
    emotionalTier: "mild",
    socialTrigger: "Por cada persona que diga 'me pasó igual', ganas 1 punto extra",
    reward: {
      type: "sticker",
      description: "Sticker de 'El Ex Tóxico'",
      imageUrl: "/stickers/extoxico.png",
    },
  },
  {
    archetypeId: "ghosteado",
    capsuleId: "despecho",
    challenge: "Lee el último mensaje que enviaste antes de que te dejaran en visto",
    challengeType: "performance",
    responseFormat: "voice",
    pointsToUnlock: 10,
    emotionalTier: "intense",
    socialTrigger: "Si tu mensaje tiene más de 3 mensajes seguidos sin respuesta, ganas 3 puntos extra",
    reward: {
      type: "sticker",
      description: "Sticker de 'El Ghosteado'",
      imageUrl: "/stickers/ghosteado.png",
    },
  },
  {
    archetypeId: "stalker",
    capsuleId: "despecho",
    challenge: "Confiesa hasta qué punto has llegado stalkeando a un ex",
    challengeType: "confession",
    responseFormat: "text",
    pointsToUnlock: 15,
    emotionalTier: "intense",
    socialTrigger: "Si alguien confiesa algo más extremo, ambos ganan 2 puntos extra",
    reward: {
      type: "discount",
      description: "15% de descuento en tu próxima bebida",
    },
  },
  {
    archetypeId: "playlist",
    capsuleId: "despecho",
    challenge: "Canta 10 segundos de la canción que más te recuerda a tu ex",
    challengeType: "karaoke",
    responseFormat: "voice",
    pointsToUnlock: 20,
    emotionalTier: "chaotic",
    socialTrigger: "Si cantas con sentimiento y la mesa aplaude, ganas 5 puntos extra",
    reward: {
      type: "card",
      description: "Carta coleccionable 'La Playlist del Dolor'",
      imageUrl: "/cards/playlist.png",
    },
  },
  {
    archetypeId: "borrachodeamor",
    capsuleId: "despecho",
    challenge: "Recrea dramáticamente cómo sería tu reencuentro con tu ex",
    challengeType: "roleplay",
    responseFormat: "video",
    pointsToUnlock: 25,
    emotionalTier: "chaotic",
    socialTrigger: "Si tu actuación hace reír o llorar a alguien, desbloqueas el Vault",
    reward: {
      type: "experience",
      description: "Desbloquea el Vault de 'Ritual Despecho'",
    },
  },

  // Más retos para otras cápsulas...
]

// Función para obtener una cápsula por ID
export function getCapsuleById(capsuleId: CapsuleType): EmotionalCapsule | undefined {
  return EMOTIONAL_CAPSULES.find((capsule) => capsule.id === capsuleId)
}

// Función para obtener un arquetipo por ID y cápsula
export function getArchetypeById(archetypeId: string, capsuleId: CapsuleType): Archetype | undefined {
  const capsule = getCapsuleById(capsuleId)
  return capsule?.archetypes.find((archetype) => archetype.id === archetypeId)
}

// Función para obtener un reto por arquetipo y cápsula
export function getChallengeByArchetype(
  archetypeId: string,
  capsuleId: CapsuleType,
  emotionalTier: "mild" | "intense" | "chaotic" = "intense",
): ArchetypeChallenge | undefined {
  // Primero buscamos un reto que coincida exactamente con el nivel emocional
  let challenge = ARCHETYPE_CHALLENGES.find(
    (challenge) =>
      challenge.archetypeId === archetypeId &&
      challenge.capsuleId === capsuleId &&
      challenge.emotionalTier === emotionalTier,
  )

  // Si no encontramos uno exacto, buscamos cualquier reto para ese arquetipo
  if (!challenge) {
    challenge = ARCHETYPE_CHALLENGES.find(
      (challenge) => challenge.archetypeId === archetypeId && challenge.capsuleId === capsuleId,
    )
  }

  return challenge
}

// Función para crear una nueva sesión de juego
export function createGameSession(
  capsuleId: CapsuleType,
  emotionalTier: "mild" | "intense" | "chaotic" = "intense",
  venue?: string,
  campaign?: string,
): GameSession {
  return {
    id: `session_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
    capsuleId,
    currentArchetypeIndex: 0,
    completedArchetypes: [],
    points: 0,
    emotionalTier,
    vaultUnlocked: false,
    createdAt: new Date(),
    venue,
    campaign,
  }
}

// Función para avanzar a la siguiente carta en la secuencia
export function advanceToNextArchetype(session: GameSession): GameSession {
  const capsule = getCapsuleById(session.capsuleId)
  if (!capsule) return session

  // Si ya completamos todos los arquetipos, no avanzamos más
  if (session.currentArchetypeIndex >= capsule.sequence.length - 1) {
    return {
      ...session,
      finalArchetype: capsule.sequence[session.currentArchetypeIndex],
    }
  }

  // Añadimos el arquetipo actual a completados
  const completedArchetype = capsule.sequence[session.currentArchetypeIndex]

  return {
    ...session,
    currentArchetypeIndex: session.currentArchetypeIndex + 1,
    completedArchetypes: [...session.completedArchetypes, completedArchetype],
  }
}

// Función para añadir puntos a una sesión
export function addPointsToSession(session: GameSession, points: number): GameSession {
  const newPoints = session.points + points

  // Verificamos si con estos puntos se desbloquea el Vault
  const vaultUnlocked = newPoints >= 25 ? true : session.vaultUnlocked

  return {
    ...session,
    points: newPoints,
    vaultUnlocked,
  }
}

// Función para convertir un arquetipo a una carta unificada
export function archetypeToChallengeCard(
  archetypeId: string,
  capsuleId: CapsuleType,
  emotionalTier: "mild" | "intense" | "chaotic" = "intense",
): UnifiedCard | null {
  const capsule = getCapsuleById(capsuleId)
  const archetype = getArchetypeById(archetypeId, capsuleId)
  const challenge = getChallengeByArchetype(archetypeId, capsuleId, emotionalTier)

  if (!capsule || !archetype || !challenge) return null

  // Mapear el tipo de desafío a un tipo de carta unificada
  const challengeTypeMap: Record<string, any> = {
    confession: "individual",
    performance: "individual",
    karaoke: "individual",
    vote: "group",
    story: "individual",
    roleplay: "duet",
  }

  // Mapear el formato de respuesta a un formato de interacción
  const responseFormatMap: Record<string, any> = {
    voice: "voz_texto",
    video: "video_texto",
    text: "texto_imagen",
    group: "actuacion_voz",
  }

  return {
    card_id: `${capsuleId}_${archetypeId}`,
    card_title: archetype.name,
    challenge: challenge.challenge,
    challenge_type: challengeTypeMap[challenge.challengeType] || "individual",
    challenge_category: capsuleId as any,
    interaction_format: responseFormatMap[challenge.responseFormat] || "texto_imagen",
    tone_subtype: emotionalTier === "mild" ? "humoristico" : emotionalTier === "intense" ? "vulnerable" : "caotico",
    emotional_tier: emotionalTier,
    theme_tag: capsule.emotionalUniverse,
    genre_tag: capsule.name,
    social_trigger: challenge.socialTrigger,
    verification_type:
      challenge.responseFormat === "voice" ? "audio" : challenge.responseFormat === "video" ? "photo" : "self",
    reward: challenge.reward?.description || "Sticker digital",
    reward_type: (challenge.reward?.type as any) || "sticker",
    experience_type: "campaign",
    difficulty_level: emotionalTier === "mild" ? "easy" : emotionalTier === "intense" ? "medium" : "hard",
  }
}

// Función para obtener la secuencia de cartas para una sesión
export function getSessionCards(session: GameSession): UnifiedCard[] {
  const capsule = getCapsuleById(session.capsuleId)
  if (!capsule) return []

  return capsule.sequence
    .map((archetypeId) => archetypeToChallengeCard(archetypeId, session.capsuleId, session.emotionalTier))
    .filter((card): card is UnifiedCard => card !== null)
}

// Función para obtener el arquetipo actual de una sesión
export function getCurrentArchetype(session: GameSession): Archetype | undefined {
  const capsule = getCapsuleById(session.capsuleId)
  if (!capsule || session.currentArchetypeIndex >= capsule.sequence.length) return undefined

  const archetypeId = capsule.sequence[session.currentArchetypeIndex]
  return getArchetypeById(archetypeId, session.capsuleId)
}

// Función para obtener el reto actual de una sesión
export function getCurrentChallenge(session: GameSession): ArchetypeChallenge | undefined {
  const capsule = getCapsuleById(session.capsuleId)
  if (!capsule || session.currentArchetypeIndex >= capsule.sequence.length) return undefined

  const archetypeId = capsule.sequence[session.currentArchetypeIndex]
  return getChallengeByArchetype(archetypeId, session.capsuleId, session.emotionalTier)
}

// Función para determinar el arquetipo final basado en los puntos y completados
export function determineFinalArchetype(session: GameSession): string | undefined {
  // Si ya tenemos un arquetipo final asignado, lo devolvemos
  if (session.finalArchetype) return session.finalArchetype

  // Si no hemos completado ningún arquetipo, no podemos determinar uno final
  if (session.completedArchetypes.length === 0) return undefined

  // Por ahora, simplemente devolvemos el último arquetipo completado
  // En una implementación real, podríamos tener lógica más compleja basada en puntos, etc.
  return session.completedArchetypes[session.completedArchetypes.length - 1]
}
