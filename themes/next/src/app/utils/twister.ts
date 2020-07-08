/* eslint-disable */
// util functions for working with twister models
import { Cube, CubeFace, CubeTurn } from '@bedard/twister';

/**
 * Get the stickers effected by a turn.
 */
export function getEffectedCubeStickers(model: Cube, parsedTurn: CubeTurn, colMap: number[], rowMap: number[]) {
  const stickers = [];

  // grab a couple of values we'll need to determine
  // which stickers are being effected by the turn
  const { depth, target, wide } = parsedTurn;
  const cubeLayers = model.options.size;
  const zeroDepth = depth - 1;
  const reverseDepth = cubeLayers - depth;

  // if the entire cube is being turned, return all stickers
  if (target === 'X' || target === 'Y' || target === 'Z') {
    return model.state.U
      .concat(model.state.L)
      .concat(model.state.F)
      .concat(model.state.R)
      .concat(model.state.B)
      .concat(model.state.D);
  }

  // attach the entire face of wide turns
  if (wide || depth === 1 && Array.isArray(model.state[target])) {
    stickers.push(...model.state[target]);
  }

  // attach the entire opposide face of inner turns
  // that are greater than the total number of layers
  if (depth >= cubeLayers) {
    const opposite: Record<CubeFace, CubeFace> = { U: 'D', L: 'R', F: 'B', R: 'L', B: 'F', D: 'U' };

    if (Array.isArray(model.state[opposite[target]])) {
      stickers.push(...model.state[opposite[target]]);
    }
  }

  // get the slices being turned
  if (target === 'U') {
    stickers.push(
      ...model.state.B.filter((s, i) => (wide ? rowMap[i] < depth : rowMap[i] === zeroDepth)),
      ...model.state.R.filter((s, i) => (wide ? rowMap[i] < depth : rowMap[i] === zeroDepth)),
      ...model.state.F.filter((s, i) => (wide ? rowMap[i] < depth : rowMap[i] === zeroDepth)),
      ...model.state.L.filter((s, i) => (wide ? rowMap[i] < depth : rowMap[i] === zeroDepth)),
    );
  } else if (target === 'L') {
    stickers.push(
      ...model.state.U.filter((s, i) => (wide ? colMap[i] < depth : colMap[i] === zeroDepth)),
      ...model.state.F.filter((s, i) => (wide ? colMap[i] < depth : colMap[i] === zeroDepth)),
      ...model.state.D.filter((s, i) => (wide ? colMap[i] < depth : colMap[i] === zeroDepth)),
      ...model.state.B.filter((s, i) => (wide ? colMap[i] >= reverseDepth : colMap[i] === reverseDepth)),
    );
  } else if (target === 'F') {
    stickers.push(
      ...model.state.U.filter((s, i) => (wide ? rowMap[i] >= reverseDepth : rowMap[i] === reverseDepth)),
      ...model.state.R.filter((s, i) => (wide ? colMap[i] < depth : colMap[i] === zeroDepth)),
      ...model.state.D.filter((s, i) => (wide ? rowMap[i] < depth : rowMap[i] === zeroDepth)),
      ...model.state.L.filter((s, i) => (wide ? colMap[i] >= reverseDepth : colMap[i] === reverseDepth)),
    );
  } else if (target === 'R') {
    stickers.push(
      ...model.state.U.filter((s, i) => (wide ? colMap[i] >= reverseDepth : colMap[i] === reverseDepth)),
      ...model.state.B.filter((s, i) => (wide ? colMap[i] < depth : colMap[i] === zeroDepth)),
      ...model.state.D.filter((s, i) => (wide ? colMap[i] >= reverseDepth : colMap[i] === reverseDepth)),
      ...model.state.F.filter((s, i) => (wide ? colMap[i] >= reverseDepth : colMap[i] === reverseDepth)),
    );
  } else if (target === 'B') {
    stickers.push(
      ...model.state.U.filter((s, i) => (wide ? rowMap[i] < depth : rowMap[i] === zeroDepth)),
      ...model.state.L.filter((s, i) => (wide ? colMap[i] < depth : colMap[i] === zeroDepth)),
      ...model.state.D.filter((s, i) => (wide ? rowMap[i] >= reverseDepth : rowMap[i] === reverseDepth)),
      ...model.state.R.filter((s, i) => (wide ? colMap[i] >= reverseDepth : colMap[i] === reverseDepth)),
    );
  } else if (target === 'D') {
    stickers.push(
      ...model.state.B.filter((s, i) => (wide ? rowMap[i] >= reverseDepth : rowMap[i] === reverseDepth)),
      ...model.state.R.filter((s, i) => (wide ? rowMap[i] >= reverseDepth : rowMap[i] === reverseDepth)),
      ...model.state.F.filter((s, i) => (wide ? rowMap[i] >= reverseDepth : rowMap[i] === reverseDepth)),
      ...model.state.L.filter((s, i) => (wide ? rowMap[i] >= reverseDepth : rowMap[i] === reverseDepth)),
    );
  }

  return stickers;
}
