import type { GlobalConfig } from 'payload';
import { isAdmin } from '../access/isAdmin';
import { isAdminOrEditor } from '../access/isAdminOrEditor';

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site Settings',
  admin: {
    group: 'Settings',
  },
  access: {
    read: isAdminOrEditor,
    update: isAdmin,
  },
  fields: [
    {
      type: 'collapsible',
      label: 'General',
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
    },
    {
      type: 'collapsible',
      label: 'Homepage',
      fields: [
        {
          name: 'homepageHeadline',
          type: 'text',
          required: true,
          defaultValue: 'Ingeniería operativa y transformación empresarial.',
        },
        {
          name: 'homepageSubheadline',
          type: 'textarea',
        },
        {
          name: 'featuredProjects',
          type: 'relationship',
          relationTo: 'projects',
          hasMany: true,
          filterOptions: {
            _status: {
              equals: 'published',
            },
          },
        },
      ],
    },
    {
      type: 'collapsible',
      label: 'CTA Configuration',
      fields: [
        {
          name: 'primaryCTA',
          type: 'group',
          fields: [
            { name: 'label', type: 'text', required: true, defaultValue: 'Agendar diagnóstico' },
            { name: 'href', type: 'text', required: true, defaultValue: '/contacto' },
            { name: 'trackingKey', type: 'text', required: true, defaultValue: 'primary-hero-cta' },
          ],
        },
      ],
    },
    {
      type: 'collapsible',
      label: 'Portal Readiness',
      fields: [
        {
          name: 'portalEnabled',
          type: 'checkbox',
          defaultValue: false,
        },
        {
          name: 'portalAccessMessage',
          type: 'textarea',
        },
      ],
    },
  ],
};
