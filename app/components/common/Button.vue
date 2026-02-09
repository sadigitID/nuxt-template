<script setup lang="ts">
interface Props {
  variant?: 'primary' | 'secondary' | 'danger'
  disabled?: boolean
}

withDefaults(defineProps<Props>(), {
  variant: 'primary',
  disabled: false
})
</script>

<template>
  <button :class="['button', variant]" :disabled="disabled">
    <slot />
  </button>
</template>

<style scoped>
.button {
  padding: 0.5em 1em;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  font-weight: 500;
  transition: opacity 0.2s;
}

.button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.button.primary {
  background-color: #646cff;
  color: white;
}

.button.secondary {
  background-color: #646cff33;
  color: #646cff;
}

.button.danger {
  background-color: #ff4444;
  color: white;
}
</style>
