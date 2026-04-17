import { getPayload } from 'payload';
import config from '@/payload/config';

let payloadPromise: ReturnType<typeof getPayload> | null = null;

export const getPayloadClient = () => {
  if (!payloadPromise) {
    payloadPromise = getPayload({ config });
  }

  return payloadPromise;
};
