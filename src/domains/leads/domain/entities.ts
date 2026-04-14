import type { ISODateString, UUID } from '@/shared/types';

export interface Lead {
  id: UUID;
  companyName: string;
  contactEmail: string;
  source: 'web' | 'referral' | 'campaign';
  qualificationStatus: 'new' | 'qualified' | 'disqualified';
  createdAt: ISODateString;
}
