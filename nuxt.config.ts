import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },

  runtimeConfig: {
    public: {
      siteName: 'Leo Genot Portfolio',
      siteUrl: 'https://leogenot.github.io',
    },
  },

  future: {
    compatibilityVersion: 4,
  },


  modules: [
    '@nuxt/image',
    '@nuxtjs/seo',
    '@vueuse/nuxt',
    '@nuxtjs/device',
    '@nuxt/eslint',
    'nuxt-vitalizer',
  ],

  css: ['~/assets/css/main.css'],

  vite: {
    build: {
      sourcemap: true,
    },
    plugins: [tailwindcss()],
    optimizeDeps: {
      include: ['shallowequal', 'lodash/startCase.js'],
    },
  },

  image: {
    provider: 'sanity',
    sanity: {
      projectId: 'qe6uzeuy',
    },
  },

  experimental: { asyncContext: true },

  build: {
    transpile: ['gsap'],
  },


  compatibilityDate: '2024-10-07',

  app: {
    pageTransition: {
      name: 'page',
      mode: 'out-in',
    },
  },

  nitro: {
    compressPublicAssets: true,
    routeRules: {
      '/**': {
        headers: {
          'Content-Security-Policy': [
            'default-src * data: blob:',
            "script-src * 'self' 'unsafe-inline' 'unsafe-eval'",
            "style-src * 'self' 'unsafe-inline'",
            "connect-src * 'self'",
            "frame-ancestors 'self' https://leogenot.github.io",
          ].join('; '),
          'X-Frame-Options': 'SAMEORIGIN',
        },
      },
    },
  },

})