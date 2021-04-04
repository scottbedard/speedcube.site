import { RouteRecordRaw } from 'vue-router'
import { isAuthenticated } from '@/app/store/computed'

// guard for routes that are only visible to guests
const guestsOnly = () => {
  if (isAuthenticated.value) return { name: 'home' }
}

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
    beforeEnter: guestsOnly,
    component: () => import('@/routes/ForgotPassword.vue'),
    name: 'forgot-password',
    path: '/forgot-password',
  },
  {
    beforeEnter: guestsOnly,
    component: () => import('@/routes/Login.vue'),
    name: 'login',
    path: '/login',
  },
  {
    component: () => import('@/routes/Logout.vue'),
    name: 'logout',
    path: '/logout',
  },
  {
    beforeEnter: guestsOnly,
    component: () => import('@/routes/CreateAccount.vue'),
    name: 'create-account',
    path: '/create-account',
  },
  {
    beforeEnter: guestsOnly,
    component: () => import('@/routes/ResetPassword.vue'),
    name: 'reset-password',
    path: '/reset-password/:token',
  },
  {
    component: () => import('@/routes/404.vue'),
    name: '404',
    path: '/:pathMatch(.*)*',
  },
]
