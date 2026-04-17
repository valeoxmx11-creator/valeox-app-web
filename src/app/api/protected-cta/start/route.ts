import { NextResponse } from 'next/server';
import { z } from 'zod';
import { encodeProtectedCTAState } from '@/modules/cta-tracking/application/protected-cta-state';
import { SOURCE_TYPES } from '@/shared/types';
import { getPayloadClient } from '@/shared/lib/get-payload-client';

const bodySchema = z.object({
  ctaKey: z.string().min(2),
  action: z.enum(['diagnosis', 'gated_download', 'save_project', 'premium_access']),
  source_page: z.string().min(1),
  source_type: z.enum(SOURCE_TYPES),
  landing_url: z.string().url(),
});

export async function POST(req: Request) {
  const payload = await getPayloadClient();
  const parsed = bodySchema.safeParse(await req.json());

  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid protected CTA payload.' }, { status: 400 });
  }

  const state = encodeProtectedCTAState({
    ...parsed.data,
    createdAt: new Date().toISOString(),
  });

  await payload.create({
    collection: 'cta-events',
    data: {
      ctaKey: parsed.data.ctaKey,
      sourceType: parsed.data.source_type,
      pagePath: parsed.data.source_page,
      metadata: {
        action: parsed.data.action,
        state,
        landing_url: parsed.data.landing_url,
      },
      occurredAt: new Date().toISOString(),
    },
  });

  return NextResponse.json({
    authEntryUrl: `/auth/entry?state=${state}`,
    state,
  });
}
