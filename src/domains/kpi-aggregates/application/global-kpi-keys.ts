export const GLOBAL_KPI_KEYS = [
  'total_savings_usd',
  'total_hours_released',
  'avg_error_reduction_pct',
  'avg_efficiency_increase_pct',
  'avg_revenue_growth_pct',
  'projects_count',
  'last_recalculated_at',
] as const;

export type GlobalKPIKey = (typeof GLOBAL_KPI_KEYS)[number];
