import type { CollectionConfig } from 'payload';
import { POST_STATUSES } from '@/shared/types';
import { isAdmin } from '../access/isAdmin';
import { isAdminOrEditor } from '../access/isAdminOrEditor';
import { syncPublishedAt } from '../hooks/syncPublishedAt';

export const Posts: CollectionConfig = {
  slug: 'posts',
  labels: { singular: 'Post', plural: 'Posts' },
  admin: {
    useAsTitle: 'title',
    group: 'Content',
    defaultColumns: ['title', 'status', '_status', 'author', 'publishedAt', 'updatedAt'],
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
    beforeChange: [syncPublishedAt],
  },
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
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      filterOptions: {
        role: {
          not_equals: 'client',
        },
      },
    },
    { name: 'publishedAt', type: 'date', admin: { readOnly: true } },
  ],
};
