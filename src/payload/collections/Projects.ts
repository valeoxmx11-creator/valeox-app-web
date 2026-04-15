import type { CollectionConfig } from 'payload';
import { PROJECT_STATUSES, SOLUTION_TYPES } from '@/shared/types';
import { isAdmin } from '../access/isAdmin';
import { isAdminOrEditor } from '../access/isAdminOrEditor';
import { ensureProjectPublishable } from '../hooks/ensureProjectPublishable';
import { syncPublishedAt } from '../hooks/syncPublishedAt';

export const Projects: CollectionConfig = {
  slug: 'projects',
  labels: { singular: 'Project', plural: 'Projects' },
  admin: {
    useAsTitle: 'name',
    group: 'Operations',
    defaultColumns: ['name', 'clientName', 'status', '_status', 'isPublishable', 'updatedAt'],
  },
  timestamps: true,
  versions: {
    drafts: {
      autosave: true,
      schedulePublish: true,
    },
  },
  access: {
    read: isAdminOrEditor,
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdmin,
  },
  hooks: {
    beforeChange: [ensureProjectPublishable, syncPublishedAt],
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
    {
      name: 'owner',
      type: 'relationship',
      relationTo: 'users',
      filterOptions: {
        role: {
          not_equals: 'client',
        },
      },
    },
    { name: 'categories', type: 'relationship', relationTo: 'categories', hasMany: true },
    { name: 'startedAt', type: 'date' },
    { name: 'completedAt', type: 'date' },
    { name: 'publishedAt', type: 'date', admin: { readOnly: true } },
  ],
};
