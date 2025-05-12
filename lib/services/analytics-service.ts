// Tipos para el servicio de analíticas
export type EventType =
  | "challenge_started"
  | "challenge_completed"
  | "challenge_failed"
  | "reward_earned"
  | "reward_redeemed"
  | "vault_item_viewed"
  | "vault_item_created"
  | "template_used"
  | "social_trigger_activated"
  | "session_started"
  | "session_ended"
  | "user_registered"
  | "user_login"

export type AnalyticsEvent = {
  id: string
  type: EventType
  userId?: string
  timestamp: Date
  properties: Record<string, any>
  sessionId?: string
  deviceInfo?: {
    type: string
    os: string
    browser: string
  }
  locationInfo?: {
    venue?: string
    city?: string
    country?: string
  }
}

export type AnalyticsQuery = {
  eventType?: EventType
  userId?: string
  startDate?: Date
  endDate?: Date
  properties?: Record<string, any>
  sessionId?: string
  venue?: string
  limit?: number
  offset?: number
}

export type AnalyticsSummary = {
  totalEvents: number
  eventCounts: Record<EventType, number>
  userCount: number
  sessionCount: number
  averageSessionDuration: number
  topVenues: Array<{ venue: string; count: number }>
  topChallenges: Array<{ challengeId: string; count: number }>
  topTemplates: Array<{ templateType: string; count: number }>
  conversionRates: {
    challengeCompletionRate: number
    rewardRedemptionRate: number
    socialTriggerActivationRate: number
  }
}

// Clase principal del servicio de analíticas
class AnalyticsService {
  private static instance: AnalyticsService
  private events: any[] = []
  private sessionData: Record<string, { startTime: Date; endTime?: Date }> = {}

  private constructor() {
    // Inicializar con algunos eventos de ejemplo
    this.initializeEvents()
  }

  // Patrón Singleton
  public static getInstance(): AnalyticsService {
    if (!AnalyticsService.instance) {
      AnalyticsService.instance = new AnalyticsService()
    }
    return AnalyticsService.instance
  }

  private initializeEvents() {
    // Generar algunos eventos de ejemplo para demostración
    const now = new Date()
    const userIds = ["user_123", "user_456", "user_789"]
    const sessionIds = ["session_123", "session_456", "session_789"]
    const venues = ["Bar La Cortesía", "Cantina El Despecho", "Club Nocturno"]
    const challengeIds = ["cortesia_001", "cortesia_002", "cortesia_003"]
    const templateTypes = ["ChatToxico", "InstagramDespechado", "MemeDespecho"]

    // Generar eventos aleatorios en los últimos 30 días
    for (let i = 0; i < 100; i++) {
      const userId = userIds[Math.floor(Math.random() * userIds.length)]
      const sessionId = sessionIds[Math.floor(Math.random() * sessionIds.length)]
      const venue = venues[Math.floor(Math.random() * venues.length)]
      const challengeId = challengeIds[Math.floor(Math.random() * challengeIds.length)]
      const templateType = templateTypes[Math.floor(Math.random() * templateTypes.length)]

      const timestamp = new Date(now.getTime() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000))

      // Determinar tipo de evento
      let eventType: EventType
      const eventRandom = Math.random()

      if (eventRandom < 0.2) {
        eventType = "challenge_started"
      } else if (eventRandom < 0.4) {
        eventType = "challenge_completed"
      } else if (eventRandom < 0.5) {
        eventType = "challenge_failed"
      } else if (eventRandom < 0.6) {
        eventType = "reward_earned"
      } else if (eventRandom < 0.7) {
        eventType = "reward_redeemed"
      } else if (eventRandom < 0.8) {
        eventType = "template_used"
      } else if (eventRandom < 0.9) {
        eventType = "social_trigger_activated"
      } else {
        eventType = "vault_item_viewed"
      }

      // Crear propiedades específicas según el tipo de evento
      let properties: Record<string, any> = {}

      switch (eventType) {
        case "challenge_started":
        case "challenge_completed":
        case "challenge_failed":
          properties = {
            challengeId,
            capsuleType: challengeId.split("_")[0],
            archetypeId: challengeId.split("_")[1],
            difficulty: Math.floor(Math.random() * 3) + 1,
          }
          break
        case "reward_earned":
        case "reward_redeemed":
          properties = {
            rewardId: `reward_${i}`,
            rewardType: ["sticker", "shot", "discount", "product"][Math.floor(Math.random() * 4)],
            rewardValue: Math.floor(Math.random() * 50) + 5,
            challengeId,
          }
          break
        case "template_used":
          properties = {
            templateType,
            challengeId,
            completionTime: Math.floor(Math.random() * 120) + 30,
          }
          break
        case "social_trigger_activated":
          properties = {
            triggerType: ["group_vote", "share", "tag_friend"][Math.floor(Math.random() * 3)],
            challengeId,
            bonusPoints: Math.floor(Math.random() * 10) + 1,
          }
          break
        case "vault_item_viewed":
          properties = {
            vaultItemId: `vault_${i}`,
            vaultItemType: ["meme", "sticker", "clip"][Math.floor(Math.random() * 3)],
            viewDuration: Math.floor(Math.random() * 60) + 5,
          }
          break
      }

      // Añadir el evento
      this.events.push({
        id: `event_${i}`,
        type: eventType,
        userId,
        timestamp,
        properties,
        sessionId,
        deviceInfo: {
          type: ["mobile", "desktop", "tablet"][Math.floor(Math.random() * 3)],
          os: ["iOS", "Android", "Windows", "macOS"][Math.floor(Math.random() * 4)],
          browser: ["Chrome", "Safari", "Firefox"][Math.floor(Math.random() * 3)],
        },
        locationInfo: {
          venue,
          city: ["Ciudad de México", "Guadalajara", "Monterrey"][Math.floor(Math.random() * 3)],
          country: "México",
        },
      })

      // Registrar datos de sesión
      if (!this.sessionData[sessionId]) {
        this.sessionData[sessionId] = {
          startTime: timestamp,
        }
      }

      // Actualizar tiempo de fin si es un evento de fin de sesión
      if (eventType === "session_ended") {
        this.sessionData[sessionId].endTime = timestamp
      }
    }

    // Ordenar eventos por timestamp
    this.events.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime())
  }

  // Métodos públicos
  public trackEvent(event: any): void {
    this.events.push(event)
    console.log(`Event tracked: ${event.type}`)
  }

  public getEvents(): any[] {
    return this.events
  }

  public getEventsByType(type: string): any[] {
    return this.events.filter((event) => event.type === type)
  }

  public async trackEventOld(event: Omit<AnalyticsEvent, "id" | "timestamp">): Promise<AnalyticsEvent> {
    const newEvent: AnalyticsEvent = {
      ...event,
      id: `event_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      timestamp: new Date(),
    }

    this.events.push(newEvent)

    // Actualizar datos de sesión si es necesario
    if (newEvent.sessionId) {
      if (newEvent.type === "session_started") {
        this.sessionData[newEvent.sessionId] = {
          startTime: newEvent.timestamp,
        }
      } else if (newEvent.type === "session_ended" && this.sessionData[newEvent.sessionId]) {
        this.sessionData[newEvent.sessionId].endTime = newEvent.timestamp
      }
    }

    return newEvent
  }

  public async getEventsOld(query: AnalyticsQuery = {}): Promise<AnalyticsEvent[]> {
    let filteredEvents = [...this.events]

    // Aplicar filtros
    if (query.eventType) {
      filteredEvents = filteredEvents.filter((event) => event.type === query.eventType)
    }

    if (query.userId) {
      filteredEvents = filteredEvents.filter((event) => event.userId === query.userId)
    }

    if (query.startDate) {
      filteredEvents = filteredEvents.filter((event) => event.timestamp >= query.startDate)
    }

    if (query.endDate) {
      filteredEvents = filteredEvents.filter((event) => event.timestamp <= query.endDate)
    }

    if (query.sessionId) {
      filteredEvents = filteredEvents.filter((event) => event.sessionId === query.sessionId)
    }

    if (query.venue) {
      filteredEvents = filteredEvents.filter((event) => event.locationInfo?.venue === query.venue)
    }

    if (query.properties) {
      filteredEvents = filteredEvents.filter((event) => {
        return Object.entries(query.properties!).every(([key, value]) => {
          return event.properties[key] === value
        })
      })
    }

    // Ordenar por timestamp (más reciente primero)
    filteredEvents.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())

    // Aplicar paginación
    const limit = query.limit || filteredEvents.length
    const offset = query.offset || 0

    return filteredEvents.slice(offset, offset + limit)
  }

  public async getSummary(startDate?: Date, endDate?: Date): Promise<AnalyticsSummary> {
    // Filtrar eventos por fecha si es necesario
    let filteredEvents = [...this.events]

    if (startDate) {
      filteredEvents = filteredEvents.filter((event) => event.timestamp >= startDate)
    }

    if (endDate) {
      filteredEvents = filteredEvents.filter((event) => event.timestamp <= endDate)
    }

    // Contar eventos por tipo
    const eventCounts: Record<EventType, number> = {} as Record<EventType, number>
    filteredEvents.forEach((event) => {
      eventCounts[event.type] = (eventCounts[event.type] || 0) + 1
    })

    // Contar usuarios únicos
    const uniqueUserIds = new Set(filteredEvents.filter((e) => e.userId).map((e) => e.userId))

    // Contar sesiones únicas
    const uniqueSessionIds = new Set(filteredEvents.filter((e) => e.sessionId).map((e) => e.sessionId))

    // Calcular duración promedio de sesión
    let totalSessionDuration = 0
    let sessionsWithDuration = 0

    Object.entries(this.sessionData).forEach(([sessionId, data]) => {
      if (data.startTime && data.endTime) {
        totalSessionDuration += data.endTime.getTime() - data.startTime.getTime()
        sessionsWithDuration++
      }
    })

    const averageSessionDuration =
      sessionsWithDuration > 0
        ? totalSessionDuration / sessionsWithDuration / 1000 / 60 // en minutos
        : 0

    // Contar eventos por venue
    const venueCounts: Record<string, number> = {}
    filteredEvents.forEach((event) => {
      if (event.locationInfo?.venue) {
        venueCounts[event.locationInfo.venue] = (venueCounts[event.locationInfo.venue] || 0) + 1
      }
    })

    const topVenues = Object.entries(venueCounts)
      .map(([venue, count]) => ({ venue, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5)

    // Contar desafíos completados
    const challengeCounts: Record<string, number> = {}
    filteredEvents
      .filter((e) => e.type === "challenge_completed" && e.properties.challengeId)
      .forEach((event) => {
        challengeCounts[event.properties.challengeId] = (challengeCounts[event.properties.challengeId] || 0) + 1
      })

    const topChallenges = Object.entries(challengeCounts)
      .map(([challengeId, count]) => ({ challengeId, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5)

    // Contar plantillas usadas
    const templateCounts: Record<string, number> = {}
    filteredEvents
      .filter((e) => e.type === "template_used" && e.properties.templateType)
      .forEach((event) => {
        templateCounts[event.properties.templateType] = (templateCounts[event.properties.templateType] || 0) + 1
      })

    const topTemplates = Object.entries(templateCounts)
      .map(([templateType, count]) => ({ templateType, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5)

    // Calcular tasas de conversión
    const challengesStarted = eventCounts["challenge_started"] || 0
    const challengesCompleted = eventCounts["challenge_completed"] || 0
    const rewardsEarned = eventCounts["reward_earned"] || 0
    const rewardsRedeemed = eventCounts["reward_redeemed"] || 0
    const socialTriggersActivated = eventCounts["social_trigger_activated"] || 0

    const challengeCompletionRate = challengesStarted > 0 ? challengesCompleted / challengesStarted : 0

    const rewardRedemptionRate = rewardsEarned > 0 ? rewardsRedeemed / rewardsEarned : 0

    const socialTriggerActivationRate = challengesCompleted > 0 ? socialTriggersActivated / challengesCompleted : 0

    return {
      totalEvents: filteredEvents.length,
      eventCounts,
      userCount: uniqueUserIds.size,
      sessionCount: uniqueSessionIds.size,
      averageSessionDuration,
      topVenues,
      topChallenges,
      topTemplates,
      conversionRates: {
        challengeCompletionRate,
        rewardRedemptionRate,
        socialTriggerActivationRate,
      },
    }
  }

  // Métodos para análisis específicos
  public async getUserRetention(days = 30): Promise<number> {
    // Calcular tasa de retención de usuarios en el período especificado
    const now = new Date()
    const startDate = new Date(now.getTime() - days * 24 * 60 * 60 * 1000)

    // Usuarios que han interactuado en el período
    const recentEvents = this.events.filter((e) => e.timestamp >= startDate && e.userId)
    const recentUserIds = new Set(recentEvents.map((e) => e.userId))

    // Usuarios que han interactuado antes del período
    const previousEvents = this.events.filter((e) => e.timestamp < startDate && e.userId)
    const previousUserIds = new Set(previousEvents.map((e) => e.userId))

    // Usuarios que han vuelto
    let returnedUsers = 0
    recentUserIds.forEach((userId) => {
      if (previousUserIds.has(userId)) {
        returnedUsers++
      }
    })

    return previousUserIds.size > 0 ? returnedUsers / previousUserIds.size : 0
  }

  public async getChallengeCompletionRate(challengeId?: string): Promise<number> {
    let challengeStartedEvents = this.events.filter((e) => e.type === "challenge_started")
    let challengeCompletedEvents = this.events.filter((e) => e.type === "challenge_completed")

    if (challengeId) {
      challengeStartedEvents = challengeStartedEvents.filter((e) => e.properties.challengeId === challengeId)
      challengeCompletedEvents = challengeCompletedEvents.filter((e) => e.properties.challengeId === challengeId)
    }

    return challengeStartedEvents.length > 0 ? challengeCompletedEvents.length / challengeStartedEvents.length : 0
  }

  public async getTemplateUsageStats(): Promise<Record<string, number>> {
    const templateEvents = this.events.filter((e) => e.type === "template_used" && e.properties.templateType)
    const stats: Record<string, number> = {}

    templateEvents.forEach((event) => {
      const templateType = event.properties.templateType
      stats[templateType] = (stats[templateType] || 0) + 1
    })

    return stats
  }

  public generateReport(): any {
    // Logic to generate a report based on tracked events
    console.log("Generating analytics report...")
    return {}
  }
}

// Exportar una instancia del servicio
export const analyticsService = AnalyticsService.getInstance()
export default analyticsService
