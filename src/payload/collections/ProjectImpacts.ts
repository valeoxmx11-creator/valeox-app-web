import type { CollectionConfig } from 'payload';

export const ProjectImpacts: CollectionConfig = {
  slug: 'project-impacts',
  admin: { useAsTitle: 'title' },
  timestamps: true,
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
