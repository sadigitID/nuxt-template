# Nuxt 4 Template - AI Code Review Guidelines

This document provides AI-specific guidelines for reviewing and contributing to this Nuxt 4 project.

## Project Overview

- **Framework**: Nuxt 4 with Vue 3 Composition API
- **Structure**: New Nuxt 4 app/ directory structure
- **Language**: TypeScript (strict mode)
- **State Management**: Pinia
- **Routing**: File-based routing (app/pages/)
- **Testing**: Vitest (unit) + Playwright (E2E)
- **Code Quality**: ESLint 9 + Prettier 3

## Nuxt 4 Architecture

### Directory Structure

```
app/              # Main application code (NEW in Nuxt 4)
├── assets/       # Static assets (processed by bundler)
├── components/   # Auto-imported components
├── composables/  # Auto-imported composition functions
├── layouts/      # Layout wrappers
├── middleware/   # Route middleware
├── pages/        # File-based routing
├── plugins/      # Vue plugins
├── stores/       # Pinia stores
└── utils/        # Client utilities

server/           # Server-side code (Nitro)
├── api/          # API endpoints
├── middleware/   # Server middleware
├── plugins/      # Server plugins
├── routes/       # Server routes
└── utils/        # Server utilities

shared/           # Code shared between app and server
├── types/        # Shared TypeScript types
├── constants.ts  # Shared constants
└── utils.ts      # Shared utilities
```

## Code Review Priorities

When reviewing code, prioritize these aspects:

1. **Nuxt 4 Structure** - Use app/ directory correctly
2. **Auto-imports** - Leverage Nuxt's auto-imports
3. **SSR Compatibility** - Code must work on server and client
4. **Type Safety** - TypeScript strict mode
5. **Performance** - Server-side rendering optimizations

## Nuxt 4 Specific Guidelines

### NuxtUI Components

Project ini menggunakan **NuxtUI** sebagai UI library utama. Semua komponen NuxtUI di-auto-import dengan prefix `U`.

```vue
<!-- ✅ GOOD: Use NuxtUI components -->
<template>
  <!-- Button with variants -->
  <UButton variant="solid">Submit</UButton>
  <UButton variant="soft" color="green">Success</UButton>

  <!-- Input with icon -->
  <UInput v-model="search" icon="i-heroicons-magnifying-glass" placeholder="Search..." />

  <!-- Form with validation -->
  <UForm :state="state" @submit="onSubmit">
    <UFormGroup label="Email" name="email">
      <UInput type="email" v-model="state.email" />
    </UFormGroup>
    <UButton type="submit">Submit</UButton>
  </UForm>

  <!-- Card -->
  <UCard>
    <template #header>
      <h3>Title</h3>
    </template>
    <p>Content</p>
  </UCard>

  <!-- Modal -->
  <UModal v-model="isOpen">
    <UCard>
      <p>Modal content</p>
    </UCard>
  </UModal>
</template>
```

**Available Components:**

- `UButton`, `UInput`, `USelect`, `UTextarea`, `UCheckbox`, `URadio`
- `UForm`, `UFormGroup` - Form with Zod validation
- `UCard`, `UModal`, `UDropdown`, `UTooltip`, `UBadge`
- `UTable`, `UPagination`, `UTabs`, `UAccordion`
- `UNotification`, `UAlert`, `USkeleton`

**Icon Convention:**

- Use `i-{set}-{icon}` format: `i-heroicons-home`, `i-lucide-search`, `i-simple-icons-github`

### Custom Components

Only create custom components for domain-specific UI not covered by NuxtUI:

```typescript
// ✅ GOOD: Domain-specific component in app/components/
// app/components/common/UserAvatar.vue

<script setup lang="ts">
interface Props {
  user: User
  size?: 'sm' | 'md' | 'lg'
}
withDefaults(defineProps<Props>(), {
  size: 'md'
})
</script>

<template>
  <div :class="['avatar', size]">
    <img :src="user.avatar" :alt="user.name" />
    <span>{{ user.initials }}</span>
  </div>
</template>
```

❌ **BAD:** Don't create components that duplicate NuxtUI (Button, Input, Modal, Card, Table, etc.)

### App Directory Usage

```typescript
// ✅ GOOD: Place custom components in app/components/
// These are auto-imported throughout the app
// For UI components, use NuxtUI (UButton, UInput, etc.)

// app/components/common/UserCard.vue - Domain-specific component
<script setup lang="ts">
interface Props {
  user: User
}
defineProps<Props>()
</script>

<template>
  <UCard>
    <div class="flex items-center gap-4">
      <img :src="user.avatar" :alt="user.name" class="size-10 rounded-full" />
      <div>
        <h3 class="font-medium">{{ user.name }}</h3>
        <p class="text-sm text-gray-500">{{ user.email }}</p>
      </div>
    </div>
  </UCard>
</template>
```

### Auto-Imported Composables

```typescript
// ✅ GOOD: Use Nuxt's auto-imported composables
// No import needed - automatically available in app/

// In app/pages/index.vue
<script setup lang="ts">
// These are auto-imported:
const route = useRoute()
const router = useRouter()
const config = useRuntimeConfig()
const { data, pending } = await useFetch('/api/users')
</script>
```

### Custom Composables

```typescript
// ✅ GOOD: Create reusable composables in app/composables/
// app/composables/useCounter.ts

export const useCounter = (initialValue = 0) => {
  const count = ref(initialValue)

  const increment = () => {
    count.value++
  }

  return {
    count,
    increment,
  }
}

// Auto-imported - no import needed!
// const { count, increment } = useCounter()
```

### Server-Side Data Fetching

Project ini menyediakan custom composable `useApi` untuk semua pemanggilan API internal. `useApi` menggabungkan `useFetch` dan `$fetch` dengan automatic authentication, error handling, dan redirect 401.

```vue
<!-- ✅ GOOD: Use useApi for API calls -->
<script setup lang="ts">
// GET request - SSR data fetching
const { data: users, pending, error } = await useApi('/api/users')

// POST request - mutation (immediate: false)
const { data, execute } = useApi('/api/users', {
  method: 'POST',
  body: { name: 'John', email: 'john@example.com' },
})

// Trigger manual
await execute()
</script>

<template>
  <div v-if="pending">Loading...</div>
  <div v-else-if="error">Error: {{ error.message }}</div>
  <ul v-else>
    <li v-for="user in users?.data" :key="user.id">{{ user.name }}</li>
  </ul>
</template>
```

**Properties:**

- `data` - Response data (`Ref<ApiResponse<T> | null>`)
- `error` - Error dengan `message` property (`Ref<ApiErrorResponse | null>`)
- `pending` - Loading state
- `status` - Request status: `'idle' | 'pending' | 'success' | 'error'`
- `execute` - Trigger manual request
- `refresh` - Re-fetch data
- `clear` - Reset state

**Catatan:** Gunakan `useFetch` atau `useAsyncData` langsung hanya untuk kasus khusus yang tidak tercover oleh `useApi`.

### API Routes (server/api/)

```typescript
// ✅ GOOD: Define API endpoints in server/api/
// server/api/users/[id].ts

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')

  // Validate input
  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'User ID is required',
    })
  }

  // Fetch data
  const user = await fetchUser(id)

  if (!user) {
    throw createError({
      statusCode: 404,
      statusMessage: 'User not found',
    })
  }

  return user
})
```

### HTTP Methods for API Routes

```typescript
// ✅ GOOD: Define different HTTP methods
// server/api/users/index.get.ts - GET /api/users
export default defineEventHandler(() => {
  return { users: [] }
})

// server/api/users/index.post.ts - POST /api/users
export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  // Create user
  return { created: true }
})

// server/api/users/[id].delete.ts - DELETE /api/users/:id
export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  // Delete user
  return { deleted: true }
})
```

### Server Utilities (server/utils/)

```typescript
// ✅ GOOD: Shared server utilities in server/utils/
// server/utils/db.ts

let db: any = null

export const getDatabase = () => {
  if (!db) {
    db = connectToDatabase()
  }
  return db
}

// Use in API routes
// server/api/users/index.ts
import { getDatabase } from '~/server/utils/db'

export default defineEventHandler(() => {
  const db = getDatabase()
  return db.users.findAll()
})
```

### Shared Code (shared/)

```typescript
// ✅ GOOD: Code used by both app and server goes in shared/
// shared/types/user.ts

export interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'user' | 'guest'
}

export type CreateUserDto = Omit<User, 'id'>
export type UpdateUserDto = Partial<CreateUserDto>

// Can be imported in both app and server
// import type { User } from '~/shared/types/user'
```

## SSR Best Practices

### Client-Only Components

```vue
<!-- ❌ BAD: Browser-only APIs directly used -->
<template>
  <div>{{ localStorage.getItem('theme') }}</div>
</template>

<!-- ✅ GOOD: Use ClientOnly wrapper -->
<template>
  <ClientOnly>
    <div>{{ localStorage.getItem('theme') }}</div>
  </ClientOnly>
</template>

<!-- ✅ GOOD: Or check process.client -->
<script setup lang="ts">
const theme = ref('')

if (process.client) {
  theme.value = localStorage.getItem('theme') || 'light'
}
</script>
```

### Process Checks

```typescript
// ✅ GOOD: Check environment before using platform APIs
const initializeAnalytics = () => {
  if (process.client) {
    // Client-only code
    window.gtag?.('config', 'GA_MEASUREMENT_ID')
  }

  if (process.server) {
    // Server-only code
    console.log('Running on server')
  }
}
```

### State Hydration

```typescript
// ✅ GOOD: Use useState for shared state between server and client
// app/pages/index.vue

const counter = useState('counter', () => 0)

const increment = () => {
  counter.value++
}

// State is hydrated from server to client automatically
```

## Middleware Usage

### Route Middleware (app/middleware/)

```typescript
// ✅ GOOD: Named middleware for route protection
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
  middleware: 'auth'  // Apply auth middleware
})
</script>
```

### Server Middleware (server/middleware/)

```typescript
// ✅ GOOD: Server middleware for request handling
// server/middleware/cors.ts

export default defineEventHandler((event) => {
  // Add CORS headers
  setHeaders(event, {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
  })
})
```

## Plugin Usage

### Vue Plugins (app/plugins/)

```typescript
// ✅ GOOD: Register Vue plugins
// app/plugins/vue-tooltip.ts

export default defineNuxtPlugin((nuxtApp) => {
  // Plugin logic
  nuxtApp.provide('tooltip', (message: string) => {
    console.log('Tooltip:', message)
  })
})

// Use in components
// const { $tooltip } = useNuxtApp()
// $tooltip('Hello!')
```

### Server Plugins (server/plugins/)

```typescript
// ✅ GOOD: Server plugins for Nitro
// server/plugins/database.ts

export default defineNitroPlugin((nitroApp) => {
  console.log('Nitro plugin initialized')

  // Connect to database
  nitroApp.hooks.hook('request', async (event) => {
    // Run on every request
  })
})
```

## Layouts Usage

```vue
<!-- ✅ GOOD: Create layouts in app/layouts/ -->
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
      <slot />
      <!-- Page content renders here -->
    </main>

    <footer>
      <p>&copy; {{ new Date().getFullYear() }}</p>
    </footer>
  </div>
</template>
```

```vue
<!-- Use layout in page -->
<script setup lang="ts">
definePageMeta({
  layout: 'default',
})
</script>
```

## Error Handling

```vue
<!-- ✅ GOOD: Create error page in app/error.vue -->
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

## TypeScript Best Practices

### Auto-Imported Types

```typescript
// ✅ GOOD: Types can also be auto-imported
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
// const user = ref<User | null>(null)
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
      apiBase: process.env.API_BASE_URL || '/api',
    },
  },
})

// Use in app
const config = useRuntimeConfig()
const apiBase = config.public.apiBase // Available on client and server
const apiSecret = config.apiSecret // Server-only
```

## Performance Optimization

### Lazy Loading

```vue
<!-- ✅ GOOD: Lazy load heavy components -->
<script setup lang="ts">
const HeavyChart = defineAsyncComponent(() => import('~/components/features/HeavyChart.vue'))
</script>

<template>
  <HeavyChart v-if="showChart" />
</template>
```

### Image Optimization

```vue
<!-- ✅ GOOD: Use Nuxt Image for optimized images -->
<template>
  <NuxtImg src="/images/hero.jpg" width="800" height="600" loading="lazy" format="webp" />
</template>
```

### Caching Strategies

```typescript
// ✅ GOOD: Use route rules for caching
// nuxt.config.ts
export default defineNuxtConfig({
  routeRules: {
    // Static page - cache for 1 hour
    '/': { isr: 3600 },
    // API endpoint - cache for 1 minute
    '/api/products': { isr: 60 },
    // Dynamic page - no caching
    '/admin/**': { isr: false },
    // Static assets - cache for 1 year
    '/images/**': { isr: 31536000 },
  },
})
```

## Testing Guidelines

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
  server: true,
})

describe('API Endpoints', () => {
  it('GET /api/users returns users', async () => {
    const users = await $fetch('/api/users')

    expect(users).toBeDefined()
    expect(Array.isArray(users)).toBe(true)
  })
})
```

## Common Anti-Patterns to Avoid

```typescript
// ❌ BAD: Direct import of components (not needed with auto-import)
import Button from '~/components/Button.vue'  // Wrong!

// ✅ GOOD: Use auto-import (and use NuxtUI for UI components)
<UButton>Click me</UButton>

// ❌ BAD: Creating custom components that duplicate NuxtUI
// app/components/common/Button.vue
// Don't do this! Use <UButton> instead.

// ✅ GOOD: Use NuxtUI components for UI primitives
<UButton variant="solid">Submit</UButton>
<UInput v-model="value" placeholder="Enter..." />
<UModal v-model="isOpen">...</UModal>

// ❌ BAD: Using Vue Router directly (use Nuxt's composables)
import { useRouter } from 'vue-router'  // Wrong!

// ✅ GOOD: Use Nuxt's router composable
const router = useRouter()

// ❌ BAD: Fetching data in onMounted (won't work on SSR)
onMounted(async () => {
  const data = await fetch('/api/users')  // Wrong!
})

// ❌ BAD: Direct useFetch without auth/error handling wrapper
const { data } = await useFetch('/api/users')

// ✅ GOOD: Use useApi for internal API calls
const { data } = await useApi('/api/users')

// ✅ GOOD: Use useFetch/useAsyncData for special cases only
const { data } = await useAsyncData('time', () => $fetch('/api/time'))
```

## Code Review Checklist

Before approving code, verify:

- [ ] Files are in correct directory (app/, server/, shared/)
- [ ] Auto-imports used (no unnecessary imports)
- [ ] SSR compatible (client-only code wrapped)
- [ ] TypeScript strict mode - no `any` types
- [ ] Proper error handling in API routes
- [ ] Environment variables use runtime config
- [ ] No hardcoded values or secrets
- [ ] Components use `<script setup lang="ts">`
- [ ] NuxtUI components used instead of custom duplicates (Button, Input, Modal, etc.)
- [ ] Use `useApi` for internal API calls, `useFetch`/`useAsyncData` only for special cases
- [ ] Tests added/updated (80%+ coverage)
- [ ] No `console.log` statements
- [ ] ESLint passes without warnings

## Additional Resources

- [Nuxt 4 Documentation](https://nuxt.com/docs)
- [NuxtUI Documentation](https://ui.nuxt.com/components)
- [Nuxt 4 Migration Guide](https://nuxt.com/docs/migration/overview)
- [Nitro Documentation](https://nitro.unjs.io/)
- [Vue 3 Documentation](https://vuejs.org/)
- [VueUse Composables](https://vueuse.org/)
