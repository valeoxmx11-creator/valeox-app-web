import type { AuditedEntity, PostStatus, UUID } from '@/shared/types';

export interface PostCategory extends AuditedEntity {
  id: UUID;
  slug: string;
  name: string;
  description?: string;
}

export interface InsightPost extends AuditedEntity {
  id: UUID;
  slug: string;
  title: string;
  excerpt: string;
  content: unknown;
  status: PostStatus;
  categoryIds: UUID[];
  publishedAt?: string;
}
