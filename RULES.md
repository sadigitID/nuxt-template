# Nuxt 4 Template - Development Rules & Conventions

This document defines the coding standards, naming conventions, file structure, and best practices for this Nuxt 4 project. All contributors must follow these guidelines.

---

## Table of Contents

- [Directory Structure](#directory-structure)
- [File Naming Conventions](#file-naming-conventions)
- [Component Guidelines](#component-guidelines)
- [Composables Guidelines](#composables-guidelines)
- [Page Guidelines](#page-guidelines)
- [Layout Guidelines](#layout-guidelines)
- [Middleware Guidelines](#middleware-guidelines)
- [Plugin Guidelines](#plugin-guidelines)
- [Store Guidelines (Pinia)](#store-guidelines-pinia)
- [Server API Guidelines](#server-api-guidelines)
- [Shared Code Guidelines](#shared-code-guidelines)
- [TypeScript Standards](#typescript-standards)
- [Tailwind CSS Standards](#tailwind-css-standards)
- [SSR Compatibility](#ssr-compatibility)
- [Data Fetching](#data-fetching)
- [Error Handling](#error-handling)
- [Testing Standards](#testing-standards)
- [Git Workflow](#git-workflow)
- [Performance Guidelines](#performance-guidelines)
- [Security Guidelines](#security-guidelines)
- [Quick Reference](#quick-reference)

---

## Directory Structure

```
nuxt-template/
├── app/                          # Application code (Nuxt 4)
│   ├── assets/                   # Static assets (processed by bundler)
│   │   └── css/
│   │       └── main.css          # Global CSS (Tailwind entry)
│   ├── components/               # Auto-imported Vue components
│   │   ├── common/               # Reusable UI components (Button, Modal, etc.)
│   │   └── features/             # Feature-specific components (UserCard, etc.)
│   ├── composables/              # Auto-imported composition functions
│   ├── layouts/                  # Layout wrappers
│   ├── middleware/               # Route middleware (client-side)
│   ├── pages/                    # File-based routing
│   ├── plugins/                  # Vue plugins
│   ├── stores/                   # Pinia stores
│   └── utils/                    # Client utilities (auto-imported)
│
├── server/                       # Server-side code (Nitro)
│   ├── api/                      # API endpoints (auto-routed)
│   ├── middleware/                # Server middleware
│   ├── plugins/                  # Server/Nitro plugins
│   ├── routes/                   # Server routes
│   └── utils/                    # Server utilities (auto-imported)
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
├── .github/workflows/            # GitHub Actions CI/CD
├── nuxt.config.ts                # Nuxt configuration
├── app.config.ts                 # App configuration (runtime)
├── tailwind.config.ts            # Tailwind CSS configuration (if needed)
├── tsconfig.json                 # TypeScript configuration
├── eslint.config.mjs             # ESLint configuration
├── .prettierrc.json              # Prettier configuration
├── vitest.config.ts              # Vitest configuration
├── playwright.config.ts          # Playwright configuration
├── Dockerfile                    # Docker build configuration
└── docker-compose.yml            # Docker Compose configuration
```

### File Placement Rules

| Code Type         | Location             | Auto-imported |
| ----------------- | -------------------- | ------------- |
| Vue Components    | `app/components/`    | Yes           |
| Page Components   | `app/pages/`         | -             |
| Layouts           | `app/layouts/`       | -             |
| Composables       | `app/composables/`   | Yes           |
| Client Utilities  | `app/utils/`         | Yes           |
| Route Middleware  | `app/middleware/`    | -             |
| Vue Plugins       | `app/plugins/`       | Yes           |
| Pinia Stores      | `app/stores/`        | Yes           |
| API Endpoints     | `server/api/`        | -             |
| Server Middleware | `server/middleware/` | -             |
| Server Utilities  | `server/utils/`      | Yes           |
| Server Plugins    | `server/plugins/`    | -             |
| Shared Types      | `shared/types/`      | Yes           |
| Shared Constants  | `shared/constants/`  | Yes           |
| Shared Utilities  | `shared/utils/`      | Yes           |
| Static Assets     | `public/`            | -             |
| Bundled Assets    | `app/assets/`        | -             |
| Unit Tests        | `test/unit/`         | -             |
| E2E Tests         | `test/e2e/`          | -             |

---

## File Naming Conventions

### General Rules

- Use **English** for all file names, variable names, and comments.
- Avoid abbreviations unless universally understood (e.g., `id`, `url`, `api`).
- File names must be descriptive and reflect their content.

### Components (`app/components/`)

**Convention: `PascalCase.vue`**

Components are organized in subdirectories by category. The directory name becomes part of the auto-import name.

```
app/components/
├── common/                       # Reusable base components
│   ├── Button.vue                # -> <CommonButton />
│   ├── Modal.vue                 # -> <CommonModal />
│   ├── Input.vue                 # -> <CommonInput />
│   ├── ColorModeToggle.vue       # -> <CommonColorModeToggle />
│   └── DataTable.vue             # -> <CommonDataTable />
├── features/                     # Feature-specific components
│   ├── UserCard.vue              # -> <FeaturesUserCard />
│   ├── ProductList.vue           # -> <FeaturesProductList />
│   └── DashboardChart.vue        # -> <FeaturesDashboardChart />
└── layout/                       # Layout-related components
    ├── Navbar.vue                # -> <LayoutNavbar />
    ├── Sidebar.vue               # -> <LayoutSidebar />
    └── Footer.vue                # -> <LayoutFooter />
```

Rules:

- Always use `PascalCase` for component files.
- Group by function: `common/` for reusable, `features/` for domain-specific.
- Component names should be nouns or noun phrases.
- Avoid generic names like `Item.vue` or `List.vue` without context.

### Pages (`app/pages/`)

**Convention: `kebab-case.vue`**

```
app/pages/
├── index.vue                     # Route: /
├── about.vue                     # Route: /about
├── contact.vue                   # Route: /contact
├── users/
│   ├── index.vue                 # Route: /users
│   └── [id].vue                  # Route: /users/:id (dynamic)
├── blog/
│   ├── index.vue                 # Route: /blog
│   └── [slug].vue                # Route: /blog/:slug
└── admin/
    ├── index.vue                 # Route: /admin
    └── settings.vue              # Route: /admin/settings
```

Rules:

- Always use `kebab-case` for page files.
- Use `index.vue` for directory root routes.
- Use `[param].vue` for dynamic route parameters.
- Use `[...slug].vue` for catch-all routes.
- Nested directories = nested routes.

### Layouts (`app/layouts/`)

**Convention: `kebab-case.vue`**

```
app/layouts/
├── default.vue                   # Default layout
├── auth.vue                      # Auth pages layout (login, register)
└── admin.vue                     # Admin panel layout
```

### Composables (`app/composables/`)

**Convention: `useCamelCase.ts`**

```
app/composables/
├── useCounter.ts                 # Counter logic
├── useAuth.ts                    # Authentication state
├── useForm.ts                    # Form handling
└── useNotification.ts            # Notification system
```

Rules:

- Always prefix with `use`.
- Each file exports one primary composable function.
- Name must describe the functionality.

### Middleware (`app/middleware/`)

**Convention: `kebab-case.ts`**

```
app/middleware/
├── auth.ts                       # Authentication check
├── guest.ts                      # Guest-only pages
└── admin-only.ts                 # Admin role check
```

### Plugins (`app/plugins/`)

**Convention: `kebab-case.ts`**

```
app/plugins/
├── error-handler.ts              # Global error handler
├── analytics.client.ts           # Client-only analytics plugin
└── logger.server.ts              # Server-only logger plugin
```

Rules:

- Use `.client.ts` suffix for client-only plugins.
- Use `.server.ts` suffix for server-only plugins.
- No suffix = runs on both client and server.

### Pinia Stores (`app/stores/`)

**Convention: `camelCase.ts`**

```
app/stores/
├── app.ts                        # App-wide state
├── auth.ts                       # Authentication state
└── user.ts                       # User state
```

Rules:

- Store name in `defineStore()` should match the file name.
- Use Setup Stores syntax (Composition API) over Options Stores.

### Server API Routes (`server/api/`)

**Convention: `kebab-case.method.ts`**

```
server/api/
├── hello.get.ts                  # GET  /api/hello
├── health.get.ts                 # GET  /api/health
├── users/
│   ├── index.get.ts              # GET  /api/users
│   ├── index.post.ts             # POST /api/users
│   └── [id].get.ts               # GET  /api/users/:id
│   └── [id].put.ts               # PUT  /api/users/:id
│   └── [id].delete.ts            # DELETE /api/users/:id
└── auth/
    ├── login.post.ts             # POST /api/auth/login
    └── logout.post.ts            # POST /api/auth/logout
```

Rules:

- Always suffix with HTTP method: `.get.ts`, `.post.ts`, `.put.ts`, `.delete.ts`, `.patch.ts`.
- Use `[param]` for dynamic parameters.
- Group related endpoints in subdirectories.

### Server Utilities (`server/utils/`)

**Convention: `kebab-case.ts` or `camelCase.ts`**

```
server/utils/
├── response.ts                   # Response helpers
├── validation.ts                 # Validation utilities
└── auth.ts                       # Auth utilities
```

### Shared Code (`shared/`)

**Convention: `kebab-case.ts` for files, `kebab-case/` for directories**

```
shared/
├── types/
│   └── index.ts                  # All shared types
├── constants/
│   └── index.ts                  # All shared constants
└── utils/
    └── index.ts                  # All shared utilities
```

### Test Files (`test/`)

**Convention: `kebab-case.spec.ts` or `kebab-case.test.ts`**

```
test/
├── unit/
│   ├── composables/
│   │   └── use-counter.spec.ts
│   ├── utils/
│   │   └── format.spec.ts
│   └── example.spec.ts
└── e2e/
    ├── home.spec.ts
    ├── navigation.spec.ts
    └── example.spec.ts
```

---

## Component Guidelines

### Template Order

Always structure Vue SFC files in this order:

```vue
<script setup lang="ts">
// Content
</script>

<template>
  <!-- Template -->
</template>

<style scoped>
/* Styles (prefer Tailwind classes in template) */
</style>
```

### Script Setup Structure

Follow this ordering within `<script setup>`:

```vue
<script setup lang="ts">
// 1. Page Meta (pages only)
definePageMeta({
  layout: 'default',
  middleware: ['auth'],
})

// 2. SEO Meta (pages only)
useSeoMeta({
  title: 'Page Title',
  description: 'Page description',
})

// 3. Type imports
import type { User } from '~/shared/types'

// 4. Props
interface Props {
  title: string
  count?: number
}
const props = withDefaults(defineProps<Props>(), {
  count: 0,
})

// 5. Emits
const emit = defineEmits<{
  update: [value: number]
  close: []
}>()

// 6. Composables (auto-imported)
const route = useRoute()
const router = useRouter()
const config = useRuntimeConfig()

// 7. Data fetching
const { data, pending, error } = await useFetch('/api/users')

// 8. Reactive state
const isOpen = ref(false)
const searchQuery = ref('')

// 9. Computed properties
const filteredItems = computed(() => {
  // ...
})

// 10. Methods
const handleSubmit = (): void => {
  // ...
}

// 11. Lifecycle hooks
onMounted(() => {
  // ...
})

// 12. Watchers
watch(searchQuery, (newValue) => {
  // ...
})
</script>
```

### Component Rules

- Always use `<script setup lang="ts">`.
- Always use **scoped styles** or Tailwind classes (prefer Tailwind).
- Define Props and Emits with TypeScript interfaces.
- Use `withDefaults()` for default prop values.
- Never import components manually -- they are auto-imported.
- Component templates should be clean and readable.

---

## Composables Guidelines

```typescript
// app/composables/useCounter.ts

export function useCounter(initialValue = 0) {
  // Reactive state
  const count = ref(initialValue)

  // Computed
  const isPositive = computed(() => count.value > 0)

  // Methods
  const increment = (): void => {
    count.value++
  }

  const decrement = (): void => {
    count.value--
  }

  const reset = (): void => {
    count.value = initialValue
  }

  // Return public API
  return {
    count: readonly(count),
    isPositive,
    increment,
    decrement,
    reset,
  }
}
```

Rules:

- Always prefix function name with `use`.
- Export a named function (not default export).
- Return reactive refs and methods.
- Consider returning `readonly()` refs when mutation should only happen through methods.
- No side effects on import -- side effects should be in `onMounted` or similar.

---

## Page Guidelines

```vue
<script setup lang="ts">
// 1. Define page metadata
definePageMeta({
  layout: 'default',
})

// 2. SEO
useSeoMeta({
  title: 'About',
  description: 'Learn more about us',
})

// 3. Data fetching (SSR)
const { data: users } = await useFetch('/api/users')
</script>

<template>
  <div>
    <h1>About</h1>
    <!-- Page content -->
  </div>
</template>
```

Rules:

- Always set `useSeoMeta()` for SEO.
- Use `useFetch()` or `useAsyncData()` for server-side data fetching.
- Never use `fetch()` or `axios` directly in pages -- use `useFetch()`.
- Never fetch data in `onMounted()` -- this won't work with SSR.

---

## Layout Guidelines

```vue
<!-- app/layouts/default.vue -->
<template>
  <div>
    <header>
      <!-- Navigation -->
    </header>

    <main>
      <slot />
    </main>

    <footer>
      <!-- Footer content -->
    </footer>
  </div>
</template>
```

Rules:

- Layouts must contain a `<slot />` for page content.
- Keep layouts minimal -- heavy logic belongs in components.
- Use `definePageMeta({ layout: 'name' })` in pages to select layout.

---

## Middleware Guidelines

### Route Middleware (Client-side)

```typescript
// app/middleware/auth.ts
export default defineNuxtRouteMiddleware((to, _from) => {
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated.value) {
    return navigateTo('/login')
  }
})
```

### Server Middleware

```typescript
// server/middleware/security-headers.ts
export default defineEventHandler((event) => {
  setHeaders(event, {
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'SAMEORIGIN',
  })
})
```

Rules:

- Route middleware in `app/middleware/` runs on navigation.
- Server middleware in `server/middleware/` runs on every server request.
- Use `defineNuxtRouteMiddleware` for route middleware.
- Use `defineEventHandler` for server middleware.

---

## Plugin Guidelines

```typescript
// app/plugins/error-handler.ts
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.config.errorHandler = (error, instance, info) => {
    // Handle error
  }
})
```

Rules:

- Use `.client.ts` suffix for client-only plugins.
- Use `.server.ts` suffix for server-only plugins.
- Use `defineNuxtPlugin` for app plugins.
- Use `defineNitroPlugin` for server plugins.

---

## Store Guidelines (Pinia)

Use the **Setup Store** syntax (Composition API style):

```typescript
// app/stores/auth.ts
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
  // State
  const user = ref<User | null>(null)
  const token = ref<string | null>(null)

  // Getters (computed)
  const isAuthenticated = computed(() => !!token.value)
  const userName = computed(() => user.value?.name ?? 'Guest')

  // Actions (functions)
  async function login(credentials: LoginCredentials): Promise<void> {
    const response = await $fetch('/api/auth/login', {
      method: 'POST',
      body: credentials,
    })
    user.value = response.user
    token.value = response.token
  }

  function logout(): void {
    user.value = null
    token.value = null
    navigateTo('/login')
  }

  return {
    user: readonly(user),
    token: readonly(token),
    isAuthenticated,
    userName,
    login,
    logout,
  }
})
```

Rules:

- Always use Setup Store syntax.
- Store name in `defineStore('name')` must match the file name.
- Export the store function with `use` prefix and `Store` suffix: `useAuthStore`.
- Return `readonly()` for state that should only be modified via actions.
- Use `$fetch` (not `useFetch`) inside store actions.

---

## Server API Guidelines

### Route Handlers

```typescript
// server/api/users/index.get.ts
export default defineEventHandler(async (event) => {
  const { page, perPage } = parsePaginationParams(event)

  // Fetch data
  const users = await getUsers({ page, perPage })

  // Return standardized response
  return createPaginatedResponse(users.data, {
    page,
    perPage,
    total: users.total,
  })
})

// server/api/users/index.post.ts
export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  // Validate
  if (!body.name || !body.email) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Name and email are required',
    })
  }

  // Create
  const user = await createUser(body)

  return createApiResponse(user, 'User created successfully')
})
```

Rules:

- Always suffix files with HTTP method: `.get.ts`, `.post.ts`, `.put.ts`, `.delete.ts`.
- Always validate input.
- Use `createError()` for error responses with proper status codes.
- Use server utility functions (`createApiResponse`, `createPaginatedResponse`) for consistent responses.
- Use `readBody()` for POST/PUT/PATCH body.
- Use `getQuery()` for query parameters.
- Use `getRouterParam()` for route parameters.

---

## Shared Code Guidelines

### Types (`shared/types/`)

```typescript
// shared/types/index.ts

// API response types
export interface ApiResponse<T> {
  success: boolean
  data: T
  message?: string
}

// Domain types
export interface User {
  id: string
  name: string
  email: string
  role: UserRole
}

export type UserRole = 'admin' | 'user' | 'guest'
```

### Constants (`shared/constants/`)

```typescript
// shared/constants/index.ts
export const DEFAULT_PAGE = 1
export const DEFAULT_PER_PAGE = 10
export const USER_ROLES = ['admin', 'user', 'guest'] as const
```

### Shared Utilities (`shared/utils/`)

```typescript
// shared/utils/index.ts
export function slugify(text: string): string {
  return text.toLowerCase().replace(/\s+/g, '-')
}
```

Rules:

- Only put code here that is needed by **both** `app/` and `server/`.
- If code is only used on the client, put it in `app/utils/`.
- If code is only used on the server, put it in `server/utils/`.
- Code in `shared/` must not use browser APIs or Node.js-specific APIs.

---

## TypeScript Standards

### Strict Mode

TypeScript strict mode is enabled. No exceptions.

```typescript
// GOOD
function getUser(id: string): User | null { ... }

// BAD - No 'any' types
function getUser(id: any): any { ... }
```

### Naming Conventions

| Type            | Convention  | Example                    |
| --------------- | ----------- | -------------------------- |
| Variables       | camelCase   | `const userName = 'John'`  |
| Constants       | UPPER_SNAKE | `const MAX_RETRIES = 3`    |
| Functions       | camelCase   | `function getUser() {}`    |
| Interfaces      | PascalCase  | `interface UserProfile {}` |
| Types           | PascalCase  | `type UserRole = 'admin'`  |
| Enums           | PascalCase  | `enum Status { Active }`   |
| Type Parameters | T, U, K, V  | `function map<T, U>() {}`  |

### Import Order

When explicit imports are needed (rare with Nuxt auto-imports):

```typescript
// 1. Type imports
import type { User } from '~/shared/types'

// 2. External packages
import { z } from 'zod'

// 3. Internal modules
import { formatDate } from '~/app/utils/format'
```

---

## Tailwind CSS Standards

### Usage

- Prefer Tailwind utility classes over custom CSS.
- Use `<style scoped>` only when Tailwind classes are insufficient.
- Use Tailwind's dark mode variant (`dark:`) for dark mode styles.

```vue
<!-- GOOD: Tailwind classes -->
<template>
  <button class="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">Submit</button>
</template>

<!-- AVOID: Custom CSS for basic styling -->
<style scoped>
.submit-btn {
  border-radius: 8px;
  background-color: #2563eb;
  padding: 8px 16px;
  color: white;
}
</style>
```

### Class Ordering

Follow this approximate order for Tailwind classes:

1. Layout: `flex`, `grid`, `block`, `inline`
2. Sizing: `w-`, `h-`, `min-w-`, `max-w-`
3. Spacing: `p-`, `m-`, `gap-`
4. Typography: `text-`, `font-`, `leading-`
5. Backgrounds: `bg-`
6. Borders: `border-`, `rounded-`
7. Effects: `shadow-`, `opacity-`
8. Transitions: `transition-`, `duration-`
9. Responsive: `sm:`, `md:`, `lg:`
10. State: `hover:`, `focus:`, `active:`
11. Dark mode: `dark:`

---

## SSR Compatibility

### Rules

All code must work on both server and client unless explicitly marked.

```typescript
// GOOD: Check environment
if (import.meta.client) {
  localStorage.setItem('theme', 'dark')
}

// GOOD: Use ClientOnly wrapper
<ClientOnly>
  <BrowserOnlyComponent />
</ClientOnly>

// BAD: Direct browser API usage (breaks SSR)
localStorage.setItem('theme', 'dark')
window.addEventListener('scroll', handler)
```

### Common Patterns

```typescript
// Use useState for hydration-safe shared state
const theme = useState('theme', () => 'light')

// Use useCookie for cookie access (works on both server/client)
const token = useCookie('auth_token')

// Use useHead/useSeoMeta for head management
useHead({ title: 'My Page' })
```

---

## Data Fetching

### In Pages/Components

```vue
<script setup lang="ts">
// SSR data fetching -- await blocks navigation until data is ready
const { data, pending, error } = await useFetch('/api/users')

// Lazy fetch -- does not block navigation
const { data, pending } = useLazyFetch('/api/products')

// With options
const { data } = await useFetch('/api/users', {
  key: 'users-list',
  query: { page: 1 },
  transform: (data) => data.map(transformUser),
})
</script>
```

### In Stores/Functions

```typescript
// Use $fetch (not useFetch) outside of setup context
const data = await $fetch('/api/users')
```

### Rules

- Use `useFetch()` or `useAsyncData()` in pages and components.
- Use `$fetch()` in stores, event handlers, and non-setup contexts.
- Never use `fetch()` or `axios` directly.
- Always provide a `key` for cacheable requests.
- Use `useLazyFetch()` when the data is not needed for initial render.

---

## Error Handling

### Client-Side

```vue
<script setup lang="ts">
const { data, error } = await useFetch('/api/users')
</script>

<template>
  <div v-if="error">Error: {{ error.message }}</div>
  <div v-else>
    {{ data }}
  </div>
</template>
```

### Server-Side

```typescript
// server/api/users/[id].get.ts
export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'User ID is required',
    })
  }

  const user = await findUser(id)

  if (!user) {
    throw createError({
      statusCode: 404,
      statusMessage: 'User not found',
    })
  }

  return user
})
```

### Global Error Page

The `app/error.vue` file handles all unhandled errors. Use `clearError()` to recover.

---

## Testing Standards

### Unit Tests (Vitest)

```typescript
import { describe, it, expect } from 'vitest'
import { useCounter } from '~/app/composables/useCounter'

describe('useCounter', () => {
  it('starts with initial value', () => {
    const { count } = useCounter(5)
    expect(count.value).toBe(5)
  })

  it('increments count', () => {
    const { count, increment } = useCounter()
    increment()
    expect(count.value).toBe(1)
  })
})
```

### E2E Tests (Playwright)

```typescript
import { test, expect } from '@playwright/test'

test('home page loads', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('h1')).toBeVisible()
})
```

### Test File Naming

- Unit: `test/unit/**/*.spec.ts` or `test/unit/**/*.test.ts`
- E2E: `test/e2e/**/*.spec.ts`

### Coverage Requirements

- Overall: 80% minimum
- Critical paths (auth, payments): 100%
- API endpoints: 90%
- Components: 75%

---

## Git Workflow

### Branch Naming

```
feature/user-authentication       # New features
fix/login-error                   # Bug fixes
refactor/api-structure            # Code refactoring
hotfix/security-patch             # Urgent production fixes
docs/update-readme                # Documentation
chore/update-deps                 # Dependency updates
```

### Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/). This is enforced by commitlint via Husky's `commit-msg` hook.

```
feat: add user authentication flow
fix: resolve login redirect loop
refactor: simplify API response format
docs: update RULES.md with store guidelines
test: add unit tests for useCounter
chore: upgrade Nuxt to v4.2
perf: lazy load dashboard charts
ci: add type-check step to CI pipeline
style: fix button alignment on mobile
build: update Docker configuration
revert: revert "feat: add user authentication flow"
```

Allowed types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`.

### Git Hooks (Husky)

Git hooks run automatically on every commit:

| Hook         | Action                         | Tool        |
| ------------ | ------------------------------ | ----------- |
| `pre-commit` | Lint & format staged files     | lint-staged |
| `commit-msg` | Validate commit message format | commitlint  |

**pre-commit** runs `lint-staged`, which:

- Runs `eslint --fix` + `prettier --write` on staged `*.{js,ts,vue}` files.
- Runs `prettier --write` on staged `*.{json,md,yml,yaml}` files.

**commit-msg** validates that the commit message follows Conventional Commits format.

### Before Committing

The hooks handle lint and format automatically, but you can also run checks manually:

```bash
pnpm run lint:fix     # Fix lint errors
pnpm run format       # Format code
pnpm run type-check   # Verify types
pnpm run test:run     # Run unit tests
```

---

## Performance Guidelines

### Lazy Loading Components

```vue
<script setup lang="ts">
// Lazy load heavy components
const Chart = defineAsyncComponent(() => import('~/app/components/features/Chart.vue'))
</script>
```

### Image Optimization

```vue
<!-- Use NuxtImg for optimized images -->
<NuxtImg src="/images/hero.jpg" width="800" height="600" loading="lazy" format="webp" />
```

### Route Rules (Caching)

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  routeRules: {
    '/': { isr: 3600 }, // ISR: revalidate every hour
    '/api/products': { isr: 60 }, // ISR: revalidate every minute
    '/admin/**': { ssr: true }, // Always SSR
    '/static/**': { prerender: true }, // Pre-render at build time
  },
})
```

---

## Security Guidelines

- Never commit secrets or API keys -- use `.env` and `runtimeConfig`.
- Always validate user input on the server side.
- Use `createError()` for error responses (prevents leaking internal details).
- Apply security headers via server middleware.
- Sanitize HTML if using `v-html` (use DOMPurify).
- Use `readonly()` for refs that should not be mutated externally.

---

## Quick Reference

### Essential Commands

```bash
pnpm dev              # Start dev server
pnpm build            # Build for production
pnpm preview          # Preview production build
pnpm run lint         # Run linter
pnpm run lint:fix     # Auto-fix lint errors
pnpm run format       # Format code
pnpm run type-check   # TypeScript check
pnpm run test         # Run unit tests (watch mode)
pnpm run test:run     # Run unit tests (single run)
pnpm run test:e2e     # Run E2E tests
```

### Auto-Imported APIs (No import needed)

```typescript
// Vue
ref, reactive, computed, watch, watchEffect,
onMounted, onUnmounted, nextTick, provide, inject,
defineProps, defineEmits, withDefaults

// Nuxt
useRoute, useRouter, useFetch, useAsyncData, useLazyFetch,
useRuntimeConfig, useState, useCookie, useHead, useSeoMeta,
useNuxtApp, useAppConfig, useError, clearError,
navigateTo, createError, definePageMeta,
defineNuxtRouteMiddleware

// VueUse (via @vueuse/nuxt)
useLocalStorage, useSessionStorage, useDark, useToggle,
useClipboard, useMediaQuery, useWindowSize, etc.
```
