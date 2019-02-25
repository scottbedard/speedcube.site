import bezierEasing from 'bezier-easing';

/**
 * Execute a callback with a cubic bezier curve.
 *
 * @param {Array<number>}   curve       bezier easing curve to use
 * @param {Function}        fn          function to execute
 * @param {number}          duration    easing duration in milliseconds
 * @param {number|null}     frames      number of times to run callback fn
 */
export function ease(curve, fn, duration, frames = null) {
    // assume 60fps if no value was provided
    if (!frames) {
        frames = duration / 16.6666;
    }

    // calculate the easing curve, and create an array
    // to hold all of the timeouts we're about make
    const easing = bezierEasing(...curve);
    const timeouts = [];

    // queue up each frame of the animation
    for (let i = 0; i <= frames; i += 1) {
        const frame = i / frames;

        timeouts.push(setTimeout(() => fn(+easing(frame).toFixed(4), i), frame * duration));
    }

    // and finally, return an object we can use to cancel the timeouts
    return {
        cancel: () => timeouts.forEach(clearTimeout),
    };
}
