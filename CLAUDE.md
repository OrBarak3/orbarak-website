# CLAUDE.md

Guidance for Claude-style assistants working in this repository.

## Project Overview

- This is a single-page portfolio website for Or Barak.
- Stack: React, TypeScript, Vite, Tailwind CSS, and Framer Motion.
- Deployment target: Vercel static hosting.
- The site should feel like a premium AI engineer portfolio: dark, technical, polished, and credible.

## Key Files

- `src/App.tsx`: page composition and section order.
- `src/components/`: reusable UI components.
- `src/data/portfolio.ts`: main content source of truth for copy, metrics, projects, skills, and links.
- `src/types/portfolio.ts`: shared content types.
- `src/index.css`: theme tokens, global styles, font imports, and reduced-motion handling.
- `tailwind.config.cjs`: Tailwind theme extensions for colors, shadows, backgrounds, and animations.

## Working Style

- Be warm, clear, and educational in explanations.
- Think before editing. Briefly explain approach and trade-offs when the change is non-trivial.
- Ask clarifying questions when ambiguity affects public-facing copy, branding, or site behavior.
- Otherwise make reasonable defaults and keep momentum.
- Keep code modular, readable, and strongly typed.

## Design Rules

- Preserve the dark "developer workspace" aesthetic.
- Prefer subtle glow, soft borders, glass panels, and mono accents over flashy visuals.
- Keep the main reading experience highly legible.
- Avoid generic AI imagery, mascot icons, or gimmicky motion.
- Maintain strong spacing, hierarchy, and responsive behavior on mobile and desktop.
- Respect reduced-motion preferences.

## Implementation Rules

- Use Tailwind for styling. Do not introduce a component library unless explicitly requested.
- Use Framer Motion for meaningful motion only; keep animations understated.
- Keep reusable content centralized in `src/data/portfolio.ts` rather than scattering hardcoded strings through components.
- Keep the app Vercel-friendly and static. Do not add a backend, router, or CMS unless requested.
- Prefer extending existing components over duplicating similar UI patterns.
- Preserve accessibility: keyboard-usable controls, readable contrast, and semantic structure.

## Common Tasks

### Updating content

- Edit `src/data/portfolio.ts` first.
- Keep placeholder contact links until real links are provided.
- Maintain a concise, technical, credible tone.

### Updating layout or visuals

- Reuse existing cards, section wrappers, and typography patterns where possible.
- If adding a new section, make it fit the existing visual system and scroll navigation model.

### Updating animation

- Use `useReducedMotion` when motion meaningfully affects the UI.
- Favor section reveals, hover polish, and inline expansion over dramatic transitions.

## Verification

Before finishing meaningful changes:

```bash
npm run build
```

If a change affects copy, layout, or interaction, also sanity-check the relevant components for mobile and desktop behavior.

