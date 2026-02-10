// @ts-check
import pluginVitest from '@vitest/eslint-plugin'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'
import { globalIgnores } from 'eslint/config'
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  globalIgnores(['**/dist/**', '**/dist-ssr/**', '**/coverage/**', '**/.output/**']),

  {
    name: 'app/vue-rules',
    files: ['**/*.vue'],
    rules: {
      'vue/no-multiple-template-root': 'off',
      'vue/require-default-prop': 'off',
      'vue/multi-word-component-names': 'off',
    },
  },

  {
    name: 'app/vitest-rules',
    ...pluginVitest.configs.recommended,
    files: ['test/**/*.{test,spec}.{js,ts}'],
  },

  {
    name: 'app/typescript-rules',
    files: ['**/*.{ts,tsx,vue}'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
    },
  },

  skipFormatting
)
