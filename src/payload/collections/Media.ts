import type { CollectionConfig } from 'payload';
import { isAdmin } from '../access/isAdmin';
import { isAdminOrEditor } from '../access/isAdminOrEditor';
import { stampUpdatedBy } from '../hooks/stampUpdatedBy';

export const Media: CollectionConfig = {
  slug: 'media',
  labels: { singular: 'Media Asset', plural: 'Media Assets' },
  admin: {
    group: 'Content',
    defaultColumns: ['filename', 'alt', 'updatedBy', 'updatedAt'],
  },
  upload: {
    staticDir: 'media',
  },
  timestamps: true,
  access: {
    read: isAdminOrEditor,
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdmin,
  },
  hooks: {
    beforeChange: [stampUpdatedBy],
  },
  fields: [
    { name: 'alt', type: 'text', required: true },
    {
      name: 'updatedBy',
      type: 'relationship',
      relationTo: 'users',
      admin: { readOnly: true },
    },
  ],
};
