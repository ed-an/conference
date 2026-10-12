# Mission

## Purpose

Create the public website for a new React conference. The site should make the event easy to discover, understand, plan for, and attend.

## Audience

- Prospective attendees deciding whether to participate
- Registered attendees planning their visit and conference day
- Speakers sharing their sessions and profiles
- Organizers maintaining accurate event information

## User outcomes

Visitors should be able to:

- Understand what the conference is and why it is worth attending
- Find the event date and location immediately
- Plan travel, accommodation, and meals
- Review the code of conduct before attending
- Discover speakers and their talks
- Build a day plan from a clear schedule

Organizers should be able to update event content without changing application code once the CMS phase is complete.

## Product principles

1. **Essential information first.** Date, place, and purpose must never be buried.
2. **Accessible by default.** Use semantic structure, keyboard-friendly interactions, readable contrast, and useful alternative text.
3. **Responsive throughout.** Every page must work from a 320 px-wide mobile viewport through large desktop screens.
4. **Fast and resilient.** Keep the client lightweight and preserve a useful experience when optional media or CMS requests fail.
5. **Content is the product.** Prefer clear, scannable copy over decorative complexity.
6. **Consistent navigation.** Visitors should always know where they are and how to reach the other event sections.
7. **Maintainable delivery.** Keep content, presentation, and integration concerns separated so the site can evolve safely.

## Initial scope

The first complete release includes:

- A conference name and visual identity
- A home page with event overview and speakers
- Location and travel information
- Food information
- Hotel recommendations
- A code of conduct
- A schedule connecting times, talks, and speakers
- CMS-managed content for the public pages

## Non-goals for the initial release

- Ticket sales or payment processing
- Attendee accounts or authentication
- Personalized schedules
- Speaker or sponsor self-service portals
- Native mobile applications
- Livestreaming or recorded-video hosting

These may be considered later, but they must not delay the stakeholder-requested information experience.

## Success criteria

The initial release is successful when:

- Every item in the initial scope is reachable through the primary navigation
- Visitors can identify the date and location from the home page without scrolling on a typical viewport
- Schedule entries clearly associate a time, talk, and speaker
- Organizers can update public content through the CMS without a code deployment
- The production build and lint checks pass
- Core pages pass keyboard, responsive-layout, and basic accessibility checks
