# Aturan Development - Nuxt 4 Template

Dokumen ini mendefinisikan standar coding, konvensi penamaan, struktur file, dan best practice untuk project Nuxt 4 ini. Semua kontributor wajib mengikuti panduan ini.

> **Glosarium Singkat**
>
> - **SSR (Server-Side Rendering):** Halaman di-render di server sebelum dikirim ke browser, sehingga lebih cepat untuk pengguna dan lebih mudah diindeks mesin pencari.
> - **Auto-import:** Fitur Nuxt yang secara otomatis menyediakan komponen, composable, dan utilitas tanpa perlu menulis `import` manual di setiap file.
> - **Composable:** Fungsi reusable yang menggunakan Vue Composition API (selalu diawali prefix `use`), misalnya `useAuth()`, `useCounter()`.
> - **`useApi`:** Custom composable wrapper untuk `useFetch`/`$fetch` dengan automatic authentication via cookies, error handling yang konsisten, dan redirect otomatis ke login saat 401. Gunakan `useApi` untuk semua pemanggilan API internal.
> - **`useFetch` vs `$fetch`:** `useFetch()` digunakan di `<script setup>` untuk mengambil data (SSR-compatible). `$fetch()` digunakan di dalam store, event handler, atau konteks non-setup. **Catatan:** Untuk project ini, gunakan `useApi` sebagai pengganti keduanya.
> - **`definePageMeta`:** Macro Nuxt untuk mendefinisikan metadata halaman (layout, middleware) di dalam `<script setup>`.
> - **Nitro:** Engine server bawaan Nuxt yang menangani API routes (`server/api/`), middleware, dan rendering di sisi server.
> - **File-based Routing:** Setiap file `.vue` di `app/pages/` otomatis menjadi route — tidak perlu konfigurasi router manual.
> - **Runtime Config:** Cara Nuxt mengelola environment variable. Variable ber-prefix `NUXT_PUBLIC_` bisa diakses di client, sisanya hanya server.
> - **`app/` directory:** Struktur direktori baru di Nuxt 4 yang memisahkan kode aplikasi dari konfigurasi root project.
> - **`shared/`:** Folder untuk kode yang dipakai bersama antara `app/` (client) dan `server/`.
> - **`useState`:** Composable Nuxt untuk membuat reactive state yang aman saat hydration (data berpindah dari server ke client tanpa inkonsistensi).
> - **Hydration:** Proses di mana Vue "menghidupkan" HTML statis yang sudah di-render server agar menjadi interaktif di browser.

---

## Daftar Isi

- [Struktur Direktori](#struktur-direktori)
- [Konvensi Penamaan File](#konvensi-penamaan-file)
- [Aturan Komponen](#aturan-komponen)
- [Aturan Composable](#aturan-composable)
- [Aturan Halaman (Pages)](#aturan-halaman-pages)
- [Aturan Layout](#aturan-layout)
- [Aturan Middleware](#aturan-middleware)
- [Aturan Plugin](#aturan-plugin)
- [Aturan Store (Pinia)](#aturan-store-pinia)
- [Aturan Server API](#aturan-server-api)
- [Aturan Shared Code](#aturan-shared-code)
- [Aturan TypeScript](#aturan-typescript)
- [Aturan Tailwind CSS](#aturan-tailwind-css)
- [Aturan SSR](#aturan-ssr)
- [Aturan Data Fetching](#aturan-data-fetching)
- [Aturan Error Handling](#aturan-error-handling)
- [Aturan Testing](#aturan-testing)
- [Aturan Git Workflow](#aturan-git-workflow)
- [Aturan Performa](#aturan-performa)
- [Aturan Keamanan](#aturan-keamanan)
- [Referensi Cepat](#referensi-cepat)

---

## Struktur Direktori

Nuxt 4 menggunakan struktur `app/` directory yang memisahkan kode aplikasi dari file konfigurasi di root project. Struktur ini membuat project lebih rapi seiring bertambahnya fitur.

```
nuxt-template/
├── app/                          # Kode aplikasi (Nuxt 4)
│   ├── assets/                   # Aset statis (diproses bundler)
│   │   └── css/
│   │       └── main.css          # Global CSS (entry Tailwind)
│   ├── components/               # Komponen Vue (auto-import)
│   │   ├── common/               # Komponen reusable (Button, Modal, dll)
│   │   └── features/             # Komponen spesifik fitur (UserCard, dll)
│   ├── composables/              # Composition functions (auto-import)
│   ├── layouts/                  # Layout wrappers
│   ├── middleware/               # Route middleware (client-side)
│   ├── pages/                    # File-based routing
│   ├── plugins/                  # Vue plugins
│   ├── stores/                   # Pinia stores
│   └── utils/                    # Utilitas client (auto-import)
│
├── server/                       # Kode server-side (Nitro)
│   ├── api/                      # API endpoints (auto-routed)
│   ├── middleware/                # Server middleware
│   ├── plugins/                  # Server/Nitro plugins
│   ├── routes/                   # Server routes
│   └── utils/                    # Utilitas server (auto-import)
│
├── shared/                       # Dipakai bersama app dan server
│   ├── constants/                # Konstanta
│   ├── types/                    # TypeScript types
│   └── utils/                    # Utility functions
│
├── public/                       # File statis (disajikan apa adanya)
├── test/                         # File test
│   ├── unit/                     # Vitest unit tests
│   └── e2e/                      # Playwright E2E tests
│
├── .github/workflows/            # GitHub Actions CI/CD
├── nuxt.config.ts                # Konfigurasi Nuxt
├── app.config.ts                 # Konfigurasi app (runtime)
├── tailwind.config.ts            # Konfigurasi Tailwind CSS (jika perlu)
├── tsconfig.json                 # Konfigurasi TypeScript
├── eslint.config.mjs             # Konfigurasi ESLint
├── .prettierrc.json              # Konfigurasi Prettier
├── vitest.config.ts              # Konfigurasi Vitest
├── playwright.config.ts          # Konfigurasi Playwright
├── Dockerfile                    # Docker build
└── docker-compose.yml            # Docker Compose
```

### Aturan Penempatan File

| Jenis Kode        | Lokasi               | Auto-import |
| ----------------- | -------------------- | ----------- |
| Komponen Vue      | `app/components/`    | Ya          |
| Komponen Halaman  | `app/pages/`         | -           |
| Layout            | `app/layouts/`       | -           |
| Composable        | `app/composables/`   | Ya          |
| Utilitas Client   | `app/utils/`         | Ya          |
| Route Middleware  | `app/middleware/`    | -           |
| Vue Plugin        | `app/plugins/`       | Ya          |
| Pinia Store       | `app/stores/`        | Ya          |
| API Endpoint      | `server/api/`        | -           |
| Server Middleware | `server/middleware/` | -           |
| Utilitas Server   | `server/utils/`      | Ya          |
| Server Plugin     | `server/plugins/`    | -           |
| Shared Types      | `shared/types/`      | Ya          |
| Shared Constants  | `shared/constants/`  | Ya          |
| Shared Utilities  | `shared/utils/`      | Ya          |
| Aset Statis       | `public/`            | -           |
| Aset Bundled      | `app/assets/`        | -           |
| Unit Tests        | `test/unit/`         | -           |
| E2E Tests         | `test/e2e/`          | -           |

---

## Konvensi Penamaan File

Bagian ini menjelaskan format penamaan untuk setiap jenis file dalam project. Konsistensi penamaan memudahkan developer lain memahami isi file hanya dari namanya.

### Aturan Umum

- Gunakan **bahasa Inggris** untuk semua nama file, variable, dan komentar.
- Hindari singkatan kecuali yang sudah umum (misalnya `id`, `url`, `api`).
- Nama file harus deskriptif dan mencerminkan isinya.

### Komponen (`app/components/`)

**Konvensi: `PascalCase.vue`**

Komponen diorganisir dalam subdirektori berdasarkan kategori. Nama direktori menjadi bagian dari nama auto-import.

```
app/components/
├── common/                       # Komponen reusable domain-specific
│   ├── ColorModeToggle.vue       # -> <CommonColorModeToggle />
│   ├── UserAvatar.vue            # -> <CommonUserAvatar />
│   ├── ProductCard.vue           # -> <CommonProductCard />
│   └── SearchFilter.vue          # -> <CommonSearchFilter />
├── features/                     # Komponen spesifik fitur
│   ├── UserCard.vue              # -> <FeaturesUserCard />
│   ├── ProductList.vue           # -> <FeaturesProductList />
│   └── DashboardChart.vue        # -> <FeaturesDashboardChart />
└── layout/                       # Komponen terkait layout
    ├── Navbar.vue                # -> <LayoutNavbar />
    ├── Sidebar.vue               # -> <LayoutSidebar />
    └── Footer.vue                # -> <LayoutFooter />
```

Aturan:

- Selalu gunakan `PascalCase` untuk file komponen.
- Kelompokkan berdasarkan fungsi: `common/` untuk reusable, `features/` untuk domain-specific.
- **Jangan** membuat komponen yang duplikat dengan NuxtUI (Button, Input, Modal, Card, Table, Badge, dll).
- Nama komponen harus berupa kata benda (noun) atau frasa kata benda.
- Hindari nama generik seperti `Item.vue` atau `List.vue` tanpa konteks.

### Halaman (`app/pages/`)

**Konvensi: `kebab-case.vue`**

```
app/pages/
├── index.vue                     # Route: /
├── about.vue                     # Route: /about
├── contact.vue                   # Route: /contact
├── users/
│   ├── index.vue                 # Route: /users
│   └── [id].vue                  # Route: /users/:id (dinamis)
├── blog/
│   ├── index.vue                 # Route: /blog
│   └── [slug].vue                # Route: /blog/:slug
└── admin/
    ├── index.vue                 # Route: /admin
    └── settings.vue              # Route: /admin/settings
```

Aturan:

- Selalu gunakan `kebab-case` untuk file halaman.
- Gunakan `index.vue` untuk route root direktori.
- Gunakan `[param].vue` untuk parameter route dinamis.
- Gunakan `[...slug].vue` untuk catch-all routes.
- Direktori bersarang = route bersarang.

### Layout (`app/layouts/`)

**Konvensi: `kebab-case.vue`**

```
app/layouts/
├── default.vue                   # Layout default
├── auth.vue                      # Layout halaman auth (login, register)
└── admin.vue                     # Layout panel admin
```

### Composable (`app/composables/`)

**Konvensi: `useCamelCase.ts`**

```
app/composables/
├── useCounter.ts                 # Logika counter
├── useAuth.ts                    # State autentikasi
├── useForm.ts                    # Penanganan form
└── useNotification.ts            # Sistem notifikasi
```

Aturan:

- Selalu diawali prefix `use`.
- Setiap file meng-export satu composable utama.
- Nama harus mendeskripsikan fungsionalitasnya.

### Middleware (`app/middleware/`)

**Konvensi: `kebab-case.ts`**

```
app/middleware/
├── auth.ts                       # Cek autentikasi
├── guest.ts                      # Halaman khusus guest
└── admin-only.ts                 # Cek role admin
```

### Plugin (`app/plugins/`)

**Konvensi: `kebab-case.ts`**

```
app/plugins/
├── error-handler.ts              # Global error handler
├── analytics.client.ts           # Plugin analytics (client-only)
└── logger.server.ts              # Plugin logger (server-only)
```

Aturan:

- Gunakan suffix `.client.ts` untuk plugin yang hanya berjalan di client.
- Gunakan suffix `.server.ts` untuk plugin yang hanya berjalan di server.
- Tanpa suffix = berjalan di client dan server.

### Pinia Store (`app/stores/`)

**Konvensi: `camelCase.ts`**

```
app/stores/
├── app.ts                        # State app-wide
├── auth.ts                       # State autentikasi
└── user.ts                       # State user
```

Aturan:

- Nama store di `defineStore()` harus sesuai nama file.
- Gunakan Setup Store syntax (Composition API), bukan Options Store.

### Server API Routes (`server/api/`)

**Konvensi: `kebab-case.method.ts`**

```
server/api/
├── hello.get.ts                  # GET  /api/hello
├── health.get.ts                 # GET  /api/health
├── users/
│   ├── index.get.ts              # GET  /api/users
│   ├── index.post.ts             # POST /api/users
│   ├── [id].get.ts               # GET  /api/users/:id
│   ├── [id].put.ts               # PUT  /api/users/:id
│   └── [id].delete.ts            # DELETE /api/users/:id
└── auth/
    ├── login.post.ts             # POST /api/auth/login
    └── logout.post.ts            # POST /api/auth/logout
```

Aturan:

- Selalu gunakan suffix HTTP method: `.get.ts`, `.post.ts`, `.put.ts`, `.delete.ts`, `.patch.ts`.
- Gunakan `[param]` untuk parameter dinamis.
- Kelompokkan endpoint terkait dalam subdirektori.

### Utilitas Server (`server/utils/`)

**Konvensi: `kebab-case.ts` atau `camelCase.ts`**

```
server/utils/
├── response.ts                   # Helper response
├── validation.ts                 # Utilitas validasi
└── auth.ts                       # Utilitas auth
```

### Shared Code (`shared/`)

**Konvensi: `kebab-case.ts` untuk file, `kebab-case/` untuk direktori**

```
shared/
├── types/
│   └── index.ts                  # Semua shared types
├── constants/
│   └── index.ts                  # Semua shared constants
└── utils/
    └── index.ts                  # Semua shared utilities
```

### File Test (`test/`)

**Konvensi: `kebab-case.spec.ts` atau `kebab-case.test.ts`**

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

## Aturan Komponen

Bagian ini mengatur bagaimana komponen Vue harus ditulis. Urutan yang konsisten membuat kode lebih mudah dibaca dan di-review, terutama saat project berkembang dengan banyak kontributor.

### Urutan Template

Selalu susun file Vue SFC dalam urutan ini:

```vue
<script setup lang="ts">
// Konten
</script>

<template>
  <!-- Template -->
</template>

<style scoped>
/* Style (utamakan class Tailwind di template) */
</style>
```

### Urutan di Script Setup

Ikuti urutan ini di dalam `<script setup>`:

```vue
<script setup lang="ts">
// 1. Page Meta (hanya di halaman)
definePageMeta({
  layout: 'default',
  middleware: ['auth'],
})

// 2. SEO Meta (hanya di halaman)
useSeoMeta({
  title: 'Judul Halaman',
  description: 'Deskripsi halaman',
})

// 3. Import type
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

// 6. Composable (auto-import)
const route = useRoute()
const router = useRouter()
const config = useRuntimeConfig()

// 7. Data fetching (gunakan useApi untuk API calls)
const { data, pending, error } = await useApi('/api/users')

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

### Aturan Komponen

- Selalu gunakan `<script setup lang="ts">`.
- Selalu gunakan **scoped styles** atau class Tailwind (utamakan Tailwind).
- Definisikan Props dan Emits dengan interface TypeScript.
- Gunakan `withDefaults()` untuk nilai default props.
- Jangan import komponen secara manual — mereka di-auto-import.
- Template komponen harus bersih dan mudah dibaca.

---

## Aturan Composable

Composable adalah fungsi reusable yang mengenkapsulasi logika reaktif. Dengan meletakkannya di `app/composables/`, Nuxt akan otomatis meng-import-nya di seluruh aplikasi.

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

Aturan:

- Selalu awali nama fungsi dengan `use`.
- Export named function (bukan default export).
- Return reactive refs dan methods.
- Pertimbangkan mengembalikan `readonly()` refs jika mutasi hanya boleh dilakukan melalui methods.
- Tidak boleh ada side effect saat import — side effect harus di `onMounted` atau sejenisnya.

---

## Aturan Halaman (Pages)

Setiap file di `app/pages/` otomatis menjadi route. Halaman adalah titik masuk utama bagi pengguna, jadi penting untuk selalu menyertakan SEO metadata dan mengambil data dengan cara yang SSR-compatible.

```vue
<script setup lang="ts">
// 1. Definisikan metadata halaman
definePageMeta({
  layout: 'default',
})

// 2. SEO
useSeoMeta({
  title: 'Tentang',
  description: 'Pelajari lebih lanjut tentang kami',
})

// 3. Data fetching (SSR)
const { data: users } = await useFetch('/api/users')
</script>

<template>
  <div>
    <h1>Tentang</h1>
    <!-- Konten halaman -->
  </div>
</template>
```

Aturan:

- Selalu set `useSeoMeta()` untuk SEO.
- Gunakan `useFetch()` atau `useAsyncData()` untuk pengambilan data di sisi server.
- Jangan gunakan `fetch()` atau `axios` langsung di halaman — gunakan `useFetch()`.
- Jangan ambil data di `onMounted()` — ini tidak akan bekerja dengan SSR.

---

## Aturan Layout

Layout adalah komponen pembungkus yang mendefinisikan struktur umum halaman (header, footer, sidebar). Dengan memisahkan layout, kamu bisa mengganti tampilan keseluruhan halaman hanya dengan mengubah satu baris di `definePageMeta`.

```vue
<!-- app/layouts/default.vue -->
<template>
  <div>
    <header>
      <!-- Navigasi -->
    </header>

    <main>
      <slot />
    </main>

    <footer>
      <!-- Konten footer -->
    </footer>
  </div>
</template>
```

Aturan:

- Layout harus mengandung `<slot />` untuk konten halaman.
- Jaga layout tetap minimal — logika berat harus di komponen.
- Gunakan `definePageMeta({ layout: 'nama' })` di halaman untuk memilih layout.

---

## Aturan Middleware

Middleware adalah fungsi yang berjalan sebelum navigasi ke halaman tertentu. Ada dua jenis: route middleware (client-side, di `app/middleware/`) dan server middleware (di `server/middleware/`).

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

Aturan:

- Route middleware di `app/middleware/` berjalan saat navigasi halaman.
- Server middleware di `server/middleware/` berjalan di setiap request server.
- Gunakan `defineNuxtRouteMiddleware` untuk route middleware.
- Gunakan `defineEventHandler` untuk server middleware.

---

## Aturan Plugin

Plugin adalah kode yang dijalankan saat aplikasi diinisialisasi. Gunakan plugin untuk mendaftarkan library global, menambah error handler, atau mengonfigurasi integrasi pihak ketiga.

```typescript
// app/plugins/error-handler.ts
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.config.errorHandler = (error, instance, info) => {
    // Tangani error
  }
})
```

Aturan:

- Gunakan suffix `.client.ts` untuk plugin yang hanya berjalan di client.
- Gunakan suffix `.server.ts` untuk plugin yang hanya berjalan di server.
- Gunakan `defineNuxtPlugin` untuk app plugin.
- Gunakan `defineNitroPlugin` untuk server plugin.

---

## Aturan Store (Pinia)

Pinia adalah state management resmi Vue. Gunakan store untuk state yang perlu diakses dari banyak komponen. Untuk state lokal atau yang hanya dibagi 2-3 komponen, cukup gunakan `ref()` + props/emits.

Gunakan sintaks **Setup Store** (Composition API):

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
    const { data, error } = await useApi('/api/auth/login', {
      method: 'POST',
      body: credentials,
    })

    if (error.value) {
      throw new Error(error.value.message)
    }

    user.value = data.value?.data?.user
    token.value = data.value?.data?.token
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

Aturan:

- Selalu gunakan Setup Store syntax.
- Nama store di `defineStore('nama')` harus sesuai nama file.
- Export fungsi store dengan prefix `use` dan suffix `Store`: `useAuthStore`.
- Return `readonly()` untuk state yang hanya boleh diubah via actions.
- Gunakan `useApi` untuk pemanggilan API di dalam store actions.

---

## Aturan Server API

Server API routes di `server/api/` otomatis menjadi endpoint HTTP. Nuxt menggunakan Nitro sebagai engine server, jadi setiap file langsung bisa diakses tanpa konfigurasi routing tambahan.

### Route Handlers

```typescript
// server/api/users/index.get.ts
export default defineEventHandler(async (event) => {
  const { page, perPage } = parsePaginationParams(event)

  // Ambil data
  const users = await getUsers({ page, perPage })

  // Return response terstandarisasi
  return createPaginatedResponse(users.data, {
    page,
    perPage,
    total: users.total,
  })
})

// server/api/users/index.post.ts
export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  // Validasi
  if (!body.name || !body.email) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Name dan email wajib diisi',
    })
  }

  // Buat user
  const user = await createUser(body)

  return createApiResponse(user, 'User berhasil dibuat')
})
```

Aturan:

- Selalu gunakan suffix HTTP method: `.get.ts`, `.post.ts`, `.put.ts`, `.delete.ts`.
- Selalu validasi input.
- Gunakan `createError()` untuk response error dengan status code yang tepat.
- Gunakan utility functions server (`createApiResponse`, `createPaginatedResponse`) untuk response yang konsisten.
- Gunakan `readBody()` untuk body POST/PUT/PATCH.
- Gunakan `getQuery()` untuk query parameters.
- Gunakan `getRouterParam()` untuk route parameters.

---

## Aturan Shared Code

Folder `shared/` khusus untuk kode yang benar-benar dibutuhkan oleh **kedua** sisi: `app/` (client) dan `server/`. Jika kode hanya dipakai di satu sisi, letakkan di `app/utils/` atau `server/utils/`.

### Types (`shared/types/`)

```typescript
// shared/types/index.ts

// Tipe response API
export interface ApiResponse<T> {
  success: boolean
  data: T
  message?: string
}

// Tipe domain
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

Aturan:

- Hanya letakkan kode yang dibutuhkan **kedua** sisi (`app/` dan `server/`).
- Jika kode hanya dipakai di client, taruh di `app/utils/`.
- Jika kode hanya dipakai di server, taruh di `server/utils/`.
- Kode di `shared/` tidak boleh menggunakan browser API atau Node.js-specific API.

---

## Aturan TypeScript

TypeScript strict mode memastikan tipe data diperiksa secara ketat saat development, sehingga bug bisa tertangkap lebih awal sebelum kode berjalan di production.

### Strict Mode

TypeScript strict mode aktif. Tidak ada pengecualian.

```typescript
// BENAR
function getUser(id: string): User | null { ... }

// SALAH - Tidak boleh pakai 'any'
function getUser(id: any): any { ... }
```

### Konvensi Penamaan

| Jenis          | Konvensi    | Contoh                     |
| -------------- | ----------- | -------------------------- |
| Variable       | camelCase   | `const userName = 'John'`  |
| Konstanta      | UPPER_SNAKE | `const MAX_RETRIES = 3`    |
| Function       | camelCase   | `function getUser() {}`    |
| Interface      | PascalCase  | `interface UserProfile {}` |
| Type           | PascalCase  | `type UserRole = 'admin'`  |
| Enum           | PascalCase  | `enum Status { Active }`   |
| Type Parameter | T, U, K, V  | `function map<T, U>() {}`  |

### Urutan Import

Ketika import eksplisit dibutuhkan (jarang dengan auto-import Nuxt):

```typescript
// 1. Import type
import type { User } from '~/shared/types'

// 2. Package eksternal
import { z } from 'zod'

// 3. Modul internal
import { formatDate } from '~/app/utils/format'
```

---

## Aturan NuxtUI Components

NuxtUI adalah library UI utama yang menyediakan komponen siap pakai. Semua komponen NuxtUI di-auto-import dengan prefix `U` dan tidak perlu import manual.

### Prioritas Penggunaan Komponen

1. **NuxtUI Components** — Gunakan komponen NuxtUI (`UButton`, `UInput`, dll) untuk UI umum
2. **Custom Components** — Buat komponen custom hanya untuk kasus spesifik domain yang tidak tercover NuxtUI
3. **Tailwind Classes** — Gunakan Tailwind langsung untuk styling kecil/modifikasi

### Komponen NuxtUI yang Umum

```vue
<template>
  <!-- Button dengan berbagai variant -->
  <UButton variant="solid">Solid</UButton>
  <UButton variant="soft">Soft</UButton>
  <UButton variant="outline">Outline</UButton>
  <UButton variant="ghost">Ghost</UButton>
  <UButton variant="link">Link</UButton>

  <!-- Button dengan icon -->
  <UButton icon="i-heroicons-pencil-square">Edit</UButton>
  <UButton leading-icon="i-heroicons-magnifying-glass" trailing-icon="i-heroicons-chevron-down">
    Search
  </UButton>

  <!-- Input -->
  <UInput v-model="search" placeholder="Cari..." />
  <UInput v-model="email" type="email" icon="i-heroicons-envelope" placeholder="Email" size="lg" />

  <!-- Form dengan validation -->
  <UForm :state="state" @submit="submit">
    <UFormGroup label="Name" name="name">
      <UInput v-model="state.name" />
    </UFormGroup>
    <UButton type="submit">Save</UButton>
  </UForm>

  <!-- Card -->
  <UCard>
    <template #header>
      <h3>Card Header</h3>
    </template>
    <p>Card content</p>
    <template #footer>
      <UButton>Footer Action</UButton>
    </template>
  </UCard>

  <!-- Modal -->
  <UModal v-model="isOpen">
    <UCard>
      <template #header>
        <h3>Modal Title</h3>
      </template>
      <p>Modal content</p>
    </UCard>
  </UModal>

  <!-- Table -->
  <UTable :rows="rows" :columns="columns" />

  <!-- Badge -->
  <UBadge>Default</UBadge>
  <UBadge variant="solid">Solid</UBadge>
  <UBadge color="green">Success</UBadge>

  <!-- Dropdown -->
  <UDropdown :items="items">
    <UButton>Menu</UButton>
  </UDropdown>

  <!-- Tooltip -->
  <UTooltip text="Tooltip text">
    <UButton>Hover me</UButton>
  </UTooltip>
</template>
```

### Icon Naming Convention

NuxtUI menggunakan format `i-{set}-{icon}` untuk icon class:

```vue
<template>
  <!-- Heroicons (default) -->
  <UButton icon="i-heroicons-home" />
  <Icon name="i-heroicons-user" />

  <!-- Iconify sets lain -->
  <UInput icon="i-lucide-search" />
  <Icon name="i-simple-icons-github" />
</template>
```

### Konfigurasi Tema

NuxtUI menggunakan app config untuk konfigurasi tema. Edit `app.config.ts`:

```typescript
// app.config.ts
export default defineAppConfig({
  ui: {
    primary: 'green',
    gray: 'slate',
  },
})
```

### Aturan

- Gunakan komponen NuxtUI untuk UI umum (button, input, modal, table, dll)
- Jangan membuat komponen custom yang duplikat dengan NuxtUI
- Gunakan `app.config.ts` untuk konfigurasi tema global, jangan inline styles
- Prefix icon dengan `i-` untuk class-based icon (Heroicons, Lucide, dll)

---

## Aturan Tailwind CSS

Tailwind CSS menggunakan pendekatan utility-first. NuxtUI sudah menyertakan konfigurasi Tailwind, jadi gunakan utility class untuk custom styling di luar komponen NuxtUI.

### Penggunaan

- Utamakan komponen NuxtUI daripada Tailwind class mentah
- Gunakan Tailwind class untuk modifikasi styling pada komponen NuxtUI
- Gunakan `<style scoped>` hanya jika benar-benar diperlukan
- Gunakan variant `dark:` untuk dark mode

```vue
<!-- BENAR: NuxtUI component -->
<template>
  <UButton>Submit</UButton>
</template>

<!-- BENAR: NuxtUI dengan Tailwind modifier -->
<template>
  <UButton class="w-full">Full Width Button</UButton>
</template>

<!-- BENAR: Custom element dengan Tailwind -->
<template>
  <div class="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
    Custom styled content
  </div>
</template>

<!-- HINDARI: CSS kustom untuk styling dasar -->
<style scoped>
.submit-btn {
  border-radius: 8px;
  background-color: #2563eb;
  padding: 8px 16px;
  color: white;
}
</style>
```

### Urutan Class

Ikuti urutan berikut untuk class Tailwind:

1. Layout: `flex`, `grid`, `block`, `inline`
2. Ukuran: `w-`, `h-`, `min-w-`, `max-w-`
3. Spasi: `p-`, `m-`, `gap-`
4. Tipografi: `text-`, `font-`, `leading-`
5. Background: `bg-`
6. Border: `border-`, `rounded-`
7. Efek: `shadow-`, `opacity-`
8. Transisi: `transition-`, `duration-`
9. Responsive: `sm:`, `md:`, `lg:`
10. State: `hover:`, `focus:`, `active:`
11. Dark mode: `dark:`

---

## Aturan SSR

Semua kode harus bisa berjalan di server dan client, kecuali yang secara eksplisit ditandai. Ini penting karena Nuxt secara default menggunakan SSR — halaman di-render di server terlebih dahulu.

### Aturan

```typescript
// BENAR: Cek environment
if (import.meta.client) {
  localStorage.setItem('theme', 'dark')
}

// BENAR: Gunakan wrapper ClientOnly
<ClientOnly>
  <BrowserOnlyComponent />
</ClientOnly>

// SALAH: Penggunaan browser API langsung (merusak SSR)
localStorage.setItem('theme', 'dark')
window.addEventListener('scroll', handler)
```

### Pola Umum

```typescript
// Gunakan useState untuk shared state yang aman saat hydration
const theme = useState('theme', () => 'light')

// Gunakan useCookie untuk akses cookie (berfungsi di server dan client)
const token = useCookie('auth_token')

// Gunakan useHead/useSeoMeta untuk pengelolaan head
useHead({ title: 'Halaman Saya' })
```

---

## Aturan Data Fetching

Project ini menyediakan custom composable `useApi` yang menggabungkan `useFetch` dan `$fetch` dengan automatic authentication, error handling, dan redirect 401. Gunakan `useApi` untuk semua pemanggilan API internal.

### useApi - Composable Utama

`useApi` adalah wrapper yang cerdas:

- Otomatis menggunakan `useFetch` untuk SSR/initial hydration
- Otomatis menggunakan `$fetch` untuk mutations dan client-side requests
- Mengirim cookies otomatis untuk authentication
- Redirect ke `/auth/login` saat 401 (kecuali halaman publik)
- Error handling konsisten dengan `error.value.message`

### Di Halaman/Komponen

```vue
<script setup lang="ts">
// GET request - SSR data fetching
const { data, pending, error, status } = await useApi('/api/users')

// Dengan destructuring - await memblokir sampai data siap
const { data: users } = await useApi('/api/users')

// POST request - mutation (immediate: false)
const { data, error, execute } = useApi('/api/users', {
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
    <li v-for="user in data?.data" :key="user.id">{{ user.name }}</li>
  </ul>
</template>
```

### Di Store/Functions

```typescript
// useApi juga bekerja di store
export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)

  async function login(credentials: LoginCredentials) {
    // Gunakan useApi untuk konsistensi
    const { data, error } = await useApi('/api/auth/login', {
      method: 'POST',
      body: credentials,
    })

    if (error.value) {
      throw new Error(error.value.message)
    }

    user.value = data.value?.data
  }

  return { user, login }
})
```

### API Response Format

API harus mengembalikan response dengan format standar:

```typescript
// Success response
{
  success: true,
  data: { ... },
  message?: string
}

// Error response (diset ke error.value)
{
  success: false,
  message: 'Error message here'
}
```

### Available Properties

| Property  | Type                                               | Deskripsi                       |
| --------- | -------------------------------------------------- | ------------------------------- |
| `data`    | `Ref<ApiResponse<T> \| null>`                      | Response data                   |
| `error`   | `Ref<ApiErrorResponse \| null>`                    | Error dengan `message` property |
| `pending` | `Ref<boolean>`                                     | Loading state                   |
| `status`  | `Ref<'idle' \| 'pending' \| 'success' \| 'error'>` | Request status                  |
| `execute` | `() => Promise`                                    | Trigger manual request          |
| `refresh` | `() => Promise`                                    | Re-fetch data                   |
| `clear`   | `() => void`                                       | Reset state                     |

### Aturan

- Gunakan `useApi()` untuk semua pemanggilan API internal.
- Gunakan `immediate: false` untuk mutations (POST/PUT/PATCH/DELETE).
- Akses pesan error via `error.value?.message`.
- Jangan gunakan `fetch()` atau `axios` secara langsung.
- Untuk API eksternal (third-party), gunakan `$fetch` langsung.

---

## Aturan Error Handling

Penanganan error yang baik membuat aplikasi lebih robust dan memberikan feedback yang jelas kepada pengguna saat terjadi kesalahan, baik di sisi client maupun server.

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
      statusMessage: 'User ID wajib diisi',
    })
  }

  const user = await findUser(id)

  if (!user) {
    throw createError({
      statusCode: 404,
      statusMessage: 'User tidak ditemukan',
    })
  }

  return user
})
```

### Halaman Error Global

File `app/error.vue` menangani semua error yang tidak tertangani. Gunakan `clearError()` untuk recovery.

---

## Aturan Testing

Testing memastikan fitur bekerja sesuai harapan dan tidak rusak saat ada perubahan kode. Template ini menggunakan Vitest untuk unit test dan Playwright untuk end-to-end test.

### Unit Tests (Vitest)

```typescript
import { describe, it, expect } from 'vitest'
import { useCounter } from '~/app/composables/useCounter'

describe('useCounter', () => {
  it('dimulai dengan nilai awal', () => {
    const { count } = useCounter(5)
    expect(count.value).toBe(5)
  })

  it('menaikkan count', () => {
    const { count, increment } = useCounter()
    increment()
    expect(count.value).toBe(1)
  })
})
```

### E2E Tests (Playwright)

```typescript
import { test, expect } from '@playwright/test'

test('halaman utama bisa dimuat', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('h1')).toBeVisible()
})
```

### Penamaan File Test

- Unit: `test/unit/**/*.spec.ts` atau `test/unit/**/*.test.ts`
- E2E: `test/e2e/**/*.spec.ts`

### Target Coverage

| Jenis          | Coverage Minimum |
| -------------- | ---------------- |
| Overall        | 80%              |
| Critical paths | 100%             |
| API endpoints  | 90%              |
| Komponen       | 75%              |

---

## Aturan Git Workflow

Konsistensi dalam penamaan branch dan format commit message membuat history Git lebih mudah dibaca dan memungkinkan otomasi seperti changelog generation.

### Penamaan Branch

```
feature/user-authentication       # Fitur baru
fix/login-error                   # Bug fix
refactor/api-structure            # Refactoring kode
hotfix/security-patch             # Fix urgent production
docs/update-readme                # Dokumentasi
chore/update-deps                 # Update dependencies
```

### Commit Messages

Mengikuti [Conventional Commits](https://www.conventionalcommits.org/). Ini di-enforce oleh commitlint via hook `commit-msg` Husky.

```
feat: tambah flow autentikasi user
fix: perbaiki loop redirect login
refactor: sederhanakan format response API
docs: update RULES.md dengan panduan store
test: tambah unit test untuk useCounter
chore: upgrade Nuxt ke v4.2
perf: lazy load chart dashboard
ci: tambah step type-check di CI pipeline
style: perbaiki alignment tombol di mobile
build: update konfigurasi Docker
revert: revert "feat: tambah flow autentikasi user"
```

Type yang diizinkan: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`.

### Git Hooks (Husky)

Git hooks berjalan otomatis di setiap commit:

| Hook         | Aksi                             | Tool        |
| ------------ | -------------------------------- | ----------- |
| `pre-commit` | Lint & format file yang di-stage | lint-staged |
| `commit-msg` | Validasi format commit message   | commitlint  |

**pre-commit** menjalankan `lint-staged`, yang:

- Menjalankan `eslint --fix` + `prettier --write` pada file `*.{js,ts,vue}` yang di-stage.
- Menjalankan `prettier --write` pada file `*.{json,md,yml,yaml}` yang di-stage.

**commit-msg** memvalidasi bahwa commit message mengikuti format Conventional Commits.

### Sebelum Commit

Hooks menangani lint dan format secara otomatis, tapi kamu juga bisa menjalankan pengecekan secara manual:

```bash
pnpm run lint:fix     # Fix error lint
pnpm run format       # Format kode
pnpm run type-check   # Verifikasi types
pnpm run test:run     # Jalankan unit tests
```

---

## Aturan Performa

Performa yang baik dimulai dari kebiasaan coding yang tepat. Berikut aturan-aturan yang membantu menjaga aplikasi tetap cepat, terutama saat project berkembang.

### Lazy Loading Komponen

```vue
<script setup lang="ts">
// Lazy load komponen berat
const Chart = defineAsyncComponent(() => import('~/app/components/features/Chart.vue'))
</script>
```

### Optimasi Gambar

```vue
<!-- Gunakan NuxtImg untuk gambar yang teroptimasi -->
<NuxtImg src="/images/hero.jpg" width="800" height="600" loading="lazy" format="webp" />
```

### Route Rules (Caching)

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  routeRules: {
    '/': { isr: 3600 }, // ISR: revalidasi setiap jam
    '/api/products': { isr: 60 }, // ISR: revalidasi setiap menit
    '/admin/**': { ssr: true }, // Selalu SSR
    '/static/**': { prerender: true }, // Pre-render saat build
  },
})
```

---

## Aturan Keamanan

Keamanan adalah aspek yang harus diperhatikan sejak awal development, bukan ditambahkan belakangan. Berikut aturan-aturan dasar untuk menjaga aplikasi tetap aman.

- Jangan commit secrets atau API keys — gunakan `.env` dan `runtimeConfig`.
- Selalu validasi input pengguna di sisi server.
- Gunakan `createError()` untuk response error (mencegah kebocoran detail internal).
- Terapkan security headers via server middleware.
- Sanitasi HTML jika menggunakan `v-html` (gunakan DOMPurify).
- Gunakan `readonly()` untuk refs yang tidak boleh dimutasi dari luar.

---

## Referensi Cepat

### Perintah Penting

```bash
pnpm dev              # Jalankan dev server
pnpm build            # Build untuk production
pnpm preview          # Preview build production
pnpm run lint         # Jalankan linter
pnpm run lint:fix     # Auto-fix error lint
pnpm run format       # Format kode
pnpm run type-check   # Cek TypeScript
pnpm run test         # Jalankan unit tests (watch mode)
pnpm run test:run     # Jalankan unit tests (sekali)
pnpm run test:e2e     # Jalankan E2E tests
```

### API yang Di-Auto-Import (Tanpa import)

```typescript
// Vue
ref, reactive, computed, watch, watchEffect,
onMounted, onUnmounted, nextTick, provide, inject,
defineProps, defineEmits, withDefaults

// Nuxt
useRoute, useRouter, useFetch, useAsyncData, useLazyFetch,
useApi, // Custom composable untuk API calls dengan auth & error handling
useRuntimeConfig, useState, useCookie, useHead, useSeoMeta,
useNuxtApp, useAppConfig, useError, clearError,
navigateTo, createError, definePageMeta,
defineNuxtRouteMiddleware

// VueUse (via @vueuse/nuxt)
useLocalStorage, useSessionStorage, useDark, useToggle,
useClipboard, useMediaQuery, useWindowSize, dll.
```
