import type { Payload } from 'payload';
import { GLOBAL_KPI_KEYS, type GlobalKPIKey } from './global-kpi-keys';

export const getGlobalKPISnapshot = async (payload: Payload): Promise<Record<GlobalKPIKey, number>> => {
  const records = await payload.find({
    collection: 'kpi-aggregates',
    limit: GLOBAL_KPI_KEYS.length,
    where: {
      scopeType: {
        equals: 'global',
      },
    },
  });

  const byKey = new Map<string, number>();
  records.docs.forEach((record) => {
    byKey.set(record.aggregateKey as string, Number(record.aggregateValue ?? 0));
  });

  return GLOBAL_KPI_KEYS.reduce(
    (acc, key) => {
      acc[key] = byKey.get(key) ?? 0;
      return acc;
    },
    {} as Record<GlobalKPIKey, number>,
  );
};
