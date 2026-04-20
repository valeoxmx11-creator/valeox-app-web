import type { Access } from 'payload';
import type { UserRole } from '@/shared/types';

export const hasRole = (roles: UserRole[]): Access => {
  return ({ req }) => {
    if (!req.user) {
      return false;
    }

    return roles.includes(req.user.role as UserRole);
  };
};
