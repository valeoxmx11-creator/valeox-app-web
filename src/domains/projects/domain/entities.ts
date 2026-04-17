import type { AuditedEntity, ProjectStatus, SolutionType, UUID } from '@/shared/types';

export interface Project extends AuditedEntity {
  id: UUID;
  name: string;
  slug: string;
  clientName: string;
  summary: string;
  status: ProjectStatus;
  solutionType: SolutionType;
  isPublishable: boolean;
  leadId?: UUID;
  ownerUserId?: UUID;
  startedAt?: string;
  completedAt?: string;
}
