import type {
  AuditedEntity,
  CompanySize,
  LeadPriority,
  LeadStatus,
  SolutionType,
  SourceType,
  UUID,
} from '@/shared/types';

export interface Lead extends AuditedEntity {
  id: UUID;
  full_name: string;
  email: string;
  phone?: string;
  company: string;
  position: string;
  company_size: CompanySize;
  sector: string;
  main_problem: string;
  main_interest: SolutionType;
  accepts_whatsapp: boolean;
  accepts_marketing: boolean;
  accepts_privacy: boolean;
  source_page: string;
  source_type: SourceType;
  landing_url: string;
  priority: LeadPriority;
  status: LeadStatus;
  qualification_score: number;
}
