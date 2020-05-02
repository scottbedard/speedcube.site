/* eslint-disable no-use-before-define */
import { times } from 'lodash-es';

/**
 * Get the stickers that are effected by the current turn turn.
 *
 * @param  {Vue}            cube
 * @return {Array<Object>}
 */
export function getStickersEffectedByTurn(model, parsedTurn) {
    const stickers = [];

    // grab a couple of values we'll need to determine
    // which stickers are being effected by the turn
    const colMap = mapColumns(model.size);
    const rowMap = mapRows(model.size);
    const { depth, target, wide } = parsedTurn;
    const cubeLayers = model.size;
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
    if (wide || depth === 1) {
        stickers.push(...model.state[target]);
    }

    // attach the entire opposide face of inner turns
    // that are greater than the total number of layers
    if (depth >= cubeLayers) {
        const opposite = { U: 'D', L: 'R', F: 'B', R: 'L', B: 'F', D: 'U' };

        stickers.push(...model.state[opposite[target]]);
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

/**
 * Create a map of columns for each sticker index.
 *
 * @param  {Number}         size
 * @return {Array<Number>}
 */
export function mapColumns(size) {
    return times(size ** 2).map(i => i % size);
}

/**
 * Create a map of rows for each sticker index.
 *
 * @param  {Number}         size
 * @return {Array<Number>}
 */
export function mapRows(size) {
    return times(size ** 2).map(i => Math.floor(i / size));
}
