import {
    getSignout,
    postSignin,
    postUser,
} from '@/app/repositories/user';

import { getConfigs } from '@/app/repositories/config';

//
// actions
//
export default {
    // authenticate a user
    signin({ commit }, payload) {
        commit('setSigninIsLoading', true);

        const authRequest = postSignin(payload);

        authRequest.then((response) => {
            // success
            commit('setUser', response.data);

            // load related user data
            return Promise.all([
                // configurations
                getConfigs().then(res => commit('setConfigs', res.data.configs)),
            ]);
        }).finally(() => {
            // complete
            commit('setSigninIsLoading', false);
        });

        return authRequest;
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

    // update a user
    update({ commit }, payload) {
        const request = postUser(payload);

        request.then((response) => {
            // success
            commit('setUser', response.data);
        });

        return request;
    },
};
