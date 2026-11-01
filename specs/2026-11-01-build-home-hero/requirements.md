# Phase 08 — Build the Home Hero

## Scope

Build the primary hero for the React Conference home page. It must make the event immediately understandable and invite prospective attendees to begin registration.

### Hero content

| Content | Value |
| --- | --- |
| Event name | React Conference |
| Description | A conference for the React frontend community |
| Date | December 12, 2026 |
| City | São Paulo |
| Venue | Expo Center |
| Primary action | Inscrever |

The event name, purpose, date, city, venue, and primary action must be visible without scrolling on a typical viewport. The layout must remain usable down to a 320 px-wide viewport.

### Registration form

The primary action must take the visitor to a registration form on the home page. The form contains:

| Field | Input behavior |
| --- | --- |
| Nome | Required text input with a visible label |
| E-mail | Required email input with a visible label and browser-compatible validation |
| Telefone | Required telephone input with a visible label |

The form must have a clear submit action and expose validation feedback accessibly. This phase specifies and presents the registration interface only; it does not transmit or persist attendee data.

### Out of scope

- Registration submission, storage, or organizer notifications
- Ticket inventory, pricing, sales, or payment processing
- Attendee accounts or authentication
- Third-party registration services or new dependencies
- Event overview content planned for Phase 09

## Decisions

- Keep the hero and registration form on the home page so the primary action has an immediate, predictable destination.
- Use an in-page link for “Inscrever” so keyboard and pointer users can move directly to the form without introducing another route.
- Use semantic headings, event details, labels, inputs, and buttons before adding ARIA.
- Use native input types and required constraints as the baseline validation behavior.
- Do not simulate a successful registration while no submission destination exists. The interface must communicate that registration processing is not yet connected.
- Reuse the existing local event content and design tokens rather than duplicating facts or adding a styling dependency.

## Context

The hero should communicate that attending will be an exceptional, memorable experience for frontend React developers. The tone should be aspirational and welcoming while keeping the essential event facts concrete and easy to scan.

Visual impact must come from hierarchy, composition, color, typography, and existing design tokens. Decorative treatment must not obscure content, reduce contrast, depend on motion, or make the page fragile when optional media is unavailable.

Implementation must follow the existing React, TypeScript, React Router, and plain-CSS stack. It must preserve the shared application shell and established project conventions.
