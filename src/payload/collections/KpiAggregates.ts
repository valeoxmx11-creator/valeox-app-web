import type { CollectionConfig } from 'payload';
import { KPI_SCOPE_TYPES } from '@/shared/types';

export const KpiAggregates: CollectionConfig = {
  slug: 'kpi-aggregates',
  admin: { useAsTitle: 'aggregateKey' },
  timestamps: true,
  fields: [
    {
      name: 'scopeType',
      type: 'select',
      required: true,
      options: KPI_SCOPE_TYPES.map((value) => ({ label: value, value })),
    },
    { name: 'scopeProject', type: 'relationship', relationTo: 'projects' },
    { name: 'scopeCategory', type: 'relationship', relationTo: 'categories' },
    { name: 'aggregateKey', type: 'text', required: true },
    { name: 'aggregateValue', type: 'number', required: true },
    {
      name: 'sourceImpacts',
      type: 'relationship',
      relationTo: 'project-impacts',
      hasMany: true,
      required: true,
    },
    { name: 'windowStart', type: 'date' },
    { name: 'windowEnd', type: 'date' },
    { name: 'calculatedAt', type: 'date', required: true },
  ],
};
