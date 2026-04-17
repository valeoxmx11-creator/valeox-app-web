import { NextResponse } from 'next/server';
import { AUTH_PROVIDERS } from '@/shared/types';

const supportedProviders = new Set<string>(AUTH_PROVIDERS);

export async function GET(
  req: Request,
  { params }: { params: Promise<{ provider: string }> },
) {
  const { provider } = await params;
  const url = new URL(req.url);
  const state = url.searchParams.get('state');

  if (!supportedProviders.has(provider)) {
    return NextResponse.json({ error: 'Unsupported provider.' }, { status: 400 });
  }

  if (!state) {
    return NextResponse.json({ error: 'Missing state token.' }, { status: 400 });
  }

  // OAuth callback wiring is intentionally deferred. This foundation keeps the stateful flow intact.
  return NextResponse.redirect(new URL(`/auth/discovery?state=${state}&provider=${provider}`, url.origin));
}
