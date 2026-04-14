import type { AuthIdentity } from '../domain/entities';

export interface AuthIdentityRepository {
  findByProvider(provider: AuthIdentity['provider'], providerUserId: string): Promise<AuthIdentity | null>;
  save(identity: AuthIdentity): Promise<AuthIdentity>;
}
