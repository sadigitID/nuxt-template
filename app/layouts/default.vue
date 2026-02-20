<template>
  <div class="min-h-screen bg-white dark:bg-gray-950 text-gray-950 dark:text-gray-50">
    <header
      class="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-md dark:border-gray-800 dark:bg-gray-950/80"
    >
      <nav class="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <NuxtLink to="/" class="flex items-center gap-2">
          <div
            class="flex size-8 items-center justify-center rounded-lg bg-primary-500 text-white shadow-lg shadow-primary-500/25"
          >
            <Icon name="i-heroicons-sparkles" class="size-5" />
          </div>
          <span class="hidden text-lg font-semibold sm:block">Nuxt Template</span>
        </NuxtLink>

        <div class="flex items-center gap-2">
          <UNavigationMenu :items="navigationLinks" class="hidden md:flex" />

          <div class="flex items-center gap-1">
            <UButton
              to="/"
              icon="i-heroicons-home"
              variant="ghost"
              color="neutral"
              class="md:hidden"
            />
            <UButton
              to="/about"
              icon="i-heroicons-information-circle"
              variant="ghost"
              color="neutral"
              class="md:hidden"
            />
            <CommonColorModeToggle />
          </div>
        </div>
      </nav>
    </header>

    <main class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <slot />
    </main>

    <footer class="border-t border-gray-200 dark:border-gray-800">
      <div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div class="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div class="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <Icon name="i-heroicons-sparkles" class="size-4 text-primary-500" />
            <span>&copy; {{ new Date().getFullYear() }} Nuxt Template</span>
          </div>

          <div class="flex items-center gap-4">
            <UButton
              to="https://github.com/sadigitid/nuxt-template"
              target="_blank"
              rel="noopener"
              icon="i-simple-icons-github"
              variant="ghost"
              color="neutral"
              size="sm"
            >
              GitHub
            </UButton>
            <UButton
              to="https://nuxt.com"
              target="_blank"
              rel="noopener"
              icon="i-simple-icons-nuxtdotjs"
              variant="ghost"
              color="neutral"
              size="sm"
            >
              Nuxt
            </UButton>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const navigationLinks = ref<NavigationMenuItem[]>([
  {
    label: 'Home',
    icon: 'i-heroicons-home',
    to: '/',
  },
  {
    label: 'About',
    icon: 'i-heroicons-information-circle',
    to: '/about',
  },
])
</script>
