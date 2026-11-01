# Phase 08 — Build the Home Hero Validation

## Automated validation

- Run the project test command, if one is configured, and confirm all tests pass.
- Run `npm run lint` successfully.
- Run `npm run build` successfully.
- Verify through user-visible behavior that the home page renders:
  - “React Conference” as the primary heading
  - the frontend React audience description
  - December 12, 2026
  - São Paulo and Expo Center
  - an “Inscrever” link targeting the registration form
  - labeled, required name, email, and telephone fields
- Verify the form does not report a completed registration when no submission integration exists.

## Manual validation

1. Open the home route directly and through primary navigation.
2. Confirm the event name, purpose, date, location, and primary action are immediately understandable and visible without scrolling on a typical desktop viewport.
3. Activate “Inscrever” with a pointer and keyboard; confirm focus or reading position moves predictably to the registration section.
4. Navigate the complete hero and form using only the keyboard and confirm visible focus styling.
5. Submit empty and malformed values and confirm validation feedback is understandable and associated with the relevant fields.
6. Confirm the page never suggests that attendee data was stored or that registration succeeded.
7. Check the layout at 320 px, representative tablet width, and a large desktop width for overflow, overlap, or hidden content.
8. Check current evergreen Chrome, Edge, Firefox, and Safari where available.
9. Enable reduced-motion preferences and confirm that no essential information depends on animation.

## Tone check

- The first impression feels welcoming, aspirational, and memorable.
- The copy speaks clearly to frontend React developers without excluding newcomers.
- Visual energy does not compete with the event name, date, venue, or registration action.
- Claims remain credible and do not imply unavailable ticketing or registration processing.

## Definition of done

- The hero and registration interface satisfy all requirements above.
- Essential event information is prominent, responsive, accessible, and sourced consistently.
- No payment, persistence, account, or third-party registration capability has been introduced.
- Automated quality gates pass.
- Manual responsive, keyboard, content, and tone checks pass.
