import type { ISODateString, UUID } from '@/shared/types';

export interface ProjectImpact {
  id: UUID;
  projectId: UUID;
  metricKey: string;
  baselineValue: number;
  currentValue: number;
  measuredAt: ISODateString;
}
