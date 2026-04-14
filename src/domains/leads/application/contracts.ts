import type { Lead } from '../domain/entities';

export interface LeadRepository {
  create(lead: Lead): Promise<Lead>;
  findById(id: string): Promise<Lead | null>;
  findByEmail(email: string): Promise<Lead | null>;
  updateStatus(id: string, status: Lead['status']): Promise<void>;
}
