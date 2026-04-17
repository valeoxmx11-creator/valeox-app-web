# Data Access Layer

Centralized adapters for data persistence/querying:
- `repositories/`: concrete repository adapters.
- `queries/`: read-model and reporting queries.
- `mappers/`: transformations between persistence models and domain entities.

This layer is intentionally framework-agnostic so modules can evolve without coupling.
