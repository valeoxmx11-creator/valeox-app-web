export interface ClientPortalAccessPolicy {
  canViewProject(clientId: string, projectId: string): Promise<boolean>;
}
