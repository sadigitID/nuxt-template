<script setup lang="ts">
const colorMode = useColorMode()

const icons = {
  light: 'i-heroicons-sun-20-solid',
  dark: 'i-heroicons-moon-20-solid',
  system: 'i-heroicons-computer-desktop-20-solid',
}

const color = computed(() => {
  if (colorMode.value === 'light') return 'amber'
  if (colorMode.value === 'dark') return 'sky'
  return 'neutral'
})

const currentIcon = computed(() => {
  return icons[colorMode.value as keyof typeof icons] || icons.system
})

const cycleColorMode = () => {
  if (colorMode.value === 'light') {
    colorMode.preference = 'dark'
  } else if (colorMode.value === 'dark') {
    colorMode.preference = 'system'
  } else {
    colorMode.preference = 'light'
  }
}
</script>

<template>
  <UButton
    :icon="currentIcon"
    :color="color as any"
    variant="ghost"
    aria-label="Toggle color mode"
    @click="cycleColorMode"
  />
</template>
