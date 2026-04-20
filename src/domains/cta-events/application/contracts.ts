import type { CTAEvent } from '../domain/entities';

export interface CTAEventRepository {
  create(event: CTAEvent): Promise<CTAEvent>;
  listByDateRange(params: { from: string; to: string }): Promise<CTAEvent[]>;
}
