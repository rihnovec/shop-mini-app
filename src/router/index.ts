import { createRouter, createWebHistory } from 'vue-router'
import type { Router, RouteComponent } from 'vue-router'
import HomePage from '../views/HomePage.vue'

const router: Router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
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
