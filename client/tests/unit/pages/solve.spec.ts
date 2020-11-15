import { createRouter } from '~/utils';
import { flushPromises, mount } from '@vue/test-utils';
import Solve from '@/pages/solve/solve.vue';

describe('solve', () => {
  it('redirects to 3x3 if puzzle id is missing', async () => {
    const router = await createRouter('/solve');
    const replace = jest.spyOn(router, 'replace');

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