/**
 * Puzzle config
 */
export type PuzzleConfig<T = Record<string, any>> = {
  createdAt: string,
  id: number,
  json: T,
  puzzleId: number,
}
