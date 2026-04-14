import type { AuditedEntity, SourceType, UUID } from '@/shared/types';

export interface CTAEvent extends AuditedEntity {
  id: UUID;
  ctaKey: string;
  sourceType: SourceType;
  pagePath: string;
  leadId?: UUID;
  projectId?: UUID;
  metadata?: Record<string, string | number | boolean>;
  occurredAt: string;
}
