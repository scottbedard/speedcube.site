import { clone, mean } from 'lodash-es';

/**
 * Helper to test if a puzzle is a cube.
 *
 * @param  {String}     puzzle
 * @return {Boolean}
 */
export function isCube(puzzle) {
    // this regex will match any NxN puzzle id
    return /^(\d+)x\1$/.test(puzzle);
}

/**
 * Test if a string is a valid cube turn.
 *
 * @param  {String} turn
 * @return {Boolean}
 */
export function isCubeTurn(turn) {
    return /^(?:(\d*[ULFRBD]w?)|([XYZ])){1}[-'2]?$/.test(turn);
}

/**
 * Calculate the average solve time in milliseconcds. This
 * function will return -1 if there are not enough solves
 * to determine a valid average.
 *
 * @param  {Array<number|'dnf'>} times
 * @return {Number}
 */
export function calculateAverage(times) {
    times = clone(times);

    // not enough times
    if (times.length < 5) {
        return -1;
    }

    const dnf = times.filter(t => t === 'dnf');

    // multiple dnf's
    if (dnf.length > 1) {
        return -1;
    }

    // remove low
    if (dnf.length === 1) {
        times = times.filter(t => t !== 'dnf');
    } else {
        const slowest = Math.max(...times);

        for (let i = 0; i < times.length; i++) {
            if (times[i] === slowest) {
                times.splice(i, 1);
                break;
            }
        }
    }

    // remove high
    const fastest = Math.min(...times);

    for (let i = 0; i < times.length; i++) {
        if (times[i] === fastest) {
            times.splice(i, 1);
            break;
        }
    }

    return mean(times);
}
