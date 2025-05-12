import { openai } from "@ai-sdk/openai"
import { generateText } from "ai"
import { type NextRequest, NextResponse } from "next/server"
import type { CapsuleConfig } from "@/lib/types/dynamic-capsule"

export const runtime = "nodejs"

// Mock challenges for different capsule types
const MOCK_CHALLENGES = {
  borrachos: {
    title: "🍺 El Mensaje Borracho",
    challenge: "Recrea el último mensaje vergonzoso que enviaste o podrías enviar estando borracho.",
    aiPrompt: "Crea un sticker que capture la esencia del arrepentimiento post-borrachera.",
  },
  regios: {
    title: "🌮 El Regio Perfecto",
    challenge: "Imita el acento regio más exagerado mientras describes tu carne asada ideal.",
    aiPrompt: "Genera una imagen de una carne asada perfecta con elementos típicos de Monterrey.",
  },
  "linkedin-caotico": {
    title: "💼 El Post Motivacional",
    challenge:
      "Crea el post de LinkedIn más exagerado sobre cómo te levantaste a las 4am para 'maximizar tu productividad'.",
    aiPrompt: "Genera una imagen de un profesional con pose exagerada de éxito y frases motivacionales absurdas.",
  },
  "fiesta-mundial": {
    title: "🎉 La Celebración Épica",
    challenge: "Muestra cómo celebrarías si tu equipo ganara el mundial en el último segundo.",
    aiPrompt: "Crea una imagen de celebración épica con confeti, banderas y expresiones de júbilo extremo.",
  },
  "tigres-rayados": {
    title: "⚽ El Clásico Regio",
    challenge: "Debate con un amigo por qué tu equipo es mejor, usando solo frases típicas de aficionado.",
    aiPrompt: "Genera un meme que muestre la rivalidad entre Tigres y Rayados con humor local.",
  },
  pumas: {
    title: "🐾 El Rugido Universitario",
    challenge:
      "Imita el grito universitario más entusiasta mientras explicas por qué los Pumas ganarán el próximo torneo.",
    aiPrompt: "Crea una imagen de un aficionado de Pumas con cara de esperanza eterna a pesar de los resultados.",
  },
  default: {
    title: "🎭 El Reto Sorpresa",
    challenge: "Comparte una anécdota divertida relacionada con el tema de esta cápsula.",
    aiPrompt: "Genera una imagen que represente una situación cómica relacionada con el tema.",
  },
}

export async function POST(req: NextRequest) {
  try {
    const { capsule } = await req.json()

    if (!capsule) {
      return NextResponse.json({ error: "Capsule configuration is required" }, { status: 400 })
    }

    // Check if we have an OpenAI API key
    const apiKey = process.env.OPENAI_API_KEY

    // If we don't have an API key, use mock data
    if (!apiKey) {
      console.log("OpenAI API key not found, using mock data")

      // Get mock challenge based on capsule type or use default
      const mockChallenge = MOCK_CHALLENGES[capsule.id as keyof typeof MOCK_CHALLENGES] || MOCK_CHALLENGES.default

      return NextResponse.json({
        challenge: mockChallenge.challenge,
        title: mockChallenge.title,
        aiPrompt: mockChallenge.aiPrompt,
        isMock: true,
      })
    }

    // If we have an API key, proceed with the real GPT-4 call
    const prompt = generatePromptFromCapsule(capsule)

    const response = await generateText({
      model: openai("gpt-4o"),
      prompt: prompt,
      temperature: 0.7,
      max_tokens: 300,
    })

    // Parse the response to extract the challenge
    const parsedChallenge = parseAIResponse(response.text)

    return NextResponse.json({
      challenge: parsedChallenge.challenge,
      title: parsedChallenge.title,
      aiPrompt: parsedChallenge.aiPrompt,
      isMock: false,
    })
  } catch (error) {
    console.error("Error generating challenge:", error)

    // Return a mock challenge as fallback
    return NextResponse.json({
      title: "🎲 Reto de Emergencia",
      challenge: "Comparte una historia divertida sobre un momento inesperado.",
      aiPrompt: "Genera una imagen que represente una situación sorpresiva y cómica.",
      isMock: true,
      error: "Failed to generate challenge with AI",
    })
  }
}

function generatePromptFromCapsule(capsule: CapsuleConfig): string {
  return `
    Crea un reto divertido para la cápsula "${capsule.name}".
    
    CONTEXTO:
    - Tema: ${capsule.theme}
    - Emoción nuclear: ${capsule.emotionCore}
    - Estilo visual: ${capsule.visualStyle}
    - Instrucciones específicas: ${capsule.aiPrompt}
    
    FORMATO DE RESPUESTA (responde exactamente en este formato JSON):
    {
      "title": "Título llamativo y emoji relacionado",
      "challenge": "Descripción del reto en 1-2 oraciones",
      "aiPrompt": "Instrucción para generar una imagen o meme relacionado con el reto"
    }
    
    EJEMPLOS:
    Para una cápsula de fútbol:
    {
      "title": "🔥 Grito de Gol Absurdo",
      "challenge": "Imita cómo reaccionarías si tu equipo gana por un penal polémico en el último minuto.",
      "aiPrompt": "Genera un meme con cara de celebración exagerada y texto irónico sobre arbitraje."
    }
    
    Para una cápsula de borrachos:
    {
      "title": "🍺 El Mensaje Borracho",
      "challenge": "Recrea el último mensaje vergonzoso que enviaste o podrías enviar estando borracho.",
      "aiPrompt": "Crea un sticker que capture la esencia del arrepentimiento post-borrachera."
    }
    
    IMPORTANTE:
    - Sé creativo y divertido
    - Mantén el reto breve y claro
    - Asegúrate de que sea apropiado para un ambiente social
    - Usa el humor local relacionado con el tema de la cápsula
    - Responde SOLO con el formato JSON solicitado, sin texto adicional
  `
}

function parseAIResponse(text: string): { title: string; challenge: string; aiPrompt: string } {
  try {
    // Try to parse the response as JSON
    const cleanedText = text.trim()
    const jsonMatch = cleanedText.match(/\{[\s\S]*\}/)

    if (jsonMatch) {
      const jsonStr = jsonMatch[0]
      const parsed = JSON.parse(jsonStr)

      return {
        title: parsed.title || "Reto Generado",
        challenge: parsed.challenge || "Completa este desafío para ganar recompensas.",
        aiPrompt: parsed.aiPrompt || "Genera una imagen relacionada con el reto.",
      }
    }

    // Fallback if JSON parsing fails
    return {
      title: "Reto Generado",
      challenge: cleanedText.substring(0, 100) + "...",
      aiPrompt: "Genera una imagen relacionada con este reto.",
    }
  } catch (error) {
    console.error("Error parsing AI response:", error)
    return {
      title: "Reto Generado",
      challenge: text.substring(0, 100) + "...",
      aiPrompt: "Genera una imagen relacionada con este reto.",
    }
  }
}
