import { getSignout, postSignin } from '@/app/repositories/user';

//
// actions
//
export default {
    // authenticate a user
    signin({ commit }, payload) {
        commit('setSigninIsLoading', true);

        const request = postSignin(payload);

        request.then((response) => {
            // success
            commit('setUser', response.data);
        }).finally(() => {
            // complete
            commit('setSigninIsLoading', false);
        });

        return request;
    },

    // sign a user out
    signout({ commit }) {
        commit('setSignoutIsLoading', true);

        const request = getSignout();

        request.then(() => {
            // success
            commit('setUser', {});
        }).finally(() => {
            // complete
            commit('setSignoutIsLoading', false);
        });

        return request;
    },
};
