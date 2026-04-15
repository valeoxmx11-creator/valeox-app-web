# VALEOX — Web Application Foundation

Production-grade base for the VALEOX platform, combining Next.js App Router, Payload CMS, and PostgreSQL in a modular architecture designed for long-term growth.

## Stack and rationale

- **Next.js (App Router) + TypeScript**: unified web app runtime for public routes, authenticated surfaces, and API handlers.
- **Payload CMS**: embedded admin + content engine that supports custom business workflows.
- **PostgreSQL**: transactional storage for operational data, lead lifecycle, and KPI snapshots.
- **ESLint + Prettier**: consistent and maintainable code standards.
- **Zod env parsing**: explicit runtime configuration safety.

## Final architecture

```text
src/
  app/                          # Next.js route layer (UI + API handlers)
    (public)/                   # Public website routes
    (auth)/                     # Future auth routes
    (admin)/                    # Future admin UI routes
    api/                        # Route handlers (BFF)

  domains/                      # Core business domains (bounded contexts)
    projects/
      domain/                   # Entities/value objects
      application/              # Domain use-case contracts/ports
      infrastructure/           # Domain adapters
    project-impacts/
    kpi-aggregates/
    leads/
    auth/
    posts/

  modules/                      # Product capabilities composing domains
    admin-dashboard/
      application/
      ui/
      infrastructure/
    cta-tracking/
      application/
      ui/
      infrastructure/
    client-portal/              # Future module

  payload/                      # CMS-specific configuration
    collections/
    globals/
    hooks/
    access/

  data/                         # Data access/query abstraction
    repositories/
    queries/
    mappers/

  integrations/                 # Third-party service clients
    analytics/
    oauth/
    whatsapp/

  shared/                       # Cross-cutting reusable primitives
    config/
    components/
    utils/
    types/

payload.config.ts               # Single top-level Payload entrypoint
```

## Responsibility boundaries

- **app**: only routing, rendering, request parsing, and response composition.
- **domains**: business rules and domain contracts.
- **modules**: orchestration across multiple domains/use-cases.
- **payload**: CMS schema/auth/access policies and content/admin configuration.
- **data**: concrete persistence and read-model adapters.
- **integrations**: external providers (analytics, OAuth, WhatsApp).
- **shared**: framework-agnostic reusable utilities and common types.

## Naming conventions

- **Folders**: kebab-case (`project-impacts`, `kpi-aggregates`, `cta-tracking`).
- **Types/interfaces/classes**: PascalCase (`ProjectRepository`, `KPIAggregate`).
- **Functions/variables**: camelCase (`getSnapshot`, `stampUpdatedBy`).
- **Collection/Global config files**: PascalCase file names (`Users.ts`, `SiteSettings.ts`).
- **Do not place business logic in `app/` or `shared/`.**

## Local development

### 1) Prerequisites

- Node.js 20+
- npm 10+
- PostgreSQL 15+

### 2) Install dependencies

```bash
npm install
```

### 3) Configure environment

```bash
cp .env.example .env.local
```

### 4) Run app

```bash
npm run dev
```

## Required environment variables

| Variable | Required | Purpose |
|---|---|---|
| `NEXT_PUBLIC_APP_URL` | yes | Canonical application URL |
| `DATABASE_URI` | yes | PostgreSQL connection string |
| `PAYLOAD_SECRET` | yes | Payload secret for auth/session security |
| `NODE_ENV` | recommended | Runtime mode |

## Useful commands

```bash
npm run lint
npm run typecheck
npm run format:check
npm run payload:types
```




## KPI aggregation engine (implemented)

- Aggregates are recalculated from **published impacts** attached to **published + publishable projects**.
- Event-driven recalculation triggers run on `project-impacts` and `projects` changes/deletes.
- Global KPI keys persisted in `kpi-aggregates`:
  - `total_savings_usd`
  - `total_hours_released`
  - `avg_error_reduction_pct`
  - `avg_efficiency_increase_pct`
  - `avg_revenue_growth_pct`
  - `projects_count`
  - `last_recalculated_at`
- The engine is implemented in `src/domains/kpi-aggregates/application` for reuse by homepage/results APIs later.

## Admin CMS governance (implemented)

- **Admin**: full control across all collections, user management, and global settings.
- **Editor**: operational/content management access for leads, projects, impacts, categories, posts, media, and read access to analytics data (CTA/KPI).
- **Draft/publish workflows** are enabled for projects and posts via Payload versions.
- **Project publication guard** enforces at least one published measurable impact before publishing.

## Core data model (implemented)

The initial production data model now includes:
- `users`
- `leads`
- `projects`
- `project-impacts`
- `kpi-aggregates`
- `categories`
- `posts`
- `cta-events`

Modeling notes:
- Leads are prepared for deduplication through unique `contactEmail`.
- Projects and impacts are separated; project publication/completion is guarded by a hook that requires at least one published impact.
- KPI aggregates store source impact references to support recalculation pipelines.
- CTA events can be linked to both leads and projects while keeping page/source attribution.

## Notes

- This phase intentionally focuses on architecture hardening, not feature implementation.
- If `npm install` returns `403` in a restricted environment, run the same commands locally with normal npm registry access.
