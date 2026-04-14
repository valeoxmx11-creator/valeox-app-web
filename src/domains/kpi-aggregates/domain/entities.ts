import type { AuditedEntity, KPIScopeType, UUID } from '@/shared/types';

export interface KPIAggregate extends AuditedEntity {
  id: UUID;
  scopeType: KPIScopeType;
  scopeId?: UUID;
  aggregateKey: string;
  aggregateValue: number;
  sourceImpactIds: UUID[];
  windowStart?: string;
  windowEnd?: string;
  calculatedAt: string;
}
