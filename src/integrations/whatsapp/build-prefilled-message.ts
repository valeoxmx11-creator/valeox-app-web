import type { DiscoverySurveySubmission } from '@/domains/leads/application/discovery-survey';
import type { UpsertDiscoveryLeadResult } from '@/domains/leads/application/upsert-discovery-lead';

export const buildWhatsAppRedirectURL = (params: {
  baseNumber: string;
  submission: DiscoverySurveySubmission;
  result: UpsertDiscoveryLeadResult;
}): string => {
  const { baseNumber, submission, result } = params;

  const message = [
    'Hola equipo de VALEOX,',
    `Soy ${submission.step_one.full_name} de ${submission.step_one.company}.`,
    `Nos interesa: ${submission.step_two.main_interest}.`,
    `Problema principal: ${submission.step_two.main_problem}.`,
    `Referencia lead: ${result.leadId}.`,
  ].join('\n');

  const safeNumber = baseNumber.replace(/[^\d]/g, '');
  return `https://wa.me/${safeNumber}?text=${encodeURIComponent(message)}`;
};
