/* eslint-disable */

/**
 * Convert degrees to radians.
 *
 * @param  {number} degrees
 * @return {number}
 */
export function degToRad(degrees) {
    return degrees * (Math.PI / 180);
}

/**
 * Determine what column a sticker is part of.
 *
 * @param  {number} size
 * @param  {number} index
 * @return {number}
 */
export function getCol(size, index) {
    return index % size;
}

/**
 * Determine what row a sticker is part of.
 *
 * @param  {number} size
 * @param  {number} index
 * @return {number}
 */
export function getRow(size, index) {
    return Math.floor(index / size);
}

/**
 * Get all stickers that are effected by a turn.
 * 
 * @param  {Cube}   cube
 * @param  {Object} parsedTurn
 * @return {Array}
 */
export function getEffectedStickers(cube, parsedTurn, rowMap, colMap) {
    const stickers = [];
    const { size } = cube;
    const { depth, face, inner, outer } = parsedTurn;
    const zeroDepth = depth - 1;
    const reverseDepth = size - depth;

    // attach the entire face of outer turns
    if (parsedTurn.outer) {
        stickers.push(...cube.state[parsedTurn.face]);
    }

    // attach the entire opposite face of inner turns
    if (depth >= size) {
        const opposite = { u: 'd', l: 'r', f: 'b', r: 'l', b: 'f', d: 'u' };

        stickers.push(...cube.state[opposite[parsedTurn.face]]);
    }

    // get the slices being turned
    if (face === 'u') {
        stickers.push(
            ...cube.state.b.filter((s, i) => outer ? rowMap[i] < depth : rowMap[i] === zeroDepth),
            ...cube.state.r.filter((s, i) => outer ? rowMap[i] < depth : rowMap[i] === zeroDepth),
            ...cube.state.f.filter((s, i) => outer ? rowMap[i] < depth : rowMap[i] === zeroDepth),
            ...cube.state.l.filter((s, i) => outer ? rowMap[i] < depth : rowMap[i] === zeroDepth),
        );
    } else if (face === 'l') {
        stickers.push(
            ...cube.state.u.filter((s, i) => outer ? colMap[i] < depth : colMap[i] === zeroDepth),
            ...cube.state.f.filter((s, i) => outer ? colMap[i] < depth : colMap[i] === zeroDepth),
            ...cube.state.d.filter((s, i) => outer ? colMap[i] < depth : colMap[i] === zeroDepth),
            ...cube.state.b.filter((s, i) => outer ? colMap[i] >= reverseDepth : colMap[i] === reverseDepth),
        );
    } else if (face === 'f') {
        stickers.push(
            ...cube.state.u.filter((s, i) => outer ? rowMap[i] >= reverseDepth : rowMap[i] === reverseDepth),
            ...cube.state.r.filter((s, i) => outer ? colMap[i] < depth : colMap[i] === zeroDepth),
            ...cube.state.d.filter((s, i) => outer ? rowMap[i] < depth : rowMap[i] === zeroDepth),
            ...cube.state.l.filter((s, i) => outer ? colMap[i] >= reverseDepth : colMap[i] === reverseDepth),
        );
    } else if (face === 'r') {
        stickers.push(
            ...cube.state.u.filter((s, i) => outer ? colMap[i] >= reverseDepth : colMap[i] === reverseDepth),
            ...cube.state.b.filter((s, i) => outer ? colMap[i] < depth : colMap[i] === zeroDepth),
            ...cube.state.d.filter((s, i) => outer ? colMap[i] >= reverseDepth : colMap[i] === reverseDepth),
            ...cube.state.f.filter((s, i) => outer ? colMap[i] >= reverseDepth : colMap[i] === reverseDepth),
        );
    } else if (face === 'b') {
        stickers.push(
            ...cube.state.u.filter((s, i) => outer ? rowMap[i] < depth : rowMap[i] === zeroDepth),
            ...cube.state.l.filter((s, i) => outer ? colMap[i] < depth : colMap[i] === zeroDepth),
            ...cube.state.d.filter((s, i) => outer ? rowMap[i] >= reverseDepth : rowMap[i] === reverseDepth),
            ...cube.state.r.filter((s, i) => outer ? colMap[i] >= reverseDepth : colMap[i] === reverseDepth),
        );
    } else if (face === 'd') {
        stickers.push(
            ...cube.state.b.filter((s, i) => outer ? rowMap[i] >= reverseDepth : rowMap[i] === reverseDepth),
            ...cube.state.r.filter((s, i) => outer ? rowMap[i] >= reverseDepth : rowMap[i] === reverseDepth),
            ...cube.state.f.filter((s, i) => outer ? rowMap[i] >= reverseDepth : rowMap[i] === reverseDepth),
            ...cube.state.l.filter((s, i) => outer ? rowMap[i] >= reverseDepth : rowMap[i] === reverseDepth),
        );
    }

    return stickers;
}

/**
 * Get the axis and rotation of a turn.
 * 
 * @param  {Cube}   cube
 * @param  {Object} parsedTurn
 * @return {Array}
 */
export function getTurnAxisAndDegrees(parsedTurn) {
    let axis, degrees;
    const { double, face, prime } = parsedTurn;

    // helper function to get turn degrees. note that the
    // clockwise / counter-clickwise degrees might seem
    // backwards. this is because we're turning from the
    // context of our scene's world axis, not the face.
    const deg = (cw, ccw) => double ? 180 : (prime ? ccw : cw);

    if (face === 'u') {
        axis = 'y';
        degrees = deg(-90, 90);
    } else if (face === 'l') {
        axis = 'x';
        degrees = deg(90, -90);
    } else if (face === 'f') {
        axis = 'z';
        degrees = deg(-90, 90);
    } else if (face === 'r') {
        axis = 'x';
        degrees = deg(-90, 90);
    } else if (face === 'b') {
        axis = 'z';
        degrees = deg(90, -90);
    } else if (face === 'd') {
        axis = 'y';
        degrees = deg(90, -90);
    }

    return { axis, degrees };
}
