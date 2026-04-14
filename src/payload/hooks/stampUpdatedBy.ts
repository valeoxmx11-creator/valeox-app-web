import type { CollectionBeforeChangeHook } from 'payload';

export const stampUpdatedBy: CollectionBeforeChangeHook = async ({ data, req }) => {
  if (req.user?.id) {
    return {
      ...data,
      updatedBy: req.user.id,
    };
  }

  return data;
};
