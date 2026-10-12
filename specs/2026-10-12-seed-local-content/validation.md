# Phase 03 — Seed Local Content: Validation

## Prerequisite check

Before validating seed data, confirm that `src/models/` exports the Phase 02 contracts for `Event`, `Speaker`, `Talk`, `Schedule`, `Accommodation`, and `Food`. The Phase 03 implementation is not complete if it defines replacement interfaces inside `src/data/` or relies on missing model contracts.

## Automated checks

Run the existing project quality gates:

```sh
npm run lint
npm run build
git diff --check
```

If an existing or newly approved test command is available, run it as an additional required gate. Do not install a test or validation dependency solely for this static dataset without explicit approval.

Automated or dependency-free integrity checks must assert:

- Exactly 1 event, 6 speakers, 8 talks, 1 schedule with 12 entries, 4 accommodations, and 5 food options exist
- Every top-level ID is a valid UUID and is unique across the complete dataset
- Every slug is non-empty, URL-safe, and unique within its content type
- Every event `talkId` resolves to exactly one talk, with no duplicate references
- Every talk has at least one unique `speakerId`, and each ID resolves to exactly one speaker
- At least one talk has multiple speakers
- Every talk appears exactly once in a talk-type schedule entry
- Break and non-talk schedule entries do not contain a `talkId`
- Schedule entries are chronological, do not have invalid durations, and do not overlap unless the model explicitly supports parallel tracks
- All instants are valid ISO 8601 UTC values ending in `Z`
- The event and schedule use `America/Sao_Paulo`
- Every URL is syntactically valid and points to a fictional or reserved host
- No required string is empty and absent optional values are omitted rather than filled with empty strings
- Every collection is assignable to its corresponding Phase 02 model type

## Content review

Review the dataset manually and confirm that:

1. The event reuses the canonical React Conference 2026 identity and `2026-12-12` date from Phase 01.
2. All user-facing content is natural Brazilian Portuguese with correct accents and concise wording.
3. Speaker names, biographies, employers, handles, and images are fictional and do not represent real people.
4. Talks cover enough subjects, formats, categories, and levels to exercise later speaker and schedule pages.
5. The program reads as a plausible conference day and includes talks, workshops, intervals, and a non-talk session.
6. Accommodation and food records provide useful comparison details for later visitor-planning pages.
7. Optional fields are present on some records and absent on others without making any record misleading or unusable.

## Relationship walkthrough

Select representative records and trace them in both directions:

- Event → all eight talk IDs → their talk records
- Multi-speaker talk → each speaker ID → its speaker record
- Each talk schedule entry → talk ID → talk → speaker IDs
- Non-talk and break entries → correct union branch with no talk reference

The walkthrough must find no orphaned IDs, duplicate relationship IDs, mismatched event dates, or dangling exports.

## Architecture and tone check

Confirm that:

- All content modules live under `src/data/` and are exported through `src/data/index.ts`
- Data modules import domain contracts from `src/models/` rather than redefining them
- No data module imports React, browser APIs, storage APIs, or CMS packages
- Code identifiers are English and follow established casing conventions
- User-facing copy is professional, modern, accessible, short, and objective
- Data contains no secrets, real contact details, tracking URLs, or production endpoints
- No new dependency was introduced without approval

## Definition of done

Phase 03 is ready to merge when:

- All requested typed collections and exact record counts exist under `src/data/`
- Fixed UUIDs, slugs, dates, timezone values, and relationships pass every integrity assertion
- The dataset covers multiple speakers, workshops, intervals, non-talk sessions, and optional fields
- Content is fictional, internally consistent, written in `pt-BR`, and separated from React components
- The public data entry point exports every collection cleanly
- `npm run lint`, `npm run build`, `git diff --check`, and any introduced tests pass
- Phase 03 alone is marked complete in the roadmap after implementation validation succeeds
