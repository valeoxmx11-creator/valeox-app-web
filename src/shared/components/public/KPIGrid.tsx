import type { GlobalKPISnapshot } from '@/domains/kpi-aggregates/application/contracts';

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value);
};

const formatNumber = (value: number) => {
  return new Intl.NumberFormat('es-ES').format(value);
};

const formatPercentage = (value: number) => `${value.toFixed(1)}%`;

export function KPIGrid({ kpis }: { kpis: GlobalKPISnapshot }) {
  const items = [
    { label: 'Ahorro total estructural', value: formatCurrency(kpis.total_savings_usd) },
    { label: 'Horas liberadas', value: formatNumber(kpis.total_hours_released) },
    { label: 'Reducción promedio de error', value: formatPercentage(kpis.avg_error_reduction_pct) },
    { label: 'Incremento promedio de eficiencia', value: formatPercentage(kpis.avg_efficiency_increase_pct) },
    { label: 'Crecimiento promedio de ingresos', value: formatPercentage(kpis.avg_revenue_growth_pct) },
    { label: 'Proyectos con impacto publicado', value: formatNumber(kpis.projects_count) },
  ];

  const hasData = Object.values(kpis).some((value) => value > 0);

  if (!hasData) {
    return <p className="muted">Sin agregados disponibles aún. Publica impactos para habilitar métricas reales.</p>;
  }

  return (
    <div className="kpi-grid">
      {items.map((item) => (
        <article key={item.label} className="card">
          <p className="card-label">{item.label}</p>
          <p className="card-value">{item.value}</p>
        </article>
      ))}
    </div>
  );
}
