import { createRouter as vueCreateRouter, createMemoryHistory } from 'vue-router';
import { routes } from '@/app/routes';

/**
 * Create a test router.
 */
export async function createRouter(path = '/') {
  const router = vueCreateRouter({
    history: createMemoryHistory(),
    routes,
  });

  router.push(path);

  await router.isReady();

  return router;
}