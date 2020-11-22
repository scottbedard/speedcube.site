import { createRouter as vueCreateRouter, createMemoryHistory } from 'vue-router';
import { defaultsDeep } from 'lodash-es';
import { flushPromises, mount as testUtilsMount } from '@vue/test-utils';
import { RendererSymbol } from '@/components/three/types';
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

/**
 * Mount component with a router.
 */
export async function mountRoute(component: any, path = '/', options = {}) {
  const router = await createRouter(path);

  const wrapper = testUtilsMount(component, defaultsDeep({
    global: {
      plugins: [router],
      provide: {
        [RendererSymbol as symbol]: null,
      },
    },
  }, options));

  await flushPromises();

  return { wrapper, router };
}
