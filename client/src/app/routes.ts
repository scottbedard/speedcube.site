import { RouteRecordRaw } from 'vue-router';

/**
 * Application routes
 */
export const routes: RouteRecordRaw[] = [
  //
  // home
  //
  {
    component: () => import('@/pages/home.vue' /* webpackChunkName: 'home' */),
    name: 'home',
    path: '/',
  },

  //
  // components
  //
  {
    component: () => import('@/pages/components/components.vue' /* webpackChunkName: 'components' */),
    name: 'components',
    path: '/components',
  },

  //
  // login
  //
  {
    component: () => import('@/pages/login.vue' /* webpackChunkName: 'login' */),
    name: 'login',
    path: '/login',
  },

  //
  // logout
  //
  {
    component: () => import('@/pages/logout.vue' /* webpackChunkName: 'logout' */),
    name: 'logout',
    path: '/logout',
  },

  //
  // records
  //
  {
    component: () => import('@/pages/records.vue' /* webpackChunkName: 'records' */),
    name: 'records',
    path: '/records',
  },

  //
  // sandbox
  //
  {
    component: () => import('@/pages/sandbox.vue' /* webpackChunkName: 'sandbox' */),
    name: 'sandbox',
    path: '/sandbox',
  },

  //
  // signup
  //
  {
    component: () => import('@/pages/signup.vue' /* webpackChunkName: 'signup' */),
    name: 'signup',
    path: '/signup',
  },

  //
  // solve
  //
  {
    beforeEnter(to) {
      if (!to.params.puzzle) {
        return {
          name: 'solve',
          params: {
            puzzle: '3x3',
          },
        };
      }
    },
    component: () => import('@/pages/solve/solve.vue' /* webpackChunkName: 'solve' */),
    name: 'solve',
    path: '/solve/:puzzle?',
  },
];
