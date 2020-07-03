/* eslint-disable */
import { BoxBufferGeometry, MeshLambertMaterial, Mesh } from 'three';
import { useDisposable } from '../useDisposable';

/**
 * Box.
 */
export function useBox() {
  const geometry = new BoxBufferGeometry(1, 1, 1);

  const material = new MeshLambertMaterial({
    color: 0xff0000,
    opacity: 0.5,
    side: 2,
    transparent: false,
  });

  // useDisposable(geometry);
  // useDisposable(material);

  return new Mesh(geometry, material);
}
