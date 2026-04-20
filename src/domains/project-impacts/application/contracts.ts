import type { ProjectImpact } from '../domain/entities';

export interface ProjectImpactRepository {
  listByProject(projectId: string): Promise<ProjectImpact[]>;
  listPublishedByProject(projectId: string): Promise<ProjectImpact[]>;
  upsert(impact: ProjectImpact): Promise<ProjectImpact>;
}
