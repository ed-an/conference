# Phase 04 — Establish Design Tokens: Plan

## 1. Audit the existing visual foundation

1.1 Inventory reusable literal colors, typography, spacing, radii, shadows, layout widths, focus behavior, and transitions in `src/index.css` and `src/App.css`.

1.2 Compare the current styles with the semantic roles defined in `requirements.md` and identify which literals should be replaced during this phase.

1.3 Treat `specs/reference-layout/image.png` as hierarchy and spacing guidance, not as a source of literal purple brand colors or finished component specifications.

## 2. Define the token source

2.1 Create `src/styles/tokens.css` and declare the approved semantic color roles under `:root`.

2.2 Add the Inter/system font stack and Material-inspired display, headline, title, body, and label role tokens.

2.3 Add the 4 px spacing scale, content widths, fluid page gutter, radii, border widths, and elevation tokens.

2.4 Add focus, state-layer, motion-duration, and easing tokens needed for consistent accessible interaction feedback.

2.5 Keep the token file framework-independent, component-agnostic, and free of page selectors.

## 3. Connect tokens to global styles

3.1 Import `tokens.css` once from the global application stylesheet before any token consumer.

3.2 Apply the surface, on-surface, font-family, rendering, and minimum viewport foundation to the document without implementing a page layout.

3.3 Add a shared `:focus-visible` rule using the approved focus color, width, and offset.

3.4 Add reduced-motion handling that disables non-essential animation and transition behavior when requested by the operating system.

## 4. Migrate the current demo safely

4.1 Replace reusable literals in the existing demo styles with the closest semantic tokens so the token surface is exercised.

4.2 Preserve the current starter content and behavior; do not introduce the header, hero, speaker grid, routing, or other future-phase UI.

4.3 Remove obsolete duplicate values only after confirming the rendered demo still has readable hierarchy and visible interaction states.

## 5. Validate the design system foundation

5.1 Run the repository quality gates and every check listed in `validation.md`.

5.2 Audit the required foreground/background pairs for WCAG AA contrast, including normal text, large text, controls, outlines, and focus rings.

5.3 Inspect the page at 320 px and representative wider widths, at 200% text zoom, with keyboard navigation, and with reduced motion enabled.

5.4 Confirm all canonical tokens are defined once, used semantically, and do not introduce a dependency or remote font requirement.

5.5 Mark only Phase 04 complete in `specs/roadmap.md` after implementation and validation succeed.

