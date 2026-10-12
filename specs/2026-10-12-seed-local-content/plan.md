# Phase 03 — Seed Local Content: Plan

## 1. Verify the content contracts

1.1 Confirm that the completed Phase 02 model exports exist under `src/models/` and match the approved Phase 02 requirements.

1.2 Stop implementation if those contracts are absent or incomplete; resolve the Phase 02 prerequisite in its proper scope rather than duplicating model definitions in `src/data/`.

1.3 Map every requested dataset field, union value, optional property, and relationship to the existing model exports before authoring records.

## 2. Establish stable content identity

2.1 Allocate fixed, valid, unique UUIDs and URL-safe slugs for the event, six speakers, eight talks, schedule, four accommodations, and five food options.

2.2 Keep IDs deterministic and relationships ID-based, with no runtime generation or nested record copies.

2.3 Define the event using the canonical Phase 01 identity, the `2026-12-12` date, São Paulo location, and `America/Sao_Paulo` timezone.

## 3. Seed speakers and talks

3.1 Create six fictional speaker profiles in `src/data/speakers.ts`, using concise `pt-BR` biographies and varied optional-field coverage.

3.2 Create eight talks in `src/data/talks.ts`, including standard sessions, workshops, varied categories and levels, and at least one multi-speaker session.

3.3 Link every talk to existing speaker IDs, ensure every talk has at least one speaker, and avoid duplicate IDs within a relationship.

3.4 Confirm all identities, employers, profile URLs, and image URLs are fictional and do not imitate real people.

## 4. Seed the event and schedule

4.1 Create the single typed event in `src/data/events.ts` and reference all eight talk IDs exactly once.

4.2 Create one schedule containing twelve chronological entries in `src/data/schedule.ts`.

4.3 Represent every talk exactly once in the schedule, including workshops as talk entries.

4.4 Use the remaining entries for intervals and at least one non-talk session, exercising the discriminated schedule-entry branches without invalid `talkId` values.

4.5 Verify that UTC timestamps and `America/Sao_Paulo` local times refer to the intended future conference day without overlaps or impossible ordering.

## 5. Seed visitor-planning content

5.1 Create four fictional accommodation records in `src/data/accommodations.ts` with useful variation in category, price, distance, URLs, notes, and optional fields.

5.2 Create five fictional food records in `src/data/food.ts` covering on-site and nearby choices, dietary options, price ranges, addresses, and optional fields.

5.3 Keep descriptions concise, professional, accessible, and useful for later comparison UI.

## 6. Publish and verify the local dataset

6.1 Re-export all six datasets from `src/data/index.ts` through a stable public surface.

6.2 Add the smallest dependency-free integrity checks appropriate to the existing project, covering counts, unique IDs and slugs, valid references, schedule coverage, chronology, and model validation.

6.3 Confirm optional fields are deliberately both present and absent and that no missing value is represented by an empty string.

6.4 Run every check in `validation.md` and fix all failures.

6.5 Mark only Phase 03 complete in `specs/roadmap.md` after implementation and validation succeed.

