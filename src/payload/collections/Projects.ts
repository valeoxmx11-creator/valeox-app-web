import type { CollectionConfig } from 'payload';
import { PROJECT_STATUSES, SOLUTION_TYPES } from '@/shared/types';
import { ensureProjectPublishable } from '../hooks/ensureProjectPublishable';

export const Projects: CollectionConfig = {
  slug: 'projects',
  admin: { useAsTitle: 'name' },
  timestamps: true,
  hooks: {
    beforeChange: [ensureProjectPublishable],
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true },
    { name: 'clientName', type: 'text', required: true },
    { name: 'summary', type: 'textarea', required: true },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'draft',
      options: PROJECT_STATUSES.map((value) => ({ label: value, value })),
    },
    {
      name: 'solutionType',
      type: 'select',
      required: true,
      options: SOLUTION_TYPES.map((value) => ({ label: value, value })),
    },
    { name: 'isPublishable', type: 'checkbox', defaultValue: false, admin: { readOnly: true } },
    { name: 'lead', type: 'relationship', relationTo: 'leads' },
    { name: 'owner', type: 'relationship', relationTo: 'users' },
    { name: 'categories', type: 'relationship', relationTo: 'categories', hasMany: true },
    { name: 'startedAt', type: 'date' },
    { name: 'completedAt', type: 'date' },
  ],
};
