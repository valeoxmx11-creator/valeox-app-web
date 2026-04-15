import { DiscoveryForm } from './discovery-form';
import { AUTH_PROVIDERS } from '@/shared/types';

interface DiscoveryPageProps {
  searchParams: Promise<{ state?: string; provider?: string }>;
}

export default async function DiscoveryPage({ searchParams }: DiscoveryPageProps) {
  const { state, provider } = await searchParams;

  if (!state || !provider || !AUTH_PROVIDERS.includes(provider as (typeof AUTH_PROVIDERS)[number])) {
    return (
      <main className="container">
        <section className="hero">
          <h1>Flujo de descubrimiento inválido</h1>
          <p>Vuelve a iniciar el flujo desde una acción protegida.</p>
        </section>
      </main>
    );
  }

  return (
    <main className="container">
      <section className="hero">
        <p className="eyebrow">Discovery Survey</p>
        <h1>Ayúdanos a preparar tu diagnóstico estructural</h1>
        <p>Dos pasos rápidos para clasificar tu caso y activar el siguiente contacto.</p>
        <DiscoveryForm stateToken={state} provider={provider as 'google' | 'facebook' | 'email'} />
      </section>
    </main>
  );
}
