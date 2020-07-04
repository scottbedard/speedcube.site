import {
  BackSide, FrontSide, Mesh, ShapeBufferGeometry,
} from 'three';
import { useDisposable } from '../useDisposable';
import { useGroup } from './useGroup';
import { useMaterial } from './useMaterial';

/**
 * Options
 */
export type UseShapeOptions = {
  color: number;
  geometry: ShapeBufferGeometry;
};

/**
 * Shape
 */
export function useShape(opts: UseShapeOptions) {
  const innerMaterial = useMaterial({
    color: opts.color,
    side: BackSide,
  });

  const outerMaterial = useMaterial({
    color: opts.color,
    side: FrontSide,
  });

  const innerMesh = new Mesh(opts.geometry, innerMaterial);
  const outerMesh = new Mesh(opts.geometry, outerMaterial);

  useDisposable(innerMaterial);
  useDisposable(outerMaterial);

  const group = useGroup({}, [innerMesh, outerMesh]);

  return group;
}
