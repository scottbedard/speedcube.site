import VueRouter from 'vue-router';
import { Store } from 'vuex';
import { RootState } from '@/app/store';

/**
 * Create routes.
 */
export function createRoutes(store: Store<RootState>) {
  return [
    {
      name: 'about',
      path: '/about',
      component: () => import('@/pages/About.vue'),
    },
    {
      name: 'home',
      path: '/',
      component: () => import('@/pages/Home.vue'),
    },
  ];
}

/**
 * Create a router.
 */
export function createRouter(store: Store<RootState>) {
  return new VueRouter({
    routes: createRoutes(store),
    mode: 'history',
  });
}
