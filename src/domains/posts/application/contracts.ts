import type { InsightPost } from '../domain/entities';

export interface InsightPostRepository {
  findBySlug(slug: string): Promise<InsightPost | null>;
  listPublished(): Promise<InsightPost[]>;
}
