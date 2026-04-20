import type { Payload } from 'payload';
import { GLOBAL_KPI_KEYS, type GlobalKPIKey } from './global-kpi-keys';

type ImpactDoc = {
  id: string;
  metricKey: string;
  currentValue: number;
  isPublished: boolean;
  project?:
    | {
        id: string;
        _status?: 'draft' | 'published';
        isPublishable?: boolean;
      }
    | string
    | null;
};

const METRIC_KEY_ALIASES: Record<Exclude<GlobalKPIKey, 'projects_count' | 'last_recalculated_at'>, string[]> = {
  total_savings_usd: ['total_savings_usd', 'savings_usd', 'cost_savings_usd'],
  total_hours_released: ['total_hours_released', 'hours_released'],
  avg_error_reduction_pct: ['avg_error_reduction_pct', 'error_reduction_pct'],
  avg_efficiency_increase_pct: ['avg_efficiency_increase_pct', 'efficiency_increase_pct'],
  avg_revenue_growth_pct: ['avg_revenue_growth_pct', 'revenue_growth_pct'],
};

const round = (value: number, decimals = 2): number => {
  return Number(value.toFixed(decimals));
};

const avg = (values: number[]): number => {
  if (values.length === 0) {
    return 0;
  }

  return round(values.reduce((acc, current) => acc + current, 0) / values.length);
};

const sum = (values: number[]): number => {
  if (values.length === 0) {
    return 0;
  }

  return round(values.reduce((acc, current) => acc + current, 0));
};

const toProjectId = (impact: ImpactDoc): string | null => {
  if (!impact.project) {
    return null;
  }

  if (typeof impact.project === 'string') {
    return impact.project;
  }

  return impact.project.id;
};

const isImpactEligible = (impact: ImpactDoc): boolean => {
  if (!impact.isPublished || !impact.project || typeof impact.project === 'string') {
    return false;
  }

  return impact.project._status === 'published' && impact.project.isPublishable === true;
};

const hasMetricKey = (impact: ImpactDoc, key: Exclude<GlobalKPIKey, 'projects_count' | 'last_recalculated_at'>) => {
  return METRIC_KEY_ALIASES[key].includes(impact.metricKey);
};

const mapAggregates = (eligibleImpacts: ImpactDoc[], nowISO: string): Record<GlobalKPIKey, number> => {
  const projectIds = new Set(
    eligibleImpacts
      .map((impact) => toProjectId(impact))
      .filter((projectId): projectId is string => Boolean(projectId)),
  );

  return {
    total_savings_usd: sum(eligibleImpacts.filter((item) => hasMetricKey(item, 'total_savings_usd')).map((item) => item.currentValue)),
    total_hours_released: sum(
      eligibleImpacts.filter((item) => hasMetricKey(item, 'total_hours_released')).map((item) => item.currentValue),
    ),
    avg_error_reduction_pct: avg(
      eligibleImpacts.filter((item) => hasMetricKey(item, 'avg_error_reduction_pct')).map((item) => item.currentValue),
    ),
    avg_efficiency_increase_pct: avg(
      eligibleImpacts.filter((item) => hasMetricKey(item, 'avg_efficiency_increase_pct')).map((item) => item.currentValue),
    ),
    avg_revenue_growth_pct: avg(
      eligibleImpacts.filter((item) => hasMetricKey(item, 'avg_revenue_growth_pct')).map((item) => item.currentValue),
    ),
    projects_count: projectIds.size,
    last_recalculated_at: new Date(nowISO).getTime(),
  };
};

const fetchPublishedImpacts = async (payload: Payload): Promise<ImpactDoc[]> => {
  const impacts: ImpactDoc[] = [];
  let page = 1;
  let hasNextPage = true;

  while (hasNextPage) {
    const result = await payload.find({
      collection: 'project-impacts',
      depth: 1,
      limit: 100,
      page,
      where: {
        isPublished: {
          equals: true,
        },
      },
    });

    impacts.push(...(result.docs as ImpactDoc[]));
    hasNextPage = result.hasNextPage;
    page += 1;
  }

  return impacts;
};

const upsertGlobalAggregate = async (payload: Payload, key: GlobalKPIKey, value: number, impactIDs: string[], nowISO: string) => {
  const existing = await payload.find({
    collection: 'kpi-aggregates',
    limit: 1,
    where: {
      scopeType: {
        equals: 'global',
      },
      aggregateKey: {
        equals: key,
      },
    },
  });

  const docData = {
    scopeType: 'global',
    aggregateKey: key,
    aggregateValue: value,
    sourceImpacts: impactIDs,
    calculatedAt: nowISO,
    metadata: {
      lastRecalculatedISO: nowISO,
    },
  };

  if (existing.totalDocs > 0) {
    await payload.update({
      collection: 'kpi-aggregates',
      id: existing.docs[0].id,
      data: docData,
    });
    return;
  }

  await payload.create({
    collection: 'kpi-aggregates',
    data: docData,
  });
};

export const recalculateGlobalKPIs = async (payload: Payload): Promise<Record<GlobalKPIKey, number>> => {
  const nowISO = new Date().toISOString();
  const publishedImpacts = await fetchPublishedImpacts(payload);
  const eligibleImpacts = publishedImpacts.filter(isImpactEligible);
  const aggregateValues = mapAggregates(eligibleImpacts, nowISO);
  const eligibleImpactIDs = eligibleImpacts.map((impact) => impact.id);

  for (const key of GLOBAL_KPI_KEYS) {
    await upsertGlobalAggregate(payload, key, aggregateValues[key], eligibleImpactIDs, nowISO);
  }

  return aggregateValues;
};
