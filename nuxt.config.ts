// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: 'BAPLCP 活動報名系統',
      meta: [
        {
          property: 'og:title',
          content: 'BAPLCP 活動報名系統',
        },
        {
          property: 'og:description',
          content: '歡迎使用 BAPLCP 活動報名系統!',
        },
      ],
      link: [
        // google font
        {
          rel: 'preconnect',
          href: 'https://fonts.googleapis.com',
        },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossorigin: '',
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@100;300;400;500;700;900&display=swap',
        },
        // preload image
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
