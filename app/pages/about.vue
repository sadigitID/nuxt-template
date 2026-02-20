<script setup lang="ts">
useSeoMeta({
  title: 'About',
  description: 'Learn more about this Nuxt 4 template and the technologies used.',
})

const techStack = [
  {
    icon: 'i-simple-icons-nuxtdotjs',
    name: 'Nuxt 4',
    version: 'v4',
    description: 'Intuitive Vue Meta Framework with file-based routing and auto-imports.',
    color: 'green',
    features: ['SSR/SSG Support', 'File-based Routing', 'Auto-imports', 'TypeScript Native'],
  },
  {
    icon: 'i-simple-icons-vuedotjs',
    name: 'Vue 3',
    version: 'v3.5',
    description: 'The Progressive JavaScript Framework with Composition API.',
    color: 'emerald',
    features: ['Composition API', '<script setup>', 'Reactivity System', 'Teleport'],
  },
  {
    icon: 'i-simple-icons-typescript',
    name: 'TypeScript',
    version: 'v5',
    description: 'Strict mode enabled for maximum type safety and developer experience.',
    color: 'blue',
    features: ['Strict Mode', 'Type Inference', 'Interface Support', 'Vue TSC'],
  },
  {
    icon: 'i-simple-icons-tailwindcss',
    name: 'Tailwind CSS',
    version: 'v4',
    description: 'Utility-first CSS framework for rapid custom design development.',
    color: 'cyan',
    features: ['Utility Classes', 'Responsive Design', 'Dark Mode', 'Custom Config'],
  },
  {
    icon: 'i-simple-icons-nuxtdotjs',
    name: 'NuxtUI',
    version: 'v4',
    description: 'Fully styled and accessible components built with Tailwind CSS.',
    color: 'primary',
    features: ['Accessible', 'Theming', 'Dark Mode', 'Headless UI'],
  },
  {
    icon: 'i-simple-icons-vitest',
    name: 'Vitest',
    version: 'v3',
    description: 'Blazing fast unit testing framework powered by Vite.',
    color: 'yellow',
    features: ['Fast Execution', 'Jest Compatible', 'TypeScript', 'Watch Mode'],
  },
]

const features = [
  {
    icon: 'i-heroicons-rocket-launch',
    title: 'Production Ready',
    description:
      'Built with production in mind. Includes ESLint, Prettier, and best practices configured.',
  },
  {
    icon: 'i-heroicons-light-bulb',
    title: 'Auto-imports',
    description:
      'Components, composables, and utilities are auto-imported. No manual imports needed.',
  },
  {
    icon: 'i-heroicons-shield-check',
    title: 'Type Safe',
    description:
      'Full TypeScript support with strict mode enabled for safer, more maintainable code.',
  },
  {
    icon: 'i-heroicons-paint-brush',
    title: 'Beautiful UI',
    description: 'NuxtUI components with Tailwind CSS for a polished look out of the box.',
  },
  {
    icon: 'i-heroicons-cpu-chip',
    title: 'SEO Optimized',
    description: 'Built-in SEO optimization with sitemap, robots.txt, and meta tags.',
  },
  {
    icon: 'i-heroicons-moon',
    title: 'Dark Mode',
    description: 'System-aware color mode with smooth transitions and manual toggle.',
  },
  {
    icon: 'i-heroicons-beaker',
    title: 'Testing Ready',
    description: 'Vitest for unit tests and Playwright for E2E testing preconfigured.',
  },
  {
    icon: 'i-heroicons-server',
    title: 'API Routes',
    description: 'Build full-stack applications with server-side API routes.',
  },
  {
    icon: 'i-heroicons-arrow-path',
    title: 'HMR',
    description: 'Lightning fast Hot Module Replacement for rapid development.',
  },
]

const structure = [
  {
    title: 'app/',
    description: 'Main application code',
    items: ['components/', 'composables/', 'pages/', 'layouts/', 'middleware/', 'stores/'],
  },
  {
    title: 'server/',
    description: 'Server-side code',
    items: ['api/', 'middleware/', 'routes/', 'utils/', 'plugins/'],
  },
  {
    title: 'shared/',
    description: 'Shared code',
    items: ['types/', 'constants.ts', 'utils.ts'],
  },
]
</script>

<template>
  <div class="space-y-16">
    <!-- Hero Section -->
    <section
      class="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary-50 via-primary-100 to-blue-50 p-8 text-center dark:from-primary-950/50 dark:via-gray-900/50 dark:to-gray-950/50 sm:p-12 lg:p-16"
    >
      <!-- Background Pattern -->
      <div class="absolute inset-0 opacity-10 dark:opacity-5">
        <div
          class="absolute inset-0"
          style="
            background-image: radial-gradient(circle, currentColor 1px, transparent 1px);
            background-size: 32px 32px;
          "
        ></div>
      </div>

      <div class="relative">
        <div
          class="mb-6 inline-flex items-center gap-2 rounded-full border border-primary-200/50 bg-white/50 px-4 py-1.5 text-sm font-medium text-primary-700 backdrop-blur-sm dark:border-primary-800/50 dark:bg-gray-900/50 dark:text-primary-300"
        >
          <Icon name="i-heroicons-information-circle" class="size-4" />
          <span>About This Template</span>
        </div>

        <h1 class="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          Built for Developers
        </h1>

        <p class="mx-auto mt-4 max-w-2xl text-lg text-gray-600 dark:text-gray-400 sm:text-xl">
          A production-ready Nuxt 4 template with modern tooling, best practices, and beautiful
          components configured out of the box.
        </p>

        <div class="mt-8 flex flex-wrap items-center justify-center gap-4">
          <UButton to="/" size="lg" icon="i-heroicons-arrow-left" trailing> Back to Home </UButton>
          <UButton
            to="https://nuxt.com"
            target="_blank"
            rel="noopener"
            size="lg"
            color="neutral"
            variant="outline"
            icon="i-simple-icons-nuxtdotjs"
          >
            Nuxt Docs
          </UButton>
        </div>
      </div>
    </section>

    <!-- Tech Stack Section -->
    <section>
      <div class="text-center">
        <h2 class="text-3xl font-bold tracking-tight">Tech Stack</h2>
        <p class="mt-2 text-gray-600 dark:text-gray-400">
          Modern technologies for modern web development
        </p>
      </div>

      <div class="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <UCard
          v-for="tech in techStack"
          :key="tech.name"
          class="p-6 group transition-all hover:shadow-lg"
        >
          <div class="flex items-start gap-4">
            <div
              class="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary-500/10 text-primary-500 transition-colors group-hover:bg-primary-500 group-hover:text-white"
            >
              <Icon :name="tech.icon" class="size-6" />
            </div>
            <div class="flex-1">
              <div class="flex items-center gap-2">
                <h3 class="font-semibold">{{ tech.name }}</h3>
                <span
                  class="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600 dark:bg-gray-800 dark:text-gray-400"
                >
                  {{ tech.version }}
                </span>
              </div>
              <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
                {{ tech.description }}
              </p>
              <div class="mt-3 flex flex-wrap gap-1.5">
                <span
                  v-for="feature in tech.features"
                  :key="feature"
                  class="rounded-full bg-primary-50 px-2 py-0.5 text-xs text-primary-700 dark:bg-primary-950/50 dark:text-primary-300"
                >
                  {{ feature }}
                </span>
              </div>
            </div>
          </div>
        </UCard>
      </div>
    </section>

    <!-- Features Section -->
    <section class="relative">
      <div
        class="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900/50 dark:to-gray-950/50"
      ></div>
      <div class="p-8 sm:p-12">
        <div class="text-center">
          <h2 class="text-3xl font-bold tracking-tight">Key Features</h2>
          <p class="mt-2 text-gray-600 dark:text-gray-400">
            Everything you need to build production applications
          </p>
        </div>

        <div class="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div
            v-for="feature in features"
            :key="feature.title"
            class="flex items-start gap-4 rounded-xl border border-gray-200 bg-white/80 p-4 backdrop-blur-sm transition-all hover:border-primary-300 hover:shadow-md dark:border-gray-800 dark:bg-gray-900/80 dark:hover:border-primary-700"
          >
            <div
              class="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary-500/10 text-primary-500"
            >
              <Icon :name="feature.icon" class="size-5" />
            </div>
            <div>
              <h3 class="font-semibold">{{ feature.title }}</h3>
              <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
                {{ feature.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Project Structure Section -->
    <section>
      <div class="text-center">
        <h2 class="text-3xl font-bold tracking-tight">Project Structure</h2>
        <p class="mt-2 text-gray-600 dark:text-gray-400">Nuxt 4's new app directory structure</p>
      </div>

      <div class="mt-8 grid gap-6 sm:grid-cols-3">
        <UCard v-for="folder in structure" :key="folder.title" class="p-6">
          <template #header>
            <div class="flex items-center gap-3">
              <div
                class="flex size-10 items-center justify-center rounded-lg bg-primary-500/10 text-primary-500"
              >
                <Icon name="i-heroicons-folder" class="size-5" />
              </div>
              <div>
                <h3 class="font-mono font-semibold text-primary-600 dark:text-primary-400">
                  {{ folder.title }}
                </h3>
                <p class="text-xs text-gray-500">{{ folder.description }}</p>
              </div>
            </div>
          </template>

          <ul class="space-y-1.5">
            <li v-for="item in folder.items" :key="item" class="flex items-center gap-2 text-sm">
              <Icon name="i-heroicons-chevron-right" class="size-4 text-gray-400" />
              <code class="font-mono text-gray-700 dark:text-gray-300">{{ item }}</code>
            </li>
          </ul>
        </UCard>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="relative overflow-hidden rounded-2xl bg-gray-900 p-8 text-center sm:p-12">
      <div class="relative">
        <h2 class="text-2xl font-bold tracking-tight text-white">Ready to Start Building?</h2>
        <p class="mx-auto mt-2 max-w-xl text-gray-400">
          Clone this template and start building your next project with Nuxt 4, NuxtUI, and best
          practices already configured.
        </p>
        <div class="mt-6 flex flex-wrap items-center justify-center gap-4">
          <UButton
            to="https://github.com/sadigitid/nuxt-template"
            target="_blank"
            rel="noopener"
            size="lg"
            icon="i-simple-icons-github"
          >
            View on GitHub
          </UButton>
          <UButton to="/" size="lg" color="neutral" variant="outline"> Back Home </UButton>
        </div>
      </div>
    </section>
  </div>
</template>
