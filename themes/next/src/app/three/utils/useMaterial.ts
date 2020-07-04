import {
  DoubleSide, MeshLambertMaterial, Mesh, Side,
} from 'three';

/**
 * Options
 */
export type UseMaterialOptions = {
  color?: number;
  opacity?: number;
  side?: Side;
};

/**
 * Material
 */
export function useMaterial(opts: UseMaterialOptions) {
  const color = opts.color || 0xffffff;
  const opacity = opts.opacity || 1;
  const side = opts.side || DoubleSide;

  const material = new MeshLambertMaterial({
    color,
    opacity,
    side,
  });

  return material;
}
