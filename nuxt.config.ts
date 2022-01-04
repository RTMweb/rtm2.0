import { defineNuxtConfig } from 'nuxt3'


export default defineNuxtConfig({
  meta:{
    link:[
      {rel:"stylesheet", href:"https://pro.fontawesome.com/releases/v5.15.3/css/all.css"}
    ]
  },
  buildModules: [
    'nuxt-windicss',
    '@vueuse/core/nuxt'
  ],
  windicss: {
    analyze: true
  },
  build: {
    transpile: ['vue-agile'],
  },
  publicRuntimeConfig: {
    GOOGLE_KEY: process.env.GOOGLE_KEY
  }
  
})
