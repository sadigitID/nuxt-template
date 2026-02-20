# Nuxt 4 Template

[Nuxt](https://nuxt.com/) adalah framework full-stack berbasis Vue 3 yang mendukung **Server-Side Rendering (SSR)**, **Static Site Generation (SSG)**, dan **Client-Side Rendering (CSR)** dalam satu project. Template ini menyediakan konfigurasi Nuxt 4 siap pakai dengan TypeScript, Tailwind CSS, SEO, testing, dan best practice yang sudah di-setup sejak awal — tinggal clone dan mulai coding.

## Fitur

| Fitur          | Package                     | Deskripsi                                     |
| -------------- | --------------------------- | --------------------------------------------- |
| **Framework**  | `nuxt` v4                   | Nuxt 4 dengan struktur direktori `app/`       |
| **Bahasa**     | `typescript`                | Strict mode aktif                             |
| **UI Kit**     | `@nuxt/ui` v4               | Komponen UI berbasis Tailwind CSS             |
| **Styling**    | `tailwindcss` v4            | Utility-first CSS framework                   |
| **Icons**      | `@nuxt/icon`                | 200k+ ikon via Iconify (Lucide, Simple Icons) |
| **Images**     | `@nuxt/image`               | Optimasi gambar otomatis (avif, webp)         |
| **Fonts**      | `@nuxt/fonts`               | Optimasi font otomatis                        |
| **SEO**        | `@nuxtjs/seo`               | Sitemap, robots, OG image, schema.org         |
| **Color Mode** | `@nuxtjs/color-mode`        | Dark/light mode dengan deteksi system         |
| **State**      | `@pinia/nuxt`               | Pinia stores dengan auto-import               |
| **Utilities**  | `@vueuse/nuxt`              | 200+ Vue composition utilities                |
| **Validasi**   | `zod`                       | Validasi tipe data saat runtime               |
| **Tanggal**    | `date-fns`                  | Library utilitas tanggal                      |
| **Linting**    | `@nuxt/eslint` + `prettier` | ESLint 9 + Prettier 3                         |
| **Git Hooks**  | `husky` + `lint-staged`     | Pre-commit lint & format, validasi commit msg |
| **Unit Tests** | `vitest`                    | Unit testing cepat                            |
| **E2E Tests**  | `@playwright/test`          | Cross-browser E2E testing                     |
| **CI/CD**      | GitHub Actions              | Lint, type-check, test, build                 |
| **Docker**     | Dockerfile + Compose        | Containerisasi untuk production               |

## Quick Start

### Prasyarat

- [Node.js](https://nodejs.org/) v22+
- [pnpm](https://pnpm.io/) v9+

### Setup

```bash
# Buat project baru dari template ini
npx nuxi@latest init -t github:sadigitid/nuxt-template nama-project
cd nama-project

# Install dependencies
pnpm install

# Copy environment variables
cp .env.example .env

# Jalankan development server
pnpm dev
```

Development server berjalan di `http://localhost:3000`.

> **Apa itu `nuxi`?** `nuxi` adalah CLI resmi dari Nuxt. Perintah `npx nuxi@latest init -t github:sadigitid/nuxt-template` akan men-download template ini dari GitHub dan membuat project baru tanpa history Git — langsung siap dipakai.

> **Apa itu `pnpm`?** `pnpm` adalah package manager alternatif yang lebih cepat dan hemat disk dibanding `npm`. Install via `npm install -g pnpm` atau lihat [dokumentasi pnpm](https://pnpm.io/installation).

## Coba Dulu

Setelah menjalankan `pnpm dev`, ikuti langkah-langkah berikut untuk memastikan semuanya berjalan:

### 1. Buka Browser

Buka [http://localhost:3000](http://localhost:3000) — kamu akan melihat halaman utama template.

### 2. Cek Halaman About

Buka [http://localhost:3000/about](http://localhost:3000/about) — ini membuktikan file-based routing sudah bekerja. Setiap file `.vue` di folder `app/pages/` otomatis menjadi route.

### 3. Coba API Endpoint

Buka tab baru di browser atau jalankan:

```bash
curl http://localhost:3000/api/hello
```

Kamu akan mendapat response JSON dari server. File API di `server/api/` otomatis menjadi endpoint — tanpa perlu konfigurasi routing manual.

### 4. Coba Dark Mode

Jika template menyertakan toggle dark mode, klik tombolnya. Mode gelap/terang menggunakan `@nuxtjs/color-mode` yang otomatis mendeteksi preferensi sistem.

## Struktur Project

```
nuxt-template/
├── app/                          # Kode aplikasi (Nuxt 4)
│   ├── assets/css/               # Global CSS (entry point Tailwind)
│   ├── components/               # Komponen Vue (auto-import)
│   │   ├── common/               #   Komponen reusable (Button, Modal, dll)
│   │   └── features/             #   Komponen spesifik fitur
│   ├── composables/              # Composition functions (auto-import)
│   ├── layouts/                  # Layout wrappers
│   ├── middleware/               # Route middleware
│   ├── pages/                    # File-based routing
│   ├── plugins/                  # Vue plugins
│   ├── stores/                   # Pinia stores
│   └── utils/                    # Utilitas client
│
├── server/                       # Kode server-side (Nitro)
│   ├── api/                      # API endpoints
│   ├── middleware/                # Server middleware
│   ├── plugins/                  # Server plugins
│   ├── routes/                   # Server routes
│   └── utils/                    # Utilitas server
│
├── shared/                       # Dipakai bersama oleh app dan server
│   ├── constants/                # Konstanta
│   ├── types/                    # TypeScript types
│   └── utils/                    # Utility functions
│
├── public/                       # File statis (disajikan apa adanya)
├── test/                         # File test
│   ├── unit/                     # Vitest unit tests
│   └── e2e/                      # Playwright E2E tests
│
├── nuxt.config.ts                # Konfigurasi Nuxt
├── app.config.ts                 # Konfigurasi app (runtime)
├── tsconfig.json                 # Konfigurasi TypeScript
├── eslint.config.mjs             # Konfigurasi ESLint
├── .prettierrc.json              # Konfigurasi Prettier
├── vitest.config.ts              # Konfigurasi Vitest
├── playwright.config.ts          # Konfigurasi Playwright
├── commitlint.config.mjs         # Konfigurasi Commitlint
├── Dockerfile                    # Docker build
└── docker-compose.yml            # Docker Compose
```

## Scripts

| Perintah                | Deskripsi                              |
| ----------------------- | -------------------------------------- |
| `pnpm dev`              | Jalankan development server dengan HMR |
| `pnpm build`            | Build untuk production                 |
| `pnpm generate`         | Generate static site                   |
| `pnpm preview`          | Preview hasil build production         |
| `pnpm run lint`         | Jalankan ESLint                        |
| `pnpm run lint:fix`     | Auto-fix error lint                    |
| `pnpm run format`       | Format kode dengan Prettier            |
| `pnpm run format:check` | Cek formatting tanpa mengubah file     |
| `pnpm run type-check`   | Jalankan TypeScript type checker       |
| `pnpm run test`         | Jalankan unit tests (watch mode)       |
| `pnpm run test:run`     | Jalankan unit tests sekali             |
| `pnpm run test:e2e`     | Jalankan Playwright E2E tests          |
| `pnpm run test:e2e:ui`  | Buka Playwright UI                     |

## Environment Variables

Copy `.env.example` ke `.env` lalu sesuaikan:

```bash
# Aplikasi
NUXT_PUBLIC_APP_NAME=My App           # Nama app (publik)
NUXT_PUBLIC_APP_URL=http://localhost:3000  # URL app (publik)

# API
NUXT_PUBLIC_API_BASE_URL=/api         # Base URL API (publik)
NUXT_API_SECRET=secret                # Secret API (hanya server)

# Session
NUXT_SESSION_SECRET=secret            # Secret session (hanya server)
```

Environment variable dengan prefix `NUXT_PUBLIC_` bisa diakses di client via `useRuntimeConfig().public`. Variable tanpa prefix hanya bisa diakses di server via `useRuntimeConfig()`.

## Modul yang Disertakan

### @nuxt/ui (NuxtUI)

NuxtUI adalah UI library utama yang menyediakan komponen siap pakai berbasis Tailwind CSS. Semua komponen di-auto-import:

```vue
<template>
  <!-- Button component dengan variant -->
  <UButton variant="solid">Klik saya</UButton>
  <UButton variant="soft">Soft button</UButton>
  <UButton variant="outline">Outline</UButton>

  <!-- Input dengan icon -->
  <UInput icon="i-heroicons-magnifying-glass" placeholder="Cari..." />

  <!-- Modal -->
  <UModal v-model="isOpen">
    <Placeholder />
  </UModal>

  <!-- Card -->
  <UCard>
    <template #header>
      <h3>Header</h3>
    </template>
    <p>Content</p>
  </UCard>
</template>
```

**Komponen Populer:**

- `UButton` - Button dengan berbagai variant dan sizes
- `UInput` - Input field dengan icon dan validation
- `UForm` - Form handling dengan Zod validation
- `UModal` - Modal/dialog component
- `UCard` - Card container dengan header/footer slots
- `UTable` - Data table dengan sorting dan pagination
- `UBadge` - Badge/label component
- `UDropdown` - Dropdown menu
- `UTooltip` - Tooltip component
- `UNotification` - Toast notifications

### Tailwind CSS

NuxtUI sudah termasuk konfigurasi Tailwind CSS. Gunakan utility class untuk custom styling:

```vue
<template>
  <button class="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">Klik saya</button>
</template>
```

Gunakan variant `dark:` untuk dark mode. NuxtUI menggunakan prefix `i-` untuk icon class (Heroicons default).

### @nuxtjs/seo

SEO ditangani otomatis. Atur metadata per halaman:

```vue
<script setup lang="ts">
useSeoMeta({
  title: 'Judul Halaman',
  description: 'Deskripsi halaman untuk mesin pencari',
  ogImage: '/og-image.png',
})
</script>
```

Modul ini otomatis menghasilkan sitemap, robots.txt, dan structured data.

### @nuxt/image

Gunakan `<NuxtImg>` untuk gambar yang teroptimasi:

```vue
<template>
  <NuxtImg src="/images/foto.jpg" width="800" height="600" loading="lazy" />
</template>
```

### @nuxtjs/color-mode

Dark mode dikonfigurasi dengan deteksi preferensi sistem:

```vue
<script setup lang="ts">
const colorMode = useColorMode()
colorMode.preference = 'dark' // 'light', 'dark', 'system'
</script>
```

Gunakan variant `dark:` dari Tailwind untuk style dark mode.

### @pinia/nuxt

Store di-auto-import dari `app/stores/`:

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

Gunakan 200k+ ikon dari Iconify:

```vue
<template>
  <Icon name="lucide:home" class="size-5" />
  <Icon name="simple-icons:github" class="size-5" />
</template>
```

### @vueuse/nuxt

Semua composable VueUse di-auto-import:

```vue
<script setup lang="ts">
const { width, height } = useWindowSize()
const isDark = useDark()
const { copy } = useClipboard()
</script>
```

## Docker

### Build dan jalankan

```bash
# Build image
docker build -t nuxt-app .

# Jalankan container
docker run -p 3000:3000 nuxt-app

# Atau gunakan Docker Compose
docker compose up -d
```

## Konsep Dasar Nuxt

Jika kamu baru mengenal Nuxt, berikut istilah-istilah penting yang akan sering ditemui:

| Istilah                | Penjelasan                                                                                                                          |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| **SSR**                | Server-Side Rendering — halaman di-render di server sebelum dikirim ke browser, sehingga lebih cepat dan SEO-friendly               |
| **SSG**                | Static Site Generation — halaman di-generate saat build, cocok untuk konten yang jarang berubah                                     |
| **Nitro**              | Engine server bawaan Nuxt yang menangani API routes, middleware, dan rendering di sisi server                                       |
| **Auto-import**        | Fitur Nuxt yang otomatis mengimpor komponen, composable, dan utilitas tanpa perlu menulis `import` manual                           |
| **File-based Routing** | Setiap file `.vue` di `app/pages/` otomatis menjadi route — tidak perlu konfigurasi router manual                                   |
| **Composable**         | Fungsi reusable yang menggunakan Vue Composition API (prefix `use`), misalnya `useAuth()`, `useFetch()`                             |
| **Layout**             | Komponen pembungkus halaman (header, footer, sidebar) yang bisa dipakai ulang di berbagai halaman                                   |
| **Middleware**         | Fungsi yang berjalan sebelum navigasi ke halaman tertentu, biasanya untuk pengecekan autentikasi                                    |
| **Plugin**             | Kode yang dijalankan saat aplikasi diinisialisasi, untuk mendaftarkan library atau konfigurasi global                               |
| **`useApi`**           | Custom composable untuk API calls dengan automatic auth, error handling, dan redirect 401 — wrapper cerdas atas `useFetch`/`$fetch` |
| **`useFetch`**         | Composable bawaan Nuxt untuk mengambil data dari API — otomatis bekerja di SSR dan client                                           |
| **`$fetch`**           | Fungsi fetch bawaan Nuxt (berbasis `ofetch`), digunakan di dalam store atau event handler (bukan di `<script setup>`)               |
| **Runtime Config**     | Cara Nuxt mengelola environment variable — yang ber-prefix `NUXT_PUBLIC_` bisa diakses client, sisanya hanya server                 |
| **`app/` directory**   | Struktur direktori baru di Nuxt 4 yang memisahkan kode aplikasi dari konfigurasi root project                                       |
| **`shared/`**          | Folder untuk kode yang dipakai bersama antara `app/` (client) dan `server/`                                                         |

## Sebelum Commit

Git hooks dikonfigurasi via Husky dan berjalan otomatis:

- **pre-commit** — menjalankan `lint-staged` (ESLint fix + Prettier pada file yang di-stage)
- **commit-msg** — memvalidasi format commit message via commitlint

Commit message harus mengikuti [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: tambah autentikasi user
fix: perbaiki loop redirect login
docs: update dokumentasi API
style: perbaiki alignment tombol
refactor: ekstrak logika validasi
test: tambah unit test untuk auth composable
chore: update dependencies
```

Kamu juga bisa menjalankan pengecekan secara manual:

```bash
pnpm run lint:fix     # Fix error lint
pnpm run format       # Format kode
pnpm run type-check   # Verifikasi TypeScript types
pnpm run test:run     # Jalankan unit tests
```

## Referensi

| Dokumen                  | Deskripsi                                                                                                                                               |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [RULES.md](./RULES.md)   | Aturan development, konvensi penamaan, struktur file                                                                                                    |
| [CLAUDE.md](./CLAUDE.md) | Panduan untuk AI tools (Claude, Copilot, dll) — berisi konteks teknis project agar AI bisa bantu lebih akurat. Tidak perlu dibaca manual oleh developer |

## Lisensi

Project privat. Hak cipta dilindungi.
