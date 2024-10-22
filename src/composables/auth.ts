import { storeToRefs } from 'pinia'
import { useMainStore } from '../stores/main-store/index.ts'
import { useRouter } from 'vue-router'

import type { Router } from 'vue-router'
import { AppRoutes } from '../typings/enums/AppRoutes.ts'

export const useAuth = () => {
  const { isAuthorized } = storeToRefs(useMainStore())
  const router: Router = useRouter()

  function redirectByAuthStatus(): void {
    if (
      router.currentRoute.value.name === AppRoutes.AUTH &&
      isAuthorized.value
    ) {
      router.push({ name: AppRoutes.HOME })
      return
    }

    if (
      router.currentRoute.value.name !== AppRoutes.AUTH &&
      !isAuthorized.value
    ) {
      router.push({ name: AppRoutes.AUTH })
    }
    AppRoutes.AUTH
  }

  return { redirectByAuthStatus }
}
