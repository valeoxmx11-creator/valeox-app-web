# Source Architecture

This codebase follows a modular, layered architecture:

1. **app/**: Next.js routes and API endpoints.
2. **domains/**: core business bounded contexts.
3. **modules/**: cross-domain product capabilities.
4. **payload/**: CMS schemas, access controls, hooks, globals.
5. **data/**: repository/query/mapping adapters.
6. **integrations/**: third-party clients (WhatsApp, OAuth, analytics).
7. **shared/**: reusable primitives and runtime configuration.
