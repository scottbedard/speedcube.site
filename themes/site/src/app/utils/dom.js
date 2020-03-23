/* eslint-disable no-use-before-define */
import { enterKeyCode, spacebarKeyCode } from '@/app/constants';

/**
 * Determine if an event passed through a particular HTML tag.
 *
 * @param {Event}   e           the event being processed
 * @param {string}  tagName     name of html tag to check for
 *
 * @return {boolean}
 */
export function eventPassedThroughTag(e, tagName) {
    let throughTag = false;

    walkEventPath(e, (el) => {
        if (el.tagName === tagName.toUpperCase()) {
            throughTag = true;
        }
    });

    return throughTag;
}

/**
 * Get an element's position relative to the viewport.
 *
 * @param {Element} el
 *
 * @return {object}
 */
export function getBoundingClientRect(el) {
    return el.getBoundingClientRect() || { bottom: 0, top: 0, right: 0, left: 0 };
}

/**
 * Cross browser tests for key events.
 *
 * @param  {Event}      e
 * @param  {string}     keyName     enter | spacebar
 *
 * @return {boolean}
 */
export function isKey(e, keyName) {
    return (
        (keyName === 'enter' && (e.code === 'Enter' || e.keyCode === enterKeyCode))
        || (keyName === 'spacebar' && (e.code === 'Space' || e.keyCode === spacebarKeyCode))
    );
}

/**
 * Determine if an event path passes through an element.
 *
 * @param  {Object}     e       event being inspected
 * @param  {Object}     target  element to check for
 *
 * @return {boolean}
 */
export function isForeignClick(e, target) {
    let isForeign = true;

    walkEventPath(e, (el) => {
        if (isForeign && el === target) {
            isForeign = false;
        }
    });

    return isForeign;
}

/**
 * Measure the total height of an element, including padding, borders, and margins.
 *
 * @param  {Object} el  dom element being measured
 *
 * @return {number}
 */
export function measureAbsoluteHeight(el) {
    const styles = window.getComputedStyle(el);
    const margin = parseFloat(styles.marginTop) + parseFloat(styles.marginBottom);

    return Math.ceil(el.offsetHeight + margin);
}

/**
 * Measure the x / y position of an element.
 *
 * @param {HTMLElement} el
 *
 * @return {object}
 */
export function measurePosition(el) {
    let x = 0;
    let y = 0;

    while (el) {
        if (el.tagName === 'BODY') {
            // deal with browser quirks with body/window/document and page scroll
            const xScroll = el.scrollLeft || document.documentElement.scrollLeft;
            const yScroll = el.scrollTop || document.documentElement.scrollTop;

            x += (el.offsetLeft - xScroll + el.clientLeft);
            y += (el.offsetTop - yScroll + el.clientTop);
        } else {
            // for all other non-BODY elements
            x += (el.offsetLeft - el.scrollLeft + el.clientLeft);
            y += (el.offsetTop - el.scrollTop + el.clientTop);
        }

        el = el.offsetParent;
    }

    return { x, y };
}

/**
 * Test if a bounding client rect is visible within the viewport
 *
 * @param {object} rect
 * @param {number} rect.bottom
 * @param {number} rect.left
 * @param {number} rect.right
 * @param {number} rect.top
 *
 * @return {boolean}
 */
export function rectIsVisible(rect) {
    return !(
        rect.bottom < 0
        || rect.top > document.body.clientHeight
        || rect.right < 0
        || rect.left > document.body.clientWidth
    );
}

/**
 * Query for an element, and pass it to a callback if found.
 *
 * @param {HTMLElement} parentEl    the containing element to query
 * @param {string}      selector    query selector
 * @param {Function}    cb          function to hand the query result to
 *
 * @return {void}
 */
export function queryElementThen(parentEl, selector, cb) {
    const el = parentEl.querySelector(selector);

    if (el) {
        cb(el);
    }
}

/**
 * A cross-browser helper to itterate over event paths.
 *
 * @param {Event}       e   the event being processed
 * @param {Function}    cb  function to apply to each piece of the event path
 *
 * @return {void}
 */
export function walkEventPath(e, cb) {
    // internet explorer doesn't natively support click event
    // paths, so we'll need to fake it by manually walking
    // up the DOM tree until we find the document body.
    if (typeof e.path === 'undefined') {
        const path = [];
        let node = e.target;

        while (node !== document.body) {
            path.push(node);
            node = node.parentNode;
        }

        e.path = path;
    }

    e.path.forEach(cb);
}
