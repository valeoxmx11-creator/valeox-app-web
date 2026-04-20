# Module Layer

Modules compose multiple domains for product-facing capabilities:
- `admin-dashboard`
- `cta-tracking`
- `client-portal` (future)

Recommended structure per module:
- `application/` orchestration services
- `ui/` module-specific presentation
- `infrastructure/` external adapters and wiring
