import { Cube } from '@bedard/twister';
import { isNumber } from 'lodash';
import { useAxesHelper } from '@/app/three/utils/axes-helper';
import { useBoxGeometry } from '@/app/three/geometries/box-geometry';
import { useGroup } from '@/app/three/utils/group';
import { usePosition } from '@/app/three/utils/position';
import { DoubleSide, Mesh, MeshLambertMaterial, Shape, ShapeBufferGeometry } from 'three';

// edge length of a cube inscribed in a sphere of radius 1
const edgeLength = 2 / Math.sqrt(3);

// create a rounded square shape buffer geometry
function createStickerShape(size: number, radius: number) {
  const shape = new Shape();

  shape.moveTo(0, radius);
  shape.lineTo(0, size - radius);
  shape.quadraticCurveTo(0, size, radius, size);
  shape.lineTo(size - radius, size);
  shape.quadraticCurveTo(size, size, size, size - radius);
  shape.lineTo(size, radius);
  shape.quadraticCurveTo(size, 0, size - radius, 0);
  shape.lineTo(radius, 0);
  shape.quadraticCurveTo(0, 0, 0, radius);

  return new ShapeBufferGeometry(shape);
}

// normalize cube options
function normalizeOptions(opts: Record<string, any>) {
  return {
    innerBrightness: isNumber(opts.innerBrightness) ? opts.innerBrightness : 0,
    stickerElevation: isNumber(opts.stickerElevation) ? opts.stickerElevation : 0,
    stickerRadius: isNumber(opts.stickerRadius) ? opts.stickerRadius : 0,
    stickerSpacing: isNumber(opts.stickerSpacing) ? opts.stickerSpacing : 0,
    turnDuration: isNumber(opts.turnDuration) ? opts.turnDuration : 200,
  };
}

/**
 * Cube
 */
export function useCube(model: Cube<Record<string, any>>, rawOpts: Record<string, any>) {
  const opts = normalizeOptions(rawOpts);
  const layerSize = edgeLength / model.options.size;

  const sticker = createStickerShape(layerSize, opts.stickerRadius);

  const material = new MeshLambertMaterial({
    color: 0x00ff00,
    side: DoubleSide,
  });

  const mesh = new Mesh(sticker, material);

  usePosition(mesh, {
    x: -(edgeLength / 2),
    y: (edgeLength / 2) - layerSize,
  });

  return useGroup([
    useBoxGeometry({
      debug: true,
      size: {
        depth: edgeLength,
        height: edgeLength,
        width: edgeLength,
      },
      slots: {
        top: useAxesHelper(),
        left: useAxesHelper(),
        front: useGroup([
          mesh,
        ]),
        right: useAxesHelper(),
        back: useAxesHelper(),
        down: useAxesHelper(),
      },
    }),
  ]);
}
