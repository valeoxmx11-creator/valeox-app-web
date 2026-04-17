import { ProtectedCTAButton } from '@/shared/components/public/ProtectedCTAButton';

export default function FirmaPage() {
  return (
    <main className="page">
      <section className="section">
        <p className="eyebrow">Firma</p>
        <h1>Ingeniería operativa para decisiones de alto impacto</h1>
        <p>No intervenimos personas. Diseñamos estructuras.</p>
      </section>

      <section className="section two-cols">
        <article className="card">
          <h3>Misión</h3>
          <p>
            Rediseñar sistemas empresariales para convertir complejidad operativa en resultados
            medibles, repetibles y sostenibles.
          </p>
        </article>
        <article className="card">
          <h3>Visión</h3>
          <p>
            Ser la firma de referencia para organizaciones que necesitan transformar ejecución en
            ventaja estructural.
          </p>
        </article>
      </section>

      <section className="section">
        <h2>Valores de trabajo</h2>
        <div className="kpi-grid">
          <article className="card"><h3>Rigor</h3><p>Decisiones basadas en evidencia operativa.</p></article>
          <article className="card"><h3>Estructura</h3><p>Arquitectura antes que iniciativas aisladas.</p></article>
          <article className="card"><h3>Responsabilidad</h3><p>Impacto verificable y trazabilidad ejecutiva.</p></article>
        </div>
      </section>

      <section className="section cta-band">
        <h2>Evaluar encaje estratégico</h2>
        <ProtectedCTAButton ctaKey="firma-cta-diagnostico" action="diagnosis" label="Solicitar evaluación" className="primary-btn" />
      </section>
    </main>
  );
}
