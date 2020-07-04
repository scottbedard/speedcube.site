/* eslint-disable */
import { Cube } from '@bedard/twister';
import { isUndefined, times } from 'lodash-es';
import { isReactive, onUnmounted, watch } from '@vue/composition-api';
import { createGarbage, roundedRectangle } from '../helpers';
import { useBox } from '../geometries/useBox';
import { useGroup } from '../utils/useGroup';
import { MeshLambertMaterial, BackSide, FrontSide, Group, Mesh, ShapeBufferGeometry } from 'three';

/**
 * Options
 */
export type UseCubePuzzleOptions = {
  debug?: boolean;
  model?: Cube,
  options?: {
    stickerRadius?: number,
  };
}

export type NormalizedUseCubePuzzleOptions = {
  debug: boolean;
  model: Cube,
  options: {
    stickerRadius?: number,
  },
}

export type MaterialsArray = Array<{
  inner: MeshLambertMaterial,
  outer: MeshLambertMaterial,
}>

export type FaceOptions = {
  colMap: number[],
  geometry: ShapeBufferGeometry,
  id: string,
  materials: MaterialsArray,
  normalizedOpts: NormalizedUseCubePuzzleOptions,
  rowMap: number[],
}

/**
 * Garbage
 */
const garbage = createGarbage();

/**
 * Create a face of stickers
 */
function createFace({ colMap, geometry, id, materials, normalizedOpts, rowMap }: FaceOptions) {
  const { model } = normalizedOpts;

  const face = new Group();
  const layers = model.options.size;
  const layerSize = 1 / layers;

  model.state.U.forEach((sticker, index) => {
    const col = colMap[index];
    const row = rowMap[index];
    const shape = createSticker(geometry, materials);

    shape.position.x = -0.5 + (layerSize * col);
    shape.position.y = 0.5 - layerSize - (layerSize * row);

    face.add(shape);
  });

  return face;
}

/**
 * Create sticker geometry
 */
function createGeometry(id: string, opts: NormalizedUseCubePuzzleOptions) {
  const layerSize = 1 / opts.model.options.size;
  const geometry = roundedRectangle(layerSize, layerSize, opts.options.stickerRadius || 0)

  garbage.add(id, () => geometry.dispose());

  return geometry;
}

/**
 * Create sticker materials
 */
function createMaterials(id: string, opts: NormalizedUseCubePuzzleOptions): MaterialsArray {
  const materials = times(6).map(() => {
    return {
      inner: new MeshLambertMaterial({
        color: 0xff0000,
        opacity: 1,
        side: BackSide,
        transparent: false,
      }),
      outer: new MeshLambertMaterial({
        color: 0xff0000,
        side: FrontSide
      }),
    };
  });

  garbage.add(id,
    ...materials.map(obj => () => obj.inner.dispose()),
    ...materials.map(obj => () => obj.outer.dispose()),
  );

  return materials;
}

/**
 * Create a puzzle
 */
function createPuzzle(id: string, opts: UseCubePuzzleOptions) {
  console.log('Creating puzzle');
  garbage.empty(id);

  const normalizedOpts = normalizeOptions(opts);

  const colMap = mapColumns(normalizedOpts.model.options.size);
  const rowMap = mapRows(normalizedOpts.model.options.size);
  const geometry = createGeometry(id, normalizedOpts);
  const materials = createMaterials(id, normalizedOpts);

  const faceOpts = { colMap, geometry, id, materials, normalizedOpts, rowMap };

  const puzzle = useBox({
    debug: normalizedOpts.debug,
  }, {
    u: createFace(faceOpts),
  });

  return puzzle;
}

/**
 * Create a sticker shape
 */
function createSticker(geometry: ShapeBufferGeometry, materials: MaterialsArray) {
  const innerMesh = new Mesh(geometry, materials[0].inner);
  const outerMesh = new Mesh(geometry, materials[0].outer);

  const group = new Group();
  group.add(innerMesh);
  group.add(outerMesh);

  return group;
}

/**
 * Create a column index map
 */
function mapColumns(size: number) {
  return times(size ** 2).map(i => i % size);
}

/**
* Create a row index map
*/
function mapRows(size: number) {
  return times(size ** 2).map(i => Math.floor(i / size));
}

/**
 * Normalize puzzle options
 */
export function normalizeOptions(opts: UseCubePuzzleOptions): NormalizedUseCubePuzzleOptions {
  return {
    debug: opts.debug || false,
    model: opts.model || new Cube({ size: 3 }),
    options: opts.options || {},
  }
}

/**
 * Cube puzzle
 */
export function useCubePuzzle(opts: UseCubePuzzleOptions) {
  const id = garbage.createId();
  const group = useGroup();

  let puzzle: Group;

  watch(opts.options || {}, () => {
    group.remove(puzzle);
    puzzle = createPuzzle(id, opts);
    group.add(puzzle);
  }, {
    immediate: true,
  });

  onUnmounted(() => garbage.empty(id));

  return group;
}
