# Roadmap

This roadmap orders delivery in deliberately small phases. Each phase should be completed and verified before the next begins.

## Foundation

- [x] **Phase 01 — Name the event:** Choose the conference name, one-sentence description, date, and city.
- [x] **Phase 02 — Define content models:** Add TypeScript models for event details, speakers, talks, schedule entries, lodging, and food.
- [x] **Phase 03 — Seed local content:** Create typed local sample data covering every content model.
- [x] **Phase 04 — Establish design tokens:** Define the core color, typography, spacing, radius, and focus styles in CSS.
- [x] **Phase 05 — Add the application shell:** Create the shared header, primary navigation, main-content landmark, and footer.
- [x] **Phase 06 — Add routing:** Select and install a router, define named routes, and support direct navigation.
- [x] **Phase 07 — Handle unknown routes:** Add a useful not-found page with a route back home.

## Essential event information

- [x] **Phase 08 — Build the home hero:** Show the event name, description, date, location, and primary call to action.
- [x] **Phase 09 — Persist registrations:** Connect the registration form to secure storage with server-side validation, consent handling, duplicate protection, and clear success and error states; exclude ticket sales and payments.
- [ ] **Phase 10 — Build the event overview:** Explain the conference purpose and intended audience on the home page.
- [ ] **Phase 11 — Build the location page:** Add venue address, access guidance, and transport information.
- [ ] **Phase 12 — Add hotel information:** Present accommodation options with practical comparison details.
- [ ] **Phase 13 — Build the food page:** Document on-site and nearby food options, including dietary information.
- [ ] **Phase 14 — Build the code-of-conduct page:** Publish expected behavior, reporting instructions, and enforcement information.
- [ ] **Phase 15 — Review essential-content navigation:** Confirm every page is reachable, linkable, and clearly labeled.

## Speakers and schedule

- [ ] **Phase 16 — Build a speaker card:** Create an accessible reusable summary for one speaker.
- [ ] **Phase 17 — Add speakers to the home page:** Render the complete speaker list from local content.
- [ ] **Phase 18 — Build a schedule item:** Associate a start time, talk title, speaker, and location.
- [ ] **Phase 19 — Build the schedule page:** Render schedule items in chronological order.
- [ ] **Phase 20 — Add schedule edge states:** Cover breaks, multiple tracks if required, missing details, and an empty schedule.
- [ ] **Phase 21 — Cross-link program content:** Link speakers to their schedule entries and back.

## CMS migration

- [ ] **Phase 22 — Evaluate CMS options:** Compare candidates against the criteria in `tech-stack.md` and record the decision.
- [ ] **Phase 23 — Create the CMS project:** Configure environments, access roles, and safe local credentials.
- [ ] **Phase 24 — Model event content:** Create and validate the core event-details schema.
- [ ] **Phase 25 — Model visitor information:** Add schemas for venue, hotels, food, and code of conduct.
- [ ] **Phase 26 — Model program content:** Add speaker, talk, and schedule schemas with relationships.
- [ ] **Phase 27 — Add the content client:** Implement a typed CMS adapter behind the content boundary.
- [ ] **Phase 28 — Migrate essential content:** Move the home, location, hotel, food, and conduct content into the CMS.
- [ ] **Phase 29 — Migrate program content:** Move speakers, talks, and schedule entries into the CMS.
- [ ] **Phase 30 — Switch pages to CMS data:** Replace local reads while retaining explicit loading, empty, and error states.
- [ ] **Phase 31 — Add preview support:** Let organizers review draft changes safely before publication.
- [ ] **Phase 32 — Verify editorial workflows:** Confirm an organizer can edit and publish each content type without code changes.

## Release readiness

- [ ] **Phase 33 — Run a responsive review:** Verify every route at mobile, tablet, and desktop widths.
- [ ] **Phase 34 — Run an accessibility review:** Verify landmarks, headings, keyboard navigation, focus, contrast, and alternative text.
- [ ] **Phase 35 — Add journey smoke tests:** Cover finding logistics, reading the conduct policy, discovering a speaker, and locating a talk.
- [ ] **Phase 36 — Add metadata:** Supply page titles, descriptions, social sharing metadata, icons, and canonical URLs.
- [ ] **Phase 37 — Optimize delivery:** Review images, fonts, bundle size, and CMS request behavior.
- [ ] **Phase 38 — Configure production deployment:** Add environment variables, route fallbacks, and build settings for the chosen host.
- [ ] **Phase 39 — Complete launch verification:** Run all quality gates and check every production route and external link.
