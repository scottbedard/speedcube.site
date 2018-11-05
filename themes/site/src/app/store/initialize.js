export default function (store, initialState) {
    const { user } = initialState;

    // set the user
    if (user) {
        store.commit('user/setUser', user);
    }
}
