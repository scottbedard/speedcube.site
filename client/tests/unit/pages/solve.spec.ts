import { flushPromises, mount } from '@vue/test-utils';
import { createRouter, createMemoryHistory } from 'vue-router';
import { routes } from '@/app/routes';
import Solve from '@/pages/solve/solve.vue';

describe('solve', () => {
  it('redirects to 3x3 if no puzzle id is provided', async () => {
    const router = createRouter({
      history: createMemoryHistory(),
      routes,
    });

    const replace = jest.spyOn(router, 'replace');

    router.push('/solve');

    await router.isReady();

    mount(Solve, {
      global: {
        plugins: [router],
      },
    });

    await flushPromises();
    
    expect(replace).toHaveBeenCalledWith({
      name: 'solve',
      params: {
        id: '3x3',
      },
    });
  });
});