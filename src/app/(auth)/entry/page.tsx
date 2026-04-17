import Link from 'next/link';

interface AuthEntryPageProps {
  searchParams: Promise<{ state?: string }>;
}

export default async function AuthEntryPage({ searchParams }: AuthEntryPageProps) {
  const { state } = await searchParams;

  if (!state) {
    return (
      <main className="container">
        <section className="hero">
          <h1>Estado de autenticación inválido</h1>
          <p>Vuelve al sitio y abre nuevamente la acción protegida.</p>
        </section>
      </main>
    );
  }

  return (
    <main className="container">
      <section className="hero">
        <p className="eyebrow">Acceso protegido</p>
        <h1>Continúa con tu cuenta</h1>
        <p>Solo pedimos autenticación al solicitar acciones de alto valor.</p>
        <div style={{ display: 'grid', gap: '0.75rem', marginTop: '1.25rem' }}>
          <Link href={`/api/auth/provider/google?state=${state}`}>Continuar con Google</Link>
          <Link href={`/api/auth/provider/facebook?state=${state}`}>Continuar con Facebook</Link>
          <Link href={`/api/auth/provider/email?state=${state}`}>Continuar con Email</Link>
        </div>
      </section>
    </main>
  );
}
