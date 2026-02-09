# Nuxt 4 Template

A production-ready Nuxt 4 template with TypeScript, ESLint, Prettier, Vitest, Playwright, and more.

## Features

- **Nuxt 4** with new app/ directory structure
- **Vue 3.5+** with Composition API and `<script setup>`
- **TypeScript** strict mode enabled
- **Pinia** for state management
- **Vitest** for unit testing
- **Playwright** for E2E testing
- **ESLint 9** for code linting
- **Prettier 3** for code formatting
- **Husky** for Git hooks
- **Docker** for containerization
- **GitHub Actions** CI/CD workflows

## Quick Start

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Run tests
pnpm test

# Run linting
pnpm run lint
```

## Project Structure

```
app/              # Main application code (NEW in Nuxt 4)
├── components/   # Auto-imported components
├── composables/  # Auto-imported composition functions
├── layouts/      # Layout wrappers
├── middleware/   # Route middleware
├── pages/        # File-based routing
├── plugins/      # Vue plugins
└── utils/        # Client utilities

server/           # Server-side code (Nitro)
├── api/          # API endpoints
├── middleware/   # Server middleware
├── plugins/      # Server plugins
├── routes/       # Server routes
└── utils/        # Server utilities

shared/           # Code shared between app and server
├── types/        # Shared TypeScript types
└── constants.ts  # Shared constants

test/
├── unit/           # Vitest unit tests
└── e2e/            # Playwright E2E tests
```

## Documentation

- **[CLAUDE.md](./CLAUDE.md)** - AI code review guidelines
- **[RULES.md](./RULES.md)** - Team coding standards

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server |
| `pnpm build` | Build for production |
| `pnpm generate` | Generate static site |
| `pnpm preview` | Preview production build |
| `pnpm test` | Run unit tests |
| `pnpm test:e2e` | Run E2E tests |
| `pnpm lint` | Run ESLint |
| `pnpm format` | Format with Prettier |
| `pnpm type-check` | TypeScript type check |
