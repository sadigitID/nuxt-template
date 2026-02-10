<script setup lang="ts">
const colorMode = useColorMode()

const toggleColorMode = (): void => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}
</script>

<template>
  <button
    type="button"
    class="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-100 transition-colors"
    aria-label="Toggle color mode"
    @click="toggleColorMode"
  >
    <Icon v-if="colorMode.value === 'dark'" name="lucide:sun" class="size-5" />
    <Icon v-else name="lucide:moon" class="size-5" />
  </button>
</template>
