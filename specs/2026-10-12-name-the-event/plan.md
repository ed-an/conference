# Phase 01 — Name the Event: Plan

## 1. Confirm the canonical identity

1.1 Verify that all four required fields are present: name, description, date, and city.

1.2 Normalize the date to the permanent `YYYY-MM-DD` representation.

1.3 Normalize the city to a clear city, state, and country label without inventing a venue.

1.4 Proofread the Portuguese description while preserving the stakeholder-approved meaning and positioning.

## 2. Record the product decision

2.1 Keep the canonical values in `requirements.md` as the reference for subsequent phases.

2.2 Document which values are permanent and distinguish canonical storage from future localized presentation.

2.3 Record explicit exclusions so this phase does not absorb content-model, visual-design, home-page, or CMS work.

## 3. Verify alignment

3.1 Check the identity against the audience, scope, and essential-information principles in `specs/mission.md`.

3.2 Check that no dependency or architecture decision conflicts with `specs/tech-stack.md`.

3.3 Confirm that the identity provides the required inputs for Phase 02 content modeling and the later home hero.

## 4. Close the phase

4.1 Run the documentation checks described in `validation.md`.

4.2 Mark Phase 01 complete in `specs/roadmap.md` only after every validation item passes.

4.3 Keep Phase 02 and all later roadmap items unchecked.
