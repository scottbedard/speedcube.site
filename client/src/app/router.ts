import { createRouter, createWebHistory } from 'vue-router';

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      component: () => import('@/pages/home.vue' /* webpackChunkName: 'home' */),
      name: 'home',
      path: '/',
    },
    {
      component: () => import('@/pages/signup.vue' /* webpackChunkName: 'signup' */),
      name: 'signup',
      path: '/signup',
    },
  ],
});
