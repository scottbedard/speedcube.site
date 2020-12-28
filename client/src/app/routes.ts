import { isAuthenticated } from '@/app/store/user/getters';
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
  // account
  //
  {
    beforeEnter(to, from, next) {
      if (!isAuthenticated.value) {
        return next({
          name: 'login',
          query: { to: to.path },
        });
      }

      next();
    },
    children: [
      {
        component: () => import('@/pages/account/profile/profile.vue' /* webpackChunkName: 'account-profile' */),
        name: 'account-profile',
        path: 'profile',
      },
      {
        component: () => import('@/pages/account/security/security.vue' /* webpackChunkName: 'account-security' */),
        name: 'account-security',
        path: 'security',
      },
    ],
    component: () => import('@/pages/account/account.vue' /* webpackChunkName: 'account' */),
    path: '/account',
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
    beforeEnter(to, from, next) {
      if (isAuthenticated.value) {
        return next({
          name: 'solve',
          params: { puzzle: '3x3' },
        });
      }

      next();
    },
    component: () => import('@/pages/login.vue' /* webpackChunkName: 'login' */),
    name: 'login',
    path: '/login',
  },

  //
  // logout
  //
  {
    beforeEnter(to, from, next) {
      if (!isAuthenticated.value) {
        return next({ name: 'login' });
      }

      next();
    },
    component: () => import('@/pages/logout.vue' /* webpackChunkName: 'logout' */),
    name: 'logout',
    path: '/logout',
  },

  //
  // puzzles
  //
  {
    component: () => import('@/pages/puzzles.vue' /* webpackChunkName: 'puzzles' */),
    name: 'puzzles',
    path: '/puzzles',
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
    beforeEnter(to, from, next) {
      if (isAuthenticated.value) {
        return next({
          name: 'solve',
          params: { puzzle: '3x3' },
        });
      }

      next();
    },
    component: () => import('@/pages/signup.vue' /* webpackChunkName: 'signup' */),
    name: 'signup',
    path: '/signup',
  },

  //
  // solve
  //
  {
    path: '/solve',
    redirect: {
      name: 'solve',
      params: { puzzle: '3x3' },
    },
  },
  {
    children: [
      {
        component: () => import('@/pages/solve/config/config.vue' /* webpackChunkName: 'solve-config' */),
        name: 'solve-config',
        path: 'config',
      },
      {
        component: () => import('@/pages/solve/controls/controls.vue' /* webpackChunkName: 'solve-controls' */),
        name: 'solve-controls',
        path: 'controls',
      },
      {
        component: () => import('@/pages/solve/index/index.vue' /* webpackChunkName: 'solve' */),
        name: 'solve',
        path: '',
      },
      {
        redirect: { name: 'solve' },
        path: ':any+',
      },
    ],
    component: () => import('@/pages/solve/solve.vue' /* webpackChunkName: 'solve' */),
    path: '/solve/:puzzle',
  },

  //
  // users
  //
  {
    component: () => import('@/pages/users/index.vue' /* webpackChunkName: 'users' */),
    name: 'users',
    path: '/users',
  },

  //
  // users user
  //
  {
    component: () => import('@/pages/users/user/index.vue' /* webpackChunkName: 'users-user' */),
    name: 'users-user',
    path: '/users/:username',
  },

  //
  // 404
  //
  {
    component: () => import('@/pages/404.vue' /* webpackChunkName: '404' */),
    name: '404',
    path: '/:path(.*)*',
  },
];
