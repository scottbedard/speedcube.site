import { ApiResponse } from '@/types/api';
import { getPuzzleId } from '@/app/utils/puzzle';
import axios from 'axios';
import { SolveModel } from '@/types/models/solve';

/**
 * Create a solve.
 */
export function postCreateSolve(puzzleName: string) {
  const puzzleId = getPuzzleId(puzzleName);

  return axios.post<ApiResponse<{
    model: Partial<SolveModel>,
  }>>('/api/speedcube/speedcube/solves', { puzzleId });
}