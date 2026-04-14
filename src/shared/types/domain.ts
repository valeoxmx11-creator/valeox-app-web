export const USER_ROLES = ['admin', 'editor', 'analyst', 'viewer', 'client'] as const;
export type UserRole = (typeof USER_ROLES)[number];

export const LEAD_STATUSES = ['new', 'qualified', 'contacted', 'proposal', 'won', 'lost'] as const;
export type LeadStatus = (typeof LEAD_STATUSES)[number];

export const LEAD_PRIORITIES = ['low', 'medium', 'high', 'strategic'] as const;
export type LeadPriority = (typeof LEAD_PRIORITIES)[number];

export const SOURCE_TYPES = ['organic', 'referral', 'linkedin', 'webinar', 'paid', 'direct'] as const;
export type SourceType = (typeof SOURCE_TYPES)[number];

export const SOLUTION_TYPES = [
  'operational-excellence',
  'digital-transformation',
  'kpi-architecture',
  'cost-optimization',
  'change-management',
] as const;
export type SolutionType = (typeof SOLUTION_TYPES)[number];

export const POST_STATUSES = ['draft', 'review', 'published', 'archived'] as const;
export type PostStatus = (typeof POST_STATUSES)[number];

export const PROJECT_STATUSES = ['draft', 'active', 'completed', 'archived'] as const;
export type ProjectStatus = (typeof PROJECT_STATUSES)[number];

export const KPI_SCOPE_TYPES = ['global', 'category', 'project', 'client'] as const;
export type KPIScopeType = (typeof KPI_SCOPE_TYPES)[number];
