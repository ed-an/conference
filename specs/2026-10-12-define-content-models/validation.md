# Phase 02 — Define Content Models: Validation

## Automated checks

Run the existing repository quality gates:

```sh
npm run lint
npm run build
```

Run Git's whitespace validation:

```sh
git diff --check
```

If this phase introduces a test command, it also becomes a required gate and must pass. No dependency should be added solely to test type declarations.

## Model assertions

Confirm that:

- `Event`, `Speaker`, `Talk`, `Schedule`, `Accommodation`, and `Food` are exported from `src/models/`
- Every top-level model contains `id`, `slug`, `name`, and `description`
- IDs use the shared UUID representation and slugs use the shared slug representation
- Talk records accept one or more speaker IDs
- Event records accept multiple talk IDs
- Relationships contain IDs rather than nested copies of other top-level models
- Schedule entries distinguish talk entries from breaks or other non-talk entries
- UTC instants use ISO 8601 strings ending in `Z`
- Schedule-local interpretation records the `America/Sao_Paulo` IANA timezone
- Categories and statuses use explicit union types rather than unrestricted strings
- Optional fields represent legitimately unavailable details and do not weaken required relationships
- The public model surface contains no React, browser, storage, or CMS-vendor types

## Validation behavior

Exercise the basic validators with representative valid and invalid values:

- Accept a correctly formatted UUID and reject malformed identifiers
- Accept a non-empty URL-safe slug and reject empty or invalid slugs
- Accept an ISO 8601 UTC instant and reject a local or malformed date/time string where an instant is required
- Reject zero or negative talk durations
- Reject an event whose end precedes its start
- Reject a talk with no speaker IDs or duplicate speaker IDs
- Reject duplicate talk IDs on an event

Validation failures must identify the invalid field or condition and must not silently mutate the supplied content.

## Manual review

1. Build a temporary type-level example of an event with multiple talks and a talk with multiple speakers; confirm it type-checks.
2. Build examples for both talk and non-talk schedule entries; confirm narrowing exposes `talkId` only on the talk branch.
3. Review each optional field and verify that content can remain useful when it is absent.
4. Confirm local content can be authored against these interfaces without a backend, database, authentication layer, or CMS package.
5. Confirm a future adapter could map CMS records into the models without leaking vendor-specific fields into components.

## Naming and maintainability check

Verify that:

- Types and interfaces use English `PascalCase` names
- Properties use English `camelCase` names
- Files and exports are discoverable and consistently named
- Shared types remove real duplication without creating generic abstractions unrelated to conference content
- Model and validation code remains small, readable, and independent of UI concerns

## Definition of done

This phase is ready to merge when:

- All six requested models, supporting unions, and shared primitives are implemented under `src/models/`
- Required relationships and date/time rules are represented and verified
- Basic dependency-free validation covers the specified invalid cases
- No seed data, UI, backend, database, authentication, or CMS integration has entered the scope
- No new dependency has been added without explicit approval
- `npm run lint`, `npm run build`, `git diff --check`, and any introduced tests pass
- Phase 02 alone is marked complete in the roadmap after implementation validation succeeds
