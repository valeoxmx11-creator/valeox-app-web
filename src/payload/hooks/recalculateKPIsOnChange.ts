import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload';
import { recalculateGlobalKPIs } from '@/domains/kpi-aggregates/application/recalculate-global-kpis';

export const recalculateKPIsOnChange: CollectionAfterChangeHook = async ({ req }) => {
  await recalculateGlobalKPIs(req.payload);
};

export const recalculateKPIsOnDelete: CollectionAfterDeleteHook = async ({ req }) => {
  await recalculateGlobalKPIs(req.payload);
};
