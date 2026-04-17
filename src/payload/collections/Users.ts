import type { CollectionConfig } from 'payload';
import { USER_ROLES } from '@/shared/types';
import { isAdmin } from '../access/isAdmin';

export const Users: CollectionConfig = {
  slug: 'users',
  labels: { singular: 'User', plural: 'Users' },
  auth: true,
  admin: {
    useAsTitle: 'email',
    group: 'Governance',
    defaultColumns: ['fullName', 'email', 'role', 'isActive', 'updatedAt'],
  },
  timestamps: true,
  access: {
    read: isAdmin,
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  fields: [
    { name: 'fullName', type: 'text', required: true },
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'editor',
      options: USER_ROLES.map((value) => ({ label: value, value })),
    },
    { name: 'isActive', type: 'checkbox', defaultValue: true },
  ],
};
