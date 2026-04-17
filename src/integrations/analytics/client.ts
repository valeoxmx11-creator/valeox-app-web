export interface AnalyticsClient {
  track(eventName: string, payload: Record<string, unknown>): Promise<void>;
}
