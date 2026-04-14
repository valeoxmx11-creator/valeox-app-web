import type { KPIAggregate } from '../domain/entities';

export interface KPIAggregateRepository {
  listByScope(scopeType: KPIAggregate['scopeType'], scopeId?: string): Promise<KPIAggregate[]>;
  replaceBatch(values: KPIAggregate[]): Promise<void>;
}

export interface KPIAggregateCalculator {
  recalculateFromPublishedImpacts(params: { from?: string; to?: string }): Promise<KPIAggregate[]>;
}
