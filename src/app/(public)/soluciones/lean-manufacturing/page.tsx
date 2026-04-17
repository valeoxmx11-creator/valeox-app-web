import { ProtectedCTAButton } from '@/shared/components/public/ProtectedCTAButton';

export default function LeanManufacturingPage() {
  return (
    <main className="page">
      <section className="section">
        <p className="eyebrow">Lean Manufacturing</p>
        <h1>Excelencia operativa en planta con diseño sistémico</h1>
        <p>Aplicamos Lean como sistema de gestión, no como set aislado de herramientas.</p>
      </section>

      <section className="section two-cols">
        <article className="card">
          <h3>Metodologías</h3>
          <ul>
            <li>VSM y rediseño de flujo de valor</li>
            <li>SMED, TPM y reducción de paradas</li>
            <li>5S, gestión visual y disciplina de ejecución</li>
          </ul>
        </article>
        <article className="card">
          <h3>Impacto operacional</h3>
          <p>
            Mayor OEE, menor desperdicio, mejora en lead time y estabilidad de calidad en procesos
            críticos.
          </p>
        </article>
      </section>

      <section className="section cta-band">
        <h2>Activar diagnóstico de planta</h2>
        <ProtectedCTAButton ctaKey="lean-cta-diagnostico" action="diagnosis" label="Solicitar diagnóstico Lean" className="primary-btn" />
      </section>
    </main>
  );
}
