import Link from 'next/link';
import type { PublicProjectCard } from '@/data/queries/public-site';

export function ProjectCard({ project }: { project: PublicProjectCard }) {
  return (
    <article className="card project-card">
      <p className="card-label">{project.clientName}</p>
      <h3>{project.name}</h3>
      <p>{project.summary}</p>
      <div className="project-meta">
        <span>{project.solutionType}</span>
        <Link href={`/resultados/${project.slug}`}>Ver proyecto</Link>
      </div>
    </article>
  );
}
