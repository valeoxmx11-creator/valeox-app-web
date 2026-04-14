import type { Project } from '../domain/entities';

export interface ProjectRepository {
  findById(id: string): Promise<Project | null>;
  save(project: Project): Promise<Project>;
}

export interface ProjectKPIAggregator {
  refreshForProject(projectId: string): Promise<void>;
}
