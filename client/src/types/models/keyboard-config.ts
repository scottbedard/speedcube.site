/**
 * Keyboard config
 */
export type KeyboardConfig<T = Record<string, any>> = {
  createdAt: string,
  data: T,
  id: number,
  puzzleId: number,
}
