import { ComputedRef, Ref } from 'vue'
export type LayoutKey = "default"
declare module "/Users/chrispowe/Documents/WebsiteRTM/node_modules/nuxt3/dist/pages/runtime/composables" {
  interface PageMeta {
    layout?: false | LayoutKey | Ref<LayoutKey> | ComputedRef<LayoutKey>
  }
}