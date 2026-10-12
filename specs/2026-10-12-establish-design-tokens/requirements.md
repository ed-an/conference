# Phase 04 — Establish Design Tokens: Requirements

## Scope

Establish the shared visual foundation for React Conference 2026 in `src/styles/tokens.css`. The tokens must support a modern, technological, minimal interface inspired by Material Design 3 while retaining a distinct React identity.

This phase defines:

- A dark-only semantic color scheme centered on the React blue `#61DAFB`
- Material-inspired surface, content, accent, outline, error, and interaction roles
- An Inter-based typography scale using Material's display, headline, title, body, and label roles
- A spacing scale based on 4 px increments
- Shape, border, elevation, layout-width, and focus-indicator tokens
- Small motion-duration and easing tokens required for consistent interactive states
- Global application of foundational background, foreground, font, and focus styles
- Reduced-motion behavior for later interactive components

This phase does not include:

- Header, navigation, footer, hero, speaker cards, buttons, or page-specific components
- Rebuilding the reference layout in React or CSS
- A light theme, theme switcher, or user-selectable color scheme
- Installing Material UI, another component library, CSS framework, or token package
- Material Symbols, icons, illustrations, logos, or production image assets
- Loading fonts from a third-party runtime CDN
- Routing or any CMS/content integration

## Token contract

All reusable values live as CSS custom properties under `:root`. Names describe purpose rather than a particular component or raw color, following a `--color-*`, `--type-*`, `--space-*`, `--radius-*`, `--shadow-*`, `--layout-*`, `--focus-*`, or `--motion-*` convention.

### Color roles

| Token | Canonical value | Intended use |
| --- | --- | --- |
| `--color-surface` | `#0F111A` | Page background |
| `--color-surface-container-low` | `#151824` | Low-emphasis regions |
| `--color-surface-container` | `#1B1F2C` | Cards and grouped content |
| `--color-surface-container-high` | `#242938` | Elevated or selected containers |
| `--color-on-surface` | `#F5F7FF` | Primary text and icons |
| `--color-on-surface-variant` | `#B8C0D4` | Supporting text and icons |
| `--color-primary` | `#61DAFB` | High-emphasis actions, links, and active states |
| `--color-on-primary` | `#062630` | Text and icons on primary fills |
| `--color-primary-container` | `#174B59` | Tonal primary containers |
| `--color-on-primary-container` | `#B9F2FF` | Content on primary containers |
| `--color-secondary` | `#B8C4FF` | Lower-emphasis accent |
| `--color-on-secondary` | `#18204A` | Content on secondary fills |
| `--color-outline` | `#8B94A8` | Visible control boundaries |
| `--color-outline-variant` | `#3D4352` | Subtle dividers and card outlines |
| `--color-error` | `#FFB4AB` | Error text, icons, and emphasis |
| `--color-on-error` | `#690005` | Content on error fills |
| `--color-focus` | `#61DAFB` | Keyboard focus ring |
| `--color-scrim` | `rgba(0, 0, 0, 0.72)` | Future modal and overlay scrims |

Color roles must only be combined with their intended `on-*` partner or a contrast-verified surface. Normal text must meet WCAG AA 4.5:1; large text and meaningful non-text boundaries must meet at least 3:1. Color must not be the sole indicator of state.

### Typography

Use the stack `Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`. Inter is preferred when available; system fallbacks keep the site usable without a font network request. Adding or self-hosting font files requires a separate explicit decision.

Expose Material-style semantic roles rather than element-specific sizes:

| Role | Size / line height | Weight | Typical use |
| --- | --- | ---: | --- |
| Display large | `clamp(3.5rem, 9vw, 6rem)` / `1` | 700 | Short hero title |
| Display medium | `clamp(2.75rem, 7vw, 4.5rem)` / `1.05` | 700 | Major page statement |
| Headline large | `2.5rem` / `1.15` | 700 | Primary section heading |
| Headline medium | `2rem` / `1.2` | 650 | Section heading |
| Title large | `1.375rem` / `1.35` | 600 | Card or content title |
| Title medium | `1rem` / `1.5` | 600 | Compact title |
| Body large | `1.125rem` / `1.6` | 400 | Introductory copy |
| Body medium | `1rem` / `1.5` | 400 | Default body copy |
| Body small | `0.875rem` / `1.5` | 400 | Supporting copy |
| Label large | `0.875rem` / `1.4` | 600 | Buttons and navigation |
| Label medium | `0.75rem` / `1.4` | 600 | Metadata and eyebrow text |

Typography tokens include family, size, line-height, weight, and letter-spacing where needed. Display and headline roles may use slightly negative tracking; labels may use slightly positive tracking. Body copy must remain readable when browser text is enlarged to 200%.

### Spacing and layout

Define a named 4 px-based scale:

- `--space-0: 0`
- `--space-1: 0.25rem` (4 px)
- `--space-2: 0.5rem` (8 px)
- `--space-3: 0.75rem` (12 px)
- `--space-4: 1rem` (16 px)
- `--space-6: 1.5rem` (24 px)
- `--space-8: 2rem` (32 px)
- `--space-10: 2.5rem` (40 px)
- `--space-12: 3rem` (48 px)
- `--space-16: 4rem` (64 px)
- `--space-20: 5rem` (80 px)
- `--space-24: 6rem` (96 px)

Provide `--layout-content-max: 75rem`, a fluid inline gutter such as `clamp(1rem, 4vw, 4rem)`, and a readable copy width near `65ch`. Responsive implementation continues to support 320 px viewports. Material window-size boundaries may be documented for later layout work, but custom properties must not pretend to work inside media-query conditions.

### Shape, borders, and elevation

- Radius scale: 4, 8, 12, 16, 24 px, and a full/pill value
- Border width tokens: 1 px default and 2 px emphasized
- Subtle dark-theme shadows for low, medium, and high elevation
- Elevation must reinforce hierarchy without replacing surface-color roles
- Prefer the medium and large radii for the broad hero and card shapes shown in the reference layout

### Focus and interaction

The shared keyboard focus style uses a 3 px solid `--color-focus` outline with a 3 px offset and applies through `:focus-visible`. It must remain visible against the page surface, containers, and primary fills. Do not globally remove native outlines unless the tokenized replacement is active.

Define state-layer opacity tokens for hover, focus, pressed, and disabled presentation, plus short and medium motion durations. Global reduced-motion handling must remove non-essential transitions and animations when `prefers-reduced-motion: reduce` is active.

## Decisions

### Material Design interpretation

Use Material Design 3 as a vocabulary for semantic roles, accessible color pairings, type hierarchy, state feedback, shape, and elevation. This project does not adopt Google's exact baseline palette or a Material component library. Tokens are implemented in plain CSS to respect the existing stack and keep future components independent of a vendor package.

### Theme and brand

The default and only theme in this phase is dark. `#0F111A` is the canonical page surface and React blue `#61DAFB` is the primary accent. Supporting colors remain cool and restrained so content and primary actions carry the hierarchy.

### Semantic naming

Components consume purpose-based roles such as `--color-surface-container`, `--color-on-surface`, and `--color-primary`; they must not introduce aliases such as `--speaker-card-purple` or repeat canonical hex values. Primitive scales such as spacing remain numbered because their ordering is meaningful and reusable.

### Reference layout

`specs/reference-layout/image.png` guides hierarchy and composition: a simple header, a large promotional region, a prominent CTA, generous whitespace, and a regular speaker grid. The purple blocks are wireframe placeholders, not approved brand colors. Later UI phases should map those regions to semantic surface and primary roles from this phase.

### Existing CSS migration

Replace reusable literal colors, spacing, radii, shadows, font values, and transition values in the current global/demo CSS with tokens where doing so verifies the token contract. Do not redesign the starter screen or implement future roadmap components as part of this phase.

## Context

The project mission prioritizes essential information, accessibility, responsive behavior, speed, and maintainable separation of concerns. Tokens must make those qualities the default for future pages rather than relying on each component to recreate them.

The current stack is React, strict TypeScript, Vite, and plain CSS. `src/styles/tokens.css` becomes the single token source and is imported once by the application CSS entry point. No new runtime or development dependency is approved.

Material 3 organizes color through semantic roles and paired foreground/background values, and its typography uses display, headline, title, body, and label roles. Those concepts inform this contract while the supplied reference image and React palette provide the project's own visual direction.

