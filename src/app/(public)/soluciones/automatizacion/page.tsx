import { ProtectedCTAButton } from '@/shared/components/public/ProtectedCTAButton';

const levels = [
  { name: 'Básico', description: 'Estandarización de captura y trazabilidad operativa.' },
  { name: 'Intermedio', description: 'Automatización de tareas repetitivas y reglas operativas.' },
  { name: 'Avanzado', description: 'Orquestación de procesos entre áreas con control en tiempo real.' },
  { name: 'Experto', description: 'Sistema autónomo con decisiones asistidas y observabilidad completa.' },
];

export default function AutomatizacionPage() {
  return (
    <main className="page">
      <section className="section">
        <p className="eyebrow">Automatización</p>
        <h1>Madurez operacional asistida por tecnología</h1>
        <p>La automatización es arquitectura de ejecución, no solo implementación de herramientas.</p>
      </section>

      <section className="section">
        <div className="kpi-grid">
          {levels.map((level) => (
            <article key={level.name} className="card">
              <h3>{level.name}</h3>
              <p>{level.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section two-cols">
        <article className="card">
          <h3>Herramientas típicas</h3>
          <ul>
            <li>ERP/MES integrados por eventos</li>
            <li>Automatización de workflows críticos</li>
            <li>Tableros de observabilidad operacional</li>
          </ul>
        </article>
        <article className="card">
          <h3>Potencial de transformación</h3>
          <p>Menor variabilidad, menor tiempo de ciclo y mayor capacidad de ejecución directiva.</p>
        </article>
      </section>

      <section className="section cta-band">
        <h2>Evaluar madurez actual</h2>
        <ProtectedCTAButton ctaKey="automatizacion-cta-diagnostico" action="diagnosis" label="Evaluar madurez" className="primary-btn" />
      </section>
    </main>
  );
}
