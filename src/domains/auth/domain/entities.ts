import type { AuditedEntity, UserRole, UUID } from '@/shared/types';

export interface PlatformUser extends AuditedEntity {
  id: UUID;
  email: string;
  fullName: string;
  role: UserRole;
  isActive: boolean;
}

export interface AuthIdentity extends AuditedEntity {
  id: UUID;
  userId: UUID;
  provider: 'payload' | 'oauth';
  providerUserId: string;
}
