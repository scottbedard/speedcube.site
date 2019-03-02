import {
    getSignout,
    postSendResetEmail,
    postSignin,
    postUser,
} from '@/app/repositories/user';

import {
    getConfigs,
    postConfig,
} from '@/app/repositories/config';

//
// actions
//
export default {
    // save a user's puzzle configuration
    saveConfig({ commit }, payload) {
        const request = postConfig(payload);

        request.then((response) => {
            // success
            commit('setConfigs', response.data.configs);
        });

        return request;
    },

    // authenticate a user
    signin({ commit, dispatch }, payload) {
        commit('setSigninIsLoading', true);

        const authRequest = postSignin(payload);

        authRequest.then((response) => {
            // success
            commit('setUser', response.data);

            return Promise.all([
                dispatch('syncConfigs'),
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

    // send a user a password reset link
    sendPasswordResetEmail(context, email) {
        return postSendResetEmail({ email });
    },

    // sync a user's configs
    syncConfigs({ commit }) {
        const request = getConfigs();

        commit('setConfigsAreLoading', true);

        request.then((response) => {
            // success
            commit('setConfigs', response.data.configs);
        }).finally(() => {
            // complete
            commit('setConfigsAreLoading', false);
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
