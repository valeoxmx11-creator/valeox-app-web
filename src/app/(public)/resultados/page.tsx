import { getPublishedProjects } from '@/data/queries/public-site';
import { buildMetadata } from '@/shared/lib/seo';

export const metadata = buildMetadata({
  title: 'Resultados',
  description: 'Casos publicados con impacto operacional medible en entornos empresariales reales.',
  path: '/resultados',
});
import { ProjectCard } from '@/shared/components/public/ProjectCard';
import { EmptyState } from '@/shared/components/public/EmptyState';
import { ProtectedCTAButton } from '@/shared/components/public/ProtectedCTAButton';

export default async function ResultadosPage() {
  const projects = await getPublishedProjects();

  return (
    <main className="page">
      <section className="section">
        <p className="eyebrow">Resultados</p>
        <h1>Transformación con impacto verificable</h1>
        <p>
          Cada caso publicado muestra rediseño de sistema, ejecución y resultados medibles en contexto
          operativo real.
        </p>
      </section>

      <section className="section">
        {projects.length === 0 ? (
          <EmptyState
            title="Sin resultados publicados"
            description="No hay casos públicos activos en este momento."
          />
        ) : (
          <div className="project-grid">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </section>

      <section className="section cta-band">
        <h2>¿Tu operación necesita rediseño estructural?</h2>
        <ProtectedCTAButton
          ctaKey="resultados-cta-diagnostico"
          action="diagnosis"
          label="Solicitar diagnóstico"
          className="primary-btn"
        />
      </section>
    </main>
  );
}
