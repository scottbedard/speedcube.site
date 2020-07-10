/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable import/extensions */
/* eslint-disable no-param-reassign */
import { Cube } from '@bedard/twister';
/* eslint-disable import/no-unresolved */
import { CubeSticker, CubeTurn } from '@bedard/twister/dist/cube/cube';
import { difference, times } from 'lodash-es';
import { computed, onUnmounted, watch } from '@vue/composition-api';
import {
  MeshLambertMaterial, BackSide, FrontSide, Group, Mesh, ShapeBufferGeometry,
} from 'three';
import { degreesToRadians } from '@/app/utils/math';
import { getCubeStickers, getEffectedCubeStickers } from '@/app/utils/twister';
import { createGarbage, roundedRectangle, getValue } from '../helpers';
import { useBox } from '../geometries/useBox';
import { PossiblyReactive } from '../types';

/**
 * Options
 */
export type UseCubePuzzleOptions = {
  currentTurn?: PossiblyReactive<string | null>;
  debug?: boolean;
  model?: Cube;
  options?: PossiblyReactive<{
    colors?: number[];
    innerBrightness?: number;
    stickerElevation?: number;
    stickerRadius?: number;
    stickerSpacing?: number;
  }>;
  turnProgress?: PossiblyReactive<number>;
}

export type NormalizedUseCubePuzzleOptions = {
  currentTurn: string | null;
  debug: boolean;
  model: Cube;
  options: PossiblyReactive<{
    colors?: number[];
    innerBrightness?: number;
    stickerElevation?: number;
    stickerRadius?: number;
    stickerSpacing?: number;
  }>;
  turnProgress: PossiblyReactive<number>;
}

export type MaterialsArray = Array<{
  inner: MeshLambertMaterial;
  outer: MeshLambertMaterial;
}>

export type FaceOptions = {
  colMap: number[];
  geometry: ShapeBufferGeometry;
  id: string;
  materials: MaterialsArray;
  normalizedOpts: NormalizedUseCubePuzzleOptions;
  rowMap: number[];
}

/**
 * Garbage
 */
const garbage = createGarbage();

/**
 * Adjust a turn
 */
function adjustTurnProgress(turn: Group, rotation: number, face: string | null, turnProgress: number) {
  const turnDegress = degreesToRadians(90 * rotation);

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
function adjustVisibleStickers(id: string, turnId: string, model: Cube, parsedTurn: CubeTurn | null, colMap: number[], rowMap: number[]) {
  if (parsedTurn) {
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
  } else {
    getCubeStickers(model).forEach((sticker) => {
      sticker.data[id].visible = true;
      sticker.data[turnId].visible = false;
    });
  }
}

/**
 * Create a face of stickers
 */
function createFace({
  colMap, geometry, id, materials, normalizedOpts, rowMap,
}: FaceOptions, stickers: CubeSticker[]) {
  const { model } = normalizedOpts;
  const options = getValue(normalizedOpts.options);
  const stickerSpacing = options.stickerSpacing || 0;
  const stickerElevation = options.stickerElevation || 0;
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
  const options = getValue(opts.options);
  const layerSize = 1 / opts.model.options.size;

  const geometry = roundedRectangle(
    layerSize,
    layerSize,
    (options.stickerRadius || 0) * (layerSize / 2),
  );

  garbage.add(id, () => geometry.dispose());

  return geometry;
}

/**
 * Create sticker materials
 */
function createMaterials(id: string, opts: NormalizedUseCubePuzzleOptions): MaterialsArray {
  const options = getValue(opts.options);
  const innerBrightness = options.innerBrightness || 0;

  const materials = (options.colors || []).map((color) => ({
    inner: new MeshLambertMaterial({
      color,
      opacity: innerBrightness,
      side: BackSide,
      transparent: innerBrightness > 0,
    }),
    outer: new MeshLambertMaterial({
      color,
      side: FrontSide,
    }),
  }));

  garbage.add(id,
    ...materials.map((obj) => () => obj.inner.dispose()),
    ...materials.map((obj) => () => obj.outer.dispose()));

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

  const faceOpts = {
    colMap, geometry, id, materials, normalizedOpts, rowMap,
  };

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

  if (sticker.value !== null && materials[sticker.value]) {
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
function walkStickers<T extends(sticker: CubeSticker) => void>(model: Cube, parsedTurn: CubeTurn, colMap: number[], rowMap: number[], effectedFn: T, uneffectedFn: T) {
  const stickers = getCubeStickers(model);
  const effectedStickers = getEffectedCubeStickers(model, parsedTurn, colMap, rowMap);

  effectedStickers.forEach(effectedFn);

  difference(stickers, effectedStickers).forEach(uneffectedFn);
}

/**
 * Create a column index map
 */
function mapColumns(size: number) {
  return times(size ** 2).map((i) => i % size);
}

/**
* Create a row index map
*/
function mapRows(size: number) {
  return times(size ** 2).map((i) => Math.floor(i / size));
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
  };
}

/**
 * Cube puzzle
 */
export function useCubePuzzle(opts: UseCubePuzzleOptions) {
  const id = garbage.createId();
  const turnId = garbage.createId();
  const normalizedOpts = normalizeOptions(opts);
  const { model } = normalizedOpts;
  const colMap = mapColumns(normalizedOpts.model.options.size);
  const rowMap = mapRows(normalizedOpts.model.options.size);

  const group = new Group();

  // draw the puzzle and add it to our group
  let puzzle: Group;
  let turn: Group;

  const turnProgress = computed(() => getValue(opts.turnProgress) || 0);

  const parsedTurn = computed(() => {
    try {
      const currentTurn = getValue(opts.currentTurn);

      return currentTurn ? model.parseTurn(currentTurn) : null;
    } catch {
      return null;
    }
  });

  // redraw everything when the options change
  watch(() => getValue(opts.options), () => {
    group.remove(puzzle);
    puzzle = createPuzzle(id, normalizedOpts);
    group.add(puzzle);

    if (parsedTurn.value) {
      group.remove(turn);
      turn = createPuzzle(turnId, normalizedOpts);
      adjustVisibleStickers(id, turnId, model, parsedTurn.value, colMap, rowMap);
      adjustTurnProgress(turn, parsedTurn.value.rotation, parsedTurn.value.target, turnProgress.value);
      group.add(turn);
    }
  }, {
    deep: true,
    immediate: true,
  });

  // redraw the turn when it changes
  watch(parsedTurn, (newParsedTurn) => {
    group.remove(turn);

    if (newParsedTurn) {
      turn = createPuzzle(turnId, normalizedOpts);
      adjustTurnProgress(turn, newParsedTurn.rotation, newParsedTurn.target, turnProgress.value);
      group.add(turn);
    }

    adjustVisibleStickers(id, turnId, model, newParsedTurn, colMap, rowMap);
  }, {
    immediate: true,
  });

  // adjust for the current turn
  watch(() => getValue(opts.turnProgress), (progress) => {
    if (turn && parsedTurn.value?.target) {
      adjustTurnProgress(turn, parsedTurn.value.rotation, parsedTurn.value.target, Number(progress) || 0);
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
