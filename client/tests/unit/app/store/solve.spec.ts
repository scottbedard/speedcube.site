import { Cube, Dodecaminx } from '@bedard/twister';
import { nextTick } from 'vue';
import createSolveFixture from '~/fixtures/create-solve';
import mockAxios from 'jest-mock-axios';

import {
  createSolve,
  reset,
} from '@/app/store/solve/actions';

import {
  model,
} from '@/app/store/solve/computed';

import {
  puzzleName,
  status,
} from '@/app/store/solve/state';

describe('solve store', () => {
  beforeEach(() => {
    reset();
    mockAxios.reset();
  });

  describe('actions', () => {
    describe('createSolve', () => {
      it('creates a solve and begins solving process', async () => {
        expect(status.value).toBe('idle');

        createSolve();

        mockAxios.mockResponseFor(
          { url: '/api/speedcube/speedcube/solves' },
          { data: createSolveFixture },
        );

        await mockAxios.lastPromiseGet();
        await nextTick();

        expect(status.value).toBe('scramble');
        expect(model.value?.isSolved()).toBe(false);
      });
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
