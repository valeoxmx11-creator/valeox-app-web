import type { Lead } from '../domain/entities';

export interface LeadRepository {
  create(lead: Partial<Lead>): Promise<Lead>;
  findById(id: string): Promise<Lead | null>;
  findByEmail(email: string): Promise<Lead | null>;
  updateById(id: string, data: Partial<Lead>): Promise<Lead>;
}
