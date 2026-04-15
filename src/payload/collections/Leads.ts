import type { CollectionConfig } from 'payload';
import { AUTH_PROVIDERS, COMPANY_SIZES, LEAD_PRIORITIES, LEAD_STATUSES, SOLUTION_TYPES, SOURCE_TYPES } from '@/shared/types';
import { isAdmin } from '../access/isAdmin';
import { isAdminOrEditor } from '../access/isAdminOrEditor';

export const Leads: CollectionConfig = {
  slug: 'leads',
  labels: { singular: 'Lead', plural: 'Leads' },
  admin: {
    useAsTitle: 'email',
    group: 'Growth',
    defaultColumns: ['full_name', 'email', 'company', 'status', 'priority', 'qualification_score', 'updatedAt'],
  },
  timestamps: true,
  access: {
    read: isAdminOrEditor,
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdmin,
  },
  fields: [
    { name: 'full_name', type: 'text', required: true },
    { name: 'email', type: 'email', required: true, unique: true },
    { name: 'phone', type: 'text' },
    { name: 'company', type: 'text', required: true },
    { name: 'position', type: 'text', required: true },
    {
      name: 'company_size',
      type: 'select',
      required: true,
      options: COMPANY_SIZES.map((value) => ({ label: value, value })),
    },
    { name: 'sector', type: 'text', required: true },
    { name: 'main_problem', type: 'textarea', required: true },
    {
      name: 'main_interest',
      type: 'select',
      required: true,
      options: SOLUTION_TYPES.map((value) => ({ label: value, value })),
    },
    { name: 'accepts_whatsapp', type: 'checkbox', required: true, defaultValue: false },
    { name: 'accepts_marketing', type: 'checkbox', required: true, defaultValue: false },
    { name: 'accepts_privacy', type: 'checkbox', required: true, defaultValue: false },
    { name: 'source_page', type: 'text', required: true },
    {
      name: 'source_type',
      type: 'select',
      required: true,
      options: SOURCE_TYPES.map((value) => ({ label: value, value })),
    },
    { name: 'landing_url', type: 'text', required: true },
    {
      name: 'auth_provider',
      type: 'select',
      options: AUTH_PROVIDERS.map((value) => ({ label: value, value })),
    },
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
    { name: 'qualification_score', type: 'number', min: 0, max: 100, required: true },
    { name: 'notes', type: 'textarea' },
  ],
};
