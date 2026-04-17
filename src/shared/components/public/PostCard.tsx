import Link from 'next/link';
import type { PublicPostCard } from '@/data/queries/public-site';

const dateFormatter = new Intl.DateTimeFormat('es-ES', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
});

export function PostCard({ post }: { post: PublicPostCard }) {
  return (
    <article className="card post-card">
      <p className="card-label">{post.publishedAt ? dateFormatter.format(new Date(post.publishedAt)) : 'Insight'}</p>
      <h3>{post.title}</h3>
      <p>{post.excerpt}</p>
      <div className="project-meta">
        <span>{post.categories.slice(0, 2).join(' · ') || 'Conocimiento operativo'}</span>
        <Link href={`/insights/${post.slug}`}>Leer insight</Link>
      </div>
    </article>
  );
}
