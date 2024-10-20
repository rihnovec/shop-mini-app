import {storeToRefs} from 'pinia'
import {useMainStore} from '@/stores/main-store/index.js'
import {useRouter} from 'vue-router'

export const useAuth = () => {
  const {isAuthorized} = storeToRefs(useMainStore())
  const router = useRouter()

  function redirectByAuthStatus() {
    if (router.currentRoute.value.name === 'auth' && isAuthorized.value) {
      router.push({name: 'home'})
      return
    }

    if (router.currentRoute.value.name !== 'auth' && !isAuthorized.value) {
      router.push({name: 'auth'})
    }
  }

  return {redirectByAuthStatus}
}
