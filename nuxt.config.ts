// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  future: {
    compatibilityVersion: 4,
  },

  // Nuxt 4 app directory structure
  srcDir: 'app',

  // Development tools
  devtools: { enabled: true },

  // Modules
  modules: ['@nuxt/eslint', '@nuxt/icon', '@nuxtjs/tailwindcss', '@pinia/nuxt'],

  // TypeScript
  typescript: {
    strict: true,
    typeCheck: true,
  },

  // CSS
  css: ['~/assets/css/main.css'],

  // App config
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
    },
  },

  // Vite
  vite: {
    resolve: {
      alias: {
        '@': '.',
        '~': '.',
        '~~': '.',
        '@@': '.',
      },
    },
  },

  // Nitro server configuration
  nitro: {
    experimental: {
      wasm: true,
    },
  },

  // Internationalization (optional, can be configured)
  // i18n: {
  //   locales: ['en', 'id'],
  //   defaultLocale: 'en',
  // },
})
