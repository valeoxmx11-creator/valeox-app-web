# Auth Routes

Route group reserved for authentication UX (`/login`, `/recuperar-acceso`, MFA, etc.).

Rules:
- UI-only route handlers live here.
- Business logic must be delegated to `src/domains/auth`.
