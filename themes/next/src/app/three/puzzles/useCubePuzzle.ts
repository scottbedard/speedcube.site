/* eslint-disable */
import { Cube } from '@bedard/twister';
import { CubeSticker, CubeTurn } from '@bedard/twister/dist/cube/cube';
import { difference, times, isNumber } from 'lodash-es';
import { computed, isReactive, onUnmounted, watch } from '@vue/composition-api';
import { createGarbage, roundedRectangle, getValue } from '../helpers';
import { useBox } from '../geometries/useBox';
import { useGroup } from '../utils/useGroup';
import { MeshLambertMaterial, BackSide, FrontSide, Group, Mesh, ShapeBufferGeometry } from 'three';
import { PossiblyReactive } from '../types';
import { degreesToRadians } from '@/app/utils/math';
import { getEffectedCubeStickers } from '@/app/utils/twister';

/**
 * Options
 */
export type UseCubePuzzleOptions = {
  currentTurn?: PossiblyReactive<string | null>,
  debug?: boolean;
  model?: Cube,
  options?: {
    colors?: number[],
    stickerElevation?: number,
    stickerRadius?: number,
    stickerSpacing?: number,
  };
  turnProgress?: PossiblyReactive<number>,
}

export type NormalizedUseCubePuzzleOptions = {
  currentTurn: string | null,
  debug: boolean;
  model: Cube,
  options: {
    colors?: number[],
    stickerElevation?: number,
    stickerRadius?: number,
    stickerSpacing?: number,
  },
  turnProgress: number,
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
 * Adjust a turn
 */
function adjustTurnProgress(turn: Group, face: string | null, turnProgress: number) {
  const turnDegress = degreesToRadians(90);

  switch (face) {
    case 'U':
      turn.rotation.x = 0;
      turn.rotation.y = turnDegress * -turnProgress;
      turn.rotation.z = 0;
      break;
    case 'L':
      turn.rotation.x = turnDegress * turnProgress;
      turn.rotation.y = 0;
      turn.rotation.z = 0;
      break;
    case 'F':
      turn.rotation.x = 0;
      turn.rotation.y = 0;
      turn.rotation.z = turnDegress * -turnProgress;
      break;
    case 'R':
      turn.rotation.x = turnDegress * -turnProgress;
      turn.rotation.y = 0;
      turn.rotation.z = 0;
      break;
    case 'B':
      turn.rotation.x = 0;
      turn.rotation.y = 0;
      turn.rotation.z = turnDegress * turnProgress;
      break;
    case 'D':
      turn.rotation.x = 0;
      turn.rotation.y = turnDegress * turnProgress;
      turn.rotation.z = 0;
      break;
    default:
      turn.rotation.x = 0;
      turn.rotation.y = 0;
      turn.rotation.z = 0;
      break;
  }
}

/**
 * Show / hide stickers effected by a turn.
 */
function adjustVisibleStickers(id: string, turnId: string, model: Cube, parsedTurn: CubeTurn, colMap: number[], rowMap: number[]) {
  walkStickers(
    model,
    parsedTurn,
    colMap,
    rowMap,
    (effectedSticker) => {
      effectedSticker.data[id].visible = false;
      effectedSticker.data[turnId].visible = true;
    },
    (uneffectedSticker) => {
      uneffectedSticker.data[id].visible = true;
      uneffectedSticker.data[turnId].visible = false;
    },
  );
}

/**
 * Create a face of stickers
 */
function createFace({ colMap, geometry, id, materials, normalizedOpts, rowMap }: FaceOptions, stickers: CubeSticker[]) {
  const { model } = normalizedOpts;
  const stickerSpacing = normalizedOpts.options.stickerSpacing || 0;
  const stickerElevation = normalizedOpts.options.stickerElevation || 0;
  const layers = model.options.size;
  const layerSize = 1 / layers;
  const gapSize = layerSize * stickerSpacing;
  const gapOffset = gapSize * (layers - 1);

  const face = new Group();
  face.position.z = (stickerElevation * layerSize) + (gapOffset / 2);

  stickers.forEach((sticker, index) => {
    const col = colMap[index];
    const row = rowMap[index];
    const shape = createSticker(id, geometry, materials, sticker);

    shape.position.x = -0.5 - (gapOffset / 2) + (layerSize * col) + (gapSize * col);
    shape.position.y = 0.5 + (gapOffset / 2) - (layerSize * row) - (gapSize * row) - layerSize;

    face.add(shape);
  });

  return face;
}

/**
 * Create sticker geometry
 */
function createGeometry(id: string, opts: NormalizedUseCubePuzzleOptions) {
  const layerSize = 1 / opts.model.options.size;

  const geometry = roundedRectangle(
    layerSize,
    layerSize,
    (opts.options.stickerRadius || 0) * (layerSize / 2),
  );

  garbage.add(id, () => geometry.dispose());

  return geometry;
}

/**
 * Create sticker materials
 */
function createMaterials(id: string, opts: NormalizedUseCubePuzzleOptions): MaterialsArray {
  const materials = (opts.options.colors || []).map((color) => {
    return {
      inner: new MeshLambertMaterial({
        color,
        opacity: 1,
        side: BackSide,
        transparent: false,
      }),
      outer: new MeshLambertMaterial({
        color,
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
function createPuzzle(id: string, normalizedOpts: NormalizedUseCubePuzzleOptions) {
  console.log('Creating puzzle');
  garbage.empty(id);

  const { model } = normalizedOpts;

  const colMap = mapColumns(normalizedOpts.model.options.size);
  const rowMap = mapRows(normalizedOpts.model.options.size);
  const geometry = createGeometry(id, normalizedOpts);
  const materials = createMaterials(id, normalizedOpts);

  const faceOpts = { colMap, geometry, id, materials, normalizedOpts, rowMap };

  const puzzle = useBox({
    debug: normalizedOpts.debug,
    depth: 1,
    height: 1,
    width: 1,
  }, {
    u: createFace(faceOpts, model.state.U),
    l: createFace(faceOpts, model.state.L),
    f: createFace(faceOpts, model.state.F),
    r: createFace(faceOpts, model.state.R),
    b: createFace(faceOpts, model.state.B),
    d: createFace(faceOpts, model.state.D),
  });

  return puzzle;
}

/**
 * Create a sticker shape
 */
function createSticker(id: string, geometry: ShapeBufferGeometry, materials: MaterialsArray, sticker: CubeSticker) {
  const group = new Group();

  if (sticker.value !== null) {
    const innerMesh = new Mesh(geometry, materials[sticker.value].inner);
    const outerMesh = new Mesh(geometry, materials[sticker.value].outer);

    group.add(innerMesh);
    group.add(outerMesh);
  }

  sticker.data[id] = group;

  return group;
}

/**
 * Walk the stickers effected by a turn
 */
function walkStickers<T extends (sticker: CubeSticker) => void>(model: Cube, parsedTurn: CubeTurn, colMap: number[], rowMap: number[], effectedFn: T, uneffectedFn: T) {
  const stickers = [
    ...model.state.U,
    ...model.state.L,
    ...model.state.F,
    ...model.state.R,
    ...model.state.B,
    ...model.state.D,
  ];

  const effectedStickers = getEffectedCubeStickers(model, parsedTurn, colMap, rowMap);

  effectedStickers.forEach(effectedFn);

  difference(stickers, effectedStickers).forEach(uneffectedFn);
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
    currentTurn: getValue(opts.currentTurn) || null,
    debug: opts.debug || false,
    model: opts.model || new Cube({ size: 3 }),
    options: opts.options || {},
    turnProgress: getValue(opts.turnProgress) || 0,
  }
}

/**
 * Cube puzzle
 */
export function useCubePuzzle(opts: UseCubePuzzleOptions) {
  const id = garbage.createId();
  const turnId = garbage.createId();
  const normalizedOpts = normalizeOptions(opts);
  const model = normalizedOpts.model;
  const colMap = mapColumns(normalizedOpts.model.options.size);
  const rowMap = mapRows(normalizedOpts.model.options.size);

  const group = new Group;

  // draw the puzzle and add it to our group
  let puzzle: Group;
  let turn: Group;

  watch(opts.options || {}, () => {
    group.remove(puzzle);
    puzzle = createPuzzle(id, normalizedOpts);
    group.add(puzzle);
  }, {
    immediate: true,
  });

  const parsedTurn = computed(() => {
    return normalizedOpts.currentTurn
      ? model.parseTurn(normalizedOpts.currentTurn)
      : null
  });

  watch(parsedTurn, (newParsedTurn, oldParsedTurn) => {
    // toggle sticker visibilities
    if (newParsedTurn && !turn) {
      turn = createPuzzle(turnId, normalizedOpts);

      adjustVisibleStickers(id, turnId, model, newParsedTurn, colMap, rowMap);

      group.add(turn);
    }
  }, {
    immediate: true,
  });

  // adjust for the current turn
  watch(opts.turnProgress || {}, (turnProgress) => {
    if (turn && parsedTurn.value?.target) {
      adjustTurnProgress(turn, parsedTurn.value.target, Number(turnProgress) || 0);
    }
  }, {
    immediate: true,
  });

  onUnmounted(() => {
    garbage.empty(id);
    garbage.empty(turnId);
  });

  return group;
}
