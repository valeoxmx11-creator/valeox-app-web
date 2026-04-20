import { NextResponse } from 'next/server';
import { z } from 'zod';
import { upsertDiscoveryLead } from '@/domains/leads/application/upsert-discovery-lead';
import { buildWhatsAppRedirectURL } from '@/integrations/whatsapp/build-prefilled-message';
import { decodeProtectedCTAState } from '@/modules/cta-tracking/application/protected-cta-state';
import { getPayloadClient } from '@/shared/lib/get-payload-client';
import { AUTH_PROVIDERS, COMPANY_SIZES, SOLUTION_TYPES } from '@/shared/types';
import { env } from '@/shared/config/env';

const requestSchema = z.object({
  state: z.string().min(1),
  auth_provider: z.enum(AUTH_PROVIDERS),
  step_one: z.object({
    full_name: z.string().min(2),
    email: z.string().email(),
    phone: z.string().optional(),
    company: z.string().min(2),
    position: z.string().min(2),
    company_size: z.enum(COMPANY_SIZES),
    sector: z.string().min(2),
  }),
  step_two: z.object({
    main_problem: z.string().min(10),
    main_interest: z.enum(SOLUTION_TYPES),
    accepts_whatsapp: z.boolean(),
    accepts_marketing: z.boolean(),
    accepts_privacy: z.boolean(),
  }),
});

export async function POST(req: Request) {
  const payload = await getPayloadClient();
  const parsed = requestSchema.safeParse(await req.json());

  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid discovery payload.' }, { status: 400 });
  }

  const source = decodeProtectedCTAState(parsed.data.state);

  const submission = {
    auth_provider: parsed.data.auth_provider,
    step_one: parsed.data.step_one,
    step_two: parsed.data.step_two,
    source: {
      source_page: source.source_page,
      source_type: source.source_type,
      landing_url: source.landing_url,
    },
  };

  const result = await upsertDiscoveryLead(payload, submission);

  await payload.create({
    collection: 'cta-events',
    data: {
      ctaKey: source.ctaKey,
      sourceType: source.source_type,
      pagePath: source.source_page,
      lead: result.leadId,
      metadata: {
        action: source.action,
        auth_provider: submission.auth_provider,
        priority: result.priority,
        qualification_score: result.qualificationScore,
      },
      occurredAt: new Date().toISOString(),
    },
  });

  if (submission.step_two.accepts_whatsapp && env.WHATSAPP_TARGET_NUMBER) {
    const whatsappRedirect = buildWhatsAppRedirectURL({
      baseNumber: env.WHATSAPP_TARGET_NUMBER,
      submission,
      result,
    });

    return NextResponse.json({
      outcome: 'whatsapp',
      whatsappRedirect,
      leadId: result.leadId,
      priority: result.priority,
      qualification_score: result.qualificationScore,
    });
  }

  return NextResponse.json({
    outcome: 'stored',
    thankYouUrl: '/gracias',
    leadId: result.leadId,
    priority: result.priority,
    qualification_score: result.qualificationScore,
  });
}
