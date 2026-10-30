# Technology Stack

## Current foundation

| Area | Choice | Notes |
| --- | --- | --- |
| UI | React | Functional components and hooks |
| Language | TypeScript | Strictly typed application code |
| Build tooling | Vite | Local development and production builds |
| Routing | React Router | Centralized typed routes through `react-router-dom` |
| Styling | CSS | Plain CSS is the current baseline; shared tokens should use custom properties |
| Code quality | ESLint | Run through the existing `npm run lint` script |
| Package manager | npm | `package-lock.json` is the source of dependency resolution |

## Architecture rules

- Organize code by product concept or page rather than by generic file type once the application grows.
- Keep shared layout and navigation separate from page-specific content.
- Define TypeScript models for speakers, talks, schedule entries, venues, hotels, and food options.
- Access CMS data through a small content boundary rather than directly from presentational components.
- Keep a local content implementation until the CMS is introduced so early phases remain deployable and the later migration is controlled.
- Model loading, empty, and error states at the content boundary.
- Use semantic HTML first; add ARIA only when native semantics are insufficient.
- Avoid adding dependencies when the platform or a small local module solves the problem clearly.

## Planned capabilities

### Routing

The site uses React Router for its client-side multi-page experience. Route paths and navigation metadata are defined in one typed local contract. Known routes support direct links and active navigation states; the not-found page and deployment fallback configuration remain in their roadmap phases.

### Content management

The CMS vendor is intentionally undecided. Select it during the CMS evaluation phase using these criteria:

- Friendly editing experience for non-technical organizers
- Structured and validated content models
- Draft and preview workflow
- Reliable React/TypeScript integration
- Suitable free or low-cost tier for a new conference
- Documented export path to avoid content lock-in
- Secure read-only delivery credentials for the public site

CMS secrets must be supplied through environment variables, never committed to the repository. Generated client types should be preferred when the chosen CMS supports them.

### Testing

Add the smallest testing stack needed by the feature under construction:

- Unit tests for content mapping and schedule ordering
- Component tests for navigation and critical page states
- End-to-end smoke tests for primary visitor journeys once all routes exist

Record selected tools here when they are introduced. Tests should validate user-visible behavior rather than implementation details.

## Quality gates

Every phase should leave the repository in a state where:

```sh
npm run lint
npm run build
```

both pass. Any test command added later becomes an additional required gate.

## Browser and device baseline

- Current evergreen versions of Chrome, Edge, Firefox, and Safari
- Responsive layouts down to 320 px wide
- Keyboard-only navigation
- Respect for reduced-motion preferences
