import { notFound } from 'next/navigation';
import { getPostBySlug } from '@/data/queries/public-site';
import { RichTextFallback } from '@/shared/components/public/RichTextFallback';
import { ProtectedCTAButton } from '@/shared/components/public/ProtectedCTAButton';

export default async function InsightDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="page">
      <section className="section reading">
        <p className="eyebrow">Insight</p>
        <h1>{post.title}</h1>
        <p className="muted">{post.categories.join(' · ')}</p>
        <p>{post.excerpt}</p>
        <RichTextFallback content={post.content} />
      </section>

      <section className="section cta-band">
        <h2>Aplicar este enfoque a tu operación</h2>
        <ProtectedCTAButton
          ctaKey={`insight-${post.slug}-cta`}
          action="premium_access"
          label="Activar evaluación estratégica"
          className="primary-btn"
        />
      </section>
    </main>
  );
}
