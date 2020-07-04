/* eslint-disable */
import { Cube } from '@bedard/twister';
import { CubeSticker } from '@bedard/twister/dist/cube/cube';
import { times } from 'lodash-es';
import { Group, ShapeBufferGeometry } from 'three';
import { IncompleteVector, PossiblyReactive } from '../types';
import { roundedRectangle } from '../helpers';
import { useBox } from '../geometries/useBox';
import { useDisposable } from '../useDisposable';
import { useGroup } from '../utils/useGroup';
import { useHidden } from '../useHidden';
import { usePosition } from '../usePosition';
import { useRotation } from '../useRotation';
import { useShape } from '../utils/useShape';

/**
 * Face options
 */
export type FaceOptions = {
  colMap: number[],
  colors: number[],
  geometry: ShapeBufferGeometry,
  rowMap: number[],
  size: number,
}

/**
 * Options
 */
export type UseCubeOptions = {
  hidden?: PossiblyReactive<boolean>;
  model: Cube;
  position?: PossiblyReactive<IncompleteVector>;
  rotation?: PossiblyReactive<IncompleteVector>;
}

/**
 * Create a map of columns for each sticker index.
 */
function mapColumns(size: number) {
  return times(size ** 2).map(i => i % size);
}

/**
* Create a map of rows for each sticker index.
*/
function mapRows(size: number) {
  return times(size ** 2).map(i => Math.floor(i / size));
}

/**
 * Cube face
 */
function useCubeFace(opts: FaceOptions, stickers: CubeSticker[]) {
  const group = useGroup();

  const stickerSize = 1 / opts.size;
  const halfStickerSize = stickerSize / 2;

  stickers.forEach((sticker, index) => {
    const shape = useShape({
      color: opts.colors[sticker.value],
      geometry: opts.geometry,
    });
    const col = opts.colMap[index];
    const row = opts.rowMap[index];

    // {
    //   x: -this.halfCubeSize + (col * this.gapSize) + (col * this.stickerSize),
    //   y: (this.halfCubeSize - this.stickerSize) - ((row * this.gapSize) + (row * this.stickerSize)),
    //   z: this.halfCubeSize + (this.config.stickerElevation * this.stickerSize),
    // }

    shape.position.x = -0.5 + (stickerSize * col);
    shape.position.y = 0.5 - stickerSize - (stickerSize * row);

    group.add(shape);
  });

  return group;
}

/**
 * Cube puzzle
 */
export function useCubePuzzle(opts: UseCubeOptions) {
  const colors = [0xff0000, 0x00ff00, 0x0000ff, 0xffff00, 0x00ffff, 0xff00ff];
  const model = opts.model || new Cube({ size: 3 });
  const colMap = mapColumns(model.options.size);
  const rowMap = mapRows(model.options.size);

  // stickers
  const stickerGeometry = roundedRectangle(
    1 / model.options.size,
    1 / model.options.size,
    0.2 / model.options.size,
  );

  const faceOpts = {
    colMap,
    colors,
    geometry: stickerGeometry,
    rowMap,
    size: model.options.size,
  };

  useDisposable(stickerGeometry);

  // box
  const box = useBox({
    debug: true,
    depth: 1,
    height: 1,
    width: 1,
  }, {
    u: useCubeFace(faceOpts, model.state.U),
    l: useCubeFace(faceOpts, model.state.L),
    f: useCubeFace(faceOpts, model.state.F),
    r: useCubeFace(faceOpts, model.state.R),
    b: useCubeFace(faceOpts, model.state.B),
    d: useCubeFace(faceOpts, model.state.D),
  });


  useHidden(box, opts.hidden);
  usePosition(box, opts.position);
  useRotation(box, opts.rotation);

  return box;
}
