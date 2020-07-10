export type PuzzleApi = {
  apply: () => void;
  reset: () => void;
  turn: (alg: string) => void;
}
