import type { CollectionConfig } from 'payload';
import { POST_STATUSES } from '@/shared/types';

export const Posts: CollectionConfig = {
  slug: 'posts',
  admin: { useAsTitle: 'title' },
  timestamps: true,
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true },
    { name: 'excerpt', type: 'textarea', required: true },
    { name: 'content', type: 'richText', required: true },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'draft',
      options: POST_STATUSES.map((value) => ({ label: value, value })),
    },
    { name: 'categories', type: 'relationship', relationTo: 'categories', hasMany: true },
    { name: 'author', type: 'relationship', relationTo: 'users', required: true },
    { name: 'publishedAt', type: 'date' },
  ],
};
