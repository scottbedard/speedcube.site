import { isBoolean } from 'lodash-es';

//
// global navigation guards
// https://router.vuejs.org/guide/advanced/navigation-guards.html
//
export default function (store) {
    return {
        beforeEach(to, from, next) {
            // prevent guests from accessing authenticated pages
            if (isBoolean(to.meta.auth) && to.meta.auth && !store.getters['user/isAuthenticated']) {
                next({
                    name: 'signin',
                    query: {
                        returnTo: to.name,
                    },
                });

                return;
            }

            next();
        },
        afterEach(/* to, from */) {
            // this is a good place to page views to an analytics platform
        },
    };
}
