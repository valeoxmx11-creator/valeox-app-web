export interface CTAEvent {
  ctaKey: string;
  channel: 'web' | 'email' | 'whatsapp';
  occurredAt: string;
  metadata?: Record<string, string | number | boolean>;
}

export interface CTAEventPublisher {
  publish(event: CTAEvent): Promise<void>;
}
