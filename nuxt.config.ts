// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      link: [
        {
          rel: 'preload',
          href: '/images/loading.svg',
          as: 'image',
        },
      ],
    },
  },
  runtimeConfig: {
    public: {
      liffId: process.env.NUXT_PUBLIC_LIFF_ID,
    },
  },
  modules: ['@pinia/nuxt'],
  pinia: {
    autoImports: ['defineStore', ['defineStore', 'definePiniaStore']],
  },
  build: {
    transpile: ['@vuepic/vue-datepicker'],
  },
  css: [
    '~/assets/css/main.css',
    'vue-final-modal/style.css',
    '@vuepic/vue-datepicker/dist/main.css',
  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
})
