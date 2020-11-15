import { createRouter } from '~/utils';

describe('solve', () => {
  it('redirects to 3x3 if puzzle id is missing', async () => {
    const router1 = await createRouter('/solve');
    expect(router1.currentRoute.value.params.id).toBe('3x3');

    const router2 = await createRouter('/solve/4x4');
    expect(router2.currentRoute.value.params.id).toBe('4x4');
  });
});