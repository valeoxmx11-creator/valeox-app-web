import { getPublishedPosts } from '@/data/queries/public-site';
import { PostCard } from '@/shared/components/public/PostCard';
import { ProtectedCTAButton } from '@/shared/components/public/ProtectedCTAButton';

export default async function InsightsPage() {
  const posts = await getPublishedPosts();

  return (
    <main className="page">
      <section className="section">
        <p className="eyebrow">Insights</p>
        <h1>Conocimiento para dirección operacional</h1>
        <p>Análisis aplicable para rediseñar sistemas de ejecución y transformación empresarial.</p>
      </section>

      <section className="section">
        {posts.length === 0 ? (
          <p className="muted">Aún no hay insights publicados.</p>
        ) : (
          <div className="project-grid">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </section>

      <section className="section cta-band">
        <h2>Convertir conocimiento en ejecución</h2>
        <ProtectedCTAButton ctaKey="insights-cta-diagnostico" action="premium_access" label="Acceder por diagnóstico" className="primary-btn" />
      </section>
    </main>
  );
}
