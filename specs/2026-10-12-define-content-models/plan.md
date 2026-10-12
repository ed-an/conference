# Phase 02 — Define Content Models: Plan

## 1. Establish shared model primitives

1.1 Create `src/models/` and define shared types for UUIDs, slugs, ISO UTC date/time strings, calendar dates, URLs, addresses, and other genuinely reused value shapes.

1.2 Define reusable union types for statuses and categories, keeping separate concepts separate when their allowed values differ.

1.3 Export the shared contracts through a stable models entry point without adding dependencies.

## 2. Model event and program content

2.1 Define `Event` with canonical identity fields, date range, timezone, publication status, location details, and talk IDs.

2.2 Define `Speaker` with profile fields and optional professional, image, and social information.

2.3 Define `Talk` with one-or-more speaker IDs, category, status, and optional level and duration.

2.4 Define `Schedule` and its discriminated entry union so talk entries reference a talk ID and non-talk entries can represent breaks or other program blocks.

2.5 Verify that multiple speakers per talk and multiple talks per event are expressible without nested model copies.

## 3. Model visitor information

3.1 Define `Accommodation` with category, availability/publication status, address, and optional comparison details.

3.2 Define `Food` with category, status, dietary options, and optional practical details.

3.3 Reuse shared address, URL, and price types where that makes the contracts clearer, without introducing premature abstractions.

## 4. Add boundary validation

4.1 Add dependency-free validation helpers for UUIDs, slugs, UTC ISO 8601 values, positive durations, and chronological date ranges.

4.2 Validate relationship cardinality, including at least one `speakerId` for a talk and unique IDs within relationship arrays.

4.3 Make failures actionable and keep validation independent of React, local-data storage, and any future CMS vendor.

## 5. Verify the model surface

5.1 Add compile-time fixtures or focused checks that exercise every model, union branch, optional field, and required relationship.

5.2 Confirm model files follow the English, `PascalCase`, and `camelCase` naming conventions.

5.3 Run the checks in `validation.md` and resolve all lint and build errors.

5.4 Mark only Phase 02 complete in `specs/roadmap.md` after the implementation and all validation checks pass.

