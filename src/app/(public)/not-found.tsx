import Link from 'next/link';

export default function PublicNotFound() {
  return (
    <main className="page">
      <section className="section cta-band">
        <p className="eyebrow">No disponible</p>
        <h1>El recurso solicitado no está publicado</h1>
        <p className="muted">Puede haber sido retirado o aún no estar disponible para consulta pública.</p>
        <Link href="/resultados">Volver a Resultados</Link>
      </section>
    </main>
  );
}
