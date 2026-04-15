import type { CollectionConfig } from 'payload';
import { isAdmin } from '../access/isAdmin';
import { isAdminOrEditor } from '../access/isAdminOrEditor';

export const ProjectImpacts: CollectionConfig = {
  slug: 'project-impacts',
  labels: { singular: 'Project Impact', plural: 'Project Impacts' },
  admin: {
    useAsTitle: 'title',
    group: 'Operations',
    defaultColumns: ['title', 'project', 'metricKey', 'isPublished', 'measuredAt'],
  },
  timestamps: true,
  access: {
    read: isAdminOrEditor,
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdmin,
  },
  fields: [
    { name: 'project', type: 'relationship', relationTo: 'projects', required: true },
    { name: 'title', type: 'text', required: true },
    { name: 'metricKey', type: 'text', required: true },
    { name: 'baselineValue', type: 'number', required: true },
    { name: 'currentValue', type: 'number', required: true },
    {
      name: 'unit',
      type: 'select',
      required: true,
      options: [
        { label: 'Percent', value: 'percent' },
        { label: 'Currency', value: 'currency' },
        { label: 'Hours', value: 'hours' },
        { label: 'Count', value: 'count' },
      ],
    },
    { name: 'isPublished', type: 'checkbox', defaultValue: false },
    { name: 'evidenceNote', type: 'textarea' },
    { name: 'measuredAt', type: 'date', required: true },
  ],
};
