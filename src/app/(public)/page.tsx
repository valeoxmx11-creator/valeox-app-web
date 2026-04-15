import { getHomepageData } from '@/data/queries/public-site';
import { KPIGrid } from '@/shared/components/public/KPIGrid';
import { ProjectCard } from '@/shared/components/public/ProjectCard';
import { ProtectedCTAButton } from '@/shared/components/public/ProtectedCTAButton';

export default async function HomePage() {
  const data = await getHomepageData();

  return (
    <main className="page">
      <section className="section hero-block">
        <p className="eyebrow">VALEOX</p>
        <h1>{data.headline}</h1>
        <p>{data.subheadline}</p>
        <p className="muted">No intervenimos personas. Diseñamos estructuras.</p>
        <ProtectedCTAButton
          ctaKey="home-hero-diagnostico"
          action="diagnosis"
          label="Solicitar diagnóstico estructural"
          className="primary-btn"
        />
      </section>

      <section className="section">
        <h2>KPI de transformación operacional</h2>
        <KPIGrid kpis={data.kpis} />
      </section>

      <section className="section">
        <div className="section-head">
          <h2>Resultados destacados</h2>
          <a href="/resultados">Ver todos</a>
        </div>
        <div className="project-grid">
          {data.featuredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>

      <section className="section two-cols">
        <article className="card">
          <h3>Autoridad operativa</h3>
          <p>El sistema correcto determina el resultado.</p>
          <p>
            VALEOX opera sobre estructura, arquitectura de decisiones y diseño de ejecución medible,
            no sobre iniciativas aisladas.
          </p>
        </article>
        <article className="card">
          <h3>Método</h3>
          <ol>
            <li>Diagnóstico estructural y fricción sistémica.</li>
            <li>Rediseño de flujos, incentivos y control operativo.</li>
            <li>Implementación con impactos verificables.</li>
          </ol>
          <p className="muted">Un sistema no se mejora. Se rediseña.</p>
        </article>
      </section>

      <section className="section cta-band">
        <h2>Acceso a diagnóstico ejecutivo</h2>
        <p>Activa el flujo protegido para evaluar viabilidad de transformación con tu contexto real.</p>
        <ProtectedCTAButton
          ctaKey="home-cta-diagnostico"
          action="diagnosis"
          label="Iniciar evaluación"
          className="primary-btn"
        />
      </section>
    </main>
  );
}
