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

// Clase principal del servicio de analíticas
class AnalyticsServiceMock {
  private static instance: AnalyticsServiceMock
  private events: any[] = []

  private constructor() {
    // Constructor privado para Singleton
  }

  // Patrón Singleton
  public static getInstance(): AnalyticsServiceMock {
    if (!AnalyticsServiceMock.instance) {
      AnalyticsServiceMock.instance = new AnalyticsServiceMock()
    }
    return AnalyticsServiceMock.instance
  }

  // Métodos públicos
  public trackEvent(event: any): void {
    this.events.push(event)
    console.log(`Event tracked: ${JSON.stringify(event)}`)
  }

  public getEvents(): any[] {
    return this.events
  }

  public getEventsByType(type: string): any[] {
    return this.events.filter((event) => event.type === type)
  }
}

// Exportar una instancia del servicio
export const analyticsServiceMock = AnalyticsServiceMock.getInstance()
export default analyticsServiceMock
