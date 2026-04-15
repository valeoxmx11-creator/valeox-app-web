import type { CollectionBeforeChangeHook } from 'payload';

export const syncPublishedAt: CollectionBeforeChangeHook = async ({ data, originalDoc }) => {
  const wasPublished = originalDoc?._status === 'published';
  const willBePublished = data?._status === 'published';

  if (!wasPublished && willBePublished) {
    return {
      ...data,
      publishedAt: data.publishedAt ?? new Date().toISOString(),
    };
  }

  if (wasPublished && !willBePublished) {
    return {
      ...data,
      publishedAt: null,
    };
  }

  return data;
};
