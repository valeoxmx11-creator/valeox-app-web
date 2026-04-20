import type { AuditedEntity, UUID } from '@/shared/types';

export interface ProjectImpact extends AuditedEntity {
  id: UUID;
  projectId: UUID;
  title: string;
  metricKey: string;
  baselineValue: number;
  currentValue: number;
  unit: 'percent' | 'currency' | 'hours' | 'count';
  evidenceNote?: string;
  isPublished: boolean;
  measuredAt: string;
}
