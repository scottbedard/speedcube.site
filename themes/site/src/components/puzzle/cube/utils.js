/**
 * Get the stickers that are effected by the current turn turn.
 *
 * @param  {Vue}            cube
 * @return {Array<Object>}
 */
export function getStickersEffectedByTurn(cube) {
    const stickers = [];

    // grab a couple of values we'll need to determine
    // which stickers are being effected by the turn
    const { colMap, parsedTurn, rowMap } = cube;
    const { depth, target, wide } = parsedTurn;
    const cubeLayers = cube.model.size;
    const zeroDepth = depth - 1;
    const reverseDepth = cubeLayers - depth;

    // attach the entire face of wide turns
    if (wide || depth === 1) {
        stickers.push(...cube.model.state[target]);
    }

    // attach the entire opposide face of inner turns
    // that are greater than the total number of layers
    if (depth >= cubeLayers) {
        const opposite = { U: 'D', L: 'R', F: 'B', R: 'L', B: 'F', D: 'U' };

        stickers.push(...cube.model.state[opposite[target]]);
    }

    // get the slices being turned
    if (target === 'U') {
        stickers.push(
            ...cube.model.state.B.filter((s, i) => (wide ? rowMap[i] < depth : rowMap[i] === zeroDepth)),
            ...cube.model.state.R.filter((s, i) => (wide ? rowMap[i] < depth : rowMap[i] === zeroDepth)),
            ...cube.model.state.F.filter((s, i) => (wide ? rowMap[i] < depth : rowMap[i] === zeroDepth)),
            ...cube.model.state.L.filter((s, i) => (wide ? rowMap[i] < depth : rowMap[i] === zeroDepth)),
        );
    } else if (target === 'L') {
        stickers.push(
            ...cube.model.state.U.filter((s, i) => (wide ? colMap[i] < depth : colMap[i] === zeroDepth)),
            ...cube.model.state.F.filter((s, i) => (wide ? colMap[i] < depth : colMap[i] === zeroDepth)),
            ...cube.model.state.D.filter((s, i) => (wide ? colMap[i] < depth : colMap[i] === zeroDepth)),
            ...cube.model.state.B.filter((s, i) => (wide ? colMap[i] >= reverseDepth : colMap[i] === reverseDepth)),
        );
    } else if (target === 'F') {
        stickers.push(
            ...cube.model.state.U.filter((s, i) => (wide ? rowMap[i] >= reverseDepth : rowMap[i] === reverseDepth)),
            ...cube.model.state.R.filter((s, i) => (wide ? colMap[i] < depth : colMap[i] === zeroDepth)),
            ...cube.model.state.D.filter((s, i) => (wide ? rowMap[i] < depth : rowMap[i] === zeroDepth)),
            ...cube.model.state.L.filter((s, i) => (wide ? colMap[i] >= reverseDepth : colMap[i] === reverseDepth)),
        );
    } else if (target === 'R') {
        stickers.push(
            ...cube.model.state.U.filter((s, i) => (wide ? colMap[i] >= reverseDepth : colMap[i] === reverseDepth)),
            ...cube.model.state.B.filter((s, i) => (wide ? colMap[i] < depth : colMap[i] === zeroDepth)),
            ...cube.model.state.D.filter((s, i) => (wide ? colMap[i] >= reverseDepth : colMap[i] === reverseDepth)),
            ...cube.model.state.F.filter((s, i) => (wide ? colMap[i] >= reverseDepth : colMap[i] === reverseDepth)),
        );
    } else if (target === 'B') {
        stickers.push(
            ...cube.model.state.U.filter((s, i) => (wide ? rowMap[i] < depth : rowMap[i] === zeroDepth)),
            ...cube.model.state.L.filter((s, i) => (wide ? colMap[i] < depth : colMap[i] === zeroDepth)),
            ...cube.model.state.D.filter((s, i) => (wide ? rowMap[i] >= reverseDepth : rowMap[i] === reverseDepth)),
            ...cube.model.state.R.filter((s, i) => (wide ? colMap[i] >= reverseDepth : colMap[i] === reverseDepth)),
        );
    } else if (target === 'D') {
        stickers.push(
            ...cube.model.state.B.filter((s, i) => (wide ? rowMap[i] >= reverseDepth : rowMap[i] === reverseDepth)),
            ...cube.model.state.R.filter((s, i) => (wide ? rowMap[i] >= reverseDepth : rowMap[i] === reverseDepth)),
            ...cube.model.state.F.filter((s, i) => (wide ? rowMap[i] >= reverseDepth : rowMap[i] === reverseDepth)),
            ...cube.model.state.L.filter((s, i) => (wide ? rowMap[i] >= reverseDepth : rowMap[i] === reverseDepth)),
        );
    }

    return stickers;
}
