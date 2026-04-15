import { ProtectedCTAButton } from '@/shared/components/public/ProtectedCTAButton';

export default function ContactoPage() {
  return (
    <main className="page">
      <section className="section">
        <p className="eyebrow">Contacto</p>
        <h1>Diagnóstico estructural para dirección ejecutiva</h1>
        <p>
          Si tu operación está creciendo con fricción, variabilidad o baja capacidad de ejecución,
          iniciamos con una evaluación estructural breve y accionable.
        </p>
      </section>

      <section className="section two-cols">
        <article className="card">
          <h3>Qué evaluamos</h3>
          <ul>
            <li>Arquitectura operativa y decisiones.</li>
            <li>Flujos críticos y pérdidas sistémicas.</li>
            <li>Capacidad real de ejecución por diseño.</li>
          </ul>
        </article>

        <article className="card">
          <h3>Resultado esperado</h3>
          <p>
            Definición de ruta de rediseño con prioridades, impacto potencial y primer bloque de
            implementación.
          </p>
          <p className="muted">Un sistema no se mejora. Se rediseña.</p>
        </article>
      </section>

      <section className="section cta-band">
        <h2>Iniciar flujo protegido de diagnóstico</h2>
        <p>Accede por autenticación y completa el discovery para clasificar tu caso.</p>
        <ProtectedCTAButton
          ctaKey="contacto-cta-diagnostico"
          action="diagnosis"
          label="Iniciar diagnóstico"
          className="primary-btn"
        />
      </section>
    </main>
  );
}
