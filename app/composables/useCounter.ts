export function useCounter(initialValue = 0) {
  const count = ref(initialValue)

  const increment = (): void => {
    count.value++
  }

  const decrement = (): void => {
    count.value--
  }

  const reset = (): void => {
    count.value = initialValue
  }

  return {
    count,
    increment,
    decrement,
    reset
  }
}
