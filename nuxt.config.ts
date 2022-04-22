import { defineNuxtConfig } from 'nuxt'


export default defineNuxtConfig({
  meta:{
    link:[
      {rel:"stylesheet", href:"https://pro.fontawesome.com/releases/v5.15.3/css/all.css"}
    ]
  },
  buildModules: [
    '@pinia/nuxt',
    '@vueuse/nuxt',
    'nuxt-windicss',
  ],
  runtimeConfig: {
    notionKey: process.env.NOTION_KEY, // variables that can only be accessed on server-side
    notionDB: process.env.NOTION_DB, // variables that can only be accessed on server-side
    public: {
      googleKey: process.env.GOOGLE_KEY,
      BASE_URL: process.env.BASE_URL || 'https://nuxtjs.org'
    }
  },
  // modules: ['nuxt-use-motion'],
})
