import { ProtectedCTAButton } from '@/shared/components/public/ProtectedCTAButton';

const steps = [
  { letter: 'V', title: 'Visión sistémica', description: 'Definimos objetivo operativo y restricciones reales de ejecución.' },
  { letter: 'A', title: 'Arquitectura', description: 'Diseñamos estructura de procesos, decisiones, roles y control.' },
  { letter: 'L', title: 'Lógica de flujo', description: 'Eliminamos fricción, desperdicio y variabilidad en flujos críticos.' },
  { letter: 'E', title: 'Ejecución', description: 'Implementamos rediseño con disciplina operativa y gobernanza.' },
  { letter: 'O', title: 'Observabilidad', description: 'Conectamos métricas, señales y retroalimentación de desempeño.' },
  { letter: 'X', title: 'Escalabilidad', description: 'Consolidamos capacidades para crecimiento sin colapso operativo.' },
];

export default function MetodoPage() {
  return (
    <main className="page">
      <section className="section">
        <p className="eyebrow">Método VALEOX</p>
        <h1>Secuencia estructural para transformación operacional</h1>
        <p>Un sistema no se mejora. Se rediseña.</p>
      </section>

      <section className="section">
        <div className="kpi-grid">
          {steps.map((step) => (
            <article key={step.letter} className="card">
              <p className="card-label">{step.letter}</p>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section cta-band">
        <h2>Aplicar el método en tu operación</h2>
        <ProtectedCTAButton ctaKey="metodo-cta-diagnostico" action="diagnosis" label="Iniciar diagnóstico" className="primary-btn" />
      </section>
    </main>
  );
}
