import type { Ref } from 'vue'
import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'

export const useMainStore = defineStore('mainStore', () => {
  const isAuthorized: Ref<boolean> = useLocalStorage('is-authorized', false)

  return { isAuthorized }
})
