# Phase 03 — Seed Local Content: Requirements

## Scope

Create a complete, typed local dataset for a fictional React conference. The content must be realistic enough to support later page, relationship, empty-field, and schedule behavior work while containing no real personal information.

The local content belongs in `src/data/`, separated by model and re-exported through `src/data/index.ts`.

| File | Exported content | Required quantity | Coverage |
| --- | --- | ---: | --- |
| `events.ts` | `Event` records | 1 | Canonical conference identity, future dates, São Paulo location, `America/Sao_Paulo`, and references to all talks |
| `speakers.ts` | `Speaker` records | 6 | Complete fictional profiles plus deliberate coverage of optional professional, image, and social fields |
| `talks.ts` | `Talk` records | 8 | Standard talks and workshops, varied categories and levels, and at least one multi-speaker talk |
| `schedule.ts` | `Schedule` records and entries | 1 schedule with 12 entries | All eight talks represented once, chronological timing, intervals, and at least one non-talk session |
| `accommodations.ts` | `Accommodation` records | 4 | Varied categories, prices, distances, booking details, and optional-field coverage |
| `food.ts` | `Food` records | 5 | On-site and nearby choices, varied price ranges, and dietary options |
| `index.ts` | Public data exports | — | One stable import surface for future local content consumers |

The requested “12 Schedule” items are interpreted as twelve entries within the single schedule for the one event. This preserves the Phase 02 `Schedule` contract while providing a useful full-day program.

Every record must:

- Satisfy the corresponding type exported from `src/models/`
- Use a fixed, valid, unique UUID rather than generating one at runtime
- Use a unique, URL-safe slug
- Use Brazilian Portuguese for user-facing content
- Keep type names, property names, filenames, and exported identifiers in English
- Use short, objective descriptions with a professional, modern, accessible tone
- Use serializable data without React, browser, storage, or CMS-specific values

Relationship coverage must include:

- The event referencing all eight talks by ID
- Every talk referencing one or more existing speakers by ID
- At least one talk referencing multiple speakers
- Every talk appearing exactly once in a talk-type schedule entry
- Every schedule entry referencing the single event through its containing schedule
- Break and non-talk entries using the correct discriminated union branch without a `talkId`
- No orphaned or duplicate relationship IDs

Optional-field coverage must include both present and absent values across the dataset so later UI work can verify fallback behavior. Omit optional properties when data is unavailable; do not use empty strings, placeholder text, or invented null semantics unless the model explicitly requires them.

This phase includes:

- Typed local content for every Phase 02 top-level model
- Fixed identifiers and internally consistent relationships
- Representative talks, workshops, breaks, and non-talk schedule sessions
- Representative accommodation, food, dietary, URL, social-link, image, distance, and price data
- A central data export surface
- Lightweight integrity verification using existing model validation where available

This phase does not include:

- React components, rendering, pages, routes, styling, or navigation
- A repository abstraction, asynchronous content client, loading state, or error state
- CMS schemas, CMS credentials, network requests, or vendor-specific mapping
- Backend services, databases, authentication, registration, or payments
- Runtime UUID generation or data mutation
- New dependencies without explicit approval
- Reimplementation of the Phase 02 model contracts

## Decisions

### File organization and exports

Use one data module per top-level model concept under `src/data/`, with plural filenames except for the requested `schedule.ts`. Each module exports a typed, read-only collection. `src/data/index.ts` re-exports the collections so consumers do not need knowledge of internal file paths.

### Static typed content

Author records as TypeScript constants checked against the Phase 02 model types. Prefer `satisfies` and read-only arrays where compatible with the model contracts, preserving useful literal inference while ensuring every value matches its model.

### Identity and relationships

Use deterministic UUIDs committed with the data. Define each ID once or use clear fixed literals consistently so relationships remain auditable. Relationships contain IDs only; they must not embed copies of speakers, talks, or events.

### Dates and timezone

Use the canonical conference date established in Phase 01, `2026-12-12`, which is future-dated relative to this specification. Store instants as ISO 8601 UTC strings ending in `Z` and store the schedule timezone as `America/Sao_Paulo`. Local São Paulo program times and their UTC representations must describe the same instants.

### Fictional content and URLs

All people, employers, biographies, social profiles, hotels, restaurants, and operational details must be fictional. Use reserved or clearly non-production URL hosts such as `example.com` and do not borrow a real person's identity, biography, portrait, handle, or contact details.

### Schedule composition

Create one schedule with twelve chronological entries. Eight entries connect to the eight talks; the remaining four provide representative intervals and non-talk sessions. Workshops are modeled as talks with the appropriate category and still use talk-type schedule entries.

### CMS readiness

Keep the data as plain serializable records matching the stable application models. Do not shape files around a future CMS vendor. The later content boundary can expose these local collections now and map CMS records to the same domain contracts later.

### Prerequisite

The implementation requires the Phase 02 exports under `src/models/`. They are described by the completed Phase 02 specification but are not present in the current `main` branch at specification time. Phase 03 implementation must stop and restore that prerequisite through the appropriate Phase 02 work rather than defining substitute model interfaces inside `src/data/`.

## Context

The project mission treats content as the product and prioritizes discoverability, trip planning, speaker discovery, and a clear schedule. The seed data should therefore read like publishable conference content, not terse test fixtures, while remaining concise enough for cards and overview pages.

The current stack is strict TypeScript, React, and Vite. This phase adds static TypeScript modules only and must preserve the existing lightweight, dependency-free foundation. Data stays separate from React components so subsequent UI phases and the future CMS migration can consume the same domain shape.

The canonical event is React Conference 2026 in São Paulo, Brazil. User-facing copy is `pt-BR`; code vocabulary remains English with `PascalCase` types and `camelCase` properties.

