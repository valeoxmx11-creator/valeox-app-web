import type { CollectionConfig } from 'payload';
import { SOURCE_TYPES } from '@/shared/types';
import { isAdmin } from '../access/isAdmin';
import { isAdminOrEditor } from '../access/isAdminOrEditor';

export const CtaEvents: CollectionConfig = {
  slug: 'cta-events',
  labels: { singular: 'CTA Event', plural: 'CTA Events' },
  admin: {
    useAsTitle: 'ctaKey',
    group: 'Growth',
    defaultColumns: ['ctaKey', 'sourceType', 'pagePath', 'lead', 'project', 'occurredAt'],
  },
  timestamps: true,
  access: {
    read: isAdminOrEditor,
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
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
    { name: 'metadata', type: 'json' },
    { name: 'occurredAt', type: 'date', required: true },
  ],
};
