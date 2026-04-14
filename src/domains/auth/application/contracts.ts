import type { AuthIdentity, PlatformUser } from '../domain/entities';

export interface UserRepository {
  findById(id: string): Promise<PlatformUser | null>;
  findByEmail(email: string): Promise<PlatformUser | null>;
}

export interface AuthIdentityRepository {
  findByProvider(provider: AuthIdentity['provider'], providerUserId: string): Promise<AuthIdentity | null>;
  save(identity: AuthIdentity): Promise<AuthIdentity>;
}
