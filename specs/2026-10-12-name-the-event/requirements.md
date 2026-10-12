# Phase 01 — Name the Event: Requirements

## Scope

Establish the permanent, canonical identity of the conference so that later content models, pages, metadata, and CMS schemas use the same facts.

| Field | Canonical value | Notes |
| --- | --- | --- |
| Name | React Conference 2026 | Preserve this capitalization in public copy |
| Description | Evento com os maiores especialistas em React falando sobre o presente e o futuro do frontend. | Concise, expert-led positioning statement |
| Date | 2026-12-12 | Store and document dates in `YYYY-MM-DD` format |
| City | São Paulo, SP, Brasil | The event is in the capital city of São Paulo |

This phase includes:

- Recording one canonical value for each required event-identity field
- Normalizing the supplied date to the requested year-month-day format
- Refining the supplied positioning into grammatically correct, concise Portuguese copy without changing its meaning
- Making these decisions available as the source for later implementation phases
- Marking Phase 01 complete in the roadmap after validation

This phase does not include:

- Venue or street-address selection
- Event duration, start time, or timezone details
- Brand visuals, logos, colors, or typography
- TypeScript content models or local content files
- Rendering the identity on the home page
- Routing, CMS setup, speakers, talks, or schedule content

Those concerns belong to later roadmap phases.

## Decisions

### Permanent identity

The name, description, date, and city are permanent product decisions rather than placeholders. Later phases must reuse them verbatim unless stakeholders explicitly approve a change.

### Date representation

The canonical date is `2026-12-12`, following the requested `Y-M-D` ordering and using the unambiguous, zero-padded `YYYY-MM-DD` form. Later user-facing views may localize its presentation while preserving this canonical value in data.

### Location precision

The canonical city is `São Paulo, SP, Brasil`. This records the user's clarification that the event is in São Paulo capital while avoiding an unsupported venue or address.

### Language and wording

The initial public copy is Brazilian Portuguese. The description corrects the stakeholder phrase “maiores especialista” to “maiores especialistas” and combines both supplied statements into one sentence. This is a grammatical refinement, not a change in positioning.

## Context

The conference is positioned as an authoritative React event where leading specialists discuss the present and future of frontend development. Copy should feel expert, current, and forward-looking while remaining direct and easy to scan.

The project mission prioritizes essential event information and clear content. The name, date, and city established here will eventually appear prominently on the home page, but that rendering is intentionally deferred to the home-hero phase.

The current stack is React, TypeScript, Vite, and plain CSS. This decision-only phase adds no dependencies and does not preempt the content models planned for Phase 02 or the local content source planned for Phase 03.
