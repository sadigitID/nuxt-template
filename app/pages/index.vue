<script setup lang="ts">
useSeoMeta({
  title: 'Home',
  description:
    'A production-ready Nuxt 4 template with TypeScript, NuxtUI, Tailwind CSS, and best practices.',
})

const { count, increment, decrement, reset } = useCounter()

// For reactive transform calculation
const counterValue = computed(() => (1 + count.value * 0.01).toFixed(2))

const techStack = [
  {
    icon: 'i-simple-icons-nuxtdotjs',
    name: 'Nuxt 4',
    description: 'Intuitive Vue Meta Framework',
    color: 'green',
  },
  {
    icon: 'i-simple-icons-typescript',
    name: 'TypeScript',
    description: 'Strict mode for type safety',
    color: 'blue',
  },
  {
    icon: 'i-simple-icons-tailwindcss',
    name: 'Tailwind CSS',
    description: 'Utility-first styling',
    color: 'cyan',
  },
  {
    icon: 'i-simple-icons-vuedotjs',
    name: 'Vue 3',
    description: 'The Progressive Framework',
    color: 'emerald',
  },
  {
    icon: 'i-simple-icons-vitest',
    name: 'Vitest',
    description: 'Unit testing framework',
    color: 'yellow',
  },
  {
    icon: 'i-simple-icons-playwright',
    name: 'Playwright',
    description: 'End-to-end testing',
    color: 'orange',
  },
]

const features = [
  {
    icon: 'i-heroicons-rocket-launch',
    title: 'Fast Development',
    description:
      'File-based routing, auto-imports, and hot module replacement for rapid development.',
  },
  {
    icon: 'i-heroicons-shield-check',
    title: 'Type Safe',
    description: 'Full TypeScript support with strict mode enabled for safer code.',
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
    description: 'System-aware color mode with smooth transitions and toggle.',
  },
  {
    icon: 'i-heroicons-arrow-path',
    title: 'Testing Ready',
    description: 'Vitest for unit tests and Playwright for E2E testing preconfigured.',
  },
]

const commands = [
  {
    command: 'npx nuxi@latest init -t github:sadigitid/nuxt-template',
    description: 'Create new project',
  },
  { command: 'pnpm install', description: 'Install dependencies' },
  { command: 'pnpm dev', description: 'Start development server' },
  { command: 'pnpm build', description: 'Build for production' },
]
</script>

<template>
  <div class="space-y-16">
    <!-- Hero Section -->
    <section
      class="relative overflow-hidden rounded-3xl bg-linear-to-br from-primary-50 via-primary-100 to-blue-50 p-8 text-center dark:from-primary-950/50 dark:via-gray-900/50 dark:to-gray-950/50 sm:p-12 lg:p-16"
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
          <Icon name="i-heroicons-sparkles" class="size-4" />
          <span>Production Ready</span>
        </div>

        <h1 class="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">Nuxt 4 Template</h1>

        <p class="mx-auto mt-4 max-w-2xl text-lg text-gray-600 dark:text-gray-400 sm:text-xl">
          A production-ready template with TypeScript, NuxtUI, Tailwind CSS, ESLint, Prettier,
          Vitest, and Playwright configured out of the box.
        </p>

        <div class="mt-8 flex flex-wrap items-center justify-center gap-4">
          <UButton to="/about" size="lg" icon="i-heroicons-arrow-right" trailing>
            Get Started
          </UButton>
          <UButton
            to="https://github.com/sadigitid/nuxt-template"
            target="_blank"
            rel="noopener"
            size="lg"
            color="neutral"
            variant="outline"
            icon="i-simple-icons-github"
          >
            GitHub
          </UButton>
        </div>

        <!-- Tech Stack Pills -->
        <div class="mt-12 flex flex-wrap items-center justify-center gap-3">
          <div
            v-for="tech in techStack"
            :key="tech.name"
            class="group flex items-center gap-2 rounded-full border border-gray-200 bg-white/80 px-4 py-2 text-sm font-medium text-gray-700 backdrop-blur-sm transition-all hover:scale-105 hover:border-gray-300 hover:bg-white dark:border-gray-800 dark:bg-gray-900/80 dark:text-gray-300 hover:dark:border-gray-700 hover:dark:bg-gray-900"
          >
            <Icon :name="tech.icon" class="size-5" :class="[`text-${tech.color}-500`]" />
            <span>{{ tech.name }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section>
      <div class="text-center">
        <h2 class="text-3xl font-bold tracking-tight">Everything You Need</h2>
        <p class="mt-2 text-gray-600 dark:text-gray-400">
          Packed with features to help you build faster
        </p>
      </div>

      <div class="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <UCard
          v-for="feature in features"
          :key="feature.title"
          class="p-6 group transition-all hover:shadow-lg"
        >
          <div class="flex items-start gap-4">
            <div
              class="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary-500/10 text-primary-500 transition-colors group-hover:bg-primary-500 group-hover:text-white"
            >
              <Icon :name="feature.icon" class="size-6" />
            </div>
            <div class="flex-1">
              <h3 class="font-semibold">{{ feature.title }}</h3>
              <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
                {{ feature.description }}
              </p>
            </div>
          </div>
        </UCard>
      </div>
    </section>

    <!-- Interactive Demo Section -->
    <section class="relative">
      <UCard class="p-8">
        <div class="flex flex-col items-center gap-6 lg:flex-row lg:items-start lg:gap-12">
          <div class="flex-1 text-center lg:text-left">
            <h2 class="text-2xl font-bold tracking-tight">Interactive Counter Demo</h2>
            <p class="mt-2 text-gray-600 dark:text-gray-400">
              Test Hot Module Replacement (HMR) by editing the counter composable. Changes reflect
              instantly without losing state.
            </p>
            <div
              class="mt-6 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-4 py-1.5 text-sm dark:border-gray-800 dark:bg-gray-900"
            >
              <Icon name="i-heroicons-code-bracket" class="size-4 text-gray-500" />
              <code class="text-sm">app/composables/useCounter.ts</code>
            </div>
          </div>

          <div class="flex-1">
            <div class="mx-auto max-w-sm">
              <!-- Counter Display -->
              <div class="relative mb-6 text-center">
                <div
                  class="absolute inset-0 scale-105 bg-primary-500/10 blur-2xl transition-transform duration-300"
                  :style="{ transform: `scale(${counterValue})` }"
                ></div>
                <div class="relative">
                  <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Counter Value</p>
                  <p class="text-7xl font-bold tabular-nums tracking-tight text-primary-500">
                    {{ count }}
                  </p>
                </div>
              </div>

              <!-- Counter Controls -->
              <div class="flex items-center justify-center gap-3">
                <UButton
                  icon="i-heroicons-minus"
                  variant="soft"
                  color="neutral"
                  size="lg"
                  :disabled="count <= 0"
                  @click="decrement"
                />
                <UButton icon="i-heroicons-plus" variant="solid" size="lg" @click="increment" />
                <UButton
                  icon="i-heroicons-arrow-path"
                  variant="soft"
                  color="error"
                  size="lg"
                  @click="reset"
                >
                  Reset
                </UButton>
              </div>
            </div>
          </div>
        </div>
      </UCard>
    </section>

    <!-- Commands Section -->
    <section>
      <div class="text-center">
        <h2 class="text-2xl font-bold tracking-tight">Quick Start Commands</h2>
        <p class="mt-2 text-gray-600 dark:text-gray-400">Get up and running in minutes</p>
      </div>

      <div class="mt-6 space-y-3">
        <UCard v-for="cmd in commands" :key="cmd.command" class="p-4 flex items-center gap-4">
          <div
            class="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary-500/10 text-primary-500"
          >
            <Icon name="i-heroicons-chevron-right" class="size-5" />
          </div>
          <div class="flex-1">
            <code
              class="block rounded-lg bg-gray-100 px-3 py-1.5 text-sm font-mono text-gray-800 dark:bg-gray-900 dark:text-gray-200"
            >
              {{ cmd.command }}
            </code>
          </div>
          <p class="hidden text-sm text-gray-600 dark:text-gray-400 sm:block">
            {{ cmd.description }}
          </p>
        </UCard>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="relative overflow-hidden rounded-2xl bg-gray-900 p-8 text-center sm:p-12">
      <div class="relative">
        <h2 class="text-2xl font-bold tracking-tight text-white">
          Ready to Build Something Amazing?
        </h2>
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
          <UButton to="/about" size="lg" color="neutral" variant="outline"> Learn More </UButton>
        </div>
      </div>
    </section>
  </div>
</template>
