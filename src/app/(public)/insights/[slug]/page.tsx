import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPostBySlug } from '@/data/queries/public-site';
import { RichTextFallback } from '@/shared/components/public/RichTextFallback';
import { ProtectedCTAButton } from '@/shared/components/public/ProtectedCTAButton';
import { buildMetadata } from '@/shared/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return buildMetadata({
      title: 'Insight no encontrado',
      description: 'El insight solicitado no está disponible.',
      path: `/insights/${slug}`,
    });
  }

  return buildMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/insights/${slug}`,
  });
}

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
