<script setup lang="ts">
useSeoMeta({
  title: 'About',
  description: 'Learn more about this Nuxt 4 template and the technologies used.',
})

const features = [
  {
    icon: 'lucide:code-2',
    title: 'TypeScript',
    description: 'Strict mode enabled for type safety',
  },
  { icon: 'lucide:palette', title: 'Tailwind CSS', description: 'Utility-first CSS framework' },
  {
    icon: 'lucide:search',
    title: 'SEO Ready',
    description: 'Built-in SEO optimization with @nuxtjs/seo',
  },
  {
    icon: 'lucide:image',
    title: 'Image Optimization',
    description: 'Automatic image optimization with @nuxt/image',
  },
  {
    icon: 'lucide:test-tube',
    title: 'Testing',
    description: 'Vitest for unit tests, Playwright for E2E',
  },
  { icon: 'lucide:moon', title: 'Dark Mode', description: 'System-aware color mode with toggle' },
]
</script>

<template>
  <div class="space-y-8">
    <section class="text-center">
      <h1 class="text-4xl font-bold tracking-tight">About</h1>
      <p class="mt-4 text-lg text-gray-600 dark:text-gray-400">
        This template includes everything you need to build a modern Nuxt application.
      </p>
    </section>

    <section class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <div
        v-for="feature in features"
        :key="feature.title"
        class="rounded-xl border border-gray-200 p-5 dark:border-gray-800"
      >
        <Icon :name="feature.icon" class="size-6 text-blue-600 dark:text-blue-400" />
        <h3 class="mt-3 font-semibold">
          {{ feature.title }}
        </h3>
        <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
          {{ feature.description }}
        </p>
      </div>
    </section>

    <section class="text-center">
      <NuxtLink
        to="/"
        class="inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
      >
        <Icon name="lucide:arrow-left" class="size-4" />
        Back to Home
      </NuxtLink>
    </section>
  </div>
</template>
