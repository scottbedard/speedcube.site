import { postCreateSolve } from '@/app/repositories/solves';

import {
  model,
} from '../computed';

import {
  puzzleName,
  status,
} from '../state';

/**
 * Create a new solve.
 */
export async function createSolve() {
  if (!model.value || status.value !== 'idle') {
    return;
  }

  status.value = 'scramble';

  const response = await postCreateSolve(puzzleName.value);

  const { scrambledState } = response.data.model;

  model.value.apply(scrambledState as Record<string, any>);
}
