import { createRouter, createWebHistory } from 'vue-router'
import type { Router } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import { AppRoutes } from '../typings/enums/AppRoutes'

const router: Router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: AppRoutes.HOME,
      component: HomePage,
    },
    // {
    //   path: '/auth',
    //   name: 'auth',
    //   component: () => import('../views/AuthPage.vue'),
    // },
    // {
    //   path: '/order',
    //   name: 'order',
    //   component: () => import('../views/OrderPage.vue'),
    // },
  ],
})

export default router
