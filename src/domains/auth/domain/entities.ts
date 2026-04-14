import type { UUID } from '@/shared/types';

export interface AuthIdentity {
  id: UUID;
  userId: UUID;
  provider: 'payload' | 'oauth';
  providerUserId: string;
}
