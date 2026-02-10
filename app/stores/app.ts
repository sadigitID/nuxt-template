import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', () => {
  const sidebarOpen = ref(false)
  const isLoading = ref(false)

  function toggleSidebar(): void {
    sidebarOpen.value = !sidebarOpen.value
  }

  function setLoading(value: boolean): void {
    isLoading.value = value
  }

  return {
    sidebarOpen,
    isLoading,
    toggleSidebar,
    setLoading,
  }
})
