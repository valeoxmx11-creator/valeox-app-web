import type { CollectionConfig } from 'payload';
import { SOURCE_TYPES } from '@/shared/types';

export const CtaEvents: CollectionConfig = {
  slug: 'cta-events',
  admin: { useAsTitle: 'ctaKey' },
  timestamps: true,
  fields: [
    { name: 'ctaKey', type: 'text', required: true },
    {
      name: 'sourceType',
      type: 'select',
      required: true,
      options: SOURCE_TYPES.map((value) => ({ label: value, value })),
    },
    { name: 'pagePath', type: 'text', required: true },
    { name: 'lead', type: 'relationship', relationTo: 'leads' },
    { name: 'project', type: 'relationship', relationTo: 'projects' },
    {
      name: 'metadata',
      type: 'json',
    },
    { name: 'occurredAt', type: 'date', required: true },
  ],
};
