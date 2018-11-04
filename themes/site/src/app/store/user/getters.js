//
// getters
//
export default {

    // determine if the user is authenticated
    isAuthenticated(state) {
        return state.user.id || false;
    },
};
