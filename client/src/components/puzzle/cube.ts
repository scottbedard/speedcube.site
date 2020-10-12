import { Cube } from '@bedard/twister';
import { isNumber } from 'lodash';
import { useAxesHelper } from '@/app/three/utils/axes-helper';
import { useBoxGeometry } from '@/app/three/geometries/box-geometry';
import { useGroup } from '@/app/three/utils/group';
import { DoubleSide, Group, Mesh, MeshLambertMaterial, Shape, ShapeBufferGeometry } from 'three';
import { watchEffect } from 'vue';

interface CubeOptions {
  colors: string[],
  innerBrightness: number,
  stickerElevation: number,
  stickerRadius: number,
  stickerSpacing: number,
  turnDuration: number,
}

// edge length of a cube inscribed in a sphere of radius 1
const edgeLength = 2 / Math.sqrt(3);

// create fresh sticker materials
function createMaterials(opts: CubeOptions, oldMaterials: MeshLambertMaterial[]) {
  oldMaterials.forEach(obj => obj.dispose());

  return opts.colors.map(() => {
    return new MeshLambertMaterial({
      color: 0xff0000,
      side: DoubleSide,
    });
  });
}

// create fresh shape geometry for our stickers
function createShape(size: number, radius: number, oldShape?: ShapeBufferGeometry) {
  if (oldShape) {
    oldShape.dispose();
  }

  radius = (size * radius) / 2;

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
function normalize(opts: Record<string, any>): CubeOptions {
  return {
    colors: Array.isArray(opts.colors) ? opts.colors : [],
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
  let shape: ShapeBufferGeometry | undefined;
  let materials: MeshLambertMaterial[] = [];

  const front = new Group();

  watchEffect(() => {
    const opts = normalize(rawOpts);
    materials = createMaterials(opts, materials);
    shape = createShape(edgeLength / model.options.size, opts.stickerRadius, shape);

    const mesh = new Mesh(shape, materials[0]);

    front.remove(...front.children);
    front.add(mesh);
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
        front,
        right: useAxesHelper(),
        back: useAxesHelper(),
        down: useAxesHelper(),
      },
    }),
  ]);
}
