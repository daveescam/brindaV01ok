import { CoreEmotion, EmotionalIntensity } from "@/lib/types/brinda-emotional-engine"
import { generateUnifiedCard } from "@/lib/types/unified-card"

// Map CoreEmotion to challengeCategory
const emotionToChallengeMap = {
  [CoreEmotion.DESPECHO]: "despecho",
  [CoreEmotion.CONFESION]: "confesion",
  [CoreEmotion.CRINGE]: "cringe",
  [CoreEmotion.NOSTALGIA]: "nostalgia",
  [CoreEmotion.CAOS]: "caos",
}

// Map EmotionalIntensity to emotionalTier
const intensityToTierMap = {
  [EmotionalIntensity.LOW]: "mild",
  [EmotionalIntensity.MEDIUM]: "moderate",
  [EmotionalIntensity.HIGH]: "intense",
  [EmotionalIntensity.EXTREME]: "chaotic",
}

// Map for tone subtypes
const getToneSubtype = (emotion: CoreEmotion) => {
  const toneMap = {
    [CoreEmotion.DESPECHO]: ["vulnerable", "dramatic", "nostalgic"],
    [CoreEmotion.CONFESION]: ["honest", "shameful", "proud"],
    [CoreEmotion.CRINGE]: ["awkward", "embarrassing", "uncomfortable"],
    [CoreEmotion.NOSTALGIA]: ["melancholic", "joyful", "bittersweet"],
    [CoreEmotion.CAOS]: ["unpredictable", "absurd", "random"],
  }

  const tones = toneMap[emotion]
  return tones[Math.floor(Math.random() * tones.length)]
}

// Map for interaction formats
const getInteractionFormat = () => {
  const formats = ["voz_texto", "video", "foto", "audio", "texto"]
  return formats[Math.floor(Math.random() * formats.length)]
}

export type CardGenerationParams = {
  emotion: CoreEmotion
  intensity: EmotionalIntensity
  toneSubtype?: string
  interactionFormat?: string
}

export function generateBrindaCard(params: CardGenerationParams) {
  const { emotion, intensity, toneSubtype, interactionFormat } = params

  // Convert emotion and intensity to unified card parameters
  const challengeCategory = emotionToChallengeMap[emotion] || "confesion"
  const emotionalTier = intensityToTierMap[intensity] || "moderate"

  // Generate the unified card
  return generateUnifiedCard({
    challengeCategory,
    emotionalTier,
    toneSubtype: toneSubtype || getToneSubtype(emotion),
    interactionFormat: interactionFormat || getInteractionFormat(),
  })
}
