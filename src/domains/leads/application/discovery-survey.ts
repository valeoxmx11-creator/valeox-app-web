import type { AuthProvider, CompanySize, SolutionType, SourceType } from '@/shared/types';

export interface DiscoveryStepOneInput {
  full_name: string;
  email: string;
  phone?: string;
  company: string;
  position: string;
  company_size: CompanySize;
  sector: string;
}

export interface DiscoveryStepTwoInput {
  main_problem: string;
  main_interest: SolutionType;
  accepts_whatsapp: boolean;
  accepts_marketing: boolean;
  accepts_privacy: boolean;
}

export interface LeadSourceContext {
  source_page: string;
  source_type: SourceType;
  landing_url: string;
}

export interface DiscoverySurveySubmission {
  auth_provider: AuthProvider;
  step_one: DiscoveryStepOneInput;
  step_two: DiscoveryStepTwoInput;
  source: LeadSourceContext;
}
