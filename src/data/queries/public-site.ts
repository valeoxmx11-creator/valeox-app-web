import { getGlobalKPISnapshot } from '@/domains/kpi-aggregates/application/get-global-kpi-snapshot';
import { getPayloadClient } from '@/shared/lib/get-payload-client';

export interface PublicProjectCard {
  id: string;
  slug: string;
  name: string;
  clientName: string;
  summary: string;
  solutionType: string;
  strategicImpact?: string;
}

export interface PublicProjectDetail extends PublicProjectCard {
  problem?: string;
  diagnosis?: string;
  intervention?: string;
  implementedSolution?: string;
  impacts: Array<{
    id: string;
    title: string;
    metricKey: string;
    baselineValue: number;
    currentValue: number;
    unit: string;
    measuredAt: string;
    evidenceNote?: string;
  }>;
}

const mapProject = (doc: any): PublicProjectCard => ({
  id: String(doc.id),
  slug: String(doc.slug),
  name: String(doc.name),
  clientName: String(doc.clientName),
  summary: String(doc.summary),
  solutionType: String(doc.solutionType),
  strategicImpact: doc.strategic_impact ? String(doc.strategic_impact) : undefined,
});

export const getPublishedProjects = async (): Promise<PublicProjectCard[]> => {
  const payload = await getPayloadClient();
  const projects = await payload.find({
    collection: 'projects',
    limit: 24,
    where: {
      and: [
        {
          _status: {
            equals: 'published',
          },
        },
        {
          isPublishable: {
            equals: true,
          },
        },
      ],
    },
    sort: '-updatedAt',
  });

  return projects.docs.map(mapProject);
};

export const getHomepageData = async () => {
  const payload = await getPayloadClient();
  const [kpis, settings, projects] = await Promise.all([
    getGlobalKPISnapshot(payload),
    payload.findGlobal({ slug: 'site-settings', depth: 1 }),
    getPublishedProjects(),
  ]);

  const featuredIds = new Set<string>(
    (Array.isArray(settings.featuredProjects) ? settings.featuredProjects : [])
      .map((project: any) => (typeof project === 'string' ? project : String(project?.id)))
      .filter(Boolean),
  );

  const featuredProjects = projects.filter((project) => featuredIds.has(project.id)).slice(0, 3);

  return {
    kpis,
    featuredProjects: featuredProjects.length > 0 ? featuredProjects : projects.slice(0, 3),
    headline: settings.homepageHeadline ?? 'El sistema correcto determina el resultado.',
    subheadline:
      settings.homepageSubheadline ??
      'Diseñamos estructuras operativas que convierten complejidad en resultados medibles.',
  };
};

export const getProjectBySlug = async (slug: string): Promise<PublicProjectDetail | null> => {
  const payload = await getPayloadClient();
  const projects = await payload.find({
    collection: 'projects',
    limit: 1,
    where: {
      and: [
        { slug: { equals: slug } },
        { _status: { equals: 'published' } },
        { isPublishable: { equals: true } },
      ],
    },
  });

  if (projects.totalDocs === 0) {
    return null;
  }

  const project = projects.docs[0] as any;
  const impacts = await payload.find({
    collection: 'project-impacts',
    limit: 12,
    where: {
      and: [
        { project: { equals: project.id } },
        { isPublished: { equals: true } },
      ],
    },
    sort: '-measuredAt',
  });

  return {
    ...mapProject(project),
    problem: project.problem_statement,
    diagnosis: project.diagnosis_summary,
    intervention: project.intervention_summary,
    implementedSolution: project.solution_summary,
    impacts: impacts.docs.map((impact: any) => ({
      id: String(impact.id),
      title: String(impact.title),
      metricKey: String(impact.metricKey),
      baselineValue: Number(impact.baselineValue),
      currentValue: Number(impact.currentValue),
      unit: String(impact.unit),
      measuredAt: String(impact.measuredAt),
      evidenceNote: impact.evidenceNote ? String(impact.evidenceNote) : undefined,
    })),
  };
};
