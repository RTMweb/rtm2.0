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
  build: {
    transpile: ['vue-agile'],
  },
  windicss: {
    scan: {
      dirs: ['./'],
      exclude: [
        'node_modules',
        'dist',
      ],
    },
  },
  publicRuntimeConfig: {
    GOOGLE_KEY: process.env.GOOGLE_KEY
  }
  
})
