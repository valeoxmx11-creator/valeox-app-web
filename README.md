# VALEOX — Web Application Foundation

Production-ready base for the VALEOX digital platform: a scalable Next.js application with Payload CMS and PostgreSQL for content, admin operations, and future business modules.

## Why this stack

- **Next.js (App Router) + TypeScript**: strong SSR/ISR foundations, typed routing, scalable architecture for public pages + authenticated product surfaces.
- **Payload CMS**: embedded admin CMS and content modeling that fits custom business workflows better than a standalone marketing CMS.
- **PostgreSQL**: reliable relational storage for leads, projects, KPI aggregates, auth-related entities, and audit-ready operational data.
- **ESLint + Prettier**: enforce consistency and maintainability from day one.

## Architecture overview

```text
src/
  app/                    # Next.js App Router
    (public)/             # Public-facing routes
  domains/                # Core business domains and use-cases
    projects/
    impacts/
    kpis/
    leads/
    blog/
    auth/
  modules/                # Cross-domain modules and adapters
    admin/
    cta-tracking/
  payload/                # Payload CMS definitions and configuration
    collections/
    globals/
    hooks/
    access/
  shared/                 # Shared UI, config, utilities, and types
    config/
    lib/
    types/
    ui/
    utils/
payload.config.ts         # Payload entrypoint
```

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

Then set real values in `.env.local`.

### 4) Start development server

```bash
npm run dev
```

## Required environment variables

| Variable | Required | Purpose |
|---|---|---|
| `NEXT_PUBLIC_APP_URL` | yes | Canonical app URL for public and internal links |
| `DATABASE_URI` | yes | PostgreSQL connection string for app and Payload data |
| `PAYLOAD_SECRET` | yes | Cryptographic secret used by Payload auth/session tokens |
| `NODE_ENV` | recommended | Runtime mode (`development`, `production`, `test`) |

## Helpful commands

```bash
npm run lint
npm run typecheck
npm run payload:types
```

## Current foundation scope

- Next.js App Router bootstrapped with TypeScript.
- Payload CMS wired for PostgreSQL.
- Initial secure collections (`users`, `media`) and auth-enabled admin base.
- Layered folder structure prepared for upcoming business modules.
- Strict linting and formatting setup.
- Runtime environment validation through `zod`.

## Planned implementation phases

1. **Authentication & access control**
   - Harden role model, session strategy, route guards.
2. **Leads pipeline**
   - Capture endpoints, qualification rules, CRM synchronization contracts.
3. **Projects + impacts domain model**
   - Structured project entities, quantified impact framework.
4. **KPI aggregation engine**
   - Scheduled ingestion, normalized metrics, reporting APIs.
5. **Insights/blog**
   - Editorial workflow, localization-ready content schemas.
6. **Admin dashboard**
   - Operational KPIs, lead quality views, project performance widgets.
7. **Client portal foundations**
   - Tenant boundaries, permissions, and secure document/results delivery.

## Notes

- This repository intentionally avoids demo marketing content.
- UI placeholder is intentionally minimal/professional and now Spanish-aligned.
- Business logic will be implemented in future phases on top of this base.
- If `npm install` returns `403` in a restricted environment, run the same steps locally with standard npm registry access.
