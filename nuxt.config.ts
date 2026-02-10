// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

  // Modules
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/eslint',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/fonts',
    '@nuxtjs/seo',
    '@nuxtjs/color-mode',
    '@pinia/nuxt',
    '@vueuse/nuxt',
  ],

  // Development tools
  devtools: { enabled: true },

  // App config
  app: {
    buildAssetsDir: '/_nuxt_template/',
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      htmlAttrs: {
        lang: 'en',
      },
    },
  },

  // CSS
  css: ['~/assets/css/main.css'],

  // Vue configuration
  vue: {
    compilerOptions: {
      comments: false,
    },
  },

  // Site configuration (used by @nuxtjs/seo)
  site: {
    url: process.env.NUXT_PUBLIC_APP_URL || 'http://localhost:3000',
    name: process.env.NUXT_PUBLIC_APP_NAME || 'Nuxt App',
    description: 'A production-ready Nuxt 4 template',
    defaultLocale: 'en',
  },

  // Color mode
  colorMode: {
    classSuffix: '',
    preference: 'system',
    fallback: 'light',
  },

  // Runtime config (environment variables)
  runtimeConfig: {
    // Server-only (private) - accessed via useRuntimeConfig().xxx
    apiSecret: process.env.NUXT_API_SECRET || '',
    sessionSecret: process.env.NUXT_SESSION_SECRET || '',

    // Public (exposed to client) - accessed via useRuntimeConfig().public.xxx
    public: {
      appName: process.env.NUXT_PUBLIC_APP_NAME || 'Nuxt App',
      appUrl: process.env.NUXT_PUBLIC_APP_URL || 'http://localhost:3000',
      apiBaseUrl: process.env.NUXT_PUBLIC_API_BASE_URL || '/api',
    },
  },
  compatibilityDate: '2024-07-11',

  // Nitro server configuration
  nitro: {
    compressPublicAssets: true,
  },

  // Vite
  vite: {
    server: {
      allowedHosts: ['localhost'],
    },
  },

  // TypeScript
  typescript: {
    strict: true,
    typeCheck: true,
  },

  // ESLint configuration
  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
      },
    },
  },

  // Nuxt Fonts
  fonts: {
    defaults: {
      weights: [400, 500, 600, 700],
    },
  },

  // Nuxt Image
  image: {
    quality: 80,
    format: ['avif', 'webp'],
  },

  // Pinia
  pinia: {
    storesDirs: ['./app/stores/**'],
  },

  // Tailwind CSS
  tailwindcss: {
    exposeConfig: false,
    viewer: false,
  },
})
