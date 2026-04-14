import type { ISODateString, UUID } from '@/shared/types';

export interface Project {
  id: UUID;
  name: string;
  sector: string;
  status: 'draft' | 'active' | 'completed';
  startedAt?: ISODateString;
  completedAt?: ISODateString;
}
