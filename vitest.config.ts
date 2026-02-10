import { defineConfig } from 'vitest/config'
import path from 'path'

export default defineConfig({
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './app'),
      '@': path.resolve(__dirname, './app'),
    },
  },
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
