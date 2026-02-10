<script setup lang="ts">
import type { NuxtError } from '#app'

interface Props {
  error: NuxtError
}

const props = defineProps<Props>()

const statusMessage = computed(() => {
  switch (props.error.statusCode) {
    case 404:
      return 'The page you are looking for does not exist.'
    case 500:
      return 'An internal server error occurred.'
    case 403:
      return 'You do not have permission to access this page.'
    default:
      return props.error.statusMessage || 'An unexpected error occurred.'
  }
})

const handleError = (): void => {
  clearError({ redirect: '/' })
}
</script>

<template>
  <div class="flex min-h-screen items-center justify-center bg-white dark:bg-gray-950 px-4">
    <div class="text-center">
      <h1 class="text-6xl font-bold text-gray-900 dark:text-gray-100">
        {{ error.statusCode }}
      </h1>
      <p class="mt-4 text-lg text-gray-600 dark:text-gray-400">
        {{ statusMessage }}
      </p>
      <button
        type="button"
        class="mt-8 inline-flex items-center gap-2 rounded-lg bg-gray-900 px-6 py-3 text-sm font-medium text-white hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-200 transition-colors"
        @click="handleError"
      >
        <Icon name="lucide:home" class="size-4" />
        Back to Home
      </button>
    </div>
  </div>
</template>
