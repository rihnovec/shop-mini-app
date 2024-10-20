import {defineStore} from 'pinia'
import {useLocalStorage} from '@vueuse/core'

export const useMainStore = defineStore('mainStore', () => {
  const isAuthorized = useLocalStorage('is-authorized', false)

  return {isAuthorized}
})
