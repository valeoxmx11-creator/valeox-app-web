import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProjectBySlug } from '@/data/queries/public-site';
import { ProtectedCTAButton } from '@/shared/components/public/ProtectedCTAButton';
import { buildMetadata } from '@/shared/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return buildMetadata({
      title: 'Proyecto no encontrado',
      description: 'El resultado solicitado no está disponible.',
      path: `/resultados/${slug}`,
    });
  }

  return buildMetadata({
    title: `${project.name} · Resultado`,
    description: project.summary,
    path: `/resultados/${slug}`,
  });
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="page">
      <section className="section">
        <p className="eyebrow">Resultado</p>
        <h1>{project.name}</h1>
        <p className="muted">{project.clientName}</p>
        <p>{project.summary}</p>
      </section>

      <section className="section two-cols">
        <article className="card">
          <h3>Problema</h3>
          <p>{project.problem ?? 'Disponible en ficha estratégica interna.'}</p>
        </article>
        <article className="card">
          <h3>Diagnóstico e intervención</h3>
          <p>{project.diagnosis ?? 'Diagnóstico estructural aplicado sobre cuellos operativos críticos.'}</p>
          <p>{project.intervention ?? 'Intervención ejecutiva basada en rediseño de sistema.'}</p>
        </article>
      </section>

      <section className="section">
        <article className="card">
          <h3>Solución implementada</h3>
          <p>{project.implementedSolution ?? 'Implementación con control de ejecución e indicadores de impacto.'}</p>
        </article>
      </section>

      <section className="section">
        <h2>Impacto medible</h2>
        <div className="project-grid">
          {project.impacts.map((impact) => (
            <article className="card" key={impact.id}>
              <p className="card-label">{impact.metricKey}</p>
              <h3>{impact.title}</h3>
              <p>
                Base: {impact.baselineValue} · Actual: {impact.currentValue} ({impact.unit})
              </p>
              {impact.evidenceNote ? <p className="muted">{impact.evidenceNote}</p> : null}
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <article className="card">
          <h3>Impacto estratégico</h3>
          <p>{project.strategicImpact ?? 'Mayor capacidad de ejecución, previsibilidad y control directivo.'}</p>
        </article>
      </section>

      <section className="section cta-band">
        <h2>Replicar esta arquitectura en tu operación</h2>
        <ProtectedCTAButton
          ctaKey={`project-${project.slug}-cta`}
          action="diagnosis"
          label="Activar diagnóstico estructural"
          className="primary-btn"
        />
      </section>
    </main>
  );
}
