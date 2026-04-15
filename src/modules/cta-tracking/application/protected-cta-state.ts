import crypto from 'node:crypto';
import { env } from '@/shared/config/env';
import type { SourceType } from '@/shared/types';

export interface ProtectedCTAState {
  ctaKey: string;
  source_page: string;
  source_type: SourceType;
  landing_url: string;
  action: 'diagnosis' | 'gated_download' | 'save_project' | 'premium_access';
  createdAt: string;
}

const toBase64Url = (value: string) => Buffer.from(value).toString('base64url');
const fromBase64Url = (value: string) => Buffer.from(value, 'base64url').toString('utf-8');

export const encodeProtectedCTAState = (state: ProtectedCTAState): string => {
  const payload = JSON.stringify(state);
  const signature = crypto.createHmac('sha256', env.PAYLOAD_SECRET).update(payload).digest('base64url');
  return `${toBase64Url(payload)}.${signature}`;
};

export const decodeProtectedCTAState = (token: string): ProtectedCTAState => {
  const [payloadPart, signature] = token.split('.');

  if (!payloadPart || !signature) {
    throw new Error('Invalid CTA state token format.');
  }

  const payload = fromBase64Url(payloadPart);
  const expected = crypto.createHmac('sha256', env.PAYLOAD_SECRET).update(payload).digest('base64url');

  if (signature !== expected) {
    throw new Error('Invalid CTA state signature.');
  }

  const state = JSON.parse(payload) as ProtectedCTAState;
  return state;
};
