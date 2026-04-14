# Domain Layer

Each domain follows the same internal structure:
- `domain/`: entities and value objects
- `application/`: use-case ports/contracts
- `infrastructure/`: adapters for persistence and external systems

Current domains prepared for implementation:
- `auth`
- `leads`
- `projects`
- `project-impacts`
- `kpi-aggregates`
- `categories`
- `posts`
- `cta-events`
