<template>
  <div class="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100">
    <header class="border-b border-gray-200 dark:border-gray-800">
      <nav class="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
        <NuxtLink to="/" class="text-lg font-semibold"> Nuxt Template </NuxtLink>
        <div class="flex items-center gap-4">
          <NuxtLink
            to="/"
            class="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors"
          >
            Home
          </NuxtLink>
          <NuxtLink
            to="/about"
            class="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors"
          >
            About
          </NuxtLink>
          <ColorModeToggle />
        </div>
      </nav>
    </header>

    <main class="mx-auto max-w-5xl px-4 py-8">
      <slot />
    </main>

    <footer class="border-t border-gray-200 dark:border-gray-800">
      <div class="mx-auto max-w-5xl px-4 py-6 text-center text-sm text-gray-500 dark:text-gray-400">
        &copy; {{ new Date().getFullYear() }} Nuxt Template. All rights reserved.
      </div>
    </footer>
  </div>
</template>
