// global navigation guards
// https://router.vuejs.org/guide/advanced/navigation-guards.html

/**
 * Global before each route guard.
 *
 * @param  {object}     to
 * @param  {object}     from
 * @param  {Function}   next
 * @return {void}
 */
export function beforeEach(to, from, next) {
    // this is a good place to check the user's auth and redirect if necessary
    next();
}

/**
 * Global after each route guard.
 *
 * @param  {object}     to
 * @param  {object}     from
 * @return {void}
 */
export function afterEach(/* to, from */) {
    // this is a good place to page views to an analytics platform
}
