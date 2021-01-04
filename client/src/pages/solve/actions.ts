import { postCreateSolve } from '@/app/repositories/solves';

/**
 * Scramble
 */
export function scramble() {
  return postCreateSolve('3x3');
}