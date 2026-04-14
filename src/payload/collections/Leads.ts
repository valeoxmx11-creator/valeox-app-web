import type { CollectionConfig } from 'payload';
import { LEAD_PRIORITIES, LEAD_STATUSES, SOLUTION_TYPES, SOURCE_TYPES } from '@/shared/types';

export const Leads: CollectionConfig = {
  slug: 'leads',
  admin: { useAsTitle: 'contactEmail' },
  timestamps: true,
  fields: [
    { name: 'companyName', type: 'text', required: true },
    { name: 'contactName', type: 'text', required: true },
    { name: 'contactEmail', type: 'email', required: true, unique: true },
    { name: 'contactPhone', type: 'text' },
    {
      name: 'sourceType',
      type: 'select',
      required: true,
      options: SOURCE_TYPES.map((value) => ({ label: value, value })),
    },
    { name: 'sourceDetail', type: 'text' },
    {
      name: 'priority',
      type: 'select',
      required: true,
      defaultValue: 'medium',
      options: LEAD_PRIORITIES.map((value) => ({ label: value, value })),
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'new',
      options: LEAD_STATUSES.map((value) => ({ label: value, value })),
    },
    {
      name: 'solutionType',
      type: 'select',
      options: SOLUTION_TYPES.map((value) => ({ label: value, value })),
    },
    { name: 'qualificationScore', type: 'number', min: 0, max: 100 },
    { name: 'notes', type: 'textarea' },
  ],
};
