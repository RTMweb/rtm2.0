import { defineNuxtConfig } from 'nuxt3'


export default defineNuxtConfig({
  buildDir: './output',
  meta:{
    link:[
      {rel:"stylesheet", href:"https://pro.fontawesome.com/releases/v5.15.3/css/all.css"}
    ]
  },
  buildModules: [
    'nuxt-windicss',
    '@vueuse/nuxt',
    '@pinia/nuxt'
  ],
  modules: ['nuxt-use-motion'],
  build: {
    transpile: ['vue-agile'],
  },
  vite:{
    server: {
      
	  }
  },
  publicRuntimeConfig: {
    GOOGLE_KEY: process.env.GOOGLE_KEY
  }
  
})
