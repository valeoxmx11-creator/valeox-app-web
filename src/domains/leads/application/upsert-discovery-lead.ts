import type { Payload } from 'payload';
import type { DiscoverySurveySubmission } from './discovery-survey';
import { assignLeadPriority, calculateLeadScore } from './lead-qualification';

export interface UpsertDiscoveryLeadResult {
  leadId: string;
  created: boolean;
  qualificationScore: number;
  priority: 'low' | 'medium' | 'high' | 'strategic';
}

export const upsertDiscoveryLead = async (
  payload: Payload,
  submission: DiscoverySurveySubmission,
): Promise<UpsertDiscoveryLeadResult> => {
  if (!submission.step_two.accepts_privacy) {
    throw new Error('Privacy consent is required.');
  }

  const score = calculateLeadScore(submission);
  const priority = assignLeadPriority(score);

  const data = {
    full_name: submission.step_one.full_name,
    email: submission.step_one.email.toLowerCase().trim(),
    phone: submission.step_one.phone,
    company: submission.step_one.company,
    position: submission.step_one.position,
    company_size: submission.step_one.company_size,
    sector: submission.step_one.sector,
    main_problem: submission.step_two.main_problem,
    main_interest: submission.step_two.main_interest,
    accepts_whatsapp: submission.step_two.accepts_whatsapp,
    accepts_marketing: submission.step_two.accepts_marketing,
    accepts_privacy: submission.step_two.accepts_privacy,
    source_page: submission.source.source_page,
    source_type: submission.source.source_type,
    landing_url: submission.source.landing_url,
    priority,
    status: score >= 58 ? 'qualified' : 'new',
    qualification_score: score,
    auth_provider: submission.auth_provider,
  };

  const existing = await payload.find({
    collection: 'leads',
    limit: 1,
    where: {
      email: {
        equals: data.email,
      },
    },
  });

  if (existing.totalDocs > 0) {
    const updated = await payload.update({
      collection: 'leads',
      id: existing.docs[0].id,
      data,
    });

    return {
      leadId: String(updated.id),
      created: false,
      qualificationScore: score,
      priority,
    };
  }

  const created = await payload.create({
    collection: 'leads',
    data,
  });

  return {
    leadId: String(created.id),
    created: true,
    qualificationScore: score,
    priority,
  };
};
