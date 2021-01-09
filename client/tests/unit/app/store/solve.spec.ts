import { Cube, Dodecaminx } from '@bedard/twister';

import {
  beginSolve,
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

  describe('actions', () => {
    it.skip('beginSolve', () => {
      beginSolve();
      // sets loading state
      // fetches scramble for puzzle name
      // applies scrambled state on success
      // initiates inspection
    });
  });

  describe('computed', () => {
    it('model', () => {
      puzzleName.value = '2x2';
      expect(model.value).toBeInstanceOf(Cube);
      expect(model.value?.options.size).toBe(2);

      puzzleName.value = 'megaminx';
      expect(model.value).toBeInstanceOf(Dodecaminx);
      expect(model.value?.options.size).toBe(3);
    });
  });
});
