import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['./test/unit/**/*.{test,spec}.{js,ts}'],
    root: '.',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: ['node_modules/', 'test/', '.nuxt/', '.output/', '**/*.d.ts'],
    },
  },
})
