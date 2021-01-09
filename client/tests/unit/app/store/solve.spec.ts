import { Cube, Dodecaminx } from '@bedard/twister';

import {
  reset,
} from '@/app/store/solve/actions';

import {
  model,
} from '@/app/store/solve/computed';

import {
  puzzleName,
} from '@/app/store/solve/state';

describe('solve store', () => {
  beforeEach(reset);

  describe('computed', () => {
    it('creates model when puzzle id changes', () => {
      puzzleName.value = '2x2';
      expect(model.value).toBeInstanceOf(Cube);
      expect(model.value?.options.size).toBe(2);

      puzzleName.value = 'megaminx';
      expect(model.value).toBeInstanceOf(Dodecaminx);
      expect(model.value?.options.size).toBe(3);
    });
  });
});
