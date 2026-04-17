import type { Project } from '../domain/entities';

export interface ProjectRepository {
  findById(id: string): Promise<Project | null>;
  findBySlug(slug: string): Promise<Project | null>;
  save(project: Project): Promise<Project>;
}

export interface ProjectPublishPolicy {
  canPublish(projectId: string): Promise<boolean>;
}
