# Roadmap

This roadmap orders delivery in deliberately small phases. Each phase should be completed and verified before the next begins.

## Foundation

- [x] **Phase 01 — Name the event:** Choose the conference name, one-sentence description, date, and city.
- [x] **Phase 02 — Define content models:** Add TypeScript models for event details, speakers, talks, schedule entries, lodging, and food.
- [x] **Phase 03 — Seed local content:** Create typed local sample data covering every content model.
- [x] **Phase 04 — Establish design tokens:** Define the core color, typography, spacing, radius, and focus styles in CSS.
- [x] **Phase 05 — Add the application shell:** Create the shared header, primary navigation, main-content landmark, and footer.
- [ ] **Phase 06 — Add routing:** Select and install a router, define named routes, and support direct navigation.
- [ ] **Phase 07 — Handle unknown routes:** Add a useful not-found page with a route back home.

## Essential event information

- [ ] **Phase 08 — Build the home hero:** Show the event name, description, date, location, and primary call to action.
- [ ] **Phase 09 — Build the event overview:** Explain the conference purpose and intended audience on the home page.
- [ ] **Phase 10 — Build the location page:** Add venue address, access guidance, and transport information.
- [ ] **Phase 11 — Add hotel information:** Present accommodation options with practical comparison details.
- [ ] **Phase 12 — Build the food page:** Document on-site and nearby food options, including dietary information.
- [ ] **Phase 13 — Build the code-of-conduct page:** Publish expected behavior, reporting instructions, and enforcement information.
- [ ] **Phase 14 — Review essential-content navigation:** Confirm every page is reachable, linkable, and clearly labeled.

## Speakers and schedule

- [ ] **Phase 15 — Build a speaker card:** Create an accessible reusable summary for one speaker.
- [ ] **Phase 16 — Add speakers to the home page:** Render the complete speaker list from local content.
- [ ] **Phase 17 — Build a schedule item:** Associate a start time, talk title, speaker, and location.
- [ ] **Phase 18 — Build the schedule page:** Render schedule items in chronological order.
- [ ] **Phase 19 — Add schedule edge states:** Cover breaks, multiple tracks if required, missing details, and an empty schedule.
- [ ] **Phase 20 — Cross-link program content:** Link speakers to their schedule entries and back.

## CMS migration

- [ ] **Phase 21 — Evaluate CMS options:** Compare candidates against the criteria in `tech-stack.md` and record the decision.
- [ ] **Phase 22 — Create the CMS project:** Configure environments, access roles, and safe local credentials.
- [ ] **Phase 23 — Model event content:** Create and validate the core event-details schema.
- [ ] **Phase 24 — Model visitor information:** Add schemas for venue, hotels, food, and code of conduct.
- [ ] **Phase 25 — Model program content:** Add speaker, talk, and schedule schemas with relationships.
- [ ] **Phase 26 — Add the content client:** Implement a typed CMS adapter behind the content boundary.
- [ ] **Phase 27 — Migrate essential content:** Move the home, location, hotel, food, and conduct content into the CMS.
- [ ] **Phase 28 — Migrate program content:** Move speakers, talks, and schedule entries into the CMS.
- [ ] **Phase 29 — Switch pages to CMS data:** Replace local reads while retaining explicit loading, empty, and error states.
- [ ] **Phase 30 — Add preview support:** Let organizers review draft changes safely before publication.
- [ ] **Phase 31 — Verify editorial workflows:** Confirm an organizer can edit and publish each content type without code changes.

## Release readiness

- [ ] **Phase 32 — Run a responsive review:** Verify every route at mobile, tablet, and desktop widths.
- [ ] **Phase 33 — Run an accessibility review:** Verify landmarks, headings, keyboard navigation, focus, contrast, and alternative text.
- [ ] **Phase 34 — Add journey smoke tests:** Cover finding logistics, reading the conduct policy, discovering a speaker, and locating a talk.
- [ ] **Phase 35 — Add metadata:** Supply page titles, descriptions, social sharing metadata, icons, and canonical URLs.
- [ ] **Phase 36 — Optimize delivery:** Review images, fonts, bundle size, and CMS request behavior.
- [ ] **Phase 37 — Configure production deployment:** Add environment variables, route fallbacks, and build settings for the chosen host.
- [ ] **Phase 38 — Complete launch verification:** Run all quality gates and check every production route and external link.
