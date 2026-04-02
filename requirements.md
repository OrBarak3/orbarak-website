# Requirements

## Runtime Dependencies

| Package | Version | Purpose |
|---|---|---|
| react | ^19.2.4 | UI framework |
| react-dom | ^19.2.4 | React DOM renderer |
| framer-motion | ^12.38.0 | Animations and transitions |

## Dev Dependencies

| Package | Version | Purpose |
|---|---|---|
| vite | ^8.0.3 | Build tool and dev server |
| @vitejs/plugin-react | ^6.0.1 | React support for Vite |
| typescript | ^6.0.2 | Static typing |
| tailwindcss | ^3.4.19 | Utility-first CSS framework |
| autoprefixer | ^10.4.27 | PostCSS vendor prefixing |
| postcss | ^8.5.8 | CSS transformation pipeline |
| @types/react | ^19.2.14 | TypeScript types for React |
| @types/react-dom | ^19.2.3 | TypeScript types for React DOM |
| vitest | ^4.1.2 | Unit test runner |
| @testing-library/react | ^16.3.2 | React component testing utilities |
| @testing-library/jest-dom | ^6.9.1 | Custom DOM matchers for tests |
| @testing-library/user-event | ^14.6.1 | User interaction simulation |
| jsdom | ^29.0.1 | DOM environment for tests |
| vitest-axe | ^0.1.0 | Accessibility testing in Vitest |

## Node

Use the LTS version of Node.js (v20+).

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start local dev server |
| `npm run build` | Type-check and build for production |
| `npm run preview` | Preview production build locally |
| `npm run test` | Run tests once |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:coverage` | Run tests with coverage report |
