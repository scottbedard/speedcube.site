/**
 * Puzzle config
 */
export type Config<T = Record<string, any>> = {
  createdAt: string,
  id: number,
  data: T,
  puzzleId: number,
}
