import type { CollectionConfig } from 'payload';
import { KPI_SCOPE_TYPES } from '@/shared/types';
import { isAdmin } from '../access/isAdmin';
import { isAdminOrEditor } from '../access/isAdminOrEditor';

export const KpiAggregates: CollectionConfig = {
  slug: 'kpi-aggregates',
  labels: { singular: 'KPI Aggregate', plural: 'KPI Aggregates' },
  admin: {
    useAsTitle: 'aggregateKey',
    group: 'Operations',
    defaultColumns: ['aggregateKey', 'scopeType', 'aggregateValue', 'calculatedAt'],
  },
  timestamps: true,
  access: {
    read: isAdminOrEditor,
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
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
      admin: {
        description: 'Published project impacts used to compute this aggregate snapshot.',
      },
    },
    { name: 'windowStart', type: 'date' },
    { name: 'windowEnd', type: 'date' },
    { name: 'calculatedAt', type: 'date', required: true },
  ],
};
