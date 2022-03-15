import { NuxtModule } from '@nuxt/schema'
declare module '@nuxt/schema' {
  interface NuxtConfig {
    ["windicss"]?: typeof import("nuxt-windicss").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    ["motion"]?: typeof import("nuxt-use-motion").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
  }
}