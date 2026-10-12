# Phase 02 — Define Content Models: Requirements

## Scope

Define the TypeScript contracts used by local content now and by a future CMS adapter later. All model names and properties are written in English, with `PascalCase` for types and `camelCase` for properties.

The implementation belongs under `src/models/` and includes these public models:

| Model | Required fields | Optional or model-specific fields | Relationships |
| --- | --- | --- | --- |
| `Event` | `id`, `slug`, `name`, `description`, `startDate`, `endDate`, `timeZone`, `status`, `talkIds` | `city`, `venueName` | References multiple `Talk` records through `talkIds` |
| `Speaker` | `id`, `slug`, `name`, `description`, `bio` | `jobTitle`, `company`, `avatarUrl`, `socialLinks` | A talk references its speakers; the speaker does not duplicate talk IDs |
| `Talk` | `id`, `slug`, `name`, `description`, `speakerIds`, `category`, `status` | `durationMinutes`, `level` | References one or more `Speaker` records through `speakerIds` |
| `Schedule` | `id`, `slug`, `name`, `description`, `eventId`, `date`, `timeZone`, `entries` | — | References one `Event`; entries reference talks by `talkId` when applicable |
| `Accommodation` | `id`, `slug`, `name`, `description`, `category`, `status`, `address` | `websiteUrl`, `bookingUrl`, `priceRange`, `distanceFromVenue`, `notes` | May stand alone until event content is seeded |
| `Food` | `id`, `slug`, `name`, `description`, `category`, `status` | `address`, `websiteUrl`, `priceRange`, `dietaryOptions`, `notes` | May stand alone until event content is seeded |

Shared primitives and supporting types include:

- Branded or otherwise distinct `UUID`, `Slug`, and UTC ISO 8601 date/time types where they improve safety without adding dependencies
- Union types for closed categories, levels, dietary options, entry kinds, and publication/availability statuses
- A schedule-entry union that distinguishes talks from non-talk entries such as breaks while keeping `talkId` required only for talk entries
- Reusable URL, address, social-link, and price-range shapes only where they reduce duplication

Basic validation must cover UUID shape, non-empty slugs, valid ISO 8601 UTC date/time strings, positive numeric durations, chronological event dates, and relationship cardinality such as at least one speaker per talk. Validation may use small local predicates or assertion/result helpers and must not require a validation library.

This phase includes:

- TypeScript interfaces and union types for the six requested content concepts
- Shared primitives and small supporting types used by those interfaces
- Basic dependency-free validation at the model boundary
- A stable export surface from `src/models/`
- Type-level or compile-time examples sufficient to demonstrate valid relationships

This phase does not include:

- Seed or production content instances; those belong to Phase 03
- React components, pages, routes, styling, or navigation
- CMS vendor schemas, generated CMS types, network clients, or content fetching
- Backend services, databases, authentication, attendee accounts, or authorization
- Installing a schema-validation or date library
- Validating that referenced IDs exist in a repository of content; cross-record integrity belongs with the future content source/boundary

## Decisions

### TypeScript representation

Use interfaces for record-shaped domain models and string union types for finite categories and statuses. Keep the models framework-independent so they can be consumed by React, local content, tests, and a future CMS adapter.

### Identity and relationships

Every top-level model has a UUID `id` and human-readable `slug`. Relationships are represented by UUID values rather than nested records. `Talk.speakerIds` supports multiple speakers, and `Event.talkIds` supports multiple talks.

Keep each relationship owned in one canonical direction where possible: talks own speaker references and events own talk references. This prevents mismatched duplicate relationship arrays while still allowing callers to derive reverse lookups.

### Dates and timezone

Instants use ISO 8601 strings normalized to UTC with a trailing `Z`. Calendar dates may use the `YYYY-MM-DD` subset when no instant is intended. The canonical IANA timezone for this event is `America/Sao_Paulo`, stored explicitly wherever local schedule interpretation is required.

### Optional fields

Core identity, description, relationship, category, and status fields are required. Presentation or operational details that may legitimately be unavailable—such as images, external URLs, employer details, prices, and venue distance—are optional. Optional fields must not be used to hide information required for a valid relationship.

### Validation

Use TypeScript for structural guarantees and small local runtime checks for values TypeScript cannot prove, such as UUID format and chronological dates. Return actionable validation information rather than silently normalizing invalid input. No new dependency is approved for this phase.

### CMS readiness

The application models are the stable domain contract, not vendor-specific CMS schemas. A later content adapter may map generated CMS records into these models. Fields therefore use serializable values, explicit IDs, ISO dates, and portable unions.

## Context

The initial implementation uses local data and must remain deployable before a CMS exists. The project mission prioritizes maintainability, resilience, and separation of content from presentation; placing these contracts in `src/models/` gives later local and CMS implementations a common boundary.

The current stack is strict TypeScript, React, and Vite. Existing compiler settings reject unused declarations and enforce casing, so every model should be exported deliberately and importable through a clear barrel or equivalent public entry point.

The canonical event identity from Phase 01—React Conference 2026, held in São Paulo—will be represented as local content in Phase 03. This phase defines the shape only and must not duplicate those values as seed data.

