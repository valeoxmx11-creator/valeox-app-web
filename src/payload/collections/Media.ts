import type { CollectionConfig } from 'payload';
import { stampUpdatedBy } from '../hooks/stampUpdatedBy';

export const Media: CollectionConfig = {
  slug: 'media',
  upload: {
    staticDir: 'media',
  },
  hooks: {
    beforeChange: [stampUpdatedBy],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
    {
      name: 'updatedBy',
      type: 'relationship',
      relationTo: 'users',
      admin: {
        readOnly: true,
      },
    },
  ],
};
