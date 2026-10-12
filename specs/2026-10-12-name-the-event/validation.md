# Phase 01 — Name the Event: Validation

## Automated checks

Run the repository quality gates to ensure the documentation-only change has not disturbed the application:

```sh
npm run lint
npm run build
```

Run Git's whitespace validation:

```sh
git diff --check
```

All commands must exit successfully.

## Content assertions

Confirm that `requirements.md` contains exactly one canonical value for each required field:

- Name: `React Conference 2026`
- Description: `Evento com os maiores especialistas em React falando sobre o presente e o futuro do frontend.`
- Date: `2026-12-12`
- City: `São Paulo, SP, Brasil`

Confirm that:

- The four values are identified as permanent rather than provisional
- The date uses the requested year-month-day order
- The location identifies São Paulo capital without claiming a venue or street address
- No new runtime or development dependency was introduced
- No TypeScript model, page UI, route, visual identity, or CMS integration was added in this phase

## Tone check

Read the name and description together and verify that they:

- Position the conference as an expert-led React event
- Mention both the present and future of frontend development
- Use clear, grammatical Brazilian Portuguese
- Avoid unsupported superlatives beyond the stakeholder-approved “maiores especialistas” positioning
- Remain concise enough for later use in a home-page hero or metadata

## Manual review

1. Compare all canonical values with the stakeholder answers.
2. Check the scope against `specs/mission.md`, especially essential information and clear, scannable copy.
3. Check the exclusions and future handoffs against the phase order in `specs/roadmap.md`.
4. Verify that Phase 02 can consume these decisions without needing another naming decision.

## Definition of done

This feature specification is ready to merge when:

- `plan.md`, `requirements.md`, and `validation.md` exist in this directory
- Every required event-identity value is explicit and internally consistent
- Stakeholder decisions are represented without invented venue, schedule, branding, or technical details
- All automated checks pass
- Phase 01 alone is marked complete in the roadmap after the planned work is validated
