import type { KPIAggregate } from '../domain/entities';
import type { GlobalKPIKey } from './global-kpi-keys';

export interface KPIAggregateRepository {
  listByScope(scopeType: KPIAggregate['scopeType'], scopeId?: string): Promise<KPIAggregate[]>;
  replaceBatch(values: KPIAggregate[]): Promise<void>;
}

export interface KPIAggregateCalculator {
  recalculateFromPublishedImpacts(params: { from?: string; to?: string }): Promise<KPIAggregate[]>;
}

export type GlobalKPISnapshot = Record<GlobalKPIKey, number>;
