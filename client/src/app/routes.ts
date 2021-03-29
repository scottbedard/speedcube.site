import { RouteRecordRaw } from 'vue-router'

/**
 * Application routes
 */
export const routes: RouteRecordRaw[] = [
  {
    component: () => import('@/routes/Home.vue'),
    name: 'home',
    path: '/',
  },
  {
    component: () => import('@/routes/Components.vue'),
    name: 'components',
    path: '/components',
  },
  {
    component: () => import('@/routes/Login.vue'),
    name: 'login',
    path: '/login',
  },
  {
    component: () => import('@/routes/Signup.vue'),
    name: 'signup',
    path: '/signup',
  },
  {
    component: () => import('@/routes/404.vue'),
    name: '404',
    path: '/:pathMatch(.*)*',
  },
]
