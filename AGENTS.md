# AGENTS.md

Instructions for Codex and other coding agents working in this repository.

## Mission

Maintain and improve a Vercel-deployed AI engineer portfolio site for Or Barak without drifting away from the current product shape:

- Single page
- Static
- Responsive
- Production-quality frontend
- Technical and credible tone

## Current Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion

## Repo Map

- `src/App.tsx`: top-level page assembly
- `src/components/`: shared UI building blocks
- `src/data/portfolio.ts`: all editable portfolio content
- `src/types/portfolio.ts`: content and UI types
- `src/index.css`: global theme and base styles

## Agent Rules

- Do not replace the stack without an explicit request.
- Do not add routing, backend code, or server-only logic unless the user asks for it.
- Do not move portfolio copy out of `src/data/portfolio.ts` unless there is a strong reason.
- Do not introduce heavy dependencies for simple UI problems.
- Do not make the site look like a generic startup template.

## Design Guardrails

- Keep the dark developer-workspace aesthetic.
- Use tasteful glow accents, glass/panel surfaces, and subtle borders.
- Use monospaced styling for labels, snippets, and technical metadata only.
- Keep the primary content readable and professional.
- Prefer technical motifs such as workflow steps, schema snippets, and metrics over decorative AI graphics.

## Editing Guidance

### Content changes

- Update `src/data/portfolio.ts`.
- Keep metrics and claims specific.
- Leave placeholders in place unless real links or copy are provided.

### UI changes

- Reuse the existing component system before creating new abstractions.
- Keep interactions keyboard-accessible.
- Ensure layouts still work well on mobile.

### Motion changes

- Use Framer Motion sparingly.
- Respect reduced-motion preferences.
- Favor subtle reveal, hover, and expand/collapse behavior.

## Validation

Run this before wrapping up:

```bash
npm run build
```

## Deployment Context

- The site is intended for Vercel.
- Keep it compatible with static hosting and a standard Vite build output.

