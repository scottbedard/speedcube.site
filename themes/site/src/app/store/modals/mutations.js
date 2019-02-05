//
// mutations
//
export default {
    // keep track of a modal that is now on the page
    register(state, uid) {
        state.modals.push(uid);
    },

    // stop tracking a modal
    unregister(state, uid) {
        state.modals = state.modals.filter(id => id !== uid);
    },
};
