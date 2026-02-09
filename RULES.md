# Nuxt 4 Template - Team Coding Standards

This document defines the coding standards and best practices for our Nuxt 4 projects. All team members must follow these guidelines.

## Table of Contents

- [General Principles](#general-principles)
- [Nuxt 4 Architecture](#nuxt-4-architecture)
- [Code Style](#code-style)
- [Vue/Nuxt Standards](#vuenuxt-standards)
- [TypeScript Standards](#typescript-standards)
- [Testing Standards](#testing-standards)
- [Git Workflow](#git-workflow)
- [References](#references)

---

## General Principles

### Core Values

1. **SSR-First** - Code must work on both server and client
2. **Auto-Imports** - Leverage Nuxt's auto-import capabilities
3. **Explicit over Implicit** - Make intentions clear
4. **Type Safety** - TypeScript strict mode enabled
5. **Immutability** - Avoid mutation, prefer functional patterns

### Before Committing

Always run:
```bash
pnpm run lint        # Check for linting errors
pnpm run format      # Format code with Prettier
pnpm run type-check  # Verify TypeScript types
pnpm run test        # Run all tests
```

---

## Nuxt 4 Architecture

### Directory Structure

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
├── api/          # API endpoints (auto-routes)
├── middleware/   # Server middleware
├── plugins/      # Server plugins
├── routes/       # Server routes
└── utils/        # Server utilities

shared/           # Code shared between app and server
├── types/        # Shared TypeScript types
├── constants.ts  # Shared constants
└── utils.ts      # Shared utilities
```

### File Placement Rules

| Code Type | Location |
|-----------|----------|
| Vue Components | `app/components/` |
| Page Components | `app/pages/` |
| Layouts | `app/layouts/` |
| Composables | `app/composables/` |
| API Endpoints | `server/api/` |
| Server Utilities | `server/utils/` |
| Shared Types | `shared/types/` |
| Shared Constants | `shared/` |

---

## Code Style

### File Naming

```
Components:    PascalCase      (UserProfile.vue)
Pages:         kebab-case      (user-profile.vue)
Layouts:        kebab-case      (default.vue, admin.vue)
Composables:   camelCase       (useUserData.ts)
Middleware:    kebab-case      (auth.ts)
Plugins:       kebab-case      (vue-tooltip.ts)
API Routes:    kebab-case      (users/[id].ts)
```

### Imports Order

```typescript
// 1. External libraries (if needed - most are auto-imported)
import type { Ref } from 'vue'

// 2. Nuxt imports (if needed - most are auto-imported)
// No import needed for useRoute, useRouter, useFetch, etc.

// 3. Internal types
import type { User } from '~/shared/types/user'

// 4. Static assets (if needed)
import logoUrl from '~/assets/logo.svg'
```

### Naming Conventions

```typescript
// ✅ GOOD: Descriptive names
const getUserById = (id: string): Promise<User> => { }
const isLoading = ref(false)

// ❌ BAD: Abbreviations, unclear names
const getUsr = (i: string) => { }  // Wrong!
const ld = ref(false)  // Wrong!
```

---

## Vue/Nuxt Standards

### Component Structure

```vue
<script setup lang="ts">
// 1. Define page metadata (if page)
definePageMeta({
  layout: 'default',
  middleware: ['auth']
})

// 2. Props interface (if component)
interface Props {
  title: string
  count?: number
}
const props = withDefaults(defineProps<Props>(), {
  count: 0
})

// 3. Emits interface (if component)
interface Emits {
  (e: 'update', value: number): void
}
const emit = defineEmits<Emits>()

// 4. Nuxt composables (auto-imported)
const route = useRoute()
const router = useRouter()
const config = useRuntimeConfig()

// 5. Data fetching
const { data, pending, error } = await useFetch('/api/users')

// 6. Reactive state
const localState = ref('')

// 7. Computed properties
const computed = computed(() => { })

// 8. Methods
const handleClick = (): void => { }
</script>

<template>
  <!-- Template -->
</template>

<style scoped>
/* Styles */
</style>
```

### Data Fetching Guidelines

```vue
<!-- ✅ GOOD: Use useFetch for API calls in pages -->
<script setup lang="ts">
// For API calls
const { data: users, pending, error, refresh } = await useFetch('/api/users', {
  // Unique key for caching
  key: 'users',
  // Watch for changes
  watch: [() => route.query],
  // Transform response
  transform: (data: User[]) => data.filter(u => u.active)
})

// For any async operation
const { data: time } = await useAsyncData(
  'time',
  () => $fetch('/api/time'),
  {
    // Cache for 60 seconds
    getCachedData: key => useNuxtData(key).data
  }
)
</script>
```

### Server-Side Rendering Considerations

```vue
<!-- ✅ GOOD: Handle client-only code properly -->
<script setup lang="ts">
// Check environment
const isClient = process.client
const isServer = process.server

// ClientOnly for browser-only APIs
</script>

<template>
  <!-- Wrap browser-only components -->
  <ClientOnly>
    <MapComponent />
  </ClientOnly>
</template>
```

### API Routes Structure

```typescript
// ✅ GOOD: Define API endpoints in server/api/
// server/api/users/index.get.ts

export default defineEventHandler(async (event) => {
  // Get query parameters
  const query = getQuery(event)

  // Get headers
  const headers = getHeaders(event)

  // Return response
  return {
    users: [],
    timestamp: Date.now()
  }
})

// server/api/users/[id].get.ts

export default defineEventHandler(async (event) => {
  // Get route parameters
  const id = getRouterParam(event, 'id')

  // Validate
  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'User ID is required'
    })
  }

  // Fetch and return user
  const user = await fetchUser(id)

  if (!user) {
    throw createError({
      statusCode: 404,
      statusMessage: 'User not found'
    })
  }

  return user
})

// server/api/users/index.post.ts

export default defineEventHandler(async (event) => {
  // Read request body
  const body = await readBody(event)

  // Validate body
  if (!body.name || !body.email) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Name and email are required'
    })
  }

  // Create user
  const user = await createUser(body)

  // Return created resource
  return user
})
```

### Shared Code Pattern

```typescript
// ✅ GOOD: Use shared/ for code used by app and server
// shared/types/user.ts

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
}

export type UserRole = 'admin' | 'user' | 'guest'

// shared/constants.ts

export const API_BASE_URL = '/api'
export const USER_ROLES = ['admin', 'user', 'guest'] as const

export type UserRole = typeof USER_ROLES[number]

// Can be imported anywhere
// import type { User } from '~/shared/types/user'
// import { API_BASE_URL } from '~/shared/constants'
```

### Middleware Usage

```typescript
// ✅ GOOD: Named route middleware for auth
// app/middleware/auth.ts

export default defineNuxtRouteMiddleware((to, from) => {
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated.value) {
    return navigateTo('/login')
  }
})

// Use in page
<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})
</script>

// ✅ GOOD: Anonymous middleware
definePageMeta({
  middleware: (to, from) => {
    const { hasPermission } = usePermissions()
    if (!hasPermission('admin')) {
      return navigateTo('/')
    }
  }
})
```

### Plugin Usage

```typescript
// ✅ GOOD: Vue plugins in app/plugins/
// app/plugins/vue-tooltip.ts

export default defineNuxtPlugin((nuxtApp) => {
  // Plugin logic
  nuxtApp.provide('tooltip', (message: string) => {
    console.log('Tooltip:', message)
  })
})

// ✅ GOOD: Server plugins in server/plugins/
// server/plugins/database.ts

export default defineNitroPlugin((nitroApp) => {
  console.log('Database connected')

  nitroApp.hooks.hook('request', async (event) => {
    // Run on every request
  })
})
```

### Layouts Pattern

```vue
<!-- ✅ GOOD: Create reusable layouts -->
<!-- app/layouts/default.vue -->

<template>
  <div class="layout">
    <header>
      <nav>
        <NuxtLink to="/">Home</NuxtLink>
        <NuxtLink to="/about">About</NuxtLink>
      </nav>
    </header>

    <main>
      <slot />  <!-- Page content -->
    </main>

    <footer>
      <p>&copy; {{ new Date().getFullYear() }}</p>
    </footer>
  </div>
</template>

<!-- Use in page -->
<script setup lang="ts">
definePageMeta({
  layout: 'default'
})
</script>
```

### Error Handling

```vue
<!-- ✅ GOOD: Custom error page -->
<!-- app/error.vue -->

<template>
  <div class="error">
    <h1>{{ error.statusCode }}</h1>
    <p>{{ error.statusMessage }}</p>
    <button @click="handleError">Go Home</button>
  </div>
</template>

<script setup lang="ts">
interface Props {
  error: {
    statusCode: number
    statusMessage: string
  }
}

const props = defineProps<Props>()

const handleError = () => {
  clearError({ redirect: '/' })
}
</script>
```

---

## TypeScript Standards

### Strict Mode Rules

We use TypeScript strict mode. No exceptions.

```typescript
// ✅ GOOD: Explicit types
function calculateTotal(prices: number[]): number {
  return prices.reduce((sum, price) => sum + price, 0)
}

// ❌ BAD: Any type
function calculateTotal(prices: any): any {  // Wrong!
  return prices.reduce((sum: any, price: any) => sum + price, 0)
}
```

### Type Definitions

```typescript
// ✅ GOOD: Define shared types in shared/types/
// shared/types/user.ts

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
}

export type UserRole = 'admin' | 'user' | 'guest'

export interface CreateUserDto {
  name: string
  email: string
  password: string
}

export interface UpdateUserDto {
  name?: string
  email?: string
}

// Import anywhere
// import type { User, CreateUserDto } from '~/shared/types/user'
```

### Auto-Imported Types

```typescript
// ✅ GOOD: Types in composables are auto-imported
// app/composables/useUser.ts

export interface User {
  id: string
  name: string
}

export const useUser = () => {
  const user = ref<User | null>(null)
  return { user }
}

// Type is auto-imported - no import needed!
// const user: User | null = null
```

### Runtime Config

```typescript
// ✅ GOOD: Use runtime config for environment variables
// nuxt.config.ts
export default defineNuxtConfig({
  runtimeConfig: {
    // Server-side only
    apiSecret: process.env.API_SECRET,

    // Public (exposed to client)
    public: {
      apiBase: process.env.API_BASE_URL || '/api'
    }
  }
})

// Use in app
const config = useRuntimeConfig()
const apiBase = config.public.apiBase  // Available on client and server
const apiSecret = config.apiSecret      // Server-only
```

---

## Testing Standards

### Component Testing

```typescript
// ✅ GOOD: Test components with @nuxt/test-utils
import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import Counter from '~/components/Counter.vue'

describe('Counter', () => {
  it('increments count', async () => {
    const component = await mountSuspended(Counter)

    expect(component.text()).toContain('Count: 0')

    await component.find('button').trigger('click')

    expect(component.text()).toContain('Count: 1')
  })
})
```

### API Testing

```typescript
// ✅ GOOD: Test API endpoints
import { describe, it, expect } from 'vitest'
import { $fetch, setup } from '@nuxt/test-utils/e2e'

await setup({
  server: true
})

describe('API Endpoints', () => {
  it('GET /api/users returns users', async () => {
    const users = await $fetch('/api/users')

    expect(users).toBeDefined()
    expect(Array.isArray(users)).toBe(true)
  })

  it('GET /api/users/:id returns user', async () => {
    const user = await $fetch('/api/users/123')

    expect(user).toBeDefined()
    expect(user.id).toBe('123')
  })
})
```

### Test Coverage Requirements

- **Overall coverage**: 80% minimum
- **Critical paths**: 100% required
- **API endpoints**: 90% minimum
- **Components**: 75% minimum

### E2E Testing

```typescript
// ✅ GOOD: Test critical user flows
import { test, expect } from '@playwright/test'

test.describe('Authentication Flow', () => {
  test('user can log in', async ({ page }) => {
    await page.goto('/login')

    await page.fill('input[name="email"]', 'user@example.com')
    await page.fill('input[name="password"]', 'password123')
    await page.click('button[type="submit"]')

    await expect(page).toHaveURL('/dashboard')
    await expect(page.locator('h1')).toContainText('Welcome')
  })
})
```

---

## Git Workflow

### Branch Naming

```
feature/  New features
  feature/user-authentication
  feature/payment-integration

fix/      Bug fixes
  fix/login-error
  fix/navigation-bug

refactor/ Code refactoring
  refactor/user-service
  refactor-api-structure

hotfix/   Urgent production fixes
  hotfix/security-patch
  hotfix/critical-bug
```

### Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>: <description>

[optional body]

[optional footer]
```

**Types**: feat, fix, refactor, docs, test, chore, perf, ci

```
feat: add user authentication flow

- Implement login/logout endpoints
- Add protected route middleware
- Create auth composable

Closes #123
```

### Pull Request Guidelines

1. **Title**: Use conventional commit format
2. **Description**: Explain what and why
3. **Linked Issues**: Reference related tickets
4. **Checks**: All CI checks must pass
5. **Review**: Minimum 1 approval required

---

## Performance Guidelines

### Caching with Route Rules

```typescript
// ✅ GOOD: Configure caching in nuxt.config.ts
export default defineNuxtConfig({
  routeRules: {
    // Static page - ISR every hour
    '/': { isr: 3600 },
    // API endpoint - ISR every minute
    '/api/products': { isr: 60 },
    // Dynamic page - no caching
    '/admin/**': { isr: false },
    // Static assets - cache for 1 year
    '/images/**': { isr: 31536000 }
  }
})
```

### Lazy Loading

```vue
<!-- ✅ GOOD: Lazy load heavy components -->
<script setup lang="ts">
const HeavyChart = defineAsyncComponent(() =>
  import('~/components/features/HeavyChart.vue')
)
</script>

<template>
  <HeavyChart v-if="showChart" />
</template>
```

### Data Fetching Best Practices

```typescript
// ✅ GOOD: Use appropriate data fetching composable
// useFetch - for API calls
const { data } = await useFetch('/api/users')

// useAsyncData - for any async operation
const { data } = await useAsyncData('time', () => $fetch('/api/time'))

// useLazyFetch - don't block navigation
const { data, pending } = useLazyFetch('/api/products')
```

---

## Security Best Practices

### Input Validation

```typescript
// ✅ GOOD: Validate input in API routes
export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  // Validate required fields
  if (!body.email || !body.password) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Email and password are required'
    })
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(body.email)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid email format'
    })
  }

  // Process request
  return { success: true }
})
```

### XSS Prevention

```vue
<!-- ❌ BAD: Unescaped HTML (XSS risk) -->
<div v-html="userContent" />

<!-- ✅ GOOD: Use text interpolation -->
<div>{{ userContent }}</div>

<!-- ✅ GOOD: Sanitize if HTML is necessary -->
<div v-html="DOMPurify.sanitize(userContent)" />
```

### Environment Variables

```typescript
// ✅ GOOD: Use runtime config
const config = useRuntimeConfig()

// Server-only secrets
const dbUrl = config.dbUrl

// Public config (client and server)
const apiBase = config.public.apiBase
```

---

## Quick Reference

### Essential Commands

```bash
# Development
pnpm dev              # Start dev server
pnpm build            # Build for production
pnpm generate         # Generate static site
pnpm preview          # Preview production build

# Code Quality
pnpm run lint         # Run ESLint
pnpm run lint:fix     # Fix ESLint errors
pnpm run format       # Format with Prettier
pnpm run type-check   # TypeScript type check

# Testing
pnpm run test         # Run unit tests
pnpm run test:e2e     # Run E2E tests

# Git
pnpm run prepare      # Setup Husky hooks
```

### Nuxt Auto-Imports

No imports needed for:

```typescript
// Vue composables
ref, computed, watch, onMounted, etc.

// Nuxt composables
useRoute, useRouter, useFetch, useAsyncData,
useRuntimeConfig, useState, useCookie, useHead, etc.

// Vue components
All components in app/components/ are auto-imported
```

---

## References & External Resources

Official Documentation:
- [Nuxt 4 Documentation](https://nuxt.com/docs) - Core Nuxt concepts
- [Nuxt 4 Migration Guide](https://nuxt.com/docs/getting-started/upgrading) - Upgrading to Nuxt 4
- [Nitro Documentation](https://nitro.unjs.io/) - Server engine
- [Vue 3 Guide](https://vuejs.org/guide/introduction.html) - Vue fundamentals
- [Vue Router](https://router.vuejs.org/) - Routing (for reference)
- [Pinia](https://pinia.vuejs.org/) - State management
- [TypeScript Handbook](https://www.typescriptlang.org/docs/) - TypeScript fundamentals
- [Vitest](https://vitest.dev/) - Unit testing framework
- [Playwright](https://playwright.dev/) - E2E testing framework
- [VueUse](https://vueuse.org/) - Vue composition utilities

For detailed AI-specific guidelines, see [CLAUDE.md](./CLAUDE.md).
