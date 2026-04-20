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






## Public frontend v1 (implemented)

- `/` Home with hero, dynamic KPI snapshot, featured projects, authority/method blocks, and protected CTA.
- `/firma`, `/metodo`, `/soluciones`, `/soluciones/automatizacion`, `/soluciones/lean-manufacturing` for institutional and service architecture.
- `/resultados` and `/resultados/[slug]` for published case outcomes and detailed impact views.
- `/insights` and `/insights/[slug]` backed by published CMS posts.
- `/contacto` with executive framing and diagnosis CTA.
- Data source uses live CMS/KPI reads (`projects`, `project-impacts`, `site-settings`, `kpi-aggregates`, `posts`) via query layer.

## Protected CTA + discovery lead flow (implemented foundation)

- Public navigation remains open; auth is only initiated via protected CTA start endpoint.
- `POST /api/protected-cta/start` creates signed CTA state and returns auth entry URL.
- `/auth/entry` provides provider entry points (`google`, `facebook`, `email`) with state preservation.
- `/auth/discovery` runs a 2-step survey and submits to `POST /api/leads/discovery/submit`.
- Lead records are upserted (dedupe-ready by email), scored, prioritized, and source tracking is preserved.
- If WhatsApp consent is enabled, API returns dynamic `wa.me` redirect; otherwise user is redirected to `/gracias`.

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


## Staging and production readiness

This repository is prepared for staging at `app.valeoxmx.com` and future production at `valeoxmx.com`.

### Local validation before deployment

```bash
npm install
npm run typecheck
npm run lint
npm run build
```


### Local validation checklist (real environment)

1. `npm install`
2. `cp .env.example .env.local`
3. Verify `.env.local` values (`NEXT_PUBLIC_APP_URL`, `DATABASE_URI`, `PAYLOAD_SECRET`, origin lists)
4. `npm run payload:types`
5. `npm run typecheck`
6. `npm run lint`
7. `npm run build`
8. `npm run dev`

Or run full sequence:

```bash
npm run validate:local
```

### Common failure points to check first

- **Environment variables**
  - missing/invalid URLs in `NEXT_PUBLIC_APP_URL` or `PAYLOAD_PUBLIC_SERVER_URL`
  - short/invalid `PAYLOAD_SECRET`
  - missing `PAYLOAD_CORS_ORIGINS` / `PAYLOAD_CSRF_ORIGINS` in staging
- **Database connection**
  - invalid `DATABASE_URI`
  - missing SSL requirement in hosted Postgres
  - insufficient DB permissions
- **Payload config/runtime**
  - incorrect `serverURL` / origin allowlists blocking admin/API calls
- **Route groups / App Router paths**
  - shell command paths with `(public)` must be quoted in bash when manipulating files
- **Generated Payload types**
  - run `npm run payload:types` whenever schemas change before typecheck/build

### Staging validation checklist (`app.valeoxmx.com`)

- **Public pages**
  - Home, Firma, Método, Soluciones, Resultados, Insights, Contacto load without server errors
  - metadata titles/descriptions appear correctly in page source
- **Admin CMS**
  - admin login works for allowed roles
  - collections load and save correctly
- **KPI aggregates**
  - KPI cards show real aggregate output when published impacts exist
  - aggregate records update after impact/project publish changes
- **Projects / resultados**
  - only published + publishable projects appear publicly
  - project detail routes resolve and show impact cards
- **Protected CTA flow**
  - CTA starts `/api/protected-cta/start`
  - state is preserved into auth/discovery flow
- **Lead qualification flow**
  - discovery submit creates/updates lead by email
  - score + priority fields populate correctly
- **WhatsApp redirect flow**
  - when consented, API returns valid `wa.me` URL
  - without consent, user falls back to thank-you path

### Deployment guidance

Detailed deployment and operational notes are maintained in:

- `docs/deployment.md`

This includes:
- env variable policy per environment
- database and backup assumptions
- CMS/admin operational notes
- media storage assumptions
- security baseline recommendations
- release checklist

## Notes

- This phase intentionally focuses on architecture hardening, not feature implementation.
- If `npm install` returns `403` in a restricted environment, run the same commands locally with normal npm registry access.
