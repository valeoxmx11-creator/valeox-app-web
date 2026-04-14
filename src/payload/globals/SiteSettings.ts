import type { GlobalConfig } from 'payload';
import { isAdmin } from '../access/isAdmin';

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  access: {
    read: () => true,
    update: isAdmin,
  },
  fields: [
    {
      name: 'siteName',
      type: 'text',
      required: true,
      defaultValue: 'VALEOX',
    },
    {
      name: 'defaultLocale',
      type: 'select',
      required: true,
      defaultValue: 'es',
      options: [
        { label: 'Español', value: 'es' },
        { label: 'English', value: 'en' },
      ],
    },
  ],
};
