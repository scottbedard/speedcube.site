import { isScrambleLoading } from './state';
import { postCreateSolve } from '@/app/repositories/solves';

/**
 * Scramble
 */
export function scramble() {
  isScrambleLoading.value = true;
  
  postCreateSolve('3x3').then((response) => {
    // success
    console.log('success', response);
  }).finally(() => {
    // complete
    isScrambleLoading.value = false;
  });
}