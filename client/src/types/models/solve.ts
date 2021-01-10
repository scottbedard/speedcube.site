export interface SolveModel {
  configId: number,
  duration: number,
  id: number,
  puzzleId: number,
  scramble: string,
  scrambledState: object,
  solution: string,
  status: 'complete' | 'dnf' | 'error' | 'pending',
  turns: number,
  userId: number,
}
