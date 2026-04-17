export function RichTextFallback({ content }: { content: unknown }) {
  if (typeof content === 'string') {
    return <p>{content}</p>;
  }

  if (content && typeof content === 'object') {
    return (
      <pre className="rich-fallback">{JSON.stringify(content, null, 2)}</pre>
    );
  }

  return <p>Contenido no disponible.</p>;
}
