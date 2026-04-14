import type { AuditedEntity, UUID } from '@/shared/types';

export interface Category extends AuditedEntity {
  id: UUID;
  slug: string;
  label: string;
  description?: string;
}
