import { storeToRefs } from 'pinia'
import { useMainStore } from '../stores/main-store/index.ts'
import { useRouter } from 'vue-router'
import type { Router } from 'vue-router'

export const useAuth = () => {
  const { isAuthorized } = storeToRefs(useMainStore())
  const router: Router = useRouter()

  function redirectByAuthStatus(): void {
    if (router.currentRoute.value.name === 'auth' && isAuthorized.value) {
      router.push({ name: 'home' })
      return
    }

    if (router.currentRoute.value.name !== 'auth' && !isAuthorized.value) {
      router.push({ name: 'auth' })
    }
  }

  return { redirectByAuthStatus }
}
