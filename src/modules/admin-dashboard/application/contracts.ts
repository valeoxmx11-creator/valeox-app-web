export interface AdminDashboardSnapshot {
  activeProjects: number;
  qualifiedLeads: number;
  latestKPIRefreshAt?: string;
}

export interface AdminDashboardQueryService {
  getSnapshot(): Promise<AdminDashboardSnapshot>;
}
