import { hasRole } from './hasRole';

export const isAdminOrEditor = hasRole(['admin', 'editor']);
