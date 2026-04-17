import type { Category } from '../domain/entities';

export interface CategoryRepository {
  listAll(): Promise<Category[]>;
  findBySlug(slug: string): Promise<Category | null>;
}
