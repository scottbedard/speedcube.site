export const routes = [
  {
    component: () => import('@/pages/home.vue' /* webpackChunkName: 'home' */),
    name: 'home',
    path: '/',
  },
  {
    component: () => import('@/pages/components/components.vue' /* webpackChunkName: 'components' */),
    name: 'components',
    path: '/components',
  },
  {
    component: () => import('@/pages/login.vue' /* webpackChunkName: 'login' */),
    name: 'login',
    path: '/login',
  },
  {
    component: () => import('@/pages/logout.vue' /* webpackChunkName: 'logout' */),
    name: 'logout',
    path: '/logout',
  },
  {
    component: () => import('@/pages/records.vue' /* webpackChunkName: 'records' */),
    name: 'records',
    path: '/records',
  },
  {
    component: () => import('@/pages/sandbox.vue' /* webpackChunkName: 'sandbox' */),
    name: 'sandbox',
    path: '/sandbox',
  },
  {
    component: () => import('@/pages/signup.vue' /* webpackChunkName: 'signup' */),
    name: 'signup',
    path: '/signup',
  },
  {
    component: () => import('@/pages/solve/solve.vue' /* webpackChunkName: 'solve' */),
    name: 'solve',
    path: '/solve/:id?',
  },
];
