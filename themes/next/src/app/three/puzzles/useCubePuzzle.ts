import { IncompleteVector, PossiblyReactive } from '../types';
import { useBox } from '../geometries/useBox';
import { useHidden } from '../useHidden';
import { usePosition } from '../usePosition';
import { useRotation } from '../useRotation';

export type UseCubeOptions = {
  hidden?: PossiblyReactive<boolean>;
  position?: PossiblyReactive<IncompleteVector>;
  rotation?: PossiblyReactive<IncompleteVector>;
}

/**
 * Cube puzzle
 */
export function useCubePuzzle(opts: UseCubeOptions = {}) {
  const box = useBox({
    debug: true,
    depth: 1,
    height: 1,
    width: 1,
  });

  useHidden(box, opts.hidden);
  usePosition(box, opts.position);
  useRotation(box, opts.rotation);

  return box;
}
