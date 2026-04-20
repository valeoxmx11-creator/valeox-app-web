# VALEOX Deployment Notes

## Target environments

- **Staging**: `app.valeoxmx.com`
- **Production**: `valeoxmx.com` (future)

Use distinct environment variables, database instances, and secrets for each environment.

## Environment variables

Minimum required:

- `NODE_ENV=production`
- `APP_ENV=staging|production`
- `NEXT_PUBLIC_APP_URL`
- `DATABASE_URI`
- `PAYLOAD_SECRET`
- `PAYLOAD_PUBLIC_SERVER_URL`
- `PAYLOAD_CORS_ORIGINS`
- `PAYLOAD_CSRF_ORIGINS`
- `WHATSAPP_TARGET_NUMBER`

### Recommended origin policy

Staging example:

```env
NEXT_PUBLIC_APP_URL=https://app.valeoxmx.com
PAYLOAD_PUBLIC_SERVER_URL=https://app.valeoxmx.com
PAYLOAD_CORS_ORIGINS=https://app.valeoxmx.com
PAYLOAD_CSRF_ORIGINS=https://app.valeoxmx.com
```

Production example (future):

```env
NEXT_PUBLIC_APP_URL=https://valeoxmx.com
PAYLOAD_PUBLIC_SERVER_URL=https://valeoxmx.com
PAYLOAD_CORS_ORIGINS=https://valeoxmx.com
PAYLOAD_CSRF_ORIGINS=https://valeoxmx.com
```

## Database

- PostgreSQL 15+ recommended.
- Use SSL-enabled connection strings in non-local environments.
- Backups: daily snapshot + point-in-time recovery where possible.
- Do not reuse staging database in production.

## CMS/Admin

- Admin path is handled by Payload within app runtime.
- Create at least one admin account using secure password policy.
- Restrict admin access by role (`admin`/`editor`) and avoid shared credentials.

## Media handling assumptions

Current setup uses local static media directory (`media`) via Payload upload.

For staging/production, plan migration to persistent/object storage (e.g., S3-compatible) before high-volume usage.

## Pre-release validation (local/CI)

```bash
npm install
npm run typecheck
npm run lint
npm run build
```

Also validate:

- public pages render with published CMS data
- protected CTA flow initiates and stores events
- discovery lead upsert and WhatsApp redirect behavior
- KPI aggregate records update after project impact changes

## Security baseline recommendations

- Keep `PAYLOAD_SECRET` unique per environment, at least 32 chars.
- Rotate secrets on schedule and after any leakage incident.
- Enforce TLS for all environments.
- Keep origin allowlists strict (`PAYLOAD_CORS_ORIGINS`, `PAYLOAD_CSRF_ORIGINS`).
- Limit admin roles and review access quarterly.


## Staging execution checklist

- Deploy with `APP_ENV=staging` and strict origin lists for `app.valeoxmx.com`.
- Confirm public routes, CMS admin, and API handlers return 200/expected redirects.
- Validate KPI refresh after updating/publishing impacts.
- Validate protected CTA start, discovery lead upsert, and WhatsApp redirect branch.
- Confirm logs show no env parse errors on boot.
