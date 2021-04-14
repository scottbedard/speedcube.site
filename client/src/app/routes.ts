import { RouteRecordRaw } from 'vue-router'
import { isAuthenticated, isGuest } from '@/app/store/computed'

/**
 * Route guards
 */
const guestsOnly = () => {
  if (isAuthenticated.value) return { name: 'home' }
}

const usersOnly = () => {
  if (isGuest.value) return { name: 'login' }
}

/**
 * Application routes
 */
export const routes: RouteRecordRaw[] = [
  // home
  {
    component: () => import('@/routes/Home.vue'),
    name: 'home',
    path: '/',
  },

  // account
  {
    beforeEnter: usersOnly,
    children: [
      // index
      {
        path: '',
        redirect: {
          name: 'account:profile',
        },
      },

      // profile
      {
        component: () => import('@/routes/account/Profile.vue'),
        name: 'account:profile',
        path: 'profile',
      },

      // security
      {
        component: () => import('@/routes/account/Security.vue'),
        name: 'account:security',
        path: 'security',
      },
    ],
    component: () => import('@/routes/account/Index.vue'),
    path: '/account',
  },

  // components
  {
    component: () => import('@/routes/Components.vue'),
    name: 'components',
    path: '/components',
  },

  // forgot password
  {
    beforeEnter: guestsOnly,
    component: () => import('@/routes/ForgotPassword.vue'),
    name: 'forgot-password',
    path: '/forgot-password',
  },

  // login
  {
    beforeEnter: guestsOnly,
    component: () => import('@/routes/Login.vue'),
    name: 'login',
    path: '/login',
  },

  // logout
  {
    component: () => import('@/routes/Logout.vue'),
    name: 'logout',
    path: '/logout',
  },

  // create account
  {
    beforeEnter: guestsOnly,
    component: () => import('@/routes/CreateAccount.vue'),
    name: 'create-account',
    path: '/create-account',
  },

  // reset password
  {
    beforeEnter: guestsOnly,
    component: () => import('@/routes/ResetPassword.vue'),
    name: 'reset-password',
    path: '/reset-password/:token',
  },

  // solve
  {
    component: () => import('@/routes/Solve.vue'),
    name: 'solve',
    path: '/solve/:puzzle',
  },

  // records
  {
    component: () => import('@/routes/Records.vue'),
    name: 'records',
    path: '/records/:puzzle',
  },

  // 404
  {
    component: () => import('@/routes/404.vue'),
    name: '404',
    path: '/:pathMatch(.*)*',
  },
]
