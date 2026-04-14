import type { KPIAggregate } from '../domain/entities';

export interface KPIAggregateRepository {
  listByScope(scope: KPIAggregate['scope'], scopeId?: string): Promise<KPIAggregate[]>;
  replaceBatch(values: KPIAggregate[]): Promise<void>;
}
