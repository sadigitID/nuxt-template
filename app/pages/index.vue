<script setup lang="ts">
useSeoMeta({
  title: 'Home',
  description:
    'A production-ready Nuxt 4 template with TypeScript, Tailwind CSS, and best practices.',
})

const { count, increment, decrement, reset } = useCounter()
</script>

<template>
  <div class="space-y-8">
    <section class="text-center">
      <h1 class="text-4xl font-bold tracking-tight">Welcome to Nuxt 4 Template</h1>
      <p class="mt-4 text-lg text-gray-600 dark:text-gray-400">
        A production-ready template with TypeScript, Tailwind CSS, ESLint, Prettier, Vitest, and
        Playwright.
      </p>
    </section>

    <section
      class="mx-auto max-w-md rounded-xl border border-gray-200 bg-gray-50 p-6 text-center dark:border-gray-800 dark:bg-gray-900"
    >
      <h2 class="text-sm font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
        Counter Demo
      </h2>
      <p class="mt-2 text-5xl font-bold tabular-nums">
        {{ count }}
      </p>
      <div class="mt-4 flex items-center justify-center gap-2">
        <CommonButton variant="secondary" @click="decrement"> - </CommonButton>
        <CommonButton @click="increment"> + </CommonButton>
        <CommonButton variant="danger" @click="reset"> Reset </CommonButton>
      </div>
      <p class="mt-4 text-xs text-gray-500 dark:text-gray-400">
        Edit
        <code class="rounded bg-gray-200 px-1.5 py-0.5 font-mono text-xs dark:bg-gray-800"
          >app/pages/index.vue</code
        >
        to test HMR.
      </p>
    </section>

    <section class="text-center">
      <NuxtLink
        to="/about"
        class="inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
      >
        Learn more about this template
        <Icon name="lucide:arrow-right" class="size-4" />
      </NuxtLink>
    </section>
  </div>
</template>
