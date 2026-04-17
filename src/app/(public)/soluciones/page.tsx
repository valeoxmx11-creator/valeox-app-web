import Link from 'next/link';
import { buildMetadata } from '@/shared/lib/seo';

export const metadata = buildMetadata({
  title: 'Soluciones',
  description: 'Pilares de transformación: automatización y lean manufacturing con enfoque sistémico.',
  path: '/soluciones',
});
import { ProtectedCTAButton } from '@/shared/components/public/ProtectedCTAButton';

export default function SolucionesPage() {
  return (
    <main className="page">
      <section className="section">
        <p className="eyebrow">Soluciones</p>
        <h1>Pilares de transformación VALEOX</h1>
        <p>Diseñamos sistemas para rendimiento, estabilidad y escalabilidad operativa.</p>
      </section>

      <section className="section two-cols">
        <article className="card">
          <h3>Automatización</h3>
          <p>Ruta por niveles de madurez para digitalizar decisiones y ejecución sin perder control.</p>
          <Link href="/soluciones/automatizacion">Explorar Automatización</Link>
        </article>
        <article className="card">
          <h3>Lean Manufacturing</h3>
          <p>Rediseño de flujo, calidad y productividad para plantas con exigencia de resultados.</p>
          <Link href="/soluciones/lean-manufacturing">Explorar Lean Manufacturing</Link>
        </article>
      </section>

      <section className="section cta-band">
        <h2>Definir prioridad de intervención</h2>
        <ProtectedCTAButton ctaKey="soluciones-cta-diagnostico" action="diagnosis" label="Solicitar priorización" className="primary-btn" />
      </section>
    </main>
  );
}
