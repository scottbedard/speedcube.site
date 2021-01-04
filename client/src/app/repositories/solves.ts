import { getPuzzleId } from '@/app/utils/puzzle';
import axios from 'axios';

/**
 * Create a pending solve.
 */
export function postCreateSolve(puzzleName: string) {
  const puzzleId = getPuzzleId(puzzleName);

  return axios.post('/api/speedcube/speedcube/solves', { puzzleId });
}