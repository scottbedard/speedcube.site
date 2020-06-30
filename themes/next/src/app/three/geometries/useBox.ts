import { BoxGeometry, MeshLambertMaterial, Mesh } from 'three';
import { useDisposable } from '../useDisposable';

/**
 * Box.
 */
export function useBox() {
  const geometry = new BoxGeometry(30, 30, 30);

  const material = new MeshLambertMaterial({
    color: 0xff0000,
    opacity: 1,
    side: 2,
    transparent: false,
  });

  useDisposable(geometry);
  useDisposable(material);

  return new Mesh(geometry, material);
}
