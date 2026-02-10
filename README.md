# Nuxt 4 Template

A production-ready Nuxt 4 template with TypeScript, Tailwind CSS, SEO, and best practices configured out of the box.

## Features

| Feature        | Package                     | Description                                    |
| -------------- | --------------------------- | ---------------------------------------------- |
| **Framework**  | `nuxt` v4                   | Nuxt 4 with `app/` directory structure         |
| **Language**   | `typescript`                | Strict mode enabled                            |
| **Styling**    | `@nuxtjs/tailwindcss`       | Utility-first CSS framework                    |
| **Icons**      | `@nuxt/icon`                | 200k+ icons via Iconify (Lucide, Simple Icons) |
| **Images**     | `@nuxt/image`               | Automatic image optimization (avif, webp)      |
| **Fonts**      | `@nuxt/fonts`               | Automatic font optimization                    |
| **SEO**        | `@nuxtjs/seo`               | Sitemap, robots, OG image, schema.org          |
| **Color Mode** | `@nuxtjs/color-mode`        | Dark/light mode with system preference         |
| **State**      | `@pinia/nuxt`               | Pinia stores with auto-import                  |
| **Utilities**  | `@vueuse/nuxt`              | 200+ Vue composition utilities                 |
| **Validation** | `zod`                       | Runtime type validation                        |
| **Dates**      | `date-fns`                  | Date utility library                           |
| **Linting**    | `@nuxt/eslint` + `prettier` | ESLint 9 + Prettier 3                          |
| **Unit Tests** | `vitest`                    | Fast unit testing                              |
| **E2E Tests**  | `@playwright/test`          | Cross-browser E2E testing                      |
| **CI/CD**      | GitHub Actions              | Lint, type-check, test, build                  |
| **Docker**     | Dockerfile + Compose        | Production containerization                    |

## Quick Start

### Prerequisites

- [Node.js](https://nodejs.org/) v22+
- [pnpm](https://pnpm.io/) v9+

### Setup

```bash
# Create a new project from this template
npx nuxi@latest init -t github:sadigitid/nuxt-template my-project
cd my-project

# Install dependencies
pnpm install

# Copy environment variables
cp .env.example .env

# Start development server
pnpm dev
```

The development server starts at `http://localhost:3000`.

## Project Structure

```
nuxt-template/
├── app/                          # Application code (Nuxt 4)
│   ├── assets/css/               # Global CSS (Tailwind entry point)
│   ├── components/               # Auto-imported Vue components
│   │   ├── common/               #   Reusable UI components
│   │   └── features/             #   Feature-specific components
│   ├── composables/              # Auto-imported composition functions
│   ├── layouts/                  # Layout wrappers
│   ├── middleware/               # Route middleware
│   ├── pages/                    # File-based routing
│   ├── plugins/                  # Vue plugins
│   ├── stores/                   # Pinia stores
│   └── utils/                    # Client utilities
│
├── server/                       # Server-side code (Nitro)
│   ├── api/                      # API endpoints
│   ├── middleware/                # Server middleware
│   ├── plugins/                  # Server plugins
│   ├── routes/                   # Server routes
│   └── utils/                    # Server utilities
│
├── shared/                       # Shared between app and server
│   ├── constants/                # Shared constants
│   ├── types/                    # Shared TypeScript types
│   └── utils/                    # Shared utility functions
│
├── public/                       # Static files (served as-is)
├── test/                         # Test files
│   ├── unit/                     # Vitest unit tests
│   └── e2e/                      # Playwright E2E tests
│
├── nuxt.config.ts                # Nuxt configuration
├── app.config.ts                 # Runtime app configuration
├── tsconfig.json                 # TypeScript configuration
├── eslint.config.mjs             # ESLint configuration
├── .prettierrc.json              # Prettier configuration
├── vitest.config.ts              # Vitest configuration
├── playwright.config.ts          # Playwright configuration
├── Dockerfile                    # Docker build
└── docker-compose.yml            # Docker Compose
```

## Scripts

| Command                 | Description                       |
| ----------------------- | --------------------------------- |
| `pnpm dev`              | Start development server with HMR |
| `pnpm build`            | Build for production              |
| `pnpm generate`         | Generate static site              |
| `pnpm preview`          | Preview production build          |
| `pnpm run lint`         | Run ESLint                        |
| `pnpm run lint:fix`     | Auto-fix lint errors              |
| `pnpm run format`       | Format code with Prettier         |
| `pnpm run format:check` | Check formatting without writing  |
| `pnpm run type-check`   | Run TypeScript type checker       |
| `pnpm run test`         | Run unit tests in watch mode      |
| `pnpm run test:run`     | Run unit tests once               |
| `pnpm run test:e2e`     | Run Playwright E2E tests          |
| `pnpm run test:e2e:ui`  | Open Playwright UI                |

## Environment Variables

Copy `.env.example` to `.env` and configure:

```bash
# Application
NUXT_PUBLIC_APP_NAME=My App           # Public app name
NUXT_PUBLIC_APP_URL=http://localhost:3000  # Public app URL

# API
NUXT_PUBLIC_API_BASE_URL=/api         # Public API base URL
NUXT_API_SECRET=secret                # Server-only API secret

# Session
NUXT_SESSION_SECRET=secret            # Server-only session secret
```

Environment variables prefixed with `NUXT_PUBLIC_` are exposed to the client via `useRuntimeConfig().public`. Variables without the prefix are server-only and accessed via `useRuntimeConfig()`.

## Modules Included

### @nuxtjs/tailwindcss

Tailwind CSS is pre-configured. Use utility classes directly in templates:

```vue
<template>
  <button class="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">Click me</button>
</template>
```

### @nuxtjs/seo

SEO is handled automatically. Set per-page metadata:

```vue
<script setup lang="ts">
useSeoMeta({
  title: 'Page Title',
  description: 'Page description for search engines',
  ogImage: '/og-image.png',
})
</script>
```

The module generates sitemap, robots.txt, and structured data automatically.

### @nuxt/image

Use `<NuxtImg>` for optimized images:

```vue
<template>
  <NuxtImg src="/images/photo.jpg" width="800" height="600" loading="lazy" />
</template>
```

### @nuxtjs/color-mode

Dark mode is configured with system preference detection:

```vue
<script setup lang="ts">
const colorMode = useColorMode()
colorMode.preference = 'dark' // 'light', 'dark', 'system'
</script>
```

Use Tailwind's `dark:` variant for dark mode styles.

### @pinia/nuxt

Stores are auto-imported from `app/stores/`:

```typescript
// app/stores/auth.ts
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const isAuthenticated = computed(() => !!user.value)
  return { user, isAuthenticated }
})
```

```vue
<script setup lang="ts">
const auth = useAuthStore()
</script>
```

### @nuxt/icon

Use 200k+ icons from Iconify:

```vue
<template>
  <Icon name="lucide:home" class="size-5" />
  <Icon name="simple-icons:github" class="size-5" />
</template>
```

### @vueuse/nuxt

All VueUse composables are auto-imported:

```vue
<script setup lang="ts">
const { width, height } = useWindowSize()
const isDark = useDark()
const { copy } = useClipboard()
</script>
```

## Docker

### Build and run

```bash
# Build the image
docker build -t nuxt-app .

# Run the container
docker run -p 3000:3000 nuxt-app

# Or use Docker Compose
docker compose up -d
```

## Documentation

| Document                 | Description                                           |
| ------------------------ | ----------------------------------------------------- |
| [RULES.md](./RULES.md)   | Development rules, naming conventions, file structure |
| [CLAUDE.md](./CLAUDE.md) | AI code review guidelines                             |

## Before Committing

```bash
pnpm run lint:fix     # Fix lint errors
pnpm run format       # Format code
pnpm run type-check   # Verify TypeScript types
pnpm run test:run     # Run unit tests
```

## License

Private project. All rights reserved.
