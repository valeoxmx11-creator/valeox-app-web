import type { ISODateString, UUID } from '@/shared/types';

export interface KPIAggregate {
  id: UUID;
  scope: 'global' | 'project' | 'client';
  scopeId?: UUID;
  key: string;
  value: number;
  aggregatedAt: ISODateString;
}
