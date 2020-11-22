import { createRouter, mountRoute } from '~/utils';
import VSolve from '@/pages/solve/solve.vue';

describe('solve', () => {
  describe('routing', () => {
    it('redirects to 3x3 if puzzle is missing', async () => {
      // no puzzle should redirect to 3x3
      const router1 = await createRouter('/solve');
      expect(router1.currentRoute.value.fullPath).toBe('/solve/3x3');

      // known puzzle should not redirect
      const router2 = await createRouter('/solve/4x4');
      expect(router2.currentRoute.value.fullPath).toBe('/solve/4x4');
    });

    it('redirects to 3x3 if puzzle is unknown', async () => {
      const { router } = await mountRoute(VSolve, '/solve/bad-puzzle', { shallow: true });
      
      expect(router.currentRoute.value.fullPath).toBe('/solve/3x3');
    });
  
    it('redirects to solve index if child param is unknown', async () => {
      // known paths should be matched
      const appearance = await createRouter('/solve/3x3/appearance');
      expect(appearance.currentRoute.value.fullPath).toBe('/solve/3x3/appearance');

      const controls = await createRouter('/solve/4x4/controls');
      expect(controls.currentRoute.value.fullPath).toBe('/solve/4x4/controls');

      // unknown paths should redirect to the puzzle's solve route
      const unknown = await createRouter('/solve/5x5/unknown');
      expect(unknown.currentRoute.value.fullPath).toBe('/solve/5x5');
    });
  });
});
