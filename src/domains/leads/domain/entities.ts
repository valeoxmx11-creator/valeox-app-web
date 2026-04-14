import type {
  AuditedEntity,
  LeadPriority,
  LeadStatus,
  SolutionType,
  SourceType,
  UUID,
} from '@/shared/types';

export interface Lead extends AuditedEntity {
  id: UUID;
  companyName: string;
  contactName: string;
  contactEmail: string;
  contactPhone?: string;
  sourceType: SourceType;
  sourceDetail?: string;
  priority: LeadPriority;
  status: LeadStatus;
  solutionType?: SolutionType;
  qualificationScore?: number;
  notes?: string;
}
