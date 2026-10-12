# Phase 04 — Establish Design Tokens: Validation

## Automated checks

Run all existing repository gates:

```sh
npm test
npm run lint
npm run build
git diff --check
```

All commands must exit successfully. No new dependency may appear in `package.json` or `package-lock.json` for this phase.

Add a small dependency-free token contract check if existing tooling can support it cleanly. It should verify that `src/styles/tokens.css` exists and contains every required token name exactly once; it must not assert formatting details that do not affect the public token contract.

## Token contract assertions

Confirm that:

- `src/styles/tokens.css` is the single source for shared design tokens
- The global stylesheet imports the token file before consuming any variable
- The canonical `#0F111A` surface and `#61DAFB` primary values are present once in the token definitions
- Color variables use semantic Material-inspired roles rather than component names
- Surface, primary, secondary, outline, error, and focus roles have documented foreground pairings
- Typography exposes display, headline, title, body, and label roles with size, line-height, and weight values
- The font stack begins with Inter and includes resilient system fallbacks
- Spacing values follow the documented 4 px scale
- Layout, radius, border, shadow, focus, state, and motion tokens are present
- No component-specific selector appears in `tokens.css`
- Existing CSS does not duplicate a canonical token value where the corresponding semantic variable applies

## Contrast and accessibility checks

Calculate or inspect the required color pairs and confirm:

- Normal text has at least 4.5:1 contrast against its intended surface
- Large text has at least 3:1 contrast
- Meaningful outlines, control boundaries, and focus indicators reach at least 3:1 against adjacent colors
- `--color-on-primary` remains legible on `--color-primary`
- Supporting text remains readable on every supported surface-container level
- Focus is visible on the page surface, container surfaces, and primary action fills
- State is never communicated by color alone

Record any adjusted color value in the implementation diff and keep the semantic role unchanged.

## Manual review

1. Open the application in a current Chromium, Firefox, or Safari-class browser and confirm the dark theme loads without a flash of an unintended light application surface.
2. Review the starter screen at 320 px, a medium viewport, and a large desktop width; verify there is no horizontal overflow.
3. Increase browser text size or zoom to 200% and confirm text remains readable without clipping or overlap.
4. Navigate every current interactive element by keyboard and verify a clear focus ring appears only when appropriate.
5. Enable reduced motion and confirm non-essential transitions no longer animate.
6. Disable network access and confirm the font stack and page remain usable without a remote font request.
7. Compare hierarchy and spacing with `specs/reference-layout/image.png`; confirm the tokens can support its header, broad hero, prominent CTA, whitespace, and speaker grid in later phases.

## Visual-direction check

Confirm that the token palette feels:

- Modern, technological, and minimal rather than decorative or playful
- Clearly associated with the React ecosystem through restrained use of `#61DAFB`
- Dark by default, with layered surfaces rather than heavy gradients
- Content-led, with primary actions receiving the strongest accent
- Material-inspired in roles and behavior without looking like an uncustomized Google product

The purple placeholder blocks in the reference wireframe must not become a second unapproved brand palette.

## Definition of done

Phase 04 is ready to merge when:

- `src/styles/tokens.css` contains the approved semantic token contract
- Global styles import and use the token foundation
- The current demo exercises the tokens without adding future-phase components
- Required contrast, focus, zoom, viewport, offline-font, and reduced-motion checks pass
- No dependency, component library, remote font requirement, light theme, or page feature has entered scope
- `npm test`, `npm run lint`, `npm run build`, `git diff --check`, and any added token-contract check pass
- Phase 04 alone is marked complete after implementation validation succeeds
