import type { CollectionBeforeChangeHook } from 'payload';

export const ensureProjectPublishable: CollectionBeforeChangeHook = async ({ data, req }) => {
  if (data.status !== 'completed') {
    return data;
  }

  const projectId = data.id ?? req?.payloadData?.id;
  if (!projectId) {
    return data;
  }

  const impacts = await req.payload.find({
    collection: 'project-impacts',
    limit: 1,
    where: {
      project: {
        equals: projectId,
      },
      isPublished: {
        equals: true,
      },
    },
  });

  if (impacts.totalDocs === 0) {
    throw new Error('A project cannot be completed/published without at least one published impact entry.');
  }

  return {
    ...data,
    isPublishable: true,
  };
};
