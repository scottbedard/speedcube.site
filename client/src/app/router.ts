import { createRouter, createWebHistory } from 'vue-router';

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      component: () => import('@/pages/Home.vue'),
      name: 'home',
      path: '/',
    },
    {
      component: () => import('@/pages/Signup.vue'),
      name: 'signup',
      path: '/signup',
    },
  ],
});
