import type { CollectionBeforeChangeHook } from 'payload';

export const ensureProjectPublishable: CollectionBeforeChangeHook = async ({ data, req }) => {
  const isPublishing = data?._status === 'published';

  if (!isPublishing) {
    return {
      ...data,
      isPublishable: false,
    };
  }

  const projectId = data.id ?? req?.payloadData?.id;
  if (!projectId) {
    throw new Error('Project ID is required before publishing. Save draft first.');
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
    throw new Error('A project cannot be published without at least one measurable published impact.');
  }

  return {
    ...data,
    isPublishable: true,
  };
};
