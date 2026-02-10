import { describe, it, expect } from 'vitest'
import { ref } from 'vue'

// Import composable using the alias
import { useCounter } from '~/composables/useCounter'

// Mock Vue's ref for testing outside Nuxt context
vi.stubGlobal('ref', ref)

describe('useCounter', () => {
  it('starts with initial value', () => {
    const { count } = useCounter(5)
    expect(count.value).toBe(5)
  })

  it('increments count', () => {
    const { count, increment } = useCounter()
    increment()
    expect(count.value).toBe(1)
  })

  it('decrements count', () => {
    const { count, decrement } = useCounter(1)
    decrement()
    expect(count.value).toBe(0)
  })

  it('resets count', () => {
    const { count, increment, reset } = useCounter(0)
    increment()
    increment()
    reset()
    expect(count.value).toBe(0)
  })
})
