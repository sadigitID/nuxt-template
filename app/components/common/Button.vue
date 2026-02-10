<script setup lang="ts">
interface Props {
  variant?: 'primary' | 'secondary' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  loading?: boolean
}

withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  disabled: false,
  loading: false,
})

defineEmits<{
  click: [event: MouseEvent]
}>()
</script>

<template>
  <button
    :class="[
      'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
      {
        'bg-gray-900 text-white hover:bg-gray-800 focus:ring-gray-900 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-200 dark:focus:ring-gray-100':
          variant === 'primary',
        'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-gray-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800':
          variant === 'secondary',
        'bg-red-600 text-white hover:bg-red-700 focus:ring-red-600': variant === 'danger',
      },
      {
        'px-3 py-1.5 text-xs': size === 'sm',
        'px-4 py-2 text-sm': size === 'md',
        'px-6 py-3 text-base': size === 'lg',
      },
    ]"
    :disabled="disabled || loading"
    @click="$emit('click', $event)"
  >
    <Icon v-if="loading" name="lucide:loader-2" class="size-4 animate-spin" />
    <slot />
  </button>
</template>
