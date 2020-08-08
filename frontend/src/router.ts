import { createRouter, createWebHistory } from 'vue-router';

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      component: () => import('@/pages/home/Home.vue'),
      name: 'home',
      path: '/',
    },
    {
      component: () => import('@/pages/signin/Signin.vue'),
      name: 'signin',
      path: '/signin',
    },
  ],
});
