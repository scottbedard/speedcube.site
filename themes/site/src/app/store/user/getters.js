import { isUndefined } from 'lodash-es';

//
// getters
//
export default {
    // determine if the user has an avatar
    hasAvatar(state, getters) {
        return getters.isAuthenticated && state.user.avatar !== null;
    },

    // determine if the user is authenticated
    isAuthenticated(state) {
        return !isUndefined(state.user.id);
    },
};
