import type { ISODateString, UUID } from '@/shared/types';

export interface InsightPost {
  id: UUID;
  slug: string;
  title: string;
  excerpt: string;
  publishedAt?: ISODateString;
  status: 'draft' | 'published';
}
