export function EmptyState({ title, description }: { title: string; description: string }) {
  return (
    <article className="card empty-card">
      <h3>{title}</h3>
      <p className="muted">{description}</p>
    </article>
  );
}
