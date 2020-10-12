/* eslint-disable */
import { Cube, CubeSticker } from '@bedard/twister';
import { isNumber, times } from 'lodash';
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

interface CubeContext {
  colMap: number[],
  materials: MeshLambertMaterial[],
  model: Cube,
  options: CubeOptions,
  rowMap: number[],
  spacingGap: number,
  stickerShape: ShapeBufferGeometry,
  stickerSize: number,
}

// @todo: twister should handle this for us
interface StickerData {}

/**
 * The edge length of our cube. This value is the size
 * of a cube inscribed inside a sphere of radius 1.
 */
const edgeLength = 2 / Math.sqrt(3);

/**
 * Create column map.
 */
const mapColumns = (n: number) => times(n ** 2).map((x, i) => i % n);

/**
 * Create row map.
 */
const mapRows = (n: number) => times(n ** 2).map((x, i) => Math.floor(i / n));

/**
 * Create materials, and dispose of old ones.
 */
function createMaterials(opts: CubeOptions, oldMaterials: MeshLambertMaterial[]) {
  oldMaterials.forEach(obj => obj.dispose());

  return opts.colors.map(() => {
    return new MeshLambertMaterial({
      color: 0xff0000,
      side: DoubleSide,
    });
  });
}

/**
 * Create a shape buffer geometry, and dispose of the old one.
 */
function createShape(size: number, options: CubeOptions, oldShape?: ShapeBufferGeometry) {
  if (oldShape) {
    oldShape.dispose();
  }

  const shape = new Shape();
  const radius = (size * options.stickerRadius) / 2;

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

/**
 * Create sticker meshes.
 */
function createStickers(group: Group, stickers: CubeSticker<StickerData>[], context: CubeContext) {
  const { colMap, materials, model, options, rowMap, spacingGap, stickerShape, stickerSize } = context;
  const leftOffset = -(edgeLength / 2);
  const topOffset = (edgeLength / 2) - stickerSize;
  const spacingOffset = (spacingGap * (model.options.size - 1)) / 2;

  group.remove(...group.children);

  stickers.forEach((sticker, index) => {
    const col = colMap[index];
    const row = rowMap[index];

    const mesh = new Mesh(stickerShape, materials[0]);
    mesh.position.x = leftOffset + (stickerSize * col) + (spacingGap * col) - spacingOffset;
    mesh.position.y = topOffset - (stickerSize * row) - (spacingGap * row) + spacingOffset;
    mesh.position.z = stickerSize * options.stickerElevation;

    group.add(mesh);
  });
}

/**
 * Normalize puzzle options.
 */
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
  // @todo: dispose on unmount
  let stickerShape: ShapeBufferGeometry | undefined;
  let materials: MeshLambertMaterial[] = [];

  const front = new Group();

  watchEffect(() => {
    const options = normalize(rawOpts);
    const stickerSize = edgeLength / model.options.size;

    materials = createMaterials(options, materials);
    stickerShape = createShape(stickerSize, options, stickerShape);

    const context: CubeContext = {
      colMap: mapColumns(model.options.size),
      materials,
      model,
      options,
      rowMap: mapRows(model.options.size),
      spacingGap: stickerSize * options.stickerSpacing,
      stickerShape,
      stickerSize,
    };

    createStickers(front, model.state.f, context);
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
        up: useAxesHelper(),
        left: useAxesHelper(),
        front,
        right: useAxesHelper(),
        back: useAxesHelper(),
        down: useAxesHelper(),
      },
    }),
  ]);
}
