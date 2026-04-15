import type { LeadPriority } from '@/shared/types';
import type { DiscoverySurveySubmission } from './discovery-survey';

const sizeScores: Record<DiscoverySurveySubmission['step_one']['company_size'], number> = {
  '1-10': 8,
  '11-50': 14,
  '51-200': 20,
  '201-1000': 26,
  '1000+': 30,
};

const sourceScores: Record<DiscoverySurveySubmission['source']['source_type'], number> = {
  referral: 24,
  linkedin: 20,
  webinar: 18,
  direct: 16,
  organic: 12,
  paid: 10,
};

const interestScores: Partial<Record<DiscoverySurveySubmission['step_two']['main_interest'], number>> = {
  'operational-excellence': 20,
  'digital-transformation': 18,
  'kpi-architecture': 22,
  'cost-optimization': 18,
  'change-management': 14,
};

export const calculateLeadScore = (submission: DiscoverySurveySubmission): number => {
  const privacyScore = submission.step_two.accepts_privacy ? 10 : 0;
  const whatsappScore = submission.step_two.accepts_whatsapp ? 6 : 0;
  const marketingScore = submission.step_two.accepts_marketing ? 4 : 0;

  const total =
    sizeScores[submission.step_one.company_size] +
    sourceScores[submission.source.source_type] +
    (interestScores[submission.step_two.main_interest] ?? 0) +
    privacyScore +
    whatsappScore +
    marketingScore;

  return Math.max(0, Math.min(100, total));
};

export const assignLeadPriority = (score: number): LeadPriority => {
  if (score >= 78) {
    return 'strategic';
  }

  if (score >= 58) {
    return 'high';
  }

  if (score >= 35) {
    return 'medium';
  }

  return 'low';
};
